const Doctor = require('../models/Doctor');
const Patient = require('../models/Patient');
const MedicalRecord = require('../models/MedicalRecord');
const Prescription = require('../models/Prescription');
const Appointment = require('../models/Appointment');
const Report = require('../models/Report');

class DoctorService {
  async getDoctorByUserId(userId) {
    const doctor = await Doctor.findOne({ userId }).populate('hospitalId');
    if (!doctor) throw new Error('Doctor profile not found');
    return doctor;
  }

  async getPatientTimeline(healthId) {
    const patient = await Patient.findOne({ healthId: healthId.toUpperCase() });
    if (!patient) throw new Error(`Patient with Health ID ${healthId} not found`);

    const records = await MedicalRecord.find({ patientId: patient._id })
      .populate('doctorId', 'fullName specialization')
      .populate('hospitalId', 'name city')
      .sort({ recordDate: -1 });

    const reports = await Report.find({ patientId: patient._id })
      .populate('doctorId', 'fullName')
      .sort({ uploadDate: -1 });

    const prescriptions = await Prescription.find({ patientId: patient._id })
      .populate('doctorId', 'fullName specialization')
      .sort({ issueDate: -1 });

    return {
      patient,
      records,
      reports,
      prescriptions
    };
  }

  async searchPatientByHealthId(healthId) {
    const normalizedHealthId = healthId.trim().toUpperCase();
    const patient = await Patient.findOne({ healthId: normalizedHealthId });

    if (!patient) {
      throw new Error(`Patient with Health ID ${normalizedHealthId} not found`);
    }

    const [records, reports, prescriptions] = await Promise.all([
      MedicalRecord.find({ patientId: patient._id })
        .populate('doctorId', 'fullName specialization')
        .populate('hospitalId', 'name city')
        .sort({ recordDate: -1 }),
      Report.find({ patientId: patient._id })
        .populate('doctorId', 'fullName')
        .sort({ uploadDate: -1 }),
      Prescription.find({ patientId: patient._id })
        .populate('doctorId', 'fullName specialization')
        .sort({ issueDate: -1 })
    ]);

    return {
      patient,
      records,
      reports,
      prescriptions
    };
  }

  async getDoctorDashboardStats(doctorId) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const totalPatientsAttended = await Appointment.distinct('patientId', { doctorId, status: 'Completed' });
    const todaysAppointments = await Appointment.find({
      doctorId,
      appointmentDate: { $gte: today }
    })
      .populate('patientId', 'fullName healthId bloodGroup gender contactNumber')
      .sort({ appointmentDate: 1 });

    const pendingConsultations = todaysAppointments.filter(a => a.status === 'Scheduled').length;
    const totalPrescriptionsIssued = await Prescription.countDocuments({ doctorId });

    return {
      totalPatientsCount: totalPatientsAttended.length,
      todaysAppointmentsCount: todaysAppointments.length,
      pendingConsultations,
      totalPrescriptionsIssued,
      todaysAppointments
    };
  }
}

module.exports = new DoctorService();
