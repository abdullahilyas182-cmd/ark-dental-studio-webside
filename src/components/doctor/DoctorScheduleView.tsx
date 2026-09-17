import React, { useState } from 'react';
import { useClinic } from '../../context/ClinicContext';
import { Appointment } from '../../types';
import { 
  Calendar, Clock, CheckCircle2, User, Phone, AlertCircle, 
  Sparkles, Filter, ChevronRight, Activity, RefreshCw, PlusCircle, X 
} from 'lucide-react';

export const DoctorScheduleView: React.FC = () => {
  const { 
    appointments, updateAppointmentStatus, activeDoctorId, 
    doctors, advanceDemoStep, currentDemoStep, loadSampleSchedule,
    patients, requestAppointment, confirmAppointment
  } = useClinic();

  const currentDoctor = doctors.find(d => d.id === activeDoctorId) || doctors[0];
  const [filterSource, setFilterSource] = useState<string>('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newPatientName, setNewPatientName] = useState('');
  const [newProcedure, setNewProcedure] = useState('Porcelain Veneers Consultation');
  const [newTime, setNewTime] = useState('02:00 PM');

  const filteredAppointments = appointments.filter(a => {
    const matchesDoctor = a.doctorId === activeDoctorId;
    const matchesSource = filterSource === 'all' || a.source === filterSource;
    return matchesDoctor && matchesSource;
  });

  const getSourceBadge = (source: Appointment['source']) => {
    switch (source) {
      case 'AI-Receptionist':
        return (
          <span className="bg-purple-100 text-purple-800 text-[10px] font-bold px-2 py-0.5 rounded border border-purple-200">
            AI Receptionist
          </span>
        );
      case 'Doctor-Followup':
        return (
          <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-200">
            Doctor Follow-up
          </span>
        );
      case 'Patient-Portal':
        return (
          <span className="bg-blue-100 text-blue-800 text-[10px] font-bold px-2 py-0.5 rounded border border-blue-200">
            Patient Portal
          </span>
        );
      case 'Online-Web':
        return (
          <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded border border-amber-200">
            Web Consultation
          </span>
        );
      default:
        return (
          <span className="bg-gray-100 text-gray-700 text-[10px] font-bold px-2 py-0.5 rounded">
            Manual Front Desk
          </span>
        );
    }
  };

  const getStatusClass = (status: Appointment['status']) => {
    switch (status) {
      case 'Confirmed':
        return 'bg-emerald-50 border-emerald-300 text-emerald-900';
      case 'In-Chair':
        return 'bg-blue-50 border-blue-300 text-blue-900 ring-2 ring-blue-400/40';
      case 'Pending':
        return 'bg-amber-50 border-amber-300 text-amber-900';
      case 'Completed':
        return 'bg-gray-50 border-gray-200 text-gray-600 opacity-80';
      default:
        return 'bg-white border-gray-200 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-[#B79A5D] uppercase tracking-wider">
              Step 8: Auto-Propagated Appointment Timeline
            </span>
          </div>
          <h2 className="text-2xl font-serif font-bold text-[#2B2B2B] mt-0.5">
            Today’s Operatory Schedule
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Continuous real-time schedule synchronization for {currentDoctor.name}
          </p>
        </div>

        {/* Header Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-1.5 bg-[#1F4E4A] hover:bg-[#163a37] text-white text-xs font-semibold px-3.5 py-1.5 rounded-xl shadow-xs transition-colors cursor-pointer"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>+ Book Slot</span>
          </button>
          <button
            onClick={loadSampleSchedule}
            className="flex items-center gap-1.5 bg-white hover:bg-[#FAF6F0] text-[#1F4E4A] border border-[#E8DFD3] text-xs font-semibold px-3 py-1.5 rounded-xl shadow-xs transition-colors cursor-pointer"
            title="Restore today's sample schedule"
          >
            <RefreshCw className="w-3.5 h-3.5 text-[#B59975]" />
            <span className="hidden sm:inline">Reset Sample Schedule</span>
          </button>
          <div className="flex items-center gap-1.5 pl-2 border-l border-gray-200">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
            <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-full border border-emerald-300">
              Live Feed
            </span>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-3 rounded-xl border border-[#E8DFD3] flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-[#1F4E4A]" />
          <span className="font-semibold text-gray-700">Filter By Booking Origin:</span>
          {['all', 'AI-Receptionist', 'Doctor-Followup', 'Patient-Portal', 'Online-Web'].map((src) => (
            <button
              key={src}
              onClick={() => setFilterSource(src)}
              className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors cursor-pointer ${
                filterSource === src
                  ? 'bg-[#1F4E4A] text-white'
                  : 'bg-[#FAF6F0] text-gray-700 hover:bg-[#E8DFD3]'
              }`}
            >
              {src === 'all' ? 'All Origins' : src}
            </button>
          ))}
        </div>

        <span className="text-gray-500 text-xs font-medium">
          Showing <strong>{filteredAppointments.length}</strong> active chair bookings
        </span>
      </div>

      {/* Timeline Schedule Cards */}
      <div className="space-y-4">
        {filteredAppointments.length === 0 ? (
          <div className="bg-white p-12 text-center rounded-2xl border border-dashed border-[#E8DFD3] space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center mx-auto border border-amber-200">
              <Calendar className="w-6 h-6" />
            </div>
            <div className="max-w-md mx-auto">
              <h3 className="text-base font-serif font-bold text-[#2B2B2B]">
                Doctor Schedule is Currently Clear
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                No active operatory appointments found for this filter. You can book a procedure directly or restore today's full benchmark schedule.
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="flex items-center gap-1.5 bg-[#1F4E4A] hover:bg-[#163a37] text-white text-xs font-semibold px-4 py-2 rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>+ Schedule Appointment</span>
              </button>
              <button
                onClick={loadSampleSchedule}
                className="flex items-center gap-1.5 bg-white hover:bg-[#FAF6F0] text-[#1F4E4A] border border-[#E8DFD3] text-xs font-semibold px-4 py-2 rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5 text-[#B59975]" />
                <span>Load Today's Full Schedule</span>
              </button>
            </div>
          </div>
        ) : (
          filteredAppointments.map((apt) => (
            <div
              key={apt.id}
              className={`p-5 rounded-2xl border shadow-xs transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 ${getStatusClass(
                apt.status
              )}`}
            >
              {/* Left Column: Time & Patient Info */}
              <div className="space-y-2 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm font-bold bg-white/90 px-3 py-1 rounded-lg border border-[#E8DFD3] text-[#1F4E4A] flex items-center gap-1.5 shadow-xs">
                    <Clock className="w-3.5 h-3.5" />
                    {apt.time} ({apt.durationMinutes}m)
                  </span>
                  <span className="text-xs text-gray-500 font-medium">
                    Date: {apt.date}
                  </span>
                  {getSourceBadge(apt.source)}
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-black/5 text-gray-700">
                    Status: {apt.status}
                  </span>
                </div>

                <div>
                  <h4 className="text-base font-serif font-bold text-[#2B2B2B]">
                    {apt.patientName}
                  </h4>
                  <p className="text-xs font-semibold text-[#1F4E4A] mt-0.5">
                    Procedure: {apt.procedure}
                  </p>
                  {apt.notes && (
                    <p className="text-[11px] text-gray-600 mt-1 italic bg-white/60 p-2 rounded-lg border border-black/5 max-w-xl">
                      "{apt.notes}"
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-4 text-xs text-gray-500 pt-1">
                  <span className="flex items-center gap-1">
                    <Phone className="w-3 h-3 text-gray-400" />
                    {apt.patientPhone}
                  </span>
                  {apt.relatedFollowUpId && (
                    <span className="text-emerald-700 font-semibold text-[11px] flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      Linked to Doctor Follow-up Task
                    </span>
                  )}
                </div>
              </div>

              {/* Right Column: Operatory Status Quick Actions */}
              <div className="flex flex-wrap md:flex-col items-end gap-2 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-black/10">
                <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider block">
                  Operatory Status:
                </span>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => updateAppointmentStatus(apt.id, 'In-Chair')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      apt.status === 'In-Chair'
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'bg-white hover:bg-blue-50 text-blue-800 border border-blue-200'
                    }`}
                  >
                    Patient In-Chair
                  </button>

                  <button
                    onClick={() => updateAppointmentStatus(apt.id, 'Completed')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      apt.status === 'Completed'
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'bg-white hover:bg-emerald-50 text-emerald-800 border border-emerald-200'
                    }`}
                  >
                    Mark Completed
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      {/* Schedule New Appointment Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-xl border border-[#E8DFD3] space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="font-serif font-bold text-lg text-[#2B2B2B]">
                Schedule Patient Appointment
              </h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!newPatientName.trim()) return;

                const apt = requestAppointment({
                  patientName: newPatientName.trim(),
                  patientPhone: '0300-5551234',
                  patientId: patients.find(p => p.name.toLowerCase() === newPatientName.trim().toLowerCase())?.id,
                  doctorId: activeDoctorId,
                  date: new Date().toISOString().split('T')[0],
                  time: newTime,
                  procedure: newProcedure,
                  source: 'Doctor-Followup',
                  notes: 'Direct appointment scheduled from Operatory Schedule timeline.'
                });
                confirmAppointment(apt.id);

                setIsAddModalOpen(false);
                setNewPatientName('');
              }}
              className="space-y-4 text-xs"
            >
              <div>
                <label className="block font-semibold text-gray-700 mb-1">
                  Patient Name *
                </label>
                <input
                  type="text"
                  required
                  value={newPatientName}
                  onChange={(e) => setNewPatientName(e.target.value)}
                  placeholder="e.g. Bilal Ahmed"
                  className="w-full px-3 py-2 rounded-lg border border-[#E8DFD3] bg-[#FAF6F0] focus:outline-none focus:border-[#1F4E4A]"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">
                  Clinical Procedure
                </label>
                <input
                  type="text"
                  required
                  value={newProcedure}
                  onChange={(e) => setNewProcedure(e.target.value)}
                  placeholder="e.g. Veneer Cementation or Laser Whitening"
                  className="w-full px-3 py-2 rounded-lg border border-[#E8DFD3] bg-[#FAF6F0] focus:outline-none focus:border-[#1F4E4A]"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">
                  Time Slot
                </label>
                <select
                  value={newTime}
                  onChange={(e) => setNewTime(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-[#E8DFD3] bg-[#FAF6F0] focus:outline-none focus:border-[#1F4E4A]"
                >
                  <option value="10:00 AM">10:00 AM</option>
                  <option value="11:30 AM">11:30 AM</option>
                  <option value="01:00 PM">01:00 PM</option>
                  <option value="02:00 PM">02:00 PM</option>
                  <option value="03:30 PM">03:30 PM</option>
                  <option value="05:00 PM">05:00 PM</option>
                  <option value="06:30 PM">06:30 PM</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-3.5 py-2 rounded-lg text-gray-600 hover:bg-gray-100 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#1F4E4A] hover:bg-[#163a37] text-white rounded-lg font-semibold cursor-pointer shadow-xs"
                >
                  Confirm & Add to Schedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
