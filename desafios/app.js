/**
 * app.js — Lógica principal do C Desafios
 *
 * Fluxo:
 *  1. DOMContentLoaded → DB.init() → mostra overlay de login
 *  2. Usuário digita apelido → DB.login() → carrega exercícios + progresso
 *  3. Exercício correto → DB.addScore() → atualiza badge + ranking
 */

// ── Definição dos módulos (índices correspondem ao array exercisesData) ────
const MODULES = [
    {
        id: 'mod1',
        name: 'Módulo 1',
        subtitle: 'Fundamentos da Linguagem C',
        icon: '📘',
        range: [0, 21]   // Códigos 01–06 + intermediários
    },
    {
        id: 'mod2',
        name: 'Módulo 2',
        subtitle: 'Alocação Dinâmica e Ponteiros',
        icon: '🔗',
        range: [22, 43]  // Códigos 07–12 + intermediários
    },
    {
        id: 'mod3',
        name: 'Módulo 3',
        subtitle: 'Manipulação de Arquivos',
        icon: '📂',
        range: [44, 65]  // Códigos 13–17 + intermediários
    },
    {
        id: 'mod4',
        name: 'Módulo 4',
        subtitle: 'Recursão e Algoritmos Básicos',
        icon: '🌳',
        range: [66, 87]  // Códigos 18–22 + intermediários
    },
    {
        id: 'mod5',
        name: 'Módulo 5',
        subtitle: 'Filas, Pilhas e Listas',
        icon: '📚',
        range: [88, 109]
    },
    {
        id: 'mod6',
        name: 'Módulo 6',
        subtitle: 'Algoritmos de Ordenação',
        icon: '⏱️',
        range: [110, 131]
    },
    {
        id: 'mod7',
        name: 'Módulo 7',
        subtitle: 'Ponteiros Avançados',
        icon: '🎯',
        range: [132, 153]
    },
    {
        id: 'mod8',
        name: 'Módulo 8',
        subtitle: 'Árvores',
        icon: '🌲',
        range: [154, 175]
    },
    {
        id: 'mod9',
        name: 'Módulo 9',
        subtitle: 'Grafos',
        icon: '🕸️',
        range: [176, 197]
    },
    {
        id: 'mod10',
        name: 'Módulo 10',
        subtitle: 'Tabela de Dispersão (Hash)',
        icon: '🏷️',
        range: [198, 219]
    },
    {
        id: 'mod11',
        name: 'Módulo Hard',
        subtitle: 'Sobrevivência & Boss Fights',
        icon: '💀',
        range: [220, 241]
    }
];

// ── Estado global ──────────────────────────────────────────────────────────
let exercises    = [];
let currentIndex = 0;
let currentNick  = null;   // apelido autenticado da sessão

// ── Referências DOM ────────────────────────────────────────────────────────
const loginOverlay    = document.getElementById('login-overlay');
const nickInput       = document.getElementById('nick-input');
const nickCounter     = document.getElementById('nick-counter');
const nickError       = document.getElementById('nick-error');
const loginBtn        = document.getElementById('login-btn');
const playerCountLbl  = document.getElementById('player-count-label');

const appContainer    = document.getElementById('app-container');
const exerciseList    = document.getElementById('exercise-list');
const exerciseTitle   = document.getElementById('exercise-title');
const codeEditor      = document.getElementById('code-editor');
const verifyBtn       = document.getElementById('verify-btn');
const showHintBtn     = document.getElementById('show-hint-btn');
const showAnswerBtn   = document.getElementById('show-answer-btn');
const feedbackArea    = document.getElementById('feedback-area');

const playerBadge     = document.getElementById('player-badge');
const badgeNick       = document.getElementById('badge-nick');
const badgeScore      = document.getElementById('badge-score');

const rankingBtn      = document.getElementById('ranking-btn');
const rankingPanel    = document.getElementById('ranking-panel');
const rankingBackdrop = document.getElementById('ranking-backdrop');
const closeRankingBtn = document.getElementById('close-ranking-btn');
const rankingList     = document.getElementById('ranking-list');
const rankingFooter   = document.getElementById('ranking-footer');

