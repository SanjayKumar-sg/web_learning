import React from 'react';

/**
 * Game-inspired Level & XP indicator bar
 */
export default function XPBar({
  level = 1,
  currentXP = 30,
  maxXP = 100,
  questBonus = '+50 XP ON LOGIN',
  className = '',
}) {
  const percentage = Math.min(Math.max((currentXP / maxXP) * 100, 0), 100);

  return (
    <div className={`w-full bg-[#0F0D1E]/90 border border-[#2A264F] rounded-lg p-3 ${className}`}>
      <div className="flex items-center justify-between gap-2 mb-1.5">
        {/* Level Badge */}
        <div className="flex items-center gap-1.5">
          <span className="font-pixel text-[10px] text-[#FACC15] bg-[#FACC15]/15 border border-[#FACC15]/40 px-2 py-0.5 rounded tracking-wider shadow-[0_0_8px_rgba(250,204,21,0.2)]">
            LV. {level < 10 ? `0${level}` : level}
          </span>
          <span className="text-[11px] font-mono-code text-[#A1A1AA] uppercase tracking-wide">
            Player Status: <span className="text-[#22D3EE] font-medium">Cadet</span>
          </span>
        </div>

        {/* XP Fraction */}
        <div className="text-right">
          <span className="font-mono-code text-[11px] font-medium text-[#F8FAFC]">
            XP <span className="text-[#22D3EE]">{currentXP}</span>/{maxXP}
          </span>
        </div>
      </div>

      {/* Progress Track */}
      <div className="relative w-full h-2.5 bg-[#090814] rounded-sm overflow-hidden border border-[#2A264F]/80 p-[1px]">
        {/* Fill */}
        <div
          className="h-full rounded-xs xp-shimmer-bar transition-all duration-700 ease-out shadow-[0_0_10px_rgba(34,211,238,0.5)]"
          style={{ width: `${percentage}%` }}
        />
      </div>

      {/* Quest Bonus Note */}
      {questBonus && (
        <div className="flex items-center justify-between mt-1.5 text-[10px] font-mono-code text-[#A1A1AA]">
          <span className="flex items-center gap-1">
            <span className="text-[#FACC15]">⚡</span> {questBonus}
          </span>
          <span className="text-[#64748B]">STAGE: AUTH</span>
        </div>
      )}
    </div>
  );
}
