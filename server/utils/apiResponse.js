const sendSuccess = (res, statusCode = 200, message = 'Success', data = null, meta = null) => {
  const response = {
    success: true,
    message,
    data
  };
  if (meta) {
    response.meta = meta;
  }
  return res.status(statusCode).json(response);
};

const sendError = (res, statusCode = 500, message = 'Server Error', errors = null) => {
  const response = {
    success: false,
    message
  };
  if (errors) {
    response.errors = errors;
  }
  return res.status(statusCode).json(response);
};

const sendPaginated = (res, statusCode = 200, message = 'Success', data = [], page = 1, limit = 10, total = 0) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
    pagination: {
      total,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(total / limit) || 1
    }
  });
};

module.exports = {
  sendSuccess,
  sendError,
  sendPaginated
};
