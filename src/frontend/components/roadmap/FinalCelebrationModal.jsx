import React from 'react';

export default function FinalCelebrationModal({ totalXp, onReturnToHall, onResetJourney, onClose }) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="celebration-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-500"
    >
      <div className="bg-gradient-to-b from-[#1E1738] to-[#0D0A1C] border-2 border-yellow-400 pixel-corners max-w-lg w-full p-6 text-center space-y-5 shadow-[0_0_50px_rgba(250,204,21,0.5)] relative overflow-hidden animate-in zoom-in-95 duration-400">
        {/* Ambient Celebration Light Glow */}
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-64 h-64 bg-yellow-500/20 blur-3xl rounded-full pointer-events-none"></div>

        {/* Character Fusion Display */}
        <div className="flex items-center justify-center gap-3 pt-2">
          <div className="w-16 h-16 bg-black/60 border-2 border-yellow-400 rounded-full flex items-center justify-center text-3xl shadow-[0_0_20px_rgba(250,204,21,0.6)] animate-bounce">
            🐱
          </div>
          <span className="text-2xl text-yellow-300 font-bold animate-pulse">❤️</span>
          <div className="w-16 h-16 bg-black/60 border-2 border-yellow-400 rounded-full flex items-center justify-center text-3xl shadow-[0_0_20px_rgba(250,204,21,0.6)] animate-bounce delay-150">
            🍖
          </div>
        </div>

        {/* Headlines */}
        <div className="space-y-1.5">
          <span className="font-vt323 text-sm bg-yellow-950/80 border border-yellow-500 text-yellow-300 px-3 py-0.5 rounded-full inline-block">
            ★ ALL 16 MILESTONES MASTERED ★
          </span>
          <h2 id="celebration-title" className="font-orbitron font-extrabold text-2xl sm:text-3xl text-yellow-300 drop-shadow-[0_0_12px_rgba(250,204,21,0.7)]">
            JOURNEY COMPLETE!
          </h2>
          <p className="font-vt323 text-base sm:text-lg text-cyan-200 max-w-md mx-auto">
            « You started with HTML and travelled all the way to building full-stack backend applications. The Cat has finally reached the feast! »
          </p>
        </div>

        {/* XP & Certificate Summary Card */}
        <div className="bg-[#120F24] border border-purple-500/50 p-4 rounded-lg space-y-2">
          <div className="flex justify-between items-center text-xs font-orbitron border-b border-gray-800 pb-2">
            <span className="text-gray-400">TOTAL MASTERY REWARD</span>
            <span className="text-yellow-400 font-bold">+{totalXp || 1485} XP</span>
          </div>
          <div className="flex justify-between items-center text-xs font-orbitron border-b border-gray-800 pb-2">
            <span className="text-gray-400">RANK ATTAINED</span>
            <span className="text-cyan-400 font-bold">FULL-STACK ARCHITECT</span>
          </div>
          <div className="flex justify-between items-center text-xs font-orbitron">
            <span className="text-gray-400">COMPLETION STATUS</span>
            <span className="text-green-400 font-bold">100% VERIFIED</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2.5 bg-gray-900 hover:bg-gray-800 text-gray-300 border border-gray-700 font-vt323 text-base rounded pixel-corners-sm transition-colors cursor-pointer"
          >
            [ View Completed Map ]
          </button>

          <button
            onClick={onReturnToHall}
            className="w-full sm:w-auto px-5 py-2.5 bg-gradient-to-r from-yellow-600 to-amber-600 hover:from-yellow-500 hover:to-amber-500 text-black font-orbitron text-xs font-bold rounded pixel-corners-sm shadow-[0_0_15px_rgba(245,158,11,0.6)] transition-all cursor-pointer"
          >
            [ Return to Great Hall ]
          </button>
        </div>

        <div className="pt-1">
          <button
            onClick={onResetJourney}
            className="font-vt323 text-xs text-red-400/80 hover:text-red-300 underline cursor-pointer"
          >
            Restart Journey from Beginning
          </button>
        </div>
      </div>
    </div>
  );
}
