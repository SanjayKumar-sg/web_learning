import React, { useState } from 'react';
import { useRoadmapEngine } from '../../hooks/useRoadmapEngine';
import { ROADMAP_PHASES } from '../../../data/roadmapData';
import WizardRoadmapGuide from './WizardRoadmapGuide';
import MilestoneModal from './MilestoneModal';
import FinalCelebrationModal from './FinalCelebrationModal';

export default function RoadmapView({ onReturnToHall }) {
  const {
    state,
    milestones,
    currentMilestone,
    completedCount,
    totalMilestones,
    progressPercent,
    catState,
    foodState,
    wizardState,
    activeModalMilestone,
    showCelebration,
    openMilestoneModal,
    closeMilestoneModal,
    completeMilestone,
    dismissWizard,
    resetProgress,
    setShowCelebration
  } = useRoadmapEngine();

  const [confirmReset, setConfirmReset] = useState(false);

  // Group milestones into 4 snake rows of 4 milestones each for winding journey
  // Row 0: 0, 1, 2, 3 (L -> R)
  // Row 1: 7, 6, 5, 4 (R -> L)
  // Row 2: 8, 9, 10, 11 (L -> R)
  // Row 3: 15, 14, 13, 12 (R -> L)
  const rows = [
    [milestones[0], milestones[1], milestones[2], milestones[3]],
    [milestones[7], milestones[6], milestones[5], milestones[4]],
    [milestones[8], milestones[9], milestones[10], milestones[11]],
    [milestones[15], milestones[14], milestones[13], milestones[12]]
  ];

  return (
    <div className="min-h-screen bg-[#0A0915] text-[#F8FAFC] flex flex-col font-sans relative overflow-x-hidden selection:bg-purple-900 selection:text-white">
      {/* Subtle Background Pixel Grid */}
      <div className="fixed inset-0 pointer-events-none bg-game-grid opacity-20 z-0"></div>

      {/* --- MASTER HUD HEADER --- */}
      <header className="sticky top-0 z-30 bg-[#121024]/95 border-b border-[#2A264F] py-2.5 px-4 sm:px-6 shadow-xl backdrop-blur-md flex-shrink-0">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          {/* Left: Track Title & Active Cat/Food Status */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded bg-[#1C1838] border border-amber-500/60 flex items-center justify-center text-xl shadow-[0_0_12px_rgba(245,158,11,0.4)]">
                ⚡
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="font-orbitron font-extrabold text-sm sm:text-base text-amber-400 tracking-wide">
                    JavaScript Web Development Roadmap
                  </h1>
                  <span className="font-vt323 text-xs text-green-400 border border-green-500/40 px-1.5 py-0.5 rounded bg-green-950/60">
                    LIVE JOURNEY
                  </span>
                </div>
                <div className="font-vt323 text-xs text-gray-400 flex items-center gap-2">
                  <span>CAT: <strong className="text-cyan-300">🐱 AT {state.catPositionId.toUpperCase()}</strong></span>
                  <span>•</span>
                  <span>FOOD: <strong className="text-amber-300">🍖 AT {state.foodPositionId.toUpperCase()}</strong></span>
                </div>
              </div>
            </div>

            {/* Mobile Return Button */}
            <div className="flex items-center gap-2 md:hidden">
              <button
                onClick={onReturnToHall}
                className="font-vt323 text-xs bg-gray-900 text-gray-300 border border-gray-700 px-2.5 py-1 rounded"
              >
                [ ← BACK ]
              </button>
            </div>
          </div>

          {/* Center: Progress Bar & Stat Counter */}
          <div className="w-full md:w-80 bg-[#090813] border border-[#27234A] p-2 rounded pixel-corners-sm">
            <div className="flex justify-between font-vt323 text-xs mb-1">
              <span className="text-gray-300">
                MILESTONES: <span className="text-cyan-300 font-bold">{completedCount} / {totalMilestones}</span> ({progressPercent}%)
              </span>
              <span className="text-amber-300 font-bold">+{state.totalXp} XP EARNED</span>
            </div>
            <div className="w-full h-2.5 bg-gray-950 border border-gray-800 rounded-full overflow-hidden p-0.5 shadow-inner">
              <div
                className="h-full bg-gradient-to-r from-cyan-400 via-amber-400 to-green-400 rounded-full transition-all duration-700 shadow-[0_0_10px_rgba(245,158,11,0.6)]"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
          </div>

          {/* Right: Controls & Return to Great Hall */}
          <div className="hidden md:flex items-center gap-2">
            {!confirmReset ? (
              <button
                onClick={() => setConfirmReset(true)}
                className="font-vt323 text-xs text-gray-400 hover:text-red-300 border border-gray-800 hover:border-red-900/60 px-2.5 py-1.5 rounded transition-colors cursor-pointer"
                title="Reset progress to start"
              >
                [ ⟲ RESET ]
              </button>
            ) : (
              <div className="flex items-center gap-1 font-vt323 text-xs">
                <span className="text-red-400">Reset?</span>
                <button
                  onClick={() => {
                    resetProgress();
                    setConfirmReset(false);
                  }}
                  className="bg-red-950 text-red-200 border border-red-700 px-1.5 py-0.5 rounded cursor-pointer"
                >
                  Yes
                </button>
                <button
                  onClick={() => setConfirmReset(false)}
                  className="bg-gray-800 text-gray-300 px-1.5 py-0.5 rounded cursor-pointer"
                >
                  No
                </button>
              </div>
            )}

            <button
              onClick={onReturnToHall}
              className="font-vt323 text-xs sm:text-sm bg-[#1A1733] hover:bg-purple-950 text-cyan-300 hover:text-white border border-purple-500/50 px-3.5 py-1.5 rounded pixel-corners-sm transition-all cursor-pointer shadow-[0_0_10px_rgba(168,85,247,0.3)] flex items-center gap-1.5"
            >
              <span>🏛️</span>
              <span>[ ← RETURN TO GREAT HALL ]</span>
            </button>
          </div>
        </div>
      </header>

      {/* --- PHASE LEGEND BAR --- */}
      <nav aria-label="Roadmap Phases" className="bg-[#0E0C1F] border-b border-[#201D3D] py-2 px-4 sticky top-[61px] z-20 overflow-x-auto scrollbar-none flex-shrink-0">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 text-xs">
          <span className="font-orbitron text-[10px] text-gray-400 font-bold uppercase tracking-wider shrink-0 hidden sm:inline">
            JOURNEY PHASES:
          </span>
          <div className="flex items-center gap-2 overflow-x-auto py-0.5">
            {ROADMAP_PHASES.map((phase) => (
              <div
                key={phase.id}
                className={`font-vt323 text-xs px-2.5 py-0.5 rounded border shrink-0 flex items-center gap-1.5 ${phase.badgeColor}`}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: phase.accent }}></span>
                <span>{phase.name}</span>
              </div>
            ))}
          </div>
        </div>
      </nav>

      {/* --- MAIN INTERACTIVE ROADMAP CANVAS --- */}
      <main className="max-w-7xl mx-auto w-full px-4 py-8 flex-1 flex flex-col items-center relative z-10">
        {/* Journey Instruction Cue */}
        <div className="mb-6 text-center space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#151326] border border-amber-500/40 rounded-full font-vt323 text-sm text-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
            <span className="animate-bounce">🐱</span>
            <span>Follow the winding road: Complete the active milestone challenge to chase the food forward!</span>
            <span className="animate-pulse">🍖</span>
          </div>
        </div>

        {/* Winding Snake Grid on Desktop / Vertical Timeline on Mobile */}
        <div className="w-full max-w-5xl space-y-10 relative">
          {rows.map((rowMilestones, rowIndex) => {
            const isReversed = rowIndex % 2 === 1;

            return (
              <div key={rowIndex} className="relative">
                {/* Row Header Indicator */}
                <div className="flex items-center justify-between text-[11px] font-orbitron text-gray-500 mb-3 px-1 border-b border-gray-900 pb-1">
                  <span>SECTION {rowIndex + 1} OF 4</span>
                  <span>{isReversed ? '◀ REVERSE FLOW' : 'FORWARD FLOW ▶'}</span>
                </div>

                {/* 4 Milestones in the Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 relative">
                  {rowMilestones.map((milestone) => {
                    const isCompleted = state.completedMilestones.includes(milestone.id);
                    const isUnlocked = state.unlockedMilestones.includes(milestone.id);
                    const isActive = state.currentMilestoneId === milestone.id;
                    const hasCat = state.catPositionId === milestone.id;
                    const hasFood = state.foodPositionId === milestone.id;
                    const isFinal = milestone.isFinal;

                    // Actor animation class
                    let catAnimClass = 'animate-cat-idle';
                    if (catState === 'moving') catAnimClass = 'animate-cat-walk';
                    if (catState === 'celebrating') catAnimClass = 'animate-cat-celebrate';

                    return (
                      <div
                        key={milestone.id}
                        role="button"
                        tabIndex={isUnlocked ? 0 : -1}
                        aria-label={`Milestone ${milestone.order}: ${milestone.title}. Status: ${
                          isCompleted ? 'Completed' : isActive ? 'Active' : isUnlocked ? 'Available' : 'Locked'
                        }`}
                        onClick={() => openMilestoneModal(milestone)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            openMilestoneModal(milestone);
                          }
                        }}
                        className={`group relative p-4 rounded-xl border-2 transition-all duration-300 flex flex-col justify-between min-h-[160px] select-none ${
                          isCompleted
                            ? 'bg-[#0E1B17]/90 border-emerald-500/70 shadow-[0_0_20px_rgba(16,185,129,0.2)] hover:border-emerald-400 cursor-pointer'
                            : isActive
                            ? 'bg-[#1D170E]/95 border-amber-400 shadow-[0_0_25px_rgba(245,158,11,0.5)] animate-active-pulse cursor-pointer scale-102 ring-2 ring-amber-400/40'
                            : isUnlocked
                            ? 'bg-[#151326] border-purple-500/50 hover:border-purple-400 shadow-md cursor-pointer'
                            : 'bg-[#0E0C1A]/60 border-gray-800/80 opacity-60 cursor-not-allowed filter grayscale'
                        } ${isFinal && isUnlocked ? 'border-yellow-400 shadow-[0_0_30px_rgba(250,204,21,0.5)]' : ''}`}
                      >
                        {/* --- TOP ACTOR OVERLAYS (CAT & FOOD) --- */}
                        <div className="absolute -top-4 left-3 right-3 flex items-center justify-between pointer-events-none z-20">
                          {/* Cat Presence */}
                          {hasCat ? (
                            <div className={`flex items-center gap-1 bg-black/90 border border-cyan-400 px-2 py-0.5 rounded-full shadow-[0_0_12px_rgba(34,211,238,0.8)] ${catAnimClass}`}>
                              <span className="text-base">🐱</span>
                              <span className="font-orbitron text-[9px] text-cyan-300 font-bold">YOU</span>
                            </div>
                          ) : <div />}

                          {/* Food Target Presence */}
                          {hasFood ? (
                            <div className="flex items-center gap-1 bg-black/90 border border-yellow-400 px-2 py-0.5 rounded-full shadow-[0_0_14px_rgba(250,204,21,0.9)] animate-food-bounce">
                              <span className="text-base">🍖</span>
                              <span className="font-orbitron text-[9px] text-yellow-300 font-bold">TARGET</span>
                            </div>
                          ) : <div />}
                        </div>

                        {/* Top Node Header: Order & Status */}
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-orbitron font-extrabold text-xs text-gray-400 group-hover:text-cyan-300 transition-colors">
                              #{String(milestone.order).padStart(2, '0')}
                            </span>
                            <span className={`font-vt323 text-xs px-2 py-0.5 rounded border ${
                              isCompleted
                                ? 'bg-emerald-950 text-emerald-300 border-emerald-700'
                                : isActive
                                ? 'bg-amber-950 text-amber-300 border-amber-600 animate-pulse font-bold'
                                : isUnlocked
                                ? 'bg-purple-950 text-purple-300 border-purple-800'
                                : 'bg-gray-900 text-gray-500 border-gray-800'
                            }`}>
                              {isCompleted ? '✓ DONE' : isActive ? '▶ ACTIVE' : isUnlocked ? 'AVAILABLE' : '🔒 LOCKED'}
                            </span>
                          </div>

                          {/* Node Sigil & Title */}
                          <div className="flex items-center gap-2.5 my-1">
                            <span className="text-2xl p-1 bg-black/40 rounded border border-white/10 shrink-0">
                              {milestone.icon}
                            </span>
                            <h3 className="font-orbitron font-bold text-sm text-white group-hover:text-amber-300 transition-colors leading-snug">
                              {milestone.title}
                            </h3>
                          </div>
                        </div>

                        {/* Summary Description */}
                        <p className="font-sans text-[11px] text-gray-300 leading-snug line-clamp-2 my-2">
                          {milestone.summary}
                        </p>

                        {/* Node Footer: Phase & Action Prompt */}
                        <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[10px] font-vt323">
                          <span className="text-gray-400">
                            +{milestone.xp} XP
                          </span>

                          <span className={`font-bold ${
                            isCompleted ? 'text-emerald-400' : isActive ? 'text-amber-400 underline' : 'text-gray-500'
                          }`}>
                            {isCompleted ? '[ Review ]' : isActive ? '[ START CHALLENGE → ]' : isUnlocked ? '[ View ]' : '[ Locked ]'}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* --- WIZARD ROADMAP GUIDE SPEECH BUBBLE --- */}
      <WizardRoadmapGuide
        wizardState={wizardState}
        onDismiss={dismissWizard}
      />

      {/* --- MILESTONE INTERACTIVE CHALLENGE MODAL --- */}
      {activeModalMilestone && (
        <MilestoneModal
          milestone={activeModalMilestone}
          isCompleted={state.completedMilestones.includes(activeModalMilestone.id)}
          onComplete={completeMilestone}
          onClose={closeMilestoneModal}
        />
      )}

      {/* --- FINAL CELEBRATION MODAL --- */}
      {showCelebration && (
        <FinalCelebrationModal
          totalXp={state.totalXp}
          onReturnToHall={onReturnToHall}
          onResetJourney={resetProgress}
          onClose={() => setShowCelebration(false)}
        />
      )}
    </div>
  );
}
