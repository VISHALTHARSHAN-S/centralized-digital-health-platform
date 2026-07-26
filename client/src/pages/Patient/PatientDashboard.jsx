import React, { useState, useEffect } from 'react';
import { patientService } from '../../services/patientService';
import MetricCard from '../../components/cards/MetricCard';
import RecordCard from '../../components/cards/RecordCard';
import HealthCard from '../../components/cards/HealthCard';
import { CardSkeleton } from '../../components/common/LoadingSkeleton';
import { FileText, CalendarCheck, FileSpreadsheet, Pill, ShieldCheck, Plus, UserRound, Activity } from 'lucide-react';
import Button from '../../components/ui/Button';
import { Link } from 'react-router-dom';

const PatientDashboard = () => {
  const [summaryData, setSummaryData] = useState(null);
  const [statsData, setStatsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    Promise.all([
      patientService.getMedicalSummary(),
      patientService.getDashboardStats()
    ])
      .then(([summaryRes, statsRes]) => {
        if (summaryRes.data) setSummaryData(summaryRes.data);
        if (statsRes.data) setStatsData(statsRes.data);
      })
      .catch(err => {
        console.error('Failed to load patient dashboard:', err);
        setError(err.message || 'Unable to load dashboard statistics.');
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

  const { patient, stats, recentRecords = [], recentPrescriptions = [], upcomingAppointments = [] } = summaryData || {};
  const dashboardStats = statsData?.stats || {};

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-card border border-slate-200 shadow-card-soft">
        <div>
          <div className="flex items-center space-x-2 text-xs text-blue-600 font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            <span>National Citizen Health Portal</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 mt-1">Welcome back, {patient?.fullName}</h1>
          <p className="text-xs text-slate-500 font-mono mt-0.5">Health ID: <span className="font-bold text-amber-600">{patient?.healthId}</span></p>
        </div>

        <div className="flex space-x-3">
          <Link to="/patient/health-card">
            <Button variant="navy" size="sm">
              View Health Card
            </Button>
          </Link>
          <Link to="/patient/appointments">
            <Button variant="primary" size="sm" icon={Plus}>
              Book Consultation
            </Button>
          </Link>
        </div>
      </div>

      {error && (
        <div className="rounded-card border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">
          {error}
        </div>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Reports"
          value={dashboardStats?.totalReports ?? stats?.totalReports ?? 0}
          icon={FileSpreadsheet}
          color="green"
          subtitle="Medical reports on file"
        />
        <MetricCard
          title="Doctors Visited"
          value={dashboardStats?.doctorsVisited ?? 0}
          icon={UserRound}
          color="blue"
          subtitle="Unique doctors seen"
        />
        <MetricCard
          title="Active Prescriptions"
          value={dashboardStats?.activePrescriptions ?? stats?.totalPrescriptions ?? 0}
          icon={Pill}
          color="purple"
          subtitle="Current active treatments"
        />
        <MetricCard
          title="Upcoming Appointments"
          value={dashboardStats?.upcomingAppointments ?? stats?.totalAppointments ?? 0}
          icon={CalendarCheck}
          color="amber"
          subtitle="Scheduled consultations"
        />
      </div>

      {/* Main Content Split: Recent Records & Health Card Widget */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Recent Medical Timeline */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold text-slate-900">Recent Medical Diagnoses</h3>
            <Link to="/patient/records" className="text-xs font-bold text-primary-600 hover:underline">
              View All Records →
            </Link>
          </div>

          <div className="space-y-4">
            {recentRecords.length === 0 ? (
              <p className="text-xs text-slate-400 p-6 bg-white rounded-card text-center border">
                No recent medical diagnosis records found.
              </p>
            ) : (
              recentRecords.map((rec) => (
                <RecordCard key={rec._id} record={rec} />
              ))
            )}
          </div>
        </div>

        {/* Right 1 Col: Quick Health Card Widget */}
        <div className="space-y-6">
          <h3 className="text-lg font-bold text-slate-900">Digital Health ID Card</h3>
          <HealthCard patient={patient} />
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
