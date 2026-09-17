import React from 'react';
import { DOCTORS, CLINIC_METADATA } from '../../data/mockData';
import { useClinic } from '../../context/ClinicContext';
import { Award, Calendar, CheckCircle, Clock, Globe, Shield, Star, Sparkles, MapPin, Phone, MessageSquare } from 'lucide-react';

interface DentistTeamSectionProps {
  onBookWithDoctor: (doctorId: string, doctorName: string) => void;
}

export const DentistTeamSection: React.FC<DentistTeamSectionProps> = ({ onBookWithDoctor }) => {
  const { openDoctorLoginModal } = useClinic();
  const founderDoctor = DOCTORS.find((d) => d.id === 'doc-1') || DOCTORS[0];

  return (
    <div className="w-full bg-[#FAF7F2] py-16 sm:py-24 text-[#2B2B2B]" id="about-doctor">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Dedicated "About Doctor" Section */}
        <section id="dentists" className="scroll-mt-24">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#B59975] mb-2.5 block">
              CONSULTANT DENTAL SURGEON & CLINICAL DIRECTOR
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bodoni font-normal text-[#1C1A17] tracking-tight">
              Dr. Muhammad Ali Riaz Khan
            </h1>
            <div className="w-14 h-[1.5px] bg-[#B59975] mx-auto mt-4 mb-4" />
            <p className="text-sm text-[#6B6357] font-light leading-relaxed max-w-2xl mx-auto">
              Sole Principal Dental Surgeon and Clinical Director of ARK Dental Studio, committed to clinical excellence, surgical precision, and bespoke aesthetic smile transformations.
            </p>
          </div>

          {/* Featured Profile Card - Responsive Mobile & Desktop Layout */}
          <div className="bg-white rounded-3xl border border-[#E8DFD3] shadow-xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
              
              {/* Doctor Portrait Column - Professional Crop & Responsive Styling */}
              <div className="lg:col-span-5 relative bg-[#171513] min-h-[380px] sm:min-h-[460px] lg:min-h-[580px] overflow-hidden group">
                <img
                  src={founderDoctor.avatar}
                  alt={founderDoctor.name}
                  className="w-full h-full object-cover object-top sm:object-center transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                
                {/* Subtle vignette gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#141210]/85 via-transparent to-black/20 pointer-events-none" />

                {/* Floating Badges */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 bg-[#B59975] text-[#141210] text-[11px] font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full shadow-lg">
                    <Sparkles className="w-3.5 h-3.5" />
                    CHIEF CLINICAL SURGEON
                  </span>
                  <span className="text-[10px] uppercase tracking-wider text-amber-200/80 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10 font-medium">
                    KPK Health Licensed
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="bg-[#120F0D]/80 backdrop-blur-md border border-white/10 rounded-xl p-3.5 shadow-xl">
                    <p className="text-[10px] text-[#B59975] font-semibold uppercase tracking-wider">
                      ARK Dental Studio • Peshawar
                    </p>
                    <p className="text-base font-serif font-bold text-white">
                      {founderDoctor.name}
                    </p>
                    <p className="text-xs text-gray-300 font-light mt-0.5">
                      {founderDoctor.degrees}
                    </p>
                  </div>
                </div>
              </div>

              {/* Doctor Details Column */}
              <div className="lg:col-span-7 p-6 sm:p-8 lg:p-12 flex flex-col justify-between space-y-6">
                
                {/* Header Information */}
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-[#FAF4ED] text-[#8C6D46] border border-[#E8DFD3]">
                      Oral & Maxillofacial Surgeon & Clinical Director
                    </span>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-[#F0FDF4] text-emerald-800 border border-emerald-100 flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      4.9 / 5.0 (380+ Verified Reviews)
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-bodoni text-[#1C1A17]">
                    Dr. Muhammad Ali Riaz Khan
                  </h2>
                  <p className="text-xs uppercase tracking-[0.2em] text-[#B59975] font-semibold">
                    Dedicated Dental Professional & Specialist Surgeon
                  </p>

                  <p className="text-xs sm:text-sm text-[#5C5549] leading-relaxed font-light">
                    Dr. Muhammad Ali Riaz Khan is the principal clinical leader and dedicated surgeon at ARK Dental Studio. Combining state-of-the-art dental technology with surgical mastery and a detail-oriented approach, he delivers precise, durable, and natural-looking smile transformations. He continually advances clinical protocols to provide painless, comfortable treatments for every patient.
                  </p>
                </div>

                {/* Urdu Philosophy Section */}
                <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#E8DFD3] text-right">
                  <p className="text-xs sm:text-sm text-[#423C34] font-serif leading-relaxed" dir="rtl">
                    {founderDoctor.bioUrdu}
                  </p>
                </div>

                {/* Key Qualifications & Accreditations */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h3 className="text-[11px] font-bold uppercase tracking-wider text-[#8C8275] flex items-center gap-1.5">
                      <Award className="w-3.5 h-3.5 text-[#B59975]" />
                      Specializations & Degrees
                    </h3>
                    <p className="text-xs text-[#2B2B2B] font-medium leading-relaxed">
                      {founderDoctor.degrees}
                    </p>
                    <p className="text-[11px] text-gray-500">
                      {founderDoctor.experienceYears}+ Years Dedicated Clinical Practice
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-[11px] font-bold uppercase tracking-wider text-[#8C8275] flex items-center gap-1.5">
                      <CheckCircle className="w-3.5 h-3.5 text-[#B59975]" />
                      Fellowships & Memberships
                    </h3>
                    <ul className="space-y-1">
                      {founderDoctor.certifications.map((cert, idx) => (
                        <li key={idx} className="text-xs text-[#2B2B2B] flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#B59975]" />
                          <span>{cert}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Opening Hours & Studio Timings Banner */}
                <div className="p-4 rounded-xl bg-[#FAF4ED] border border-[#E8DFD3] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white border border-[#B59975]/30 flex items-center justify-center text-[#B59975] shrink-0 shadow-xs">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-wider text-[#8C6D46]">
                        Clinic Consultation Hours
                      </p>
                      <p className="text-sm font-semibold text-[#1C1A17]">
                        Monday to Saturday: 9:00 AM – 9:00 PM
                      </p>
                      <p className="text-[11px] text-gray-500">
                        Sunday: Emergency On-Call Only
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href={`tel:${CLINIC_METADATA.phone}`}
                      className="px-3.5 py-2 rounded-lg bg-white border border-[#E8DFD3] text-xs font-semibold text-[#1C1A17] hover:border-[#B59975] flex items-center gap-1.5 transition-colors shadow-2xs"
                    >
                      <Phone className="w-3.5 h-3.5 text-[#B59975]" />
                      <span>{CLINIC_METADATA.phone}</span>
                    </a>
                  </div>
                </div>

                {/* Direct Action Buttons */}
                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => onBookWithDoctor(founderDoctor.id, founderDoctor.name)}
                    className="flex-1 py-3.5 px-6 rounded-xl bg-[#B59975] hover:bg-[#A38865] text-[#141210] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg cursor-pointer"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Book Consultation with Dr. Muhammad Ali Riaz Khan</span>
                  </button>

                  <a
                    href={`https://wa.me/${CLINIC_METADATA.whatsapp.replace(/[^0-9]/g, '')}?text=Hello%20ARK%20Dental,%20I%20would%20like%20to%20consult%20Dr.%20Muhammad%20Ali%20Riaz%20Khan`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3.5 px-5 rounded-xl border border-[#E8DFD3] bg-white hover:bg-[#FAF4ED] text-xs font-semibold text-[#1C1A17] flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4 text-emerald-600" />
                    <span>WhatsApp Inquiry</span>
                  </a>
                </div>

              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};
