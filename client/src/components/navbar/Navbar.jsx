import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { notificationService } from '../../services/notificationService';
import { Bell, LogOut, User, ShieldCheck } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { user, profile, logout } = useAuth();
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [showNotifMenu, setShowNotifMenu] = useState(false);

  useEffect(() => {
    if (user) {
      notificationService.getNotifications()
        .then(res => {
          if (res.data) setNotifications(res.data);
        })
        .catch(err => console.error(err));
    }
  }, [user]);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-sm">
      <div className="flex items-center justify-between px-6 py-3">
        {/* Left Brand */}
        <div className="flex items-center space-x-3">
          <Link to="/" className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="text-base font-extrabold text-slate-900 tracking-tight">CHMS PORTAL</span>
              <span className="hidden sm:block text-[10px] uppercase font-bold text-blue-600 tracking-widest">National Health Authority</span>
            </div>
          </Link>
        </div>

        {/* Right Nav Options */}
        <div className="flex items-center space-x-4">
          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowNotifMenu(!showNotifMenu)}
              className="relative p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-rose-500 rounded-full ring-2 ring-white"></span>
              )}
            </button>

            {showNotifMenu && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-card shadow-2xl border border-slate-200 py-2 z-50 animate-fade-in">
                <div className="px-4 py-2 border-b border-slate-100 flex justify-between items-center">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-700">Notifications</span>
                  <span className="text-[10px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full font-semibold">{unreadCount} New</span>
                </div>
                <div className="max-h-64 overflow-y-auto divide-y divide-slate-100">
                  {notifications.length === 0 ? (
                    <p className="text-xs text-slate-400 p-4 text-center">No recent notifications</p>
                  ) : (
                    notifications.map((n) => (
                      <div key={n._id} className={`p-3 text-xs ${n.isRead ? 'bg-white' : 'bg-blue-50/50'}`}>
                        <p className="font-bold text-slate-800">{n.title}</p>
                        <p className="text-slate-600 mt-0.5">{n.message}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* User Profile Summary */}
          {user && (
            <div className="flex items-center space-x-3 border-l border-slate-200 pl-4">
              <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center font-bold text-xs border border-slate-200">
                <User className="w-4 h-4" />
              </div>
              <div className="hidden md:block text-left">
                <p className="text-xs font-bold text-slate-900">{profile?.fullName || user.email}</p>
                <p className="text-[10px] font-semibold text-blue-600 uppercase">{user.role}</p>
              </div>
              <button
                onClick={handleLogout}
                className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors ml-2"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
