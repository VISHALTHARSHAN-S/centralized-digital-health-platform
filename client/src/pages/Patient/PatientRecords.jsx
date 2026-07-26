import React, { useState, useEffect } from 'react';
import { recordService } from '../../services/recordService';
import { reportService } from '../../services/reportService';
import { prescriptionService } from '../../services/prescriptionService';
import MedicalRecordsTable from '../../components/tables/MedicalRecordsTable';
import Modal from '../../components/common/Modal';
import UploadReportForm from '../../components/forms/UploadReportForm';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import { FileText, FileSpreadsheet, Pill, UploadCloud, Download, Search } from 'lucide-react';
import { formatDate, formatFileSize } from '../../utils/formatters';

const PatientRecords = () => {
  const [activeTab, setActiveTab] = useState('diagnoses'); // 'diagnoses' | 'reports' | 'prescriptions'
  const [records, setRecords] = useState([]);
  const [reports, setReports] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [search, setSearch] = useState('');

  const loadData = () => {
    setLoading(true);
    Promise.all([
      recordService.getPatientRecords(),
      reportService.getReports(),
      prescriptionService.getPrescriptions()
    ])
      .then(([recRes, repRes, rxRes]) => {
        if (recRes.data) setRecords(recRes.data);
        if (repRes.data) setReports(repRes.data);
        if (rxRes.data) setPrescriptions(rxRes.data);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-card border border-slate-200 shadow-card-soft">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">Medical History & Digital Documents</h1>
          <p className="text-xs text-slate-500 mt-0.5">Access lab reports, radiology scans, diagnoses, and prescriptions</p>
        </div>
        <Button variant="primary" icon={UploadCloud} onClick={() => setIsUploadOpen(true)}>
          Upload Medical Report
        </Button>
      </div>

      {/* Tabs Switcher */}
      <div className="flex border-b border-slate-200 space-x-6 text-sm font-bold">
        <button
          onClick={() => setActiveTab('diagnoses')}
          className={`pb-3 flex items-center space-x-2 border-b-2 transition-all ${
            activeTab === 'diagnoses' ? 'border-primary-600 text-primary-600' : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Medical Records ({records.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('reports')}
          className={`pb-3 flex items-center space-x-2 border-b-2 transition-all ${
            activeTab === 'reports' ? 'border-primary-600 text-primary-600' : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <FileSpreadsheet className="w-4 h-4" />
          <span>Lab & Scan Reports ({reports.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('prescriptions')}
          className={`pb-3 flex items-center space-x-2 border-b-2 transition-all ${
            activeTab === 'prescriptions' ? 'border-primary-600 text-primary-600' : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Pill className="w-4 h-4" />
          <span>Prescriptions History ({prescriptions.length})</span>
        </button>
      </div>

      {/* Tab 1: Diagnoses Records */}
      {activeTab === 'diagnoses' && (
        <MedicalRecordsTable records={records} />
      )}

      {/* Tab 2: Lab & Scan Reports */}
      {activeTab === 'reports' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reports.map((rep) => (
            <div key={rep._id} className="bg-white p-5 rounded-card border border-slate-200 shadow-card-soft space-y-3">
              <div className="flex items-start justify-between">
                <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600">
                  <FileSpreadsheet className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                  {rep.category}
                </span>
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-base">{rep.title}</h4>
                <p className="text-xs text-slate-500 mt-1">Uploaded: {formatDate(rep.uploadDate)} • {formatFileSize(rep.fileSize)}</p>
              </div>
              <div className="pt-3 border-t border-slate-100 flex justify-end">
                <a href={rep.fileUrl} target="_blank" rel="noopener noreferrer" download>
                  <Button size="sm" variant="secondary" icon={Download}>
                    Download
                  </Button>
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 3: Prescriptions */}
      {activeTab === 'prescriptions' && (
        <div className="space-y-4">
          {prescriptions.map((rx) => (
            <div key={rx._id} className="bg-white p-6 rounded-card border border-slate-200 shadow-card-soft space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-base font-bold text-slate-900">{rx.diagnosisSummary}</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Prescribed by: <span className="font-semibold text-slate-800">{rx.doctorId?.fullName}</span> ({rx.doctorId?.specialization})</p>
                </div>
                <span className="text-xs font-semibold text-slate-500">{formatDate(rx.issueDate)}</span>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">Prescribed Medications</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {rx.medications?.map((med, idx) => (
                    <div key={idx} className="bg-white p-3 rounded-lg border border-slate-200 text-xs">
                      <div className="font-bold text-slate-900">{med.name} <span className="text-blue-600 font-semibold">({med.dosage})</span></div>
                      <div className="text-slate-600 mt-0.5">{med.frequency} • {med.duration}</div>
                      {med.instructions && <div className="text-[11px] text-slate-400 italic mt-1">"{med.instructions}"</div>}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upload Modal */}
      <Modal isOpen={isUploadOpen} onClose={() => setIsUploadOpen(false)} title="Upload Medical Report Document">
        <UploadReportForm onSuccess={loadData} onClose={() => setIsUploadOpen(false)} />
      </Modal>
    </div>
  );
};

export default PatientRecords;
