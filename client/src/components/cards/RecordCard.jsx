import React from 'react';
import { FileText, Calendar, UserCheck, Building2, Stethoscope } from 'lucide-react';
import { formatDate } from '../../utils/formatters';

const RecordCard = ({ record, onViewDetails }) => {
  return (
    <div className="bg-white p-5 rounded-card border border-slate-200 shadow-card-soft hover:shadow-card-hover transition-all">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600 border border-blue-100">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <span className="inline-block px-2 py-0.5 text-[10px] font-bold uppercase rounded bg-slate-100 text-slate-700 mb-1">
              {record.recordType}
            </span>
            <h4 className="text-base font-bold text-slate-900">{record.title}</h4>
          </div>
        </div>
        <span className="text-xs font-medium text-slate-500 flex items-center">
          <Calendar className="w-3.5 h-3.5 mr-1" />
          {formatDate(record.recordDate)}
        </span>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-slate-600">
        <div className="flex items-center">
          <Stethoscope className="w-4 h-4 mr-1.5 text-blue-600" />
          <span className="font-semibold text-slate-700">Diagnosis:</span>
          <span className="ml-1 text-slate-900 truncate">{record.diagnosis}</span>
        </div>
        <div className="flex items-center">
          <UserCheck className="w-4 h-4 mr-1.5 text-emerald-600" />
          <span className="font-semibold text-slate-700">Attending Doctor:</span>
          <span className="ml-1 text-slate-900">{record.doctorId?.fullName || 'Dr. Specialist'}</span>
        </div>
        <div className="flex items-center md:col-span-2">
          <Building2 className="w-4 h-4 mr-1.5 text-slate-400" />
          <span className="font-semibold text-slate-700">Hospital:</span>
          <span className="ml-1 text-slate-900">{record.hospitalId?.name || 'Central Hospital'}</span>
        </div>
      </div>

      {record.clinicalNotes && (
        <div className="mt-3 p-3 bg-slate-50 rounded-lg text-xs text-slate-600 italic border border-slate-100">
          "{record.clinicalNotes}"
        </div>
      )}
    </div>
  );
};

export default RecordCard;
