const lootTable = {
    common: ['Commun', 'Peu commun', 'Rare'],
    rare: ['Peu commun', 'Rare', 'Épique'],
    epic: ['Rare', 'Épique', 'Légendaire'],
    legendary: ['Épique', 'Légendaire', 'Mythique']
};

const slotMachineSound = new Audio('sons/slot-machine.mp3');
const winSequence1Sound = new Audio('sons/you-win-sequence1.mp3');
const winSequence2Sound = new Audio('sons/you-win-sequence2.mp3');
const winSequence3Sound = new Audio('sons/you-win-sequence3.mp3');

// Vérifie si un coffre est dans l'inventaire
function hasChestInInventory(chestName) {
    const inventory = JSON.parse(localStorage.getItem('inventories')) || {};
    const currentInventory = localStorage.getItem('currentInventory') || 'default';
    const items = inventory[currentInventory] || {};

    // Vérifie si un coffre avec un nom similaire existe (insensible à la casse)
    return Object.keys(items).some(itemName => itemName.toLowerCase() === chestName.toLowerCase());
}

// Ouvre un coffre si présent dans l'inventaire
function openChest(chestType) {
    const chestNames = {
        common: "Coffre Commun",
        rare: "Coffre Rare",
        epic: "Coffre Épique",
        legendary: "Coffre Légendaire"
    };

    const chestName = chestNames[chestType];

    if (!hasChestInInventory(chestName)) {
        alert("Ce coffre ne figure pas dans votre inventaire.");
        return;
    }

    // Retirer le coffre de l'inventaire
    removeItemFromInventory(chestName, 1);

    // Générer le butin et ouvrir le modal de slot machine
    const lootRarities = lootTable[chestType];
    const lootItem = generateLootItem(lootRarities[Math.floor(Math.random() * lootRarities.length)]);
    slotMachineSound.play();
    openModal(lootItem, lootRarities);
}

// Achète un coffre avec des Éclats du Crépuscule
function buyChest(chestName, price) {
    const currentShards = parseInt(localStorage.getItem('eclipseShards')) || 0;

    if (currentShards < price) {
        alert("Vous n'avez pas assez d'Éclats du Crépuscule pour acheter ce coffre.");
        return;
    }

    // Déduire les Éclats du Crépuscule
    localStorage.setItem('eclipseShards', currentShards - price);
    loadCurrencies();

    // Ajouter le coffre à l'inventaire
    addItemToInventory(chestName, 1);
    alert(`Vous avez acheté un ${chestName} !`);
}

// Ajoute un objet à l'inventaire
function addItemToInventory(itemName, quantity) {
    const inventory = JSON.parse(localStorage.getItem('inventories')) || {};
    const currentInventory = localStorage.getItem('currentInventory') || 'default';

    if (!inventory[currentInventory]) {
        inventory[currentInventory] = {};
    }

    if (!inventory[currentInventory][itemName]) {
        inventory[currentInventory][itemName] = { quantity: 0 };
    }

    inventory[currentInventory][itemName].quantity += quantity;
    localStorage.setItem('inventories', JSON.stringify(inventory));
}

// Retire un objet de l'inventaire
function removeItemFromInventory(itemName, quantity) {
    const inventory = JSON.parse(localStorage.getItem('inventories')) || {};
    const currentInventory = localStorage.getItem('currentInventory') || 'default';

    if (inventory[currentInventory] && inventory[currentInventory][itemName]) {
        if (inventory[currentInventory][itemName].quantity > quantity) {
            inventory[currentInventory][itemName].quantity -= quantity;
        } else {
            delete inventory[currentInventory][itemName];
        }
    }

    localStorage.setItem('inventories', JSON.stringify(inventory));
}

