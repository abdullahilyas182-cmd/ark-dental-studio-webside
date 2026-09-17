import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Patient, Treatment, FollowUpTask, Appointment, ClinicNotification, 
  Doctor, PortalType, AssistantLanguage, UserRole, DoctorSession, DoctorReminder 
} from '../types';
import { 
  INITIAL_PATIENTS, INITIAL_TREATMENTS, INITIAL_FOLLOW_UPS, 
  INITIAL_APPOINTMENTS, DOCTORS 
} from '../data/mockData';
import { canAccessDoctorPortal, canAccessAdminPortal } from '../utils/security';

interface ClinicContextType {
  portal: PortalType;
  setPortal: (portal: PortalType) => void;
  language: AssistantLanguage;
  setLanguage: (lang: AssistantLanguage) => void;
  theme: 'dark' | 'daylight';
  setTheme: (theme: 'dark' | 'daylight') => void;
  toggleTheme: () => void;
  activeDoctorId: string;
  setActiveDoctorId: (id: string) => void;
  activePatientId: string;
  setActivePatientId: (id: string) => void;
  
  // RBAC and Authentication
  userRole: UserRole;
  doctorSession: DoctorSession | null;
  adminSession: DoctorSession | null;
  isDoctorAuthenticated: boolean;
  isAdminAuthenticated: boolean;
  isDoctorModalOpen: boolean;
  openDoctorLoginModal: () => void;
  closeDoctorLoginModal: () => void;
  loginDoctor: (session: DoctorSession) => void;
  logoutDoctor: () => void;
  isAdminModalOpen: boolean;
  openAdminLoginModal: () => void;
  closeAdminLoginModal: () => void;
  loginAdmin: (session: DoctorSession) => void;
  logoutAdmin: () => void;

  // Data State
  patients: Patient[];
  treatments: Treatment[];
  followUpTasks: FollowUpTask[];
  appointments: Appointment[];
  notifications: ClinicNotification[];
  doctors: Doctor[];

  // Actions
  recordTreatment: (newTreatment: {
    patientId: string;
    doctorId: string;
    procedureName: string;
    category: Treatment['category'];
    toothNumbers: number[];
    clinicalNotes: string;
    costPKR: number;
    followUpRequired: boolean;
    followUpDays?: number;
    followUpReason?: string;
  }) => { treatment: Treatment; followUp?: FollowUpTask };

  scheduleFollowUp: (data: {
    patientId: string;
    treatmentId: string;
    days: number;
    reason: string;
    priority?: 'High' | 'Normal' | 'Routine';
  }) => FollowUpTask;

  requestAppointment: (data: {
    patientName: string;
    patientPhone: string;
    doctorId: string;
    date: string;
    time: string;
    procedure: string;
    source: Appointment['source'];
    notes?: string;
    patientId?: string;
    relatedFollowUpId?: string;
  }) => Appointment;

  confirmAppointment: (appointmentId: string, assignedDate?: string, assignedTime?: string) => void;
  updateAppointmentStatus: (appointmentId: string, status: Appointment['status']) => void;
  dismissNotification: (id: string) => void;
  clearAllNotifications: () => void;
  resetAllData: () => void;
  clearDoctorData: () => void;
  loadSampleSchedule: () => void;
  addPatient: (patient: Omit<Patient, 'id' | 'lastVisitDate' | 'totalVisits'>) => Patient;
  addAppointment: (data: Omit<Appointment, 'id'>) => Appointment;
  reminders: DoctorReminder[];
  addReminder: (data: { patientName: string; procedure: string; scheduledTime: string; reminderMinutesBefore: number; notes?: string }) => DoctorReminder;
  dismissReminder: (id: string) => void;
  lastScheduleUpdate: number;

  // End-to-End Guided Demo Tour (8 Steps)
  demoWorkflowActive: boolean;
  setDemoWorkflowActive: (active: boolean) => void;
  currentDemoStep: number;
  setCurrentDemoStep: (step: number) => void;
  advanceDemoStep: () => void;
  executeDemoStepAction: (stepNumber: number) => void;
}

const ClinicContext = createContext<ClinicContextType | undefined>(undefined);

