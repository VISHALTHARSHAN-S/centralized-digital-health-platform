const Report = require('../models/Report');
const Patient = require('../models/Patient');
const Doctor = require('../models/Doctor');
const { cloudinary, isCloudinaryConfigured } = require('../config/cloudinary');
const fs = require('fs');

class ReportService {
  async uploadReport(file, bodyData, uploaderUser) {
    let patientId = bodyData.patientId;

    if (!patientId && uploaderUser.role === 'PATIENT') {
      const patient = await Patient.findOne({ userId: uploaderUser.id });
      if (!patient) throw new Error('Patient profile not found');
      patientId = patient._id;
    }

    if (!patientId) {
      throw new Error('Patient ID is required for report upload');
    }

    let fileUrl = `/uploads/${file.filename}`;
    let cloudinaryId = null;

    // Optional Cloudinary Upload
    if (isCloudinaryConfigured()) {
      try {
        const result = await cloudinary.uploader.upload(file.path, {
          folder: 'chms_reports',
          resource_type: 'auto'
        });
        fileUrl = result.secure_url;
        cloudinaryId = result.public_id;

        // Clean up local temp file
        if (fs.existsSync(file.path)) {
          fs.unlinkSync(file.path);
        }
      } catch (err) {
        console.warn('Cloudinary upload warning, using local file URL:', err.message);
      }
    }

    let doctorId = bodyData.doctorId;
    if (uploaderUser.role === 'DOCTOR') {
      const doc = await Doctor.findOne({ userId: uploaderUser.id });
      if (doc) doctorId = doc._id;
    }

    const report = await Report.create({
      patientId,
      doctorId: doctorId || null,
      recordId: bodyData.recordId || null,
      title: bodyData.title || file.originalname,
      category: bodyData.category || 'Other',
      fileUrl,
      cloudinaryId,
      fileSize: file.size,
      fileType: file.mimetype,
      uploadDate: new Date()
    });

    return await report.populate('patientId', 'fullName healthId');
  }

  async getReportsByPatient(patientId, query = {}) {
    const filter = { patientId };
    if (query.category) filter.category = query.category;
    if (query.search) filter.title = { $regex: query.search, $options: 'i' };

    return await Report.find(filter)
      .populate('doctorId', 'fullName specialization')
      .sort({ uploadDate: -1 });
  }

  async deleteReport(reportId, user) {
    const report = await Report.findById(reportId);
    if (!report) throw new Error('Report not found');

    if (report.cloudinaryId && isCloudinaryConfigured()) {
      try {
        await cloudinary.uploader.destroy(report.cloudinaryId);
      } catch (e) {
        console.error('Cloudinary destroy error:', e.message);
      }
    }

    await Report.findByIdAndDelete(reportId);
    return true;
  }
}

module.exports = new ReportService();
