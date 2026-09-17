import React, { useState } from 'react';
import { NEW_PATIENT_STEPS, INSURANCE_PANELS, PAYMENT_PLANS, CLINIC_METADATA } from '../../data/mockData';
import { IntakeFormData } from '../../types';
import { 
  CheckCircle, FileText, Download, ShieldCheck, CreditCard, 
  Sparkles, HelpCircle, ArrowRight, UserCheck, AlertCircle, Printer 
} from 'lucide-react';

interface NewPatientsSectionProps {
  onBookAppointment: () => void;
}

export const NewPatientsSection: React.FC<NewPatientsSectionProps> = ({ onBookAppointment }) => {
  const [activeTab, setActiveTab] = useState<'journey' | 'intake-form' | 'insurance'>('journey');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState<IntakeFormData>({
    fullName: '',
    phone: '',
    email: '',
    dateOfBirth: '',
    gender: 'Male',
    address: 'Peshawar',
    emergencyContact: '',
    chiefComplaint: '',
    medicalConditions: [],
    allergies: 'None reported',
    currentMedications: 'None',
    previousDentalIssues: '',
    bleedingGums: false,
    teethGrinding: false,
    dentalAnxietyLevel: 'Low',
    insuranceProvider: 'None / Self-pay',
    sehatSahulatCard: false,
    preferredLanguage: 'English',
    consentAgreed: true
  });

  const handleConditionToggle = (condition: string) => {
    setFormData(prev => {
      const exists = prev.medicalConditions.includes(condition);
      return {
        ...prev,
        medicalConditions: exists 
          ? prev.medicalConditions.filter(c => c !== condition)
          : [...prev.medicalConditions, condition]
      };
    });
  };

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  const handlePrintSummary = () => {
    window.print();
  };

  return (
    <div className="w-full bg-[#FAF6F0] py-16 text-[#2B2B2B]" id="new-patients">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-[#B89368] mb-2 block">
            NEW PATIENT EXPERIENCE
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#2B2B2B] tracking-tight">
            Welcome to Calm, Dignified Dental Care
          </h2>
          <p className="text-sm text-gray-600 mt-3 leading-relaxed">
            Your first visit is dedicated to understanding your goals, comprehensive digital diagnostics, and comfortable care planning.
          </p>

          {/* Sub Navigation */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
            <button
              onClick={() => setActiveTab('journey')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold cursor-pointer transition-all ${
                activeTab === 'journey'
                  ? 'bg-[#1F4E4A] text-white shadow-sm'
                  : 'bg-white text-gray-700 border border-[#E8DFD3] hover:bg-[#FAF6F0]'
              }`}
            >
              1. First Visit Journey
            </button>
            <button
              onClick={() => setActiveTab('intake-form')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold cursor-pointer transition-all flex items-center gap-1.5 ${
                activeTab === 'intake-form'
                  ? 'bg-[#1F4E4A] text-white shadow-sm'
                  : 'bg-white text-gray-700 border border-[#E8DFD3] hover:bg-[#FAF6F0]'
              }`}
            >
              <FileText className="w-3.5 h-3.5 text-[#B89368]" />
              <span>2. Online / Downloadable Intake Form</span>
            </button>
            <button
              onClick={() => setActiveTab('insurance')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold cursor-pointer transition-all ${
                activeTab === 'insurance'
                  ? 'bg-[#1F4E4A] text-white shadow-sm'
                  : 'bg-white text-gray-700 border border-[#E8DFD3] hover:bg-[#FAF6F0]'
              }`}
            >
              3. Insurance, Panels & Installments
            </button>
          </div>
        </div>

        {/* Tab 1: First Visit Journey */}
        {activeTab === 'journey' && (
          <div className="space-y-12 animate-fadeIn">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {NEW_PATIENT_STEPS.map((stepItem) => (
                <div 
                  key={stepItem.step}
                  className="bg-white rounded-2xl p-6 border border-[#E8DFD3] shadow-sm relative space-y-3"
                >
                  <span className="text-2xl font-serif font-bold text-[#B89368] opacity-70">
                    {stepItem.step}
                  </span>
                  <h3 className="font-serif font-bold text-base text-[#2B2B2B]">
                    {stepItem.title}
                  </h3>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {stepItem.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Quick Summary Card */}
            <div className="bg-white rounded-2xl p-8 border border-[#B89368]/40 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-8 space-y-2">
                <div className="flex items-center gap-2 text-[#B89368] text-xs font-bold uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Transparent Clinical Policy</span>
                </div>
                <h4 className="font-serif font-bold text-xl text-[#2B2B2B]">
                  No Pressure. No Unnecessary Treatments.
                </h4>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  We believe in conservative, tooth-preserving dentistry. You will view your intraoral digital images on-screen, understand every option clearly, and approve all costs before any clinical treatment commences.
                </p>
              </div>
              <div className="lg:col-span-4 flex flex-col gap-2">
                <button
                  onClick={onBookAppointment}
                  className="w-full py-3 bg-[#1F4E4A] hover:bg-[#173e3b] text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 shadow transition-all cursor-pointer"
                >
                  <span>Book Your First Visit</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setActiveTab('intake-form')}
                  className="w-full py-2.5 bg-[#FAF6F0] hover:bg-[#E8DFD3] text-[#2B2B2B] rounded-xl text-xs font-medium border border-[#E8DFD3] transition-colors cursor-pointer"
                >
                  Pre-Fill Medical History Form
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Online & Downloadable Intake Forms */}
        {activeTab === 'intake-form' && (
          <div className="max-w-4xl mx-auto bg-white rounded-2xl p-6 sm:p-10 border border-[#E8DFD3] shadow-sm animate-fadeIn">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-gray-100">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#B89368] block">
                  ARK DENTAL STUDIO • MEDICAL INTAKE
                </span>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#2B2B2B]">
                  Confidential Patient Registration & Medical History
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrintSummary}
                  className="px-3 py-2 rounded-lg border border-[#E8DFD3] hover:bg-[#FAF6F0] text-xs font-medium text-gray-700 flex items-center gap-1.5 cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5 text-gray-500" />
                  <span>Print / Save PDF</span>
                </button>
              </div>
            </div>

            {formSubmitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 mx-auto flex items-center justify-center">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h4 className="font-serif font-bold text-2xl text-[#2B2B2B]">
                  Intake Record Prepared Successfully!
                </h4>
                <p className="text-xs sm:text-sm text-gray-600 max-w-md mx-auto">
                  Your confidential dental and health questionnaire has been saved for your clinical chart. When you arrive at ARK Dental Studio, our front-desk concierge will have your file pre-loaded.
                </p>
                <div className="pt-4 flex justify-center gap-3">
                  <button
                    onClick={onBookAppointment}
                    className="px-6 py-3 rounded-xl bg-[#1F4E4A] hover:bg-[#173e3b] text-white text-xs font-semibold cursor-pointer"
                  >
                    Proceed to Appointment Booking
                  </button>
                  <button
                    onClick={() => setFormSubmitted(false)}
                    className="px-4 py-3 rounded-xl border border-[#E8DFD3] text-xs font-medium text-gray-700 hover:bg-[#FAF6F0] cursor-pointer"
                  >
                    Edit Responses
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmitForm} className="space-y-6 pt-6 text-xs">
                {/* Personal Information */}
                <div>
                  <h4 className="font-serif font-bold text-sm text-[#2B2B2B] mb-3 pb-1 border-b border-gray-100 flex items-center gap-2">
                    <UserCheck className="w-4 h-4 text-[#B89368]" />
                    1. Patient Identification
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-gray-700 font-medium mb-1">Full Legal Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={e => setFormData({...formData, fullName: e.target.value})}
                        placeholder="e.g. Muhammad Bilal"
                        className="w-full p-2.5 rounded-lg border border-[#E8DFD3] bg-[#FAF6F0]/40 focus:outline-none focus:border-[#1F4E4A]"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-1">Phone (WhatsApp) *</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={e => setFormData({...formData, phone: e.target.value})}
                        placeholder="+92 300 1234567"
                        className="w-full p-2.5 rounded-lg border border-[#E8DFD3] bg-[#FAF6F0]/40 focus:outline-none focus:border-[#1F4E4A]"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-1">Email Address</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={e => setFormData({...formData, email: e.target.value})}
                        placeholder="name@example.com"
                        className="w-full p-2.5 rounded-lg border border-[#E8DFD3] bg-[#FAF6F0]/40 focus:outline-none focus:border-[#1F4E4A]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-3">
                    <div>
                      <label className="block text-gray-700 font-medium mb-1">Date of Birth</label>
                      <input
                        type="date"
                        value={formData.dateOfBirth}
                        onChange={e => setFormData({...formData, dateOfBirth: e.target.value})}
                        className="w-full p-2.5 rounded-lg border border-[#E8DFD3] bg-[#FAF6F0]/40 focus:outline-none focus:border-[#1F4E4A]"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-1">Gender</label>
                      <select
                        value={formData.gender}
                        onChange={e => setFormData({...formData, gender: e.target.value})}
                        className="w-full p-2.5 rounded-lg border border-[#E8DFD3] bg-[#FAF6F0]/40 focus:outline-none focus:border-[#1F4E4A]"
                      >
                        <option>Male</option>
                        <option>Female</option>
                        <option>Prefer not to say</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-1">Emergency Contact Phone</label>
                      <input
                        type="text"
                        value={formData.emergencyContact}
                        onChange={e => setFormData({...formData, emergencyContact: e.target.value})}
                        placeholder="Relative Name & Phone"
                        className="w-full p-2.5 rounded-lg border border-[#E8DFD3] bg-[#FAF6F0]/40 focus:outline-none focus:border-[#1F4E4A]"
                      />
                    </div>
                  </div>
                </div>

                {/* Chief Complaint */}
                <div>
                  <h4 className="font-serif font-bold text-sm text-[#2B2B2B] mb-3 pb-1 border-b border-gray-100 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-[#B89368]" />
                    2. Reason for Visit (Chief Complaint)
                  </h4>
                  <textarea
                    rows={2}
                    value={formData.chiefComplaint}
                    onChange={e => setFormData({...formData, chiefComplaint: e.target.value})}
                    placeholder="Briefly describe your symptoms (e.g. pain in lower left molar, seeking teeth whitening, gap closure, routine check-up)"
                    className="w-full p-2.5 rounded-lg border border-[#E8DFD3] bg-[#FAF6F0]/40 focus:outline-none focus:border-[#1F4E4A]"
                  />
                </div>

                {/* Medical History Checklist */}
                <div>
                  <h4 className="font-serif font-bold text-sm text-[#2B2B2B] mb-2 pb-1 border-b border-gray-100">
                    3. Medical History & Alerts
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
                    {['Diabetes', 'High Blood Pressure', 'Heart Condition', 'Asthma', 'Bleeding Disorder', 'Pregnancy', 'Artificial Joints', 'Hepatitis B/C'].map((cond) => (
                      <label key={cond} className="flex items-center gap-2 p-2 rounded-lg bg-[#FAF6F0]/60 border border-[#E8DFD3] cursor-pointer text-gray-700">
                        <input
                          type="checkbox"
                          checked={formData.medicalConditions.includes(cond)}
                          onChange={() => handleConditionToggle(cond)}
                          className="rounded text-[#1F4E4A]"
                        />
                        <span>{cond}</span>
                      </label>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 font-medium mb-1">Known Drug Allergies (Penicillin, Aspirin, Latex, etc.)</label>
                      <input
                        type="text"
                        value={formData.allergies}
                        onChange={e => setFormData({...formData, allergies: e.target.value})}
                        className="w-full p-2.5 rounded-lg border border-[#E8DFD3] bg-[#FAF6F0]/40 focus:outline-none focus:border-[#1F4E4A]"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-1">Dental Anxiety Level</label>
                      <select
                        value={formData.dentalAnxietyLevel}
                        onChange={e => setFormData({...formData, dentalAnxietyLevel: e.target.value as any})}
                        className="w-full p-2.5 rounded-lg border border-[#E8DFD3] bg-[#FAF6F0]/40 focus:outline-none focus:border-[#1F4E4A]"
                      >
                        <option value="Low">Low (Comfortable with routine dental visits)</option>
                        <option value="Moderate">Moderate (A bit nervous, prefer gentle explanation)</option>
                        <option value="High">High (Dental phobia, request numbing gel & calm pace)</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Consent & Privacy */}
                <div className="p-4 rounded-xl bg-[#FAF6F0] border border-[#E8DFD3] space-y-3">
                  <label className="flex items-start gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      required
                      checked={formData.consentAgreed}
                      onChange={e => setFormData({...formData, consentAgreed: e.target.checked})}
                      className="mt-0.5 rounded text-[#1F4E4A]"
                    />
                    <span className="text-gray-600 leading-relaxed text-[11px]">
                      I certify that the information provided above is correct to the best of my knowledge. I authorize ARK Dental Studio clinicians to perform necessary diagnostic examinations (including digital X-rays) for treatment planning under clinical confidentiality standards.
                    </span>
                  </label>
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-xl bg-[#1F4E4A] hover:bg-[#173e3b] text-white font-semibold shadow transition-all cursor-pointer"
                  >
                    Save & Submit Intake Record
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* Tab 3: Insurance, Panels & 0% Installment Plans */}
        {activeTab === 'insurance' && (
          <div className="space-y-8 animate-fadeIn">
            {/* Accepted Panels */}
            <div className="bg-white rounded-2xl p-8 border border-[#E8DFD3] shadow-sm">
              <h3 className="font-serif font-bold text-xl text-[#2B2B2B] mb-2 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-[#B89368]" />
                Accepted Health Insurance Panels & Institutional Partners
              </h3>
              <p className="text-xs text-gray-600 mb-6">
                ARK Dental Studio collaborates with leading national insurance carriers and the Khyber Pakhtunkhwa Sehat Sahulat health card for eligible procedures.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {INSURANCE_PANELS.map((panel, pIdx) => (
                  <div key={pIdx} className="p-4 rounded-xl bg-[#FAF6F0]/60 border border-[#E8DFD3] space-y-1">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                      <h4 className="font-semibold text-xs text-[#2B2B2B]">{panel.name}</h4>
                    </div>
                    <p className="text-[11px] text-gray-600 pl-6">{panel.note}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment Plans */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {PAYMENT_PLANS.map((plan, plIdx) => (
                <div key={plIdx} className="bg-white rounded-2xl p-6 border border-[#E8DFD3] shadow-sm space-y-2">
                  <span className="text-xs font-bold text-[#B89368] bg-[#B89368]/10 px-2.5 py-0.5 rounded">
                    Flexible Financing
                  </span>
                  <h4 className="font-serif font-bold text-base text-[#2B2B2B]">
                    {plan.title}
                  </h4>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {plan.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
