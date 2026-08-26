import React from 'react';

/**
 * Retro-modern Game HUD Overlay:
 * - Player identity / Level / Quest Status
 * - Server & World Location
 * - Motion toggle for accessibility
 */
export default function GameHUD({
  level = 1,
  playerName = 'PLAYER_01',
  questName = 'QUEST: AUTHENTICATE',
  isMotionReduced = false,
  onToggleMotion,
}) {
  return (
    <header className="relative z-20 w-full max-w-5xl flex items-center justify-between py-2 px-3 sm:px-4 mb-4 sm:mb-6 text-xs font-mono-code border border-[#2A264F] bg-[#151326]/85 backdrop-blur-md rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.5),0_0_20px_rgba(139,92,246,0.15)]">
      {/* Left: Player ID & Level */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Pulsing Status Dot */}
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#10B981]" />
        </span>

        <div className="flex items-center gap-1.5">
          <span className="font-pixel text-[9px] text-[#FACC15] bg-[#FACC15]/15 border border-[#FACC15]/40 px-1.5 py-0.5 rounded">
            LV.{level < 10 ? `0${level}` : level}
          </span>
          <span className="text-[#F8FAFC] font-semibold text-[11px] tracking-wider hidden sm:inline">
            {playerName}
          </span>
        </div>

        {/* Quest Badge */}
        <div className="hidden md:flex items-center gap-1 text-[10px] font-pixel text-[#C084FC] bg-[#8B5CF6]/15 border border-[#8B5CF6]/30 px-2 py-0.5 rounded">
          <span>⚔</span>
          <span>{questName}</span>
        </div>
      </div>

      {/* Right: World Location, Server Status & Motion Toggle */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* World Marker */}
        <div className="hidden sm:flex items-center gap-1 text-[11px] text-[#A1A1AA]">
          <span>WORLD:</span>
          <span className="text-[#22D3EE] font-medium">1-1 CODE_REALM</span>
        </div>

        {/* Animation Motion Toggle */}
        <button
          type="button"
          onClick={onToggleMotion}
          title={isMotionReduced ? 'Enable full world animations' : 'Reduce motion / pause world'}
          className={`text-[10px] font-mono-code px-2 py-1 rounded transition-all border flex items-center gap-1 cursor-pointer ${
            isMotionReduced
              ? 'bg-[#FACC15]/15 border-[#FACC15]/50 text-[#FACC15]'
              : 'bg-[#1E1A38] border-[#2A264F] text-[#A1A1AA] hover:text-[#F8FAFC] hover:border-[#8B5CF6]'
          }`}
          aria-label={isMotionReduced ? 'Enable motion' : 'Reduce motion'}
        >
          <span>{isMotionReduced ? '▶' : '⏸'}</span>
          <span className="hidden xs:inline">{isMotionReduced ? 'MOTION: PAUSED' : 'WORLD: ANIMATED'}</span>
        </button>

        {/* Server Indicator */}
        <div className="flex items-center gap-1 text-[11px] text-[#A1A1AA]">
          <span className="text-[#10B981] font-semibold">ONLINE</span>
        </div>
      </div>
    </header>
  );
}
