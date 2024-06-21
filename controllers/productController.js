const productModel = require('../models/productModel');

function getAllProducts(req, res) {
    const products = productModel.getAllProducts();
    res.status(200).json(products);
}

module.exports = {
    getAllProducts
};
