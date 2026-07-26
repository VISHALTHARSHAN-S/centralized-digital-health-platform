import React, { useState, useEffect } from 'react';
import { patientService } from '../../services/patientService';
import { reportService } from '../../services/reportService';
import MetricCard from '../../components/cards/MetricCard';
import RecordCard from '../../components/cards/RecordCard';
import HealthCard from '../../components/cards/HealthCard';
import { CardSkeleton } from '../../components/common/LoadingSkeleton';
import { FileText, CalendarCheck, FileSpreadsheet, Pill, ShieldCheck, Plus, UserRound, Activity, Stethoscope, Clock3, HeartPulse, Phone, AlertCircle, CalendarDays } from 'lucide-react';
import Button from '../../components/ui/Button';
import { Link } from 'react-router-dom';
import { formatDate, formatDateTime } from '../../utils/formatters';

const PatientDashboard = () => {
  const [summaryData, setSummaryData] = useState(null);
  const [statsData, setStatsData] = useState(null);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    Promise.all([
      patientService.getMedicalSummary(),
      patientService.getDashboardStats(),
      reportService.getReports()
    ])
      .then(([summaryRes, statsRes, reportsRes]) => {
        if (summaryRes.data) setSummaryData(summaryRes.data);
        if (statsRes.data) setStatsData(statsRes.data);

        const reportList = Array.isArray(reportsRes.data)
          ? reportsRes.data
          : reportsRes.data?.reports || [];
        setReports(reportList);
      })
      .catch(err => {
        console.error('Failed to load patient dashboard:', err);
        setError(err.message || 'Unable to load dashboard data.');
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="rounded-card border border-slate-200 bg-white p-6 shadow-card-soft">
          <div className="h-4 w-32 rounded bg-slate-200 animate-pulse" />
          <div className="mt-3 h-8 w-72 rounded bg-slate-200 animate-pulse" />
          <div className="mt-2 h-4 w-48 rounded bg-slate-100 animate-pulse" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <CardSkeleton /><CardSkeleton /><CardSkeleton /><CardSkeleton />
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-[1.4fr_0.8fr] gap-8">
          <div className="space-y-4">
            <div className="h-10 w-48 rounded bg-slate-200 animate-pulse" />
            <div className="h-28 rounded-card border border-slate-200 bg-white animate-pulse" />
            <div className="h-28 rounded-card border border-slate-200 bg-white animate-pulse" />
          </div>
          <div className="space-y-4">
            <div className="h-10 w-40 rounded bg-slate-200 animate-pulse" />
            <div className="h-64 rounded-card border border-slate-200 bg-white animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  const { patient, stats, recentRecords = [], recentPrescriptions = [], upcomingAppointments = [] } = summaryData || {};
  const dashboardStats = statsData?.stats || {};
  const latestReport = reports[0];
  const latestPrescription = recentPrescriptions[0];
  const latestConsultation = recentRecords[0];
  const allergies = (patient?.allergies || []).filter(Boolean);
  const existingDiseases = (patient?.medicalHistory || []).filter(Boolean);
  const emergencyContact = patient?.emergencyContact;

  const activityItems = [
    {
      key: 'report',
      title: latestReport?.title || 'No report uploaded yet',
      subtitle: latestReport?.category || 'Latest uploaded report',
      date: latestReport?.uploadDate,
      icon: FileText,
      iconClass: 'bg-emerald-50 text-emerald-600 border-emerald-100'
    },
    {
      key: 'prescription',
      title: latestPrescription?.diagnosisSummary || 'No prescription issued yet',
      subtitle: latestPrescription?.medications?.[0]?.name || 'Latest prescription activity',
      date: latestPrescription?.issueDate,
      icon: Pill,
      iconClass: 'bg-violet-50 text-violet-600 border-violet-100'
    },
    {
      key: 'consultation',
      title: latestConsultation?.title || 'No recent consultation recorded',
      subtitle: latestConsultation?.diagnosis || 'Latest doctor consultation',
      date: latestConsultation?.recordDate,
      icon: Stethoscope,
      iconClass: 'bg-amber-50 text-amber-600 border-amber-100'
    }
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-card border border-slate-200 shadow-card-soft">
        <div>
          <div className="flex items-center space-x-2 text-xs text-blue-600 font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            <span>National Citizen Health Portal</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 mt-1">Welcome back, {patient?.fullName}</h1>
          <p className="text-xs text-slate-500 font-mono mt-0.5">Health ID: <span className="font-bold text-amber-600">{patient?.healthId}</span></p>
        </div>

        <div className="flex flex-wrap gap-3">
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

      <div className="grid grid-cols-1 xl:grid-cols-[1.4fr_0.8fr] gap-8">
        <div className="space-y-6">
          <div className="rounded-card border border-slate-200 bg-white p-6 shadow-card-soft">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Recent Medical Activity</h3>
                <p className="text-sm text-slate-500">Latest reports, prescriptions, and consultations at a glance.</p>
              </div>
              <Link to="/patient/records" className="text-xs font-bold text-primary-600 hover:underline">
                View All Records →
              </Link>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {activityItems.map(({ key, title, subtitle, date, icon: Icon, iconClass }) => (
                <div key={key} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div className={`inline-flex rounded-xl border p-2 ${iconClass}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <p className="mt-3 text-sm font-semibold text-slate-900">{title}</p>
                  <p className="mt-1 text-xs text-slate-500">{subtitle}</p>
                  <div className="mt-3 flex items-center text-xs font-medium text-slate-500">
                    <Clock3 className="mr-1.5 h-3.5 w-3.5" />
                    {date ? formatDateTime(date) : 'No activity recorded'}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-card border border-slate-200 bg-white p-6 shadow-card-soft">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Upcoming Appointments</h3>
                <p className="text-sm text-slate-500">Your next consultations and their status.</p>
              </div>
              <Link to="/patient/appointments" className="text-xs font-bold text-primary-600 hover:underline">
                Manage Appointments →
              </Link>
            </div>

            <div className="mt-6 space-y-4">
              {upcomingAppointments.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-6 text-center text-sm text-slate-500">
                  No upcoming appointments scheduled.
                </div>
              ) : (
                upcomingAppointments.map((appointment) => (
                  <div key={appointment._id} className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 md:flex-row md:items-center md:justify-between">
                    <div>
                      <p className="font-semibold text-slate-900">{appointment.doctorId?.fullName || 'Doctor'}</p>
                      <div className="mt-2 flex flex-wrap gap-2 text-xs text-slate-500">
                        <span className="inline-flex items-center rounded-full bg-white px-2.5 py-1">
                          <CalendarDays className="mr-1.5 h-3.5 w-3.5" />
                          {formatDate(appointment.appointmentDate)}
                        </span>
                        <span className="inline-flex items-center rounded-full bg-white px-2.5 py-1">
                          <Clock3 className="mr-1.5 h-3.5 w-3.5" />
                          {new Date(appointment.appointmentDate).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    </div>
                    <span className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                      {appointment.status || 'Scheduled'}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="rounded-card border border-slate-200 bg-white p-6 shadow-card-soft">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Recent Medical Diagnoses</h3>
                <p className="text-sm text-slate-500">Your latest consultation notes and care history.</p>
              </div>
              <Link to="/patient/records" className="text-xs font-bold text-primary-600 hover:underline">
                View All Records →
              </Link>
            </div>

            <div className="mt-6 space-y-4">
              {recentRecords.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-6 text-center text-sm text-slate-500">
                  No recent medical diagnosis records found.
                </div>
              ) : (
                recentRecords.map((rec) => (
                  <RecordCard key={rec._id} record={rec} />
                ))
              )}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-card border border-slate-200 bg-white p-6 shadow-card-soft">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-rose-50 p-2 text-rose-600">
                <HeartPulse className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Health Summary</h3>
                <p className="text-sm text-slate-500">Core health details you can share quickly.</p>
              </div>
            </div>

            <div className="mt-5 space-y-3 text-sm">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Health ID</p>
                <p className="mt-1 font-semibold text-slate-900">{patient?.healthId || 'N/A'}</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Blood Group</p>
                <p className="mt-1 font-semibold text-slate-900">{patient?.bloodGroup || 'N/A'}</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Allergies</p>
                <p className="mt-1 font-semibold text-slate-900">{allergies.length ? allergies.join(', ') : 'No known allergies recorded'}</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Existing Diseases</p>
                <p className="mt-1 font-semibold text-slate-900">{existingDiseases.length ? existingDiseases.join(', ') : 'No known medical history recorded'}</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Emergency Contact</p>
                <p className="mt-1 font-semibold text-slate-900">
                  {emergencyContact ? `${emergencyContact.name || 'Contact'} • ${emergencyContact.phone || patient?.contactNumber || 'N/A'}` : 'No emergency contact provided'}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-card border border-slate-200 bg-white p-6 shadow-card-soft">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-blue-50 p-2 text-blue-600">
                <Activity className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Digital Health ID Card</h3>
                <p className="text-sm text-slate-500">Quick access to your verified health profile.</p>
              </div>
            </div>
            <div className="mt-4">
              <HealthCard patient={patient} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
