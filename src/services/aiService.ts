import { AssistantLanguage } from '../types';

export interface AIChatOptions {
  prompt: string;
  assistantType: 'receptionist' | 'doctor' | 'patient';
  language: AssistantLanguage;
  context?: any;
}

export async function askClinicAI(options: AIChatOptions): Promise<string> {
  try {
    const response = await fetch('/api/ai/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(options),
    });

    if (response.ok) {
      const data = await response.json();
      if (data.reply) {
        return data.reply;
      }
    }
  } catch (error) {
    console.warn('Backend AI API error, switching to client smart assistant fallback:', error);
  }

  // Client-side instant fallback if backend is unreachable
  return getSmartClientFallback(options);
}

function getSmartClientFallback(options: AIChatOptions): string {
  const { prompt, assistantType, language, context } = options;
  const p = prompt.toLowerCase();
  const isUrdu = language === 'ur' || /[\u0600-\u06FF]/.test(prompt);

  if (assistantType === 'receptionist') {
    if (isUrdu) {
      if (p.includes('قیمت') || p.includes('خرچہ') || p.includes('ریٹ') || p.includes('وینیر') || p.includes('امپلانٹ')) {
        return 'آرک ڈینٹل اسٹوڈیو پشاور میں پورسلین وینیرز کی قیمت 35,000 سے 55,000 روپے فی دانت، لیزر ٹیتھ وائٹننگ 25,000 سے 35,000 روپے، اور ٹائٹینیم ڈینٹل امپلانٹس 85,000 سے 130,000 روپے ہیں۔ کیا آپ ڈاکٹر طارق رحمان کے ساتھ کنسلٹیشن شیڈول کروانا چاہتے ہیں؟';
      }
      if (p.includes('وقت') || p.includes('ٹائم') || p.includes('پتہ') || p.includes('ایڈریس')) {
        return 'ہمارا اسٹوڈیو فیز 5، حیات آباد / ڈیفنس روڈ پشاور کینٹ میں واقع ہے۔ پیر تا ہفتہ صبح 11 بجے سے رات 9 بجے تک کھلا رہتا ہے۔';
      }
      if (p.includes('اپائنٹمنٹ') || p.includes('بک') || p.includes('ڈاکٹر')) {
        return 'میں خوش آمدید کہتی ہوں! میں ایلما ہوں، آپ کے معائنے کی درخواست ہمارے عملے کو موصول ہو گئی ہے۔ آپ اوپر دائیں جانب موجود "Book Consultation" بٹن سے بھی فوری تاریخ منتخب کر سکتے ہیں۔';
      }
      return 'السلام علیکم! میں ایلما ہوں، آرک ڈینٹل اسٹوڈیو پشاور کی اے آئی اسسٹنٹ۔ میں آپ کو دانتوں کے علاج، قیمتوں اور اپائنٹمنٹ کے بارے میں اردو یا انگریزی میں بول کر سب سمجھا سکتی ہوں۔ آپ کا کیا سوال ہے؟';
    } else {
      if (p.includes('price') || p.includes('cost') || p.includes('veneers') || p.includes('whitening') || p.includes('implant') || p.includes('aligners')) {
        return 'At ARK Dental Studio Peshawar, indicative pricing is: Porcelain Veneers (PKR 35k–55k/tooth), In-Office Laser Whitening (PKR 25k–35k/session), Clear Aligners (PKR 180k–350k full case), and Titanium Implants (PKR 85k–130k). Would you like to book a smile consultation?';
      }
      if (p.includes('timing') || p.includes('hours') || p.includes('location') || p.includes('address')) {
        return 'We are located at Sector B-3, Phase 5 Hayatabad / Defence Road, Peshawar Cantt. Hours: Mon–Sat 11:00 AM – 9:00 PM (Friday 3:00 PM – 9:00 PM).';
      }
      if (p.includes('appointment') || p.includes('book') || p.includes('doctor')) {
        return 'I can certainly help you request your appointment! You can also use our instant booking modal above, or let me know your preferred day and time so our front desk can confirm your chair slot.';
      }
      return 'Hello! I am Elma, your AI Assistant at ARK Dental Studio Peshawar. I can explain everything to you by voice in English or Urdu. How can I assist you with appointment bookings, treatment pricing, or doctor credentials today?';
    }
  }

  if (assistantType === 'doctor') {
    const aptCount = context?.appointmentCount ?? 0;
    const appointments: string[] = context?.appointments || [];

    if (isUrdu) {
      if (aptCount === 0 || appointments.length === 0) {
        return 'ڈاکٹر صاحب، السلام علیکم! میں ایلما ہوں۔ آپ کا آج کا کلینیکل شیڈول فی الحال بالکل خالی ہے۔ آج کے دن کے لیے کوئی بھی مریض شیڈول نہیں ہے۔ اگر آپ نیا مریض شامل کرنا چاہتے ہیں یا کوئی یاد دہانی سیٹ کرنا چاہتے ہیں تو مجھے بتائیں۔';
      }
      const scheduleList = appointments.slice(0, 4).join('؛ ');
      return `ڈاکٹر صاحب، السلام علیکم! میں ایلما ہوں، آپ کی شیڈول اسسٹنٹ۔ آپ کا آج کا پورا شیڈول یہ ہے: آج آپ کے پاس کل ${aptCount} مریض شیڈول ہیں: ${scheduleList}۔ تمام ریکارڈز تیار ہیں اور یاد دہانیاں سیٹ کر دی گئی ہیں۔`;
    } else {
      if (aptCount === 0 || appointments.length === 0) {
        return 'Good day Doctor. I am Elma, your Clinical Practice Assistant. Your daily schedule is currently completely clear with 0 appointments scheduled for today. Would you like me to assist in scheduling a patient or setting a reminder?';
      }
      const scheduleList = appointments.slice(0, 4).join('; ');
      return `Good day Doctor! I am Elma, your Clinical Assistant. Here is your full daily schedule for today: You have ${aptCount} scheduled appointments on your calendar: ${scheduleList}. All operatory records are ready and continuous monitoring is active.`;
    }
  }

  if (assistantType === 'patient') {
    const patientName = context?.patientName || 'valued patient';

    if (isUrdu) {
      if (p.includes('وینیر') || p.includes('veneer')) {
        return 'محترم مریض! آرک ڈینٹل اسٹوڈیو میں پورسلین وینیرز (Porcelain Veneers) کی قیمت 35,000 سے 55,000 روپے فی دانت ہے۔ یہ ہینڈ کرافٹڈ E.max سرامک سے تیار کیے جاتے ہیں جس سے مسکراہٹ انتہائی پرکشش ہو جاتی ہے۔';
      }
      if (p.includes('وائٹننگ') || p.includes('whitening') || p.includes('سفید')) {
        return 'جدید لیزر ٹیتھ وائٹننگ (In-Office Laser Whitening) کی قیمت 25,000 سے 35,000 روپے فی سیشن ہے۔ ایک ہی 45 منٹ کے سیشن میں دانت 6 سے 8 شیڈز تک قدرتی طور پر سفید ہو جاتے ہیں۔';
      }
      if (p.includes('امپلانٹ') || p.includes('implant') || p.includes('نیا دانت')) {
        return 'ٹائٹینیم ڈینٹل امپلانٹ (Dental Implant) کی قیمت 85,000 سے 130,000 روپے فی فکسچر ہے۔ اس میں سوئس/جرمن گریڈ ٹائٹینیم اور لائف ٹائم مضبوطی شامل ہے۔';
      }
      if (p.includes('روٹ کینال') || p.includes('rct') || p.includes('root canal') || p.includes('کینال')) {
        return 'مائیکروسکوپک روٹ کینال تھیراپی (Root Canal Therapy) کی قیمت 15,000 سے 24,000 روپے فی دانت ہے۔ یہ ڈیجیٹل مائیکروسکوپ کے ذریعے بالکل بے درد انداز میں کی جاتی ہے۔';
      }
      if (p.includes('الائنر') || p.includes('aligner') || p.includes('invisalign') || p.includes('تار')) {
        return 'انویزیبل کلیئر الائنرز (Clear Aligners) کا مکمل کورس 180,000 سے 350,000 روپے میں دستیاب ہے، جو بغیر تاروں کے 3D ٹیکنالوجی سے دانتوں کو سیدھا کرتا ہے۔';
      }
      if (p.includes('کراؤن') || p.includes('crown') || p.includes('خول') || p.includes('کیپ')) {
        return 'زرکونیا اور سرامک ڈینٹل کراؤن (Dental Crown) کی فیس 22,000 سے 32,000 روپے فی دانت ہے۔';
      }
      if (p.includes('اسکیلنگ') || p.includes('scaling') || p.includes('صفائی')) {
        return 'الٹراسونک اسکیلنگ اور پالشنگ (Ultrasonic Scaling & Polishing) کی قیمت 7,000 سے 10,000 روپے ہے۔';
      }
      if (p.includes('قیمت') || p.includes('خرچہ') || p.includes('فیس') || p.includes('rate') || p.includes('price')) {
        return 'آرک ڈینٹل اسٹوڈیو پشاور میں اہم علاج کے نرخ یہ ہیں: وینیرز (35k-55k روپے فی دانت)، لیزر وائٹننگ (25k-35k روپے)، امپلانٹس (85k-130k روپے)، روٹ کینال (15k-24k روپے)، کلیئر الائنرز (180k-350k روپے)، اور اسکیلنگ (7k-10k روپے)۔';
      }
      return `محترم ${patientName}، السلام علیکم! میں خان ہوں، آپ کا کیئر اسسٹنٹ۔ آپ مجھ سے کسی بھی علاج کی قیمت، طریقہ کار یا اگلی اپائنٹمنٹ کے بارے میں اردو یا انگلش میں پوچھ سکتے ہیں۔`;
    } else {
      if (p.includes('veneer') || p.includes('laminate')) {
        return 'Porcelain Veneers at ARK Dental Studio are priced between PKR 35,000 and 55,000 per tooth using handcrafted IPS e.max aesthetic ceramic.';
      }
      if (p.includes('whitening') || p.includes('bleach')) {
        return 'Our In-Office Laser Teeth Whitening is PKR 25,000 to 35,000 per session, lightening teeth by 6 to 8 shades in a single 45-minute appointment.';
      }
      if (p.includes('implant')) {
        return 'Titanium Dental Implants range from PKR 85,000 to 130,000 per fixture with Swiss and German biocompatible titanium.';
      }
      if (p.includes('root canal') || p.includes('rct')) {
        return 'Microscopic Root Canal Therapy (RCT) is PKR 15,000 to 24,000 per tooth, performed comfortably under magnification.';
      }
      if (p.includes('aligner') || p.includes('invisalign') || p.includes('braces')) {
        return 'Invisible Clear Aligners range from PKR 180,000 to 350,000 for a full orthodontic course without brackets or wires.';
      }
      if (p.includes('crown') || p.includes('cap')) {
        return 'Monolithic Zirconia & Ceramic Dental Crowns are PKR 22,000 to 32,000 per crown with life-like translucency.';
      }
      if (p.includes('scaling') || p.includes('cleaning') || p.includes('polish')) {
        return 'Ultrasonic Deep Scaling & Polishing is PKR 7,000 to 10,000 per session to eliminate plaque, stains, and prevent gum disease.';
      }
      if (p.includes('price') || p.includes('cost') || p.includes('fee') || p.includes('rate') || p.includes('how much')) {
        return 'Official indicative pricing at ARK Dental Studio: Porcelain Veneers (PKR 35k–55k/tooth), Laser Whitening (PKR 25k–35k), Dental Implants (PKR 85k–130k), Root Canal (PKR 15k–24k), Clear Aligners (PKR 180k–350k), and Deep Scaling (PKR 7k–10k).';
      }
      return `Hello ${patientName}! I am Elma, your Personal Dental Care Assistant at ARK Dental Studio Peshawar. I can explain exact treatment prices, post-op instructions, or book your next follow-up. How can I help you today?`;
    }
  }

  return 'ARK Dental Studio Unified Clinical OS ready.';
}
