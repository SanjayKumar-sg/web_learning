import React, { useState } from 'react';
import WizardMentor from './WizardMentor';
import PathwayScrollJourney from './PathwayScrollJourney';
import LearningRealmView from './LearningRealmView';
import { PATHWAYS_DATA } from '../../../data/pathways';
import { useWizardFlow } from '../../hooks/useWizardFlow';

// --- CELESTIAL BACKGROUND STARS (20 Programmatic Stars) ---
const CELESTIAL_STARS = [
  { id: 1, top: '8%', left: '12%', size: 'w-1.5 h-1.5', color: 'bg-white', delay: '0s' },
  { id: 2, top: '14%', left: '26%', size: 'w-2 h-2', color: 'bg-cyan-200', delay: '1.2s' },
  { id: 3, top: '22%', left: '78%', size: 'w-1.5 h-1.5', color: 'bg-yellow-200', delay: '0.4s' },
  { id: 4, top: '35%', left: '88%', size: 'w-2 h-2', color: 'bg-purple-300', delay: '2.1s' },
  { id: 5, top: '42%', left: '6%', size: 'w-1.5 h-1.5', color: 'bg-cyan-100', delay: '1.7s' },
  { id: 6, top: '55%', left: '18%', size: 'w-2.5 h-2.5', color: 'bg-white', delay: '0.8s' },
  { id: 7, top: '68%', left: '82%', size: 'w-1.5 h-1.5', color: 'bg-yellow-300', delay: '2.5s' },
  { id: 8, top: '75%', left: '34%', size: 'w-1.5 h-1.5', color: 'bg-white', delay: '1.1s' },
  { id: 9, top: '85%', left: '65%', size: 'w-2 h-2', color: 'bg-cyan-300', delay: '0.3s' },
  { id: 10, top: '12%', left: '50%', size: 'w-1.5 h-1.5', color: 'bg-purple-200', delay: '1.9s' },
  { id: 11, top: '28%', left: '42%', size: 'w-1.5 h-1.5', color: 'bg-white', delay: '2.8s' },
  { id: 12, top: '48%', left: '94%', size: 'w-2 h-2', color: 'bg-yellow-100', delay: '0.6s' },
  { id: 13, top: '62%', left: '4%', size: 'w-2 h-2', color: 'bg-cyan-200', delay: '1.4s' },
  { id: 14, top: '78%', left: '15%', size: 'w-1.5 h-1.5', color: 'bg-white', delay: '2.3s' },
  { id: 15, top: '92%', left: '45%', size: 'w-1.5 h-1.5', color: 'bg-purple-300', delay: '0.9s' },
  { id: 16, top: '5%', left: '92%', size: 'w-2 h-2', color: 'bg-white', delay: '1.5s' },
  { id: 17, top: '38%', left: '62%', size: 'w-1.5 h-1.5', color: 'bg-cyan-300', delay: '2.7s' },
  { id: 18, top: '52%', left: '48%', size: 'w-1.5 h-1.5', color: 'bg-yellow-200', delay: '1.8s' },
  { id: 19, top: '88%', left: '90%', size: 'w-2.5 h-2.5', color: 'bg-white', delay: '0.2s' },
  { id: 20, top: '65%', left: '70%', size: 'w-1.5 h-1.5', color: 'bg-purple-100', delay: '3.1s' }
];

