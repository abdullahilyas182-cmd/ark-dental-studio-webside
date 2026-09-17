import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Sparkles, CheckCircle2, ArrowRight, Maximize2, X, ZoomIn } from 'lucide-react';

interface GallerySlideSectionProps {
  onBookConsultation?: () => void;
  isDark?: boolean;
}

interface SlideItem {
  id: string;
  type: 'doctor' | 'teeth' | 'clinic' | 'logo';
  image: string;
  title: string;
  subtitle?: string;
  badge?: string;
  description: string;
  overlayText?: string; // For typing directly on the photo
  highlights?: string[];
  ctaText?: string;
}

export const GallerySlideSection: React.FC<GallerySlideSectionProps> = ({ 
  onBookConsultation,
  isDark = true 
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  const slides: SlideItem[] = [
    {
      id: 'cl600-technology',
      type: 'clinic',
      image: '/images/CL600_Machine.jpg',
      badge: 'EXCLUSIVE IN KPK • STATE-OF-THE-ART TECHNOLOGY',
      title: 'State-of-the-Art Technology – CL-600',
      subtitle: 'Advanced Surgical & Restorative Treatment Unit',
      description:
        'ARK Dental Studio is proud to feature the advanced CL-600 machine—an exclusive, cutting-edge technology that we proudly offer as the only provider in all of KPK. Engineered to international hospital standards, this precision clinical workstation integrates real-time digital diagnostics, high-definition telemetry, and articulated microsurgical ergonomics. By ensuring unmatched accuracy, superior patient care, and modern clinical outcomes, the CL-600 guarantees a painless, reassuring treatment journey with predictable long-term results.',
      highlights: [
        'Exclusive Provider in All of KPK (Khyber Pakhtunkhwa)',
        'Sub-Millimeter Microsurgical Precision & Stability',
        'Real-Time Digital Diagnostics & Live Telemetry',
        'Ergonomic Anatomical Contouring for Supreme Patient Comfort'
      ],
      ctaText: 'Experience CL-600 Care'
    },
    {
      id: 'ark-studio-reception',
      type: 'clinic',
      image: '/images/ark_reception_exact.jpg',
      badge: 'BOUTIQUE CLINIC RECEPTION',
      title: 'ARK Dental Studio Reception',
      subtitle: 'Defence Market, Officer Colony, Peshawar',
      description:
        'A tranquil, hospitality-inspired arrival experience. Featuring custom fluted walnut millwork, the signature ARK Dental Studio plaque, ambient ceiling cove illumination, and dedicated patient concierge for an unhurried, reassuring check-in.',
      highlights: [
        'Official ARK Dental Studio Insignia',
        'Custom Fluted Walnut Architectural Joinery',
        'Hospitality-Standard Patient Arrival Concierge',
        'Defence Market, Officer Colony, Peshawar'
      ],
      ctaText: 'Visit Our Practice'
    },
    {
      id: 'ark-consultation-suite',
      type: 'clinic',
      image: '/images/ark_consultation_suite.jpg',
      badge: 'PRIVATE CONSULTATION SUITE',
      title: 'Doctor Consultation Suite',
      subtitle: "Dr. Muhammad Ali Riaz Khan's Office",
      description:
        'An unhurried private consultation environment designed for comprehensive treatment planning, 3D diagnostics review, and discreet discussion in warm architectural comfort with custom walnut paneling and an illuminated halo niche.',
      highlights: [
        'Private One-on-One Specialist Consultations',
        'Illuminated Halo Architectural Wall Feature',
        'Accredited Board Certifications & Diplomas',
        'Integrated Digital Smile Design Planning'
      ],
      ctaText: 'Schedule Consultation'
    },
    {
      id: 'ark-patient-lounge',
      type: 'clinic',
      image: '/images/ark_boucle_lounge.jpg',
      badge: 'PATIENT COMFORT & RECOVERY',
      title: 'Boutique Patient Relaxation Lounge',
      subtitle: 'Stress-Free Pre & Post-Care Sanctuary',
      description:
        'Our bespoke recovery lounge offers a quiet, stress-free haven before and after procedures. Furnished with custom textured bouclé armchairs, organic pampas grass botanicals, and dual Carrara marble tables, this restorative setting ensures patients and families enjoy optimal serenity and dedicated clinical post-care attention.',
      highlights: [
        'Plush Textured Bouclé Armchair & Carrara Marble Accents',
        'Acoustically Isolated Pre & Post-Op Recovery',
        'Calming Organic Botanicals & Ambient Warmth',
        'Dedicated Post-Operative Monitoring & Comfort'
      ],
      ctaText: 'Tour the Sanctuary'
    },
    {
      id: 'surgeon-in-surgery',
      type: 'doctor',
      image: '/images/dr_khan_actual_uploaded.jpg',
      badge: 'SURGICAL THEATRE SPOTLIGHT',
      title: 'Surgical Operatory Excellence',
      subtitle: 'Dr. Muhammad Ali Riaz Khan in Action',
      overlayText: 'Dr. Muhammad Ali Riaz',
      description:
        'Specialist Oral & Maxillofacial Surgeon Dr. Muhammad Ali Riaz Khan conducting reconstructive surgical treatment under dedicated operatory illumination in Defence, Peshawar.',
      highlights: [
        'Specialist Oral & Maxillofacial Surgeon',
        'Micro-Surgical Implant Diagnostics',
        'Hospital Sterilization Discipline',
        'Dedicated Surgical On-Call Services'
      ],
      ctaText: 'Book Surgical Consultation'
    },
    {
      id: 'teeth-smile-makeover',
      type: 'teeth',
      image: '/images/smile_makeover_result.jpg',
      badge: 'CLINICAL SMILE TRANSFORMATION',
      title: 'Aesthetic Smile Reconstruction',
      subtitle: 'Ultra-Thin E-Max Porcelain Veneers',
      overlayText: 'Muhammad Ali Riaz',
      description:
        'Complete anterior smile harmony crafted by Dr. Muhammad Ali Riaz. Restoring natural shade BL2 translucency, ideal gingival contours, and youthful incisal edge proportion with zero sensitivity.',
      highlights: [
        'Handcrafted Layered Porcelain Veneers',
        'Preservation of Natural Enamel',
        'Digital Smile Design (DSD) Preview',
        'Lifetime Marginal Integrity'
      ],
      ctaText: 'Explore Smile Makeovers'
    }
  ];

  const currentSlide = slides[currentIndex];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Autoplay functionality
  useEffect(() => {
    if (!isPaused && !isLightboxOpen) {
      autoPlayRef.current = setInterval(() => {
        nextSlide();
      }, 6500);
    }
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isPaused, currentIndex, isLightboxOpen]);

  // Handle ESC key for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsLightboxOpen(false);
      if (e.key === 'ArrowRight' && isLightboxOpen) nextSlide();
      if (e.key === 'ArrowLeft' && isLightboxOpen) prevSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen]);

  return (
    <section 
      id="gallery-slider" 
      className={`py-20 md:py-28 transition-colors duration-300 ${
        isDark 
          ? 'bg-[#12100E] text-white border-y border-white/10' 
          : 'bg-[#FBF9F5] text-[#1C1A17] border-y border-[#E8DFD3]'
      }`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#B59975]" />
              <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#B59975]">
                CLINICAL GALLERY & PRACTITIONER SPOTLIGHT
              </span>
            </div>
            <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bodoni font-normal tracking-tight ${isDark ? 'text-white' : 'text-[#1C1A17]'}`}>
              Artistry, Precision & Patient Care
            </h2>
            <p className={`text-xs sm:text-sm font-light mt-2 max-w-2xl leading-relaxed ${isDark ? 'text-gray-400' : 'text-[#6B6357]'}`}>
              Explore our clinical director, surgical suite, and real smile transformations at ARK Dental.
            </p>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-3">
            <span className={`text-xs font-mono font-medium tracking-wider ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              0{currentIndex + 1} / 0{slides.length}
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={prevSlide}
                aria-label="Previous slide"
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                  isDark 
                    ? 'bg-white/5 hover:bg-white/15 text-white border border-white/10' 
                    : 'bg-white hover:bg-[#FAF7F2] text-[#1C1A17] border border-[#E8DFD3] shadow-xs'
                }`}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextSlide}
                aria-label="Next slide"
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                  isDark 
                    ? 'bg-[#B59975] hover:bg-[#A38865] text-[#141210]' 
                    : 'bg-[#B59975] hover:bg-[#A38865] text-[#141210] shadow-md'
                }`}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Main Interactive Slide Display */}
        <div className={`relative rounded-2xl sm:rounded-3xl border overflow-hidden shadow-2xl transition-all duration-500 ${
          isDark 
            ? 'bg-[#191613] border-white/10' 
            : 'bg-white border-[#E8DFD3]'
        }`}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch min-h-[540px]">
            
            {/* Image Column with Aspect-Aware Presentation & Click-to-Enlarge */}
            <div 
              className="lg:col-span-7 relative bg-[#0D0B0A] min-h-[380px] sm:min-h-[460px] lg:min-h-[540px] overflow-hidden group flex items-center justify-center cursor-pointer"
              onClick={() => setIsLightboxOpen(true)}
              title="Click to view full photo"
            >
              {/* Soft ambient blurred background */}
              <div 
                className="absolute inset-0 bg-cover bg-center filter blur-2xl opacity-30 scale-125 transition-all duration-700 pointer-events-none"
                style={{ backgroundImage: `url('${currentSlide.image}')` }}
              />

              {/* Main Photo: Perfectly framed with crisp edges and optical centering */}
              <img
                id="gallery-slider-photo"
                src={currentSlide.image}
                alt={currentSlide.title}
                className="relative z-10 w-full h-full object-cover object-center transition-transform duration-1000 group-hover:scale-[1.03]"
                referrerPolicy="no-referrer"
              />

              {/* Elegant Gradient Vignette */}
              <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

              {/* Top Slide Badge */}
              <div className="absolute top-5 left-5 z-20">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#12100E]/80 backdrop-blur-md border border-[#B59975]/40 text-[#B59975] text-[10px] sm:text-[11px] font-bold tracking-wider uppercase shadow-lg">
                  <Sparkles className="w-3.5 h-3.5 text-[#B59975]" />
                  {currentSlide.badge}
                </span>
              </div>

              {/* Enlarge Button Hint */}
              <div className="absolute top-5 right-5 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-white text-xs shadow-lg">
                  <Maximize2 className="w-3.5 h-3.5 text-[#B59975]" />
                  <span>Enlarge</span>
                </span>
              </div>

              {/* USER REQUIREMENT: "I want you to type Muhammad Ali Riaz one time in first one photo of teeth." */}
              {currentSlide.overlayText && (
                <div 
                  id="teeth-photo-watermark"
                  className="absolute bottom-6 left-6 z-20 bg-[#12100E]/90 backdrop-blur-md border border-[#B59975] text-white px-4 py-2 rounded-sm shadow-2xl flex items-center gap-3 animate-fadeIn"
                >
                  <div className="w-2.5 h-2.5 rounded-full bg-[#B59975] animate-pulse" />
                  <div>
                    <span className="text-[9px] uppercase tracking-[0.2em] text-[#B59975] font-bold block">
                      CLINICAL SPECIALIST
                    </span>
                    <span className="font-bodoni text-base sm:text-lg text-white font-bold tracking-wide">
                      {currentSlide.overlayText}
                    </span>
                  </div>
                </div>
              )}

              {/* Slide Counter on Mobile */}
              <div className="absolute bottom-5 right-5 lg:hidden z-20">
                <span className="bg-black/70 backdrop-blur-md text-white/90 text-xs px-2.5 py-1 rounded-full font-mono">
                  {currentIndex + 1} / {slides.length}
                </span>
              </div>
            </div>

            {/* Slide Details Column */}
            <div className={`lg:col-span-5 p-6 sm:p-8 lg:p-12 flex flex-col justify-between space-y-6 ${
              isDark ? 'bg-[#191613]' : 'bg-[#FAF7F2]'
            }`}>
              
              <div className="space-y-4">
                {currentSlide.subtitle && (
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#B59975] block">
                    {currentSlide.subtitle}
                  </span>
                )}

                {/* Title */}
                <h3 className={`text-2xl sm:text-3xl lg:text-4xl font-bodoni font-normal tracking-tight ${
                  isDark ? 'text-white' : 'text-[#1C1A17]'
                }`}>
                  {currentSlide.title}
                </h3>

                <div className="w-12 h-[1.5px] bg-[#B59975]" />

                {/* Description */}
                <p className={`text-sm sm:text-base leading-relaxed font-light ${
                  isDark ? 'text-gray-300' : 'text-[#524B42]'
                }`}>
                  {currentSlide.description}
                </p>

                {/* Bullet Highlights */}
                {currentSlide.highlights && (
                  <div className="pt-4 space-y-2 border-t border-[#B59975]/20">
                    <span className={`text-[10px] uppercase tracking-[0.2em] font-semibold block ${
                      isDark ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Key Clinical Highlights
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                      {currentSlide.highlights.map((hl, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#B59975] shrink-0" />
                          <span className={isDark ? 'text-gray-300' : 'text-[#423C34]'}>{hl}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Call to action & Slide dots */}
              <div className="pt-6 border-t border-[#B59975]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                {onBookConsultation && (
                  <button
                    onClick={onBookConsultation}
                    className="inline-flex items-center justify-center gap-2 bg-[#B59975] hover:bg-[#A38865] text-[#141210] font-semibold px-6 py-3 rounded-sm text-xs tracking-wider uppercase transition-all shadow-md cursor-pointer"
                  >
                    <span>{currentSlide.ctaText || 'Book Consultation'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}

                {/* Progress Indicators */}
                <div className="flex items-center gap-1.5 self-center sm:self-auto">
                  {slides.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentIndex(idx)}
                      aria-label={`Go to slide ${idx + 1}`}
                      className={`transition-all rounded-full cursor-pointer ${
                        currentIndex === idx
                          ? 'w-7 h-2 bg-[#B59975]'
                          : `w-2 h-2 ${isDark ? 'bg-white/20 hover:bg-white/40' : 'bg-black/20 hover:bg-black/40'}`
                      }`}
                    />
                  ))}
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* Quick Thumbnail Navigation Row */}
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
          {slides.map((slide, idx) => (
            <button
              key={slide.id}
              onClick={() => setCurrentIndex(idx)}
              className={`text-left p-2.5 rounded-xl border transition-all flex items-center gap-3 cursor-pointer group ${
                currentIndex === idx
                  ? 'border-[#B59975] bg-[#B59975]/15 shadow-md ring-2 ring-[#B59975]/80'
                  : isDark
                    ? 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10'
                    : 'border-[#E8DFD3] bg-white hover:border-[#B59975]/50 hover:bg-[#FAF7F2]'
              }`}
            >
              <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-black/30 border border-black/10 relative">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                {currentIndex === idx && (
                  <div className="absolute inset-0 bg-[#B59975]/20 ring-1 ring-inset ring-[#B59975]" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <span className={`text-[9px] sm:text-[10px] uppercase font-bold tracking-wider block truncate ${
                  currentIndex === idx ? 'text-[#B59975]' : isDark ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {slide.badge.split(' ')[0]}
                </span>
                <p className={`text-xs font-medium truncate ${
                  currentIndex === idx 
                    ? isDark ? 'text-white font-semibold' : 'text-[#1C1A17] font-semibold' 
                    : isDark ? 'text-gray-300' : 'text-[#423C34]'
                }`}>
                  {slide.title}
                </p>
              </div>
            </button>
          ))}
        </div>

      </div>

      {/* High-Resolution Fullscreen Lightbox Modal */}
      {isLightboxOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center p-4 sm:p-8 animate-fadeIn"
          onClick={() => setIsLightboxOpen(false)}
        >
          {/* Lightbox Header Bar */}
          <div 
            className="w-full max-w-5xl flex items-center justify-between py-4 text-white z-20"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <span className="text-xs uppercase tracking-widest text-[#B59975] font-bold block">
                {currentSlide.badge}
              </span>
              <h4 className="text-lg sm:text-xl font-bodoni text-white">
                {currentSlide.title}
              </h4>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-gray-400">
                0{currentIndex + 1} / 0{slides.length}
              </span>
              <button
                onClick={() => setIsLightboxOpen(false)}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close fullscreen view"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Lightbox Main Image Display */}
          <div 
            className="relative max-w-5xl max-h-[75vh] w-full flex items-center justify-center overflow-hidden my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={currentSlide.image}
              alt={currentSlide.title}
              className="max-w-full max-h-[75vh] object-contain rounded-lg shadow-2xl"
              referrerPolicy="no-referrer"
            />

            {/* Lightbox Previous / Next Floating Buttons */}
            <button
              onClick={prevSlide}
              aria-label="Previous"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/60 hover:bg-black/90 border border-white/20 text-white flex items-center justify-center transition-all cursor-pointer"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextSlide}
              aria-label="Next"
              className="absolute right-3 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-[#B59975] hover:bg-[#A38865] text-[#141210] flex items-center justify-center transition-all cursor-pointer shadow-lg"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Lightbox Thumbnails Strip */}
          <div 
            className="w-full max-w-2xl flex items-center justify-center gap-2 sm:gap-3 py-3 overflow-x-auto z-20"
            onClick={(e) => e.stopPropagation()}
          >
            {slides.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => setCurrentIndex(idx)}
                className={`w-14 h-14 sm:w-16 sm:h-16 rounded-lg overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                  currentIndex === idx
                    ? 'border-[#B59975] scale-105 shadow-md'
                    : 'border-white/20 opacity-50 hover:opacity-100'
                }`}
              >
                <img
                  src={s.image}
                  alt={s.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};
