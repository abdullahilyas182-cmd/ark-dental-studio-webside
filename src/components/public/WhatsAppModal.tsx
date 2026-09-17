import React, { useState } from 'react';
import { CLINIC_METADATA } from '../../data/mockData';
import { X, MessageCircle, Send, Sparkles, Check } from 'lucide-react';

interface WhatsAppModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WhatsAppModal: React.FC<WhatsAppModalProps> = ({ isOpen, onClose }) => {
  const [selectedTopic, setSelectedTopic] = useState('Porcelain Veneers Consultation');
  const [customText, setCustomText] = useState('');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const topics = [
    'Porcelain Veneers Consultation',
    'Laser Teeth Whitening Slot',
    'Invisalign Clear Aligners Check',
    'Dental Implant Assessment',
    'Urgent Dental Toothache Relief'
  ];

  const fullMessage = customText 
    ? `Hi ARK Dental Studio Peshawar, ${customText}`
    : `Hi ARK Dental Studio Peshawar! I would like to inquire and reserve a consultation for ${selectedTopic}. Please let me know your available doctor slots this week.`;

  const cleanPhone = CLINIC_METADATA.whatsapp.replace(/[^0-9]/g, '');
  const waUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(fullMessage)}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(fullMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
      <div className="bg-[#FAF6F0] w-full max-w-md rounded-2xl shadow-2xl border border-[#E8DFD3] overflow-hidden">
        {/* WhatsApp Branded Header */}
        <div className="bg-[#128C7E] text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg text-white">
                ARK Dental WhatsApp Concierge
              </h3>
              <p className="text-xs text-emerald-100">
                Peshawar Cantt Studio • Typically replies within minutes
              </p>
            </div>
          </div>
          <button onClick={onClose} className="text-white/80 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-2">
              Select What You Need:
            </label>
            <div className="flex flex-wrap gap-1.5">
              {topics.map((t) => (
                <button
                  key={t}
                  onClick={() => setSelectedTopic(t)}
                  className={`text-xs px-3 py-1.5 rounded-full border transition-all cursor-pointer ${
                    selectedTopic === t
                      ? 'bg-[#128C7E] text-white border-[#128C7E] font-medium'
                      : 'bg-white text-gray-700 border-[#E8DFD3] hover:bg-[#FAF6F0]'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Add Personal Note / Details (Optional):
            </label>
            <textarea
              rows={2}
              placeholder="e.g. Prefer evening after 6:00 PM, consultation with Dr. Muhammad Ali Riaz Khan"
              value={customText}
              onChange={(e) => setCustomText(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-white rounded-lg border border-[#E8DFD3] focus:outline-hidden focus:border-[#128C7E]"
            />
          </div>

          {/* Message Preview */}
          <div className="bg-[#DCF8C6]/40 p-3 rounded-xl border border-emerald-200 text-xs text-gray-800 relative">
            <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block mb-1">
              Prepared WhatsApp Message:
            </span>
            <p className="italic">"{fullMessage}"</p>
          </div>

          {/* CTAs */}
          <div className="space-y-2 pt-2">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-semibold text-sm rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
            >
              <Send className="w-4 h-4" />
              Launch WhatsApp Chat ({CLINIC_METADATA.whatsapp})
            </a>

            <button
              onClick={handleCopy}
              className="w-full py-2 bg-white hover:bg-gray-50 text-gray-700 font-medium text-xs rounded-xl border border-[#E8DFD3] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : null}
              {copied ? 'Message Copied to Clipboard!' : 'Copy Pre-Filled Text'}
            </button>
          </div>

          <p className="text-[11px] text-center text-gray-500">
            Official line for ARK Dental Studio Defence Road / Hayatabad Peshawar
          </p>
        </div>
      </div>
    </div>
  );
};
