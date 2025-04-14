// Variables globales pour la gestion du livre de recettes
let currentPage = 0; // Page actuelle du livre
const recipesPerPage = 2; // Nombre de recettes affichées par page
const pageFlipSound = new Audio("sons/page-flip.mp3"); // Son de changement de page

// Liste des ingrédients disponibles
const ingredients = [
    // Viandes
    { id: "steak", name: "Steak", category: "viandes", image: "ingrédients/viandes/steak.png", description: "Un steak juteux." },
    { id: "poulet", name: "Poulet", category: "viandes", image: "ingrédients/viandes/poulet.png", description: "Un morceau de poulet tendre." },
    { id: "gigot", name: "Gigot", category: "viandes", image: "ingrédients/viandes/gigot.png", description: "Un gigot savoureux." },
    { id: "porc", name: "Porc", category: "viandes", image: "ingrédients/viandes/porc.png", description: "Un morceau de porc juteux." },
    { id: "saucisse", name: "Saucisse", category: "viandes", image: "ingrédients/viandes/saucisse.png", description: "Une saucisse épicée." },
    
    // Poissons
    { id: "saumon", name: "Saumon", category: "poissons", image: "assets/images/saumon.png", description: "Un filet de saumon frais." },
    
    // Légumes
    { id: "carotte", name: "Carotte", category: "legumes", image: "ingrédients/légumes/carotte.png", description: "Une carotte croquante." },
    { id: "oignon", name: "Oignon", category: "legumes", image: "ingrédients/légumes/oignon.png", description: "Un oignon parfumé." },
    { id: "pomme de terre", name: "Pomme de terre", category: "legumes", image: "ingrédients/légumes/pomme_de_terre.png", description: "Reine des légumes racines, est une source incontournable de vitalité et de réconfort." },
    { id: "tomate", name: "Tomate", category: "legumes", image: "ingrédients/légumes/tomate.png", description: "Fruit ou légume ? Ce débat intemporel ne fait qu'ajouter à son charme." },
    { id: "radis", name: "Radis", category: "legumes", image: "ingrédients/légumes/radis.png", description: "Un colossal légume blanc, se distingue par sa simplicité et sa robustesse." },
    { id: "chou", name: "Chou", category: "legumes", image: "ingrédients/légumes/chou.png", description: "Le Chou, légume polyvalent et omniprésent à travers les terres de Zéphyria, est une véritable bénédiction culinaire." },
    { id: "poivron cloche", name: "Poivron Cloche", category: "legumes", image: "ingrédients/légumes/poivron_cloche.png", description: "Le Poivron Cloche tire son nom de sa forme distincte, semblable à une cloche renversée, qui abrite une chair épaisse et croquante." },
    { id: "ail", name: "Ail", category: "legumes", image: "ingrédients/légumes/ail.png", description: "Un ail à l'odeur forte et distincte." },
    { id: "citrouille", name: "Citrouille", category: "legumes", image: "ingrédients/légumes/citrouille.png", description: "Une citrouille d'un orange éclatant." },
    { id: "olive", name: "Olive", category: "legumes", image: "ingrédients/légumes/olives.png", description: "Une olive verte." },
    { id: "haricots rouges", name: "Haricots Rouges", category: "legumes", image: "ingrédients/légumes/haricots_rouges.png", description: "Les haricots rouges, avec leur teinte rouge vif et leur forme ovale, sont des légumineuses riches en protéines et en fibres." },
    
    // Fruits
    { id: "pomme", name: "Pomme", category: "fruits", image: "ingrédients/fruits/pomme.png", description: "Une pomme sucrée et juteuse." },
    { id: "fruit pastel", name: "Fruit Pastel", category: "fruits", image: "ingrédients/fruits/fruit_pastel.png", description: "Ce fruit aux teintes douces et dégradées, rappelant un tableau d’aquarelle, est une merveille des clairières enchanteresses et des prairies baignées de lumière." },
    { id: "baie helena", name: "Baie Helena", category: "fruits", image: "ingrédients/fruits/baie_helena.png", description: "D’un rouge écarlate éclatant, la Baie Helena attire l`attention par sa couleur vive et son apparence intrigante." },
    { id: "melon lavande", name: "Melon Lavande", category: "fruits", image: "ingrédients/fruits/melon_lavande.png", description: "Un fruit exotique au goût sucré." },
    { id: "peche zaytin", name: "Pêche Zaytin", category: "fruits", image: "ingrédients/fruits/peche_zaytin.png", description: "La Pêche Zaytin, géante parmi les fruits, affiche une taille et un poids impressionnants, atteignant en moyenne celui d’un Diamante entier. Cette merveille naturelle regorge d’eau, de sucres (environ 20 % de son poids total) et de vitamines essentielles, en faisant une véritable mine d`énergie et de douceur." },
    { id: "myrtille", name: "Myrtille", category: "fruits", image: "ingrédients/fruits/myrtille.png", description: "Des myrtilles juteuses et acides." },
    
    // Champignons
    { id: "champignon blanc", name: "Champignon Blanc", category: "champignons", image: "ingrédients/champignons/champignon_blanc.png", description: "Un champignon blanc au goût simple et doux." },
    { id: "champignon hashak", name: "Champignon Hashak", category: "champignons", image: "ingrédients/champignons/champignon_hashak.png", description: "Un champignon rare et précieux." },
    
    // Épices
    { id: "poivre", name: "Poivre", category: "epices", image: "ingrédients/epices/poivre.png", description: "Une pincée de poivre épicé." },
    { id: "sel", name: "Sel", category: "epices", image: "ingrédients/epices/sel.png", description: "Une pincée de sel." },
    { id: "cannelle", name: "Cannelle", category: "epices", image: "ingrédients/epices/canelle.png", description: "Une touche de cannelle." },
    { id: "curry", name: "Curry", category: "epices", image: "ingrédients/epices/curry.png", description: "Une épice parfumée." },

    // Liquides
    { id: "lait de brebis", name: "Lait de brebis", category: "liquides", image: "ingrédients/liquides/lait_brebis.png", description: "Du lait de brebis au goût inoubliable." },
    { id: "eau", name: "Eau", category: "liquides", image: "ingrédients/liquides/eau.png", description: "De l'eau pure et fraîche." },
    
    
    // Produits
    { id: "sucre", name: "Sucre", category: "produits", image: "ingrédients/produits/sucre.png", description: "Du sucre raffiné." },
    { id: "miel", name: "Miel", category: "produits", image: "ingrédients/produits/miel.png", description: "Du miel doré et sucré." },
    { id: "blé", name: "Blé", category: "produits", image: "ingrédients/produits/blé.png", description: "Des brins de blé récoltés au vent d'automne." },
    { id: "beurre", name: "Beurre", category: "produits", image: "ingrédients/produits/beurre.png", description: "Du beurre crémeux." },
    { id: "oeuf", name: "Oeuf", category: "produits", image: "ingrédients/produits/oeuf.png", description: "Un oeuf frais." },
    { id: "chocolat", name: "Chocolat", category: "produits", image: "ingrédients/produits/chocolat.png", description: "Du chocolat noir." },
    { id: "creme fraiche", name: "Crème Fraîche", category: "produits", image: "ingrédients/produits/crème_fraiche.png", description: "Une crème fraîche onctueuse." },
    { id: "café", name: "Café", category: "produits", image: "ingrédients/produits/café.png", description: "Des grains de café amers." },
    { id: "caramel salé", name: "Caramel Salé", category: "produits", image: "ingrédients/produits/caramel_salee.png", description: "Un caramel salé irrésistible." },
    { id: "riz", name: "Riz", category: "produits", image: "ingrédients/produits/riz.png", description: "Du riz blanc." },
    { id: "pain", name: "Pain", category: "produits", image: "ingrédients/produits/pain.png", description: "Une miche de pain croustillante." },
    { id: "huile olive", name: "Huile d'Olive", category: "produits", image: "ingrédients/produits/huile_olive.png", description: "Une huile d'olive de qualité." },

    // Combustibles
    { id: "bois", name: "Bois", category: "combustibles", image: "ingrédients/combustibles/bois.png", description: "Du bois pour alimenter le feu." },
    { id: "charbon", name: "Charbon", category: "combustibles", image: "ingrédients/combustibles/charbon.png", description: "Du charbon pour une cuisson rapide." },
    { id: "pierre-volcanique", name: "Pierre Volcanique", category: "combustibles", image: "ingrédients/combustibles/pierre_volcanique.png", description: "Une pierre volcanique pour une cuisson ultra rapide." },
];

