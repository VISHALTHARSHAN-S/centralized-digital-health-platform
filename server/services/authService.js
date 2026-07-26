const User = require('../models/User');
const Patient = require('../models/Patient');
const Doctor = require('../models/Doctor');
const Hospital = require('../models/Hospital');
const Admin = require('../models/Admin');
const generateHealthId = require('../utils/generateHealthId');
const { generateAccessToken, generateRefreshToken } = require('../utils/generateToken');
const qrcode = require('qrcode');

class AuthService {
  async registerUser(data) {
    const { email, password, role, fullName, ...details } = data;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error('An account with this email address already exists');
    }

    const user = await User.create({
      email,
      password,
      role
    });

    let profileData = null;

    if (role === 'PATIENT') {
      const healthId = generateHealthId();
      // Generate digital QR code payload
      const qrDataPayload = JSON.stringify({
        healthId,
        fullName,
        bloodGroup: details.bloodGroup || 'O+',
        emergencyContact: details.contactNumber || '9999999999'
      });
      const qrCodeDataUrl = await qrcode.toDataURL(qrDataPayload);

      profileData = await Patient.create({
        userId: user._id,
        healthId,
        fullName,
        dateOfBirth: details.dateOfBirth || new Date('1995-01-01'),
        gender: details.gender || 'Male',
        bloodGroup: details.bloodGroup || 'O+',
        contactNumber: details.contactNumber || '9876543210',
        address: details.address || { street: '123 Health Ave', city: 'New Delhi', state: 'Delhi', zipCode: '110001' },
        emergencyContact: details.emergencyContact || { name: 'Emergency Contact', relationship: 'Family', phone: '9876543211' },
        allergies: details.allergies || ['None reported'],
        medicalHistory: details.medicalHistory || ['No major prior surgery'],
        qrCodeDataUrl
      });
    } else if (role === 'DOCTOR') {
      // Pick or assign a default hospital if none specified
      let hospitalId = details.hospitalId;
      if (!hospitalId) {
        let defaultHospital = await Hospital.findOne();
        if (!defaultHospital) {
          defaultHospital = await Hospital.create({
            name: 'AIIMS Central Hospital',
            registrationNumber: 'HOSP-AIIMS-001',
            type: 'Government',
            city: 'New Delhi',
            state: 'Delhi',
            address: 'Ansari Nagar, New Delhi',
            contactNumber: '011-26588500',
            email: 'info@aiims.gov.in'
          });
        }
        hospitalId = defaultHospital._id;
      }

      profileData = await Doctor.create({
        userId: user._id,
        fullName,
        specialization: details.specialization || 'General Medicine',
        qualification: details.qualification || 'MBBS, MD',
        licenseNumber: details.licenseNumber || `LIC-${Date.now()}`,
        hospitalId,
        contactNumber: details.contactNumber || '9876543210',
        experienceYears: details.experienceYears || 8,
        consultationFee: details.consultationFee || 500
      });
    } else if (role === 'ADMIN') {
      profileData = await Admin.create({
        userId: user._id,
        fullName,
        email,
        phoneNumber: details.phoneNumber || details.contactNumber || '9999999999',
        employeeId: details.employeeId || `EMP-${Date.now()}`
      });
    }

    const tokenPayload = { id: user._id, role: user.role, email: user.email };
    const accessToken = generateAccessToken(tokenPayload);
    const refreshToken = generateRefreshToken(tokenPayload);

    user.refreshToken = refreshToken;
    user.lastLogin = new Date();
    await user.save();

    return {
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
        status: user.status
      },
      profile: profileData,
      accessToken,
      refreshToken
    };
  }

  async loginUser(email, password) {
    const normalizedEmail = (email || '').trim().toLowerCase();
    const user = await User.findOne({ email: normalizedEmail }).select('+password');
    if (!user) {
      throw new Error('No account found for this email address');
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      throw new Error('Incorrect password. Please try again.');
    }

    if (user.status === 'SUSPENDED') {
      throw new Error('Account has been suspended. Contact administrator.');
    }

    let profile = null;
    if (user.role === 'PATIENT') {
      profile = await Patient.findOne({ userId: user._id });
    } else if (user.role === 'DOCTOR') {
      profile = await Doctor.findOne({ userId: user._id }).populate('hospitalId', 'name city');
    } else if (user.role === 'ADMIN') {
      profile = await Admin.findOne({ userId: user._id });
    }

    const tokenPayload = { id: user._id, role: user.role, email: user.email };
    const accessToken = generateAccessToken(tokenPayload);
    const refreshToken = generateRefreshToken(tokenPayload);

    user.refreshToken = refreshToken;
    user.lastLogin = new Date();
    await user.save();

    return {
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
        status: user.status
      },
      profile,
      accessToken,
      refreshToken
    };
  }

  async getCurrentUserProfile(userId, role) {
    const user = await User.findById(userId);
    if (!user) throw new Error('User not found');

    let profile = null;
    if (role === 'PATIENT') {
      profile = await Patient.findOne({ userId });
    } else if (role === 'DOCTOR') {
      profile = await Doctor.findOne({ userId }).populate('hospitalId');
    } else if (role === 'ADMIN') {
      profile = await Admin.findOne({ userId });
    }

    return {
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
        status: user.status
      },
      profile
    };
  }
}

module.exports = new AuthService();
