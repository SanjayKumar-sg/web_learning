import React, { useState, useEffect, useRef } from 'react';

// --- STYLES & ASSETS ---
const PATH_DATA = [
  {
    id: 'javascript',
    title: 'THE DOM CITADEL',
    language: 'JAVASCRIPT',
    doorImage: '/assets/door_js.png',
    theme: 'border-yellow-400',
    glow: 'shadow-[0_0_25px_rgba(250,204,21,0.6)]',
    icon: '{ JS }',
    lore: 'Master browser runtimes, event loops, and dynamic client-side sorcery.',
    prerequisites: 'Syntax Fundamentals: 0 requirements (Beginner Ready)',
    gear: 'Standard Terminal v1.4',
    boon: '+450 Data Mastery XP, DOM Cipher Blade',
  },
  {
    id: 'python',
    title: 'THE NEURAL SANCTUM',
    language: 'PYTHON',
    doorImage: '/assets/door_python.png',
    theme: 'border-cyan-400',
    glow: 'shadow-[0_0_25px_rgba(34,211,238,0.6)]',
    icon: '🐍 [py]',
    lore: 'Ancient scrolls tell of the Serpent Core—a high-level script language capable of bending data streams and automating entire empires with elegant, human-readable incantations.',
    prerequisites: 'Syntax Fundamentals: 0 requirements (Beginner Ready)',
    gear: 'Standard Terminal v1.4',
    boon: '+450 Data Mastery XP, Serpent Ring artifact',
  },
  {
    id: 'java',
    title: 'THE TITAN FORGE',
    language: 'JAVA',
    doorImage: '/assets/door_java.png',
    theme: 'border-purple-500',
    glow: 'shadow-[0_0_25px_rgba(168,85,247,0.6)]',
    icon: '☕ [java]',
    lore: 'Forge indestructible enterprise architectures, type-safe armor, and virtual machines.',
    prerequisites: 'Object-Oriented Concepts (Recommended)',
    gear: 'Heavy Compiler Setup',
    boon: '+800 Architecture XP, Titan Armor',
  }
];

const PETS_DATA = [
  { 
    id: 'cat', 
    name: 'Black Cat', 
    subtitle: 'Shadow Familiar', 
    perk: '+10% Syntax Error Detection', 
    image: '/assets/black_cat.png',
  },
  { 
    id: 'dog', 
    name: 'Cyber Hound', 
    subtitle: 'Loyal Bot', 
    perk: '+15% Streak Stamina', 
    image: '/assets/dog.png',
  },
  { 
    id: 'hawk', 
    name: 'Sky Sentinel', 
    subtitle: 'Avian Drone', 
    perk: '+20% Architecture Vision', 
    image: '/assets/hawk.png',
  },
];

// --- COMPONENTS ---

const AnimatedBackground = () => (
  <div className="fixed inset-0 w-full h-full pointer-events-none -z-10 bg-[#0B0A16] overflow-hidden">
    {/* Simple CSS Pixel Clouds/Stars */}
    <div className="absolute inset-0 bg-game-grid opacity-30"></div>
    <div className="absolute top-20 left-10 w-32 h-8 bg-purple-900/40 pixel-corners blur-sm animate-cloud-drift-slow"></div>
    <div className="absolute top-40 left-1/3 w-48 h-12 bg-cyan-900/30 pixel-corners blur-md animate-cloud-drift-medium"></div>
    <div className="absolute top-60 right-20 w-24 h-6 bg-purple-800/20 pixel-corners blur-sm animate-cloud-drift-fast"></div>
    
    {/* Twinkling stars */}
    <div className="absolute top-10 left-1/4 w-1 h-1 bg-white animate-star-twinkle"></div>
    <div className="absolute top-32 right-1/4 w-1 h-1 bg-cyan-300 animate-star-twinkle" style={{ animationDelay: '1s' }}></div>
    <div className="absolute bottom-1/3 left-1/2 w-1.5 h-1.5 bg-yellow-200 animate-star-twinkle" style={{ animationDelay: '0.5s' }}></div>
    
    {/* Scanline overlay */}
    <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] opacity-20"></div>
  </div>
);

