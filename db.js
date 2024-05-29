const sqlite3 = require('sqlite3').verbose();

// Créer ou ouvrir la base de données
const db = new sqlite3.Database('boutique.db');

// Créer la table pour les vêtements
db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS vetements (id INTEGER PRIMARY KEY AUTOINCREMENT, nom TEXT, prix REAL, taille TEXT, stock INTEGER)");
    db.run("CREATE TABLE IF NOT EXISTS compte (id INTEGER PRIMARY KEY AUTOINCREMENT, nom TEXT, prenom TEXT, mail TEXT)");

    
});

// Fermer la base de données après avoir terminé
db.close();