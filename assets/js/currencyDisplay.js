// Initialisation des monnaies
function loadCurrencies() {
    // Charger la monnaie du portefeuille
    const walletAmount = parseFloat(localStorage.getItem('wallet')) || 0;
    document.getElementById('walletAmountDisplay').textContent = `${Math.round(walletAmount).toLocaleString('fr-FR')} 💎`;

    // Charger les Éclats du Crépuscule
    const eclipseShards = parseInt(localStorage.getItem('eclipseShards')) || 0;
    document.getElementById('eclipseShardAmount').textContent = eclipseShards.toLocaleString('fr-FR');
}

// Ajouter des Éclats du Crépuscule
function addEclipseShards(amount) {
    const currentShards = parseInt(localStorage.getItem('eclipseShards')) || 0;
    const newShards = currentShards + amount;
    localStorage.setItem('eclipseShards', newShards);
    document.getElementById('eclipseShardAmount').textContent = newShards.toLocaleString('fr-FR');
}

// Réinitialiser les Éclats du Crépuscule
function resetEclipseShards() {
    localStorage.setItem('eclipseShards', 0);
    document.getElementById('eclipseShardAmount').textContent = 0;
}

// Mettre à jour les monnaies en temps réel
function startRealTimeUpdate() {
    setInterval(() => {
        loadCurrencies();
        }, 200); // Vérifie toutes les 200ms
}

// Charger les monnaies lorsque le DOM est prêt
document.addEventListener("DOMContentLoaded", () => {
    loadCurrencies();
    startRealTimeUpdate();
});