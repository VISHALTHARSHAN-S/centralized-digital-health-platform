const { body } = require('express-validator');

const createAppointmentValidation = [
  body('doctorId').isMongoId().withMessage('Valid Doctor ID required'),
  body('appointmentDate').isISO8601().withMessage('Valid appointment date required'),
  body('timeSlot').notEmpty().withMessage('Time slot string required'),
  body('reasonForVisit').notEmpty().withMessage('Reason for visit required')
];

module.exports = {
  createAppointmentValidation
};
