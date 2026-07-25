const express = require('express');
const router = express.Router();
const prescriptionController = require('../controllers/prescriptionController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');

router.post('/', protect, authorize('DOCTOR'), prescriptionController.createPrescription);
router.get('/patient/:patientId?', protect, prescriptionController.getPrescriptions);
router.get('/:id', protect, prescriptionController.getPrescriptionById);

module.exports = router;
