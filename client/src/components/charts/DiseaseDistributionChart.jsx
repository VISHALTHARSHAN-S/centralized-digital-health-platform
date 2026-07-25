import React from 'react';

const DiseaseDistributionChart = ({ stats = [] }) => {
  const total = stats.reduce((acc, curr) => acc + curr.cases, 0) || 1;

  const colors = [
    'bg-blue-600 text-blue-600',
    'bg-purple-600 text-purple-600',
    'bg-emerald-500 text-emerald-500',
    'bg-amber-500 text-amber-500',
    'bg-rose-500 text-rose-500',
    'bg-indigo-500 text-indigo-500'
  ];

  return (
    <div className="space-y-4">
      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Top Diagnosed Conditions Nationwide</p>
      <div className="space-y-3">
        {stats.map((item, idx) => {
          const percentage = Math.round((item.cases / total) * 100);
          const colorClass = colors[idx % colors.length];

          return (
            <div key={idx} className="space-y-1">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-slate-800">{item.disease}</span>
                <span className="text-slate-600">{item.cases} cases ({percentage}%)</span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  style={{ width: `${percentage}%` }}
                  className={`h-full ${colorClass.split(' ')[0]} transition-all duration-500 rounded-full`}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DiseaseDistributionChart;
