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
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const [totalPatientsAttended, todaysAppointments, totalReportsUploaded, totalPrescriptionsIssued] = await Promise.all([
      Appointment.distinct('patientId', { doctorId, status: 'Completed' }).then((ids) => ids.length),
      Appointment.find({
        doctorId,
        appointmentDate: { $gte: startOfDay, $lte: endOfDay }
      })
        .populate('patientId', 'fullName healthId bloodGroup gender contactNumber')
        .sort({ appointmentDate: 1 }),
      Report.countDocuments({ doctorId }),
      Prescription.countDocuments({ doctorId })
    ]);

    const todaysPatients = new Set(todaysAppointments.map((appointment) => appointment.patientId?._id?.toString()).filter(Boolean)).size;

    return {
      totalPatientsCount: totalPatientsAttended,
      todaysPatients,
      todaysAppointmentsCount: todaysAppointments.length,
      totalReportsUploaded,
      totalPrescriptionsIssued,
      todaysAppointments
    };
  }
}

module.exports = new DoctorService();
