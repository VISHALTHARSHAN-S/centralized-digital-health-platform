const patientService = require('../services/patientService');
const { sendSuccess } = require('../utils/apiResponse');

const getPatientProfile = async (req, res, next) => {
  try {
    const profile = await patientService.getProfileByUserId(req.user._id);
    return sendSuccess(res, 200, 'Patient profile retrieved', profile);
  } catch (error) {
    next(error);
  }
};

const updatePatientProfile = async (req, res, next) => {
  try {
    const updated = await patientService.updateProfile(req.user._id, req.body);
    return sendSuccess(res, 200, 'Patient profile updated', updated);
  } catch (error) {
    next(error);
  }
};

const getMedicalSummary = async (req, res, next) => {
  try {
    const patient = await patientService.getProfileByUserId(req.user._id);
    const summary = await patientService.getPatientMedicalSummary(patient._id);
    return sendSuccess(res, 200, 'Patient medical summary retrieved', summary);
  } catch (error) {
    next(error);
  }
};

const getDashboardStats = async (req, res, next) => {
  try {
    const patient = await patientService.getProfileByUserId(req.user._id);
    const stats = await patientService.getDashboardStats(patient._id);
    return sendSuccess(res, 200, 'Patient dashboard statistics retrieved', stats);
  } catch (error) {
    next(error);
  }
};

const lookupByHealthId = async (req, res, next) => {
  try {
    const patient = await patientService.findByHealthId(req.params.healthId);
    return sendSuccess(res, 200, 'Patient found', patient);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getPatientProfile,
  updatePatientProfile,
  getMedicalSummary,
  getDashboardStats,
  lookupByHealthId
};
