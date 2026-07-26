const { body } = require('express-validator');
const { ROLES, GENDER, BLOOD_GROUPS } = require('../constants/enums');

const registerValidation = [
  body('email').isEmail().withMessage('Valid email address is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  body('role').isIn(Object.values(ROLES)).withMessage('Valid role is required'),
  body('fullName').notEmpty().withMessage('Full name is required'),

  body('dateOfBirth').custom((value, { req }) => {
    if (req.body.role === ROLES.PATIENT) {
      if (!value || value === '') {
        throw new Error('Valid Date of Birth (YYYY-MM-DD) required');
      }
      if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
        throw new Error('Valid Date of Birth (YYYY-MM-DD) required');
      }
    }
    return true;
  }),

  body('gender').custom((value, { req }) => {
    if (req.body.role === ROLES.PATIENT) {
      if (!value) {
        throw new Error('Gender is required for patients');
      }
      if (!Object.values(GENDER).includes(value)) {
        throw new Error('Valid gender is required');
      }
    }
    return true;
  }),

  body('bloodGroup').custom((value, { req }) => {
    if (req.body.role === ROLES.PATIENT) {
      if (!value) {
        throw new Error('Blood group is required for patients');
      }
      if (!BLOOD_GROUPS.includes(value)) {
        throw new Error('Valid blood group is required');
      }
    }
    return true;
  }),

  body('licenseNumber').custom((value, { req }) => {
    if (req.body.role === ROLES.DOCTOR) {
      if (!value || value.trim() === '') {
        throw new Error('License number required for doctors');
      }
    }
    return true;
  }),

  body('specialization').custom((value, { req }) => {
    if (req.body.role === ROLES.DOCTOR) {
      if (!value || value.trim() === '') {
        throw new Error('Specialization required for doctors');
      }
    }
    return true;
  }),

  body('phoneNumber').custom((value, { req }) => {
    if (req.body.role === ROLES.ADMIN) {
      if (!value || value.trim() === '') {
        throw new Error('Phone number required for administrators');
      }
    }
    return true;
  }),

  body('employeeId').custom((value, { req }) => {
    if (req.body.role === ROLES.ADMIN) {
      if (!value || value.trim() === '') {
        throw new Error('Employee ID required for administrators');
      }
    }
    return true;
  })
];

const loginValidation = [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required')
];

module.exports = {
  registerValidation,
  loginValidation
};
