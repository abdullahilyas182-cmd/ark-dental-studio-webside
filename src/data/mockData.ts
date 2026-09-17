import { Doctor, Patient, ServiceItem, BeforeAfterCase, Testimonial, Treatment, Appointment, FollowUpTask, BlogPost, FAQItem, ClinicalCase, MajorServiceCategory } from '../types';

export const CLINIC_METADATA = {
  name: "ARK Dental",
  founder: "Dr. Muhammad Ali Riaz Khan",
  specialistRole: "Oral & Maxillofacial Surgeon",
  subtitle: "Oral & Maxillofacial Surgery & Multidisciplinary Dental Care",
  tagline: "Specialist care for your smile, mouth, jaws and face.",
  description: "Expert surgical and multidisciplinary dental care, combining precision, experience and a personalised approach to every patient.",
  location: "Street 4, Officer Colony, Defence Market, Defence, Peshawar, 25000",
  landmark: "Defence Market, Officer Colony, Peshawar",
  phone: "0306 6677795",
  phoneDisplay: "0306 6677795",
  phoneTel: "tel:03066677795",
  whatsapp: "+92 306 6677795",
  emergencyPhone: "0306 6677795",
  email: "care@arkdentalstudio.com",
  timings: "Monday to Saturday: 9:00 AM – 9:00 PM",
  emergencyHours: "Emergency On-Call Surgical & Trauma Service",
  rating: 4.9,
  totalReviews: 380,
  yearsInPractice: 15,
  smilesCrafted: "14,000+",
};

export const DOCTORS: Doctor[] = [
  {
    id: "doc-1",
    name: "Dr. Muhammad Ali Riaz Khan",
    title: "Oral & Maxillofacial Surgeon & Clinical Director",
    specialty: "Oral & Maxillofacial Surgery, Dental Implants & Reconstructive Care",
    degrees: "BDS, MDS (Oral & Maxillofacial Surgery / Prosthodontics & Implantology), PDS, AAID (USA)",
    experienceYears: 15,
    avatar: "/images/dr_khan_actual_uploaded.jpg",
    bio: "Specialist Oral & Maxillofacial Surgeon and Clinical Director of ARK Dental. Dedicated to combining surgical precision, advanced multidisciplinary diagnostics, and a gentle, personalised approach for every patient.",
    bioUrdu: "اورل اینڈ میکسیلو فیشل سرجن اور اے آر کے ڈینٹل کے بانی کلینیکل ڈائریکٹر۔ سرجیکل مہارت، درستگی اور مریض کے آرام کے ساتھ علاج کے ماہر۔",
    certifications: [
      "MDS Oral & Maxillofacial Surgery",
      "American Academy of Implant Dentistry (AAID)",
      "Digital 3D CBCT Surgical Navigation Specialist",
      "Member Pakistan Association of Oral & Maxillofacial Surgeons"
    ]
  }
];

export const INITIAL_PATIENTS: Patient[] = [
  {
    id: "pat-1",
    name: "Bilal Ahmed",
    nameUrdu: "بلال احمد",
    phone: "+92 300 8594321",
    email: "bilal.ahmed@example.com",
    age: 34,
    gender: "Male",
    bloodGroup: "B+",
    allergies: ["Penicillin"],
    medicalAlerts: ["Mild Hypertension"],
    lastVisitDate: "2026-09-08",
    totalVisits: 3,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300"
  },
  {
    id: "pat-2",
    name: "Sana Malik",
    nameUrdu: "ثناء ملک",
    phone: "+92 321 4455667",
    email: "sana.malik@example.com",
    age: 28,
    gender: "Female",
    bloodGroup: "O+",
    allergies: ["None"],
    medicalAlerts: ["Cosmetic Smile Makeover Patient"],
    lastVisitDate: "2026-09-05",
    totalVisits: 4,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300"
  },
  {
    id: "pat-3",
    name: "Hamza Durrani",
    nameUrdu: "حمزہ درانی",
    phone: "+92 333 5566778",
    email: "h.durrani@example.com",
    age: 42,
    gender: "Male",
    bloodGroup: "A+",
    allergies: ["Aspirin"],
    medicalAlerts: ["Single Posterior Implant Candidate"],
    lastVisitDate: "2026-09-01",
    totalVisits: 2,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=300"
  },
  {
    id: "pat-4",
    name: "Zainab Khan",
    nameUrdu: "زینب خان",
    phone: "+92 312 9988776",
    email: "zainab.k@example.com",
    age: 23,
    gender: "Female",
    bloodGroup: "AB+",
    allergies: ["Latex"],
    medicalAlerts: ["Clear Aligner Tray #7"],
    lastVisitDate: "2026-08-25",
    totalVisits: 6,
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=300"
  }
];

export const INITIAL_TREATMENTS: Treatment[] = [
  {
    id: "trt-101",
    patientId: "pat-1",
    patientName: "Bilal Ahmed",
    doctorId: "doc-1",
    doctorName: "Dr. Muhammad Ali Riaz Khan",
    date: "2026-09-08",
    time: "02:30 PM",
    procedureName: "Microscopic Root Canal Therapy (Step 1: Bio-mechanical Prep)",
    category: "Restorative",
    toothNumbers: [19],
    clinicalNotes: "Patient presented with acute pulpitis tooth #19. Canal instrumentation to apex under rubber dam isolation. Calcium hydroxide medicament placed, Cavit temporary seal. Patient advised on soft diet.",
    costPKR: 18000,
    followUpRequired: true,
    followUpDays: 5,
    followUpReason: "Root Canal Obturation & Core Build-up",
    status: "Completed"
  },
  {
    id: "trt-102",
    patientId: "pat-2",
    patientName: "Sana Malik",
    doctorId: "doc-1",
    doctorName: "Dr. Muhammad Ali Riaz Khan",
    date: "2026-09-05",
    time: "11:30 AM",
    procedureName: "Ultra-Thin E-Max Porcelain Veneer Preparation (Teeth #7-#10)",
    category: "Aesthetics",
    toothNumbers: [7, 8, 9, 10],
    clinicalNotes: "Minimal conservative reduction 0.3mm for 4 anterior veneers. Digital 3D Trios scan sent to ceramic studio in Zurich/Lahore. Bis-acryl provisional veneers fabricated and cemented with temp bond. Occlusion checked.",
    costPKR: 160000,
    followUpRequired: true,
    followUpDays: 7,
    followUpReason: "Final Porcelain Veneer Try-in & Adhesive Seating",
    status: "Completed"
  }
];

export const INITIAL_FOLLOW_UPS: FollowUpTask[] = [
  {
    id: "flw-201",
    patientId: "pat-1",
    patientName: "Bilal Ahmed",
    patientPhone: "+92 300 8594321",
    doctorId: "doc-1",
    doctorName: "Dr. Muhammad Ali Riaz Khan",
    treatmentId: "trt-101",
    treatmentName: "Microscopic Root Canal Therapy (Step 1)",
    recommendedDate: "2026-09-13",
    daysFromTreatment: 5,
    reason: "Root Canal Obturation & Core Build-up (Check asymptomatic canal)",
    priority: "High",
    status: "Pending",
    createdAt: "2026-09-08T14:30:00Z"
  },
  {
    id: "flw-202",
    patientId: "pat-2",
    patientName: "Sana Malik",
    patientPhone: "+92 321 4455667",
    doctorId: "doc-1",
    doctorName: "Dr. Muhammad Ali Riaz Khan",
    treatmentId: "trt-102",
    treatmentName: "Porcelain Veneer Prep (#7-#10)",
    recommendedDate: "2026-09-12",
    daysFromTreatment: 7,
    reason: "Final Porcelain Veneer Try-in & Adhesive Seating",
    priority: "Normal",
    status: "Pending",
    createdAt: "2026-09-05T11:30:00Z"
  }
];

