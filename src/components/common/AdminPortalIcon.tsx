import React, { useState, useEffect, useRef } from 'react';
import { ShieldCheck, Shield } from 'lucide-react';
import { RATE_LIMIT_CONFIG } from '../../utils/security';

interface AdminPortalIconProps {
  onTriggerSequence: () => void;
  className?: string;
}

export const AdminPortalIcon: React.FC<AdminPortalIconProps> = ({
  onTriggerSequence,
  className = ''
}) => {
  const [tapCount, setTapCount] = useState<number>(0);
  const [lastTapTime, setLastTapTime] = useState<number>(0);
  const [animating, setAnimating] = useState<boolean>(false);
  const resetTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Clear timer on unmount
  useEffect(() => {
    return () => {
      if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
    };
  }, []);

  const handleTap = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const now = Date.now();
    const timeSinceLastTap = now - lastTapTime;

    // Trigger subtle click ripple
    setAnimating(true);
    setTimeout(() => setAnimating(false), 200);

    let nextCount = 1;
    // Exactly 2-second tap window (RATE_LIMIT_CONFIG.TAP_WINDOW_MS = 2000ms)
    if (tapCount > 0 && timeSinceLastTap <= RATE_LIMIT_CONFIG.TAP_WINDOW_MS) {
      nextCount = tapCount + 1;
    }

    setLastTapTime(now);
    setTapCount(nextCount);

    if (resetTimerRef.current) {
      clearTimeout(resetTimerRef.current);
    }

    // Required 3 consecutive taps
    if (nextCount >= RATE_LIMIT_CONFIG.REQUIRED_TAPS) {
      setTapCount(0);
      onTriggerSequence();
    } else {
      resetTimerRef.current = setTimeout(() => {
        setTapCount(0);
      }, RATE_LIMIT_CONFIG.TAP_WINDOW_MS);
    }
  };

  return (
    <div className="relative inline-flex items-center">
      <button
        id="adminPortalIcon"
        type="button"
        onClick={handleTap}
        aria-label="Administrative Compliance Seal (Tap 3 times consecutively to unlock Admin Login)"
        title={
          tapCount > 0 
            ? `Admin Gate: ${tapCount}/3 (Tap ${3 - tapCount} more time${3 - tapCount === 1 ? '' : 's'} consecutively)`
            : "ARK Administrative Security Seal"
        }
        className={`relative w-7 h-7 rounded-md flex items-center justify-center transition-all cursor-pointer select-none focus:outline-hidden ${
          animating ? 'scale-90 bg-amber-500/30' : 'hover:scale-105'
        } ${
          tapCount > 0
            ? 'bg-amber-500/20 text-amber-400 ring-1 ring-amber-400/60'
            : 'text-gray-500 hover:text-amber-400 hover:bg-white/5'
        } ${className}`}
      >
        <ShieldCheck className="w-3.5 h-3.5 transition-transform" />

        {/* Micro Tap Sequence Progress Indicators (Feedback for consecutive taps) */}
        {tapCount > 0 && (
          <span className="absolute -top-1.5 -right-1.5 flex items-center justify-center min-w-4 h-4 bg-amber-500 text-gray-950 text-[9px] font-bold px-1 rounded-full shadow-md animate-in fade-in zoom-in duration-150">
            {tapCount}/3
          </span>
        )}
      </button>
    </div>
  );
};
