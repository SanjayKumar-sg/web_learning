import React from 'react';
import PixelCharacter from './PixelCharacter';

/**
 * Multi-layered Animated Pixel-Art Game World Background.
 * Layers:
 * 1. Sky + Twinkling Stars + Cyber Moon
 * 2. Distant Pixel Mountains
 * 3. Drifting Pixel Clouds (Multi-speed parallax)
 * 4. Pixel Pines, Tech Pylons, Server Nodes
 * 5. Pixel Ground / Grass Terrain Strip
 * 6. Continuous Walking Student Coder Sprite
 * 7. Ambient Code Particles
 * 8. Dark Vignette & Readability Mask
 */
export default function PixelWorldBackground({
  isMotionReduced = false,
  characterDirection = 'right',
}) {
  return (
    <div
      className="fixed inset-0 w-full h-full pointer-events-none select-none overflow-hidden z-0 bg-[#0B0A16]"
      aria-hidden="true"
    >
      {/* === LAYER 1: SKY & ATMOSPHERE === */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#070611] via-[#15112B] to-[#251745]" />

      {/* Cyber Moon / Sun */}
      <div className="absolute top-8 right-8 sm:top-12 sm:right-20 w-16 h-16 sm:w-20 sm:h-20">
        {/* Glow */}
        <div className="absolute inset-0 rounded-full bg-[#8B5CF6]/25 blur-xl animate-pulse" />
        {/* Pixel Moon Disk */}
        <svg viewBox="0 0 32 32" className="w-full h-full" shapeRendering="crispEdges">
          <rect x="8" y="4" width="16" height="24" fill="#DDD6FE" />
          <rect x="4" y="8" width="24" height="16" fill="#DDD6FE" />
          <rect x="6" y="6" width="20" height="20" fill="#EDE9FE" />
          {/* Moon Craters / Code Glyphs */}
          <rect x="10" y="10" width="4" height="4" fill="#C4B5FD" />
          <rect x="18" y="16" width="5" height="3" fill="#C4B5FD" />
          <rect x="12" y="20" width="3" height="3" fill="#C4B5FD" />
          {/* Cyber Ring */}
          <rect x="2" y="15" width="28" height="2" fill="#22D3EE" opacity="0.7" />
        </svg>
      </div>

      {/* Twinkling Pixel Stars */}
      <div className="absolute inset-0 overflow-hidden">
        {[
          { top: '8%', left: '12%', delay: '0s' },
          { top: '15%', left: '28%', delay: '1.2s' },
          { top: '6%', left: '48%', delay: '2.4s' },
          { top: '22%', left: '65%', delay: '0.8s' },
          { top: '12%', left: '82%', delay: '1.9s' },
          { top: '28%', left: '18%', delay: '2.7s' },
          { top: '35%', left: '88%', delay: '1.5s' },
          { top: '18%', left: '38%', delay: '3.1s' },
        ].map((star, i) => (
          <div
            key={i}
            className="absolute w-1.5 h-1.5 bg-[#F8FAFC] shadow-[0_0_6px_#22D3EE] animate-star-twinkle"
            style={{
              top: star.top,
              left: star.left,
              animationDelay: star.delay,
            }}
          />
        ))}
      </div>

      {/* === LAYER 2: DISTANT PIXEL MOUNTAINS === */}
      <div className="absolute bottom-16 sm:bottom-20 left-0 right-0 w-full opacity-60">
        <svg
          viewBox="0 0 1200 240"
          className="w-full h-32 sm:h-48 object-cover"
          preserveAspectRatio="none"
          shapeRendering="crispEdges"
        >
          {/* Deep Silhouette Mountain 1 */}
          <polygon
            points="0,240 120,110 160,110 280,240 400,90 440,90 580,240 700,70 750,70 900,240 1020,120 1060,120 1200,240"
            fill="#181335"
          />
          {/* Mountain Highlights & Snow Peak Pixels */}
          <polygon points="120,110 160,110 170,125 110,125" fill="#4C1D95" />
          <polygon points="400,90 440,90 450,110 390,110" fill="#6D28D9" />
          <polygon points="700,70 750,70 765,95 685,95" fill="#8B5CF6" />
          <polygon points="1020,120 1060,120 1070,135 1010,135" fill="#4C1D95" />
          {/* Secondary Layer Peaks */}
          <polygon
            points="0,240 200,160 230,160 380,240 600,140 640,140 780,240 950,150 990,150 1200,240"
            fill="#231A47"
          />
        </svg>
      </div>

      {/* === LAYER 3: DRIFTING PIXEL CLOUDS === */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Slow High Cloud */}
        <div
          className={`absolute top-[10%] left-0 ${
            isMotionReduced ? '' : 'animate-cloud-drift-slow'
          }`}
          style={{ width: '180px' }}
        >
          <svg viewBox="0 0 48 18" className="w-36 sm:w-48 opacity-40 drop-shadow-[0_2px_8px_rgba(139,92,246,0.3)]" shapeRendering="crispEdges">
            <rect x="12" y="2" width="24" height="14" fill="#C4B5FD" />
            <rect x="6" y="6" width="36" height="10" fill="#DDD6FE" />
            <rect x="2" y="10" width="44" height="6" fill="#EDE9FE" />
          </svg>
        </div>

        {/* Medium Mid-altitude Cloud */}
        <div
          className={`absolute top-[22%] left-0 ${
            isMotionReduced ? '' : 'animate-cloud-drift-medium'
          }`}
          style={{ width: '220px' }}
        >
          <svg viewBox="0 0 56 20" className="w-44 sm:w-60 opacity-30 drop-shadow-[0_2px_10px_rgba(34,211,238,0.2)]" shapeRendering="crispEdges">
            <rect x="16" y="2" width="24" height="16" fill="#8B5CF6" />
            <rect x="8" y="6" width="40" height="12" fill="#A78BFA" />
            <rect x="2" y="10" width="52" height="8" fill="#C4B5FD" />
          </svg>
        </div>

        {/* Fast Low Cloud */}
        <div
          className={`absolute top-[36%] left-0 ${
            isMotionReduced ? '' : 'animate-cloud-drift-fast'
          }`}
          style={{ width: '160px' }}
        >
          <svg viewBox="0 0 40 16" className="w-32 sm:w-44 opacity-25" shapeRendering="crispEdges">
            <rect x="10" y="2" width="20" height="12" fill="#22D3EE" />
            <rect x="4" y="6" width="32" height="8" fill="#67E8F9" />
          </svg>
        </div>
      </div>

      {/* === LAYER 4: PIXEL ENVIRONMENT (Pines, Cyber Pylons, Code Nodes) === */}
      <div className="absolute bottom-12 sm:bottom-16 left-0 right-0 w-full flex justify-between items-end px-4 sm:px-12 pointer-events-none">
        {/* Left Side: Pixel Pine Group + Terminal Beacon */}
        <div className="flex items-end gap-2 sm:gap-4 opacity-75">
          {/* Pine Tree 1 */}
          <svg viewBox="0 0 24 36" className="w-8 sm:w-12 h-14 sm:h-20 drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]" shapeRendering="crispEdges">
            {/* Trunk */}
            <rect x="10" y="26" width="4" height="10" fill="#3E2723" />
            {/* Foliage Layers */}
            <polygon points="12,2 4,14 20,14" fill="#047857" />
            <polygon points="12,8 2,20 22,20" fill="#059669" />
            <polygon points="12,14 0,26 24,26" fill="#10B981" />
            {/* Pixel Cyber Highlight */}
            <rect x="11" y="2" width="2" height="2" fill="#34D399" />
            <rect x="10" y="9" width="4" height="2" fill="#34D399" />
          </svg>

          {/* Pine Tree 2 (Smaller) */}
          <svg viewBox="0 0 20 28" className="w-6 sm:w-9 h-10 sm:h-14 hidden xs:block" shapeRendering="crispEdges">
            <rect x="8" y="20" width="4" height="8" fill="#2E1B17" />
            <polygon points="10,2 3,11 17,11" fill="#064E3B" />
            <polygon points="10,7 1,17 19,17" fill="#047857" />
            <polygon points="10,12 0,22 20,22" fill="#059669" />
          </svg>

          {/* Cyber Server Pylon Beacon */}
          <div className="flex flex-col items-center">
            <div className="w-2 h-2 rounded-full bg-[#22D3EE] shadow-[0_0_10px_#22D3EE] animate-pulse mb-0.5" />
            <svg viewBox="0 0 12 24" className="w-3.5 sm:w-5 h-8 sm:h-12" shapeRendering="crispEdges">
              <rect x="4" y="0" width="4" height="24" fill="#334155" />
              <rect x="2" y="6" width="8" height="4" fill="#8B5CF6" />
              <rect x="5" y="8" width="2" height="2" fill="#22D3EE" />
              <rect x="2" y="14" width="8" height="4" fill="#8B5CF6" />
              <rect x="5" y="16" width="2" height="2" fill="#FACC15" />
              <rect x="0" y="22" width="12" height="2" fill="#1E293B" />
            </svg>
          </div>
        </div>

        {/* Right Side: Cyber Coding Monument + Pine Group */}
        <div className="flex items-end gap-2 sm:gap-4 opacity-75">
          {/* Terminal Station / Monument */}
          <div className="flex flex-col items-center hidden sm:flex">
            <div className="text-[8px] font-pixel text-[#22D3EE] bg-[#090814] border border-[#22D3EE]/40 px-1 py-0.5 rounded shadow-[0_0_8px_rgba(34,211,238,0.4)] mb-1">
              &lt;ARQ_NODE&gt;
            </div>
            <svg viewBox="0 0 18 20" className="w-6 h-8" shapeRendering="crispEdges">
              <rect x="2" y="2" width="14" height="12" fill="#1E1A38" />
              <rect x="3" y="3" width="12" height="9" fill="#090814" />
              <rect x="5" y="5" width="4" height="1" fill="#22D3EE" />
              <rect x="5" y="7" width="6" height="1" fill="#10B981" />
              <rect x="5" y="9" width="3" height="1" fill="#FACC15" />
              <rect x="6" y="14" width="6" height="4" fill="#2A264F" />
              <rect x="2" y="18" width="14" height="2" fill="#0F0D1E" />
            </svg>
          </div>

          {/* Pine Tree 3 */}
          <svg viewBox="0 0 24 36" className="w-8 sm:w-12 h-14 sm:h-20 drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]" shapeRendering="crispEdges">
            <rect x="10" y="26" width="4" height="10" fill="#3E2723" />
            <polygon points="12,2 4,14 20,14" fill="#047857" />
            <polygon points="12,8 2,20 22,20" fill="#059669" />
            <polygon points="12,14 0,26 24,26" fill="#10B981" />
          </svg>
        </div>
      </div>

      {/* === LAYER 5: PIXEL GROUND / TERRAIN STRIP === */}
      <div className="absolute bottom-0 left-0 right-0 w-full h-12 sm:h-16 z-10">
        {/* Pixel Grass Surface Edge */}
        <div className="w-full h-2.5 sm:h-3 bg-[#10B981] border-t border-[#34D399] relative">
          {/* 8-bit Grass Tufts Pattern */}
          <div
            className="absolute -top-1.5 left-0 right-0 h-1.5"
            style={{
              backgroundImage:
                'radial-gradient(#34D399 2px, transparent 2px)',
              backgroundSize: '8px 8px',
            }}
          />
        </div>

        {/* Underground Soil & Cyber Strata */}
        <div className="w-full h-full bg-[#181335] border-t-2 border-[#047857] flex flex-col justify-between p-1">
          {/* Cyber Grid Accent Lane */}
          <div className="w-full h-1 bg-[#8B5CF6]/30 rounded-full" />
          {/* Pixel Soil Texture Blocks */}
          <div className="flex justify-around items-center opacity-30 text-[8px] font-mono-code text-[#C084FC]">
            <span>01000001</span>
            <span className="hidden sm:inline">01010010</span>
            <span>01010101</span>
            <span className="hidden sm:inline">01001100</span>
          </div>
          <div className="w-full h-1 bg-[#22D3EE]/20 rounded-full" />
        </div>
      </div>

      {/* === LAYER 6: WALKING PIXEL CODER CHARACTER TRACK === */}
      <div className="absolute bottom-12 sm:bottom-16 left-0 right-0 w-full h-16 pointer-events-none z-20 overflow-hidden">
        <div
          className={`absolute bottom-0 left-0 ${
            isMotionReduced
              ? 'left-1/4'
              : 'animate-character-walk-across'
          }`}
          style={{ willChange: 'transform' }}
        >
          <PixelCharacter
            isWalking={!isMotionReduced}
            direction={characterDirection}
            scale={1.1}
          />
        </div>
      </div>

      {/* === LAYER 7: AMBIENT CODE PARTICLES & SPARKS === */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="hidden md:block absolute top-[28%] left-[15%] text-[#8B5CF6]/35 font-mono-code text-xs animate-float-particle">
          &lt;adventure /&gt;
        </div>
        <div
          className="hidden md:block absolute top-[42%] right-[18%] text-[#22D3EE]/30 font-mono-code text-xs animate-float-particle"
          style={{ animationDelay: '1.8s' }}
        >
          fn.learn()
        </div>
        <div
          className="hidden md:block absolute bottom-[32%] left-[22%] text-[#FACC15]/25 font-mono-code text-xs animate-float-particle"
          style={{ animationDelay: '2.9s' }}
        >
          &#123; stage: "ARQ_WORLD" &#125;
        </div>
      </div>

      {/* === LAYER 8: DARK READABILITY & VIGNETTE OVERLAY === */}
      {/* Central subtle dark gradient so auth form has maximum contrast & crispness */}
      <div className="absolute inset-0 bg-radial-[circle_at_center_rgba(11,10,22,0.55)_0%,rgba(11,10,22,0.85)_100%] pointer-events-none" />
      <div className="absolute inset-0 bg-[#0B0A16]/30 backdrop-blur-[0.5px] pointer-events-none" />
    </div>
  );
}