export const INITIAL_APPOINTMENTS: Appointment[] = [
  {
    id: "apt-301",
    patientId: "pat-2",
    patientName: "Sana Malik",
    patientPhone: "+92 321 4455667",
    doctorId: "doc-1",
    doctorName: "Dr. Muhammad Ali Riaz Khan",
    date: "2026-09-10",
    time: "11:30 AM",
    durationMinutes: 45,
    procedure: "Provisional Veneer Review & Gum Healing Check",
    status: "Confirmed",
    source: "Doctor-Followup",
    notes: "Review tissue adaptation and aesthetics."
  },
  {
    id: "apt-302",
    patientId: "pat-3",
    patientName: "Hamza Durrani",
    patientPhone: "+92 333 5566778",
    doctorId: "doc-1",
    doctorName: "Dr. Muhammad Ali Riaz Khan",
    date: "2026-09-10",
    time: "02:00 PM",
    durationMinutes: 60,
    procedure: "Titanium Dental Implant Placement #30 (CBCT Guided)",
    status: "Confirmed",
    source: "Staff-Manual",
    notes: "Surgical guide sterilized and ready. Local anesthesia + sedation."
  },
  {
    id: "apt-303",
    patientId: "pat-4",
    patientName: "Zainab Khan",
    patientPhone: "+92 312 9988776",
    doctorId: "doc-1",
    doctorName: "Dr. Muhammad Ali Riaz Khan",
    date: "2026-09-10",
    time: "03:30 PM",
    durationMinutes: 30,
    procedure: "Aesthetic Smile Consultation & Assessment",
    status: "In-Chair",
    source: "Patient-Portal",
    notes: "Review tracking and oral health plan."
  },
  {
    id: "apt-304",
    patientName: "Omer Farooq",
    patientPhone: "+92 345 1122334",
    doctorId: "doc-1",
    doctorName: "Dr. Muhammad Ali Riaz Khan",
    date: "2026-09-10",
    time: "05:00 PM",
    durationMinutes: 45,
    procedure: "Aesthetic Consultation & Digital Smile Analysis",
    status: "Pending",
    source: "Online-Web",
    notes: "Interested in teeth whitening and gap closure."
  }
];