// Génère un objet de butin en fonction de la rareté
function generateLootItem(rarity) {
    const items = {
        'Commun': [
            { name: 'Marteau Lourd en Fer', type: 'Arme', value: 4000, rarity: 'Commun', imageUrl: 'https://i.postimg.cc/0NwX9fRC/image.png' },
            { name: 'Jumeaux Millénaires', type: 'Arme', value: 8000, rarity: 'Commun', imageUrl: 'https://i.postimg.cc/JzZy1VFd/image.png' },
            { name: 'Lance en Titane', type: 'Arme', value: 7000, rarity: 'Commun', imageUrl: 'https://i.postimg.cc/d0QJgbcC/image.png' },
            { name: 'Arc Tribal', type: 'Arme', value: 6000, rarity: 'Commun', imageUrl: 'https://i.postimg.cc/0NXVPwFf/image.png' },
            { name: 'Épée Miteuse', type: 'Arme', value: 110, rarity: 'Commun', imageUrl: 'https://i.postimg.cc/Sx3fxmjC/image.png' },
            { name: 'Épée des Brises', type: 'Arme', value: 150, rarity: 'Commun', imageUrl: 'https://i.postimg.cc/VLFNNvhb/image.png' },
            { name: 'Épée de Gelée', type: 'Arme', value: 200, rarity: 'Commun', imageUrl: 'https://i.postimg.cc/tRWQXcc1/image.png' },
            { name: 'Arachno-Épée', type: 'Arme', value: 1500, rarity: 'Commun', imageUrl: 'https://i.postimg.cc/fW02Zh1X/image.png' },
            { name: 'Masse à Pointes Gobelin', type: 'Arme', value: 200, rarity: 'Commun', imageUrl: 'https://i.postimg.cc/TYH3bFRR/image.png' },
            { name: 'Chapeau Blanc', type: 'Armure', value: 1000, rarity: 'Commun', imageUrl: 'https://i.postimg.cc/qRwHj9nD/image.png' }, 
            { name: 'Cape Violette', type: 'Armure', value: 700, rarity: 'Commun', imageUrl: 'https://i.postimg.cc/XY149ZdG/image.png' },
            { name: 'Bottes en cuir', type: 'Armure', value: 500, rarity: 'Commun', imageUrl: 'https://i.postimg.cc/vZGLCp5r/image.png' },
            { name: 'Vieilles Bottes', type: 'Armure', value: 200, rarity: 'Commun', imageUrl: 'https://i.postimg.cc/KvRqvKz9/image.png' },
            { name: 'Dé de Prédilection', type: 'Artéfact', value: 2000, rarity: 'Commun', imageUrl: 'https://i.postimg.cc/BZrqHZQM/image.png' },
            { name: 'Coupe du Crâne', type: 'Artéfact', value: 1000, rarity: 'Commun', imageUrl: 'https://i.postimg.cc/prpgy6Sm/image.png' },
            { name: 'Fiole d`Énergie', type: 'Artéfact', value: 500, rarity: 'Commun', imageUrl: 'https://i.postimg.cc/vZFfq6bj/image.png' },
            { name: 'Petite Potion de Magie', type: 'Consommable', value: 50, rarity: 'Commun', imageUrl: 'https://i.postimg.cc/GtkQmPjW/image.png' },
            { name: 'Petite Potion de Vie', type: 'Consommable', value: 50, rarity: 'Commun', imageUrl: 'https://i.postimg.cc/DzJz97FN/image.png' },
        ],
        'Peu commun': [
            { name: 'Hâche de Maître', type: 'Arme', value: 7000, rarity: 'Peu commun', imageUrl: 'https://i.postimg.cc/tRkL72wq/image.png' },
            { name: 'Cryo-Crash', type: 'Arme', value: 18000, rarity: 'Peu commun', imageUrl: 'https://i.postimg.cc/bwmQXj2c/image.png' },
            { name: 'Arc Rapiécé', type: 'Arme', value: 3200, rarity: 'Peu commun', imageUrl: 'https://i.postimg.cc/SRS5KhVL/image.png' },
            { name: 'Lame Éphémère', type: 'Arme', value: 1200, rarity: 'Peu commun', imageUrl: 'https://i.postimg.cc/nzBJPV9k/image.png' },
            { name: 'Pointe de Givre', type: 'Arme', value: 2300, rarity: 'Peu commun', imageUrl: 'https://i.postimg.cc/65NpfnZP/image.png' },
            { name: 'Hache Zoblin Lourde', type: 'Arme', value: 750, rarity: 'Peu commun', imageUrl: 'https://i.postimg.cc/KjJjgTws/image.png' },
            { name: 'Plaie des Foudres', type: 'Arme', value: 2300, rarity: 'Peu commun', imageUrl: 'https://i.postimg.cc/5tTtB1Pb/image.png' },
            { name: 'Appel de l`Aube', type: 'Arme', value: 2000, rarity: 'Peu commun', imageUrl: 'https://i.postimg.cc/bvFt4xdH/image.png' },
            { name: 'Chevaucheur du Ciel', type: 'Arme', value: 4000, rarity: 'Peu commun', imageUrl: 'https://i.postimg.cc/VNPTntzg/image.png' },
            { name: 'Contes de Flammes Puériles', type: 'Arme', value: 1500, rarity: 'Peu commun', imageUrl: 'https://i.postimg.cc/MZypk7F0/image.png' },
            { name: 'Ruche Arcanique', type: 'Armure', value: 5000, rarity: 'Peu commun', imageUrl: 'https://i.postimg.cc/q7jxMwd6/image.png' },
            { name: 'Casque Diurne', type: 'Armure', value: 5000, rarity: 'Peu commun', imageUrl: 'https://i.postimg.cc/PJQw2bQQ/image.png' },
            { name: 'Plastron du Valeureux', type: 'Armure', value: 5000, rarity: 'Peu commun', imageUrl: 'https://i.postimg.cc/W19Zqxr7/image.png' },
            { name: 'Talons d`Estropié', type: 'Armure', value: 800, rarity: 'Peu commun', imageUrl: 'https://i.postimg.cc/NjQSbCMV/image.png' },
            { name: 'Bottes en Mailles', type: 'Armure', value: 800, rarity: 'Peu commun', imageUrl: 'https://i.postimg.cc/xC7V4v7m/image.png' }, 
            { name: 'Bottes Funèbres', type: 'Armure', value: 1650, rarity: 'Peu commun', imageUrl: 'https://i.postimg.cc/Df9t4dXW/image.png' },
            { name: 'Jambières du Seigneur', type: 'Armure', value: 36000, rarity: 'Peu commun', imageUrl: 'https://i.postimg.cc/SNx5YSSP/image.png' },
            { name: 'Grimoire du Gel', type: 'Artéfact', value: 3000, rarity: 'Peu commun', imageUrl: 'https://i.postimg.cc/x1SH8RST/image.png' },
            { name: 'Moyenne Potion de Magie', type: 'Consommable', value: 240, rarity: 'Peu commun', imageUrl: 'https://i.postimg.cc/YCXJ7k01/image.png' },
            { name: 'Potion d`Endurance', type: 'Consommable', value: 400, rarity: 'Peu commun', imageUrl: 'https://i.postimg.cc/kXsPwLrt/image.png' },
            { name: 'Moyenne Potion de Vie', type: 'Consommable', value: 240, rarity: 'Peu commun', imageUrl: 'https://i.postimg.cc/PqjtRY3C/image.png' },
        ],
        'Rare': [
            { name: 'Arche des Eaux Dorées', type: 'Arme', value: 99000, rarity: 'Rare', imageUrl: 'https://i.postimg.cc/qRYgbf0x/image.png' },
            { name: 'Vignes Éthérées', type: 'Arme', value: 145000, rarity: 'Rare', imageUrl: 'https://i.postimg.cc/bNk809kS/image.png' },
            { name: 'Parapluie Nuptial', type: 'Arme', value: 18000, rarity: 'Rare', imageUrl: 'https://i.postimg.cc/JzPKDS6r/image.png' },
            { name: 'Anneau Doré', type: 'Arme', value: 25000, rarity: 'Rare', imageUrl: 'https://i.postimg.cc/wxy5x1Yj/image.png' },
            { name: 'Hache de Soldat Lourd', type: 'Arme', value: 9000, rarity: 'Rare', imageUrl: 'https://i.postimg.cc/hPMjck9K/image.png' },
            { name: 'Rune des Cimes Muettes', type: 'Arme', value: 16000, rarity: 'Rare', imageUrl: 'https://i.postimg.cc/ncDRt24c/image.png' },
            { name: 'Croissant Braisé', type: 'Arme', value: 20000, rarity: 'Rare', imageUrl: 'https://i.postimg.cc/jSsvpbZt/image.png' },
            { name: 'Bâton du Dragon Ancien', type: 'Arme', value: 9000, rarity: 'Rare', imageUrl: 'https://i.postimg.cc/hvWRr6SN/image.png' },
            { name: 'Claymore des Dorures', type: 'Arme', value: 34000, rarity: 'Rare', imageUrl: 'https://i.postimg.cc/13Rygk7z/image.png' },
            { name: 'Torsadée Fumante', type: 'Arme', value: 25000, rarity: 'Rare', imageUrl: 'https://i.postimg.cc/0NVp71C2/image.png' },
            { name: 'Ossoir Écarlate', type: 'Arme', value: 30000, rarity: 'Rare', imageUrl: 'https://i.postimg.cc/MGMFKsD3/image.png' },
            { name: 'Débat des Picots', type: 'Arme', value: 9500, rarity: 'Rare', imageUrl: 'https://i.postimg.cc/25LLcvkB/image.png' },
            { name: 'Étoile Polaire', type: 'Arme', value: 7000, rarity: 'Rare', imageUrl: 'https://i.postimg.cc/hPkCZ4sh/image.png' },
            { name: 'Arc de Chevalier', type: 'Arme', value: 30000, rarity: 'Rare', imageUrl: 'https://i.postimg.cc/BZD0z2vT/image.png' },
            { name: 'Claymore de Fer Blanc', type: 'Arme', value: 12000, rarity: 'Rare', imageUrl: 'https://i.postimg.cc/J0RKz3cD/image.png' },
            { name: 'Les Septs Étoiles', type: 'Arme', value: 5000, rarity: 'Rare', imageUrl: 'https://i.postimg.cc/XYcnm41V/image.png' },
            { name: 'Brise-Roc', type: 'Arme', value: 1650, rarity: 'Rare', imageUrl: 'https://i.postimg.cc/85bhktd2/image.png' },
            { name: 'Tunique du Géomancien', type: 'Armure', value: 80000, rarity: 'Rare', imageUrl: 'https://i.postimg.cc/vmF2J3tr/image.png' },
            { name: 'Voile des Lustres', type: 'Armure', value: 18000, rarity: 'Rare', imageUrl: 'https://i.postimg.cc/pXztpGXS/image.png' },
            { name: 'Gantelet Démoniaque', type: 'Armure', value: 9000, rarity: 'Rare', imageUrl: 'https://i.postimg.cc/8cxQ9Xgg/image.png' },
            { name: 'Armure du Loup', type: 'Armure', value: 11000, rarity: 'Rare', imageUrl: 'https://i.postimg.cc/Ls7jwj0F/image.png' },+
            { name: 'Ailes de Cuivre', type: 'Armure', value: 12500, rarity: 'Rare', imageUrl: 'https://i.postimg.cc/V6XvLt4t/image.png' },
            { name: 'Gants Placides', type: 'Armure', value: 8500, rarity: 'Rare', imageUrl: 'https://i.postimg.cc/wTN2YqCs/image.png' },
            { name: 'Gants Turquoises', type: 'Armure', value: 6000, rarity: 'Rare', imageUrl: 'https://i.postimg.cc/zXpccXKS/image.png' },
            { name:  'Patins Bleutés', type: 'Armure', value: 5000, rarity: 'Rare', imageUrl: 'https://i.postimg.cc/VNFKvXcC/image.png' },
            { name: 'Jambières Turquoises', type: 'Armure', value: 7000, rarity: 'Rare', imageUrl: 'https://i.postimg.cc/SR1GMzkN/image.png' },   
            { name: 'Pierre de la Raison', type: 'Artéfact', value: 10000, rarity: 'Rare', imageUrl: 'https://i.postimg.cc/DzwTP9Kj/image.png' },
            { name: 'Grande Potion de Magie', type: 'Consommable', value: 780, rarity: 'Rare', imageUrl: 'https://i.postimg.cc/d0jZ3HMm/image.png' },
            { name: 'Boost Brumeux', type: 'Artéfact', value: 1200, rarity: 'Rare', imageUrl: 'https://i.postimg.cc/T2W8MhzG/image.png' },
            { name: 'Grande Potion de Vie', type: 'Consommable', value: 780, rarity: 'Rare', imageUrl: 'https://i.postimg.cc/9Qvv82f1/image.png' },
        ],
        'Épique': [
            { name: 'Descendant du Soleil Flamboyant', type: 'Arme', value: 420000, rarity: 'Épique', imageUrl: 'https://i.postimg.cc/h46KNbmM/image.png' },
            { name: 'Rêve d`une Nuit Claire', type: 'Arme', value: 350000, rarity: 'Épique', imageUrl: 'https://i.postimg.cc/J4rvtwMn/image.png' },
            { name: 'Recueil des Anges Déchus', type: 'Arme', value: 810000, rarity: 'Épique', imageUrl: 'https://i.postimg.cc/G2vJxpJC/image.png' },
            { name: 'Soleil des Cardinaux', type: 'Arme', value: 55000, rarity: 'Épique', imageUrl: 'https://i.postimg.cc/bNY6RQGN/image.png' },
            { name: 'Déluge de la Nuit', type: 'Arme', value: 120000, rarity: 'Épique', imageUrl: 'https://i.postimg.cc/3x2J0Y4N/image.png' },
            { name: 'L`Omniscient', type: 'Arme', value: 550000, rarity: 'Épique', imageUrl: 'https://i.postimg.cc/XNrD61Dt/image.png' },
            { name: 'Couteau des Veines Hypnotiques', type: 'Arme', value: 86000, rarity: 'Épique', imageUrl: 'https://i.postimg.cc/G2qLdYyq/image.png' },
            { name: 'Décadence du Temps', type: 'Arme', value: 51000, rarity: 'Épique', imageUrl: 'https://i.postimg.cc/jqZDMhVC/image.png' },
            { name: 'Masque du Carnassier', type: 'Armure', value: 80000, rarity: 'Épique', imageUrl: 'https://i.postimg.cc/jd8YzQct/image.png' },
            { name: 'Robe du Sage', type: 'Armure', value: 980000, rarity: 'Épique', imageUrl: 'https://i.postimg.cc/dVMY4RpC/image.png' },
            { name: 'Côte Perlée', type: 'Armure', value: 79000, rarity: 'Épique', imageUrl: 'https://i.postimg.cc/R0Q7hzj0/image.png' }, 
            { name: 'Gantelets du Titan Rocheux', type: 'Armure', value: 14000, rarity: 'Épique', imageUrl: 'https://i.postimg.cc/02gVXKzw/image.png' },
            { name: 'Bottes du Spectre Ancestral', type: 'Armure', value: 22000, rarity: 'Épique', imageUrl: 'https://i.postimg.cc/Hn19dtS5/image.png' },
            { name: 'Bottes Phantom', type: 'Armure', value: 25000, rarity: 'Épique', imageUrl: 'https://i.postimg.cc/zv9B9d0Z/image.png' },
            { name: 'Ocarina des Nuages', type: 'Artéfact', value: 20000, rarity: 'Épique', imageUrl: 'https://i.postimg.cc/90LTr4yX/image.png' },
            { name: 'Fiole des Âmes', type: 'Artéfact', value: 15700, rarity: 'Épique', imageUrl: 'https://i.postimg.cc/0QSgZmVj/image.png' },
            { name: 'Bougie des Reliques', type: 'Artéfact', value: 20000, rarity: 'Épique', imageUrl: 'https://i.postimg.cc/26JB4pVh/image.png' },
            { name: 'Basilique du Démon', type: 'Artéfact', value: 50000, rarity: 'Épique', imageUrl: 'https://i.postimg.cc/W3hx9y7s/image.png' },
            { name: 'Gigantesque Potion de Magie', type: 'Consommable', value: 1150, rarity: 'Épique', imageUrl: 'https://i.postimg.cc/qRztw2D9/image.png' },
            { name: 'Gigantesque Potion de Vie', type: 'Consommable', value: 1150, rarity: 'Épique', imageUrl: 'https://i.postimg.cc/x1bh2xx6/image.png' },
        ],
        'Légendaire': [
            { name: 'L`Épée du Roi Maudit', type: 'Arme', value: 900000, rarity: 'Légendaire' , imageUrl: 'https://i.postimg.cc/MZMghkqf/image.png' },
            { name: 'Clé de la Singularité', type: 'Arme', value: 1200000, rarity: 'Légendaire', imageUrl: 'https://i.postimg.cc/4ykKwb4L/image.png' },
            { name: 'Sanctuaire des Horizons Atrophiés', type: 'Arme', value: 1600000, rarity: 'Légendaire', imageUrl: 'https://i.postimg.cc/RF1PgqCm/image.png' },
            { name: 'Cataclysme Céleste', type: 'Arme', value: 400000, rarity: 'Légendaire', imageUrl: 'https://i.postimg.cc/Ghs1jxwn/image.png' },
            { name: 'Choc des Errants', type: 'Arme', value: 825000, rarity: 'Légendaire', imageUrl: 'https://i.postimg.cc/mg3VnqT7/image.png' },
            { name: 'Division de Téodor', type: 'Arme', value: 1000000, rarity: 'Légendaire', imageUrl: 'https://i.postimg.cc/YCxwMdpw/image.png' },
            { name: 'Guillotine des Éxodes Déchus', type: 'Arme', value: 1500000, rarity: 'Légendaire', imageUrl: 'https://i.postimg.cc/15mwKfLy/image.png' },
            { name: 'Cimeterre des Éxodes Déchus', type: 'Arme', value: 1800000, rarity: 'Légendaire', imageUrl: 'https://i.postimg.cc/XqhNR17K/image.png' },
            { name: 'Basilique des Éxodes Déchus', type: 'Arme', value: 2000000, rarity: 'Légendaire', imageUrl: 'https://i.postimg.cc/YCT2nsyt/image.png' },
            { name: 'Fissures des Jades', type: 'Arme', value: 330000, rarity: 'Légendaire', imageUrl: 'https://i.postimg.cc/jS0MCJ6h/image.png' },
            { name: 'Bottes du Papillon de Minuit', type: 'Armure', value: 76000, rarity: 'Légendaire', imageUrl: 'https://i.postimg.cc/L4Y2Y3xf/image.png' },
            { name: 'Jambières du Guerrier Blanc', type: 'Armure', value: 120000, rarity: 'Légendaire', imageUrl: 'https://i.postimg.cc/VsnX8T3H/image.png' },
            { name: 'Couvre-Chef du Serpent', type: 'Armure', value: 600000, rarity: 'Légendaire', imageUrl: 'https://i.postimg.cc/qqY4Zjpf/image.png' },
            { name: 'Bague de l`Oeil Cristallisé', type: 'Artéfact', value: 21150, rarity: 'Légendaire', imageUrl: 'https://i.postimg.cc/sDtPSht1/image.png' },
            { name: 'Plume de Sang', type: 'Artéfact', value: 25000, rarity: 'Légendaire', imageUrl: 'https://i.postimg.cc/qgH4TwZ9/image.png' },
            { name: 'Gemme Stellaire', type: 'Artéfact', value: 33000, rarity: 'Légendaire', imageUrl: 'https://i.postimg.cc/G90dRRpL/image.png' },
        ],
        'Mythique': [
            { name: 'Furie des Faucons Écailleux', type: 'Arme', value: "Invendable", rarity: 'Mythique', imageUrl: 'https://i.postimg.cc/brWVL9mB/image.png' },
            { name: 'Univers Cubique', type: 'Arme', value: "Invendable", rarity: 'Mythique', imageUrl: 'https://i.postimg.cc/k41DmgD3/image.png' }, 
            { name: 'Ailes de la Rédemption', type: 'Arme', value: "Invendable", rarity: 'Mythique', imageUrl: 'https://i.postimg.cc/xdCHPF8f/image.png' },
            { name: 'Syncope Suprême de la Lune', type: 'Arme', value: "Invendable", rarity: 'Mythique', imageUrl: 'https://i.postimg.cc/RZDvDDhg/image.png' },
            { name: 'Purgatoire Putride', type: 'Arme', value: "Invendable", rarity: 'Mythique', imageUrl: 'https://i.postimg.cc/3N3JYH3T/image.png' },
            { name: 'Épée du Berserk', type: 'Arme', value: "Invendable", rarity: 'Mythique', imageUrl: 'https://i.postimg.cc/G2V0Hmmn/image.png' },
            { name: 'Le Supplice des Démons', type: 'Arme', value: "Invendable", rarity: 'Mythique', imageUrl: 'https://i.postimg.cc/1R70VNSq/image.png' },
        ]
    };

    const itemsForRarity = items[rarity];
    return itemsForRarity[Math.floor(Math.random() * itemsForRarity.length)];
}


