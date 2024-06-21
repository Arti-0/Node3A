const orderModel = require('../models/order');

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

module.exports = {
    placeOrder,
    modifyOrder
};
