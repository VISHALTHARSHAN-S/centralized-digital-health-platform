const Patient = require('../models/Patient');
const MedicalRecord = require('../models/MedicalRecord');
const Report = require('../models/Report');
const Prescription = require('../models/Prescription');
const Appointment = require('../models/Appointment');

class PatientService {
  async getProfileByUserId(userId) {
    const patient = await Patient.findOne({ userId });
    if (!patient) {
      throw new Error('Patient profile record not found');
    }
    return patient;
  }

  async updateProfile(userId, updateData) {
    const patient = await Patient.findOneAndUpdate(
      { userId },
      { $set: updateData },
      { new: true, runValidators: true }
    );
    if (!patient) throw new Error('Patient record not found');
    return patient;
  }

  async getPatientMedicalSummary(patientId) {
    const patient = await Patient.findById(patientId);
    if (!patient) throw new Error('Patient not found');

    const totalRecords = await MedicalRecord.countDocuments({ patientId });
    const totalReports = await Report.countDocuments({ patientId });
    const totalPrescriptions = await Prescription.countDocuments({ patientId });
    const totalAppointments = await Appointment.countDocuments({ patientId });

    const recentRecords = await MedicalRecord.find({ patientId })
      .populate('doctorId', 'fullName specialization')
      .populate('hospitalId', 'name')
      .sort({ recordDate: -1 })
      .limit(5);

    const recentPrescriptions = await Prescription.find({ patientId })
      .populate('doctorId', 'fullName specialization')
      .sort({ issueDate: -1 })
      .limit(3);

    const upcomingAppointments = await Appointment.find({
      patientId,
      status: 'Scheduled',
      appointmentDate: { $gte: new Date() }
    })
      .populate('doctorId', 'fullName specialization')
      .populate('hospitalId', 'name')
      .sort({ appointmentDate: 1 })
      .limit(3);

    return {
      patient,
      stats: {
        totalRecords,
        totalReports,
        totalPrescriptions,
        totalAppointments
      },
      recentRecords,
      recentPrescriptions,
      upcomingAppointments
    };
  }

  async getDashboardStats(patientId) {
    const patient = await Patient.findById(patientId);
    if (!patient) throw new Error('Patient not found');

    const [totalReports, doctorsVisited, activePrescriptions, upcomingAppointments] = await Promise.all([
      Report.countDocuments({ patientId }),
      Appointment.distinct('doctorId', { patientId }).then((ids) => ids.length),
      Prescription.countDocuments({ patientId, followUpDate: { $gte: new Date() } }),
      Appointment.countDocuments({
        patientId,
        status: 'Scheduled',
        appointmentDate: { $gte: new Date() }
      })
    ]);

    return {
      patient,
      stats: {
        totalReports,
        doctorsVisited,
        activePrescriptions,
        upcomingAppointments
      }
    };
  }

  async findByHealthId(healthId) {
    const cleanHealthId = healthId.trim().toUpperCase();
    const patient = await Patient.findOne({ healthId: cleanHealthId });
    if (!patient) {
      throw new Error(`No patient record found with Health ID: ${cleanHealthId}`);
    }
    return patient;
  }
}

module.exports = new PatientService();