export const MAJOR_SERVICE_CATEGORIES: MajorServiceCategory[] = [
  {
    id: "omfs",
    title: "Oral & Maxillofacial Surgery",
    subtitle: "Featured Specialist Care",
    tagline: "Specialist surgery for your smile, mouth, jaws and face.",
    description: "Hospital-grade surgical precision delivered in an unhurried, reassuring private clinic setting with computer-guided 3D imaging and gentle sedation options.",
    featured: true,
    subcategories: [
      "Oral Surgery",
      "Wisdom Tooth Surgery",
      "Complex Extractions",
      "Oral Pathology",
      "Cysts and Lesions",
      "Jaw Surgery (Orthognathic)",
      "Facial Trauma & Alveolar Reconstruction",
      "Pre-Implant Bone Grafting & Sinus Lifts"
    ],
    conditionsTreated: [
      "Impacted wisdom teeth causing pain, infection, or nerve impingement",
      "Severely damaged or fractured teeth requiring surgical removal",
      "Cysts, benign soft-tissue lesions, and mucosal pathology",
      "Jaw discrepancy, malocclusion, and TMJ dysfunction",
      "Facial bone trauma, dental avulsions, and sports injuries",
      "Bone atrophy requiring augmentation prior to dental implants"
    ],
    procedures: [
      "Piezosurgical Atraumatic Wisdom Tooth Sectioning",
      "Digital CBCT 3D Guided Complex Extractions",
      "Oral Biopsy & Histopathological Cyst Enucleation",
      "Alveolar Ridge Preservation & Guided Bone Regeneration (GBR)",
      "Maxillary Sinus Floor Elevation (Lateral & Crestal)",
      "Emergency Facial Trauma Management & Alveolar Splinting"
    ],
    whoMayBenefit: [
      "Patients experiencing recurrent wisdom tooth swelling, impaction, or jaw stiffness",
      "Individuals referred for complex extractions near delicate anatomical nerves",
      "Patients requiring expert pathological assessment of oral lesions or cysts",
      "Candidates for dental implants who require pre-surgical bone augmentation"
    ],
    consultationProcess: "Comprehensive clinical examination with high-resolution 3D CBCT nerve mapping, discussion of sedation options, and a clear, unhurried explanation of surgical steps.",
    treatmentProcess: "Performed with microsurgical instruments, gentle computer-delivered local anesthesia, and biological PRF (Platelet-Rich Fibrin) membranes for accelerated tissue healing.",
    recovery: "Detailed verbal and written post-operative protocols, cold-pack therapies, and direct 24-hour surgeon communication during your initial healing window.",
    faqs: [
      {
        question: "Do I need a general anaesthetic for wisdom tooth surgery?",
        answer: "Most procedures are performed comfortably under gentle local anaesthesia combined with conscious sedation in our dedicated surgical suite, allowing you to return home the same day."
      },
      {
        question: "How long is the typical recovery period after oral surgery?",
        answer: "Initial swelling peaks between 48 to 72 hours and subsides quickly. Most patients resume desk work and normal routines comfortably within 2 to 4 days."
      }
    ]
  },
  {
    id: "restorative",
    title: "Restorative Dentistry",
    subtitle: "Function & Preservation",
    tagline: "Treatment focused on restoring function, health and confidence.",
    description: "Conservative, biomimetic therapies engineered to preserve your natural dental anatomy using optical magnification and durable tooth-colored ceramic composites.",
    subcategories: [
      "Microscopic Root Canal Therapy",
      "Biomimetic Tooth Fillings",
      "Porcelain Inlays & Onlays",
      "Crown & Core Reconstructions",
      "Cracked Tooth Treatment"
    ],
    conditionsTreated: [
      "Dental caries and deep decay encroaching the dental pulp",
      "Acute toothache, lingering hot/cold sensitivity, or abscess",
      "Cracked, chipped, or structurally compromised teeth",
      "Failing silver amalgam fillings needing tooth-colored replacement"
    ],
    procedures: [
      "20x Optical Zoom Micro-Endodontic Therapy",
      "Multi-Layer Biocompatible Composite Restorations",
      "Precision CAD/CAM Ceramic Partial Crowns & Onlays",
      "Full-Coverage Monolithic Zirconia Crowns"
    ],
    whoMayBenefit: [
      "Patients experiencing tooth pain or deep decay who wish to preserve their natural teeth",
      "Individuals needing durable functional restoration after fractures or wear"
    ],
    consultationProcess: "Digital intraoral photography and targeted low-radiation sensor radiographs to demonstrate the exact condition of the tooth structure.",
    treatmentProcess: "Painless computerized anesthesia, rubber dam isolation, and conservative microscopic preparation that saves maximum natural tooth structure.",
    recovery: "Immediate return to normal activities; any minor procedural tenderness typically resolves within 24 to 48 hours.",
    faqs: [
      {
        question: "Can an infected tooth always be saved with a root canal?",
        answer: "In the vast majority of cases, modern endodontic techniques with rotary titanium instrumentation and optical magnification can save even complex multi-canal teeth."
      }
    ]
  },
  {
    id: "prosthetic",
    title: "Prosthetic Dentistry",
    subtitle: "Implant & Tooth Replacement",
    tagline: "Restoring function and aesthetics with personalised prosthetic solutions.",
    description: "Biocompatible titanium implants and bespoke fixed bridges designed to restore permanent chewing power and natural smile harmony.",
    subcategories: [
      "Single Tooth Implants",
      "Multiple Missing Teeth Replacement",
      "Full Arch Fixed Implant Bridges (All-on-4 / All-on-6)",
      "Custom Zirconia Bridges",
      "Overdentures & Precision Attachments"
    ],
    conditionsTreated: [
      "Single or multiple missing teeth",
      "Completely edentulous arches or failing terminal dentition",
      "Uncomfortable loose removable dentures requiring fixed stability",
      "Loss of vertical chewing height"
    ],
    procedures: [
      "3D Digital Guided Swiss Titanium Implant Placement",
      "Immediate Implant Placement & Provisionalization",
      "Screw-Retained Monolithic Zirconia Full-Arch Bridges",
      "Custom CAD/CAM Titanium & Ceramic Abutments"
    ],
    whoMayBenefit: [
      "Adults seeking a permanent, non-removable alternative to dentures or bridges",
      "Patients needing robust chewing restoration that looks and feels like natural teeth"
    ],
    consultationProcess: "Comprehensive 3D bone volume mapping, digital smile planning, and customized surgical stent generation.",
    treatmentProcess: "Computer-guided implant insertion followed by biological integration and precision prosthetic milling.",
    recovery: "Mild soreness easily managed with mild pain relief for 2–3 days. Soft diet during early osseointegration.",
    faqs: [
      {
        question: "How long do dental implants last?",
        answer: "With routine hygiene and check-ups, dental implants have an industry-recognized success rate exceeding 98% and can provide lifetime durability."
      }
    ]
  },
  {
    id: "aesthetic",
    title: "Aesthetic Dentistry",
    subtitle: "Smile Design & Harmony",
    tagline: "Natural-looking aesthetic solutions designed around your smile.",
    description: "Bespoke smile transformations tailored to your unique facial proportions, combining handcrafted ceramics with non-invasive cosmetic protocols.",
    subcategories: [
      "Digital Smile Design (DSD)",
      "Handcrafted Porcelain Veneers",
      "Minimal-Prep Ultra-Thin Laminates",
      "In-Office Cold Laser Whitening",
      "Gingival Aesthetic Contouring"
    ],
    conditionsTreated: [
      "Discolored, intrinsic enamel tetracycline staining or fluorosis",
      "Irregularly shaped, worn down, or peg-shaped teeth",
      "Diastemas (unwanted gaps between front teeth)",
      "Asymmetrical smile lines and uneven gum contours"
    ],
    procedures: [
      "Facially Driven Digital Aesthetic Simulations",
      "Hand-Layered Swiss E-Max Porcelain Veneers",
      "Non-Invasive Enamel Micro-Abrasion & Polishing",
      "Gentle Laser Soft-Tissue Gingivoplasty"
    ],
    whoMayBenefit: [
      "Individuals seeking a brighter, naturally proportioned smile without looking artificially white or bulky"
    ],
    consultationProcess: "3D digital intraoral scan, high-resolution facial portrait photography, and an interactive Digital Smile Design preview.",
    treatmentProcess: "Trial smile mock-up tested directly in your mouth prior to any irreversible ceramic bonding.",
    recovery: "No downtime; immediate confidence and natural comfort.",
    faqs: [
      {
        question: "Will porcelain veneers look natural or overly white?",
        answer: "Every veneer is custom-shaded and layered by master ceramists to replicate the natural translucency, mamelons, and light reflection of genuine enamel."
      }
    ]
  },
  {
    id: "orthodontics",
    title: "Orthodontics",
    subtitle: "Alignment & Function",
    tagline: "Modern orthodontic care designed to improve alignment, function and aesthetics.",
    description: "Discreet clear aligners and modern orthodontic solutions designed to straighten teeth, balance bites, and optimize long-term oral health.",
    subcategories: [
      "Clear Aligner Therapy (Invisalign)",
      "Discreet Adult Orthodontics",
      "Interceptive Adolescent Orthodontics",
      "Bite Correction & Arch Expansion",
      "Post-Treatment Retention Solutions"
    ],
    conditionsTreated: [
      "Crowded, crooked, or overlapping teeth",
      "Spaced teeth and arch-gap irregularities",
      "Overbites, underbites, crossbites, and open bites",
      "Relapse from previous orthodontic treatments"
    ],
    procedures: [
      "High-Accuracy 3D Intraoral Digital Arch Scanning",
      "Computerized Biomechanical Staging & Virtual Treatment Simulation",
      "Custom Clear Aligner Delivery & Attachment Bonding",
      "Fixed and Removable Precision Vivera Retainers"
    ],
    whoMayBenefit: [
      "Adults and teens wanting to straighten their teeth comfortably without noticeable metal wires or brackets"
    ],
    consultationProcess: "3D digital scanning with instant before-and-after treatment progression preview.",
    treatmentProcess: "Sequential trays swapped every 7 to 10 days, gently guiding teeth into ideal biological alignment.",
    recovery: "Zero downtime; smooth trays fit closely over teeth with minimal speech impact.",
    faqs: [
      {
        question: "How many hours per day do I need to wear clear aligners?",
        answer: "Aligners should be worn 20 to 22 hours daily, removing them only for meals, brushing, and flossing."
      }
    ]
  }
];

