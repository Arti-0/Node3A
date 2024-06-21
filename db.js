
const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.resolve(__dirname, 'boutique.db');
const db = new Database(dbPath);

db.exec(`
    CREATE TABLE IF NOT EXISTS compte (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nom TEXT,
        prenom TEXT,
        mail TEXT
    );

    CREATE TABLE IF NOT EXISTS vetements (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nom TEXT,
        prix REAL,
        taille TEXT,
        stock INTEGER
    );

    CREATE TABLE IF NOT EXISTS orders (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        client_id INTEGER,
        product_id INTEGER,
        quantity INTEGER,
        FOREIGN KEY(client_id) REFERENCES compte(id),
        FOREIGN KEY(product_id) REFERENCES vetements(id)
    );
`);

module.exports = db;