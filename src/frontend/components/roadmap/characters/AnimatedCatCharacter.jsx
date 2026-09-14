import React, { useState, useEffect } from 'react';

/**
 * Multi-frame animated retro RPG Cat character.
 * Features discrete frame-by-frame animation cycles (8 frames per motion state)
 * with ears twitching, tail swishing, running leap strides, and victory celebrations.
 */
export default function AnimatedCatCharacter({
  state = 'idle', // 'idle' | 'jumping' | 'celebrating' | 'finale'
  facing = 'right', // 'left' | 'right'
  scale = 1.0
}) {
  const [frame, setFrame] = useState(0);

  // 10 FPS retro animation loop (100ms per frame)
  useEffect(() => {
    const totalFrames = state === 'jumping' ? 8 : state === 'celebrating' ? 6 : 8;
    const interval = setInterval(() => {
      setFrame((prev) => (prev + 1) % totalFrames);
    }, 110);
    return () => clearInterval(interval);
  }, [state]);

  // Frame parameters for Idle (8 frames)
  // Tail swing, breathing chest expansion, ear twitch, eye blinking
  const idleFrames = [
    { bodyY: 0, scaleY: 1.0, tailAngle: -15, earTwitch: 0, blink: false },
    { bodyY: -1, scaleY: 1.02, tailAngle: -8, earTwitch: 0, blink: false },
    { bodyY: -2, scaleY: 1.04, tailAngle: 5, earTwitch: 2, blink: false },
    { bodyY: -1, scaleY: 1.02, tailAngle: 18, earTwitch: -2, blink: false },
    { bodyY: 0, scaleY: 1.0, tailAngle: 25, earTwitch: 0, blink: false },
    { bodyY: 1, scaleY: 0.98, tailAngle: 15, earTwitch: 0, blink: true }, // blink
    { bodyY: 0, scaleY: 0.99, tailAngle: -2, earTwitch: 0, blink: false },
    { bodyY: 0, scaleY: 1.0, tailAngle: -12, earTwitch: 0, blink: false }
  ];

  // Frame parameters for Run & Leap (8 frames)
  // Anticipation, push-off, full airborne extension, arc flight, touchdown, spring
  const leapFrames = [
    { bodyY: 4, rot: 5, frontPawX: 6, frontPawY: 8, backPawX: -6, backPawY: 6, stretch: 0.9, dust: true },  // Crouch
    { bodyY: 1, rot: -8, frontPawX: 12, frontPawY: 4, backPawX: -10, backPawY: 8, stretch: 1.05, dust: false }, // Push
    { bodyY: -6, rot: -15, frontPawX: 18, frontPawY: -2, backPawX: -14, backPawY: 10, stretch: 1.2, dust: false }, // Air leap
    { bodyY: -12, rot: -18, frontPawX: 20, frontPawY: -4, backPawX: -16, backPawY: 8, stretch: 1.25, dust: false }, // Apex
    { bodyY: -9, rot: -8, frontPawX: 16, frontPawY: 2, backPawX: -14, backPawY: 6, stretch: 1.15, dust: false },  // Descend
    { bodyY: -3, rot: 5, frontPawX: 10, frontPawY: 6, backPawX: -10, backPawY: 4, stretch: 1.05, dust: false },  // Reach ground
    { bodyY: 3, rot: 10, frontPawX: 4, frontPawY: 8, backPawX: -4, backPawY: 8, stretch: 0.92, dust: true },   // Land
    { bodyY: 1, rot: 0, frontPawX: 2, frontPawY: 7, backPawX: -2, backPawY: 7, stretch: 1.0, dust: false }     // Recover
  ];

  // Frame parameters for Victory Celebration (6 frames)
  const victoryFrames = [
    { bodyY: 0, armAngle: 10, heartScale: 0.8, starRot: 0 },
    { bodyY: -4, armAngle: 35, heartScale: 1.1, starRot: 30 },
    { bodyY: -8, armAngle: 50, heartScale: 1.3, starRot: 60 },
    { bodyY: -10, armAngle: 45, heartScale: 1.4, starRot: 90 },
    { bodyY: -5, armAngle: 25, heartScale: 1.2, starRot: 120 },
    { bodyY: -1, armAngle: 10, heartScale: 0.9, starRot: 150 }
  ];

  const currentIdle = idleFrames[frame % idleFrames.length];
  const currentLeap = leapFrames[frame % leapFrames.length];
  const currentVictory = victoryFrames[frame % victoryFrames.length];

  const isRunning = state === 'jumping';
  const isCelebrating = state === 'celebrating' || state === 'finale';

  return (
    <g
      className="select-none pointer-events-none"
      transform={`scale(${scale})`}
    >
      {/* Floating YOU badge above head - NEVER mirrored */}
      <g transform="translate(0, -38)">
        <rect
          x="-18"
          y="-9"
          width="36"
          height="16"
          rx="3"
          fill="#0B0A16"
          stroke="#5de6ff"
          strokeWidth="1.5"
          filter="url(#cyanGlow)"
        />
        <text
          x="0"
          y="3"
          fill="#5de6ff"
          fontFamily="'Orbitron', sans-serif"
          fontSize="8"
          fontWeight="bold"
          textAnchor="middle"
        >
          YOU
        </text>
      </g>

      {/* Directional Character Graphic (Mirrored when facing left) */}
      <g transform={`scale(${facing === 'left' ? -1 : 1}, 1)`}>
        {/* 1. Ground Shadow (pulses with jumps) */}
        <ellipse
          cx="0"
          cy="18"
          rx={isRunning ? 16 : 20}
          ry={isRunning ? 4 : 6}
          fill="#000000"
          opacity={isRunning ? 0.3 : 0.45}
        />

      {/* 2. Dust Puffs on Running push-off and landing */}
      {isRunning && currentLeap.dust && (
        <g transform="translate(-14, 14)" opacity="0.8">
          <circle cx="-4" cy="0" r="3.5" fill="#facc15" opacity="0.6" />
          <circle cx="-8" cy="-2" r="2.5" fill="#e2e8f0" opacity="0.7" />
          <circle cx="-1" cy="2" r="2" fill="#cbd5e1" opacity="0.5" />
        </g>
      )}

      {/* 3. Victory Hearts & XP Sparkle Stars */}
      {isCelebrating && (
        <g transform={`translate(0, -32) scale(${currentVictory.heartScale})`}>
          <text x="-12" y="-4" fontSize="14">❤️</text>
          <text x="6" y="-10" fontSize="12">✨</text>
          <g transform={`translate(14, -6) rotate(${currentVictory.starRot})`}>
            <polygon points="0,-5 2,-1 5,0 2,1 0,5 -2,1 -5,0 -2,-1" fill="#facc15" />
          </g>
        </g>
      )}

      {/* 4. MAIN RETRO RPG CAT BODY */}
      {isRunning ? (
        // --- LEAPING / RUNNING BODY POSE (8 FRAMES) ---
        <g transform={`translate(0, ${currentLeap.bodyY}) rotate(${currentLeap.rot})`}>
          {/* Back Paws */}
          <ellipse
            cx={currentLeap.backPawX}
            cy={currentLeap.backPawY}
            rx="5"
            ry="4"
            fill="#ea580c"
            stroke="#9a3412"
            strokeWidth="1"
          />
          {/* Tail trailing in leap */}
          <path
            d="M -14 0 Q -24 -8 -20 -18"
            fill="none"
            stroke="#ea580c"
            strokeWidth="4.5"
            strokeLinecap="round"
          />
          <path
            d="M -14 0 Q -24 -8 -20 -18"
            fill="none"
            stroke="#fed7aa"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="4 6"
          />

          {/* Stretched Torso */}
          <ellipse
            cx="0"
            cy="0"
            rx={16 * currentLeap.stretch}
            ry="10"
            fill="#f97316"
            stroke="#9a3412"
            strokeWidth="1.5"
          />
          {/* Belly Fur */}
          <ellipse
            cx="2"
            cy="3"
            rx={10 * currentLeap.stretch}
            ry="6"
            fill="#ffedd5"
          />

          {/* Ginger Stripes */}
          <path d="M -4 -8 L -2 -3 M 2 -9 L 4 -4 M 8 -8 L 9 -3" stroke="#c2410c" strokeWidth="1.5" />

          {/* Front Paws reached forward */}
          <ellipse
            cx={currentLeap.frontPawX}
            cy={currentLeap.frontPawY}
            rx="5"
            ry="4"
            fill="#ea580c"
            stroke="#9a3412"
            strokeWidth="1"
          />

          {/* Head */}
          <circle cx="12" cy="-6" r="10" fill="#f97316" stroke="#9a3412" strokeWidth="1.5" />
          {/* Cheeks */}
          <circle cx="16" cy="-3" r="4.5" fill="#ffedd5" />
          {/* Ears (aerodynamic in leap) */}
          <polygon points="7,-13 11,-21 15,-14" fill="#ea580c" stroke="#9a3412" strokeWidth="1" />
          <polygon points="9,-14 11,-19 13,-15" fill="#fca5a5" />

          {/* Big Determined Eyes */}
          <ellipse cx="15" cy="-7" rx="2.5" ry="3" fill="#15803d" />
          <circle cx="16" cy="-8" r="1" fill="#ffffff" />
          {/* Cute Nose & Whiskers */}
          <polygon points="18,-4 17,-3 19,-3" fill="#f43f5e" />
          <line x1="18" y1="-4" x2="24" y2="-6" stroke="#000000" strokeWidth="0.75" />
          <line x1="18" y1="-3" x2="24" y2="-2" stroke="#000000" strokeWidth="0.75" />
        </g>
      ) : isCelebrating ? (
        // --- CELEBRATION DANCE POSE (6 FRAMES) ---
        <g transform={`translate(0, ${currentVictory.bodyY})`}>
          {/* Dancing Feet */}
          <ellipse cx="-6" cy="12" rx="4.5" ry="4" fill="#ea580c" stroke="#9a3412" strokeWidth="1" />
          <ellipse cx="6" cy="12" rx="4.5" ry="4" fill="#ea580c" stroke="#9a3412" strokeWidth="1" />

          {/* Body standing upright */}
          <ellipse cx="0" cy="2" rx="12" ry="14" fill="#f97316" stroke="#9a3412" strokeWidth="1.5" />
          <ellipse cx="0" cy="4" rx="8" ry="10" fill="#ffedd5" />

          {/* Wagging Tail */}
          <path
            d={`M -8 8 Q -18 ${frame % 2 === 0 ? '-6' : '2'} -14 -12`}
            fill="none"
            stroke="#ea580c"
            strokeWidth="4"
            strokeLinecap="round"
          />

          {/* Raised Joyful Paws */}
          <g transform={`translate(-10, -2) rotate(-${currentVictory.armAngle})`}>
            <ellipse cx="0" cy="-6" rx="3.5" ry="5" fill="#f97316" stroke="#9a3412" strokeWidth="1" />
          </g>
          <g transform={`translate(10, -2) rotate(${currentVictory.armAngle})`}>
            <ellipse cx="0" cy="-6" rx="3.5" ry="5" fill="#f97316" stroke="#9a3412" strokeWidth="1" />
          </g>

          {/* Head */}
          <circle cx="0" cy="-12" r="11" fill="#f97316" stroke="#9a3412" strokeWidth="1.5" />
          {/* Cheeks */}
          <ellipse cx="-5" cy="-8" rx="4" ry="3" fill="#ffedd5" />
          <ellipse cx="5" cy="-8" rx="4" ry="3" fill="#ffedd5" />

          {/* Ears */}
          <polygon points="-8,-20 -5,-28 -2,-21" fill="#ea580c" stroke="#9a3412" strokeWidth="1" />
          <polygon points="-7,-21 -5,-26 -3,-22" fill="#fca5a5" />
          <polygon points="2,-21 5,-28 8,-20" fill="#ea580c" stroke="#9a3412" strokeWidth="1" />
          <polygon points="3,-22 5,-26 7,-21" fill="#fca5a5" />

          {/* Happy Closed Eyes (^ ^) */}
          <path d="M -6 -13 Q -4 -16 -2 -13" fill="none" stroke="#7c2d12" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M 2 -13 Q 4 -16 6 -13" fill="none" stroke="#7c2d12" strokeWidth="1.5" strokeLinecap="round" />

          {/* Big Open Happy Mouth */}
          <path d="M -3 -8 Q 0 -5 3 -8 Q 0 -3 -3 -8 Z" fill="#f43f5e" />
        </g>
      ) : (
        // --- IDLE CAT WITH TAIL SWISH & BREATHING (8 FRAMES) ---
        <g transform={`translate(0, ${currentIdle.bodyY}) scale(1, ${currentIdle.scaleY})`}>
          {/* Paws */}
          <ellipse cx="-6" cy="12" rx="4" ry="3.5" fill="#ea580c" stroke="#9a3412" strokeWidth="1" />
          <ellipse cx="4" cy="12" rx="4" ry="3.5" fill="#ea580c" stroke="#9a3412" strokeWidth="1" />

          {/* Tail Undulating Swish (8-Frame Sine Motion) */}
          <path
            d={`M -10 6 Q ${-16 - currentIdle.tailAngle * 0.3} ${-2 + currentIdle.tailAngle * 0.2} ${-12 + currentIdle.tailAngle * 0.5} ${-14 + currentIdle.tailAngle * 0.1}`}
            fill="none"
            stroke="#ea580c"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <path
            d={`M -10 6 Q ${-16 - currentIdle.tailAngle * 0.3} ${-2 + currentIdle.tailAngle * 0.2} ${-12 + currentIdle.tailAngle * 0.5} ${-14 + currentIdle.tailAngle * 0.1}`}
            fill="none"
            stroke="#fed7aa"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeDasharray="3 5"
          />

          {/* Chubby Round Cat Body */}
          <ellipse cx="-2" cy="4" rx="12" ry="11" fill="#f97316" stroke="#9a3412" strokeWidth="1.5" />
          {/* Soft Cream Belly */}
          <ellipse cx="0" cy="5" rx="8" ry="7.5" fill="#ffedd5" />

          {/* Back Stripes */}
          <path d="M -8 -2 L -4 1 M -8 3 L -4 6 M -8 8 L -5 9" stroke="#c2410c" strokeWidth="1.5" />

          {/* Head */}
          <circle cx="5" cy="-8" r="10" fill="#f97316" stroke="#9a3412" strokeWidth="1.5" />
          {/* Fluffy Cheeks */}
          <circle cx="2" cy="-5" r="4.5" fill="#ffedd5" />
          <circle cx="8" cy="-5" r="4.5" fill="#ffedd5" />

          {/* Ears with twitch */}
          <polygon
            points={`0,-15 3,-23 7,-16`}
            fill="#ea580c"
            stroke="#9a3412"
            strokeWidth="1"
            transform={`rotate(${currentIdle.earTwitch}, 3, -16)`}
          />
          <polygon points="1,-16 3,-21 5,-17" fill="#fca5a5" />

          <polygon points="7,-16 11,-24 14,-16" fill="#ea580c" stroke="#9a3412" strokeWidth="1" />
          <polygon points="9,-17 11,-22 13,-17" fill="#fca5a5" />

          {/* Big Expressive Eyes */}
          {currentIdle.blink ? (
            // Blinking line
            <>
              <line x1="3" y1="-8" x2="6" y2="-8" stroke="#7c2d12" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="9" y1="-8" x2="12" y2="-8" stroke="#7c2d12" strokeWidth="1.5" strokeLinecap="round" />
            </>
          ) : (
            // Wide Emerald Cat Eyes
            <>
              <ellipse cx="4" cy="-8" rx="2.5" ry="3.2" fill="#16a34a" />
              <circle cx="4.5" cy="-9" r="1" fill="#ffffff" />
              <ellipse cx="10" cy="-8" rx="2.5" ry="3.2" fill="#16a34a" />
              <circle cx="10.5" cy="-9" r="1" fill="#ffffff" />
            </>
          )}

          {/* Pink Nose & Whiskers */}
          <polygon points="7,-4 6,-3 8,-3" fill="#f43f5e" />
          <path d="M 6 -3 Q 7 -1 8 -3" fill="none" stroke="#7c2d12" strokeWidth="1" />
          <line x1="9" y1="-4" x2="16" y2="-6" stroke="#475569" strokeWidth="0.7" />
          <line x1="9" y1="-3" x2="16" y2="-2" stroke="#475569" strokeWidth="0.7" />
        </g>
      )}
      </g>
    </g>
  );
}
