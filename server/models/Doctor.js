const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  fullName: {
    type: String,
    required: [true, 'Doctor name is required'],
    trim: true
  },
  specialization: {
    type: String,
    required: [true, 'Specialization is required'],
    trim: true,
    index: true
  },
  qualification: {
    type: String,
    required: true
  },
  licenseNumber: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  hospitalId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hospital',
    required: true
  },
  contactNumber: {
    type: String,
    required: true
  },
  experienceYears: {
    type: Number,
    default: 5
  },
  consultationFee: {
    type: Number,
    default: 500
  },
  availabilitySlots: [{
    day: { type: String, enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] },
    startTime: String,
    endTime: String,
    maxPatients: { type: Number, default: 20 }
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Doctor', doctorSchema);
