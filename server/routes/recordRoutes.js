const express = require('express');
const router = express.Router();
const recordController = require('../controllers/recordController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');
const { createRecordValidation } = require('../validations/recordValidation');
const { validate } = require('../middleware/validatorMiddleware');

router.post('/', protect, authorize('DOCTOR'), createRecordValidation, validate, recordController.createRecord);
router.get('/patient/:patientId?', protect, recordController.getPatientRecords);
router.get('/:id', protect, recordController.getRecordById);

module.exports = router;
