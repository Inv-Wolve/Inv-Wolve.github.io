const STORAGE_KEY = 'mindmaze_stats';

function loadStats() {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            return JSON.parse(stored);
        }
    } catch (error) {
        console.error('Error loading stats:', error);
    }

    return {
        bestScore: 0,
        gamesPlayed: 0,
        lastScore: 0
    };
}

function saveStats(score) {
    try {
        const currentStats = loadStats();
        const newStats = {
            bestScore: Math.max(currentStats.bestScore, score),
            gamesPlayed: currentStats.gamesPlayed + 1,
            lastScore: score
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newStats));
    } catch (error) {
        console.error('Error saving stats:', error);
    }
}

function resetStats() {
    try {
        localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
        console.error('Error resetting stats:', error);
    }
}
