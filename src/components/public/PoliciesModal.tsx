import React, { useState } from 'react';
import { CLINIC_METADATA } from '../../data/mockData';
import { X, ShieldCheck, FileCheck, Lock, AlertCircle, Check } from 'lucide-react';

interface PoliciesModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'privacy' | 'consent' | 'terms';
}

export const PoliciesModal: React.FC<PoliciesModalProps> = ({
  isOpen,
  onClose,
  defaultTab = 'privacy'
}) => {
  const [activeTab, setActiveTab] = useState<'privacy' | 'consent' | 'terms'>(defaultTab);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fadeIn">
      <div className="bg-white w-full max-w-3xl max-h-[85vh] rounded-2xl shadow-2xl border border-[#E8DFD3] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-[#1F4E4A] text-white p-5 flex items-center justify-between shrink-0">
          <div>
            <span className="text-[10px] text-[#B89368] font-bold uppercase tracking-widest">
              ARK DENTAL STUDIO • COMPLIANCE & GOVERNANCE
            </span>
            <h3 className="text-xl font-serif font-bold text-white mt-0.5">
              Clinical Privacy & Patient Policies
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-white/70 hover:text-white p-1 cursor-pointer transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selector */}
        <div className="flex border-b border-gray-100 bg-[#FAF6F0] px-6 shrink-0">
          <button
            onClick={() => setActiveTab('privacy')}
            className={`py-3 px-4 text-xs font-semibold cursor-pointer border-b-2 transition-all ${
              activeTab === 'privacy'
                ? 'border-[#1F4E4A] text-[#1F4E4A]'
                : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
          >
            1. Patient Privacy & Data Protection (HIPAA / PMDC)
          </button>
          <button
            onClick={() => setActiveTab('consent')}
            className={`py-3 px-4 text-xs font-semibold cursor-pointer border-b-2 transition-all ${
              activeTab === 'consent'
                ? 'border-[#1F4E4A] text-[#1F4E4A]'
                : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
          >
            2. Photo & Review Consent Policy
          </button>
          <button
            onClick={() => setActiveTab('terms')}
            className={`py-3 px-4 text-xs font-semibold cursor-pointer border-b-2 transition-all ${
              activeTab === 'terms'
                ? 'border-[#1F4E4A] text-[#1F4E4A]'
                : 'border-transparent text-gray-500 hover:text-gray-900'
            }`}
          >
            3. Terms of Service & Cancellation
          </button>
        </div>

        {/* Content Area */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-xs sm:text-sm text-gray-700 leading-relaxed">
          {activeTab === 'privacy' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex items-start gap-3 text-emerald-900">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <p className="text-xs">
                  ARK Dental Studio strictly safeguards patient health information (PHI) in compliance with the Pakistan Medical and Dental Council (PMDC) ethical guidelines and international HIPAA privacy principles.
                </p>
              </div>

              <h4 className="font-serif font-bold text-base text-[#2B2B2B]">
                Confidentiality of Clinical Records
              </h4>
              <p>
                All digital radiographies, intraoral scans, medical histories, and diagnostic charts stored in the ARK Dental Studio operating system are encrypted both in transit and at rest. Access is strictly limited to authorized attending dentists, dental assistants, and administrative coordinators bound by legal medical confidentiality.
              </p>

              <h4 className="font-serif font-bold text-base text-[#2B2B2B]">
                Data We Collect & Why
              </h4>
              <ul className="list-disc pl-5 space-y-1 text-xs">
                <li><strong>Identification Details:</strong> Full name, telephone, email address, and emergency contacts to facilitate scheduling and clinical follow-ups.</li>
                <li><strong>Medical & Pharmacological History:</strong> Systemic conditions (e.g. hypertension, diabetes, cardiac issues), current medications, and drug allergies to prevent adverse anesthetic or surgical events.</li>
                <li><strong>Diagnostic Imagery:</strong> Low-dose digital periapical and panoramic X-rays, 3D intraoral scans, and clinical photographs required for diagnosis and surgical planning.</li>
              </ul>

              <h4 className="font-serif font-bold text-base text-[#2B2B2B]">
                Non-Disclosure to Third Parties
              </h4>
              <p>
                We never sell, rent, or lease patient data to marketing agencies. Data is shared exclusively with certified dental laboratories (for prosthesis fabrication) or your designated insurance provider upon your explicit written authorization.
              </p>
            </div>
          )}

          {activeTab === 'consent' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-3 text-amber-900">
                <FileCheck className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <p className="text-xs">
                  Photographs and before-and-after smile documentation require explicit written consent. Patients retain the full right to decline or revoke photographic release at any time.
                </p>
              </div>

              <h4 className="font-serif font-bold text-base text-[#2B2B2B]">
                Smile Gallery & Clinical Photography Protocol
              </h4>
              <p>
                As part of our commitment to transparent dentistry, our surgeons document treatment progressions. We only publish non-identifiable smile photographs on our website or clinical portfolio after the patient has executed our written <em>Patient Media Release Form</em>.
              </p>

              <h4 className="font-serif font-bold text-base text-[#2B2B2B]">
                Patient Reviews & Testimonials
              </h4>
              <p>
                All patient reviews displayed on our marketing site are sourced from verified Google Business profiles or written feedback provided during post-operative follow-up consultations. Reviews are never incentivized or fabricated.
              </p>
            </div>
          )}

          {activeTab === 'terms' && (
            <div className="space-y-4">
              <h4 className="font-serif font-bold text-base text-[#2B2B2B]">
                Appointment Etiquette & Cancellation
              </h4>
              <p>
                ARK Dental Studio reserves a dedicated surgery operatory and dental surgeon exclusively for your scheduled hour. We kindly ask for at least <strong>24 hours notice</strong> if you need to reschedule or cancel your consultation.
              </p>

              <h4 className="font-serif font-bold text-base text-[#2B2B2B]">
                Financial Estimates & Fee Transparency
              </h4>
              <p>
                Before commencing any procedure, patients receive a written or digital treatment plan outlining all associated costs, laboratory fees, and warranty periods. There are no hidden charges.
              </p>

              <h4 className="font-serif font-bold text-base text-[#2B2B2B]">
                Emergency Procedures
              </h4>
              <p>
                Emergency triage visits outside regular hours are prioritized based on clinical acute severity (trauma, uncontrolled bleeding, severe acute swelling).
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#FAF6F0] border-t border-gray-100 flex items-center justify-between shrink-0">
          <span className="text-[11px] text-gray-500">
            Last revised: March 2026 • ARK Dental Studio, Peshawar
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#1F4E4A] hover:bg-[#173e3b] text-white text-xs font-semibold cursor-pointer"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
};
