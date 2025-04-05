const quests = [
    {
        id: 1,
        name: "La menace des plaines",
        image: "https://i.pinimg.com/736x/4e/41/a4/4e41a41ef580d96e0c1f82d4475a4e6d.jpg",
        location: "Plaine du Prélude",
        steps: [
            {
                objectives: ["Tuer 10 Gobelins", "Explorer la zone"],
                description: "Une meute de loups menace les villageois. Réduisez leur nombre et explorez la zone.",
                rewards: "10 XP"
            },
            {
                objectives: ["Récupérer 5 peaux de loup", "Retourner au village"],
                description: "Récupérez les peaux des loups pour les villageois et retournez au village.",
                rewards: "40 pièces d'or"
            }
        ],
        status: "not-started",
        currentStep: 0,
        newStep: false // Indique si une nouvelle étape a été atteinte
    },
    {
        id: 2,
        name: "Trouver l'épée perdue",
        image: "https://i.pinimg.com/736x/4e/41/a4/4e41a41ef580d96e0c1f82d4475a4e6d.jpg",
        location: "Caverne oubliée",
        steps: [
            {
                objectives: ["Explorer la caverne", "Éviter les pièges"],
                description: "Trouvez l'entrée de la caverne, explorez-la et évitez les pièges.",
                rewards: "20 XP"
            },
            {
                objectives: ["Récupérer l'épée", "Échapper à la caverne"],
                description: "Récupérez l'épée légendaire cachée dans la caverne et échappez-vous.",
                rewards: "80 pièces d'or"
            }
        ],
        status: "not-started",
        currentStep: 0,
        newStep: false // Indique si une nouvelle étape a été atteinte
    },
    {
        id: 3,
        name: "Sauver le village",
        image: "https://i.pinimg.com/736x/4e/41/a4/4e41a41ef580d96e0c1f82d4475a4e6d.jpg",
        location: "Village en feu",
        steps: [
            {
                objectives: ["Éteindre les flammes", "Protéger les villageois"],
                description: "Utilisez des seaux d'eau pour éteindre les flammes et protégez les villageois.",
                rewards: "30 XP"
            },
            {
                objectives: ["Aider les villageois", "Reconstruire les maisons"],
                description: "Aidez les villageois à évacuer leurs biens et commencez à reconstruire les maisons.",
                rewards: "100 pièces d'or"
            }
        ],
        status: "not-started",
        currentStep: 0,
        newStep: false // Indique si une nouvelle étape a été atteinte
    }
];

// Sauvegarde des quêtes dans le localStorage
function saveQuestsToLocalStorage() {
    localStorage.setItem("quests", JSON.stringify(quests));
}

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
        questCard.style.position = "relative"; // Nécessaire pour positionner le badge

        // Vérifie si l'image est accessible
        const img = new Image();
        img.src = quest.image;
        img.onload = () => {
            questCard.style.backgroundImage = `
                linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.8)), 
                url('${quest.image}')
            `;
            questCard.style.backgroundSize = "cover";
            questCard.style.backgroundPosition = "center";
        };
        img.onerror = () => {
            console.error(`Image not found: ${quest.image}`);
        };

        // Badge "NOUVEAU" si une nouvelle étape a été atteinte
        if (quest.newStep) {
            const newBadge = document.createElement("div");
            newBadge.classList.add("new-badge");
            newBadge.textContent = "NOUVEAU";
            questCard.appendChild(newBadge);
        }

        questCard.innerHTML += `
            <h3>${quest.name}</h3>
            <button onclick="showQuestDetails(${quest.id})">Voir les détails</button>
        `;

        if (quest.status === "not-started") {
            notStartedContainer.appendChild(questCard);
        } else if (quest.status === "in-progress") {
            const finishStepButton = document.createElement("button");
            finishStepButton.textContent = quest.currentStep < quest.steps.length - 1
                ? `Terminer l'étape ${quest.currentStep + 1}`
                : "Terminer la quête";
            finishStepButton.onclick = () => finishStep(quest.id);
            questCard.appendChild(finishStepButton);
            inProgressContainer.appendChild(questCard);
        } else if (quest.status === "completed") {
            const resetButton = document.createElement("button");
            resetButton.textContent = "Annuler la finalité";
            resetButton.onclick = () => resetQuest(quest.id);
            questCard.appendChild(resetButton);
            completedContainer.appendChild(questCard);
        }
    });
}

function showQuestDetails(id) {
    const quest = quests.find(q => q.id === id);
    if (!quest) return;

    const currentStep = quest.steps[quest.currentStep];

    // Titre de la quête
    document.getElementById("quest-title").textContent = quest.name;

    // Lieu de la quête
    document.getElementById("quest-location").textContent = quest.location;

    // Objectifs de l'étape actuelle
    document.getElementById("quest-objectives").innerHTML = `<li>${currentStep.objectives}</li>`;

    // Description spécifique à l'étape actuelle
    document.getElementById("quest-description").textContent = currentStep.description;

    // Récompenses de l'étape actuelle
    document.getElementById("quest-rewards").textContent = currentStep.rewards;

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