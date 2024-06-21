const productModel = require('../models/product');

function addProduct(req, res) {
    const { nom, prix, taille, stock } = req.body;
    const productId = productModel.addProduct(nom, prix, taille, stock);
    if (productId) {
        res.status(201).json({ message: 'Produit ajouté avec succès !', productId });
    } else {
        res.status(500).json({ error: 'Erreur lors de l\'ajout du produit.' });
    }
}

function getAllProducts(req, res) {
    const products = productModel.getAllProducts();
    res.status(200).json(products);
}

module.exports = {
    addProduct,
    getAllProducts
};
