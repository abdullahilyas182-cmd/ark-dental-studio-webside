export type PortalType = 'public' | 'doctor' | 'admin' | 'patient';

export type UserRole = 'regularUser' | 'doctor' | 'admin';

export type PortalAccessLevel = 'standard_user' | 'doctor_only' | 'admin_only';

export type AssistantLanguage = 'en' | 'ur';

export interface DoctorAccount {
  id: string;
  email: string;
  name: string;
  role: 'doctor' | 'admin';
  passwordHash: string;
  salt: string;
  title: string;
  avatar: string;
  doctorId?: string;
}

export interface DoctorSession {
  token: string;
  account: {
    id: string;
    email: string;
    name: string;
    role: 'doctor' | 'admin';
    title: string;
    avatar: string;
    doctorId?: string;
  };
  authenticatedAt: string;
  expiresAt: string;
}

export interface LoginAuditLog {
  id: string;
  timestamp: string;
  email: string;
  status: 'SUCCESS' | 'FAILURE' | 'LOCKED_OUT';
  reason?: string;
  ipSimulated: string;
  roleAttempted?: string;
  userAgent: string;
}

export interface Doctor {
  id: string;
  name: string;
  title: string;
  specialty: string;
  degrees: string;
  experienceYears: number;
  avatar: string;
  bio: string;
  bioUrdu: string;
  certifications: string[];
}

export interface Patient {
  id: string;
  name: string;
  nameUrdu?: string;
  phone: string;
  email: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  bloodGroup: string;
  allergies: string[];
  medicalAlerts: string[];
  lastVisitDate: string;
  totalVisits: number;
  avatar?: string;
}

export interface DentalRecord {
  toothNumber: number; // Universal 1-32 or FDI notation
  condition: 'Healthy' | 'Caries' | 'Restored' | 'Crown' | 'Missing' | 'Implant' | 'Root Canal';
  notes?: string;
}

export interface Treatment {
  id: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  date: string;
  time: string;
  procedureName: string;
  category: 'Aesthetics' | 'Restorative' | 'Prosthetic' | 'Surgery' | 'Orthodontics' | 'Hygiene';
  toothNumbers: number[];
  clinicalNotes: string;
  costPKR: number;
  followUpRequired: boolean;
  followUpDays?: number;
  followUpReason?: string;
  status: 'Completed' | 'In-Progress';
}

export interface FollowUpTask {
  id: string;
  patientId: string;
  patientName: string;
  patientPhone: string;
  doctorId: string;
  doctorName: string;
  treatmentId: string;
  treatmentName: string;
  recommendedDate: string;
  daysFromTreatment: number;
  reason: string;
  priority: 'High' | 'Normal' | 'Routine';
  status: 'Pending' | 'Appointment-Requested' | 'Scheduled' | 'Completed';
  associatedAppointmentId?: string;
  createdAt: string;
}

export interface Appointment {
  id: string;
  patientId?: string;
  patientName: string;
  patientPhone: string;
  patientEmail?: string;
  doctorId: string;
  doctorName: string;
  date: string;
  time: string;
  durationMinutes: number;
  procedure: string;
  status: 'Pending' | 'Confirmed' | 'In-Chair' | 'Completed' | 'Cancelled';
  source: 'Online-Web' | 'AI-Receptionist' | 'Patient-Portal' | 'Staff-Manual' | 'Doctor-Followup';
  notes?: string;
  relatedFollowUpId?: string;
}

export interface DoctorReminder {
  id: string;
  patientName: string;
  procedure: string;
  scheduledTime: string;
  reminderMinutesBefore: number;
  alertAt: string;
  fired: boolean;
  notes?: string;
  createdAt: string;
}

export interface ClinicNotification {
  id: string;
  timestamp: string;
  title: string;
  message: string;
  type: 'appointment_request' | 'followup_created' | 'appointment_confirmed' | 'treatment_recorded' | 'reminder';
  read: boolean;
  relatedPatientId?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ProcessStep {
  stepNumber: number;
  title: string;
  description: string;
  duration?: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  tagline: string;
  category: 'Restorative' | 'Prosthetic' | 'Aesthetics' | 'Surgery' | 'Orthodontics' | 'Family';
  priceRangePKR: string;
  description: string;
  duration: string;
  highlights: string[];
  imageUrl: string;
  targetAudience?: string;
  processSteps?: ProcessStep[];
  faqs?: FAQItem[];
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  category: string;
  readTime: string;
  date: string;
  author: string;
  authorTitle: string;
  summary: string;
  content: string[];
  keyTakeaways: string[];
  imageUrl: string;
}

export interface IntakeFormData {
  fullName: string;
  phone: string;
  email: string;
  dateOfBirth: string;
  gender: string;
  address: string;
  emergencyContact: string;
  chiefComplaint: string;
  medicalConditions: string[];
  allergies: string;
  currentMedications: string;
  previousDentalIssues: string;
  bleedingGums: boolean;
  teethGrinding: boolean;
  dentalAnxietyLevel: 'Low' | 'Moderate' | 'High';
  insuranceProvider?: string;
  sehatSahulatCard: boolean;
  preferredLanguage: 'English' | 'Urdu' | 'Pashto';
  consentAgreed: boolean;
}

export interface BeforeAfterCase {
  id: string;
  title: string;
  treatmentType: string;
  patientAgeGender: string;
  description: string;
  durationWeeks: string;
  beforeImage: string;
  afterImage: string;
  fullCaseImage?: string;
  doctorName: string;
  clinicalDetails?: {
    shadeComparison?: { before: string; after: string };
    conditionBefore: string[];
    resultAfter: string[];
    technicalHighlights: string[];
    materialsUsed?: string;
    anatomyNotes?: string;
  };
}

export interface Testimonial {
  id: string;
  name: string;
  city: string;
  treatment: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
}

export interface ClinicalCase {
  id: string;
  title: string;
  category: 'Oral & Maxillofacial Surgery' | 'Restorative' | 'Prosthetic' | 'Aesthetic' | 'Orthodontics';
  condition: string;
  assessment: string;
  treatment: string;
  outcome: string;
  patientProfile?: string;
  duration?: string;
}

export interface MajorServiceCategory {
  id: string;
  title: string;
  subtitle: string;
  tagline: string;
  description: string;
  subcategories: string[];
  conditionsTreated: string[];
  procedures: string[];
  whoMayBenefit: string[];
  consultationProcess: string;
  treatmentProcess: string;
  recovery: string;
  faqs: { question: string; answer: string }[];
  featured?: boolean;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant' | 'system';
  text: string;
  timestamp: string;
  language?: AssistantLanguage;
  actionRequired?: 'confirm_appointment' | 'schedule_followup' | null;
  metadata?: any;
}
