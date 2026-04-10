const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

// Public routes
router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/request-otp', authController.requestOTP);
router.post('/verify-otp', authController.verifyOTP);

module.exports = router;
