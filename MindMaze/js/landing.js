function displayStats() {
    const stats = loadStats();

    if (stats.gamesPlayed > 0) {
        document.getElementById('stats-container').style.display = 'block';
        document.getElementById('best-score').textContent = `${stats.bestScore}/10`;
        document.getElementById('games-played').textContent = `Games Played: ${stats.gamesPlayed}`;
        document.getElementById('reset-btn').style.display = 'flex';
    }
}

function startGame(difficulty) {
    sessionStorage.setItem('difficulty', difficulty);
    sessionStorage.removeItem('gameState');
    window.location.href = 'game.html';
}

function resetProgress() {
    if (confirm('Are you sure you want to reset all your progress?')) {
        resetStats();
        document.getElementById('stats-container').style.display = 'none';
        document.getElementById('reset-btn').style.display = 'none';
    }
}

displayStats();