// ═══════════════════════════════════════════════════════════════════════════
//  SEÇÃO 1 — LOGIN
// ═══════════════════════════════════════════════════════════════════════════

/** Valida o nick localmente (espelha as regras do DB) */
function isValidNick(raw) {
    const nick = raw.replace(/[^a-zA-Z0-9_]/g, '').toUpperCase();
    return /^[A-Z0-9_]{4,8}$/.test(nick);
}

/** Atualiza o contador e o estado do botão de login em tempo real */
nickInput.addEventListener('input', () => {
    // Força maiúsculas e remove caracteres inválidos
    const raw = nickInput.value;
    const cleaned = raw.replace(/[^a-zA-Z0-9_]/g, '').toUpperCase().slice(0, 8);
    if (nickInput.value !== cleaned) nickInput.value = cleaned;

    const len = cleaned.length;
    nickCounter.textContent = `${len}/8`;

    const valid = isValidNick(cleaned);
    loginBtn.disabled = !valid;

    nickInput.classList.toggle('valid', valid);
    nickInput.classList.toggle('invalid', len > 0 && !valid);

    nickError.classList.add('hidden');
    nickError.textContent = '';
});

/** Enter no campo de nick aciona o login */
nickInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !loginBtn.disabled) handleLogin();
});

loginBtn.addEventListener('click', handleLogin);

async function handleLogin() {
    const raw = nickInput.value.trim();
    loginBtn.disabled = true;
    loginBtn.textContent = 'Carregando...';

    const result = await DB.login(raw);

    loginBtn.disabled = false;
    loginBtn.textContent = 'Entrar no Desafio';

    if (!result.ok) {
        nickError.textContent = result.error;
        nickError.classList.remove('hidden');
        nickInput.classList.add('invalid');
        return;
    }

    currentNick = result.nick;
    enterApp(result.player, result.isNew);
}

function enterApp(player, isNew) {
    // Esconde overlay
    loginOverlay.classList.add('hidden');

    // Libera o app
    appContainer.removeAttribute('aria-hidden');

    // Carrega exercícios
    loadExercises(player);

    // Atualiza badge
    updateBadge(player.score);

    // Mensagem de boas-vindas
    if (isNew) {
        setTimeout(() => {
            showFeedback(`👋 Bem-vindo, <strong>${currentNick}</strong>! Boa sorte nos desafios!`, 'hint');
        }, 300);
    } else {
        const done = player.completed.length;
        setTimeout(() => {
            showFeedback(
                `🔙 Bem-vindo de volta, <strong>${currentNick}</strong>! ` +
                `Você tem <strong>${player.score} pts</strong> e completou <strong>${done}</strong> exercício(s).`,
                'hint'
            );
        }, 300);
    }
}

// ═══════════════════════════════════════════════════════════════════════════
//  SEÇÃO 2 — EXERCÍCIOS
// ═══════════════════════════════════════════════════════════════════════════

function loadExercises(player) {
    try {
        exercises = exercisesData;
        renderSidebar(player);

        // Se o jogador já completou exercícios, vai para o primeiro não completado
        let startIndex = 0;
        if (player && player.completed && player.completed.length > 0) {
            // Encontra o primeiro exercício ainda não completado
            const firstIncomplete = exercises.findIndex((_, i) => !player.completed.includes(i));
            startIndex = firstIncomplete >= 0 ? firstIncomplete : 0;
        }

        loadExercise(startIndex);
    } catch (error) {
        console.error('Erro ao carregar exercícios:', error);
        showFeedback('Erro ao carregar os exercícios. Verifique o arquivo exercicios.js.', 'error');
    }
}

