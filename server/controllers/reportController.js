const reportService = require('../services/reportService');
const Patient = require('../models/Patient');
const { sendSuccess } = require('../utils/apiResponse');

const uploadReport = async (req, res, next) => {
  try {
    if (!req.file) {
      throw new Error('No report document file provided');
    }
    const report = await reportService.uploadReport(req.file, req.body, req.user);
    return sendSuccess(res, 201, 'Medical report uploaded successfully', report);
  } catch (error) {
    next(error);
  }
};

const getReports = async (req, res, next) => {
  try {
    let patientId = req.params.patientId;
    if (req.user.role === 'PATIENT') {
      const p = await Patient.findOne({ userId: req.user._id });
      if (p) patientId = p._id;
    }

    const reports = await reportService.getReportsByPatient(patientId, req.query);
    return sendSuccess(res, 200, 'Reports retrieved successfully', reports);
  } catch (error) {
    next(error);
  }
};

const deleteReport = async (req, res, next) => {
  try {
    await reportService.deleteReport(req.params.id, req.user);
    return sendSuccess(res, 200, 'Report deleted successfully');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  uploadReport,
  getReports,
  deleteReport
};