export const CLINICAL_CASES: ClinicalCase[] = [
  {
    id: "case-01",
    title: "Impacted Mandibular Third Molar & Follicular Pathology",
    category: "Oral & Maxillofacial Surgery",
    patientProfile: "29-year-old female with recurrent pericoronitis and localized pain",
    duration: "45 minutes surgical time",
    condition: "Deep horizontal bony impaction of mandibular third molar with associated pericoronal radiolucency and close proximity to the inferior alveolar nerve (0.7mm).",
    assessment: "High-resolution 3D CBCT volume analysis confirmed root curvature and intimate nerve canal proximity, ruling out standard rotational extraction.",
    treatment: "Micro-surgical elevation under conscious sedation, piezo-electric bone troughing, gentle tooth sectioning, and complete cyst enucleation with PRF biological plug.",
    outcome: "Complete preservation of inferior alveolar nerve sensory function. Uneventful soft tissue closure and confirmed radiologic bone fill at 12-week review."
  },
  {
    id: "case-02",
    title: "Atrophic Posterior Maxilla: Sinus Augmentation & Implants",
    category: "Prosthetic",
    patientProfile: "54-year-old male seeking fixed tooth replacement after tooth loss",
    duration: "6 months total journey",
    condition: "Severe alveolar bone resorption in the posterior maxilla with 2.2mm residual crestal bone height, precluding standard implant placement.",
    assessment: "3D digital sinus evaluation confirmed healthy Schneiderian membrane with no sinusitis. Digital prosthetic workup indicated need for two molar implants.",
    treatment: "Lateral window maxillary sinus floor elevation with xenograft bone matrix, autologous platelet-rich fibrin membrane, followed by delayed computer-guided Swiss titanium implants.",
    outcome: "Successful osseointegration with 13mm stable bone height. Restored with custom screw-retained monolithic zirconia crowns offering full masticatory strength."
  },
  {
    id: "case-03",
    title: "Sports-Related Dentofacial Trauma & Anterior Stabilization",
    category: "Oral & Maxillofacial Surgery",
    patientProfile: "22-year-old athlete following direct impact collision",
    duration: "Immediate emergency care + 6 weeks stabilization",
    condition: "Alveolar process fracture with lateral luxation of teeth #8 and #9, accompanied by coronal enamel-dentin fracture.",
    assessment: "Emergency clinical mapping, digital periapical imaging, and vitality baseline established. No root fractures detected.",
    treatment: "Gentle anatomical reduction of the alveolar segment under local anesthesia, non-rigid orthodontic splinting, and immediate aesthetic biomimetic composite seal.",
    outcome: "Splint removed at 4 weeks with solid periodontal reattachment. Normal neurosensory pulp response maintained and natural smile aesthetics fully restored."
  },
  {
    id: "case-04",
    title: "Full-Mouth Functional Wear Rehabilitation",
    category: "Restorative",
    patientProfile: "46-year-old executive with severe nocturnal bruxism",
    duration: "8 weeks phased treatment",
    condition: "Generalized enamel loss, collapsed vertical dimension of occlusion (VDO), hypersensitivity, and jaw muscle fatigue.",
    assessment: "Kois deprogrammer bite registration, digital articulated wax-up, and facial proportion analysis.",
    treatment: "Minimally invasive adhesive rehabilitation with bonded lithium disilicate onlays on posterior teeth, restoring 2.5mm of lost bite height without aggressive tooth cutting.",
    outcome: "Resolution of TMJ muscle tension, restored chewing efficiency, and durable tooth preservation with a natural, refreshed smile line."
  },
  {
    id: "case-05",
    title: "Adult Class I Bimaxillary Crowding & Arch Narrowing",
    category: "Orthodontics",
    patientProfile: "31-year-old professional seeking discreet alignment",
    duration: "9 months active aligner wear",
    condition: "Significant lower anterior crowding, high upper canines, and narrow dental arch form resulting in food trapping and aesthetic self-consciousness.",
    assessment: "Intraoral 3D scan and virtual biomechanical staging using clear aligner software.",
    treatment: "26 aligner stages with selective 0.2mm interproximal reduction and micro-attachments for rotational control, followed by nighttime retention.",
    outcome: "Well-aligned dental arches, symmetric smile curve, improved periodontal cleanability, and enhanced facial profile."
  }
];

export const PATIENT_JOURNEY_STEPS = [
  {
    step: "01",
    title: "CONSULTATION",
    tag: "Listening & Discovery",
    description: "We listen to your concerns and assess your individual needs in an unhurried, private environment."
  },
  {
    step: "02",
    title: "DIAGNOSIS",
    tag: "3D Precision Imaging",
    description: "We explain the clinical findings and available treatment options using clear digital diagnostics."
  },
  {
    step: "03",
    title: "PERSONALISED PLAN",
    tag: "Tailored to You",
    description: "Your treatment is planned around your specific clinical requirements, schedule, and comfort preferences."
  },
  {
    step: "04",
    title: "TREATMENT",
    tag: "Surgical Precision",
    description: "Care is delivered with meticulous attention to biological safety, surgical precision, and patient comfort."
  },
  {
    step: "05",
    title: "FOLLOW-UP",
    tag: "Ongoing Recovery",
    description: "We monitor your recovery closely, provide direct surgeon access, and guide you through post-operative healing."
  }
];

export const WHY_CHOOSE_US_ITEMS = [
  {
    num: "01",
    title: "Specialist Expertise",
    description: "Led by a specialist Oral & Maxillofacial Surgeon with hospital-grade surgical training, FCPS accreditation, and 15+ years of dedicated practice."
  },
  {
    num: "02",
    title: "Patient-Centred Care",
    description: "Unhurried appointments, compassionate communication, and tailored comfort protocols designed to alleviate anxiety and put you completely at ease."
  },
  {
    num: "03",
    title: "Multidisciplinary Treatment",
    description: "Comprehensive coordination uniting maxillofacial surgery, dental implants, restorative care, and orthodontic alignment under one cohesive clinical vision."
  },
  {
    num: "04",
    title: "Modern Clinical Approach",
    description: "Advanced 3D CBCT volumetric imaging, optical magnification, piezo-electric surgical tools, and biological healing protocols (PRF)."
  },
  {
    num: "05",
    title: "Clear Communication",
    description: "Transparent explanations, itemized treatment pathways with no hidden surprises, and direct clinical follow-up during recovery."
  }
];

export const PATIENT_PREPARATION_GUIDES = [
  {
    id: "prep-consult",
    title: "Preparing for Your Consultation",
    category: "First Visit",
    items: [
      "Bring any existing dental X-rays, OPG scans, or medical reports from your referring doctor",
      "Prepare a list of your current medications, allergies, and general health history",
      "Write down specific concerns or questions you would like to discuss with Dr. Khan",
      "Arrive 10 minutes early to relax in our quiet patient lounge and complete digital intake"
    ]
  },
  {
    id: "prep-surgery",
    title: "Preparing for Oral Surgery",
    category: "Surgical Care",
    items: [
      "Wear loose, comfortable clothing with short sleeves for blood pressure and monitoring access",
      "If undergoing conscious sedation, fast (no food or liquids) for 6 hours prior as instructed",
      "Arrange for a responsible adult companion to accompany you home after your procedure",
      "Stock soft, nourishing foods (soups, yogurt, smoothies) and ice packs at home in advance"
    ]
  },
  {
    id: "prep-aftercare",
    title: "Aftercare & Recovery Protocol",
    category: "Recovery",
    items: [
      "Swelling Management: Apply a cold compress to the cheek for 20 minutes on, 20 minutes off for the first 24–48 hours",
      "Pain Relief: Take prescribed analgesics as directed before local numbness completely wears off",
      "Dietary Guidelines: Stick to lukewarm soft foods; avoid drinking through a straw or hot liquids for 48 hours",
      "Oral Hygiene: Do not rinse vigorously on Day 1. From Day 2, rinse gently with warm salt water after meals"
    ]
  },
  {
    id: "prep-emergency",
    title: "When to Contact the Clinic",
    category: "Emergency Guidance",
    items: [
      "Persistent active bleeding that does not slow after applying firm gauze pressure for 30 minutes",
      "Sudden severe pain not relieved by prescribed medications",
      "Noticeable facial swelling that rapidly increases after Day 3 or difficulty swallowing/breathing",
      "Direct 24/7 hotline for surgical patients: Call 0306 6677795 immediately"
    ]
  }
];