function renderSidebar(player) {
    exerciseList.innerHTML = '';
    const completedSet = new Set(player ? player.completed : []);

    MODULES.forEach(mod => {
        const [from, to] = mod.range;

        // ── Calcula progresso do módulo ──
        let doneInModule = 0;
        const totalInModule = to - from + 1;
        for (let i = from; i <= to; i++) {
            if (completedSet.has(i)) doneInModule++;
        }

        // ── Decide se este módulo começa aberto ──
        const hasActive = currentIndex >= from && currentIndex <= to;
        const isOpen = hasActive; // abre o módulo do exercício atual

        // ── Wrapper do módulo ──
        const wrapper = document.createElement('div');
        wrapper.className = 'module-section';

        // ── Header do módulo ──
        const header = document.createElement('div');
        header.className = 'module-header' + (isOpen ? ' open' : '');
        header.dataset.modId = mod.id;
        header.innerHTML = `
            <span class="module-icon">${mod.icon}</span>
            <span class="module-label">
                <span class="module-name">${mod.name}</span>
                <span class="module-subtitle">${mod.subtitle}</span>
            </span>
            <span class="module-progress" id="prog-${mod.id}">${doneInModule}/${totalInModule}</span>
            <span class="module-arrow">›</span>
        `;
        header.addEventListener('click', () => toggleModule(header));
        wrapper.appendChild(header);

        // ── Lista de exercícios do módulo ──
        const group = document.createElement('ul');
        group.className = 'module-group' + (isOpen ? ' open' : '');
        group.id = `group-${mod.id}`;

        for (let i = from; i <= to; i++) {
            const ex = exercises[i];
            const li = document.createElement('li');
            li.className = 'exercise-item';
            li.dataset.index = i;
            if (completedSet.has(i)) li.classList.add('completed');
            if (i === currentIndex) li.classList.add('active');
            li.textContent = ex.title;
            li.addEventListener('click', () => loadExercise(i));
            group.appendChild(li);
        }

        wrapper.appendChild(group);
        exerciseList.appendChild(wrapper);
    });
}

/** Atualiza o contador de progresso de um módulo na sidebar após pontuar */
async function updateModuleProgress(exerciseIndex) {
    const mod = MODULES.find(m => exerciseIndex >= m.range[0] && exerciseIndex <= m.range[1]);
    if (!mod) return;
    const [from, to] = mod.range;
    const player = await DB.getPlayer(currentNick);
    if (!player) return;
    const completedSet = new Set(player.completed);
    let done = 0;
    for (let i = from; i <= to; i++) if (completedSet.has(i)) done++;
    const label = document.getElementById(`prog-${mod.id}`);
    if (label) label.textContent = `${done}/${to - from + 1}`;
}

/** Abre/fecha um módulo no accordion */
function toggleModule(header) {
    const isOpen = header.classList.contains('open');
    const groupId = `group-${header.dataset.modId}`;
    const group = document.getElementById(groupId);

    if (isOpen) {
        header.classList.remove('open');
        group.classList.remove('open');
    } else {
        header.classList.add('open');
        group.classList.add('open');
    }
}

/** Garante que o módulo do exercício atual esteja aberto */
function ensureModuleOpen(index) {
    const mod = MODULES.find(m => index >= m.range[0] && index <= m.range[1]);
    if (!mod) return;
    const header = document.querySelector(`.module-header[data-mod-id="${mod.id}"]`);
    const group  = document.getElementById(`group-${mod.id}`);
    if (header && !header.classList.contains('open')) {
        header.classList.add('open');
        group.classList.add('open');
    }
}

function loadExercise(index) {
    currentIndex = index;
    const ex = exercises[index];

    exerciseTitle.textContent = ex.title;
    codeEditor.value = ex.code;
    hideFeedback();

    // Garante que o módulo correto está aberto
    ensureModuleOpen(index);

    // Marca apenas o item clicado como ativo
    document.querySelectorAll('.exercise-item').forEach(el => {
        el.classList.toggle('active', parseInt(el.dataset.index) === index);
    });

    // Scroll suave para o item ativo na sidebar
    const activeEl = document.querySelector(`.exercise-item[data-index="${index}"]`);
    if (activeEl) activeEl.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
}

// ═══════════════════════════════════════════════════════════════════════════
//  SEÇÃO 3 — VERIFICAÇÃO E PONTUAÇÃO
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Normaliza string removendo espaços e convertendo para minúsculas.
 */
