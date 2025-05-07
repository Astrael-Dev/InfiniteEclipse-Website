// Références des modals
const modal = document.getElementById("harvest-modal");
const resultModal = document.getElementById("harvest-result-modal");
const miningZoneModal = document.getElementById("mining-zone-modal");
const miningGameModal = document.getElementById("mining-game-modal");

// Boutons
const openModalBtn = document.getElementById("openModalBtn");
const openMiningZoneModalBtn = document.getElementById("OpenMineBtn");
const closeResultModalBtn = document.getElementById("closeResultModalBtn");

// Formulaire et historique
const harvestForm = document.getElementById("harvest-form");
const miningZoneForm = document.getElementById("mining-zone-form");
const historyList = document.getElementById("history-list");
let harvestHistory = JSON.parse(localStorage.getItem("harvestHistory")) || [];

// Références pour le mini-jeu
const miningRock = document.getElementById("mining-rock");
const miningPickaxe = document.getElementById("mining-pickaxe");
const clicksLeftDisplay = document.getElementById("clicks-left");

// Référence pour le son de minage
const miningSound = document.getElementById("mining-sound");

let clicksLeft = 4; // Nombre de clics nécessaires pour casser la pierre
let selectedMiningZone = ""; // Zone sélectionnée pour le minage
let rockStages = [
    "assets/images/rock_normal.png",
    "assets/images/rock_crack1.png",
    "assets/images/rock_crack2.png",
    "assets/images/rock_crack3.png"
];

// Référence pour l'endurance
let totalEnduranceLost = 0; // Endurance totale perdue

// Mapping des noms des zones
const zoneNames = {
    "plaine-prélude": "Plaine du Prélude",
    "foret-damnés": "Forêt des Damnés",
    "falaises-baron": "Falaises du Baron",
    "grotte-rivage": "Grotte du Rivage",
};

