import React, { useState } from 'react';
import { 
  CLINIC_METADATA, DOCTORS, MAJOR_SERVICE_CATEGORIES, 
  PATIENT_JOURNEY_STEPS, WHY_CHOOSE_US_ITEMS, CLINICAL_CASES, 
  TESTIMONIALS 
} from '../../data/mockData';
import { MajorServiceCategory } from '../../types';
import { ServiceDetailModal } from './ServiceDetailModal';
import { ClinicFacilitiesSection } from './ClinicFacilitiesSection';
import { BeforeAfterSlider } from './BeforeAfterSlider';
import { ArkLogo } from '../common/ArkLogo';
import { useClinic } from '../../context/ClinicContext';
import { 
  ArrowRight, Phone, MapPin, Clock, ShieldCheck, 
  Sparkles, CheckCircle2, ChevronDown, ChevronUp, 
  Calendar, Stethoscope, HeartPulse, Activity, MessageSquare 
} from 'lucide-react';

interface HeroSectionProps {
  onBookAppointment: (serviceName?: string) => void;
  onOpenWhatsApp: () => void;
  onNavigateTab: (tab: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onBookAppointment,
  onOpenWhatsApp,
  onNavigateTab
}) => {
  const { theme } = useClinic();
  const [selectedCategoryModal, setSelectedCategoryModal] = useState<MajorServiceCategory | null>(null);
  const founderDoctor = DOCTORS.find(d => d.id === 'doc-1') || DOCTORS[0];

  return (
    <div className="w-full">
      {/* 1. HERO SECTION - Exact hierarchy with authentic reception lobby background */}
      <section className="relative min-h-[92vh] lg:min-h-screen flex flex-col justify-between text-white overflow-hidden bg-[#100E0C]">
        {/* Full-bleed clinic interior background with ambient warmth & slow drift */}
        <div 
          className="absolute -inset-4 bg-cover bg-center md:bg-[center_top] transform animate-kenburns-slow opacity-90 brightness-100 contrast-105 pointer-events-none"
          style={{
            backgroundImage: `url('/images/ark_reception_exact.jpg')`
          }}
        />

        {/* Dull Moving Texture Layer */}
        <div 
          className="absolute -inset-10 bg-dull-noise animate-dull-texture pointer-events-none opacity-25 mix-blend-overlay"
        />

        {/* Subtle Ambient Backlight Glow behind clinic logo sign */}
        <div 
          className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-[#B59975]/25 blur-[140px] pointer-events-none animate-ambient-pulse"
        />

        {/* Architectural gradient overlays crafted so reception desk & neon tooth stay clear while text is crisp */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0C0A09]/92 via-[#0C0A09]/65 to-[#0C0A09]/25 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#141210] via-transparent to-black/45 pointer-events-none" />

        {/* Hero Content */}
        <div className="relative max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16 lg:pt-36 lg:pb-20 flex-1 flex flex-col justify-center">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Refined Typography & Actions */}
            <div className="lg:col-span-7 max-w-2xl space-y-6">
              
              {/* Doctor & Clinic Identification Badge */}
              <div className="flex flex-wrap items-center gap-3">
                <ArkLogo size="md" showText={false} />
                <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-black/45 backdrop-blur-md border border-[#B59975]/40 text-[#D8BE9B] shadow-[0_4px_20px_rgba(0,0,0,0.3)] text-[11px] font-medium tracking-[0.22em] uppercase">
                  <span className="w-2 h-2 rounded-full bg-[#4ADE80] animate-pulse" />
                  <Stethoscope className="w-3.5 h-3.5 text-[#B59975]" />
                  <span>DR. MUHAMMAD ALI RIAZ KHAN</span>
                  <span className="text-white/30">•</span>
                  <span className="text-white/80">ORAL & MAXILLOFACIAL SURGEON</span>
                </div>
              </div>

              {/* Main Headline in Unified Luxury Bodoni Typography */}
              <h1 className="text-4xl sm:text-6xl lg:text-[68px] xl:text-[74px] font-bodoni font-normal text-white tracking-tight leading-[1.08] drop-shadow-xl">
                Where Surgical Mastery Meets the Splendor of a{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFFDF9] via-[#E8CEAC] to-[#BA935D]">
                  Royal Smile.
                </span>
              </h1>

              {/* Supporting Copy with refined left accent line */}
              <div className="border-l-2 border-[#B59975]/60 pl-4 py-0.5">
                <p className="text-sm sm:text-base text-gray-200 font-light leading-relaxed">
                  Expert surgical precision and bespoke facial aesthetics in Peshawar, uniting multidisciplinary mastery with a calm, patient-centred experience.
                </p>
              </div>

              {/* Clinic Service Feature Chips */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                {[
                  'Consultation Suite',
                  'Dental Implants',
                  'Facial Trauma & Jaw Surgery',
                  'Smile Makeovers'
                ].map((tag, i) => (
                  <span 
                    key={i}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 hover:bg-white/15 border border-white/15 backdrop-blur-sm text-[11px] text-gray-300 transition-colors"
                  >
                    <Sparkles className="w-3 h-3 text-[#B59975]" />
                    <span>{tag}</span>
                  </span>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-3">
                <button
                  id="heroBookConsultationBtn"
                  onClick={() => onBookAppointment()}
                  className="inline-flex items-center gap-2.5 bg-[#B59975] hover:bg-[#C5A882] text-[#141210] font-semibold px-7 py-4 rounded-sm shadow-[0_10px_30px_rgba(181,153,117,0.35)] hover:shadow-[0_15px_35px_rgba(181,153,117,0.5)] transition-all cursor-pointer text-xs tracking-wider uppercase group"
                >
                  <span>Book a Consultation</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>

                <button
                  onClick={() => onOpenWhatsApp()}
                  className="inline-flex items-center gap-2 px-6 py-4 rounded-sm border border-[#25D366]/40 hover:border-[#25D366] text-white hover:bg-[#25D366]/10 text-xs font-medium tracking-wider uppercase transition-colors cursor-pointer backdrop-blur-xs"
                >
                  <MessageSquare className="w-4 h-4 text-[#25D366]" />
                  <span>WhatsApp Inquiry</span>
                </button>

                <button
                  onClick={() => {
                    const el = document.getElementById('areas-of-expertise');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-2 px-6 py-4 rounded-sm border border-white/20 hover:border-white text-white hover:bg-white/5 text-xs font-medium tracking-wider uppercase transition-colors cursor-pointer"
                >
                  <span>Explore Services</span>
                </button>
              </div>

            </div>

            {/* Right Column: Exact Reception & Executive Suite Image Showcase */}
            <div className="lg:col-span-5 relative mt-6 lg:mt-0 flex justify-center lg:justify-end">
              <div className="relative group w-full max-w-md rounded-2xl overflow-hidden border border-[#B59975]/40 bg-[#141210]/90 backdrop-blur-xl p-2.5 sm:p-3 shadow-[0_25px_60px_rgba(0,0,0,0.7)] transition-all duration-500 hover:border-[#B59975]/70 hover:shadow-[0_30px_70px_rgba(181,153,117,0.3)]">
                
                {/* Frame with Image */}
                <div className="relative aspect-square rounded-xl overflow-hidden bg-black/60 shadow-inner">
                  <img
                    id="heroUploadedReceptionPhoto"
                    src="/images/ark_reception_exact.jpg"
                    alt="Dr. Muhammad Ali Riaz Khan - ARK Dental Studio Reception & Executive Suite"
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Subtle dull texture overlay on image */}
                  <div className="absolute inset-0 bg-dull-noise animate-dull-texture opacity-20 mix-blend-overlay pointer-events-none" />

                  {/* Luxury Vignette gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent pointer-events-none" />

                  {/* Top Floating Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/70 border border-white/15 backdrop-blur-md text-[10px] font-medium text-white shadow-lg">
                      <span className="w-2 h-2 rounded-full bg-[#4ADE80] animate-pulse" />
                      <span className="tracking-wider uppercase">ARK Dental Studio</span>
                    </div>
                    <span className="text-[10px] text-[#D8BE9B] font-serif tracking-widest uppercase px-2.5 py-1 rounded-full bg-black/70 border border-[#B59975]/30 backdrop-blur-md">
                      Executive Suite
                    </span>
                  </div>

                  {/* Bottom Information overlay */}
                  <div className="absolute bottom-3 left-3 right-3 space-y-1 pointer-events-none">
                    <div className="text-white font-serif text-sm sm:text-base font-medium tracking-wide drop-shadow-md">
                      Dr. Muhammad Ali Riaz Khan
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-gray-300">
                      <span className="text-[#D8BE9B] font-light">Oral & Maxillofacial Surgeon</span>
                      <span className="text-xs text-gray-400">Peshawar</span>
                    </div>
                  </div>
                </div>

                {/* Micro details bar below photo */}
                <div className="px-2 pt-2.5 pb-0.5 flex items-center justify-between text-[11px] text-gray-300">
                  <div className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#B59975]" />
                    <span>Reception Lounge & Suite</span>
                  </div>
                  <span className="text-[#B59975] font-medium">Bespoke Precision</span>
                </div>

              </div>
            </div>

          </div>
        </div>

        {/* Quick Contact & Address Bar */}
        <div className="relative border-t border-white/10 bg-black/50 backdrop-blur-md py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#B59975]/20 flex items-center justify-center text-[#B59975] shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-gray-400 block">Direct Consultations</span>
                  <a href={CLINIC_METADATA.phoneTel} className="text-sm font-semibold text-white hover:text-[#B59975]">
                    {CLINIC_METADATA.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#B59975]/20 flex items-center justify-center text-[#B59975] shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-gray-400 block">Clinic Location</span>
                  <span className="text-xs text-gray-200">
                    {CLINIC_METADATA.location}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#B59975]/20 flex items-center justify-center text-[#B59975] shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-gray-400 block">Consultation Hours</span>
                  <span className="text-xs text-[#B59975] font-medium">
                    {CLINIC_METADATA.timings}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SECTION 2: SPECIALIST INTRODUCTION / "Meet Your Surgeon" */}
      <section id="meet-surgeon" className="py-20 md:py-28 bg-[#FAF7F2] text-[#1C1A17] border-b border-[#E8DFD3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left: Consultation Suite & Ambient Architectural Framing */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-lg overflow-hidden aspect-4/5 shadow-2xl border border-[#D9CEBF] bg-[#171513]">
                <img
                  id="meet-surgeon-photo"
                  src="/images/dr_khan_actual_uploaded.jpg"
                  alt={`Dr. ${founderDoctor.name} - Oral & Maxillofacial Surgeon in Surgery`}
                  className="w-full h-full object-cover object-center"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            {/* Right: Content & Credentials */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <p className="text-[11px] font-semibold tracking-[0.25em] text-[#8C8275] uppercase mb-2">
                  MEET YOUR SURGEON
                </p>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bodoni font-normal text-[#1C1A17] tracking-tight">
                  Specialist expertise. Personalised care.
                </h2>
                <div className="w-12 h-[1px] bg-[#B59975] mt-4 mb-5" />
                <h3 className="text-sm font-semibold uppercase tracking-wider text-[#B59975]">
                  {founderDoctor.name} — Oral & Maxillofacial Surgeon & Clinical Director
                </h3>
              </div>

              <div className="space-y-4 text-sm text-[#5C5346] font-light leading-relaxed">
                <p>
                  With extensive hospital surgical fellowship qualifications and 15+ years of dedicated practice, Dr. Muhammad Ali Riaz Khan provides specialist surgical and reconstructive care for the mouth, jaws, and face.
                </p>
                <p>
                  His clinical philosophy centres on meticulous pre-surgical planning using low-dose 3D CBCT volumetric imaging, minimally invasive techniques for rapid healing, and taking the time to listen so you understand every stage of your care.
                </p>
                <p>
                  Whether addressing impacted wisdom teeth, complex extractions, bone augmentation, or multidisciplinary smile rehabilitation, you will receive compassionate care designed around your comfort and health.
                </p>
              </div>

              {/* Surgical Credentials Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {founderDoctor.certifications.map((cert, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 p-3 rounded-sm bg-white border border-[#E8DFD3] text-xs font-medium text-[#2C2722]">
                    <CheckCircle2 className="w-4 h-4 text-[#B59975] shrink-0" />
                    <span>{cert}</span>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => onNavigateTab('dentists')}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-sm bg-[#1C1A17] hover:bg-[#2F2B26] text-white text-xs font-medium tracking-wider uppercase transition-colors cursor-pointer"
                >
                  <span>Learn More About Me</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => onBookAppointment()}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-sm bg-[#B59975] hover:bg-[#A38865] text-[#141210] text-xs font-semibold tracking-wider uppercase transition-colors cursor-pointer"
                >
                  <span>Book a Consultation</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SECTION 3 & 4: AREAS OF EXPERTISE / 5 Major Categories Treatment Directory */}
      <section id="areas-of-expertise" className="relative py-20 md:py-28 text-white overflow-hidden">
        {/* Warm Brown Botanical Texture Background */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('/images/botanical_brown_leaves.jpg')` }}
        />
        {/* Deep Architectural Warm Brown Scrim Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1C140E]/90 via-[#261A12]/85 to-[#1C140E]/95" />
        <div className="absolute inset-0 bg-[#2A1D15]/40 mix-blend-multiply" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-[11px] font-semibold tracking-[0.25em] text-[#B59975] uppercase mb-2">
              AREAS OF EXPERTISE
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bodoni font-normal text-white tracking-tight">
              Our Services
            </h2>
            <div className="w-16 h-0.5 bg-[#B59975] mx-auto mt-4 mb-3" />
            <p className="text-sm text-gray-300 mt-3 font-light leading-relaxed">
              Comprehensive care, from diagnosis through treatment and restoration.
            </p>
          </div>

          {/* 5 Major Service Categories Directory Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {MAJOR_SERVICE_CATEGORIES.map((cat, idx) => {
              const isPrimary = cat.featured;
              return (
                <div
                  key={cat.id}
                  className={`p-7 rounded-sm border transition-all flex flex-col justify-between backdrop-blur-md ${
                    isPrimary 
                      ? 'bg-[#1D1510]/90 border-[#B59975] md:col-span-2 lg:col-span-1 shadow-2xl ring-1 ring-[#B59975]/50' 
                      : 'bg-[#150F0B]/80 border-white/15 hover:border-[#B59975]/70 hover:bg-[#1D1510]/90 shadow-xl'
                  }`}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-semibold tracking-[0.22em] text-[#B59975] uppercase px-2.5 py-0.5 rounded-xs bg-[#B59975]/15 border border-[#B59975]/30">
                        {cat.subtitle}
                      </span>
                      {isPrimary && (
                        <span className="text-[10px] font-semibold tracking-wider text-[#141210] bg-[#B59975] px-2 py-0.5 rounded-xs uppercase">
                          Featured
                        </span>
                      )}
                    </div>

                    <h3 className="font-bodoni text-2xl font-normal text-white leading-tight">
                      {cat.title}
                    </h3>

                    <p className="text-xs text-gray-300 font-light leading-relaxed">
                      {cat.tagline}
                    </p>

                    {/* Subcategories list */}
                    <div className="pt-2 border-t border-white/10 space-y-1.5">
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-[#B59975] block mb-2">
                        Key Treatments:
                      </span>
                      {cat.subcategories.slice(0, 4).map((sub, sIdx) => (
                        <div key={sIdx} className="flex items-center gap-2 text-xs text-gray-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#B59975]" />
                          <span>{sub}</span>
                        </div>
                      ))}
                      {cat.subcategories.length > 4 && (
                        <span className="text-[11px] text-gray-400 italic block pt-1">
                          + {cat.subcategories.length - 4} more specialized procedures
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="pt-6 mt-6 border-t border-white/10">
                    <button
                      onClick={() => setSelectedCategoryModal(cat)}
                      className="w-full inline-flex items-center justify-between px-4 py-3 rounded-sm bg-[#B59975] hover:bg-[#A38865] text-[#141210] text-xs font-semibold tracking-wider uppercase transition-colors cursor-pointer group shadow-md"
                    >
                      <span>Explore Procedure Details</span>
                      <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. SECTION 7: YOUR TREATMENT PHILOSOPHY (The warm editorial statement) */}
      <section className="py-24 md:py-32 bg-[#171412] text-white relative overflow-hidden border-y border-white/10">
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <div className="w-12 h-12 rounded-full border border-[#B59975]/40 flex items-center justify-center text-[#B59975] mx-auto bg-white/5">
            <HeartPulse className="w-6 h-6" />
          </div>

          <blockquote className="text-3xl sm:text-4xl lg:text-5xl font-bodoni font-normal text-white tracking-tight leading-snug">
            “Exceptional clinical care should also feel personal.”
          </blockquote>

          <div className="w-14 h-[1px] bg-[#B59975] mx-auto" />

          <p className="text-sm sm:text-base text-gray-300 font-light leading-relaxed max-w-2xl mx-auto">
            Every patient is different. Our approach begins with listening, understanding your concerns and developing a treatment plan around your individual needs.
          </p>

          <div className="pt-2">
            <button
              onClick={() => onBookAppointment()}
              className="inline-flex items-center gap-2 text-xs font-semibold text-[#B59975] hover:text-white uppercase tracking-[0.2em] border-b border-[#B59975] pb-1 transition-colors cursor-pointer"
            >
              <span>Schedule Your Private Consultation</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* 5. SECTION 8: YOUR JOURNEY (5 Steps Visual Pathway) */}
      <section id="patient-journey" className="py-20 md:py-28 bg-[#FAF7F2] text-[#1C1A17]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-[11px] font-semibold tracking-[0.25em] text-[#8C8275] uppercase mb-2">
              YOUR JOURNEY
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bodoni font-normal text-[#1C1A17] tracking-tight">
              A Thoughtful Pathway to Recovery
            </h2>
            <p className="text-sm text-[#7A7368] mt-3 font-light leading-relaxed">
              From your initial inquiry to full post-operative recovery, here is how we care for you.
            </p>
          </div>

          {/* 5 Steps Linear Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {PATIENT_JOURNEY_STEPS.map((step) => (
              <div
                key={step.step}
                className="bg-white p-6 rounded-sm border border-[#E8DFD3] space-y-3 relative hover:border-[#B59975] transition-colors shadow-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bodoni text-3xl font-light text-[#B59975]">
                    {step.step}
                  </span>
                  <span className="text-[9px] font-semibold tracking-wider text-[#8C8275] uppercase">
                    {step.tag}
                  </span>
                </div>

                <h3 className="font-bodoni text-lg font-normal text-[#1C1A17]">
                  {step.title}
                </h3>

                <p className="text-xs text-[#5C5346] font-light leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. SECTION 6: WHY CHOOSE US (5 Key Specialist Pillars) */}
      <section id="why-choose-us" className="py-20 md:py-28 bg-white text-[#1C1A17] border-t border-[#E8DFD3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Header Box */}
            <div className="lg:col-span-5 space-y-5 lg:sticky lg:top-28">
              <p className="text-[11px] font-semibold tracking-[0.25em] text-[#8C8275] uppercase">
                WHY CHOOSE US
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bodoni font-normal text-[#1C1A17] tracking-tight leading-tight">
                Specialist knowledge. Comprehensive care. A personalised approach.
              </h2>
              <div className="w-12 h-[1px] bg-[#B59975]" />
              <p className="text-sm text-[#5C5346] font-light leading-relaxed">
                Oral and maxillofacial surgery requires rigorous training and surgical precision. At ARK Dental, specialist hospital expertise is paired with the calm, discrete setting of a private boutique clinic.
              </p>

              <div className="pt-4">
                <button
                  onClick={() => onBookAppointment()}
                  className="inline-flex items-center gap-2 bg-[#1C1A17] hover:bg-[#2F2B26] text-white px-6 py-3.5 rounded-sm text-xs font-semibold tracking-wider uppercase transition-colors cursor-pointer"
                >
                  <span>Book Consultation With Dr. Khan</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Right 5 Numbered Items */}
            <div className="lg:col-span-7 space-y-6">
              {WHY_CHOOSE_US_ITEMS.map((item) => (
                <div 
                  key={item.num}
                  className="p-6 bg-[#FAF7F2] rounded-sm border border-[#E8DFD3] space-y-2 hover:border-[#B59975] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold tracking-widest text-[#B59975] font-mono">
                      {item.num}
                    </span>
                    <h3 className="font-bodoni text-xl font-normal text-[#1C1A17]">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-xs text-[#5C5346] font-light leading-relaxed pl-8">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 7. SECTION 10: CLINICAL CASES (Ethical, structured case presentation) */}
      <section className="relative py-20 md:py-28 text-white overflow-hidden border-t border-[#3E2D20]">
        {/* Royal Brown & Champagne Beige Luxury Texture Layer */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-80 pointer-events-none"
          style={{ backgroundImage: `url('/images/royal_brown_beige.jpg')` }}
        />
        {/* Deep Royal Espresso & Warm Beige Scrim Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#140E0A]/95 via-[#1D140D]/88 to-[#100B07]/97 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#D8BE9B]/15 via-[#2E2016]/20 to-transparent mix-blend-overlay pointer-events-none" />
        {/* Royal Accent Dividers */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#C4A985]/40 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#C4A985]/40 to-transparent pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#B59975]/15 border border-[#B59975]/30 mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#B59975]" />
                <p className="text-[11px] font-semibold tracking-[0.25em] text-[#D8BE9B] uppercase">
                  CLINICAL CASES
                </p>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bodoni font-normal text-white tracking-tight">
                A Closer Look at Our Approach
              </h2>
              <p className="text-xs sm:text-sm text-[#D1C2B0] font-light mt-2 leading-relaxed">
                Structured clinical case studies showing condition, assessment, surgical treatment, and patient recovery.
              </p>
            </div>

            <button
              onClick={() => onNavigateTab('clinical-cases')}
              className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-[#D8BE9B] hover:text-white uppercase border-b border-[#B59975] pb-1 transition-colors cursor-pointer shrink-0"
            >
              <span>View All Clinical Cases</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* 3 Featured Cases in Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CLINICAL_CASES.slice(0, 3).map((c) => (
              <div 
                key={c.id}
                className="bg-[#1C1510]/90 backdrop-blur-md border border-[#483526] hover:border-[#C4A985]/80 rounded-2xl p-6 sm:p-7 space-y-4 flex flex-col justify-between shadow-2xl transition-all duration-300 group"
              >
                <div className="space-y-3">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-[#D8BE9B] block">
                    {c.category}
                  </span>
                  <h3 className="font-bodoni text-lg sm:text-xl text-white font-normal leading-snug group-hover:text-[#E8DFD3] transition-colors">
                    {c.title}
                  </h3>
                  <div className="space-y-2 text-xs text-gray-300">
                    <div>
                      <strong className="text-gray-400 uppercase text-[9px] block">Condition:</strong>
                      <p className="line-clamp-2 text-[#DDD3C5] font-light">{c.condition}</p>
                    </div>
                    <div>
                      <strong className="text-[#C4A985] uppercase text-[9px] block">Outcome:</strong>
                      <p className="line-clamp-2 text-[#EDE4D5] font-light">{c.outcome}</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <button
                    onClick={() => onNavigateTab('clinical-cases')}
                    className="text-xs font-medium text-[#D8BE9B] hover:text-white inline-flex items-center gap-1.5 cursor-pointer transition-colors"
                  >
                    <span>Read Case Details</span>
                    <ArrowRight className="w-3 h-3 text-[#B59975]" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. CLINIC FACILITIES & ADVANCED TECHNOLOGY SECTION */}
      <ClinicFacilitiesSection 
        isDark={theme === 'dark'}
        onBookAppointment={() => onBookAppointment()}
      />

      {/* INTERACTIVE BEFORE & AFTER SMILE COMPARISON SLIDER */}
      <div className={theme === 'dark' ? 'bg-[#141210]' : 'bg-[#FAF7F2]'}>
        <BeforeAfterSlider />
      </div>

      {/* 8. SECTION: PATIENT TESTIMONIALS & REASSURANCE */}
      <section className="relative py-20 md:py-28 text-white overflow-hidden border-t border-[#3E2D20]">
        {/* Royal Brown & Beige Luxury Texture Background (Div 1) */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-85 pointer-events-none"
          style={{ backgroundImage: `url('/images/royal_brown_beige.jpg')` }}
        />
        {/* Deep Architectural Royal Brown Scrim Overlay (Div 2) */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#140E0A]/94 via-[#1E150E]/86 to-[#110C08]/96 pointer-events-none" />
        {/* Royal Champagne Beige & Gold Radial Gilded Sheen (Div 3 - Selected Element 1) */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#3D291B]/60 via-[#D8BE9B]/18 to-[#20140D]/75 mix-blend-overlay pointer-events-none" />
        {/* Ambient Radial Highlight */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#D8BE9B]/15 via-transparent to-transparent pointer-events-none" />
        {/* Royal Dividing Line */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#C4A985]/40 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#C4A985]/40 to-transparent pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#B59975]/15 border border-[#B59975]/30 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B59975]" />
              <p className="text-[11px] font-semibold tracking-[0.25em] text-[#D8BE9B] uppercase">
                PATIENT REASSURANCE
              </p>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bodoni font-normal text-white tracking-tight">
              Words From Our Patients
            </h2>
            <div className="w-16 h-0.5 bg-[#B59975] mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.slice(0, 3).map((item) => (
              <div 
                key={item.id}
                className="bg-[#1A120D]/90 backdrop-blur-md p-7 sm:p-8 rounded-2xl border border-[#483526] space-y-4 shadow-2xl hover:border-[#C4A985]/80 transition-all duration-300"
              >
                <div className="flex items-center gap-1 text-[#C4A985] text-xs">
                  {"★".repeat(item.rating)}
                </div>
                <p className="text-xs sm:text-[13px] text-[#EDE4D5] font-light leading-relaxed italic">
                  "{item.comment}"
                </p>
                <div className="pt-3 border-t border-[#483526]/80 flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-semibold text-white tracking-wide">{item.name}</h4>
                    <span className="text-[10px] text-[#D8BE9B]">{item.treatment}</span>
                  </div>
                  <span className="text-[10px] text-gray-400 font-light">{item.city}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. SECTION 12: READY TO DISCUSS YOUR CARE? / Direct Contact */}
      <section className="relative py-20 md:py-28 bg-[#110C08] text-white border-t border-[#3E2D20] overflow-hidden">
        {/* Royal Brown & Champagne Beige Ambient Texture Layer */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-80 pointer-events-none"
          style={{ backgroundImage: `url('/images/royal_brown_beige.jpg')` }}
        />
        {/* Deep Royal Espresso & Warm Beige Scrim Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#110C08]/95 via-[#1A120D]/88 to-[#0E0A07]/97 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#D8BE9B]/18 via-[#3A271B]/15 to-transparent pointer-events-none" />
        {/* Royal Dividing Hairlines */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#C4A985]/40 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#C4A985]/40 to-transparent pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#1A120D]/92 backdrop-blur-md border border-[#483526] hover:border-[#C4A985]/70 rounded-2xl p-8 sm:p-12 lg:p-16 shadow-2xl transition-all duration-300">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#B59975]/15 border border-[#B59975]/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#B59975]" />
                  <span className="text-[10px] font-semibold tracking-[0.25em] text-[#D8BE9B] uppercase">
                    READY TO DISCUSS YOUR CARE?
                  </span>
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bodoni font-normal text-white tracking-tight">
                  Book Your Consultation With Dr. Khan
                </h2>
                <p className="text-xs sm:text-sm text-[#DDD3C5] font-light leading-relaxed max-w-lg">
                  Whether you are planning wisdom tooth surgery, seeking a second opinion on jaw discomfort, or looking for reconstructive implant options, we are here to help.
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <button
                    onClick={() => onBookAppointment()}
                    className="inline-flex items-center gap-2 bg-[#B59975] hover:bg-[#C4A985] text-[#141210] font-semibold px-6 py-3.5 rounded-xl text-xs tracking-wider uppercase transition-all shadow-md hover:shadow-lg cursor-pointer"
                  >
                    <span>Book a Consultation</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <a
                    href={CLINIC_METADATA.phoneTel}
                    className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl border border-white/30 hover:border-[#D8BE9B] bg-white/5 hover:bg-white/10 text-white text-xs font-medium tracking-wider uppercase transition-colors cursor-pointer"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#D8BE9B]" />
                    <span>Call {CLINIC_METADATA.phone}</span>
                  </a>
                </div>
              </div>

              {/* Direct Practice Details Card */}
              <div className="lg:col-span-5 bg-[#120D09]/90 backdrop-blur-sm border border-[#483526] p-6 sm:p-7 rounded-2xl space-y-4 text-xs shadow-inner">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#D8BE9B]">
                  Practice Location & Direct Line
                </h4>
                
                <div className="space-y-1">
                  <span className="text-gray-400 block text-[10px] uppercase tracking-wider">Address</span>
                  <p className="text-white leading-relaxed">{CLINIC_METADATA.location}</p>
                </div>

                <div className="space-y-1">
                  <span className="text-gray-400 block text-[10px] uppercase tracking-wider">Hours</span>
                  <p className="text-[#D8BE9B] font-medium">{CLINIC_METADATA.timings}</p>
                </div>

                <div className="space-y-1">
                  <span className="text-gray-400 block text-[10px] uppercase tracking-wider">Phone</span>
                  <p className="text-white font-semibold">{CLINIC_METADATA.phone}</p>
                </div>

                <div className="pt-2">
                  <a
                    href="https://maps.google.com/?q=Defence+Market+Peshawar"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-[#D8BE9B] hover:text-white font-medium underline uppercase tracking-wider transition-colors"
                  >
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Get Directions on Google Maps</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Detail Modal for 5 Categories */}
      <ServiceDetailModal
        category={selectedCategoryModal}
        isOpen={!!selectedCategoryModal}
        onClose={() => setSelectedCategoryModal(null)}
        onBookConsultation={(catTitle) => onBookAppointment(catTitle)}
      />
    </div>
  );
};