// Liste des recettes disponibles
const recipes = [
    {
        name: "Ragoût de Poulet",
        ingredients: ["poulet", "carotte", "pomme de terre", "lait de brebis"],
        image: "plats/ragout-poulet.png",
        description: "Un délicieux ragoût de poulet qui réchauffe le cœur.",
        effects: { pv: 300, defense: 100, froid:"Résistance"},
        cookingTime: 7 * 60, // Temps en secondes (7 minutes)
    },
    {
        name: "Bouillon des Champs",
        ingredients: ["tomate", "carotte", "steak", "eau"],
        image: "plats/bouillon-des-champs.png",
        description: "Un bouillon réconfortant aux saveurs des champs.",
        effects: { pv: 70, pm: 50, defense: 50, "froid":true},
        cookingTime: 3 * 60, // Temps en secondes (3 minutes)
    },
    {
        name: "Brioche Royale",
        ingredients: ["pain", "lait de brebis", "oeuf", "creme fraiche"],
        image: "plats/brioche-royale.png",
        description: "Une brioche moelleuse et sucrée, contenant beaucoup de sucres naturels.",
        effects: { pv: 300,  defense: 50, attaqueMagique: 100, defenseMagique: 100},
        cookingTime: 10 * 60, // Temps en secondes (10 minutes)
    },
    {
        name: "Café à la Vanille",
        ingredients: ["café", "sucre", "sucre", "lait de brebis"],
        image: "plats/café-vanille.png",
        description: "Un café doux et crémeux, parfait pour commencer la journée.",
        effects: { pv: 50, pm: 100, agilite: 30},
        cookingTime: 1 * 60, // Temps en secondes (1 minute)
    },
    {
        name: "Caramel Salé",
        ingredients: ["sucre", "sucre", "beurre", "sel"],
        image: "plats/caramel-sale.png",
        description: "Un caramel salé irrésistible, parfait pour les gourmands.",
        effects: { pv: 20, pm: 30, defenseMagique: 30}, 
        cookingTime: 2 * 60, // Temps en secondes (2 minutes)
    },
    {
        name: "Crousti à l'Ail",
        ingredients: ["pain", "ail", "huile olive", "beurre"],
        image: "plats/crousti-ail.png",
        description: "Des tranches de pain généreuses et croustillantes à l'ail.",
        effects: { pv: 100, defense: 100, defenseMagique: 100 },
        cookingTime: 3 * 60, // Temps en secondes (3 minutes)
    },
    {
        name: "Flanc Crémeux au Chcocolat",
        ingredients: ["chocolat", "lait de brebis", "sucre", "oeuf"],
        image: "plats/flanc-cremeux-chocolat.png",
        description: "Un dessert crémeux au chocolat, qui est un plat de tradition dans le Nord.",
        effects: { pv: 100, pm: 50, defenseMagique: 50 },
        cookingTime: 5 * 60, // Temps en secondes (5 minutes)
    },
    {
        name: "Gigot Géant au Curry",
        ingredients: ["gigot", "riz", "poivre", "curry"],
        image: "plats/gigot-geant-curry.png",
        description: "Un gigot géant mariné au curry, servi avec du riz, souvent mangé par les soldats après de lourds entraînements.",
        effects: { pv: 500, attaque:100, defense: 200, agilite: 50 },
        cookingTime: 15 * 60, // Temps en secondes (15 minutes)
    },
    {
        name: "Huile d'Olive",
        ingredients: ["eau", "sel", "olive", "beurre"],
        image: "plats/huile-olive.png",
        description: "Une huile d'olive de qualité, parfaite pour assaisonner vos plats.",
        effects: "Aucun effet",
        cookingTime: 2 * 60, // Temps en secondes (2 minutes)
    },
    {
        name: "Myriade de Champignons",
        ingredients: ["champignon blanc", "champignon hashak", "pomme de terre", "beurre"],
        image: "plats/myriade-champignons.png",
        description: "Un plat savoureux à base de champignons variés, souvent servi dans les tavernes.",
        effects: { pv: 150, defense: 50, defenseMagique: 50 },
        cookingTime: 4 * 60, // Temps en secondes (4 minutes)
    },
    {
        name: "Pain",
        ingredients: ["blé", "eau", "sel", "beurre"],
        image: "plats/pain.png",
        description: "Un pain moelleux, parfait pour accompagner vos plats.",
        effects: { pv: 50},
        cookingTime: 3 * 60, // Temps en secondes (3 minutes)
    },
    {
        name: "Patatafestin",
        ingredients: ["pomme de terre", "beurre", "creme fraiche", "sel"],
        image: "plats/patatafestin.png",
        description: "Plein de pommes de terre, sous toutes leurs formes, cuites à la perfection, accompagné d'une sauce à la crème.",
        effects: { pv: 400, attaque: 150, agilite: 50 },
        cookingTime: 7 * 60, // Temps en secondes (7 minutes)
    },
    {
        name: "Pommes de terre sautées",
        ingredients: ["pomme de terre", "poulet", "saucisse", "beurre"],
        image: "plats/pomme-de-terre-sautees.png",
        description: "Des pommes de terre sautées à la perfection, accompagnées de poulet et de saucisse.",
        effects: { pv: 200, attaque: 100, defense: 50 },
        cookingTime: 6 * 60, // Temps en secondes (6 minutes)
    },
    {
        name: "Pomme Royale de la Ruche",
        ingredients: ["pomme", "pomme", "miel", "cannelle"],
        image: "plats/pomme-royale-ruche.png",
        description: "Deux gigantesques pommes sucrées et juteuses, remplies de miel et soupoudrées de cannelle.",
        effects: { pv: 500, pm: 100, attaqueMagique: 100, defenseMagique: 200,},
        cookingTime: 5 * 60, // Temps en secondes (5 minutes)
    },
    {
        name: "Râgout de Boeuf",
        ingredients: ["steak", "carotte", "pomme de terre", "eau"],
        image: "plats/ragout-boeuf.png",
        description: "Un ragoût de boeuf savoureux, mijoté lentement.",
        effects: { pv: 100, defense: 50 },
        cookingTime: 5 * 60, // Temps en secondes (5 minutes)
    },
    {
        name: "Salade Balsamée",
        ingredients: ["tomate", "oignon", "ail", "huile olive"],
        image: "plats/salade-balsamee.png",
        description: "Une salade fraîche et légère, parfaite pour l'été.",
        effects: { pv: 50, attaque:50, defense: 30, agilite: 50, "chaud":true},
        cookingTime: 0 * 60, // Temps en secondes (Aucune cuisson)
    },
    {
        name: "Soupe de légumes aux herbes",
        ingredients: ["carotte", "oignon", "tomate", "eau"],
        image: "plats/soupe-legumes-herbes.png",
        description: "Une soupe de légumes réconfortante, parfaite pour les jours froids.",
        effects: { pv: 50, pm: 30, defense: 30, "froid":true},
        cookingTime: 4 * 60, // Temps en secondes (4 minutes)
    },
    {
        name: "Steak Grillé",
        ingredients: ["steak", "poivre", "sel", "creme fraiche"],
        image: "plats/steak-grille.png",
        description: "Un steak grillé à la perfection, assaisonné de poivre et de sel. Une sauce à la crème l'accompagne.",
        effects: { pv: 200, attaque: 100, defense: 50 },
        cookingTime: 8 * 60, // Temps en secondes (8 minutes)
    },
    {
        name: "Tartare Luxueux",
        ingredients: ["steak", "oeuf", "poivre", "sel"],
        image: "plats/tartare-luxueux.png",
        description: "Un tartare de boeuf de luxe, assaisonné avec soin.",
        effects: { pv: 300, attaque: 100, defenseMagique: 80 },
        cookingTime: 0 * 60, // Temps en secondes (Aucune cuisson)
    },
    {
        name: "Volcan de Cacao",
        ingredients: ["chocolat", "café", "lait de brebis", "sucre"],
        image: "plats/volcan-cacao.png",
        description: "Un volcan de chocolat chaud, avec un coeur fondant au chocolat. Une vraie protection contre le froid.",
        effects: { pv: 350, defense: 100, defenseMagique: 100, "froid":true},
        cookingTime: 3 * 60, // Temps en secondes (3 minutes)
    }
];