// Données des zones
const zones = {
    "plaine-prélude": {
        fruits: ["f0001", "f0003", "f0004", "f0005", "f0006"],
        légumes: ["l0001", "l0002", "l0004", "l0005", "l0007", "l0008", "l0009"],
        fleurs: ["x0001", "x0003", "x0006", "x0008", "x0009"],
    },
    "foret-damnés": {
        fruits: ["f0001", "f0004", "f0005", "f0007"],
        légumes: ["l0001", "l0003", "l0005", "l0006", "l0007", "l0008"],
        fleurs: ["x0001", "x0002", "x0006", "x0007", "x0009"],
    },
    "falaises-barons": {
        fruits: ["f0001", "f0003", "f0004", "f0005", "f0006", "f0007"],
        légumes: ["l0001", "l0002", "l0004", "l0005", "l0006", "l0007", "l0008"],
        fleurs: ["x0001", "x0003", "x0006", "x0008", "x0009"],
    },
    "grotte-rivage": {
        minerais: ["m0001", "m0002", "m0003", "m0004", "m0006", "m0007"],
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

function getRandomEnduranceLoss() {
    return Math.floor(Math.random() * (8 - 2 + 1)) + 2; // Entre 2 et 8
}

function getHarvestEnduranceLoss() {
    return Math.floor(Math.random() * (5 - 1 + 1)) + 1; // Entre 1 et 5
}

// Générer une récolte
function generateHarvest(type, zone, season) {
    const items = {
        fruit: [
            { id: "f0001", name: "Pomme", desc: "Une pomme juteuse et sucrée.", rarity: "Commun", image: "ingrédients/fruits/pomme.png", seasons: ["printemps", "été"] },
            { id: "f0002", name: "Melon Lavande", desc: "Un melon exotique au goût sucré.", rarity: "Rare", image: "ingrédients/fruits/melon_lavande.png", seasons: ["printemps", "été", "pluie"] },
            { id: "f0003", name: "Fruit Pastel", desc: "Un fruit coloré et sucré.", rarity: "Commun", image: "ingrédients/fruits/fruit_pastel.png", seasons: ["aube", "printemps", "été", "automne", "sommeil"] },
            { id: "f0004", name: "Pêche Zaytin", desc: "Une gigantesque pêche juteuse et sucrée.", rarity: "Épique", image: "ingrédients/fruits/peche_zaytin.png", seasons: ["printemps", "pluie", "automne", "hiver", "sommeil"] },
            { id: "f0005", name: "Baie Helena", desc: "Une baie rare et délicieuse.", rarity: "Commun", image: "ingrédients/fruits/baie_helena.png", seasons: ["printemps", "été", "automne"] },
            { id: "f0006", name: "Citron", desc: "Un citron acide et rafraîchissant.", rarity: "Peu commun", image: "ingrédients/fruits/citron.png", seasons: ["printemps", "été"] },
            { id: "f0007", name: "Myrtille", desc: "Une myrtille juteuse et sucrée.", rarity: "Commun", image: "ingrédients/fruits/myrtille.png", seasons: ["été", "pluie", "automne"] },
        ],
        légume: [
            { id: "l0001", name: "Carotte", desc: "Une carotte croquante et fraîche.", rarity: "Commun", image: "ingrédients/légumes/carotte.png", seasons: ["printemps", "été"] },
            { id: "l0002", name: "Tomate", desc: "Une tomate juteuse et savoureuse.", rarity: "Peu commun", image: "ingrédients/légumes/tomate.png", seasons: ["printemps", "été"] },
            { id: "l0003", name: "Citrouille", desc: "Une citrouille d'un orange éclatant.", rarity: "Rare", image: "ingrédients/légumes/citrouille.png", seasons: ["automne"] },
            { id: "l0004", name: "Chou", desc: "Un chou vert et croquant.", rarity: "Commun", image: "ingrédients/légumes/chou.png", seasons: ["aube", "printemps", "été", "pluie", "automne", "hiver", "sommeil"] },
            { id: "l0005", name: "Radis", desc: "Un radis piquant et croquant.", rarity: "Commun", image: "ingrédients/légumes/radis.png", seasons: ["aube", "printemps", "été", "pluie", "automne", "hiver", "sommeil"] },
            { id: "l0006", name: "Ail", desc: "Un ail odorant et savoureux.", rarity: "Rare", image: "ingrédients/légumes/ail.png", seasons: ["printemps", "été"] },
            { id: "l0007", name: "Oignon", desc: "Un oignon fort et piquant.", rarity: "Commun", image: "ingrédients/légumes/oignon.png", seasons: ["aube", "printemps", "été", "pluie", "automne"] },
            { id: "l0008", name: "Poivron Cloche", desc: "Un poivron croquant et coloré.", rarity: "Peu commun", image: "ingrédients/légumes/poivron_cloche.png", seasons: ["printemps", "été", "pluie", "automne"] },
        ],
        fleur: [
            { id: "x0001", name: "Cécilia", desc: "Une fleur à l'arôme vanillé et délicate.", rarity: "Commun", image: "fleurs/Cecilia.png", seasons: ["printemps"] },
            { id: "x0002", name: "Cendrodium", desc: "Le témoignage sanglant d'une guerre, on l'appelle la 'Fleur de Sang'.", rarity: "Légendaire", image: "fleurs/Cendrodium.png", seasons: ["pluie", "automne", "hiver", "sommeil"] },
            { id: "x0003", name: "Alcanaées à grandes feuille", desc: "Les Alcanaées à grande feuille sont des fleurs délicates et élégantes", rarity: "Rare", image: "fleurs/Alcanaees-grandes-feuilles.png", seasons: ["aube", "printemps", "été", "automne"] },
            { id: "x0004", name: "Lotus Kalpalate", desc: "Le Lotus Kalpalate est une fleur rare et précieuse qui pousse dans les eaux tropicales, où les courants, qu'ils soient puissants ou paisibles.", rarity: "Épique", image: "fleurs/Lotus-Kalpalate.png", seasons: ["aube", "printemps", "été", "pluie", "sommeil"] },
            { id: "x0005", name: "Lotus Niloplat", desc: "Le Lotus Niloplat, surnommé 'Berceau des Lucioles' pour sa lueur magique qui illumine les nuits sombres.", rarity: "Épique", image: "fleurs/Lotus-Niloplat.png", seasons: ["printemps", "pluie", "automne", "sommeil"] },
            { id: "x0006", name: "Fleur du Deuil", desc: "La Fleur du Deuil est une plante rare et précieuse, connue pour sa beauté délicate et son parfum envoûtant.", rarity: "Rare", image: "fleurs/Fleur-Deuil.png", seasons: ["aube", "printemps", "été", "pluie", "sommeil"] },
            { id: "x0007", name: "Fleur de Soie", desc: "La Fleur de Soie est une plante remarquable, dont les pétales délicats produisent une fibre semblable au coton.", rarity: "Rare", image: "fleurs/Fleur-Soie.png", seasons: ["aube", "printemps", "été", "automne"] },
            { id: "x0008", name: "Rose des Nuances", desc: "La Rose des nuances est une fleur remarquable qui prospère sur les falaises tempérées, là où les vents et l'air salin façonnent son environnement.", rarity: "Peu commun", image: "fleurs/Rose-Nuances.png", seasons: ["aube", "printemps", "été", "automne"] },
            { id: "x0009", name: "Trompettes Violettes", desc: "Les Trompettes Violettes sont des fleurs délicates et parfumées qui poussent dans les zones tempérées.", rarity: "Peu commun", image: "fleurs/Trompettes-violettes.png", seasons: ["aube", "printemps", "été", "pluie", "automne", "sommeil"] },
        ]
    };

    if (!zones[zone]) return null;
    const availableIds = zones[zone][`${type}s`];
    if (!availableIds) return null;

    const pool = items[type].filter(item =>
        availableIds.includes(item.id) && item.seasons.includes(season)
    );
    if (pool.length === 0) return null;

    const randomIndex = Math.floor(Math.random() * pool.length);
    return pool[randomIndex];
}

if (harvestForm) {
    harvestForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const zone = document.getElementById("zone").value;
        const season = document.getElementById("season").value;
        const type = document.getElementById("type").value;

        console.log(`Zone: ${zone}, Season: ${season}, Type: ${type}`); // Vérification des valeurs

        const harvestedItem = generateHarvest(type, zone, season);

        if (!harvestedItem) {
            alert("Aucun objet disponible dans cette zone et saison pour le type sélectionné.");
            return;
        }

        // Calculer l'endurance perdue
        const enduranceLost = getHarvestEnduranceLoss();

        // Ajouter l'endurance perdue au modal des résultats
        const resultModal = document.getElementById("harvest-result-modal");
        const enduranceInfo = document.createElement("p");
        enduranceInfo.textContent = `Endurance totale perdue : ${enduranceLost}`;
        enduranceInfo.style.color = "yellow";
        enduranceInfo.style.fontWeight = "bold";
        document.querySelector(".result-text").appendChild(enduranceInfo);

        addToHistory(type, zone, harvestedItem);
        displayHarvestResult(harvestedItem);
    });
}