export const ClinicProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [portal, setPortalState] = useState<PortalType>('public');
  const [language, setLanguage] = useState<AssistantLanguage>('en');
  const [theme, setThemeState] = useState<'dark' | 'daylight'>(() => {
    try {
      const saved = localStorage.getItem('ark_theme');
      if (saved === 'daylight' || saved === 'dark') return saved;
    } catch {}
    return 'dark';
  });

  const setTheme = (t: 'dark' | 'daylight') => {
    setThemeState(t);
    try {
      localStorage.setItem('ark_theme', t);
    } catch {}
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'daylight' : 'dark');
  };

  const [activeDoctorId, setActiveDoctorId] = useState<string>('doc-1');
  const [activePatientId, setActivePatientId] = useState<string>('pat-1');

  // RBAC Doctor Authentication State
  const [doctorSession, setDoctorSession] = useState<DoctorSession | null>(() => {
    try {
      const saved = localStorage.getItem('ark_doctor_session');
      if (saved) {
        const parsed: DoctorSession = JSON.parse(saved);
        if (new Date(parsed.expiresAt).getTime() > Date.now() && parsed.account.role === 'doctor') {
          return parsed;
        }
        localStorage.removeItem('ark_doctor_session');
      }
    } catch {}
    return null;
  });

  // RBAC Admin Authentication State
  const [adminSession, setAdminSession] = useState<DoctorSession | null>(() => {
    try {
      const saved = localStorage.getItem('ark_admin_session');
      if (saved) {
        const parsed: DoctorSession = JSON.parse(saved);
        if (new Date(parsed.expiresAt).getTime() > Date.now() && parsed.account.role === 'admin') {
          return parsed;
        }
        localStorage.removeItem('ark_admin_session');
      }
    } catch {}
    return null;
  });

  const [userRole, setUserRole] = useState<UserRole>(() => {
    if (adminSession) return 'admin';
    if (doctorSession) return 'doctor';
    return 'regularUser';
  });

  const [isDoctorModalOpen, setIsDoctorModalOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);

  const isDoctorAuthenticated = canAccessDoctorPortal(userRole, doctorSession);
  const isAdminAuthenticated = canAccessAdminPortal(userRole, adminSession);

  // Sync activeDoctorId if session exists
  useEffect(() => {
    if (doctorSession?.account?.doctorId) {
      setActiveDoctorId(doctorSession.account.doctorId);
    }
  }, [doctorSession]);

  const openDoctorLoginModal = () => setIsDoctorModalOpen(true);
  const closeDoctorLoginModal = () => setIsDoctorModalOpen(false);

  const openAdminLoginModal = () => setIsAdminModalOpen(true);
  const closeAdminLoginModal = () => setIsAdminModalOpen(false);

  const loginDoctor = (session: DoctorSession) => {
    setDoctorSession(session);
    setUserRole('doctor');
    try {
      localStorage.setItem('ark_doctor_session', JSON.stringify(session));
    } catch (e) {
      console.error('Failed to persist doctor session:', e);
    }
    if (session.account.doctorId) {
      setActiveDoctorId(session.account.doctorId);
    }
    setIsDoctorModalOpen(false);
    setPortalState('doctor');
    addNotification(
      'Doctor Authorized',
      `Welcome ${session.account.name}. Access granted to Doctor Portal.`,
      'reminder'
    );
  };

  const logoutDoctor = () => {
    setDoctorSession(null);
    setUserRole('regularUser');
    localStorage.removeItem('ark_doctor_session');
    setPortalState('public');
    addNotification(
      'Doctor Portal Locked',
      'Clinical session ended. Switched to public user portal.',
      'reminder'
    );
  };

  const loginAdmin = (session: DoctorSession) => {
    setAdminSession(session);
    setUserRole('admin');
    try {
      localStorage.setItem('ark_admin_session', JSON.stringify(session));
    } catch (e) {
      console.error('Failed to persist admin session:', e);
    }
    setIsAdminModalOpen(false);
    setPortalState('admin');
    addNotification(
      'Administrator Authorized',
      `Welcome ${session.account.name}. Access granted to Admin Portal.`,
      'reminder'
    );
  };

  const logoutAdmin = () => {
    setAdminSession(null);
    setUserRole('regularUser');
    localStorage.removeItem('ark_admin_session');
    setPortalState('public');
    addNotification(
      'Admin Portal Locked',
      'Administrative session ended. Switched to public user portal.',
      'reminder'
    );
  };

  const setPortal = (target: PortalType) => {
    if (target === 'doctor') {
      if (!isDoctorAuthenticated) {
        // Enforce RBAC: regular user cannot access doctor portal
        setIsDoctorModalOpen(true);
        addNotification(
          'Doctor Portal Restricted',
          'Clinical authorization required via 3-tap secret trigger or doctor login.',
          'reminder'
        );
        return;
      }
    } else if (target === 'admin') {
      if (!isAdminAuthenticated) {
        // Enforce RBAC: regular user / doctor cannot access admin portal
        setIsAdminModalOpen(true);
        addNotification(
          'Admin Portal Restricted',
          'Administrative authorization required via 3-tap secret trigger or admin login.',
          'reminder'
        );
        return;
      }
    }
    setPortalState(target);
  };

  const [patients, setPatients] = useState<Patient[]>(() => {
    const cleared = localStorage.getItem('ark_doctor_data_cleared');
    if (cleared === 'true') return [];
    const saved = localStorage.getItem('ark_clinic_patients');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {}
    }
    // Default to cleared empty data state as requested by user
    return [];
  });

  const [treatments, setTreatments] = useState<Treatment[]>(() => {
    const cleared = localStorage.getItem('ark_doctor_data_cleared');
    if (cleared === 'true') return [];
    const saved = localStorage.getItem('ark_clinic_treatments');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {}
    }
    return [];
  });

  const [followUpTasks, setFollowUpTasks] = useState<FollowUpTask[]>(() => {
    const cleared = localStorage.getItem('ark_doctor_data_cleared');
    if (cleared === 'true') return [];
    const saved = localStorage.getItem('ark_clinic_followups');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {}
    }
    return [];
  });

  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    const cleared = localStorage.getItem('ark_doctor_data_cleared');
    if (cleared === 'true') return [];
    const saved = localStorage.getItem('ark_clinic_appointments');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {}
    }
    return [];
  });

  const [notifications, setNotifications] = useState<ClinicNotification[]>([
    {
      id: 'notif-1',
      timestamp: 'Just now',
      title: 'Doctor Portal Online',
      message: 'Doctor Portal is ready. All data has been cleared per clinical request. You can schedule appointments or listen to voice briefing.',
      type: 'reminder',
      read: false
    }
  ]);

  const [reminders, setReminders] = useState<DoctorReminder[]>(() => {
    try {
      const saved = localStorage.getItem('ark_doctor_reminders');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [lastScheduleUpdate, setLastScheduleUpdate] = useState<number>(Date.now());

  // Demo Workflow Guided Stepper
  const [demoWorkflowActive, setDemoWorkflowActive] = useState<boolean>(true);
  const [currentDemoStep, setCurrentDemoStep] = useState<number>(1);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('ark_clinic_patients', JSON.stringify(patients));
      localStorage.setItem('ark_clinic_treatments', JSON.stringify(treatments));
      localStorage.setItem('ark_clinic_followups', JSON.stringify(followUpTasks));
      localStorage.setItem('ark_clinic_appointments', JSON.stringify(appointments));
    } catch (e) {
      console.error("Storage error:", e);
    }
  }, [patients, treatments, followUpTasks, appointments]);

  const addNotification = (title: string, message: string, type: ClinicNotification['type'], patientId?: string) => {
    const newNotif: ClinicNotification = {
      id: `notif-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      title,
      message,
      type,
      read: false,
      relatedPatientId: patientId
    };
    setNotifications(prev => [newNotif, ...prev.slice(0, 19)]);
  };

  // Step 2 & 3 & 4 implementation
  const recordTreatment = (data: {
    patientId: string;
    doctorId: string;
    procedureName: string;
    category: Treatment['category'];
    toothNumbers: number[];
    clinicalNotes: string;
    costPKR: number;
    followUpRequired: boolean;
    followUpDays?: number;
    followUpReason?: string;
  }) => {
    const fallbackPatient: Patient = {
      id: data.patientId || `pat-${Date.now()}`,
      name: 'Registered Patient',
      phone: '0300-1234567',
      email: '',
      age: 32,
      gender: 'Male',
      bloodGroup: 'B+',
      allergies: [],
      medicalAlerts: [],
      lastVisitDate: new Date().toISOString().split('T')[0],
      totalVisits: 1
    };
    const patient = patients.find(p => p.id === data.patientId) || fallbackPatient;
    const doctor = DOCTORS.find(d => d.id === data.doctorId) || DOCTORS[0];

    const newTreatment: Treatment = {
      id: `trt-${Date.now()}`,
      patientId: data.patientId,
      patientName: patient.name,
      doctorId: data.doctorId,
      doctorName: doctor.name,
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      procedureName: data.procedureName,
      category: data.category,
      toothNumbers: data.toothNumbers,
      clinicalNotes: data.clinicalNotes,
      costPKR: data.costPKR,
      followUpRequired: data.followUpRequired,
      followUpDays: data.followUpDays,
      followUpReason: data.followUpReason,
      status: 'Completed'
    };

    setTreatments(prev => [newTreatment, ...prev]);

    // Update patient visit record
    setPatients(prev => prev.map(p => {
      if (p.id === data.patientId) {
        return {
          ...p,
          lastVisitDate: newTreatment.date,
          totalVisits: p.totalVisits + 1
        };
      }
      return p;
    }));

    addNotification(
      'Treatment Recorded',
      `${data.procedureName} completed for ${patient.name} by ${doctor.name}.`,
      'treatment_recorded',
      data.patientId
    );

    // Automatic Step 4: System automatically creates follow-up task
    let createdFollowUp: FollowUpTask | undefined = undefined;
    if (data.followUpRequired && data.followUpDays) {
      const recDate = new Date();
      recDate.setDate(recDate.getDate() + data.followUpDays);
      const formattedDate = recDate.toISOString().split('T')[0];

      createdFollowUp = {
        id: `flw-${Date.now()}`,
        patientId: patient.id,
        patientName: patient.name,
        patientPhone: patient.phone,
        doctorId: doctor.id,
        doctorName: doctor.name,
        treatmentId: newTreatment.id,
        treatmentName: data.procedureName,
        recommendedDate: formattedDate,
        daysFromTreatment: data.followUpDays,
        reason: data.followUpReason || `Follow-up evaluation for ${data.procedureName}`,
        priority: 'High',
        status: 'Pending',
        createdAt: new Date().toISOString()
      };

      setFollowUpTasks(prev => [createdFollowUp!, ...prev]);

      addNotification(
        'Automated Follow-up Created',
        `Follow-up task scheduled for ${patient.name} on ${formattedDate} (${data.followUpReason || 'Post-procedure review'}).`,
        'followup_created',
        patient.id
      );
    }

    return { treatment: newTreatment, followUp: createdFollowUp };
  };

  const scheduleFollowUp = (data: {
    patientId: string;
    treatmentId: string;
    days: number;
    reason: string;
    priority?: 'High' | 'Normal' | 'Routine';
  }) => {
    const fallbackPatient: Patient = {
      id: data.patientId || `pat-${Date.now()}`,
      name: 'Registered Patient',
      phone: '0300-1234567',
      email: '',
      age: 32,
      gender: 'Male',
      bloodGroup: 'B+',
      allergies: [],
      medicalAlerts: [],
      lastVisitDate: new Date().toISOString().split('T')[0],
      totalVisits: 1
    };
    const patient = patients.find(p => p.id === data.patientId) || fallbackPatient;
    const doctor = DOCTORS.find(d => d.id === activeDoctorId) || DOCTORS[0];
    const treatment = treatments.find(t => t.id === data.treatmentId);

    const recDate = new Date();
    recDate.setDate(recDate.getDate() + data.days);
    const formattedDate = recDate.toISOString().split('T')[0];

    const newTask: FollowUpTask = {
      id: `flw-${Date.now()}`,
      patientId: patient.id,
      patientName: patient.name,
      patientPhone: patient.phone,
      doctorId: doctor.id,
      doctorName: doctor.name,
      treatmentId: data.treatmentId,
      treatmentName: treatment ? treatment.procedureName : 'Clinical Follow-up',
      recommendedDate: formattedDate,
      daysFromTreatment: data.days,
      reason: data.reason,
      priority: data.priority || 'Normal',
      status: 'Pending',
      createdAt: new Date().toISOString()
    };

    setFollowUpTasks(prev => [newTask, ...prev]);

    addNotification(
      'Follow-up Task Scheduled',
      `Doctor scheduled follow-up for ${patient.name} in ${data.days} days.`,
      'followup_created',
      patient.id
    );

    return newTask;
  };

  // Step 6: AI Receptionist / Patient Portal requests appointment
  const requestAppointment = (data: {
    patientName: string;
    patientPhone: string;
    doctorId: string;
    date: string;
    time: string;
    procedure: string;
    source: Appointment['source'];
    notes?: string;
    patientId?: string;
    relatedFollowUpId?: string;
  }) => {
    const doctor = DOCTORS.find(d => d.id === data.doctorId) || DOCTORS[0];

    const newApt: Appointment = {
      id: `apt-${Date.now()}`,
      patientId: data.patientId,
      patientName: data.patientName,
      patientPhone: data.patientPhone,
      doctorId: data.doctorId,
      doctorName: doctor.name,
      date: data.date,
      time: data.time,
      durationMinutes: 45,
      procedure: data.procedure,
      status: 'Pending',
      source: data.source,
      notes: data.notes,
      relatedFollowUpId: data.relatedFollowUpId
    };

    setAppointments(prev => [newApt, ...prev]);

    // If related to a follow-up, update follow-up status
    if (data.relatedFollowUpId) {
      setFollowUpTasks(prev => prev.map(f => {
        if (f.id === data.relatedFollowUpId) {
          return {
            ...f,
            status: 'Appointment-Requested',
            associatedAppointmentId: newApt.id
          };
        }
        return f;
      }));
    }

    addNotification(
      'New Appointment Request',
      `${data.patientName} requested an appointment for ${data.procedure} on ${data.date} (${data.source}).`,
      'appointment_request',
      data.patientId
    );

    return newApt;
  };

  // Step 7: Receptionist confirms appointment -> updates follow-up and Doctor schedule
  const confirmAppointment = (appointmentId: string, assignedDate?: string, assignedTime?: string) => {
    setAppointments(prev => prev.map(a => {
      if (a.id === appointmentId) {
        const updated = {
          ...a,
          status: 'Confirmed' as const,
          date: assignedDate || a.date,
          time: assignedTime || a.time
        };
        return updated;
      }
      return a;
    }));

    // Find the appointment to see if it links to a follow-up
    const apt = appointments.find(a => a.id === appointmentId);
    if (apt) {
      if (apt.relatedFollowUpId) {
        setFollowUpTasks(prev => prev.map(f => {
          if (f.id === apt.relatedFollowUpId) {
            return {
              ...f,
              status: 'Scheduled',
              associatedAppointmentId: appointmentId
            };
          }
          return f;
        }));
      }

      addNotification(
        'Appointment Confirmed',
        `Confirmed for ${apt.patientName} on ${assignedDate || apt.date} at ${assignedTime || apt.time}. Doctor schedule updated!`,
        'appointment_confirmed',
        apt.patientId
      );
    }
  };

  const updateAppointmentStatus = (appointmentId: string, status: Appointment['status']) => {
    setAppointments(prev => prev.map(a => {
      if (a.id === appointmentId) {
        return { ...a, status };
      }
      return a;
    }));
  };

  const dismissNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const resetAllData = () => {
    setPatients(INITIAL_PATIENTS);
    setTreatments(INITIAL_TREATMENTS);
    setFollowUpTasks(INITIAL_FOLLOW_UPS);
    setAppointments(INITIAL_APPOINTMENTS);
    setNotifications([
      {
        id: 'notif-reset',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        title: 'Demo Data Reset',
        message: 'ARK Dental Studio data restored to initial clean benchmark.',
        type: 'reminder',
        read: false
      }
    ]);
    localStorage.removeItem('ark_clinic_patients');
    localStorage.removeItem('ark_clinic_treatments');
    localStorage.removeItem('ark_clinic_followups');
    localStorage.removeItem('ark_clinic_appointments');
    localStorage.removeItem('ark_doctor_data_cleared');
    localStorage.removeItem('ark_doctor_reminders');
    setLastScheduleUpdate(Date.now());
    setCurrentDemoStep(1);
  };

  const clearDoctorData = () => {
    setPatients([]);
    setTreatments([]);
    setFollowUpTasks([]);
    setAppointments([]);
    setReminders([]);
    setNotifications([
      {
        id: `notif-${Date.now()}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        title: 'Doctor Portal Data Cleared',
        message: 'All patient health records, clinical treatments, and appointment schedules have been completely cleared.',
        type: 'reminder',
        read: false
      }
    ]);
    localStorage.setItem('ark_clinic_patients', JSON.stringify([]));
    localStorage.setItem('ark_clinic_treatments', JSON.stringify([]));
    localStorage.setItem('ark_clinic_followups', JSON.stringify([]));
    localStorage.setItem('ark_clinic_appointments', JSON.stringify([]));
    localStorage.setItem('ark_doctor_reminders', JSON.stringify([]));
    localStorage.setItem('ark_doctor_data_cleared', 'true');
    setLastScheduleUpdate(Date.now());
  };

  const loadSampleSchedule = () => {
    setPatients(INITIAL_PATIENTS);
    setTreatments(INITIAL_TREATMENTS);
    setFollowUpTasks(INITIAL_FOLLOW_UPS);
    setAppointments(INITIAL_APPOINTMENTS);
    localStorage.setItem('ark_clinic_patients', JSON.stringify(INITIAL_PATIENTS));
    localStorage.setItem('ark_clinic_treatments', JSON.stringify(INITIAL_TREATMENTS));
    localStorage.setItem('ark_clinic_followups', JSON.stringify(INITIAL_FOLLOW_UPS));
    localStorage.setItem('ark_clinic_appointments', JSON.stringify(INITIAL_APPOINTMENTS));
    localStorage.removeItem('ark_doctor_data_cleared');
    addNotification(
      'Sample Schedule Loaded',
      'Loaded 4 benchmark patients and day appointments for Dr. Muhammad Ali Riaz Khan.',
      'reminder'
    );
    setLastScheduleUpdate(Date.now());
  };

  const addPatient = (patientData: Omit<Patient, 'id' | 'lastVisitDate' | 'totalVisits'>): Patient => {
    const newPatient: Patient = {
      ...patientData,
      id: `pat-${Date.now()}`,
      lastVisitDate: new Date().toISOString().split('T')[0],
      totalVisits: 1
    };
    setPatients(prev => [newPatient, ...prev]);
    setActivePatientId(newPatient.id);
    addNotification(
      'New Patient Added',
      `${newPatient.name} registered into clinical records.`,
      'reminder',
      newPatient.id
    );
    return newPatient;
  };

  const addAppointment = (aptData: Omit<Appointment, 'id'>): Appointment => {
    const newApt: Appointment = {
      ...aptData,
      id: `apt-${Date.now()}`
    };
    setAppointments(prev => [newApt, ...prev]);
    setLastScheduleUpdate(Date.now());
    addNotification(
      'Appointment Scheduled',
      `Scheduled ${newApt.patientName} for ${newApt.procedure} on ${newApt.date} at ${newApt.time}.`,
      'appointment_confirmed',
      newApt.patientId
    );
    return newApt;
  };

  const addReminder = (data: {
    patientName: string;
    procedure: string;
    scheduledTime: string;
    reminderMinutesBefore: number;
    notes?: string;
  }): DoctorReminder => {
    const newRem: DoctorReminder = {
      id: `rem-${Date.now()}`,
      patientName: data.patientName,
      procedure: data.procedure,
      scheduledTime: data.scheduledTime,
      reminderMinutesBefore: data.reminderMinutesBefore,
      alertAt: `${data.reminderMinutesBefore}m before ${data.scheduledTime}`,
      fired: false,
      notes: data.notes,
      createdAt: new Date().toISOString()
    };
    setReminders(prev => {
      const updated = [newRem, ...prev];
      try {
        localStorage.setItem('ark_doctor_reminders', JSON.stringify(updated));
      } catch {}
      return updated;
    });
    addNotification(
      'Time Reminder Set',
      `Alert set: ${data.reminderMinutesBefore}m before ${data.patientName}'s ${data.procedure} (${data.scheduledTime}).`,
      'reminder'
    );
    return newRem;
  };

  const dismissReminder = (id: string) => {
    setReminders(prev => {
      const updated = prev.filter(r => r.id !== id);
      try {
        localStorage.setItem('ark_doctor_reminders', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const advanceDemoStep = () => {
    setCurrentDemoStep(prev => (prev < 8 ? prev + 1 : 1));
  };

  // Automated or guided trigger for each of the 8 steps
  const executeDemoStepAction = (stepNumber: number) => {
    setCurrentDemoStep(stepNumber);

    switch (stepNumber) {
      case 1:
        // Doctor opens patient record
        if (!isDoctorAuthenticated) {
          setIsDoctorModalOpen(true);
        } else {
          setPortalState('doctor');
        }
        setActivePatientId('pat-1'); // Bilal Ahmed
        break;

      case 2:
        // Doctor records treatment
        if (!isDoctorAuthenticated) {
          setIsDoctorModalOpen(true);
        } else {
          setPortalState('doctor');
        }
        setActivePatientId('pat-1');
        break;

      case 3:
      case 4:
      case 5:
        // Follow-up task in dashboard
        if (!isDoctorAuthenticated) {
          setIsDoctorModalOpen(true);
        } else {
          setPortalState('doctor');
        }
        break;

      case 6:
        // AI Receptionist helps patient request appointment
        setPortalState('public');
        break;

      case 7:
        // Receptionist confirms appointment
        if (!isDoctorAuthenticated) {
          setIsDoctorModalOpen(true);
        } else {
          setPortalState('doctor');
        }
        break;

      case 8:
        // Doctor sees updated appointment schedule
        if (!isDoctorAuthenticated) {
          setIsDoctorModalOpen(true);
        } else {
          setPortalState('doctor');
        }
        break;

      default:
        break;
    }
  };

  return (
    <ClinicContext.Provider value={{
      portal,
      setPortal,
      language,
      setLanguage,
      theme,
      setTheme,
      toggleTheme,
      activeDoctorId,
      setActiveDoctorId,
      activePatientId,
      setActivePatientId,
      userRole,
      doctorSession,
      adminSession,
      isDoctorAuthenticated,
      isAdminAuthenticated,
      isDoctorModalOpen,
      openDoctorLoginModal,
      closeDoctorLoginModal,
      loginDoctor,
      logoutDoctor,
      isAdminModalOpen,
      openAdminLoginModal,
      closeAdminLoginModal,
      loginAdmin,
      logoutAdmin,
      patients,
      treatments,
      followUpTasks,
      appointments,
      notifications,
      doctors: DOCTORS,
      recordTreatment,
      scheduleFollowUp,
      requestAppointment,
      confirmAppointment,
      updateAppointmentStatus,
      dismissNotification,
      clearAllNotifications,
      resetAllData,
      clearDoctorData,
      loadSampleSchedule,
      addPatient,
      addAppointment,
      reminders,
      addReminder,
      dismissReminder,
      lastScheduleUpdate,
      demoWorkflowActive,
      setDemoWorkflowActive,
      currentDemoStep,
      setCurrentDemoStep,
      advanceDemoStep,
      executeDemoStepAction
    }}>
      {children}
    </ClinicContext.Provider>
  );
};

export const useClinic = () => {
  const context = useContext(ClinicContext);
  if (!context) {
    throw new Error('useClinic must be used within a ClinicProvider');
  }
  return context;
};
