import React, { useState } from 'react';

/**
 * Sage Byterion - The Short-Form Roadmap Adventure Guide.
 *
 * Adheres strictly to Master Prompt Rules:
 * - NOT a detailed lecturer or documentation page.
 * - Concise, conversational speech bubble (max 4 lines / 1-3 sentences).
 * - Animated pre-existing character posture.
 * - Dynamic Left/Right Docking: If the next node is on the right, the guide
 *   docks on the LEFT so the next node is 100% visible and unobstructed!
 * - Collapsible/Minimizable Companion: Users can minimize to a sleek floating badge.
 */
export default function WizardRoadmapGuide({
  wizardState,
  activeMilestone,
  nextMilestone,
  state,
  catAnimation = 'idle',
  onDismiss,
  onAdvance,
  onCenterHero,
  onReturnToObjective
}) {
  const [isMinimized, setIsMinimized] = useState(false);

  // Determine if the active milestone or next objective is positioned on the right
  // (Milestones with x > 1000 are in the right half of the overworld)
  const isTargetOnRight = (activeMilestone?.x ?? 1000) > 1000;
  const dockPositionClass = isTargetOnRight
    ? 'bottom-10 left-4 sm:left-8'
    : 'bottom-10 right-4 sm:right-8';

  // Pre-existing wizard character posture matching engine state
  const getWizardImage = () => {
    if (catAnimation === 'jumping') return '/assets/wizard/wizard_casting.png';
    if (catAnimation === 'celebrating' || catAnimation === 'finale' || wizardState?.isChasePoint) {
      return '/assets/wizard/wizard_happy.png';
    }
    return '/assets/wizard/wizard_explaining.png';
  };

  if (!wizardState?.visible) {
    return (
      <button
        onClick={onCenterHero}
        className={`fixed ${dockPositionClass} z-40 bg-[#14102C]/95 hover:bg-purple-900 border-2 border-purple-400 text-yellow-300 font-vt323 text-sm px-3.5 py-2 rounded-lg shadow-[0_0_20px_rgba(168,85,247,0.7)] flex items-center gap-2 cursor-pointer transition-all animate-bounce`}
        title="Recenter camera to Cat & Active Objective"
      >
        <span className="text-base">🎯</span>
        <span>[ RECENTER TARGET ]</span>
      </button>
    );
  }

  // Minimized Floating Companion Badge (Full Map Visibility)
  if (isMinimized) {
    return (
      <aside
        aria-label="Sage Byterion Companion (Minimized)"
        className={`fixed ${dockPositionClass} z-40 flex items-center gap-3 bg-[#100D24]/95 border-2 border-yellow-400/90 rounded-full px-4 py-2 shadow-[0_0_30px_rgba(250,204,21,0.55)] backdrop-blur-2xl animate-in fade-in cursor-pointer hover:scale-105 transition-all select-none group`}
        onClick={() => setIsMinimized(false)}
        title="Click to expand Sage Byterion's Codex Guide"
      >
        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-yellow-400 bg-purple-950 p-0.5 shrink-0 shadow-[0_0_10px_rgba(250,204,21,0.5)]">
          <img
            src={getWizardImage()}
            alt="Sage Byterion"
            className="w-full h-full object-contain animate-pixel-bob"
            style={{ imageRendering: 'pixelated' }}
          />
        </div>
        <div className="flex flex-col text-left">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-yellow-400 animate-ping"></span>
            <span className="font-orbitron text-[10px] font-black text-yellow-300 tracking-wider">
              SAGE BYTERION
            </span>
          </div>
          <span className="font-vt323 text-xs text-cyan-300 group-hover:text-yellow-200 transition-colors">
            [ 💬 CLICK TO EXPAND CODEX ]
          </span>
        </div>
        {onCenterHero && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onCenterHero();
            }}
            className="ml-1 font-vt323 text-xs bg-cyan-950/80 hover:bg-cyan-800 text-cyan-200 px-2.5 py-1 rounded border border-cyan-400/50 shadow-sm cursor-pointer"
            title="Center Target"
          >
            🎯
          </button>
        )}
      </aside>
    );
  }

  return (
    <aside
      aria-label="Sage Byterion Adventure Guide"
      className={`fixed ${dockPositionClass} z-40 max-w-xl sm:max-w-2xl w-[calc(100vw-2rem)] pointer-events-auto select-none animate-in slide-in-from-bottom-5 fade-in duration-300`}
    >
      <div className="relative bg-[#100D24]/95 border-2 sm:border-3 border-yellow-400/90 rounded-2xl p-5 sm:p-6 shadow-[0_0_50px_rgba(0,0,0,0.95),0_0_35px_rgba(250,204,21,0.4)] backdrop-blur-2xl flex gap-4 sm:gap-5 items-start">
        {/* Ambient Top Glow */}
        <div className="absolute -top-10 left-12 w-36 h-20 bg-yellow-500/25 blur-2xl rounded-full pointer-events-none"></div>

        {/* Wizard Character Avatar (Bigger & Crisp) */}
        <div className="relative shrink-0 flex flex-col items-center">
          <div className="w-22 h-22 sm:w-28 sm:h-28 bg-gradient-to-b from-[#251D4B] via-[#151030] to-[#0A0718] border-2 sm:border-3 border-yellow-400 rounded-xl flex items-center justify-center p-1.5 shadow-[0_0_20px_rgba(250,204,21,0.55)] overflow-hidden">
            <img
              src={getWizardImage()}
              alt="Sage Byterion Guide"
              className="w-full h-full object-contain filter drop-shadow-[0_0_8px_rgba(168,85,247,0.85)] animate-pixel-bob transition-all duration-200"
              style={{ imageRendering: 'pixelated' }}
              onError={(e) => {
                e.target.src = '/assets/wizard/wizard_explaining.png';
              }}
            />
          </div>
          <span className="font-orbitron text-[10px] sm:text-xs font-black text-yellow-300 mt-1.5 tracking-wider">
            SAGE BYTERION
          </span>
        </div>

        {/* Speech Bubble Content */}
        <div className="flex-1 space-y-2.5">
          {/* Header Row: Chapter Badge, Minimize & Dismiss */}
          <div className="flex items-center justify-between border-b border-purple-800/70 pb-1.5">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-400 animate-ping"></span>
              <span className="font-orbitron text-xs sm:text-sm font-extrabold text-yellow-300 tracking-wider">
                {wizardState.chapterTitle ? `CHAPTER ${wizardState.chapter || 1} • ${wizardState.chapterTitle.toUpperCase()}` : (wizardState.title || 'ROADMAP GUIDE')}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setIsMinimized(true)}
                aria-label="Minimize Guide"
                className="text-gray-400 hover:text-yellow-300 font-bold text-sm px-2 py-0.5 hover:bg-white/10 rounded transition-colors cursor-pointer"
                title="Minimize Guide to view full map"
              >
                ▾
              </button>
              <button
                onClick={onDismiss}
                aria-label="Dismiss Guide"
                className="text-gray-400 hover:text-white font-bold text-sm px-2 py-0.5 hover:bg-white/10 rounded transition-colors cursor-pointer"
                title="Dismiss Guide"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Core 1–3 Sentence Concise Dialogue — ISSUE-02: text-xl/2xl prevents overflow */}
          <div className="font-vt323 text-xl sm:text-2xl text-yellow-100 leading-snug whitespace-pre-line tracking-wide">
            "{wizardState.message}"
          </div>

          {/* Quick Progression Footer Buttons */}
          <div className="pt-2 flex items-center justify-between gap-3 border-t border-purple-900/60">
            {onCenterHero && (
              <button
                onClick={onCenterHero}
                className="font-vt323 text-sm sm:text-base text-cyan-300 hover:text-white flex items-center gap-1.5 cursor-pointer transition-colors"
                title="Center Camera on Target"
              >
                <span className="text-base">🎯</span>
                <span>[ Center Target ]</span>
              </button>
            )}

            {/* If in recap mode: Provide Return to Objective CTA */}
            {wizardState?.isRecap ? (
              <button
                onClick={() => {
                  if (onReturnToObjective) onReturnToObjective();
                  if (onCenterHero) onCenterHero();
                }}
                className="font-vt323 text-base sm:text-lg bg-cyan-900/90 hover:bg-cyan-800 text-cyan-200 hover:text-white border border-cyan-500/70 font-bold px-4 py-1.5 sm:px-5 sm:py-2 rounded-lg pixel-corners-sm shadow-[0_0_16px_rgba(6,182,212,0.5)] cursor-pointer transition-transform active:scale-95 flex items-center gap-2"
              >
                <span>RETURN TO QUEST ({activeMilestone?.title ? activeMilestone.title.toUpperCase() : 'OBJECTIVE'})</span>
                <span>➔</span>
              </button>
            ) : onAdvance && !state?.isFinished ? (
              <button
                onClick={onAdvance}
                className="font-vt323 text-base sm:text-lg bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-amber-400 text-[#0F0D1E] font-extrabold px-4 py-1.5 sm:px-5 sm:py-2 rounded-lg pixel-corners-sm shadow-[0_0_16px_rgba(250,204,21,0.65)] cursor-pointer transition-transform active:scale-95 flex items-center gap-2"
                title={`Advance Cat to ${activeMilestone?.title || 'Next Goal'}`}
              >
                <span>▶ ADVANCE: {activeMilestone?.title ? activeMilestone.title.toUpperCase() : 'NEXT GOAL'}</span>
                <span>➔</span>
              </button>
            ) : (
              <button
                onClick={onDismiss}
                className="font-vt323 text-sm sm:text-base bg-purple-950 hover:bg-purple-900 text-purple-200 hover:text-white border border-purple-600/50 px-3 py-1.5 rounded-lg pixel-corners-sm cursor-pointer transition-colors"
              >
                [ UNDERSTOOD ]
              </button>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
}
