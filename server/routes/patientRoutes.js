const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');

router.get('/profile', protect, authorize('PATIENT'), patientController.getPatientProfile);
router.put('/profile', protect, authorize('PATIENT'), patientController.updatePatientProfile);
router.get('/summary', protect, authorize('PATIENT'), patientController.getMedicalSummary);
router.get('/dashboard-stats', protect, authorize('PATIENT'), patientController.getDashboardStats);
router.get('/lookup/:healthId', protect, authorize('DOCTOR', 'ADMIN'), patientController.lookupByHealthId);

module.exports = router;
