import axiosClient from '../api/axiosClient';

export const recordService = {
  createRecord: async (data) => {
    return await axiosClient.post('/record', data);
  },
  getPatientRecords: async (patientId, params = {}) => {
    const url = patientId ? `/record/patient/${patientId}` : '/record/patient';
    return await axiosClient.get(url, { params });
  },
  getRecordById: async (id) => {
    return await axiosClient.get(`/record/${id}`);
  }
};