export const SURGICAL_FAQS: FAQItem[] = [
  {
    question: "Do I need a referral to see Dr. Muhammad Ali Riaz Khan?",
    answer: "No referral is required. While we regularly accept professional referrals from general dentists and medical doctors, patients are welcome to book a consultation directly with us."
  },
  {
    question: "What happens at my first consultation?",
    answer: "Dr. Khan will review your medical and dental history, conduct an unhurried clinical examination, assess any 3D CBCT scans, and explain your diagnosis and all treatment options clearly before any decisions are made."
  },
  {
    question: "How do I prepare for surgery?",
    answer: "You will receive comprehensive pre-operative guidelines tailored to your specific procedure, including dietary instructions, medication management, and comfort arrangements."
  },
  {
    question: "How long does recovery take?",
    answer: "Recovery varies by procedure. Minor extractions typically heal within 2–3 days, while complex wisdom tooth surgery or bone grafting may require 4–7 days of modified diet and activity."
  },
  {
    question: "What should I bring to my appointment?",
    answer: "Please bring a photo ID, any recent X-rays or CT scans if available, and a complete list of any prescription medications or supplements you take."
  },
  {
    question: "Can you review previous scans or reports from another clinic?",
    answer: "Yes. You can bring your digital scans (DICOM/CD) or X-rays to your consultation, or upload them during online booking for Dr. Khan to review."
  },
  {
    question: "How do I book an appointment?",
    answer: "You can book directly via our online calendar, call our reception at 0306 6677795, or message us on WhatsApp for rapid scheduling."
  }
];

export const CORE_SERVICES_CARDS = [
  {
    id: "core-omfs",
    title: "Oral & Maxillofacial Surgery",
    description: "Specialist surgical care for wisdom teeth, jaw trauma & pathology",
    iconName: "Stethoscope",
    highlights: ["Hospital-grade surgical precision", "3D CBCT guided extractions", "Conscious sedation comfort"],
    category: "Oral & Maxillofacial Surgery"
  },
  {
    id: "core-restorative",
    title: "Restorative Dentistry",
    description: "Treatment focused on restoring function, health and confidence",
    iconName: "Shield",
    highlights: ["Microscopic root canal therapy", "Biomimetic restorations", "Long-term tooth preservation"],
    category: "Restorative"
  },
  {
    id: "core-prosthetics",
    title: "Prosthetic Dentistry",
    description: "Restoring function and aesthetics with personalised prosthetic solutions",
    iconName: "Sparkles",
    highlights: ["Grade-IV Swiss titanium implants", "Full-arch fixed bridges", "Zirconia restorations"],
    category: "Prosthetic"
  },
  {
    id: "core-aesthetics",
    title: "Aesthetic Dentistry",
    description: "Natural-looking aesthetic solutions designed around your smile",
    iconName: "Smile",
    highlights: ["Handcrafted porcelain veneers", "Digital Smile Design preview", "Non-invasive aesthetics"],
    category: "Aesthetic"
  },
  {
    id: "core-orthodontics",
    title: "Orthodontics",
    description: "Modern orthodontic care designed to improve alignment & aesthetics",
    iconName: "CheckCircle",
    highlights: ["Discreet clear aligners (Invisalign)", "Adult teeth straightening", "Bite correction"],
    category: "Orthodontics"
  }
];

