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

function normalizeString(str) {
    // Remove all whitespace for a generous comparison
    return str.replace(/\s+/g, '').toLowerCase();
}

function verifyAnswer() {
    const ex = exercises[currentIndex];
    const userCode = codeEditor.value;
    
    const requiredCorrection = ex.correction;
    
    // Sometimes the correction in JSON contains explanations.
    // So we do a normalized string check: does the user code contain the core correction snippet?
    // We normalize both strings (remove spaces, lower case).
    
    const normalizedUserCode = normalizeString(userCode);
    const normalizedCorrection = normalizeString(requiredCorrection);
    
    // Check if the user code includes the exact correction text
    // Or if the correction string exists inside the user's code
    if (normalizedUserCode.includes(normalizedCorrection) || userCode.includes(requiredCorrection)) {
        showFeedback(`🎉 <strong>Correto!</strong> Você encontrou e resolveu o problema!`, 'success');
        
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
    showFeedback(`📖 <strong>Correção Esperada:</strong><br><br><code>${ex.correction}</code>`, 'hint');
});

// Initialize
document.addEventListener('DOMContentLoaded', loadExercises);
