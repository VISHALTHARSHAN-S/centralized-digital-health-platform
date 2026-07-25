import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import AuthLayout from '../layouts/AuthLayout';
import DashboardLayout from '../layouts/DashboardLayout';
import LandingPage from '../pages/Landing/LandingPage';
import LoginPage from '../pages/Login/LoginPage';
import RegisterPage from '../pages/Register/RegisterPage';
import PatientDashboard from '../pages/Patient/PatientDashboard';
import PatientAppointments from '../pages/Patient/PatientAppointments';
import PatientRecords from '../pages/Patient/PatientRecords';
import PatientProfile from '../pages/Patient/PatientProfile';
import HealthCardView from '../pages/Patient/HealthCardView';
import ProtectedRoute from './ProtectedRoute';

const PlaceholderPage = ({ title, description }) => (
  <div className="rounded-card border border-slate-200 bg-white p-8 shadow-card-soft">
    <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
    <p className="mt-2 text-sm text-slate-600">{description}</p>
  </div>
);

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<LandingPage />} />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>

        <Route element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
          <Route path="/patient/dashboard" element={<ProtectedRoute allowedRoles={['PATIENT']}><PatientDashboard /></ProtectedRoute>} />
          <Route path="/patient/health-card" element={<ProtectedRoute allowedRoles={['PATIENT']}><HealthCardView /></ProtectedRoute>} />
          <Route path="/patient/records" element={<ProtectedRoute allowedRoles={['PATIENT']}><PatientRecords /></ProtectedRoute>} />
          <Route path="/patient/appointments" element={<ProtectedRoute allowedRoles={['PATIENT']}><PatientAppointments /></ProtectedRoute>} />
          <Route path="/patient/profile" element={<ProtectedRoute allowedRoles={['PATIENT']}><PatientProfile /></ProtectedRoute>} />

          <Route path="/doctor/dashboard" element={<ProtectedRoute allowedRoles={['DOCTOR']}><PlaceholderPage title="Doctor Dashboard" description="Doctor workspace views are being wired up." /></ProtectedRoute>} />
          <Route path="/doctor/lookup" element={<ProtectedRoute allowedRoles={['DOCTOR']}><PlaceholderPage title="Health ID Lookup" description="Patient lookup functionality is being wired up." /></ProtectedRoute>} />
          <Route path="/doctor/appointments" element={<ProtectedRoute allowedRoles={['DOCTOR']}><PlaceholderPage title="Consultations Schedule" description="Doctor appointment views are being wired up." /></ProtectedRoute>} />

          <Route path="/admin/dashboard" element={<ProtectedRoute allowedRoles={['ADMIN']}><PlaceholderPage title="Admin Dashboard" description="Administrative analytics views are being wired up." /></ProtectedRoute>} />
          <Route path="/admin/users" element={<ProtectedRoute allowedRoles={['ADMIN']}><PlaceholderPage title="User Directory" description="User management views are being wired up." /></ProtectedRoute>} />
          <Route path="/admin/hospitals" element={<ProtectedRoute allowedRoles={['ADMIN']}><PlaceholderPage title="Hospital Network" description="Hospital management views are being wired up." /></ProtectedRoute>} />
          <Route path="/admin/analytics" element={<ProtectedRoute allowedRoles={['ADMIN']}><PlaceholderPage title="Healthcare Analytics" description="Analytics views are being wired up." /></ProtectedRoute>} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
