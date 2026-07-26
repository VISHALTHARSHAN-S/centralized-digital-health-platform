const doctorService = require('../services/doctorService');
const Doctor = require('../models/Doctor');
const { sendSuccess } = require('../utils/apiResponse');

const getDoctorProfile = async (req, res, next) => {
  try {
    const doctor = await doctorService.getDoctorByUserId(req.user._id);
    return sendSuccess(res, 200, 'Doctor profile retrieved', doctor);
  } catch (error) {
    next(error);
  }
};

const getDashboardStats = async (req, res, next) => {
  try {
    const doctor = await doctorService.getDoctorByUserId(req.user._id);
    const stats = await doctorService.getDoctorDashboardStats(doctor._id);
    return sendSuccess(res, 200, 'Doctor dashboard statistics', stats);
  } catch (error) {
    next(error);
  }
};

const getPatientTimeline = async (req, res, next) => {
  try {
    const timeline = await doctorService.getPatientTimeline(req.params.healthId);
    return sendSuccess(res, 200, 'Patient timeline retrieved', timeline);
  } catch (error) {
    next(error);
  }
};

const searchPatientByHealthId = async (req, res, next) => {
  try {
    const patientData = await doctorService.searchPatientByHealthId(req.params.healthId);
    return sendSuccess(res, 200, 'Patient search completed', patientData);
  } catch (error) {
    next(error);
  }
};

const getAllDoctors = async (req, res, next) => {
  try {
    const doctors = await Doctor.find().populate('hospitalId', 'name city state');
    return sendSuccess(res, 200, 'All doctors list retrieved', doctors);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getDoctorProfile,
  getDashboardStats,
  getPatientTimeline,
  searchPatientByHealthId,
  getAllDoctors
};
