// // src/routes/authRoutes.js
// const express = require('express');
// const router = express.Router();
// const authController = require('../controllers/authController');

// router.post('/request-otp', authController.requestOTP);
// router.post('/verify-otp', authController.verifyOTP);
// router.post('/signup', authController.signup);
// router.post('/login', authController.login);

// module.exports = router;

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/request-otp', authController.requestOTP);
router.post('/verify-otp', authController.verifyOTP);
router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/refresh', authController.refresh);

module.exports = router;
