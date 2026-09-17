import React, { useState } from 'react';
import { useClinic } from '../../context/ClinicContext';
import { askClinicAI } from '../../services/aiService';
import { ChatMessage, AssistantLanguage } from '../../types';
import { speechManager } from '../../utils/speechService';
import { 
  Bot, Send, HeartPulse, Clock, Calendar, Sparkles, 
  Languages, ShieldCheck, CheckCircle2, ChevronDown, ChevronUp, Volume2, Square,
  CircleDollarSign 
} from 'lucide-react';

interface PatientAIAssistantProps {
  onOpenBookingModal: () => void;
}

export const PatientAIAssistant: React.FC<PatientAIAssistantProps> = ({
  onOpenBookingModal
}) => {
  const { 
    language, setLanguage, activePatientId, patients, 
    treatments, appointments, followUpTasks, requestAppointment,
    doctors, advanceDemoStep, currentDemoStep 
  } = useClinic();

  const patient = patients.find(p => p.id === activePatientId) || patients[0];
  const patientTreatments = treatments.filter(t => t.patientId === patient.id);
  const patientAppointments = appointments.filter(a => a.patientId === patient.id || a.patientName === patient.name);
  const patientFollowUps = followUpTasks.filter(f => f.patientId === patient.id || f.patientName === patient.name);

  const [collapsed, setCollapsed] = useState(false);
  const [speakingMsgId, setSpeakingMsgId] = useState<string | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'patient-ai-intro',
      sender: 'assistant',
      text: language === 'ur'
        ? `محترم ${patient.nameUrdu || patient.name}، السلام علیکم! میں ایلما ہوں، آپ کی ذاتی کیئر اسسٹنٹ۔ میں آپ کے علاج کے بعد کی دیکھ بھال، ادویات کے اوقات، کھانے کی احتیاط اور اگلی اپائنٹمنٹ کے بارے میں اردو یا انگلش میں بول کر سب تفصیلات بتا سکتی ہوں۔`
        : `Welcome ${patient.name}! I am Elma, your Personal Dental Care Assistant. I can guide you on post-treatment recovery, pain relief protocols, dietary instructions, and explain everything aloud in English or Urdu.`,
      timestamp: 'Just now',
      language
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const speakMessage = (text: string, msgId: string, lang: AssistantLanguage) => {
    if (speakingMsgId === msgId && isSpeaking) {
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

  const handleSend = async (queryText?: string) => {
    const text = queryText || input;
    if (!text.trim() || loading) return;

    speechManager.stop();
    setIsSpeaking(false);
    setSpeakingMsgId(null);

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      language
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    const reply = await askClinicAI({
      prompt: text,
      assistantType: 'patient',
      language,
      context: {
        assistantName: 'Elma',
        patientName: patient.name,
        recentTreatments: patientTreatments.map(t => `${t.procedureName} on tooth ${t.toothNumbers?.join(',') || 'N/A'} with notes: ${t.clinicalNotes}`),
        upcomingAppointments: patientAppointments.map(a => `${a.date} at ${a.time} for ${a.procedure}`),
        pendingRecalls: patientFollowUps.map(f => `Recommended recall on ${f.recommendedDate} for ${f.reason}`)
      }
    });

    const botMsgId = `bot-${Date.now() + 1}`;
    const botMsg: ChatMessage = {
      id: botMsgId,
      sender: 'assistant',
      text: reply,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      language
    };

    setMessages(prev => [...prev, botMsg]);
    setLoading(false);
  };

  const handlePostCareAdvice = () => {
    const q = language === 'ur'
      ? 'علاج کے بعد درد، سوجن اور کھانے پینے کی کیا احتیاطیں ہیں؟'
      : 'What are my post-treatment recovery rules, pain management, and eating guidelines?';
    handleSend(q);
  };

  const handleFollowUpReminder = () => {
    const q = language === 'ur'
      ? 'میری اگلی فالو اپ اور وزٹ کی تاریخ کب ہے؟'
      : 'When is my next recommended follow-up visit and what procedure is scheduled?';
    handleSend(q);
  };

  const handleTreatmentPricing = () => {
    const q = language === 'ur'
      ? 'مجھے کلینیکل ٹریٹمنٹس کی قیمتوں کی تفصیلی فہرست بتائیں (مثلاً وینئرز، روٹ کینال، امپلانٹ، دانتوں کی صفائی)'
      : 'What are the prices for common dental treatments like veneers, root canal, dental implants, teeth cleaning and whitening?';
    handleSend(q);
  };

  const handleRequestNextSlot = () => {
    // If pending follow-up exists, request it
    const pendingFollowUp = patientFollowUps.find(f => f.status === 'Pending');
    const procedure = pendingFollowUp ? `Follow-up: ${pendingFollowUp.treatmentName}` : 'Routine Recall & Checkup';
    const date = pendingFollowUp ? pendingFollowUp.recommendedDate : new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0];

    requestAppointment({
      patientId: patient.id,
      patientName: patient.name,
      patientPhone: patient.phone,
      doctorId: doctors[0].id,
      date,
      time: '05:00 PM',
      procedure,
      source: 'Patient-Portal',
      relatedFollowUpId: pendingFollowUp?.id,
      notes: 'Direct request submitted via Patient Portal AI Assistant.'
    });

    const confirmMsg: ChatMessage = {
      id: `msg-${Date.now() + 3}`,
      sender: 'assistant',
      text: language === 'ur'
        ? `بہت شکریہ! آپ کی اگلی اپائنٹمنٹ (${procedure}) کی درخواست کلینک کو بھیج دی گئی ہے (تاریخ: ${date} بوقت 05:00 PM)۔ عملہ جلد تصدیق کرے گا۔`
        : `Your next appointment request for "${procedure}" on ${date} at 05:00 PM has been transmitted to the front desk reception for confirmation.`,
      timestamp: 'Just now',
      language
    };

    setMessages(prev => [...prev, confirmMsg]);

    if (currentDemoStep === 6) {
      advanceDemoStep();
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-[#E8DFD3] shadow-xs overflow-hidden flex flex-col">
      {/* Header */}
      <div className="bg-[#140E0A] text-white p-4 flex items-center justify-between border-b border-[#B59975]/30 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#D8BE9B] to-[#997950] text-[#140E0A] flex items-center justify-center font-serif font-bold text-base shadow-xs">
            E
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-serif font-bold text-sm text-white tracking-wide">
                Elma — Patient Care AI Assistant
              </h3>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <p className="text-[11px] text-[#DDD3C5]/80">
              Caring for {patient.name} • Spoken Urdu & English Guidance
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setLanguage(language === 'en' ? 'ur' : 'en')}
            className="text-[11px] bg-white/15 hover:bg-white/25 text-white px-2 py-1 rounded-md flex items-center gap-1 font-medium transition-colors"
          >
            <Languages className="w-3 h-3" />
            <span>{language === 'en' ? 'اردو' : 'English'}</span>
          </button>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="text-white/70 hover:text-white p-1"
          >
            {collapsed ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {!collapsed && (
        <>
          {/* Quick Action Chips */}
          <div className="p-3 bg-[#FAF6F0] border-b border-[#E8DFD3] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 text-xs">
            <button
              onClick={handleTreatmentPricing}
              className="flex items-center gap-1.5 p-2 rounded-lg bg-white border border-[#E8DFD3] hover:bg-amber-50/60 text-[#2B2B2B] text-left transition-colors cursor-pointer"
            >
              <CircleDollarSign className="w-3.5 h-3.5 text-[#B59975] shrink-0" />
              <div>
                <span className="font-semibold block text-[11px]">
                  {language === 'ur' ? 'علاج کی قیمتیں' : 'Treatment Prices'}
                </span>
                <span className="text-[10px] text-gray-500">
                  {language === 'ur' ? 'روٹ کینال، امپلانٹ، وینئرز' : 'Veneers, Implants, Whitening'}
                </span>
              </div>
            </button>

            <button
              onClick={handlePostCareAdvice}
              className="flex items-center gap-1.5 p-2 rounded-lg bg-white border border-[#E8DFD3] hover:bg-emerald-50/60 text-[#2B2B2B] text-left transition-colors cursor-pointer"
            >
              <HeartPulse className="w-3.5 h-3.5 text-red-500 shrink-0" />
              <div>
                <span className="font-semibold block text-[11px]">Post-Op Care Guide</span>
                <span className="text-[10px] text-gray-500">Pain, eating, & swelling</span>
              </div>
            </button>

            <button
              onClick={handleFollowUpReminder}
              className="flex items-center gap-1.5 p-2 rounded-lg bg-white border border-[#E8DFD3] hover:bg-amber-50/60 text-[#2B2B2B] text-left transition-colors cursor-pointer"
            >
              <Clock className="w-3.5 h-3.5 text-[#C1622D] shrink-0" />
              <div>
                <span className="font-semibold block text-[11px]">Next Recall Status</span>
                <span className="text-[10px] text-gray-500">View upcoming checkups</span>
              </div>
            </button>

            <button
              onClick={handleRequestNextSlot}
              className="flex items-center gap-1.5 p-2 rounded-lg bg-white border border-[#E8DFD3] hover:bg-blue-50/60 text-[#2B2B2B] text-left transition-colors cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5 text-[#1F4E4A] shrink-0" />
              <div>
                <span className="font-semibold block text-[11px]">Book Next Step</span>
                <span className="text-[10px] text-gray-500">Auto-transmit to reception</span>
              </div>
            </button>
          </div>

          {/* Chat Messages */}
          <div className="h-56 overflow-y-auto p-4 space-y-3 bg-white text-xs">
            {messages.map((m) => {
              const isMe = m.sender === 'user';
              const isThisSpeaking = speakingMsgId === m.id && isSpeaking;

              return (
                <div
                  key={m.id}
                  className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-xl px-3.5 py-2 leading-relaxed ${
                      isMe
                        ? 'bg-[#2A1D15] text-[#FAF6F0]'
                        : isThisSpeaking
                          ? 'bg-[#FAF6F0] text-[#2B2B2B] border-2 border-[#B59975] ring-2 ring-[#B59975]/20'
                          : 'bg-[#FAF6F0] text-[#2B2B2B] border border-[#E8DFD3]'
                    } ${m.language === 'ur' ? 'font-urdu text-right' : ''}`}
                    dir={m.language === 'ur' ? 'rtl' : 'ltr'}
                  >
                    <p>{m.text}</p>

                    {!isMe && (
                      <div className="mt-1.5 pt-1 border-t border-[#E8DFD3] flex items-center justify-between">
                        <button
                          type="button"
                          onClick={() => speakMessage(m.text, m.id, m.language || language)}
                          className={`inline-flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded cursor-pointer font-medium transition-colors ${
                            isThisSpeaking
                              ? 'bg-[#B59975] text-[#140E0A]'
                              : 'bg-white/80 text-[#6E5437] hover:bg-white'
                          }`}
                        >
                          {isThisSpeaking ? (
                            <>
                              <Square className="w-2.5 h-2.5 fill-current" />
                              <span>{language === 'ur' ? 'روکیں' : 'Stop'}</span>
                            </>
                          ) : (
                            <>
                              <Volume2 className="w-2.5 h-2.5 text-[#B59975]" />
                              <span>{language === 'ur' ? 'بول کر سنیں' : 'Listen Aloud'}</span>
                            </>
                          )}
                        </button>
                        <span className="text-[9px] text-gray-400">
                          {m.language === 'ur' ? 'اردو آڈیو' : 'English Voice'}
                        </span>
                      </div>
                    )}
                  </div>
                  <span className="text-[10px] text-gray-400 mt-0.5 px-1">{m.timestamp}</span>
                </div>
              );
            })}

            {loading && (
              <div className="text-xs text-gray-400 flex items-center gap-1.5 italic">
                <span className="w-1.5 h-1.5 rounded-full bg-[#B59975] animate-ping" />
                Elma is preparing personalized recovery advice...
              </div>
            )}
          </div>

          {/* Input Bar */}
          <div className="p-3 bg-[#FAF6F0] border-t border-[#E8DFD3]">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={
                  language === 'ur'
                    ? 'علاج کی قیمت (روٹ کینال، امپلانٹ، وینئرز)، دوائیوں یا اپائنٹمنٹ کے بارے میں پوچھیں...'
                    : 'Ask about treatment prices (veneers, implants, root canal), recovery care, or booking...'
                }
                className="flex-1 px-3 py-2 text-xs bg-white rounded-lg border border-[#E8DFD3] focus:outline-hidden focus:border-[#1F4E4A]"
                dir={language === 'ur' ? 'rtl' : 'ltr'}
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="p-2 bg-[#1F4E4A] text-white rounded-lg hover:bg-[#163a37] disabled:opacity-40 transition-colors cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
};
