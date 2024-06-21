const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountController');

router.post('/create', accountController.createAccount);
router.put('/account/:id', accountController.modifyAccount);
router.delete('/account/:id', accountController.deleteAccount);

module.exports = router;