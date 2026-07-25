const ROLES = {
  PATIENT: 'PATIENT',
  DOCTOR: 'DOCTOR',
  ADMIN: 'ADMIN'
};

const USER_STATUS = {
  ACTIVE: 'ACTIVE',
  PENDING: 'PENDING',
  SUSPENDED: 'SUSPENDED'
};

const GENDER = {
  MALE: 'Male',
  FEMALE: 'Female',
  OTHER: 'Other'
};

const BLOOD_GROUPS = [
  'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'
];

const HOSPITAL_TYPES = {
  GOVERNMENT: 'Government',
  PRIVATE: 'Private',
  SPECIALIZED: 'Specialized'
};

const RECORD_TYPES = {
  DIAGNOSIS: 'Diagnosis',
  LAB_TEST: 'Lab Test',
  SCAN: 'Scan',
  DISCHARGE_SUMMARY: 'Discharge Summary'
};

const REPORT_CATEGORIES = {
  BLOOD_TEST: 'Blood Test',
  RADIOLOGY: 'Radiology',
  PATHOLOGY: 'Pathology',
  SCAN: 'Scan',
  OTHER: 'Other'
};

const APPOINTMENT_STATUS = {
  SCHEDULED: 'Scheduled',
  COMPLETED: 'Completed',
  CANCELLED: 'Cancelled'
};

const NOTIFICATION_TYPES = {
  APPOINTMENT: 'APPOINTMENT',
  PRESCRIPTION: 'PRESCRIPTION',
  REPORT: 'REPORT',
  SYSTEM: 'SYSTEM'
};

module.exports = {
  ROLES,
  USER_STATUS,
  GENDER,
  BLOOD_GROUPS,
  HOSPITAL_TYPES,
  RECORD_TYPES,
  REPORT_CATEGORIES,
  APPOINTMENT_STATUS,
  NOTIFICATION_TYPES
};
