import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { ShieldCheck, Activity } from 'lucide-react';
import ToastContainer from '../components/common/Toast';

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 p-4 relative overflow-hidden">
      <ToastContainer />

      {/* Decorative background blur glow */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl"></div>

      <div className="w-full max-w-md bg-white rounded-card shadow-2xl border border-slate-200 p-8 relative z-10">
        <div className="text-center mb-6">
          <Link to="/" className="inline-flex items-center space-x-2">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-lg">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <span className="text-xl font-extrabold text-slate-900 tracking-tight">CHMS PORTAL</span>
          </Link>
          <p className="text-xs text-slate-500 font-medium mt-1">National Digital Health Portal</p>
        </div>

        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
