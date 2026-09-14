import React, { useRef, useEffect } from 'react';
import { useRoadmapEngine } from '../../hooks/useRoadmapEngine';
import WizardRoadmapGuide from './WizardRoadmapGuide';
import FinalCelebrationModal from './FinalCelebrationModal';

export default function RoadmapView({ onReturnToHall }) {
  const {
    state,
    milestones,
    completedCount,
    totalMilestones,
    progressPercent,
    catAnimation,
    foodAnimation,
    wizardState,
    showCelebration,
    touchIsland,
    dismissWizard,
    resetProgress,
    setShowCelebration
  } = useRoadmapEngine();

  const mapScrollRef = useRef(null);

  // Auto-scroll to Cat / Active Target on initial mount
  useEffect(() => {
    if (mapScrollRef.current) {
      // Find position of active milestone
      const activeMs = milestones.find((m) => m.id === state.foodPositionId) || milestones[0];
      const targetScrollY = Math.max(0, activeMs.y - 380);
      mapScrollRef.current.scrollTo({ top: targetScrollY, behavior: 'smooth' });
    }
  }, [state.foodPositionId, milestones]);

  // Recenter button action
  const scrollToActiveHero = () => {
    if (mapScrollRef.current) {
      const activeMs = milestones.find((m) => m.id === state.foodPositionId) || milestones[0];
      const targetScrollY = Math.max(0, activeMs.y - 380);
      mapScrollRef.current.scrollTo({ top: targetScrollY, behavior: 'smooth' });
    }
  };

  // SVG connecting road path string linking all 16 milestone coordinates
  // From HTML (1000, 3320) up through CSS, JS, etc., to Backend Project (1000, 80)
  const mainRoadPath = `
    M 1000 3500
    C 1000 3420, 1000 3380, 1000 3320
    C 840 3260, 620 3180, 620 3040
    C 780 2920, 1180 2860, 1180 2740
    C 1020 2620, 740 2540, 740 2420
    C 880 2300, 1160 2240, 1160 2120
    C 1020 2000, 780 1940, 780 1820
    C 860 1700, 1000 1620, 1000 1520
    C 1120 1420, 1260 1340, 1260 1240
    C 1100 1140, 820 1060, 820 980
    C 960 900, 1180 840, 1180 780
    C 1000 720, 740 680, 740 620
    C 880 560, 1140 520, 1140 480
    C 1020 420, 820 400, 820 360
    C 960 320, 1140 300, 1140 260
    C 1020 220, 840 200, 840 170
    C 900 130, 1000 110, 1000 80
  `;

  return (
    <div className="relative w-screen h-screen bg-[#070611] text-[#F8FAFC] overflow-hidden flex flex-col font-sans select-none antialiased">
      {/* ================================================================= */}
      {/* 1. RETRO RPG TOP HUD (From Stitch Design)                         */}
      {/* ================================================================= */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-[#121024]/95 border-b border-[#2A264F] py-2.5 px-4 sm:px-6 shadow-2xl backdrop-blur-md flex items-center justify-between">
        {/* Brand & Overworld Title */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded bg-[#1C1838] border border-secondary/60 flex items-center justify-center text-xl shadow-[0_0_15px_rgba(93,230,255,0.4)]">
            🗺️
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-orbitron font-extrabold text-sm sm:text-base text-yellow-300 tracking-wider drop-shadow-md">
                ARQ LearnHub
              </h1>
              <span className="font-vt323 text-xs bg-cyan-950 border border-cyan-500 text-cyan-300 px-2 py-0.5 rounded">
                JAVASCRIPT OVERWORLD
              </span>
            </div>
            <div className="font-vt323 text-xs text-gray-400 flex items-center gap-2">
              <span>CAT: <strong className="text-cyan-300">🐱 {state.catPositionId.toUpperCase()}</strong></span>
              <span>•</span>
              <span>FOOD: <strong className="text-yellow-300">🍖 {state.foodPositionId.toUpperCase()}</strong></span>
            </div>
          </div>
        </div>

        {/* Center Game HUD Stats: HP, Mana, XP, Gold, Boss Raid */}
        <div className="hidden lg:flex items-center gap-4 bg-[#090814] border border-[#27234A] py-1 px-4 rounded-lg shadow-inner">
          {/* Health Bar */}
          <div className="flex items-center gap-1.5 font-vt323 text-xs">
            <span className="text-red-400">❤️ HP</span>
            <div className="w-16 h-2 bg-gray-900 border border-red-800 rounded-full overflow-hidden">
              <div className="w-full h-full bg-red-500"></div>
            </div>
            <span className="text-red-300">100%</span>
          </div>

          {/* Mana Bar */}
          <div className="flex items-center gap-1.5 font-vt323 text-xs">
            <span className="text-cyan-400">⚡ MP</span>
            <div className="w-16 h-2 bg-gray-900 border border-cyan-800 rounded-full overflow-hidden">
              <div className="w-full h-full bg-cyan-400 animate-pulse"></div>
            </div>
            <span className="text-cyan-300">100%</span>
          </div>

          <div className="h-4 w-px bg-gray-800"></div>

          {/* XP Gained */}
          <div className="font-vt323 text-xs text-yellow-400 font-bold">
            +{state.totalXp} XP
          </div>

          {/* Gold */}
          <div className="font-vt323 text-xs text-amber-300 flex items-center gap-1">
            <span>🪙</span>
            <span>{state.gold} G</span>
          </div>

          <div className="h-4 w-px bg-gray-800"></div>

          {/* Boss Raid Milestone 16 Badge */}
          <div className="font-vt323 text-xs px-2 py-0.5 bg-red-950/80 border border-red-500/80 text-red-300 rounded flex items-center gap-1">
            <span>👑</span>
            <span>CAPSTONE [LVL 16]</span>
          </div>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={resetProgress}
            className="font-vt323 text-xs text-gray-400 hover:text-red-300 border border-gray-800 hover:border-red-800/80 px-2.5 py-1.5 rounded transition-colors cursor-pointer"
            title="Reset journey to beginning"
          >
            [ ⟲ RESET ]
          </button>

          <button
            onClick={onReturnToHall}
            className="font-vt323 text-xs sm:text-sm bg-[#1A1733] hover:bg-purple-950 text-cyan-300 hover:text-white border border-purple-500/50 px-3.5 py-1.5 rounded pixel-corners-sm transition-all cursor-pointer shadow-[0_0_12px_rgba(168,85,247,0.35)] flex items-center gap-1.5"
          >
            <span>🏛️</span>
            <span>[ ← RETURN TO GREAT HALL ]</span>
          </button>
        </div>
      </header>

      {/* ================================================================= */}
      {/* 2. FLOATING OVERWORLD DOCK & LEGEND (Top Left)                    */}
      {/* ================================================================= */}
      <div className="fixed top-18 left-4 sm:left-6 z-30 flex flex-col gap-2 pointer-events-auto">
        <div className="p-1 bg-[#151326]/90 backdrop-blur-md border border-[#2A264F] rounded-lg flex items-center gap-1.5 shadow-2xl">
          <button
            onClick={scrollToActiveHero}
            className="px-3 py-1.5 rounded bg-cyan-950/80 border border-cyan-400 text-cyan-300 font-vt323 text-sm flex items-center gap-1.5 hover:bg-cyan-900 transition-colors cursor-pointer font-bold shadow-[0_0_10px_rgba(34,211,238,0.4)]"
            title="Recenter Camera to Cat & Food Target"
          >
            <span>🎯</span>
            <span>Recenter to Target</span>
          </button>

          <div className="h-4 w-px bg-gray-700"></div>

          <div className="px-2 font-vt323 text-xs text-gray-400">
            PROGRESS: <strong className="text-green-400">{completedCount} / {totalMilestones}</strong> ({progressPercent}%)
          </div>
        </div>

        {/* Legend Pill */}
        <div className="px-3 py-1 bg-[#151326]/90 backdrop-blur-md border border-[#2A264F] rounded-lg flex items-center gap-3 font-vt323 text-xs text-gray-300 shadow-md">
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-400"></span>
            <span className="text-yellow-400">Mastered ({completedCount})</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping"></span>
            <span className="text-cyan-300 font-bold">Active Objective</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-gray-600"></span>
            <span className="text-gray-500">Locked ({totalMilestones - completedCount})</span>
          </div>
        </div>
      </div>

      {/* ================================================================= */}
      {/* 3. 2.5D RETRO RPG OVERWORLD CANVAS (Scrollable Viewport)           */}
      {/* ================================================================= */}
      <main
        ref={mapScrollRef}
        tabIndex={0}
        aria-label="Interactive Overworld Game Map"
        className="w-full h-full pt-16 pb-12 overflow-auto cursor-grab active:cursor-grabbing focus:outline-none focus:ring-1 focus:ring-cyan-500/50"
      >
        {/* Deep Cosmic Background & Nebula Gradients */}
        <div className="relative w-[2000px] h-[3680px] min-w-[2000px] min-h-[3680px] bg-[#070611] overflow-hidden select-none">
          {/* Pixel Starlight Grid */}
          <div className="absolute inset-0 bg-game-grid opacity-25 pointer-events-none"></div>

          {/* Biome Ambient Color Glows */}
          <div className="absolute left-1/4 bottom-32 w-[700px] h-[700px] rounded-full bg-emerald-500/15 blur-[140px] pointer-events-none"></div>
          <div className="absolute right-1/4 top-1/2 w-[750px] h-[700px] rounded-full bg-amber-500/10 blur-[150px] pointer-events-none"></div>
          <div className="absolute left-1/3 top-1/3 w-[800px] h-[700px] rounded-full bg-cyan-500/15 blur-[160px] pointer-events-none"></div>
          <div className="absolute left-1/4 top-20 w-[800px] h-[700px] rounded-full bg-red-500/20 blur-[160px] pointer-events-none"></div>

          {/* Master SVG Overworld Game Map */}
          <svg
            className="absolute inset-0 w-full h-full overflow-visible select-none"
            viewBox="0 0 2000 3680"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Gradients for Earthen Cliffs & Grass Road */}
              <linearGradient id="islandCliffGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#78350f" />
                <stop offset="40%" stopColor="#451a03" />
                <stop offset="100%" stopColor="#1e1005" />
              </linearGradient>

              <linearGradient id="summitCliffGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#991b1b" />
                <stop offset="40%" stopColor="#450a0a" />
                <stop offset="100%" stopColor="#1a0404" />
              </linearGradient>

              <linearGradient id="lushDirtRoad" x1="0%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#b45309" />
                <stop offset="50%" stopColor="#d97706" />
                <stop offset="100%" stopColor="#f59e0b" />
              </linearGradient>

              {/* Pixel Turf Grass Tile Pattern */}
              <pattern id="rpgGrassTile" width="24" height="24" patternUnits="userSpaceOnUse">
                <rect width="24" height="24" fill="#15803d" />
                <rect x="2" y="3" width="6" height="8" fill="#16a34a" />
                <rect x="12" y="10" width="3" height="6" fill="#22c55e" />
                <rect x="14" y="2" width="2" height="4" fill="#4ade80" />
                <rect x="4" y="15" width="4" height="6" fill="#166534" />
                <rect x="18" y="14" width="4" height="7" fill="#22c55e" />
                <circle cx="9" cy="18" r="1.5" fill="#facc15" />
                <circle cx="21" cy="6" r="1.5" fill="#f43f5e" />
                <circle cx="7" cy="7" r="1.2" fill="#5de6ff" />
              </pattern>

              {/* Terrain Drop Shadow Filter */}
              <filter id="terrainShadow" x="-30%" y="-30%" width="160%" height="160%">
                <feDropShadow dx="0" dy="20" stdDeviation="16" floodColor="#000000" floodOpacity="0.85" />
              </filter>

              {/* Gold Aura Filter */}
              <filter id="goldGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="12" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>

              {/* Cyan Aura Filter */}
              <filter id="cyanGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="16" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* --- 1. CONNECTING EXPANSIVE ROADWAYS --- */}
            <g id="connectingRoadways">
              {/* Thick Dark Earth Trench Base */}
              <path
                d={mainRoadPath}
                fill="none"
                stroke="#381502"
                strokeWidth="38"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Luminous Cobblestone Dirt Road */}
              <path
                d={mainRoadPath}
                fill="none"
                stroke="url(#lushDirtRoad)"
                strokeWidth="26"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Animated Glowing Stepping Trail */}
              <path
                d={mainRoadPath}
                fill="none"
                stroke="#facc15"
                strokeWidth="8"
                strokeDasharray="12 16"
                strokeLinecap="round"
                className="animate-path-flow"
              />
              {/* Radiant Cyan Core Beam */}
              <path
                d={mainRoadPath}
                fill="none"
                stroke="#5de6ff"
                strokeWidth="4"
                opacity="0.8"
                filter="url(#cyanGlow)"
              />
            </g>

            {/* --- 2. FLOATING LUSH GRASS ISLANDS --- */}
            <g id="floatingIslands" filter="url(#terrainShadow)">
              {/* Starting Harbor Dock at Bottom */}
              <g transform="translate(1000, 3540)">
                <ellipse cx="0" cy="40" rx="180" ry="80" fill="url(#islandCliffGrad)" stroke="#271302" strokeWidth="4" />
                <ellipse cx="0" cy="15" rx="170" ry="70" fill="#15803d" stroke="#4ade80" strokeWidth="4" />
                <ellipse cx="0" cy="10" rx="155" ry="60" fill="url(#rpgGrassTile)" />
                <rect x="-80" y="-10" width="160" height="32" rx="4" fill="#151326" stroke="#facc15" strokeWidth="1.5" />
                <text x="0" y="10" fill="#facc15" fontFamily="'Orbitron', sans-serif" fontSize="13" fontWeight="bold" textAnchor="middle">
                  🚀 JOURNEY ENTRANCE
                </text>
              </g>

              {/* 16 Floating Biome Islands */}
              {milestones.map((ms) => {
                const isSummit = ms.isFinal;
                const cliffGrad = isSummit ? 'url(#summitCliffGrad)' : 'url(#islandCliffGrad)';
                const rimColor = isSummit ? '#f43f5e' : ms.biomeColor || '#4ade80';

                return (
                  <g key={`island-${ms.id}`} transform={`translate(${ms.x}, ${ms.y})`}>
                    {/* Earthen Cliff Foundation */}
                    <ellipse
                      cx="0"
                      cy="45"
                      rx={ms.rx + 10}
                      ry={ms.ry + 10}
                      fill={cliffGrad}
                      stroke="#271302"
                      strokeWidth="5"
                    />
                    <path
                      d={`M -${ms.rx - 10} 40 Q 0 120 ${ms.rx - 10} 40 L ${ms.rx - 25} 85 Q 0 155 -${ms.rx - 25} 85 Z`}
                      fill="#220e03"
                    />

                    {/* Grass Turf Surface */}
                    <ellipse
                      cx="0"
                      cy="18"
                      rx={ms.rx}
                      ry={ms.ry}
                      fill="#15803d"
                      stroke={rimColor}
                      strokeWidth="5"
                    />
                    <ellipse
                      cx="0"
                      cy="12"
                      rx={ms.rx - 15}
                      ry={ms.ry - 12}
                      fill="url(#rpgGrassTile)"
                    />

                    {/* Trees & Flowers Decoration */}
                    <g fill="#16a34a">
                      <rect x={-ms.rx + 60} y="-10" width="6" height="14" fill="#78350f" />
                      <polygon points={`${-ms.rx + 63},-32 ${-ms.rx + 50},-8 ${-ms.rx + 76},-8`} fill="#166534" />
                      <polygon points={`${-ms.rx + 63},-40 ${-ms.rx + 54},-22 ${-ms.rx + 72},-22`} fill="#22c55e" />

                      <rect x={ms.rx - 70} y="-8" width="5" height="12" fill="#78350f" />
                      <polygon points={`${ms.rx - 67},-28 ${ms.rx - 78},-6 ${ms.rx - 56},-6`} fill="#15803d" />
                      <polygon points={`${ms.rx - 67},-36 ${ms.rx - 74},-18 ${ms.rx - 60},-18`} fill="#4ade80" />

                      {/* Small Flowers */}
                      <circle cx={-ms.rx + 110} cy="25" r="3.5" fill="#facc15" />
                      <circle cx={ms.rx - 110} cy="25" r="3.5" fill="#f43f5e" />
                      <circle cx={-40} cy="38" r="3" fill="#5de6ff" />
                      <circle cx={40} cy="38" r="3" fill="#facc15" />
                    </g>
                  </g>
                );
              })}
            </g>

            {/* --- 3. MILESTONE STATION NODES & TOUCH TARGETS --- */}
            <g id="milestoneStations">
              {milestones.map((ms) => {
                const isCompleted = state.completedMilestones.includes(ms.id);
                const isActiveTarget = state.foodPositionId === ms.id;
                const hasCat = state.catPositionId === ms.id;
                const hasFood = state.foodPositionId === ms.id;
                const isBothHere = hasCat && hasFood;

                return (
                  <g
                    key={`station-${ms.id}`}
                    transform={`translate(${ms.x}, ${ms.y})`}
                    onClick={() => touchIsland(ms)}
                    className="cursor-pointer group"
                  >
                    {/* Ring Halo around station */}
                    {isActiveTarget && (
                      <circle
                        cx="0"
                        cy="0"
                        r="66"
                        fill="none"
                        stroke="#5de6ff"
                        strokeWidth="3.5"
                        strokeDasharray="12 8"
                        className="animate-spin"
                        style={{ animationDuration: '6s' }}
                      />
                    )}

                    {/* Central Pedestal */}
                    <circle
                      cx="0"
                      cy="0"
                      r="46"
                      fill="#151326"
                      stroke={isCompleted ? '#facc15' : isActiveTarget ? '#5de6ff' : '#494454'}
                      strokeWidth="4"
                      filter={isCompleted ? 'url(#goldGlow)' : isActiveTarget ? 'url(#cyanGlow)' : 'none'}
                    />

                    <circle
                      cx="0"
                      cy="0"
                      r="36"
                      fill={isCompleted ? '#ca801e' : isActiveTarget ? '#00cbe6' : '#1e1c27'}
                      opacity={isCompleted || isActiveTarget ? 0.35 : 0.8}
                    />

                    {/* Milestone Order Number */}
                    <text
                      x="0"
                      y="8"
                      fill="#ffffff"
                      fontFamily="'Orbitron', sans-serif"
                      fontSize="22"
                      fontWeight="800"
                      textAnchor="middle"
                    >
                      {String(ms.order).padStart(2, '0')}
                    </text>

                    {/* Gold Trophy Checkmark Flag on Completed */}
                    {isCompleted && (
                      <g transform="translate(30, -32)">
                        <circle cx="0" cy="0" r="14" fill="#ca801e" stroke="#facc15" strokeWidth="2.5" />
                        <text x="0" y="5" fill="#ffffff" fontFamily="'JetBrains Mono', monospace" fontSize="14" fontWeight="bold" textAnchor="middle">
                          ✓
                        </text>
                      </g>
                    )}

                    {/* Island Label Banner */}
                    <g transform="translate(0, 62)">
                      <rect
                        x="-115"
                        y="0"
                        width="230"
                        height="44"
                        rx="6"
                        fill="#151326"
                        stroke={isCompleted ? '#facc15' : isActiveTarget ? '#5de6ff' : '#2A264F'}
                        strokeWidth="2"
                        className="shadow-xl"
                      />
                      <text
                        x="0"
                        y="20"
                        fill={isActiveTarget ? '#5de6ff' : '#ffffff'}
                        fontFamily="'Orbitron', sans-serif"
                        fontSize="14"
                        fontWeight="bold"
                        textAnchor="middle"
                      >
                        {String(ms.order).padStart(2, '0')} {ms.title}
                      </text>
                      <text
                        x="0"
                        y="34"
                        fill={isCompleted ? '#facc15' : isActiveTarget ? '#38bdf8' : '#6b7280'}
                        fontFamily="'JetBrains Mono', monospace"
                        fontSize="10"
                        fontWeight="600"
                        textAnchor="middle"
                      >
                        {isCompleted ? `MASTERED • +${ms.xp} XP` : isActiveTarget ? '▶ TOUCH TO LEAP HERE' : 'LOCKED'}
                      </text>
                    </g>

                    {/* =================================================== */}
                    {/* 4. THE CAT & FOOD CHARACTERS ON THIS ISLAND         */}
                    {/* =================================================== */}
                    {/* Case A: Cat and Food joined together! (Finale) */}
                    {isBothHere ? (
                      <g transform="translate(0, -95)" className="animate-bounce">
                        <rect x="-70" y="-22" width="140" height="40" rx="8" fill="#151326" stroke="#facc15" strokeWidth="2.5" />
                        <text x="0" y="4" fontSize="22" textAnchor="middle">🐱 ❤️ 🍖</text>
                      </g>
                    ) : (
                      <>
                        {/* Case B: Cat is on this island */}
                        {hasCat && (
                          <g transform="translate(0, -90)">
                            {/* Cat Token Box */}
                            <g className={catAnimation === 'jumping' ? 'animate-bounce' : 'animate-cat-idle'}>
                              <rect
                                x="-45"
                                y="-24"
                                width="90"
                                height="42"
                                rx="8"
                                fill="#0B0A16"
                                stroke="#5de6ff"
                                strokeWidth="2.5"
                                filter="url(#cyanGlow)"
                              />
                              <text x="-16" y="5" fontSize="22">🐱</text>
                              <text
                                x="12"
                                y="3"
                                fill="#5de6ff"
                                fontFamily="'Orbitron', sans-serif"
                                fontSize="11"
                                fontWeight="bold"
                                textAnchor="middle"
                              >
                                YOU
                              </text>
                              <polygon points="0,22 -8,14 8,14" fill="#5de6ff" />
                            </g>
                          </g>
                        )}

                        {/* Case C: Food is on this island */}
                        {hasFood && (
                          <g transform="translate(0, -90)">
                            {/* Food Target Box */}
                            <g className="animate-food-bounce">
                              <rect
                                x="-52"
                                y="-24"
                                width="104"
                                height="42"
                                rx="8"
                                fill="#0B0A16"
                                stroke="#facc15"
                                strokeWidth="2.5"
                                filter="url(#goldGlow)"
                              />
                              <text x="-22" y="5" fontSize="22">🍖</text>
                              <text
                                x="15"
                                y="3"
                                fill="#facc15"
                                fontFamily="'Orbitron', sans-serif"
                                fontSize="10"
                                fontWeight="bold"
                                textAnchor="middle"
                              >
                                TARGET
                              </text>
                              <polygon points="0,22 -8,14 8,14" fill="#facc15" />
                            </g>
                          </g>
                        )}
                      </>
                    )}
                  </g>
                );
              })}
            </g>
          </svg>
        </div>
      </main>

      {/* ================================================================= */}
      {/* 4. SAGE BYTERION WIZARD GUIDE (1-2 Line Explanations)             */}
      {/* ================================================================= */}
      <WizardRoadmapGuide
        wizardState={wizardState}
        onDismiss={dismissWizard}
      />

      {/* ================================================================= */}
      {/* 5. FINAL CELEBRATION MODAL (Cat reaches Food at Summit)           */}
      {/* ================================================================= */}
      {showCelebration && (
        <FinalCelebrationModal
          totalXp={state.totalXp}
          onReturnToHall={onReturnToHall}
          onResetJourney={resetProgress}
          onClose={() => setShowCelebration(false)}
        />
      )}

      {/* ================================================================= */}
      {/* 6. RETRO RPG ENGINE STATUS BAR (Bottom)                           */}
      {/* ================================================================= */}
      <footer className="fixed bottom-0 left-0 right-0 z-30 bg-[#0B0A16]/95 border-t border-[#2A264F] py-1.5 px-4 flex items-center justify-between text-xs font-vt323 text-gray-400">
        <div className="flex items-center gap-3">
          <span className="text-cyan-400">⚡ ARQ LearnHub Overworld Engine v2.4</span>
          <span className="hidden sm:inline">•</span>
          <span className="hidden sm:inline">BGM: 8-Bit Celestial Tavern</span>
        </div>
        <div className="flex items-center gap-2">
          <span>TOUCH THE ACTIVE ISLAND TO ADVANCE CAT</span>
          <span>•</span>
          <span className="text-green-400">● 12ms</span>
        </div>
      </footer>
    </div>
  );
}
