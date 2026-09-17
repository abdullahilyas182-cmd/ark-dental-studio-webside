import React from 'react';

interface ArkLogoProps {
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  variant?: 'clear' | 'badge';
}

export const ArkLogo: React.FC<ArkLogoProps> = ({ 
  className = '', 
  size = 'md',
  showText = false,
  variant = 'clear'
}) => {
  const sizeClasses = {
    xs: 'w-6 h-6',
    sm: 'w-8 h-8',
    md: 'w-11 h-11',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24 sm:w-28 sm:h-28'
  };

  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      {/* Authentic ARK Dental Studio Circular Backlit Sign - Enhanced Clear Resolution */}
      <div 
        className={`relative ${sizeClasses[size]} rounded-full overflow-hidden shrink-0 transition-transform duration-300 hover:scale-105 border border-[#B59975]/70 shadow-[0_0_12px_rgba(181,153,117,0.35)] bg-[#1A140F]`}
        style={{
          boxShadow: '0 0 14px rgba(181, 153, 117, 0.3)'
        }}
      >
        <img
          src="/images/ark_logo_clear.png"
          alt="ARK Dental Studio Logo"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center contrast-[1.08] brightness-[1.04]"
          onError={(e) => {
            const target = e.currentTarget;
            if (target.src.includes('clear.png')) {
              target.src = '/images/ark_logo.jpg';
            }
          }}
        />
        {/* Subtle radial inner glow and hairline bezel */}
        <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-white/20 pointer-events-none" />
      </div>

      {showText && (
        <div className="flex flex-col text-left">
          <span className="font-bodoni text-lg sm:text-xl tracking-[0.18em] font-normal leading-none text-current">
            ARK
          </span>
          <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.3em] text-[#B59975] font-semibold mt-1">
            DENTAL STUDIO
          </span>
        </div>
      )}
    </div>
  );
};


