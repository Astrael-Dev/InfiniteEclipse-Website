const quests = [
    {
        id: 1,
        name: "Les rôdeurs des plaines",
        image: "https://i.pinimg.com/736x/00/a8/d0/00a8d0d67edc3b8d4628df3445acc6bf.jpg",
        location: "Plaine du Prélude",
        steps: [
            {
                name: "1. Les nuisances incessantes",
                objectives: ["Tuer 20 Gobelins", "Tuer 5 Gobelins bleus"],
                description: "Des gobelins rôdent dans la plaine. Les voyageurs sont constamment attaqués. Réduisez leur nombre.",
                rewards: [
                    { type: "xp", value: 750 },
                    { type: "money", value: 1500 }
                ]
            },
            {
                name: "2. Le retour au village",
                objectives: ["Retourner au village", "Vendre le butin obtenu", ],
                description: "Maintenant que vous avez tué les gobelins, retournez au village et vendez le butin que vous avez obtenu.",
                rewards: [
                    { type: "xp", value: 500 },
                    { type: "money", value: 300 }
                ]
            },
        ],
        status: "not-started",
        currentStep: 0,
        newStep: false // Indique si une nouvelle étape a été atteinte
    },
    {
        id: 2,
        name: "Les grincements du donjon oublié",
        image: "https://i.pinimg.com/736x/c8/aa/08/c8aa082173cf5e443039664a24c136d3.jpg",
        location: "Donjon des Pavés",
        steps: [
            {
                name: "1. Le donjon oublié",
                objectives: ["Explorer le donjon", "Vaincre 5 Gardien des Ruines"],
                description: "Ce donjon n'a pas été exploré depuis des décennies, mais des rumeurs circulent sur un monstre féroce caché à l'intérieur. Faites attention, les gardiens de ces ruines vous attaqueront.",
                rewards: [
                    { type: "xp", value: 2000 },
                    { type: "money", value: 4000 }
                ]
            },
            {
                name: "2. Les serpents méchaniques",
                objectives: ["Vaincre 5 Archa-Serpent des Ruines", "Récupurer le butin"],
                description: "Ces serpents mécaniques possèdent une orbe magique puissante, vainquez-les afin d'accéder à la salle où repose le monstre.",
            rewards: [
                { type: "xp", value: 2500 },
                { type: "money", value: 5000 },
            ]
            },
            {
                name: "3. Le Golem des Pavés",
                objectives: ["Tuer Crackle"],
                description: "Ce colosse de magma, est une brute. Tuez-le pour ramener la sérenité dans la plaine.",
                rewards: [
                    { type: "xp", value: 5000 },
                    { type: "money", value: 10000 },
                ]
            }
        ],
        status: "not-started",
        currentStep: 0,
        newStep: false // Indique si une nouvelle étape a été atteinte
    },
];

// Sauvegarde des quêtes dans le localStorage
function saveQuestsToLocalStorage() {
    localStorage.setItem("quests", JSON.stringify(quests));
}

function resetQuestCache() {
    const savedQuests = localStorage.getItem("quests");
    if (savedQuests) {
        const parsedQuests = JSON.parse(savedQuests);

        // Réinitialiser les données "cachées" tout en conservant la progression
        quests.forEach((quest, index) => {
            if (parsedQuests[index]) {
                parsedQuests[index].name = quest.name; // Réinitialise le nom
                parsedQuests[index].image = quest.image; // Réinitialise l'image
                parsedQuests[index].location = quest.location; // Réinitialise le lieu
                parsedQuests[index].steps = quest.steps; // Réinitialise les étapes
            }
        });

        // Sauvegarder les données mises à jour dans le localStorage
        localStorage.setItem("quests", JSON.stringify(parsedQuests));
        console.log("Les données cachées des quêtes ont été réinitialisées !");
    } else {
        console.log("Aucune donnée de quête trouvée dans le localStorage.");
    }
}

// Réinitialise les données "cachées" des quêtes au chargement de la page
resetQuestCache();

// Charge les quêtes depuis le localStorage au démarrage
loadQuestsFromLocalStorage();
renderQuests();

// Chargement des quêtes depuis le localStorage
function loadQuestsFromLocalStorage() {
    const savedQuests = localStorage.getItem("quests");
    if (savedQuests) {
        const parsedQuests = JSON.parse(savedQuests);
        quests.forEach((quest, index) => {
            quests[index] = { ...quest, ...parsedQuests[index] };
        });
    }
}

