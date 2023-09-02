const express = require('express');
const { checkWalletBalance } = require('../controller/walletController');

const router = express.Router();

//router.get('/balance/:id', checkWalletBalance);

router.get('/balance', (req, res) => {
    res.render('balance');
})

module.exports = router;
