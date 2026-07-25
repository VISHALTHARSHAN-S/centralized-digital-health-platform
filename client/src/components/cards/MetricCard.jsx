import React from 'react';

const MetricCard = ({ title, value, icon: Icon, color = 'blue', trend, subtitle }) => {
  const colorMap = {
    blue: { bg: 'bg-blue-50 text-blue-600 border-blue-100', iconBg: 'bg-blue-600' },
    green: { bg: 'bg-emerald-50 text-emerald-600 border-emerald-100', iconBg: 'bg-emerald-600' },
    purple: { bg: 'bg-purple-50 text-purple-600 border-purple-100', iconBg: 'bg-purple-600' },
    amber: { bg: 'bg-amber-50 text-amber-600 border-amber-100', iconBg: 'bg-amber-600' },
    rose: { bg: 'bg-rose-50 text-rose-600 border-rose-100', iconBg: 'bg-rose-600' }
  };

  const selectedColor = colorMap[color] || colorMap.blue;

  return (
    <div className="bg-white p-6 rounded-card border border-slate-200 shadow-card-soft hover:shadow-card-hover transition-all duration-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{title}</p>
          <h4 className="text-2xl font-extrabold text-slate-900 mt-2">{value}</h4>
          {subtitle && <p className="text-xs text-slate-500 mt-1">{subtitle}</p>}
          {trend && (
            <p className="text-xs font-semibold text-emerald-600 mt-2 flex items-center">
              <span>↑ {trend}</span>
              <span className="text-slate-400 font-normal ml-1">vs last month</span>
            </p>
          )}
        </div>
        {Icon && (
          <div className={`p-3.5 rounded-xl text-white shadow-md ${selectedColor.iconBg}`}>
            <Icon className="w-6 h-6" />
          </div>
        )}
      </div>
    </div>
  );
};

export default MetricCard;
