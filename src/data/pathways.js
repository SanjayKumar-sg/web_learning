/**
 * Canonical Pathway Lore & Curriculum Data for ARQ LearnHub.
 * Single source of truth for Great Hall doors, parchment scrolls, and learning realms.
 */

export const PATHWAYS_DATA = [
  {
    id: 'javascript',
    title: 'THE DOM CITADEL',
    language: 'JavaScript',
    sigil: '⚡',
    folioNumber: 'FOLIO I',
    doorImage: '/assets/door_js.png',
    theme: 'border-yellow-400',
    glow: 'shadow-[0_0_25px_rgba(250,204,21,0.6)]',
    doorGlowFilter: 'drop-shadow-[0_0_35px_rgba(250,204,21,0.9)]',
    doorHoverFilter: 'group-hover:drop-shadow-[0_0_25px_rgba(250,204,21,0.65)]',
    hoverGlowBorder: 'group-hover:border-yellow-400 group-hover:shadow-[0_0_15px_rgba(250,204,21,0.7)]',
    hoverTitleColor: 'group-hover:text-amber-300',
    accentColor: 'text-[#F59E0B]',
    goldBorder: 'border-[#D4AF37]',
    sealColor: 'bg-[#92400E] border-[#F59E0B]',
    sealText: 'SOLAR CITADEL SEAL',
    tagline: 'Interactive Web Development',
    icon: '{ JS }',
    lore: 'Build interactive websites, user interfaces, and backend services.',
    prerequisites: 'None (Beginner Friendly)',
    gear: 'Modern Web Browser',
    essence: 'Build interactive websites, user interfaces, and backend services with the world\'s most popular web language.',
    whyChoose: [
      {
        title: 'Instant Feedback',
        desc: 'See live code updates directly in the browser with zero compile wait.',
        icon: '⚡',
        metric: 'LEARNING',
        stat: 'FAST PROGRESS'
      },
      {
        title: 'Universal Reach',
        desc: 'Build frontend interfaces and backend servers with one language.',
        icon: '🌐',
        metric: 'VERSATILITY',
        stat: 'FULL-STACK'
      },
      {
        title: 'Massive Ecosystem',
        desc: 'The world\'s largest developer community with millions of open-source packages.',
        icon: '📦',
        metric: 'COMMUNITY',
        stat: '2M+ PACKAGES'
      }
    ],
    whenToChoose: [
      {
        number: '01',
        title: 'Interactive Websites',
        badge: 'FRONTEND',
        desc: 'Create animations, handle user clicks, and build dynamic web pages.',
        borderColor: 'border-l-amber-500',
        badgeClass: 'text-amber-700 bg-amber-100 border border-amber-300'
      },
      {
        number: '02',
        title: 'Full-Stack Development',
        badge: 'BACKEND & UI',
        desc: 'Use one language across both frontend interfaces and Node.js server backends.',
        borderColor: 'border-l-cyan-600',
        badgeClass: 'text-cyan-700 bg-cyan-100 border border-cyan-300'
      },
      {
        number: '03',
        title: 'Beginner Friendly',
        badge: 'EASY START',
        desc: 'No complex installations needed. Open any browser console and start coding.',
        borderColor: 'border-l-purple-600',
        badgeClass: 'text-purple-700 bg-purple-100 border border-purple-300'
      }
    ],
    curriculum: [
      {
        tier: 'TRIAL I: THE LIVING DOM',
        title: 'DOM & Events',
        desc: 'Awaken the browser document.',
        topics: [
          'Variables & Scoping',
          'DOM Query & Updates',
          'Event Listeners'
        ]
      },
      {
        tier: 'TRIAL II: ASYNC FLOWS',
        title: 'Promises & APIs',
        desc: 'Command non-blocking streams.',
        topics: [
          'Async / Await Syntax',
          'Fetch API & JSON',
          'Browser Local Storage'
        ]
      },
      {
        tier: 'TRIAL III: REACT BASTIONS',
        title: 'Reactive Architecture',
        desc: 'Forge modern component trees.',
        topics: [
          'Component Paradigms',
          'State & Hooks',
          'Tailwind Token Styling'
        ]
      },
      {
        tier: 'TRIAL IV: THE APEX NEXUS',
        title: 'Full-Stack Transmutation',
        desc: 'Unify client with backend servers.',
        topics: [
          'Node.js & Express APIs',
          'Database Schemas',
          'Live WebSockets'
        ]
      }
    ],
    boon: '+450 Data Mastery XP // DOM Cipher Blade // Web Weaver Title',
    isLocked: false
  },
  {
    id: 'python',
    title: 'THE NEURAL SANCTUM',
    language: 'Python',
    sigil: '🐍',
    folioNumber: 'FOLIO II',
    doorImage: '/assets/door_python.png',
    theme: 'border-cyan-400',
    glow: 'shadow-[0_0_25px_rgba(34,211,238,0.6)]',
    doorGlowFilter: 'drop-shadow-[0_0_35px_rgba(34,211,238,0.9)]',
    doorHoverFilter: 'group-hover:drop-shadow-[0_0_25px_rgba(34,211,238,0.65)]',
    hoverGlowBorder: 'group-hover:border-cyan-400 group-hover:shadow-[0_0_15px_rgba(34,211,238,0.7)]',
    hoverTitleColor: 'group-hover:text-cyan-300',
    accentColor: 'text-[#22D3EE]',
    goldBorder: 'border-[#06B6D4]',
    sealColor: 'bg-[#0E7490] border-[#22D3EE]',
    sealText: 'OUROBOROS SANCTUM SEAL',
    tagline: '',
    icon: '',
    lore: '',
    prerequisites: '',
    gear: '',
    essence: '',
    boon: '',
    whyChoose: [],
    curriculum: [],
    isLocked: false
  },
  {
    id: 'java',
    title: 'THE TITAN FORGE',
    language: 'Java',
    sigil: '☕',
    folioNumber: 'FOLIO III',
    doorImage: '/assets/door_java.png',
    theme: 'border-purple-500',
    glow: 'shadow-[0_0_25px_rgba(168,85,247,0.6)]',
    doorGlowFilter: 'drop-shadow-[0_0_35px_rgba(168,85,247,0.9)]',
    doorHoverFilter: 'group-hover:drop-shadow-[0_0_25px_rgba(168,85,247,0.65)]',
    hoverGlowBorder: 'group-hover:border-purple-400 group-hover:shadow-[0_0_15px_rgba(168,85,247,0.7)]',
    hoverTitleColor: 'group-hover:text-purple-300',
    accentColor: 'text-[#C084FC]',
    goldBorder: 'border-[#A855F7]',
    sealColor: 'bg-[#6B21A8] border-[#C084FC]',
    sealText: 'TITAN IRONCLAD SEAL',
    tagline: '',
    icon: '',
    lore: '',
    prerequisites: '',
    gear: '',
    essence: '',
    boon: '',
    whyChoose: [],
    curriculum: [],
    isLocked: false
  }
];

if (typeof process !== 'undefined' && process.env?.NODE_ENV !== 'production') {
  const seenIds = new Set();
  PATHWAYS_DATA.forEach(p => {
    if (seenIds.has(p.id)) {
      console.warn(`[PATHWAYS_DATA] Duplicate pathway id detected: "${p.id}"`);
    }
    seenIds.add(p.id);
  });
}

export const PATHWAYS_MAP = PATHWAYS_DATA.reduce((acc, curr) => {
  acc[curr.id] = curr;
  return acc;
}, {});