// Variables pour stocker les ingrédients sélectionnés
let selectedIngredients = [];
let isCooking = false; // Indique si un plat est en cours de cuisson

// Fonction pour ouvrir la modale
function openModal(slot) {
    const modal = document.getElementById("modal");
    modal.dataset.slot = slot; // Stocke le slot actuel dans la modale
    modal.classList.remove("hidden"); // Affiche la modale
}

// Fonction pour fermer la modale
function closeModal() {
    const modal = document.getElementById("modal");
    modal.classList.add("hidden"); // Masque la modale
}

// Fonction pour afficher les détails d'un ingrédient sélectionné
function updateIngredientDetails(event) {
    const ingredientId = event.target.value; // Récupère l'ID de l'ingrédient sélectionné
    const ingredient = ingredients.find((ing) => ing.id === ingredientId);

    if (ingredient) {
        // Met à jour la partie droite de la modale
        const ingredientImg = document.getElementById("ingredient-img");
        const ingredientName = document.getElementById("ingredient-name");
        const ingredientDesc = document.getElementById("ingredient-desc");

        ingredientImg.src = ingredient.image;
        ingredientImg.alt = ingredient.name;
        ingredientImg.classList.remove("hidden"); // Affiche l'image
        ingredientName.textContent = ingredient.name;
        ingredientDesc.textContent = ingredient.description;
    } else {
        // Réinitialise les détails si aucun ingrédient n'est sélectionné
        clearIngredientDetails();
    }
}