function displayHarvestResult(item) {
    // Fermer le modal de récolte
    closeModal(document.getElementById("harvest-modal"));

    // Mettre à jour les informations du résultat
    const resultImg = document.getElementById("result-img");
    const resultName = document.getElementById("result-name");
    const resultDesc = document.getElementById("result-desc");
    const resultRarity = document.getElementById("result-rarity").querySelector("span");
    const resultText = document.querySelector(".result-text");

    // Réinitialiser les anciennes informations d'endurance
    const oldEnduranceInfo = resultText.querySelector("p.endurance-info");
    if (oldEnduranceInfo) {
        resultText.removeChild(oldEnduranceInfo);
    }

    resultImg.src = item.image;
    resultImg.alt = item.name;
    resultName.textContent = item.name;
    resultDesc.textContent = item.desc;
    resultRarity.textContent = item.rarity;

    // Utiliser getRandomEnduranceLoss pour calculer l'endurance perdue
    const enduranceLost = getRandomEnduranceLoss();
    const enduranceInfo = document.createElement("p");
    enduranceInfo.textContent = `Endurance totale perdue : ${enduranceLost}`;
    enduranceInfo.style.color = "yellow";
    enduranceInfo.style.fontWeight = "bold";
    enduranceInfo.classList.add("endurance-info");
    resultText.appendChild(enduranceInfo);

    // Ajouter l'objet à l'inventaire
    addToInventory(item);

    // Ouvrir le modal de résultat
    openModal(resultModal);
}
// Fonction pour obtenir un minerai aléatoire
function getRandomMineral() {
    // Vérifier si la zone sélectionnée contient des minerais
    if (!zones[selectedMiningZone] || !zones[selectedMiningZone].minerais) {
        console.error("Aucun minerai disponible dans cette zone.");
        return null;
    }

    // Obtenir les IDs des minerais disponibles dans la zone
    const availableMineralIds = zones[selectedMiningZone].minerais;

    // Filtrer les minerais pour ne garder que ceux autorisés dans la zone
    const minerals = [
        { id: "m0001", name: "Fer", desc: "Un minerai de fer brut.", rarity: "Commun", image: "minerais/fer.png", chance: 33 },
        { id: "m0002", name: "Améthyste", desc: "Un minerai d'améthyste rare.", rarity: "Rare", image: "minerais/amethyste.png", chance: 20 },
        { id: "m0003", name: "Argent", desc: "Un minerai d'argent précieux.", rarity: "Rare", image: "minerais/argent.png", chance: 20 },
        { id: "m0004", name: "Charbon", desc: "Un minerai de charbon.", rarity: "Commun", image: "minerais/charbon.png", chance: 33 },
        { id: "m0005", name: "Diamant", desc: "Un minerai de diamant exceptionnel.", rarity: "Épique", image: "minerais/diamant.png", chance: 15 },
        { id: "m0006", name: "Galène Prismique", desc: "Un minerai de galène prismatique.", rarity: "Épique", image: "minerais/galene_prismique.png", chance: 15 },
        { id: "m0007", name: "Géoplaste", desc: "Un minerai de géoplaste.", rarity: "Rare", image: "minerais/geoplaste.png", chance: 20 },
        { id: "m0008", name: "Rubis", desc: "Un minerai de rubis précieux.", rarity: "Épique", image: "minerais/rubis.png", chance: 15 },
        { id: "m0009", name: "Turbonéite", desc: "Un minerai de turbonéite.", rarity: "Légendaire", image: "minerais/turboneite.png", chance: 5 },
        { id: "m0010", name: "Zéphénéolite", desc: "Un minerai de zéphénéolite aux nuances azures.", rarity: "Légendaire", image: "minerais/zephenolite.png", chance: 5 },
    ].filter(mineral => availableMineralIds.includes(mineral.id));

    // Calculer la chance totale
    const totalChance = minerals.reduce((sum, mineral) => sum + mineral.chance, 0);
    const random = Math.random() * totalChance;

    // Sélectionner un minerai en fonction de la chance
    let cumulativeChance = 0;
    for (const mineral of minerals) {
        cumulativeChance += mineral.chance;
        if (random <= cumulativeChance) {
            return mineral;
        }
    }

    return minerals[0]; // Par défaut, retourne le premier minerai si aucune correspondance
}


