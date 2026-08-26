import React from 'react';

/**
 * Original modern pixel-art coding robot/player avatar.
 * Represents the student learner entering ARQ LearnHub.
 */
export default function PixelAvatar({ state = 'idle', size = 'md', className = '' }) {
  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-16 h-16',
    lg: 'w-20 h-20',
  }[size] || 'w-16 h-16';

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      {/* Ambient Avatar Glow */}
      <div className="absolute inset-0 bg-[#8B5CF6]/20 rounded-full blur-md animate-pulse pointer-events-none" />

      {/* SVG Pixel Character */}
      <svg
        viewBox="0 0 32 32"
        className={`${sizeClasses} relative z-10 animate-pixel-bob drop-shadow-[0_4px_12px_rgba(139,92,246,0.5)]`}
        shapeRendering="crispEdges"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Antenna */}
        <rect x="15" y="1" width="2" height="4" fill="#A78BFA" />
        <rect x="14" y="0" width="4" height="2" fill="#FACC15" />

        {/* Head Base */}
        <rect x="7" y="5" width="18" height="14" fill="#1E1A38" />
        <rect x="8" y="4" width="16" height="16" fill="#1E1A38" />
        
        {/* Head Outer Border (Pixel Shadow) */}
        <rect x="6" y="6" width="1" height="12" fill="#2A264F" />
        <rect x="25" y="6" width="1" height="12" fill="#2A264F" />
        <rect x="8" y="20" width="16" height="1" fill="#0B0A16" />

        {/* Headphones */}
        <rect x="5" y="8" width="2" height="7" fill="#8B5CF6" />
        <rect x="4" y="9" width="1" height="5" fill="#C084FC" />
        <rect x="25" y="8" width="2" height="7" fill="#8B5CF6" />
        <rect x="27" y="9" width="1" height="5" fill="#C084FC" />
        {/* Headphone Band */}
        <rect x="9" y="3" width="14" height="2" fill="#8B5CF6" />

        {/* Visor / Face Screen */}
        <rect x="9" y="7" width="14" height="9" fill="#0F0D1E" />
        <rect x="10" y="8" width="12" height="7" fill="#090814" />

        {/* Visor Cyan Glowing Eyes / Expression */}
        {state === 'idle' && (
          <>
            <rect x="11" y="9" width="3" height="3" fill="#22D3EE" />
            <rect x="12" y="10" width="1" height="1" fill="#FFFFFF" />
            <rect x="18" y="9" width="3" height="3" fill="#22D3EE" />
            <rect x="19" y="10" width="1" height="1" fill="#FFFFFF" />
            {/* Smile */}
            <rect x="14" y="13" width="4" height="1" fill="#22D3EE" />
          </>
        )}

        {state === 'typing' && (
          <>
            {/* Focused Terminal Eyes */}
            <rect x="11" y="10" width="3" height="2" fill="#22D3EE" />
            <rect x="18" y="10" width="3" height="2" fill="#22D3EE" />
            {/* Code Symbol in Visor */}
            <rect x="15" y="12" width="2" height="1" fill="#FACC15" />
          </>
        )}

        {state === 'success' && (
          <>
            {/* Happy ^ ^ Eyes */}
            <rect x="11" y="10" width="1" height="2" fill="#22D3EE" />
            <rect x="12" y="9" width="1" height="1" fill="#22D3EE" />
            <rect x="13" y="10" width="1" height="2" fill="#22D3EE" />
            
            <rect x="18" y="10" width="1" height="2" fill="#22D3EE" />
            <rect x="19" y="9" width="1" height="1" fill="#22D3EE" />
            <rect x="20" y="10" width="1" height="2" fill="#22D3EE" />
            
            <rect x="14" y="13" width="4" height="1" fill="#FACC15" />
          </>
        )}

        {/* Robot Body */}
        <rect x="10" y="21" width="12" height="8" fill="#1E1A38" />
        <rect x="11" y="20" width="10" height="1" fill="#8B5CF6" />
        
        {/* Chest Code Symbol: < / > */}
        <rect x="13" y="23" width="1" height="3" fill="#22D3EE" />
        <rect x="14" y="24" width="1" height="1" fill="#22D3EE" />
        <rect x="17" y="23" width="1" height="1" fill="#A78BFA" />
        <rect x="18" y="24" width="1" height="2" fill="#A78BFA" />

        {/* Floating Arms */}
        <rect x="8" y="23" width="2" height="4" fill="#8B5CF6" />
        <rect x="22" y="23" width="2" height="4" fill="#8B5CF6" />

        {/* Base Hover Glow Disk */}
        <rect x="12" y="29" width="8" height="2" fill="#22D3EE" opacity="0.8" />
        <rect x="14" y="31" width="4" height="1" fill="#22D3EE" opacity="0.4" />
      </svg>
    </div>
  );
}
