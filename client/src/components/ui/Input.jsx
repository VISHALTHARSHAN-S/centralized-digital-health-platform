import React, { forwardRef } from 'react';

const Input = forwardRef(({
  label,
  error,
  helperText,
  icon: Icon,
  className = '',
  ...props
}, ref) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
          {label}
        </label>
      )}
      <div className="relative rounded-card shadow-sm">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <Icon className="w-5 h-5" />
          </div>
        )}
        <input
          ref={ref}
          className={`w-full rounded-card border ${
            error ? 'border-rose-500 focus:ring-rose-500' : 'border-slate-300 focus:ring-primary-500'
          } bg-white py-2.5 ${
            Icon ? 'pl-10' : 'pl-3.5'
          } pr-3.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all ${className}`}
          {...props}
        />
      </div>
      {error ? (
        <p className="mt-1 text-xs text-rose-600">{error}</p>
      ) : helperText ? (
        <p className="mt-1 text-xs text-slate-500">{helperText}</p>
      ) : null}
    </div>
  );
});

Input.displayName = 'Input';
export default Input;
