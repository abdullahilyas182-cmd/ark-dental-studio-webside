import React from 'react';
import { MajorServiceCategory } from '../../types';
import { 
  X, CheckCircle2, ShieldCheck, ArrowRight, HelpCircle, 
  Clock, Activity, Calendar, Stethoscope, Sparkles 
} from 'lucide-react';

interface ServiceDetailModalProps {
  category: MajorServiceCategory | null;
  isOpen: boolean;
  onClose: () => void;
  onBookConsultation: (categoryTitle: string) => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  category,
  isOpen,
  onClose,
  onBookConsultation
}) => {
  if (!isOpen || !category) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div 
        className="relative w-full max-w-4xl bg-[#FAF7F2] text-[#1C1A17] rounded-sm shadow-2xl border border-[#E8DFD3] overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Banner */}
        <div className="bg-[#171412] text-white p-6 sm:p-8 relative border-b border-white/10">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="max-w-2xl space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-semibold tracking-[0.22em] text-[#B59975] uppercase px-2.5 py-0.5 rounded-xs bg-[#B59975]/15 border border-[#B59975]/30">
                {category.subtitle}
              </span>
              {category.featured && (
                <span className="text-[10px] font-semibold tracking-[0.2em] text-white/80 uppercase px-2 py-0.5 rounded-xs bg-white/10">
                  Primary Specialty
                </span>
              )}
            </div>
            <h2 className="text-2xl sm:text-4xl font-bodoni text-white font-normal leading-tight">
              {category.title}
            </h2>
            <p className="text-xs sm:text-sm text-gray-300 font-light leading-relaxed">
              {category.tagline}
            </p>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 space-y-8 max-h-[72vh] overflow-y-auto">
          {/* 1. Introduction */}
          <div>
            <h3 className="text-xs font-semibold tracking-[0.2em] uppercase text-[#8C8275] mb-2">
              CLINICAL OVERVIEW
            </h3>
            <p className="text-sm text-[#3E3830] leading-relaxed">
              {category.description}
            </p>
          </div>

          {/* 2. Conditions Treated & Procedures Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Conditions We Treat */}
            <div className="bg-white p-5 rounded-sm border border-[#E8DFD3] space-y-3">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#1C1A17] flex items-center gap-2">
                <Activity className="w-4 h-4 text-[#B59975]" />
                Conditions We Treat
              </h4>
              <ul className="space-y-2 text-xs text-[#5C5346] leading-relaxed">
                {category.conditionsTreated.map((cond, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-[#B59975] mt-0.5">•</span>
                    <span>{cond}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Specialized Procedures */}
            <div className="bg-white p-5 rounded-sm border border-[#E8DFD3] space-y-3">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#1C1A17] flex items-center gap-2">
                <Stethoscope className="w-4 h-4 text-[#B59975]" />
                Key Procedures
              </h4>
              <ul className="space-y-2 text-xs text-[#5C5346] leading-relaxed">
                {category.procedures.map((proc, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-[#B59975] mt-0.5">•</span>
                    <span>{proc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 3. Who May Benefit */}
          <div className="bg-[#FAF7F2] p-5 rounded-sm border border-[#E8DFD3] space-y-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#1C1A17]">
              Who May Benefit
            </h4>
            <ul className="space-y-1.5 text-xs text-[#5C5346] leading-relaxed">
              {category.whoMayBenefit.map((benefit, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#B59975] shrink-0 mt-0.5" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 4. Consultation Process, Treatment Journey, Recovery */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-white rounded-sm border border-[#E8DFD3] space-y-2">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-[#B59975] block">
                01 CONSULTATION
              </span>
              <p className="text-xs text-[#5C5346] leading-relaxed">
                {category.consultationProcess}
              </p>
            </div>

            <div className="p-4 bg-white rounded-sm border border-[#E8DFD3] space-y-2">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-[#B59975] block">
                02 TREATMENT JOURNEY
              </span>
              <p className="text-xs text-[#5C5346] leading-relaxed">
                {category.treatmentProcess}
              </p>
            </div>

            <div className="p-4 bg-white rounded-sm border border-[#E8DFD3] space-y-2">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-[#B59975] block">
                03 RECOVERY & HEALING
              </span>
              <p className="text-xs text-[#5C5346] leading-relaxed">
                {category.recovery}
              </p>
            </div>
          </div>

          {/* 5. Frequently Asked Questions */}
          {category.faqs && category.faqs.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#1C1A17] flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-[#B59975]" />
                Frequently Asked Questions
              </h4>
              <div className="space-y-2">
                {category.faqs.map((faq, i) => (
                  <div key={i} className="p-3.5 bg-white rounded-sm border border-[#E8DFD3] space-y-1">
                    <p className="text-xs font-medium text-[#1C1A17]">
                      Q: {faq.question}
                    </p>
                    <p className="text-xs text-[#5C5346] leading-relaxed">
                      A: {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer with Actions */}
        <div className="bg-[#FAF7F2] border-t border-[#E8DFD3] p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#7A7368]">
            Direct inquiries & referrals: <strong className="text-[#1C1A17]">0306 6677795</strong>
          </p>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="flex-1 sm:flex-initial px-4 py-2.5 rounded-sm border border-[#D9CEBF] text-xs font-medium text-[#5C5346] hover:bg-white transition-colors cursor-pointer"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onBookConsultation(category.title);
              }}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-sm bg-[#B59975] hover:bg-[#A38865] text-[#141210] text-xs font-semibold tracking-wider uppercase transition-all shadow-md cursor-pointer"
            >
              <span>Book Consultation</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