// Fonction pour réinitialiser les détails de l'ingrédient
function clearIngredientDetails() {
    const ingredientImg = document.getElementById("ingredient-img");
    const ingredientName = document.getElementById("ingredient-name");
    const ingredientDesc = document.getElementById("ingredient-desc");

    ingredientImg.src = "";
    ingredientImg.alt = "";
    ingredientImg.classList.add("hidden"); // Cache l'image
    ingredientName.textContent = "Nom";
    ingredientDesc.textContent = "Description";
}

function selectIngredient() {
    const modal = document.getElementById("modal");
    const slot = modal.dataset.slot; // Récupère le slot actuel
    const selectedDropdown = document.querySelector(`#modal select.category-select:not(:disabled)`);
    const ingredientId = selectedDropdown ? selectedDropdown.value : null;

    if (ingredientId) {
        const ingredient = ingredients.find((ing) => ing.id === ingredientId);

        if (ingredient) {
            const hotspot = document.querySelector(`.hotspot[data-slot="${slot}"]`);

            // Vérifie si l'ingrédient est un combustible
            if (ingredient.category === "combustibles") {
                if (!hotspot.classList.contains("hotspot-furnace")) {
                    alert("Les combustibles doivent être placés dans le hotspot-furnace !");
                    return;
                }
            } else {
                // Vérifie que les ingrédients non combustibles ne sont pas placés dans le hotspot-furnace
                if (hotspot.classList.contains("hotspot-furnace")) {
                    alert("Seuls les combustibles peuvent être placés dans le hotspot-furnace !");
                    return;
                }
            }

            // Met à jour le hotspot avec l'image de l'ingrédient
            hotspot.style.backgroundImage = `url(${ingredient.image})`;
            hotspot.style.backgroundSize = "contain";
            hotspot.style.backgroundRepeat = "no-repeat";
            hotspot.style.backgroundPosition = "center";
            hotspot.textContent = ""; // Supprime le "+" pour afficher uniquement l'image

            // Stocke l'ingrédient sélectionné
            selectedIngredients[slot - 1] = ingredientId;

            // Verrouille les autres menus déroulants
            lockOtherDropdowns(selectedDropdown);

            // Ferme la modale
            closeModal();
        }
    } else {
        alert("Veuillez sélectionner un ingrédient avant de confirmer.");
    }
}

