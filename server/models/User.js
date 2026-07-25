const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { ROLES, USER_STATUS } = require('../constants/enums');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email address is required'],
    unique: true,
    lowercase: true,
    trim: true,
    index: true
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 6,
    select: false
  },
  role: {
    type: String,
    enum: Object.values(ROLES),
    default: ROLES.PATIENT,
    required: true
  },
  status: {
    type: String,
    enum: Object.values(USER_STATUS),
    default: USER_STATUS.ACTIVE
  },
  isVerified: {
    type: Boolean,
    default: true
  },
  refreshToken: {
    type: String,
    select: false
  },
  lastLogin: {
    type: Date
  }
}, {
  timestamps: true
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