const TopNavBar = ({ onLogout }) => (
  <header className="w-full bg-[#151326]/90 border-b border-[#2A264F] py-2 px-6 sticky top-0 z-40 backdrop-blur-sm flex-shrink-0">
    <div className="max-w-7xl mx-auto flex items-center justify-between">
      <div className="flex items-center gap-4">
        <h1 className="font-orbitron font-bold text-lg tracking-wider text-purple-400 drop-shadow-[0_0_8px_rgba(168,85,247,0.8)]">ARQ LearnHub</h1>
        <span className="font-vt323 text-green-400 text-xs animate-pulse border border-green-500/30 px-2 py-0.5 rounded bg-green-900/20">ONLINE</span>
      </div>
      
      <div className="hidden md:flex gap-6 font-vt323 text-base text-gray-400">
        <button className="text-cyan-400 border-b-2 border-cyan-400">Quests</button>
        <button className="hover:text-purple-300 transition-colors">Terminal</button>
        <button className="hover:text-purple-300 transition-colors">Codex</button>
        <button className="hover:text-purple-300 transition-colors">Guild</button>
      </div>

      <div className="flex items-center gap-3 font-vt323 text-xs">
        <div className="bg-red-950/50 border border-red-900/50 text-red-400 px-3 py-1 rounded pixel-corners-sm flex items-center gap-1">
          <span>❤️</span> 100 HP
        </div>
        <div className="bg-yellow-950/50 border border-yellow-900/50 text-yellow-400 px-3 py-1 rounded pixel-corners-sm flex items-center gap-1">
          <span>🪙</span> 240 G
        </div>
        {onLogout && (
          <button 
            onClick={onLogout}
            className="bg-gray-900 hover:bg-red-950/60 border border-gray-700 hover:border-red-500/50 text-gray-400 hover:text-red-300 px-2.5 py-1 rounded transition-colors cursor-pointer"
            title="Log out to Authentication"
          >
            [ LOGOUT ]
          </button>
        )}
      </div>
    </div>
  </header>
);

const HeroCard = () => (
  <section className="w-full max-w-4xl mx-auto mt-2 mb-2">
    <div className="bg-[#151326] border border-purple-500/40 p-3 pixel-corners shadow-[0_0_20px_rgba(139,92,246,0.15)] relative">
      <div className="text-center mb-2">
        <h2 className="font-orbitron font-bold text-base sm:text-lg text-white tracking-widest mb-0.5">BEGIN YOUR JOURNEY // HERO STATUS</h2>
        <div className="flex items-center justify-center gap-3 font-vt323 text-sm">
          <span className="text-cyan-400 font-bold">LVL 1 NOVICE CODER</span>
          <span className="text-gray-500">|</span>
          <span className="text-purple-400">ARCHETYPE: CODE NEOPHYTE</span>
        </div>
      </div>

      <div className="bg-[#0B0A16] border border-[#2A264F] p-2 pixel-corners-sm">
        <div className="flex justify-between font-vt323 text-sm mb-1">
          <span className="text-gray-300">EXP: <span className="text-cyan-300">180 / 300 XP</span> (60%)</span>
          <span className="text-purple-300">+120 XP TO ADVANCE</span>
        </div>
        <div className="w-full h-2.5 bg-gray-900 border border-gray-700 p-0.5">
          <div className="h-full xp-shimmer-bar" style={{ width: '60%' }}></div>
        </div>
      </div>

      <div className="flex justify-center gap-4 mt-2 font-vt323 text-xs">
        <span className="bg-purple-900/30 text-purple-300 px-2 py-0.5 border border-purple-500/30">[ CAMPAIGN ACTIVE ]</span>
        <span className="bg-orange-900/30 text-orange-400 px-2 py-0.5 border border-orange-500/30">[ 3-DAY STREAK 🔥 ]</span>
      </div>
    </div>
  </section>
);

