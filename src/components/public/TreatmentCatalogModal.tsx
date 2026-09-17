import React, { useState } from 'react';
import { X, Volume2, Sparkles, Check, Search, Languages, HelpCircle } from 'lucide-react';
import { 
  EASY_CLINICAL_TREATMENTS, 
  TreatmentServiceOption 
} from '../../data/treatmentServicesData';
import { TreatmentVoiceAssistant } from './TreatmentVoiceAssistant';

interface TreatmentCatalogModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTreatment: (treatment: TreatmentServiceOption) => void;
  selectedTreatmentId?: string;
  isDark?: boolean;
}

export const TreatmentCatalogModal: React.FC<TreatmentCatalogModalProps> = ({
  isOpen,
  onClose,
  onSelectTreatment,
  selectedTreatmentId,
  isDark = false
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedTreatmentId, setExpandedTreatmentId] = useState<string>(
    selectedTreatmentId || EASY_CLINICAL_TREATMENTS[0].id
  );

  if (!isOpen) return null;

  const categories = [
    { id: 'all', label: 'All Treatments' },
    { id: 'Restorative', label: 'Pain & Cavities' },
    { id: 'Prosthetic', label: 'Missing Teeth' },
    { id: 'Aesthetics', label: 'Whiten & Beautify' },
    { id: 'Orthodontics', label: 'Straighten Teeth' },
    { id: 'Surgery', label: 'Wisdom Teeth' },
    { id: 'Emergency', label: 'Urgent Care' }
  ];

  const filtered = EASY_CLINICAL_TREATMENTS.filter(t => {
    const matchesCategory = selectedCategory === 'all' || t.category === selectedCategory;
    const matchesSearch = 
      t.easyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.easyNameUrdu.includes(searchQuery) ||
      t.simpleDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.romanUrdu.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs">
      <div 
        className={`relative w-full max-w-3xl max-h-[90vh] rounded-2xl border shadow-2xl flex flex-col overflow-hidden ${
          isDark 
            ? 'bg-[#140E0A] border-[#483526] text-white' 
            : 'bg-white border-[#E8DFD3] text-gray-800'
        }`}
      >
        {/* Modal Header */}
        <div className={`p-4 sm:p-5 border-b flex items-center justify-between ${
          isDark ? 'border-[#382618] bg-[#1A120D]' : 'border-[#E8DFD3] bg-[#FAF7F2]'
        }`}>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#B59975] text-[#141210] flex items-center justify-center shadow-md">
              <Languages className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-serif font-bold tracking-wide">
                Clinical Treatments in Easy Words
              </h2>
              <p className={`text-xs ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                بغیر کسی مشکل اصطلاح کے — اردو اور انگلش وائس اسسٹنٹ کے ساتھ سنیں
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className={`p-2 rounded-full transition-colors cursor-pointer ${
              isDark ? 'hover:bg-white/10 text-gray-300' : 'hover:bg-gray-100 text-gray-600'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Category Filter */}
        <div className={`p-4 border-b space-y-3 ${
          isDark ? 'border-[#2D1C12] bg-[#0E0A08]' : 'border-gray-100 bg-gray-50/50'
        }`}>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search treatment (e.g. pain, cavity, whitening, سیدھے دانت, عقل داڑھ)..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className={`w-full pl-9 pr-4 py-2 rounded-xl text-xs border focus:outline-none focus:border-[#B59975] ${
                isDark 
                  ? 'bg-[#18120D] border-[#3D291C] text-white placeholder-gray-500' 
                  : 'bg-white border-[#E8DFD3] text-gray-800 placeholder-gray-400'
              }`}
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
            {categories.map(cat => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-full text-[11px] font-medium whitespace-nowrap transition-colors cursor-pointer ${
                  selectedCategory === cat.id
                    ? isDark 
                      ? 'bg-[#B59975] text-[#141210] font-bold' 
                      : 'bg-[#1F4E4A] text-white font-bold'
                    : isDark 
                      ? 'bg-[#20150E] text-gray-300 hover:text-white border border-[#382618]' 
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Treatment List with Voice Assistant on every item */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 divide-y divide-[#382618]/30">
          {filtered.map(item => {
            const isSelected = selectedTreatmentId === item.id;
            const isExpanded = expandedTreatmentId === item.id;

            return (
              <div 
                key={item.id} 
                className={`pt-4 first:pt-0 rounded-xl transition-all ${
                  isSelected ? 'ring-2 ring-[#B59975]/60 p-3 bg-[#B59975]/5' : ''
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#B59975]/15 text-[#B59975]">
                        {item.category}
                      </span>
                      {isSelected && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center gap-1">
                          <Check className="w-3 h-3" /> Selected for Booking
                        </span>
                      )}
                    </div>

                    <h3 className="text-sm sm:text-base font-bold text-gray-900 dark:text-white">
                      {item.easyName}
                    </h3>
                    
                    <p className="text-xs sm:text-sm font-serif font-medium text-emerald-700 dark:text-emerald-300 mt-0.5" dir="rtl">
                      {item.easyNameUrdu}
                    </p>

                    <p className={`text-xs mt-1.5 leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      {item.simpleDescription}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-start shrink-0">
                    <button
                      type="button"
                      onClick={() => {
                        onSelectTreatment(item);
                        onClose();
                      }}
                      className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-emerald-600 text-white'
                          : isDark
                            ? 'bg-[#B59975] text-[#141210] hover:bg-[#C5A882]'
                            : 'bg-[#1F4E4A] text-white hover:bg-[#28635E]'
                      }`}
                    >
                      {isSelected ? 'Selected' : 'Select Treatment'}
                    </button>
                  </div>
                </div>

                {/* AI Voice Assistant embedded right at the side / bottom of this treatment */}
                <div className="mt-3">
                  <TreatmentVoiceAssistant 
                    treatment={item}
                    isDark={isDark}
                    compact={true}
                  />
                </div>
              </div>
            );
          })}

          {filtered.length === 0 && (
            <div className="text-center py-12">
              <HelpCircle className="w-8 h-8 mx-auto text-gray-400 mb-2" />
              <p className="text-sm font-semibold">No treatments found matching your search.</p>
              <p className="text-xs text-gray-400 mt-1">Try searching for pain, whitening, implant, or dental checkup.</p>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className={`p-4 border-t flex items-center justify-between text-xs ${
          isDark ? 'border-[#382618] bg-[#140E0A] text-gray-400' : 'border-[#E8DFD3] bg-[#FAF7F2] text-gray-600'
        }`}>
          <div className="flex items-center gap-2">
            <Volume2 className="w-4 h-4 text-[#B59975]" />
            <span>AI Voice speaks clearly in Urdu and English for all treatments.</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg border border-[#B59975]/40 text-[#B59975] hover:bg-[#B59975]/10 font-medium cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
