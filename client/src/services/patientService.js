import axiosClient from '../api/axiosClient';

export const patientService = {
  getProfile: async () => {
    return await axiosClient.get('/patient/profile');
  },
  updateProfile: async (data) => {
    return await axiosClient.put('/patient/profile', data);
  },
  getMedicalSummary: async () => {
    return await axiosClient.get('/patient/summary');
  },
  getDashboardStats: async () => {
    return await axiosClient.get('/patient/dashboard-stats');
  },
  lookupByHealthId: async (healthId) => {
    return await axiosClient.get(`/patient/lookup/${healthId}`);
  }
};
