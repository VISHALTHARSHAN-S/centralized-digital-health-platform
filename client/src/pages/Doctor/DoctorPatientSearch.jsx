import { useState } from 'react';
import { AlertCircle, ClipboardList, FileText, Search, Stethoscope, UserRound } from 'lucide-react';
import { doctorService } from '../../services/doctorService';
import UploadReportForm from '../../components/forms/UploadReportForm';

const formatDate = (value) => {
  if (!value) return 'Not available';
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? 'Not available' : date.toLocaleDateString();
};

const DoctorPatientSearch = () => {
  const [healthId, setHealthId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);

  const fetchPatientDetails = async (normalizedHealthId) => {
    setIsLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await doctorService.searchPatientByHealthId(normalizedHealthId);
      setResult(response.data);
    } catch (err) {
      setError(err.message || 'Unable to retrieve patient details.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    const normalizedHealthId = healthId.trim();

    if (!normalizedHealthId) {
      setError('Please enter a Health ID.');
      setResult(null);
      return;
    }

    await fetchPatientDetails(normalizedHealthId);
  };

  return (
    <div className="space-y-6">
      <div className="rounded-card border border-slate-200 bg-white p-6 shadow-card-soft">
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Doctor Patient Search</h2>
            <p className="mt-1 text-sm text-slate-600">Search a patient by Health ID to review their profile, medical records, prescriptions, and reports.</p>
          </div>
        </div>

        <form onSubmit={handleSearch} className="mt-6 flex flex-col gap-3 md:flex-row">
          <label className="flex-1">
            <span className="sr-only">Health ID</span>
            <input
              type="text"
              value={healthId}
              onChange={(event) => setHealthId(event.target.value)}
              placeholder="Enter Health ID"
              className="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white"
            />
          </label>
          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
          >
            <Search className="mr-2 h-4 w-4" />
            {isLoading ? 'Searching…' : 'Search Patient'}
          </button>
        </form>
      </div>

      {isLoading && (
        <div className="rounded-card border border-slate-200 bg-white p-8 text-center shadow-card-soft">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-blue-600">
            <Search className="h-6 w-6 animate-pulse" />
          </div>
          <p className="mt-4 text-sm font-medium text-slate-700">Searching patient records...</p>
        </div>
      )}

      {error && !isLoading && (
        <div className="rounded-card border border-red-200 bg-red-50 p-4 text-sm text-red-700 shadow-card-soft">
          <div className="flex items-start gap-2">
            <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        </div>
      )}

      {result && !isLoading && (
        <div className="space-y-6">
          <div className="rounded-card border border-slate-200 bg-white p-6 shadow-card-soft">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <UserRound className="h-5 w-5 text-blue-600" />
                  <h3 className="text-xl font-bold text-slate-900">Patient Profile</h3>
                </div>
                <p className="mt-2 text-sm text-slate-600">{result.patient?.fullName}</p>
              </div>
              <div className="rounded-lg bg-slate-100 px-3 py-2 text-sm font-mono font-semibold text-slate-700">
                {result.patient?.healthId}
              </div>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs uppercase tracking-wide text-slate-500">Gender</p>
                <p className="mt-1 font-semibold text-slate-900">{result.patient?.gender || 'Not available'}</p>
              </div>
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs uppercase tracking-wide text-slate-500">Blood Group</p>
                <p className="mt-1 font-semibold text-slate-900">{result.patient?.bloodGroup || 'Not available'}</p>
              </div>
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs uppercase tracking-wide text-slate-500">Contact</p>
                <p className="mt-1 font-semibold text-slate-900">{result.patient?.contactNumber || 'Not available'}</p>
              </div>
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs uppercase tracking-wide text-slate-500">Date of Birth</p>
                <p className="mt-1 font-semibold text-slate-900">{formatDate(result.patient?.dateOfBirth)}</p>
              </div>
            </div>

            {(result.patient?.address || result.patient?.emergencyContact) && (
              <div className="mt-6 grid gap-4 lg:grid-cols-2">
                {result.patient?.address && (
                  <div className="rounded-lg border border-slate-200 p-4">
                    <p className="text-sm font-semibold text-slate-900">Address</p>
                    <p className="mt-2 text-sm text-slate-600">
                      {result.patient.address.street || ''}
                      {result.patient.address.street && result.patient.address.city ? ', ' : ''}
                      {result.patient.address.city || ''}
                      {result.patient.address.city && result.patient.address.state ? ', ' : ''}
                      {result.patient.address.state || ''}
                    </p>
                  </div>
                )}
                {result.patient?.emergencyContact && (
                  <div className="rounded-lg border border-slate-200 p-4">
                    <p className="text-sm font-semibold text-slate-900">Emergency Contact</p>
                    <p className="mt-2 text-sm text-slate-600">
                      {result.patient.emergencyContact.name || 'Not available'}
                      {result.patient.emergencyContact.phone ? ` • ${result.patient.emergencyContact.phone}` : ''}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="rounded-card border border-slate-200 bg-white p-6 shadow-card-soft">
            <div className="flex items-center gap-2">
              <ClipboardList className="h-5 w-5 text-blue-600" />
              <h3 className="text-xl font-bold text-slate-900">Upload Doctor Report</h3>
            </div>
            <p className="mt-2 text-sm text-slate-600">Attach a PDF, JPG, or PNG report for the selected patient.</p>
            <div className="mt-4">
              <UploadReportForm
                patientId={result.patient?._id}
                onSuccess={() => fetchPatientDetails(healthId.trim())}
                onClose={() => {}}
              />
            </div>
          </div>

          <div className="rounded-card border border-slate-200 bg-white p-6 shadow-card-soft">
            <div className="flex items-center gap-2">
              <ClipboardList className="h-5 w-5 text-blue-600" />
              <h3 className="text-xl font-bold text-slate-900">Medical Records</h3>
            </div>
            {result.records?.length ? (
              <div className="mt-4 space-y-3">
                {result.records.map((record) => (
                  <div key={record._id} className="rounded-lg border border-slate-200 p-4">
                    <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                      <div>
                        <p className="font-semibold text-slate-900">{record.title}</p>
                        <p className="mt-1 text-sm text-slate-600">{record.diagnosis}</p>
                      </div>
                      <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                        {record.recordType}
                      </span>
                    </div>
                    <p className="mt-3 text-sm text-slate-500">Recorded on {formatDate(record.recordDate)}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="mt-4 text-sm text-slate-500">No medical records found.</p>
            )}
          </div>

          <div className="rounded-card border border-slate-200 bg-white p-6 shadow-card-soft">
            <div className="flex items-center gap-2">
              <Stethoscope className="h-5 w-5 text-blue-600" />
              <h3 className="text-xl font-bold text-slate-900">Prescriptions</h3>
            </div>
            {result.prescriptions?.length ? (
              <div className="mt-4 space-y-3">
                {result.prescriptions.map((prescription) => (
                  <div key={prescription._id} className="rounded-lg border border-slate-200 p-4">
                    <p className="font-semibold text-slate-900">{prescription.diagnosisSummary}</p>
                    <p className="mt-2 text-sm text-slate-600">
                      {prescription.medications?.map((medication) => `${medication.name} (${medication.dosage})`).join(', ')}
                    </p>
                    <p className="mt-3 text-sm text-slate-500">Issued on {formatDate(prescription.issueDate)}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="mt-4 text-sm text-slate-500">No prescriptions found.</p>
            )}
          </div>

          <div className="rounded-card border border-slate-200 bg-white p-6 shadow-card-soft">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-blue-600" />
              <h3 className="text-xl font-bold text-slate-900">Reports</h3>
            </div>
            {result.reports?.length ? (
              <div className="mt-4 space-y-3">
                {result.reports.map((report) => (
                  <div key={report._id} className="rounded-lg border border-slate-200 p-4">
                    <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                      <div>
                        <p className="font-semibold text-slate-900">{report.title}</p>
                        <p className="mt-1 text-sm text-slate-600">{report.category}</p>
                      </div>
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                        {formatDate(report.uploadDate)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="mt-4 text-sm text-slate-500">No reports found.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorPatientSearch;
