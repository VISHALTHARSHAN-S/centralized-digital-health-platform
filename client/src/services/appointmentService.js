import axiosClient from '../api/axiosClient';

export const appointmentService = {
  bookAppointment: async (data) => {
    return await axiosClient.post('/appointment/book', data);
  },
  getMyAppointments: async () => {
    return await axiosClient.get('/appointment/my-appointments');
  },
  updateStatus: async (id, status, notes) => {
    return await axiosClient.patch(`/appointment/${id}/status`, { status, notes });
  }
};
