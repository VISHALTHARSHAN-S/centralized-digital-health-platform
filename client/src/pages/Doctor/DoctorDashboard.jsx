import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { doctorService } from '../../services/doctorService';
import MetricCard from '../../components/cards/MetricCard';
import { CardSkeleton } from '../../components/common/LoadingSkeleton';
import UploadReportForm from '../../components/forms/UploadReportForm';
import PrescriptionForm from '../../components/forms/PrescriptionForm';
import Button from '../../components/ui/Button';
import { CalendarDays, FileSpreadsheet, Pill, UserRound, AlertCircle, Search, FileText, Stethoscope, Clock3, Plus, X } from 'lucide-react';
import { formatDate, formatDateTime } from '../../utils/formatters';

const DoctorDashboard = () => {
  const [stats, setStats] = useState(null);
  const [recentPatients, setRecentPatients] = useState([]);
  const [recentReports, setRecentReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showPrescriptionModal, setShowPrescriptionModal] = useState(false);
  const [selectedPatientId, setSelectedPatientId] = useState('');

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const res = await doctorService.getDashboardStats();
        if (res.data) {
          setStats(res.data);

          const appointments = res.data?.todaysAppointments || [];
          const recentAppointmentPatients = appointments.slice(0, 5);

          if (recentAppointmentPatients.length) {
            const settledResults = await Promise.allSettled(
              recentAppointmentPatients.map((appointment) =>
                doctorService.searchPatientByHealthId(appointment.patientId?.healthId)
              )
            );

            const loadedPatients = settledResults
              .filter((result) => result.status === 'fulfilled' && result.value?.data?.patient)
              .map((result) => ({
                ...result.value.data.patient,
                reports: result.value.data.reports || []
              }));

            setRecentPatients(loadedPatients.slice(0, 5));
            setRecentReports(loadedPatients.flatMap((patient) => patient.reports).slice(0, 5));
            if (loadedPatients[0]?._id) {
              setSelectedPatientId(loadedPatients[0]._id);
            }
          } else {
            setRecentPatients([]);
            setRecentReports([]);
          }
        }
      } catch (err) {
        setError(err.message || 'Unable to load doctor dashboard data.');
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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <CardSkeleton /><CardSkeleton /><CardSkeleton /><CardSkeleton />
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

  const appointments = stats?.todaysAppointments || [];
  const selectedPatient = recentPatients.find((patient) => patient._id === selectedPatientId) || recentPatients[0];

  return (
    <div className="space-y-8">
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

      <div className="grid grid-cols-1 xl:grid-cols-[1.2fr_0.8fr] gap-8">
        <div className="space-y-6">
          <div className="rounded-card border border-slate-200 bg-white p-6 shadow-card-soft">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Today's Appointment List</h3>
                <p className="text-sm text-slate-500">Patient details and visit timing for the current day.</p>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              {appointments.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-6 text-center text-sm text-slate-500">
                  No appointments scheduled for today.
                </div>
              ) : (
                appointments.map((appointment) => (
                  <div key={appointment._id} className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 md:flex-row md:items-center md:justify-between">
                    <div>
                      <p className="font-semibold text-slate-900">{appointment.patientId?.fullName || 'Patient'}</p>
                      <div className="mt-2 flex flex-wrap gap-2 text-xs text-slate-500">
                        <span className="inline-flex items-center rounded-full bg-white px-2.5 py-1">
                          <UserRound className="mr-1.5 h-3.5 w-3.5" />
                          {appointment.patientId?.healthId || 'Health ID unavailable'}
                        </span>
                        <span className="inline-flex items-center rounded-full bg-white px-2.5 py-1">
                          <Clock3 className="mr-1.5 h-3.5 w-3.5" />
                          {appointment.appointmentDate ? formatDateTime(appointment.appointmentDate) : 'Time pending'}
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
                <h3 className="text-lg font-bold text-slate-900">Recent Patients</h3>
                <p className="text-sm text-slate-500">The latest patients connected to your care workflow.</p>
              </div>
            </div>

            <div className="mt-6 grid gap-3">
              {recentPatients.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-6 text-center text-sm text-slate-500">
                  No recent patient activity found.
                </div>
              ) : (
                recentPatients.map((patient) => (
                  <div key={patient._id} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <div>
                      <p className="font-semibold text-slate-900">{patient.fullName}</p>
                      <p className="mt-1 text-xs text-slate-500">{patient.healthId} • {patient.bloodGroup || 'Blood group pending'}</p>
                    </div>
                    <span className="text-xs font-semibold text-slate-500">Last visit</span>
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
                <p className="text-sm text-slate-500">Jump into patient lookup, report uploads, and prescription writing.</p>
              </div>
            </div>

            <div className="mt-5 flex flex-col gap-3">
              <Link to="/doctor/lookup" className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100">
                <Search className="mr-2 h-4 w-4" />
                Search Patient
              </Link>
              <button
                type="button"
                onClick={() => setShowUploadModal(true)}
                className="inline-flex items-center justify-center rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-100"
              >
                <FileText className="mr-2 h-4 w-4" />
                Upload Report
              </button>
              <button
                type="button"
                onClick={() => setShowPrescriptionModal(true)}
                className="inline-flex items-center justify-center rounded-xl border border-violet-200 bg-violet-50 px-4 py-3 text-sm font-semibold text-violet-700 transition hover:bg-violet-100"
              >
                <Pill className="mr-2 h-4 w-4" />
                Write Prescription
              </button>
            </div>
          </div>

          <div className="rounded-card border border-slate-200 bg-white p-6 shadow-card-soft">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Recent Uploaded Reports</h3>
                <p className="text-sm text-slate-500">Latest reports shared for recently seen patients.</p>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              {recentReports.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-6 text-center text-sm text-slate-500">
                  No recent reports uploaded yet.
                </div>
              ) : (
                recentReports.map((report) => (
                  <div key={report._id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="font-semibold text-slate-900">{report.title}</p>
                        <p className="mt-1 text-xs text-slate-500">{report.category || 'Medical report'}</p>
                      </div>
                      <span className="text-xs font-semibold text-slate-500">{formatDate(report.uploadDate)}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {(showUploadModal || showPrescriptionModal) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4">
          <div className="w-full max-w-2xl rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-xl font-bold text-slate-900">
                  {showUploadModal ? 'Upload Report' : 'Write Prescription'}
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  {showUploadModal ? 'Attach a report to the selected patient.' : 'Issue a prescription for the selected patient.'}
                </p>
              </div>
              <button type="button" onClick={() => showUploadModal ? setShowUploadModal(false) : setShowPrescriptionModal(false)} className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-700">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">
                Select Patient
              </label>
              <select
                value={selectedPatientId}
                onChange={(event) => setSelectedPatientId(event.target.value)}
                className="w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white"
              >
                {recentPatients.map((patient) => (
                  <option key={patient._id} value={patient._id}>
                    {patient.fullName} ({patient.healthId})
                  </option>
                ))}
              </select>
            </div>

            <div className="mt-5">
              {showUploadModal ? (
                <UploadReportForm
                  patientId={selectedPatient?._id}
                  onSuccess={() => setShowUploadModal(false)}
                  onClose={() => setShowUploadModal(false)}
                />
              ) : (
                <PrescriptionForm
                  patientId={selectedPatient?._id}
                  onSuccess={() => setShowPrescriptionModal(false)}
                  onClose={() => setShowPrescriptionModal(false)}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorDashboard;
