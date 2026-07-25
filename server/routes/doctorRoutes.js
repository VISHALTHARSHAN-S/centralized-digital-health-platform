const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctorController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');

router.get('/profile', protect, authorize('DOCTOR'), doctorController.getDoctorProfile);
router.get('/dashboard-stats', protect, authorize('DOCTOR'), doctorController.getDashboardStats);
router.get('/timeline/:healthId', protect, authorize('DOCTOR', 'ADMIN'), doctorController.getPatientTimeline);
router.get('/all', protect, doctorController.getAllDoctors);

module.exports = router;
