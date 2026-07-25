const mongoose = require('mongoose');
const { GENDER, BLOOD_GROUPS } = require('../constants/enums');

const patientSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  healthId: {
    type: String,
    required: true,
    unique: true,
    index: true,
    uppercase: true
  },
  fullName: {
    type: String,
    required: [true, 'Full name is required'],
    trim: true
  },
  dateOfBirth: {
    type: Date,
    required: [true, 'Date of birth is required']
  },
  gender: {
    type: String,
    enum: Object.values(GENDER),
    required: true
  },
  bloodGroup: {
    type: String,
    enum: BLOOD_GROUPS,
    required: true
  },
  contactNumber: {
    type: String,
    required: [true, 'Contact number is required']
  },
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: { type: String, default: 'India' }
  },
  emergencyContact: {
    name: String,
    relationship: String,
    phone: String
  },
  allergies: [{
    type: String
  }],
  medicalHistory: [{
    type: String
  }],
  qrCodeDataUrl: {
    type: String
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Patient', patientSchema);
