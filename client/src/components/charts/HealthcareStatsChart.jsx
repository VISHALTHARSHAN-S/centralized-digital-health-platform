import React from 'react';

const HealthcareStatsChart = ({ data = [] }) => {
  const maxVal = Math.max(...data.map(d => d.patients), 500);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-xs text-slate-500 pb-2 border-b border-slate-100">
        <span>Citizen Health ID Registration Growth Trend</span>
        <div className="flex items-center space-x-4">
          <span className="flex items-center"><span className="w-2.5 h-2.5 bg-blue-600 rounded-full mr-1"></span> Patients</span>
          <span className="flex items-center"><span className="w-2.5 h-2.5 bg-emerald-500 rounded-full mr-1"></span> Doctors</span>
        </div>
      </div>

      <div className="h-48 flex items-end justify-between space-x-3 pt-6 px-2">
        {data.map((item, idx) => {
          const patientHeight = Math.round((item.patients / maxVal) * 100);
          const doctorHeight = Math.round(((item.doctors * 5) / maxVal) * 100);

          return (
            <div key={idx} className="flex-1 flex flex-col items-center group relative">
              {/* Tooltip */}
              <div className="absolute -top-10 opacity-0 group-hover:opacity-100 bg-slate-900 text-white text-[10px] py-1 px-2 rounded shadow transition-opacity pointer-events-none z-10 whitespace-nowrap">
                Patients: {item.patients} | Doctors: {item.doctors}
              </div>

              {/* Bar Stack */}
              <div className="w-full flex items-end justify-center space-x-1 h-36">
                <div
                  style={{ height: `${patientHeight}%` }}
                  className="w-1/2 bg-blue-600 hover:bg-blue-700 rounded-t-md transition-all duration-500 shadow-sm"
                ></div>
                <div
                  style={{ height: `${doctorHeight}%` }}
                  className="w-1/2 bg-emerald-500 hover:bg-emerald-600 rounded-t-md transition-all duration-500 shadow-sm"
                ></div>
              </div>

              <span className="text-[11px] font-semibold text-slate-600 mt-2">{item.month}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HealthcareStatsChart;
