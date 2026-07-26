import axiosClient from '../api/axiosClient';

export const adminService = {
  getAnalytics: async () => {
    return await axiosClient.get('/admin/analytics');
  },
  getDashboardStats: async () => {
    return await axiosClient.get('/admin/dashboard-stats');
  },
  getUsers: async (params = {}) => {
    return await axiosClient.get('/admin/users', { params });
  },
  getDoctors: async () => {
    return await axiosClient.get('/doctor/all');
  },
  getHospitals: async () => {
    return await axiosClient.get('/hospital');
  },
  getReports: async () => {
    return await axiosClient.get('/report/patient');
  },
  updateUserStatus: async (userId, status) => {
    return await axiosClient.patch(`/admin/users/${userId}/status`, { status });
  }
};
