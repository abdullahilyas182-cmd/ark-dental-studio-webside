export interface TreatmentServiceOption {
  id: string;
  // Easy clinical name in simple English without medical jargon or prices
  easyName: string;
  // Easy Urdu translation in clear Urdu script
  easyNameUrdu: string;
  // Short label for compact select dropdowns
  shortLabel: string;
  // Short Urdu label
  shortLabelUrdu: string;
  // Simple 1-sentence patient explanation
  simpleDescription: string;
  simpleDescriptionUrdu: string;
  // Spoken text for English voice assistant
  voiceTextEnglish: string;
  // Spoken text for Urdu voice assistant
  voiceTextUrdu: string;
  // Roman Urdu for phonetics and subtitle readability
  romanUrdu: string;
  // Corresponding category
  category: 'Restorative' | 'Prosthetic' | 'Aesthetics' | 'Surgery' | 'Orthodontics' | 'Family' | 'Emergency' | 'Preventive';
  estimatedDuration: string;
}

export const EASY_CLINICAL_TREATMENTS: TreatmentServiceOption[] = [
  {
    id: "root-canal",
    easyName: "Root Canal — Stop Severe Tooth Pain & Save Your Natural Tooth",
    easyNameUrdu: "روٹ کینال — دانت کا شدید درد ختم کرنا اور دانت محفوظ رکھنا",
    shortLabel: "Root Canal (Stop Pain & Save Tooth)",
    shortLabelUrdu: "روٹ کینال (دانت بچانا اور درد کا خاتمہ)",
    simpleDescription: "Gentle cleaning of infected tooth nerve to stop throbbing pain immediately without pulling out your natural tooth.",
    simpleDescriptionUrdu: "دانت کے اندر سے انفیکشن نکال کر درد فوراً ختم کرنا تاکہ دانت نکالنے کی ضرورت نہ پڑے۔",
    voiceTextEnglish: "Welcome to ARK Dental Studio. A Root Canal treatment is a gentle procedure that removes deep infection from inside your tooth. It stops severe tooth pain immediately and permanently saves your natural tooth so you do not have to extract it. Using modern microscopic numbing, it is completely painless.",
    voiceTextUrdu: "اے آر کے ڈینٹل اسٹوڈیو میں خوش آمدید۔ روٹ کینال کے علاج میں دانت کے اندر موجود انفیکشن اور درد والے حصے کو جدید کیمرے کے ذریعے صاف کیا جاتا ہے۔ اس سے دانت کا شدید درد فوراً ختم ہو جاتا ہے اور آپ کا اصلی دانت محفوظ رہتا ہے۔ لوکل اینستھیزیا کی وجہ سے یہ علاج بالکل بے درد ہوتا ہے۔",
    romanUrdu: "Root canal mein daant ke andar ka infection saaf kiya jaata hai taake dard fori khatam ho aur daant nikalwana na pare. Yeh bilkul dard ke baghair hota hai.",
    category: "Restorative",
    estimatedDuration: "45 – 60 mins"
  },
  {
    id: "dental-implants",
    easyName: "Dental Implants — Permanent Replacement for Missing Teeth",
    easyNameUrdu: "ڈینٹل امپلانٹ — گرے ہوئے دانت کی جگہ نیا پکا دانت لگانا",
    shortLabel: "Dental Implants (Permanent Missing Teeth Fix)",
    shortLabelUrdu: "ڈینٹل امپلانٹ (پکا نیا دانت لگانا)",
    simpleDescription: "A fixed artificial root and realistic ceramic crown that look, bite, and feel exactly like your original real teeth.",
    simpleDescriptionUrdu: "جبڑے میں پکا دانت لگانا جو بالکل اصلی دانت کی طرح نظر آتا ہے اور کھانا چبانے میں مدد دیتا ہے۔",
    voiceTextEnglish: "Dental Implants are the gold standard for missing teeth. We gently place a medical titanium root into your jaw, followed by a custom ceramic crown. It stays permanently fixed, allows you to chew all foods with full strength, and never moves like traditional dentures.",
    voiceTextUrdu: "ڈینٹل امپلانٹ گرے ہوئے یا ٹوٹے ہوئے دانتوں کا سب سے بہترین اور مستقل علاج ہے۔ ہم جبڑے میں ایک مضبوط ٹائٹینیم دانت لگاتے ہیں جو عمر بھر چلتا ہے۔ آپ بغیر کسی پریشانی کے ہر قسم کا کھانا چبا سکتے ہیں اور یہ بالکل اصلی دانت کی طرح دکھائی دیتا ہے۔",
    romanUrdu: "Dental implant mein missing daant ki jagah paka naya daant lagaya jaata hai jo bilkul asli daant ki tarah kaam karta hai aur mazboot hota hai.",
    category: "Prosthetic",
    estimatedDuration: "45 mins keyhole procedure"
  },
  {
    id: "teeth-whitening",
    easyName: "Laser Teeth Whitening — Remove Yellow Stains & Brighten Smile",
    easyNameUrdu: "ٹیتھ وائٹننگ — دانتوں کا پیلا پن اور داغ صاف کر کے چمکانا",
    shortLabel: "Teeth Whitening (Stain Removal & Bright Smile)",
    shortLabelUrdu: "ٹیتھ وائٹننگ (دانت چمکانا اور سفیدی)",
    simpleDescription: "Safe cold-laser treatment to clear tea, coffee, and tobacco stains, making teeth up to 8 shades whiter in 45 minutes.",
    simpleDescriptionUrdu: "چائے، کافی اور سگریٹ کے داغ صاف کر کے دانتوں کو قدرتی سفید اور چمکدار بنانا۔",
    voiceTextEnglish: "Laser Teeth Whitening is a quick 45-minute treatment at our clinic. We protect your gums with a gentle blue shield, apply a medical whitening gel, and activate it with a specialized cold diode laser. It removes deep yellow stains from tea and coffee, giving you an instantly cleaner and brighter smile.",
    voiceTextUrdu: "لیزر ٹیتھ وائٹننگ سے صرف پینتالیس منٹ میں دانتوں کا پیلا پن اور چائے کافی کے ضدی داغ صاف ہو جاتے ہیں۔ مسوڑھوں کو محفوظ رکھنے کے لیے بلیو شیلڈ لگائی جاتی ہے جس سے دانتوں کو کوئی نقصان نہیں پہنچتا اور مسکراہٹ انتہائی پرکشش ہو جاتی ہے۔",
    romanUrdu: "Laser teeth whitening se sirf 45 minute mein peela pan door ho jaata hai aur daant qudrati tor par chamakdar aur saaf ho jaate hain.",
    category: "Aesthetics",
    estimatedDuration: "45 mins single session"
  },
  {
    id: "smile-makeover-veneers",
    easyName: "Smile Makeover & Veneers — Fix Chipped, Stained, or Gapped Teeth",
    easyNameUrdu: "سمائل میک اوور اور وینیرز — ٹوٹے، کٹے یا بد رنگ دانتوں کی خوبصورتی",
    shortLabel: "Smile Makeover & Veneers (Fix Chips & Gaps)",
    shortLabelUrdu: "سمائل میک اوور (خوبصورت مسکراہٹ اور وینیرز)",
    simpleDescription: "Ultra-thin custom porcelain coverings designed to fix chipped, gapped, or discolored front teeth for a picture-perfect smile.",
    simpleDescriptionUrdu: "دانتوں کے اوپر لگائی جانے والی پتلی خوبصورت کورنگ جو ٹیڑھے، ٹوٹے یا بد رنگ دانتوں کو خوبصورت بناتی ہے۔",
    voiceTextEnglish: "Porcelain Veneers and Smile Makeovers correct chipped, uneven, or stained front teeth. Ultra-thin Swiss porcelain layers are handcrafted and gently bonded over your front teeth, giving you a symmetrical, luminous, and natural-looking Hollywood smile designed specifically for your face.",
    voiceTextUrdu: "سمائل میک اوور اور پورسلین وینیرز ان مریضوں کے لیے ہیں جن کے سامنے کے دانت ٹوٹے ہوئے، کٹے ہوئے یا بد رنگ ہوں۔ اس میں دانتوں پر انتہائی نفیس خوبصورت کورنگ لگائی جاتی ہے جو چہرے کی خوبصورتی اور مسکراہٹ کو چار چاند لگا دیتی ہے۔",
    romanUrdu: "Veneers aage ke tootay huwe ya bad-rang daanton par lagayi jaati hain jo aapki smile ko bilkul perfect aur confident bana deti hain.",
    category: "Aesthetics",
    estimatedDuration: "2 comfortable visits"
  },
  {
    id: "clear-aligners",
    easyName: "Clear Aligners — Straighten Teeth Without Metal Braces",
    easyNameUrdu: "کلیئر الائنرز — بغیر تاروں کے ٹیڑھے دانت سیدھے کرنا",
    shortLabel: "Clear Aligners (Invisible Teeth Straightening)",
    shortLabelUrdu: "کلیئر الائنرز (بغیر تار کے دانت سیدھے کرنا)",
    simpleDescription: "Clear, invisible plastic trays that straighten crowded or crooked teeth without visible wires or metal brackets.",
    simpleDescriptionUrdu: "شفاف اور پوشیدہ الائنرز جو بغیر لوہے کی تاروں کے ٹیڑھے دانتوں کو ترتیب میں لاتے ہیں۔",
    voiceTextEnglish: "Clear Aligners straighten crooked teeth without ugly metal brackets or wires. You wear custom, transparent, smooth trays that gradually move teeth into place. They are nearly invisible, comfortable to wear, and you can take them out anytime you eat or brush your teeth.",
    voiceTextUrdu: "کلیئر الائنرز ٹیڑھے اور آگے پیچھے دانتوں کو بغیر کسی لوہے کی تاروں کے سیدھا کرتے ہیں۔ یہ شیشے کی طرح شفاف ٹرے ہوتی ہیں جنہیں دیکھنا مشکل ہوتا ہے، اور آپ کھانا کھاتے وقت یا برش کرتے وقت انہیں آسانی سے اتار سکتے ہیں۔",
    romanUrdu: "Clear aligners transparent plastic trays hoti hain jo baghair taaron ke daanton ko seedha karti hain aur unhein pehnna bohat aasan hai.",
    category: "Orthodontics",
    estimatedDuration: "Periodic review every 6 weeks"
  },
  {
    id: "cavity-filling",
    easyName: "Cavity Filling — Clean Decayed Teeth & Restore Natural Shape",
    easyNameUrdu: "کیویٹی فلنگ — کیڑے لگے اور کھوکھلے دانتوں کی قدرتی صفائی اور فلنگ",
    shortLabel: "Cavity Filling (Fix Tooth Holes & Decay)",
    shortLabelUrdu: "کیویٹی فلنگ (کھوکھلا دانت بھرنا)",
    simpleDescription: "Gentle removal of dark cavities and sealing with tooth-colored composite filling to stop pain and prevent damage.",
    simpleDescriptionUrdu: "دانت کے کیڑے اور گڑھے کو صاف کر کے اصلی دانت کے رنگ کا مضبوط میٹریل بھرنا تاکہ کھانا نہ پھنسے۔",
    voiceTextEnglish: "Cavity Filling repairs teeth damaged by decay or holes. We gently clean away the bacteria and fill the cavity using durable, tooth-colored composite resin. It matches the natural shade of your tooth, stops food from getting trapped, and protects against future nerve pain.",
    voiceTextUrdu: "کیویٹی فلنگ میں دانت میں لگے ہوئے کیڑے اور کھوکھلے پن کو صاف کر کے دانت کے ہم رنگ مضبوط مواد سے بھر دیا جاتا ہے۔ اس سے دانت مزید خراب ہونے سے بچ جاتا ہے اور کھانا پھنسنے کا مسئلہ بھی ہمیشہ کے لیے حل ہو جاتا ہے۔",
    romanUrdu: "Cavity filling mein keere lage daant ko saaf kar ke daant ke rang ka material bhara jaata hai taake dard na ho aur daant theek ho jaye.",
    category: "Restorative",
    estimatedDuration: "30 – 45 mins"
  },
  {
    id: "wisdom-tooth-surgery",
    easyName: "Wisdom Tooth Removal — Gentle & Painless Tooth Extraction",
    easyNameUrdu: "عقل داڑھ کا علاج — تکلیف دہ عقل داڑھ کو بغیر درد کے نکالنا",
    shortLabel: "Wisdom Tooth (Gentle Painless Removal)",
    shortLabelUrdu: "عقل داڑھ نکالنا (آرام دہ طریقہ)",
    simpleDescription: "Expert surgical removal of impacted, painful, or misaligned wisdom teeth with total local numbness and fast recovery.",
    simpleDescriptionUrdu: "مسوڑھوں میں پھنسی ہوئی یا درد کرنے والی عقل داڑھ کو سپیشلسٹ سرجن کے ذریعے بے درد انداز میں نکالنا۔",
    voiceTextEnglish: "Wisdom Tooth Removal is handled by our specialist oral and maxillofacial surgeon, Dr. Muhammad Ali Riaz Khan. If your wisdom tooth is stuck beneath the gums or causing painful swelling, we gently remove it under total local numbness so you remain completely relaxed and pain-free.",
    voiceTextUrdu: "عقل داڑھ کا علاج ہمارے ماہر سرجن ڈاکٹر محمد علی ریاض خان کرتے ہیں۔ اگر آپ کی عقل داڑھ میں شدید درد ہے، سوجن ہے یا وہ ٹیڑھی نکل رہی ہے تو اسے جدید اینستھیزیا کے ذریعے انتہائی پرسکون اور بے درد طریقے سے نکال دیا جاتا ہے۔",
    romanUrdu: "Wisdom tooth surgery mein taqleef deh aqal daadh ko specialist surgeon aaram se sun kar ke nikaalte hain taake koi dard na ho.",
    category: "Surgery",
    estimatedDuration: "30 – 45 mins"
  },
  {
    id: "routine-checkup",
    easyName: "Complete Dental Check-up — Full Inspection, Cleaning & Digital X-Ray",
    easyNameUrdu: "مکمل دانتوں کا معائنہ — مکمل چیک اپ، صفائی اور ڈیجیٹل ایکسرے",
    shortLabel: "Dental Check-up (Inspection & X-Ray)",
    shortLabelUrdu: "مکمل معائنہ اور ڈیجیٹل ایکسرے",
    simpleDescription: "Comprehensive examination of all teeth, gums, and jaw using HD digital intraoral cameras and low-dose 3D X-rays.",
    simpleDescriptionUrdu: "تمام دانتوں اور مسوڑھوں کا کیمرے اور ڈیجیٹل ایکسرے کے ذریعے مکمل اور تسلی بخش معائنہ۔",
    voiceTextEnglish: "A Complete Dental Check-up includes a detailed examination of every tooth, your gums, and jaw bones using high-definition digital sensors and cameras. It catches any cavities or gum issues early before they turn into painful dental emergencies.",
    voiceTextUrdu: "مکمل دانتوں کے معائنے میں جدید ڈیجیٹل کیمرے اور ایکسرے کی مدد سے تمام دانتوں، مسوڑھوں اور ہڈی کی جانچ کی جاتی ہے۔ اس کا فائدہ یہ ہے کہ چھوٹی چھوٹی خرابیاں وقت سے پہلے پکڑی جاتی ہیں اور مستقبل کی بڑی پریشانیوں سے بچا جا سکتا ہے۔",
    romanUrdu: "Complete dental check-up mein digital X-ray aur camera se saare daanton ka muaina kiya jaata hai taake koi beemari shuru mein hi pakdi jaye.",
    category: "Preventive",
    estimatedDuration: "30 mins"
  },
  {
    id: "kids-family-care",
    easyName: "Kids & Family Care — Friendly Checkups & Cavity Protection",
    easyNameUrdu: "بچوں اور فیملی کی دیکھ بھال — دوستانہ معائنہ اور کیویٹی سے بچاؤ",
    shortLabel: "Kids & Family Care (Friendly Checkup)",
    shortLabelUrdu: "بچوں اور فیملی کا علاج",
    simpleDescription: "Gentle, stress-free dental care designed especially for kids with tooth sealants, cleaning, and friendly habit coaching.",
    simpleDescriptionUrdu: "بچوں کے لیے پرسکون ماحول میں دانتوں کا معائنہ، دانتوں کو کیڑے سے بچانے کے لیے حفاظتی کوٹنگ اور رہنمائی۔",
    voiceTextEnglish: "Our Kids and Family Care provides gentle, positive dental visits for children and parents alike. We focus on preventive cavity coatings, fluoride strengthening, and teaching healthy brushing habits in a fun, fear-free clinic environment.",
    voiceTextUrdu: "بچوں اور فیملی کا علاج انتہائی محبت اور دوستانہ ماحول میں کیا جاتا ہے تاکہ بچوں کے دل سے ڈاکٹر کا خوف ختم ہو۔ اس میں بچوں کے دانتوں کو مضبوط کرنے والی فلورائیڈ کوٹنگ اور کیویٹی سے بچاؤ کے طریقے شامل ہیں۔",
    romanUrdu: "Bachon ke liye gentle dental check-up aur cavity protection taake unke daant hamesha mazboot aur sehatmand rahein.",
    category: "Family",
    estimatedDuration: "30 mins"
  },
  {
    id: "emergency-care",
    easyName: "Emergency Care — Immediate Relief for Severe Toothache or Injury",
    easyNameUrdu: "ہنگامی دانت کا علاج — شدید درد، سوجن یا دانت ٹوٹنے پر فوری طبی امداد",
    shortLabel: "Emergency Care (Same-Day Pain Relief)",
    shortLabelUrdu: "ہنگامی علاج (شدید درد میں فوری آرام)",
    simpleDescription: "Priority same-day emergency appointment to immediately relieve unbearable tooth pain, swollen gums, or sports injuries.",
    simpleDescriptionUrdu: "شدید درد، سوجن یا دانت ٹوٹنے کی صورت میں ترجیحی بنیادوں پر اسی دن فوری اور تسلی بخش علاج۔",
    voiceTextEnglish: "Emergency Dental Care is reserved for sudden, intense toothaches, broken teeth, facial swelling, or dental accidents. We prioritize your arrival to provide instant pain relief and stabilize the injured tooth right away.",
    voiceTextUrdu: "ہنگامی دانتوں کے علاج میں ان مریضوں کو فوری دیکھا جاتا ہے جنہیں اچانک شدید ناقابل برداشت درد، مسوڑھوں کی سوجن یا دانت پر چوٹ لگی ہو۔ ہم اسی وقت درد کو روکنے اور دانت کو سنبھالنے کے لیے فوری علاج شروع کرتے ہیں۔",
    romanUrdu: "Emergency dental care mein shaded daant ke dard ya chot lagne par usi waqt fori aaram pohanchaya jaata hai.",
    category: "Emergency",
    estimatedDuration: "Immediate priority care"
  }
];

