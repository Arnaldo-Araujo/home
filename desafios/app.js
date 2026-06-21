let exercises = [];
let currentIndex = 0;

const exerciseList = document.getElementById('exercise-list');
const exerciseTitle = document.getElementById('exercise-title');
const codeEditor = document.getElementById('code-editor');
const verifyBtn = document.getElementById('verify-btn');
const showHintBtn = document.getElementById('show-hint-btn');
const showAnswerBtn = document.getElementById('show-answer-btn');
const feedbackArea = document.getElementById('feedback-area');

// Load exercises directly from the included script
function loadExercises() {
    try {
        exercises = exercisesData; // Data comes from exercicios.js
        renderSidebar();
        loadExercise(0);
    } catch (error) {
        console.error("Erro ao carregar exercícios:", error);
        showFeedback("Erro ao carregar os exercícios. Verifique o arquivo exercicios.js.", "error");
    }
}

function renderSidebar() {
    exerciseList.innerHTML = '';
    exercises.forEach((ex, index) => {
        const li = document.createElement('li');
        li.className = `exercise-item ${index === currentIndex ? 'active' : ''}`;
        li.textContent = ex.title;
        li.onclick = () => loadExercise(index);
        exerciseList.appendChild(li);
    });
}

function loadExercise(index) {
    currentIndex = index;
    const ex = exercises[index];

    // Update UI
    exerciseTitle.textContent = ex.title;
    codeEditor.value = ex.code;

    hideFeedback();

    // Update sidebar active state
    document.querySelectorAll('.exercise-item').forEach((el, i) => {
        if (i === index) el.classList.add('active');
        else el.classList.remove('active');
    });
}

function showFeedback(message, type) {
    feedbackArea.innerHTML = message;
    feedbackArea.className = `feedback ${type}`;
}

function hideFeedback() {
    feedbackArea.className = 'feedback hidden';
    feedbackArea.innerHTML = '';
}

/**
 * Normaliza uma string removendo espaços em branco e convertendo para minúsculas.
 * Usado para comparação tolerante a formatação.
 */
function normalizeString(str) {
    return str.replace(/\s+/g, '').toLowerCase();
}

/**
 * Extrai os "fragmentos de verificação" a partir do campo correction.
 * O campo correction pode conter múltiplas linhas e comentários explicativos.
 * Extrai apenas as linhas de código significativas (não vazias e não iniciadas com //).
 */
function extractCodeFragments(correctionStr) {
    const lines = correctionStr.split('\n');
    const fragments = [];

    for (const line of lines) {
        const trimmed = line.trim();
        // Ignora linhas vazias e linhas que são só comentários de instrução
        if (trimmed.length === 0) continue;
        if (trimmed.startsWith('//') && trimmed.includes('Mover')) continue;
        if (trimmed.startsWith('//') && trimmed.includes('usar')) continue;
        if (trimmed.startsWith('//') && trimmed.includes('Use ')) continue;
        if (trimmed.startsWith('//') && trimmed.includes('Sondagem')) continue;

        fragments.push(trimmed);
    }

    return fragments;
}

/**
 * Verifica se o código do usuário contém a correção esperada.
 * Estratégia em cascata:
 *   1. Verifica se algum fragmento de código da correção está no código do usuário (normalizado).
 *   2. Aceita se pelo menos o primeiro fragmento significativo está presente.
 */
function verifyAnswer() {
    const ex = exercises[currentIndex];
    const userCode = codeEditor.value;

    const fragments = extractCodeFragments(ex.correction);

    if (fragments.length === 0) {
        showFeedback('⚠️ <strong>Exercício especial:</strong> Revise o conceito descrito na dica.', 'hint');
        return;
    }

    const normalizedUserCode = normalizeString(userCode);

    // Verifica cada fragmento
    const matched = fragments.some(fragment => {
        const normalizedFragment = normalizeString(fragment);
        // Ignora fragmentos muito curtos (ex: chaves sozinhas)
        if (normalizedFragment.length < 4) return false;
        return normalizedUserCode.includes(normalizedFragment);
    });

    if (matched) {
        showFeedback(`🎉 <strong>Correto!</strong> Você encontrou e corrigiu o problema!`, 'success');
        // Mark as completed
        document.querySelectorAll('.exercise-item')[currentIndex].classList.add('completed');
    } else {
        showFeedback(`❌ <strong>Ainda não.</strong> O erro persiste. Revise o código e tente novamente.`, 'error');
    }
}

// Events
verifyBtn.addEventListener('click', verifyAnswer);

showHintBtn.addEventListener('click', () => {
    const ex = exercises[currentIndex];
    showFeedback(`💡 <strong>Dica:</strong> ${ex.error_description}`, 'hint');
});

showAnswerBtn.addEventListener('click', () => {
    const ex = exercises[currentIndex];
    const correctionDisplay = ex.correction.replace(/\n/g, '<br>');
    showFeedback(`📖 <strong>Correção Esperada:</strong><br><br><code>${correctionDisplay}</code>`, 'hint');
});

// Initialize
document.addEventListener('DOMContentLoaded', loadExercises);
