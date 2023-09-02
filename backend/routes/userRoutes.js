const express = require('express');
const { loginUser, signupUser } = require('../controller/userController.js');

const router = express.Router();

// Login Page
router.get('/login', (req, res) => {
    res.render('login');
});
router.post('/login', loginUser);

// Register Page
router.get('/signup', (req, res) => {
    res.render('signup');
});
router.post('/signup', signupUser);


module.exports = router;