export const SERVICES: ServiceItem[] = [
  {
    id: "srv-root-canal",
    title: "Microscopic Root Canal Therapy (Endodontics)",
    tagline: "Pain-free gentle preservation of natural teeth under 20x optical magnification",
    category: "Restorative",
    priceRangePKR: "PKR 18,000 – 26,000 / tooth",
    description: "Specialized gentle root canal treatment removing infected nerve tissue using high-precision rotary titanium files and 3D warm vertical obturation for lasting biological tooth preservation.",
    duration: "1 to 2 sessions (45–60 mins)",
    highlights: ["Painless computerized digital anesthesia", "High magnification 20x illumination", "Preserves natural biological tooth structure"],
    imageUrl: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800",
    targetAudience: "Patients experiencing acute tooth pain, deep decay reaching the nerve, lingering hot/cold sensitivity, or abscess.",
    processSteps: [
      {
        stepNumber: 1,
        title: "Digital 3D Diagnostics & Gentle Anesthesia",
        description: "Low-radiation digital sensor radiograph and computer-controlled gentle numbing ensure complete comfort before touching the tooth.",
        duration: "15 mins"
      },
      {
        stepNumber: 2,
        title: "Microscopic Decontamination",
        description: "Infected nerve and pulp tissue are cleared under rubber-dam isolation using German rotary nickel-titanium micro-instruments.",
        duration: "30 mins"
      },
      {
        stepNumber: 3,
        title: "3D Bio-Ceramic Obturation & Core Build-Up",
        description: "Canals are hermetically sealed with biocompatible bio-ceramic sealer, followed by a composite core restoration.",
        duration: "20 mins"
      }
    ],
    faqs: [
      {
        question: "Is root canal treatment painful at ARK Dental Studio?",
        answer: "No. With modern digital profound anesthesia and gentle microscopic technique, the vast majority of our patients feel zero pain during the entire procedure."
      },
      {
        question: "Do I need a crown after a root canal?",
        answer: "Yes, molar and premolar teeth usually require a ceramic or zirconia crown to protect against biting forces and prevent tooth fracture."
      }
    ]
  },
  {
    id: "srv-implants",
    title: "Dental Implants & 3D Guided Surgery",
    tagline: "Permanent, bio-compatible tooth replacement looking and biting like natural teeth",
    category: "Surgery",
    priceRangePKR: "PKR 85,000 – 140,000 / implant",
    description: "Medical-grade Grade-IV Titanium or Zirconia implants fused directly into the jaw bone. Uses 3D CBCT digital surgical guides for micrometer accuracy and minimal downtime.",
    duration: "1 surgical visit + healing integration",
    highlights: ["Lifetime structural warranty options", "3D CBCT surgical navigation", "Preserves adjacent healthy teeth"],
    imageUrl: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&q=80&w=800",
    targetAudience: "Adults with one or multiple missing teeth, failing bridge work, loose dentures, or irreparable damage.",
    processSteps: [
      {
        stepNumber: 1,
        title: "3D CBCT Jaw Scan & Virtual Planning",
        description: "Comprehensive 3D bone volume analysis and computer-assisted digital stent fabrication for exact trajectory.",
        duration: "1 session"
      },
      {
        stepNumber: 2,
        title: "Gentle Micro-Invasive Placement",
        description: "Keyhole placement of premium Swiss titanium fixture under local anesthesia with minimal swelling.",
        duration: "45 mins"
      },
      {
        stepNumber: 3,
        title: "Custom Zirconia Crown Delivery",
        description: "Following osseointegration, a precision-milled monolithic zirconia crown is connected to restore bite and beauty.",
        duration: "2 weeks post-integration"
      }
    ],
    faqs: [
      {
        question: "How long do dental implants last?",
        answer: "With proper oral hygiene and regular dental checkups, quality titanium implants have a 98% success rate and can last a lifetime."
      },
      {
        question: "Can I get an implant immediately after tooth extraction?",
        answer: "Yes, in many cases where bone density and gum health are suitable, immediate implant placement with a temporary tooth is possible."
      }
    ]
  },
  {
    id: "srv-veneers",
    title: "Porcelain Veneers & Digital Smile Design",
    tagline: "Ultra-thin Swiss ceramic facings engineered for radiant, lifelike aesthetics",
    category: "Aesthetics",
    priceRangePKR: "PKR 35,000 – 55,000 / tooth",
    description: "Custom handcrafted E-Max ceramic veneers designed with 3D digital facial mapping. Corrects discolored, chipped, misaligned, or unevenly spaced anterior teeth with minimal enamel prep.",
    duration: "2 sessions (7 days apart)",
    highlights: ["Minimal 0.3mm tooth preparation", "High stain-resistant Swiss porcelain", "Digital Smile Design trial before final bonding"],
    imageUrl: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=800",
    targetAudience: "Patients desiring a luminous, balanced smile makeover to correct gaps, intrinsic stains, chips, or mild crookedness.",
    processSteps: [
      {
        stepNumber: 1,
        title: "Digital Smile Design & Mock-Up Trial",
        description: "We analyze facial proportions and create a temporary 3D resin trial directly in your mouth so you can preview your new smile.",
        duration: "45 mins"
      },
      {
        stepNumber: 2,
        title: "Micro-Preparation & 3D Optical Scan",
        description: "Minimal 0.3mm enamel contouring, high-resolution digital Trios scan, and custom provisional veneers placed.",
        duration: "60 mins"
      },
      {
        stepNumber: 3,
        title: "Adhesive Porcelain Luting",
        description: "Individual E-Max ceramic veneers are microscopically bonded with resin cement for permanent, stain-free brilliance.",
        duration: "60 mins"
      }
    ],
    faqs: [
      {
        question: "Do porcelain veneers look fake or unnaturally white?",
        answer: "Never at ARK Dental Studio. Dr. Muhammad Ali Riaz Khan designs custom translucency, subtle mamelons, and natural shade gradation tailored to your complexion."
      }
    ]
  },
  {
    id: "srv-ortho",
    title: "Clear Aligners & Invisalign",
    tagline: "Virtually invisible orthodontic alignment without metal brackets or wires",
    category: "Orthodontics",
    priceRangePKR: "PKR 180,000 – 350,000 / case",
    description: "Doctor-planned clear medical polyurethane aligners that gently guide teeth into ideal aesthetic alignment. Removable for effortless dining, brushing, and social events.",
    duration: "4 – 12 months average",
    highlights: ["Custom 3D virtual simulation of results", "Discreet and unnoticeable in photos", "Consultant orthodontist oversight"],
    imageUrl: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=800",
    targetAudience: "Teens and adults looking to straighten crooked teeth, close gaps, or fix overbites without visible metal braces.",
    processSteps: [
      {
        stepNumber: 1,
        title: "3D Digital Scan & Smile Simulation",
        description: "Digital intraoral scan creates an accurate 3D video showing your teeth moving into their ideal position week by week.",
        duration: "30 mins"
      },
      {
        stepNumber: 2,
        title: "Custom Aligner Fabrication",
        description: "Series of medical-grade aligners fabricated with laser trimming for gentle, comfortable gumline fit.",
        duration: "10 days"
      },
      {
        stepNumber: 3,
        title: "Progress Monitoring",
        description: "Short review visits every 6–8 weeks to check progress and provide your next batches of aligner trays.",
        duration: "15 mins per check"
      }
    ],
    faqs: [
      {
        question: "How many hours a day should I wear clear aligners?",
        answer: "For optimal movement, aligners should be worn 20 to 22 hours daily, removed only when eating, drinking hot beverages, and brushing."
      }
    ]
  },
  {
    id: "srv-whitening",
    title: "In-Office Laser Teeth Whitening",
    tagline: "Instant 6 to 8 shades brighter in a single 45-minute clinical session",
    category: "Aesthetics",
    priceRangePKR: "PKR 25,000 – 35,000 / session",
    description: "Advanced cold-blue laser activation paired with medical-grade desensitizing gel. Safe for sensitive enamel, removing deep intrinsic tea, coffee, and tobacco stains safely.",
    duration: "45 minutes",
    highlights: ["Instant results up to 8 shades whiter", "Zero enamel erosion", "Enamel remineralizing fluoride glaze included"],
    imageUrl: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=800",
    targetAudience: "Anyone looking for rapid, dramatic smile brightening for weddings, corporate presentations, or routine aesthetic rejuvenation.",
    processSteps: [
      {
        stepNumber: 1,
        title: "Shade Match & Gingival Barrier",
        description: "Current tooth shade recorded and gums protected with a light-cured protective barrier.",
        duration: "10 mins"
      },
      {
        stepNumber: 2,
        title: "Dual-Action Laser Activation",
        description: "Medical peroxide gel applied and activated with cold-blue wavelength laser in 3 consecutive 12-minute intervals.",
        duration: "35 mins"
      }
    ],
    faqs: [
      {
        question: "Will laser whitening cause sensitive teeth?",
        answer: "Our system incorporates desensitizing potassium nitrate and fluoride glazes, keeping post-treatment sensitivity virtually zero."
      }
    ]
  },
  {
    id: "srv-pediatric",
    title: "Pediatric & Gentle Family Dentistry",
    tagline: "Positive dental visits for children, preventive sealants, and family care",
    category: "Family",
    priceRangePKR: "PKR 5,000 – 15,000 / visit",
    description: "Anxiety-free dental visits tailored for children and families. Focused on cavity prevention, pit and fissure sealants, fluoride treatments, and gentle habit management in a warm, welcoming environment.",
    duration: "30 – 45 minutes",
    highlights: ["Fun, stress-free 'tell-show-do' approach", "Preventive fissure sealants", "Child-friendly nitrous sedation if needed"],
    imageUrl: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=800",
    targetAudience: "Children from age 1 through adolescence, and families seeking comprehensive preventive care under one roof."
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "blog-1",
    title: "Painless Root Canal: How Modern Technology Dispels the Myth",
    slug: "painless-root-canal-technology",
    category: "Endodontics",
    readTime: "4 min read",
    date: "September 2026",
    author: "Dr. Muhammad Ali Riaz Khan",
    authorTitle: "Principal Dental Surgeon",
    summary: "Root canal therapy has long been plagued by outdated horror stories. Learn how digital apex locators, micro-rotary files, and computerized anesthesia make treatment painless.",
    content: [
      "For decades, the term 'root canal' struck fear into the hearts of patients. However, modern dentistry has evolved dramatically. Today, root canal therapy is no more uncomfortable than receiving a standard dental filling.",
      "At ARK Dental Studio, we use high-power 20x dental magnification and electronic apex locators. This allows us to clean infected canals with sub-millimeter precision, avoiding unnecessary pressure or irritation to surrounding bone.",
      "Computer-assisted local anesthesia delivers numbing medication slowly and gently at the exact tissue pressure, eliminating the sting of traditional injections.",
      "If you are suffering from a throbbing toothache, delaying treatment only increases the risk of infection spreading. A modern root canal relieves pain immediately."
    ],
    keyTakeaways: [
      "Modern anesthesia makes root canals completely pain-free.",
      "Microscopic endodontics preserves your natural tooth structure.",
      "Delaying care leads to bone loss and more complex emergencies."
    ],
    imageUrl: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "blog-2",
    title: "Dental Implants in Peshawar: What to Expect, Longevity & Cost Guide",
    slug: "dental-implants-peshawar-cost-guide",
    category: "Implantology",
    readTime: "6 min read",
    date: "August 2026",
    author: "Dr. Muhammad Ali Riaz Khan",
    authorTitle: "Oral & Maxillofacial Surgeon & Clinical Director",
    summary: "Everything you need to know about replacing missing teeth with Swiss titanium dental implants in Peshawar, including surgical steps, healing timelines, and financing options.",
    content: [
      "Losing a natural tooth affects your chewing ability, facial structure, and self-confidence. Dental implants are currently the gold standard solution because they replace both the root and the crown.",
      "Unlike traditional bridges, dental implants do not require grinding down adjacent healthy teeth. They stimulate the jawbone naturally, preventing the bone resorption and hollowed cheek look associated with missing teeth.",
      "At ARK Dental Studio, we utilize 3D Cone Beam Computed Tomography (CBCT) to plan implant placement digitally before surgery begins. A custom surgical guide ensures the implant is seated at the exact ideal angle.",
      "Investments in dental implants pay off for decades. We provide flexible 0% interest installment plans to make premium implants accessible."
    ],
    keyTakeaways: [
      "Implants prevent jawbone loss and keep facial structure youthful.",
      "3D CBCT digital planning ensures micro-invasive, safe placement.",
      "Available with 0% installment plans over 6–12 months."
    ],
    imageUrl: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "blog-3",
    title: "Clear Aligners vs. Traditional Metal Braces: Which Is Right For You?",
    slug: "clear-aligners-vs-traditional-braces",
    category: "Orthodontics",
    readTime: "5 min read",
    date: "August 2026",
    author: "Dr. Muhammad Ali Riaz Khan",
    authorTitle: "Oral & Maxillofacial Surgeon & Clinical Director",
    summary: "Comparing aesthetics, treatment speed, oral hygiene, and dietary freedom between invisible clear aligners and conventional orthodontic brackets.",
    content: [
      "Adults and professionals often hesitate to straighten crooked teeth because they don't want metallic brackets and wires interfering with their work and social lives.",
      "Clear aligners such as Invisalign are virtually invisible, custom-molded from medical polyurethane, and removable for eating, brushing, and special occasions.",
      "Because aligners can be taken out, brushing and flossing remain effortless, reducing the risk of white-spot lesions and gum inflammation often seen around metal brackets.",
      "With virtual 3D ClinCheck technology, you can see your final smile simulation before your first set of trays is even manufactured."
    ],
    keyTakeaways: [
      "No food restrictions — remove aligners to eat your favorite foods.",
      "Virtually invisible in social and professional settings.",
      "Treatment duration is often faster or equivalent to metal braces."
    ],
    imageUrl: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "blog-4",
    title: "Tooth Sensitivity: Causes, Treatments and Prevention",
    slug: "tooth-sensitivity-causes-treatment",
    category: "Preventive Care",
    readTime: "4 min read",
    date: "July 2026",
    author: "Dr. Muhammad Ali Riaz Khan",
    authorTitle: "Principal Dental Surgeon",
    summary: "Does a sip of ice water or hot chai send sharp pain through your teeth? Discover why enamel erosion happens and how modern desensitizing protocols can help.",
    content: [
      "Tooth sensitivity occurs when the outer protective enamel layer wears thin or gums recede, exposing microscopic dentinal tubules leading directly to the tooth nerve.",
      "Aggressive brushing with hard-bristled toothbrushes and frequent consumption of acidic sodas or citrus are the two leading causes of enamel wear in our region.",
      "In-clinic remineralization treatments with medical-grade bioactive fluoride varnish and laser desensitization can instantly seal exposed tubules.",
      "If sensitivity persists in a single tooth, it may indicate a hairline fracture or hidden cavity that requires clinical evaluation."
    ],
    keyTakeaways: [
      "Switch to a soft-bristled toothbrush and use gentle circular motions.",
      "In-office laser desensitization provides fast relief for chronic sensitivity.",
      "Isolated tooth sensitivity warrants an exam to rule out micro-fractures."
    ],
    imageUrl: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=800"
  }
];

