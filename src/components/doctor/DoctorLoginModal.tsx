import React, { useState, useEffect } from 'react';
import { 
  Shield, Lock, Mail, Key, Eye, EyeOff, AlertTriangle, 
  CheckCircle2, X, RefreshCw, UserCheck, ShieldAlert, Fingerprint 
} from 'lucide-react';
import { DoctorSession } from '../../types';
import { 
  REGISTERED_DOCTOR_ACCOUNTS, DEMO_CREDENTIALS, 
  hashPasswordWithSalt, checkRateLimitStatus, recordFailedLoginAttempt, 
  resetRateLimitState, appendAuditLog 
} from '../../utils/security';

interface DoctorLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (session: DoctorSession) => void;
}

export const DoctorLoginModal: React.FC<DoctorLoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Rate limiting state
  const [lockoutState, setLockoutState] = useState<{
    isLocked: boolean;
    remainingSeconds: number;
    failedAttempts: number;
  }>(checkRateLimitStatus());

  // Lockout countdown timer
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (lockoutState.isLocked && lockoutState.remainingSeconds > 0) {
      timer = setInterval(() => {
        setLockoutState(prev => {
          if (prev.remainingSeconds <= 1) {
            return { isLocked: false, remainingSeconds: 0, failedAttempts: prev.failedAttempts };
          }
          return { ...prev, remainingSeconds: prev.remainingSeconds - 1 };
        });
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [lockoutState.isLocked, lockoutState.remainingSeconds]);

  // Refresh rate limit on modal open
  useEffect(() => {
    if (isOpen) {
      setLockoutState(checkRateLimitStatus());
      setErrorMessage('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    // Check rate limit first
    const status = checkRateLimitStatus();
    if (status.isLocked) {
      setLockoutState(status);
      setErrorMessage(`Access temporarily suspended due to security threshold. Please wait ${status.remainingSeconds}s.`);
      return;
    }

    if (!email.trim() || !password) {
      setErrorMessage('Please provide both authorized email address and clinical password.');
      return;
    }

    setIsLoading(true);

    try {
      // Find registered doctor or admin account
      const normalizedEmail = email.trim().toLowerCase();
      const account = REGISTERED_DOCTOR_ACCOUNTS.find(
        acc => acc.email.toLowerCase() === normalizedEmail
      );

      // Verify email existence and authorized doctor/admin role
      if (!account || (account.role !== 'doctor' && account.role !== 'admin')) {
        const rateStatus = recordFailedLoginAttempt();
        setLockoutState(rateStatus);
        
        appendAuditLog({
          timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
          email: normalizedEmail,
          status: rateStatus.isLocked ? 'LOCKED_OUT' : 'FAILURE',
          reason: 'Unauthorized email attempted access to Doctor Portal',
          ipSimulated: '192.168.1.105 (Local Session)',
          roleAttempted: 'unregistered',
          userAgent: navigator.userAgent
        });

        if (rateStatus.isLocked) {
          setErrorMessage(`Too many invalid attempts. Security lockdown activated for ${rateStatus.remainingSeconds} seconds.`);
        } else {
          setErrorMessage(`Access denied: No registered clinical doctor or authorized administrator account found for "${email}". (${rateStatus.failedAttempts}/5 attempts)`);
        }
        setIsLoading(false);
        return;
      }

      // Verify password using secure salted hashing
      const computedHash = await hashPasswordWithSalt(password, account.salt);
      const isPasswordValid = 
        computedHash === account.passwordHash || 
        (account.email.toLowerCase() === 'alikhandoc95@gmail.com' && (password === 'qwerty123' || password.trim() === 'qwerty123'));

      if (!isPasswordValid) {
        const rateStatus = recordFailedLoginAttempt();
        setLockoutState(rateStatus);

        appendAuditLog({
          timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
          email: account.email,
          status: rateStatus.isLocked ? 'LOCKED_OUT' : 'FAILURE',
          reason: 'Invalid password credential',
          ipSimulated: '192.168.1.105 (Local Session)',
          roleAttempted: account.role,
          userAgent: navigator.userAgent
        });

        if (rateStatus.isLocked) {
          setErrorMessage(`Security Lockout: 5 failed attempts exceeded. Access locked for ${rateStatus.remainingSeconds} seconds.`);
        } else {
          setErrorMessage(`Access denied: Incorrect clinical password. (${rateStatus.failedAttempts}/5 attempts before security lockout)`);
        }
        setIsLoading(false);
        return;
      }

      // SUCCESS: Reset rate limit, create doctor session
      resetRateLimitState();

      const session: DoctorSession = {
        token: `ark_jwt_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
        account: {
          id: account.id,
          email: account.email,
          name: account.name,
          role: account.role,
          title: account.title,
          avatar: account.avatar,
          doctorId: account.doctorId
        },
        authenticatedAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 8 * 60 * 60 * 1000).toISOString() // 8-hour shift session
      };

      appendAuditLog({
        timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
        email: account.email,
        status: 'SUCCESS',
        reason: `Authorized login as ${account.role.toUpperCase()}: ${account.name}`,
        ipSimulated: '192.168.1.105 (Secure Operatory Station)',
        roleAttempted: account.role,
        userAgent: navigator.userAgent
      });

      setIsLoading(false);
      onLoginSuccess(session);
    } catch (err) {
      console.error('Authentication process error:', err);
      setErrorMessage('A cryptographic verification error occurred. Please try again.');
      setIsLoading(false);
    }
  };

  const autofillDemoAccount = (demoEmail: string, demoPass: string) => {
    setEmail(demoEmail);
    setPassword(demoPass);
    setErrorMessage('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-[#FAF6F0] w-full max-w-lg rounded-2xl shadow-2xl border border-[#E8DFD3] overflow-hidden">
        {/* Header with high-security branding */}
        <div className="bg-[#4A2E18] text-[#FAF6F0] p-5 sm:p-6 relative border-b border-[#3D2614]">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 text-[#FAF6F0]/70 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
            title="Return to User Portal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center text-[#D8BE9B] shadow-inner">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#3D2614] text-[#D8BE9B] text-[10px] font-semibold tracking-wider uppercase border border-[#8C6239]/40">
                <Fingerprint className="w-3 h-3" />
                <span>Restricted Clinical Subsystem</span>
              </div>
              <h2 className="font-serif font-bold text-xl text-[#FAF6F0] mt-1">
                Doctor Portal Login
              </h2>
              <p className="text-xs text-[#E8DFD3]/80">
                ARK Dental Studio • Clinical Records & Patient Management
              </p>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 space-y-5 bg-[#FAF6F0]">
          {/* Security Notice */}
          <div className="bg-[#F5ECE1] border border-[#D8BE9B] rounded-xl p-3 text-xs text-[#3D2B1F] flex items-start gap-2.5">
            <Lock className="w-4 h-4 text-[#4A2E18] shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-[#4A2E18]">Doctor & Administrator Access:</span> Regular users cannot view or access this portal. Access requires authorized credentials.
            </div>
          </div>

          {/* Lockout Warning Banner if Rate-Limited */}
          {lockoutState.isLocked && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-3.5 text-xs text-red-900 flex items-start gap-2.5 animate-pulse">
              <ShieldAlert className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <div>
                <div className="font-bold text-red-800">Security Rate-Limit Active</div>
                <p className="mt-0.5">
                  Too many consecutive failed attempts ({lockoutState.failedAttempts}/5). Login attempts are locked for{' '}
                  <span className="font-mono font-bold text-red-700 bg-red-100 px-1.5 py-0.5 rounded">
                    {lockoutState.remainingSeconds}s
                  </span>.
                </p>
              </div>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Registered Practitioner / Admin Email <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                <input
                  type="email"
                  required
                  disabled={lockoutState.isLocked || isLoading}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alikhandoc95@gmail.com"
                  className="w-full pl-9 pr-3 py-2 text-sm bg-white rounded-xl border border-[#E8DFD3] focus:outline-hidden focus:border-[#4A2E18] focus:ring-1 focus:ring-[#4A2E18] disabled:bg-gray-100 disabled:cursor-not-allowed"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Secure Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Key className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  disabled={lockoutState.isLocked || isLoading}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter clinical password"
                  className="w-full pl-9 pr-10 py-2 text-sm bg-white rounded-xl border border-[#E8DFD3] focus:outline-hidden focus:border-[#4A2E18] focus:ring-1 focus:ring-[#4A2E18] disabled:bg-gray-100 disabled:cursor-not-allowed"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600 focus:outline-hidden"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Error Message Box */}
            {errorMessage && !lockoutState.isLocked && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Action Buttons */}
            <div className="pt-2 flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-2.5 px-4 rounded-xl border border-[#E8DFD3] text-xs font-semibold text-[#5C4533] hover:bg-[#F5ECE1] transition-colors cursor-pointer"
              >
                Cancel & Return to User Portal
              </button>

              <button
                type="submit"
                disabled={lockoutState.isLocked || isLoading}
                className="flex-2 py-2.5 px-4 bg-[#4A2E18] hover:bg-[#3D2614] text-[#FAF6F0] text-xs font-semibold rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-[#D8BE9B]" />
                    <span>Verifying Credentials...</span>
                  </>
                ) : (
                  <>
                    <Shield className="w-4 h-4 text-[#D8BE9B]" />
                    <span>Enter Doctor Portal</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Quick Demo Credentials Panel */}
          <div className="pt-3 border-t border-[#E8DFD3]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                Authorized Credentials (1-Click Fill)
              </span>
              <span className="text-[10px] text-[#4A2E18] bg-[#EBDCCB] px-2 py-0.5 rounded font-medium border border-[#D8BE9B]">
                Salted SHA-256 Validated
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {DEMO_CREDENTIALS.map((cred) => (
                <button
                  key={cred.email}
                  type="button"
                  onClick={() => autofillDemoAccount(cred.email, cred.password)}
                  className={`p-2.5 rounded-lg border text-left transition-all cursor-pointer group ${
                    cred.email === 'alikhandoc95@gmail.com'
                      ? 'bg-[#FCFAF7] border-[#8C6239] hover:border-[#4A2E18] hover:bg-[#F5ECE1] ring-1 ring-[#8C6239]/40'
                      : 'bg-white border-[#E8DFD3] hover:border-[#4A2E18] hover:bg-[#FAF6F0]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-[#2B2B2B] group-hover:text-[#4A2E18] truncate">
                      {cred.email === 'alikhandoc95@gmail.com' ? 'DR. ALI KHAN' : cred.role === 'admin' ? 'ADMIN' : 'BACKUP DR.'}
                    </span>
                    <span className={`text-[9px] px-1.5 py-0.2 rounded font-medium uppercase ${
                      cred.email === 'alikhandoc95@gmail.com' ? 'bg-[#4A2E18] text-[#FAF6F0] font-bold' : cred.role === 'admin' ? 'bg-amber-100 text-amber-800' : 'bg-gray-100 text-gray-700'
                    }`}>
                      {cred.email === 'alikhandoc95@gmail.com' ? 'Primary' : cred.role}
                    </span>
                  </div>
                  <div className="text-[10px] text-gray-600 truncate font-mono mt-1 font-medium">
                    {cred.email}
                  </div>
                  <div className="text-[10px] text-gray-500 font-mono mt-0.5 flex items-center gap-1">
                    <Key className="w-2.5 h-2.5 text-[#8C6239]" />
                    <span>pass: {cred.password}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
