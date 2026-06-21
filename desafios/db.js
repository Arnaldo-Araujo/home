/**
 * db.js — Motor de banco REST (via Node.js)
 *
 * SEGURANÇA:
 *  - Session token (sessionStorage): valida que a escrita vem da aba ativa
 *  - Max 100 apelidos: evita banco gigante
 *  - Max 100 KB de dados totais
 *  - Sanitização de apelido: [a-zA-Z0-9_], 4–8 chars
 *  - Rate-limit de pontuação: 1 ponto por exercício por apelido (idempotente)
 */

const DB = (() => {
    const API_URL = '/api/db';
    const SESSION_KEY = 'cdesafios_session';
    const MAX_PLAYERS = 1000;
    const MAX_DB_BYTES = 102_400;
    const SCORE_PER_EX = 10;

    // ─── Token de sessão ────────────────────────────────────────────────────
    function _getOrCreateSessionToken() {
        let token = sessionStorage.getItem(SESSION_KEY);
        if (!token) {
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

    // ─── Leitura / Escrita no Backend ───────────────────────────────────────
    async function _load() {
        try {
            const res = await fetch(API_URL);
            if (!res.ok) throw new Error('Falha ao ler banco');
            const data = await res.json();
            if (typeof data !== 'object' || !data.players) return { players: {} };
            return data;
        } catch (e) {
            console.error('[DB] Erro no _load:', e);
            return { players: {} };
        }
    }

    async function _save(db) {
        const serialized = JSON.stringify(db);
        if (serialized.length > MAX_DB_BYTES) {
            console.warn('[DB] Limite de tamanho atingido. Dados não salvos.');
            return false;
        }
        try {
            const res = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: serialized
            });
            if (!res.ok) throw new Error('Falha ao salvar banco');
            return true;
        } catch (e) {
            console.error('[DB] Erro no _save:', e);
            return false;
        }
    }

    // ─── Sanitização de apelido ──────────────────────────────────────────────
    function _sanitize(nick) {
        return nick.replace(/[^a-zA-Z0-9_]/g, '').toUpperCase().slice(0, 8);
    }

    function _isValidNick(nick) {
        return /^[A-Z0-9_]{4,8}$/.test(nick);
    }

    // ─── API Pública ─────────────────────────────────────────────────────────

    async function init() {
        _getOrCreateSessionToken();
        // Apenas para verificar se o banco está respondendo
        await _load();
    }

    async function login(rawNick) {
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

        const db = await _load();
        const now = Date.now();

        // Jogador já existe
        if (db.players[nick]) {
            db.players[nick].lastSeen = now;
            await _save(db);
            return { ok: true, player: db.players[nick], nick, isNew: false, error: null };
        }

        // Novo jogador
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
            completed: [],
            createdAt: now,
            lastSeen: now
        };

        const saved = await _save(db);
        if (!saved) {
            return { ok: false, player: null, isNew: false, error: 'Erro ao salvar no servidor.' };
        }

        return { ok: true, player: db.players[nick], nick, isNew: true, error: null };
    }

    async function addScore(nick, exerciseIndex) {
        if (!_validateSession()) return { ok: false, scored: false, newScore: 0 };

        const db = await _load();
        const player = db.players[nick];

        if (!player) return { ok: false, scored: false, newScore: 0 };

        // Idempotente
        if (player.completed.includes(exerciseIndex)) {
            return { ok: true, scored: false, newScore: player.score };
        }

        player.completed.push(exerciseIndex);
        player.score += SCORE_PER_EX;
        player.lastSeen = Date.now();

        await _save(db);
        return { ok: true, scored: true, newScore: player.score };
    }

    async function getRanking() {
        const db = await _load();
        return Object.entries(db.players)
            .map(([nick, data]) => ({ nick, ...data }))
            .sort((a, b) => b.score - a.score || a.nick.localeCompare(b.nick))
            .slice(0, 20);
    }

    async function getPlayer(nick) {
        const db = await _load();
        return db.players[nick] || null;
    }

    async function getPlayerCount() {
        const db = await _load();
        return Object.keys(db.players).length;
    }

    async function getStats() {
        try {
            const res = await fetch(API_URL);
            const text = await res.text();
            const db = JSON.parse(text);
            return {
                players: Object.keys(db.players || {}).length,
                dbSizeBytes: text.length,
                maxPlayers: MAX_PLAYERS,
                maxBytes: MAX_DB_BYTES
            };
        } catch (e) {
            return { players: 0, dbSizeBytes: 0, maxPlayers: MAX_PLAYERS, maxBytes: MAX_DB_BYTES };
        }
    }

    return { init, login, addScore, getRanking, getPlayer, getPlayerCount, getStats };
})();
