const mongoose = require('mongoose');
const { HOSPITAL_TYPES } = require('../constants/enums');

const hospitalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Hospital name is required'],
    trim: true,
    index: true
  },
  registrationNumber: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  type: {
    type: String,
    enum: Object.values(HOSPITAL_TYPES),
    default: HOSPITAL_TYPES.GOVERNMENT
  },
  city: {
    type: String,
    required: true,
    index: true
  },
  state: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  contactNumber: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  totalBeds: {
    type: Number,
    default: 100
  },
  availableICUBeds: {
    type: Number,
    default: 10
  },
  status: {
    type: String,
    enum: ['ACTIVE', 'INACTIVE'],
    default: 'ACTIVE'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Hospital', hospitalSchema);
