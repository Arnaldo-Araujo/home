/**
 * app.js — Lógica principal do C Desafios
 *
 * Fluxo:
 *  1. DOMContentLoaded → DB.init() → mostra overlay de login
 *  2. Usuário digita apelido → DB.login() → carrega exercícios + progresso
 *  3. Exercício correto → DB.addScore() → atualiza badge + ranking
 */

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

function handleLogin() {
    const raw = nickInput.value.trim();
    const result = DB.login(raw);

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

    exercises.forEach((ex, index) => {
        const li = document.createElement('li');
        li.className = 'exercise-item';
        if (completedSet.has(index)) li.classList.add('completed');
        if (index === currentIndex) li.classList.add('active');
        li.textContent = ex.title;
        li.onclick = () => loadExercise(index);
        exerciseList.appendChild(li);
    });
}

function loadExercise(index) {
    currentIndex = index;
    const ex = exercises[index];

    exerciseTitle.textContent = ex.title;
    codeEditor.value = ex.code;
    hideFeedback();

    document.querySelectorAll('.exercise-item').forEach((el, i) => {
        el.classList.toggle('active', i === index);
    });
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

function verifyAnswer() {
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
            const result = DB.addScore(currentNick, currentIndex);
            if (result.scored) {
                updateBadge(result.newScore, true);
                document.querySelectorAll('.exercise-item')[currentIndex].classList.add('completed');
                scoreMsg = ` <span style="color:var(--gold-color)">+10 pts!</span>`;
            }
        } else {
            document.querySelectorAll('.exercise-item')[currentIndex].classList.add('completed');
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

function openRanking() {
    renderRanking();
    rankingPanel.classList.add('open');
    rankingPanel.removeAttribute('aria-hidden');
    rankingBackdrop.classList.remove('hidden');
    appContainer.classList.add('blurred');
}

function closeRanking() {
    rankingPanel.classList.remove('open');
    rankingPanel.setAttribute('aria-hidden', 'true');
    rankingBackdrop.classList.add('hidden');
    appContainer.classList.remove('blurred');
}

function renderRanking() {
    const list = DB.getRanking();
    const stats = DB.getStats();

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

document.addEventListener('DOMContentLoaded', () => {
    // Inicializa o banco e o token de sessão
    DB.init();

    // Exibe contagem de jogadores no rodapé do login
    const count = DB.getPlayerCount();
    const max   = DB.getStats().maxPlayers;
    playerCountLbl.textContent = count === 0
        ? 'Seja o primeiro a entrar!'
        : `${count} de ${max} vagas ocupadas`;

    // Foca o campo de nick automaticamente
    nickInput.focus();
});
