import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, Lock, Mail, Key, Eye, EyeOff, AlertTriangle, 
  CheckCircle2, X, RefreshCw, ShieldAlert, ArrowLeft, KeyRound
} from 'lucide-react';
import { DoctorSession } from '../../types';
import { 
  REGISTERED_DOCTOR_ACCOUNTS, DEMO_CREDENTIALS, 
  hashPasswordWithSalt, checkRateLimitStatus, recordFailedLoginAttempt, 
  resetRateLimitState, appendAuditLog 
} from '../../utils/security';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (session: DoctorSession) => void;
  onFailureReturnToUser?: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  onFailureReturnToUser
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Rate limiting state (max 5 failed attempts, 30s lockout)
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

  const handleClose = () => {
    onClose();
    if (onFailureReturnToUser) {
      onFailureReturnToUser();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    // Check rate limit status
    const status = checkRateLimitStatus();
    if (status.isLocked) {
      setLockoutState(status);
      setErrorMessage(`Security threshold exceeded. Admin gate locked for ${status.remainingSeconds} seconds.`);
      return;
    }

    if (!email.trim() || !password) {
      setErrorMessage('Please provide both administrator email and secure password.');
      return;
    }

    setIsLoading(true);

    try {
      const normalizedEmail = email.trim().toLowerCase();
      const account = REGISTERED_DOCTOR_ACCOUNTS.find(
        acc => acc.email.toLowerCase() === normalizedEmail
      );

      // Verify email and admin role existence
      if (!account || account.role !== 'admin') {
        const rateStatus = recordFailedLoginAttempt();
        setLockoutState(rateStatus);
        
        appendAuditLog({
          timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
          email: normalizedEmail,
          status: rateStatus.isLocked ? 'LOCKED_OUT' : 'FAILURE',
          reason: account ? 'Doctor account attempted access to Admin Portal (admin_only required)' : 'Unregistered administrator email attempted',
          ipSimulated: '192.168.1.108 (Admin Gate)',
          roleAttempted: account ? account.role : 'unregistered',
          userAgent: navigator.userAgent
        });

        if (rateStatus.isLocked) {
          setErrorMessage(`Too many invalid attempts. Admin gate locked for ${rateStatus.remainingSeconds} seconds.`);
        } else {
          if (account && account.role !== 'admin') {
            setErrorMessage(`Access Denied: Account "${email}" has Doctor privileges. The Admin Portal is strictly restricted to Administrators.`);
          } else {
            setErrorMessage(`Access Denied: No registered Administrator account found for "${email}". (${rateStatus.failedAttempts}/5 attempts)`);
          }
        }
        setIsLoading(false);
        return;
      }

      // Verify password using salted SHA-256
      const computedHash = await hashPasswordWithSalt(password, account.salt);
      const isPasswordValid = computedHash === account.passwordHash;

      if (!isPasswordValid) {
        const rateStatus = recordFailedLoginAttempt();
        setLockoutState(rateStatus);

        appendAuditLog({
          timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
          email: account.email,
          status: rateStatus.isLocked ? 'LOCKED_OUT' : 'FAILURE',
          reason: 'Invalid administrator password',
          ipSimulated: '192.168.1.108 (Admin Gate)',
          roleAttempted: account.role,
          userAgent: navigator.userAgent
        });

        if (rateStatus.isLocked) {
          setErrorMessage(`Admin Gate Locked: 5 failed attempts exceeded. Access locked for ${rateStatus.remainingSeconds} seconds.`);
        } else {
          setErrorMessage(`Access Denied: Incorrect administrator password. (${rateStatus.failedAttempts}/5 attempts before security lockout)`);
        }
        setIsLoading(false);
        return;
      }

      // SUCCESS: Reset rate limit, generate Admin session
      resetRateLimitState();

      const session: DoctorSession = {
        token: `ark_admin_jwt_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
        account: {
          id: account.id,
          email: account.email,
          name: account.name,
          role: 'admin',
          title: account.title,
          avatar: account.avatar
        },
        authenticatedAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 8 * 60 * 60 * 1000).toISOString()
      };

      appendAuditLog({
        timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
        email: account.email,
        status: 'SUCCESS',
        reason: 'Authorized administrator authenticated via 3-tap admin trigger',
        ipSimulated: '192.168.1.108 (Admin Gate)',
        roleAttempted: 'admin',
        userAgent: navigator.userAgent
      });

      setIsLoading(false);
      onLoginSuccess(session);
      onClose();
    } catch (err) {
      console.error(err);
      setErrorMessage('Authentication service error. Please retry.');
      setIsLoading(false);
    }
  };

  const handleFillDemoAdmin = () => {
    setEmail('admin@arkdental.com');
    setPassword('ClinicDirector2026!');
    setErrorMessage('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-md bg-[#12100E] border border-amber-500/30 rounded-3xl shadow-2xl overflow-hidden text-[#FAF6F0]"
        onClick={e => e.stopPropagation()}
      >
        {/* Top Gold Accent Bar */}
        <div className="h-1.5 bg-gradient-to-r from-amber-600 via-yellow-400 to-amber-600" />

        {/* Header with Title & Close button */}
        <div className="p-6 pb-4 border-b border-white/10 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-xs">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif font-bold text-lg text-white">
                  Admin Portal Login
                </h3>
                <span className="text-[9px] bg-amber-500/20 text-amber-300 font-bold px-2 py-0.5 rounded-full border border-amber-500/40 uppercase tracking-wider">
                  Admin Only
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-0.5">
                Triggered via 3-tap administrative sequence
              </p>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-white p-1 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
            aria-label="Close and return to user portal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Rate Limit Lockout Banner */}
          {lockoutState.isLocked && (
            <div className="p-3.5 bg-red-950/60 border border-red-800/80 rounded-xl flex items-start gap-3 text-red-200 text-xs animate-shake">
              <ShieldAlert className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
              <div>
                <strong className="block font-semibold">Security Lockout Active</strong>
                <span>
                  Admin authentication is temporarily locked. Wait {lockoutState.remainingSeconds} seconds before attempting another login.
                </span>
              </div>
            </div>
          )}

          {/* General Error Message */}
          {errorMessage && !lockoutState.isLocked && (
            <div className="p-3 bg-red-900/40 border border-red-700/60 rounded-xl flex items-start gap-2.5 text-red-200 text-xs">
              <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <span className="leading-relaxed">{errorMessage}</span>
            </div>
          )}

          {/* Email Field */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-gray-300 flex items-center justify-between">
              <span>Administrator Email</span>
              <span className="text-[10px] text-amber-400 font-normal">Required</span>
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                disabled={lockoutState.isLocked || isLoading}
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="admin@arkdental.com"
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-black/50 border border-white/15 text-white placeholder-gray-500 text-sm focus:outline-hidden focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all disabled:opacity-50"
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-gray-300 flex items-center justify-between">
              <span>Admin Password</span>
              <span className="text-[10px] text-amber-400 font-normal">Salted SHA-256</span>
            </label>
            <div className="relative">
              <Key className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                disabled={lockoutState.isLocked || isLoading}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-black/50 border border-white/15 text-white placeholder-gray-500 text-sm focus:outline-hidden focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all disabled:opacity-50 font-mono"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Quick Demo Credentials Autofill */}
          <div className="pt-1">
            <button
              type="button"
              onClick={handleFillDemoAdmin}
              className="w-full py-2 px-3 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-medium transition-colors cursor-pointer flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <KeyRound className="w-3.5 h-3.5 text-amber-400" />
                <span>Fill Demo Admin Credentials</span>
              </div>
              <span className="text-[10px] text-amber-400/80">admin@arkdental.com</span>
            </button>
          </div>

          {/* Submit Action */}
          <div className="pt-2 space-y-2">
            <button
              type="submit"
              disabled={lockoutState.isLocked || isLoading}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-600 hover:from-amber-500 hover:to-yellow-500 text-gray-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-amber-900/30 transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Verifying Admin Credentials...</span>
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>Authenticate & Open Admin Portal</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleClose}
              className="w-full py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 text-xs font-medium transition-colors cursor-pointer flex items-center justify-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Cancel & Return to User Portal</span>
            </button>
          </div>
        </form>

        {/* Security Footer Notice */}
        <div className="px-6 py-3 bg-black/70 border-t border-white/5 text-[11px] text-gray-500 flex items-center justify-between">
          <span>Role-Based Access: <strong className="text-gray-400">admin_only</strong></span>
          <span>Max 5 attempts • 2s window</span>
        </div>
      </div>
    </div>
  );
};
