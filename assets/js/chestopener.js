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

function openChest(chestType) {
    const lootRarities = lootTable[chestType];

    // Generate loot
    const lootRarity = lootRarities[Math.floor(Math.random() * lootRarities.length)];
    const lootItem = generateLootItem(lootRarity);

    // Play slot machine sound
    slotMachineSound.play();

    // Open modal with slot machine effect
    openModal(lootItem, lootRarities);
}

function generateLootItem(rarity) {
    const items = {
        'Commun': [
            { name: 'Arachno-Épée', type: 'Arme', value: 1500, rarity: 'Commun', imageUrl: 'https://cdn.discordapp.com/attachments/1112081601392816128/1269421661522759821/3Fp3Fe_de_Garde_Royal_BOTW.png?ex=679f48cc&is=679df74c&hm=b592b4654d2c926a3e8d63c5cc5b1ee3059666f73d48a873dc18707ff2f48266&' },
            { name: 'Masse à Pointes de Gobelin', type: 'Arme', value: 200, rarity: 'Commun', imageUrl: 'https://cdn.discordapp.com/attachments/1112081601392816128/1269421662911332446/Massue_3F_Pointes_Boko_BOTW.png?ex=679f48cd&is=679df74d&hm=cfa405c3af9d6205efe03e1b24bc20ab3475b62b0316f73aaaf4831af4922101&' },
            { name: 'Épée de Gelée', type: 'Arme', value: 200, rarity: 'Commun', imageUrl: 'https://cdn.discordapp.com/attachments/1112081601392816128/1284485102859980831/1726315095484.png?ex=679f5f79&is=679e0df9&hm=5d9b3bf475e69f3532bab724b4a283401fd18592bc1187049e9e97ead98f2e21&' },
            { name: 'Épée des Brises', type: 'Arme', value: 150, rarity: 'Commun', imageUrl: 'https://cdn.discordapp.com/attachments/1112081601392816128/1269451038969172028/76b5f1fdddd603fcca816b68001c86e7_4152323267464124372.webp?ex=679f6428&is=679e12a8&hm=3b875da5f7ecd960850e7d2f3fca45dea695c8d4b76a5d55f8e36a265a48721f&' },
            { name: 'Épée Miteuse', type: 'Arme', value: 110, rarity: 'Commun', imageUrl: 'https://cdn.discordapp.com/attachments/1112081601392816128/1269421664874139690/3Fp3Fe_de_Soldat_BOTW.png?ex=679f48cd&is=679df74d&hm=0842c36173a08d8ef618ba1c411a44b747c69bc97de225f66e1977e163ad69e2&' },
            { name: 'Arc Tribal', type: 'Arme', value: 6000, rarity: 'Commun', imageUrl: 'https://cdn.discordapp.com/attachments/1112081601392816128/1269451041238421554/d067446db511aeea93979e8c6ff2f5cc_8648999879603423640.webp?ex=679f6429&is=679e12a9&hm=2b86392498bdbd4b0261312a58bb8c3ec9e9a6545626b460cd5209db793e37af&' },
            { name: 'Lance de Soldat', type: 'Arme', value: 7000, rarity: 'Commun', imageUrl: 'https://cdn.discordapp.com/attachments/1112081601392816128/1269451040936300596/b1f4088b475f9cfc32f554eef7d6d8c7_905701490730946267.webp?ex=679f6429&is=679e12a9&hm=da3cd346608b388fd61d55d49831257ea6071ee6f52ce7d0f8f30d7ed3375d45&' },
            { name: 'Jumeaux Millénaires', type: 'Arme', value: 8000, rarity: 'Commun', imageUrl: 'https://cdn.discordapp.com/attachments/1112081601392816128/1269451040286179363/cb1a8ecc5b657e2653bac0c15c540d94_6729285924838762169.webp?ex=679f6429&is=679e12a9&hm=7f4c160580aa5398ec43e1b34aa69e0e146f8d9c2f611373b7f9b7c943bb035b&' },
            { name: 'Marteau Lourd en Fer', type: 'Arme', value: 4000, rarity: 'Commun', imageUrl: 'https://cdn.discordapp.com/attachments/1112081601392816128/1269436051693371515/Marteau_en_Fer_BOTW.png?ex=679f5633&is=679e04b3&hm=d83534cb079aca7156fb331011692538d923689a33b5ca32ce24f87ca4048dc2&' },
            { name: 'Chapeau Blanc', type: 'Armure', value: 1000, rarity: 'Commun', imageUrl: 'https://cdn.discordapp.com/attachments/1112081601392816128/1269454914719842354/1722731939889.png?ex=679f67c5&is=679e1645&hm=fcc8475623c4838de0933b92dcf24bec025b4b04c5495d656ff6eb01d1d0e62c&' },
            { name: 'Cape Violette', type: 'Armure', value: 700, rarity: 'Commun', imageUrl: 'https://cdn.discordapp.com/attachments/1112081601392816128/1279254566617092107/1722692239466.png?ex=679f75e8&is=679e2468&hm=ca93da0442ba20bfe5124eb4ed710b94dddace75b799f86fb160a1081e6be9fe&' },
            { name: 'Bottes en cuir', type: 'Armure', value: 500, rarity: 'Commun', imageUrl: 'https://cdn.discordapp.com/attachments/1112081601392816128/1269445085255172166/1722729649231.png?ex=679f5e9d&is=679e0d1d&hm=1fb68c8154cf109963f0fca19077db30b1e3fa1bcff99384bd584c9043f1b53c&' },
            { name: 'Vieilles bottes', type: 'Armure', value: 200, rarity: 'Commun', imageUrl: 'https://cdn.discordapp.com/attachments/1112081601392816128/1269445088493174795/1722729153773.png?ex=679f5e9e&is=679e0d1e&hm=26cba3a5228a0ff655f3480e082fa3ee3575c19aa21c1dd8dbb62e47ef316d94&' },
            { name: 'Dé de la Prédilection', type: 'Artéfact', value: 2000, rarity: 'Commun', imageUrl: 'https://cdn.discordapp.com/attachments/1112081601392816128/1269437663325192223/1722644423141.png?ex=679f57b3&is=679e0633&hm=b846368b13b95d919c0e13d7785063a09693304a4053e815be084998d0076390&' },
            { name: 'Coupe du Crâne', type: 'Artéfact', value: 1000, rarity: 'Commun', imageUrl: 'https://cdn.discordapp.com/attachments/1112081601392816128/1269437664822558761/1722644341246.png?ex=679f57b4&is=679e0634&hm=a4fa28d1f1dc82ac0186e3d418bedf0ad242a95fe7586eaa2ba17cf6b9e6ff7d&' },
            { name: 'Fiole d`énergie', type: 'Artéfact', value: 500, rarity: 'Commun', imageUrl: 'https://cdn.discordapp.com/attachments/1112081601392816128/1269437666110210128/1722644239593.png?ex=679f57b4&is=679e0634&hm=194414fd3612f4e025fc02c0dcd174bfffa83dd0fca8e70408b62273d782c741&' },
            { name: 'Petite Potion de Magie', type: 'Consommable', value: 50, rarity: 'Commun', imageUrl: 'https://cdn.discordapp.com/attachments/1112081601392816128/1279254218741645372/1724507787825.png?ex=679f7595&is=679e2415&hm=516580f9cdd120f8d2cf7fd354f75bc99e7682afd813a23585f894ae8fb0241b&' },
        ],
        'Peu commun': [
            { name: 'Appel de l`Aube', type: 'Arme', value: 2000, rarity: 'Peu commun', imageUrl: 'https://cdn.discordapp.com/attachments/1242439502769819659/1335280597257424926/860925943152771111.webp?ex=679f9876&is=679e46f6&hm=cd37b25d4c5a795c3fffe9388f1c25ec733f9185e0a61eed8ef5f840732787b5&' },
            { name: 'Chevaucheur du Ciel', type: 'Arme', value: 4000, rarity: 'Peu commun', imageUrl: 'https://cdn.discordapp.com/attachments/1242439502769819659/1335280878070530118/860925943152771111.webp?ex=679f98b9&is=679e4739&hm=b936b0c1657bb46f74b104934fdc52a9dacd7ae1d3ca49da23f42cc845030a0d&' },
            { name: 'Contes de flammes puériles', type: 'Arme', value: 1500, rarity: 'Peu commun', imageUrl: 'https://cdn.discordapp.com/attachments/1242439502769819659/1335281108543213680/860925943152771111.webp?ex=679f98f0&is=679e4770&hm=e344ecc559529ce20eaf8e905ebdfdf6c79621ae57cd322decd64a520d925730&' },
            { name: 'Hache Zoblin Lourde', type: 'Arme', value: 200, rarity: 'Peu commun', imageUrl: 'https://cdn.discordapp.com/attachments/1112081601392816128/1269421665587040316/Draco-Batte_Moblin_BOTW.png?ex=679f48cd&is=679df74d&hm=c39fa2911f72fa088a3bde6617b6ceee5092109593d6dc182bfd9d5023be5785&' },
            { name: 'Pointe de Givre', type: 'Arme', value: 2300, rarity: 'Peu commun', imageUrl: 'https://cdn.discordapp.com/attachments/1112081601392816128/1269421664307773534/Longue_3Fp3Fe_des_Glaces_BOTW.png?ex=679f48cd&is=679df74d&hm=3ad98f6737a17b98c580fe982a28d6460da6750aa07afc5ebce1e25424a7e059&' },
            { name: 'Plaie des Foudres', type: 'Arme', value: 2300, rarity: 'Peu commun', imageUrl: 'https://cdn.discordapp.com/attachments/1112081601392816128/1269421666379890771/Longue_3Fp3Fe_3Flectrique_BOTW.png?ex=679f48cd&is=679df74d&hm=bac6b2cc66bb396261baad344a125454ebeb0532d2100b59282b45826c98f9a3&' },
            { name: 'Lame Éphémère', type: 'Arme', value: 1200, rarity: 'Peu commun', imageUrl: 'https://cdn.discordapp.com/attachments/1112081601392816128/1269451039237472387/e3ea3b0c15fe4c2c729741a96ca78638_269903169606418112.webp?ex=679f6429&is=679e12a9&hm=c2967d27984062ba85e0e830a1e5e2b9cc53a1143609bdb920acdb1a17bf0cd6&' },
            { name: 'Arc Rapiécé', type: 'Arme', value: 3200, rarity: 'Peu commun', imageUrl: 'https://cdn.discordapp.com/attachments/1112081601392816128/1269451039518625884/ad70ad38f33a956881d6fcae71ff92fb_1296997027222093908.webp?ex=679f6429&is=679e12a9&hm=ed9114c3ab78f529849ceb4bd178bc0dd286219a8c4684984b1b4fdaf69ce83e&' },
            { name: 'Cryo-Crash', type: 'Arme', value: 18000, rarity: 'Peu commun', imageUrl: 'https://cdn.discordapp.com/attachments/1112081601392816128/1279254567128924275/1722692185175.png?ex=679f75e8&is=679e2468&hm=ca50cc54cb3f205555203d204caa8f2279bbd2cb05c3f5b312f2053c7666d065&' },
            { name: 'Hache de Maître', type: 'Arme', value: 7000, rarity: 'Peu commun', imageUrl: 'https://cdn.discordapp.com/attachments/1112081601392816128/1269437777905455174/Hache_du_Maitre_BOTW.png?ex=679f57cf&is=679e064f&hm=dc871eb3d6f69db987a6928df63764d6bb9f2f503d6ce997f7a8248f35fc403f&' },
            { name: 'Ruche Arcanique', type: 'Armure', value: 5000, rarity: 'Peu commun', imageUrl: 'https://cdn.discordapp.com/attachments/1112081601392816128/1269454915286077470/1722732016012.png?ex=679f67c5&is=679e1645&hm=4256ec73bd9d9763b71aac45a724de9fa33522999136db551e1b6cf79a143d83&' },
            { name: 'Casque Diurne', type: 'Armure', value: 5000, rarity: 'Peu commun', imageUrl: 'https://cdn.discordapp.com/attachments/1112081601392816128/1279254566012977163/1722692266727.png?ex=679f75e7&is=679e2467&hm=33f319bcfbf9282e686b318b07985ded074f015cf537d1f67f3077b914f6df6c&' },
            { name: 'Plastron du Valeureux', type: 'Armure', value: 7200, rarity: 'Peu commun', imageUrl: 'https://cdn.discordapp.com/attachments/1112081601392816128/1269437617112485998/1722645505058.png?ex=679f57a8&is=679e0628&hm=f803d1c3bbca1d32a4bf65547ea2240458e6fdedc25badd8b27f32ff8ed89858&' },
            { name: 'Talons d`Estropié', type: 'Armure', value: 800, rarity: 'Peu commun', imageUrl: 'https://cdn.discordapp.com/attachments/1112081601392816128/1269445085737783296/1722729639394.png?ex=679f5e9d&is=679e0d1d&hm=b16d7a4c744aed14cd2cfe2bc81f65efc9b84960e7eaacfef255c718d3f4ad05&' },
            { name: 'Bottes en Maille', type: 'Armure', value: 800, rarity: 'Peu commun', imageUrl: 'https://cdn.discordapp.com/attachments/1112081601392816128/1269445086236770405/1722729581321.png?ex=679f5e9d&is=679e0d1d&hm=78d752df05837ba4bd80290abbef8284223bb1ce118de3249d471773fc5c6ee7&' },
            { name: 'Bottes funèbres', type: 'Armure', value: 1650, rarity: 'Peu commun', imageUrl: 'https://cdn.discordapp.com/attachments/1112081601392816128/1269445086790553713/1722729594474.png?ex=679f5e9d&is=679e0d1d&hm=d296bd30c6d3ee8a9388f27e348dd5016479072b0ae0f6916ca3964c235fe6e4&' },
            { name: 'Jambières du Seigneur', type: 'Armure', value: 36000, rarity: 'Peu commun', imageUrl: 'https://cdn.discordapp.com/attachments/1112081601392816128/1312796104324157460/1733065259862.png?ex=679f8925&is=679e37a5&hm=fe52c15b01acbb9b7d3996ace722b4f3d9a906ec9f6fa21edc686226afe0c87a&' },
            { name: 'Grimoire du Gel', type: 'Artéfact', value: 3000, rarity: 'Peu commun', imageUrl: 'https://cdn.discordapp.com/attachments/1112081601392816128/1269437299272450119/1722692136740.png?ex=679f575d&is=679e05dd&hm=eb6dadc644e81f97553f1eafd2a83be227366b7283881a4a4009ec97016fd7ab&' },
            { name: 'Moyenne Potion de Magie', type: 'Consommable', value: 240, rarity: 'Peu commun', imageUrl: 'https://cdn.discordapp.com/attachments/1112081601392816128/1279254120712114297/1724540187649.png?ex=679f757d&is=679e23fd&hm=6ff3e44b9dbf782382112d681bd3f303fa963b8a2d18f5d72dfe3c96313a14f4&' },
        ],
        'Rare': [
            { name: 'Les Septs Étoiles', type: 'Arme', value: 5000, rarity: 'Rare', imageUrl: 'https://cdn.discordapp.com/attachments/1112081601392816128/1266457005040603329/1722004241508.png?ex=67a05d3f&is=679f0bbf&hm=5f7e23ca9532b5c13e574e6462cbb4a5be55fe6cc46ab9ef3afbd0dfdb7011a3&' },
            { name: 'Arc de chevalier', type: 'Arme', value: 50000, rarity: 'Rare', imageUrl: 'https://cdn.discordapp.com/attachments/1112081601392816128/1269440906541666446/Arc_de_Chevalier_BOTW.png?ex=679f5ab9&is=679e0939&hm=75e47a5ce4e45be6b5ce47bf708d1acd35f97cdfc8086959aecba2027b97879c&' },
            { name: 'Brise-Roc', type: 'Arme', value: 1650, rarity: 'Rare', imageUrl: 'https://cdn.discordapp.com/attachments/1112081601392816128/1269421662110224488/Casse-Pierre_BOTW.png?ex=67a09a4c&is=679f48cc&hm=d90a10d265182575ed960f2188c59d76c1a3803afb5e9b8305c335c3e7abdc47&' },
            { name: 'Étoile Polaire', type: 'Arme', value: 7000, rarity: 'Rare', imageUrl: 'https://cdn.discordapp.com/attachments/1112081601392816128/1269451038147084400/9a64ddb47d748cc931e07ea7b075fd48_7325752547677651133.webp?ex=679f6428&is=679e12a8&hm=6976a99691916f0138213e11a85b791e651cfcd9372ce9edc53a9f8f433e906b&' },
            { name: 'Débats des Picots', type: 'Arme', value: 9500, rarity: 'Rare', imageUrl: 'https://cdn.discordapp.com/attachments/1112081601392816128/1269451038616715264/b7147d3fa4bd2612434e989ec5ec52dd_6738898461348391045.webp?ex=679f6428&is=679e12a8&hm=44911cae3cb1574feed86ff5187eb23d906d96d1175d4b284c4e40faacc83dc8&' },
            { name: 'Ossoir Écarlate', type: 'Arme', value: 30000, rarity: 'Rare', imageUrl: 'https://cdn.discordapp.com/attachments/1112081601392816128/1284485138247585843/1726312994525.png?ex=679f5f81&is=679e0e01&hm=9e73526ce9c0e885d6024ce983815a562e26195061f65b56ec3bfb48d03821b1&' },
            { name: 'Torsadée Fumante', type: 'Arme', value: 25000, rarity: 'Rare', imageUrl: 'https://cdn.discordapp.com/attachments/1112081601392816128/1284485120052695070/1726313149711.png?ex=679f5f7d&is=679e0dfd&hm=2f20a9628ab8bc81be4ebc9e264483c48508c3701d2aeba1bb48692712bd09f5&' },
            { name: 'Claymore des Dorures', type: 'Arme', value: 34000, rarity: 'Rare', imageUrl: 'https://cdn.discordapp.com/attachments/1112081601392816128/1269437780262653952/1722039572059.png?ex=679f57cf&is=679e064f&hm=afe431c7191ae01ea6aaa5111de4d974a0c52d42d5f964575df033cd9f415f6a&' },
            { name: 'Bâton du Dragon Ancien', type: 'Arme', value: 9000, rarity: 'Rare', imageUrl: 'https://cdn.discordapp.com/attachments/1112081601392816128/1284485524781793350/1726315594599.png?ex=679f5fdd&is=679e0e5d&hm=eda6d13441faa4af7779c03112b25ef798bb275200579be12c9e48711939fdf3&' },
            { name: 'Croissant Braisé', type: 'Arme', value: 20000, rarity: 'Rare', imageUrl: 'https://cdn.discordapp.com/attachments/1112081601392816128/1284485128504213606/1726313078314.png?ex=679f5f7f&is=679e0dff&hm=ac8b1e082dffd08945d9fb307800872e5e3ecfe3da4334a354f795537dc0aee7&' },
            { name: 'Runes des Cimes Muettes', type: 'Arme', value: 16000, rarity: 'Rare', imageUrl: 'https://cdn.discordapp.com/attachments/1112081601392816128/1269437779880706069/1722040103646.png?ex=679f57cf&is=679e064f&hm=f8352397746641984cd69ecc37701b3a1ba39852777ed6e455c88dcccd5b7566&' },
            { name: 'Tunique du Géomancien', type: 'Armure', value: 80000, rarity: 'Rare', imageUrl: 'https://cdn.discordapp.com/attachments/1112081601392816128/1269526598218944512/1722749114074.png?ex=679f01c7&is=679db047&hm=66e97e8e0c9b34143989716fb65ca5bebd7deb498533f4f9b44b0cd8597634de&' },
            { name: 'Voile des Lustres', type: 'Armure', value: 18000, rarity: 'Rare', imageUrl: 'https://cdn.discordapp.com/attachments/1112081601392816128/1279254568789737553/1722692123806.png?ex=679f75e8&is=679e2468&hm=9fe034953605f5945785711b3e7b57b19388880d1973fa7c9f3a11904c40a559&' },
            { name: 'Gantelet Démoniaque', type: 'Armure', value: 9000, rarity: 'Rare', imageUrl: 'https://cdn.discordapp.com/attachments/1112081601392816128/1279254570010284114/1722692052120.png?ex=679f75e8&is=679e2468&hm=ac3ac9efd38801c2a0a197a211d2753689ba43eed3412026cd054aa5a6a4b4d3&' },
            { name: 'Armure du Loup', type: 'Armure', value: 11000, rarity: 'Rare', imageUrl: 'https://cdn.discordapp.com/attachments/1112081601392816128/1279254622849994833/1722689054427.png?ex=679f75f5&is=679e2475&hm=e9c095176128e0c13113805960a43c21c39cbf9312509b63606952d9c555494d&' },
            { name: 'Ailes de Cuivre', type: 'Armure', value: 12500, rarity: 'Rare', imageUrl: 'https://cdn.discordapp.com/attachments/1112081601392816128/1279254624041308302/1722688725756.png?ex=679f75f5&is=679e2475&hm=4b9f711e808a7468ec34f39e5289157b02685e831ac800291ba31a40e3b4d36e&' },
            { name: 'Gants Placides', type: 'Armure', value: 8500, rarity: 'Rare', imageUrl: 'https://cdn.discordapp.com/attachments/1112081601392816128/1269437441945632871/1722688474164.png?ex=679f577f&is=679e05ff&hm=b8612e7e69bedf3b2a02017d40630b8c086a1bd222f7f625cd3047ee07ce4827&' },
            { name: 'Gants Turquoises', type: 'Armure', value: 6000, rarity: 'Rare', imageUrl: 'https://cdn.discordapp.com/attachments/1112081601392816128/1269437522094719018/1722688487594.png?ex=679f5792&is=679e0612&hm=b8070947d73b39764775c8dece5f4a71c13c33c274caf334f4c08ba8e8c6e4d4&' },
            { name: 'Patins Bleutés', type: 'Armure', value: 2100, rarity: 'Rare', imageUrl: 'https://cdn.discordapp.com/attachments/1112081601392816128/1269445087952113685/1722729141374.png?ex=679f5e9e&is=679e0d1e&hm=23687138abdeb982fe437800a3fb1bc0222443328a929fc43f1a5cc3bc2a6ea5&' },
            { name: 'Jambières Turquoises', type: 'Armure', value: 7000, rarity: 'Rare', imageUrl: 'https://cdn.discordapp.com/attachments/1112081601392816128/1312796224751009923/1733064871347.png?ex=679f8942&is=679e37c2&hm=cf2eef760d28557f038732b547c44c836ff545d4e6cff8ed554606498a5492f2&' },
            { name: 'Pierre de la Raison', type: 'Artéfact', value: 10000, rarity: 'Rare', imageUrl: 'https://cdn.discordapp.com/attachments/1112081601392816128/1269437298701766798/1722692148881.png?ex=679f575d&is=679e05dd&hm=8dd0d723152f8c2031d6869ac4620d61762f1e78dca91960fa48d2930bfc4369&' },
            { name: 'Ombrelle des Lagunes', type: 'Artéfact', value: 18390, rarity: 'Rare', imageUrl: 'https://cdn.discordapp.com/attachments/1112081601392816128/1279254619381567539/1722691928041.png?ex=679f75f4&is=679e2474&hm=ad2a828b7d24ed2d5b5ab7e766551b37b9f4b08feb7e3c0ef9db08748170f57e&' },
            { name: 'Grande Potion de Magie', type: 'Consommable', value: 780, rarity: 'Rare', imageUrl: 'https://cdn.discordapp.com/attachments/1112081601392816128/1279254120468971600/1724540287576.png?ex=679f757d&is=679e23fd&hm=a4e71cf39d5a4c6bbabfb3baeeac9edb02df77098c6a45072cb7381c979e2d71&' },
        ],
        'Épique': [
            { name: 'Décadence du Temps', type: 'Arme', value: 51000, rarity: 'Épique', imageUrl: 'https://cdn.discordapp.com/attachments/1112081601392816128/1269436167192051795/1722726199723.png?ex=679f564f&is=679e04cf&hm=9ca91bbaa688dce56128b85758b885cbcefe0055a473b629907764be3f842312&' },
            { name: 'Couteau des Veines Hypnotiques', type: 'Arme', value: 86000, rarity: 'Épique', imageUrl: 'https://cdn.discordapp.com/attachments/1112081601392816128/1269437437755789375/1722691872814.png?ex=679f577e&is=679e05fe&hm=9465ebbe71cfb03326ca2f1012210e8b5b67a1af033250908dd583ce77b32728&' },
            { name: 'Masque du Carnassier', type: 'Armure', value: 80000, rarity: 'Épique', imageUrl: 'https://cdn.discordapp.com/attachments/1112081601392816128/1269437618232234046/1722645430572.png?ex=679f57a9&is=679e0629&hm=e925976ead0dbc1b83ac9f3601176e53e47521b0fd0cac089d0578ea6a505ec7&' },
            { name: 'Robe du Sage', type: 'Armure', value: 980000, rarity: 'Épique', imageUrl: 'https://cdn.discordapp.com/attachments/1112081601392816128/1279254737811935295/1722645707667.png?ex=679f7610&is=679e2490&hm=54940f55768a75c4b014dd81a3514039090b6daf155cfaf2a291999810157819&' },
            { name: 'Côte Perlée', type: 'Armure', value: 79000, rarity: 'Épique', imageUrl: 'https://cdn.discordapp.com/attachments/1112081601392816128/1279254569431597137/1722692069220.png?ex=679f75e8&is=679e2468&hm=53d02a754905151d0797e3c18c8776dd777e6a485a4fc2f38b60bc4434c73ca0&' },
            { name: 'Gantelets du Titan Rocheux', type: 'Armure', value: 14000, rarity: 'Épique', imageUrl: 'https://cdn.discordapp.com/attachments/1112081601392816128/1269437615027912754/1722645652211.png?ex=679f57a8&is=679e0628&hm=ec843dd59486ec5466963b372258be5fb761edc81f194bb0080259dbc4ebf453&' },
            { name: 'Bottes du Spectre Ancestral', type: 'Armure', value: 22000, rarity: 'Épique', imageUrl: 'https://cdn.discordapp.com/attachments/1112081601392816128/1312784527214776332/1733062505762.png?ex=679f7e5d&is=679e2cdd&hm=e43e8d2a3263ff84715b49639dd8924a0f9e186f64f7861319822ee40a7642a2&' },
            { name: 'Bottes Phantom', type: 'Armure', value: 25000, rarity: 'Épique', imageUrl: 'https://cdn.discordapp.com/attachments/1112081601392816128/1312784536525996122/1733062547624.png?ex=679f7e5f&is=679e2cdf&hm=4086ea1505560e1117468f0342dd4b5b246ae5666333a8fecbf2a8b51490dee4&' },
            { name: 'Ocarina des Nuages', type: 'Artéfact', value: 20000, rarity: 'Épique', imageUrl: 'https://cdn.discordapp.com/attachments/1112081601392816128/1279254620685865043/1722689125124.png?ex=679f75f4&is=679e2474&hm=5209505f8f9e9fe4408bae0bb51966b3631b3e04dcb8a9ba8ab8dc122f8d1cd8&' },
            { name: 'Fiole des Âmes', type: 'Artéfact', value: 15700, rarity: 'Épique', imageUrl: 'https://cdn.discordapp.com/attachments/1112081601392816128/1269437618911969413/1722645216396.png?ex=679f57a9&is=679e0629&hm=93ad97987a9b762c0691229518b77a4a46870f091963bba957523bfeadad0382&' },
            { name: 'Bougie des Reliques', type: 'Artéfact', value: 20000, rarity: 'Épique', imageUrl: 'https://cdn.discordapp.com/attachments/1112081601392816128/1269437664331829309/1722644398029.png?ex=679f57b4&is=679e0634&hm=6261eb10b26d9bf7a09313e375a360b15c5b20f3a2514fa1086595c836f7844d&' },
            { name: 'Basilique du Démon', type: 'Artéfact', value: 50000, rarity: 'Épique', imageUrl: 'https://cdn.discordapp.com/attachments/1112081601392816128/1269437689615220736/1722644132865.png?ex=679f57ba&is=679e063a&hm=80e0edd0660e1ac0e750d44a354a74d56ba9d92e8b40697974766f97b8661f12&' },
            { name: 'Gigantesque Potion de Magie', type: 'Consommable', value: 1150, rarity: 'Épique', imageUrl: 'https://cdn.discordapp.com/attachments/1112081601392816128/1279254306717040724/1724507000471.png?ex=679f75aa&is=679e242a&hm=5facf8676d386318441bc7d0f9528cd90f974d1540d4740f53c99ca84552998d&' },
        ],
        'Légendaire': [
            { name: 'Fissures des Jades', type: 'Arme', value: 330000, rarity: 'Légendaire', imageUrl: 'https://cdn.discordapp.com/attachments/1112081601392816128/1266456862090334218/1722016472197.png?ex=679f0b9d&is=679dba1d&hm=68b35bcb1328cbf687b4c0f8e7b4a6cbb5f0081763415220c264e2b949098795&' },
            { name: 'Basilique des Éxodes Déchus', type: 'Arme', value: 2000000, rarity: 'Légendaire', imageUrl: 'https://cdn.discordapp.com/attachments/1112081601392816128/1286949491064442890/1726903027946.png?ex=679f1c1d&is=679dca9d&hm=f6db374d86296b53974b1a0cef7d37bcdf8043e2c7e2d43dbb11a7272e29dc5a&' },
            { name: 'Cimeterre des Éxodes Déchus', type: 'Arme', value: 1800000, rarity: 'Légendaire', imageUrl: 'https://cdn.discordapp.com/attachments/1112081601392816128/1286944283630239834/1726672258619.png?ex=67a068c3&is=679f1743&hm=7242b885dff06de85aa29715e36c3ed108e331b6682ac53d894c21b11ae9d67e&' },
            { name: 'Guillotine des Éxodes Déchus', type: 'Arme', value: 1500000, rarity: 'Légendaire', imageUrl: 'https://cdn.discordapp.com/attachments/1112081601392816128/1286944291633233981/1726672406786.png?ex=67a068c5&is=679f1745&hm=43099900f3f2a22434b8bac462253b6ea91398ab14157b2e85b985c71f4247f9&' },
            { name: 'Division de Téodor', type: 'Arme', value: 1000000, rarity: 'Légendaire', imageUrl: 'https://cdn.discordapp.com/attachments/1112081601392816128/1269437778307973151/1722039465173.png?ex=679f57cf&is=679e064f&hm=af6b89f3c98f81786ea905b6345809a46725753b9e0ed8d9f2829de5807ae6a0&' },
            { name: 'Choc des Errants', type: 'Arme', value: 825000, rarity: 'Légendaire', imageUrl: 'https://cdn.discordapp.com/attachments/1112081601392816128/1284485146967408660/1722016943169.png?ex=679f5f83&is=679e0e03&hm=2292cb60b4db0bf2a1a8e23eae8c8ddb49fa8af61613ef969eff059c2dee250b&' },
            { name: 'Bottes du Papillon de Minuit', type: 'Armure', value: 76000, rarity: 'Légendaire', imageUrl: 'https://cdn.discordapp.com/attachments/1112081601392816128/1312784545229045873/1733062604505.png?ex=679f7e61&is=679e2ce1&hm=72937bf1b7f5343f87cad91329a70fed561ec0cc73f1b7e79f6a34f3a2602d43&' },
            { name: 'Jambières du Guerrier Blanc', type: 'Armure', value: 120000, rarity: 'Légendaire', imageUrl: 'https://cdn.discordapp.com/attachments/1112081601392816128/1312796115208376340/1733065244005.png?ex=679f8928&is=679e37a8&hm=39df3a6e776ce9be798e2141dfe2af1ca69b9f662081bebfe1b38d798aeed3e3&' },
            { name: 'Couvre-chef du Serpent', type: 'Armure', value: 600000, rarity: 'Légendaire', imageUrl: 'https://cdn.discordapp.com/attachments/1112081601392816128/1312802934903541861/1733064779248.png?ex=679f8f82&is=679e3e02&hm=e8c7685cebe43093f71f65f43a2fac6eaff96dd7a248d26c3fe132b656955908&' },
            { name: 'Bague de l`Œil Cristallisé', type: 'Artéfact', value: 21150, rarity: 'Légendaire', imageUrl: 'https://cdn.discordapp.com/attachments/1112081601392816128/1279254623407964222/1722688985821.png?ex=679f75f5&is=679e2475&hm=7982be793c31e1a41833e631b3c3ff8568539be08cf37165dc31aebdaee0c06f&' },
            { name: 'Plume de Sang', type: 'Artéfact', value: 25000, rarity: 'Légendaire', imageUrl: 'https://cdn.discordapp.com/attachments/1112081601392816128/1269437663832834191/1722644451370.png?ex=679f57b4&is=679e0634&hm=8c2184b5e45663cdd71ad595c4dba79ce0d9d31817d0148ca91bff72d1deabb6&' },
            { name: 'Gemme Stellaire', type: 'Artéfact', value: 33000, rarity: 'Légendaire', imageUrl: 'https://cdn.discordapp.com/attachments/1112081601392816128/1269437665397309617/1722644329091.png?ex=679f57b4&is=679e0634&hm=d66fa5ad527795e56d527b9fc41b7eb2406e107be71b3b4ce41b8106bdb183e0&' },
        ],
        'Mythique': [
            { name: 'Épée du Berserk', type: 'Arme', value: 'Invendable', rarity: 'Mythique', imageUrl: 'https://cdn.discordapp.com/attachments/1112081601392816128/1268567098754469991/1722520333796.png?ex=679f78ad&is=679e272d&hm=364f3f7c47c027647ff76be5dfe51edb39c13ad329bdedcf2c234bc9c9391b4a&' },
            { name: 'Le Supplice des Démons', type: 'Arme', value: 'Invendable', rarity: 'Mythique', imageUrl: 'https://cdn.discordapp.com/attachments/1112081601392816128/1266409273546768487/1722005794794.png?ex=679f880b&is=679e368b&hm=92ce07bc76ed2d409e38468a413882ba1cb0a0b008a087574bd8157dc08150f5&' },
            { name: 'Purgatoire Putride', type: 'Arme', value: 'Invendable', rarity: 'Mythique', imageUrl: 'https://cdn.discordapp.com/attachments/1112081601392816128/1279254684640612413/1722679689631.png?ex=679f7604&is=679e2484&hm=0d323ee84786b773619e9eae977ba008ac0fd093ad78f5cff440e870817b31e8&' },
            { name: 'Syncope Suprême de la Lune', type: 'Arme', value: 'Invendable', rarity: 'Mythique', imageUrl: 'https://cdn.discordapp.com/attachments/1112081601392816128/1287021948777402368/1722726441318.png?ex=679f5f98&is=679e0e18&hm=b4409f2f64c755348fe81c279ddb01237a438600bc2d9c283639e4d538552253&' },
            { name: 'Ailes de la Rédemption', type: 'Arme', value: 'Invendable', rarity: 'Mythique', imageUrl: 'https://cdn.discordapp.com/attachments/1112081601392816128/1269437779327324180/1722039992217.png?ex=679f57cf&is=679e064f&hm=8bf173d479db79ab98ca56fe55823b2362d05746b7e9fd12542ac89aefbc5fd4&' },
            
        ]
    };

    const itemsForRarity = items[rarity];
    return itemsForRarity[Math.floor(Math.random() * itemsForRarity.length)];
}

