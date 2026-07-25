const hospitalService = require('../services/hospitalService');
const { sendSuccess } = require('../utils/apiResponse');

const getHospitals = async (req, res, next) => {
  try {
    const list = await hospitalService.getAllHospitals(req.query);
    return sendSuccess(res, 200, 'Hospitals list retrieved', list);
  } catch (error) {
    next(error);
  }
};

const createHospital = async (req, res, next) => {
  try {
    const created = await hospitalService.createHospital(req.body);
    return sendSuccess(res, 201, 'Hospital added successfully', created);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getHospitals,
  createHospital
};
