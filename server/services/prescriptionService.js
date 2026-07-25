const Prescription = require('../models/Prescription');
const Doctor = require('../models/Doctor');
const Patient = require('../models/Patient');

class PrescriptionService {
  async createPrescription(data, doctorUserId) {
    const doctor = await Doctor.findOne({ userId: doctorUserId });
    if (!doctor) throw new Error('Doctor profile not found');

    const patient = await Patient.findById(data.patientId);
    if (!patient) throw new Error('Patient not found');

    const prescription = await Prescription.create({
      ...data,
      doctorId: doctor._id,
      issueDate: new Date()
    });

    return await prescription.populate([
      { path: 'patientId', select: 'fullName healthId bloodGroup' },
      { path: 'doctorId', select: 'fullName specialization qualification' }
    ]);
  }

  async getPrescriptionsForPatient(patientId) {
    return await Prescription.find({ patientId })
      .populate('doctorId', 'fullName specialization qualification contactNumber')
      .sort({ issueDate: -1 });
  }

  async getPrescriptionById(id) {
    const prescription = await Prescription.findById(id)
      .populate('patientId')
      .populate('doctorId', 'fullName specialization qualification licenseNumber contactNumber');
    if (!prescription) throw new Error('Prescription not found');
    return prescription;
  }
}

module.exports = new PrescriptionService();