function displayLoot(item) {
    const lootResult = document.getElementById('lootResult');
    lootResult.innerHTML = `
        <div class="inventory-item">
            <img src="${item.imageUrl}" alt="${item.name}" class="inventory-image">
            <div class="inventory-details">
                <div><strong>${item.name}</strong></div>
                <div>Type: ${item.type}</div>
                <div class="rarity rarity-${getRarityClass(item.rarity)}">${item.rarity}</div>
                <div>Valeur: ${item.value}💎</div>
            </div>
        </div>
    `;
}

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

function addToHistory(item) {
    const lootHistory = JSON.parse(localStorage.getItem('lootHistory')) || [];
    lootHistory.push(item);
    if (lootHistory.length > 15) {
        lootHistory.shift(); // Keep only the last 15 items
    }
    localStorage.setItem('lootHistory', JSON.stringify(lootHistory));
    loadLootHistory();
}

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

function openModal(lootItem, lootRarities) {
    const modal = document.getElementById('chestModal');
    const slotMachine = document.getElementById('slotMachine');
    slotMachine.innerHTML = ''; // Clear previous slots

    // Add slots with random items from the appropriate rarities
    for (let i = 0; i < 10; i++) {
        const randomRarity = lootRarities[Math.floor(Math.random() * lootRarities.length)];
        const randomItem = generateLootItem(randomRarity);
        const slot = document.createElement('div');
        slot.className = 'slot';
        slot.innerHTML = `
            <img src="${randomItem.imageUrl}" alt="${randomItem.name}">
            <div>${randomItem.name}</div>
        `;
        slotMachine.appendChild(slot);
    }

    modal.style.display = 'block';

    // Simulate slot machine effect
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
            // Center the final loot item
            const finalSlot = document.createElement('div');
            finalSlot.className = 'slot';
            finalSlot.innerHTML = `
                <img src="${lootItem.imageUrl}" alt="${lootItem.name}">
                <div>${lootItem.name}</div>
            `;
            slotMachine.appendChild(finalSlot);

            // Center the final slot
            const slotHeight = finalSlot.offsetHeight;
            slotMachine.scrollTop = finalSlot.offsetTop - (slotMachine.clientHeight / 2) + (slotHeight / 2);

            // Play the appropriate win sound based on rarity
            if (lootItem.rarity === 'Commun' || lootItem.rarity === 'Peu commun') {
                winSequence1Sound.play();
            } else if (lootItem.rarity === 'Rare' || lootItem.rarity === 'Épique') {
                winSequence2Sound.play();
            } else if (lootItem.rarity === 'Légendaire' || lootItem.rarity === 'Mythique') {
                winSequence3Sound.play();
            }

            // Close modal after 3 seconds
            setTimeout(() => {
                closeModal();
                displayLoot(lootItem);
                addToHistory(lootItem); // Add to history after closing the modal
                showObtainedLoot(lootItem); // Show obtained loot
            }, 3000);
        } else {
            // Gradually slow down the speed over the entire duration
            speed *= 0.995; // Adjust this factor to control the deceleration rate
        }
    }, 50); // Adjust the interval time as needed
}

function closeModal() {
    const modal = document.getElementById('chestModal');
    modal.style.display = 'none';
}

function showObtainedLoot(item) {
    const obtainedLoot = document.getElementById('obtainedLoot');
    const obtainedLootImage = document.getElementById('obtainedLootImage');
    const obtainedLootName = document.getElementById('obtainedLootName');
    const obtainedLootRarity = document.getElementById('obtainedLootRarity');

    obtainedLootImage.src = item.imageUrl;
    obtainedLootName.innerHTML = `<strong>${item.name}</strong>`;
    obtainedLootRarity.className = `rarity rarity-${getRarityClass(item.rarity)}`;
    obtainedLootRarity.innerHTML = item.rarity;

    obtainedLoot.style.display = 'flex';

    // Hide obtained loot after 5 seconds
    setTimeout(() => {
        obtainedLoot.style.display = 'none';
    }, 5000);
}

window.onload = function() {
    loadLootHistory();
};

function clearHistory() {
    localStorage.removeItem('lootHistory');
    loadLootHistory();
}