// Fonction pour désactiver les autres menus déroulants
function lockOtherDropdowns(selectedDropdown) {
    document.querySelectorAll(".category-select").forEach((dropdown) => {
        if (dropdown !== selectedDropdown) {
            dropdown.disabled = true; // Désactive les autres menus déroulants
            dropdown.classList.add("disabled"); // Ajoute une classe pour les styles
        }
    });
}

// Fonction pour réactiver tous les menus déroulants
function unlockAllDropdowns() {
    document.querySelectorAll(".category-select").forEach((dropdown) => {
        dropdown.disabled = false; // Réactive tous les menus déroulants
        dropdown.classList.remove("disabled"); // Supprime la classe de style
    });
}

// Ajout des gestionnaires d'événements pour les menus déroulants
document.querySelectorAll(".category-select").forEach((select) => {
    select.addEventListener("change", (event) => {
        const ingredientId = event.target.value;

        if (ingredientId) {
            updateIngredientDetails(event); // Met à jour les détails de l'ingrédient
            lockOtherDropdowns(event.target); // Verrouille les autres menus déroulants
        } else {
            clearIngredientDetails(); // Réinitialise les détails si aucun ingrédient n'est sélectionné
            unlockAllDropdowns(); // Déverrouille tous les menus déroulants
        }
    });
});

