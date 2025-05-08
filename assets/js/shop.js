function openConfirmationModal(price, shards) {
    const modal = document.getElementById("confirmationModal");
    const confirmationText = document.getElementById("confirmationText");
    const confirmButton = document.getElementById("confirmButton");

    confirmationText.textContent = `Voulez-vous vraiment acheter ${shards} Éclats du Crépuscule pour ${price.toLocaleString('fr-FR')} 💎 ?`;
    confirmButton.onclick = () => confirmPurchase(price, shards);

    modal.style.display = "flex";
}

function closeConfirmationModal() {
    const modal = document.getElementById("confirmationModal");
    modal.style.display = "none";
}

function confirmPurchase(price, shards) {
    const wallet = parseFloat(localStorage.getItem("wallet")) || 0;

    if (wallet < price) {
        alert("Vous n'avez pas les fonds requis pour acheter les Éclats !");
        closeConfirmationModal();
        return;
    }

    // Déduire le montant du portefeuille
    localStorage.setItem("wallet", wallet - price);

    // Ajouter les Éclats du Crépuscule
    const currentShards = parseInt(localStorage.getItem("eclipseShards")) || 0;
    localStorage.setItem("eclipseShards", currentShards + shards);

    // Mettre à jour l'affichage
    loadCurrencies();

    alert(`Vous avez acheté ${shards} Éclats du Crépuscule !`);
    closeConfirmationModal();
}