import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard,
  CreditCard,
  FileSpreadsheet,
  CalendarCheck,
  Search,
  Users,
  Building2,
  BarChart3,
  Stethoscope,
  Shield,
  User
} from 'lucide-react';

const Sidebar = () => {
  const { user } = useAuth();
  const role = user?.role;

  const patientLinks = [
    { to: '/patient/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/patient/profile', label: 'My Profile', icon: User },
    { to: '/patient/health-card', label: 'Digital Health Card', icon: CreditCard },
    { to: '/patient/records', label: 'Medical History & Reports', icon: FileSpreadsheet },
    { to: '/patient/appointments', label: 'Book & Appointments', icon: CalendarCheck }
  ];

  const doctorLinks = [
    { to: '/doctor/dashboard', label: 'Doctor Dashboard', icon: LayoutDashboard },
    { to: '/doctor/lookup', label: 'Search Health ID', icon: Search },
    { to: '/doctor/appointments', label: 'Consultations Schedule', icon: CalendarCheck }
  ];

  const adminLinks = [
    { to: '/admin/dashboard', label: 'Overview Dashboard', icon: LayoutDashboard },
    { to: '/admin/users', label: 'User Directory', icon: Users },
    { to: '/admin/hospitals', label: 'Hospital Network', icon: Building2 },
    { to: '/admin/analytics', label: 'Healthcare Analytics', icon: BarChart3 }
  ];

  const links = role === 'PATIENT' ? patientLinks : role === 'DOCTOR' ? doctorLinks : adminLinks;

  return (
    <aside className="w-64 bg-sidebar text-white min-h-[calc(100vh-61px)] flex flex-col justify-between p-4 shadow-xl border-r border-blue-900">
      <div className="space-y-6">
        {/* Role Badge Indicator */}
        <div className="px-3 py-2 rounded-xl bg-blue-900/60 border border-blue-700/50 flex items-center space-x-2 text-xs">
          <Shield className="w-4 h-4 text-blue-300" />
          <span className="font-bold text-blue-100 uppercase tracking-wider">{role} WORKSPACE</span>
        </div>

        {/* Navigation Section */}
        <nav className="space-y-1">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-3.5 py-2.5 rounded-card text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-blue-200 hover:bg-sidebar-hover hover:text-white'
                  }`
                }
              >
                <Icon className="w-5 h-5 shrink-0" />
                <span>{link.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Footer Support Callout */}
      <div className="p-3.5 bg-blue-950/60 rounded-card border border-blue-800/40 text-xs text-blue-200/80">
        <p className="font-bold text-white mb-1">National Helpline</p>
        <p>Support: 1800-11-2026</p>
        <p className="text-[10px] mt-1 text-blue-300/70">Powered by Ministry of Digital Health</p>
      </div>
    </aside>
  );
};

export default Sidebar;
