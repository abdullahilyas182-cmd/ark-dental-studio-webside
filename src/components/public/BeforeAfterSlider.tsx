import React, { useState, useRef, useCallback } from 'react';
import { BEFORE_AFTER_CASES } from '../../data/mockData';
import { BeforeAfterCase } from '../../types';
import { 
  Sparkles, ArrowLeftRight, CheckCircle2, 
  Layers, Info, ShieldCheck, ArrowRight, 
  SplitSquareVertical, Sliders, Zap
} from 'lucide-react';
import { useClinic } from '../../context/ClinicContext';

export const BeforeAfterSlider: React.FC = () => {
  const { theme } = useClinic();
  const isDark = theme === 'dark';
  const [selectedCase, setSelectedCase] = useState<BeforeAfterCase>(BEFORE_AFTER_CASES[0]);
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'exact' | 'side-by-side' | 'slider'>('exact');
  const [activeTab, setActiveTab] = useState<'overview' | 'clinical' | 'technical'>('overview');
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const width = rect.width;
    const percentage = Math.max(0, Math.min(100, (x / width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const details = selectedCase.clinicalDetails;

  return (
    <section 
      id="gallery" 
      className={`py-20 border-y transition-colors duration-300 ${
        isDark 
          ? 'bg-[#100E0C] border-[#382618]' 
          : 'bg-[#FAF7F2] border-[#E8DFD3]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div 
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-3 ${
              isDark 
                ? 'bg-[#B59975]/15 text-[#D8BE9B] border border-[#B59975]/30' 
                : 'bg-[#1F4E4A]/10 text-[#1F4E4A]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#B59975]" />
            Clinical Evidence & Aesthetic Transformations
          </div>
          <h2 
            className={`text-3xl sm:text-4xl font-serif font-bold tracking-tight ${
              isDark ? 'text-white' : 'text-[#2B2B2B]'
            }`}
          >
            Real Results. Unfiltered Artistry.
          </h2>
          <p 
            className={`mt-3 text-base leading-relaxed ${
              isDark ? 'text-[#DDD3C5]' : 'text-gray-600'
            }`}
          >
            Authentic clinical documentation from ARK Dental Studio. Compare before and after results, inspect anatomical restorations, and view verified shade differences.
          </p>
        </div>

        {/* Case selector tabs */}
        <div className="flex flex-wrap justify-center gap-2.5 mb-8">
          {BEFORE_AFTER_CASES.map((item) => (
            <button
              key={item.id}
              onClick={() => setSelectedCase(item)}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                selectedCase.id === item.id
                  ? isDark
                    ? 'bg-[#B59975] text-[#141210] font-bold shadow-lg ring-2 ring-[#B59975]/40'
                    : 'bg-[#1F4E4A] text-white shadow-md ring-2 ring-[#1F4E4A]/30'
                  : isDark
                    ? 'bg-[#1A120D] text-[#D8BE9B] hover:text-white border border-[#483526] hover:border-[#B59975]/50'
                    : 'bg-white text-gray-700 hover:bg-[#FAF6F0] border border-[#E8DFD3]'
              }`}
            >
              <span>{item.treatmentType}</span>
              {item.clinicalDetails?.shadeComparison && (
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                  selectedCase.id === item.id
                    ? isDark ? 'bg-[#141210]/20 text-[#141210]' : 'bg-white/20 text-white'
                    : isDark ? 'bg-[#B59975]/15 text-[#B59975]' : 'bg-[#1F4E4A]/10 text-[#1F4E4A]'
                }`}>
                  Difference Verified
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Main Comparison Container */}
        <div 
          className={`max-w-6xl mx-auto rounded-2xl border transition-all duration-300 shadow-2xl overflow-hidden ${
            isDark
              ? 'bg-[#1A120D]/95 backdrop-blur-md border-[#483526] text-white shadow-[0_25px_60px_rgba(0,0,0,0.6)]'
              : 'bg-white border-[#E8DFD3] text-[#2B2B2B] shadow-lg'
          }`}
        >
          {/* Top Control Bar: View Mode Selector & Quick Summary */}
          <div className={`flex flex-wrap items-center justify-between gap-4 px-6 py-4 border-b ${
            isDark ? 'border-[#382618] bg-[#140E0A]' : 'border-[#E8DFD3] bg-[#FAF7F2]'
          }`}>
            <div className="flex items-center gap-3">
              <span className={`text-xs font-semibold uppercase tracking-wider ${
                isDark ? 'text-[#B59975]' : 'text-[#1F4E4A]'
              }`}>
                {selectedCase.treatmentType}
              </span>
              <span className={`hidden sm:inline-block w-1.5 h-1.5 rounded-full ${
                isDark ? 'bg-white/20' : 'bg-gray-300'
              }`} />
              <span className={`text-xs font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                {selectedCase.title}
              </span>
            </div>

            {/* View Mode Toggle: Exact Clinical Stack vs Side-by-Side vs Interactive Slider */}
            <div className="flex items-center gap-1.5 p-1 rounded-lg border bg-black/10 border-white/10">
              <button
                type="button"
                onClick={() => setViewMode('exact')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                  viewMode === 'exact'
                    ? isDark
                      ? 'bg-[#B59975] text-[#141210] shadow-xs font-bold'
                      : 'bg-[#1F4E4A] text-white shadow-xs font-bold'
                    : isDark
                      ? 'text-gray-300 hover:text-white'
                      : 'text-gray-600 hover:text-gray-900'
                }`}
                title="Exact clinical before/after split photo as documented"
              >
                <SplitSquareVertical className="w-3.5 h-3.5" />
                <span>Exact Clinical Photo</span>
              </button>

              <button
                type="button"
                onClick={() => setViewMode('side-by-side')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                  viewMode === 'side-by-side'
                    ? isDark
                      ? 'bg-[#B59975] text-[#141210] shadow-xs font-bold'
                      : 'bg-[#1F4E4A] text-white shadow-xs font-bold'
                    : isDark
                      ? 'text-gray-300 hover:text-white'
                      : 'text-gray-600 hover:text-gray-900'
                }`}
                title="Side by side before and after comparison"
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Side-by-Side</span>
              </button>

              <button
                type="button"
                onClick={() => setViewMode('slider')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                  viewMode === 'slider'
                    ? isDark
                      ? 'bg-[#B59975] text-[#141210] shadow-xs font-bold'
                      : 'bg-[#1F4E4A] text-white shadow-xs font-bold'
                    : isDark
                      ? 'text-gray-300 hover:text-white'
                      : 'text-gray-600 hover:text-gray-900'
                }`}
                title="Interactive drag comparison"
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>Interactive Slider</span>
              </button>
            </div>
          </div>

          {/* Body: Comparison Visual on Left, Detailed Clinical Difference on Right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            {/* Visual Column */}
            <div className="lg:col-span-7 p-5 sm:p-7 border-b lg:border-b-0 lg:border-r border-[#382618]/50 flex flex-col justify-between">
              {viewMode === 'exact' ? (
                <div>
                  {/* Exact Clinical Photo View (Exact top & bottom composition as uploaded) */}
                  <div className={`relative w-full rounded-xl overflow-hidden border shadow-2xl ${
                    isDark ? 'border-[#483526] bg-[#0E0A08]' : 'border-[#E8DFD3] bg-gray-50'
                  }`}>
                    <img
                      src={selectedCase.fullCaseImage || selectedCase.afterImage}
                      alt={`${selectedCase.title} - Clinical Macro Photo`}
                      className="w-full h-auto object-contain max-h-[520px] mx-auto block select-none"
                      referrerPolicy="no-referrer"
                    />

                    {/* Top Clinical Label (Before) */}
                    <div className="absolute top-3 left-3 bg-black/85 backdrop-blur-md border border-amber-500/50 text-amber-300 text-[11px] font-bold tracking-wider uppercase px-3 py-1.5 rounded-md shadow-lg flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                      <span>TOP: BEFORE (PRE-OP)</span>
                    </div>

                    {/* Central Dividing Line & Difference Indicator */}
                    <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none">
                      <div className="w-full border-t border-dashed border-white/40 shadow-sm" />
                      <div className="absolute bg-[#140E0A]/95 text-[#D8BE9B] border border-[#B59975] text-[10px] font-bold uppercase tracking-widest px-3 py-0.5 rounded-full shadow-xl">
                        TRANSFORMATION SPLIT
                      </div>
                    </div>

                    {/* Bottom Clinical Label (After) */}
                    <div className="absolute bottom-3 left-3 bg-black/85 backdrop-blur-md border border-emerald-500/50 text-emerald-300 text-[11px] font-bold tracking-wider uppercase px-3 py-1.5 rounded-md shadow-lg flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>BOTTOM: AFTER (POST-OP)</span>
                    </div>

                    {/* Doctor stamp */}
                    <div className="absolute bottom-3 right-3 bg-[#141210]/95 backdrop-blur-md border border-[#B59975] text-white px-3 py-1 rounded text-[11px] font-serif font-bold text-[#D8BE9B]">
                      Dr. Muhammad Ali Riaz Khan
                    </div>
                  </div>

                  <p className={`text-xs mt-2.5 text-center italic ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    Exact clinical macro photograph documenting before (top) and after (bottom) at ARK Dental Studio.
                  </p>
                </div>
              ) : viewMode === 'side-by-side' ? (
                <div>
                  {/* Side-by-Side Dual Frame View */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* Before Frame */}
                    <div className={`relative rounded-xl overflow-hidden border ${
                      isDark ? 'border-[#483526] bg-[#0E0A08]' : 'border-[#E8DFD3] bg-white'
                    }`}>
                      <div className="aspect-4/3 w-full overflow-hidden relative">
                        <img
                          src={selectedCase.beforeImage}
                          alt={`${selectedCase.title} - Before`}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute top-2.5 left-2.5 bg-black/80 text-amber-300 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded shadow-md border border-amber-500/30">
                          Before Treatment
                        </div>
                      </div>
                      <div className={`p-2.5 text-xs ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                        <span className="font-bold text-amber-500 block text-[10px] uppercase">Initial Condition:</span>
                        <p className="truncate">{details?.conditionBefore?.[0] || 'Pre-operative state'}</p>
                      </div>
                    </div>

                    {/* After Frame */}
                    <div className={`relative rounded-xl overflow-hidden border ${
                      isDark ? 'border-[#483526] bg-[#0E0A08]' : 'border-[#E8DFD3] bg-white'
                    }`}>
                      <div className="aspect-4/3 w-full overflow-hidden relative">
                        <img
                          src={selectedCase.afterImage}
                          alt={`${selectedCase.title} - After`}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute top-2.5 left-2.5 bg-emerald-950/80 text-emerald-300 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded shadow-md border border-emerald-500/40 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                          <span>After Result</span>
                        </div>
                      </div>
                      <div className={`p-2.5 text-xs ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                        <span className="font-bold text-emerald-400 block text-[10px] uppercase">Restoration Outcome:</span>
                        <p className="truncate">{details?.resultAfter?.[0] || 'Post-operative result'}</p>
                      </div>
                    </div>
                  </div>

                  <p className={`text-xs mt-2.5 text-center italic ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    Direct side-by-side comparison of pre-operative baseline vs. final clinical result.
                  </p>
                </div>
              ) : (
                <div>
                  {/* Interactive Slider View */}
                  <div
                    ref={containerRef}
                    onMouseDown={() => setIsDragging(true)}
                    onMouseUp={() => setIsDragging(false)}
                    onMouseLeave={() => setIsDragging(false)}
                    onMouseMove={handleMouseMove}
                    onTouchMove={handleTouchMove}
                    className={`relative aspect-4/3 w-full rounded-xl overflow-hidden cursor-ew-resize select-none border shadow-inner ${
                      isDark ? 'border-[#483526]' : 'border-[#E8DFD3]'
                    }`}
                  >
                    {/* After image (Background) */}
                    <img
                      src={selectedCase.afterImage}
                      alt={`${selectedCase.title} - After`}
                      className="absolute inset-0 w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-3 right-3 bg-emerald-950/80 border border-emerald-500/40 text-emerald-200 text-[11px] font-bold tracking-wider uppercase px-3 py-1 rounded-md shadow-md backdrop-blur-sm flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      AFTER RESTORATION
                    </div>

                    {/* Dr. Muhammad Ali Riaz Khan verified attribution */}
                    <div 
                      id="teeth-photo-caption"
                      className="absolute bottom-3 right-3 z-10 bg-[#141210]/90 backdrop-blur-md border border-[#B59975] text-white px-3 py-1.5 rounded-sm shadow-xl flex items-center gap-2"
                    >
                      <span className="w-2 h-2 rounded-full bg-[#B59975] animate-pulse" />
                      <span className="text-[11px] font-serif font-bold tracking-wider text-[#B59975] uppercase">
                        Dr. Muhammad Ali Riaz Khan
                      </span>
                    </div>

                    {/* Before image (Clipped foreground) */}
                    <div
                      className="absolute inset-0 overflow-hidden"
                      style={{ width: `${sliderPosition}%` }}
                    >
                      <img
                        src={selectedCase.beforeImage}
                        alt={`${selectedCase.title} - Before`}
                        className="absolute inset-0 w-full h-full object-cover max-w-none"
                        style={{
                          width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%',
                          height: '100%',
                        }}
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-3 left-3 bg-[#2B2B2B]/90 border border-amber-500/30 text-amber-200 text-[11px] font-bold tracking-wider uppercase px-3 py-1 rounded-md shadow-md backdrop-blur-sm">
                        BEFORE TREATMENT
                      </div>
                    </div>

                    {/* Draggable Divider Line */}
                    <div
                      className="absolute top-0 bottom-0 w-1 bg-white shadow-2xl cursor-ew-resize flex items-center justify-center -ml-0.5"
                      style={{ left: `${sliderPosition}%` }}
                    >
                      <div 
                        className={`w-9 h-9 rounded-full shadow-xl border flex items-center justify-center transition-transform hover:scale-110 ${
                          isDark 
                            ? 'bg-[#1A120D] text-[#D8BE9B] border-[#B59975]' 
                            : 'bg-white text-[#1F4E4A] border-[#E8DFD3]'
                        }`}
                      >
                        <ArrowLeftRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>

                  <div 
                    className={`flex items-center justify-between text-[11px] mt-3 px-1 ${
                      isDark ? 'text-gray-400' : 'text-gray-500'
                    }`}
                  >
                    <span>← Drag left to reveal After</span>
                    <span className={`font-semibold flex items-center gap-1 ${isDark ? 'text-[#D8BE9B]' : 'text-[#1F4E4A]'}`}>
                      <ArrowLeftRight className="w-3 h-3" />
                      Interactive Split Comparison ({Math.round(sliderPosition)}%)
                    </span>
                    <span>Drag right for Before →</span>
                  </div>
                </div>
              )}

              {/* Shade & Structural Transformation Delta Banner */}
              {details?.shadeComparison && (
                <div className={`mt-5 p-4 rounded-xl border flex flex-col sm:flex-row items-center justify-between gap-3 ${
                  isDark ? 'bg-[#120D09] border-[#382618]' : 'bg-[#FAF7F2] border-[#E8DFD3]'
                }`}>
                  <div className="text-center sm:text-left">
                    <span className="text-[10px] uppercase font-bold text-amber-500 tracking-wider block">
                      Before Baseline
                    </span>
                    <span className={`text-xs font-semibold ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
                      {details.shadeComparison.before}
                    </span>
                  </div>

                  <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold ${
                    isDark ? 'bg-[#B59975]/20 text-[#D8BE9B]' : 'bg-[#1F4E4A]/10 text-[#1F4E4A]'
                  }`}>
                    <span>Difference</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>

                  <div className="text-center sm:text-right">
                    <span className="text-[10px] uppercase font-bold text-emerald-500 tracking-wider block">
                      After Transformation
                    </span>
                    <span className={`text-xs font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {details.shadeComparison.after}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Clinical Details & Difference Column */}
            <div className="lg:col-span-5 p-5 sm:p-7 space-y-5 flex flex-col justify-between">
              <div>
                {/* Header info */}
                <div className={`border-b pb-4 ${isDark ? 'border-white/10' : 'border-[#E8DFD3]'}`}>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#B59975] uppercase tracking-wider">
                      Case Analysis
                    </span>
                    <span className={`text-[11px] px-2.5 py-0.5 rounded-full font-medium ${
                      isDark ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-800/40' : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      Verified Treatment
                    </span>
                  </div>
                  <h3 className={`text-xl font-serif font-bold mt-1.5 ${isDark ? 'text-white' : 'text-[#2B2B2B]'}`}>
                    {selectedCase.title}
                  </h3>
                  <p className={`text-xs mt-1 ${isDark ? 'text-[#DDD3C5]/80' : 'text-gray-500'}`}>
                    Patient Profile: <strong className={isDark ? 'text-gray-200' : 'text-gray-700'}>{selectedCase.patientAgeGender}</strong>
                  </p>
                </div>

                {/* Sub-tab navigation for deep details */}
                <div className="flex border-b mt-4 gap-4 text-xs font-medium">
                  <button
                    type="button"
                    onClick={() => setActiveTab('overview')}
                    className={`pb-2 border-b-2 transition-all cursor-pointer ${
                      activeTab === 'overview'
                        ? isDark ? 'border-[#B59975] text-[#D8BE9B] font-bold' : 'border-[#1F4E4A] text-[#1F4E4A] font-bold'
                        : isDark ? 'border-transparent text-gray-400 hover:text-white' : 'border-transparent text-gray-500 hover:text-gray-900'
                    }`}
                  >
                    The Difference
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('clinical')}
                    className={`pb-2 border-b-2 transition-all cursor-pointer ${
                      activeTab === 'clinical'
                        ? isDark ? 'border-[#B59975] text-[#D8BE9B] font-bold' : 'border-[#1F4E4A] text-[#1F4E4A] font-bold'
                        : isDark ? 'border-transparent text-gray-400 hover:text-white' : 'border-transparent text-gray-500 hover:text-gray-900'
                    }`}
                  >
                    Clinical Details
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('technical')}
                    className={`pb-2 border-b-2 transition-all cursor-pointer ${
                      activeTab === 'technical'
                        ? isDark ? 'border-[#B59975] text-[#D8BE9B] font-bold' : 'border-[#1F4E4A] text-[#1F4E4A] font-bold'
                        : isDark ? 'border-transparent text-gray-400 hover:text-white' : 'border-transparent text-gray-500 hover:text-gray-900'
                    }`}
                  >
                    Materials & Tech
                  </button>
                </div>

                {/* Tab Content: The Difference */}
                {activeTab === 'overview' && (
                  <div className="mt-4 space-y-4">
                    <p className={`text-xs leading-relaxed ${isDark ? 'text-[#DDD3C5]' : 'text-gray-600'}`}>
                      {selectedCase.description}
                    </p>

                    {details && (
                      <div className="space-y-3">
                        {/* Before conditions */}
                        <div className={`p-3 rounded-lg border text-xs ${
                          isDark ? 'bg-amber-950/20 border-amber-900/30' : 'bg-amber-50/70 border-amber-200'
                        }`}>
                          <span className="font-bold text-amber-500 uppercase tracking-wider text-[10px] block mb-1">
                            Before Treatment (Pre-Op Diagnosis):
                          </span>
                          <ul className="space-y-1">
                            {details.conditionBefore.map((cond, idx) => (
                              <li key={idx} className={`flex items-start gap-1.5 ${isDark ? 'text-amber-200/90' : 'text-amber-900'}`}>
                                <span className="text-amber-500 mt-0.5">•</span>
                                <span>{cond}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* After results */}
                        <div className={`p-3 rounded-lg border text-xs ${
                          isDark ? 'bg-emerald-950/20 border-emerald-900/30' : 'bg-emerald-50/70 border-emerald-200'
                        }`}>
                          <span className="font-bold text-emerald-400 uppercase tracking-wider text-[10px] block mb-1">
                            After Transformation (Clinical Outcome):
                          </span>
                          <ul className="space-y-1">
                            {details.resultAfter.map((res, idx) => (
                              <li key={idx} className={`flex items-start gap-1.5 ${isDark ? 'text-emerald-200/90' : 'text-emerald-900'}`}>
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                                <span>{res}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Tab Content: Clinical Details */}
                {activeTab === 'clinical' && (
                  <div className="mt-4 space-y-3 text-xs">
                    {details?.technicalHighlights && (
                      <div>
                        <span className="font-bold text-[#B59975] uppercase tracking-wider text-[10px] block mb-2">
                          Specialist Surgical & Biological Protocols:
                        </span>
                        <div className="space-y-2">
                          {details.technicalHighlights.map((point, idx) => (
                            <div key={idx} className={`p-2.5 rounded-lg border flex items-start gap-2 ${
                              isDark ? 'bg-[#120D09] border-[#382618] text-gray-300' : 'bg-white border-[#E8DFD3] text-gray-700'
                            }`}>
                              <Zap className="w-3.5 h-3.5 text-[#B59975] shrink-0 mt-0.5" />
                              <span>{point}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {details?.anatomyNotes && (
                      <div className={`p-3 rounded-lg border ${
                        isDark ? 'bg-[#120D09] border-[#382618] text-gray-300' : 'bg-white border-[#E8DFD3] text-gray-700'
                      }`}>
                        <span className="font-bold text-xs text-[#B59975] block mb-1">
                          Anatomical Notes:
                        </span>
                        <p className="leading-relaxed">{details.anatomyNotes}</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Tab Content: Materials & Tech */}
                {activeTab === 'technical' && (
                  <div className="mt-4 space-y-3 text-xs">
                    {details?.materialsUsed && (
                      <div className={`p-3.5 rounded-lg border ${
                        isDark ? 'bg-[#120D09] border-[#382618]' : 'bg-[#FAF7F2] border-[#E8DFD3]'
                      }`}>
                        <span className="font-bold text-[#B59975] uppercase tracking-wider text-[10px] block mb-1.5">
                          Restorative Materials & Armamentarium:
                        </span>
                        <p className={`leading-relaxed ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
                          {details.materialsUsed}
                        </p>
                      </div>
                    )}

                    <div className={`p-3.5 rounded-lg border space-y-2 ${
                      isDark ? 'bg-[#120D09] border-[#382618]' : 'bg-[#FAF7F2] border-[#E8DFD3]'
                    }`}>
                      <div className="flex justify-between items-center">
                        <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Lead Clinician:</span>
                        <span className={`font-semibold ${isDark ? 'text-[#D8BE9B]' : 'text-[#1F4E4A]'}`}>
                          {selectedCase.doctorName}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Accreditation:</span>
                        <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-800'}`}>
                          Specialist Oral & Maxillofacial Surgeon (FCPS)
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Session Time:</span>
                        <span className={`font-semibold ${isDark ? 'text-white' : 'text-[#2B2B2B]'}`}>
                          {selectedCase.durationWeeks}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Quick Metric Card & Verification */}
              <div className={`mt-5 p-3.5 rounded-xl border space-y-2 text-xs ${
                isDark 
                  ? 'bg-[#120D09] border-[#382618] text-gray-300' 
                  : 'bg-[#FAF7F2] border-[#E8DFD3] text-gray-700'
              }`}>
                <div className="flex justify-between items-center">
                  <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Treatment Duration:</span>
                  <span className={`font-semibold ${isDark ? 'text-white' : 'text-[#2B2B2B]'}`}>
                    {selectedCase.durationWeeks}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Clinical Standard:</span>
                  <span className={`font-semibold ${isDark ? 'text-[#D8BE9B]' : 'text-[#1F4E4A]'}`}>
                    ISO Clean-Room & High Magnification
                  </span>
                </div>
                <div className={`flex items-center gap-1.5 pt-1 border-t ${
                  isDark ? 'border-white/5 text-emerald-400' : 'border-gray-200 text-emerald-700'
                }`}>
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-[11px] font-medium">Unretouched Clinical Photography with Patient Consent</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
