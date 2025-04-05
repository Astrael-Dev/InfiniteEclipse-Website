let inventories = JSON.parse(localStorage.getItem('inventories')) || {};
let currentInventory = localStorage.getItem('currentInventory') || 'default';
let accounts = JSON.parse(localStorage.getItem('accounts')) || {};
let loggedInUser = localStorage.getItem('loggedInUser') || null;

if (!inventories[currentInventory]) {
    inventories[currentInventory] = {};
}

let currentItemToRemove = null;

function addItem() {
    const itemName = document.getElementById('addItemName').value;
    const quantity = parseInt(document.getElementById('addItemQuantity').value);
    const imageUrl = document.getElementById('addItemImage').value;
    const itemType = document.getElementById('addItemType').value;
    const itemSubType = document.getElementById('addItemSubType').value;
    const itemRarity = document.getElementById('addItemRarity').value;
    const itemValue = document.getElementById('addItemValue').value;

    // Validation de la quantité selon le type
    const maxQuantity = (itemType === "Arme" || itemType === "Armure" || itemType === "Artéfact") ? 1 : 99;
    if (quantity < 1 || quantity > maxQuantity) {
        alert(`La quantité doit être entre 1 et ${maxQuantity} pour le type ${itemType}.`);
        return;
    }

    if (!inventories[currentInventory][itemName]) {
        inventories[currentInventory][itemName] = { quantity: 0, imageUrl: '', type: itemType, subType: itemSubType, rarity: itemRarity, value: itemValue };
    }
    inventories[currentInventory][itemName].quantity += quantity;
    inventories[currentInventory][itemName].imageUrl = imageUrl;
    inventories[currentInventory][itemName].type = itemType;
    inventories[currentInventory][itemName].subType = itemSubType;
    inventories[currentInventory][itemName].rarity = itemRarity;
    inventories[currentInventory][itemName].value = itemValue;
    localStorage.setItem('inventories', JSON.stringify(inventories));
    alert(`${quantity} ${itemName}(s) ajouté(s) à votre inventaire.`);
    loadInventory();
}

function showRemoveItemModal(itemName) {
    currentItemToRemove = itemName;
    document.getElementById('removeItemQuantity').value = '';
    document.getElementById('removeItemModal').style.display = 'block';
}

function closeRemoveItemModal() {
    document.getElementById('removeItemModal').style.display = 'none';
    currentItemToRemove = null;
}

function confirmRemoveItem() {
    const quantityToRemove = parseInt(document.getElementById('removeItemQuantity').value);
    if (isNaN(quantityToRemove) || quantityToRemove < 1) {
        alert('Veuillez entrer une quantité valide.');
        return;
    }

    if (currentItemToRemove) {
        const item = inventories[currentInventory][currentItemToRemove];
        if (item) {
            if (item.quantity > quantityToRemove) {
                item.quantity -= quantityToRemove;
            } else {
                delete inventories[currentInventory][currentItemToRemove];
            }
            localStorage.setItem('inventories', JSON.stringify(inventories));
            loadInventory();
            closeRemoveItemModal();
        }
    }
}

function loadInventory() {
    const inventoryList = document.getElementById('inventoryList');
    inventoryList.innerHTML = '';

    for (const item in inventories[currentInventory]) {
        const div = document.createElement('div');
        div.className = 'inventory-item';
        const rarityClass = `rarity-${inventories[currentInventory][item].rarity}`;
        const rarityText = getRarityText(inventories[currentInventory][item].rarity);
        const valueDisplay = `${inventories[currentInventory][item].value}💎`;
        div.innerHTML = `
            <img src="${inventories[currentInventory][item].imageUrl}" alt="${item}" class="inventory-image">
            <div class="inventory-details">
                <div><strong>${item}</strong></div>
                <div>Quantité: ${inventories[currentInventory][item].quantity}</div>
                <div>Type: ${inventories[currentInventory][item].type}</div>
                <div>Sous-type: ${inventories[currentInventory][item].subType}</div>
                <div class="rarity ${rarityClass}">${rarityText}</div>
                <div>Valeur: ${valueDisplay}</div>
            </div>
            <button class="btn-remove" onclick="showRemoveItemModal('${item}')">Supprimer</button>
        `;
        inventoryList.appendChild(div);
    }
}

function getRarityText(rarity) {
    switch (rarity) {
        case '1': return 'Commun';
        case '2': return 'Peu commun';
        case '3': return 'Rare';
        case '4': return 'Épique';
        case '5': return 'Légendaire';
        case '6': return 'Mythique';
        default: return '';
    }
}

function loadInventoryNav() {
    const inventoryNav = document.getElementById('inventoryNav');
    inventoryNav.innerHTML = '';

    for (const inventory in inventories) {
        const li = document.createElement('li');
        li.innerHTML = `<a href="#" onclick="switchInventory('${inventory}')">${inventory}</a>`;
        inventoryNav.appendChild(li);
    }
}

function switchInventory(inventory) {
    currentInventory = inventory;
    localStorage.setItem('currentInventory', currentInventory);
    loadInventory();
}

function showAccountModal() {
    document.getElementById('accountModal').style.display = 'block';
}

function closeAccountModal() {
    document.getElementById('accountModal').style.display = 'none';
}

function createAccount() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const profileImageInput = document.getElementById('profileImageInput');
    let profileImage = 'profile.png';

    if (profileImageInput.files && profileImageInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function (e) {
            profileImage = e.target.result;
            saveAccount(username, password, profileImage);
        };
        reader.readAsDataURL(profileImageInput.files[0]);
    } else {
        saveAccount(username, password, profileImage);
    }
}

