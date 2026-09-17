import express from "express";
import path from "path";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialized Gemini AI client
let aiClient: GoogleGenAI | null = null;
function getAIClient(): GoogleGenAI | null {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    try {
      aiClient = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    } catch (err) {
      console.error("Failed to initialize GoogleGenAI client:", err);
      return null;
    }
  }
  return aiClient;
}

// Health check endpoint
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", service: "ARK Dental Studio Unified OS" });
});

// Always serve static assets from public directory (images, icons, etc.)
app.use(express.static(path.join(process.cwd(), "public")));

// Knowledge base for fallback or context grounding
const CLINIC_INFO = {
  name: "ARK Dental",
  tagline: "Crafting Smiles That Last a Lifetime — Where Artistry Meets Precision",
  founder: "Dr. Muhammad Ali Riaz Khan",
  location: "Sector B-3, Phase 5, Hayatabad / Defence Road, Peshawar Cantt, Pakistan",
  whatsapp: "+92 333 9123456",
  phone: "+92 91 5845678",
  hours: "Monday to Saturday: 9:00 AM - 9:00 PM, Sunday: Emergency On-Call Only",
  services: [
    { name: "Porcelain Veneers & Smile Makeovers", pricePKR: "PKR 35,000 - 55,000 per tooth", category: "Aesthetics" },
    { name: "In-Office Laser Teeth Whitening", pricePKR: "PKR 25,000 - 35,000 per session", category: "Aesthetics" },
    { name: "Clear Aligners / Invisalign", pricePKR: "PKR 180,000 - 350,000 (full case)", category: "Orthodontics" },
    { name: "Dental Implants (Titanium & Zirconia)", pricePKR: "PKR 85,000 - 130,000 per implant", category: "Surgery" },
    { name: "Zirconia & Ceramic Crowns", pricePKR: "PKR 22,000 - 32,000 per unit", category: "Prosthetic" },
    { name: "Root Canal Therapy (Microscopic RCT)", pricePKR: "PKR 15,000 - 24,000", category: "Restorative" },
    { name: "Composite Aesthetic Bonding & Fillings", pricePKR: "PKR 6,000 - 12,000", category: "Restorative" },
    { name: "Ultrasonic Deep Scaling & Polishing", pricePKR: "PKR 7,000 - 10,000", category: "Hygiene" }
  ],
  doctors: [
    { name: "Dr. Muhammad Ali Riaz Khan", title: "Founder & Principal Dental Surgeon", degrees: "BDS, FCPS (Prosthodontics & Implantology), PDS, AAID (USA)" },
    { name: "Dr. Tariq Rahman", title: "Consultant Oral & Maxillofacial Surgeon", degrees: "BDS, FCPS (Oral & Maxillofacial Surgery), FICOI (USA)" },
    { name: "Dr. Ayla Khan", title: "Consultant Orthodontist & Smile Designer", degrees: "BDS, M.Orth RCS (Edinburgh), Certified Invisalign Provider" }
  ]
};

