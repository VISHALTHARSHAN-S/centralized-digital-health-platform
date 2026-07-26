const mongoose = require('mongoose');
const { REPORT_CATEGORIES } = require('../constants/enums');

const reportSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: true,
    index: true
  },
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor'
  },
  hospitalId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hospital',
    required: true
  },
  recordId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MedicalRecord'
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    enum: Object.values(REPORT_CATEGORIES),
    default: REPORT_CATEGORIES.BLOOD_TEST
  },
  fileUrl: {
    type: String,
    required: true
  },
  cloudinaryId: {
    type: String
  },
  fileSize: {
    type: Number,
    default: 0
  },
  fileType: {
    type: String,
    default: 'application/pdf'
  },
  uploadDate: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Report', reportSchema);
