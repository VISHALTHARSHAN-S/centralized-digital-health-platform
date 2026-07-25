import React from 'react';

const StatusBadge = ({ status }) => {
  const getBadgeStyle = (statusStr) => {
    const s = String(statusStr).toUpperCase();
    switch (s) {
      case 'ACTIVE':
      case 'COMPLETED':
      case 'SCHEDULED':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'PENDING':
      case 'IN PROGRESS':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'SUSPENDED':
      case 'CANCELLED':
      case 'INACTIVE':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${getBadgeStyle(status)}`}>
      <span className="w-1.5 h-1.5 mr-1.5 rounded-full fill-current bg-current"></span>
      {status}
    </span>
  );
};

export default StatusBadge;
