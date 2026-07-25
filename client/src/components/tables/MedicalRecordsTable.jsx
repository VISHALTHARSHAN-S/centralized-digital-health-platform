import React from 'react';
import { formatDate } from '../../utils/formatters';
import { FileText, Stethoscope, Building2, Eye } from 'lucide-react';
import Button from '../ui/Button';

const MedicalRecordsTable = ({ records = [], onViewRecord }) => {
  if (!records.length) {
    return (
      <div className="text-center py-12 bg-white rounded-card border border-slate-200 p-6">
        <FileText className="w-12 h-12 text-slate-300 mx-auto mb-3" />
        <h4 className="text-base font-bold text-slate-700">No Medical Records Found</h4>
        <p className="text-xs text-slate-500 mt-1">There are no diagnostic records matching your current filter.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-card border border-slate-200 shadow-card-soft overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/75 border-b border-slate-200 text-[11px] font-bold uppercase tracking-wider text-slate-500">
              <th className="px-6 py-3.5">Record Title & Type</th>
              <th className="px-6 py-3.5">Diagnosis</th>
              <th className="px-6 py-3.5">Attending Doctor</th>
              <th className="px-6 py-3.5">Facility / Hospital</th>
              <th className="px-6 py-3.5">Date</th>
              <th className="px-6 py-3.5 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
            {records.map((rec) => (
              <tr key={rec._id} className="hover:bg-slate-50/80 transition-colors">
                <td className="px-6 py-4">
                  <div className="font-bold text-slate-900">{rec.title}</div>
                  <span className="inline-block px-2 py-0.5 mt-1 text-[10px] font-semibold uppercase rounded bg-slate-100 text-slate-600">
                    {rec.recordType}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="font-semibold text-primary-700 flex items-center">
                    <Stethoscope className="w-3.5 h-3.5 mr-1 text-primary-500" />
                    {rec.diagnosis}
                  </div>
                </td>
                <td className="px-6 py-4 text-slate-700 font-medium">
                  {rec.doctorId?.fullName || 'Dr. Specialist'}
                </td>
                <td className="px-6 py-4 text-slate-600">
                  <div className="flex items-center">
                    <Building2 className="w-3.5 h-3.5 mr-1 text-slate-400" />
                    {rec.hospitalId?.name || 'Central Hospital'}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-xs text-slate-500">
                  {formatDate(rec.recordDate)}
                </td>
                <td className="px-6 py-4 text-right">
                  <Button
                    size="sm"
                    variant="ghost"
                    icon={Eye}
                    onClick={() => onViewRecord && onViewRecord(rec)}
                  >
                    Details
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MedicalRecordsTable;
