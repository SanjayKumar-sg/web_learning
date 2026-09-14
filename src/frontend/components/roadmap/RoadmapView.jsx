import React, { useRef, useEffect, useState } from 'react';
import { useRoadmapEngine } from '../../hooks/useRoadmapEngine';
import WizardRoadmapGuide from './WizardRoadmapGuide';
import FinalCelebrationModal from './FinalCelebrationModal';
import SingleFrameRoadmap from './SingleFrameRoadmap';
import AnimatedCatCharacter from './characters/AnimatedCatCharacter';
import AnimatedFoodCharacter from './characters/AnimatedFoodCharacter';

export default function RoadmapView({ onReturnToHall }) {
  const [showSingleFrameRoadmap, setShowSingleFrameRoadmap] = useState(false);
  const {
    state,
    milestones,
    completedCount,
    totalMilestones,
    progressPercent,
    catAnimation,
    foodAnimation,
    catFacing,
    catMotion,
    foodMotion,
    wizardState,
    showCelebration,
    touchIsland,
    advanceToNext,
    returnToObjective,
    dismissWizard,
    resetProgress,
    setShowCelebration
  } = useRoadmapEngine();

  const activeMilestone = milestones.find((m) => m.id === state.activeMilestoneId) || milestones[0];
  const mapScrollRef = useRef(null);

  useEffect(() => {
    if (import.meta.env.DEV) {
      window.__roadmapTest = {
        touchIsland,
        advanceToNext,
        resetProgress,
        milestones,
        state,
        setShowCelebration,
        setShowSingleFrameRoadmap
      };
    }
  }, [touchIsland, advanceToNext, resetProgress, milestones, state, setShowCelebration]);

  // ISSUE-11: Single extracted scroll centering function (DRY)
  const centerOnActiveTarget = (behavior = 'smooth') => {
    if (!mapScrollRef.current) return;
    const activeMs =
      milestones.find((m) => m.id === state.activeMilestoneId) ||
      milestones.find((m) => m.id === state.foodPositionId) ||
      milestones[0];
    const viewportW = mapScrollRef.current.clientWidth || window.innerWidth || 1440;
    const viewportH = mapScrollRef.current.clientHeight || window.innerHeight || 900;
    // Intelligent dynamic framing: Guide docks opposite side from active node
    const isRightNode = activeMs.x > 1000;
    const targetScrollX = isRightNode
      ? Math.max(0, activeMs.x - viewportW * 0.58)
      : Math.max(0, activeMs.x - viewportW * 0.42);
    const targetScrollY = Math.max(0, activeMs.y - viewportH * 0.46);
    mapScrollRef.current.scrollTo({ top: targetScrollY, left: targetScrollX, behavior });
  };

  // Auto-scroll to Cat / Active Target on initial mount and viewport resize
  useEffect(() => {
    centerOnActiveTarget();
    const handleResize = () => centerOnActiveTarget('instant');
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [state.activeMilestoneId, state.foodPositionId, milestones]);

  // Recenter button action (alias)
  const scrollToActiveHero = () => centerOnActiveTarget();

  // SVG connecting road path string linking all 16 milestone coordinates
  // Smooth continuous Bezier spline passing cleanly through each island station
  const mainRoadPath = `
    M 1000 3540
    C 1000 3440, 1000 3380, 1000 3300
    C 1000 3200, 680 3180, 680 3080
    C 680 2980, 1300 2960, 1300 2860
    C 1300 2760, 720 2740, 720 2640
    C 720 2540, 1280 2520, 1280 2420
    C 1280 2320, 700 2300, 700 2200
    C 700 2100, 1260 2080, 1260 1980
    C 1260 1880, 740 1860, 740 1760
    C 740 1660, 1240 1640, 1240 1540
    C 1240 1440, 760 1420, 760 1320
    C 760 1220, 1220 1200, 1220 1100
    C 1220 1000, 780 980, 780 880
    C 780 780, 1200 760, 1200 660
    C 1200 560, 800 540, 800 440
    C 800 350, 1160 340, 1160 260
    C 1160 170, 1000 170, 1000 90
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
              <span>CAT: <strong className="text-cyan-300">🐱 {(milestones.find(m => m.id === state.catPositionId)?.title || state.catPositionId).toUpperCase()}</strong></span>
              <span>•</span>
              <span>FOOD: <strong className="text-yellow-300">🍖 {(milestones.find(m => m.id === state.foodPositionId)?.title || state.foodPositionId).toUpperCase()}</strong></span>
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
        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            onClick={() => setShowSingleFrameRoadmap(true)}
            className="font-vt323 text-xs sm:text-sm bg-yellow-950/80 hover:bg-yellow-900 text-yellow-300 hover:text-white border border-yellow-500/80 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded pixel-corners-sm transition-all cursor-pointer shadow-[0_0_12px_rgba(250,204,21,0.35)] flex items-center gap-1.5 shrink-0"
            title="View complete 16-milestone roadmap in a single frame"
          >
            <span>🗺️</span>
            <span className="hidden sm:inline">[ FULL ROADMAP (1 FRAME) ]</span>
            <span className="sm:hidden">FULL MAP</span>
          </button>

          <button
            onClick={resetProgress}
            className="font-vt323 text-xs text-gray-400 hover:text-red-300 border border-gray-800 hover:border-red-800/80 px-2 py-1 sm:px-2.5 sm:py-1.5 rounded transition-colors cursor-pointer shrink-0"
            title="Reset journey to beginning"
          >
            <span className="hidden sm:inline">[ ⟲ RESET ]</span>
            <span className="sm:hidden">⟲</span>
          </button>

          <button
            onClick={onReturnToHall}
            className="font-vt323 text-xs sm:text-sm bg-[#1A1733] hover:bg-purple-950 text-cyan-300 hover:text-white border border-purple-500/50 px-2.5 py-1 sm:px-3.5 sm:py-1.5 rounded pixel-corners-sm transition-all cursor-pointer shadow-[0_0_12px_rgba(168,85,247,0.35)] flex items-center gap-1 shrink-0"
          >
            <span>🏛️</span>
            <span className="hidden sm:inline">[ ← RETURN TO GREAT HALL ]</span>
            <span className="sm:hidden">HALL</span>
          </button>
        </div>
      </header>

      {/* ================================================================= */}
      {/* 2. FLOATING OVERWORLD DOCK & LEGEND (Top Left)                    */}
      {/* ================================================================= */}
      <div className="fixed top-18 left-4 sm:left-6 z-30 flex flex-col gap-2 pointer-events-auto">
        <div className="p-1.5 bg-[#151326]/95 backdrop-blur-md border border-[#2A264F] rounded-xl flex items-center gap-2 shadow-2xl">
          <button
            onClick={scrollToActiveHero}
            className="px-3.5 py-1.5 rounded-lg bg-cyan-950/90 border border-cyan-400/80 text-cyan-300 font-vt323 text-sm sm:text-base flex items-center gap-1.5 hover:bg-cyan-900 transition-colors cursor-pointer font-bold shadow-[0_0_12px_rgba(34,211,238,0.4)]"
            title="Recenter Camera to Cat & Food Target"
          >
            <span>🎯</span>
            <span>Recenter Camera</span>
          </button>

          <div className="h-4 w-px bg-gray-700/80"></div>

          <div className="px-2.5 font-vt323 text-xs sm:text-sm text-gray-300">
            PROGRESS: <strong className="text-yellow-400 font-black">{completedCount} / {totalMilestones}</strong> ({progressPercent}%)
          </div>
        </div>

        {/* Legend Pill — color keys only, no numeric duplication */}
        <div className="px-3 py-1 bg-[#151326]/90 backdrop-blur-md border border-[#2A264F] rounded-lg flex items-center gap-3 font-vt323 text-xs text-gray-300 shadow-md">
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-400"></span>
            <span className="text-yellow-400">Mastered</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping"></span>
            <span className="text-cyan-300 font-bold">Active</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-gray-600"></span>
            <span className="text-gray-500">Locked</span>
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
                <ellipse cx="0" cy="40" rx="160" ry="70" fill="url(#islandCliffGrad)" stroke="#271302" strokeWidth="4" />
                <ellipse cx="0" cy="15" rx="150" ry="60" fill="#15803d" stroke="#4ade80" strokeWidth="4" />
                <ellipse cx="0" cy="10" rx="135" ry="50" fill="url(#rpgGrassTile)" />
                <rect x="-175" y="-20" width="350" height="56" rx="10" fill="#151326" stroke="#facc15" strokeWidth="2.5" />
                <text x="0" y="16" fill="#facc15" fontFamily="'Orbitron', sans-serif" fontSize="24" fontWeight="900" letterSpacing="1px" textAnchor="middle">
                  🚀 JOURNEY ENTRANCE
                </text>

                {/* Cat character at starting harbor dock (2x Hero Scale) */}
                {state.catPositionId === 'start' && !catMotion?.inFlight && (
                  <g transform="translate(0, -56)">
                    <AnimatedCatCharacter state={catAnimation} facing={catFacing} scale={2.0} />
                  </g>
                )}
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
                const isActiveObjective = state.activeMilestoneId === ms.id;
                const isFoodIsland = state.foodPositionId === ms.id;
                const hasCat = state.catPositionId === ms.id;
                const hasFood = state.foodPositionId === ms.id;
                const isBothHere = hasCat && hasFood;

                return (
                  <g
                    key={`station-${ms.id}`}
                    transform={`translate(${ms.x}, ${ms.y})`}
                    role="button"
                    tabIndex={0}
                    aria-label={`Milestone ${String(ms.order).padStart(2, '0')}: ${ms.title}. ${isCompleted ? 'Mastered' : isActiveObjective ? 'Active target' : isFoodIsland ? 'Chapter goal' : 'Locked'}`}
                    onClick={() => touchIsland(ms)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        touchIsland(ms);
                      }
                    }}
                    className="cursor-pointer group outline-none focus:outline-none"
                  >
                    {/* Ring Halo around active objective */}
                    {isActiveObjective && (
                      <circle
                        cx="0"
                        cy="0"
                        r="38"
                        fill="none"
                        stroke="#5de6ff"
                        strokeWidth="2.5"
                        strokeDasharray="6 5"
                        className="animate-spin"
                        style={{ animationDuration: '6s' }}
                      />
                    )}

                    {/* Ring Halo around chapter goal food island */}
                    {isFoodIsland && !isActiveObjective && (
                      <circle
                        cx="0"
                        cy="0"
                        r="34"
                        fill="none"
                        stroke="#f59e0b"
                        strokeWidth="2"
                        strokeDasharray="4 4"
                        className="animate-pulse"
                      />
                    )}

                    {/* In-World Quest Waypoint Beacon above active objective island */}
                    {isActiveObjective && !hasCat && !isCompleted && (
                      <g
                        transform={`translate(0, ${hasFood ? -92 : -72})`}
                        className="animate-bounce pointer-events-none"
                      >
                        {/* Glowing Crystal Quest Marker */}
                        <polygon
                          points="0,-16 9,0 0,16 -9,0"
                          fill="#22d3ee"
                          filter="url(#cyanGlow)"
                          opacity="0.95"
                        />
                        <polygon
                          points="0,-10 5,0 0,10 -5,0"
                          fill="#ffffff"
                        />
                        {/* Pulsing Target Radar Ring */}
                        <circle
                          cx="0"
                          cy="20"
                          r="5"
                          fill="none"
                          stroke="#22d3ee"
                          strokeWidth="1.5"
                          className="animate-ping"
                          opacity="0.75"
                        />
                      </g>
                    )}

                    {/* Central Pedestal (Enlarged & Prominent) */}
                    <circle
                      cx="0"
                      cy="0"
                      r="26"
                      fill="#151326"
                      stroke={
                        isCompleted
                          ? '#facc15'
                          : isActiveObjective
                          ? '#5de6ff'
                          : isFoodIsland
                          ? '#f59e0b'
                          : '#494454'
                      }
                      strokeWidth={isActiveObjective ? '3.5' : '2.8'}
                      filter={
                        isCompleted
                          ? 'url(#goldGlow)'
                          : isActiveObjective
                          ? 'url(#cyanGlow)'
                          : 'none'
                      }
                    />

                    <circle
                      cx="0"
                      cy="0"
                      r="18"
                      fill={
                        isCompleted
                          ? '#ca801e'
                          : isActiveObjective
                          ? '#00cbe6'
                          : isFoodIsland
                          ? '#b45309'
                          : '#1e1c27'
                      }
                      opacity={isCompleted || isActiveObjective || isFoodIsland ? 0.4 : 0.8}
                    />

                    {/* Milestone Order Number */}
                    <text
                      x="0"
                      y="5"
                      fill="#ffffff"
                      fontFamily="'Orbitron', sans-serif"
                      fontSize="13"
                      fontWeight="900"
                      textAnchor="middle"
                    >
                      {String(ms.order).padStart(2, '0')}
                    </text>

                    {/* Gold Trophy Checkmark Flag on Completed */}
                    {isCompleted && (
                      <g transform="translate(20, -20)">
                        <circle cx="0" cy="0" r="9" fill="#ca801e" stroke="#facc15" strokeWidth="2" />
                        <text x="0" y="4" fill="#ffffff" fontFamily="'JetBrains Mono', monospace" fontSize="10" fontWeight="900" textAnchor="middle">
                          ✓
                        </text>
                      </g>
                    )}

                    {/* ISSUE-01: Island Label Banner — narrowed 350→280px, font 26→20px to avoid road overlap */}
                    <g transform="translate(0, 36)">
                      <rect
                        x="-140"
                        y="0"
                        width="280"
                        height="64"
                        rx="10"
                        fill="#100D22"
                        stroke={
                          isCompleted
                            ? '#facc15'
                            : isActiveObjective
                            ? '#5de6ff'
                            : isFoodIsland
                            ? '#f59e0b'
                            : '#2A264F'
                        }
                        strokeWidth={isActiveObjective ? '3.5' : '2.5'}
                        filter={isActiveObjective ? 'url(#cyanGlow)' : 'none'}
                        className="shadow-[0_0_25px_rgba(0,0,0,0.8)]"
                      />
                      <text
                        x="0"
                        y="27"
                        fill={isActiveObjective ? '#5de6ff' : isFoodIsland ? '#f59e0b' : '#ffffff'}
                        fontFamily="'Orbitron', sans-serif"
                        fontSize="20"
                        fontWeight="900"
                        letterSpacing="1px"
                        textAnchor="middle"
                        filter="drop-shadow(0 2px 4px rgba(0,0,0,0.8))"
                      >
                        {String(ms.order).padStart(2, '0')} {ms.title}
                      </text>
                      <text
                        x="0"
                        y="48"
                        fill={
                          isCompleted
                            ? '#facc15'
                            : isActiveObjective
                            ? '#38bdf8'
                            : isFoodIsland
                            ? '#f59e0b'
                            : '#94a3b8'
                        }
                        fontFamily="'JetBrains Mono', monospace"
                        fontSize="13"
                        fontWeight="800"
                        letterSpacing="0.5px"
                        textAnchor="middle"
                      >
                        {isCompleted
                          ? `MASTERED • +${ms.xp} XP`
                          : isActiveObjective
                          ? '▶ TOUCH TO LEAP'
                          : isFoodIsland
                          ? '🍖 CHAPTER GOAL'
                          : 'LOCKED'}
                      </text>
                    </g>

                    {/* =================================================== */}
                    {/* 4. THE CAT & FOOD CHARACTERS (2X HERO SCALE)        */}
                    {/* =================================================== */}
                    {/* Case A: Cat and Food joined together! (Finale) */}
                    {isBothHere ? (
                      <g transform="translate(0, -56)">
                        <g transform="translate(-32, 0)">
                          <AnimatedCatCharacter state="celebrating" facing="right" scale={2.0} />
                        </g>
                        <g transform="translate(32, 0)">
                          <AnimatedFoodCharacter state="joined" scale={2.0} />
                        </g>
                      </g>
                    ) : (
                      <>
                        {/* Case B: Cat is on this island */}
                        {hasCat && !catMotion?.inFlight && (
                          <g transform="translate(0, -56)">
                            <AnimatedCatCharacter state={catAnimation} facing={catFacing} scale={2.0} />
                          </g>
                        )}

                        {/* Case C: Food is on this island */}
                        {hasFood && !foodMotion?.inFlight && (
                          <g transform="translate(0, -54)">
                            <AnimatedFoodCharacter state={foodAnimation} scale={2.0} />
                          </g>
                        )}
                      </>
                    )}
                  </g>
                );
              })}
            </g>

            {/* --- 4. IN-FLIGHT AERIAL MOTION LAYER (2X SCALE) --- */}
            <g id="inFlightCharacters" className="pointer-events-none">
              {/* In-Flight Cat Trajectory */}
              {catMotion?.inFlight && (
                <g transform={`translate(${catMotion.x}, ${catMotion.y - 56})`}>
                  <AnimatedCatCharacter state="jumping" facing={catMotion.facing || catFacing} scale={2.0} />
                </g>
              )}

              {/* In-Flight Food Trajectory */}
              {foodMotion?.inFlight && (
                <g transform={`translate(${foodMotion.x}, ${foodMotion.y - 54})`}>
                  <AnimatedFoodCharacter state="leaping" scale={2.0} />
                </g>
              )}
            </g>
          </svg>
        </div>
      </main>

      {/* ================================================================= */}
      {/* 4. SAGE BYTERION RIGHT-SIDE CODEX & SANCTUM                       */}
      {/* ================================================================= */}
      <WizardRoadmapGuide
        wizardState={wizardState}
        activeMilestone={
          milestones.find(
            (m) => m.id === (wizardState?.inspectedMilestoneId || wizardState?.recapMilestoneId)
          ) || activeMilestone
        }
        nextMilestone={
          milestones[milestones.findIndex((m) => m.id === state.activeMilestoneId) + 1] || null
        }
        state={state}
        catAnimation={catAnimation}
        onAdvance={advanceToNext}
        onDismiss={dismissWizard}
        onCenterHero={scrollToActiveHero}
        onReturnToObjective={returnToObjective}
      />

      {/* ================================================================= */}
      {/* 5. FINAL CELEBRATION MODAL (Cat reaches Food at Summit)           */}
      {/* ================================================================= */}
      {showCelebration && (
        <FinalCelebrationModal
          milestones={milestones}
          state={state}
          totalXp={state.totalXp}
          onReturnToHall={onReturnToHall}
          onResetJourney={resetProgress}
          onClose={() => setShowCelebration(false)}
        />
      )}

      {/* ================================================================= */}
      {/* 5B. SINGLE FRAME ROADMAP OVERVIEW MODAL (Toggled anytime)          */}
      {/* ================================================================= */}
      {showSingleFrameRoadmap && (
        <SingleFrameRoadmap
          milestones={milestones}
          state={state}
          totalXp={state.totalXp}
          onReturnToHall={onReturnToHall}
          onResetJourney={resetProgress}
          onClose={() => setShowSingleFrameRoadmap(false)}
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
          <span className="text-green-400">● READY</span>
        </div>
      </footer>
    </div>
  );
}
