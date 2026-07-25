const prescriptionService = require('../services/prescriptionService');
const Patient = require('../models/Patient');
const { sendSuccess } = require('../utils/apiResponse');

const createPrescription = async (req, res, next) => {
  try {
    const rx = await prescriptionService.createPrescription(req.body, req.user._id);
    return sendSuccess(res, 201, 'Prescription issued successfully', rx);
  } catch (error) {
    next(error);
  }
};

const getPrescriptions = async (req, res, next) => {
  try {
    let patientId = req.params.patientId;
    if (req.user.role === 'PATIENT') {
      const p = await Patient.findOne({ userId: req.user._id });
      if (p) patientId = p._id;
    }

    const list = await prescriptionService.getPrescriptionsForPatient(patientId);
    return sendSuccess(res, 200, 'Prescriptions list retrieved', list);
  } catch (error) {
    next(error);
  }
};

const getPrescriptionById = async (req, res, next) => {
  try {
    const rx = await prescriptionService.getPrescriptionById(req.params.id);
    return sendSuccess(res, 200, 'Prescription details retrieved', rx);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createPrescription,
  getPrescriptions,
  getPrescriptionById
};
