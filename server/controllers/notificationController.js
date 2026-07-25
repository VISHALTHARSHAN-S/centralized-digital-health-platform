const notificationService = require('../services/notificationService');
const { sendSuccess } = require('../utils/apiResponse');

const getNotifications = async (req, res, next) => {
  try {
    const list = await notificationService.getUserNotifications(req.user._id);
    return sendSuccess(res, 200, 'Notifications list', list);
  } catch (error) {
    next(error);
  }
};

const markRead = async (req, res, next) => {
  try {
    const notif = await notificationService.markAsRead(req.params.id, req.user._id);
    return sendSuccess(res, 200, 'Notification marked as read', notif);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getNotifications,
  markRead
};
