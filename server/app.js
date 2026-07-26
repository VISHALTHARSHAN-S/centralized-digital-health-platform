const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');

const { notFound, errorHandler } = require('./middleware/errorMiddleware');

// Route imports
const authRoutes = require('./routes/authRoutes');
const patientRoutes = require('./routes/patientRoutes');
const doctorRoutes = require('./routes/doctorRoutes');
const hospitalRoutes = require('./routes/hospitalRoutes');
const recordRoutes = require('./routes/recordRoutes');
const reportRoutes = require('./routes/reportRoutes');
const prescriptionRoutes = require('./routes/prescriptionRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const adminRoutes = require('./routes/adminRoutes');
const notificationRoutes = require('./routes/notificationRoutes');

const app = express();

// Security Header configuration
app.use(helmet({
  crossOriginResourcePolicy: false
}));

// CORS Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || '*',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS']
}));

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Static files server for uploads (Reports/PDFs)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Health Check API
app.get('/api/v1/health', (req, res) => {
  res.status(200).json({
    status: 'UP',
    system: 'Centralized Health Management System (CHMS)',
    version: '1.0.0',
    timestamp: new Date()
  });
});

// API Routes Mounting
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/patient', patientRoutes);
app.use('/api/v1/doctor', doctorRoutes);
app.use('/api/v1/hospital', hospitalRoutes);
app.use('/api/v1/record', recordRoutes);
app.use('/api/v1/report', reportRoutes);
app.use('/api/report', reportRoutes);
app.use('/api/v1/prescription', prescriptionRoutes);
app.use('/api/v1/appointment', appointmentRoutes);
app.use('/api/v1/admin', adminRoutes);
app.use('/api/v1/notification', notificationRoutes);

// Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

module.exports = app;
