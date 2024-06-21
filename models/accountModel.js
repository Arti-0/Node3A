const db = require('../db');

function createAccount(nom, prenom, mail) {
    const stmt = db.prepare('INSERT INTO compte (nom, prenom, mail) VALUES (?, ?, ?)');
    try {
        const result = stmt.run(nom, prenom, mail);
        console.log('Compte créé avec succès !');
        return result.lastInsertRowid;
    } catch (err) {
        console.error('Error creating account:', err.message);
        return null;
    }
}

function modifyAccount(id, nom, prenom, mail) {
    const stmt = db.prepare('UPDATE compte SET nom = ?, prenom = ?, mail = ? WHERE id = ?');
    try {
        const result = stmt.run(nom, prenom, mail, id);
        if (result.changes > 0) {
            console.log(`Compte ${id} modifié avec succès !`);
            return true;
        } else {
            console.log(`Compte ${id} non trouvé ou aucune modification nécessaire.`);
            return false;
        }
    } catch (err) {
        console.error(`Error modifying account ${id}:`, err.message);
        return false;
    }
}

function deleteAccount(id) {
    const stmt = db.prepare('DELETE FROM compte WHERE id = ?');
    try {
        const result = stmt.run(id);
        if (result.changes > 0) {
            console.log(`Compte ${id} supprimé avec succès !`);
            return true;
        } else {
            console.log(`Compte ${id} non trouvé ou aucune suppression nécessaire.`);
            return false;
        }
    } catch (err) {
        console.error(`Error deleting account ${id}:`, err.message);
        return false;
    }
}

module.exports = {
    createAccount,
    modifyAccount,
    deleteAccount
};