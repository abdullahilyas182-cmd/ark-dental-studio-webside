import { DoctorAccount, DoctorSession, LoginAuditLog, UserRole } from '../types';

// Pre-computed salted hashes using SHA-256 for demo accounts
// Credentials:
// 1. dr.ali@arkdental.com / ArkDoctor2026!
// 2. admin@arkdental.com / ClinicDirector2026!

export const REGISTERED_DOCTOR_ACCOUNTS: DoctorAccount[] = [
  {
    id: 'acc-alikhandoc',
    email: 'alikhandoc95@gmail.com',
    name: 'Dr. Muhammad Ali Riaz Khan',
    role: 'doctor',
    salt: 's4lt_alikhandoc_2026',
    passwordHash: '1b4c5b1291f5d090e7de9d0ab6b77f937b7a2f713c02e3eae75d47150c1a7a2a',
    doctorId: 'doc-1',
    title: 'Oral & Maxillofacial Surgeon & Clinical Director',
    avatar: '/images/dr_khan_actual_uploaded.jpg'
  },
  {
    id: 'acc-ali',
    email: 'dr.ali@arkdentalstudio.com',
    name: 'Dr. Muhammad Ali Riaz Khan',
    role: 'doctor',
    salt: 's4lt_4l1_2026',
    passwordHash: '4de7ff5dc20a25a6717a45ce534da074b29e356fb28252e27fc6f76e410afd10',
    doctorId: 'doc-1',
    title: 'Oral & Maxillofacial Surgeon & Clinical Director',
    avatar: '/images/dr_khan_actual_uploaded.jpg'
  },
  {
    id: 'acc-ali-alt',
    email: 'dr.ali@arkdental.com',
    name: 'Dr. Muhammad Ali Riaz Khan',
    role: 'doctor',
    salt: 's4lt_4l1_2026',
    passwordHash: '4de7ff5dc20a25a6717a45ce534da074b29e356fb28252e27fc6f76e410afd10',
    doctorId: 'doc-1',
    title: 'Oral & Maxillofacial Surgeon & Clinical Director',
    avatar: '/images/dr_khan_actual_uploaded.jpg'
  },
  {
    id: 'acc-admin',
    email: 'admin@arkdental.com',
    name: 'Clinical Operations Admin',
    role: 'admin',
    salt: 's4lt_4dm1n_2026',
    passwordHash: '0e01c3e5b078a02f5a2a9801b1c1874f0db4b623e50c0dc53302d7f497abf329',
    title: 'Clinic Super Administrator',
    avatar: '/images/ark_logo.jpg'
  }
];

// Plaintext demo passwords for testing & reviewer reference:
export const DEMO_CREDENTIALS = [
  {
    email: 'alikhandoc95@gmail.com',
    password: 'qwerty123',
    label: 'Dr. Muhammad Ali Riaz Khan (Primary Doctor Login)',
    role: 'doctor' as const
  },
  {
    email: 'dr.ali@arkdental.com',
    password: 'ArkDoctor2026!',
    label: 'Dr. Muhammad Ali Riaz Khan (Surgeon & Director)',
    role: 'doctor' as const
  },
  {
    email: 'admin@arkdental.com',
    password: 'ClinicDirector2026!',
    label: 'Clinical Administrator (Authorized Admin)',
    role: 'admin' as const
  }
];

// Asynchronous SHA-256 helper for client-side password hashing
export async function hashPasswordWithSalt(password: string, salt: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password + '::' + salt);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// Rate-limiting configuration
export const RATE_LIMIT_CONFIG = {
  MAX_FAILED_ATTEMPTS: 5,
  LOCKOUT_DURATION_MS: 30 * 1000, // 30 seconds lockout for failed attempts
  TAP_WINDOW_MS: 2000, // 2 seconds window between consecutive taps (tapWindowSeconds: 2)
  REQUIRED_TAPS: 3 // Required 3 taps to trigger hidden login
};

export interface RateLimitState {
  failedAttempts: number;
  lockedUntil: number | null;
}

