import React, { useState, useEffect, useRef } from 'react';
import { useClinic } from '../../context/ClinicContext';
import { askClinicAI } from '../../services/aiService';
import { ChatMessage, AssistantLanguage, DoctorReminder } from '../../types';
import { speechManager } from '../../utils/speechService';
import { 
  Bot, Send, Clock, Bell, Calendar, Sparkles, AlertTriangle, 
  Languages, RefreshCw, CheckCircle2, ChevronDown, ChevronUp, 
  Volume2, VolumeX, Square, Plus, Trash2, Radio, Check, AlarmClock
} from 'lucide-react';

export const DoctorAIAssistant: React.FC = () => {
  const { 
    language, setLanguage, activeDoctorId, doctors, appointments, 
    followUpTasks, notifications, reminders, addReminder, dismissReminder,
    lastScheduleUpdate
  } = useClinic();

  const currentDoctor = doctors.find(d => d.id === activeDoctorId) || doctors[0];
  const docAppointments = appointments.filter(a => a.doctorId === activeDoctorId);
  const pendingFollowUps = followUpTasks.filter(f => f.doctorId === activeDoctorId && f.status === 'Pending');

  const [collapsed, setCollapsed] = useState(false);
  const [speakingMsgId, setSpeakingMsgId] = useState<string | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showReminderForm, setShowReminderForm] = useState(false);
  const [activeTab, setActiveTab] = useState<'briefing' | 'reminders'>('briefing');

  // Reminder Form State
  const [reminderPatient, setReminderPatient] = useState('');
  const [reminderProcedure, setReminderProcedure] = useState('');
  const [reminderTime, setReminderTime] = useState('02:00 PM');
  const [reminderMinutes, setReminderMinutes] = useState<number>(15);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'doc-ai-intro',
      sender: 'assistant',
      text: language === 'ur'
        ? `ڈاکٹر ${currentDoctor.name.split(' ')[1] || currentDoctor.name} صاحب، السلام علیکم! میں ایلما ہوں، آپ کی کلینیکل اے آئی اسسٹنٹ۔ میں آپ کو پورے دن کا شیڈول آواز کے ذریعے بتا سکتی ہوں، طریقہ کار کے ٹائم ریمائنڈرز مقرر کر سکتی ہوں، اور کلینک کے لائیو شیڈول سے آپ کو مسلسل باخبر رکھوں گی۔`
        : `Greetings ${currentDoctor.name}! I am Elma, your Clinical AI Assistant. I can brief your full daily operatory schedule aloud by voice, set procedure time reminders, and continuously update you as patients and treatments change.`,
      timestamp: 'Just now',
      language
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [lastAnnouncedUpdate, setLastAnnouncedUpdate] = useState(lastScheduleUpdate);
  const [newUpdateBanner, setNewUpdateBanner] = useState(false);

  // Monitor continuous schedule updates
  useEffect(() => {
    if (lastScheduleUpdate > lastAnnouncedUpdate) {
      setNewUpdateBanner(true);
      setLastAnnouncedUpdate(lastScheduleUpdate);
    }
  }, [lastScheduleUpdate, lastAnnouncedUpdate]);

  // Periodic reminder notification check
  useEffect(() => {
    const timer = setInterval(() => {
      // Check if any reminder is pending
      const pendingReminders = reminders.filter(r => !r.isNotified);
      if (pendingReminders.length > 0) {
        // Just checking active status
      }
    }, 15000);
    return () => clearInterval(timer);
  }, [reminders]);

  const speakText = (text: string, msgId: string, lang: AssistantLanguage) => {
    if (speakingMsgId === msgId && isSpeaking) {
      speechManager.stop();
      setIsSpeaking(false);
      setSpeakingMsgId(null);
      return;
    }

    speechManager.stop();
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

  const handleSend = async (queryText?: string, autoSpeak: boolean = false) => {
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
      assistantType: 'doctor',
      language,
      context: {
        assistantName: 'Elma',
        doctor: currentDoctor.name,
        specialty: currentDoctor.specialty,
        appointmentCount: docAppointments.length,
        appointments: docAppointments.map(a => `${a.time} - ${a.patientName} (${a.procedure}) [Status: ${a.status}]`),
        followUps: pendingFollowUps.map(f => `${f.patientName} due on ${f.recommendedDate} for ${f.reason}`),
        recentNotifications: notifications.slice(0, 3).map(n => n.message)
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

    if (autoSpeak) {
      setTimeout(() => {
        speakText(reply, botMsgId, language);
      }, 200);
    }
  };

  // 1. One-Click Whole Day Voice Briefing
  const handleVoiceDaySchedule = () => {
    const q = language === 'ur'
      ? 'آج کا پورا شیڈول بول کر سنائیں'
      : 'Tell me my whole day schedule by voice';
    handleSend(q, true);
  };

  // 2. Continuous schedule updates
  const handleLiveUpdatesBriefing = () => {
    setNewUpdateBanner(false);
    const q = language === 'ur'
      ? 'شیڈول میں کیا نئی تبدیلیاں اور اپ ڈیٹس ہوئی ہیں؟'
      : 'Give me live continuous updates on schedule changes and appointments';
    handleSend(q, true);
  };

  // 3. Create a procedure time reminder
  const handleCreateReminder = (e: React.FormEvent) => {
    e.preventDefault();
    const patientName = reminderPatient.trim() || (docAppointments[0]?.patientName ?? 'Scheduled Patient');
    const procedure = reminderProcedure.trim() || (docAppointments[0]?.procedure ?? 'Clinical Procedure');

    addReminder({
      patientName,
      procedure,
      scheduledTime: reminderTime,
      reminderMinutesBefore: Number(reminderMinutes) || 15,
      notes: `Alert doctor ${reminderMinutes}m before ${procedure}`
    });

    const confirmationText = language === 'ur'
      ? `یاد دہانی مقرر کر دی گئی ہے: ${patientName} کے لیے ${procedure} بوقت ${reminderTime}۔ آپ کو ${reminderMinutes} منٹ قبل الرٹ دیا جائے گا۔`
      : `Time reminder set: ${patientName}'s ${procedure} is scheduled at ${reminderTime}. You will receive a voice and visual notification ${reminderMinutes} minutes prior.`;

    const reminderMsgId = `rem-${Date.now()}`;
    const botMsg: ChatMessage = {
      id: reminderMsgId,
      sender: 'assistant',
      text: confirmationText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      language
    };

    setMessages(prev => [...prev, botMsg]);
    setShowReminderForm(false);
    setReminderPatient('');
    setReminderProcedure('');

    // Speak confirmation
    speakText(confirmationText, reminderMsgId, language);
  };

  return (
    <div className="bg-white rounded-2xl border border-[#E8DFD3] shadow-xs overflow-hidden flex flex-col">
      {/* Top Assistant Header */}
      <div className="bg-[#2C1D11] text-white p-4 flex flex-wrap items-center justify-between gap-3 border-b border-[#B59975]/30 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#D8BE9B] to-[#997950] text-[#2C1D11] flex items-center justify-center font-serif font-bold text-lg shadow-xs shrink-0">
            E
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-serif font-bold text-sm text-white tracking-wide">
                Elma — Practice AI Assistant
              </h3>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] bg-emerald-950/80 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full font-mono">
                Continuous Live Sync
              </span>
            </div>
            <p className="text-[11px] text-[#DDD3C5]/80">
              Personal Clinical Concierge for {currentDoctor.name} • Bilingual Voice Engine
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Audio Stop Button if currently speaking */}
          {isSpeaking && (
            <button
              onClick={() => {
                speechManager.stop();
                setIsSpeaking(false);
                setSpeakingMsgId(null);
              }}
              className="px-2.5 py-1 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-semibold flex items-center gap-1.5 animate-pulse cursor-pointer shadow-xs"
            >
              <Square className="w-3 h-3 fill-current" />
              <span>{language === 'ur' ? 'آواز روکیں' : 'Stop Voice'}</span>
            </button>
          )}

          {/* Bilingual Language Switcher */}
          <button
            onClick={() => setLanguage(language === 'en' ? 'ur' : 'en')}
            className="text-xs bg-white/15 hover:bg-white/25 text-white px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 font-medium transition-colors cursor-pointer"
            title="Toggle between English & Urdu"
          >
            <Languages className="w-3.5 h-3.5 text-[#D8BE9B]" />
            <span className="font-semibold">{language === 'en' ? 'اردو' : 'English'}</span>
          </button>

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="text-white/70 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
          >
            {collapsed ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {!collapsed && (
        <>
          {/* Continuous Schedule Status & One-Click Voice Bar */}
          <div className="bg-gradient-to-r from-[#FAF6F0] via-white to-[#FAF6F0] p-3 border-b border-[#E8DFD3] flex flex-wrap items-center justify-between gap-3 text-xs">
            {/* Left: Prominent Speak Whole Day Schedule Button */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleVoiceDaySchedule}
                disabled={loading}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs shadow-xs transition-all cursor-pointer ${
                  isSpeaking
                    ? 'bg-amber-700 text-white ring-2 ring-amber-400/50'
                    : 'bg-[#4A2E18] hover:bg-[#382212] text-white hover:scale-[1.02]'
                }`}
              >
                {isSpeaking ? (
                  <>
                    <span className="flex items-center gap-1">
                      <span className="w-1.5 h-3 bg-white animate-pulse" />
                      <span className="w-1.5 h-4 bg-white animate-pulse delay-75" />
                      <span className="w-1.5 h-2 bg-white animate-pulse delay-150" />
                    </span>
                    <span>{language === 'ur' ? 'شیڈول بول کر سنایا جا رہا ہے...' : 'Briefing Daily Schedule...'}</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-4 h-4 text-[#D8BE9B]" />
                    <span>
                      {language === 'ur' 
                        ? '🎙️ پورا دن کا شیڈول سنیں' 
                        : '🎙️ Read My Whole Day Schedule Aloud'}
                    </span>
                  </>
                )}
              </button>

              <button
                onClick={() => {
                  setActiveTab('reminders');
                  setShowReminderForm(true);
                }}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-[#E8DFD3] hover:bg-amber-50/60 text-[#2B2B2B] font-semibold text-xs transition-colors cursor-pointer"
              >
                <AlarmClock className="w-3.5 h-3.5 text-[#C1622D]" />
                <span>{language === 'ur' ? 'ٹائم ریمائنڈر لگائیں' : 'Set Time Reminder'}</span>
                {reminders.length > 0 && (
                  <span className="bg-[#C1622D] text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                    {reminders.length}
                  </span>
                )}
              </button>
            </div>

            {/* Right: Live Sync Badge and Update Ping */}
            <div className="flex items-center gap-2 text-xs">
              <span className="text-gray-500 font-medium">
                Today: <strong>{docAppointments.length}</strong> Procedures • <strong>{pendingFollowUps.length}</strong> Recalls
              </span>
              <button
                onClick={handleLiveUpdatesBriefing}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg border text-[11px] font-medium transition-colors cursor-pointer ${
                  newUpdateBanner
                    ? 'bg-blue-100 text-blue-800 border-blue-300 animate-bounce'
                    : 'bg-white text-gray-700 border-[#E8DFD3] hover:bg-gray-50'
                }`}
                title="Continuous schedule updates"
              >
                <RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} />
                <span>{newUpdateBanner ? 'New Schedule Update!' : 'Sync Updates'}</span>
              </button>
            </div>
          </div>

          {/* Sub-tab Navigation */}
          <div className="bg-[#FAF6F0] px-4 pt-2 border-b border-[#E8DFD3] flex items-center gap-3 text-xs">
            <button
              onClick={() => setActiveTab('briefing')}
              className={`pb-2 font-semibold border-b-2 transition-colors cursor-pointer ${
                activeTab === 'briefing'
                  ? 'border-[#4A2E18] text-[#4A2E18]'
                  : 'border-transparent text-gray-500 hover:text-gray-800'
              }`}
            >
              Clinical Briefing & Voice Chat
            </button>
            <button
              onClick={() => setActiveTab('reminders')}
              className={`pb-2 font-semibold border-b-2 flex items-center gap-1.5 transition-colors cursor-pointer ${
                activeTab === 'reminders'
                  ? 'border-[#C1622D] text-[#C1622D]'
                  : 'border-transparent text-gray-500 hover:text-gray-800'
              }`}
            >
              <span>Procedure Time Reminders</span>
              <span className="bg-[#C1622D]/15 text-[#C1622D] text-[10px] px-1.5 py-0.2 rounded font-bold">
                {reminders.length}
              </span>
            </button>
          </div>

          {/* Tab 1: Briefing & Chat */}
          {activeTab === 'briefing' && (
            <>
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
                        } ${m.language === 'ur' ? 'font-urdu text-right text-sm' : ''}`}
                        dir={m.language === 'ur' ? 'rtl' : 'ltr'}
                      >
                        <p>{m.text}</p>

                        {!isMe && (
                          <div className="mt-2 pt-1 border-t border-[#E8DFD3] flex items-center justify-between gap-2">
                            <button
                              type="button"
                              onClick={() => speakText(m.text, m.id, m.language || language)}
                              className={`inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded cursor-pointer font-medium transition-colors ${
                                isThisSpeaking
                                  ? 'bg-[#B59975] text-[#140E0A] font-bold'
                                  : 'bg-white/80 text-[#6E5437] hover:bg-white border border-[#E8DFD3]'
                              }`}
                            >
                              {isThisSpeaking ? (
                                <>
                                  <Square className="w-2.5 h-2.5 fill-current" />
                                  <span>{language === 'ur' ? 'آواز بند کریں' : 'Stop Audio'}</span>
                                </>
                              ) : (
                                <>
                                  <Volume2 className="w-2.5 h-2.5 text-[#B59975]" />
                                  <span>{language === 'ur' ? 'بول کر سنیں' : 'Listen Aloud'}</span>
                                </>
                              )}
                            </button>
                            <span className="text-[9px] text-gray-400">
                              {m.language === 'ur' ? 'اردو صوتی بریفنگ' : 'Spoken English Audio'}
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
                    Elma is preparing clinical briefing...
                  </div>
                )}
              </div>

              {/* Chat Input */}
              <div className="p-3 bg-[#FAF6F0] border-t border-[#E8DFD3]">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSend(undefined, true);
                  }}
                  className="flex items-center gap-2"
                >
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={
                      language === 'ur'
                        ? 'شیڈول، مریض کی تفصیلات، یا الرٹس کے بارے میں پوچھیں...'
                        : 'Ask for whole day schedule, specific patient treatment times, or set reminders...'
                    }
                    className="flex-1 px-3 py-2 text-xs bg-white rounded-lg border border-[#E8DFD3] focus:outline-none focus:border-[#4A2E18]"
                    dir={language === 'ur' ? 'rtl' : 'ltr'}
                  />
                  <button
                    type="submit"
                    disabled={loading || !input.trim()}
                    className="p-2 bg-[#4A2E18] text-white rounded-lg hover:bg-[#382212] disabled:opacity-40 transition-colors cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              </div>
            </>
          )}

          {/* Tab 2: Procedure Time Reminders */}
          {activeTab === 'reminders' && (
            <div className="p-4 bg-white space-y-4 text-xs">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-serif font-bold text-sm text-[#2B2B2B]">
                    Active Procedure Time Reminders
                  </h4>
                  <p className="text-[11px] text-gray-500">
                    The AI Assistant notifies the doctor prior to each scheduled patient's treatment throughout the day.
                  </p>
                </div>
                <button
                  onClick={() => setShowReminderForm(!showReminderForm)}
                  className="px-3 py-1.5 bg-[#C1622D] hover:bg-[#a85222] text-white rounded-lg font-semibold flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{showReminderForm ? 'Cancel' : 'Add Time Reminder'}</span>
                </button>
              </div>

              {/* Inline Add Reminder Form */}
              {showReminderForm && (
                <form onSubmit={handleCreateReminder} className="p-3.5 rounded-xl bg-[#FAF6F0] border border-[#E8DFD3] space-y-3">
                  <span className="font-bold text-[#1F4E4A] block text-xs">
                    Configure New Procedure Reminder
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-gray-600 text-[11px] mb-1 font-semibold">
                        Select Patient or Enter Name
                      </label>
                      {docAppointments.length > 0 ? (
                        <select
                          value={reminderPatient}
                          onChange={(e) => {
                            setReminderPatient(e.target.value);
                            const matchedApt = docAppointments.find(a => a.patientName === e.target.value);
                            if (matchedApt) {
                              setReminderProcedure(matchedApt.procedure);
                              setReminderTime(matchedApt.time);
                            }
                          }}
                          className="w-full px-2.5 py-1.5 bg-white border border-[#E8DFD3] rounded-lg text-xs"
                        >
                          <option value="">Select from today's schedule...</option>
                          {docAppointments.map(a => (
                            <option key={a.id} value={a.patientName}>
                              {a.patientName} — {a.time} ({a.procedure})
                            </option>
                          ))}
                        </select>
                      ) : (
                        <input
                          type="text"
                          required
                          value={reminderPatient}
                          onChange={(e) => setReminderPatient(e.target.value)}
                          placeholder="e.g. Bilal Ahmed"
                          className="w-full px-2.5 py-1.5 bg-white border border-[#E8DFD3] rounded-lg text-xs"
                        />
                      )}
                    </div>

                    <div>
                      <label className="block text-gray-600 text-[11px] mb-1 font-semibold">
                        Clinical Procedure
                      </label>
                      <input
                        type="text"
                        required
                        value={reminderProcedure}
                        onChange={(e) => setReminderProcedure(e.target.value)}
                        placeholder="e.g. Porcelain Veneers Cementation"
                        className="w-full px-2.5 py-1.5 bg-white border border-[#E8DFD3] rounded-lg text-xs"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-gray-600 text-[11px] mb-1 font-semibold">
                        Scheduled Treatment Time
                      </label>
                      <select
                        value={reminderTime}
                        onChange={(e) => setReminderTime(e.target.value)}
                        className="w-full px-2.5 py-1.5 bg-white border border-[#E8DFD3] rounded-lg text-xs"
                      >
                        <option value="10:00 AM">10:00 AM</option>
                        <option value="11:30 AM">11:30 AM</option>
                        <option value="01:00 PM">01:00 PM</option>
                        <option value="02:00 PM">02:00 PM</option>
                        <option value="03:30 PM">03:30 PM</option>
                        <option value="05:00 PM">05:00 PM</option>
                        <option value="06:30 PM">06:30 PM</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-gray-600 text-[11px] mb-1 font-semibold">
                        Notification Lead Time
                      </label>
                      <select
                        value={reminderMinutes}
                        onChange={(e) => setReminderMinutes(Number(e.target.value))}
                        className="w-full px-2.5 py-1.5 bg-white border border-[#E8DFD3] rounded-lg text-xs"
                      >
                        <option value={5}>5 minutes before</option>
                        <option value={15}>15 minutes before (Recommended)</option>
                        <option value={30}>30 minutes before</option>
                        <option value={60}>1 hour before</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => setShowReminderForm(false)}
                      className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-lg cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1.5 bg-[#4A2E18] hover:bg-[#382212] text-white rounded-lg font-semibold cursor-pointer shadow-xs"
                    >
                      Save & Speak Confirmation
                    </button>
                  </div>
                </form>
              )}

              {/* Reminders List */}
              {reminders.length === 0 ? (
                <div className="p-8 text-center border border-dashed border-[#E8DFD3] rounded-xl text-gray-400">
                  <AlarmClock className="w-6 h-6 mx-auto mb-1 text-gray-300" />
                  No custom procedure reminders configured yet. Click "Add Time Reminder" above or ask the assistant by voice!
                </div>
              ) : (
                <div className="space-y-2">
                  {reminders.map((r) => (
                    <div
                      key={r.id}
                      className="p-3 rounded-xl border border-[#E8DFD3] bg-[#FAF6F0]/60 flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                          <AlarmClock className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-gray-900">{r.patientName}</span>
                            <span className="text-[10px] bg-[#4A2E18]/10 text-[#4A2E18] font-semibold px-2 py-0.2 rounded">
                              {r.procedure}
                            </span>
                          </div>
                          <p className="text-[11px] text-gray-500 mt-0.5">
                            Scheduled at <strong>{r.scheduledTime}</strong> • Alert set <strong>{r.reminderMinutesBefore}m</strong> prior
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => {
                            const speech = language === 'ur'
                              ? `ڈاکٹر صاحب، یاد دہانی: ${r.patientName} کے لیے ${r.procedure} بوقت ${r.scheduledTime} مقرر ہے۔`
                              : `Doctor reminder: ${r.patientName}'s ${r.procedure} is scheduled at ${r.scheduledTime}.`;
                            speakText(speech, `r-${r.id}`, language);
                          }}
                          className="px-2.5 py-1 bg-white hover:bg-gray-50 border border-[#E8DFD3] text-gray-700 rounded-lg flex items-center gap-1 font-medium cursor-pointer"
                          title="Speak this reminder aloud"
                        >
                          <Volume2 className="w-3 h-3 text-[#B59975]" />
                          <span>Speak</span>
                        </button>
                        <button
                          onClick={() => dismissReminder(r.id)}
                          className="p-1.5 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50 cursor-pointer"
                          title="Dismiss reminder"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};
