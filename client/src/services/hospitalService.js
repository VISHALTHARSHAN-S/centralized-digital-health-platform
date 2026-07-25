import axiosClient from '../api/axiosClient';

export const hospitalService = {
  getHospitals: async (params = {}) => {
    return await axiosClient.get('/hospital', { params });
  },
  createHospital: async (data) => {
    return await axiosClient.post('/hospital', data);
  }
};