// Ouvre le modal de slot machine
function openModal(lootItem, lootRarities) {
    const modal = document.getElementById('chestModal');
    const slotMachine = document.getElementById('slotMachine');
    slotMachine.innerHTML = ''; // Clear previous slots

    // Pré-définir l'item final (celui qui sera affiché en dernier)
    const finalItem = lootItem;

    // Ajouter des slots avec des items aléatoires
    const slots = [];
    for (let i = 0; i < 9; i++) { // 9 slots aléatoires
        const randomRarity = lootRarities[Math.floor(Math.random() * lootRarities.length)];
        const randomItem = generateLootItem(randomRarity);
        slots.push(randomItem);

        const slot = document.createElement('div');
        slot.className = 'slot';
        slot.innerHTML = `
            <img src="${randomItem.imageUrl}" alt="${randomItem.name}">
            <div>${randomItem.name}</div>
        `;
        slotMachine.appendChild(slot);
    }

    // Ajouter le slot final (l'item réel obtenu)
    slots.push(finalItem);
    const finalSlot = document.createElement('div');
    finalSlot.className = 'slot';
    finalSlot.innerHTML = `
        <img src="${finalItem.imageUrl}" alt="${finalItem.name}">
        <div>${finalItem.name}</div>
    `;
    slotMachine.appendChild(finalSlot);

    modal.style.display = 'block';

    // Simuler l'effet de la slot machine
    let speed = 50;
    let duration = 9000; // 9 seconds
    const startTime = Date.now();
    const interval = setInterval(() => {
        slotMachine.scrollTop += speed;
        if (slotMachine.scrollTop >= slotMachine.scrollHeight - slotMachine.clientHeight) {
            slotMachine.scrollTop = 0;
        }
        const elapsedTime = Date.now() - startTime;
        if (elapsedTime >= duration) {
            clearInterval(interval);

            // Centrer le slot final
            slotMachine.scrollTop = slotMachine.scrollHeight - slotMachine.clientHeight;

            // Afficher le butin final
            displayLoot(finalItem);

            // Ajouter le butin à l'historique
            addToHistory(finalItem);

            // Jouer le son approprié
            if (finalItem.rarity === 'Commun' || finalItem.rarity === 'Peu commun') {
                winSequence1Sound.play();
            } else if (finalItem.rarity === 'Rare' || finalItem.rarity === 'Épique') {
                winSequence2Sound.play();
            } else if (finalItem.rarity === 'Légendaire' || finalItem.rarity === 'Mythique') {
                winSequence3Sound.play();
            }

            // Fermer le modal après 3 secondes
            setTimeout(() => {
                closeModal();
            }, 3000);
        } else {
            // Réduire progressivement la vitesse
            speed *= 0.995; // Ajuster ce facteur pour contrôler la décélération
        }
    }, 50); // Ajuster l'intervalle de temps si nécessaire
}

