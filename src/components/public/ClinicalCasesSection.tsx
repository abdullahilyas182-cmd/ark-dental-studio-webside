import React, { useState } from 'react';
import { CLINICAL_CASES } from '../../data/mockData';
import { ClinicalCase } from '../../types';
import { Shield, Sparkles, CheckCircle2, ArrowRight, Activity, Stethoscope, ChevronRight } from 'lucide-react';

interface ClinicalCasesSectionProps {
  onBookConsultation?: () => void;
}

export const ClinicalCasesSection: React.FC<ClinicalCasesSectionProps> = ({ onBookConsultation }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeCaseId, setActiveCaseId] = useState<string>(CLINICAL_CASES[0]?.id || '');

  const categories = ['All', 'Oral & Maxillofacial Surgery', 'Restorative', 'Prosthetic', 'Orthodontics'];

  const filteredCases = selectedCategory === 'All'
    ? CLINICAL_CASES
    : CLINICAL_CASES.filter(c => c.category === selectedCategory);

  const activeCase = CLINICAL_CASES.find(c => c.id === activeCaseId) || filteredCases[0];

  return (
    <section id="clinical-cases" className="py-20 md:py-24 bg-[#141210] text-[#FAF6F0] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <p className="text-[11px] font-semibold tracking-[0.25em] text-[#B59975] uppercase mb-2">
            CLINICAL CASES & OUTCOMES
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bodoni font-normal tracking-tight text-white mb-4">
            A Closer Look at Our Approach
          </h2>
          <p className="text-sm text-gray-300 font-light leading-relaxed">
            Transparent, educational documentation of complex oral surgery, restorative reconstructions, and aesthetic alignments. Each case demonstrates structured diagnosis, surgical precision, and biological healing.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2 mb-10 border-b border-white/10 pb-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                const first = cat === 'All' ? CLINICAL_CASES[0] : CLINICAL_CASES.find(c => c.category === cat);
                if (first) setActiveCaseId(first.id);
              }}
              className={`px-4 py-2 rounded-sm text-xs font-medium tracking-wider uppercase transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#B59975] text-[#141210] font-bold shadow-md'
                  : 'bg-white/5 text-gray-300 hover:text-white hover:bg-white/10 border border-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Desktop Interactive Case Explorer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Case Selector List */}
          <div className="lg:col-span-4 space-y-3">
            <span className="text-[10px] tracking-[0.2em] uppercase font-semibold text-gray-400 block mb-2">
              Select Clinical Case ({filteredCases.length})
            </span>
            {filteredCases.map((item) => {
              const isSelected = item.id === activeCase?.id;
              return (
                <div
                  key={item.id}
                  onClick={() => setActiveCaseId(item.id)}
                  className={`p-4 rounded-sm border transition-all cursor-pointer text-left ${
                    isSelected
                      ? 'bg-white/10 border-[#B59975] text-white shadow-lg'
                      : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/8 hover:text-white'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] text-[#B59975] font-semibold mb-1">
                    <span>{item.category}</span>
                    {item.duration && <span className="text-gray-400 font-normal">{item.duration}</span>}
                  </div>
                  <h3 className="font-bodoni text-base font-medium text-white mb-1.5 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">
                    {item.condition}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Right In-Depth Case Study Board */}
          {activeCase && (
            <div className="lg:col-span-8 bg-[#1B1815] border border-[#3A332B] rounded-sm p-6 sm:p-8 space-y-8 shadow-xl">
              {/* Case Header */}
              <div className="border-b border-white/10 pb-6">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xs bg-[#B59975]/15 border border-[#B59975]/40 text-[#B59975] text-[11px] font-semibold tracking-wider uppercase">
                    <Activity className="w-3.5 h-3.5" />
                    {activeCase.category}
                  </span>
                  {activeCase.duration && (
                    <span className="text-xs text-gray-400">
                      Timeline: <strong className="text-white font-medium">{activeCase.duration}</strong>
                    </span>
                  )}
                </div>
                <h3 className="text-2xl sm:text-3xl font-bodoni text-white font-normal leading-tight">
                  {activeCase.title}
                </h3>
                {activeCase.patientProfile && (
                  <p className="text-xs text-gray-400 mt-2">
                    Patient Profile: <span className="text-gray-200">{activeCase.patientProfile}</span>
                  </p>
                )}
              </div>

              {/* 4-Step Clinical Pathway Breakdown */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* 1. Condition */}
                <div className="bg-white/5 border border-white/10 rounded-sm p-5 space-y-2">
                  <div className="flex items-center gap-2 text-[#B59975] text-xs font-semibold tracking-wider uppercase">
                    <span className="w-5 h-5 rounded-full bg-[#B59975]/20 flex items-center justify-center text-[10px]">1</span>
                    <span>Clinical Condition</span>
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    {activeCase.condition}
                  </p>
                </div>

                {/* 2. Assessment */}
                <div className="bg-white/5 border border-white/10 rounded-sm p-5 space-y-2">
                  <div className="flex items-center gap-2 text-[#B59975] text-xs font-semibold tracking-wider uppercase">
                    <span className="w-5 h-5 rounded-full bg-[#B59975]/20 flex items-center justify-center text-[10px]">2</span>
                    <span>Diagnostic Assessment</span>
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    {activeCase.assessment}
                  </p>
                </div>

                {/* 3. Treatment */}
                <div className="bg-white/5 border border-white/10 rounded-sm p-5 space-y-2">
                  <div className="flex items-center gap-2 text-[#B59975] text-xs font-semibold tracking-wider uppercase">
                    <span className="w-5 h-5 rounded-full bg-[#B59975]/20 flex items-center justify-center text-[10px]">3</span>
                    <span>Treatment Protocol</span>
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    {activeCase.treatment}
                  </p>
                </div>

                {/* 4. Outcome */}
                <div className="bg-[#B59975]/10 border border-[#B59975]/30 rounded-sm p-5 space-y-2">
                  <div className="flex items-center gap-2 text-[#B59975] text-xs font-semibold tracking-wider uppercase">
                    <CheckCircle2 className="w-4 h-4 text-[#B59975]" />
                    <span>Clinical Outcome</span>
                  </div>
                  <p className="text-xs text-gray-200 leading-relaxed font-normal">
                    {activeCase.outcome}
                  </p>
                </div>
              </div>

              {/* Surgeon Note & Book Call to Action */}
              <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-xs text-gray-400 italic">
                  *Individual clinical outcomes depend on personal anatomical factors and post-operative biological adherence.
                </p>
                {onBookConsultation && (
                  <button
                    onClick={onBookConsultation}
                    className="inline-flex items-center gap-2 bg-[#B59975] hover:bg-[#A38865] text-[#141210] font-semibold px-5 py-2.5 rounded-sm text-xs tracking-wider uppercase transition-all cursor-pointer shrink-0"
                  >
                    <span>Discuss Your Case</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
