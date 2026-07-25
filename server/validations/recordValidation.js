const { body } = require('express-validator');
const { RECORD_TYPES } = require('../constants/enums');

const createRecordValidation = [
  body('patientId').isMongoId().withMessage('Valid Mongo Patient ID is required'),
  body('title').notEmpty().withMessage('Record title is required'),
  body('recordType').isIn(Object.values(RECORD_TYPES)).withMessage('Valid record type required'),
  body('diagnosis').notEmpty().withMessage('Diagnosis description is required')
];

module.exports = {
  createRecordValidation
};