function saveAccount(username, password, profileImage) {
    if (accounts[username]) {
        alert('Nom d\'utilisateur déjà pris.');
        return;
    }

    accounts[username] = { password: password, profileImage: profileImage };
    localStorage.setItem('accounts', JSON.stringify(accounts));
    alert(`Compte créé pour ${username}`);
    closeAccountModal();
}

function showLoginModal() {
    document.getElementById('loginModal').style.display = 'block';
}

function closeLoginModal() {
    document.getElementById('loginModal').style.display = 'none';
}

function login() {
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    if (accounts[username] && accounts[username].password === password) {
        loggedInUser = username;
        localStorage.setItem('loggedInUser', loggedInUser);
        alert(`Bienvenue ${username}`);
        closeLoginModal();
        displayLoggedInUser();
    } else {
        alert('Nom d\'utilisateur ou mot de passe incorrect.');
    }
}

function togglePasswordVisibility() {
    const passwordField = document.getElementById('password');
    passwordField.type = passwordField.type === 'password' ? 'text' : 'password';
}

function toggleLoginPasswordVisibility() {
    const passwordField = document.getElementById('loginPassword');
    passwordField.type = passwordField.type === 'password' ? 'text' : 'password';
}

function showCreateInventoryModal() {
    document.getElementById('createInventoryModal').style.display = 'block';
}

function closeCreateInventoryModal() {
    document.getElementById('createInventoryModal').style.display = 'none';
}

function createInventory() {
    const newInventoryName = document.getElementById('newInventoryName').value;

    if (inventories[newInventoryName]) {
        alert('Nom d\'inventaire déjà pris.');
        return;
    }

    inventories[newInventoryName] = {};
    localStorage.setItem('inventories', JSON.stringify(inventories));
    loadInventoryNav();
    closeCreateInventoryModal();
}

function showRenameInventoryModal() {
    document.getElementById('renameInventoryModal').style.display = 'block';
}

function closeRenameInventoryModal() {
    document.getElementById('renameInventoryModal').style.display = 'none';
}

function renameInventory() {
    const newInventoryName = document.getElementById('renameInventoryName').value;

    if (inventories[newInventoryName]) {
        alert('Nom d\'inventaire déjà pris.');
        return;
    }

    inventories[newInventoryName] = inventories[currentInventory];
    delete inventories[currentInventory];
    currentInventory = newInventoryName;
    localStorage.setItem('inventories', JSON.stringify(inventories));
    localStorage.setItem('currentInventory', currentInventory);
    loadInventoryNav();
    loadInventory();
    closeRenameInventoryModal();
}

function removeCurrentInventory() {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet inventaire ?')) {
        delete inventories[currentInventory];
        currentInventory = 'default';
        localStorage.setItem('inventories', JSON.stringify(inventories));
        localStorage.setItem('currentInventory', currentInventory);
        loadInventoryNav();
        loadInventory();
    }
}

function showChangeProfileImageModal() {
    document.getElementById('changeProfileImageModal').style.display = 'block';
}

function closeChangeProfileImageModal() {
    document.getElementById('changeProfileImageModal').style.display = 'none';
}

function changeProfileImage() {
    const newProfileImageInput = document.getElementById('newProfileImageInput');
    if (newProfileImageInput.files && newProfileImageInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function (e) {
            accounts[loggedInUser].profileImage = e.target.result;
            localStorage.setItem('accounts', JSON.stringify(accounts));
            displayLoggedInUser();
            closeChangeProfileImageModal();
        };
        reader.readAsDataURL(newProfileImageInput.files[0]);
    }
}

function displayLoggedInUser() {
    const userInfo = document.getElementById('loggedInUser');
    const profileImage = document.getElementById('profileImage');
    if (loggedInUser) {
        userInfo.textContent = `Bienvenue, ${loggedInUser}`;
        profileImage.src = accounts[loggedInUser].profileImage || 'profile.png';
        document.getElementById('logoutOption').style.display = 'block';
    } else {
        userInfo.textContent = '';
        profileImage.src = 'profile.png';
        document.getElementById('logoutOption').style.display = 'none';
    }
}

function handleTypeChange() {
    const itemType = document.getElementById('addItemType').value;
    const subTypeGroup = document.getElementById('subTypeGroup');
    const subTypeSelect = document.getElementById('addItemSubType');
    subTypeSelect.innerHTML = '';

    if (itemType === 'Arme') {
        subTypeGroup.style.display = 'block';
        const weaponTypes = ['Bâtons', 'Sceptres', 'Catalyseurs', 'Parchemins', 'Épées (une main)', 'Épées (deux mains)', 'Lances', 'Haches', 'Marteaux', 'Faux', 'Arcs', 'Dagues'];
        weaponTypes.forEach(type => {
            const option = document.createElement('option');
            option.value = type;
            option.textContent = type;
            subTypeSelect.appendChild(option);
        });
    } else if (itemType === 'Armure') {
        subTypeGroup.style.display = 'block';
        const armorTypes = ['Plastrons', 'Casques', 'Jambières', 'Bottes', 'Tuniques', 'Robes', 'Chapeaux', 'Manteaux'];
        armorTypes.forEach(type => {
            const option = document.createElement('option');
            option.value = type;
            option.textContent = type;
            subTypeSelect.appendChild(option);
        });
    } else {
        subTypeGroup.style.display = 'none';
    }
}

window.onload = function() {
    loadInventory();
    loadInventoryNav();
    displayLoggedInUser();
};