import React, { useState } from 'react';
import { useClinic } from '../../context/ClinicContext';
import { Patient } from '../../types';
import { DoctorAIAssistant } from './DoctorAIAssistant';
import { PatientRecordsView } from './PatientRecordsView';
import { RecordTreatmentModal } from './RecordTreatmentModal';
import { FollowUpDashboard } from './FollowUpDashboard';
import { DoctorScheduleView } from './DoctorScheduleView';
import { ReceptionistInbox } from './ReceptionistInbox';
import { SecurityAuditView } from './SecurityAuditView';
import { 
  Users, Calendar, Clock, Inbox, ShieldCheck, Stethoscope, 
  Sparkles, Lock, ArrowRight, ShieldAlert, LogOut, Terminal,
  Trash2, RefreshCw, AlertCircle, X
} from 'lucide-react';

export const DoctorPortal: React.FC = () => {
  const { 
    doctors, activeDoctorId, setActiveDoctorId, patients, 
    appointments, followUpTasks, currentDemoStep, doctorSession, logoutDoctor,
    clearDoctorData, loadSampleSchedule
  } = useClinic();

  const [activeTab, setActiveTab] = useState<'records' | 'followup' | 'schedule' | 'inbox' | 'audit'>(() => {
    if (currentDemoStep === 5) return 'followup';
    if (currentDemoStep === 7) return 'inbox';
    if (currentDemoStep === 8) return 'schedule';
    return 'records';
  });

  const [recordTreatmentPatient, setRecordTreatmentPatient] = useState<Patient | null>(null);
  const [showClearModal, setShowClearModal] = useState(false);
  const [clearedToast, setClearedToast] = useState(false);

  const currentDoctor = doctors.find(d => d.id === activeDoctorId) || doctors[0];
  const pendingRequestsCount = appointments.filter(a => a.status === 'Pending').length;
  const pendingFollowUpsCount = followUpTasks.filter(f => f.status === 'Pending').length;

  return (
    <div className="min-h-screen bg-[#FAF6F0] pb-24 text-[#2B2B2B]">
      {/* Practitioner Header Strip */}
      <div className="bg-[#FCFAF7] border-b border-[#E8DFD3] shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl overflow-hidden border-2 border-[#4A2E18] shadow-xs">
                <img
                  src={doctorSession?.account.avatar || currentDoctor.avatar}
                  alt={doctorSession?.account.name || currentDoctor.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl font-serif font-bold text-[#2A1D15]">
                    {doctorSession?.account.name || currentDoctor.name}
                  </h1>
                  <span className="text-[10px] bg-[#EBDCCB] text-[#4A2E18] font-bold px-2.5 py-0.5 rounded-full border border-[#D8BE9B] uppercase tracking-wider">
                    {doctorSession?.account.role || 'Doctor'} Authorized
                  </span>
                </div>
                <p className="text-xs text-[#6E4723] font-medium">
                  {doctorSession?.account.title || currentDoctor.title}
                </p>
              </div>
            </div>

            {/* Clinical Practitioner Badge & Lock Portal */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xs text-[#735A47] font-medium hidden sm:inline">
                  Practitioner:
                </span>
                <div className="flex items-center bg-[#F5ECE1] px-3 py-1.5 rounded-xl border border-[#D8BE9B]/60">
                  <span className="text-xs font-semibold text-[#4A2E18] flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#8C6239] animate-pulse" />
                    Dr. Muhammad Ali Riaz Khan
                  </span>
                </div>
              </div>

              {/* Clear Data & Reset Actions */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowClearModal(true)}
                  title="Clear all doctor portal appointments, records and reminders"
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#F5ECE1] hover:bg-[#EBDCCB] text-[#5A381E] border border-[#D8BE9B] text-xs font-semibold transition-colors cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5 text-[#8C4A28]" />
                  <span className="hidden sm:inline">Clear Doctor Data</span>
                </button>

                <button
                  onClick={() => {
                    loadSampleSchedule();
                    setClearedToast(false);
                  }}
                  title="Restore sample clinical appointments and patients"
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white hover:bg-[#F5ECE1] text-[#4A2E18] border border-[#D8BE9B] text-xs font-semibold transition-colors cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-[#8C6239]" />
                  <span className="hidden sm:inline">Reset Sample Data</span>
                </button>
              </div>

              {/* Lock / Exit Doctor Mode */}
              <button
                onClick={logoutDoctor}
                title="Log Out & Return to User Portal"
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#4A2E18]/10 hover:bg-red-50 text-[#4A2E18] hover:text-red-700 border border-[#4A2E18]/20 hover:border-red-200 text-xs font-semibold transition-colors cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Log Out & Return to User Portal</span>
              </button>
            </div>
          </div>

          {/* Module Tabs */}
          <div className="flex items-center gap-2 mt-6 overflow-x-auto border-t border-[#E8DFD3] pt-3">
            <button
              onClick={() => setActiveTab('records')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'records'
                  ? 'bg-[#4A2E18] text-[#FAF6F0] shadow-sm'
                  : 'bg-[#F5ECE1] text-[#4A3B32] hover:bg-[#EBDCCB]'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Patient Records & Clinical Charting</span>
            </button>

            <button
              onClick={() => setActiveTab('followup')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'followup'
                  ? 'bg-[#4A2E18] text-[#FAF6F0] shadow-sm'
                  : 'bg-[#F5ECE1] text-[#4A3B32] hover:bg-[#EBDCCB]'
              }`}
            >
              <Sparkles className="w-4 h-4 text-[#D8BE9B]" />
              <span>Follow-Up Dashboard</span>
              {pendingFollowUpsCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-[#8C4A28] text-white text-[10px] flex items-center justify-center font-bold">
                  {pendingFollowUpsCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('schedule')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'schedule'
                  ? 'bg-[#4A2E18] text-[#FAF6F0] shadow-sm'
                  : 'bg-[#F5ECE1] text-[#4A3B32] hover:bg-[#EBDCCB]'
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>Appointment Schedule View</span>
            </button>

            <button
              onClick={() => setActiveTab('inbox')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'inbox'
                  ? 'bg-[#4A2E18] text-[#FAF6F0] shadow-sm'
                  : 'bg-[#F5ECE1] text-[#4A3B32] hover:bg-[#EBDCCB]'
              }`}
            >
              <Inbox className="w-4 h-4" />
              <span>Receptionist Desk Inbox</span>
              {pendingRequestsCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-[#8C4A28] text-white text-[10px] flex items-center justify-center font-bold animate-pulse">
                  {pendingRequestsCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('audit')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'audit'
                  ? 'bg-[#4A2E18] text-[#FAF6F0] shadow-sm'
                  : 'bg-[#F5ECE1] text-[#4A3B32] hover:bg-[#EBDCCB]'
              }`}
            >
              <Terminal className="w-4 h-4 text-[#8C6239]" />
              <span>Security Audit Logs</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        {/* Doctor Portal AI Assistant Briefing (Bilingual) */}
        {activeTab !== 'audit' && <DoctorAIAssistant />}

        {/* Selected Module View */}
        {activeTab === 'records' && (
          <PatientRecordsView
            onOpenRecordTreatment={(patient) => setRecordTreatmentPatient(patient)}
          />
        )}

        {activeTab === 'followup' && <FollowUpDashboard />}

        {activeTab === 'schedule' && <DoctorScheduleView />}

        {activeTab === 'inbox' && <ReceptionistInbox />}

        {activeTab === 'audit' && <SecurityAuditView />}
      </div>

      {/* Record Treatment Modal */}
      {recordTreatmentPatient && (
        <RecordTreatmentModal
          isOpen={!!recordTreatmentPatient}
          onClose={() => setRecordTreatmentPatient(null)}
          patient={recordTreatmentPatient}
        />
      )}

      {/* Clear Doctor Data Confirmation Modal */}
      {showClearModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-2xl border border-red-200 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mx-auto border border-red-200">
              <Trash2 className="w-6 h-6" />
            </div>

            <div className="text-center space-y-1">
              <h3 className="font-serif font-bold text-lg text-[#2B2B2B]">
                Clear All Doctor Portal Data?
              </h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                This will clear all active appointments, electronic patient records, completed treatment notes, and scheduled reminders from the Doctor Portal. You can restore sample data at any time.
              </p>
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowClearModal(false)}
                className="px-4 py-2 rounded-xl text-gray-600 hover:bg-gray-100 font-semibold text-xs cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  clearDoctorData();
                  setShowClearModal(false);
                  setClearedToast(true);
                  setTimeout(() => setClearedToast(false), 4000);
                }}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl font-semibold text-xs cursor-pointer shadow-xs"
              >
                Yes, Clear All Data
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Notification Toast when Cleared */}
      {clearedToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#140E0A] text-[#FAF6F0] px-4 py-3 rounded-2xl border border-[#B59975] shadow-xl flex items-center gap-3 text-xs animate-bounce">
          <AlertCircle className="w-4 h-4 text-amber-400" />
          <span>Doctor Portal data successfully cleared.</span>
          <button
            onClick={() => {
              loadSampleSchedule();
              setClearedToast(false);
            }}
            className="underline font-bold text-[#D8BE9B] hover:text-white ml-2"
          >
            Undo & Restore Sample Schedule
          </button>
        </div>
      )}
    </div>
  );
};
