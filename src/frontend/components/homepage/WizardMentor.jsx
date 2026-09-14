import React, { useState, useEffect } from 'react';

// Pool of rich atmospheric wisdom quotes cycled on user clicks
const SAGE_WISDOM_POOL = [
  { text: "Listen closely to the compiler's whispers; errors are merely guides in disguise.", action: 'POINT' },
  { text: "A grand architect was once a novice who refused to surrender.", action: 'HAPPY' },
  { text: "Three ancient portals, infinite destinations. Which realm calls to your soul?", action: 'LOOK_LEFT' },
  { text: "Take your time, learner. Haste is the mother of all syntax exceptions.", action: 'STEP_ASIDE' },
  { text: "Every line of code is an incantation that shapes digital reality.", action: 'POINT' },
  { text: "Curiosity is your greatest spell. Unroll the scrolls and seek what lies within.", action: 'HAPPY' },
  { text: "Practice and discipline forge the mind. The forge awaits whenever you are ready.", action: 'LOOK_RIGHT' }
];

export default function WizardMentor({
  actionState = 'IDLE',
  customDialogue = null,
  doorHovered = null,
  isTransitioning = false,
  onWizardClick = null,
  className = ''
}) {
  const [displayedText, setDisplayedText] = useState('');
  const [currentLine, setCurrentLine] = useState("Welcome, learner.");
  const [isBubbleVisible, setIsBubbleVisible] = useState(true);
  const [wisdomClickIndex, setWisdomClickIndex] = useState(-1);
  const [isBouncing, setIsBouncing] = useState(false);

  // Cycle wisdom on click
  const handleSageClick = () => {
    const nextIndex = (wisdomClickIndex + 1) % SAGE_WISDOM_POOL.length;
    setWisdomClickIndex(nextIndex);
    setIsBouncing(true);
    setTimeout(() => setIsBouncing(false), 400);

    if (onWizardClick) {
      onWizardClick(SAGE_WISDOM_POOL[nextIndex]);
    }
  };

  // Determine active action state (clicks take temporary precedence until hovered or transition)
  let activeAction = actionState;
  if (wisdomClickIndex >= 0 && !doorHovered && !isTransitioning) {
    activeAction = SAGE_WISDOM_POOL[wisdomClickIndex].action;
  }

  // Reset wisdom click index when an external event occurs
  useEffect(() => {
    if (doorHovered || isTransitioning || actionState === 'CASTING' || actionState === 'STEP_ASIDE') {
      setWisdomClickIndex(-1);
    }
  }, [doorHovered, isTransitioning, actionState]);

  // Determine sprite and facing based on activeAction
  let spriteSrc = '/assets/wizard/wizard_default.png';
  let flipHorizontal = false;
  let animationClass = 'animate-pixel-bob';
  const isCasting = isTransitioning || activeAction === 'CASTING';

  if (isCasting) {
    spriteSrc = '/assets/wizard/wizard_casting.png';
    animationClass = 'animate-pulse drop-shadow-[0_0_25px_rgba(168,85,247,0.9)]';
  } else if (activeAction === 'STEP_ASIDE') {
    spriteSrc = '/assets/wizard/wizard_reading.png';
    animationClass = '';
  } else if (activeAction === 'HAPPY' || activeAction === 'ENCOURAGE') {
    spriteSrc = '/assets/wizard/wizard_happy.png';
  } else if (activeAction === 'POINT' || activeAction === 'WELCOME') {
    spriteSrc = '/assets/wizard/wizard_explaining.png';
  } else if (activeAction === 'LOOK_LEFT') {
    spriteSrc = '/assets/wizard/wizard_thinking.png';
    flipHorizontal = true; // face left toward JS
  } else if (activeAction === 'LOOK_RIGHT') {
    spriteSrc = '/assets/wizard/wizard_thinking.png';
    flipHorizontal = false; // face right toward Java
  } else if (activeAction === 'LOOK_CENTER') {
    spriteSrc = '/assets/wizard/wizard_default.png';
  }

  // Update target dialogue line based on clicks, hover, or actionState
  useEffect(() => {
    // If user clicked recently and not hovering a door, show clicked wisdom
    if (wisdomClickIndex >= 0 && !doorHovered && !isTransitioning) {
      setCurrentLine(SAGE_WISDOM_POOL[wisdomClickIndex].text);
      return;
    }

    // Hook custom dialogue is primary authority
    if (customDialogue) {
      setCurrentLine(customDialogue);
      return;
    }

    if (doorHovered === 'javascript') {
      setCurrentLine("An exciting path. Dynamic and full of life.");
    } else if (doorHovered === 'python') {
      setCurrentLine("A powerful choice. Clean and boundless.");
    } else if (doorHovered === 'java') {
      setCurrentLine("A titan's road. Indestructible and steadfast.");
    } else if (actionState === 'WELCOME') {
      setCurrentLine("Welcome, learner.");
    } else if (actionState === 'POINT') {
      setCurrentLine("Your journey begins with a choice.");
    } else if (actionState === 'STEP_ASIDE') {
      setCurrentLine("Let us see what awaits you.");
    } else {
      setCurrentLine("Take your time. Every path begins with a first step.");
    }
  }, [doorHovered, actionState, customDialogue, isTransitioning, wisdomClickIndex]);

  // Smooth typewriter/text reveal effect with fade transition
  useEffect(() => {
    setIsBubbleVisible(false);
    let interval = null;

    const fadeTimer = setTimeout(() => {
      setIsBubbleVisible(true);
      setDisplayedText('');
      let index = 0;

      interval = setInterval(() => {
        index++;
        if (index <= currentLine.length) {
          setDisplayedText(currentLine.slice(0, index));
        } else {
          clearInterval(interval);
        }
      }, 24);
    }, 120);

    return () => {
      clearTimeout(fadeTimer);
      if (interval) clearInterval(interval);
    };
  }, [currentLine]);

  return (
    <div className={`relative flex flex-col items-center select-none pb-4 ${className}`}>
      {/* Speech Balloon Bubble - Clickable to cycle dialogue */}
      <div 
        onClick={handleSageClick}
        title="Click Sage Byterion to hear words of wisdom"
        className={`group transition-all duration-300 transform mb-2 px-4 py-2 bg-[#151326]/95 hover:bg-[#1C1833] border-2 border-purple-400/80 hover:border-yellow-400 rounded-lg pixel-corners-sm shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_25px_rgba(250,204,21,0.5)] pointer-events-auto max-w-xs sm:max-w-md text-center relative cursor-pointer ${
          isBubbleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
        }`}
      >
        {/* Sage Name Tag */}
        <div className="flex items-center justify-center gap-1.5 mb-1">
          <span className="text-[10px] font-orbitron font-bold text-yellow-400 tracking-widest bg-[#0B0A16] px-2 py-0.5 rounded border border-purple-500/50 group-hover:border-yellow-400/70 transition-colors">
            SAGE BYTERION // GUIDE
          </span>
          <span className="text-[9px] font-vt323 text-cyan-300 animate-pulse">
            [ 👆 CLICK FOR WISDOM ]
          </span>
        </div>

        {/* Dialogue Text with reserved height to prevent jumping */}
        <p className="font-vt323 text-base sm:text-lg text-purple-100 group-hover:text-white tracking-wide leading-tight min-h-[3rem] flex items-center justify-center transition-colors">
          {displayedText ? `"${displayedText}"` : ''}
        </p>

        {/* Speech Bubble Tail Arrow pointing down towards wizard */}
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-purple-400/80"></div>
      </div>

      {/* Wizard Sprite Container with Magical Aura Dais - Clickable */}
      <div 
        onClick={handleSageClick}
        title="Click to speak with Sage Byterion"
        className={`relative group cursor-pointer pointer-events-auto flex flex-col items-center transition-transform duration-200 ${
          isBouncing ? '-translate-y-2 scale-105' : 'hover:-translate-y-1'
        }`}
      >
        {/* Soft Rune Aura under feet */}
        <div className="absolute -bottom-1 w-20 sm:w-24 h-4 bg-purple-600/30 group-hover:bg-yellow-400/30 rounded-full blur-sm animate-pulse transition-colors"></div>

        {/* Pixel Sprite */}
        <div 
          className={`w-24 h-24 sm:w-28 sm:h-28 transition-transform duration-300 relative flex items-center justify-center ${animationClass}`}
          style={{
            transform: `scaleX(${flipHorizontal ? -1 : 1}) ${isCasting ? 'scale(1.1)' : ''}`
          }}
        >
          <img
            src={spriteSrc}
            alt="Sage Byterion - Guide"
            className="w-full h-full object-contain filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] group-hover:drop-shadow-[0_0_15px_rgba(250,204,21,0.6)] transition-all"
            style={{ imageRendering: 'pixelated' }}
          />
        </div>
      </div>
    </div>
  );
}
