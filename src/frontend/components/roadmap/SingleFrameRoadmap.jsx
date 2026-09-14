import React, { useState } from 'react';
import AnimatedCatCharacter from './characters/AnimatedCatCharacter';
import AnimatedFoodCharacter from './characters/AnimatedFoodCharacter';

/**
 * SingleFrameRoadmap - Authentic Overworld Quest Map in a Single Frame.
 *
 * Implements the complete celestial RPG visual theme:
 * - Floating 2.5D lush biome islands connected by winding cobblestone roads.
 * - 16 sequential milestones with 2X prominent name displays.
 * - Biome terrain colors (Emerald Meadow, Cyan Glade, Blue Nebula, Amber Works, Mystic Bastion, Summit Citadel).
 * - Real Cat & Food characters animated on their current milestones.
 * - Interactive milestone selection with Sage Byterion lore parchment.
 * - Zero scrolling required: entire journey fits in one glorious panoramic frame.
 */
export default function SingleFrameRoadmap({
  milestones,
  state,
  totalXp,
  onClose,
  onReturnToHall,
  onResetJourney
}) {
  const [selectedMilestone, setSelectedMilestone] = useState(null);

  const completedCount = state?.completedMilestones?.length || 0;
  const isFinished = state?.isFinished || completedCount === 16;
  const progressPercent = Math.min(100, Math.round((completedCount / 16) * 100));

  // Single-Frame Landscape Coordinates for all 16 Milestones + Entrance
  // Winding serpentine mountain trail ascending from bottom-left to top-center summit
  const SINGLE_FRAME_COORDS = {
    start: { x: 120, y: 750, rx: 75, ry: 34, title: 'Journey Entrance', isStart: true },
    html: { x: 250, y: 710, rx: 75, ry: 34 },
    css: { x: 390, y: 650, rx: 75, ry: 34 },
    'js-basics': { x: 550, y: 710, rx: 80, ry: 36, isGoal: true },
    dom: { x: 730, y: 650, rx: 75, ry: 34 },
    events: { x: 900, y: 700, rx: 75, ry: 34 },
    es6: { x: 1070, y: 640, rx: 80, ry: 36, isGoal: true },
    async: { x: 1210, y: 550, rx: 75, ry: 34 },
    fetch: { x: 1260, y: 390, rx: 75, ry: 34 },
    json: { x: 1140, y: 290, rx: 80, ry: 36, isGoal: true },
    nodejs: { x: 980, y: 350, rx: 75, ry: 34 },
    npm: { x: 800, y: 300, rx: 75, ry: 34 },
    express: { x: 620, y: 360, rx: 80, ry: 36, isGoal: true },
    rest: { x: 440, y: 300, rx: 75, ry: 34 },
    database: { x: 270, y: 360, rx: 75, ry: 34 },
    auth: { x: 150, y: 260, rx: 80, ry: 36, isGoal: true },
    'backend-project': { x: 700, y: 130, rx: 110, ry: 48, isFinal: true }
  };

  // Continuous serpentine road path string through all 16 coordinates
  const singleFrameRoadPath = `
    M 120 750
    C 180 750, 200 710, 250 710
    C 310 710, 330 650, 390 650
    C 450 650, 490 710, 550 710
    C 620 710, 670 650, 730 650
    C 800 650, 840 700, 900 700
    C 970 700, 1010 640, 1070 640
    C 1130 640, 1170 590, 1210 550
    C 1250 500, 1260 440, 1260 390
    C 1260 340, 1200 310, 1140 290
    C 1090 270, 1040 350, 980 350
    C 910 350, 860 300, 800 300
    C 730 300, 680 360, 620 360
    C 550 360, 500 300, 440 300
    C 370 300, 320 360, 270 360
    C 210 360, 170 310, 150 260
    C 110 190, 360 140, 700 130
  `;

  // Chapter themes
  const getBiomeColors = (chapter, isFinal) => {
    if (isFinal) return { rim: '#f43f5e', fill: '#991b1b', text: '#fca5a5', name: 'CAPSTONE CITADEL' };
    switch (chapter) {
      case 1:
        return { rim: '#4ade80', fill: '#15803d', text: '#86efac', name: 'FRONTEND FOUNDATION' };
      case 2:
        return { rim: '#38bdf8', fill: '#0284c7', text: '#7dd3fc', name: 'DOM & INTERACTION' };
      case 3:
        return { rim: '#60a5fa', fill: '#2563eb', text: '#93c5fd', name: 'ASYNC & WEB DATA' };
      case 4:
        return { rim: '#fbbf24', fill: '#d97706', text: '#fde047', name: 'NODE & EXPRESS' };
      case 5:
        return { rim: '#c084fc', fill: '#9333ea', text: '#d8b4fe', name: 'DATA & SECURITY' };
      default:
        return { rim: '#4ade80', fill: '#15803d', text: '#86efac', name: 'WEB REALM' };
    }
  };

  const activeMilestoneDetail = selectedMilestone || milestones.find(m => m.id === state?.activeMilestoneId) || milestones[0];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="single-frame-map-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-3 bg-black/95 backdrop-blur-2xl animate-in fade-in duration-300 select-none overflow-hidden"
    >
      <div className="relative w-full max-w-[1500px] h-[98vh] max-h-[950px] bg-[#070611] border-2 sm:border-3 border-yellow-400/90 rounded-2xl shadow-[0_0_80px_rgba(250,204,21,0.5),0_0_120px_rgba(0,0,0,0.95)] flex flex-col justify-between overflow-hidden">
        
        {/* =============================================================== */}
        {/* 1. TOP RETRO RPG HUD BAR                                         */}
        {/* =============================================================== */}
        <header className="relative z-20 bg-[#121024]/95 border-b border-[#2A264F] py-2 px-4 sm:px-6 flex items-center justify-between backdrop-blur-md shrink-0">
          {/* Brand & Overworld Title */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#1C1838] border border-yellow-400 flex items-center justify-center text-xl shadow-[0_0_15px_rgba(250,204,21,0.5)]">
              🗺️
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 id="single-frame-map-title" className="font-orbitron font-black text-sm sm:text-base text-yellow-300 tracking-wider">
                  FULL JAVASCRIPT OVERWORLD
                </h2>
                <span className="font-vt323 text-xs bg-yellow-950 border border-yellow-500 text-yellow-300 px-2 py-0.5 rounded">
                  SINGLE FRAME PANORAMA
                </span>
              </div>
              <div className="font-vt323 text-xs text-gray-400 flex items-center gap-2">
                <span>CAT: <strong className="text-cyan-300">🐱 {state?.catPositionId?.toUpperCase()}</strong></span>
                <span>•</span>
                <span>FOOD: <strong className="text-yellow-300">🍖 {state?.foodPositionId?.toUpperCase()}</strong></span>
              </div>
            </div>
          </div>

          {/* Center RPG Stats */}
          <div className="hidden lg:flex items-center gap-4 bg-[#090814] border border-[#27234A] py-1 px-4 rounded-lg shadow-inner">
            <div className="flex items-center gap-1.5 font-vt323 text-xs">
              <span className="text-red-400">❤️ HP 100%</span>
              <span className="text-cyan-400">⚡ MP 100%</span>
            </div>
            <div className="h-4 w-px bg-gray-800"></div>
            <div className="font-vt323 text-xs text-yellow-400 font-bold">
              +{totalXp || 1650} XP
            </div>
            <div className="font-vt323 text-xs text-amber-300 flex items-center gap-1">
              <span>🪙</span>
              <span>{state?.gold || 850} G</span>
            </div>
            <div className="h-4 w-px bg-gray-800"></div>
            <div className="font-vt323 text-xs text-green-400 font-bold">
              ★ {completedCount} / 16 ({progressPercent}%)
            </div>
          </div>

          {/* Right Close / Hall Actions */}
          <div className="flex items-center gap-2">
            {onResetJourney && (
              <button
                onClick={onResetJourney}
                className="font-vt323 text-xs text-gray-400 hover:text-red-300 border border-gray-800 hover:border-red-800 px-2.5 py-1 rounded cursor-pointer transition-colors"
                title="Reset Journey to beginning"
              >
                [ ⟲ RESET ]
              </button>
            )}

            {onClose && (
              <button
                onClick={onClose}
                className="font-vt323 text-xs sm:text-sm bg-gray-900 hover:bg-gray-800 text-cyan-300 border border-cyan-600/50 px-3 py-1 rounded pixel-corners-sm cursor-pointer transition-colors"
                title="Return to scrollable map"
              >
                [ VIEW SCROLL MAP ]
              </button>
            )}

            {onReturnToHall && (
              <button
                onClick={onReturnToHall}
                className="font-orbitron text-xs bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-amber-400 text-black font-extrabold px-3.5 py-1 rounded pixel-corners-sm shadow-[0_0_12px_rgba(250,204,21,0.5)] cursor-pointer transition-all"
              >
                [ GREAT HALL ]
              </button>
            )}
          </div>
        </header>

        {/* =============================================================== */}
        {/* 2. THE COMPLETE PANORAMIC 2.5D OVERWORLD MAP SVG CANVAS          */}
        {/* =============================================================== */}
        <div className="relative flex-1 w-full h-full min-h-0 overflow-hidden bg-[#070611]">
          {/* Pixel Starlight Grid */}
          <div className="absolute inset-0 bg-game-grid opacity-25 pointer-events-none"></div>

          {/* Biome Ambient Nebulas */}
          <div className="absolute left-10 bottom-10 w-96 h-96 rounded-full bg-emerald-500/15 blur-[120px] pointer-events-none"></div>
          <div className="absolute right-10 bottom-20 w-96 h-96 rounded-full bg-blue-500/15 blur-[120px] pointer-events-none"></div>
          <div className="absolute right-40 top-30 w-80 h-80 rounded-full bg-amber-500/12 blur-[110px] pointer-events-none"></div>
          <div className="absolute left-20 top-30 w-80 h-80 rounded-full bg-purple-500/15 blur-[110px] pointer-events-none"></div>
          <div className="absolute left-1/2 -translate-x-1/2 top-10 w-96 h-80 rounded-full bg-red-500/20 blur-[130px] pointer-events-none"></div>

          {/* The Master SVG Map */}
          <svg
            className="w-full h-full select-none"
            viewBox="20 -10 1400 880"
            preserveAspectRatio="xMidYMid meet"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="sfIslandCliff" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#78350f" />
                <stop offset="40%" stopColor="#451a03" />
                <stop offset="100%" stopColor="#1e1005" />
              </linearGradient>

              <linearGradient id="sfSummitCliff" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#991b1b" />
                <stop offset="40%" stopColor="#450a0a" />
                <stop offset="100%" stopColor="#1a0404" />
              </linearGradient>

              <linearGradient id="sfLushRoad" x1="0%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#b45309" />
                <stop offset="50%" stopColor="#d97706" />
                <stop offset="100%" stopColor="#f59e0b" />
              </linearGradient>

              {/* Pixel Turf Grass Tile Pattern */}
              <pattern id="sfGrassTile" width="16" height="16" patternUnits="userSpaceOnUse">
                <rect width="16" height="16" fill="#15803d" />
                <rect x="2" y="2" width="4" height="5" fill="#16a34a" />
                <rect x="8" y="7" width="3" height="4" fill="#22c55e" />
                <rect x="10" y="1" width="2" height="3" fill="#4ade80" />
                <circle cx="6" cy="12" r="1" fill="#facc15" />
              </pattern>

              <filter id="sfShadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="12" stdDeviation="10" floodColor="#000000" floodOpacity="0.8" />
              </filter>
              <filter id="sfGlowGold" x="-40%" y="-40%" width="180%" height="180%">
                <feGaussianBlur stdDeviation="8" result="b" />
                <feComposite in="SourceGraphic" in2="b" operator="over" />
              </filter>
              <filter id="sfGlowCyan" x="-40%" y="-40%" width="180%" height="180%">
                <feGaussianBlur stdDeviation="10" result="b" />
                <feComposite in="SourceGraphic" in2="b" operator="over" />
              </filter>
            </defs>

            {/* --- 1. WINDING ROAD TRAILS --- */}
            <g id="sfRoads">
              {/* Earthen Trench */}
              <path
                d={singleFrameRoadPath}
                fill="none"
                stroke="#381502"
                strokeWidth="24"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Luminous Cobblestone Dirt Road */}
              <path
                d={singleFrameRoadPath}
                fill="none"
                stroke="url(#sfLushRoad)"
                strokeWidth="16"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Animated Glowing Stepping Trail */}
              <path
                d={singleFrameRoadPath}
                fill="none"
                stroke="#facc15"
                strokeWidth="5"
                strokeDasharray="8 10"
                strokeLinecap="round"
                className="animate-path-flow"
              />
              {/* Radiant Cyan Core Beam */}
              <path
                d={singleFrameRoadPath}
                fill="none"
                stroke="#5de6ff"
                strokeWidth="2.5"
                opacity="0.85"
                filter="url(#sfGlowCyan)"
              />
            </g>

            {/* --- 2. JOURNEY ENTRANCE DOCK --- */}
            <g transform="translate(100, 750)" filter="url(#sfShadow)">
              <ellipse cx="0" cy="24" rx="75" ry="34" fill="url(#sfIslandCliff)" stroke="#271302" strokeWidth="3" />
              <ellipse cx="0" cy="8" rx="70" ry="28" fill="#15803d" stroke="#4ade80" strokeWidth="3" />
              <ellipse cx="0" cy="5" rx="62" ry="22" fill="url(#sfGrassTile)" />
              <rect x="-65" y="-8" width="130" height="22" rx="4" fill="#151326" stroke="#facc15" strokeWidth="1.5" />
              <text x="0" y="7" fill="#facc15" fontFamily="'Orbitron', sans-serif" fontSize="10" fontWeight="bold" textAnchor="middle">
                🚀 ENTRANCE
              </text>

          {/* =============================================================== */}
          {/* Cat at start dock if not yet moved */}
          {state?.catPositionId === 'start' && (
            <g transform="translate(0, -32)">
              <AnimatedCatCharacter state="idle" facing="right" scale={1.2} />
            </g>
          )}
            </g>

            {/* --- 3. THE 16 2.5D BIOME ISLANDS & 2X NAME DISPLAYS --- */}
            {milestones.map((ms) => {
              const coords = SINGLE_FRAME_COORDS[ms.id];
              if (!coords) return null;

              const isCompleted = state?.completedMilestones?.includes(ms.id) || isFinished;
              const isActive = state?.activeMilestoneId === ms.id && !isFinished;
              const isFood = state?.foodPositionId === ms.id && !isFinished;
              const hasCat = state?.catPositionId === ms.id && !isFinished;
              const isBothHere = (hasCat && isFood) || (ms.isFinal && isFinished);
              const biome = getBiomeColors(ms.chapter, ms.isFinal);
              const cliffGrad = ms.isFinal ? 'url(#sfSummitCliff)' : 'url(#sfIslandCliff)';

              return (
                <g
                  key={`sf-island-${ms.id}`}
                  transform={`translate(${coords.x}, ${coords.y})`}
                  role="button"
                  tabIndex={0}
                  aria-label={`Milestone ${String(ms.order).padStart(2, '0')}: ${ms.title}. ${isCompleted ? 'Mastered' : isActive ? 'Active target' : isFood ? 'Chapter goal' : 'Locked'}`}
                  onClick={() => setSelectedMilestone(ms)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setSelectedMilestone(ms);
                    }
                  }}
                  className="cursor-pointer group outline-none focus:outline-none"
                >
                  {/* Island Earthen Cliff & Turf */}
                  <g filter="url(#sfShadow)">
                    <ellipse
                      cx="0"
                      cy="26"
                      rx={coords.rx + 6}
                      ry={coords.ry + 6}
                      fill={cliffGrad}
                      stroke="#271302"
                      strokeWidth="3.5"
                    />
                    <ellipse
                      cx="0"
                      cy="10"
                      rx={coords.rx}
                      ry={coords.ry}
                      fill="#15803d"
                      stroke={biome.rim}
                      strokeWidth="3.5"
                    />
                    <ellipse
                      cx="0"
                      cy="6"
                      rx={coords.rx - 10}
                      ry={coords.ry - 8}
                      fill="url(#sfGrassTile)"
                    />

                    {/* Small Tree on island */}
                    <rect x={-coords.rx + 24} y="-6" width="3" height="8" fill="#78350f" />
                    <polygon points={`${-coords.rx + 25},-18 ${-coords.rx + 18},-4 ${-coords.rx + 33},-4`} fill="#166534" />
                    <polygon points={`${-coords.rx + 25},-24 ${-coords.rx + 20},-12 ${-coords.rx + 31},-12`} fill="#22c55e" />
                  </g>

                  {/* Active / Food Pulse Aura */}
                  {isActive && (
                    <circle
                      cx="0"
                      cy="0"
                      r="28"
                      fill="none"
                      stroke="#5de6ff"
                      strokeWidth="2"
                      strokeDasharray="5 4"
                      className="animate-spin"
                      style={{ animationDuration: '6s' }}
                    />
                  )}
                  {isFood && !isActive && (
                    <circle
                      cx="0"
                      cy="0"
                      r="26"
                      fill="none"
                      stroke="#f59e0b"
                      strokeWidth="1.5"
                      strokeDasharray="4 4"
                      className="animate-pulse"
                    />
                  )}

                  {/* Station Pedestal */}
                  <circle
                    cx="0"
                    cy="0"
                    r="18"
                    fill="#151326"
                    stroke={isCompleted ? '#facc15' : isActive ? '#5de6ff' : isFood ? '#f59e0b' : '#3c3749'}
                    strokeWidth="2.2"
                    filter={isCompleted ? 'url(#sfGlowGold)' : isActive ? 'url(#sfGlowCyan)' : 'none'}
                  />
                  <circle
                    cx="0"
                    cy="0"
                    r="12"
                    fill={isCompleted ? '#ca801e' : isActive ? '#00cbe6' : isFood ? '#b45309' : '#1e1c27'}
                    opacity={isCompleted || isActive || isFood ? 0.45 : 0.8}
                  />
                  <text
                    x="0"
                    y="4"
                    fill="#ffffff"
                    fontFamily="'Orbitron', sans-serif"
                    fontSize="10"
                    fontWeight="900"
                    textAnchor="middle"
                  >
                    {String(ms.order).padStart(2, '0')}
                  </text>

                  {/* Gold Checkmark on Complete */}
                  {isCompleted && (
                    <g transform="translate(13, -13)">
                      <circle cx="0" cy="0" r="6" fill="#ca801e" stroke="#facc15" strokeWidth="1.5" />
                      <text x="0" y="3" fill="#ffffff" fontFamily="'JetBrains Mono', monospace" fontSize="7" fontWeight="900" textAnchor="middle">
                        ✓
                      </text>
                    </g>
                  )}

                  {/* =================================================== */}
                  {/* 2X PROMINENT MILESTONE NAME BANNER DISPLAY          */}
                  {/* =================================================== */}
                  <g transform="translate(0, 24)">
                    <rect
                      x="-85"
                      y="0"
                      width="170"
                      height="38"
                      rx="6"
                      fill="#120F24"
                      stroke={isCompleted ? '#facc15' : isActive ? '#5de6ff' : isFood ? '#f59e0b' : '#2A264F'}
                      strokeWidth="1.8"
                      className="shadow-xl"
                    />
                    <text
                      x="0"
                      y="16"
                      fill={isActive ? '#5de6ff' : isFood ? '#f59e0b' : '#ffffff'}
                      fontFamily="'Orbitron', sans-serif"
                      fontSize="13"
                      fontWeight="900"
                      letterSpacing="0.5px"
                      textAnchor="middle"
                    >
                      {String(ms.order).padStart(2, '0')} {ms.title}
                    </text>
                    <text
                      x="0"
                      y="29"
                      fill={isCompleted ? '#facc15' : isActive ? '#38bdf8' : isFood ? '#f59e0b' : '#94a3b8'}
                      fontFamily="'JetBrains Mono', monospace"
                      fontSize="8.5"
                      fontWeight="700"
                      textAnchor="middle"
                    >
                      {isCompleted ? `MASTERED • +${ms.xp} XP` : isActive ? '▶ ACTIVE' : isFood ? '🍖 CHAPTER GOAL' : 'LOCKED'}
                    </text>
                  </g>

                  {/* Characters Placed on Island */}
                  {isBothHere ? (
                    <g transform="translate(0, -38)">
                      <g transform="translate(-18, 0)">
                        <AnimatedCatCharacter state="celebrating" facing="right" scale={1.2} />
                      </g>
                      <g transform="translate(18, 0)">
                        <AnimatedFoodCharacter state="joined" scale={1.2} />
                      </g>
                    </g>
                  ) : (
                    <>
                      {hasCat && (
                        <g transform="translate(0, -38)">
                          <AnimatedCatCharacter state="idle" facing="right" scale={1.3} />
                        </g>
                      )}
                      {isFood && (
                        <g transform="translate(0, -36)">
                          <AnimatedFoodCharacter state="waiting" scale={1.3} />
                        </g>
                      )}
                    </>
                  )}
                </g>
              );
            })}
          </svg>

          {/* =============================================================== */}
          {/* 4. SAGE BYTERION FLOATING LORE CARD (Selected Milestone)        */}
          {/* ISSUE-17: Added dismiss [✕] button so card can be closed        */}
          {/* =============================================================== */}
          {activeMilestoneDetail && (
            <div className="absolute top-4 left-4 sm:left-6 z-30 max-w-sm sm:max-w-md bg-[#100D24]/95 border-2 border-yellow-400/90 rounded-xl p-3 sm:p-4 shadow-[0_0_30px_rgba(0,0,0,0.9),0_0_20px_rgba(250,204,21,0.3)] backdrop-blur-xl flex gap-3 items-start animate-in slide-in-from-top-3 duration-300">
              <div className="w-14 h-14 sm:w-16 sm:h-16 shrink-0 bg-gradient-to-b from-[#251D4B] to-[#0A0718] border-2 border-yellow-400 rounded-lg flex items-center justify-center p-1 shadow-md overflow-hidden">
                <img
                  src="/assets/wizard/wizard_explaining.png"
                  alt="Sage Byterion"
                  className="w-full h-full object-contain"
                  style={{ imageRendering: 'pixelated' }}
                />
              </div>

              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between border-b border-purple-800/60 pb-1">
                  <span className="font-orbitron text-[10px] sm:text-xs font-black text-yellow-300">
                    #{String(activeMilestoneDetail.order).padStart(2, '0')} {activeMilestoneDetail.title.toUpperCase()}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="font-vt323 text-xs text-cyan-300">
                      CH {activeMilestoneDetail.chapter}
                    </span>
                    {/* ISSUE-17: Dismiss button */}
                    <button
                      onClick={() => setSelectedMilestone(null)}
                      aria-label="Dismiss lore card"
                      className="text-gray-500 hover:text-white font-bold text-sm px-1.5 hover:bg-white/10 rounded transition-colors cursor-pointer leading-none"
                      title="Dismiss"
                    >
                      ✕
                    </button>
                  </div>
                </div>
                <p className="font-vt323 text-sm sm:text-base text-yellow-100 leading-snug whitespace-pre-line">
                  "{activeMilestoneDetail.wizardDialogue || 'The journey continues forward through the web realm.'}"
                </p>

                {activeMilestoneDetail?.concepts && activeMilestoneDetail.concepts.length > 0 && (
                  <div className="pt-1">
                    <div className="font-orbitron text-[9px] font-bold text-cyan-300 tracking-wider mb-1 flex items-center gap-1">
                      <span>⚡</span>
                      <span>CONCEPTS:</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {activeMilestoneDetail.concepts.map((c, i) => (
                        <span key={i} className="text-[10px] font-vt323 px-1.5 py-0.5 rounded bg-purple-950/80 border border-purple-500/40 text-yellow-200">
                          • {c}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="text-[10px] font-vt323 text-gray-400 flex items-center gap-2 pt-0.5">
                  <span className="text-yellow-400">+{activeMilestoneDetail.xp} XP REWARD</span>
                  <span>•</span>
                  <span>TOUCH ANY ISLAND TO INSPECT</span>
                </div>
              </div>
            </div>
          )}

          {/* =============================================================== */}
          {/* 5. FINALE CELEBRATION BADGE (At 100% Completion)                */}
          {/* =============================================================== */}
          {isFinished && (
            <div className="absolute top-4 right-4 sm:right-6 z-30 bg-[#161230]/95 border-2 border-yellow-400 rounded-xl p-3 shadow-[0_0_25px_rgba(250,204,21,0.4)] backdrop-blur-xl flex items-center gap-3">
              <div className="text-2xl">🏆</div>
              <div>
                <div className="font-orbitron font-extrabold text-xs text-yellow-300">
                  JOURNEY COMPLETE!
                </div>
                <div className="font-vt323 text-xs text-green-300">
                  ALL 16 MILESTONES MASTERED • RANK: FULL-STACK ARCHITECT
                </div>
              </div>
            </div>
          )}
        </div>

        {/* =============================================================== */}
        {/* 6. BOTTOM BIOME LEGEND & QUICK ACTIONS                          */}
        {/* =============================================================== */}
        <footer className="relative z-20 bg-[#0B0A16]/95 border-t border-[#2A264F] py-1.5 px-4 sm:px-6 flex flex-wrap items-center justify-between text-xs font-vt323 text-gray-400 shrink-0">
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="text-emerald-400">● Ch 1: HTML/CSS/JS</span>
            <span>•</span>
            <span className="text-cyan-400">● Ch 2: DOM/Events/ES6</span>
            <span>•</span>
            <span className="text-blue-400">● Ch 3: Async/Fetch/JSON</span>
            <span>•</span>
            <span className="text-amber-400">● Ch 4: Node/npm/Express</span>
            <span>•</span>
            <span className="text-purple-400">● Ch 5: REST/DB/Auth</span>
            <span>•</span>
            <span className="text-red-400">● Summit: Capstone</span>
          </div>

          <div className="flex items-center gap-2">
            <span>⚡ SINGLE FRAME HIGH-ALTITUDE OVERWORLD</span>
            <span>•</span>
            <span className="text-green-400">● 60 FPS</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
