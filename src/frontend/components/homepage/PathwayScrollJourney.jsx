import React, { useState, useEffect, useCallback } from 'react';
import { PATHWAYS_MAP } from '../../../data/pathways';

export default function PathwayScrollJourney({
  initialPathId = 'javascript',
  onClose,
  onConfirmChoice
}) {
  const [currentPathId, setCurrentPathId] = useState(initialPathId);
  const [isExiting, setIsExiting] = useState(false);
  const path = PATHWAYS_MAP[currentPathId] || PATHWAYS_MAP.javascript;

  // ISSUE-13: useCallback gives ESC handler a stable reference — no re-register on every isExiting change
  const handleSafeClose = useCallback(() => {
    setIsExiting((prev) => {
      if (prev) return prev; // already closing
      setTimeout(() => {
        if (onClose) onClose();
      }, 260);
      return true;
    });
  }, [onClose]);

  // Close on Escape key press with exit animation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') handleSafeClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleSafeClose]);

  // Scroll to top when switching scrolls
  useEffect(() => {
    const scrollContainer = document.getElementById('ancient-scroll-body');
    if (scrollContainer) {
      scrollContainer.scrollTop = 0;
    }
  }, [currentPathId]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="scroll-journey-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-2 sm:p-4 overflow-y-auto select-none animate-in fade-in duration-200"
    >
      {/* Outer Ancient Scroll Container with Top and Bottom Wooden Rollers & Diamond Finials */}
      <div className="relative w-full max-w-2xl my-auto flex flex-col items-center">
        
        {/* ======================================================== */}
        {/* TOP WOODEN ROLLER BAR WITH CORNER GOLD DIAMONDS          */}
        {/* ======================================================== */}
        <div className="w-full flex items-center justify-between relative z-20">
          {/* Top-Left Diamond Finial */}
          <div className="w-8 h-8 sm:w-9 sm:h-9 bg-[#2B1708] border-2 border-[#6B441B] shadow-[0_4px_10px_rgba(0,0,0,0.8)] flex items-center justify-center shrink-0 z-10">
            <div className="w-3.5 h-3.5 bg-[#F5C344] rotate-45 border border-[#FFE885] animate-diamond-glow"></div>
          </div>

          {/* Central Wooden Beam */}
          <div className="flex-1 h-6 sm:h-7 mx-[-3px] bg-gradient-to-b from-[#4A2A12] via-[#241306] to-[#4A2A12] border-y-2 border-[#7A4F23] flex items-center justify-between px-3 shadow-md overflow-hidden">
            <div className="w-full h-[1px] bg-[#D4A359]/30"></div>
          </div>

          {/* Top-Right Diamond Finial */}
          <div className="w-8 h-8 sm:w-9 sm:h-9 bg-[#2B1708] border-2 border-[#6B441B] shadow-[0_4px_10px_rgba(0,0,0,0.8)] flex items-center justify-center shrink-0 z-10">
            <div className="w-3.5 h-3.5 bg-[#F5C344] rotate-45 border border-[#FFE885] animate-diamond-glow"></div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* MAIN LIGHT PARCHMENT BODY (UNFURL / ROLLUP ANIMATION)     */}
        {/* ======================================================== */}
        <div 
          id="ancient-scroll-body"
          className={`w-[96%] bg-[#F3E7C4] text-[#2D1B0D] border-x-[5px] border-[#8C6533] shadow-[0_15px_50px_rgba(0,0,0,0.95)] px-4 sm:px-6 py-4 sm:py-5 relative space-y-3.5 overflow-hidden ${
            isExiting ? 'animate-scroll-rollup pointer-events-none' : 'animate-scroll-unfurl'
          }`}
          style={{
            backgroundImage: `radial-gradient(ellipse at center, rgba(255, 255, 255, 0.4) 0%, rgba(217, 196, 150, 0.5) 100%)`
          }}
        >
          {/* Inner Inscribed Border Frame */}
          <div className="border border-[#A88B57]/70 p-3 sm:p-4 space-y-3 relative">
            
            {/* 1. Header Bar: Title & [ ESC X ] */}
            <div className="flex items-center justify-between pb-2 border-b border-[#B89B65]/70">
              <div id="scroll-journey-title" className="flex items-center gap-1.5 font-pixel text-[10px] sm:text-xs text-[#3E240D] tracking-wide font-bold">
                <span>📄</span>
                <span>✦ COURSE OVERVIEW // {path.id === 'javascript' ? 'JAVASCRIPT' : path.language.toUpperCase()} ✦</span>
              </div>
              <button
                onClick={handleSafeClose}
                className="font-pixel text-[9px] sm:text-[10px] text-[#4A2D10] bg-[#DFCEAA] hover:bg-[#EADCB8] px-2.5 py-0.5 border border-[#9E7D4C] transition-all cursor-pointer shadow-xs active:scale-95 hover:border-[#7A501F]"
                title="Press ESC to close"
              >
                [ ESC ✕ ]
              </button>
            </div>

            {path.id === 'javascript' ? (
              <>
                {/* 2. Subheader Meta: Level & Prerequisites */}
                <div className="flex items-center justify-between text-[9px] sm:text-[10px] font-pixel">
                  <div className="bg-[#E4D4B0] text-[#523315] px-2.5 py-0.5 border border-[#B09360]/70 font-semibold shadow-xs">
                    ✦ LEVEL: BEGINNER FRIENDLY ✦
                  </div>
                  <div className="text-[#6E471C] flex items-center gap-1 font-semibold">
                    <span className="text-amber-600">✓</span>
                    <span>PREREQUISITES: NONE</span>
                  </div>
                </div>

                {/* 3. Title Box with Language Sigil & Overview */}
                <div className="bg-[#E7D9B6] border border-[#B89C67] p-3 rounded-none flex items-start gap-3 sm:gap-4 shadow-inner">
                  <div className="w-11 h-11 sm:w-12 sm:h-12 bg-[#251508] border-2 border-[#C99C3B] shadow-[0_0_10px_rgba(201,156,59,0.35)] flex items-center justify-center shrink-0">
                    <span className="font-pixel text-xs sm:text-sm text-[#FCD34D] font-bold tracking-tighter">JS</span>
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-1.5">
                      <h1 className="font-pixel text-xs sm:text-sm md:text-base text-[#2B1705] font-bold tracking-tight">
                        JavaScript: Web Development
                      </h1>
                    </div>
                    <p className="font-mono text-[11px] sm:text-xs text-[#523315] leading-snug">
                      « Build interactive websites, frontend interfaces, and backend services with the world's most widely used web language. »
                    </p>
                  </div>
                </div>

                {/* 4. Section 1: Advantages (3 Horizontal Cards with Hover Float) */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {/* Card 1: Instant Feedback */}
                  <div className="bg-[#E6D7B4] border border-[#B89C67] p-2.5 flex flex-col justify-between shadow-xs group hover:-translate-y-1 hover:shadow-md hover:border-[#8C6533] transition-all duration-200 cursor-default animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <div>
                      <div className="font-pixel text-[9px] sm:text-[10px] text-[#3D230B] font-bold flex items-center gap-1 mb-1">
                        <span className="group-hover:scale-125 transition-transform duration-200 inline-block">⚡</span>
                        <span>Instant Feedback</span>
                      </div>
                      <p className="font-mono text-[10px] sm:text-[11px] text-[#4A2F15] leading-snug">
                        See live code updates directly in the browser with zero compile wait.
                      </p>
                    </div>
                    <div className="mt-2 pt-1.5 border-t border-[#C7AA76] font-pixel text-[9px] sm:text-[10px] text-[#7A4917] font-bold tracking-wider">
                      RAPID LEARNING
                    </div>
                  </div>

                  {/* Card 2: Universal Reach */}
                  <div className="bg-[#E6D7B4] border border-[#B89C67] p-2.5 flex flex-col justify-between shadow-xs group hover:-translate-y-1 hover:shadow-md hover:border-[#8C6533] transition-all duration-200 cursor-default animate-in fade-in slide-in-from-bottom-2 duration-300 delay-75">
                    <div>
                      <div className="font-pixel text-[9px] sm:text-[10px] text-[#3D230B] font-bold flex items-center gap-1 mb-1">
                        <span className="group-hover:scale-125 transition-transform duration-200 inline-block">🌐</span>
                        <span>Universal Reach</span>
                      </div>
                      <p className="font-mono text-[10px] sm:text-[11px] text-[#4A2F15] leading-snug">
                        Build frontend interfaces and backend servers with one language.
                      </p>
                    </div>
                    <div className="mt-2 pt-1.5 border-t border-[#C7AA76] font-pixel text-[9px] sm:text-[10px] text-[#0E7490] font-bold tracking-wider">
                      FULL-STACK READY
                    </div>
                  </div>

                  {/* Card 3: Massive Ecosystem */}
                  <div className="bg-[#E6D7B4] border border-[#B89C67] p-2.5 flex flex-col justify-between shadow-xs group hover:-translate-y-1 hover:shadow-md hover:border-[#8C6533] transition-all duration-200 cursor-default animate-in fade-in slide-in-from-bottom-2 duration-300 delay-150">
                    <div>
                      <div className="font-pixel text-[9px] sm:text-[10px] text-[#3D230B] font-bold flex items-center gap-1 mb-1">
                        <span className="group-hover:scale-125 transition-transform duration-200 inline-block">📦</span>
                        <span>Massive Ecosystem</span>
                      </div>
                      <p className="font-mono text-[10px] sm:text-[11px] text-[#4A2F15] leading-snug">
                        The largest developer community with millions of open-source packages on npm.
                      </p>
                    </div>
                    <div className="mt-2 pt-1.5 border-t border-[#C7AA76] font-pixel text-[9px] sm:text-[10px] text-[#581C87] font-bold tracking-wider">
                      2M+ PACKAGES
                    </div>
                  </div>
                </div>

                {/* 5. Section 2: Why Choose JavaScript */}
                <div className="bg-[#E6D7B4] border border-[#B89C67] p-3 space-y-2 shadow-xs">
                  <div className="flex items-center justify-between border-b border-[#C7AA76] pb-1">
                    <div className="font-pixel text-[9px] sm:text-[10px] text-[#3D230B] font-bold flex items-center gap-1">
                      <span>💡</span>
                      <span>WHY CHOOSE JAVASCRIPT</span>
                    </div>
                    <div className="font-pixel text-[8px] sm:text-[9px] text-[#6E471C] font-semibold">
                      KEY REASONS
                    </div>
                  </div>

                  {/* Points with subtle hover highlighting */}
                  <div className="space-y-1.5 font-mono text-[11px] sm:text-xs text-[#3D2511] leading-snug">
                    <div className="flex items-start gap-1.5 hover:bg-[#DECDA6]/60 p-1 -m-1 rounded transition-colors group cursor-default">
                      <span className="text-[#D97706] font-bold shrink-0 group-hover:scale-125 group-hover:rotate-45 transition-transform duration-200 inline-block">✦</span>
                      <span><strong>01. INTERACTIVE WEBSITES:</strong> Create animations, handle user clicks, and build dynamic web pages.</span>
                    </div>
                    <div className="flex items-start gap-1.5 hover:bg-[#DECDA6]/60 p-1 -m-1 rounded transition-colors group cursor-default">
                      <span className="text-[#0891B2] font-bold shrink-0 group-hover:scale-125 group-hover:rotate-45 transition-transform duration-200 inline-block">✦</span>
                      <span><strong>02. FULL-STACK DEVELOPMENT:</strong> Write frontend user interfaces and backend server APIs using a single programming language.</span>
                    </div>
                    <div className="flex items-start gap-1.5 hover:bg-[#DECDA6]/60 p-1 -m-1 rounded transition-colors group cursor-default">
                      <span className="text-[#7C3AED] font-bold shrink-0 group-hover:scale-125 group-hover:rotate-45 transition-transform duration-200 inline-block">✦</span>
                      <span><strong>03. BEGINNER FRIENDLY:</strong> No complex setup required. Open any web browser console and start coding immediately.</span>
                    </div>
                  </div>
                </div>

                {/* 6. Track & Certificate Meta Bar */}
                <div className="flex items-center justify-between pt-1 text-[9px] sm:text-[10px] font-pixel text-[#543415]">
                  <div className="flex items-center gap-1 font-semibold">
                    <span>📚</span>
                    <span>TRACK: FULL-STACK WEB DEVELOPMENT</span>
                  </div>
                  <div className="flex items-center gap-1 font-semibold text-[#78350F]">
                    <span>🎓</span>
                    <span>CREDITS: COURSE COMPLETION BADGE</span>
                  </div>
                </div>

                {/* 7. Action Buttons: Red START LEARNING & Beige CLOSE */}
                <div className="flex flex-col sm:flex-row items-center gap-2.5 pt-1">
                  <button
                    onClick={() => onConfirmChoice(path)}
                    className="w-full sm:flex-1 py-2.5 px-4 bg-[#7A1F1D] hover:bg-[#8F2523] text-[#FDF4DC] border-2 border-[#A8322B] animate-ember-breathe font-pixel text-[10px] sm:text-xs tracking-wider transition-all cursor-pointer hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2 group"
                  >
                    <span>▶</span>
                    <span className="group-hover:tracking-widest transition-all duration-200">✦ START LEARNING ✦ [ ENTER COURSE ]</span>
                  </button>

                  <button
                    onClick={handleSafeClose}
                    className="w-full sm:w-auto py-2.5 px-5 bg-[#DFCEAA] hover:bg-[#EADBBA] text-[#3A2411] border-2 border-[#9E7D4C] hover:border-[#7A501F] font-pixel text-[10px] sm:text-xs tracking-wider transition-all cursor-pointer active:scale-95 flex items-center justify-center gap-1.5"
                  >
                    <span>✕</span>
                    <span>CLOSE [ ESC ]</span>
                  </button>
                </div>
              </>
            ) : (
              /* Empty Parchment Shell for other pathways */
              <div className="py-16 text-center space-y-3">
                <div className="text-3xl animate-pulse">📄</div>
                <h2 className="font-pixel text-xs sm:text-sm text-[#543415] font-bold">
                  EMPTY COURSE // {path.language.toUpperCase()}
                </h2>
                <p className="font-mono text-xs text-[#7A501F] max-w-md mx-auto italic">
                  This course module is currently under development. The JavaScript pathway is active and ready to explore.
                </p>
                <div className="pt-4">
                  <button
                    onClick={handleSafeClose}
                    className="px-4 py-2 bg-[#DFCEAA] hover:bg-[#EADBBA] text-[#3A2411] border border-[#9E7D4C] font-pixel text-[10px] cursor-pointer"
                  >
                    [ CLOSE ]
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ======================================================== */}
        {/* BOTTOM WOODEN ROLLER BAR WITH CORNER GOLD DIAMONDS       */}
        {/* ======================================================== */}
        <div className="w-full flex items-center justify-between relative z-20">
          {/* Bottom-Left Diamond Finial */}
          <div className="w-8 h-8 sm:w-9 sm:h-9 bg-[#2B1708] border-2 border-[#6B441B] shadow-[0_-4px_10px_rgba(0,0,0,0.8)] flex items-center justify-center shrink-0 z-10">
            <div className="w-3.5 h-3.5 bg-[#F5C344] rotate-45 border border-[#FFE885] shadow-[0_0_6px_#F5C344]"></div>
          </div>

          {/* Central Wooden Beam */}
          <div className="flex-1 h-6 sm:h-7 mx-[-3px] bg-gradient-to-b from-[#4A2A12] via-[#241306] to-[#4A2A12] border-y-2 border-[#7A4F23] flex items-center justify-between px-3 shadow-md overflow-hidden">
            <div className="w-full h-[1px] bg-[#D4A359]/30"></div>
          </div>

          {/* Bottom-Right Diamond Finial */}
          <div className="w-8 h-8 sm:w-9 sm:h-9 bg-[#2B1708] border-2 border-[#6B441B] shadow-[0_-4px_10px_rgba(0,0,0,0.8)] flex items-center justify-center shrink-0 z-10">
            <div className="w-3.5 h-3.5 bg-[#F5C344] rotate-45 border border-[#FFE885] shadow-[0_0_6px_#F5C344]"></div>
          </div>
        </div>

      </div>
    </div>
  );
}

