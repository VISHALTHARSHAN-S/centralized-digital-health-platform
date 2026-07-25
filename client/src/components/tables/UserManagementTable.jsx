import React from 'react';
import StatusBadge from '../common/StatusBadge';
import { formatDate } from '../../utils/formatters';
import Button from '../ui/Button';
import { UserCheck, ShieldAlert } from 'lucide-react';

const UserManagementTable = ({ users = [], onToggleStatus }) => {
  return (
    <div className="bg-white rounded-card border border-slate-200 shadow-card-soft overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/75 border-b border-slate-200 text-[11px] font-bold uppercase tracking-wider text-slate-500">
              <th className="px-6 py-3.5">User Email</th>
              <th className="px-6 py-3.5">Assigned Role</th>
              <th className="px-6 py-3.5">Account Status</th>
              <th className="px-6 py-3.5">Registered Date</th>
              <th className="px-6 py-3.5 text-right">Administrative Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
            {users.map((u) => (
              <tr key={u._id} className="hover:bg-slate-50/80 transition-colors">
                <td className="px-6 py-4 font-semibold text-slate-900">
                  {u.email}
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-block px-2.5 py-0.5 rounded text-xs font-bold ${
                    u.role === 'ADMIN' ? 'bg-purple-100 text-purple-800' :
                    u.role === 'DOCTOR' ? 'bg-blue-100 text-blue-800' : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    {u.role}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <StatusBadge status={u.status} />
                </td>
                <td className="px-6 py-4 text-xs text-slate-500 whitespace-nowrap">
                  {formatDate(u.createdAt)}
                </td>
                <td className="px-6 py-4 text-right">
                  {u.role !== 'ADMIN' && (
                    <Button
                      size="sm"
                      variant={u.status === 'ACTIVE' ? 'ghost' : 'primary'}
                      className={u.status === 'ACTIVE' ? 'text-rose-600 hover:bg-rose-50' : 'text-white'}
                      onClick={() => onToggleStatus(u._id, u.status === 'ACTIVE' ? 'SUSPENDED' : 'ACTIVE')}
                    >
                      {u.status === 'ACTIVE' ? (
                        <>
                          <ShieldAlert className="w-3.5 h-3.5 mr-1" /> Suspend
                        </>
                      ) : (
                        <>
                          <UserCheck className="w-3.5 h-3.5 mr-1" /> Activate
                        </>
                      )}
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagementTable;
