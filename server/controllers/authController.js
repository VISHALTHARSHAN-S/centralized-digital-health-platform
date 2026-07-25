const authService = require('../services/authService');
const { sendSuccess, sendError } = require('../utils/apiResponse');

const register = async (req, res, next) => {
  try {
    const result = await authService.registerUser(req.body);
    return sendSuccess(res, 201, 'User registered successfully', result);
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await authService.loginUser(email, password);
    return sendSuccess(res, 200, 'Login successful', result);
  } catch (error) {
    return sendError(res, 401, error.message);
  }
};

const getMe = async (req, res, next) => {
  try {
    const result = await authService.getCurrentUserProfile(req.user._id, req.user.role);
    return sendSuccess(res, 200, 'Current profile retrieved', result);
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res) => {
  return sendSuccess(res, 200, 'Logged out successfully');
};

module.exports = {
  register,
  login,
  getMe,
  logout
};