// Ferme le modal
function closeModal() {
    const modal = document.getElementById('chestModal');
    modal.style.display = 'none';
}

// Ferme le modal
function closeModal() {
    const modal = document.getElementById('chestModal');
    modal.style.display = 'none';
}

// Affiche le butin obtenu
function displayLoot(item) {
    const obtainedLoot = document.getElementById('obtainedLoot');
    const obtainedLootName = document.getElementById('obtainedLootName');
    const obtainedLootImage = document.getElementById('obtainedLootImage');
    const obtainedLootRarity = document.getElementById('obtainedLootRarity');

    // Mettre à jour les informations du loot
    obtainedLootName.textContent = item.name;
    obtainedLootImage.src = item.imageUrl;
    obtainedLootImage.alt = item.name;
    obtainedLootRarity.textContent = item.rarity;
    obtainedLootRarity.className = `rarity rarity-${getRarityClass(item.rarity)}`;

    // Afficher la section du loot obtenu
    obtainedLoot.style.display = 'flex';

    // Masquer la section après quelques secondes (optionnel)
    setTimeout(() => {
        obtainedLoot.style.display = 'none';
    }, 5000); // 5 secondes
}

// Retourne la classe CSS pour la rareté
function getRarityClass(rarity) {
    switch (rarity) {
        case 'Commun': return 1;
        case 'Peu commun': return 2;
        case 'Rare': return 3;
        case 'Épique': return 4;
        case 'Légendaire': return 5;
        case 'Mythique': return 6;
        default: return 1;
    }
}

