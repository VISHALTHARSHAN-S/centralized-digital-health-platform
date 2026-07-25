const appointmentService = require('../services/appointmentService');
const { sendSuccess } = require('../utils/apiResponse');

const bookAppointment = async (req, res, next) => {
  try {
    const appointment = await appointmentService.bookAppointment(req.user._id, req.body);
    return sendSuccess(res, 201, 'Appointment scheduled successfully', appointment);
  } catch (error) {
    next(error);
  }
};

const getMyAppointments = async (req, res, next) => {
  try {
    const appointments = await appointmentService.getMyAppointments({ id: req.user._id, role: req.user.role });
    return sendSuccess(res, 200, 'Appointments list retrieved', appointments);
  } catch (error) {
    next(error);
  }
};

const updateAppointmentStatus = async (req, res, next) => {
  try {
    const { status, notes } = req.body;
    const updated = await appointmentService.updateAppointmentStatus(req.params.id, status, notes);
    return sendSuccess(res, 200, 'Appointment status updated', updated);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  bookAppointment,
  getMyAppointments,
  updateAppointmentStatus
};
