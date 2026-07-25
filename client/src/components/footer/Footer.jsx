import React from 'react';
import { ShieldCheck } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 text-xs border-t border-slate-800 py-6 px-6">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-2">
          <ShieldCheck className="w-5 h-5 text-blue-500" />
          <span className="font-bold text-slate-200">Centralized Health Management System (CHMS)</span>
        </div>
        <div className="flex items-center space-x-6 text-slate-400">
          <a href="#privacy" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#terms" className="hover:text-white transition-colors">Terms of Service</a>
          <a href="#security" className="hover:text-white transition-colors">Security Architecture</a>
        </div>
        <div>
          © {new Date().getFullYear()} Government Digital Healthcare Portal. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
