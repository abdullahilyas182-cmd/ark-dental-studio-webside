import React, { useState, useEffect, useRef } from 'react';
import { RATE_LIMIT_CONFIG } from '../../utils/security';

interface DoctorPortalIconProps {
  onTriggerSequence: () => void;
  className?: string;
  size?: 'xs' | 'sm' | 'md';
}

export const DoctorPortalIcon: React.FC<DoctorPortalIconProps> = ({
  onTriggerSequence,
  className = '',
  size = 'xs'
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

    // Subtle tactile animation
    setAnimating(true);
    setTimeout(() => setAnimating(false), 150);

    let nextCount = 1;
    // Taps within 2.5s window are considered consecutive
    if (tapCount > 0 && timeSinceLastTap <= 2500) {
      nextCount = tapCount + 1;
    }

    setLastTapTime(now);
    setTapCount(nextCount);

    if (resetTimerRef.current) {
      clearTimeout(resetTimerRef.current);
    }

    if (nextCount >= 3) {
      // 3 consecutive taps triggered: reset counter and open Doctor Login screen
      setTapCount(0);
      onTriggerSequence();
    } else {
      // Reset silently if tapping stops
      resetTimerRef.current = setTimeout(() => {
        setTapCount(0);
      }, 2500);
    }
  };

  const dimensionClasses = {
    xs: 'w-6 h-6',
    sm: 'w-8 h-8',
    md: 'w-11 h-11 sm:w-12 sm:h-12'
  };

  return (
    <button
      id="doctorLogoTrigger"
      type="button"
      onClick={handleTap}
      aria-label="ARK Dental Studio"
      title="ARK Dental Studio"
      className={`relative inline-flex items-center justify-center rounded-full overflow-hidden shrink-0 border border-[#B59975]/70 bg-[#1A140F] shadow-[0_0_12px_rgba(181,153,117,0.35)] transition-all cursor-pointer select-none focus:outline-hidden ${
        dimensionClasses[size]
      } ${animating ? 'scale-90 opacity-75' : 'hover:scale-105 hover:border-[#B59975] hover:shadow-[0_0_16px_rgba(181,153,117,0.5)]'} ${className}`}
    >
      <img
        src="/images/ark_logo_clear.png"
        alt="ARK Dental Studio"
        referrerPolicy="no-referrer"
        className="w-full h-full object-cover object-center pointer-events-none select-none contrast-[1.08] brightness-[1.04]"
        onError={(e) => {
          const target = e.currentTarget;
          if (target.src.includes('clear.png')) {
            target.src = '/images/ark_logo.jpg';
          }
        }}
      />
      <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-white/20 pointer-events-none" />
    </button>
  );
};
