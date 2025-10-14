// Load content.json
let contentDatabase = [];

fetch('./content.json')
  .then(response => response.json())
  .then(data => {
    contentDatabase = data;
  })
  .catch(error => console.error("Error loading content:", error));

function getRandomContent(difficulty, usedIndices) {
    if (contentDatabase.length === 0) {
        console.warn("Content database is empty. Make sure content.json is loaded.");
        return null;
    }

    const filtered = contentDatabase
        .map((item, index) => ({ item, index }))
        .filter(({ item, index }) =>
            item.difficulty === difficulty && !usedIndices.includes(index)
        );

    if (filtered.length === 0) {
        const anyFiltered = contentDatabase
            .map((item, index) => ({ item, index }))
            .filter(({ index }) => !usedIndices.includes(index));

        if (anyFiltered.length === 0) {
            const random = Math.floor(Math.random() * contentDatabase.length);
            return { content: contentDatabase[random], index: random };
        }

        const random = Math.floor(Math.random() * anyFiltered.length);
        return { content: anyFiltered[random].item, index: anyFiltered[random].index };
    }

    const random = Math.floor(Math.random() * filtered.length);
    return { content: filtered[random].item, index: filtered[random].index };
}