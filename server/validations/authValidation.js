const { body } = require('express-validator');
const { ROLES, GENDER, BLOOD_GROUPS } = require('../constants/enums');

const registerValidation = [
  body('email').isEmail().withMessage('Valid email address is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  body('role').isIn(Object.values(ROLES)).withMessage('Valid role is required'),
  body('fullName').notEmpty().withMessage('Full name is required'),
  
  // Conditional Patient Validation
  body('dateOfBirth').optional().isISO8601().withMessage('Valid Date of Birth (YYYY-MM-DD) required'),
  body('gender').optional().isIn(Object.values(GENDER)).withMessage('Valid gender is required'),
  body('bloodGroup').optional().isIn(BLOOD_GROUPS).withMessage('Valid blood group is required'),
  
  // Conditional Doctor Validation
  body('licenseNumber').optional().notEmpty().withMessage('License number required for doctors'),
  body('specialization').optional().notEmpty().withMessage('Specialization required for doctors')
];

const loginValidation = [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required')
];

module.exports = {
  registerValidation,
  loginValidation
};
