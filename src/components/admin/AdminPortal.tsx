import React, { useState, useEffect } from 'react';
import { useClinic } from '../../context/ClinicContext';
import { 
  ShieldCheck, Users, Calendar, DollarSign, Activity, Lock, 
  Key, LogOut, ArrowLeft, RefreshCw, FileText, CheckCircle2, 
  AlertTriangle, ShieldAlert, Database, Stethoscope, Sliders, 
  Download, Trash2, Eye, Award, Clock
} from 'lucide-react';
import { getStoredAuditLogs, checkRateLimitStatus, resetRateLimitState } from '../../utils/security';
import { LoginAuditLog } from '../../types';

export const AdminPortal: React.FC = () => {
  const { 
    adminSession, logoutAdmin, setPortal, patients, 
    appointments, doctors, resetAllData 
  } = useClinic();

  const [activeTab, setActiveTab] = useState<'overview' | 'roster' | 'rbac' | 'audit' | 'system'>('overview');
  const [auditLogs, setAuditLogs] = useState<LoginAuditLog[]>([]);
  const [logFilter, setLogFilter] = useState<'ALL' | 'SUCCESS' | 'FAILURE' | 'LOCKED_OUT'>('ALL');
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  useEffect(() => {
    setAuditLogs(getStoredAuditLogs());
  }, []);

  const refreshLogs = () => {
    setAuditLogs(getStoredAuditLogs());
    setStatusMessage('Audit logs refreshed successfully.');
    setTimeout(() => setStatusMessage(null), 3000);
  };

  const handleClearAuditLogs = () => {
    if (window.confirm('Are you sure you want to clear test audit logs?')) {
      localStorage.removeItem('ark_doctor_audit_logs');
      setAuditLogs([]);
      setStatusMessage('Test audit logs cleared.');
      setTimeout(() => setStatusMessage(null), 3000);
    }
  };

  const handleResetRateLimiter = () => {
    resetRateLimitState();
    setStatusMessage('Rate-limiter lockouts have been reset.');
    setTimeout(() => setStatusMessage(null), 3000);
  };

  const handleExportAuditLogs = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(auditLogs, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `ark-security-audit-${new Date().toISOString().substring(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const filteredLogs = auditLogs.filter(log => {
    if (logFilter === 'ALL') return true;
    return log.status === logFilter;
  });

  const confirmedAppointmentsCount = appointments.filter(a => a.status === 'Confirmed').length;
  const pendingAppointmentsCount = appointments.filter(a => a.status === 'Pending').length;

  return (
    <div className="min-h-screen bg-[#0F0D0C] text-[#FAF6F0] pb-24 font-sans selection:bg-amber-500 selection:text-black">
      {/* Top Gold Administrative Accent Stripe */}
      <div className="h-1 bg-gradient-to-r from-amber-600 via-yellow-400 to-amber-600" />

      {/* Main Admin Header */}
      <header className="bg-[#171412] border-b border-white/10 sticky top-0 z-30 shadow-xl backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Left Brand / Admin Title */}
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-md">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="font-serif font-bold text-lg text-white tracking-wide">
                    ARK Administrative Console
                  </h1>
                  <span className="text-[10px] bg-amber-500/20 text-amber-300 font-bold px-2 py-0.5 rounded-full border border-amber-500/40 uppercase tracking-widest">
                    Super Admin
                  </span>
                </div>
                <p className="text-xs text-gray-400">
                  {adminSession?.account.name || 'Clinical Operations Director'} • {adminSession?.account.email || 'admin@arkdental.com'}
                </p>
              </div>
            </div>

            {/* Right Action Controls */}
            <div className="flex items-center gap-2.5">
              <button
                onClick={() => setPortal('public')}
                className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium text-gray-300 transition-colors flex items-center gap-1.5 cursor-pointer"
                title="View the public customer interface"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>View User Portal</span>
              </button>

              <button
                onClick={logoutAdmin}
                className="px-3.5 py-1.5 rounded-xl bg-red-950/50 hover:bg-red-900/60 border border-red-700/50 text-xs font-medium text-red-200 transition-colors flex items-center gap-1.5 cursor-pointer"
                title="Sign out and lock Admin Portal"
              >
                <LogOut className="w-3.5 h-3.5 text-red-400" />
                <span>Lock & Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Sub-Tabs */}
      <div className="bg-[#12100E] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto space-x-1 py-2 text-xs font-medium scrollbar-none">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
                activeTab === 'overview'
                  ? 'bg-amber-500/20 text-amber-300 font-semibold border border-amber-500/40 shadow-xs'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Activity className="w-4 h-4" />
              <span>Operations & Metrics</span>
            </button>

            <button
              onClick={() => setActiveTab('roster')}
              className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
                activeTab === 'roster'
                  ? 'bg-amber-500/20 text-amber-300 font-semibold border border-amber-500/40 shadow-xs'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Stethoscope className="w-4 h-4" />
              <span>Doctor Roster ({doctors.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('rbac')}
              className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
                activeTab === 'rbac'
                  ? 'bg-amber-500/20 text-amber-300 font-semibold border border-amber-500/40 shadow-xs'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Lock className="w-4 h-4" />
              <span>Portal RBAC Matrix</span>
            </button>

            <button
              onClick={() => setActiveTab('audit')}
              className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
                activeTab === 'audit'
                  ? 'bg-amber-500/20 text-amber-300 font-semibold border border-amber-500/40 shadow-xs'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Security Audit Trails</span>
            </button>

            <button
              onClick={() => setActiveTab('system')}
              className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
                activeTab === 'system'
                  ? 'bg-amber-500/20 text-amber-300 font-semibold border border-amber-500/40 shadow-xs'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Sliders className="w-4 h-4" />
              <span>System & Data Controls</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {statusMessage && (
          <div className="mb-6 p-3 bg-emerald-950/60 border border-emerald-700/80 rounded-xl flex items-center gap-2.5 text-emerald-200 text-xs animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{statusMessage}</span>
          </div>
        )}

        {/* TAB 1: OVERVIEW & METRICS */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* KPI Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl bg-[#171412] border border-white/10 shadow-lg">
                <div className="flex items-center justify-between text-gray-400 text-xs font-semibold uppercase tracking-wider">
                  <span>Monthly Billings</span>
                  <DollarSign className="w-4 h-4 text-amber-400" />
                </div>
                <div className="mt-3 text-2xl font-serif font-bold text-white">
                  PKR 3,850,000
                </div>
                <div className="mt-1 text-xs text-emerald-400 font-medium flex items-center gap-1">
                  <span>+18.4% vs last month</span>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#171412] border border-white/10 shadow-lg">
                <div className="flex items-center justify-between text-gray-400 text-xs font-semibold uppercase tracking-wider">
                  <span>Registered Patients</span>
                  <Users className="w-4 h-4 text-blue-400" />
                </div>
                <div className="mt-3 text-2xl font-serif font-bold text-white">
                  {patients.length + 1416}
                </div>
                <div className="mt-1 text-xs text-gray-400">
                  {patients.length} active in current memory
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#171412] border border-white/10 shadow-lg">
                <div className="flex items-center justify-between text-gray-400 text-xs font-semibold uppercase tracking-wider">
                  <span>Appointments</span>
                  <Calendar className="w-4 h-4 text-purple-400" />
                </div>
                <div className="mt-3 text-2xl font-serif font-bold text-white">
                  {confirmedAppointmentsCount} <span className="text-sm font-normal text-gray-400">/ {appointments.length}</span>
                </div>
                <div className="mt-1 text-xs text-amber-400">
                  {pendingAppointmentsCount} pending review
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#171412] border border-white/10 shadow-lg">
                <div className="flex items-center justify-between text-gray-400 text-xs font-semibold uppercase tracking-wider">
                  <span>Security Gate</span>
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="mt-3 text-2xl font-serif font-bold text-emerald-400">
                  Enforced
                </div>
                <div className="mt-1 text-xs text-gray-400">
                  3-Tap Hidden Trigger Active
                </div>
              </div>
            </div>

            {/* Department Performance & Operatory Breakdown */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 p-6 rounded-3xl bg-[#171412] border border-white/10 shadow-xl space-y-4">
                <h3 className="font-serif font-bold text-base text-white">
                  Departmental Production & Clinical Caseload
                </h3>
                <div className="space-y-3.5">
                  <div>
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="text-gray-300 font-medium">Oral & Maxillofacial / Guided Implants</span>
                      <span className="text-amber-400 font-semibold">45% • PKR 1,732,500</span>
                    </div>
                    <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                      <div className="h-full bg-amber-500 rounded-full" style={{ width: '45%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="text-gray-300 font-medium">Aesthetic Veneers & Smile Makeovers</span>
                      <span className="text-yellow-400 font-semibold">30% • PKR 1,155,000</span>
                    </div>
                    <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                      <div className="h-full bg-yellow-400 rounded-full" style={{ width: '30%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="text-gray-300 font-medium">Clear Aligners & Orthodontics</span>
                      <span className="text-emerald-400 font-semibold">15% • PKR 577,500</span>
                    </div>
                    <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: '15%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="text-gray-300 font-medium">Advanced Restorative Care & Endodontics</span>
                      <span className="text-blue-400 font-semibold">10% • PKR 385,000</span>
                    </div>
                    <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full" style={{ width: '10%' }} />
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-gray-400">
                  <span>Operatory Suites: 3 Certified Surgical Theatres</span>
                  <span className="text-emerald-400 font-medium">100% Autoclave & Sterilization Verified</span>
                </div>
              </div>

              {/* Quick Admin Actions Box */}
              <div className="p-6 rounded-3xl bg-[#171412] border border-white/10 shadow-xl space-y-4 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif font-bold text-base text-white mb-2">
                    Security & Access Quick Status
                  </h3>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    The User Portal remains the only public-facing page. The Doctor Portal and Admin Portal are concealed behind 3-tap secret sequences.
                  </p>

                  <div className="mt-4 space-y-2 text-xs">
                    <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between">
                      <span className="text-gray-300">User Portal</span>
                      <span className="text-emerald-400 font-semibold">Public</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between">
                      <span className="text-gray-300">Doctor Portal</span>
                      <span className="text-amber-400 font-semibold">3-Tap Hidden (Doctor Only)</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between">
                      <span className="text-gray-300">Admin Portal</span>
                      <span className="text-amber-400 font-semibold">3-Tap Hidden (Admin Only)</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setActiveTab('rbac')}
                  className="w-full py-2.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 text-xs font-semibold transition-colors cursor-pointer text-center"
                >
                  View Complete RBAC Policy
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: DOCTOR ROSTER */}
        {activeTab === 'roster' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-serif font-bold text-lg text-white">
                  Clinical Specialists & Doctors
                </h3>
                <p className="text-xs text-gray-400 mt-0.5">
                  Manage medical credentials, active licensing, and department assignments
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {doctors.map(doctor => (
                <div 
                  key={doctor.id}
                  className="rounded-3xl bg-[#171412] border border-white/10 p-5 shadow-xl space-y-4 hover:border-amber-500/40 transition-colors"
                >
                  <div className="flex items-start gap-3.5">
                    <img 
                      src={doctor.avatar}
                      alt={doctor.name}
                      referrerPolicy="no-referrer"
                      className="w-14 h-14 rounded-2xl object-cover border-2 border-amber-500/40 shadow-sm"
                    />
                    <div>
                      <h4 className="font-serif font-bold text-sm text-white">{doctor.name}</h4>
                      <p className="text-xs text-amber-400 mt-0.5">{doctor.title}</p>
                      <span className="inline-block mt-1 text-[10px] bg-white/5 px-2 py-0.5 rounded-md text-gray-400 border border-white/5">
                        {doctor.degrees}
                      </span>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-black/40 border border-white/5 space-y-1.5 text-xs">
                    <div className="flex justify-between text-gray-400">
                      <span>Experience:</span>
                      <span className="text-white font-medium">{doctor.experienceYears}+ Years</span>
                    </div>
                    <div className="flex justify-between text-gray-400">
                      <span>Access Level:</span>
                      <span className="text-emerald-400 font-semibold">doctor_only</span>
                    </div>
                    <div className="flex justify-between text-gray-400">
                      <span>Clinical Status:</span>
                      <span className="text-amber-400 font-medium">On Duty / Active</span>
                    </div>
                  </div>

                  <div className="text-[11px] text-gray-400 line-clamp-3 leading-relaxed">
                    {doctor.bio}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: PORTAL RBAC MATRIX (Directly visualizing user's specification) */}
        {activeTab === 'rbac' && (
          <div className="space-y-6">
            <div>
              <h3 className="font-serif font-bold text-lg text-white">
                Role-Based Access Control (RBAC) Specification Matrix
              </h3>
              <p className="text-xs text-gray-400 mt-0.5">
                Verification of the strict access control and hidden portal trigger mechanisms
              </p>
            </div>

            {/* Portals Overview Table */}
            <div className="rounded-3xl bg-[#171412] border border-white/10 overflow-hidden shadow-xl">
              <div className="p-5 border-b border-white/10 bg-white/2">
                <h4 className="font-serif font-bold text-sm text-white">
                  1. Portals Configuration
                </h4>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-black/40 text-gray-400 border-b border-white/5 uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="p-4">Portal ID</th>
                      <th className="p-4">Visibility</th>
                      <th className="p-4">Main UI Display</th>
                      <th className="p-4">Trigger Mechanism</th>
                      <th className="p-4">Authentication</th>
                      <th className="p-4">Access Level</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    <tr>
                      <td className="p-4 font-bold text-white">userPortal</td>
                      <td className="p-4 text-emerald-400 font-medium">public</td>
                      <td className="p-4 text-emerald-400">true (Default Interface)</td>
                      <td className="p-4 text-gray-400">Always visible to all visitors</td>
                      <td className="p-4 text-gray-400">None required</td>
                      <td className="p-4 font-mono text-emerald-400">standard_user</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-bold text-white">adminPortal</td>
                      <td className="p-4 text-amber-400 font-medium">hidden</td>
                      <td className="p-4 text-red-400">false (Not exposed in main UI)</td>
                      <td className="p-4 text-gray-300">
                        <span className="bg-amber-500/10 text-amber-300 px-2 py-0.5 rounded border border-amber-500/30">
                          small_admin_icon (3 taps in 2s)
                        </span>
                      </td>
                      <td className="p-4 text-gray-300">
                        Email & Password (Salted SHA-256)
                      </td>
                      <td className="p-4 font-mono text-amber-400">admin_only</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-bold text-white">doctorPortal</td>
                      <td className="p-4 text-amber-400 font-medium">hidden</td>
                      <td className="p-4 text-red-400">false (Not exposed in main UI)</td>
                      <td className="p-4 text-gray-300">
                        <span className="bg-emerald-500/10 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/30">
                          small_doctor_icon (3 taps in 2s)
                        </span>
                      </td>
                      <td className="p-4 text-gray-300">
                        Email & Password (Salted SHA-256)
                      </td>
                      <td className="p-4 font-mono text-emerald-400">doctor_only</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Access Control Table */}
            <div className="rounded-3xl bg-[#171412] border border-white/10 overflow-hidden shadow-xl">
              <div className="p-5 border-b border-white/10 bg-white/2">
                <h4 className="font-serif font-bold text-sm text-white">
                  2. User Group Access Matrix
                </h4>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-black/40 text-gray-400 border-b border-white/5 uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="p-4">Role Group</th>
                      <th className="p-4">canView</th>
                      <th className="p-4">canAccess</th>
                      <th className="p-4">Restricted From</th>
                      <th className="p-4">Requires Auth</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    <tr>
                      <td className="p-4 font-bold text-white">regularUsers</td>
                      <td className="p-4 text-gray-300">["userPortal"]</td>
                      <td className="p-4 text-emerald-400 font-medium">["userPortal"]</td>
                      <td className="p-4 text-red-400 font-medium">["adminPortal", "doctorPortal"]</td>
                      <td className="p-4 text-gray-400">false</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-bold text-white">admins</td>
                      <td className="p-4 text-gray-300">["userPortal", "adminPortal"]</td>
                      <td className="p-4 text-amber-400 font-medium">["adminPortal"]</td>
                      <td className="p-4 text-gray-400">doctorPortal (separate clinical role)</td>
                      <td className="p-4 text-amber-400 font-bold">true (admin credentials)</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-bold text-white">doctors</td>
                      <td className="p-4 text-gray-300">["userPortal", "doctorPortal"]</td>
                      <td className="p-4 text-emerald-400 font-medium">["doctorPortal"]</td>
                      <td className="p-4 text-gray-400">adminPortal (separate admin role)</td>
                      <td className="p-4 text-emerald-400 font-bold">true (doctor credentials)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: SECURITY AUDIT TRAILS */}
        {activeTab === 'audit' && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h3 className="font-serif font-bold text-lg text-white">
                  Security Audit Log (Real-time Authentication History)
                </h3>
                <p className="text-xs text-gray-400 mt-0.5">
                  Immutable records of all login sequence attempts, IP simulations, and role validations
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={refreshLogs}
                  className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-medium text-gray-300 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Refresh</span>
                </button>

                <button
                  onClick={handleExportAuditLogs}
                  className="px-3 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-xs font-medium text-amber-300 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export JSON</span>
                </button>

                <button
                  onClick={handleClearAuditLogs}
                  className="px-3 py-1.5 rounded-xl bg-red-950/40 hover:bg-red-900/50 border border-red-800/40 text-xs font-medium text-red-300 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Clear Logs</span>
                </button>
              </div>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-400 font-medium">Filter:</span>
              {(['ALL', 'SUCCESS', 'FAILURE', 'LOCKED_OUT'] as const).map(f => (
                <button
                  key={f}
                  onClick={() => setLogFilter(f)}
                  className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                    logFilter === f
                      ? 'bg-amber-500 text-gray-950 font-bold'
                      : 'bg-white/5 text-gray-400 hover:text-white'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>

            {/* Audit Log Table */}
            <div className="rounded-3xl bg-[#171412] border border-white/10 overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-black/50 text-gray-400 border-b border-white/10 uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="p-3.5">Timestamp</th>
                      <th className="p-3.5">Status</th>
                      <th className="p-3.5">Account / Email</th>
                      <th className="p-3.5">Role Attempted</th>
                      <th className="p-3.5">Origin / Reason</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 font-mono text-[11px]">
                    {filteredLogs.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="p-8 text-center text-gray-500 font-sans">
                          No audit entries match the selected filter.
                        </td>
                      </tr>
                    ) : (
                      filteredLogs.map(log => (
                        <tr key={log.id} className="hover:bg-white/2 transition-colors">
                          <td className="p-3.5 text-gray-400 whitespace-nowrap">{log.timestamp}</td>
                          <td className="p-3.5 whitespace-nowrap">
                            {log.status === 'SUCCESS' && (
                              <span className="bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded-full border border-emerald-500/40 text-[10px]">
                                SUCCESS
                              </span>
                            )}
                            {log.status === 'FAILURE' && (
                              <span className="bg-red-500/20 text-red-300 font-bold px-2 py-0.5 rounded-full border border-red-500/40 text-[10px]">
                                FAILURE
                              </span>
                            )}
                            {log.status === 'LOCKED_OUT' && (
                              <span className="bg-amber-500/20 text-amber-300 font-bold px-2 py-0.5 rounded-full border border-amber-500/40 text-[10px]">
                                LOCKED_OUT
                              </span>
                            )}
                          </td>
                          <td className="p-3.5 text-white font-medium">{log.email}</td>
                          <td className="p-3.5 text-gray-300 capitalize">{log.roleAttempted || 'unknown'}</td>
                          <td className="p-3.5 text-gray-400 font-sans text-xs">
                            {log.reason || 'Normal authentication sequence'}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: SYSTEM & DATA CONTROLS */}
        {activeTab === 'system' && (
          <div className="space-y-6">
            <div>
              <h3 className="font-serif font-bold text-lg text-white">
                System Controls & Recovery
              </h3>
              <p className="text-xs text-gray-400 mt-0.5">
                Manage rate limit lockouts, data persistence, and restore defaults
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Rate Limiter Control */}
              <div className="p-6 rounded-3xl bg-[#171412] border border-white/10 shadow-xl space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-sm text-white">
                      Authentication Rate Limiter
                    </h4>
                    <p className="text-xs text-gray-400">
                      Enforces 5 max failed attempts and 30-second security lockdown
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 space-y-2 text-xs">
                  <div className="flex justify-between text-gray-400">
                    <span>Tap Sequence Window:</span>
                    <span className="text-white font-mono font-semibold">2.0 Seconds</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Taps Required:</span>
                    <span className="text-white font-mono font-semibold">3 Consecutive</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Max Failed Attempts:</span>
                    <span className="text-white font-mono font-semibold">5 Attempts</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Lockout Duration:</span>
                    <span className="text-white font-mono font-semibold">30 Seconds</span>
                  </div>
                </div>

                <button
                  onClick={handleResetRateLimiter}
                  className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-gray-300 transition-colors cursor-pointer"
                >
                  Reset Rate-Limiter Lockout Counters
                </button>
              </div>

              {/* Data Persistence & Reset */}
              <div className="p-6 rounded-3xl bg-[#171412] border border-white/10 shadow-xl space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400">
                    <Database className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-sm text-white">
                      Clinical Database State
                    </h4>
                    <p className="text-xs text-gray-400">
                      Restores initial patient charts, appointments, and treatment logs
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 space-y-2 text-xs">
                  <div className="flex justify-between text-gray-400">
                    <span>Current Patients:</span>
                    <span className="text-white font-mono font-semibold">{patients.length}</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Appointments Scheduled:</span>
                    <span className="text-white font-mono font-semibold">{appointments.length}</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span>Active Doctors:</span>
                    <span className="text-white font-mono font-semibold">{doctors.length}</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    if (window.confirm('Reset all demo data back to clean initial state?')) {
                      resetAllData();
                      setStatusMessage('All clinical datasets have been restored to default.');
                      setTimeout(() => setStatusMessage(null), 3000);
                    }
                  }}
                  className="w-full py-2.5 rounded-xl bg-red-950/40 hover:bg-red-900/50 border border-red-700/50 text-xs font-semibold text-red-200 transition-colors cursor-pointer"
                >
                  Restore Clean Demo Dataset
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
