import React, { useState } from 'react';
import { useClinic } from '../../context/ClinicContext';
import { DOCTORS, SERVICES, CLINIC_METADATA } from '../../data/mockData';
import { 
  EASY_CLINICAL_TREATMENTS, 
  getTreatmentByName, 
  TreatmentServiceOption 
} from '../../data/treatmentServicesData';
import { TreatmentVoiceAssistant } from './TreatmentVoiceAssistant';
import { TreatmentCatalogModal } from './TreatmentCatalogModal';
import { 
  Calendar, Clock, CheckCircle2, User, Phone, Mail, FileText, 
  Sparkles, ArrowRight, ShieldCheck, Download, AlertCircle, RefreshCw,
  Volume2, Languages, HelpCircle
} from 'lucide-react';

interface AppointmentBookingSectionProps {
  preselectedService?: string;
  preselectedDoctorId?: string;
}

export const AppointmentBookingSection: React.FC<AppointmentBookingSectionProps> = ({
  preselectedService,
  preselectedDoctorId
}) => {
  const { requestAppointment, doctors, patients } = useClinic();

  const [patientType, setPatientType] = useState<'new' | 'existing'>('new');
  const [existingLookupPhone, setExistingLookupPhone] = useState('');
  const [existingPatientFound, setExistingPatientFound] = useState<string | null>(null);

  const initialTreatment = preselectedService ? getTreatmentByName(preselectedService) : EASY_CLINICAL_TREATMENTS[0];
  const [selectedService, setSelectedService] = useState(initialTreatment ? initialTreatment.easyName : EASY_CLINICAL_TREATMENTS[0].easyName);
  const [isCatalogModalOpen, setIsCatalogModalOpen] = useState(false);
  const [selectedDoctorId, setSelectedDoctorId] = useState(preselectedDoctorId || doctors[0].id);
  const [selectedDate, setSelectedDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [selectedTime, setSelectedTime] = useState('11:30 AM');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [reason, setReason] = useState('');
  const [preferredWindow, setPreferredWindow] = useState<'Morning' | 'Afternoon' | 'Evening'>('Morning');

  const [confirmedBooking, setConfirmedBooking] = useState<{
    referenceId: string;
    patientName: string;
    doctorName: string;
    date: string;
    time: string;
    service: string;
  } | null>(null);

  const timeSlots = [
    { time: '10:30 AM', period: 'Morning' },
    { time: '11:30 AM', period: 'Morning' },
    { time: '12:30 PM', period: 'Morning' },
    { time: '02:00 PM', period: 'Afternoon' },
    { time: '03:30 PM', period: 'Afternoon' },
    { time: '05:00 PM', period: 'Evening' },
    { time: '06:30 PM', period: 'Evening' },
    { time: '08:00 PM', period: 'Evening' }
  ];

  const handleLookupExisting = () => {
    const matched = patients.find(p => p.phone.replace(/\s+/g, '').includes(existingLookupPhone.replace(/\s+/g, '')));
    if (matched) {
      setExistingPatientFound(matched.name);
      setFullName(matched.name);
      setPhone(matched.phone);
      setEmail(matched.email);
    } else {
      setExistingPatientFound('Not Found');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone) return;

    const refId = `ARK-${Math.floor(1000 + Math.random() * 9000)}`;
    const matchedDoctor = doctors.find(d => d.id === selectedDoctorId) || doctors[0];

    requestAppointment({
      patientName: fullName,
      patientPhone: phone,
      patientEmail: email,
      doctorId: selectedDoctorId,
      date: selectedDate,
      time: selectedTime,
      procedure: selectedService,
      source: 'Online-Web',
      notes: `${reason || 'Patient online booking'} [${patientType.toUpperCase()} PATIENT - Ref ${refId}]`
    });

    setConfirmedBooking({
      referenceId: refId,
      patientName: fullName,
      doctorName: matchedDoctor.name,
      date: selectedDate,
      time: selectedTime,
      service: selectedService
    });
  };

  const handleReset = () => {
    setConfirmedBooking(null);
    setFullName('');
    setPhone('');
    setEmail('');
    setReason('');
  };

  return (
    <div className="w-full bg-[#FAF6F0] py-16 text-[#2B2B2B]" id="booking">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-[#B89368] mb-2 block">
            ONLINE APPOINTMENT SCHEDULING
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#2B2B2B] tracking-tight">
            Reserve Your Private Consultation
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 mt-2">
            Directly connected to ARK Dental Studio clinical calendar. Choose your doctor and preferred time.
          </p>
        </div>

        {confirmedBooking ? (
          <div className="bg-white rounded-2xl p-8 sm:p-12 border border-[#B89368]/40 shadow-lg text-center space-y-6 max-w-2xl mx-auto animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 border border-emerald-300 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div className="space-y-1">
              <span className="text-xs font-bold text-[#B89368] uppercase tracking-widest">
                BOOKING CONFIRMED & ROUTED TO CLINICAL SYSTEM
              </span>
              <h3 className="text-2xl font-serif font-bold text-[#2B2B2B]">
                We Look Forward to Welcoming You
              </h3>
              <p className="text-xs text-gray-500">
                Booking Reference: <strong className="text-[#1F4E4A]">{confirmedBooking.referenceId}</strong>
              </p>
            </div>

            {/* Ticket Summary */}
            <div className="bg-[#FAF6F0] p-6 rounded-xl border border-[#E8DFD3] text-left space-y-3 text-xs">
              <div className="flex justify-between border-b border-gray-200 pb-2">
                <span className="text-gray-500">Patient Name:</span>
                <span className="font-semibold text-gray-900">{confirmedBooking.patientName}</span>
              </div>
              <div className="flex justify-between border-b border-gray-200 pb-2">
                <span className="text-gray-500">Selected Treatment:</span>
                <span className="font-semibold text-gray-900">{confirmedBooking.service}</span>
              </div>
              <div className="flex justify-between border-b border-gray-200 pb-2">
                <span className="text-gray-500">Consultant / Surgeon:</span>
                <span className="font-semibold text-gray-900">{confirmedBooking.doctorName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Date & Reserved Time:</span>
                <span className="font-semibold text-[#1F4E4A]">{confirmedBooking.date} at {confirmedBooking.time}</span>
              </div>
            </div>

            {/* Simulated Automated SMS / Email Notice */}
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-left space-y-1.5 text-xs text-amber-900">
              <div className="flex items-center gap-1.5 font-bold">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>Automated SMS & Email Reminders Activated</span>
              </div>
              <p className="text-[11px] text-amber-800 leading-relaxed">
                An automated SMS confirmation has been queued for {phone}. You will receive a courtesy reminder 24 hours prior to your visit with parking directions and clinic intake details.
              </p>
            </div>

            <div className="pt-2 flex flex-wrap justify-center gap-3">
              <button
                onClick={handleReset}
                className="px-5 py-2.5 rounded-xl border border-[#E8DFD3] hover:bg-[#FAF6F0] text-xs font-semibold text-gray-700 flex items-center gap-1.5 cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Book Another Visit</span>
              </button>
              <a
                href={`https://wa.me/923339123456?text=Hello%20ARK%20Dental%20Studio,%20I%20have%20booked%20reference%20${confirmedBooking.referenceId}%20for%20${confirmedBooking.patientName}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Confirm on WhatsApp</span>
              </a>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-[#E8DFD3] p-6 sm:p-10 shadow-sm space-y-8">
            {/* Patient Type Switcher (New vs Existing) */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                Patient Status
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setPatientType('new')}
                  className={`p-3 rounded-xl border text-xs font-semibold cursor-pointer transition-all ${
                    patientType === 'new'
                      ? 'bg-[#1F4E4A] text-white border-[#1F4E4A] shadow-sm'
                      : 'bg-[#FAF6F0] text-gray-700 border-[#E8DFD3] hover:bg-white'
                  }`}
                >
                  I am a New Patient
                </button>
                <button
                  type="button"
                  onClick={() => setPatientType('existing')}
                  className={`p-3 rounded-xl border text-xs font-semibold cursor-pointer transition-all ${
                    patientType === 'existing'
                      ? 'bg-[#1F4E4A] text-white border-[#1F4E4A] shadow-sm'
                      : 'bg-[#FAF6F0] text-gray-700 border-[#E8DFD3] hover:bg-white'
                  }`}
                >
                  I am an Existing Patient
                </button>
              </div>

              {patientType === 'existing' && (
                <div className="mt-4 p-4 rounded-xl bg-[#FAF6F0] border border-[#E8DFD3] flex flex-col sm:flex-row gap-3 items-end">
                  <div className="flex-1 w-full">
                    <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                      Quick Lookup: Enter Registered Phone Number
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 0300 8594321"
                      value={existingLookupPhone}
                      onChange={e => setExistingLookupPhone(e.target.value)}
                      className="w-full p-2.5 rounded-lg border border-[#E8DFD3] bg-white text-xs focus:outline-none focus:border-[#1F4E4A]"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleLookupExisting}
                    className="px-4 py-2.5 rounded-lg bg-[#1F4E4A] text-white text-xs font-semibold cursor-pointer shrink-0"
                  >
                    Find My File
                  </button>
                </div>
              )}

              {existingPatientFound && existingPatientFound !== 'Not Found' && (
                <div className="mt-2 text-xs text-emerald-700 bg-emerald-50 p-2.5 rounded-lg border border-emerald-200">
                  Patient record found for <strong>{existingPatientFound}</strong>. Clinical profile linked!
                </div>
              )}
              {existingPatientFound === 'Not Found' && (
                <div className="mt-2 text-xs text-amber-800 bg-amber-50 p-2.5 rounded-lg border border-amber-200">
                  Phone not found in demo records. Please enter details below to register.
                </div>
              )}
            </div>

            {/* Step 1 & 2: Service & Doctor */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-500">
                    1. Select Clinical Service
                  </label>
                  <button
                    type="button"
                    onClick={() => setIsCatalogModalOpen(true)}
                    className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#1F4E4A] hover:underline cursor-pointer"
                  >
                    <Languages className="w-3.5 h-3.5 text-[#B59975]" />
                    <span>Audio Guide (Urdu / English)</span>
                  </button>
                </div>

                <select
                  value={selectedService}
                  onChange={e => setSelectedService(e.target.value)}
                  className="w-full p-3 rounded-xl border border-[#E8DFD3] bg-[#FAF6F0]/40 text-xs font-medium text-gray-800 focus:outline-none focus:border-[#1F4E4A]"
                >
                  {EASY_CLINICAL_TREATMENTS.map(t => (
                    <option key={t.id} value={t.easyName}>
                      {t.easyName}
                    </option>
                  ))}
                </select>

                {/* AI Voice Assistant right beside the selected treatment */}
                <div className="mt-3">
                  <TreatmentVoiceAssistant 
                    treatment={getTreatmentByName(selectedService) || EASY_CLINICAL_TREATMENTS[0]}
                    isDark={false}
                    compact={true}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                  2. Preferred Dental Surgeon
                </label>
                <select
                  value={selectedDoctorId}
                  onChange={e => setSelectedDoctorId(e.target.value)}
                  className="w-full p-3 rounded-xl border border-[#E8DFD3] bg-[#FAF6F0]/40 text-xs font-medium text-gray-800 focus:outline-none focus:border-[#1F4E4A]"
                >
                  {doctors.map(d => (
                    <option key={d.id} value={d.id}>
                      {d.name} — {d.specialty}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Step 3: Date & Live Time Slots */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                3. Choose Date & Available Time Slot
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="block text-[11px] text-gray-600 mb-1">Appointment Date</label>
                  <input
                    type="date"
                    required
                    min={new Date().toISOString().split('T')[0]}
                    value={selectedDate}
                    onChange={e => setSelectedDate(e.target.value)}
                    className="w-full p-3 rounded-xl border border-[#E8DFD3] bg-[#FAF6F0]/40 text-xs focus:outline-none focus:border-[#1F4E4A]"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-[11px] text-gray-600 mb-1">Available Clinical Slots</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {timeSlots.map(slot => (
                      <button
                        type="button"
                        key={slot.time}
                        onClick={() => setSelectedTime(slot.time)}
                        className={`p-2.5 rounded-lg border text-xs font-medium transition-all cursor-pointer ${
                          selectedTime === slot.time
                            ? 'bg-[#B89368] text-[#1A1815] font-bold border-[#B89368] shadow-xs'
                            : 'bg-[#FAF6F0]/50 border-[#E8DFD3] text-gray-700 hover:bg-white'
                        }`}
                      >
                        {slot.time}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Step 4: Contact Details */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-3 pb-1 border-b border-gray-100">
                4. Patient Contact & Details
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[11px] font-semibold text-gray-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={e => setFullName(e.target.value)}
                    placeholder="e.g. Usman Ahmad"
                    className="w-full p-2.5 rounded-lg border border-[#E8DFD3] bg-[#FAF6F0]/40 text-xs focus:outline-none focus:border-[#1F4E4A]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-gray-700 mb-1">Phone Number (WhatsApp) *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    placeholder="+92 300 1234567"
                    className="w-full p-2.5 rounded-lg border border-[#E8DFD3] bg-[#FAF6F0]/40 text-xs focus:outline-none focus:border-[#1F4E4A]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-gray-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full p-2.5 rounded-lg border border-[#E8DFD3] bg-[#FAF6F0]/40 text-xs focus:outline-none focus:border-[#1F4E4A]"
                  />
                </div>
              </div>

              <div className="mt-3">
                <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                  Reason for Visit / Chief Complaint (Optional)
                </label>
                <input
                  type="text"
                  value={reason}
                  onChange={e => setReason(e.target.value)}
                  placeholder="e.g. Severe sensitivity on upper right molar, interested in veneers quote, broken tooth"
                  className="w-full p-2.5 rounded-lg border border-[#E8DFD3] bg-[#FAF6F0]/40 text-xs focus:outline-none focus:border-[#1F4E4A]"
                />
              </div>
            </div>

            {/* Security Guarantee & Submit */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-gray-100">
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Encrypted transmission to ARK Clinical Operations System</span>
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#1F4E4A] hover:bg-[#173e3b] text-white font-semibold text-xs shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Confirm & Submit Appointment</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}

        {/* Treatment Catalog with Voice Assistant for All Treatments */}
        <TreatmentCatalogModal
          isOpen={isCatalogModalOpen}
          onClose={() => setIsCatalogModalOpen(false)}
          onSelectTreatment={(t) => {
            setSelectedService(t.easyName);
          }}
          selectedTreatmentId={getTreatmentByName(selectedService)?.id}
          isDark={false}
        />
      </div>
    </div>
  );
};
