import axiosClient from '../api/axiosClient';

export const notificationService = {
  getNotifications: async () => {
    return await axiosClient.get('/notification');
  },
  markAsRead: async (id) => {
    return await axiosClient.patch(`/notification/${id}/read`);
  }
};