function normalizeString(str) {
    return str.replace(/\s+/g, '').toLowerCase();
}

/**
 * Extrai fragmentos de código significativos do campo correction.
 * Ignora linhas de instrução em comentário (que começam com // e têm palavras-chave explicativas).
 */
function extractCodeFragments(correctionStr) {
    const instructionKeywords = ['mover', 'usar', 'use ', 'sondagem', 'adicionar', 'coloque'];
    return correctionStr
        .split('\n')
        .map(l => l.trim())
        .filter(l => {
            if (!l || l.length < 4) return false;
            if (l.startsWith('//')) {
                const lower = l.toLowerCase();
                return !instructionKeywords.some(kw => lower.includes(kw));
            }
            return true;
        });
}

async function verifyAnswer() {
    const ex = exercises[currentIndex];
    const userCode = codeEditor.value;
    const fragments = extractCodeFragments(ex.correction);

    if (fragments.length === 0) {
        showFeedback('⚠️ <strong>Exercício especial:</strong> Revise o conceito descrito na dica.', 'hint');
        return;
    }

    const normalizedUserCode = normalizeString(userCode);
    const matched = fragments.some(fragment => {
        const nf = normalizeString(fragment);
        return nf.length >= 4 && normalizedUserCode.includes(nf);
    });

    if (matched) {
        // Tenta pontuar (idempotente — sem nick não pontua)
        let scoreMsg = '';
        if (currentNick) {
            verifyBtn.disabled = true;
            verifyBtn.textContent = 'Verificando...';
            const result = await DB.addScore(currentNick, currentIndex);
            verifyBtn.disabled = false;
            verifyBtn.textContent = 'Verificar Código';

            if (result.scored) {
                updateBadge(result.newScore, true);
                await updateModuleProgress(currentIndex);
                document.querySelectorAll('.exercise-item')[currentIndex]?.classList.add('completed');
                // Marca o item correto via data-index (mais robusto)
                const el = document.querySelector(`.exercise-item[data-index="${currentIndex}"]`);
                if (el) el.classList.add('completed');
                scoreMsg = ` <span style="color:var(--gold-color)">+10 pts!</span>`;
            }
        } else {
            document.querySelectorAll('.exercise-item')[currentIndex]?.classList.add('completed');
        }
        showFeedback(`🎉 <strong>Correto!</strong> Você encontrou e corrigiu o problema!${scoreMsg}`, 'success');
    } else {
        showFeedback('❌ <strong>Ainda não.</strong> O erro persiste. Revise o código e tente novamente.', 'error');
    }
}

// ═══════════════════════════════════════════════════════════════════════════
//  SEÇÃO 4 — BADGE DE SCORE
// ═══════════════════════════════════════════════════════════════════════════

function updateBadge(score, animate = false) {
    if (!currentNick) return;

    playerBadge.classList.remove('hidden');
    badgeNick.textContent = currentNick;
    badgeScore.textContent = `${score} pts`;

    if (animate) {
        badgeScore.classList.remove('bump');
        // Force reflow para reiniciar a animação
        void badgeScore.offsetWidth;
        badgeScore.classList.add('bump');
    }
}

// ═══════════════════════════════════════════════════════════════════════════
//  SEÇÃO 5 — RANKING
// ═══════════════════════════════════════════════════════════════════════════

async function openRanking() {
    rankingPanel.classList.add('open');
    rankingPanel.removeAttribute('aria-hidden');
    rankingBackdrop.classList.remove('hidden');
    appContainer.classList.add('blurred');
    
    rankingList.innerHTML = '<li class="ranking-empty"><span>Carregando ranking...</span></li>';
    await renderRanking();
}

function closeRanking() {
    rankingPanel.classList.remove('open');
    rankingPanel.setAttribute('aria-hidden', 'true');
    rankingBackdrop.classList.add('hidden');
    appContainer.classList.remove('blurred');
}

