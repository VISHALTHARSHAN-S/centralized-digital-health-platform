import React from 'react';

export const CardSkeleton = () => (
  <div className="bg-white p-6 rounded-card border border-slate-200 animate-pulse shadow-sm">
    <div className="h-4 bg-slate-200 rounded w-1/3 mb-4"></div>
    <div className="h-8 bg-slate-200 rounded w-2/3 mb-2"></div>
    <div className="h-3 bg-slate-100 rounded w-1/2"></div>
  </div>
);

export const TableSkeleton = ({ rows = 5 }) => (
  <div className="bg-white rounded-card border border-slate-200 p-4 animate-pulse">
    <div className="h-10 bg-slate-100 rounded mb-4"></div>
    {[...Array(rows)].map((_, i) => (
      <div key={i} className="h-12 bg-slate-50 rounded mb-2 flex items-center px-4 space-x-4">
        <div className="h-4 bg-slate-200 rounded w-1/4"></div>
        <div className="h-4 bg-slate-200 rounded w-1/4"></div>
        <div className="h-4 bg-slate-200 rounded w-1/4"></div>
        <div className="h-4 bg-slate-200 rounded w-1/4"></div>
      </div>
    ))}
  </div>
);

const LoadingSkeleton = {
  CardSkeleton,
  TableSkeleton
};

export default LoadingSkeleton;