export function checkRateLimitStatus(): { isLocked: boolean; remainingSeconds: number; failedAttempts: number } {
  try {
    const raw = localStorage.getItem('ark_doctor_ratelimit');
    if (!raw) return { isLocked: false, remainingSeconds: 0, failedAttempts: 0 };
    const state: RateLimitState = JSON.parse(raw);
    const now = Date.now();
    if (state.lockedUntil && state.lockedUntil > now) {
      const remainingSeconds = Math.ceil((state.lockedUntil - now) / 1000);
      return { isLocked: true, remainingSeconds, failedAttempts: state.failedAttempts };
    }
    return { isLocked: false, remainingSeconds: 0, failedAttempts: state.failedAttempts };
  } catch {
    return { isLocked: false, remainingSeconds: 0, failedAttempts: 0 };
  }
}

export function recordFailedLoginAttempt(): { isLocked: boolean; remainingSeconds: number; failedAttempts: number } {
  try {
    const raw = localStorage.getItem('ark_doctor_ratelimit');
    let state: RateLimitState = raw ? JSON.parse(raw) : { failedAttempts: 0, lockedUntil: null };
    
    // If previous lockout has expired, reset attempts
    if (state.lockedUntil && state.lockedUntil <= Date.now()) {
      state.failedAttempts = 0;
      state.lockedUntil = null;
    }

    state.failedAttempts += 1;
    if (state.failedAttempts >= RATE_LIMIT_CONFIG.MAX_FAILED_ATTEMPTS) {
      state.lockedUntil = Date.now() + RATE_LIMIT_CONFIG.LOCKOUT_DURATION_MS;
      localStorage.setItem('ark_doctor_ratelimit', JSON.stringify(state));
      return { 
        isLocked: true, 
        remainingSeconds: Math.ceil(RATE_LIMIT_CONFIG.LOCKOUT_DURATION_MS / 1000), 
        failedAttempts: state.failedAttempts 
      };
    }

    localStorage.setItem('ark_doctor_ratelimit', JSON.stringify(state));
    return { isLocked: false, remainingSeconds: 0, failedAttempts: state.failedAttempts };
  } catch {
    return { isLocked: false, remainingSeconds: 0, failedAttempts: 1 };
  }
}

export function resetRateLimitState(): void {
  try {
    localStorage.removeItem('ark_doctor_ratelimit');
  } catch {
    // Ignore
  }
}

// Security Audit Log storage and retrieval
export function getStoredAuditLogs(): LoginAuditLog[] {
  try {
    const raw = localStorage.getItem('ark_doctor_audit_logs');
    if (raw) return JSON.parse(raw);
  } catch {
    // Fallback
  }
  // Initial demo audit logs showing historical security monitoring
  return [
    {
      id: 'audit-001',
      timestamp: '2026-09-10 09:15:22',
      email: 'dr.tariq@arkdental.com',
      status: 'SUCCESS',
      reason: 'Standard clinical session authorization',
      ipSimulated: '192.168.10.42 (Operatory 1 Station)',
      roleAttempted: 'doctor',
      userAgent: 'ClinicOS Terminal / WebKit Chrome 132'
    },
    {
      id: 'audit-002',
      timestamp: '2026-09-10 10:02:11',
      email: 'guest.scanner@anonymous.net',
      status: 'FAILURE',
      reason: 'Unregistered account rejected at security gate',
      ipSimulated: '182.180.12.8 (External Network)',
      roleAttempted: 'unknown',
      userAgent: 'Mozilla/5.0 Unauthorized Probe'
    }
  ];
}

export function appendAuditLog(log: Omit<LoginAuditLog, 'id'>): LoginAuditLog {
  const newLog: LoginAuditLog = {
    ...log,
    id: `audit-${Date.now()}`
  };
  try {
    const logs = getStoredAuditLogs();
    const updated = [newLog, ...logs.slice(0, 49)]; // keep latest 50
    localStorage.setItem('ark_doctor_audit_logs', JSON.stringify(updated));
  } catch (e) {
    console.error('Audit log write error:', e);
  }
  return newLog;
}

// Access control checks strictly following user specification
// Authorized doctors and administrators with valid credentials can access Doctor Portal
export function canAccessDoctorPortal(role: UserRole | undefined, session: DoctorSession | null): boolean {
  if (!session) return false;
  if (role === 'regularUser') return false;
  return session.account.role === 'doctor' || session.account.role === 'admin';
}

export function canAccessAdminPortal(role: UserRole | undefined, session: DoctorSession | null): boolean {
  if (!session) return false;
  if (role === 'regularUser') return false;
  return session.account.role === 'admin';
}
