const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const productController = require('../controllers/productController');

router.get('/admin/products', adminController.getAllProducts);
router.get('/admin/orders', adminController.getAllOrders);

router.post('/products', productController.addProduct);

module.exports = router;
