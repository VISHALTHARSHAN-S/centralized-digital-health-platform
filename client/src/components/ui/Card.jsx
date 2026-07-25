import React from 'react';

const Card = ({ children, title, subtitle, action, className = '', headerClassName = '' }) => {
  return (
    <div className={`bg-white rounded-card border border-slate-200 shadow-card-soft overflow-hidden transition-all duration-200 hover:shadow-card-hover ${className}`}>
      {(title || action) && (
        <div className={`flex items-center justify-between px-6 py-4 border-b border-slate-100 ${headerClassName}`}>
          <div>
            {title && <h3 className="text-base font-bold text-slate-800">{title}</h3>}
            {subtitle && <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>}
          </div>
          {action && <div>{action}</div>}
        </div>
      )}
      <div className="p-6">{children}</div>
    </div>
  );
};

export default Card;
