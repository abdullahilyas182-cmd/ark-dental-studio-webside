import React, { useState } from 'react';
import { useClinic } from '../../context/ClinicContext';
import { CLINIC_METADATA, TESTIMONIALS } from '../../data/mockData';
import { HeroSection } from './HeroSection';
import { ServicesExplorer } from './ServicesExplorer';
import { DentistTeamSection } from './DentistTeamSection';
import { NewPatientsSection } from './NewPatientsSection';
import { AppointmentBookingSection } from './AppointmentBookingSection';
import { PatientEducationBlog } from './PatientEducationBlog';
import { ContactLocationSection } from './ContactLocationSection';
import { ClinicalCasesSection } from './ClinicalCasesSection';
import { PatientInformationSection } from './PatientInformationSection';
import { PoliciesModal } from './PoliciesModal';
import { BookingModal } from './BookingModal';
import { WhatsAppModal } from './WhatsAppModal';
import { AIReceptionistModal } from '../ai/AIReceptionistModal';
import { DoctorPortalIcon } from '../common/DoctorPortalIcon';
import { ArkLogo } from '../common/ArkLogo';
import { 
  MessageCircle, Calendar, Star, ShieldCheck, Clock, MapPin, 
  Phone, ArrowRight, Sparkles, Award, CheckCircle, Bot, 
  ChevronRight, Stethoscope, Menu, X, FileText, UserCheck, Shield,
  Sun, Moon, Lock
} from 'lucide-react';

