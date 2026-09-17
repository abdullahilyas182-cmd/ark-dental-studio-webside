import React, { useState, useRef, useEffect } from 'react';
import { useClinic } from '../../context/ClinicContext';
import { askClinicAI } from '../../services/aiService';
import { ChatMessage, AssistantLanguage } from '../../types';
import { speechManager } from '../../utils/speechService';
import { 
  Bot, Send, X, Sparkles, Calendar, CheckCircle2, User, 
  Languages, MessageSquare, ArrowRight, Volume2, VolumeX, Mic, MicOff, Square
} from 'lucide-react';

interface AIReceptionistModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultPrompt?: string;
}

export const AIReceptionistModal: React.FC<AIReceptionistModalProps> = ({
  isOpen,
  onClose,
  defaultPrompt
}) => {
  const { 
    language, setLanguage, requestAppointment, followUpTasks, 
    doctors, appointments, advanceDemoStep, currentDemoStep 
  } = useClinic();

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [appointmentRequested, setAppointmentRequested] = useState(false);
  const [autoSpeak, setAutoSpeak] = useState(true); // Khan speaks out loud by default
  const [speakingMsgId, setSpeakingMsgId] = useState<string | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);

  // Initial messages bilingual for Elma
  const initialMessages: ChatMessage[] = [
    {
      id: 'msg-1',
      sender: 'assistant',
      text: language === 'ur'
        ? 'السلام علیکم! میں ایلما ہوں، آرک ڈینٹل اسٹوڈیو پشاور کی اے آئی اسسٹنٹ۔ میں دانتوں کے علاج، امپلانٹس، وینیرز، فیسوں اور اپائنٹمنٹ کے بارے میں اردو یا انگریزی میں بول کر سب تفصیلات سمجھا سکتی ہوں۔ میں آپ کی کیسے مدد کروں؟'
        : 'Hello! I am Elma, your AI Clinical Assistant at ARK Dental Studio Peshawar. I can explain procedures, recovery guidelines, pricing, and appointment schedules by speaking aloud in English or Urdu. How may I assist you today?',
      timestamp: 'Just now',
      language: language
    }
  ];

  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  // Stop any active speech on modal unmount or close
  useEffect(() => {
    if (!isOpen) {
      speechManager.stop();
      setIsSpeaking(false);
      setSpeakingMsgId(null);
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (_) {}
      }
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  useEffect(() => {
    if (defaultPrompt && isOpen) {
      handleSendMessage(defaultPrompt);
    }
  }, [defaultPrompt, isOpen]);

  // Update initial message greeting if language toggle changes and conversation hasn't started yet
  useEffect(() => {
    if (messages.length === 1 && messages[0].id === 'msg-1') {
      const updatedGreeting: ChatMessage = {
        id: 'msg-1',
        sender: 'assistant',
        text: language === 'ur'
          ? 'السلام علیکم! میں ایلما ہوں، آرک ڈینٹل اسٹوڈیو پشاور کی اے آئی اسسٹنٹ۔ میں دانتوں کے علاج، امپلانٹس، وینیرز، فیسوں اور اپائنٹمنٹ کے بارے میں اردو یا انگریزی میں بول کر سب تفصیلات سمجھا سکتی ہوں۔ میں آپ کی کیسے مدد کروں؟'
          : 'Hello! I am Elma, your AI Clinical Assistant at ARK Dental Studio Peshawar. I can explain procedures, recovery guidelines, pricing, and appointment schedules by speaking aloud in English or Urdu. How may I assist you today?',
        timestamp: 'Just now',
        language: language
      };
      setMessages([updatedGreeting]);
      if (autoSpeak && isOpen) {
        speakMessage(updatedGreeting.text, updatedGreeting.id, language);
      }
    }
  }, [language]);

  if (!isOpen) return null;

  // Speak a message using the speech manager
  const speakMessage = (text: string, msgId: string, lang: AssistantLanguage) => {
    if (speakingMsgId === msgId && isSpeaking) {
      // Toggle off if already speaking this message
      speechManager.stop();
      setIsSpeaking(false);
      setSpeakingMsgId(null);
      return;
    }

    setSpeakingMsgId(msgId);
    setIsSpeaking(true);

    speechManager.speak(text, lang, {
      onStart: () => {
        setIsSpeaking(true);
        setSpeakingMsgId(msgId);
      },
      onEnd: () => {
        setIsSpeaking(false);
        setSpeakingMsgId(null);
      },
      onError: () => {
        setIsSpeaking(false);
        setSpeakingMsgId(null);
      }
    });
  };

  const stopSpeaking = () => {
    speechManager.stop();
    setIsSpeaking(false);
    setSpeakingMsgId(null);
  };

  // Speech Recognition (Mic voice input)
  const toggleVoiceInput = () => {
    if (isListening) {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (_) {}
      }
      setIsListening(false);
      return;
    }

    const SpeechRec = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRec) {
      alert('Voice input is not supported in this browser. You can type your question in the text box.');
      return;
    }

    try {
      const recognition = new SpeechRec();
      recognition.lang = language === 'ur' ? 'ur-PK' : 'en-US';
      recognition.continuous = false;
      recognition.interimResults = true;

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0].transcript)
          .join('');
        setInput(transcript);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (err) {
      console.warn('Speech recognition error:', err);
      setIsListening(false);
    }
  };

  const quickPrompts = language === 'ur' ? [
    'وینیرز اور وائٹننگ کی قیمت کیا ہے؟',
    'کیا میں اگلی اپائنٹمنٹ بک کر سکتا ہوں؟',
    'کلینک کا پتہ اور اوقات کار کیا ہیں؟',
    'ڈاکٹر محمد علی ریاض خان کے بارے میں بتائیں'
  ] : [
    'Explain Porcelain Veneers cost & process',
    'Help me request my next appointment',
    'Where is the Peshawar studio located?',
    'Credentials of Dr. Khan & Surgical Team'
  ];

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || input;
    if (!text.trim() || loading) return;

    // If currently speaking, stop so we can listen to the new interaction
    speechManager.stop();
    setIsSpeaking(false);
    setSpeakingMsgId(null);

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      language
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    // Call AI backend with clinic context
    const aiReply = await askClinicAI({
      prompt: text,
      assistantType: 'receptionist',
      language,
      context: {
        studio: 'ARK Dental Studio Peshawar',
        assistantName: 'Elma',
        pendingFollowUpsCount: followUpTasks.filter(f => f.status === 'Pending').length,
        leadDoctors: doctors.map(d => `${d.name} (${d.specialty})`)
      }
    });

    const newBotMsgId = `msg-${Date.now() + 1}`;
    const botMsg: ChatMessage = {
      id: newBotMsgId,
      sender: 'assistant',
      text: aiReply,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      language
    };

    setMessages(prev => [...prev, botMsg]);
    setLoading(false);

    // Automatically speak Elma's explanation if autoSpeak is enabled
    if (autoSpeak) {
      speakMessage(aiReply, newBotMsgId, language);
    }
  };

  // One-click booking hand-off to clinic staff
  const handleDirectFollowUpBooking = () => {
    const pendingFollowUp = followUpTasks.find(f => f.status === 'Pending');

    const patientName = pendingFollowUp ? pendingFollowUp.patientName : "Bilal Ahmed";
    const phone = pendingFollowUp ? pendingFollowUp.patientPhone : "+92 300 8594321";
    const doctorId = pendingFollowUp ? pendingFollowUp.doctorId : doctors[0].id;
    const procedure = pendingFollowUp 
      ? `Follow-up: ${pendingFollowUp.treatmentName}`
      : "Porcelain Veneer Aesthetic Consultation";
    const date = pendingFollowUp 
      ? pendingFollowUp.recommendedDate 
      : new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0];

    requestAppointment({
      patientName,
      patientPhone: phone,
      doctorId,
      date,
      time: "04:30 PM",
      procedure,
      source: "AI-Receptionist",
      relatedFollowUpId: pendingFollowUp?.id,
      notes: "Auto-assisted by Elma (AI Assistant) from patient inquiry."
    });

    setAppointmentRequested(true);

    const confMsgId = `msg-${Date.now() + 2}`;
    const confirmationMsg: ChatMessage = {
      id: confMsgId,
      sender: 'assistant',
      text: language === 'ur'
        ? `بہت شکریہ! میں ایلما ہوں، میں نے ${patientName} کے لیے ${procedure} کی اپائنٹمنٹ کی درخواست کلینک کے اسٹاف ڈیسک کو منتقل کر دی ہے۔ تاریخ: ${date} بوقت 04:30 PM۔ فرنٹ ڈیسک عملہ چند لمحوں میں آپ سے رابطہ کرے گا۔`
        : `Thank you! I am Elma, and I have transmitted the appointment reservation for ${patientName} (${procedure}) directly to the Doctor / Staff Portal. Date: ${date} at 04:30 PM. The front desk team has received notification to confirm your chair slot!`,
      timestamp: 'Just now',
      language
    };

    setMessages(prev => [...prev, confirmationMsg]);

    if (autoSpeak) {
      speakMessage(confirmationMsg.text, confMsgId, language);
    }

    if (currentDemoStep === 6) {
      advanceDemoStep();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-3 sm:p-4">
      <div className="bg-[#FAF6F0] w-full max-w-lg h-[640px] rounded-2xl shadow-2xl border border-[#D8BE9B] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header with Royal Framing & Assistant Elma Identity */}
        <div className="bg-[#140E0A] text-white p-4 flex items-center justify-between border-b border-[#B59975]/30 shadow-md">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#D8BE9B] to-[#997950] text-[#140E0A] flex items-center justify-center font-serif font-bold text-lg shadow-sm border border-[#FAF6F0]/30">
                E
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#140E0A] animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif font-bold text-base text-white tracking-wide">
                  Elma — AI Assistant
                </h3>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#B59975]/20 text-[#D8BE9B] border border-[#B59975]/40 font-medium">
                  Voice & Text
                </span>
              </div>
              <p className="text-[11px] text-[#DDD3C5]/80 font-light flex items-center gap-1.5">
                <span>ARK Dental Studio</span>
                <span>•</span>
                <span className="text-[#D8BE9B]">Urdu & English Speaking</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Auto-Speak Toggle */}
            <button
              onClick={() => {
                const next = !autoSpeak;
                setAutoSpeak(next);
                if (!next && isSpeaking) {
                  stopSpeaking();
                }
              }}
              className={`flex items-center gap-1 text-[11px] px-2.5 py-1.5 rounded-lg border transition-all cursor-pointer ${
                autoSpeak 
                  ? 'bg-[#B59975]/25 border-[#B59975] text-[#FAF6F0]' 
                  : 'bg-white/5 border-white/15 text-gray-400 hover:text-white'
              }`}
              title={autoSpeak ? "Auto-Speaking is ON (Elma speaks answers)" : "Auto-Speaking is OFF"}
            >
              {autoSpeak ? (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-[#D8BE9B]" />
                  <span className="font-medium hidden sm:inline">Voice ON</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-gray-400" />
                  <span className="font-medium hidden sm:inline">Muted</span>
                </>
              )}
            </button>

            {/* Language Switch: English / اردو */}
            <div className="flex items-center bg-white/10 rounded-lg p-0.5 border border-white/15">
              <button
                onClick={() => setLanguage('en')}
                className={`px-2 py-1 rounded text-xs font-semibold transition-colors cursor-pointer ${
                  language === 'en' 
                    ? 'bg-[#B59975] text-[#140E0A] shadow-xs' 
                    : 'text-[#DDD3C5] hover:text-white'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('ur')}
                className={`px-2 py-1 rounded text-xs font-semibold transition-colors cursor-pointer ${
                  language === 'ur' 
                    ? 'bg-[#B59975] text-[#140E0A] shadow-xs' 
                    : 'text-[#DDD3C5] hover:text-white'
                }`}
              >
                اردو
              </button>
            </div>

            <button
              onClick={onClose}
              className="text-white/70 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Live Speaking Indicator Banner when Khan is speaking */}
        {isSpeaking && (
          <div className="bg-[#1F1610] text-[#FAF6F0] px-4 py-2 border-b border-[#B59975]/40 flex items-center justify-between gap-2 text-xs animate-in slide-in-from-top-1">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-0.5 h-3.5">
                <span className="w-1 bg-[#D8BE9B] h-2 animate-[pulse_0.6s_ease-in-out_infinite]" />
                <span className="w-1 bg-[#D8BE9B] h-3.5 animate-[pulse_0.4s_ease-in-out_infinite]" />
                <span className="w-1 bg-[#D8BE9B] h-1.5 animate-[pulse_0.5s_ease-in-out_infinite]" />
                <span className="w-1 bg-[#D8BE9B] h-3 animate-[pulse_0.7s_ease-in-out_infinite]" />
              </div>
              <span className="text-[11px] font-medium text-[#D8BE9B]">
                {language === 'ur' ? 'ایلما بول کر وضاحت کر رہی ہے...' : 'Elma is explaining speaking aloud...'}
              </span>
            </div>
            <button
              onClick={stopSpeaking}
              className="inline-flex items-center gap-1 text-[11px] bg-white/10 hover:bg-white/20 text-[#FAF6F0] px-2 py-0.5 rounded-md transition-colors cursor-pointer"
            >
              <Square className="w-3 h-3 text-red-400 fill-current" />
              <span>{language === 'ur' ? 'روکیں' : 'Stop'}</span>
            </button>
          </div>
        )}

        {/* Live Follow-up Recommendation Banner */}
        {followUpTasks.some(f => f.status === 'Pending') && !appointmentRequested && (
          <div className="bg-[#B59975]/15 border-b border-[#B59975]/30 px-4 py-2 flex items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-1.5 text-[#2B2B2B]">
              <Calendar className="w-3.5 h-3.5 text-[#8C6D47]" />
              <span>
                <strong>Follow-up Recall:</strong> Dr. Khan recommended checkup for Bilal Ahmed.
              </span>
            </div>
            <button
              onClick={handleDirectFollowUpBooking}
              className="bg-[#2A1D15] text-[#FAF6F0] px-2.5 py-1 rounded-md text-[11px] font-semibold hover:bg-[#1A120D] transition-colors cursor-pointer shrink-0 border border-[#B59975]/40"
            >
              Book Slot
            </button>
          </div>
        )}

        {/* Chat Message List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-[#FAF6F0]/70">
          {messages.map((m) => {
            const isMe = m.sender === 'user';
            const isThisSpeaking = speakingMsgId === m.id && isSpeaking;

            return (
              <div
                key={m.id}
                className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[88%] rounded-2xl px-4 py-3 text-xs sm:text-sm shadow-sm transition-all ${
                    isMe
                      ? 'bg-[#2A1D15] text-[#FAF6F0] rounded-br-none border border-[#483526]'
                      : isThisSpeaking
                        ? 'bg-white text-[#1C1A17] border-2 border-[#B59975] rounded-bl-none ring-2 ring-[#B59975]/20'
                        : 'bg-white text-[#1C1A17] border border-[#E8DFD3] rounded-bl-none'
                  } ${m.language === 'ur' ? 'font-urdu text-right leading-relaxed' : 'leading-relaxed'}`}
                  dir={m.language === 'ur' ? 'rtl' : 'ltr'}
                >
                  <p className="whitespace-pre-line">{m.text}</p>

                  {/* Audio Listen / Stop button on Elma's messages */}
                  {!isMe && (
                    <div className="mt-2.5 pt-2 border-t border-[#EDE4D5] flex items-center justify-between gap-3 text-[11px]">
                      <button
                        onClick={() => speakMessage(m.text, m.id, m.language || language)}
                        className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-md transition-all cursor-pointer font-medium ${
                          isThisSpeaking
                            ? 'bg-[#B59975] text-[#140E0A] shadow-xs'
                            : 'bg-[#F4EFE6] text-[#6E5437] hover:bg-[#E8DFD3]'
                        }`}
                        title={isThisSpeaking ? "Stop Voice" : "Listen to Elma speak this explanation"}
                      >
                        {isThisSpeaking ? (
                          <>
                            <Square className="w-3 h-3 fill-current" />
                            <span>{language === 'ur' ? 'آواز روکیں' : 'Stop Voice'}</span>
                          </>
                        ) : (
                          <>
                            <Volume2 className="w-3.5 h-3.5 text-[#B59975]" />
                            <span>{language === 'ur' ? 'بول کر سنیں' : 'Listen Aloud'}</span>
                          </>
                        )}
                      </button>

                      <span className="text-[10px] text-gray-400">
                        {m.language === 'ur' ? 'اردو آڈیو' : 'English Speech'}
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2 mt-1 px-1 text-[10px] text-gray-400">
                  <span>{isMe ? 'You' : 'Elma (AI)'}</span>
                  <span>•</span>
                  <span>{m.timestamp}</span>
                </div>
              </div>
            );
          })}

          {loading && (
            <div className="flex items-center gap-2 text-xs text-[#5C554E] bg-white px-3.5 py-2.5 rounded-2xl border border-[#DACFBF] w-fit shadow-xs animate-pulse">
              <span className="w-2 h-2 rounded-full bg-[#B59975] animate-ping" />
              <span>{language === 'ur' ? 'ایلما جواب تیار کر رہی ہے...' : 'Elma is preparing your spoken explanation...'}</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Chips */}
        <div className="p-2.5 bg-white border-t border-[#E8DFD3] overflow-x-auto flex gap-1.5 text-xs">
          {quickPrompts.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(p)}
              className="whitespace-nowrap px-3 py-1.5 rounded-full bg-[#FAF6F0] hover:bg-[#EDE4D5] text-[#4A433D] border border-[#DACFBF] transition-colors cursor-pointer text-[11px]"
            >
              {p}
            </button>
          ))}
        </div>

        {/* Chat & Voice Input Bar */}
        <div className="p-3 bg-white border-t border-[#E8DFD3]">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            {/* Mic button for speaking to Elma */}
            <button
              type="button"
              onClick={toggleVoiceInput}
              className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                isListening 
                  ? 'bg-red-500 border-red-600 text-white animate-pulse' 
                  : 'bg-[#FAF6F0] border-[#E8DFD3] text-[#6E5437] hover:bg-[#EDE4D5]'
              }`}
              title={isListening ? "Listening... click to stop" : `Speak your question in ${language === 'ur' ? 'Urdu' : 'English'}`}
            >
              {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </button>

            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={
                isListening
                  ? (language === 'ur' ? 'بولیں، ایلما سن رہی ہے...' : 'Listening... speak your question...')
                  : (language === 'ur'
                      ? 'ایلما سے اردو یا انگلش میں سوال پوچھیں...'
                      : 'Ask Elma anything in English or Urdu...')
              }
              className="flex-1 px-3.5 py-2.5 text-xs sm:text-sm bg-[#FAF6F0] rounded-xl border border-[#E8DFD3] focus:outline-hidden focus:border-[#B59975] text-[#1C1A17]"
              dir={language === 'ur' ? 'rtl' : 'ltr'}
            />

            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="p-2.5 bg-[#2A1D15] text-[#FAF6F0] rounded-xl hover:bg-[#1A120D] disabled:opacity-40 transition-colors cursor-pointer border border-[#483526] shadow-sm"
              title="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-2 flex items-center justify-between text-[10px] text-gray-500">
            <span className="flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#B59975]" />
              <span>Voice AI: Speaking explanations in Urdu (اردو) & English</span>
            </span>
            <button
              onClick={handleDirectFollowUpBooking}
              className="text-[#8C6D47] hover:underline font-medium cursor-pointer"
            >
              Auto-Hand off to Staff
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
