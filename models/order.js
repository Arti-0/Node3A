
const db = require('../db');

function placeOrder(clientId, productId, quantity) {
    const stmt = db.prepare('INSERT INTO orders (client_id, product_id, quantity) VALUES (?, ?, ?)');
    try {
        const result = stmt.run(clientId, productId, quantity);
        console.log('Commande passée avec succès !');
        return result.lastInsertRowid;
    } catch (err) {
        console.error('Error placing order:', err.message);
        return null;
    }
}

function modifyOrder(orderId, clientId, productId, quantity) {
    const stmt = db.prepare('UPDATE orders SET client_id = ?, product_id = ?, quantity = ? WHERE id = ?');
    try {
        const result = stmt.run(clientId, productId, quantity, orderId);
        if (result.changes > 0) {
            console.log(`Commande ${orderId} modifiée avec succès !`);
            return true;
        } else {
            console.log(`Commande ${orderId} non trouvée ou aucune modification nécessaire.`);
            return false;
        }
    } catch (err) {
        console.error(`Error modifying order ${orderId}:`, err.message);
        return false;
    }
}

module.exports = {
    placeOrder,
    modifyOrder
};