function renderQuests() {
    const notStartedContainer = document.getElementById("not-started-quests");
    const inProgressContainer = document.getElementById("in-progress-quests");
    const completedContainer = document.getElementById("completed-quests");

    // Clear containers
    notStartedContainer.innerHTML = "";
    inProgressContainer.innerHTML = "";
    completedContainer.innerHTML = "";

    quests.forEach(quest => {
        const questCard = document.createElement("div");
        questCard.classList.add("quest-card");
        questCard.style.position = "relative";

        // Set the background image
        questCard.style.backgroundImage = `
            linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.8)), 
            url('${quest.image}')
        `;
        questCard.style.backgroundSize = "cover";
        questCard.style.backgroundPosition = "center";

        // Badge "NOUVEAU"
        if (quest.newStep) {
            const newBadge = document.createElement("div");
            newBadge.classList.add("new-badge");
            newBadge.textContent = "NOUVEAU";
            questCard.appendChild(newBadge);
        }

        // Add quest title and buttons
        questCard.innerHTML += `
            <h3>${quest.name}</h3>
        `;

        const buttonContainer = document.createElement("div");
        buttonContainer.style.display = "flex";
        buttonContainer.style.flexDirection = "column";
        buttonContainer.style.gap = "10px"; // Reduce spacing between buttons
        buttonContainer.style.marginTop = "10px";

        const detailsButton = document.createElement("button");
        detailsButton.textContent = "Voir les détails";
        detailsButton.onclick = () => showQuestDetails(quest.id);
        buttonContainer.appendChild(detailsButton);

        if (quest.status === "in-progress") {
            const finishStepButton = document.createElement("button");
            finishStepButton.textContent = quest.currentStep < quest.steps.length - 1
                ? `Terminer l'étape ${quest.currentStep + 1}`
                : "Terminer la quête";
            finishStepButton.onclick = () => finishStep(quest.id);
            buttonContainer.appendChild(finishStepButton);
        } else if (quest.status === "completed") {
            const resetButton = document.createElement("button");
            resetButton.textContent = "Annuler la finalité";
            resetButton.onclick = () => resetQuest(quest.id);
            buttonContainer.appendChild(resetButton);
        }

        questCard.appendChild(buttonContainer);

        // Append the card to the appropriate container
        if (quest.status === "not-started") {
            notStartedContainer.appendChild(questCard);
        } else if (quest.status === "in-progress") {
            inProgressContainer.appendChild(questCard);
        } else if (quest.status === "completed") {
            completedContainer.appendChild(questCard);
        }
    });
}

function showQuestDetails(id) {
    console.log(`showQuestDetails called with id: ${id}`); // Debugging
    const quest = quests.find(q => q.id === id);
    if (!quest) return;

    const currentStep = quest.steps[quest.currentStep];

    // Titre de la quête
    document.getElementById("quest-title").textContent = quest.name;

    // Lieu de la quête
    document.getElementById("quest-location").textContent = quest.location;

    // Nom de l'étape actuelle (mise à jour du contenu existant)
    const stepTitle = document.getElementById("quest-current-step");
    stepTitle.textContent = currentStep.name;

    // Récompenses de l'étape actuelle (avec type et valeur)
    const rewardsList = document.getElementById("quest-rewards");
    rewardsList.innerHTML = ""; // Clear existing content
    currentStep.rewards.forEach(reward => {
        const li = document.createElement("li");
        if (reward.type === "xp") {
            li.textContent = `XP : ${reward.value} 🌟`;
        } else if (reward.type === "money") {
            li.textContent = `Argent : ${reward.value} 💎`;
        } else if (reward.type === "item") {
            li.textContent = `Objet : ${reward.value} 🗡️`;
        }
        rewardsList.appendChild(li);
    });

    // Objectifs de l'étape actuelle (avec bullet points)
    const objectivesList = document.getElementById("quest-objectives");
    objectivesList.innerHTML = ""; // Clear existing content
    currentStep.objectives.forEach(objective => {
        const li = document.createElement("li");
        li.textContent = objective;
        objectivesList.appendChild(li);
    });

    // Description spécifique à l'étape actuelle
    document.getElementById("quest-description").textContent = currentStep.description;

    // Bouton "Accepter la quête" (affiché uniquement si la quête n'est pas encore commencée)
    const acceptButton = document.getElementById("accept-quest-btn");
    acceptButton.style.display = quest.status === "not-started" ? "block" : "none";

    // Réinitialise le badge "NOUVEAU"
    quest.newStep = false;

    saveQuestsToLocalStorage(); // Sauvegarde l'état des quêtes

    // Affiche le modal
    const modal = document.getElementById("quest-modal");
    modal.style.display = "flex";

    // Action pour accepter la quête
    acceptButton.onclick = () => {
        quest.status = "in-progress";
        modal.style.display = "none";
        renderQuests();
    };

    renderQuests(); // Met à jour l'affichage pour retirer le badge
}

