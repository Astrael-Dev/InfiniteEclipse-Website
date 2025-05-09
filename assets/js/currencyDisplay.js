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

// Charger le profil utilisateur depuis localStorage
function loadUserProfile() {
    const userProfile = JSON.parse(localStorage.getItem('userProfile')) || null;
    const userNameElement = document.getElementById('userName');
    const userAvatarElement = document.getElementById('userAvatar');

    if (userProfile) {
        // Si un compte est trouvé, afficher le pseudo et l'avatar
        userNameElement.textContent = userProfile.name;
        userAvatarElement.src = userProfile.avatar || 'assets/images/infinite-eclipse-logo-c.png';

        // Supprimer l'attribut onclick
        userNameElement.removeAttribute('onclick');
    } else {
        // Si aucun compte n'est trouvé, afficher "Créer un compte" et ajouter onclick
        userNameElement.textContent = 'Créer un compte';
        userAvatarElement.src = 'profile.png';
        userNameElement.setAttribute('onclick', 'openAccountModal()');
    }
}

// Ouvrir le modal de création de compte
function openAccountModal() {
    const accountModal = document.getElementById('accountModal');
    accountModal.classList.remove('hidden');
}

// Fermer le modal de création de compte
function closeAccountModal() {
    const accountModal = document.getElementById('accountModal');
    accountModal.classList.add('hidden');
}

// Sauvegarder le profil utilisateur dans localStorage
function saveUserProfile(name, avatar) {
    const userProfile = { name, avatar };
    localStorage.setItem('userProfile', JSON.stringify(userProfile));
    loadUserProfile();
}

// Créer un compte utilisateur
function createUserAccount() {
    const username = document.getElementById('username').value.trim();
    const profileImageInput = document.getElementById('profileImageInput');
    let profileImage = 'profile.png';

    if (!username) {
        alert('Veuillez entrer un pseudo.');
        return;
    }

    if (profileImageInput.files && profileImageInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function (e) {
            profileImage = e.target.result;
            saveUserProfile(username, profileImage);
            alert(`Compte créé pour ${username}`);
            closeAccountModal();
        };
        reader.readAsDataURL(profileImageInput.files[0]);
    } else {
        saveUserProfile(username, profileImage);
        alert(`Compte créé pour ${username}`);
        closeAccountModal();
    }
}

function handleProfileClick() {
    const userProfile = JSON.parse(localStorage.getItem('userProfile')) || null;

    if (!userProfile) {
        openAccountModal(); // Ouvre le modal si aucun profil n'est trouvé
    } else {
        alert(`Bienvenue, ${userProfile.name}`); // Affiche un message de bienvenue si un profil existe
    }
}

// Charger le profil utilisateur au démarrage
document.addEventListener('DOMContentLoaded', () => {
    loadUserProfile();
});

// Charger les monnaies lorsque le DOM est prêt
document.addEventListener("DOMContentLoaded", () => {
    loadCurrencies();
    startRealTimeUpdate();
});