// AI assistant chat endpoint
app.post("/api/ai/chat", async (req, res) => {
  try {
    const { prompt, assistantType = "receptionist", language = "en", context = {} } = req.body;

    if (!prompt || typeof prompt !== "string") {
      return res.status(400).json({ error: "Prompt is required" });
    }

    const ai = getAIClient();
    const isUrdu = language === "ur";

    let systemInstruction = "";

    if (assistantType === "receptionist") {
      systemInstruction = `You are "Elma" (ایلما), the bilingual AI Assistant for ARK Dental Studio, a premier boutique dental & aesthetic surgery studio located in Peshawar (Defence/Hayatabad), Pakistan.
Clinic Highlights:
- Address: Sector B-3, Phase 5, Hayatabad / Defence Road, Peshawar. WhatsApp: +92 333 9123456. Hours: Mon-Sat 11am-9pm.
- Founder & Lead Surgeons: Dr. Muhammad Ali Riaz Khan (Founder & Principal Surgeon) & Dr. Tariq Rahman (Aesthetic & Implant Surgeon) & Dr. Ayla Khan (Orthodontist & Smile Designer).
- Key Treatments & Indicative Pricing:
  * Porcelain Veneers: PKR 35,000 - 55,000 per tooth
  * In-Office Laser Whitening: PKR 25,000 - 35,000
  * Invisible Aligners / Invisalign: PKR 180,000 - 350,000
  * Dental Implants: PKR 85,000 - 130,000
  * Root Canal Therapy (RCT): PKR 15,000 - 24,000
  * Ultrasonic Scaling & Polishing: PKR 7,000 - 10,000
Role & Speaking Guidelines:
1. Your name is Elma (ایلما). Always introduce or sign off as Elma when asked.
2. You explain everything by speaking fluently and naturally in either Urdu (اردو) or English depending on user selection.
3. Your explanations are crafted to sound natural when spoken aloud via Text-to-Speech: use clear phrasing, proper punctuation, and easy-to-understand descriptions.
4. If language is 'ur' (Urdu) or the user writes in Urdu, explain everything warmly in polite, clear Nastaliq Urdu (اردو).
5. If language is 'en' (English) or the user writes in English, explain clearly in refined, courteous English.
6. Help visitors understand procedures, pricing, doctor expertise, recovery care, and book consultations. Keep explanations crisp, pleasant, and easy to listen to (2-4 clear sentences).`;
    } else if (assistantType === "doctor") {
      systemInstruction = `You are "Elma" (ایلما), the Doctor Portal AI Clinical Assistant for Dr. Muhammad Ali Riaz Khan and the surgical team at ARK Dental Studio Peshawar.
Role & Capabilities:
- PROVIDE SPOKEN DAILY SCHEDULE BRIEFINGS: When asked for today's schedule, overview, or briefing, formulate a smooth, warm, spoken narrative in the requested language (${isUrdu ? "Urdu / اردو" : "English"}) detailing every scheduled patient chronologically: their appointment time, patient name, procedure, tooth number, and clinical prep notes.
- If the schedule is clear / empty (0 appointments), explicitly and politely speak aloud that the doctor's calendar is currently completely clear with 0 scheduled appointments for today, and offer to schedule a patient or set a custom clinical alert.
- TIME REMINDERS & PATIENT ALERTS: Clearly state when each patient's treatment is scheduled throughout the day (e.g., "At 11:30 AM, Bilal Ahmed is in Operatory 1 for Root Canal Therapy; at 02:00 PM, Sana Malik arrives for Porcelain Veneer Trial").
- Help the doctor set time reminders (e.g. 15-minute or 30-minute alerts before critical procedures).
- CONTINUOUS UPDATES: Continuously keep the doctor updated regarding schedule changes, confirmations, or new patient requests.
- Full context provided: ${JSON.stringify(context)}.
- Tone & Voice: Concise, confident, spoken-ready, respectful. In Urdu, use fluent, polite Nastaliq Urdu (ڈاکٹر صاحب، آپ کا آج کا شیڈول یہ ہے...). In English, use crisp, professional phrasing crafted for speech synthesis.`;
    } else if (assistantType === "patient") {
      systemInstruction = `You are "Elma" (ایلما), the Patient Portal AI Assistant for ARK Dental Studio Peshawar.
Role & Pricing Expertise:
- YOU ARE SPECIFICALLY TAILORED FOR PATIENTS. Answer all patient inquiries regarding clinical procedures, post-treatment recovery, and ESPECIALLY EXACT TREATMENT PRICING in Pakistani Rupees (PKR).
- Official ARK Dental Studio Indicative Pricing Sheet:
  * Porcelain Veneers & Laminates: PKR 35,000 - 55,000 per tooth (Custom hand-layered ceramic / E.max)
  * In-Office Laser Teeth Whitening: PKR 25,000 - 35,000 per session (Immediate 6-8 shades lighter)
  * Invisible / Clear Aligners (Full Course): PKR 180,000 - 350,000 (Custom 3D planned clear trays)
  * Titanium Dental Implants: PKR 85,000 - 130,000 per fixture (Swiss/German biocompatible titanium)
  * Microscopic Root Canal Therapy (RCT): PKR 15,000 - 24,000 per tooth
  * Zirconia / Porcelain Dental Crown: PKR 22,000 - 32,000 per tooth
  * Composite Aesthetic Fillings & Bonding: PKR 6,000 - 12,000 per surface
  * Ultrasonic Scaling & Deep Polishing: PKR 7,000 - 10,000
  * Wisdom Tooth Surgical Extraction: PKR 18,000 - 30,000
  * Comprehensive Dental Consultation & Digital X-Rays: PKR 2,000 - 3,000
- When a patient asks about price, provide the exact PKR range, explain what the procedure entails in simple terms, mention that pricing depends on individual clinical condition, and warmly offer to book an appointment.
- Patient Context: ${JSON.stringify(context)}.
- Language: ${isUrdu ? "Explain warmly and politely in fluent Urdu (اردو), crafted to be read aloud via voice assistant." : "Explain warmly and clearly in courteous English, crafted to be spoken aloud."}`;
    }

    // Try Gemini API if key is present
    if (ai) {
      try {
        const response = await ai.models.generateContent({
          model: "gemini-3.8-flash",
          contents: prompt,
          config: {
            systemInstruction,
            temperature: 0.7,
            maxOutputTokens: 600,
          },
        });
        const replyText = response.text || "";
        return res.json({ reply: replyText, source: "gemini" });
      } catch (geminiError) {
        console.warn("Gemini API call failed, falling back to smart rules:", geminiError);
      }
    }

    // High-quality bilingual fallback response generator
    const fallbackReply = generateFallbackReply(prompt, assistantType, language, context);
    return res.json({ reply: fallbackReply, source: "smart_assistant" });

  } catch (error) {
    console.error("AI chat error:", error);
    res.status(500).json({ error: "Internal server error processing AI request" });
  }
});

