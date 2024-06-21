const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

router.get('/orders', orderController.getMyOrders);
router.put('/orders/:id', orderController.modifyOrder);

router.post('/orders', orderController.placeOrder);

module.exports = router;
