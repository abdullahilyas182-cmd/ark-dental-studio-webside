import React, { useState, useEffect, useRef } from 'react';
import { 
  Volume2, 
  VolumeX, 
  Play, 
  Square, 
  Sparkles, 
  Mic, 
  Languages, 
  Check, 
  Info,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { TreatmentServiceOption, EASY_CLINICAL_TREATMENTS } from '../../data/treatmentServicesData';

interface TreatmentVoiceAssistantProps {
  treatment: TreatmentServiceOption;
  isDark?: boolean;
  compact?: boolean;
  onSelectTreatment?: (treatment: TreatmentServiceOption) => void;
}

export const TreatmentVoiceAssistant: React.FC<TreatmentVoiceAssistantProps> = ({
  treatment,
  isDark = false,
  compact = false,
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [activeLanguage, setActiveLanguage] = useState<'english' | 'urdu'>('urdu');
  const [showTranscript, setShowTranscript] = useState<boolean>(false);
  const [speechSupported, setSpeechSupported] = useState<boolean>(true);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Check Speech Synthesis support and load available voices
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      setSpeechSupported(true);
      const updateVoices = () => {
        const available = window.speechSynthesis.getVoices();
        setVoices(available);
      };
      updateVoices();
      window.speechSynthesis.onvoiceschanged = updateVoices;
    } else {
      setSpeechSupported(false);
    }

    return () => {
      stopSpeech();
    };
  }, []);

  // Stop speech when treatment changes
  useEffect(() => {
    stopSpeech();
  }, [treatment.id]);

  const playTone = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        const ctx = new AudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5 chime
        osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15); // A5
        gain.gain.setValueAtTime(0.12, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.35);
      }
    } catch {
      // AudioContext optional fallback
    }
  };

  const stopSpeech = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsPlaying(false);
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
  };

  const speak = (lang: 'english' | 'urdu') => {
    stopSpeech();
    setActiveLanguage(lang);
    playTone();

    if (!speechSupported || typeof window === 'undefined') {
      setIsPlaying(true);
      setTimeout(() => setIsPlaying(false), 4000);
      return;
    }

    const textToSpeak = lang === 'urdu' ? treatment.voiceTextUrdu : treatment.voiceTextEnglish;
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utteranceRef.current = utterance;

    if (lang === 'urdu') {
      // Match Urdu voice if present, or Hindi voice which has matching phonemes, or general fallback
      const urduVoice = voices.find(v => v.lang.startsWith('ur') || v.lang === 'ur_PK' || v.lang === 'ur-PK') ||
                        voices.find(v => v.lang.startsWith('hi')) ||
                        voices.find(v => v.lang.includes('India') || v.lang.includes('Pakistan'));
      if (urduVoice) {
        utterance.voice = urduVoice;
        utterance.lang = urduVoice.lang;
      } else {
        utterance.lang = 'ur-PK';
      }
      utterance.rate = 0.90; // Gentle paced rate for clinical clarity
      utterance.pitch = 1.0;
    } else {
      const englishVoice = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha') || v.name.includes('UK') || v.name.includes('US'))) ||
                           voices.find(v => v.lang.startsWith('en'));
      if (englishVoice) {
        utterance.voice = englishVoice;
      }
      utterance.lang = 'en-US';
      utterance.rate = 0.95;
      utterance.pitch = 1.0;
    }

    utterance.onstart = () => {
      setIsPlaying(true);
    };

    utterance.onend = () => {
      setIsPlaying(false);
    };

    utterance.onerror = () => {
      setIsPlaying(false);
    };

    window.speechSynthesis.speak(utterance);
  };

  return (
    <div 
      className={`rounded-xl border transition-all ${
        isDark 
          ? 'bg-[#18120D] border-[#483526] text-white shadow-lg' 
          : 'bg-[#FAF7F2] border-[#E8DFD3] text-gray-800 shadow-sm'
      } ${compact ? 'p-3' : 'p-4'}`}
    >
      {/* Top Header: AI Voice Assistant Badge & Language Selector */}
      <div className="flex items-center justify-between gap-2 mb-2.5">
        <div className="flex items-center gap-2">
          <div className="relative flex items-center justify-center w-6 h-6 rounded-full bg-[#B59975] text-[#141210]">
            <Mic className="w-3.5 h-3.5" />
            {isPlaying && (
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
            )}
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] font-bold tracking-wider uppercase text-[#B59975]">
                AI Voice Assistant
              </span>
              <span className={`text-[9px] px-1.5 py-0.2 rounded-sm font-semibold ${
                isDark ? 'bg-white/10 text-gray-300' : 'bg-gray-200 text-gray-700'
              }`}>
                Urdu & English
              </span>
            </div>
            <p className={`text-[10px] ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Listen to easy explanation of this treatment
            </p>
          </div>
        </div>

        {/* Live Audio Visualizer / Stop Button */}
        {isPlaying ? (
          <button
            type="button"
            onClick={stopSpeech}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-red-500/15 border border-red-500/40 text-red-600 hover:bg-red-500/25 text-[10px] font-bold cursor-pointer transition-colors"
          >
            <Square className="w-2.5 h-2.5 fill-current" />
            <span>Stop Voice</span>
          </button>
        ) : (
          <div className="hidden sm:flex items-center gap-1 text-[10px] text-gray-400">
            <Volume2 className="w-3.5 h-3.5 text-[#B59975]" />
            <span>Spoken Guide</span>
          </div>
        )}
      </div>

      {/* Voice Play Buttons for Urdu and English */}
      <div className="grid grid-cols-2 gap-2 mt-2">
        {/* Urdu Voice Button */}
        <button
          type="button"
          onClick={() => isPlaying && activeLanguage === 'urdu' ? stopSpeech() : speak('urdu')}
          className={`flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer border ${
            isPlaying && activeLanguage === 'urdu'
              ? 'bg-emerald-600 text-white border-emerald-500 shadow-sm animate-pulse'
              : isDark
                ? 'bg-[#261A13] hover:bg-[#332219] text-[#E8DFD3] border-[#5A402D]'
                : 'bg-white hover:bg-gray-50 text-gray-800 border-[#D8CEBE] shadow-xs'
          }`}
          title="Listen to this treatment in Urdu"
        >
          <Volume2 className={`w-3.5 h-3.5 ${isPlaying && activeLanguage === 'urdu' ? 'text-white' : 'text-emerald-500'}`} />
          <span className="font-serif">اردو میں سنیں</span>
          <span className="text-[10px] opacity-75 font-sans">(Urdu)</span>
        </button>

        {/* English Voice Button */}
        <button
          type="button"
          onClick={() => isPlaying && activeLanguage === 'english' ? stopSpeech() : speak('english')}
          className={`flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer border ${
            isPlaying && activeLanguage === 'english'
              ? 'bg-[#1F4E4A] text-white border-[#2A6560] shadow-sm animate-pulse'
              : isDark
                ? 'bg-[#261A13] hover:bg-[#332219] text-[#E8DFD3] border-[#5A402D]'
                : 'bg-white hover:bg-gray-50 text-gray-800 border-[#D8CEBE] shadow-xs'
          }`}
          title="Listen to this treatment in English"
        >
          <Volume2 className={`w-3.5 h-3.5 ${isPlaying && activeLanguage === 'english' ? 'text-white' : 'text-[#B59975]'}`} />
          <span>Listen in English</span>
        </button>
      </div>

      {/* Active Speech Animation Wave */}
      {isPlaying && (
        <div className={`mt-2.5 p-2 rounded-lg border flex items-center justify-between gap-3 text-xs ${
          activeLanguage === 'urdu' 
            ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-300' 
            : 'bg-[#1F4E4A]/15 border-[#1F4E4A]/40 text-[#1F4E4A] dark:text-[#D8BE9B]'
        }`}>
          <div className="flex items-center gap-2">
            <span className="flex space-x-1 items-center">
              <span className="w-1 h-3 bg-current rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-1 h-4 bg-current rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-1 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              <span className="w-1 h-4 bg-current rounded-full animate-bounce" style={{ animationDelay: '450ms' }} />
            </span>
            <span className="text-[11px] font-medium">
              {activeLanguage === 'urdu' 
                ? 'اے آئی اسسٹنٹ اردو میں وضاحت کر رہا ہے...' 
                : 'AI Voice Assistant is explaining in English...'}
            </span>
          </div>

          <button
            type="button"
            onClick={() => setShowTranscript(!showTranscript)}
            className="text-[10px] underline cursor-pointer"
          >
            {showTranscript ? 'Hide Text' : 'Read Along'}
          </button>
        </div>
      )}

      {/* Toggle Transcript Link */}
      {!isPlaying && (
        <div className="mt-2 flex items-center justify-between text-[11px] px-0.5">
          <span className={`text-[10px] ${isDark ? 'text-[#D8BE9B]' : 'text-gray-600'}`}>
            Estimated duration: {treatment.estimatedDuration}
          </span>
          <button
            type="button"
            onClick={() => setShowTranscript(!showTranscript)}
            className={`inline-flex items-center gap-1 text-[11px] font-medium cursor-pointer ${
              isDark ? 'text-[#B59975] hover:text-[#C5A882]' : 'text-[#1F4E4A] hover:underline'
            }`}
          >
            <span>{showTranscript ? 'Hide simple explanation' : 'Read simple words'}</span>
            {showTranscript ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </button>
        </div>
      )}

      {/* Spoken Text Transcripts in Urdu & English */}
      {showTranscript && (
        <div className={`mt-2.5 p-3 rounded-lg border text-xs space-y-2.5 transition-all ${
          isDark ? 'bg-black/25 border-[#382618]' : 'bg-white border-[#E8DFD3]'
        }`}>
          {/* Urdu script */}
          <div className="text-right border-b pb-2 border-dashed border-gray-300 dark:border-gray-700" dir="rtl">
            <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 block mb-1">
              اردو میں آسان الفاظ:
            </span>
            <p className="text-xs font-serif leading-relaxed text-gray-800 dark:text-gray-200">
              {treatment.voiceTextUrdu}
            </p>
          </div>

          {/* English translation */}
          <div>
            <span className="text-[10px] font-bold text-[#B59975] block mb-1">
              Plain English Explanation:
            </span>
            <p className={`text-[11px] leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              {treatment.voiceTextEnglish}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