const AnimatedBackground = () => (
  <div className="fixed inset-0 w-full h-full pointer-events-none z-0 bg-[#0B0A16] overflow-hidden">
    {/* CSS Pixel Grid */}
    <div className="absolute inset-0 bg-game-grid opacity-30"></div>

    {/* Drifting Mist Clouds */}
    <div className="absolute top-20 left-10 w-32 h-8 bg-purple-900/40 pixel-corners blur-sm animate-cloud-drift-slow"></div>
    <div className="absolute top-40 left-1/3 w-48 h-12 bg-cyan-900/30 pixel-corners blur-md animate-cloud-drift-medium"></div>
    <div className="absolute top-60 right-20 w-24 h-6 bg-purple-800/20 pixel-corners blur-sm animate-cloud-drift-fast"></div>

    {/* 20 Celestial Twinkling Stars */}
    {CELESTIAL_STARS.map((star) => (
      <div
        key={star.id}
        className={`absolute ${star.size} ${star.color} rounded-full animate-star-twinkle shadow-[0_0_10px_rgba(255,255,255,0.9)]`}
        style={{
          top: star.top,
          left: star.left,
          animationDelay: star.delay
        }}
      />
    ))}

    {/* Scanline overlay */}
    <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] opacity-20"></div>
  </div>
);

// --- TOP NAVIGATION BAR WITH RESPONSIVE MOBILE DRAWER ---
const TopNavBar = ({ onLogout, user }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="w-full bg-[#151326]/95 border-b border-[#2A264F] py-2 px-4 sm:px-6 sticky top-0 z-40 backdrop-blur-md flex-shrink-0">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo & Online Status */}
        <div className="flex items-center gap-3">
          <h1 className="font-orbitron font-bold text-base sm:text-lg tracking-wider text-purple-400 drop-shadow-[0_0_8px_rgba(168,85,247,0.8)]">
            ARQ LearnHub
          </h1>
          <span className="font-vt323 text-green-400 text-xs animate-pulse border border-green-500/30 px-2 py-0.5 rounded bg-green-900/20">
            ONLINE
          </span>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 font-vt323 text-base text-gray-400" aria-label="Main Navigation">
          <button className="text-cyan-400 border-b-2 border-cyan-400 pb-0.5 cursor-pointer font-bold">
            ⚔ Quests
          </button>
          <button
            disabled
            className="cursor-not-allowed opacity-50 hover:text-gray-400 transition-colors flex items-center gap-1 group relative"
            title="Locked: Terminal is sealed until Chapter 2"
          >
            <span>Terminal</span>
            <span className="text-[10px] text-yellow-500/80 font-orbitron">[LOCKED]</span>
          </button>
          <button
            disabled
            className="cursor-not-allowed opacity-50 hover:text-gray-400 transition-colors flex items-center gap-1 group relative"
            title="Locked: Codex archives are currently being transcribed"
          >
            <span>Codex</span>
            <span className="text-[10px] text-yellow-500/80 font-orbitron">[LOCKED]</span>
          </button>
          <button
            disabled
            className="cursor-not-allowed opacity-50 hover:text-gray-400 transition-colors flex items-center gap-1 group relative"
            title="Locked: Guild hall opens at Level 5"
          >
            <span>Guild</span>
            <span className="text-[10px] text-yellow-500/80 font-orbitron">[LOCKED]</span>
          </button>
        </nav>

        {/* Status Badges & Controls */}
        <div className="flex items-center gap-2 sm:gap-3 font-vt323 text-xs">
          <div className="bg-red-950/50 border border-red-900/50 text-red-400 px-2.5 sm:px-3 py-1 rounded pixel-corners-sm flex items-center gap-1">
            <span>❤️</span> <span>{user?.hp ?? 100} HP</span>
          </div>
          <div className="bg-yellow-950/50 border border-yellow-900/50 text-yellow-400 px-2.5 sm:px-3 py-1 rounded pixel-corners-sm flex items-center gap-1">
            <span>🪙</span> <span>{user?.gold ?? 240} G</span>
          </div>

          {onLogout && (
            <button
              onClick={onLogout}
              className="bg-gray-900 hover:bg-red-950/60 border border-gray-700 hover:border-red-500/50 text-gray-400 hover:text-red-300 px-2.5 py-1 rounded pixel-corners-sm transition-colors cursor-pointer hidden sm:block"
              title="Log out to Authentication"
            >
              [ LOGOUT ]
            </button>
          )}

          {/* Mobile Menu Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="md:hidden bg-[#1E1A38] border border-[#2A264F] text-gray-300 hover:text-white px-2.5 py-1 rounded pixel-corners-sm text-sm"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Collapsible Mobile Drawer with Outside-Click Backdrop */}
      {mobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 z-30 bg-black/60 backdrop-blur-xs md:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative z-40 md:hidden mt-2 pt-2 border-t border-[#2A264F] flex flex-col gap-2 font-vt323 text-base text-gray-300 animate-in fade-in slide-in-from-top-2 duration-200">
            <button className="text-left text-cyan-400 font-bold px-2 py-1 bg-[#1E1A38]/50 rounded">
              ⚔ Quests (Active)
            </button>
            <div className="flex items-center justify-between px-2 py-1 text-gray-500">
              <span>Terminal</span>
              <span className="text-xs font-orbitron text-yellow-600">[LOCKED]</span>
            </div>
            <div className="flex items-center justify-between px-2 py-1 text-gray-500">
              <span>Codex</span>
              <span className="text-xs font-orbitron text-yellow-600">[LOCKED]</span>
            </div>
            <div className="flex items-center justify-between px-2 py-1 text-gray-500">
              <span>Guild</span>
              <span className="text-xs font-orbitron text-yellow-600">[LOCKED]</span>
            </div>
            {onLogout && (
              <button
                onClick={onLogout}
                className="text-left text-red-400 px-2 py-1 hover:bg-red-950/30 rounded mt-1 border-t border-gray-800"
              >
                [ LOGOUT ]
              </button>
            )}
          </div>
        </>
      )}
    </header>
  );
};

