// Importer les modules nécessaires
const readline = require('readline');
const add = require('./add');

// Créer une interface en ligne de commande
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Fonction pour ajouter un vêtement
function ajouterVetement() {
    rl.question('Nom du vêtement : ', (nom) => {
        rl.question('Prix : ', (prix) => {
            rl.question('Taille : ', (taille) => {
                rl.question('Quantité : ', (stock) => {
                    add.ajouterVetement(nom, prix, taille, stock);
                    console.log('Vêtement ajouté avec succès !');
                    rl.close();
                });
            });
        });
    });
}

// Appeler la fonction pour ajouter un vêtement
ajouterVetement();
