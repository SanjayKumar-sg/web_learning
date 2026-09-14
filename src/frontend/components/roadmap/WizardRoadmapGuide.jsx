import React from 'react';

export default function WizardRoadmapGuide({ wizardState, onDismiss }) {
  if (!wizardState?.visible) return null;

  return (
    <aside aria-label="Wizard Guide" className="fixed bottom-6 right-6 z-40 max-w-sm sm:max-w-md animate-in slide-in-from-bottom-4 fade-in duration-300 pointer-events-auto select-none">
      <div className="bg-[#151326]/95 border-2 border-purple-500/70 pixel-corners p-3.5 shadow-[0_0_30px_rgba(168,85,247,0.45)] backdrop-blur-md flex items-start gap-3 relative">
        {/* Wizard Avatar Icon */}
        <div className="relative shrink-0 w-12 h-12 sm:w-14 sm:h-14 bg-[#0B0A16] border border-purple-400/60 rounded flex items-center justify-center overflow-hidden shadow-inner">
          <img
            src="/assets/wizard/wizard_explaining.png"
            alt="Sage Byterion Guide"
            className="w-full h-full object-contain filter drop-shadow-[0_0_8px_rgba(168,85,247,0.6)] animate-pixel-bob"
            style={{ imageRendering: 'pixelated' }}
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.parentElement.innerHTML = '<span class="text-2xl">🧙‍♂️</span>';
            }}
          />
        </div>

        {/* Speech Bubble Content */}
        <div className="flex-1 space-y-1">
          <div className="flex items-center justify-between border-b border-purple-900/60 pb-1">
            <span className="font-orbitron text-[10px] sm:text-xs font-bold text-yellow-400 tracking-wider">
              {wizardState.title || 'SAGE BYTERION // ROADMAP GUIDE'}
            </span>
            <button
              onClick={onDismiss}
              className="text-gray-400 hover:text-white font-pixel text-xs px-1 hover:bg-white/10 rounded transition-colors cursor-pointer"
              title="Dismiss Guide"
            >
              ✕
            </button>
          </div>

          <p className="font-vt323 text-base sm:text-lg text-cyan-200 leading-snug">
            "{wizardState.message}"
          </p>

          <div className="pt-1 flex justify-end">
            <button
              onClick={onDismiss}
              className="font-vt323 text-xs sm:text-sm bg-purple-950/80 hover:bg-purple-900 text-purple-200 hover:text-white border border-purple-600/50 px-2.5 py-0.5 rounded pixel-corners-sm transition-all cursor-pointer shadow-[0_0_10px_rgba(147,51,234,0.3)]"
            >
              [ UNDERSTOOD → ]
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