function finishStep(id) {
    const quest = quests.find(q => q.id === id);
    if (!quest || quest.status !== "in-progress") return;

    if (quest.currentStep < quest.steps.length - 1) {
        quest.currentStep++;
        quest.newStep = true; // Active le badge "NOUVEAU"
    } else {
        quest.status = "completed";

        // Traiter les récompenses de la dernière étape
        const finalStep = quest.steps[quest.currentStep];
        finalStep.rewards.forEach(reward => {
            if (reward.type === "money") {
                addToWallet(reward.value, quest.name); // Ajoute l'argent au portefeuille
            } else if (reward.type === "xp") {
                addToXP(reward.value); // Ajoute l'XP au calculateur
            }
        });
    }

    saveQuestsToLocalStorage(); // Sauvegarde l'état des quêtes
    renderQuests();
}

function resetQuest(id) {
    const quest = quests.find(q => q.id === id);
    if (!quest || quest.status !== "completed") return;

    quest.status = "not-started";
    quest.currentStep = 0;

    saveQuestsToLocalStorage(); // Sauvegarde l'état des quêtes
    renderQuests();
}

function addToWallet(amount, transactionName) {
    let wallet = parseFloat(localStorage.getItem("wallet")) || 0;
    wallet += amount;
    localStorage.setItem("wallet", wallet);

    // Ajouter une transaction dans l'historique
    let transactionHistory = JSON.parse(localStorage.getItem("transactionHistory")) || [];
    transactionHistory.push({
        amount: amount,
        type: "gain",
        name: transactionName,
        date: new Date().toLocaleString()
    });
    localStorage.setItem("transactionHistory", JSON.stringify(transactionHistory));
}

function addToXP(amount) {
    // Récupérer les données existantes depuis le localStorage
    let totalXP = parseInt(localStorage.getItem("totalXP")) || 0;
    let currentXP = parseInt(localStorage.getItem("currentXP")) || 0;
    let currentLevel = parseInt(localStorage.getItem("currentLevel")) || 1;

    // Ajouter l'XP gagné
    totalXP += amount;
    currentXP += amount;

    // Calculer l'XP nécessaire pour le prochain niveau
    let xpForNextLevel = getXpForLevel(currentLevel);

    // Gérer les montées de niveau
    while (currentXP >= xpForNextLevel) {
        currentXP -= xpForNextLevel;
        currentLevel++;
        xpForNextLevel = getXpForLevel(currentLevel);
    }

    // Sauvegarder les nouvelles valeurs dans le localStorage
    localStorage.setItem("totalXP", totalXP);
    localStorage.setItem("currentXP", currentXP);
    localStorage.setItem("currentLevel", currentLevel);

    console.log(`XP ajouté : ${amount}. Niveau actuel : ${currentLevel}, XP actuel : ${currentXP}/${xpForNextLevel}`);
}

function getXpForLevel(level) {
    if (level >= 1 && level <= 14) return 100 * level;
    if (level >= 15 && level <= 24) return 200 * level;
    if (level >= 25 && level <= 39) return 400 * level;
    if (level >= 40 && level <= 59) return 800 * level;
    if (level >= 60 && level <= 79) return 1600 * level;
    if (level >= 80 && level <= 99) return 3200 * level;
    if (level >= 100 && level <= 119) return 6400 * level;
    if (level >= 120) return 12800 * level;
    return 0;
}

document.querySelector(".modal .close").onclick = () => {
    document.getElementById("quest-modal").style.display = "none";
};

window.onclick = event => {
    const modal = document.getElementById("quest-modal");
    if (event.target === modal) {
        modal.style.display = "none";
    }
};


// Charge les quêtes depuis le localStorage au démarrage
loadQuestsFromLocalStorage();
renderQuests();