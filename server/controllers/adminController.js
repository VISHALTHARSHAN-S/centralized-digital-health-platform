const adminService = require('../services/adminService');
const { sendSuccess } = require('../utils/apiResponse');

const getAnalytics = async (req, res, next) => {
  try {
    const data = await adminService.getAnalyticsDashboard();
    return sendSuccess(res, 200, 'Admin analytics dashboard data', data);
  } catch (error) {
    next(error);
  }
};

const getDashboardStats = async (req, res, next) => {
  try {
    const stats = await adminService.getDashboardStats();
    return sendSuccess(res, 200, 'Admin dashboard statistics retrieved', stats);
  } catch (error) {
    next(error);
  }
};

const getUsers = async (req, res, next) => {
  try {
    const users = await adminService.getAllUsers(req.query);
    return sendSuccess(res, 200, 'User records retrieved', users);
  } catch (error) {
    next(error);
  }
};

const updateUserStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const user = await adminService.toggleUserStatus(req.params.id, status);
    return sendSuccess(res, 200, `User status updated to ${status}`, user);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAnalytics,
  getDashboardStats,
  getUsers,
  updateUserStatus
};
