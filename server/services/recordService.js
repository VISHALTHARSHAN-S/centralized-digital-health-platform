const MedicalRecord = require('../models/MedicalRecord');
const Patient = require('../models/Patient');
const Doctor = require('../models/Doctor');
const Hospital = require('../models/Hospital');

class RecordService {
  async createMedicalRecord(data, doctorUserId) {
    const doctor = await Doctor.findOne({ userId: doctorUserId });
    if (!doctor) throw new Error('Doctor profile not found');

    const patient = await Patient.findById(data.patientId);
    if (!patient) throw new Error('Patient not found');

    const record = await MedicalRecord.create({
      ...data,
      doctorId: doctor._id,
      hospitalId: data.hospitalId || doctor.hospitalId
    });

    return await record.populate([
      { path: 'patientId', select: 'fullName healthId bloodGroup' },
      { path: 'doctorId', select: 'fullName specialization' },
      { path: 'hospitalId', select: 'name' }
    ]);
  }

  async getPatientRecords(patientId, filter = {}) {
    const query = { patientId };
    if (filter.recordType) query.recordType = filter.recordType;
    if (filter.search) {
      query.$or = [
        { title: { $regex: filter.search, $options: 'i' } },
        { diagnosis: { $regex: filter.search, $options: 'i' } }
      ];
    }

    return await MedicalRecord.find(query)
      .populate('doctorId', 'fullName specialization')
      .populate('hospitalId', 'name city')
      .sort({ recordDate: -1 });
  }

  async getRecordById(id) {
    const record = await MedicalRecord.findById(id)
      .populate('patientId')
      .populate('doctorId', 'fullName specialization licenseNumber contactNumber')
      .populate('hospitalId');
    if (!record) throw new Error('Medical record not found');
    return record;
  }
}

module.exports = new RecordService();