// 
function confirmRecipe() {
    if (isCooking) {
        alert("Un plat est déjà en cours de cuisson !");
        return;
    }

    // Vérifie si un combustible est présent dans le hotspot-furnace
    const furnaceHotspot = document.querySelector(".hotspot-furnace");
    const furnaceIngredient = selectedIngredients[furnaceHotspot.dataset.slot - 1];
    const isFurnaceValid = ingredients.find(
        (ing) => ing.id === furnaceIngredient && ing.category === "combustibles"
    );

    if (!isFurnaceValid) {
        alert("Veuillez placer un combustible dans le hotspot-furnace pour démarrer la cuisson !");
        return;
    }

    // Filtre les ingrédients pour exclure les combustibles
    const filteredIngredients = selectedIngredients.filter((ingredientId) => {
        const ingredient = ingredients.find((ing) => ing.id === ingredientId);
        return ingredient && ingredient.category !== "combustibles";
    });

    // Vérifie si les ingrédients correspondent à une recette
    const recipe = recipes.find((rec) =>
        rec.ingredients.every((ing) => filteredIngredients.includes(ing)) &&
        filteredIngredients.every((ing) => rec.ingredients.includes(ing))
    );

    if (recipe) {
        // Démarre la cuisson
        startCooking(recipe);
    } else {
        alert("Les ingrédients sélectionnés ne donnent aucun plat.");
    }
}

// Fonction pour démarrer la cuisson
function showRecipeResult(recipe) {
    const modal = document.getElementById("recipe-result-modal");

    if (!modal) {
        console.error("L'élément #recipe-result-modal est introuvable.");
        return;
    }

    // Play the sound
    const audio = new Audio("sons/item-normal.mp3");
    console.log("Audio object created:", audio);

    audio.play().then(() => {
        console.log("Audio is playing");
    }).catch((error) => {
        console.error("Error playing audio:", error);
    });

    // Update recipe details
    const recipeName = document.getElementById("recipe-name");
    const recipeImg = document.getElementById("recipe-img");
    const recipeDesc = document.getElementById("recipe-desc");
    const recipeEffects = document.getElementById("recipe-effects");

    recipeName.textContent = recipe.name;
    recipeImg.src = recipe.image;
    recipeImg.alt = recipe.name;

    // Handle image loading errors
    recipeImg.onerror = () => {
        recipeImg.src = "assets/images/default-placeholder.png"; // Default image
        recipeImg.alt = "Image non disponible";
    };

    recipeDesc.textContent = recipe.description;

    // Clear existing effects
    recipeEffects.innerHTML = "";

    // Add effects dynamically
    Object.entries(recipe.effects).forEach(([effect, value]) => {
        const effectItem = document.createElement("li");
        effectItem.innerHTML = `${getEffectIcon(effect)} ${value}`;
        recipeEffects.appendChild(effectItem);
    });

    // Show the modal
    modal.classList.remove("hidden");
}

