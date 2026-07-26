import axiosClient from '../api/axiosClient';

export const reportService = {
  uploadReport: async (formData, onUploadProgress) => {
    return await axiosClient.post('/report/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      onUploadProgress
    });
  },
  getReports: async (patientId, params = {}) => {
    const url = patientId ? `/report/patient/${patientId}` : '/report/patient';
    return await axiosClient.get(url, { params });
  },
  deleteReport: async (id) => {
    return await axiosClient.delete(`/report/${id}`);
  }
};