const PortalModal = ({ path, onClose }) => {
  if (!path) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md p-4 animate-in fade-in zoom-in duration-200">
      <div className={`bg-[#151326] border-2 ${path.theme} p-6 max-w-2xl w-full pixel-corners ${path.glow} relative`}>
        <button onClick={onClose} className="absolute top-4 right-4 font-vt323 text-gray-400 hover:text-white text-lg cursor-pointer">
          [ ESC // X ]
        </button>
        
        <h3 className="font-orbitron font-bold text-lg text-white mb-4">[ GATEWAY DOSSIER // {path.language} PROTOCOL ]</h3>
        
        <div className="flex flex-col md:flex-row gap-6 items-center mb-6">
          {/* Gigantic Door Preview in Modal */}
          <div className="w-40 h-56 flex-shrink-0 relative flex items-center justify-center">
            <img 
              src={path.doorImage} 
              alt={`${path.language} Portal`} 
              className="w-full h-full object-contain filter drop-shadow-[0_0_25px_rgba(255,255,255,0.4)] animate-pixel-bob"
              style={{ imageRendering: 'pixelated' }}
            />
          </div>

          <div className="font-vt323 text-base text-gray-300 space-y-3 flex-grow">
            <p className="bg-[#0B0A16] p-2.5 border border-[#2A264F] italic text-purple-200">
              "{path.lore}"
            </p>
            <div>
              <span className="text-cyan-400 font-bold">Prerequisites:</span> <br/>• {path.prerequisites}
            </div>
            <div>
              <span className="text-cyan-400 font-bold">Required Gear:</span> <br/>• {path.gear}
            </div>
            <div>
              <span className="text-cyan-400 font-bold">Primary Boon:</span> <br/>• {path.boon}
            </div>
          </div>
        </div>

        <button className="w-full py-2.5 font-orbitron font-bold tracking-widest text-black bg-cyan-400 hover:bg-cyan-300 transition-colors shadow-[0_0_15px_rgba(34,211,238,0.6)] cursor-pointer">
          [ CROSS THE THRESHOLD ]
        </button>
      </div>
    </div>
  );
};

const PathDoors = ({ onSelectPath }) => (
  <section className="w-full max-w-5xl mx-auto relative z-10 mt-1">
    <h2 className="text-center font-vt323 text-lg text-cyan-400/90 mb-2 tracking-widest drop-shadow-[0_0_8px_rgba(34,211,238,0.4)]">
      // GIGANTIC REALM PORTALS // CHOOSE YOUR GATEWAY
    </h2>
    
    {/* FREESTANDING GIGANTIC DOORS - NO CARD BORDERS OR EXTRA CARD EFFECTS */}
    <div className="grid grid-cols-3 gap-6 sm:gap-12 px-4 items-end justify-items-center">
      {PATH_DATA.map(path => (
        <div 
          key={path.id} 
          onClick={() => onSelectPath(path)}
          className="group flex flex-col items-center cursor-pointer transition-all duration-300 hover:-translate-y-3 relative select-none"
        >
          {/* Gigantic Standalone Portal Door */}
          <div className="relative w-36 h-52 sm:w-44 sm:h-64 flex items-center justify-center">
            <img 
              src={path.doorImage} 
              alt={`${path.language} Gigantic Portal Door`} 
              className="w-full h-full object-contain filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.9)] transition-all duration-300 group-hover:scale-105 group-hover:drop-shadow-[0_0_35px_rgba(255,255,255,0.7)]"
              style={{ imageRendering: 'pixelated' }}
            />
          </div>

          {/* Clean RPG Threshold Marker */}
          <div className="mt-1.5 flex flex-col items-center text-center">
            <h3 className="font-orbitron font-bold text-xs sm:text-sm text-white tracking-wider group-hover:text-cyan-300 transition-colors drop-shadow-md">
              {path.title}
            </h3>
            <span className="font-vt323 text-xs text-gray-400">
              REALM: <span className="text-cyan-400 font-bold">{path.language}</span>
            </span>
            <div className="mt-1 font-vt323 text-xs py-0.5 px-3 bg-[#0B0A16]/90 border border-gray-700 text-gray-300 rounded pixel-corners-sm group-hover:bg-cyan-400 group-hover:text-black group-hover:border-cyan-300 group-hover:shadow-[0_0_12px_rgba(34,211,238,0.8)] transition-all">
              [ ENTER PORTAL ]
            </div>
          </div>
        </div>
      ))}
    </div>
  </section>
);

const RoamingPetItem = ({ pet, isSelected, onSelect }) => {
  // Random start position within safe bounds
  const [pos, setPos] = useState({ 
    x: 10 + Math.random() * 70, 
    y: 10 + Math.random() * 50 
  });
  
  useEffect(() => {
    const movePet = () => {
      setPos({
        x: 10 + Math.random() * 70, // 10% to 80% width
        y: 10 + Math.random() * 50, // 10% to 60% height
      });
    };
    
    // Move every 4 to 8 seconds randomly
    const interval = setInterval(movePet, 4000 + Math.random() * 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      className="absolute transition-all ease-in-out flex flex-col items-center z-20 pointer-events-auto select-none"
      style={{ left: `${pos.x}%`, top: `${pos.y}%`, transitionDuration: '4000ms' }}
    >
      <button 
        onClick={() => onSelect(pet)}
        className={`hover:scale-125 transition-transform duration-300 cursor-pointer ${isSelected ? 'drop-shadow-[0_0_15px_rgba(34,211,238,0.9)] scale-125 animate-pulse' : 'opacity-85 hover:opacity-100'}`}
        title={`Select ${pet.name}`}
      >
        <img 
          src={pet.image} 
          alt={pet.name} 
          className="w-16 h-10 object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]" 
          style={{ imageRendering: 'pixelated' }}
        />
      </button>
      <div className="mt-1.5 text-center bg-[#0B0A16]/90 px-2 py-0.5 rounded backdrop-blur-sm border border-[#2A264F] shadow-md">
        <div className="font-orbitron text-[10px] font-bold text-white tracking-wide">{pet.name}</div>
        {isSelected ? (
          <div className="mt-0.5 font-vt323 text-[10px] bg-cyan-400 text-black px-1.5 rounded font-bold">[ ACTIVE BOND ]</div>
        ) : (
          <div className="font-vt323 text-[9px] text-gray-400">{pet.subtitle}</div>
        )}
      </div>
    </div>
  );
};

const RoamingPets = ({ selectedPet, onSelectPet }) => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-10 pb-32">
      <div className="absolute top-4 left-4 font-vt323 text-gray-400 z-0 bg-black/40 px-2 py-1 rounded border border-gray-800">
        // CLICK TO CHOOSE COMPANION FAMILIAR
      </div>
      {/* Pets layer */}
      <div className="w-full h-full relative">
        {PETS_DATA.map((pet) => (
          <RoamingPetItem key={pet.id} pet={pet} isSelected={selectedPet?.id === pet.id} onSelect={onSelectPet} />
        ))}
      </div>
    </div>
  );
};

const WizardDialogue = ({ selectedPet }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [dialogue, setDialogue] = useState(
    "Greetings, young traveler! The digital realm is fractured by legacy bugs and rogue protocols. Choose your path and companion to begin the adventure!"
  );
  const [activeTopic, setActiveTopic] = useState('intro');

  // React to selected pet changes with pop-up animation and voice line
  useEffect(() => {
    if (selectedPet) {
      setDialogue(
        `Splendid choice! The ${selectedPet.name} attunes to your soul, granting ${selectedPet.perk}. Now step toward the Gigantic Portal doors!`
      );
      setActiveTopic('pet');
      setIsOpen(true); // Auto pop up when a pet is bonded!
    }
  }, [selectedPet]);

  const handleTopic = (topic) => {
    setActiveTopic(topic);
    if (topic === 'perks') {
      setDialogue(
        "Listen closely: The Black Cat sharpens your mind with +10% Syntax Error Detection. The Cyber Hound fortifies your endurance with +15% Streak Stamina. The Sky Sentinel grants +20% Architecture Vision!"
      );
    } else if (topic === 'beginner') {
      setDialogue(
        "If you are new to the digital arts, I recommend either the DOM Citadel (JavaScript) for rapid visual spells, or the Neural Sanctum (Python) for clean incantations. Both welcome novices with open arms!"
      );
    } else if (topic === 'doors') {
      setDialogue(
        "Those three gigantic monoliths are the Ancient Portals. Click any door to inspect its required gear, ancient lore, and experience rewards before stepping through!"
      );
    } else if (topic === 'default') {
      setDialogue(
        selectedPet 
          ? `Your familiar ${selectedPet.name} is active (${selectedPet.perk}). Touch any Gigantic Gateway to cross into training!`
          : "Click any roaming companion on your screen to bind a familiar, then touch a Portal Door to begin!"
      );
    }
  };

  return (
    <>
      {/* Floating Summon Trigger Button when minimized */}
      {!isOpen && (
        <div className="fixed bottom-4 right-6 z-50 animate-bounce">
          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-2 bg-[#151326] border-2 border-purple-500 text-purple-300 hover:text-white hover:bg-purple-900/40 px-3.5 py-2 rounded-lg font-orbitron text-xs shadow-[0_0_20px_rgba(168,85,247,0.7)] cursor-pointer transition-all"
          >
            <span className="text-xl">🧙‍♂️</span>
            <span>[ SAGE ADVICE // SUMMON ]</span>
          </button>
        </div>
      )}

      {/* Pop-up Wizard Dialogue Module */}
      {isOpen && (
        <div className="fixed bottom-0 left-0 w-full bg-[#0B0A16]/95 border-t-2 border-purple-900 p-3 z-40 backdrop-blur-md transition-all duration-300 transform translate-y-0 animate-in slide-in-from-bottom duration-300">
          <div className="max-w-5xl mx-auto flex gap-4 items-end">
            {/* Wizard Avatar */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 border-2 border-purple-500 bg-[#151326] pixel-corners flex-shrink-0 flex items-center justify-center text-3xl shadow-[0_0_20px_rgba(139,92,246,0.5)] animate-pixel-bob">
              🧙‍♂️
            </div>
            
            {/* Dialogue Box */}
            <div className="flex-grow bg-[#151326] border-2 border-purple-500/60 pixel-corners p-3 relative shadow-[0_0_25px_rgba(0,0,0,0.8)]">
              {/* Header Badge */}
              <div className="absolute -top-3 left-4 bg-[#0B0A16] px-2 font-orbitron text-[10px] font-bold text-yellow-400 flex items-center gap-2 border border-purple-900/60 rounded">
                <span>GRAND SAGE BYTERION [ARCHMAGE LVL 99]</span>
                {selectedPet && (
                  <span className="text-cyan-300 font-vt323 text-xs bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-500/40">
                    BOUND: {selectedPet.name} ({selectedPet.perk})
                  </span>
                )}
              </div>

              {/* Close / Minimize Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute -top-3 right-4 bg-[#0B0A16] hover:bg-red-900/50 text-gray-400 hover:text-red-300 px-2 py-0.5 font-vt323 text-xs border border-gray-700 rounded transition-colors cursor-pointer"
                title="Minimize Sage Dialogue"
              >
                [ ✕ MINIMIZE ]
              </button>

              {/* Dialogue Text */}
              <p className="font-vt323 text-lg sm:text-xl text-white mb-2 leading-tight">
                "{dialogue}"
              </p>

              {/* Functional Topic Buttons */}
              <div className="flex flex-wrap gap-2 sm:gap-4 font-vt323 text-sm sm:text-base">
                <button 
                  onClick={() => handleTopic('perks')}
                  className={`px-2 py-0.5 rounded transition-all cursor-pointer border ${activeTopic === 'perks' ? 'bg-cyan-500 text-black border-cyan-400 font-bold shadow-[0_0_10px_rgba(34,211,238,0.7)]' : 'bg-cyan-950/40 text-cyan-400 hover:text-white hover:bg-cyan-900/40 border-cyan-800/50'}`}
                >
                  [ What are the companion perks? ]
                </button>
                <button 
                  onClick={() => handleTopic('beginner')}
                  className={`px-2 py-0.5 rounded transition-all cursor-pointer border ${activeTopic === 'beginner' ? 'bg-cyan-500 text-black border-cyan-400 font-bold shadow-[0_0_10px_rgba(34,211,238,0.7)]' : 'bg-cyan-950/40 text-cyan-400 hover:text-white hover:bg-cyan-900/40 border-cyan-800/50'}`}
                >
                  [ Recommend a beginner path ]
                </button>
                <button 
                  onClick={() => handleTopic('doors')}
                  className={`px-2 py-0.5 rounded transition-all cursor-pointer border ${activeTopic === 'doors' ? 'bg-cyan-500 text-black border-cyan-400 font-bold shadow-[0_0_10px_rgba(34,211,238,0.7)]' : 'bg-cyan-950/40 text-cyan-400 hover:text-white hover:bg-cyan-900/40 border-cyan-800/50'}`}
                >
                  [ Tell me about the Portal Doors ]
                </button>
                <button 
                  onClick={() => handleTopic('default')}
                  className="text-gray-400 hover:text-white px-2 py-0.5 hover:bg-gray-800/50 rounded transition-colors cursor-pointer"
                >
                  [ General Guidance ]
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// --- MAIN EXPORT ---

export default function Homepage({ onLogout }) {
  const [selectedPath, setSelectedPath] = useState(null);
  const [selectedPet, setSelectedPet] = useState(null);

  return (
    <div className="relative h-screen bg-[#0B0A16] text-[#F8FAFC] overflow-hidden flex flex-col">
      <AnimatedBackground />
      <TopNavBar onLogout={onLogout} />
      
      <main className="relative z-10 flex-grow flex flex-col items-center justify-center w-full px-4 pt-2 pb-24">
        {/* Pets overlaying the entire main area */}
        <RoamingPets selectedPet={selectedPet} onSelectPet={setSelectedPet} />
        
        {/* Core content scaled to fit strictly into viewport without scrolling */}
        <div className="relative z-20 w-full flex flex-col pointer-events-auto">
          <HeroCard />
          <PathDoors onSelectPath={setSelectedPath} />
        </div>
      </main>

      <WizardDialogue selectedPet={selectedPet} />
      <PortalModal path={selectedPath} onClose={() => setSelectedPath(null)} />
    </div>
  );
}
