const mongoose = require('mongoose');

const medicationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  dosage: { type: String, required: true }, // e.g. "500mg"
  frequency: { type: String, required: true }, // e.g. "Twice daily after meals"
  duration: { type: String, required: true }, // e.g. "5 Days"
  instructions: { type: String, default: 'Take with warm water' }
}, { _id: false });

const prescriptionSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: true,
    index: true
  },
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
    required: true
  },
  appointmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Appointment'
  },
  medicalRecordId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MedicalRecord'
  },
  medications: [medicationSchema],
  diagnosisSummary: {
    type: String,
    required: true
  },
  dietaryInstructions: {
    type: String
  },
  followUpDate: {
    type: Date
  },
  issueDate: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Prescription', prescriptionSchema);
