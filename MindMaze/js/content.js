const contentDatabase = [
    {
        text: "I was so tired in class, I thought my pencil was a sandwich.",
        source: "Human",
        explanation: "Sleepy mix-ups and silly mistakes are very human.",
        difficulty: "easy"
    },
    {
        text: "To maximize educational outcomes, it is imperative to engage in active learning strategies.",
        source: "AI",
        explanation: "Overly formal and impersonal language is typical of AI.",
        difficulty: "easy"
    },
    {
        text: "I tried to do my homework but my dog sat on it and now it's a napkin.",
        source: "Human",
        explanation: "Blaming pets and making excuses is a classic human trait.",
        difficulty: "medium"
    },
    {
        text: "Engaging in extracurricular activities can enhance personal development and social skills.",
        source: "AI",
        explanation: "Generic statements without personal context are AI-like.",
        difficulty: "medium"
    },
    {
        text: "I thought the test was today, but it was actually yesterday. Oops.",
        source: "Human",
        explanation: "Forgetting dates and deadlines is a common human experience.",
        difficulty: "easy"
    },
    {
        text: "Regular attendance and punctuality are essential for academic success.",
        source: "AI",
        explanation: "Standard advice without personal touch is AI-generated.",
        difficulty: "easy"
    },
    {
        text: "I accidentally wore my slippers to school instead of shoes. At least they're comfy.",
        source: "Human",
        explanation: "Wardrobe mix-ups and finding humor in them are human behaviors.",
        difficulty: "medium"
    },
    {
        text: "Utilizing a structured study schedule can improve retention and performance.",
        source: "AI",
        explanation: "Structured, impersonal advice is characteristic of AI writing.",
        difficulty: "medium"
    },
    {
        text: "My friend said she couldn't come to school because her pet hamster was sick. I think she just wanted a day off.",
        source: "Human",
        explanation: "Creative excuses and humorous reasoning are human traits.",
        difficulty: "medium"
    },
    {
        text: "Implementing effective time management strategies can lead to increased productivity.",
        source: "AI",
        explanation: "Generic productivity tips without personal context are AI-like.",
        difficulty: "medium"
    },
    {
        text: "I thought I had a test today, but it was actually tomorrow. I guess I studied too early.",
        source: "Human",
        explanation: "Over-preparation and misjudging schedules are relatable human experiences.",
        difficulty: "easy"
    },
    {
        text: "The weather is sunny and warm, perfect for outdoor activities.",
        source: "AI",
        explanation: "Overly formal descriptions of simple things suggest AI generation.",
        difficulty: "easy"
    },
    {
        text: "I tried to make spaghetti, but I forgot to boil the water first. It was just noodles.",
        source: "Human",
        explanation: "Cooking mishaps and learning experiences are human traits.",
        difficulty: "medium"
    },
    {
        text: "The library is a quiet place where students can study and read.",
        source: "AI",
        explanation: "Basic, factual statements without personal insight are AI-like.",
        difficulty: "easy"
    },
    {
        text: "I thought I lost my homework, but it was just under my bed the whole time.",
        source: "Human",
        explanation: "Misplacing items and finding them later is a common human experience.",
        difficulty: "easy"
    },
    {
        text: "Reading books can improve vocabulary and comprehension skills.",
        source: "AI",
        explanation: "Generic educational statements without personal context are AI-like.",
        difficulty: "easy"
    },
    {
        text: "I tried to do my math homework, but I couldn't find my calculator.",
        source: "Human",
        explanation: "Forgetting tools and making excuses are human behaviors.",
        difficulty: "medium"
    },
    {
        text: "The teacher explained the lesson clearly, making it easier to understand.",
        source: "AI",
        explanation: "Overly formal and impersonal language is typical of AI.",
        difficulty: "easy"
    },
    {
        text: "I thought I was done with my project, but I forgot to add the conclusion.",
        source: "Human",
        explanation: "Overlooking details and realizing mistakes later is a human trait.",
        difficulty: "medium"
    },
    {
        text: "The experiment demonstrated the principles of physics effectively.",
        source: "AI",
        explanation: "Generic statements without personal context are AI-like.",
        difficulty: "medium"
    },
    {
        text: "I tried to study, but my cat kept jumping on my books.",
        source: "Human",
        explanation: "Distractions from pets during study time are relatable human experiences.",
        difficulty: "medium"
    },
    {
        text: "The assignment requires students to analyze the data and draw conclusions.",
        source: "AI",
        explanation: "Standard academic instructions without personal insight are AI-generated.",
        difficulty: "medium"
    },
    {
        text: "I thought I had finished my homework, but I forgot to do the last question.",
        source: "Human",
        explanation: "Forgetting tasks and realizing later is a common human experience.",
        difficulty: "medium"
    },
    {
        text: "The presentation was informative and well-organized.",
        source: "AI",
        explanation: "Overly formal and impersonal language is typical of AI.",
        difficulty: "easy"
    },
    {
        text: "I tried to make a sandwich, but I forgot to put in the bread.",
        source: "Human",
        explanation: "Simple mistakes and learning experiences are human traits.",
        difficulty: "easy"
    },
    {
        text: "The assignment was challenging, but I learned a lot from it.",
        source: "AI",
        explanation: "Generic reflections without personal context are AI-like.",
        difficulty: "medium"
    },
    {
        text: "I thought I had completed my homework, but I left it at school.",
        source: "Human",
        explanation: "Forgetting assignments and realizing later is a common human experience.",
        difficulty: "medium"
    },
    {
        text: "The teacher provided feedback that helped improve my work.",
        source: "AI",
        explanation: "Standard academic statements without personal insight are AI-generated.",
        difficulty: "easy"
    },
    {
        text: "I tried to do my homework, but I couldn't find my pen.",
        source: "Human",
        explanation: "Forgetting tools and making excuses are human behaviors.",
        difficulty: "easy"
    },
    {
        text: "The experiment results were consistent with the hypothesis.",
        source: "AI",
        explanation: "Generic scientific statements without personal context are AI-like.",
        difficulty: "medium"
    },
    {
        text: "I thought I had finished my project, but I forgot to save it.",
        source: "Human",
        explanation: "Overlooking tasks and realizing mistakes later is a human trait.",
        difficulty: "medium"
    },
    {
        text: "The assignment was due yesterday, but I completed it today.",
        source: "AI",
        explanation: "Standard academic statements without personal context are AI-generated.",
        difficulty: "medium"
    },
    {
        text: "I tried to study, but I kept getting distracted by my phone.",
        source: "Human",
        explanation: "Distractions during study time are relatable human experiences.",
        difficulty: "medium"
    },
    {
        text: "The teacher explained the concept in a way that was easy to understand.",
        source: "AI",
        explanation: "Overly formal and impersonal language is typical of AI.",
        difficulty: "easy"
    },
    {
        text: "I thought I had completed my homework, but I forgot to print it.",
        source: "Human",
        explanation: "Overlooking tasks and realizing mistakes later is a human trait.",
        difficulty: "medium"
    },
    {
        text: "The assignment requires students to research and analyze the topic.",
        source: "AI",
        explanation: "Standard academic instructions without personal insight are AI-generated.",
        difficulty: "medium"
    },
    {
        text: "I tried to do my math homework, but I couldn't understand the instructions.",
        source: "Human",
        explanation: "Difficulty understanding tasks and seeking help is a human behavior.",
        difficulty: "medium"
    },
    {
        text: "The teacher provided examples that clarified the lesson.",
        source: "AI",
        explanation: "Standard academic statements without personal context are AI-like.",
        difficulty: "easy"
    },
    {
        text: "I thought I had finished my project, but I forgot to add the bibliography.",
        source: "Human",
        explanation: "Overlooking details and realizing mistakes later is a human trait.",
        difficulty: "medium"
    },
    {
        text: "The assignment was challenging, but I managed to complete it.",
        source: "AI",
        explanation: "Generic reflections without personal context are AI-like.",
        difficulty: "medium"
    },
    {
        text: "I tried to study, but I kept falling asleep.",
        source: "Human",
        explanation: "Struggling to stay awake during study sessions is a common human experience.",
        difficulty: "medium"
    },
    {
        text: "The teacher provided resources that helped me understand the topic.",
        source: "AI",
        explanation: "Standard academic statements without personal context are AI-generated.",
        difficulty: "easy"
    },
    {
        text: "I thought I had completed my homework, but I forgot to submit it.",
        source: "Human",
        explanation: "Forgetting to submit assignments is a common human mistake.",
        difficulty: "medium"
    },
    {
        text: "The assignment requires students to evaluate and interpret the data.",
        source: "AI",
        explanation: "Standard academic instructions without personal insight are AI-generated.",
        difficulty: "medium"
    },
    {
        text: "I tried to do my homework, but I couldn't find my textbook.",
        source: "Human",
        explanation: "Misplacing study materials is a common human experience.",
        difficulty: "medium"
    }
];



function getRandomContent(difficulty, usedIndices) {
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
