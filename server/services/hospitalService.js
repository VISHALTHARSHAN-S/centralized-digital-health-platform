const Hospital = require('../models/Hospital');

class HospitalService {
  async getAllHospitals(query = {}) {
    const { search, city, type } = query;
    const filter = {};
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { registrationNumber: { $regex: search, $options: 'i' } }
      ];
    }
    if (city) filter.city = { $regex: city, $options: 'i' };
    if (type) filter.type = type;

    return await Hospital.find(filter).sort({ name: 1 });
  }

  async createHospital(data) {
    const existing = await Hospital.findOne({ registrationNumber: data.registrationNumber });
    if (existing) {
      throw new Error('Hospital registration number already registered');
    }
    return await Hospital.create(data);
  }

  async getHospitalById(id) {
    const hospital = await Hospital.findById(id);
    if (!hospital) throw new Error('Hospital not found');
    return hospital;
  }
}

module.exports = new HospitalService();
