const express = require('express');
const router = express.Router();
const hospitalController = require('../controllers/hospitalController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');

router.get('/', protect, hospitalController.getHospitals);
router.post('/', protect, authorize('ADMIN'), hospitalController.createHospital);

module.exports = router;
