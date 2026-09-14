/**
 * Canonical 16-Milestone Overworld Map Data for ARQ LearnHub.
 * Based on the Master Specification: Gamified JavaScript Web Development Roadmap.
 *
 * Progression is split into 5 thematic chapters + Final Capstone:
 * - Chapter 1: HTML, CSS, JavaScript Basics (Food at JS Basics) -> FOOD CHASE
 * - Chapter 2: DOM Manipulation, Events, ES6+ Basics (Food at ES6+) -> FOOD CHASE
 * - Chapter 3: Async JavaScript, Fetch API, JSON (Food at JSON) -> FOOD CHASE
 * - Chapter 4: Node.js, npm, Express.js (Food at Express.js) -> FOOD CHASE
 * - Chapter 5: REST APIs, Database, Authentication (Food at Authentication) -> FOOD CHASE
 * - Final: Backend Project (Food at Backend Project) -> FINAL REUNION FEAST
 */

export const CHAPTER_CONFIG = [
  {
    chapter: 1,
    title: 'Frontend Foundation',
    subtitle: 'HTML, CSS & JavaScript Core',
    goalNodeId: 'js-basics',
    nextGoalNodeId: 'es6',
    nodes: ['html', 'css', 'js-basics']
  },
  {
    chapter: 2,
    title: 'DOM & Modern JavaScript',
    subtitle: 'Dynamic Interactivity & ES6+',
    goalNodeId: 'es6',
    nextGoalNodeId: 'json',
    nodes: ['dom', 'events', 'es6']
  },
  {
    chapter: 3,
    title: 'Async & Web Data',
    subtitle: 'Asynchronous APIs & JSON Communication',
    goalNodeId: 'json',
    nextGoalNodeId: 'express',
    nodes: ['async', 'fetch', 'json']
  },
  {
    chapter: 4,
    title: 'Backend Foundation',
    subtitle: 'Server-Side Node, Packages & Express',
    goalNodeId: 'express',
    nextGoalNodeId: 'auth',
    nodes: ['nodejs', 'npm', 'express']
  },
  {
    chapter: 5,
    title: 'Data & Security',
    subtitle: 'REST Standards, Databases & Authentication',
    goalNodeId: 'auth',
    nextGoalNodeId: 'backend-project',
    nodes: ['rest', 'database', 'auth']
  },
  {
    chapter: 6,
    title: 'Grand Capstone Citadel',
    subtitle: 'The Full-Stack Synthesis',
    goalNodeId: 'backend-project',
    nextGoalNodeId: 'backend-project',
    nodes: ['backend-project']
  }
];

