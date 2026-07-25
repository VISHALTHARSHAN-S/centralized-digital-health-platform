import React from 'react';
import useNotifications from '../../hooks/useNotifications';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';

const ToastContainer = () => {
  const { toasts, removeToast } = useNotifications();

  if (!toasts.length) return null;

  return (
    <div className="fixed top-5 right-5 z-50 flex flex-col space-y-3 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        let bg = 'bg-white border-blue-200 text-slate-800';
        let Icon = Info;
        let iconColor = 'text-blue-600';

        if (toast.type === 'success') {
          bg = 'bg-white border-emerald-200 text-slate-800';
          Icon = CheckCircle2;
          iconColor = 'text-emerald-600';
        } else if (toast.type === 'error') {
          bg = 'bg-white border-rose-200 text-slate-800';
          Icon = AlertCircle;
          iconColor = 'text-rose-600';
        } else if (toast.type === 'warning') {
          bg = 'bg-white border-amber-200 text-slate-800';
          Icon = AlertTriangle;
          iconColor = 'text-amber-600';
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start p-4 rounded-card border shadow-lg ${bg} transition-all duration-300 transform translate-y-0`}
          >
            <Icon className={`w-5 h-5 mr-3 shrink-0 mt-0.5 ${iconColor}`} />
            <div className="flex-1 text-sm font-medium pr-2">{toast.message}</div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-slate-600 p-0.5 rounded"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default ToastContainer;
