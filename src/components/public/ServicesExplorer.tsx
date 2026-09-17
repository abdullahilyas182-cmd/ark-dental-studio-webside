import React, { useState } from 'react';
import { SERVICES, MAJOR_SERVICE_CATEGORIES } from '../../data/mockData';
import { MajorServiceCategory, ServiceItem } from '../../types';
import { ServiceDetailModal } from './ServiceDetailModal';
import { getTreatmentByName } from '../../data/treatmentServicesData';
import { TreatmentVoiceAssistant } from './TreatmentVoiceAssistant';
import { 
  Sparkles, CheckCircle, Clock, ChevronDown, ChevronUp, 
  ArrowRight, ShieldCheck, HelpCircle, Info, Calendar, Stethoscope, Activity
} from 'lucide-react';

interface ServicesExplorerProps {
  onBookService: (serviceTitle: string) => void;
}

export const ServicesExplorer: React.FC<ServicesExplorerProps> = ({ onBookService }) => {
  const [selectedCategoryModal, setSelectedCategoryModal] = useState<MajorServiceCategory | null>(null);
  const [selectedFilterCategory, setSelectedFilterCategory] = useState<string>('All');
  const [expandedServiceId, setExpandedServiceId] = useState<string>('srv-root-canal');

  const categories = ['All', 'Restorative', 'Surgery', 'Aesthetics', 'Orthodontics', 'Family'];

  const filteredServices = selectedFilterCategory === 'All' 
    ? SERVICES 
    : SERVICES.filter(s => s.category === selectedFilterCategory);

  return (
    <div className="w-full bg-[#FAF7F2] py-16 sm:py-24 text-[#1C1A17]" id="services">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* TOP SECTION: 5 Major Categories Treatment Directory */}
        <div>
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-[11px] font-semibold tracking-[0.25em] text-[#8C8275] uppercase mb-2 block">
              TREATMENT DIRECTORY & AREAS OF EXPERTISE
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bodoni font-normal text-[#1C1A17] tracking-tight">
              Specialist Clinical Disciplines
            </h1>
            <div className="w-14 h-[1px] bg-[#B59975] mx-auto mt-4 mb-4" />
            <p className="text-sm text-[#6B6357] font-light leading-relaxed max-w-2xl mx-auto">
              From complex oral surgery and 3D guided implants to microscopic restorative care and discreet clear aligners, every treatment is planned around your unique biology.
            </p>
          </div>

          {/* 5 Major Category Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {MAJOR_SERVICE_CATEGORIES.map((cat) => {
              const isPrimary = cat.featured;
              return (
                <div
                  key={cat.id}
                  className={`p-7 rounded-sm border transition-all flex flex-col justify-between ${
                    isPrimary 
                      ? 'bg-white border-[#B59975] md:col-span-2 lg:col-span-1 shadow-md ring-1 ring-[#B59975]/40' 
                      : 'bg-white border-[#E8DFD3] hover:border-[#B59975]/60 hover:shadow-lg'
                  }`}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-semibold tracking-[0.22em] text-[#B59975] uppercase px-2.5 py-0.5 rounded-xs bg-[#B59975]/10 border border-[#B59975]/20">
                        {cat.subtitle}
                      </span>
                      {isPrimary && (
                        <span className="text-[10px] font-semibold tracking-wider text-[#1C1A17] bg-[#B59975]/30 px-2 py-0.5 rounded-xs uppercase">
                          Featured Specialty
                        </span>
                      )}
                    </div>

                    <h3 className="font-bodoni text-2xl font-normal text-[#1C1A17] leading-tight">
                      {cat.title}
                    </h3>

                    <p className="text-xs text-[#5C5346] font-light leading-relaxed">
                      {cat.description}
                    </p>

                    {/* Subcategories list */}
                    <div className="pt-3 border-t border-[#E8DFD3] space-y-1.5">
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-[#8C8275] block mb-2">
                        Procedures Include:
                      </span>
                      {cat.subcategories.slice(0, 4).map((sub, sIdx) => (
                        <div key={sIdx} className="flex items-center gap-2 text-xs text-[#3E3830]">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#B59975]" />
                          <span>{sub}</span>
                        </div>
                      ))}
                      {cat.subcategories.length > 4 && (
                        <span className="text-[11px] text-[#8C8275] italic block pt-1">
                          + {cat.subcategories.length - 4} additional procedures
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="pt-6 mt-6 border-t border-[#E8DFD3]">
                    <button
                      onClick={() => setSelectedCategoryModal(cat)}
                      className="w-full inline-flex items-center justify-between px-4 py-3 rounded-sm bg-[#1C1A17] hover:bg-[#B59975] text-white hover:text-[#141210] text-xs font-semibold tracking-wider uppercase transition-colors cursor-pointer group"
                    >
                      <span>Explore {cat.title.split(' ')[0]} Guide</span>
                      <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* BOTTOM SECTION: Detailed Procedure Explorer */}
        <div className="pt-8 border-t border-[#E8DFD3]">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8C8275] block mb-1">
                PROCEDURE CATALOGUE
              </span>
              <h2 className="text-2xl sm:text-3xl font-bodoni text-[#1C1A17]">
                Clinical Procedures & Protocols
              </h2>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedFilterCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-sm text-xs font-medium tracking-wider uppercase transition-all cursor-pointer ${
                    selectedFilterCategory === cat
                      ? 'bg-[#1C1A17] text-white shadow-xs'
                      : 'bg-white text-[#5C5346] border border-[#E8DFD3] hover:bg-[#FAF7F2]'
                  }`}
                >
                  {cat === 'All' ? 'All' : cat}
                </button>
              ))}
            </div>
          </div>

          {/* Services List with Process Steps */}
          <div className="space-y-6">
            {filteredServices.map((service) => {
              const isExpanded = expandedServiceId === service.id;

              return (
                <div 
                  key={service.id}
                  className="bg-white rounded-sm border border-[#E8DFD3] overflow-hidden shadow-xs hover:border-[#B59975]/60 transition-all"
                >
                  <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                    <div className="lg:col-span-8 space-y-3">
                      <div className="flex flex-wrap items-center gap-2.5">
                        <span className="px-2.5 py-0.5 rounded-xs text-[10px] font-semibold bg-[#FAF7F2] text-[#8C8275] border border-[#E8DFD3] uppercase tracking-wider">
                          {service.category}
                        </span>
                        <span className="text-xs text-[#B59975] font-semibold flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {service.duration}
                        </span>
                        <span className="text-xs font-semibold text-[#1C1A17] bg-[#FAF7F2] px-2.5 py-0.5 rounded-xs border border-[#E8DFD3]">
                          {service.priceRangePKR}
                        </span>
                      </div>

                      <h3 className="text-xl sm:text-2xl font-bodoni text-[#1C1A17]">
                        {service.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-[#5C5346] font-light leading-relaxed">
                        {service.description}
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2">
                        {service.highlights.map((hl, i) => (
                          <div key={i} className="flex items-center gap-2 text-xs text-[#3E3830]">
                            <CheckCircle className="w-3.5 h-3.5 text-[#B59975] shrink-0" />
                            <span>{hl}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="lg:col-span-4 flex flex-col gap-3 justify-end items-stretch">
                      {/* AI Voice Assistant Option at the side of this treatment */}
                      {(() => {
                        const easyTreatment = getTreatmentByName(service.title);
                        if (!easyTreatment) return null;
                        return (
                          <div className="w-full">
                            <TreatmentVoiceAssistant
                              treatment={easyTreatment}
                              isDark={false}
                              compact={true}
                            />
                          </div>
                        );
                      })()}

                      <div className="flex flex-col sm:flex-row lg:flex-col gap-2">
                        <button
                          onClick={() => onBookService(service.title)}
                          className="w-full inline-flex items-center justify-center gap-2 bg-[#B59975] hover:bg-[#A38865] text-[#141210] px-5 py-2.5 rounded-lg text-xs font-semibold tracking-wider uppercase shadow-xs transition-all cursor-pointer"
                        >
                          <Calendar className="w-3.5 h-3.5" />
                          <span>Book Consultation</span>
                        </button>

                        <button
                          onClick={() => setExpandedServiceId(isExpanded ? '' : service.id)}
                          className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg border border-[#E8DFD3] text-xs font-medium text-[#5C5346] hover:bg-[#FAF7F2] transition-colors cursor-pointer"
                        >
                          <span>{isExpanded ? 'Hide Details' : 'View Protocol & Steps'}</span>
                          {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="border-t border-[#E8DFD3] bg-[#FAF7F2]/70 p-6 sm:p-8 space-y-6 animate-fadeIn">
                      {service.targetAudience && (
                        <div className="p-4 rounded-sm bg-white border border-[#E8DFD3] flex items-start gap-3">
                          <Info className="w-4 h-4 text-[#B59975] shrink-0 mt-0.5" />
                          <div>
                            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#1C1A17]">
                              Who Is This Treatment For?
                            </h4>
                            <p className="text-xs text-[#5C5346] mt-1 leading-relaxed">
                              {service.targetAudience}
                            </p>
                          </div>
                        </div>
                      )}

                      {service.processSteps && service.processSteps.length > 0 && (
                        <div>
                          <h4 className="font-bodoni text-lg text-[#1C1A17] mb-3">
                            Clinical Process & What to Expect
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {service.processSteps.map((step) => (
                              <div 
                                key={step.stepNumber}
                                className="bg-white rounded-sm p-4 border border-[#E8DFD3] space-y-1.5"
                              >
                                <span className="text-[10px] font-semibold text-[#B59975] uppercase tracking-wider block">
                                  Step {step.stepNumber} {step.duration && `• ~${step.duration}`}
                                </span>
                                <h5 className="font-bodoni text-base text-[#1C1A17]">
                                  {step.title}
                                </h5>
                                <p className="text-xs text-[#5C5346] font-light leading-relaxed">
                                  {step.description}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Interactive Detail Modal for 5 Categories */}
      <ServiceDetailModal
        category={selectedCategoryModal}
        isOpen={!!selectedCategoryModal}
        onClose={() => setSelectedCategoryModal(null)}
        onBookConsultation={(catTitle) => onBookService(catTitle)}
      />
    </div>
  );
};
