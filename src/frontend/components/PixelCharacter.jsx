import React from 'react';

/**
 * Original Student Coder Pixel Character.
 * Features:
 * - Cyber hoodie & backpack
 * - Headphones with glowing earcups
 * - Open glowing laptop / coding terminal in hands
 * - 4-step walk cycle animation
 */
export default function PixelCharacter({
  isWalking = true,
  scale = 1,
  direction = 'right',
  screenGlow = true,
  className = '',
}) {
  return (
    <div
      className={`relative inline-block select-none ${className}`}
      style={{
        transform: `scale(${scale}) ${direction === 'left' ? 'scaleX(-1)' : ''}`,
        transformOrigin: 'bottom center',
      }}
      aria-label="Pixel Coder Character"
    >
      <svg
        viewBox="0 0 32 36"
        className={`w-12 h-14 sm:w-14 sm:h-16 ${
          isWalking ? 'animate-character-walk-cycle' : ''
        } drop-shadow-[0_4px_10px_rgba(139,92,246,0.4)]`}
        shapeRendering="crispEdges"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* === BACKPACK (Left side when facing right) === */}
        <rect x="4" y="14" width="4" height="10" fill="#4C1D95" />
        <rect x="3" y="15" width="2" height="8" fill="#6D28D9" />
        <rect x="4" y="16" width="1" height="6" fill="#A78BFA" />

        {/* === HAIR & HOODIE CAP === */}
        <rect x="10" y="4" width="12" height="8" fill="#1E1A38" />
        <rect x="9" y="5" width="14" height="6" fill="#2E1065" />
        <rect x="8" y="7" width="3" height="4" fill="#3B0764" />
        <rect x="11" y="3" width="10" height="2" fill="#3B0764" />

        {/* Hair Bangs (Pixel details) */}
        <rect x="18" y="6" width="3" height="2" fill="#581C87" />
        <rect x="13" y="6" width="2" height="2" fill="#581C87" />

        {/* === FACE === */}
        <rect x="13" y="7" width="9" height="7" fill="#FED7AA" />
        <rect x="14" y="6" width="7" height="1" fill="#FDBA74" />
        
        {/* Eye (Pixel Coder Focus) */}
        <rect x="18" y="9" width="2" height="2" fill="#090814" />
        <rect x="19" y="9" width="1" height="1" fill="#22D3EE" />

        {/* Blush / Cheek */}
        <rect x="18" y="12" width="2" height="1" fill="#FB7185" opacity="0.8" />

        {/* === HEADPHONES (Cyber Violet & Cyan) === */}
        <rect x="10" y="7" width="3" height="5" fill="#8B5CF6" />
        <rect x="11" y="8" width="1" height="3" fill="#22D3EE" />
        {/* Headband */}
        <rect x="11" y="3" width="8" height="1" fill="#8B5CF6" />

        {/* === TORSO / HOODIE === */}
        <rect x="8" y="14" width="12" height="10" fill="#7C3AED" />
        <rect x="9" y="13" width="10" height="2" fill="#8B5CF6" />
        {/* Hoodie Center Zipper/Accent */}
        <rect x="13" y="15" width="2" height="9" fill="#5B21B6" />
        {/* Chest Code Icon < / > */}
        <rect x="10" y="17" width="1" height="3" fill="#22D3EE" />
        <rect x="11" y="18" width="1" height="1" fill="#22D3EE" />

        {/* === ARMS & LAPTOP IN HANDS === */}
        {/* Arm / Sleeve */}
        <rect x="14" y="16" width="4" height="4" fill="#6D28D9" />
        <rect x="17" y="18" width="3" height="3" fill="#FED7AA" />

        {/* Open Pixel Laptop / Terminal */}
        <rect x="19" y="16" width="2" height="7" fill="#334155" />
        <rect x="20" y="17" width="1" height="5" fill="#22D3EE" />
        <rect x="19" y="21" width="7" height="2" fill="#1E293B" />
        <rect x="20" y="20" width="5" height="1" fill="#475569" />

        {/* Laptop Screen Cyber Glow */}
        {screenGlow && (
          <g className="animate-pulse">
            <rect x="21" y="15" width="2" height="2" fill="#22D3EE" opacity="0.6" />
            <rect x="20" y="18" width="1" height="1" fill="#FFFFFF" />
          </g>
        )}

        {/* === LEGS & SHOES (Stepping Walk Frame) === */}
        {/* Left Leg / Pant */}
        <g className="char-leg-left">
          <rect x="10" y="24" width="4" height="6" fill="#1E1B4B" />
          {/* Cyan High-top Pixel Sneaker */}
          <rect x="9" y="30" width="5" height="3" fill="#22D3EE" />
          <rect x="8" y="31" width="2" height="2" fill="#FFFFFF" />
          <rect x="9" y="32" width="5" height="1" fill="#0E7490" />
        </g>

        {/* Right Leg / Pant */}
        <g className="char-leg-right">
          <rect x="15" y="24" width="4" height="6" fill="#2E1065" />
          {/* Purple High-top Pixel Sneaker */}
          <rect x="15" y="30" width="5" height="3" fill="#8B5CF6" />
          <rect x="19" y="31" width="2" height="2" fill="#FFFFFF" />
          <rect x="15" y="32" width="5" height="1" fill="#581C87" />
        </g>

        {/* Subtle Ground Contact Shadow */}
        <ellipse cx="15" cy="34" rx="8" ry="1.5" fill="#05050D" opacity="0.6" />
      </svg>
    </div>
  );
}
