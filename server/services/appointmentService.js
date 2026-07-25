const Appointment = require('../models/Appointment');
const Doctor = require('../models/Doctor');
const Patient = require('../models/Patient');

class AppointmentService {
  async bookAppointment(patientUserId, data) {
    const patient = await Patient.findOne({ userId: patientUserId });
    if (!patient) throw new Error('Patient profile not found');

    const doctor = await Doctor.findById(data.doctorId);
    if (!doctor) throw new Error('Doctor not found');

    const appointment = await Appointment.create({
      patientId: patient._id,
      doctorId: doctor._id,
      hospitalId: doctor.hospitalId,
      appointmentDate: data.appointmentDate,
      timeSlot: data.timeSlot || '10:00 AM - 10:30 AM',
      reasonForVisit: data.reasonForVisit,
      status: 'Scheduled'
    });

    return await appointment.populate([
      { path: 'doctorId', select: 'fullName specialization consultationFee' },
      { path: 'hospitalId', select: 'name city' }
    ]);
  }

  async getMyAppointments(user) {
    if (user.role === 'PATIENT') {
      const patient = await Patient.findOne({ userId: user.id });
      if (!patient) return [];
      return await Appointment.find({ patientId: patient._id })
        .populate('doctorId', 'fullName specialization contactNumber')
        .populate('hospitalId', 'name city address')
        .sort({ appointmentDate: -1 });
    } else if (user.role === 'DOCTOR') {
      const doctor = await Doctor.findOne({ userId: user.id });
      if (!doctor) return [];
      return await Appointment.find({ doctorId: doctor._id })
        .populate('patientId', 'fullName healthId bloodGroup gender contactNumber')
        .populate('hospitalId', 'name city')
        .sort({ appointmentDate: -1 });
    } else {
      return await Appointment.find()
        .populate('patientId', 'fullName healthId')
        .populate('doctorId', 'fullName specialization')
        .populate('hospitalId', 'name')
        .sort({ appointmentDate: -1 });
    }
  }

  async updateAppointmentStatus(appointmentId, status, notes) {
    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) throw new Error('Appointment not found');

    appointment.status = status;
    if (notes) appointment.clinicalNotes = notes;
    await appointment.save();

    return await appointment.populate([
      { path: 'patientId', select: 'fullName healthId' },
      { path: 'doctorId', select: 'fullName specialization' }
    ]);
  }
}

module.exports = new AppointmentService();
