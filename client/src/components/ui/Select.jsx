import React, { forwardRef } from 'react';

const Select = forwardRef(({
  label,
  options = [],
  error,
  helperText,
  className = '',
  placeholder = 'Select an option',
  ...props
}, ref) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
          {label}
        </label>
      )}
      <select
        ref={ref}
        className={`w-full rounded-card border ${
          error ? 'border-rose-500 focus:ring-rose-500' : 'border-slate-300 focus:ring-primary-500'
        } bg-white py-2.5 px-3.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:border-transparent transition-all ${className}`}
        {...props}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((opt) => {
          const value = typeof opt === 'object' ? opt.value : opt;
          const labelText = typeof opt === 'object' ? opt.label : opt;
          return (
            <option key={value} value={value}>
              {labelText}
            </option>
          );
        })}
      </select>
      {error ? (
        <p className="mt-1 text-xs text-rose-600">{error}</p>
      ) : helperText ? (
        <p className="mt-1 text-xs text-slate-500">{helperText}</p>
      ) : null}
    </div>
  );
});

Select.displayName = 'Select';
export default Select;
