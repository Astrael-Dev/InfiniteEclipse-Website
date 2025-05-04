// Variables pour les modals
const modal = document.getElementById("harvest-modal");
const resultModal = document.getElementById("harvest-result-modal");
const openModalBtn = document.getElementById("openModalBtn");
const closeModalBtn = document.getElementById("closeModalBtn");
const closeResultModalBtn = document.getElementById("closeResultModalBtn");

// Variables pour le formulaire et l'historique
const harvestForm = document.getElementById("harvest-form");
const historyList = document.getElementById("history-list");

// Historique des récoltes
let harvestHistory = JSON.parse(localStorage.getItem("harvestHistory")) || [];

// Constante des zones et des objets disponibles
const zones = {
    "plaine-prélude": {
        fruits: ["f0001", "f0002"],
        légumes: ["l0001", "l0002"],
        fleurs: ["x0002"]
    },
    "foret-damnés": {
        fruits: ["f0001"],
        légumes: ["l0001"],
        fleurs: ["x0001"]
    },
    "falaises-barons": {
        fruits: ["f0003"],
        légumes: ["l0003"],
        fleurs: ["x0003"]
    }
};

// Fonction pour ouvrir un modal
function openModal(modalElement) {
    modalElement.classList.remove("hidden");
}

// Fonction pour fermer un modal
function closeModal(modalElement) {
    modalElement.classList.add("hidden");
}

// Fonction pour générer un objet récolté
function generateHarvest(type, zone, season) {
    const items = {
        fruit: [
            { id: "f0001", name: "Pomme", desc: "Une pomme juteuse et sucrée.", rarity: "Commun", image: "assets/images/pomme.png", seasons: ["printemps", "été"] },
            { id: "f0002", name: "Cerise", desc: "Une cerise rare et délicieuse.", rarity: "Rare", image: "assets/images/cerise.png", seasons: ["été"] },
            { id: "f0003", name: "Melon Lavande", desc: "Un melon exotique au goût sucré.", rarity: "Épique", image: "assets/images/melon_lavande.png", seasons: ["été", "automne"] }
        ],
        légume: [
            { id: "l0001", name: "Carotte", desc: "Une carotte croquante et fraîche.", rarity: "Commun", image: "assets/images/carotte.png", seasons: ["printemps", "automne"] },
            { id: "l0002", name: "Tomate", desc: "Une tomate juteuse et savoureuse.", rarity: "Peu commun", image: "assets/images/tomate.png", seasons: ["été"] },
            { id: "l0003", name: "Citrouille", desc: "Une citrouille d'un orange éclatant.", rarity: "Rare", image: "assets/images/citrouille.png", seasons: ["automne"] }
        ],
        fleur: [
            { id: "x0001", name: "Rose", desc: "Une rose magnifique et parfumée.", rarity: "Épique", image: "assets/images/rose.png", seasons: ["printemps"] },
            { id: "x0002", name: "Tulipe", desc: "Une tulipe commune mais élégante.", rarity: "Commun", image: "assets/images/tulipe.png", seasons: ["printemps", "été"] },
            { id: "x0003", name: "Orchidée Mystique", desc: "Une orchidée rare et envoûtante.", rarity: "Légendaire", image: "assets/images/orchidee.png", seasons: ["été", "automne"] }
        ]
    };

    // Vérifier si la zone existe dans la constante zones
    if (!zones[zone]) {
        console.error(`Zone "${zone}" non définie.`);
        return null;
    }

    // Obtenir les IDs des objets disponibles dans la zone pour le type sélectionné
    const availableIds = zones[zone][`${type}s`]; // Exemple : "fruits", "légumes", "fleurs"
    if (!availableIds) {
        console.error(`Type "${type}" non défini pour la zone "${zone}".`);
        return null;
    }

    // Filtrer les objets disponibles dans la saison sélectionnée
    const pool = items[type].filter(item => availableIds.includes(item.id) && item.seasons.includes(season));
    if (pool.length === 0) {
        return null; // Aucun objet disponible dans cette zone et saison
    }

    // Sélectionner un objet aléatoire parmi ceux disponibles
    const randomIndex = Math.floor(Math.random() * pool.length);
    return pool[randomIndex];
}

// Ouvrir le modal de récolte
openModalBtn.addEventListener("click", () => {
    openModal(modal);
});

// Fermer le modal de récolte
closeModalBtn.addEventListener("click", () => {
    closeModal(modal);
});

// Fermer le modal de résultat
closeResultModalBtn.addEventListener("click", () => {
    closeModal(resultModal);
});

// Soumettre le formulaire
harvestForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const zone = document.getElementById("zone").value;
    const season = document.getElementById("season").value;
    const type = document.getElementById("type").value;

    const harvestedItem = generateHarvest(type, zone, season);

    if (!harvestedItem) {
        alert("Aucun objet disponible dans cette zone et saison pour le type sélectionné.");
        return;
    }

    // Ajouter au localStorage
    const entry = {
        zone,
        season,
        type,
        item: harvestedItem,
        date: new Date().toLocaleString()
    };

    harvestHistory.push(entry);
    localStorage.setItem("harvestHistory", JSON.stringify(harvestHistory));

    // Mettre à jour l'historique
    updateHistory();

    // Afficher le résultat dans le modal
    showHarvestResult(harvestedItem);

    // Fermer le modal de récolte
    closeModal(modal);
});

// Fonction pour afficher le résultat de la récolte
function showHarvestResult(item) {
    const resultImg = document.getElementById("result-img");
    const resultName = document.getElementById("result-name");
    const resultDesc = document.getElementById("result-desc");
    const resultRarity = document.getElementById("result-rarity");

    resultImg.src = item.image;
    resultName.textContent = item.name;
    resultDesc.textContent = item.desc;
    resultRarity.querySelector("span").textContent = item.rarity;

    openModal(resultModal);
}

// Mettre à jour l'historique
function updateHistory() {
    historyList.innerHTML = "";
    harvestHistory.forEach((entry) => {
        const li = document.createElement("li");
        li.innerHTML = `
            <strong>${entry.item.name}</strong> (${entry.item.rarity}) - ${entry.type} récolté en ${entry.zone} (${entry.season}) le ${entry.date}
        `;
        historyList.appendChild(li);
    });
}

// Charger l'historique au démarrage
updateHistory();