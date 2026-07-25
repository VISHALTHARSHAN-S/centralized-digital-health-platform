const recordService = require('../services/recordService');
const Patient = require('../models/Patient');
const { sendSuccess } = require('../utils/apiResponse');

const createRecord = async (req, res, next) => {
  try {
    const record = await recordService.createMedicalRecord(req.body, req.user._id);
    return sendSuccess(res, 201, 'Medical record created successfully', record);
  } catch (error) {
    next(error);
  }
};

const getPatientRecords = async (req, res, next) => {
  try {
    let patientId = req.params.patientId;
    if (req.user.role === 'PATIENT') {
      const p = await Patient.findOne({ userId: req.user._id });
      if (p) patientId = p._id;
    }

    const records = await recordService.getPatientRecords(patientId, req.query);
    return sendSuccess(res, 200, 'Medical records retrieved', records);
  } catch (error) {
    next(error);
  }
};

const getRecordById = async (req, res, next) => {
  try {
    const record = await recordService.getRecordById(req.params.id);
    return sendSuccess(res, 200, 'Record retrieved', record);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createRecord,
  getPatientRecords,
  getRecordById
};