export const INSURANCE_PANELS = [
  { name: "Sehat Sahulat Card (KPK)", note: "Government universal health panel coverage accepted for select surgical & trauma procedures" },
  { name: "Jubilee Life Insurance", note: "Direct cashless panel billing for corporate health policyholders" },
  { name: "EFU General & Life", note: "Outpatient & dental benefits reimbursement with direct claim verification" },
  { name: "Adamjee Insurance", note: "Approved clinical facility for executive and corporate dental covers" },
  { name: "Pak-Qatar Takaful", note: "Shariah-compliant health takaful claims accepted with pre-authorization" }
];

export const PAYMENT_PLANS = [
  { title: "0% Markup Installments", detail: "Spread treatments above PKR 50,000 over 3, 6, or 12 monthly installments with partner credit cards (HBL, Bank Alfalah, Meezan Bank)." },
  { title: "Transparent Treatment Estimates", detail: "Every patient receives an itemized digital treatment plan with clear fee quotes before any procedure begins. Zero hidden fees." },
  { title: "Digital & Cashless Payment", detail: "We accept all major Visa/Mastercard debit/credit cards, Raast instant transfers, and cross-bank mobile banking." }
];

export const NEW_PATIENT_STEPS = [
  {
    step: "01",
    title: "Warm Welcome & Refreshment",
    description: "Relax in our boutique reception lounge with complimentary warm espresso or herbal tea. Our front-desk concierge assists you with digital check-in."
  },
  {
    step: "02",
    title: "Digital 3D Low-Dose Imaging",
    description: "We capture high-definition intraoral digital scans and ultra-low-radiation digital OPG radiographs to inspect root health and jaw structure."
  },
  {
    step: "03",
    title: "Comprehensive Examination & 1-on-1 Consultation",
    description: "Your dentist conducts a thorough 14-point oral exam, gum health charting, and aesthetic evaluation on our high-definition clinical display."
  },
  {
    step: "04",
    title: "Custom Care Plan & Transparent Quotation",
    description: "You receive a clear, personalized treatment roadmap outlining options, expected visits, and itemized transparent pricing with zero pressure."
  }
];

