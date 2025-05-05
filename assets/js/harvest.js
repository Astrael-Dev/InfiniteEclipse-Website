// Références des modals
const modal = document.getElementById("harvest-modal");
const resultModal = document.getElementById("harvest-result-modal");

// Boutons
const openModalBtn = document.getElementById("openModalBtn");
const closeResultModalBtn = document.getElementById("closeResultModalBtn");

// Formulaire et historique
const harvestForm = document.getElementById("harvest-form");
const historyList = document.getElementById("history-list");
let harvestHistory = JSON.parse(localStorage.getItem("harvestHistory")) || [];

// Mapping des noms des zones
const zoneNames = {
    "plaine-prélude": "Plaine du Prélude",
    "foret-damnés": "Forêt des Damnés",
    "falaises-barons": "Falaises du Baron"
};

// Données des zones
const zones = 
// Zones agricoles
{
    "plaine-prélude": {
        fruits: ["f0001", "f0003", "f0004", "f0005", "f0006"],
        légumes: ["l0001", "l0002", "l0004", "l0005", "l0007", "l0008", "l0009"],
        fleurs: ["x0001", "x0003", "x0006", "x0008", "x0009"]
    },
    "foret-damnés": {
        fruits: ["f0001", "f0004", "f0005", "f0007"],
        légumes: ["l0001", "l0003", "l0005", "l0006", "l0007", "l0008"],
        fleurs: ["x0001", "x0002", "x0006", "x0007", "x0009"]
    },
    "falaises-barons": {
        fruits: ["f0001", "f0003", "f0004", "f0005", "f0006", "f0007"],
        légumes: ["l0001", "l0002", "l0004", "l0005", "l0006", "l0007", "l0008"],
        fleurs: ["x0001", "x0003", "x0006", "x0008", "x0009"]
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

// Générer une récolte
function generateHarvest(type, zone, season) {
    const items = {
        fruit: [
            { id: "f0001", name: "Pomme", desc: "Une pomme juteuse et sucrée.", rarity: "Commun", image: "ingrédients/fruits/pomme.png", seasons: ["printemps", "été"] },
            { id: "f0002", name: "Melon Lavande", desc: "Un melon exotique au goût sucré.", rarity: "Rare", image: "ingrédients/fruits/melon_lavande.png", seasons: ["printemps", "été", "pluie"] },
            { id: "f0003", name: "Fruit Pastel", desc: "Un fruit coloré et sucré.", rarity: "Commun", image: "ingrédients/fruits/fruit_pastel.png", seasons: ["aube", "printemps", "été", "automne", "sommeil"] },
            { id: "f0004", name: "Pêche Zaytin", desc: "Une gigantesque pêche juteuse et sucrée.", rarity: "Épique", image: "ingrédients/fruits/peche_zaytin.png", seasons: ["printemps", "pluie", "automne", "hiver", "sommeil"] },
            { id: "f0005", name: "Baie Helena", desc: "Une baie rare et délicieuse.", rarity: "Légendaire", image: "ingrédients/fruits/baie_helena.png", seasons: ["printemps", "été", "automne"] },
            { id: "f0006", name: "Citron", desc: "Un citron acide et rafraîchissant.", rarity: "Peu commun", image: "ingrédients/fruits/citron.png", seasons: ["printemps", "été"] },
            { id: "f0007", name: "Myrtille", desc: "Une myrtille juteuse et sucrée.", rarity: "Commun", image: "ingrédients/fruits/myrtille.png", seasons: ["été", "pluie", "automne"] }, 

        ],
        légume: [
            { id: "l0001", name: "Carotte", desc: "Une carotte croquante et fraîche.", rarity: "Commun", image: "ingrédients/légumes/carotte.png", seasons: ["aube", "printemps", "été", "pluie", "automne", "hiver", "sommeil"] },
            { id: "l0002", name: "Tomate", desc: "Une tomate juteuse et savoureuse.", rarity: "Peu commun", image: "ingrédients/légumes/tomate.png", seasons: ["printemps", "été"] },
            { id: "l0003", name: "Citrouille", desc: "Une citrouille d'un orange éclatant.", rarity: "Rare", image: "ingrédients/légumes/citrouille.png", seasons: ["automne"] },
            { id: "l0004", name: "Chou", desc: "Un chou vert et croquant.", rarity: "Commun", image: "ingrédients/légumes/chou.png", seasons: ["aube", "printemps", "été", "pluie", "automne", "hiver", "sommeil"] },   
            { id: "l0005", name: "Radis", desc: "Un radis piquant et croquant.", rarity: "Commun", image: "ingrédients/légumes/radis.png", seasons: ["aube", "printemps", "été", "pluie", "automne", "hiver", "sommeil"] },
            { id: "l0006", name: "Ail", desc: "Un ail odorant et savoureux.", rarity: "Rare", image: "ingrédients/légumes/ail.png", seasons: ["printemps", "été"] },
            { id: "l0007", name: "Oignon", desc: "Un oignon fort et piquant.", rarity: "Commun", image: "ingrédients/légumes/oignon.png", seasons: ["aube", "printemps", "été", "pluie", "automne"] },
            { id: "l0008", name: "Poivron Cloche", desc: "Un poivron croquant et coloré.", rarity: "Peu commun", image: "ingrédients/légumes/poivron_cloche.png", seasons: ["printemps", "été", "pluie", "automne"] },
            { id: "l0009", name: "Pomme de terre", desc: "Une pomme de terre savoureuse et nourrissante.", rarity: "Commun", image: "ingrédients/légumes/pomme_de_terre.png", seasons: ["aube", "printemps", "été", "pluie", "automne", "hiver", "sommeil"] },
        ],
        fleur: [
           { id: "x0001", name: "Cécilia", desc: "Une fleur à l'arôme vanillé et délicate.", rarity: "Commun", image: "fleurs/Cecilia.png", seasons: ["aube", "printemps", "pluie", "automne"] },
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

// Soumettre le formulaire
if (harvestForm) {
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

        const entry = {
            zone,
            season,
            type,
            item: harvestedItem,
            date: new Date().toLocaleString()
        };

        harvestHistory.push(entry);
        localStorage.setItem("harvestHistory", JSON.stringify(harvestHistory));
        updateHistory();
        showHarvestResult(harvestedItem);
        closeModal(modal);
    });
}

// Afficher le résultat de la récolte
function showHarvestResult(item) {
    document.getElementById("result-img").src = item.image;
    document.getElementById("result-name").textContent = item.name;
    document.getElementById("result-desc").textContent = item.desc;
    document.getElementById("result-rarity").querySelector("span").textContent = item.rarity;

    openModal(resultModal);
}

// Mettre à jour l'historique
function updateHistory() {
    historyList.innerHTML = "";
    harvestHistory.forEach((entry) => {
        const li = document.createElement("li");

        // Ajout de la classe de rareté
        const rarityClass = `rarity-${getRarityLevel(entry.item.rarity)}`;
        li.classList.add(rarityClass);

        // Ajout du contenu avec le nom complet de la zone et l'image
        li.innerHTML = `
            <div>
                <strong>${entry.item.name}</strong> (${entry.item.rarity})<br>
                Type : ${entry.type}<br>
                Zone : ${zoneNames[entry.zone]} (${entry.season})<br>
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
    return rarityLevels[rarity] || 1; // Par défaut, "Commun"
}

// Initialisation
if (openModalBtn) {
    openModalBtn.addEventListener("click", () => openModal(modal));
}

if (closeResultModalBtn) {
    closeResultModalBtn.addEventListener("click", () => closeModal(resultModal));
}

// Charger l'historique au démarrage
updateHistory();