const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.get('/admin/products', adminController.getAllProducts);
router.get('/admin/orders', adminController.getAllOrders);

router.post('/admin/products/add', adminController.addProduct);

module.exports = router;
