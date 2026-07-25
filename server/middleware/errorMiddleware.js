const { sendError } = require('../utils/apiResponse');

const notFound = (req, res, next) => {
  return sendError(res, 404, `API Route Not Found - [${req.method}] ${req.originalUrl}`);
};

const errorHandler = (err, req, res, next) => {
  console.error('Unhandled Application Error:', err);

  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message || 'Internal Server Error';

  // Mongoose Bad ObjectId
  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    statusCode = 400;
    message = 'Resource not found: Invalid ObjectId string identifier';
  }

  // Mongoose Duplicate Key
  if (err.code === 11000) {
    statusCode = 400;
    const field = Object.keys(err.keyValue || {})[0] || 'field';
    message = `Duplicate field value entered for ${field}. Please use another value`;
  }

  // Mongoose Validation Error
  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = Object.values(err.errors).map((val) => val.message).join(', ');
  }

  return sendError(res, statusCode, message);
};

module.exports = {
  notFound,
  errorHandler
};
