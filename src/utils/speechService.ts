// Speech synthesis (Text-to-Speech) and Speech recognition utility for AI Assistant Khan

export interface SpeechOptions {
  rate?: number;
  pitch?: number;
  volume?: number;
  onStart?: () => void;
  onEnd?: () => void;
  onError?: (err: any) => void;
}

// Clean markdown / emoji / special formatting so speech engines pronounce words cleanly
export function sanitizeTextForSpeech(text: string): string {
  if (!text) return '';
  return text
    .replace(/\*\*(.*?)\*\*/g, '$1') // remove bold asterisks
    .replace(/\*(.*?)\*/g, '$1')     // remove italic asterisks
    .replace(/#{1,6}\s+/g, '')       // remove headers
    .replace(/`{1,3}[^`]*`{1,3}/g, '') // remove code snippets
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // link text only
    .replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '') // strip emojis
    .replace(/PKR\s*([\d,]+)/gi, '$1 Pakistani Rupees')
    .replace(/\s+/g, ' ')
    .trim();
}

// Detect whether text is predominantly Urdu/Arabic script
export function isUrduText(text: string): boolean {
  if (!text) return false;
  const urduCharCount = (text.match(/[\u0600-\u06FF]/g) || []).length;
  return urduCharCount > 5 || urduCharCount / text.length > 0.2;
}

class SpeechManager {
  private synth: SpeechSynthesis | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private voices: SpeechSynthesisVoice[] = [];
  private isInitialized = false;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
      this.initVoices();
    }
  }

  private initVoices() {
    if (!this.synth) return;
    const loadVoices = () => {
      this.voices = this.synth?.getVoices() || [];
      this.isInitialized = true;
    };
    loadVoices();
    if (this.synth.onvoiceschanged !== undefined) {
      this.synth.onvoiceschanged = loadVoices;
    }
  }

  public getVoices(): SpeechSynthesisVoice[] {
    if (!this.isInitialized && this.synth) {
      this.voices = this.synth.getVoices() || [];
    }
    return this.voices;
  }

  public findBestVoice(lang: 'en' | 'ur'): SpeechSynthesisVoice | null {
    const voices = this.getVoices();
    if (!voices.length) return null;

    // Identifiers for natural, pleasant female / girl voice
    const femaleKeywords = [
      'female', 'woman', 'girl', 'samantha', 'victoria', 'karen', 
      'zira', 'jenny', 'aria', 'ava', 'emma', 'susan', 'sonia', 
      'fiona', 'moira', 'veena', 'swara', 'heera', 'kalpana', 'noor'
    ];

    const isFemale = (v: SpeechSynthesisVoice) => {
      const name = v.name.toLowerCase();
      return femaleKeywords.some(k => name.includes(k));
    };

    if (lang === 'ur') {
      // 1. Try Urdu female voice (Pakistan / India)
      const urduFemale = voices.find(v => 
        (v.lang.toLowerCase().startsWith('ur-') || v.lang.toLowerCase() === 'ur' || v.name.toLowerCase().includes('urdu')) &&
        isFemale(v)
      );
      if (urduFemale) return urduFemale;

      const anyUrduVoice = voices.find(v => 
        v.lang.toLowerCase().startsWith('ur-') || 
        v.lang.toLowerCase() === 'ur' ||
        v.name.toLowerCase().includes('urdu')
      );
      if (anyUrduVoice) return anyUrduVoice;

      // 2. Fallback to Hindi female voice (Hindustani phonology, very natural for Urdu)
      const hindiFemale = voices.find(v => 
        (v.lang.toLowerCase().startsWith('hi-') || v.lang.toLowerCase() === 'hi' || v.name.toLowerCase().includes('hindi')) &&
        isFemale(v)
      );
      if (hindiFemale) return hindiFemale;

      const hindiVoice = voices.find(v => 
        v.lang.toLowerCase().startsWith('hi-') || 
        v.lang.toLowerCase() === 'hi' ||
        v.name.toLowerCase().includes('hindi')
      );
      if (hindiVoice) return hindiVoice;

      // 3. Fallback to any Arabic or Indian English female voice
      const indianFemale = voices.find(v => 
        (v.lang.toLowerCase().startsWith('en-in') || v.lang.toLowerCase().startsWith('ar-')) &&
        isFemale(v)
      );
      if (indianFemale) return indianFemale;

      const indianVoice = voices.find(v => 
        v.lang.toLowerCase().startsWith('en-in') || 
        v.lang.toLowerCase().startsWith('ar-')
      );
      if (indianVoice) return indianVoice;
    } else {
      // English: Prioritize pleasant natural female / girl voice
      const enFemale = voices.find(v => 
        v.lang.toLowerCase().startsWith('en') && isFemale(v)
      );
      if (enFemale) return enFemale;

      // Look for natural English voice
      const enVoice = voices.find(v => 
        (v.lang.toLowerCase().startsWith('en-') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Premium') || v.name.includes('Siri'))) ||
        v.lang.toLowerCase() === 'en-us' ||
        v.lang.toLowerCase() === 'en-gb'
      ) || voices.find(v => v.lang.toLowerCase().startsWith('en'));
      if (enVoice) return enVoice;
    }

    // Fallback: any female voice, otherwise first voice
    const anyFemale = voices.find(isFemale);
    return anyFemale || voices[0] || null;
  }

  public speak(
    text: string, 
    lang: 'en' | 'ur' = 'en', 
    options?: SpeechOptions
  ): boolean {
    if (!this.synth) {
      options?.onError?.(new Error('Speech synthesis is not supported on this browser'));
      return false;
    }

    // Cancel any ongoing speech
    this.stop();

    const cleanText = sanitizeTextForSpeech(text);
    if (!cleanText) return false;

    // Detect actual text script
    const targetLang: 'en' | 'ur' = isUrduText(cleanText) ? 'ur' : lang;

    const utterance = new SpeechSynthesisUtterance(cleanText);
    const voice = this.findBestVoice(targetLang);

    if (voice) {
      utterance.voice = voice;
    }

    // BCP 47 language tag
    utterance.lang = targetLang === 'ur' ? 'ur-PK' : 'en-US';
    utterance.rate = options?.rate ?? (targetLang === 'ur' ? 0.94 : 1.0);
    // Pitch set to 1.18 to ensure a melodious, clear, young woman / girl voice across platforms
    utterance.pitch = options?.pitch ?? 1.18;
    utterance.volume = options?.volume ?? 1.0;

    utterance.onstart = () => {
      this.currentUtterance = utterance;
      options?.onStart?.();
    };

    utterance.onend = () => {
      this.currentUtterance = null;
      options?.onEnd?.();
    };

    utterance.onerror = (e) => {
      this.currentUtterance = null;
      options?.onError?.(e);
    };

    this.synth.speak(utterance);
    return true;
  }

  public stop() {
    if (this.synth) {
      this.synth.cancel();
      this.currentUtterance = null;
    }
  }

  public pause() {
    if (this.synth) {
      this.synth.pause();
    }
  }

  public resume() {
    if (this.synth) {
      this.synth.resume();
    }
  }

  public isSpeaking(): boolean {
    return !!this.synth && (this.synth.speaking || this.synth.pending);
  }

  public isSupported(): boolean {
    return typeof window !== 'undefined' && 'speechSynthesis' in window;
  }
}

export const speechManager = new SpeechManager();
