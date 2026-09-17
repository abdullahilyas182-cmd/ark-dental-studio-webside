import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, ShieldAlert, AlertTriangle, Clock, 
  Terminal, RefreshCw, CheckCircle2, XCircle, Search, Trash2 
} from 'lucide-react';
import { LoginAuditLog } from '../../types';
import { getStoredAuditLogs } from '../../utils/security';

export const SecurityAuditView: React.FC = () => {
  const [logs, setLogs] = useState<LoginAuditLog[]>([]);
  const [filter, setFilter] = useState<'ALL' | 'SUCCESS' | 'FAILURE' | 'LOCKED_OUT'>('ALL');
  const [search, setSearch] = useState('');

  const refreshLogs = () => {
    setLogs(getStoredAuditLogs());
  };

  useEffect(() => {
    refreshLogs();
  }, []);

  const filteredLogs = logs.filter(log => {
    if (filter !== 'ALL' && log.status !== filter) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        log.email.toLowerCase().includes(q) ||
        log.ipSimulated.toLowerCase().includes(q) ||
        (log.reason && log.reason.toLowerCase().includes(q))
      );
    }
    return true;
  });

  const clearLogs = () => {
    localStorage.removeItem('ark_doctor_audit_logs');
    setLogs([]);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white p-5 rounded-2xl border border-[#E8DFD3] shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-lg bg-[#1F4E4A]/10 text-[#1F4E4A]">
              <Terminal className="w-5 h-5" />
            </span>
            <h2 className="text-lg font-serif font-bold text-[#2B2B2B]">
              Security & Authentication Audit Trail
            </h2>
          </div>
          <p className="text-xs text-gray-600 mt-1">
            Real-time audit records for clinical logins, 3-tap secret sequences, and rate-limiting triggers.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={refreshLogs}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#E8DFD3] bg-[#FAF6F0] hover:bg-white text-xs font-semibold text-[#1F4E4A] transition-colors cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Refresh</span>
          </button>
          <button
            onClick={clearLogs}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-red-200 bg-red-50 hover:bg-red-100 text-xs font-semibold text-red-700 transition-colors cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear Logs</span>
          </button>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-xl border border-[#E8DFD3]">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-gray-500">Filter:</span>
          {(['ALL', 'SUCCESS', 'FAILURE', 'LOCKED_OUT'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setFilter(st)}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                filter === st
                  ? 'bg-[#1F4E4A] text-white'
                  : 'bg-[#FAF6F0] text-gray-600 hover:bg-[#E8DFD3]/60'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search email, IP, reason..."
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-[#FAF6F0] rounded-lg border border-[#E8DFD3] focus:outline-hidden focus:border-[#1F4E4A]"
          />
        </div>
      </div>

      {/* Audit Log Table */}
      <div className="bg-white rounded-2xl border border-[#E8DFD3] overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-gray-700">
            <thead className="bg-[#FAF6F0] border-b border-[#E8DFD3] text-[11px] font-bold text-gray-600 uppercase tracking-wider">
              <tr>
                <th className="px-4 py-3">Timestamp</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Attempted Email</th>
                <th className="px-4 py-3">Target Role</th>
                <th className="px-4 py-3">Simulated Source IP</th>
                <th className="px-4 py-3">Audit Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8DFD3]">
              {filteredLogs.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                    No security audit logs found matching criteria.
                  </td>
                </tr>
              ) : (
                filteredLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-gray-50/70 transition-colors">
                    <td className="px-4 py-3 font-mono text-[11px] whitespace-nowrap text-gray-600">
                      {log.timestamp}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      {log.status === 'SUCCESS' && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold border border-emerald-300">
                          <CheckCircle2 className="w-3 h-3" />
                          SUCCESS
                        </span>
                      )}
                      {log.status === 'FAILURE' && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-100 text-red-800 text-[10px] font-bold border border-red-300">
                          <XCircle className="w-3 h-3" />
                          FAILURE
                        </span>
                      )}
                      {log.status === 'LOCKED_OUT' && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold border border-amber-300">
                          <AlertTriangle className="w-3 h-3" />
                          RATE_LIMIT
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 font-medium text-[#2B2B2B]">
                      {log.email}
                    </td>
                    <td className="px-4 py-3 capitalize text-gray-600">
                      {log.roleAttempted || 'N/A'}
                    </td>
                    <td className="px-4 py-3 font-mono text-[11px] text-gray-500 whitespace-nowrap">
                      {log.ipSimulated}
                    </td>
                    <td className="px-4 py-3 text-gray-700">
                      {log.reason || 'Authentication verification'}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
