// Importer le module sqlite3
const sqlite3 = require('sqlite3');

// Définir la configuration de la base de données
const db = new sqlite3.Database('boutique.db');

// Logique pour ajouter un nouveau vêtement à la base de données
function ajouterVetement(nom, prix, taille, stock) {
    db.serialize(() => {
        const stmt = db.prepare('INSERT INTO vetements (nom, prix, taille, stock) VALUES (?, ?, ?, ?)');
        {
            stmt.run(nom, prix, taille, stock); 
        }
        stmt.finalize();
    });
}

module.exports = { ajouterVetement };
