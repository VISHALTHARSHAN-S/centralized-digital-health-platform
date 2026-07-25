import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, CreditCard, Activity, FileSpreadsheet, Lock, Users, Building2, ArrowRight } from 'lucide-react';
import Button from '../../components/ui/Button';

const LandingPage = () => {
  return (
    <div className="space-y-16 py-8">
      {/* Hero Section */}
      <section className="relative px-6 lg:px-12 py-16 bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-950 text-white rounded-3xl mx-4 sm:mx-8 shadow-2xl overflow-hidden">
        <div className="max-w-4xl relative z-10 space-y-6">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 text-xs font-semibold">
            <ShieldCheck className="w-4 h-4 text-blue-400" />
            <span>National Digital Health Infrastructure</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight">
            One Citizen. One Health ID. <br />
            <span className="text-amber-300">Seamless Healthcare Everywhere.</span>
          </h1>

          <p className="text-base sm:text-lg text-blue-100/90 max-w-2xl font-light leading-relaxed">
            Centralizing medical records across authorized hospitals and doctors nationwide. Eliminating paperwork, preventing duplicate tests, and empowering citizens with digital sovereignty over their health history.
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <Link to="/register">
              <Button size="lg" className="bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold shadow-lg">
                Create Your Digital Health ID <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
                Portal Login
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-xs font-bold uppercase tracking-widest text-blue-600">Enterprise Capability</p>
          <h2 className="text-3xl font-extrabold text-slate-900 mt-1">Key Pillars of CHMS Digital Platform</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-card border border-slate-200 shadow-card-soft hover:shadow-card-hover transition-all">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-5">
              <CreditCard className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Unique Health ID Card</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Every citizen receives a unique 14-digit Health ID (e.g. HID-2026-4819-2041) embedded with a secure QR code for instant record verification.
            </p>
          </div>

          <div className="bg-white p-8 rounded-card border border-slate-200 shadow-card-soft hover:shadow-card-hover transition-all">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-5">
              <FileSpreadsheet className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Centralized Longitudinal Records</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Consolidates lifetime medical history, lab reports, radiology scans, and prescription histories securely accessible nationwide.
            </p>
          </div>

          <div className="bg-white p-8 rounded-card border border-slate-200 shadow-card-soft hover:shadow-card-hover transition-all">
            <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-5">
              <Lock className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Role-Based Data Security</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Strict end-to-end access controls ensuring doctors view patient timelines only upon authorized health ID lookups.
            </p>
          </div>
        </div>
      </section>

      {/* Live Platform Metrics */}
      <section className="bg-slate-900 text-white py-12 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-slate-800">
          <div>
            <p className="text-3xl font-extrabold text-blue-400">10M+</p>
            <p className="text-xs text-slate-400 mt-1 uppercase tracking-wider font-semibold">Citizens Enrolled</p>
          </div>
          <div>
            <p className="text-3xl font-extrabold text-emerald-400">4,500+</p>
            <p className="text-xs text-slate-400 mt-1 uppercase tracking-wider font-semibold">Empaneled Hospitals</p>
          </div>
          <div>
            <p className="text-3xl font-extrabold text-amber-400">85,000+</p>
            <p className="text-xs text-slate-400 mt-1 uppercase tracking-wider font-semibold">Verified Doctors</p>
          </div>
          <div>
            <p className="text-3xl font-extrabold text-purple-400">99.99%</p>
            <p className="text-xs text-slate-400 mt-1 uppercase tracking-wider font-semibold">System Availability</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