// Soumettre le formulaire de sélection de zone de minage
if (miningZoneForm) {
    miningZoneForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const miningZone = document.getElementById("mining-zone").value;

        // Vérifier si la zone contient des minerais
        if (!zones[miningZone] || !zones[miningZone].minerais || zones[miningZone].minerais.length === 0) {
            alert("Aucun minerai ne se trouve dans cette zone.");
            return;
        }

        // Fermer le modal de sélection de zone
        closeModal(miningZoneModal);

        // Ouvrir le modal du mini-jeu de minage
        openModal(miningGameModal);

        // Réinitialiser les variables du mini-jeu
        resetMiningGame();
    });
}

// Fonction pour réinitialiser le mini-jeu de minage
function resetMiningGame() {
    clicksLeft = 4; // Réinitialiser le nombre de clics
    selectedMiningZone = document.getElementById("mining-zone").value; // Mettre à jour la zone sélectionnée
    miningRock.src = rockStages[0]; // Réinitialiser l'image de la pierre
    clicksLeftDisplay.textContent = clicksLeft; // Mettre à jour l'affichage des clics restants
}

if (miningRock) {
    miningRock.addEventListener("click", (e) => {
        if (clicksLeft > 0) {
            // Mettre à jour l'image de la pierre en fonction des clics restants
            const stageIndex = rockStages.length - clicksLeft;
            if (stageIndex >= 0 && stageIndex < rockStages.length) {
                miningRock.src = rockStages[stageIndex];
            }

            clicksLeft--; // Réduire le nombre de clics restants
            clicksLeftDisplay.textContent = clicksLeft; // Mettre à jour l'affichage

            // Calculer l'endurance perdue
            const enduranceLost = getRandomEnduranceLoss();
            totalEnduranceLost += enduranceLost;

            // Afficher le message flottant
            const rect = miningRock.getBoundingClientRect();
            showFloatingMessage(`-${enduranceLost} Endurance`, rect.left + rect.width / 2, rect.top);

            // Ajouter la classe active à la pioche pour l'animation
            miningPickaxe.classList.add("active");
            setTimeout(() => {
                miningPickaxe.classList.remove("active");
            }, 200); // Retirer la classe après 200ms

            // Jouer le son de minage
            if (miningSound) {
                miningSound.currentTime = 0; // Réinitialiser le son
                miningSound.play();
            }

            // Vérifier si la pierre est cassée
            if (clicksLeft === 0) {
                const minedItem = getRandomMineral(); // Obtenir un minerai aléatoire
                addToHistory("minage", selectedMiningZone, minedItem); // Ajouter à l'historique
                displayMiningResult(minedItem); // Afficher le résultat
            }
        }
    });
}

