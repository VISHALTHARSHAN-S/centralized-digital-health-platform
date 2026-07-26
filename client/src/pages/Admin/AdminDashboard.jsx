import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { adminService } from '../../services/adminService';
import MetricCard from '../../components/cards/MetricCard';
import { CardSkeleton } from '../../components/common/LoadingSkeleton';
import { Users, UserRound, Building2, FileSpreadsheet, CalendarDays, ShieldCheck, AlertCircle, ArrowRight, Stethoscope, Hospital, FileText, UserCheck, Activity, BarChart3 } from 'lucide-react';
import { formatDate, formatDateTime } from '../../utils/formatters';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [hospitals, setHospitals] = useState([]);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const [statsRes, usersRes, doctorsRes, hospitalsRes, reportsRes] = await Promise.all([
          adminService.getDashboardStats(),
          adminService.getUsers(),
          adminService.getDoctors(),
          adminService.getHospitals(),
          adminService.getReports()
        ]);

        if (statsRes.data) setStats(statsRes.data);
        if (usersRes.data) setUsers(Array.isArray(usersRes.data) ? usersRes.data : usersRes.data?.users || []);
        if (doctorsRes.data) setDoctors(Array.isArray(doctorsRes.data) ? doctorsRes.data : doctorsRes.data?.doctors || []);
        if (hospitalsRes.data) setHospitals(Array.isArray(hospitalsRes.data) ? hospitalsRes.data : hospitalsRes.data?.hospitals || []);
        if (reportsRes.data) setReports(Array.isArray(reportsRes.data) ? reportsRes.data : reportsRes.data?.reports || []);
      } catch (err) {
        setError(err.message || 'Unable to load administrator dashboard data.');
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="rounded-card border border-slate-200 bg-white p-6 shadow-card-soft">
          <div className="h-4 w-32 rounded bg-slate-200 animate-pulse" />
          <div className="mt-3 h-8 w-72 rounded bg-slate-200 animate-pulse" />
          <div className="mt-2 h-4 w-56 rounded bg-slate-100 animate-pulse" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
          <CardSkeleton /><CardSkeleton /><CardSkeleton /><CardSkeleton /><CardSkeleton /><CardSkeleton />
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-[1.2fr_0.8fr] gap-8">
          <div className="space-y-4">
            <div className="h-10 w-40 rounded bg-slate-200 animate-pulse" />
            <div className="h-24 rounded-card border border-slate-200 bg-white animate-pulse" />
            <div className="h-24 rounded-card border border-slate-200 bg-white animate-pulse" />
          </div>
          <div className="space-y-4">
            <div className="h-10 w-40 rounded bg-slate-200 animate-pulse" />
            <div className="h-48 rounded-card border border-slate-200 bg-white animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  const dashboardStats = stats?.stats || {};
  const recentUsers = users.slice(0, 5);
  const recentDoctors = doctors.slice(0, 5).sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
  const recentHospitals = hospitals.slice(0, 5).sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
  const recentReports = reports.slice(0, 5).sort((a, b) => new Date(b.uploadDate || 0) - new Date(a.uploadDate || 0));

  const quickActions = [
    { label: 'Manage Users', to: '/admin/users', icon: Users, color: 'bg-blue-50 text-blue-600 border-blue-100' },
    { label: 'Verify Doctors', to: '/admin/users', icon: UserCheck, color: 'bg-emerald-50 text-emerald-600 border-emerald-100' },
    { label: 'Manage Hospitals', to: '/admin/hospitals', icon: Hospital, color: 'bg-violet-50 text-violet-600 border-violet-100' },
    { label: 'View Analytics', to: '/admin/analytics', icon: BarChart3, color: 'bg-amber-50 text-amber-600 border-amber-100' },
    { label: 'Generate Reports', to: '/admin/analytics', icon: FileText, color: 'bg-rose-50 text-rose-600 border-rose-100' }
  ];

  return (
    <div className="space-y-8">
      <div className="rounded-card border border-slate-200 bg-white p-6 shadow-card-soft">
        <h2 className="text-2xl font-bold text-slate-900">Administrator Dashboard</h2>
        <p className="mt-1 text-sm text-slate-600">Track platform-wide healthcare operations and participation.</p>
      </div>

      {error && (
        <div className="rounded-card border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700 flex items-start gap-2">
          <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        <MetricCard title="Total Patients" value={dashboardStats.totalPatients ?? 0} icon={Users} color="blue" subtitle="Registered patients" />
        <MetricCard title="Total Doctors" value={dashboardStats.totalDoctors ?? 0} icon={UserRound} color="green" subtitle="Active doctors" />
        <MetricCard title="Total Hospitals" value={dashboardStats.totalHospitals ?? 0} icon={Building2} color="purple" subtitle="Partner hospitals" />
        <MetricCard title="Total Reports" value={dashboardStats.totalReports ?? 0} icon={FileSpreadsheet} color="amber" subtitle="Patient reports stored" />
        <MetricCard title="Total Appointments" value={dashboardStats.totalAppointments ?? 0} icon={CalendarDays} color="rose" subtitle="Appointments recorded" />
        <MetricCard title="Total Users" value={dashboardStats.totalUsers ?? 0} icon={ShieldCheck} color="blue" subtitle="All registered accounts" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1.2fr_0.8fr] gap-8">
        <div className="space-y-6">
          <div className="rounded-card border border-slate-200 bg-white p-6 shadow-card-soft">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Recent User Registrations</h3>
                <p className="text-sm text-slate-500">Latest account sign-ups and their current status.</p>
              </div>
              <Link to="/admin/users" className="text-xs font-bold text-primary-600 hover:underline">View All →</Link>
            </div>

            <div className="mt-6 space-y-3">
              {recentUsers.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-6 text-center text-sm text-slate-500">No recent registrations found.</div>
              ) : (
                recentUsers.map((user) => (
                  <div key={user._id} className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:-translate-y-0.5 hover:shadow-sm md:flex-row md:items-center md:justify-between">
                    <div>
                      <p className="font-semibold text-slate-900">{user.fullName || user.email}</p>
                      <div className="mt-2 flex flex-wrap gap-2 text-xs text-slate-500">
                        <span className="rounded-full bg-white px-2.5 py-1">{user.role}</span>
                        <span className="rounded-full bg-white px-2.5 py-1">{formatDate(user.createdAt)}</span>
                      </div>
                    </div>
                    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${user.status === 'ACTIVE' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>
                      {user.status || 'ACTIVE'}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="rounded-card border border-slate-200 bg-white p-6 shadow-card-soft">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Recent Doctors</h3>
                <p className="text-sm text-slate-500">Newly onboarded specialists and their verification state.</p>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              {recentDoctors.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-6 text-center text-sm text-slate-500">No recent doctors registered.</div>
              ) : (
                recentDoctors.map((doctor) => (
                  <div key={doctor._id} className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:-translate-y-0.5 hover:shadow-sm md:flex-row md:items-center md:justify-between">
                    <div>
                      <p className="font-semibold text-slate-900">{doctor.fullName}</p>
                      <div className="mt-2 flex flex-wrap gap-2 text-xs text-slate-500">
                        <span className="rounded-full bg-white px-2.5 py-1">{doctor.specialization || 'Specialization pending'}</span>
                        <span className="rounded-full bg-white px-2.5 py-1">{doctor.hospitalId?.name || 'Hospital pending'}</span>
                      </div>
                    </div>
                    <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">Pending Review</span>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="rounded-card border border-slate-200 bg-white p-6 shadow-card-soft">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Recent Hospitals</h3>
                <p className="text-sm text-slate-500">Newly added healthcare facilities and their operational status.</p>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              {recentHospitals.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-6 text-center text-sm text-slate-500">No recent hospitals available.</div>
              ) : (
                recentHospitals.map((hospital) => (
                  <div key={hospital._id} className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:-translate-y-0.5 hover:shadow-sm md:flex-row md:items-center md:justify-between">
                    <div>
                      <p className="font-semibold text-slate-900">{hospital.name}</p>
                      <div className="mt-2 flex flex-wrap gap-2 text-xs text-slate-500">
                        <span className="rounded-full bg-white px-2.5 py-1">{hospital.city}, {hospital.state}</span>
                        <span className="rounded-full bg-white px-2.5 py-1">{hospital.address}</span>
                      </div>
                    </div>
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${hospital.status === 'ACTIVE' ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-700'}`}>
                      {hospital.status || 'ACTIVE'}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-card border border-slate-200 bg-white p-6 shadow-card-soft">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Quick Actions</h3>
                <p className="text-sm text-slate-500">Move quickly across user, doctor, hospital, and analytics workflows.</p>
              </div>
            </div>

            <div className="mt-5 grid gap-3">
              {quickActions.map(({ label, to, icon: Icon, color }) => (
                <Link key={label} to={to} className={`flex items-center justify-between rounded-2xl border p-4 transition hover:-translate-y-0.5 hover:shadow-sm ${color}`}>
                  <span className="flex items-center gap-3 font-semibold">
                    <span className="rounded-xl bg-white/70 p-2">
                      <Icon className="h-4 w-4" />
                    </span>
                    {label}
                  </span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>

          <div className="rounded-card border border-slate-200 bg-white p-6 shadow-card-soft">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Recent Medical Reports</h3>
                <p className="text-sm text-slate-500">Latest uploaded reports across the platform.</p>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              {recentReports.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-6 text-center text-sm text-slate-500">No recent medical reports available.</div>
              ) : (
                recentReports.map((report) => (
                  <div key={report._id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:-translate-y-0.5 hover:shadow-sm">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-semibold text-slate-900">{report.title || 'Medical Report'}</p>
                        <div className="mt-2 flex flex-wrap gap-2 text-xs text-slate-500">
                          <span className="rounded-full bg-white px-2.5 py-1">{report.patientId?.fullName || 'Patient pending'}</span>
                          <span className="rounded-full bg-white px-2.5 py-1">{report.doctorId?.fullName || 'Doctor pending'}</span>
                        </div>
                      </div>
                      <span className="text-xs font-semibold text-slate-500">{formatDateTime(report.uploadDate)}</span>
                    </div>
                    <p className="mt-3 text-sm text-slate-600">{report.category || 'Uncategorized report'}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
