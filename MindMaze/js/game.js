let gameState = {
    currentRound: 1,
    score: 0,
    totalRounds: 10,
    currentQuestion: null,
    shuffledOptions: [],
    answered: false,
    difficulty: 'medium',
    mistakes: [],
    usedIndices: []
};

function initGame() {
    const difficulty = sessionStorage.getItem('difficulty') || 'medium';
    const saved = sessionStorage.getItem('gameState');

    if (saved) {
        gameState = JSON.parse(saved);
    } else {
        gameState.difficulty = difficulty;
        loadNewContent();
    }

    updateUI();
}

function loadNewContent() {
    const result = getRandomContent(gameState.difficulty, gameState.usedIndices);
    
    if (!result || !result.content) {
        console.error("Failed to load content. Content database may not be loaded yet.");
        setTimeout(() => {
            const retryResult = getRandomContent(gameState.difficulty, gameState.usedIndices);
            if (retryResult && retryResult.content) {
                gameState.currentQuestion = retryResult.content;
                gameState.usedIndices.push(retryResult.index);
                shuffleOptions();
                updateUI();
            } else {
                alert("Error loading game content. Please refresh the page.");
            }
        }, 500);
        return;
    }
    
    gameState.currentQuestion = result.content;
    gameState.usedIndices.push(result.index);
    shuffleOptions();
}

function shuffleOptions() {
    if (!gameState.currentQuestion || !gameState.currentQuestion.options) {
        console.error("No options to shuffle");
        return;
    }
    
    // Create a copy and shuffle
    gameState.shuffledOptions = [...gameState.currentQuestion.options];
    for (let i = gameState.shuffledOptions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [gameState.shuffledOptions[i], gameState.shuffledOptions[j]] = 
        [gameState.shuffledOptions[j], gameState.shuffledOptions[i]];
    }
}

function updateUI() {
    const progress = (gameState.currentRound / gameState.totalRounds) * 100;
    document.getElementById('progress-fill').style.width = `${progress}%`;
    document.getElementById('round-info').textContent = `Round ${gameState.currentRound}/${gameState.totalRounds}`;
    document.getElementById('score-info').textContent = `Score: ${gameState.score}`;

    if (gameState.currentQuestion) {
        document.getElementById('question-text').textContent = gameState.currentQuestion.question;
        renderOptions();
    }

    if (gameState.answered) {
        // Keep feedback visible if already answered
    }
}

function renderOptions() {
    const container = document.getElementById('options-container');
    container.innerHTML = '';
    
    gameState.shuffledOptions.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'btn btn-option';
        button.setAttribute('data-option-index', index);
        button.onclick = () => submitAnswer(index);
        
        const optionLetter = String.fromCharCode(65 + index); // A, B, C, D
        button.innerHTML = `
            <div class="option-letter">${optionLetter}</div>
            <div class="option-text">${option.text}</div>
        `;
        
        container.appendChild(button);
    });
}

function submitAnswer(optionIndex) {
    if (gameState.answered) return;

    const selectedOption = gameState.shuffledOptions[optionIndex];
    const isCorrect = selectedOption.label === 'human';
    
    gameState.answered = true;
    gameState.selectedOptionIndex = optionIndex;

    if (isCorrect) {
        gameState.score++;
    } else {
        gameState.mistakes.push({
            selected: selectedOption.text,
            explanation: selectedOption.explanation
        });
    }

    saveGameState();
    showFeedback(optionIndex, isCorrect);
}

function showFeedback(selectedIndex, isCorrect) {
    const buttons = document.querySelectorAll('.btn-option');
    const selectedOption = gameState.shuffledOptions[selectedIndex];
    
    // Find the correct answer
    const correctIndex = gameState.shuffledOptions.findIndex(opt => opt.label === 'human');
    
    // Disable all buttons
    buttons.forEach((btn, idx) => {
        btn.disabled = true;
        btn.style.cursor = 'not-allowed';
        btn.style.opacity = '0.6';
        
        // Highlight the correct answer
        if (idx === correctIndex) {
            btn.classList.add('correct-answer');
        }
        
        // Highlight selected answer if wrong
        if (idx === selectedIndex && !isCorrect) {
            btn.classList.add('wrong-answer');
        }
    });
    
    // Show feedback card
    const feedbackSection = document.getElementById('feedback-section');
    const feedbackCard = document.getElementById('feedback-card');
    const feedbackIcon = document.getElementById('feedback-icon');
    const feedbackTitle = document.getElementById('feedback-title');
    
    feedbackSection.style.display = 'flex';
    
    if (isCorrect) {
        feedbackCard.className = 'feedback-card correct';
        feedbackTitle.textContent = 'Correct! But here\'s the twist...';
        feedbackIcon.innerHTML = '<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>';
    } else {
        feedbackCard.className = 'feedback-card incorrect';
        feedbackTitle.textContent = 'Not quite, and here\'s why...';
        feedbackIcon.innerHTML = '<circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/>';
    }
    
    // Show explanation
    const correctOption = gameState.shuffledOptions[correctIndex];
    document.getElementById('explanation-text').textContent = correctOption.explanation;
    
    // Update answer display
    document.getElementById('user-answer').textContent = `Option ${String.fromCharCode(65 + selectedIndex)}`;
    document.getElementById('correct-answer').textContent = `Option ${String.fromCharCode(65 + correctIndex)} (labeled as "human-like")`;
}

function nextRound() {
    if (gameState.currentRound >= gameState.totalRounds) {
        saveStats(gameState.score);
        sessionStorage.setItem('finalResults', JSON.stringify({
            score: gameState.score,
            totalRounds: gameState.totalRounds,
            mistakes: gameState.mistakes,
            difficulty: gameState.difficulty
        }));
        sessionStorage.removeItem('gameState');
        window.location.href = 'results.html';
    } else {
        gameState.currentRound++;
        gameState.answered = false;
        gameState.selectedOptionIndex = null;
        loadNewContent();

        document.getElementById('feedback-section').style.display = 'none';
        
        // Re-enable buttons
        const buttons = document.querySelectorAll('.btn-option');
        buttons.forEach(btn => {
            btn.disabled = false;
            btn.style.cursor = 'pointer';
            btn.style.opacity = '1';
            btn.classList.remove('correct-answer', 'wrong-answer');
        });

        saveGameState();
        updateUI();
    }
}

function saveGameState() {
    sessionStorage.setItem('gameState', JSON.stringify(gameState));
}

initGame();
