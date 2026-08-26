import React, { useState, useEffect } from 'react';
import PixelWorldBackground from './PixelWorldBackground';
import GameHUD from './GameHUD';
import PixelAvatar from './PixelAvatar';

/**
 * AuthLayout with Animated Pixel World Background,
 * Game HUD, and RPG Menu Panel styling.
 */
export default function AuthLayout({
  children,
  currentScreen = 'login',
  avatarState = 'idle',
  headerBadge = 'PLAYER PORTAL',
  title = 'ARQ LearnHub',
  subtitle = 'Your coding adventure starts here.',
  maxWidth = 'max-w-[480px]',
}) {
  // Motion state (checks system preference + user toggle)
  const [isMotionReduced, setIsMotionReduced] = useState(false);

  useEffect(() => {
    // Check system preference on mount
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      setIsMotionReduced(true);
    }
  }, []);

  const toggleMotion = () => {
    setIsMotionReduced((prev) => !prev);
  };

  // Screen-specific quest names for the HUD
  const questMap = {
    login: 'QUEST: PLAYER LOGIN',
    signup: 'QUEST: CREATE PLAYER',
    'forgot-password': 'QUEST: RECOVERY CIPHER',
    'verify-otp': 'QUEST: VERIFY CODE',
    'reset-password': 'QUEST: ENCRYPT KEY',
  };

  return (
    <div className="relative min-h-screen w-full text-[#F8FAFC] flex flex-col justify-between items-center px-3 sm:px-6 py-4 sm:py-8 select-none overflow-x-hidden font-sans">
      {/* === ANIMATED PIXEL GAME WORLD BACKGROUND === */}
      <PixelWorldBackground isMotionReduced={isMotionReduced} />

      {/* === GAME HUD (Player Stats, Quest Log & Accessibility Controls) === */}
      <GameHUD
        level={1}
        playerName="CADET_01"
        questName={questMap[currentScreen] || 'QUEST: AUTHENTICATE'}
        isMotionReduced={isMotionReduced}
        onToggleMotion={toggleMotion}
      />

      {/* === MAIN CONTENT / AUTHENTICATION CARD === */}
      <main className="relative z-20 w-full flex flex-col items-center justify-center my-auto py-2">
        {/* Brand & Companion Mascot */}
        <div className="flex flex-col items-center text-center mb-5 max-w-lg">
          {/* Pixel Companion Avatar */}
          <div className="relative mb-2">
            <PixelAvatar state={avatarState} size="md" />
          </div>

          {/* Quest / Screen Tag */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#8B5CF6]/20 border border-[#8B5CF6]/50 text-[#DDD6FE] text-[10px] font-pixel mb-2 tracking-wider shadow-[0_0_12px_rgba(139,92,246,0.35)] backdrop-blur-sm">
            <span className="text-[#FACC15]">★</span>
            <span>{headerBadge}</span>
            <span className="text-[#FACC15]">★</span>
          </div>

          {/* ARQ LearnHub Brand Heading */}
          <h1 className="text-xl sm:text-2xl font-pixel text-[#F8FAFC] tracking-wide mb-1.5 drop-shadow-[0_2px_12px_rgba(139,92,246,0.6)]">
            {title}
          </h1>

          {/* Subtitle */}
          <p className="text-xs sm:text-sm text-[#CBD5E1] font-mono-code max-w-md">
            {subtitle}
          </p>
        </div>

        {/* Game Menu Panel / Auth Card Container */}
        <div className={`w-full ${maxWidth} transition-all duration-300`}>
          <div className="relative rounded-2xl bg-[#151326]/92 border border-[#2A264F] p-5 sm:p-8 game-card-glow backdrop-blur-xl">
            {/* Top Pixel Corner Bevels */}
            <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-[#8B5CF6] shadow-[0_0_8px_#8B5CF6]" />
            <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-[#8B5CF6] shadow-[0_0_8px_#8B5CF6]" />
            <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-[#8B5CF6] shadow-[0_0_8px_#8B5CF6]" />
            <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-[#8B5CF6] shadow-[0_0_8px_#8B5CF6]" />

            {/* Inner Form Content */}
            {children}
          </div>
        </div>
      </main>

      {/* === FOOTER GAME METADATA === */}
      <footer className="relative z-20 mt-6 sm:mt-8 text-center text-xs text-[#94A3B8] font-mono-code">
        <p className="flex items-center justify-center gap-2 flex-wrap bg-[#151326]/60 backdrop-blur-xs px-4 py-1.5 rounded-full border border-[#2A264F]/50">
          <span>🎮 ARQ LearnHub &copy; 2026</span>
          <span className="text-[#4D4585]">•</span>
          <span>Web Dev Pixel Quest</span>
          <span className="text-[#4D4585]">•</span>
          <span className="text-[#22D3EE] hover:underline cursor-pointer">Terminal Codex</span>
        </p>
      </footer>
    </div>
  );
}
