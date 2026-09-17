import React, { useState } from 'react';
import { useClinic } from '../../context/ClinicContext';
import { 
  Globe, Shield, User, Bell, Sparkles, AlertCircle, RotateCcw, 
  ChevronRight, CheckCircle, Languages, X, Lock, LogOut, ShieldCheck, Key 
} from 'lucide-react';
import { DoctorPortalIcon } from './DoctorPortalIcon';
import { AdminPortalIcon } from './AdminPortalIcon';
import { ArkLogo } from './ArkLogo';

export const TopControlBar: React.FC = () => {
  const { 
    portal, setPortal, language, setLanguage, notifications, 
    dismissNotification, clearAllNotifications, resetAllData,
    demoWorkflowActive, setDemoWorkflowActive, currentDemoStep, executeDemoStepAction,
    isDoctorAuthenticated, doctorSession, logoutDoctor, openDoctorLoginModal,
    isAdminAuthenticated, adminSession, logoutAdmin, openAdminLoginModal
  } = useClinic();

  const [showNotifMenu, setShowNotifMenu] = useState(false);
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="sticky top-0 z-50 bg-[#FAF6F0]/95 backdrop-blur-md border-b border-[#E8DFD3] shadow-xs">
      {/* Top Disclaimer Bar */}
      <div className="bg-[#1F4E4A] text-[#FAF6F0] px-4 py-1.5 text-xs flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center justify-center w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-medium tracking-wide">
            ARK DENTAL STUDIO (PESHAWAR) — UNIFIED OPERATING SYSTEM
          </span>
          <span className="hidden sm:inline-block text-[#FAF6F0]/60">|</span>
          <span className="hidden md:inline-flex items-center gap-1 text-[#E8DFD3]/85 text-[11px]">
            <AlertCircle className="w-3.5 h-3.5 text-amber-300" />
            Medical Disclaimer: Simulated demo clinical records.
          </span>
        </div>

        <div className="flex items-center gap-3 ml-auto">
          {/* Secret Portal Trigger Icons (Small, Tap-Trigger Only: 3 taps within 2s) */}
          <div className="flex items-center gap-1.5 pl-2 border-l border-white/20">
            <DoctorPortalIcon onTriggerSequence={openDoctorLoginModal} />
            <AdminPortalIcon onTriggerSequence={openAdminLoginModal} />
          </div>

          {/* Demo Reset */}
          <button 
            onClick={resetAllData}
            title="Reset system to initial clean demo data"
            className="flex items-center gap-1 text-[11px] text-[#FAF6F0]/80 hover:text-white transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            <span className="hidden sm:inline">Reset Demo</span>
          </button>

          {/* Language Switcher */}
          <div className="flex items-center bg-black/20 rounded-md p-0.5">
            <button
              onClick={() => setLanguage('en')}
              className={`px-2 py-0.5 text-xs rounded font-medium transition-all ${
                language === 'en' ? 'bg-[#FAF6F0] text-[#1F4E4A] font-semibold' : 'text-[#FAF6F0]/80 hover:text-white'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLanguage('ur')}
              className={`px-2 py-0.5 text-xs rounded font-medium transition-all font-urdu ${
                language === 'ur' ? 'bg-[#FAF6F0] text-[#1F4E4A] font-semibold' : 'text-[#FAF6F0]/80 hover:text-white'
              }`}
            >
              اردو
            </button>
          </div>
        </div>
      </div>

      {/* Main Unified Navigation / Portal Switcher */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex flex-wrap items-center justify-between gap-3">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setPortal('public')} 
            className="text-left group cursor-pointer focus:outline-hidden"
          >
            <div className="flex items-center gap-2.5">
              <ArkLogo size="sm" showText={false} />
              <div>
                <span className="font-serif text-lg font-semibold tracking-tight text-[#2B2B2B] group-hover:text-[#1F4E4A] transition-colors">
                  ARK Dental Studio
                </span>
                <span className="block text-[10px] text-[#1F4E4A] font-medium tracking-wider uppercase -mt-0.5">
                  Connected Clinic OS
                </span>
              </div>
            </div>
          </button>
        </div>

        {/* Portals Switcher - Strict RBAC Visibility: Doctor Portal HIDDEN for Regular Users */}
        <nav className="flex items-center bg-[#E8DFD3]/60 p-1 rounded-xl border border-[#E8DFD3] text-sm">
          {/* Public Website */}
          <button
            onClick={() => setPortal('public')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
              portal === 'public'
                ? 'bg-[#1F4E4A] text-white shadow-xs'
                : 'text-[#2B2B2B] hover:bg-[#FAF6F0]/80'
            }`}
          >
            <Globe className="w-4 h-4" />
            <span>Public Website</span>
          </button>

          {/* Patient Portal */}
          <button
            onClick={() => setPortal('patient')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
              portal === 'patient'
                ? 'bg-[#1F4E4A] text-white shadow-xs'
                : 'text-[#2B2B2B] hover:bg-[#FAF6F0]/80'
            }`}
          >
            <User className="w-4 h-4 text-amber-600" />
            <span>Patient Portal</span>
          </button>

          {/* Doctor Portal: Locked for entry with password or Unlocked when session is active */}
          {isDoctorAuthenticated ? (
            <button
              onClick={() => setPortal('doctor')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer ml-1 ${
                portal === 'doctor'
                  ? 'bg-[#1F4E4A] text-white shadow-xs'
                  : 'text-[#2B2B2B] hover:bg-[#FAF6F0]/80'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-emerald-300" />
              <span>Doctor Portal</span>
              <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-700 text-emerald-100 font-bold uppercase tracking-wider">
                {doctorSession?.account.role || 'Authorized'}
              </span>
            </button>
          ) : (
            <button
              onClick={openDoctorLoginModal}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer ml-1 text-[#2B2B2B] hover:bg-[#FAF6F0]/80 group"
              title="Doctor Portal is locked. Enter password for access."
            >
              <Lock className="w-3.5 h-3.5 text-amber-700 group-hover:text-[#1F4E4A]" />
              <span>Doctor Portal</span>
              <span className="text-[9px] px-1.5 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-300 font-bold uppercase tracking-wider flex items-center gap-0.5">
                Lock 🔒
              </span>
            </button>
          )}

          {/* Admin Portal: ONLY rendered if Admin session is verified! */}
          {isAdminAuthenticated && (
            <button
              onClick={() => setPortal('admin')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer ml-1 ${
                portal === 'admin'
                  ? 'bg-[#8A6A32] text-white shadow-xs'
                  : 'text-[#2B2B2B] hover:bg-[#FAF6F0]/80'
              }`}
            >
              <Shield className="w-4 h-4 text-amber-300" />
              <span>Admin Portal</span>
              <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-900 text-amber-200 font-bold uppercase tracking-wider">
                Admin
              </span>
            </button>
          )}
        </nav>

        {/* Right Tools: Authorized Doctor/Admin Badge + Lockout / Sign Out + Tour + Notification Center */}
        <div className="flex items-center gap-2">
          {/* If Doctor Session Active, Show Practitioner Tag & Instant Lock/Sign-Out */}
          {isDoctorAuthenticated && doctorSession && (
            <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-xl">
              <img
                src={doctorSession.account.avatar}
                alt={doctorSession.account.name}
                className="w-5 h-5 rounded-full object-cover border border-emerald-400"
                referrerPolicy="no-referrer"
              />
              <div className="hidden sm:block text-left text-[11px] leading-tight">
                <div className="font-bold text-[#1F4E4A] truncate max-w-[110px]">
                  {doctorSession.account.name}
                </div>
                <div className="text-[9px] text-emerald-700 font-semibold uppercase">
                  {doctorSession.account.role} Active
                </div>
              </div>
              <button
                onClick={logoutDoctor}
                title="Lock Doctor Portal & Return to User Mode"
                className="ml-1 p-1 rounded-lg hover:bg-emerald-200/60 text-emerald-800 hover:text-red-700 transition-colors cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* If Admin Session Active, Show Admin Tag & Instant Lock/Sign-Out */}
          {isAdminAuthenticated && adminSession && (
            <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-xl">
              <img
                src={adminSession.account.avatar}
                alt={adminSession.account.name}
                className="w-5 h-5 rounded-full object-cover border border-amber-400"
                referrerPolicy="no-referrer"
              />
              <div className="hidden sm:block text-left text-[11px] leading-tight">
                <div className="font-bold text-amber-900 truncate max-w-[110px]">
                  {adminSession.account.name}
                </div>
                <div className="text-[9px] text-amber-700 font-semibold uppercase">
                  Admin Active
                </div>
              </div>
              <button
                onClick={logoutAdmin}
                title="Lock Admin Portal & Return to User Mode"
                className="ml-1 p-1 rounded-lg hover:bg-amber-200/60 text-amber-800 hover:text-red-700 transition-colors cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* 8-Step Demo Tour Toggle Button */}
          <button
            onClick={() => setDemoWorkflowActive(!demoWorkflowActive)}
            className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
              demoWorkflowActive 
                ? 'bg-[#B79A5D]/20 text-[#725a24] border-[#B79A5D]/50' 
                : 'bg-white text-[#2B2B2B] border-[#E8DFD3] hover:bg-[#FAF6F0]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#B79A5D]" />
            <span>8-Step Demo Flow</span>
            <span className="w-4 h-4 rounded-full bg-[#B79A5D] text-white text-[10px] flex items-center justify-center font-bold">
              {currentDemoStep}
            </span>
          </button>

          {/* Reactive Notification Center */}
          <div className="relative">
            <button
              onClick={() => setShowNotifMenu(!showNotifMenu)}
              className="relative p-2 rounded-lg bg-white border border-[#E8DFD3] hover:bg-[#FAF6F0] text-[#2B2B2B] transition-colors cursor-pointer"
              title="System Live Activity & Clinical Events"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#C1622D] text-white text-[10px] font-bold flex items-center justify-center animate-bounce">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notification Dropdown */}
            {showNotifMenu && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-xl border border-[#E8DFD3] p-4 z-50">
                <div className="flex items-center justify-between pb-2 border-b border-[#E8DFD3]">
                  <div>
                    <h4 className="font-serif font-bold text-sm text-[#2B2B2B]">Live Clinic Propagation</h4>
                    <p className="text-[11px] text-[#2B2B2B]/70">Auto-updating cross-portal activity stream</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={clearAllNotifications}
                      className="text-[11px] text-gray-500 hover:text-gray-800"
                    >
                      Clear
                    </button>
                    <button 
                      onClick={() => setShowNotifMenu(false)}
                      className="text-gray-400 hover:text-gray-700"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="max-h-72 overflow-y-auto divide-y divide-gray-100 mt-2">
                  {notifications.length === 0 ? (
                    <div className="py-6 text-center text-xs text-gray-400">
                      No recent clinic events. Record a treatment or book an appointment to see live cross-portal sync!
                    </div>
                  ) : (
                    notifications.map(n => (
                      <div key={n.id} className="py-2.5 text-xs group flex items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-semibold text-[#1F4E4A]">{n.title}</span>
                            <span className="text-[10px] text-gray-400">{n.timestamp}</span>
                          </div>
                          <p className="text-gray-600 mt-0.5 leading-relaxed">{n.message}</p>
                        </div>
                        <button 
                          onClick={() => dismissNotification(n.id)}
                          className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-gray-600 transition-opacity p-1"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
