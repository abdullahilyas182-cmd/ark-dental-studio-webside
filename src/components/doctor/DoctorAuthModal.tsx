import React, { useState } from 'react';
import { useClinic } from '../../context/ClinicContext';
import { Lock, Shield, Check, Key, UserCheck } from 'lucide-react';

interface DoctorAuthModalProps {
  isAuthenticated: boolean;
  onAuthenticated: () => void;
}

export const DoctorAuthModal: React.FC<DoctorAuthModalProps> = ({
  isAuthenticated,
  onAuthenticated
}) => {
  const { doctors, activeDoctorId, setActiveDoctorId } = useClinic();
  const [pin, setPin] = useState('2026');
  const [role, setRole] = useState<'doctor' | 'staff'>('doctor');
  const [error, setError] = useState('');

  if (isAuthenticated) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin.length >= 4) {
      onAuthenticated();
    } else {
      setError('Please enter a 4-digit security PIN (Demo default: 2026)');
    }
  };

  const handleQuickDemoLogin = (docId: string) => {
    setActiveDoctorId(docId);
    onAuthenticated();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-[#FAF6F0] w-full max-w-md rounded-2xl shadow-2xl border border-[#E8DFD3] overflow-hidden">
        {/* Header */}
        <div className="bg-[#4A2E18] text-[#FAF6F0] p-6 text-center border-b border-[#3D2614]">
          <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mx-auto mb-3 shadow-inner text-[#D8BE9B]">
            <Shield className="w-6 h-6" />
          </div>
          <h3 className="font-serif font-bold text-xl text-[#FAF6F0]">
            Clinical Practitioner Portal
          </h3>
          <p className="text-xs text-[#E8DFD3]/80 mt-1">
            ARK Dental Studio • Protected Electronic Health Records
          </p>
        </div>

        <div className="p-6 space-y-5">
          <div className="bg-[#F5ECE1] border border-[#D8BE9B] rounded-xl p-3 text-xs text-[#4A3B32] flex items-start gap-2">
            <Lock className="w-4 h-4 text-[#4A2E18] shrink-0 mt-0.5" />
            <div>
              <strong className="text-[#4A2E18]">Secure Separation:</strong> This portal is isolated from the public marketing interface. Access requires authorized clinical PIN or one-click demo credentials below.
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Select Practitioner Profile
              </label>
              <div className="space-y-2">
                {doctors.map((d) => (
                  <button
                    key={d.id}
                    type="button"
                    onClick={() => setActiveDoctorId(d.id)}
                    className={`w-full p-2.5 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                      activeDoctorId === d.id
                        ? 'border-[#4A2E18] bg-white shadow-xs'
                        : 'border-[#E8DFD3] bg-[#FAF6F0] hover:bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={d.avatar}
                        alt={d.name}
                        className="w-9 h-9 rounded-full object-cover border border-[#E8DFD3]"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <div className="text-xs font-bold text-[#2B2B2B]">{d.name}</div>
                        <div className="text-[10px] text-[#4A2E18] font-medium">{d.title}</div>
                      </div>
                    </div>
                    {activeDoctorId === d.id && (
                      <Check className="w-4 h-4 text-[#4A2E18]" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Clinical PIN / Passkey
              </label>
              <div className="relative">
                <Key className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                <input
                  type="password"
                  value={pin}
                  onChange={(e) => {
                    setPin(e.target.value);
                    setError('');
                  }}
                  placeholder="Demo PIN: 2026"
                  className="w-full pl-9 pr-3 py-2 text-sm bg-white rounded-lg border border-[#E8DFD3] focus:outline-hidden focus:border-[#4A2E18]"
                />
              </div>
              {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-[#4A2E18] hover:bg-[#3D2614] text-[#FAF6F0] text-xs font-semibold rounded-xl shadow-sm transition-colors cursor-pointer"
            >
              Authenticate & Open Clinic OS
            </button>
          </form>

          {/* Quick Demo Access */}
          <div className="pt-2 border-t border-[#E8DFD3] flex items-center justify-between">
            <span className="text-[11px] text-gray-500">Fast Demo Bypass:</span>
            <button
              onClick={() => handleQuickDemoLogin('doc-1')}
              className="text-xs font-semibold text-[#4A2E18] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <UserCheck className="w-3.5 h-3.5" />
              Sign in as Dr. Muhammad Ali Riaz Khan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
