const express = require('express');
const { findUser, loginUser, signupUser } = require('../controller/userController.js');

const router = express.Router();

router.get('/find', findUser);

// Login Page
router.post('/login', loginUser);

// Register Page
router.post('/signup', signupUser);

module.exports = router;