async function renderRanking() {
    const list = await DB.getRanking();
    const stats = await DB.getStats();

    rankingList.innerHTML = '';

    if (list.length === 0) {
        rankingList.innerHTML = `
            <li class="ranking-empty">
                <span style="font-size:2rem">🏜️</span>
                <span>Nenhum jogador ainda.</span>
                <span>Seja o primeiro!</span>
            </li>`;
        return;
    }

    const medals = ['🥇', '🥈', '🥉'];
    const posClasses = ['gold', 'silver', 'bronze'];

    list.forEach((player, i) => {
        const li = document.createElement('li');
        li.className = 'ranking-item';
        if (player.nick === currentNick) li.classList.add('me');

        const pos = i + 1;
        const medal = medals[i] || '  ';
        const posClass = posClasses[i] || 'other';
        const completedCount = player.completed ? player.completed.length : 0;
        const meTag = player.nick === currentNick ? ' ← você' : '';

        li.innerHTML = `
            <span class="rank-pos ${posClass}">${pos}</span>
            <span class="rank-medal">${medal}</span>
            <div class="rank-info">
                <div class="rank-nick">${escapeHtml(player.nick)}${meTag}</div>
                <div class="rank-completed">${completedCount} exercício(s) concluído(s)</div>
            </div>
            <span class="rank-score">${player.score}</span>
        `;

        // Delay escalonado para animação de entrada
        li.style.animationDelay = `${i * 40}ms`;
        rankingList.appendChild(li);
    });

    // Rodapé com estatísticas do banco
    const sizeKB = (stats.dbSizeBytes / 1024).toFixed(1);
    rankingFooter.innerHTML =
        `${stats.players}/${stats.maxPlayers} jogadores · DB: ${sizeKB} KB`;
}

/** Escapa HTML para evitar XSS ao renderizar nicks */
function escapeHtml(str) {
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

// ═══════════════════════════════════════════════════════════════════════════
//  SEÇÃO 6 — FEEDBACK
// ═══════════════════════════════════════════════════════════════════════════

function showFeedback(message, type) {
    feedbackArea.innerHTML = message;
    feedbackArea.className = `feedback ${type}`;
}

function hideFeedback() {
    feedbackArea.className = 'feedback hidden';
    feedbackArea.innerHTML = '';
}

// ═══════════════════════════════════════════════════════════════════════════
//  SEÇÃO 7 — EVENTOS
// ═══════════════════════════════════════════════════════════════════════════

verifyBtn.addEventListener('click', verifyAnswer);

showHintBtn.addEventListener('click', () => {
    const ex = exercises[currentIndex];
    showFeedback(`💡 <strong>Dica:</strong> ${ex.error_description}`, 'hint');
});

showAnswerBtn.addEventListener('click', () => {
    const ex = exercises[currentIndex];
    const correctionDisplay = escapeHtml(ex.correction).replace(/\n/g, '<br>');
    showFeedback(`📖 <strong>Correção Esperada:</strong><br><br><code>${correctionDisplay}</code>`, 'hint');
});

rankingBtn.addEventListener('click', openRanking);
closeRankingBtn.addEventListener('click', closeRanking);
rankingBackdrop.addEventListener('click', closeRanking);

// Fecha ranking com Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && rankingPanel.classList.contains('open')) closeRanking();
});

// ═══════════════════════════════════════════════════════════════════════════
//  SEÇÃO 8 — INICIALIZAÇÃO
// ═══════════════════════════════════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', async () => {
    // Foca o campo de nick automaticamente
    nickInput.focus();
    playerCountLbl.textContent = 'Conectando ao servidor...';

    // Inicializa o banco e o token de sessão
    try {
        await DB.init();
    } catch (e) {
        playerCountLbl.textContent = 'Erro ao conectar ao servidor. Certifique-se de que "node server.js" está rodando.';
        playerCountLbl.style.color = 'var(--error-color)';
        loginBtn.disabled = true;
        return;
    }

    // Exibe contagem de jogadores no rodapé do login
    const count = await DB.getPlayerCount();
    const stats = await DB.getStats();
    const max = stats.maxPlayers || 1000;
    
    playerCountLbl.textContent = count === 0
        ? 'Seja o primeiro a entrar!'
        : `${count} de ${max} vagas ocupadas`;
});
