const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.post('/upload', protect, upload.single('reportDocument'), reportController.uploadReport);
router.get('/patient/:patientId?', protect, reportController.getReports);
router.delete('/:id', protect, reportController.deleteReport);

module.exports = router;
