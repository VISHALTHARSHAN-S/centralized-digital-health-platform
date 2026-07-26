import React, { useEffect, useState } from 'react';
import { adminService } from '../../services/adminService';
import MetricCard from '../../components/cards/MetricCard';
import { CardSkeleton } from '../../components/common/LoadingSkeleton';
import { Users, UserRound, Building2, FileSpreadsheet, CalendarDays, ShieldCheck, AlertCircle } from 'lucide-react';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    adminService.getDashboardStats()
      .then((res) => {
        if (res.data) setStats(res.data);
      })
      .catch((err) => {
        setError(err.message || 'Unable to load administrator dashboard statistics.');
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
          <CardSkeleton /><CardSkeleton /><CardSkeleton /><CardSkeleton /><CardSkeleton /><CardSkeleton />
        </div>
      </div>
    );
  }

  const dashboardStats = stats?.stats || {};

  return (
    <div className="space-y-6">
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
    </div>
  );
};

export default AdminDashboard;
