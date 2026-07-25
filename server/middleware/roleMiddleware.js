const { sendError } = require('../utils/apiResponse');

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return sendError(res, 401, 'User context not found. Ensure protect middleware is applied');
    }

    if (!roles.includes(req.user.role)) {
      return sendError(
        res,
        403,
        `Role [${req.user.role}] is not authorized to access this resource`
      );
    }

    next();
  };
};

module.exports = { authorize };
