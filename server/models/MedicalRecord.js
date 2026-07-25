const mongoose = require('mongoose');
const { RECORD_TYPES } = require('../constants/enums');

const medicalRecordSchema = new mongoose.Schema({
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
  hospitalId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hospital',
    required: true
  },
  recordType: {
    type: String,
    enum: Object.values(RECORD_TYPES),
    default: RECORD_TYPES.DIAGNOSIS
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  diagnosis: {
    type: String,
    required: true
  },
  symptoms: [{
    type: String
  }],
  clinicalNotes: {
    type: String
  },
  vitals: {
    bloodPressure: String,
    heartRate: String,
    temperature: String,
    weight: String,
    height: String
  },
  recordDate: {
    type: Date,
    default: Date.now,
    index: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('MedicalRecord', medicalRecordSchema);
