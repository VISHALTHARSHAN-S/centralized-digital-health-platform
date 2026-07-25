import React from 'react';
import StatusBadge from '../common/StatusBadge';
import { formatDate } from '../../utils/formatters';
import Button from '../ui/Button';
import { Calendar, User, Clock, CheckCircle, XCircle } from 'lucide-react';

const AppointmentTable = ({ appointments = [], role = 'PATIENT', onUpdateStatus }) => {
  if (!appointments.length) {
    return (
      <div className="text-center py-12 bg-white rounded-card border border-slate-200 p-6">
        <Calendar className="w-12 h-12 text-slate-300 mx-auto mb-3" />
        <h4 className="text-base font-bold text-slate-700">No Appointments Scheduled</h4>
        <p className="text-xs text-slate-500 mt-1">There are no appointment records found matching your profile.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-card border border-slate-200 shadow-card-soft overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/75 border-b border-slate-200 text-[11px] font-bold uppercase tracking-wider text-slate-500">
              <th className="px-6 py-3.5">Date & Time Slot</th>
              <th className="px-6 py-3.5">{role === 'DOCTOR' ? 'Patient' : 'Doctor / Specialist'}</th>
              <th className="px-6 py-3.5">Hospital / Facility</th>
              <th className="px-6 py-3.5">Reason for Visit</th>
              <th className="px-6 py-3.5">Status</th>
              {role === 'DOCTOR' && <th className="px-6 py-3.5 text-right">Actions</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
            {appointments.map((apt) => (
              <tr key={apt._id} className="hover:bg-slate-50/80 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-semibold text-slate-900">{formatDate(apt.appointmentDate)}</div>
                  <div className="text-xs text-slate-500 flex items-center mt-0.5">
                    <Clock className="w-3 h-3 mr-1" />
                    {apt.timeSlot}
                  </div>
                </td>
                <td className="px-6 py-4">
                  {role === 'DOCTOR' ? (
                    <div>
                      <div className="font-bold text-slate-900">{apt.patientId?.fullName || 'Patient'}</div>
                      <div className="text-xs text-amber-600 font-mono font-semibold">{apt.patientId?.healthId}</div>
                    </div>
                  ) : (
                    <div>
                      <div className="font-bold text-slate-900">{apt.doctorId?.fullName || 'Dr. Specialist'}</div>
                      <div className="text-xs text-slate-500">{apt.doctorId?.specialization}</div>
                    </div>
                  )}
                </td>
                <td className="px-6 py-4">
                  <div className="font-medium text-slate-800">{apt.hospitalId?.name || 'Central Hospital'}</div>
                  <div className="text-xs text-slate-400">{apt.hospitalId?.city || 'Delhi'}</div>
                </td>
                <td className="px-6 py-4 text-slate-600 max-w-xs truncate">
                  {apt.reasonForVisit}
                </td>
                <td className="px-6 py-4">
                  <StatusBadge status={apt.status} />
                </td>
                {role === 'DOCTOR' && (
                  <td className="px-6 py-4 text-right space-x-2">
                    {apt.status === 'Scheduled' && (
                      <>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-emerald-600 hover:bg-emerald-50"
                          onClick={() => onUpdateStatus(apt._id, 'Completed')}
                        >
                          <CheckCircle className="w-4 h-4 mr-1" /> Complete
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-rose-600 hover:bg-rose-50"
                          onClick={() => onUpdateStatus(apt._id, 'Cancelled')}
                        >
                          <XCircle className="w-4 h-4 mr-1" /> Cancel
                        </Button>
                      </>
                    )}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AppointmentTable;
