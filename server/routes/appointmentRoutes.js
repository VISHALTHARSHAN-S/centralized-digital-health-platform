const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');
const { protect } = require('../middleware/authMiddleware');
const { createAppointmentValidation } = require('../validations/appointmentValidation');
const { validate } = require('../middleware/validatorMiddleware');

router.post('/book', protect, createAppointmentValidation, validate, appointmentController.bookAppointment);
router.get('/my-appointments', protect, appointmentController.getMyAppointments);
router.patch('/:id/status', protect, appointmentController.updateAppointmentStatus);

module.exports = router;