function updateTimeCountdown() {
    const cookingData = JSON.parse(localStorage.getItem("cookingData"));

    if (cookingData) {
        const { endTime } = cookingData;
        const currentTime = Date.now();
        const timeLeft = Math.max(0, Math.floor((endTime - currentTime) / 1000)); // Temps restant en secondes

        const countdownElement = document.getElementById("time-countdown");
        if (countdownElement) {
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            countdownElement.textContent = `${minutes}m ${seconds}s`;

            // Si le temps est écoulé, supprimez le compte à rebours
            if (timeLeft === 0) {
                localStorage.removeItem("cookingData");
                countdownElement.textContent = "Terminé !";
            }
        }
    }
}
// Fonction pour démarrer la cuisson avec persistance
function startCooking(recipe) {
    isCooking = true;

    const combustible = selectedIngredients[0];
    let cookingTime = recipe.cookingTime;

    if (combustible === "charbon") {
        cookingTime -= 3 * 60; // Réduction de 3 minutes
    } else if (combustible === "pierre-volcanique") {
        cookingTime -= 7 * 60; // Réduction de 7 minutes
    }

    const endTime = Date.now() + cookingTime * 1000;

    // Stocke les données de cuisson dans localStorage
    localStorage.setItem(
        "cookingData",
        JSON.stringify({ recipe, endTime })
    );

    alert(`La cuisson de ${recipe.name} a commencé ! Temps restant : ${cookingTime / 60} minutes.`);

    // Simule la cuisson avec un délai
    setTimeout(() => {
        isCooking = false;
        localStorage.removeItem("cookingData");
        showRecipeResult(recipe);
    }, cookingTime * 1000);
}

function closeRecipeModal() {
    const modal = document.getElementById("recipe-result-modal");
    modal.classList.add("hidden"); // Ajoute la classe "hidden" pour masquer le modal
}

// Fonction pour jouer une musique en boucle
function playBackgroundMusic(audioFile = "sons/Miitopia OST -  INN Meal.mp3") {
    const audio = new Audio(audioFile);
    audio.loop = true;
    audio.volume = 0.8;
    audio.play().catch((error) => {
        console.error("Erreur lors de la lecture de la musique :", error);
    });
    registerAudio(audio); // <== ENREGISTRE le son pour pouvoir le modifier plus tard
    return audio;
}


// Appelle updateTimeCountdown toutes les secondes
setInterval(updateTimeCountdown, 1000);

document.addEventListener("click", function once() {
    playBackgroundMusic();
    document.removeEventListener("click", once); // Une seule fois
});


function playMusicWithLog(audioFile = "sons/Miitopia OST -  INN Meal.mp3") {
    const audio = new Audio(audioFile);
    audio.loop = true; // Active la lecture en boucle
    audio.volume = 0.8; // Définit le volume à 80%
    audio.play()
        .then(() => {
            console.log(`Lecture de la musique : ${audioFile}`);
        })
        .catch((error) => {
            console.error("Erreur lors de la lecture de la musique :", error);
        });
    return audio; // Retourne l'objet audio pour un contrôle ultérieur si nécessaire
}

// Fonction pour afficher uniquement la couverture du livre
function showRecipeBook() {
    const recipeBook = document.getElementById("recipe-book");
    const bookContent = document.getElementById("book-content");

    if (!recipeBook || !bookContent) {
        console.error("L'élément #recipe-book ou #book-content est introuvable.");
        return;
    }

    // Affiche le livre directement
    recipeBook.classList.remove("hidden");
    bookContent.classList.remove("hidden");

    // Affiche les recettes de la première page
    displayRecipes();
}

