const productModel = require('../models/product');

function getAllProducts(req, res) {
    const products = productModel.getAllProducts();
    res.status(200).json(products);
}

module.exports = {
    addProduct,
    getAllProducts
};
