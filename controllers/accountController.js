const accountModel = require('../models/account');

function createAccount(req, res) {
    const { nom, prenom, mail } = req.body;
    const accountId = accountModel.createAccount(nom, prenom, mail);
    if (accountId) {
        res.status(201).json({ message: 'Compte créé avec succès !', accountId });
    } else {
        res.status(500).json({ error: 'Erreur lors de la création du compte.' });
    }
}

function modifyAccount(req, res) {
    const { id } = req.params;
    const { nom, prenom, mail } = req.body;
    const success = accountModel.modifyAccount(id, nom, prenom, mail);
    if (success) {
        res.status(200).json({ message: `Compte ${id} modifié avec succès !` });
    } else {
        res.status(404).json({ error: `Compte ${id} non trouvé ou aucune modification nécessaire.` });
    }
}

function deleteAccount(req, res) {
    const { id } = req.params;
    const success = accountModel.deleteAccount(id);
    if (success) {
        res.status(200).json({ message: `Compte ${id} supprimé avec succès !` });
    } else {
        res.status(404).json({ error: `Compte ${id} non trouvé ou aucune suppression nécessaire.` });
    }
}

module.exports = {
    createAccount,
    modifyAccount,
    deleteAccount
};