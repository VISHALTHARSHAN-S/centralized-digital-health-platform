const Notification = require('../models/Notification');

class NotificationService {
  async createNotification(userId, title, message, type = 'SYSTEM', link = '') {
    return await Notification.create({
      userId,
      title,
      message,
      type,
      link
    });
  }

  async getUserNotifications(userId) {
    return await Notification.find({ userId }).sort({ createdAt: -1 }).limit(20);
  }

  async markAsRead(notificationId, userId) {
    const notif = await Notification.findOne({ _id: notificationId, userId });
    if (!notif) throw new Error('Notification not found');
    notif.isRead = true;
    await notif.save();
    return notif;
  }
}

module.exports = new NotificationService();
