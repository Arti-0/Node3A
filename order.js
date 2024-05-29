const sqlite3 = require('sqlite3');
const readline = require('readline');

const db = new sqlite3.Database('boutique.db');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Fonction pour passer une commande
function passerCommande(nomVetement, quantite) {
    db.serialize(() => {
        // Récupérer l'ID de l'article en fonction de son nom
        db.get('SELECT id, stock FROM vetements WHERE nom = ?', [nomVetement], (err, row) => {
            if (err) {
                console.error(err.message);
                return;
            }
            if (!row) {
                console.log('L\'article avec ce nom n\'existe pas.');
                commanderAutre();
                return;
            }
            const idVetement = row.id;
            const stockDisponible = row.stock;
            if (stockDisponible < quantite) {
                console.log('Stock insuffisant.');
                commanderAutre();
                return;
            }
            // Mettre à jour le stock après la commande
            const nouveauStock = stockDisponible - quantite;
            db.run('UPDATE vetements SET stock = ? WHERE id = ?', [nouveauStock, idVetement], (err) => {
                if (err) {
                    console.error(err.message);
                    return;
                }
                console.log(`Commande passée avec succès pour ${quantite} article(s) de ${nomVetement}.`);
                commanderAutre();
            });
        });
    });
}

// Fonction pour passer une commande à partir de l'interface en ligne de commande
function commander() {
    rl.question('Quel article voulez-vous ? : ', (nomVetement) => {
        rl.question('En quelle quantité voulez-vous commander cet article ? : ', (quantite) => {
            quantite = parseInt(quantite);
            if (isNaN(quantite) || quantite <= 0) {
                console.log('La quantité doit être un nombre entier positif.');
                rl.close();
                return;
            }
            passerCommande(nomVetement, quantite);
        });
    });
}

// Fonction pour demander si l'utilisateur veut commander autre chose
function commanderAutre() {
    rl.question('Voulez-vous commander autre chose ? (oui/non) : ', (reponse) => {
        if (reponse.toLowerCase() === 'oui') {
            commander();
        } else if (reponse.toLowerCase() === 'non') {
            rl.close();
        } else {
            console.log('Veuillez répondre par "oui" ou "non".');
            commanderAutre();
        }
    });
}

// Appeler la fonction pour passer une commande
commander();
