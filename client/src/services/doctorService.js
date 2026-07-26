import axiosClient from '../api/axiosClient';

export const doctorService = {
  getProfile: async () => {
    return await axiosClient.get('/doctor/profile');
  },
  getDashboardStats: async () => {
    return await axiosClient.get('/doctor/dashboard-stats');
  },
  getPatientTimeline: async (healthId) => {
    return await axiosClient.get(`/doctor/timeline/${healthId}`);
  },
  searchPatientByHealthId: async (healthId) => {
    return await axiosClient.get(`/doctor/search/${healthId}`);
  },
  getAllDoctors: async () => {
    return await axiosClient.get('/doctor/all');
  }
};