export const BEFORE_AFTER_CASES: BeforeAfterCase[] = [
  {
    id: "case-1",
    title: "In-Office Laser Teeth Whitening & Shade Lift",
    treatmentType: "Laser Whitening & Gingival Isolation",
    patientAgeGender: "28 y/o Female, Peshawar",
    description: "Clinical in-office cold laser bleaching session. Deep organic yellow discoloration transformed to ultra-bright Vita BL1 bleach shade with liquid light-cured blue gingival dam barrier protection.",
    durationWeeks: "Single 45-Min Session",
    beforeImage: "/images/whitening_before.jpg",
    afterImage: "/images/whitening_after.jpg",
    fullCaseImage: "/images/whitening_case.jpg",
    doctorName: "Dr. Muhammad Ali Riaz Khan",
    clinicalDetails: {
      shadeComparison: {
        before: "Vita A3.5 (Deep Yellow Discoloration)",
        after: "Vita BL1 (Ultra-Bright Bleach Shade)"
      },
      conditionBefore: [
        "Heavy organic enamel chromophore saturation (Vita Shade A3.5)",
        "Uneven anterior yellowing with discolored incisal edges",
        "Interproximal dark shadowing and staining"
      ],
      resultAfter: [
        "8-shade transformation reaching pristine Vita BL1 shade tab standard",
        "Uniform, glossy enamel reflectance with zero enamel demineralization",
        "Zero gingival blanching or burning due to precision resin barrier",
        "Zero post-operative sensitivity with biological pulp preservation"
      ],
      technicalHighlights: [
        "Light-cured blue gingival barrier resin protecting free and attached gingiva",
        "Medical-grade 38% H2O2 photo-activated with 810nm cold diode dental laser",
        "Real-time clinical shade guide verification (BL1 tab shown in photo)",
        "Post-treatment amorphous calcium phosphate (ACP) enamel remineralization"
      ],
      materialsUsed: "Cold Diode Laser, 38% Photoactive Bleaching Gel, Liquid Blue Resin Dam, Vita 3D Master Shade Guide",
      anatomyNotes: "Full anterior aesthetic zone (maxillary and mandibular incisors, canines, and premolars) brightened in perfect harmonic symmetry."
    }
  },
  {
    id: "case-2",
    title: "Complex Posterior Molar Rehabilitation",
    treatmentType: "Biomimetic Ceramic Restoration",
    patientAgeGender: "34 y/o Male, University Town",
    description: "Mandibular molar quadrant presenting with catastrophic amalgam failure, recurrent deep black caries, and coronal destruction. Restored with biomimetic anatomical ceramic crowns replicating natural cusp morphology.",
    durationWeeks: "2 Clinical Visits",
    beforeImage: "/images/molar_before.jpg",
    afterImage: "/images/molar_after.jpg",
    fullCaseImage: "/images/molar_restoration_case.jpg",
    doctorName: "Dr. Muhammad Ali Riaz Khan",
    clinicalDetails: {
      shadeComparison: {
        before: "Failing Amalgam / Dark Caries Breakdown",
        after: "Natural Enamel A2 Polished Ceramic"
      },
      conditionBefore: [
        "Extensive occlusal breakdown and dark cavitated caries undermining enamel",
        "Coronal tooth fracture and deteriorating amalgam margins on #46 & #47",
        "Severe food impaction and acute risk of irreversible pulpal involvement"
      ],
      resultAfter: [
        "100% vital tooth preserved without requiring endodontic root canal therapy",
        "Flawless replication of natural occlusal grooves, cusps, and marginal ridges",
        "Supragingival biocompatible margins protecting periodontal biological width",
        "Complete masticatory force restoration with ideal canine-guided bite"
      ],
      technicalHighlights: [
        "Microscopic caries excavation under 4.5x magnification optical loupes",
        "Biomimetic immediate dentin sealing (IDS) to prevent bacterial leakage",
        "High-translucency monolithic zirconia / lithium disilicate CAD/CAM fabrication",
        "Hand-characterized anatomical pit and fissure micro-staining"
      ],
      materialsUsed: "High-Strength Monolithic Zirconia, Dual-Cure Adhesive Resin Cement, Intraoral Mirror Diagnostics",
      anatomyNotes: "Lower 1st and 2nd molars anatomically sculpted with five functional cusps, developmental buccal grooves, and physiological contact points."
    }
  },
  {
    id: "case-3",
    title: "Full Upper Aesthetic Smile Makeover",
    treatmentType: "Porcelain Veneers (8 Teeth)",
    patientAgeGender: "29 y/o Female, Peshawar",
    description: "Patient presented with severe tetracycline staining, chipped incisal edges, and asymmetry. Treated with 8 custom hand-layered E-Max porcelain veneers matched to bleach shade BL2.",
    durationWeeks: "2 Weeks",
    beforeImage: "/images/smile_makeover_result.jpg",
    afterImage: "/images/patient_smile_result.jpg",
    fullCaseImage: "/images/smile_makeover_result.jpg",
    doctorName: "Dr. Muhammad Ali Riaz Khan",
    clinicalDetails: {
      shadeComparison: {
        before: "Vita A4 (Deep Tetracycline Gray-Yellow)",
        after: "Vita BL2 (Harmonic Natural Bleach White)"
      },
      conditionBefore: [
        "Intrinsic antibiotic tetracycline banding across upper incisors",
        "Chipped and worn incisal edges causing reverse smile line",
        "Asymmetric gingival contours and spacing"
      ],
      resultAfter: [
        "Radiant, natural smile curve conforming to lower lip line",
        "Hand-layered micro-textures reflecting light like virgin enamel",
        "Minimally invasive 0.3mm prep with 95% natural enamel retained"
      ],
      technicalHighlights: [
        "Digital Smile Design (DSD) 3D aesthetic simulation prior to prep",
        "Micro-thin 0.3mm E-Max lithium disilicate ceramic layering",
        "Individualized incisal translucency and halo effect",
        "10-year comprehensive structural clinical guarantee"
      ],
      materialsUsed: "Ivoclar E-Max Pressed Ceramic, Variolink Aesthetic Resin Cement",
      anatomyNotes: "Upper central incisors, lateral incisors, and canines designed with ideal 78% golden aesthetic width-to-length proportion."
    }
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t-1",
    name: "Sana Malik",
    city: "Hayatabad, Peshawar",
    treatment: "Porcelain Veneers & Smile Makeover",
    rating: 5,
    comment: "I was extremely self-conscious of my front teeth before my wedding. Dr. Muhammad Ali Riaz Khan crafted 8 veneers that look completely natural. The clinic felt like a luxury boutique hotel, not a frightening dental chair!",
    date: "August 2026",
    verified: true
  },
  {
    id: "t-2",
    name: "Dr. Usman Khattak",
    city: "Defence Road, Peshawar",
    treatment: "Titanium Dental Implant",
    rating: 5,
    comment: "As a surgeon myself, I was very particular about sterilization and 3D imaging. Dr. Muhammad Ali Riaz Khan’s CBCT guided surgery was flawless and totally pain-free. ARK Dental Studio sets a new benchmark for KPK.",
    date: "July 2026",
    verified: true
  },
  {
    id: "t-3",
    name: "Ayesha Farooq",
    city: "Peshawar Cantt",
    treatment: "Invisalign Clear Aligners",
    rating: 5,
    comment: "Dr. Muhammad Ali Riaz Khan is brilliant! My teeth were straight within 6 months using clear aligners. No one even noticed I was wearing them. Booking via WhatsApp and their patient portal was super seamless.",
    date: "September 2026",
    verified: true
  },
  {
    id: "t-4",
    name: "Hamza Durrani",
    city: "University Town, Peshawar",
    treatment: "Laser Teeth Whitening & Hygiene",
    rating: 5,
    comment: "Outstanding experience. The AI receptionist answered my questions in Urdu at 10 PM, and the next morning my whitening was done. 7 shades brighter and no sensitivity at all!",
    date: "August 2026",
    verified: true
  }
];
