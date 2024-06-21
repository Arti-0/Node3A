const db = require('../db');

function addProduct(nom, prix, taille, stock) {
    const stmt = db.prepare('INSERT INTO products (nom, prix, taille, stock) VALUES (?, ?, ?, ?)');
    try {
        const result = stmt.run(nom, prix, taille, stock);
        console.log('Produit ajouté avec succès !');
        return result.lastInsertRowid;
    } catch (err) {
        console.error('Error adding product:', err.message);
        return null;
    }
}

function getAllProducts() {
    const stmt = db.prepare('SELECT * FROM products');
    try {
        const products = stmt.all();
        return products;
    } catch (err) {
        console.error('Error fetching products:', err.message);
        return [];
    }
}

module.exports = {
    addProduct,
    getAllProducts
};