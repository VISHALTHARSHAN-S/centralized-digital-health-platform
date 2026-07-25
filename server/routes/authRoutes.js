const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { registerValidation, loginValidation } = require('../validations/authValidation');
const { validate } = require('../middleware/validatorMiddleware');
const { protect } = require('../middleware/authMiddleware');

router.post('/register', registerValidation, validate, authController.register);
router.post('/login', loginValidation, validate, authController.login);
router.get('/me', protect, authController.getMe);
router.post('/logout', protect, authController.logout);

module.exports = router;
