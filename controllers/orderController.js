const orderModel = require('../models/orderModel');

function placeOrder(req, res) {
    const { clientId, productId, quantity } = req.body;
    const orderId = orderModel.placeOrder(clientId, productId, quantity);
    if (orderId) {
        res.status(201).json({ message: 'Commande passée avec succès !', orderId });
    } else {
        res.status(500).json({ error: 'Erreur lors de la création de la commande.' });
    }
}

function modifyOrder(req, res) {
    const { id } = req.params;
    const { clientId, productId, quantity } = req.body;
    const success = orderModel.modifyOrder(id, clientId, productId, quantity);
    if (success) {
        res.status(200).json({ message: `Commande ${id} modifiée avec succès !` });
    } else {
        res.status(404).json({ error: `Commande ${id} non trouvée ou aucune modification nécessaire.` });
    }
}

function getMyOrders(req, res) {
    const { clientId } = req.query;
    const orders = orderModel.getMyOrders(clientId);
    if (success) {
        res.status(200).json(orders);
    } else {
        res.status(404).json({ error: `Une erreur est survenue` });
    }
}

function createOrderMultiProducts(req, res) {
    const products = req.body.products;

    if (!products || !Array.isArray(products) || products.length === 0) {
        return res.status(400).json({ error: 'La liste des produits est invalide ou vide.' });
    }

    try {
        const orderId = orderModel.createOrderMultiProducts(products);
        res.status(201).json({ message: 'Commande créée avec succès !', orderId });
    } catch (err) {
        console.error('Erreur lors de la création de la commande multi-produits :', err.message);
        res.status(500).json({ error: 'Erreur lors de la création de la commande.' });
    }
}

module.exports = {
    getMyOrders,
    placeOrder,
    modifyOrder,
    createOrderMultiProducts
};
