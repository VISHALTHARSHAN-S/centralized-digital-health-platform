const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.join(__dirname, '../.env') });

const connectDB = require('../config/db');
const User = require('../models/User');
const Patient = require('../models/Patient');
const Doctor = require('../models/Doctor');
const Hospital = require('../models/Hospital');
const MedicalRecord = require('../models/MedicalRecord');
const Report = require('../models/Report');
const Prescription = require('../models/Prescription');
const Appointment = require('../models/Appointment');
const Notification = require('../models/Notification');
const generateHealthId = require('./generateHealthId');
const qrcode = require('qrcode');

const seedDatabase = async () => {
  try {
    const conn = await connectDB();
    if (!conn) {
      console.log('Skipping db seed: Mongo not connected');
      process.exit(0);
    }

    console.log('Clearing existing database collections...');
    await User.deleteMany({});
    await Patient.deleteMany({});
    await Doctor.deleteMany({});
    await Hospital.deleteMany({});
    await MedicalRecord.deleteMany({});
    await Report.deleteMany({});
    await Prescription.deleteMany({});
    await Appointment.deleteMany({});
    await Notification.deleteMany({});

    console.log('Seeding Hospitals...');
    const hospital1 = await Hospital.create({
      name: 'AIIMS Central Super Specialty Hospital',
      registrationNumber: 'GOV-HOSP-001',
      type: 'Government',
      city: 'New Delhi',
      state: 'Delhi',
      address: 'Sri Aurobindo Marg, Ansari Nagar, New Delhi - 110029',
      contactNumber: '011-26588500',
      email: 'contact@aiims.gov.in',
      totalBeds: 500,
      availableICUBeds: 45
    });

    const hospital2 = await Hospital.create({
      name: 'Apollo National Healthcare Center',
      registrationNumber: 'PVT-HOSP-042',
      type: 'Private',
      city: 'Mumbai',
      state: 'Maharashtra',
      address: 'Central Avenue, Bandra, Mumbai - 400050',
      contactNumber: '022-26519000',
      email: 'info@apollohealth.com',
      totalBeds: 350,
      availableICUBeds: 28
    });

    console.log('Seeding Admin Account...');
    const adminUser = await User.create({
      email: 'admin@chms.gov.in',
      password: 'password123',
      role: 'ADMIN',
      status: 'ACTIVE'
    });

    console.log('Seeding Doctors...');
    const docUser1 = await User.create({
      email: 'doctor.sharma@chms.gov.in',
      password: 'password123',
      role: 'DOCTOR',
      status: 'ACTIVE'
    });

    const doc1 = await Doctor.create({
      userId: docUser1._id,
      fullName: 'Dr. Rajesh Sharma',
      specialization: 'Cardiology',
      qualification: 'MBBS, MD (Cardiology), FACC',
      licenseNumber: 'MCI-REG-84920',
      hospitalId: hospital1._id,
      contactNumber: '+91 98102 34567',
      experienceYears: 14,
      consultationFee: 800,
      availabilitySlots: [
        { day: 'Monday', startTime: '09:00 AM', endTime: '01:00 PM', maxPatients: 15 },
        { day: 'Wednesday', startTime: '02:00 PM', endTime: '06:00 PM', maxPatients: 15 }
      ]
    });

    const docUser2 = await User.create({
      email: 'doctor.verma@chms.gov.in',
      password: 'password123',
      role: 'DOCTOR',
      status: 'ACTIVE'
    });

    const doc2 = await Doctor.create({
      userId: docUser2._id,
      fullName: 'Dr. Ananya Verma',
      specialization: 'Endocrinology & Diabetology',
      qualification: 'MBBS, MD, DM (Endocrinology)',
      licenseNumber: 'MCI-REG-91045',
      hospitalId: hospital2._id,
      contactNumber: '+91 98765 12345',
      experienceYears: 10,
      consultationFee: 700
    });

    console.log('Seeding Patient Account...');
    const patientUser = await User.create({
      email: 'patient@chms.gov.in',
      password: 'password123',
      role: 'PATIENT',
      status: 'ACTIVE'
    });

    const healthId = 'HID-2026-4819-2041';
    const qrDataPayload = JSON.stringify({
      healthId,
      fullName: 'Rohan Gupta',
      bloodGroup: 'B+',
      emergencyContact: '+91 98765 43210'
    });
    const qrCodeDataUrl = await qrcode.toDataURL(qrDataPayload);

    const patient = await Patient.create({
      userId: patientUser._id,
      healthId,
      fullName: 'Rohan Gupta',
      dateOfBirth: new Date('1992-06-15'),
      gender: 'Male',
      bloodGroup: 'B+',
      contactNumber: '+91 98765 43210',
      address: {
        street: 'Flat 402, Sunshine Apartments, Sector 62',
        city: 'Noida',
        state: 'Uttar Pradesh',
        zipCode: '201301',
        country: 'India'
      },
      emergencyContact: {
        name: 'Sunita Gupta',
        relationship: 'Mother',
        phone: '+91 98111 22334'
      },
      allergies: ['Penicillin', 'Dust Mites'],
      medicalHistory: ['Mild Hypertension (Diagnosed 2023)', 'Sinusitis'],
      qrCodeDataUrl
    });

    console.log('Seeding Medical Records...');
    const record1 = await MedicalRecord.create({
      patientId: patient._id,
      doctorId: doc1._id,
      hospitalId: hospital1._id,
      recordType: 'Diagnosis',
      title: 'Routine Cardiac & Blood Pressure Evaluation',
      diagnosis: 'Essential Stage 1 Hypertension',
      symptoms: ['Occasional headache', 'Mild fatigue'],
      clinicalNotes: 'Patient advised 30-minute daily walking regime, reduced sodium diet, and blood pressure logging.',
      vitals: {
        bloodPressure: '138/88 mmHg',
        heartRate: '76 bpm',
        temperature: '98.4 F',
        weight: '74 kg',
        height: '175 cm'
      },
      recordDate: new Date('2026-05-10')
    });

    const record2 = await MedicalRecord.create({
      patientId: patient._id,
      doctorId: doc2._id,
      hospitalId: hospital2._id,
      recordType: 'Lab Test',
      title: 'Comprehensive Lipid & HbA1c Panel',
      diagnosis: 'Normal Glycemic Control with Mild Hyperlipidemia',
      symptoms: ['Routine Annual Screening'],
      clinicalNotes: 'HbA1c level is 5.6%. LDL Cholesterol slightly elevated at 132 mg/dL.',
      vitals: {
        bloodPressure: '124/80 mmHg',
        heartRate: '72 bpm',
        temperature: '98.6 F',
        weight: '73.5 kg',
        height: '175 cm'
      },
      recordDate: new Date('2026-06-18')
    });

    console.log('Seeding Prescriptions...');
    await Prescription.create({
      patientId: patient._id,
      doctorId: doc1._id,
      medicalRecordId: record1._id,
      medications: [
        {
          name: 'Telmisartan',
          dosage: '40 mg',
          frequency: 'Once daily (Morning)',
          duration: '30 Days',
          instructions: 'Take after breakfast with water'
        },
        {
          name: 'Multivitamin Complex',
          dosage: '1 Tablet',
          frequency: 'Once daily (Night)',
          duration: '30 Days',
          instructions: 'Take after dinner'
        }
      ],
      diagnosisSummary: 'Essential Stage 1 Hypertension Management',
      dietaryInstructions: 'Low sodium intake (< 2g/day), avoid caffeine.',
      followUpDate: new Date('2026-08-15'),
      issueDate: new Date('2026-05-10')
    });

    console.log('Seeding Medical Reports...');
    await Report.create({
      patientId: patient._id,
      doctorId: doc1._id,
      recordId: record1._id,
      title: 'Electrocardiogram (ECG) Report',
      category: 'Radiology',
      fileUrl: '/uploads/sample_ecg_report.pdf',
      fileSize: 1048576,
      fileType: 'application/pdf',
      uploadDate: new Date('2026-05-10')
    });

    await Report.create({
      patientId: patient._id,
      doctorId: doc2._id,
      recordId: record2._id,
      title: 'Complete Blood Count & Lipid Panel',
      category: 'Blood Test',
      fileUrl: '/uploads/sample_blood_test.pdf',
      fileSize: 2097152,
      fileType: 'application/pdf',
      uploadDate: new Date('2026-06-18')
    });

    console.log('Seeding Appointments...');
    await Appointment.create({
      patientId: patient._id,
      doctorId: doc1._id,
      hospitalId: hospital1._id,
      appointmentDate: new Date('2026-08-10T10:30:00Z'),
      timeSlot: '10:30 AM - 11:00 AM',
      status: 'Scheduled',
      reasonForVisit: 'Hypertension 3-Month Follow-Up Evaluation'
    });

    await Appointment.create({
      patientId: patient._id,
      doctorId: doc2._id,
      hospitalId: hospital2._id,
      appointmentDate: new Date('2026-05-10T11:00:00Z'),
      timeSlot: '11:00 AM - 11:30 AM',
      status: 'Completed',
      reasonForVisit: 'Annual Diabetes & Thyroid Screening',
      clinicalNotes: 'Screening clear. Patient advised maintaining current diet.'
    });

    console.log('Seeding Notifications...');
    await Notification.create({
      userId: patientUser._id,
      title: 'Upcoming Appointment Reminder',
      message: 'You have a scheduled consultation with Dr. Rajesh Sharma on Aug 10 at 10:30 AM.',
      type: 'APPOINTMENT',
      isRead: false
    });

    await Notification.create({
      userId: patientUser._id,
      title: 'New Medical Report Uploaded',
      message: 'Your Complete Blood Count & Lipid Panel report is now available for review.',
      type: 'REPORT',
      isRead: true
    });

    console.log('\n========================================');
    console.log(' DATABASE SEEDING COMPLETED SUCCESSFULLY ');
    console.log('========================================');
    console.log('Demo Login Credentials:');
    console.log('• Patient: patient@chms.gov.in / password123 (Health ID: HID-2026-4819-2041)');
    console.log('• Doctor:  doctor.sharma@chms.gov.in / password123');
    console.log('• Admin:   admin@chms.gov.in / password123');
    console.log('========================================\n');

    process.exit(0);
  } catch (error) {
    console.error('Database seeding failed:', error);
    process.exit(1);
  }
};

seedDatabase();