export function getTreatmentById(id: string): TreatmentServiceOption | undefined {
  return EASY_CLINICAL_TREATMENTS.find(t => t.id === id);
}

export function getTreatmentByName(name: string): TreatmentServiceOption | undefined {
  if (!name) return undefined;
  const lower = name.toLowerCase();
  return EASY_CLINICAL_TREATMENTS.find(t => 
    t.easyName.toLowerCase().includes(lower) || 
    t.shortLabel.toLowerCase().includes(lower) ||
    lower.includes(t.id) ||
    t.easyNameUrdu.includes(name) ||
    // Legacy matchers
    (lower.includes("root") && t.id === "root-canal") ||
    (lower.includes("implant") && t.id === "dental-implants") ||
    (lower.includes("whiten") && t.id === "teeth-whitening") ||
    (lower.includes("veneer") && t.id === "smile-makeover-veneers") ||
    (lower.includes("aligner") && t.id === "clear-aligners") ||
    (lower.includes("invisalign") && t.id === "clear-aligners") ||
    (lower.includes("cavity") && t.id === "cavity-filling") ||
    (lower.includes("wisdom") && t.id === "wisdom-tooth-surgery") ||
    (lower.includes("check-up") && t.id === "routine-checkup") ||
    (lower.includes("pediatric") && t.id === "kids-family-care") ||
    (lower.includes("emergency") && t.id === "emergency-care")
  );
}