// Ajoute un objet au journal des butins
function addToHistory(item) {
    const lootHistory = JSON.parse(localStorage.getItem('lootHistory')) || [];
    lootHistory.push(item);
    if (lootHistory.length > 15) {
        lootHistory.shift(); // Keep only the last 15 items
    }
    localStorage.setItem('lootHistory', JSON.stringify(lootHistory));
    loadLootHistory();
}

// Charge l'historique des butins
function loadLootHistory() {
    const lootHistory = JSON.parse(localStorage.getItem('lootHistory')) || [];
    const lootHistoryDiv = document.getElementById('lootHistory');
    lootHistoryDiv.innerHTML = '';

    lootHistory.forEach(item => {
        const div = document.createElement('div');
        div.className = 'inventory-item';
        div.innerHTML = `
            <img src="${item.imageUrl}" alt="${item.name}" class="inventory-image">
            <div class="inventory-details">
                <div><strong>${item.name}</strong></div>
                <div>Type: ${item.type}</div>
                <div class="rarity rarity-${getRarityClass(item.rarity)}">${item.rarity}</div>
                <div>Valeur: ${item.value}💎</div>
            </div>
        `;
        lootHistoryDiv.appendChild(div);
    });
}

// Efface l'historique des obtentions
function clearHistory() {
    localStorage.removeItem('lootHistory'); // Supprime l'historique du stockage local
    loadLootHistory(); // Recharge l'historique (vide)
    alert("L'historique des obtentions a été effacé !");
}

// Initialisation au chargement de la page
window.onload = function() {
    loadLootHistory();
};