// --- HERO CARD WITH USER PROPS & ROUNDED-FULL PROGRESS BAR ---
const HeroCard = ({ user }) => {
  const currentXp = user?.currentXp ?? 180;
  const nextLevelXp = user?.nextLevelXp ?? 300;
  const xpPercentage = Math.min(100, Math.round((currentXp / nextLevelXp) * 100));
  const remainingXp = Math.max(0, nextLevelXp - currentXp);

  return (
    <section className="w-full max-w-4xl mx-auto my-1">
      <div className="bg-[#151326] border border-purple-500/40 p-2.5 pixel-corners shadow-[0_0_20px_rgba(139,92,246,0.15)] relative">
        <div className="text-center mb-1">
          <h2 className="font-orbitron font-bold text-sm sm:text-base text-white tracking-widest mb-0.5">
            BEGIN YOUR JOURNEY // HERO STATUS
          </h2>
          <div className="flex items-center justify-center gap-3 font-vt323 text-xs sm:text-sm">
            <span className="text-cyan-400 font-bold">
              LVL {user?.level ?? 1} {user?.name?.toUpperCase() ?? 'NOVICE CODER'}
            </span>
            <span className="text-gray-500">|</span>
            <span className="text-purple-400">
              ARCHETYPE: {user?.archetype?.toUpperCase() ?? 'CODE NEOPHYTE'}
            </span>
          </div>
        </div>

        <div className="bg-[#0B0A16] border border-[#2A264F] p-2 pixel-corners-sm">
          <div className="flex justify-between font-vt323 text-xs mb-1">
            <span className="text-gray-300">
              EXP: <span className="text-cyan-300 font-bold">{currentXp} / {nextLevelXp} XP</span> ({xpPercentage}%)
            </span>
            <span className="text-purple-300">+{remainingXp} XP TO ADVANCE</span>
          </div>
          {/* Rounded-full progress bar container with high contrast shimmer */}
          <div className="w-full h-3 bg-gray-950 border border-gray-700 p-0.5 rounded-full overflow-hidden shadow-inner">
            <div
              className="h-full bg-gradient-to-r from-cyan-400 via-teal-300 to-purple-500 xp-shimmer-bar rounded-full transition-all duration-500 shadow-[0_0_8px_rgba(34,211,238,0.6)]"
              style={{ width: `${xpPercentage}%` }}
            ></div>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- MAIN HOMEPAGE COMPONENT ---
export default function Homepage({ onLogout, user = null }) {
  const [selectedPath, setSelectedPath] = useState(null);
  const [hoveredDoor, setHoveredDoor] = useState(null);
  const [confirmedRealm, setConfirmedRealm] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Hook-managed Sage Byterion state machine
  const {
    wizardAction,
    wizardDialogue,
    onDoorHover,
    onDoorLeave,
    onDoorSelect,
    onConfirmPathStart,
    onReturnToHall
  } = useWizardFlow();

  // Active user data with fallbacks
  const activeUser = user || {
    name: 'Novice Coder',
    level: 1,
    archetype: 'Code Neophyte',
    currentXp: 180,
    nextLevelXp: 300,
    hp: 100,
    gold: 240
  };

  // Door hover handlers
  const handleDoorMouseEnter = (pathId) => {
    setHoveredDoor(pathId);
    onDoorHover(pathId);
  };

  const handleDoorMouseLeave = () => {
    setHoveredDoor(null);
    onDoorLeave();
  };

  // Door selection (opens scroll preview)
  const handleDoorClick = (path) => {
    if (path.isLocked) return;
    onDoorSelect();
    setSelectedPath(path);
  };

  // Confirm choice at bottom of scroll journey
  const handleConfirmPath = (path) => {
    setSelectedPath(null);
    setIsTransitioning(true);
    onConfirmPathStart();

    setTimeout(() => {
      setIsTransitioning(false);
      setConfirmedRealm(path);
    }, 2200);
  };

  // If in active confirmed realm, render realm view
  if (confirmedRealm) {
    return (
      <LearningRealmView
        realm={confirmedRealm}
        onReturnToHall={() => {
          setConfirmedRealm(null);
          onReturnToHall();
        }}
      />
    );
  }

  return (
    <div className="relative min-h-screen bg-[#0B0A16] text-[#F8FAFC] overflow-x-hidden flex flex-col">
      <AnimatedBackground />
      <TopNavBar onLogout={onLogout} user={activeUser} />

      {/* Pure Cinematic Threshold Crossing Overlay */}
      {isTransitioning && (
        <div className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center bg-[#07060E]/90 backdrop-blur-md animate-in fade-in duration-300">
          <div className="absolute w-96 h-96 rounded-full bg-cyan-400/40 blur-3xl animate-ping"></div>
          <div className="absolute w-80 h-80 rounded-full bg-purple-600/30 blur-2xl"></div>
          <div className="relative z-10 text-center space-y-3">
            <div className="flex items-center justify-center gap-3 font-orbitron font-extrabold text-2xl sm:text-4xl text-yellow-300 drop-shadow-[0_0_20px_rgba(250,204,21,0.9)] animate-bounce">
              <span>⚡</span>
              <span>CROSSING THE THRESHOLD</span>
              <span>⚡</span>
            </div>
            <p className="font-vt323 text-xl text-cyan-200 tracking-wide">
              Harmonizing ancient runes with the chosen realm...
            </p>
          </div>
        </div>
      )}

      {/* Main Sanctuary Layout */}
      <main className="relative z-10 flex-grow flex flex-col items-center justify-center gap-3 w-full px-4 py-2">
        {/* Hero Card status */}
        <HeroCard user={activeUser} />

        {/* Freestanding Gigantic Doors Court */}
        <section className="w-full max-w-5xl mx-auto relative z-10 flex flex-col items-center">
          <h2 className="text-center font-vt323 text-sm sm:text-base text-cyan-400/90 mb-2 tracking-widest drop-shadow-[0_0_8px_rgba(34,211,238,0.4)]">
            // GIGANTIC REALM PORTALS // CHOOSE YOUR GATEWAY
          </h2>

          {/* Three Freestanding Doors in Staggered Entrance Animation */}
          <div className="grid grid-cols-3 gap-3 sm:gap-8 xl:gap-14 px-2 sm:px-6 items-end justify-items-center w-full max-w-5xl min-h-[220px] sm:min-h-[280px]">
            {PATHWAYS_DATA.map((path, index) => {
              const isHovered = hoveredDoor === path.id;
              const isLocked = path.isLocked;

              return (
                <div
                  key={path.id}
                  role="button"
                  tabIndex={isLocked ? -1 : 0}
                  aria-label={`Enter ${path.title} for ${path.language}${isLocked ? ' (Locked)' : ''}`}
                  onClick={() => handleDoorClick(path)}
                  onKeyDown={(e) => {
                    if ((e.key === 'Enter' || e.key === ' ') && !isLocked) {
                      e.preventDefault();
                      handleDoorClick(path);
                    }
                  }}
                  onMouseEnter={() => handleDoorMouseEnter(path.id)}
                  onMouseLeave={handleDoorMouseLeave}
                  style={{ animationDelay: `${index * 150}ms` }}
                  className={`group flex flex-col items-center cursor-pointer transition-all duration-300 hover:-translate-y-2 relative select-none animate-door-entrance outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0A16] rounded-lg p-1 ${
                    isLocked ? 'opacity-60 cursor-not-allowed filter grayscale' : ''
                  }`}
                >
                  {/* Gigantic Standalone Portal Door with Per-Door Custom Color Glow */}
                  <div className="relative w-26 h-38 sm:w-36 sm:h-52 md:w-44 md:h-64 xl:w-52 xl:h-76 flex items-center justify-center">
                    <img
                      src={path.doorImage}
                      alt={`${path.language} Gigantic Portal Door`}
                      className={`w-full h-full object-contain filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.9)] transition-all duration-300 ${
                        isHovered
                          ? `scale-105 ${path.doorGlowFilter}`
                          : path.doorHoverFilter
                      }`}
                      style={{ imageRendering: 'pixelated' }}
                    />

                    {/* Locked Overlay Badge */}
                    {isLocked && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 rounded pixel-corners">
                        <span className="text-2xl">🔒</span>
                        <span className="font-orbitron text-[10px] text-yellow-400 font-bold mt-1">LOCKED</span>
                      </div>
                    )}
                  </div>

                  {/* Clean RPG Threshold Marker with dynamic hoverTitleColor */}
                  <div className="mt-1 flex flex-col items-center text-center">
                    <h3 className={`font-orbitron font-bold text-[10px] sm:text-xs md:text-sm text-white tracking-wider ${path.hoverTitleColor || 'group-hover:text-cyan-300'} transition-colors drop-shadow-md`}>
                      {path.title}
                    </h3>
                    <span className="font-vt323 text-xs text-gray-400">
                      REALM: <span className="text-cyan-400 font-bold">{path.language}</span>
                    </span>

                    {/* Styled Action Cue */}
                    <div className="mt-1 font-vt323 text-xs py-1 px-2.5 sm:px-3 bg-[#0B0A16]/90 border border-gray-700 text-gray-300 rounded pixel-corners-sm group-hover:bg-[#F59E0B] group-hover:text-black group-hover:border-[#FDE68A] group-hover:shadow-[0_0_12px_rgba(245,158,11,0.8)] transition-all">
                      <span className="sm:hidden">[ENTER]</span>
                      <span className="hidden sm:inline">[ 📜 UNROLL SCROLL ]</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Centered Wise Wizard Mentor in the Great Hall Court */}
        <section className="relative z-20 flex justify-center w-full mt-2">
          <WizardMentor
            actionState={wizardAction}
            customDialogue={wizardDialogue}
            doorHovered={hoveredDoor}
            isTransitioning={isTransitioning}
          />
        </section>
      </main>

      {/* Reversible Cinematic Pathway Scroll Journey Modal */}
      {selectedPath && (
        <PathwayScrollJourney
          initialPathId={selectedPath.id}
          onClose={() => {
            setSelectedPath(null);
            onReturnToHall();
          }}
          onConfirmChoice={handleConfirmPath}
        />
      )}
    </div>
  );
}
