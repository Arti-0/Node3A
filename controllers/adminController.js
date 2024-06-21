const adminModel = require('../models/adminModel');

function addProduct(req, res) {
    const { nom, prix, taille, stock } = req.body;
    const productId = adminModel.addProduct(nom, prix, taille, stock);
    if (productId) {
        res.status(201).json({ message: 'Produit ajouté avec succès !', productId });
    } else {
        res.status(500).json({ error: 'Erreur lors de l\'ajout du produit.' });
    }
}


function getAllProducts(req, res) {
    const sql = 'SELECT * FROM products';
    db.all(sql, [], (err, rows) => {
        if (err) {
            console.error('Erreur lors de la récupération des produits :', err.message);
            return res.status(500).json({ error: 'Erreur lors de la récupération des produits.' });
        }
        res.status(200).json(rows);
    });
}

function getAllOrders(req, res) {
    const sql = 'SELECT * FROM orders';
    db.all(sql, [], (err, rows) => {
        if (err) {
            console.error('Erreur lors de la récupération des commandes :', err.message);
            return res.status(500).json({ error: 'Erreur lors de la récupération des commandes.' });
        }
        res.status(200).json(rows);
    });
}

module.exports = {
    addProduct,
    getAllOrders,
    getAllProducts
};