// Fonction pour ouvrir le livre de recettes
function openRecipeBook() {
    const bookCover = document.getElementById("book-cover");
    const bookContent = document.getElementById("book-content");

    // Cache la couverture et affiche le contenu
    bookCover.classList.add("hidden");
    bookContent.classList.remove("hidden");

    // Joue le son d'ouverture
    pageFlipSound.play();

    // Affiche les recettes de la première page
    displayRecipes();
}

// Fonction pour fermer le livre de recettes
function closeRecipeBook() {
    const recipeBook = document.getElementById("recipe-book");
    recipeBook.classList.add("hidden"); // Cache tout le livre
}

// Fonction pour afficher les recettes sur la page actuelle
function displayRecipes() {
    const leftRecipe = document.getElementById("left-recipe");
    const rightRecipe = document.getElementById("right-recipe");

    // Calcul des indices des recettes à afficher
    const startIndex = currentPage * recipesPerPage;
    const recipesToShow = recipes.slice(startIndex, startIndex + recipesPerPage);

    // Affiche la recette de gauche
    if (recipesToShow[0]) {
        leftRecipe.innerHTML = `
            <h2>${recipesToShow[0].name}</h2>
            <img src="${recipesToShow[0].image}" alt="${recipesToShow[0].name}">
            <p>${recipesToShow[0].description}</p>
            <ul>
                ${recipesToShow[0].ingredients.map(ing => `<li>${ing}</li>`).join("")}
            </ul>
            <p>Temps de cuisson : ${recipesToShow[0].cookingTime / 60} minutes</p>
        `;
    } else {
        leftRecipe.innerHTML = ""; // Vide si aucune recette
    }

    // Affiche la recette de droite
    if (recipesToShow[1]) {
        rightRecipe.innerHTML = `
            <h2>${recipesToShow[1].name}</h2>
            <img src="${recipesToShow[1].image}" alt="${recipesToShow[1].name}">
            <p>${recipesToShow[1].description}</p>
            <ul>
                ${recipesToShow[1].ingredients.map(ing => `<li>${ing}</li>`).join("")}
            </ul>
            <p>Temps de cuisson : ${recipesToShow[1].cookingTime / 60} minutes</p>
        `;
    } else {
        rightRecipe.innerHTML = ""; // Vide si aucune recette
    }
}

// Fonction pour aller à la page suivante
function nextPage() {
    if ((currentPage + 1) * recipesPerPage < recipes.length) {
        currentPage++;
        displayRecipes();
        pageFlipSound.play(); // Joue le son de changement de page
    }
}

// Fonction pour revenir à la page précédente
function prevPage() {
    if (currentPage > 0) {
        currentPage--;
        displayRecipes();
        pageFlipSound.play(); // Joue le son de changement de page
    }
}

// Fonction pour obtenir l'icône d'un effet
function getEffectIcon(effect) {
    const icons = {
        pv: "❤️",
        pm: "❇️",
        attaque: "⚔️",
        defense: "🛡️",
        attaqueMagique: "🔮",
        defenseMagique: "✴️",
        agilite: "🥾",
        chaud: "🔥",
        froid: "❄️",
    };
    return icons[effect] || "";
}

// Liste pour stocker tous les objets audio
const audioElements = [];

// Fonction pour ajuster le volume global
function adjustVolume(volume) {
    audioElements.forEach(audio => {
        audio.volume = volume;
    });
    console.log(`Volume réglé à : ${volume}`);
}

// Fonction pour enregistrer un objet audio
function registerAudio(audio) {
    audioElements.push(audio);
}

// Exemple : Enregistrer les sons existants
pageFlipSound.volume = 0.8; // Volume initial
registerAudio(pageFlipSound);

// Si vous avez d'autres sons, enregistrez-les ici
const cookingSound = new Audio("sons/Miitopia OST -  INN Meal.mp3");
const itemSound = new Audio("sons/item-normal.mp3");
itemSound.volume = 0.8; // Volume initial
registerAudio(itemSound);

// Exemple d'utilisation dans une fonction
function playSound(audio) {
    audio.play().catch(error => console.error("Erreur lors de la lecture du son :", error));
}