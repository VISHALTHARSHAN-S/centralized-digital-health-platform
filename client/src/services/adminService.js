import axiosClient from '../api/axiosClient';

export const adminService = {
  getAnalytics: async () => {
    return await axiosClient.get('/admin/analytics');
  },
  getUsers: async (params = {}) => {
    return await axiosClient.get('/admin/users', { params });
  },
  updateUserStatus: async (userId, status) => {
    return await axiosClient.patch(`/admin/users/${userId}/status`, { status });
  }
};
