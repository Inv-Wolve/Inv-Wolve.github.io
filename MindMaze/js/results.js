function displayResults() {
    const results = JSON.parse(sessionStorage.getItem('finalResults'));

    if (!results) {
        window.location.href = 'index.html';
        return;
    }

    const { score, totalRounds, mistakes, difficulty } = results;
    const percentage = (score / totalRounds) * 100;

    const performance = getPerformanceMessage(percentage);

    document.getElementById('performance-emoji').textContent = performance.emoji;
    document.getElementById('performance-title').textContent = performance.title;
    document.getElementById('performance-message').textContent = performance.message;

    document.getElementById('final-score').textContent = `${score}/${totalRounds}`;
    document.getElementById('accuracy').textContent = `${percentage.toFixed(0)}% accuracy`;

    document.getElementById('correct-count').textContent = score;
    document.getElementById('missed-count').textContent = totalRounds - score;

    if (mistakes.length > 0) {
        document.getElementById('mistakes-section').style.display = 'block';
        const mistakesList = document.getElementById('mistakes-list');
        mistakesList.innerHTML = '';

        mistakes.forEach(mistake => {
            const li = document.createElement('li');
            // Handle both old string format and new object format
            if (typeof mistake === 'string') {
                li.textContent = mistake;
            } else if (mistake.explanation) {
                li.innerHTML = `<strong>You selected:</strong> "${mistake.selected.substring(0, 60)}..."<br><em>${mistake.explanation}</em>`;
            }
            mistakesList.appendChild(li);
        });
    }

    sessionStorage.setItem('lastDifficulty', difficulty);
}

function getPerformanceMessage(percentage) {
    if (percentage === 100) {
        return {
            title: "Perfect Score!",
            emoji: "🏆",
            message: "You're an AI detection master!"
        };
    }
    if (percentage >= 80) {
        return {
            title: "AI Whisperer",
            emoji: "🧠",
            message: "You've got excellent instincts!"
        };
    }
    if (percentage >= 60) {
        return {
            title: "Pretty Sharp",
            emoji: "✨",
            message: "You're getting the hang of it!"
        };
    }
    if (percentage >= 40) {
        return {
            title: "Room to Grow",
            emoji: "🤔",
            message: "Keep practicing, you'll get there!"
        };
    }
    return {
        title: "Easily Fooled",
        emoji: "🤯",
        message: "The machines got you this time!"
    };
}

function playAgain() {
    const difficulty = sessionStorage.getItem('lastDifficulty') || 'medium';
    sessionStorage.setItem('difficulty', difficulty);
    sessionStorage.removeItem('finalResults');
    sessionStorage.removeItem('gameState');
    window.location.href = 'game.html';
}

function backToHome() {
    sessionStorage.removeItem('finalResults');
    sessionStorage.removeItem('gameState');
    window.location.href = 'index.html';
}

displayResults();
