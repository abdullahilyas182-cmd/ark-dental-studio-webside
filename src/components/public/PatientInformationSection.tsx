import React, { useState } from 'react';
import { PATIENT_PREPARATION_GUIDES, CLINIC_METADATA } from '../../data/mockData';
import { 
  FileText, ShieldCheck, HeartPulse, AlertCircle, Phone, 
  CheckCircle2, Clock, Droplets, Utensils, HelpCircle, ChevronRight 
} from 'lucide-react';

interface PatientInformationSectionProps {
  onBookConsultation?: () => void;
}

export const PatientInformationSection: React.FC<PatientInformationSectionProps> = ({ onBookConsultation }) => {
  const [activeTab, setActiveTab] = useState<'consultation' | 'surgery' | 'aftercare' | 'emergency'>('consultation');

  return (
    <section id="patient-info" className="py-20 md:py-24 bg-[#FAF7F2] text-[#1C1A17] border-t border-[#E8DFD3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mb-12">
          <p className="text-[11px] font-semibold tracking-[0.25em] text-[#8C8275] uppercase mb-2">
            PATIENT INFORMATION & SURGICAL GUIDE
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bodoni font-normal tracking-tight text-[#1C1A17] mb-4">
            Clear Guidance at Every Step
          </h2>
          <p className="text-sm text-[#5C5346] font-light leading-relaxed">
            Preparation and structured aftercare are vital to comfortable healing and optimal surgical outcomes. Review our patient protocols below or contact our team if you have any questions.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mb-10 border-b border-[#E8DFD3] pb-4">
          {[
            { id: 'consultation', label: 'Preparing for Consultation', icon: FileText },
            { id: 'surgery', label: 'Preparing for Surgery', icon: ShieldCheck },
            { id: 'aftercare', label: 'Aftercare & Recovery Protocol', icon: HeartPulse },
            { id: 'emergency', label: 'When to Contact Clinic', icon: AlertCircle },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-sm text-xs font-medium tracking-wider uppercase transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#1C1A17] text-white shadow-sm'
                    : 'bg-white text-[#5C5346] border border-[#E8DFD3] hover:bg-[#FAF7F2]'
                }`}
              >
                <Icon className="w-3.5 h-3.5 text-[#B59975]" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Cards */}
        <div className="bg-white border border-[#E8DFD3] rounded-sm p-6 sm:p-10 shadow-sm">
          {activeTab === 'consultation' && (
            <div className="space-y-6">
              <div className="max-w-xl">
                <span className="text-[11px] font-semibold tracking-[0.2em] text-[#8C8275] uppercase block mb-1">
                  Your First Visit
                </span>
                <h3 className="font-bodoni text-2xl text-[#1C1A17]">
                  What to Expect During Your Initial Consultation
                </h3>
                <p className="text-xs text-[#5C5346] mt-2 leading-relaxed">
                  Your first appointment with Dr. Muhammad Ali Riaz Khan is dedicated to listening, thorough diagnostic evaluation, and transparent discussion of your treatment choices.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                <div className="p-5 bg-[#FAF7F2] rounded-sm border border-[#E8DFD3] space-y-3">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-[#1C1A17] flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#B59975]" />
                    What to Bring With You
                  </h4>
                  <ul className="space-y-2 text-xs text-[#5C5346] leading-relaxed">
                    <li>• Previous dental X-rays, OPG scans, or CT DICOM disks if available</li>
                    <li>• Referral letter or clinical notes from your dentist or medical doctor</li>
                    <li>• Comprehensive list of all current medications, vitamins, and dosages</li>
                    <li>• Valid photo identification</li>
                  </ul>
                </div>

                <div className="p-5 bg-[#FAF7F2] rounded-sm border border-[#E8DFD3] space-y-3">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-[#1C1A17] flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#B59975]" />
                    Appointment Structure
                  </h4>
                  <ul className="space-y-2 text-xs text-[#5C5346] leading-relaxed">
                    <li>• <strong>Unhurried Dialogue:</strong> Discussion of symptoms, dental history, and personal goals</li>
                    <li>• <strong>Targeted 3D Imaging:</strong> Low-dose digital scans if necessary to evaluate nerve canals or bone volume</li>
                    <li>• <strong>Written Roadmap:</strong> Transparent explanation of treatment choices, timings, and fees</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'surgery' && (
            <div className="space-y-6">
              <div className="max-w-xl">
                <span className="text-[11px] font-semibold tracking-[0.2em] text-[#8C8275] uppercase block mb-1">
                  Surgical Protocols
                </span>
                <h3 className="font-bodoni text-2xl text-[#1C1A17]">
                  Pre-Operative Guidelines & Anaesthesia
                </h3>
                <p className="text-xs text-[#5C5346] mt-2 leading-relaxed">
                  Careful preparation ensures your procedure is completely comfortable and free of unforeseen complications.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                <div className="p-5 bg-[#FAF7F2] rounded-sm border border-[#E8DFD3] space-y-2">
                  <span className="text-[10px] font-semibold tracking-widest text-[#B59975] uppercase block">
                    FASTING GUIDELINES
                  </span>
                  <h4 className="text-sm font-semibold text-[#1C1A17]">For Conscious Sedation</h4>
                  <p className="text-xs text-[#5C5346] leading-relaxed">
                    Do not eat solid foods or drink milk/juices for 6 hours prior to your scheduled surgery. Clear water may be taken up to 2 hours before appointment.
                  </p>
                </div>

                <div className="p-5 bg-[#FAF7F2] rounded-sm border border-[#E8DFD3] space-y-2">
                  <span className="text-[10px] font-semibold tracking-widest text-[#B59975] uppercase block">
                    CLOTHING & COMFORT
                  </span>
                  <h4 className="text-sm font-semibold text-[#1C1A17]">What to Wear</h4>
                  <p className="text-xs text-[#5C5346] leading-relaxed">
                    Wear loose, comfortable clothing with short sleeves to facilitate blood pressure and vital signs monitoring. Avoid makeup and heavy jewelry.
                  </p>
                </div>

                <div className="p-5 bg-[#FAF7F2] rounded-sm border border-[#E8DFD3] space-y-2">
                  <span className="text-[10px] font-semibold tracking-widest text-[#B59975] uppercase block">
                    CHAPERONE & TRANSIT
                  </span>
                  <h4 className="text-sm font-semibold text-[#1C1A17]">Accompanying Adult</h4>
                  <p className="text-xs text-[#5C5346] leading-relaxed">
                    If you are having sedation, a responsible adult companion must escort you to and from the clinic and remain available during your recovery.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'aftercare' && (
            <div className="space-y-6">
              <div className="max-w-xl">
                <span className="text-[11px] font-semibold tracking-[0.2em] text-[#8C8275] uppercase block mb-1">
                  Post-Operative Healing
                </span>
                <h3 className="font-bodoni text-2xl text-[#1C1A17]">
                  Aftercare, Diet & Swelling Management
                </h3>
                <p className="text-xs text-[#5C5346] mt-2 leading-relaxed">
                  The initial 48 hours are essential for biological blood clot stability and soft tissue healing.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
                <div className="p-4 bg-[#FAF7F2] rounded-sm border border-[#E8DFD3] space-y-2">
                  <div className="flex items-center gap-2 text-[#B59975] text-xs font-semibold uppercase">
                    <Droplets className="w-4 h-4" />
                    <span>Bleeding & Gauze</span>
                  </div>
                  <p className="text-xs text-[#5C5346] leading-relaxed">
                    Keep steady, gentle biting pressure on the sterile gauze pack for 45 minutes. A slight pinkish tinge in saliva is normal for the first 24 hours.
                  </p>
                </div>

                <div className="p-4 bg-[#FAF7F2] rounded-sm border border-[#E8DFD3] space-y-2">
                  <div className="flex items-center gap-2 text-[#B59975] text-xs font-semibold uppercase">
                    <Clock className="w-4 h-4" />
                    <span>Swelling Control</span>
                  </div>
                  <p className="text-xs text-[#5C5346] leading-relaxed">
                    Apply an ice pack to the cheek: 20 minutes on, 20 minutes off, for the first 36 hours. Mild swelling typically peaks on Day 2 or 3 and subsides smoothly.
                  </p>
                </div>

                <div className="p-4 bg-[#FAF7F2] rounded-sm border border-[#E8DFD3] space-y-2">
                  <div className="flex items-center gap-2 text-[#B59975] text-xs font-semibold uppercase">
                    <Utensils className="w-4 h-4" />
                    <span>Dietary Advice</span>
                  </div>
                  <p className="text-xs text-[#5C5346] leading-relaxed">
                    Eat soft, cool or lukewarm foods (yogurt, pureed soups, smoothies, soft rice). Do NOT use a drinking straw or consume hot spicy foods.
                  </p>
                </div>

                <div className="p-4 bg-[#FAF7F2] rounded-sm border border-[#E8DFD3] space-y-2">
                  <div className="flex items-center gap-2 text-[#B59975] text-xs font-semibold uppercase">
                    <HeartPulse className="w-4 h-4" />
                    <span>Oral Hygiene</span>
                  </div>
                  <p className="text-xs text-[#5C5346] leading-relaxed">
                    Do not spit or rinse vigorously on Day 1. From Day 2 onwards, gently rinse with warm salt water (1/2 tsp salt in warm water) after every meal.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'emergency' && (
            <div className="space-y-6">
              <div className="max-w-xl">
                <span className="text-[11px] font-semibold tracking-[0.2em] text-red-700 uppercase block mb-1">
                  Urgent Care Protocol
                </span>
                <h3 className="font-bodoni text-2xl text-[#1C1A17]">
                  When to Contact Our Surgical Team Immediately
                </h3>
                <p className="text-xs text-[#5C5346] mt-2 leading-relaxed">
                  While complications are rare with minimally invasive surgical protocols, our dedicated team is always accessible if urgent concerns arise.
                </p>
              </div>

              <div className="p-6 bg-red-50/50 border border-red-200 rounded-sm space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-red-800 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-600" />
                  Key Symptoms Requiring Immediate Attention:
                </h4>
                <ul className="space-y-2 text-xs text-red-900 leading-relaxed">
                  <li>• Continuous active bleeding from the socket that does not stop after 30 minutes of firm gauze pressure</li>
                  <li>• Severe pain that is not relieved by the prescribed pain medications</li>
                  <li>• Marked facial swelling that begins increasing rapidly after the 3rd post-operative day</li>
                  <li>• High fever (above 101°F / 38.3°C) or difficulty breathing or swallowing</li>
                </ul>

                <div className="pt-4 border-t border-red-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] tracking-widest uppercase font-semibold text-red-700 block">
                        SURGICAL EMERGENCY HOTLINE
                      </span>
                      <a href={CLINIC_METADATA.phoneTel} className="text-base font-bold text-[#1C1A17] hover:text-red-700">
                        {CLINIC_METADATA.phone}
                      </a>
                    </div>
                  </div>
                  <span className="text-xs text-[#5C5346]">
                    Clinic location: {CLINIC_METADATA.location}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
