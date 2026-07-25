import axiosClient from '../api/axiosClient';

export const prescriptionService = {
  createPrescription: async (data) => {
    return await axiosClient.post('/prescription', data);
  },
  getPrescriptions: async (patientId) => {
    const url = patientId ? `/prescription/patient/${patientId}` : '/prescription/patient';
    return await axiosClient.get(url);
  },
  getPrescriptionById: async (id) => {
    return await axiosClient.get(`/prescription/${id}`);
  }
};
