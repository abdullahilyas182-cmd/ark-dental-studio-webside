import React, { useState } from 'react';
import { useClinic } from '../../context/ClinicContext';
import { DOCTORS, SERVICES } from '../../data/mockData';
import { 
  EASY_CLINICAL_TREATMENTS, 
  getTreatmentByName 
} from '../../data/treatmentServicesData';
import { TreatmentVoiceAssistant } from './TreatmentVoiceAssistant';
import { X, Calendar, Clock, CheckCircle2, AlertCircle, Phone, User, Languages } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedService?: string;
  preselectedDoctorId?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  preselectedService,
  preselectedDoctorId
}) => {
  const { requestAppointment, doctors } = useClinic();

  const [patientName, setPatientName] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [doctorId, setDoctorId] = useState(preselectedDoctorId || doctors[0].id);
  const initialTreatment = preselectedService ? getTreatmentByName(preselectedService) : EASY_CLINICAL_TREATMENTS[0];
  const [procedure, setProcedure] = useState(initialTreatment ? initialTreatment.easyName : EASY_CLINICAL_TREATMENTS[0].easyName);
  const [date, setDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [time, setTime] = useState('11:30 AM');
  const [notes, setNotes] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName || !patientPhone) return;

    requestAppointment({
      patientName,
      patientPhone,
      doctorId,
      date,
      time,
      procedure,
      source: 'Online-Web',
      notes: notes || 'Booked via public boutique website consultation form.'
    });

    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 2400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
      <div className="bg-[#FAF6F0] w-full max-w-lg rounded-2xl shadow-2xl border border-[#E8DFD3] overflow-hidden">
        {/* Header */}
        <div className="bg-[#1F4E4A] text-white p-5 flex items-center justify-between">
          <div>
            <span className="text-xs text-[#B79A5D] font-semibold uppercase tracking-wider">
              ARK Dental Studio Peshawar
            </span>
            <h3 className="text-xl font-serif font-bold text-[#FAF6F0] mt-0.5">
              Book Your Private Consultation
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-white/70 hover:text-white transition-colors p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSuccess ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto shadow-xs">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-serif font-bold text-[#2B2B2B]">
              Appointment Request Transmitted!
            </h4>
            <p className="text-sm text-gray-600 max-w-sm mx-auto leading-relaxed">
              Your consultation request has been automatically routed to the <strong>Doctor / Staff Portal</strong>. Our front desk staff will review and confirm your reservation.
            </p>
            <div className="text-xs bg-white p-3 rounded-lg border border-[#E8DFD3] text-gray-500">
              Assigned: <strong>{date} at {time}</strong> with <strong>{doctors.find(d => d.id === doctorId)?.name}</strong>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Asad Khattak"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-sm bg-white rounded-lg border border-[#E8DFD3] focus:outline-hidden focus:border-[#1F4E4A]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Phone / WhatsApp *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                  <input
                    type="tel"
                    required
                    placeholder="+92 3XX XXXXXXX"
                    value={patientPhone}
                    onChange={(e) => setPatientPhone(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-sm bg-white rounded-lg border border-[#E8DFD3] focus:outline-hidden focus:border-[#1F4E4A]"
                  />
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-semibold text-gray-700">
                  Select Clinical Treatment (Easy Words)
                </label>
                <span className="text-[10px] font-semibold text-[#B59975] flex items-center gap-1">
                  <Languages className="w-3 h-3" /> Urdu & English Voice
                </span>
              </div>
              <select
                value={procedure}
                onChange={(e) => setProcedure(e.target.value)}
                className="w-full px-3 py-2 text-xs sm:text-sm bg-white rounded-lg border border-[#E8DFD3] focus:outline-hidden focus:border-[#1F4E4A]"
              >
                {EASY_CLINICAL_TREATMENTS.map((t) => (
                  <option key={t.id} value={t.easyName}>
                    {t.easyName}
                  </option>
                ))}
              </select>

              {/* AI Voice Assistant attached to selected treatment in modal */}
              <div className="mt-2.5">
                <TreatmentVoiceAssistant 
                  treatment={getTreatmentByName(procedure) || EASY_CLINICAL_TREATMENTS[0]}
                  isDark={false}
                  compact={true}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Lead Specialist
                </label>
                <select
                  value={doctorId}
                  onChange={(e) => setDoctorId(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-white rounded-lg border border-[#E8DFD3] focus:outline-hidden focus:border-[#1F4E4A]"
                >
                  {doctors.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.name} — {d.specialty}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Preferred Date
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-sm bg-white rounded-lg border border-[#E8DFD3] focus:outline-hidden focus:border-[#1F4E4A]"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Preferred Time Slot
                </label>
                <div className="relative">
                  <Clock className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                  <select
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-sm bg-white rounded-lg border border-[#E8DFD3] focus:outline-hidden focus:border-[#1F4E4A]"
                  >
                    <option value="11:30 AM">11:30 AM - Morning Slot</option>
                    <option value="01:00 PM">01:00 PM - Early Afternoon</option>
                    <option value="03:00 PM">03:00 PM - Afternoon</option>
                    <option value="05:30 PM">05:30 PM - Evening</option>
                    <option value="07:30 PM">07:30 PM - Prime Evening</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Special Notes / Concerns (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Mild dental anxiety, sensitivity"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-white rounded-lg border border-[#E8DFD3] focus:outline-hidden focus:border-[#1F4E4A]"
                />
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between gap-3">
              <span className="text-[11px] text-gray-500 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5 text-[#1F4E4A]" />
                Auto-syncs with Clinic OS
              </span>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-medium text-gray-600 hover:text-gray-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#1F4E4A] hover:bg-[#173e3b] text-white text-xs font-semibold rounded-lg shadow-sm transition-all cursor-pointer"
                >
                  Submit Consultation Request
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