export const ROADMAP_MILESTONES = [
  // =========================================================================
  // CHAPTER 1: FRONTEND FOUNDATION (Goal: JavaScript Basics)
  // =========================================================================
  {
    id: 'html',
    order: 1,
    chapter: 1,
    chapterTitle: 'Frontend Foundation',
    title: 'HTML',
    subtitle: 'Foundation Grove',
    icon: '🌐',
    x: 1000,
    y: 3300,
    rx: 170,
    ry: 75,
    xp: 60,
    chapterGoalId: 'js-basics',
    isChasePoint: false,
    wizardDialogue: 'Every webpage needs a structure.\nHTML gives us that foundation.',
    concepts: ['HTML Document Structure', 'Semantic Tags (<main>, <nav>)', 'Forms, Inputs & Buttons', 'Head Metadata & SEO']
  },
  {
    id: 'css',
    order: 2,
    chapter: 1,
    chapterTitle: 'Frontend Foundation',
    title: 'CSS',
    subtitle: 'Aurora Meadow',
    icon: '🎨',
    x: 680,
    y: 3080,
    rx: 160,
    ry: 70,
    xp: 60,
    chapterGoalId: 'js-basics',
    isChasePoint: false,
    wizardDialogue: 'Our structure is ready.\nNow CSS helps us control how everything looks.',
    concepts: ['Box Model (Margin, Padding)', 'Flexbox & CSS Grid Alignment', 'Colors, Typography & Shadows', 'Responsive Media Queries']
  },
  {
    id: 'js-basics',
    order: 3,
    chapter: 1,
    chapterTitle: 'Frontend Foundation',
    title: 'JavaScript Basics',
    subtitle: 'Core Runes Hilltop',
    icon: '⚡',
    x: 1300,
    y: 2860,
    rx: 165,
    ry: 72,
    xp: 75,
    chapterGoalId: 'js-basics',
    isChasePoint: true,
    chaseNextGoalId: 'es6',
    wizardDialogue: "The page looks good, but it doesn't do much yet.\nJavaScript gives it behaviour.",
    concepts: ['Variables (let & const)', 'Data Types & Operators', 'Functions & Return Values', 'Conditionals & Loops']
  },

  // =========================================================================
  // CHAPTER 2: DOM & MODERN JS (Goal: ES6+ Basics)
  // =========================================================================
  {
    id: 'dom',
    order: 4,
    chapter: 2,
    chapterTitle: 'DOM & Modern JS',
    title: 'DOM Manipulation',
    subtitle: 'DOM Tree Spire',
    icon: '🌳',
    x: 720,
    y: 2640,
    rx: 160,
    ry: 70,
    xp: 75,
    chapterGoalId: 'es6',
    isChasePoint: false,
    wizardDialogue: 'JavaScript needs a way to interact with the webpage.\nThe DOM gives it that connection.',
    concepts: ['Selecting Elements (querySelector)', 'Updating HTML & Text Content', 'Creating & Appending Elements', 'Managing CSS ClassLists']
  },
  {
    id: 'events',
    order: 5,
    chapter: 2,
    chapterTitle: 'DOM & Modern JS',
    title: 'Events',
    subtitle: 'Event Weaver Junction',
    icon: '🖱️',
    x: 1280,
    y: 2420,
    rx: 160,
    ry: 70,
    xp: 75,
    chapterGoalId: 'es6',
    isChasePoint: false,
    wizardDialogue: 'Now the page can listen for user actions.\nClicks, typing, and other actions become events.',
    concepts: ['Click & Key Event Listeners', 'Form Submission & Validation', 'Event Bubbling & Propagation', 'Preventing Default Actions']
  },
  {
    id: 'es6',
    order: 6,
    chapter: 2,
    chapterTitle: 'DOM & Modern JS',
    title: 'ES6+ Basics',
    subtitle: 'Sunburst Glade',
    icon: '🚀',
    x: 700,
    y: 2200,
    rx: 160,
    ry: 70,
    xp: 80,
    chapterGoalId: 'es6',
    isChasePoint: true,
    chaseNextGoalId: 'json',
    wizardDialogue: 'Modern JavaScript gives us cleaner, more powerful syntax.\nWriting code becomes much simpler.',
    concepts: ['Arrow Functions & Scope', 'Destructuring Objects & Arrays', 'Template Literals & Strings', 'Spread & Rest Operators']
  },

  // =========================================================================
  // CHAPTER 3: ASYNC & WEB DATA (Goal: JSON)
  // =========================================================================
  {
    id: 'async',
    order: 7,
    chapter: 3,
    chapterTitle: 'Async & Web Data',
    title: 'Async JavaScript',
    subtitle: 'Chrono Gate Peak',
    icon: '⏳',
    x: 1260,
    y: 1980,
    rx: 170,
    ry: 75,
    xp: 85,
    chapterGoalId: 'json',
    isChasePoint: false,
    wizardDialogue: 'Some tasks take time.\nAsync JavaScript helps us handle them without blocking everything.',
    concepts: ['Synchronous vs Asynchronous Flow', 'Promises & Resolve/Reject', 'Async / Await Syntax', 'Error Handling with try/catch']
  },
  {
    id: 'fetch',
    order: 8,
    chapter: 3,
    chapterTitle: 'Async & Web Data',
    title: 'Fetch API',
    subtitle: 'HTTP Leyline Nexus',
    icon: '📡',
    x: 740,
    y: 1760,
    rx: 160,
    ry: 70,
    xp: 85,
    chapterGoalId: 'json',
    isChasePoint: false,
    wizardDialogue: 'Now our app can talk to the outside world.\nFetch helps us request data from servers.',
    concepts: ['HTTP GET & POST Methods', 'Fetching Remote Data', 'Request & Response Headers', 'Handling HTTP Status Codes']
  },
  {
    id: 'json',
    order: 9,
    chapter: 3,
    chapterTitle: 'Async & Web Data',
    title: 'JSON',
    subtitle: 'Data Matrix Haven',
    icon: '📋',
    x: 1240,
    y: 1540,
    rx: 160,
    ry: 70,
    xp: 75,
    chapterGoalId: 'json',
    isChasePoint: true,
    chaseNextGoalId: 'express',
    wizardDialogue: 'Servers and browsers need a shared language.\nJSON lets them exchange data easily.',
    concepts: ['JSON Syntax Rules', 'JSON.parse() & JSON.stringify()', 'Working with Nested Data', 'Exchanging Data with APIs']
  },

  // =========================================================================
  // CHAPTER 4: BACKEND FOUNDATION (Goal: Express.js)
  // =========================================================================
  {
    id: 'nodejs',
    order: 10,
    chapter: 4,
    chapterTitle: 'Backend Foundation',
    title: 'Node.js',
    subtitle: 'Server Engine Forge',
    icon: '🟢',
    x: 760,
    y: 1320,
    rx: 165,
    ry: 72,
    xp: 90,
    chapterGoalId: 'express',
    isChasePoint: false,
    wizardDialogue: 'So far, JavaScript has lived in the browser.\nNow we take JavaScript to the server.',
    concepts: ['Node.js Runtime Environment', 'Running Scripts on the Server', 'Core Modules (fs, path, http)', 'Event-Driven Architecture']
  },
  {
    id: 'npm',
    order: 11,
    chapter: 4,
    chapterTitle: 'Backend Foundation',
    title: 'npm',
    subtitle: 'Package Arsenal',
    icon: '📦',
    x: 1220,
    y: 1100,
    rx: 160,
    ry: 70,
    xp: 80,
    chapterGoalId: 'express',
    isChasePoint: false,
    wizardDialogue: "We don't need to write everything from scratch.\nnpm gives us a world of ready-made packages.",
    concepts: ['npm Package Ecosystem', 'package.json & Dependencies', 'Installing & Updating Packages', 'Running Custom npm Scripts']
  },
  {
    id: 'express',
    order: 12,
    chapter: 4,
    chapterTitle: 'Backend Foundation',
    title: 'Express.js',
    subtitle: 'Express Spire',
    icon: '🚂',
    x: 780,
    y: 880,
    rx: 160,
    ry: 70,
    xp: 100,
    chapterGoalId: 'express',
    isChasePoint: true,
    chaseNextGoalId: 'auth',
    wizardDialogue: 'Building a server by hand is slow.\nExpress helps us set up routes and logic with ease.',
    concepts: ['Setting Up an Express Server', 'Routing GET & POST Endpoints', 'Middleware Functions', 'Request & Response Handling']
  },

  // =========================================================================
  // CHAPTER 5: DATA & SECURITY (Goal: Authentication)
  // =========================================================================
  {
    id: 'rest',
    order: 13,
    chapter: 5,
    chapterTitle: 'Data & Security',
    title: 'REST APIs',
    subtitle: 'API Highway Bridge',
    icon: '🔌',
    x: 1200,
    y: 660,
    rx: 160,
    ry: 70,
    xp: 100,
    chapterGoalId: 'auth',
    isChasePoint: false,
    wizardDialogue: 'Our frontend and backend need clear rules to talk.\nREST APIs give them a standard structure.',
    concepts: ['RESTful Architecture Rules', 'CRUD Operations (Create/Read/Update/Delete)', 'HTTP Status Codes', 'API Route Organization']
  },
  {
    id: 'database',
    order: 14,
    chapter: 5,
    chapterTitle: 'Data & Security',
    title: 'Database',
    subtitle: 'SQL Catacombs',
    icon: '🗄️',
    x: 800,
    y: 440,
    rx: 165,
    ry: 72,
    xp: 110,
    chapterGoalId: 'auth',
    isChasePoint: false,
    wizardDialogue: 'Our app needs a memory.\nThe database stores the information it needs.',
    concepts: ['Databases & Persistent Storage', 'Connecting Server to Database', 'CRUD Queries & Data Models', 'Data Validation & Integrity']
  },
  {
    id: 'auth',
    order: 15,
    chapter: 5,
    chapterTitle: 'Data & Security',
    title: 'Authentication',
    subtitle: 'Cipher Ward Gate',
    icon: '🛡️',
    x: 1160,
    y: 260,
    rx: 160,
    ry: 70,
    xp: 120,
    chapterGoalId: 'auth',
    isChasePoint: true,
    chaseNextGoalId: 'backend-project',
    wizardDialogue: 'Not everyone should access everything.\nAuthentication helps the app know who is allowed in.',
    concepts: ['User Registration & Login', 'Password Hashing & Security', 'JWT (JSON Web Tokens)', 'Protecting Private Server Routes']
  },

  // =========================================================================
  // FINAL DESTINATION: THE GRAND BACKEND CAPSTONE
  // =========================================================================
  {
    id: 'backend-project',
    order: 16,
    chapter: 6,
    chapterTitle: 'Grand Capstone',
    title: 'Backend Project',
    subtitle: 'Grand Boss Citadel',
    icon: '👑',
    x: 1000,
    y: 90,
    rx: 210,
    ry: 85,
    xp: 250,
    isFinal: true,
    chapterGoalId: 'backend-project',
    isChasePoint: false,
    wizardDialogue: "You've reached the final stage.\nNow all the pieces come together in a real application.",
    concepts: ['Full-Stack System Architecture', 'REST API Integration', 'Database & Auth Implementation', 'Deployment & Production Polish']
  }
];

export const INITIAL_OVERWORLD_STATE = {
  // Cat starts at journey entrance; Food waits at Chapter 1 Goal (JavaScript Basics)
  catPositionId: 'start',
  foodPositionId: 'js-basics',
  completedMilestones: [],
  activeMilestoneId: 'html',
  currentChapter: 1,
  totalXp: 0,
  gold: 240,
  isFinished: false
};
