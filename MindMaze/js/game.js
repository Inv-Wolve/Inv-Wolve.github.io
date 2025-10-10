let gameState = {
    currentRound: 1,
    score: 0,
    totalRounds: 10,
    currentContent: null,
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
    const { content, index } = getRandomContent(gameState.difficulty, gameState.usedIndices);
    gameState.currentContent = content;
    gameState.usedIndices.push(index);
}

function updateUI() {
    const progress = (gameState.currentRound / gameState.totalRounds) * 100;
    document.getElementById('progress-fill').style.width = `${progress}%`;
    document.getElementById('round-info').textContent = `Round ${gameState.currentRound}/${gameState.totalRounds}`;
    document.getElementById('score-info').textContent = `Score: ${gameState.score}`;

    if (gameState.currentContent) {
        document.getElementById('content-text').textContent = gameState.currentContent.text;
    }

    if (gameState.answered) {
        showFeedback();
    }
}

function submitAnswer(answer) {
    if (gameState.answered) return;

    const isCorrect = answer === gameState.currentContent.source;
    gameState.answered = true;
    gameState.selectedAnswer = answer;

    if (isCorrect) {
        gameState.score++;
    } else {
        gameState.mistakes.push(gameState.currentContent.explanation);
    }

    saveGameState();
    showFeedback();
}

function showFeedback() {
    document.getElementById('answer-section').style.display = 'none';
    document.getElementById('feedback-section').style.display = 'flex';

    const feedbackCard = document.getElementById('feedback-card');
    const feedbackIcon = document.getElementById('feedback-icon');
    const feedbackTitle = document.getElementById('feedback-title');

    const isCorrect = gameState.selectedAnswer === gameState.currentContent.source;

    if (isCorrect) {
        feedbackCard.className = 'feedback-card correct';
        feedbackTitle.textContent = 'Nice! You spotted it';
        feedbackIcon.innerHTML = '<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>';
    } else {
        feedbackCard.className = 'feedback-card incorrect';
        feedbackTitle.textContent = 'Tricked you';
        feedbackIcon.innerHTML = '<circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/>';
    }

    document.getElementById('user-answer').textContent = gameState.selectedAnswer;
    document.getElementById('correct-answer').textContent = gameState.currentContent.source;
    document.getElementById('explanation-text').textContent = gameState.currentContent.explanation;
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
        gameState.selectedAnswer = null;
        loadNewContent();

        document.getElementById('answer-section').style.display = 'flex';
        document.getElementById('feedback-section').style.display = 'none';

        saveGameState();
        updateUI();
    }
}

function saveGameState() {
    sessionStorage.setItem('gameState', JSON.stringify(gameState));
}

initGame();
