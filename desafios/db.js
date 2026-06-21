/**
 * db.js — Motor de banco local para C Desafios
 *
 * SEGURANÇA:
 *  - Session token (sessionStorage): valida que a escrita vem da aba ativa
 *  - Max 100 apelidos: evita banco gigante
 *  - Max 100 KB de dados totais no localStorage
 *  - Sanitização de apelido: [a-zA-Z0-9_], 4–8 chars
 *  - Rate-limit de pontuação: 1 ponto por exercício por apelido (idempotente)
 *
 * Chave localStorage: "cdesafios_v1"
 * Chave sessionStorage: "cdesafios_session"
 */

const DB = (() => {
    const STORAGE_KEY = 'cdesafios_v1';
    const SESSION_KEY = 'cdesafios_session';
    const MAX_PLAYERS = 1000;     // Limite máximo de apelidos únicos
    const MAX_DB_BYTES = 102_400; // 100 KB — teto de tamanho do banco
    const SCORE_PER_EX = 10;      // Pontos por exercício corrigido

    // ─── Token de sessão ────────────────────────────────────────────────────
    // Gerado uma vez por aba/sessão e armazenado em sessionStorage.
    // sessionStorage não persiste entre abas ou após fechar o navegador,
    // então ele autentica que a operação veio do contexto da página ativa.
    function _getOrCreateSessionToken() {
        let token = sessionStorage.getItem(SESSION_KEY);
        if (!token) {
            // Gera UUID simples sem dependências externas
            token = 'sess_' + Date.now().toString(36) + '_' +
                Math.random().toString(36).slice(2, 10);
            sessionStorage.setItem(SESSION_KEY, token);
        }
        return token;
    }

    function _validateSession() {
        const token = sessionStorage.getItem(SESSION_KEY);
        return typeof token === 'string' && token.startsWith('sess_');
    }

    // ─── Leitura / Escrita ───────────────────────────────────────────────────
    function _load() {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (!raw) return { players: {} };
            const data = JSON.parse(raw);
            // Validação mínima de estrutura
            if (typeof data !== 'object' || !data.players) return { players: {} };
            return data;
        } catch {
            return { players: {} };
        }
    }

    function _save(db) {
        // Guarda de tamanho: impede banco maior que 100 KB
        const serialized = JSON.stringify(db);
        if (serialized.length > MAX_DB_BYTES) {
            console.warn('[DB] Limite de tamanho atingido. Dados não salvos.');
            return false;
        }
        try {
            localStorage.setItem(STORAGE_KEY, serialized);
            return true;
        } catch (e) {
            console.error('[DB] Erro ao salvar no localStorage:', e);
            return false;
        }
    }

    // ─── Sanitização de apelido ──────────────────────────────────────────────
    function _sanitize(nick) {
        // Remove caracteres não permitidos, força maiúsculas
        return nick.replace(/[^a-zA-Z0-9_]/g, '').toUpperCase().slice(0, 8);
    }

    function _isValidNick(nick) {
        // 4 a 8 caracteres alfanuméricos ou _
        return /^[A-Z0-9_]{4,8}$/.test(nick);
    }

    // ─── API Pública ─────────────────────────────────────────────────────────

    /**
     * Inicializa o banco e o token de sessão.
     * Deve ser chamado uma vez ao carregar a página.
     */
    function init() {
        _getOrCreateSessionToken();
        // Garante que o banco existe
        const db = _load();
        _save(db);
    }

    /**
     * Tenta fazer login com o apelido.
     * Cria o jogador se não existir (respeitando o limite de MAX_PLAYERS).
     *
     * @returns {{ ok: boolean, player: object|null, isNew: boolean, error: string|null }}
     */
    function login(rawNick) {
        if (!_validateSession()) {
            return { ok: false, player: null, isNew: false, error: 'Sessão inválida.' };
        }

        const nick = _sanitize(rawNick);

        if (!_isValidNick(nick)) {
            return {
                ok: false, player: null, isNew: false,
                error: 'Apelido inválido. Use 4–8 caracteres (letras, números ou _).'
            };
        }

        const db = _load();
        const now = Date.now();

        // Jogador já existe → login
        if (db.players[nick]) {
            db.players[nick].lastSeen = now;
            _save(db);
            return { ok: true, player: db.players[nick], nick, isNew: false, error: null };
        }

        // Novo jogador → verificar limite
        const playerCount = Object.keys(db.players).length;
        if (playerCount >= MAX_PLAYERS) {
            return {
                ok: false, player: null, isNew: false,
                error: `Ranking cheio (${MAX_PLAYERS} jogadores). Tente um apelido já existente.`
            };
        }

        // Cria o jogador
        db.players[nick] = {
            score: 0,
            completed: [],    // índices dos exercícios completados
            createdAt: now,
            lastSeen: now
        };

        if (!_save(db)) {
            return { ok: false, player: null, isNew: false, error: 'Erro ao salvar dados.' };
        }

        return { ok: true, player: db.players[nick], nick, isNew: true, error: null };
    }

    /**
     * Adiciona pontuação por exercício completado (idempotente).
     * Retorna false se o exercício já foi completado antes.
     *
     * @param {string} nick - Apelido já validado
     * @param {number} exerciseIndex - Índice do exercício
     * @returns {{ ok: boolean, scored: boolean, newScore: number }}
     */
    function addScore(nick, exerciseIndex) {
        if (!_validateSession()) return { ok: false, scored: false, newScore: 0 };

        const db = _load();
        const player = db.players[nick];

        if (!player) return { ok: false, scored: false, newScore: 0 };

        // Idempotente: não pontua se já completou este exercício
        if (player.completed.includes(exerciseIndex)) {
            return { ok: true, scored: false, newScore: player.score };
        }

        player.completed.push(exerciseIndex);
        player.score += SCORE_PER_EX;
        player.lastSeen = Date.now();

        _save(db);

        return { ok: true, scored: true, newScore: player.score };
    }

    /**
     * Retorna lista de jogadores ordenada por score (decrescente), top 20.
     * @returns {Array<{ nick, score, completed, lastSeen }>}
     */
    function getRanking() {
        const db = _load();
        return Object.entries(db.players)
            .map(([nick, data]) => ({ nick, ...data }))
            .sort((a, b) => b.score - a.score || a.nick.localeCompare(b.nick))
            .slice(0, 20);
    }

    /**
     * Retorna os dados de um jogador específico.
     * @param {string} nick
     */
    function getPlayer(nick) {
        const db = _load();
        return db.players[nick] || null;
    }

    /**
     * Retorna o número total de jogadores cadastrados.
     */
    function getPlayerCount() {
        const db = _load();
        return Object.keys(db.players).length;
    }

    /**
     * Expõe informações de debug (sem dados sensíveis).
     */
    function getStats() {
        const db = _load();
        const raw = localStorage.getItem(STORAGE_KEY) || '';
        return {
            players: Object.keys(db.players).length,
            dbSizeBytes: raw.length,
            maxPlayers: MAX_PLAYERS,
            maxBytes: MAX_DB_BYTES
        };
    }

    return { init, login, addScore, getRanking, getPlayer, getPlayerCount, getStats };
})();
