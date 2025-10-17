// Load content.json
let contentDatabase = [];

fetch('./js/content.json')
  .then(response => response.json())
  .then(data => {
    contentDatabase = data;
    console.log("Content loaded successfully:", contentDatabase.length, "questions");
  })
  .catch(error => console.error("Error loading content:", error));

function getRandomContent(difficulty, usedIndices) {
    if (contentDatabase.length === 0) {
        console.warn("Content database is empty. Make sure content.json is loaded.");
        return null;
    }

    // Filter by mode (difficulty) and exclude used indices
    const filtered = contentDatabase
        .map((item, index) => ({ item, index }))
        .filter(({ item, index }) =>
            item.mode === difficulty && !usedIndices.includes(index)
        );

    if (filtered.length === 0) {
        // If no questions of the selected difficulty, try any unused question
        const anyFiltered = contentDatabase
            .map((item, index) => ({ item, index }))
            .filter(({ index }) => !usedIndices.includes(index));

        if (anyFiltered.length === 0) {
            // If all questions used, pick a random one
            const random = Math.floor(Math.random() * contentDatabase.length);
            return { content: contentDatabase[random], index: random };
        }

        const random = Math.floor(Math.random() * anyFiltered.length);
        return { content: anyFiltered[random].item, index: anyFiltered[random].index };
    }

    const random = Math.floor(Math.random() * filtered.length);
    return { content: filtered[random].item, index: filtered[random].index };
}