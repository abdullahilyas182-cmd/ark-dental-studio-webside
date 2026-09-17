import React, { useState } from 'react';
import { Sparkles, ShieldCheck, Cpu, Building2, Armchair, Briefcase, CheckCircle2, Maximize2, X } from 'lucide-react';

interface ClinicFacilitiesSectionProps {
  isDark?: boolean;
  onBookAppointment?: () => void;
}

interface FacilityBlock {
  id: string;
  category: string;
  heading: string;
  subtitle: string;
  image: string;
  imageAlt: string;
  paragraph: string;
  keyPoints: string[];
  badge: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const ClinicFacilitiesSection: React.FC<ClinicFacilitiesSectionProps> = ({
  isDark = false,
  onBookAppointment
}) => {
  const [activeLightboxImage, setActiveLightboxImage] = useState<{ src: string; alt: string; title: string } | null>(null);

  const facilityBlocks: FacilityBlock[] = [
    {
      id: 'block_1',
      category: 'State-of-the-Art Machinery',
      heading: 'Advanced Technology – SL-600',
      subtitle: 'Exclusive Surgical & Clinical Precision Workstation',
      image: '/images/CL600_Machine.jpg',
      imageAlt: 'SL-600 Advanced Dental Treatment Machine at ARK Dental Studio',
      badge: 'EXCLUSIVE PROVIDER IN KPK',
      icon: Cpu,
      paragraph:
        'ARK Dental Studio is proud to feature the SL-600, the latest model treatment and surgical machine, setting a new benchmark for oral healthcare in the region. We are honored to be the exclusive provider of this advanced technology in all of KPK (Khyber Pakhtunkhwa). Engineered with micron-level digital calibration, real-time diagnostic imaging telemetry, and synchronized LED surgical illumination, the SL-600 delivers unmatched diagnostic and procedural accuracy. Its ergonomic zero-strain positioning and ultra-gentle delivery systems ensure exceptional patient comfort, painless interventions, and predictable, world-class clinical outcomes.',
      keyPoints: [
        'Exclusive provider of the SL-600 machine in all of KPK',
        'Next-generation diagnostic accuracy & real-time operatory telemetry',
        'Sub-millimeter micro-surgical precision for restorative & implant procedures',
        'Ergonomic zero-strain contouring for unparalleled patient comfort'
      ]
    },
    {
      id: 'block_2',
      category: 'Reception Area',
      heading: 'Executive Reception & Consultation Suite',
      subtitle: 'Hospitality-Inspired Arrival & Unhurried Clinical Check-In',
      image: '/images/ark_reception_front_desk_portrait.jpg',
      imageAlt: 'ARK Dental Studio Reception Desk with Signature Plaque Sign and Fluted Walnut Paneling',
      badge: 'OFFICIAL PRACTICE FACILITY',
      icon: Building2,
      paragraph:
        'Our contemporary reception area is thoughtfully designed to redefine your perception of dental care from the moment you step through our doors. Showcasing bespoke fluted walnut architectural millwork, the signature brushed metal ARK Dental Studio plaque, and warm ambient ceiling illumination, the space exudes understated elegance. Our dedicated concierge team ensures a smooth, professional, and genuinely welcoming onboarding experience, handling medical registrations, consultation prep, and appointment scheduling with utmost confidentiality and attentiveness.',
      keyPoints: [
        'Bespoke fluted walnut architectural joinery & signature studio insignia',
        'Warm, tranquil ambiance designed to eliminate clinical apprehension',
        'Smooth, efficient, and discreet digital onboarding protocols',
        'Attentive concierge team providing personalized hospitality'
      ]
    },
    {
      id: 'block_3',
      category: 'Clinic Lobby',
      heading: 'Serene & Comfortable Lobby',
      subtitle: 'Tranquil Pre-Care & Post-Treatment Relaxation Haven',
      image: '/images/ark_boucle_lounge.jpg',
      imageAlt: 'Serene Clinic Lobby with Bouclé Armchair and Marble Tables',
      badge: 'STRESS-FREE SANCTUARY',
      icon: Armchair,
      paragraph:
        'Patient peace of mind is central to our clinical philosophy. Our serene clinic lobby provides an oasis of calm, replacing sterile waiting rooms with a comfortable, stress-free relaxation sanctuary. Featuring custom textured bouclé seating, natural fluted wood panels, dual Italian Carrara marble nested tables, and curated organic botanicals, the environment is acoustically insulated to promote complete relaxation. Whether preparing for a procedure or resting post-treatment, patients and their accompanying families enjoy unhurried serenity.',
      keyPoints: [
        'Plush textured bouclé armchairs and Italian Carrara marble accents',
        'Acoustically softened atmosphere for absolute tranquility & privacy',
        'Designed specifically for stress-free waiting and gentle post-care recovery',
        'Curated botanical styling and soft ambient indirect lighting'
      ]
    },
    {
      id: 'block_4',
      category: 'Office Interior & Ambiance',
      heading: 'Sophisticated Clinic Ambiance',
      subtitle: 'Refined Clinical Elegance & Uncompromising Hygiene',
      image: '/images/ark_consultation_suite.jpg',
      imageAlt: 'Sophisticated Consultation Office of Dr. Muhammad Ali Riaz Khan',
      badge: 'SPECIALIST SUITE',
      icon: Briefcase,
      paragraph:
        'Dr. Muhammad Ali Riaz Khan’s private consultation office embodies the harmony between refined aesthetic design and clinical rigor. Featuring an illuminated architectural halo niche, executive walnut cabinetry, and accredited board diplomas, the suite provides an intimate, confidential setting for detailed diagnostics and collaborative treatment discussions. Maintained under hospital-grade sterilization protocols, the environment guarantees a clean, hygienic, and aesthetically inspiring space where patients gain full confidence in their personalized care plans.',
      keyPoints: [
        'Illuminated architectural feature niche and bespoke walnut executive desk',
        'Hospital-grade sanitization standards with pristine hygiene control',
        'Confidential one-on-one specialist consultations & 3D digital planning',
        'Board-certified surgical credentials and international clinical recognition'
      ]
    }
  ];

  return (
    <section
      id="clinic-facilities"
      className={`relative py-20 sm:py-28 lg:py-32 transition-colors duration-300 border-t overflow-hidden ${
        isDark
          ? 'text-white border-[#3B2C20]'
          : 'text-[#1C1A17] border-[#D9CEBE]'
      }`}
    >
      {/* Royal Brown & Champagne Beige Textured Background Layer */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none"
        style={{
          backgroundImage: isDark
            ? `url('/images/royal_brown_beige.jpg')`
            : `url('/images/royal_beige_brown.jpg')`,
          opacity: isDark ? 0.8 : 0.75
        }}
      />
      {/* Layered Architectural Scrim Overlays for Opulence & Readability */}
      <div 
        className={`absolute inset-0 pointer-events-none ${
          isDark
            ? 'bg-gradient-to-b from-[#130E0A]/95 via-[#1B140D]/88 to-[#0E0A07]/97'
            : 'bg-gradient-to-b from-[#FAF6F0]/95 via-[#F6EFE5]/88 to-[#EDE4D5]/96'
        }`} 
      />
      <div 
        className={`absolute inset-0 pointer-events-none ${
          isDark
            ? 'bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#D8BE9B]/15 via-transparent to-transparent'
            : 'bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#C4A985]/20 via-transparent to-transparent'
        }`}
      />
      {/* Royal Gold Top & Bottom Dividing Accents */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#C4A985]/40 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#C4A985]/40 to-transparent pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 lg:mb-28">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#B59975]/10 border border-[#B59975]/30 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#B59975]" />
            <span className="text-[11px] font-bold tracking-[0.25em] text-[#B59975] uppercase">
              FACILITIES & ADVANCED TECHNOLOGY
            </span>
          </div>
          <h2
            className={`text-3xl sm:text-4xl lg:text-5xl font-bodoni font-normal tracking-tight ${
              isDark ? 'text-white' : 'text-[#1C1A17]'
            }`}
          >
            Precision Engineering & Sanctuary Architecture
          </h2>
          <div className="w-16 h-0.5 bg-[#B59975] mx-auto mt-5 mb-4" />
          <p
            className={`text-sm sm:text-base font-light max-w-2xl mx-auto leading-relaxed ${
              isDark ? 'text-gray-300' : 'text-[#6B6357]'
            }`}
          >
            Explore our state-of-the-art medical technology, welcoming reception, and tranquil clinical environment designed to provide unmatched precision and comfort in Peshawar.
          </p>
        </div>

        {/* Content Blocks - Alternating Layout with Generous Spacing */}
        <div className="space-y-24 sm:space-y-32 lg:space-y-36">
          {facilityBlocks.map((block, idx) => {
            const isReversed = idx % 2 === 1;
            const Icon = block.icon;

            return (
              <div
                key={block.id}
                id={block.id}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center ${
                  isReversed ? 'lg:flex-row-reverse' : ''
                }`}
              >
                
                {/* Image Column */}
                <div
                  className={`lg:col-span-5 ${
                    isReversed ? 'lg:order-2' : 'lg:order-1'
                  }`}
                >
                  <div className="relative group max-w-[460px] mx-auto">
                    
                    {/* Badge & Info Header above the photo (never covering the photo itself) */}
                    <div className="flex items-center justify-between mb-3 px-1">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#B59975]/15 border border-[#B59975]/30 text-[#B59975] text-[11px] font-bold tracking-wider uppercase shadow-xs">
                        <Icon className="w-3.5 h-3.5 text-[#B59975]" />
                        {block.badge}
                      </span>
                      <span className="text-[11px] text-gray-400 dark:text-gray-400 font-light flex items-center gap-1">
                        <Maximize2 className="w-3 h-3 text-[#B59975]" /> Click for full view
                      </span>
                    </div>

                    {/* Image Container - Exact, uncropped presentation matching original photo */}
                    <div
                      onClick={() =>
                        setActiveLightboxImage({
                          src: block.image,
                          alt: block.imageAlt,
                          title: block.heading
                        })
                      }
                      className={`relative w-full rounded-2xl overflow-hidden border cursor-pointer shadow-xl transition-all duration-300 hover:shadow-2xl ${
                        isDark
                          ? 'bg-[#19130E] border-[#483526] hover:border-[#C4A985]'
                          : 'bg-white border-[#E2D5C4] hover:border-[#C4A985]'
                      }`}
                      title="Click to view full photo in original resolution"
                    >
                      <img
                        id={`facility-img-${block.id}`}
                        src={block.image}
                        alt={block.imageAlt}
                        className="w-full h-auto block object-contain select-none transition-transform duration-500 group-hover:scale-[1.02]"
                        style={{
                          width: '100%',
                          height: 'auto',
                          display: 'block',
                          objectFit: 'contain'
                        }}
                        referrerPolicy="no-referrer"
                        loading="eager"
                      />
                    </div>

                  </div>
                </div>

                {/* Text Content Column */}
                <div
                  className={`lg:col-span-7 space-y-6 ${
                    isReversed ? 'lg:order-1' : 'lg:order-2'
                  }`}
                >
                  
                  {/* Category Eyebrow */}
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-px bg-[#B59975]" />
                    <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#B59975]">
                      {block.category}
                    </span>
                  </div>

                  {/* Heading & Subtitle */}
                  <div>
                    <h3
                      className={`text-2xl sm:text-3xl lg:text-4xl font-bodoni font-normal tracking-tight leading-tight ${
                        isDark ? 'text-white' : 'text-[#1C1A17]'
                      }`}
                    >
                      {block.heading}
                    </h3>
                    <p
                      className={`text-xs sm:text-sm font-medium mt-1 tracking-wide ${
                        isDark ? 'text-[#B59975]' : 'text-[#8C6D46]'
                      }`}
                    >
                      {block.subtitle}
                    </p>
                  </div>

                  {/* Detailed Professional Paragraph */}
                  <p
                    className={`text-sm sm:text-base leading-relaxed font-light ${
                      isDark ? 'text-gray-300' : 'text-[#423C34]'
                    }`}
                  >
                    {block.paragraph}
                  </p>

                  {/* Key Highlights List */}
                  <div
                    className={`p-5 sm:p-6 rounded-2xl border space-y-3.5 backdrop-blur-sm ${
                      isDark
                        ? 'bg-[#19130E]/80 border-[#483526]'
                        : 'bg-white/90 border-[#E2D5C4] shadow-xs'
                    }`}
                  >
                    <h4
                      className={`text-xs font-bold uppercase tracking-wider ${
                        isDark ? 'text-gray-200' : 'text-[#1C1A17]'
                      }`}
                    >
                      Key Feature Highlights
                    </h4>
                    <ul className="space-y-2.5">
                      {block.keyPoints.map((point, pIdx) => (
                        <li key={pIdx} className="flex items-start gap-3">
                          <CheckCircle2 className="w-4 h-4 text-[#B59975] shrink-0 mt-0.5" />
                          <span
                            className={`text-xs sm:text-sm leading-snug ${
                              isDark ? 'text-gray-300' : 'text-[#5C5346]'
                            }`}
                          >
                            {point}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Contextual Action Button */}
                  {onBookAppointment && (
                    <div className="pt-2">
                      <button
                        onClick={onBookAppointment}
                        className="inline-flex items-center gap-2 bg-[#B59975] hover:bg-[#A38865] text-[#141210] font-semibold px-6 py-3 rounded-sm text-xs tracking-wider uppercase transition-all shadow-md cursor-pointer"
                      >
                        <ShieldCheck className="w-4 h-4" />
                        <span>Experience Our Care</span>
                      </button>
                    </div>
                  )}

                </div>

              </div>
            );
          })}
        </div>

      </div>

      {/* Lightbox Modal for Full-Resolution Image Inspection */}
      {activeLightboxImage && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center p-4 sm:p-8 animate-fadeIn"
          onClick={() => setActiveLightboxImage(null)}
        >
          {/* Header Bar */}
          <div
            className="w-full max-w-4xl flex items-center justify-between pb-4 border-b border-white/10 mb-4 text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <p className="text-xs text-[#B59975] uppercase tracking-wider font-semibold">
                ARK Dental Studio Facility
              </p>
              <h4 className="text-lg sm:text-xl font-bodoni font-normal">
                {activeLightboxImage.title}
              </h4>
            </div>
            <button
              onClick={() => setActiveLightboxImage(null)}
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Image Display */}
          <div
            className="relative max-w-4xl max-h-[80vh] flex items-center justify-center overflow-hidden rounded-xl border border-white/15 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={activeLightboxImage.src}
              alt={activeLightboxImage.alt}
              className="max-h-[80vh] w-auto max-w-full object-contain"
              referrerPolicy="no-referrer"
            />
          </div>

          <p className="text-xs text-gray-400 mt-3 text-center">
            Click anywhere outside or press the close button to return
          </p>
        </div>
      )}
    </section>
  );
};