function generateFallbackReply(prompt: string, type: string, lang: string, context: any): string {
  const p = prompt.toLowerCase();
  const isUrdu = lang === "ur" || /[\u0600-\u06FF]/.test(prompt);

  if (type === "receptionist") {
    if (isUrdu) {
      if (p.includes("قیمت") || p.includes("خرچہ") || p.includes("rate") || p.includes("price") || p.includes("فیس")) {
        return "آرک ڈینٹل اسٹوڈیو پشاور میں خوش آمدید! ہمارے ہاں ٹیتھ وائٹننگ 25,000 سے 35,000 روپے، پورسلین وینیرز 35,000 سے 55,000 روپے فی دانت، اور ڈینٹل امپلانٹس 85,000 سے 130,000 روپے تک ہیں۔ کیا آپ تفصیلی معائنہ کے لیے اپائنٹمنٹ بُک کروانا چاہیں گے؟";
      }
      if (p.includes("وقت") || p.includes("ٹائم") || p.includes("timing") || p.includes("ایڈریس") || p.includes("address") || p.includes("کہاں")) {
        return "ہمارا کلینک سیکٹر B-3، فیز 5 حیات آباد / ڈیفنس روڈ پشاور میں واقع ہے۔ اوقات کار پیر تا ہفتہ صبح 11 بجے سے رات 9 بجے تک ہیں۔ آپ آن لائن یا واٹس ایپ کے ذریعے آسانی سے بکنگ کر سکتے ہیں۔";
      }
      if (p.includes("اپائنٹمنٹ") || p.includes("بک") || p.includes("book") || p.includes("ڈاکٹر")) {
        return "جی بالکل! میں خان ہوں، میں آپ کی اپائنٹمنٹ کی درخواست ہمارے کلینک اسٹاف تک فوری پہنچا سکتا ہوں۔ برائے مہربانی اپنا نام، مطلوبہ علاج اور تاریخ بتائیں، یا براہ راست ہمارے بکنگ فارم کا استعمال کریں۔";
      }
      return "السلام علیکم! میں خان ہوں، آرک ڈینٹل اسٹوڈیو کا اے آئی اسسٹنٹ۔ میں اپائنٹمنٹ بکنگ، دانتوں کے علاج، فیسوں اور بحالی کے بارے میں بول کر آپ کی مکمل رہنمائی کر سکتا ہوں۔ آپ مجھ سے اردو یا انگلش میں کوئی بھی سوال پوچھ سکتے ہیں!";
    } else {
      if (p.includes("price") || p.includes("cost") || p.includes("fee") || p.includes("veneers") || p.includes("whitening") || p.includes("implant")) {
        return "Welcome to ARK Dental Studio Peshawar! Our treatment prices are: In-office Laser Whitening (PKR 25,000 - 35,000), Porcelain Veneers (PKR 35,000 - 55,000 per tooth), and Dental Implants (PKR 85,000 - 130,000). Would you like me to reserve a personalized consultation for you?";
      }
      if (p.includes("location") || p.includes("address") || p.includes("hours") || p.includes("time") || p.includes("where")) {
        return "We are located at Sector B-3, Phase 5 Hayatabad / Defence Road, Peshawar Cantt. We are open Monday to Saturday from 11:00 AM to 9:00 PM (Fridays open 3:00 PM to 9:00 PM).";
      }
      if (p.includes("appointment") || p.includes("book") || p.includes("doctor") || p.includes("reserve")) {
        return "I would be happy to assist you with an appointment! You can click the 'Book Consultation' button above or tell me your preferred day and time, and our front desk staff will confirm your slot instantly.";
      }
      return "Hello! I am Elma, your AI Assistant at ARK Dental Studio Peshawar. I can explain everything to you by voice in either English or Urdu. How may I help you with appointments, treatments, or pricing today?";
    }
  }

  if (type === "doctor") {
    const aptCount = context?.appointmentCount ?? 0;
    const appointments: string[] = context?.appointments || [];
    const docName = context?.doctor || "Dr. Muhammad Ali Riaz Khan";

    if (isUrdu) {
      if (aptCount === 0 || appointments.length === 0) {
        return `ڈاکٹر صاحب، السلام علیکم! میں ایلما ہوں۔ آپ کا آج کا کلینیکل شیڈول فی الحال بالکل خالی ہے۔ آج کے دن کے لیے کوئی بھی مریض شیڈول نہیں ہے۔ اگر آپ نیا مریض شامل کرنا چاہتے ہیں یا کوئی یاد دہانی سیٹ کرنا چاہتے ہیں تو مجھے بتائیں۔`;
      }

      const scheduleList = appointments.slice(0, 4).join('؛ ');
      return `ڈاکٹر صاحب، السلام علیکم! میں ایلما ہوں، آپ کی شیڈول اسسٹنٹ۔ آپ کا آج کا پورا شیڈول یہ ہے: آج آپ کے پاس کل ${aptCount} مریض شیڈول ہیں: ${scheduleList}۔ تمام کیسز اور یاد دہانیاں فعال ہیں۔ کیا آپ کسی مخصوص طریقہ کار کا وقت یا ریمائنڈر سیٹ کرنا چاہتے ہیں؟`;
    } else {
      if (aptCount === 0 || appointments.length === 0) {
        return `Good day Doctor. I am Elma, your Clinical Practice Assistant. Your daily schedule is currently completely clear with 0 appointments scheduled for today. Would you like me to assist in scheduling a patient or setting a reminder?`;
      }

      const scheduleList = appointments.slice(0, 4).join('; ');
      return `Good day Doctor! I am Elma, your Clinical Assistant. Here is your full daily schedule for today: You have ${aptCount} scheduled appointments on your calendar: ${scheduleList}. All operatory records are ready. Would you like me to set a 15-minute reminder for any upcoming procedure?`;
    }
  }

  if (type === "patient") {
    const patientName = context?.patientName || "valued patient";

    // Patient asking for pricing of specific procedures
    if (isUrdu) {
      if (p.includes("وینیر") || p.includes("veneer")) {
        return `محترم مریض! آرک ڈینٹل اسٹوڈیو میں پورسلین وینیرز (Porcelain Veneers) کی قیمت 35,000 سے 55,000 روپے فی دانت ہے۔ یہ ہینڈ کرافٹڈ E.max سرامک سے تیار کیے جاتے ہیں جس سے آپ کی مسکراہٹ قدرتی اور دلکش نظر آتی ہے۔ کیا آپ کنسلٹیشن بُک کرنا چاہتے ہیں؟`;
      }
      if (p.includes("وائٹننگ") || p.includes("whitening") || p.includes("سفید")) {
        return `ہمارے ہاں جدید لیزر ٹیتھ وائٹننگ (In-Office Laser Whitening) کی قیمت 25,000 سے 35,000 روپے فی سیشن ہے۔ ایک ہی سیشن میں دانت 6 سے 8 شیڈز تک قدرتی طور پر روشن اور سفید ہو جاتے ہیں۔`;
      }
      if (p.includes("امپلانٹ") || p.includes("implant") || p.includes("نیا دانت")) {
        return `ٹائٹینیم ڈینٹل امپلانٹ (Dental Implant) کی قیمت 85,000 سے 130,000 روپے فی فکسچر ہے۔ اس میں سوئس/جرمن گریڈ ٹائٹینیم اور لائف ٹائم استحکام شامل ہے۔`;
      }
      if (p.includes("روٹ کینال") || p.includes("rct") || p.includes("root canal") || p.includes("کینال")) {
        return `مائیکروسکوپک روٹ کینال تھیراپی (Root Canal Therapy) کی قیمت 15,000 سے 24,000 روپے فی دانت ہے۔ اس سے شدید درد اور انفیکشن بالکل بے درد طریقے سے ختم ہو جاتا ہے۔`;
      }
      if (p.includes("الائنر") || p.includes("aligner") || p.includes("invisalign") || p.includes("تار") || p.includes("بغیر تار")) {
        return `انویزیبل کلیئر الائنرز (Clear Aligners) کا مکمل کورس 180,000 سے 350,000 روپے میں دستیاب ہے، جو بغیر تاروں کے 3D ٹیکنالوجی سے دانتوں کو سیدھا کرتا ہے۔`;
      }
      if (p.includes("کراؤن") || p.includes("crown") || p.includes("خول") || p.includes("کیپ")) {
        return `زرکونیا اور سرامک ڈینٹل کراؤن (Dental Crown) کی فیس 22,000 سے 32,000 روپے فی دانت ہے۔ یہ قدرتی دانت کی طرح مضبوط اور خوبصورت ہوتا ہے۔`;
      }
      if (p.includes("اسکیلنگ") || p.includes("scaling") || p.includes("صفائی") || p.includes("cleaning")) {
        return `الٹراسونک اسکیلنگ اور پالشنگ (Ultrasonic Scaling & Polishing) کی قیمت 7,000 سے 10,000 روپے ہے۔ اس سے دانتوں کا میل، پیلا پن اور مسوڑھوں کے مسائل صاف ہو جاتے ہیں۔`;
      }
      if (p.includes("فلنگ") || p.includes("filling") || p.includes("مسالہ")) {
        return `کمپوزٹ ایسٹیٹک فلنگ (Aesthetic Tooth Filling) کی فیس 6,000 سے 12,000 روپے فی دانت ہے۔`;
      }
      if (p.includes("قیمت") || p.includes("خرچہ") || p.includes("فیس") || p.includes("rate") || p.includes("price") || p.includes("cost")) {
        return `آرک ڈینٹل اسٹوڈیو پشاور میں اہم علاج کے نرخ یہ ہیں: وینیرز (35k-55k روپے فی دانت)، لیزر وائٹننگ (25k-35k روپے)، امپلانٹس (85k-130k روپے)، روٹ کینال (15k-24k روپے)، کلیئر الائنرز (180k-350k روپے)، اور اسکیلنگ (7k-10k روپے)۔ آپ کس علاج کی تفصیل جاننا چاہتے ہیں؟`;
      }

      return `محترم ${patientName}، السلام علیکم! میں ایلما ہوں، آپ کی پرسنل ڈینٹل اسسٹنٹ۔ آپ مجھ سے کسی بھی علاج کی قیمت، طریقہ کار اور بعد کی احتیاطوں کے بارے میں اردو یا انگلش میں پوچھ سکتے ہیں، یا اگلی وزٹ بک کر سکتے ہیں۔`;
    } else {
      if (p.includes("veneer") || p.includes("laminate")) {
        return `Porcelain Veneers at ARK Dental Studio are priced between PKR 35,000 and 55,000 per tooth. We utilize bespoke IPS e.max ceramic, layered by hand for unmatched natural translucency. Would you like to schedule a digital smile design consultation?`;
      }
      if (p.includes("whitening") || p.includes("bleach")) {
        return `Our In-Office Laser Teeth Whitening is PKR 25,000 to 35,000 per session. Using advanced cold-laser technology, it brightens your teeth by 6 to 8 shades in a single 45-minute appointment with zero enamel harm.`;
      }
      if (p.includes("implant")) {
        return `Titanium Dental Implants range from PKR 85,000 to 130,000 per fixture (excluding custom zirconia crown). We place premium Swiss and German implants with high surgical precision for lifelong tooth replacement.`;
      }
      if (p.includes("root canal") || p.includes("rct")) {
        return `Microscopic Root Canal Therapy (RCT) is PKR 15,000 to 24,000 per tooth depending on whether it is an anterior tooth or molar. The procedure is performed under magnified digital optics for painless relief.`;
      }
      if (p.includes("aligner") || p.includes("invisalign") || p.includes("braces")) {
        return `Invisible Clear Aligners range from PKR 180,000 to 350,000 for a comprehensive treatment case. It straightens teeth discreetly using custom 3D-scanned transparent aligners without metallic brackets or wires.`;
      }
      if (p.includes("crown") || p.includes("cap")) {
        return `Monolithic Zirconia & Ceramic Dental Crowns are PKR 22,000 to 32,000 per crown. They provide exceptional fracture resistance and lifelike optical aesthetics.`;
      }
      if (p.includes("scaling") || p.includes("cleaning") || p.includes("polish")) {
        return `Ultrasonic Deep Scaling & Polishing is PKR 7,000 to 10,000 per session. It thoroughly removes tartar, extrinsic tobacco/tea stains, and protects against gingivitis.`;
      }
      if (p.includes("filling") || p.includes("bonding")) {
        return `Direct Composite Aesthetic Fillings & Micro-Bonding range from PKR 6,000 to 12,000 per surface using shade-matched nanohybrid composite.`;
      }
      if (p.includes("price") || p.includes("cost") || p.includes("fee") || p.includes("rate") || p.includes("how much")) {
        return `Here is our official indicative price guide: Porcelain Veneers (PKR 35k–55k/tooth), Laser Whitening (PKR 25k–35k), Dental Implants (PKR 85k–130k), Root Canal (PKR 15k–24k), Clear Aligners (PKR 180k–350k), and Deep Scaling (PKR 7k–10k). Which procedure would you like details on?`;
      }

      return `Hello ${patientName}! I am Elma, your Personal Dental Care Assistant at ARK Dental Studio Peshawar. I can provide exact pricing for any dental treatment, explain post-treatment recovery steps, or help you book your next appointment. What can I clarify for you?`;
    }
  }

  return "Thank you for reaching out to ARK Dental Studio Peshawar.";
}

// Vite middleware & Production Serving
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`ARK Dental Studio Server running on port ${PORT}`);
  });
}

startServer();
