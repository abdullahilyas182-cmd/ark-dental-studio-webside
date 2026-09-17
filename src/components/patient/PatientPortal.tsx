import React, { useState } from 'react';
import { useClinic } from '../../context/ClinicContext';
import { PatientAIAssistant } from './PatientAIAssistant';
import { CareJourneyTimeline } from './CareJourneyTimeline';
import { PostTreatmentGuides } from './PostTreatmentGuides';
import { BookingModal } from '../public/BookingModal';
import { 
  HeartPulse, Calendar, Clock, Sparkles, User, Phone, 
  ChevronRight, CheckCircle2, AlertCircle, PlusCircle, ArrowRight 
} from 'lucide-react';

export const PatientPortal: React.FC = () => {
  const { 
    patients, activePatientId, setActivePatientId, 
    treatments, appointments, followUpTasks, currentDemoStep 
  } = useClinic();

  const [bookingOpen, setBookingOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'timeline' | 'appointments' | 'care-guides'>('timeline');

  const activePatient = patients.find(p => p.id === activePatientId) || patients[0];
  const patientTreatments = treatments.filter(t => t.patientId === activePatient.id);
  const patientAppointments = appointments.filter(a => a.patientId === activePatient.id || a.patientName === activePatient.name);
  const patientFollowUps = followUpTasks.filter(f => f.patientId === activePatient.id || f.patientName === activePatient.name);

  return (
    <div className="min-h-screen bg-[#FAF6F0] pb-24 text-[#2B2B2B]">
      {/* Patient Header Strip */}
      <div className="bg-white border-b border-[#E8DFD3] shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img
                src={activePatient.avatar}
                alt={activePatient.name}
                className="w-12 h-12 rounded-2xl object-cover border-2 border-[#1F4E4A] shadow-xs"
                referrerPolicy="no-referrer"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl font-serif font-bold text-[#2B2B2B]">
                    {activePatient.name}
                  </h1>
                  <span className="text-[11px] font-urdu text-gray-500">
                    {activePatient.nameUrdu}
                  </span>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                    Verified Patient
                  </span>
                </div>
                <p className="text-xs text-gray-500">
                  Phone: <strong>{activePatient.phone}</strong> • Total Visits: {activePatient.totalVisits}
                </p>
              </div>
            </div>

            {/* Patient Switcher & Action CTA */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center bg-[#FAF6F0] p-1 rounded-xl border border-[#E8DFD3]">
                <span className="text-[11px] text-gray-500 px-2 font-medium hidden sm:inline">
                  Select Patient:
                </span>
                {patients.slice(0, 3).map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setActivePatientId(p.id)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                      activePatientId === p.id
                        ? 'bg-[#1F4E4A] text-white shadow-xs'
                        : 'text-gray-700 hover:bg-white'
                    }`}
                  >
                    {p.name.split(' ')[0]}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setBookingOpen(true)}
                className="bg-[#1F4E4A] hover:bg-[#163a37] text-white px-4 py-2 rounded-xl text-xs font-semibold shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>Request Next Appointment</span>
              </button>
            </div>
          </div>

          {/* Module Tabs */}
          <div className="flex items-center gap-2 mt-6 overflow-x-auto border-t border-gray-100 pt-3">
            <button
              onClick={() => setActiveTab('timeline')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'timeline'
                  ? 'bg-[#1F4E4A] text-white shadow-xs'
                  : 'bg-[#FAF6F0] text-gray-700 hover:bg-[#E8DFD3]'
              }`}
            >
              <HeartPulse className="w-4 h-4" />
              <span>Care Journey & Clinical Timeline</span>
            </button>

            <button
              onClick={() => setActiveTab('appointments')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'appointments'
                  ? 'bg-[#1F4E4A] text-white shadow-xs'
                  : 'bg-[#FAF6F0] text-gray-700 hover:bg-[#E8DFD3]'
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>Appointments History & Next Booking</span>
              {patientAppointments.length > 0 && (
                <span className="w-5 h-5 rounded-full bg-[#1F4E4A]/20 text-[#1F4E4A] text-[10px] flex items-center justify-center font-bold">
                  {patientAppointments.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('care-guides')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'care-guides'
                  ? 'bg-[#1F4E4A] text-white shadow-xs'
                  : 'bg-[#FAF6F0] text-gray-700 hover:bg-[#E8DFD3]'
              }`}
            >
              <Sparkles className="w-4 h-4 text-[#B79A5D]" />
              <span>Post-Treatment Care Guides</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        {/* Patient AI Assistant (Bilingual) */}
        <PatientAIAssistant onOpenBookingModal={() => setBookingOpen(true)} />

        {/* Tab Views */}
        {activeTab === 'timeline' && (
          <CareJourneyTimeline
            patient={activePatient}
            treatments={patientTreatments}
            followUps={patientFollowUps}
            appointments={patientAppointments}
            onRequestBooking={() => setBookingOpen(true)}
          />
        )}

        {activeTab === 'appointments' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-serif font-bold text-lg text-[#2B2B2B]">
                  Your Visits & Bookings
                </h3>
                <p className="text-xs text-gray-500">
                  Track upcoming confirmed slots and requested chair appointments
                </p>
              </div>

              <button
                onClick={() => setBookingOpen(true)}
                className="bg-[#1F4E4A] hover:bg-[#163a37] text-white px-4 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
              >
                + Book New Procedure
              </button>
            </div>

            <div className="bg-white rounded-2xl border border-[#E8DFD3] shadow-xs overflow-hidden">
              <div className="divide-y divide-gray-100">
                {patientAppointments.length === 0 ? (
                  <div className="p-10 text-center text-xs text-gray-400">
                    No bookings found. Click "Book New Procedure" above to reserve your chair slot.
                  </div>
                ) : (
                  patientAppointments.map((apt) => (
                    <div
                      key={apt.id}
                      className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-gray-50/70 transition-colors"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-serif font-bold text-base text-[#2B2B2B]">
                            {apt.procedure}
                          </span>
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                              apt.status === 'Confirmed'
                                ? 'bg-emerald-100 text-emerald-800'
                                : apt.status === 'Pending'
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-gray-100 text-gray-700'
                            }`}
                          >
                            {apt.status}
                          </span>
                        </div>

                        <div className="flex items-center gap-3 text-xs text-gray-600">
                          <span className="flex items-center gap-1 font-semibold text-[#1F4E4A]">
                            <Calendar className="w-3.5 h-3.5" />
                            {apt.date} at {apt.time}
                          </span>
                          <span>•</span>
                          <span>Physician: <strong>{apt.doctorName}</strong></span>
                        </div>

                        {apt.notes && (
                          <p className="text-[11px] text-gray-500 italic mt-0.5">
                            "{apt.notes}"
                          </p>
                        )}
                      </div>

                      <div className="text-right">
                        <span className="text-[11px] text-gray-400 block">
                          Booking Source: {apt.source}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'care-guides' && <PostTreatmentGuides />}
      </div>

      <BookingModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
      />
    </div>
  );
};
