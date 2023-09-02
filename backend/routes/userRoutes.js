const express = require('express');
const { loginUser, signupUser } = require('../controller/userController.js');

const router = express.Router();

// Login Page
router.post('/login', loginUser);

// Register Page
router.post('/signup', signupUser);

module.exports = router;