export const PublicWebsite: React.FC = () => {
  const { setPortal, openDoctorLoginModal, theme, toggleTheme } = useClinic();
  
  // Navigation tab state
  const [activeTab, setActiveTab] = useState<'home' | 'services' | 'dentists' | 'patient-info' | 'clinical-cases' | 'new-patients' | 'booking' | 'blog' | 'contact'>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Modals state
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [preselectedBookingService, setPreselectedBookingService] = useState<string | undefined>(undefined);
  const [preselectedBookingDoctorId, setPreselectedBookingDoctorId] = useState<string | undefined>(undefined);

  const [whatsAppModalOpen, setWhatsAppModalOpen] = useState(false);
  const [aiReceptionistOpen, setAiReceptionistOpen] = useState(false);

  const [policiesModalOpen, setPoliciesModalOpen] = useState(false);
  const [policiesTab, setPoliciesTab] = useState<'privacy' | 'consent' | 'terms'>('privacy');

  const handleNavigate = (tab: any) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenBookingModal = (serviceName?: string, doctorId?: string) => {
    setPreselectedBookingService(serviceName);
    setPreselectedBookingDoctorId(doctorId);
    setBookingModalOpen(true);
  };

  const handleBookWithDoctor = (doctorId: string, doctorName: string) => {
    setPreselectedBookingDoctorId(doctorId);
    setActiveTab('booking');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBookServiceFromExplorer = (serviceTitle: string) => {
    setPreselectedBookingService(serviceTitle);
    setActiveTab('booking');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openPolicies = (tab: 'privacy' | 'consent' | 'terms') => {
    setPoliciesTab(tab);
    setPoliciesModalOpen(true);
  };

  return (
    <div className={`min-h-screen flex flex-col selection:bg-[#B59975] selection:text-white transition-colors duration-300 ${
      theme === 'dark' ? 'bg-[#111311] text-gray-100' : 'bg-[#FAF7F2] text-[#2B2B2B]'
    }`}>
      {/* Main Header / Navigation - floating directly at the top matching reference image */}
      <header className={`sticky top-0 z-40 backdrop-blur-md border-b shadow-lg transition-colors duration-300 ${
        theme === 'dark' 
          ? 'bg-black/50 border-white/10 text-white' 
          : 'bg-[#FAF7F2]/90 border-[#E8DFD3] text-[#1C1A17]'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Left Logo: Authentic ARK Dental Studio Logo + Brand Typography */}
            <div className="flex items-center gap-3 group">
              <DoctorPortalIcon onTriggerSequence={openDoctorLoginModal} size="md" />
              <div 
                onClick={() => handleNavigate('home')}
                className="flex flex-col cursor-pointer"
              >
                <span className="font-serif tracking-[0.2em] text-xl font-bold text-[#B59975] leading-tight">
                  ARK
                </span>
                <span className={`text-[9px] tracking-[0.28em] font-semibold uppercase ${
                  theme === 'dark' ? 'text-[#B59975]' : 'text-[#8C6D46]'
                }`}>
                  DENTAL STUDIO
                </span>
              </div>
            </div>

            {/* Center Desktop Navigation Links: Priority 9-page sitemap */}
            <nav className="hidden lg:flex items-center gap-6">
              {[
                { id: 'home', label: 'HOME' },
                { id: 'dentists', label: 'ABOUT' },
                { id: 'services', label: 'SERVICES' },
                { id: 'gallery', label: 'GALLERY' },
                { id: 'patient-info', label: 'PATIENT INFO' },
                { id: 'clinical-cases', label: 'CLINICAL CASES' },
                { id: 'contact', label: 'CONTACT' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    if (item.id === 'gallery') {
                      if (activeTab === 'home') {
                        document.getElementById('gallery-slider')?.scrollIntoView({ behavior: 'smooth' });
                      } else {
                        handleNavigate('home');
                        setTimeout(() => {
                          document.getElementById('gallery-slider')?.scrollIntoView({ behavior: 'smooth' });
                        }, 150);
                      }
                    } else {
                      handleNavigate(item.id);
                    }
                  }}
                  className={`text-xs font-medium tracking-[0.18em] uppercase cursor-pointer transition-colors py-1 relative ${
                    activeTab === item.id
                      ? 'text-[#B59975] font-bold'
                      : theme === 'dark' 
                        ? 'text-white/80 hover:text-white' 
                        : 'text-[#423C34] hover:text-[#B59975]'
                  }`}
                >
                  {item.label}
                  {activeTab === item.id && (
                    <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#B59975]" />
                  )}
                </button>
              ))}
            </nav>

            {/* Header Right Actions: Theme Switcher + Outlined BOOK CONSULTATION button + Hamburger */}
            <div className="flex items-center gap-3 sm:gap-4">
              {/* Daylight / Dark Theme Toggle */}
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-full border transition-all cursor-pointer flex items-center justify-center ${
                  theme === 'dark' 
                    ? 'border-white/20 text-[#B59975] hover:bg-white/10' 
                    : 'border-[#E8DFD3] text-[#8C6D46] hover:bg-[#FAF0E6]'
                }`}
                title={theme === 'dark' ? "Switch to Daylight Mode" : "Switch to Dark Mode"}
                aria-label="Toggle daylight and dark theme"
              >
                {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>

              <button
                onClick={() => handleNavigate('booking')}
                className={`hidden sm:inline-flex items-center justify-center px-4 py-2 rounded-sm text-[11px] font-medium tracking-[0.18em] border transition-all cursor-pointer uppercase ${
                  theme === 'dark'
                    ? 'text-white border-white/70 hover:border-[#B59975] hover:text-[#B59975] hover:bg-white/5'
                    : 'text-[#1C1A17] border-[#8C6D46] hover:bg-[#8C6D46] hover:text-white'
                }`}
              >
                <span>BOOK CONSULTATION</span>
              </button>

              {/* 2-line Hamburger Menu Icon */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`p-2 rounded-lg transition-colors cursor-pointer flex flex-col justify-center items-end gap-1.5 w-9 h-9 ${
                  theme === 'dark' ? 'text-white/90 hover:bg-white/5' : 'text-[#1C1A17] hover:bg-black/5'
                }`}
                aria-label="Toggle navigation menu"
              >
                <span className={`w-5 h-[1.5px] block transition-all ${theme === 'dark' ? 'bg-white' : 'bg-[#1C1A17]'}`} />
                <span className={`w-3.5 h-[1.5px] block transition-all ${theme === 'dark' ? 'bg-white' : 'bg-[#1C1A17]'}`} />
              </button>
            </div>
          </div>
        </div>

        {/* Full-Featured Mobile & Quick-Drawer Menu */}
        {mobileMenuOpen && (
          <div className="border-t border-white/10 bg-[#161412] px-6 py-6 space-y-4 shadow-2xl animate-fadeIn text-white">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                { id: 'home', label: 'Home' },
                { id: 'dentists', label: 'About Dr. Muhammad Ali Riaz Khan' },
                { id: 'services', label: 'Services & Oral Surgery' },
                { id: 'patient-info', label: 'Patient Info & Surgical Guide' },
                { id: 'clinical-cases', label: 'Clinical Cases & Outcomes' },
                { id: 'booking', label: 'Book Consultation Online' },
                { id: 'contact', label: 'Contact, Valet & Location' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavigate(item.id)}
                  className={`w-full text-left px-4 py-3 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors ${
                    activeTab === item.id
                      ? 'bg-[#B59975] text-[#141210]'
                      : 'text-gray-300 hover:bg-white/5'
                  }`}
                >
                  <span>{item.label}</span>
                  <ChevronRight className="w-4 h-4 opacity-50" />
                </button>
              ))}
            </div>

            <div className="pt-4 border-t border-white/10 space-y-2">
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setPortal('patient');
                  }}
                  className="flex-1 py-3 rounded-xl bg-white/10 border border-white/20 text-white text-xs font-semibold text-center hover:bg-white/15 transition-colors cursor-pointer flex items-center justify-center gap-2"
                >
                  <UserCheck className="w-4 h-4 text-[#B59975]" />
                  <span>Patient Health Portal</span>
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleNavigate('booking');
                  }}
                  className="flex-1 py-3 rounded-xl bg-[#B59975] text-[#141210] text-xs font-bold text-center hover:bg-[#A38865] transition-colors cursor-pointer"
                >
                  Book Appointment
                </button>
              </div>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openDoctorLoginModal();
                }}
                className="w-full py-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs font-semibold text-center hover:bg-amber-500/20 transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                <Lock className="w-3.5 h-3.5 text-amber-400" />
                <span>Doctor Portal Entry (Locked 🔒)</span>
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Main Tabbed Views */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <HeroSection
            onBookAppointment={() => handleNavigate('booking')}
            onOpenWhatsApp={() => setWhatsAppModalOpen(true)}
            onNavigateTab={(tab) => handleNavigate(tab)}
          />
        )}

        {activeTab === 'services' && (
          <ServicesExplorer onBookService={handleBookServiceFromExplorer} />
        )}

        {activeTab === 'dentists' && (
          <DentistTeamSection onBookWithDoctor={handleBookWithDoctor} />
        )}

        {activeTab === 'patient-info' && (
          <PatientInformationSection onBookConsultation={() => handleNavigate('booking')} />
        )}

        {activeTab === 'clinical-cases' && (
          <ClinicalCasesSection onBookConsultation={() => handleNavigate('booking')} />
        )}

        {activeTab === 'new-patients' && (
          <NewPatientsSection onBookAppointment={() => handleNavigate('booking')} />
        )}

        {activeTab === 'booking' && (
          <AppointmentBookingSection
            preselectedService={preselectedBookingService}
            preselectedDoctorId={preselectedBookingDoctorId}
          />
        )}

        {activeTab === 'blog' && (
          <PatientEducationBlog />
        )}

        {activeTab === 'contact' && (
          <ContactLocationSection />
        )}
      </main>

      {/* Footer with royal espresso brown & champagne beige luxury background texture */}
      <footer className="relative bg-[#110C08] border-t border-[#3E2D20] pt-16 pb-24 sm:pb-14 text-white overflow-hidden">
        {/* Royal Brown & Beige Texture Background */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-80 pointer-events-none"
          style={{ backgroundImage: `url('/images/royal_brown_beige.jpg')` }}
        />
        {/* Deep Royal Espresso & Warm Beige Scrim Overlay for Elegance & Legibility (Targeted Selector 1) */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#110C08]/95 via-[#1A120C]/88 to-[#0C0805]/97 pointer-events-none" />
        {/* Royal Warm Bronze & Beige Texture Accent Overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#382618]/70 via-[#D8BE9B]/15 to-[#1A110A]/85 mix-blend-overlay pointer-events-none" />
        {/* Subtle Gilded Radial Sheen */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#D8BE9B]/18 via-transparent to-transparent pointer-events-none" />
        {/* Royal Dividing Hairline Accent */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#C4A985]/40 to-transparent pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-12 border-b border-white/15">
            {/* Col 1: Studio Identity */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <ArkLogo size="sm" showText={false} />
                <h4 className="font-serif font-bold text-base tracking-wider uppercase text-[#FAF6F0]">
                  ARK DENTAL STUDIO
                </h4>
              </div>
              <p className="text-xs text-[#DDD3C5] leading-relaxed font-light">
                Founded and directed by {CLINIC_METADATA.founder}. Dedicated to modern, gentle, aesthetic and implant dentistry in Khyber Pakhtunkhwa.
              </p>
              <div className="text-xs text-[#D8BE9B] font-medium">
                ★ 4.9/5.0 Google Rating ({CLINIC_METADATA.totalReviews} Reviews)
              </div>
            </div>

            {/* Col 2: Studio Location & Hours */}
            <div className="space-y-2 text-xs">
              <h4 className="font-serif font-bold text-sm text-[#FAF6F0] mb-2">
                Studio Location & Hours
              </h4>
              <p className="text-[#DDD3C5] leading-relaxed font-light">
                {CLINIC_METADATA.location}
              </p>
              <p className="text-gray-400">
                Landmark: {CLINIC_METADATA.landmark}
              </p>
              <p className="text-[#D8BE9B] font-semibold pt-1">
                {CLINIC_METADATA.timings}
              </p>
              <p className="text-gray-400">
                Parking: Complimentary Valet & Basement Facility
              </p>
            </div>

            {/* Col 3: Direct Connect & Emergency */}
            <div className="space-y-2 text-xs">
              <h4 className="font-serif font-bold text-sm text-[#FAF6F0] mb-2">
                Direct Contact & Emergency
              </h4>
              <p className="text-[#DDD3C5] font-light">
                Main Reception: <strong className="text-white font-semibold">{CLINIC_METADATA.phone}</strong>
              </p>
              <p className="text-[#DDD3C5] font-light">
                WhatsApp Concierge: <strong className="text-[#4ADE80] font-semibold">{CLINIC_METADATA.whatsapp}</strong>
              </p>
              <p className="text-[#DDD3C5] font-light">
                Emergency Hotline: <strong className="text-red-400 font-semibold">{CLINIC_METADATA.emergencyPhone}</strong>
              </p>
              <p className="text-gray-400">
                Email: {CLINIC_METADATA.email}
              </p>
            </div>

            {/* Col 4: Quick Portals & Policies */}
            <div className="space-y-3">
              <h4 className="font-serif font-bold text-sm text-[#FAF6F0]">
                Patient & Clinical Portals
              </h4>
              <div className="space-y-2 text-xs">
                <button
                  onClick={() => setPortal('patient')}
                  className="w-full text-left p-2.5 rounded-xl bg-[#1F1610]/90 border border-[#483526] hover:border-[#C4A985]/70 hover:bg-[#2A1E16] flex items-center justify-between cursor-pointer transition-all shadow-sm"
                >
                  <span className="font-medium text-[#FAF6F0]">Access Patient Portal</span>
                  <ChevronRight className="w-3.5 h-3.5 text-gray-300" />
                </button>
                <button
                  onClick={() => handleNavigate('booking')}
                  className="w-full text-left p-2.5 rounded-xl bg-[#1F1610]/90 border border-[#B59975]/50 hover:border-[#C4A985] hover:bg-[#2A1E16] flex items-center justify-between cursor-pointer transition-all shadow-sm"
                >
                  <span className="font-medium text-[#D8BE9B]">Online Appointment Calendar</span>
                  <ChevronRight className="w-3.5 h-3.5 text-gray-300" />
                </button>
              </div>

              <div className="pt-2 flex flex-wrap gap-2 text-[11px] text-gray-300">
                <button 
                  onClick={() => openPolicies('privacy')}
                  className="hover:underline cursor-pointer"
                >
                  Privacy (HIPAA/PMDC)
                </button>
                <span>•</span>
                <button 
                  onClick={() => openPolicies('consent')}
                  className="hover:underline cursor-pointer"
                >
                  Photo Consent
                </button>
                <span>•</span>
                <button 
                  onClick={() => openPolicies('terms')}
                  className="hover:underline cursor-pointer"
                >
                  Terms
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Bar with Doctor Portal Lock Trigger */}
          <div className="pt-6 flex flex-wrap items-center justify-between gap-4 text-[11px] text-gray-400">
            <div className="flex items-center gap-3">
              <span>© {new Date().getFullYear()} ARK Dental Studio Peshawar. All clinical rights reserved.</span>
              <DoctorPortalIcon onTriggerSequence={openDoctorLoginModal} size="xs" />
              <button
                onClick={openDoctorLoginModal}
                className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-white/5 hover:bg-white/10 text-gray-400 hover:text-amber-300 border border-white/10 transition-colors cursor-pointer"
                title="Doctor Portal Lock Entry"
              >
                <Lock className="w-3 h-3 text-[#B59975]" />
                <span>Doctor Portal (Locked 🔒)</span>
              </button>
            </div>
            <div className="text-gray-400 text-[10px]">
              Clinical Management Engine • KPK Health Panel Verified
            </div>
          </div>
        </div>
      </footer>

      {/* Sticky Mobile-First Bottom CTA Bar with dark luxury brown theme */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#120E0B]/95 backdrop-blur-md border-t border-[#31251D] p-2.5 flex items-center gap-2 shadow-2xl">
        <a
          href={`tel:${CLINIC_METADATA.phone}`}
          className="flex-1 py-2.5 rounded-xl border border-white/10 bg-white/5 text-gray-200 text-[11px] font-medium flex items-center justify-center gap-1.5"
        >
          <Phone className="w-3.5 h-3.5 text-[#B59975]" />
          <span>Call Now</span>
        </a>

        <button
          onClick={() => setWhatsAppModalOpen(true)}
          className="flex-1 py-2.5 rounded-xl bg-[#25D366] text-white text-[11px] font-bold flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
        >
          <MessageCircle className="w-3.5 h-3.5" />
          <span>WhatsApp</span>
        </button>

        <button
          onClick={() => handleNavigate('booking')}
          className="flex-1 py-2.5 rounded-xl bg-[#B59975] text-[#141210] text-[11px] font-bold flex items-center justify-center gap-1 cursor-pointer shadow-xs"
        >
          <Calendar className="w-3.5 h-3.5 text-[#141210]" />
          <span>Book Slot</span>
        </button>
      </div>

      {/* Floating Action Buttons for Desktop / Tablet */}
      {/* WhatsApp Quick Launcher */}
      <button
        onClick={() => setWhatsAppModalOpen(true)}
        className="hidden sm:flex fixed bottom-6 left-6 z-40 bg-[#25D366] hover:bg-[#20ba59] text-white p-3.5 rounded-full shadow-2xl items-center gap-2 hover:scale-105 transition-all cursor-pointer"
        title="Chat on WhatsApp"
      >
        <MessageCircle className="w-5 h-5 fill-current" />
        <span className="font-semibold text-xs pr-1">WhatsApp</span>
      </button>

      {/* AI Assistant Launcher (Khan) */}
      <button
        onClick={() => setAiReceptionistOpen(true)}
        className="hidden sm:flex fixed bottom-6 right-6 z-40 bg-[#1A120D] hover:bg-[#251A13] text-white p-3.5 rounded-full shadow-2xl items-center gap-2.5 hover:scale-105 transition-all cursor-pointer border-2 border-[#B59975] group"
        title="Ask Khan — AI Assistant (Urdu & English Speaking)"
      >
        <div className="w-5 h-5 rounded-full bg-[#B59975] text-[#140E0A] flex items-center justify-center font-serif font-bold text-[11px]">
          K
        </div>
        <span className="font-semibold text-xs pr-1 text-[#FAF6F0] group-hover:text-[#D8BE9B] transition-colors">
          Ask Khan (Voice & Text)
        </span>
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
      </button>

      {/* Modals */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        preselectedService={preselectedBookingService}
        preselectedDoctorId={preselectedBookingDoctorId}
      />

      <WhatsAppModal
        isOpen={whatsAppModalOpen}
        onClose={() => setWhatsAppModalOpen(false)}
      />

      <AIReceptionistModal
        isOpen={aiReceptionistOpen}
        onClose={() => setAiReceptionistOpen(false)}
      />

      <PoliciesModal
        isOpen={policiesModalOpen}
        onClose={() => setPoliciesModalOpen(false)}
        defaultTab={policiesTab}
      />
    </div>
  );
};