// Mise à jour de la fonction displayMiningResult
function displayMiningResult(item) {
    // Mettre à jour les informations du résultat
    const resultImg = document.getElementById("result-img");
    const resultName = document.getElementById("result-name");
    const resultDesc = document.getElementById("result-desc");
    const resultRarity = document.getElementById("result-rarity").querySelector("span");
    const resultText = document.querySelector(".result-text");

    // Réinitialiser les anciennes informations d'endurance
    const oldEnduranceInfo = resultText.querySelector("p.endurance-info");
    if (oldEnduranceInfo) {
        resultText.removeChild(oldEnduranceInfo);
    }

    resultImg.src = item.image;
    resultImg.alt = item.name;
    resultName.textContent = item.name;
    resultDesc.textContent = item.desc;
    resultRarity.textContent = item.rarity;

    // Ajouter l'endurance totale perdue
    const enduranceInfo = document.createElement("p");
    enduranceInfo.textContent = `Endurance totale perdue : ${totalEnduranceLost}`;
    enduranceInfo.style.color = "yellow";
    enduranceInfo.style.fontWeight = "bold";
    enduranceInfo.classList.add("endurance-info");
    resultText.appendChild(enduranceInfo);

    // Fermer le modal du mini-jeu
    closeModal(miningGameModal);

    // Ouvrir le modal de résultat
    openModal(resultModal);

    // Ajouter l'objet à l'inventaire
    addToInventory(item);

    // Réinitialiser l'endurance totale perdue
    totalEnduranceLost = 0;
}

// Ajouter un objet à l'historique
function addToHistory(type, zone, item) {
    const entry = {
        zone,
        type,
        item,
        date: new Date().toLocaleString()
    };

    harvestHistory.push(entry);
    localStorage.setItem("harvestHistory", JSON.stringify(harvestHistory));
    updateHistory();
}

// Mettre à jour l'historique
function updateHistory() {
    historyList.innerHTML = "";
    harvestHistory.forEach((entry) => {
        const li = document.createElement("li");

        const rarityClass = `rarity-${getRarityLevel(entry.item.rarity)}`;
        li.classList.add(rarityClass);

        li.innerHTML = `
            <div>
                <strong>${entry.item.name}</strong> (${entry.item.rarity})<br>
                Type : ${entry.type}<br>
                Zone : ${zoneNames[entry.zone]}<br>
                Date : ${entry.date}
            </div>
            <img src="${entry.item.image}" alt="${entry.item.name}">
        `;
        historyList.appendChild(li);
    });
}

// Fonction pour réinitialiser l'historique
function eraseHarvestHistory() {
    if (confirm("Êtes-vous sûr de vouloir réinitialiser l'historique ?")) {
        harvestHistory = [];
        localStorage.removeItem("harvestHistory");
        updateHistory();
    }
}

