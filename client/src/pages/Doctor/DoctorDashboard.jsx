import React, { useEffect, useState } from 'react';
import { doctorService } from '../../services/doctorService';
import MetricCard from '../../components/cards/MetricCard';
import { CardSkeleton } from '../../components/common/LoadingSkeleton';
import { CalendarDays, FileSpreadsheet, Pill, UserRound, AlertCircle } from 'lucide-react';

const DoctorDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    doctorService.getDashboardStats()
      .then((res) => {
        if (res.data) setStats(res.data);
      })
      .catch((err) => {
        setError(err.message || 'Unable to load doctor dashboard statistics.');
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <CardSkeleton /><CardSkeleton /><CardSkeleton /><CardSkeleton />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="rounded-card border border-slate-200 bg-white p-6 shadow-card-soft">
        <h2 className="text-2xl font-bold text-slate-900">Doctor Dashboard</h2>
        <p className="mt-1 text-sm text-slate-600">Monitor consultations, reports, and prescriptions at a glance.</p>
      </div>

      {error && (
        <div className="rounded-card border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700 flex items-start gap-2">
          <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard title="Today's Patients" value={stats?.todaysPatients ?? 0} icon={UserRound} color="blue" subtitle="Patients scheduled today" />
        <MetricCard title="Today's Appointments" value={stats?.todaysAppointmentsCount ?? 0} icon={CalendarDays} color="green" subtitle="Consultations today" />
        <MetricCard title="Reports Uploaded" value={stats?.totalReportsUploaded ?? 0} icon={FileSpreadsheet} color="purple" subtitle="Reports attached this month" />
        <MetricCard title="Prescriptions Written" value={stats?.totalPrescriptionsIssued ?? 0} icon={Pill} color="amber" subtitle="Issued prescriptions" />
      </div>
    </div>
  );
};

export default DoctorDashboard;
