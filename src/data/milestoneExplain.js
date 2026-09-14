/**
 * Visual Explanation Data for all 16 Roadmap Milestones.
 * Powers MilestoneExplainPanel slide-in card in RoadmapView.
 */

export const MILESTONE_EXPLAIN = {
  html: {
    color: '#f97316',
    glow: 'rgba(249,115,22,0.4)',
    tagline: 'The skeleton of every webpage',
    diagram: [
      '+---------------------+',
      '|  <html>             |',
      '|   <head>...</head>  |',
      '|   <body>            |',
      '|     <h1>Title</h1>  |',
      '|     <p>Text</p>     |',
      '|   </body>           |',
      '|  </html>            |',
      '+---------------------+'
    ],
    concepts: [
      { icon: '\u{1F9F1}', label: 'Structure', desc: 'Defines page layout with tags' },
      { icon: '\u{1F4C4}', label: 'Elements', desc: '<h1>, <p>, <div>, <img>' },
      { icon: '\u{1F3F7}\u{FE0F}', label: 'Semantics', desc: 'Meaningful tags like <nav>, <main>' },
      { icon: '\u{1F517}', label: 'Links & Media', desc: '<a href>, <img src>, <video>' }
    ],
    snippet: `<!DOCTYPE html>
<html lang="en">
  <head>
    <title>My Page</title>
  </head>
  <body>
    <h1>Hello World!</h1>
    <p>Built with HTML.</p>
  </body>
</html>`,
    whyItMatters: 'HTML is the raw structure that browsers understand — every website starts here.'
  },

  css: {
    color: '#38bdf8',
    glow: 'rgba(56,189,248,0.4)',
    tagline: 'Turn raw structure into visual beauty',
    diagram: [
      '+---------------------+',
      '|  HTML Skeleton      |',
      '|        +            |',
      '|  CSS Rulesets       |',
      '|        =            |',
      '|  Polished UI Page   |',
      '+---------------------+'
    ],
    concepts: [
      { icon: '\u{1F3A8}', label: 'Styling', desc: 'Colors, fonts, shadows, borders' },
      { icon: '\u{1F4D0}', label: 'Box Model', desc: 'Margin, border, padding, content' },
      { icon: '\u{25A6}', label: 'Flex & Grid', desc: 'Modern responsive alignments' },
      { icon: '\u{2728}', label: 'Transitions', desc: 'Smooth hover effects & keyframes' }
    ],
    snippet: `.hero-card {
  display: flex;
  justify-content: center;
  align-items: center;
  background: #0f172a;
  border-radius: 12px;
  box-shadow: 0 0 20px rgba(56,189,248,0.4);
}`,
    whyItMatters: 'CSS controls layout, animations, and aesthetics. Without CSS, the web would be plain black-and-white text.'
  },

  'js-basics': {
    color: '#facc15',
    glow: 'rgba(250,204,21,0.4)',
    tagline: 'The brain: variables, logic, and flow',
    diagram: [
      '+-------------------------+',
      '| Input: const score = 10 |',
      '|           v             |',
      '| Condition: score > 5    |',
      '|           v             |',
      '| Output: "Level Up!"     |',
      '+-------------------------+'
    ],
    concepts: [
      { icon: '\u{1F4E6}', label: 'Variables', desc: 'let, const, data types & scope' },
      { icon: '\u{26A1}', label: 'Functions', desc: 'Reusable blocks of executable code' },
      { icon: '\u{1F500}', label: 'Conditionals', desc: 'if, else, switch, ternary' },
      { icon: '\u{1F501}', label: 'Loops', desc: 'for, while, map, filter' }
    ],
    snippet: `function calculateLevel(xp) {
  if (xp >= 1000) return 'Archmage';
  if (xp >= 500)  return 'Sorcerer';
  return 'Apprentice';
}
console.log(calculateLevel(750)); // 'Sorcerer'`,
    whyItMatters: 'JavaScript makes pages smart — calculating scores, handling choices, and remembering user states.'
  },

  dom: {
    color: '#a855f7',
    glow: 'rgba(168,85,247,0.4)',
    tagline: 'Bridging JavaScript to screen elements',
    diagram: [
      'Document Tree (DOM)',
      '   ├── <header>',
      '   └── <main>',
      '         ├── <h1 id="title">',
      '         └── <button id="btn">'
    ],
    concepts: [
      { icon: '\u{1F50E}', label: 'Selection', desc: 'querySelector, getElementById' },
      { icon: '\u{270F}\u{FE0F}', label: 'Modification', desc: 'innerHTML, textContent, style' },
      { icon: '\u{2795}', label: 'Creation', desc: 'createElement, appendChild' },
      { icon: '\u{1F3F7}\u{FE0F}', label: 'Classes', desc: 'classList.add, toggle, remove' }
    ],
    snippet: `const heading = document.querySelector('#questTitle');
heading.textContent = 'Welcome, Adventurer!';
heading.classList.add('glow-gold');`,
    whyItMatters: 'The DOM is the live live tree of your webpage. JS manipulates this tree to change what users see in real time.'
  },

  events: {
    color: '#ec4899',
    glow: 'rgba(236,72,153,0.4)',
    tagline: 'Responding to user clicks, keys, and gestures',
    diagram: [
      '[User Clicks Button]',
      '         │',
      '         ▼',
      '[Browser Fires Event]',
      '         │',
      '         ▼',
      '[Listener Callback Runs!]'
    ],
    concepts: [
      { icon: '\u{1F5B1}\u{FE0F}', label: 'Mouse', desc: 'click, mouseover, drag, drop' },
      { icon: '\u{2328}\u{FE0F}', label: 'Keyboard', desc: 'keydown, keyup, enter, space' },
      { icon: '\u{1F4DD}', label: 'Forms', desc: 'submit, input, change, validation' },
      { icon: '\u{1F504}', label: 'Bubbling', desc: 'Event propagation & delegation' }
    ],
    snippet: `const portalBtn = document.querySelector('#openPortal');
portalBtn.addEventListener('click', (e) => {
  e.preventDefault();
  soundEffect.play();
  teleportLearner();
});`,
    whyItMatters: 'Events make websites interactive. Everything from button clicks to keystrokes runs through event listeners.'
  },

  es6: {
    color: '#10b981',
    glow: 'rgba(16,185,129,0.4)',
    tagline: 'Modern JS: arrows, destructuring, modules',
    diagram: [
      'Old ES5 -> Verbose callbacks & var',
      '                  v',
      'Modern ES6+ -> Arrow fns, destructuring,',
      '               template literals, spread'
    ],
    concepts: [
      { icon: '\u{27B3}', label: 'Arrow Fns', desc: 'Concise syntax with lexical this' },
      { icon: '\u{1F381}', label: 'Destructuring', desc: 'const { id, title } = quest' },
      { icon: '\u{1F50C}', label: 'Spread/Rest', desc: '...props, ...items arrays' },
      { icon: '\u{1F4AC}', label: 'Templates', desc: '`Hello ${player.name}` string literals' }
    ],
    snippet: `const summarizeHero = ({ name, rank, xp = 0 }) => 
  \`Hero \${name.toUpperCase()} [Rank: \${rank}] has \${xp} XP!\`;

const hero = { name: 'Sage', rank: 'Master', xp: 1200 };
console.log(summarizeHero(hero));`,
    whyItMatters: 'Modern JavaScript is clean, readable, and standard across all professional tech stacks.'
  },

  async: {
    color: '#06b6d4',
    glow: 'rgba(6,182,212,0.4)',
    tagline: 'Non-blocking execution and background jobs',
    diagram: [
      'Main Thread: ────[UI Responsive]─────────>',
      '                    │',
      'Async Worker:       └──[Fetch API Task]──┘'
    ],
    concepts: [
      { icon: '\u{23F1}\u{FE0F}', label: 'Promises', desc: 'Pending, Resolved, Rejected states' },
      { icon: '\u{23F3}', label: 'Async/Await', desc: 'Synchronous-looking asynchronous flow' },
      { icon: '\u{1F6E1}\u{FE0F}', label: 'Error Handling', desc: 'try / catch / finally blocks' },
      { icon: '\u{26A1}', label: 'Event Loop', desc: 'Call stack, microtasks, timers' }
    ],
    snippet: `async function fetchQuestRoster() {
  try {
    const res = await fetch('/api/quests');
    const data = await res.json();
    return data;
  } catch (err) {
    console.error('Failed to load roster:', err);
  }
}`,
    whyItMatters: 'Web apps cannot freeze while waiting for network requests. Async JS keeps UI fluid and responsive.'
  },

  'fetch-api': {
    color: '#8b5cf6',
    glow: 'rgba(139,92,246,0.4)',
    tagline: 'Connecting clients to live servers & APIs',
    diagram: [
      'Client (Browser) ─── HTTP GET /quests ───> Remote Server',
      'Client (Browser) <── JSON { id, data } ── Remote Server'
    ],
    concepts: [
      { icon: '\u{1F310}', label: 'REST APIs', desc: 'GET, POST, PUT, DELETE requests' },
      { icon: '\u{1F4E8}', label: 'Headers', desc: 'Authorization, Content-Type: json' },
      { icon: '\u{1F4E6}', label: 'JSON Parsing', desc: 'JSON.stringify & response.json()' },
      { icon: '\u{1F6A6}', label: 'Status Codes', desc: '200 OK, 404 Not Found, 500 Server Err' }
    ],
    snippet: `const saveProgress = async (stats) => {
  const res = await fetch('/api/save', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(stats)
  });
  return res.ok;
};`,
    whyItMatters: 'APIs supply live database information to frontends. Everything from user accounts to rankings depends on Fetch.'
  },

  'browser-storage': {
    color: '#eab308',
    glow: 'rgba(234,179,8,0.4)',
    tagline: 'Remembering state across page reloads',
    diagram: [
      '+-----------------------------------------+',
      '| localStorage: Persists forever          |',
      '| sessionStorage: Clears when tab closes  |',
      '| IndexedDB: Large offline structured db  |',
      '+-----------------------------------------+'
    ],
    concepts: [
      { icon: '\u{1F4BE}', label: 'localStorage', desc: 'Key-value string persistence' },
      { icon: '\u{1F5D2}\u{FE0F}', label: 'sessionStorage', desc: 'Per-tab temporary session state' },
      { icon: '\u{1F36A}', label: 'Cookies', desc: 'Small tokens sent with HTTP requests' },
      { icon: '\u{1F5C4}\u{FE0F}', label: 'IndexedDB', desc: 'High-volume offline database' }
    ],
    snippet: `// Save game state
localStorage.setItem('hero_stats', JSON.stringify({ level: 5, gold: 350 }));

// Retrieve on reload
const stats = JSON.parse(localStorage.getItem('hero_stats') || '{}');
console.log(stats.level); // 5`,
    whyItMatters: 'Without browser storage, users would lose their work, shopping cart, and theme preferences every time they refresh.'
  },

  'npm-tooling': {
    color: '#ef4444',
    glow: 'rgba(239,68,68,0.4)',
    tagline: 'Packages, bundlers, and modern developer workflows',
    diagram: [
      'npm install ──> node_modules ──> Vite / Bundler ──> Production Build'
    ],
    concepts: [
      { icon: '\u{1F4E6}', label: 'npm / pnpm', desc: 'Managing third-party open-source packages' },
      { icon: '\u{2699}\u{FE0F}', label: 'package.json', desc: 'Dependencies, scripts, metadata' },
      { icon: '\u{26A1}', label: 'Vite / Webpack', desc: 'Lightning-fast dev servers and bundles' },
      { icon: '\u{1F9F9}', label: 'Linters', desc: 'ESLint & Prettier for clean code style' }
    ],
    snippet: `// package.json scripts
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}`,
    whyItMatters: 'Modern web development relies on the npm ecosystem of 2 million packages and ultra-fast tools like Vite.'
  },

  modules: {
    color: '#14b8a6',
    glow: 'rgba(20,184,166,0.4)',
    tagline: 'Clean architecture with import and export',
    diagram: [
      'mathUtils.js  ──[export { add }]──┐',
      '                                  ▼',
      'app.js        ──[import { add }]─> Calculator'
    ],
    concepts: [
      { icon: '\u{1F4E4}', label: 'Named Exports', desc: 'export const util = () => {}' },
      { icon: '\u{1F31F}', label: 'Default Export', desc: 'export default function App() {}' },
      { icon: '\u{1F517}', label: 'Static Imports', desc: 'import { auth } from "./auth"' },
      { icon: '\u{1F333}', label: 'Tree Shaking', desc: 'Bundlers drop unused imported code' }
    ],
    snippet: `// file: math.js
export const add = (a, b) => a + b;
export const multiply = (a, b) => a * b;

// file: main.js
import { add, multiply } from './math.js';
console.log(multiply(add(2, 3), 4)); // 20`,
    whyItMatters: 'Modules prevent messy 5,000-line monolithic files. They keep your architecture modular, testable, and reusable.'
  },

  'oop-fp': {
    color: '#6366f1',
    glow: 'rgba(99,102,241,0.4)',
    tagline: 'Two powerful paradigms: Classes & Pure Functions',
    diagram: [
      'OOP: Class Hero { constructor, attack() }',
      'FP:  const attack = (hero) => ({ ...hero, stamina: hero.stamina - 10 })'
    ],
    concepts: [
      { icon: '\u{1F3DB}\u{FE0F}', label: 'Classes & this', desc: 'Encapsulation, inheritance, prototypes' },
      { icon: '\u{267B}\u{FE0F}', label: 'Pure Functions', desc: 'Same input always produces same output' },
      { icon: '\u{1F6E1}\u{FE0F}', label: 'Immutability', desc: 'Never mutate state directly; return copies' },
      { icon: '\u{1F504}', label: 'Composition', desc: 'Combine small functions into powerful pipelines' }
    ],
    snippet: `// Functional approach: pure & immutable
const gainExperience = (player, amount) => ({
  ...player,
  xp: player.xp + amount,
  level: Math.floor((player.xp + amount) / 100) + 1
});`,
    whyItMatters: 'React and modern frontend state management are built heavily on functional programming and immutability.'
  },

  'canvas-audio': {
    color: '#f43f5e',
    glow: 'rgba(244,63,94,0.4)',
    tagline: 'High-performance 2D graphics and 8-bit sound',
    diagram: [
      'requestAnimationFrame() Loop',
      '  ├── 1. Clear canvas',
      '  ├── 2. Update character positions',
      '  └── 3. Draw sprites & play WebAudio'
    ],
    concepts: [
      { icon: '\u{1F3A8}', label: 'Canvas 2D', desc: 'fillRect, drawImage, path rendering' },
      { icon: '\u{1F3AC}', label: 'Game Loop', desc: '60fps rendering via requestAnimationFrame' },
      { icon: '\u{1F3A7}', label: 'WebAudio API', desc: 'Synthesizers, audio nodes, sound FX' },
      { icon: '\u{1F4A5}', label: 'Collisions', desc: 'Hitboxes, bounding boxes, overlaps' }
    ],
    snippet: `const canvas = document.querySelector('#game');
const ctx = canvas.getContext('2d');

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(catSprite, cat.x, cat.y);
  requestAnimationFrame(gameLoop);
}`,
    whyItMatters: 'Canvas enables rich graphical experiences: browser games, data visualizers, and interactive particle systems.'
  },

  testing: {
    color: '#0ea5e9',
    glow: 'rgba(14,165,233,0.4)',
    tagline: 'Write with confidence: unit & integration tests',
    diagram: [
      'Code Change ──> Vitest / Jest Runner ──> ✓ 48 Tests Passed'
    ],
    concepts: [
      { icon: '\u{2705}', label: 'Unit Tests', desc: 'Test isolated functions with assertions' },
      { icon: '\u{1F9EA}', label: 'Integration', desc: 'Test multiple components together' },
      { icon: '\u{1F916}', label: 'E2E Testing', desc: 'Puppeteer / Playwright full browser tests' },
      { icon: '\u{1F9E9}', label: 'Mocking', desc: 'Simulate API responses without network' }
    ],
    snippet: `import { expect, test } from 'vitest';
import { calculateLevel } from './game';

test('calculates level correctly', () => {
  expect(calculateLevel(500)).toBe('Sorcerer');
  expect(calculateLevel(100)).toBe('Apprentice');
});`,
    whyItMatters: 'Automated tests catch bugs before real users see them, ensuring refactors never break existing features.'
  },

  'security-perf': {
    color: '#84cc16',
    glow: 'rgba(132,204,22,0.4)',
    tagline: 'Fast, secure, resilient production code',
    diagram: [
      'Defense in Depth:',
      '  ├── Sanitize inputs (No XSS)',
      '  ├── Debounce events (60fps performance)',
      '  └── Lazy load assets (Fast Time to Interactive)'
    ],
    concepts: [
      { icon: '\u{1F6E1}\u{FE0F}', label: 'XSS Defense', desc: 'Sanitizing user inputs & escaping HTML' },
      { icon: '\u{23F1}\u{FE0F}', label: 'Debounce', desc: 'Throttle search queries & resize listeners' },
      { icon: '\u{1F4C9}', label: 'Memory Leaks', desc: 'Clean up intervals & event listeners on unmount' },
      { icon: '\u{1F3CE}\u{FE0F}', label: 'Lighthouse', desc: 'Core Web Vitals & performance scores' }
    ],
    snippet: `// Debounce high-frequency input
function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}`,
    whyItMatters: 'Great code is fast and secure. Preventing vulnerabilities like XSS protects users and builds real trust.'
  },

  capstone: {
    color: '#f59e0b',
    glow: 'rgba(245,158,11,0.5)',
    tagline: 'The Ultimate Boss Quest: Full Interactive Web App',
    diagram: [
      '+=============================================+',
      '|       GRAND ARQ CAPSTONE ARCHITECTURE       |',
      '|   HTML5 + CSS3 + Modern ES6 Modules         |',
      '|   + Live REST APIs + LocalStorage + Canvas  |',
      '+=============================================+'
    ],
    concepts: [
      { icon: '\u{1F451}', label: 'Architecture', desc: 'Combining state, storage, UI, and APIs' },
      { icon: '\u{1F3AF}', label: 'State Machine', desc: 'Deterministic app flow without race conditions' },
      { icon: '\u{1F3A8}', label: 'Polished UI', desc: 'Retro aesthetics, micro-animations, sounds' },
      { icon: '\u{1F680}', label: 'Production Ready', desc: 'Deployed, tested, and responsive on all devices' }
    ],
    snippet: `// The Capstone: You are now a JavaScript Web Developer!
console.log('🏆 16 / 16 MILESTONES MASTERED!');
console.log('⚡ Welcome to the ranks of Full-Stack Pioneers.');`,
    whyItMatters: 'The capstone brings together everything you learned into a complete, portfolio-ready web application.'
  }
};
