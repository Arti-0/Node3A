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

function getMyOrders(clientId) {
    const stmt = db.prepare('SELECT * FROM orders WHERE client_id = ?');
    try {
        const orders = stmt.all(clientId);
        return orders;
    } catch (err) {
        console.error('Error fetching orders:', err.message);
        return [];
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

function createOrderMultiProducts(products) {
    const stmt = db.prepare('INSERT INTO orders (date_commande) VALUES (datetime(\'now\', \'localtime\'))');
    const info = stmt.run();

    const orderId = info.lastInsertRowid;

    products.forEach(product => {
        const stmtLine = db.prepare('INSERT INTO ligne_commande (id_commande, id_produit, quantite) VALUES (?, ?, ?)');
        stmtLine.run(orderId, product.id_produit, product.quantite);
    });

    return orderId;
}

module.exports = {
    getMyOrders,
    placeOrder,
    modifyOrder,
    createOrderMultiProducts
};