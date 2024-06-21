
const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountController');

// Route to create an account
router.post('/create', accountController.createAccount);

module.exports = router;