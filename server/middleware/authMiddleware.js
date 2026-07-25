const { verifyToken } = require('../utils/generateToken');
const { sendError } = require('../utils/apiResponse');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = verifyToken(token);

      // Check if db user exists
      const user = await User.findById(decoded.id).select('-password');

      if (!user) {
        return sendError(res, 401, 'User account associated with token no longer exists');
      }

      if (user.status === 'SUSPENDED') {
        return sendError(res, 403, 'Account has been suspended. Please contact administrator.');
      }

      req.user = user;
      return next();
    } catch (error) {
      console.error('JWT verification error:', error.message);
      return sendError(res, 401, 'Not authorized, token invalid or expired');
    }
  }

  if (!token) {
    return sendError(res, 401, 'Not authorized, access token required in Bearer format');
  }
};

module.exports = { protect };
