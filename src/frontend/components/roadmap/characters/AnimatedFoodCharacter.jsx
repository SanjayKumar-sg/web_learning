import React, { useState, useEffect } from 'react';

/**
 * Multi-frame animated retro RPG Food (Roast Feast on Bone) character.
 * Features 8 discrete frames for:
 * - Idle: Steaming golden glaze with rising aromatic steam wisps and sheen sparkles.
 * - Leaping: 360-degree tumbling in-flight rotation with speed dash lines and stardust.
 * - Joined / Feast: Celebration banquet presentation.
 */
export default function AnimatedFoodCharacter({
  state = 'idle', // 'idle' | 'leaping' | 'joined'
  scale = 1.0
}) {
  const [frame, setFrame] = useState(0);

  // 10 FPS retro animation loop (100ms per frame)
  useEffect(() => {
    const totalFrames = 8;
    const interval = setInterval(() => {
      setFrame((prev) => (prev + 1) % totalFrames);
    }, 110);
    return () => clearInterval(interval);
  }, []);

  const isLeaping = state === 'leaping';
  const isJoined = state === 'joined';

  // 8 Steam cycle offsets for rising wisps
  const steamY = [0, -3, -6, -9, -12, -15, -18, -21];
  const steamAlpha = [0.8, 0.9, 1.0, 0.85, 0.6, 0.4, 0.2, 0.05];

  // 8 Rotational tumble angles for in-flight leap (360 degrees)
  const tumbleRot = frame * 45;

  return (
    <g
      className="select-none pointer-events-none"
      transform={`scale(${scale})`}
    >
      {/* 1. Ground Shadow */}
      <ellipse
        cx="0"
        cy="18"
        rx={isLeaping ? 12 : 18}
        ry={isLeaping ? 3 : 5}
        fill="#000000"
        opacity={isLeaping ? 0.2 : 0.45}
      />

      {/* 2. In-Flight Speed Dash Trails & Golden Stardust (8 Frames) */}
      {isLeaping && (
        <g opacity="0.85">
          {/* Speed dash streaks */}
          <line
            x1="-24"
            y1={-6 + (frame % 3) * 4}
            x2="-40"
            y2={-6 + (frame % 3) * 4}
            stroke="#facc15"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray="6 8"
          />
          <line
            x1="-20"
            y1={4 - (frame % 2) * 5}
            x2="-34"
            y2={4 - (frame % 2) * 5}
            stroke="#fbbf24"
            strokeWidth="2"
            strokeLinecap="round"
          />
          {/* Stardust particles */}
          <circle cx={-18 - (frame * 2) % 12} cy="-10" r="2" fill="#fef08a" />
          <circle cx={-26 - (frame * 3) % 10} cy="8" r="1.5" fill="#facc15" />
          <circle cx={-32} cy="0" r="2.5" fill="#ca8a04" />
        </g>
      )}

      {/* 3. Rising Aromatic Steam Wisps (8 Frames Cycling Upward) */}
      {!isLeaping && (
        <g transform="translate(0, -14)">
          {/* Steam Stream 1 (Center) */}
          <path
            d={`M 0 ${steamY[frame % 8]} Q 4 ${steamY[frame % 8] - 6} -2 ${steamY[frame % 8] - 12} T 2 ${steamY[frame % 8] - 20}`}
            fill="none"
            stroke="#ffffff"
            strokeWidth="2"
            strokeLinecap="round"
            opacity={steamAlpha[frame % 8]}
          />
          {/* Steam Stream 2 (Left) */}
          <path
            d={`M -8 ${steamY[(frame + 3) % 8]} Q -12 ${steamY[(frame + 3) % 8] - 5} -6 ${steamY[(frame + 3) % 8] - 11} T -10 ${steamY[(frame + 3) % 8] - 18}`}
            fill="none"
            stroke="#fef08a"
            strokeWidth="1.8"
            strokeLinecap="round"
            opacity={steamAlpha[(frame + 3) % 8] * 0.9}
          />
          {/* Steam Stream 3 (Right) */}
          <path
            d={`M 8 ${steamY[(frame + 5) % 8]} Q 12 ${steamY[(frame + 5) % 8] - 6} 6 ${steamY[(frame + 5) % 8] - 12} T 9 ${steamY[(frame + 5) % 8] - 19}`}
            fill="none"
            stroke="#fef9c3"
            strokeWidth="1.8"
            strokeLinecap="round"
            opacity={steamAlpha[(frame + 5) % 8] * 0.8}
          />
        </g>
      )}

      {/* 4. Golden Sheen Sparkles (Rotating 4-Point Glints) */}
      {!isLeaping && (
        <g transform={`translate(${frame % 2 === 0 ? 8 : -8}, ${frame % 2 === 0 ? -6 : 2}) rotate(${frame * 45})`}>
          <polygon points="0,-6 2,-2 6,0 2,2 0,6 -2,2 -6,0 -2,-2" fill="#facc15" />
          <polygon points="0,-3 1,-1 3,0 1,1 0,3 -1,1 -3,0 -1,-1" fill="#ffffff" />
        </g>
      )}

      {/* 5. MAIN ROASTED MEAT DRUMSTICK ON BONE */}
      {isJoined ? (
        // Celebratory Banquet Platter
        <g transform="translate(0, 4)">
          <ellipse cx="0" cy="8" rx="26" ry="7" fill="#cbd5e1" stroke="#475569" strokeWidth="1.5" />
          <ellipse cx="0" cy="7" rx="23" ry="5.5" fill="#f8fafc" />
          {/* Whole Golden Roast */}
          <ellipse cx="0" cy="0" rx="18" ry="11" fill="#ea580c" stroke="#9a3412" strokeWidth="1.5" />
          <ellipse cx="-2" cy="-2" rx="14" ry="8" fill="#f97316" />
          <path d="M -8 -4 Q 0 -8 8 -4" stroke="#fed7aa" strokeWidth="2" strokeLinecap="round" />
          <circle cx="16" cy="-2" r="4" fill="#ffffff" stroke="#94a3b8" strokeWidth="1" />
        </g>
      ) : (
        // Drumstick / Roast Bone (Either floating or 360 tumble)
        <g transform={isLeaping ? `rotate(${tumbleRot})` : `translate(0, ${Math.sin(frame * 0.8) * 3})`}>
          {/* White Bone Shaft */}
          <rect
            x="-20"
            y="-4"
            width="14"
            height="8"
            rx="3"
            fill="#ffffff"
            stroke="#94a3b8"
            strokeWidth="1.2"
          />
          {/* Dual Bone Knobs */}
          <circle cx="-20" cy="-4" r="4" fill="#ffffff" stroke="#94a3b8" strokeWidth="1.2" />
          <circle cx="-20" cy="4" r="4" fill="#ffffff" stroke="#94a3b8" strokeWidth="1.2" />

          {/* Crispy Golden Roasted Meat Bulb */}
          <ellipse
            cx="4"
            cy="0"
            rx="18"
            ry="12"
            fill="#ea580c"
            stroke="#7c2d12"
            strokeWidth="1.5"
            filter="url(#goldGlow)"
          />
          {/* Highlight Glaze */}
          <ellipse
            cx="2"
            cy="-3"
            rx="13"
            ry="7"
            fill="#f97316"
          />
          <path
            d="M -4 -6 Q 4 -9 11 -5"
            fill="none"
            stroke="#fef08a"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          {/* Crispy Grill Marks */}
          <line x1="-3" y1="-5" x2="1" y2="4" stroke="#9a3412" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="5" y1="-6" x2="9" y2="3" stroke="#9a3412" strokeWidth="1.5" strokeLinecap="round" />
        </g>
      )}

      {/* Floating TARGET badge above food */}
      {!isJoined && (
        <g transform="translate(0, -38)">
          <rect
            x="-24"
            y="-9"
            width="48"
            height="16"
            rx="3"
            fill="#0B0A16"
            stroke="#facc15"
            strokeWidth="1.5"
            filter="url(#goldGlow)"
          />
          <text
            x="0"
            y="3"
            fill="#facc15"
            fontFamily="'Orbitron', sans-serif"
            fontSize="8"
            fontWeight="bold"
            textAnchor="middle"
          >
            TARGET
          </text>
        </g>
      )}
    </g>
  );
}
