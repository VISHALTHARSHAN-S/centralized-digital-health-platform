const mongoose = require('mongoose');
const { APPOINTMENT_STATUS } = require('../constants/enums');

const appointmentSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: true,
    index: true
  },
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
    required: true,
    index: true
  },
  hospitalId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hospital',
    required: true
  },
  appointmentDate: {
    type: Date,
    required: true,
    index: true
  },
  timeSlot: {
    type: String,
    required: true // e.g. "10:00 AM - 10:30 AM"
  },
  status: {
    type: String,
    enum: Object.values(APPOINTMENT_STATUS),
    default: APPOINTMENT_STATUS.SCHEDULED
  },
  reasonForVisit: {
    type: String,
    required: true
  },
  clinicalNotes: {
    type: String
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Appointment', appointmentSchema);