// Fonction pour obtenir le niveau de rareté
function getRarityLevel(rarity) {
    const rarityLevels = {
        "Commun": 1,
        "Peu commun": 2,
        "Rare": 3,
        "Épique": 4,
        "Légendaire": 5,
        "Mythique": 6
    };
    return rarityLevels[rarity] || 1;
}

// Initialisation
if (openModalBtn) {
    openModalBtn.addEventListener("click", () => openModal(modal));
}

if (openMiningZoneModalBtn) {
    openMiningZoneModalBtn.addEventListener("click", () => {
        openModal(miningZoneModal);
    });
}

if (closeResultModalBtn) {
    closeResultModalBtn.addEventListener("click", () => closeModal(resultModal));
}

function showFloatingMessage(message, x, y) {
    const floatingMessage = document.createElement("div");
    floatingMessage.textContent = message;
    floatingMessage.style.position = "absolute";
    floatingMessage.style.left = `${x}px`;
    floatingMessage.style.top = `${y}px`;
    floatingMessage.style.color = "yellow";
    floatingMessage.style.fontWeight = "bold";
    floatingMessage.style.zIndex = "1000";
    floatingMessage.style.transition = "all 1s ease";
    document.body.appendChild(floatingMessage);

    setTimeout(() => {
        floatingMessage.style.opacity = "0";
        floatingMessage.style.transform = "translateY(-50px)";
    }, 0);

    setTimeout(() => {
        document.body.removeChild(floatingMessage);
    }, 1000);
}

// Fonction pour ajouter un objet à l'inventaire
function addToInventory(item) {
    const inventories = JSON.parse(localStorage.getItem('inventories')) || {};
    const currentInventory = localStorage.getItem('currentInventory') || 'default';

    // Vérifiez si l'inventaire actuel existe, sinon créez-le
    if (!inventories[currentInventory]) {
        inventories[currentInventory] = {};
    }

    // Ajoutez l'objet à l'inventaire
    if (!inventories[currentInventory][item.name]) {
        inventories[currentInventory][item.name] = {
            quantity: 0,
            imageUrl: item.image,
            type: item.type || "Objet",
            subType: item.subType || "Divers",
            rarity: item.rarity,
            value: item.value || 0,
        };
    }
    inventories[currentInventory][item.name].quantity += 1;

    // Sauvegardez l'inventaire dans le localStorage
    localStorage.setItem('inventories', JSON.stringify(inventories));
    alert(`${item.name} a été ajouté à votre inventaire.`);
}

// Mise à jour de la fonction displayHarvestResult
function displayHarvestResult(item) {
    // Fermer le modal de récolte
    closeModal(document.getElementById("harvest-modal"));

    // Mettre à jour les informations du résultat
    const resultImg = document.getElementById("result-img");
    const resultName = document.getElementById("result-name");
    const resultDesc = document.getElementById("result-desc");
    const resultRarity = document.getElementById("result-rarity").querySelector("span");
    const resultText = document.querySelector(".result-text");

    // Réinitialiser les anciennes informations d'endurance
    const oldEnduranceInfo = resultText.querySelector("p.endurance-info");
    if (oldEnduranceInfo) {
        resultText.removeChild(oldEnduranceInfo);
    }

    resultImg.src = item.image;
    resultImg.alt = item.name;
    resultName.textContent = item.name;
    resultDesc.textContent = item.desc;
    resultRarity.textContent = item.rarity;

    // Ajouter l'endurance totale perdue
    const enduranceLost = getHarvestEnduranceLoss();
    const enduranceInfo = document.createElement("p");
    enduranceInfo.textContent = `Endurance totale perdue : ${enduranceLost}`;
    enduranceInfo.style.color = "yellow";
    enduranceInfo.style.fontWeight = "bold";
    enduranceInfo.classList.add("endurance-info");
    resultText.appendChild(enduranceInfo);

    // Ajouter l'objet à l'inventaire
    addToInventory(item);

    // Ouvrir le modal de résultat
    openModal(resultModal);
}
// Charger l'historique au démarrage
updateHistory();