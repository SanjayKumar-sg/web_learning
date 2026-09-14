/**
 * Canonical 16-Milestone Learning Path Data for the Gamified JavaScript Web Development Roadmap.
 * Single source of truth for map positions, phase styling, Wizard guide dialogue, and challenges.
 */

export const ROADMAP_PHASES = [
  {
    id: 'frontend-foundation',
    name: 'Frontend Foundation',
    badgeColor: 'text-emerald-400 bg-emerald-950/70 border-emerald-500/50',
    borderColor: 'border-emerald-500',
    glowColor: 'shadow-[0_0_20px_rgba(16,185,129,0.35)]',
    accent: '#10B981',
    description: 'Structure and styling of modern web documents.'
  },
  {
    id: 'javascript-core',
    name: 'JavaScript Core',
    badgeColor: 'text-amber-400 bg-amber-950/70 border-amber-500/50',
    borderColor: 'border-amber-500',
    glowColor: 'shadow-[0_0_20px_rgba(245,158,11,0.35)]',
    accent: '#F59E0B',
    description: 'Dynamic scripting, DOM manipulation, asynchronous flows, and JSON.'
  },
  {
    id: 'backend-foundation',
    name: 'Backend Foundation',
    badgeColor: 'text-cyan-400 bg-cyan-950/70 border-cyan-500/50',
    borderColor: 'border-cyan-500',
    glowColor: 'shadow-[0_0_20px_rgba(6,182,212,0.35)]',
    accent: '#06B6D4',
    description: 'Server runtimes, npm packaging, Express routing, and REST APIs.'
  },
  {
    id: 'data-layer',
    name: 'Data Layer',
    badgeColor: 'text-purple-400 bg-purple-950/70 border-purple-500/50',
    borderColor: 'border-purple-500',
    glowColor: 'shadow-[0_0_20px_rgba(168,85,247,0.35)]',
    accent: '#A855F7',
    description: 'Persistent storage, schemas, database querying, and data integrity.'
  },
  {
    id: 'application-security',
    name: 'Application Security & Capstone',
    badgeColor: 'text-rose-400 bg-rose-950/70 border-rose-500/50',
    borderColor: 'border-rose-500',
    glowColor: 'shadow-[0_0_25px_rgba(244,63,94,0.4)]',
    accent: '#F43F5E',
    description: 'Tokens, sessions, encryption, and the master full-stack application.'
  }
];

export const ROADMAP_MILESTONES = [
  {
    id: 'html',
    order: 1,
    title: 'HTML',
    shortTitle: 'HTML',
    phaseId: 'frontend-foundation',
    phaseName: 'Frontend Foundation',
    icon: '🌐',
    wizardMessage: 'HTML is the foundation of every webpage. It gives your page its structure.',
    summary: 'Master semantic elements, document hierarchy, forms, accessibility attributes, and content structuring.',
    xp: 60,
    topics: ['Semantic Tags (header, main, footer)', 'Document Structure & Head', 'Forms, Inputs & Validation', 'Image & Media Embeds'],
    challenge: {
      type: 'quiz',
      title: 'HTML Foundation Check',
      prompt: 'Which HTML5 element represents the primary independent, self-contained content of a document (such as a blog post or news story)?',
      options: ['<section>', '<article>', '<aside>', '<container>'],
      correctIndex: 1,
      explanation: '<article> represents an independent, self-contained piece of content that can be distributed or reused independently.'
    }
  },
  {
    id: 'css',
    order: 2,
    title: 'CSS',
    shortTitle: 'CSS',
    phaseId: 'frontend-foundation',
    phaseName: 'Frontend Foundation',
    icon: '🎨',
    wizardMessage: 'CSS gives your webpage its look and style.',
    summary: 'Style web layouts using Flexbox, CSS Grid, custom properties, responsive design, and CSS transitions.',
    xp: 60,
    topics: ['Box Model & Selectors', 'Flexbox & CSS Grid Systems', 'Responsive Queries (Mobile First)', 'Transitions & Transforms'],
    challenge: {
      type: 'quiz',
      title: 'CSS Layout Check',
      prompt: 'In CSS Flexbox, which property aligns flex items along the cross axis (vertical when flex-direction is row)?',
      options: ['justify-content', 'align-items', 'flex-wrap', 'place-content'],
      correctIndex: 1,
      explanation: 'align-items aligns items along the cross axis, while justify-content aligns items along the main axis.'
    }
  },
  {
    id: 'js-basics',
    order: 3,
    title: 'JavaScript Basics',
    shortTitle: 'JS Basics',
    phaseId: 'javascript-core',
    phaseName: 'JavaScript Core',
    icon: '⚡',
    wizardMessage: 'JavaScript gives your webpage logic and makes it come alive.',
    summary: 'Understand variables (let, const), data types, operators, conditionals, functions, loops, and scope.',
    xp: 75,
    topics: ['Primitive Data Types & Type Coercion', 'Functions & Scope', 'Arrays & Objects', 'Conditionals & Loops'],
    challenge: {
      type: 'quiz',
      title: 'JavaScript Core Check',
      prompt: 'What is the value of `typeof null` in standard JavaScript?',
      options: ['"null"', '"undefined"', '"object"', '"boolean"'],
      correctIndex: 2,
      explanation: 'Due to a historical implementation detail in JavaScript, typeof null returns "object".'
    }
  },
  {
    id: 'dom-manipulation',
    order: 4,
    title: 'DOM Manipulation',
    shortTitle: 'DOM',
    phaseId: 'javascript-core',
    phaseName: 'JavaScript Core',
    icon: '🌳',
    wizardMessage: 'The DOM lets JavaScript see and change the page.',
    summary: 'Select, create, update, and remove DOM nodes dynamically using modern web browser APIs.',
    xp: 75,
    topics: ['querySelector & querySelectorAll', 'createElement & appendChild', 'classList & style manipulation', 'dataset attributes'],
    challenge: {
      type: 'quiz',
      title: 'DOM Query Check',
      prompt: 'Which DOM method safely retrieves the first matching element using any valid CSS selector?',
      options: ['document.getElement()', 'document.querySelector()', 'document.search()', 'document.findNode()'],
      correctIndex: 1,
      explanation: 'document.querySelector() returns the first Element within the document that matches the specified CSS selector.'
    }
  },
  {
    id: 'events',
    order: 5,
    title: 'Events',
    shortTitle: 'Events',
    phaseId: 'javascript-core',
    phaseName: 'JavaScript Core',
    icon: '🖱️',
    wizardMessage: 'Events let your webpage react to clicks, typing, and other actions.',
    summary: 'Handle user interactions with addEventListener, event bubbling, capture phases, and event delegation.',
    xp: 75,
    topics: ['addEventListener & removeEventListener', 'Event Bubbling & Capturing', 'event.preventDefault() & stopPropagation()', 'Event Delegation on Lists'],
    challenge: {
      type: 'quiz',
      title: 'Event Handling Check',
      prompt: 'Why is event delegation efficient when handling clicks on 100 list items?',
      options: [
        'It speeds up download of JS files',
        'You attach only 1 listener to the parent element instead of 100 separate listeners',
        'It prevents all browser caching',
        'It converts clicks into HTTP requests'
      ],
      correctIndex: 1,
      explanation: 'Event delegation attaches a single event listener to a parent element and leverages event bubbling to handle child clicks efficiently.'
    }
  },
  {
    id: 'es6-basics',
    order: 6,
    title: 'ES6+ Basics',
    shortTitle: 'ES6+',
    phaseId: 'javascript-core',
    phaseName: 'JavaScript Core',
    icon: '🚀',
    wizardMessage: 'Modern JavaScript gives you cleaner and more powerful ways to write code.',
    summary: 'Write elegant modern syntax using arrow functions, destructuring, template literals, spread/rest, and modules.',
    xp: 80,
    topics: ['Arrow Functions & Lexical this', 'Destructuring & Rest/Spread', 'Template Literals', 'ES Modules (import / export)'],
    challenge: {
      type: 'quiz',
      title: 'ES6 Syntax Check',
      prompt: 'Given `const user = { name: "Alex", score: 95 };`, what is the shorthand destructuring syntax to extract `score`?',
      options: ['const { score } = user;', 'const score = user.extract(score);', 'const [score] = user;', 'const score = &user.score;'],
      correctIndex: 0,
      explanation: '`const { score } = user;` unpacks the property `score` from `user` into a local variable.'
    }
  },
  {
    id: 'async-js',
    order: 7,
    title: 'Async JavaScript',
    shortTitle: 'Async JS',
    phaseId: 'javascript-core',
    phaseName: 'JavaScript Core',
    icon: '⏳',
    wizardMessage: 'Async JavaScript helps your program handle tasks that take time.',
    summary: 'Master the JavaScript Event Loop, Callbacks, Promises, and the async/await syntax.',
    xp: 85,
    topics: ['The JavaScript Event Loop & Microtasks', 'Promises (.then, .catch, .finally)', 'async / await Syntax', 'Promise.all & Promise.allSettled'],
    challenge: {
      type: 'quiz',
      title: 'Async Control Flow Check',
      prompt: 'What keyword can only be used inside a function marked with `async` to pause execution until a Promise resolves?',
      options: ['yield', 'await', 'defer', 'pause'],
      correctIndex: 1,
      explanation: 'The `await` keyword pauses execution inside an async function until the Promise settles.'
    }
  },
  {
    id: 'fetch-api',
    order: 8,
    title: 'Fetch API',
    shortTitle: 'Fetch API',
    phaseId: 'javascript-core',
    phaseName: 'JavaScript Core',
    icon: '📡',
    wizardMessage: 'Fetch lets your application request data from the internet.',
    summary: 'Connect your web application to external REST web servers, sending GET, POST, PUT, and DELETE requests.',
    xp: 85,
    topics: ['fetch() Syntax & Request Init', 'Handling HTTP Status Codes (res.ok)', 'POSTing Request Headers & Body', 'Error Handling & AbortController'],
    challenge: {
      type: 'quiz',
      title: 'Fetch Network Check',
      prompt: 'Does `fetch()` reject its Promise on an HTTP 404 or 500 error code?',
      options: [
        'Yes, it automatically throws an exception for all non-200 codes',
        'No, it only rejects on network failures; you must inspect response.ok',
        'Yes, but only in Node.js',
        'No, it converts 404 into null'
      ],
      correctIndex: 1,
      explanation: 'A fetch() Promise only rejects on true network failure. For HTTP error status codes like 404 or 500, check `response.ok`.'
    }
  },
  {
    id: 'json',
    order: 9,
    title: 'JSON',
    shortTitle: 'JSON',
    phaseId: 'javascript-core',
    phaseName: 'JavaScript Core',
    icon: '📋',
    wizardMessage: 'JSON is a simple format for exchanging data between applications.',
    summary: 'Serialize and parse data between frontend clients and backend APIs with JSON.stringify and JSON.parse.',
    xp: 75,
    topics: ['JSON Syntax vs JS Objects', 'JSON.parse() with try/catch', 'JSON.stringify() with replacers', 'Working with API payloads'],
    challenge: {
      type: 'quiz',
      title: 'JSON Serialization Check',
      prompt: 'Which method turns an in-memory JavaScript object into a JSON string formatted for network transmission?',
      options: ['JSON.parse(obj)', 'JSON.stringify(obj)', 'JSON.encode(obj)', 'Object.toJSON(obj)'],
      correctIndex: 1,
      explanation: '`JSON.stringify()` serializes JavaScript objects and values into a valid JSON string.'
    }
  },
  {
    id: 'node-js',
    order: 10,
    title: 'Node.js',
    shortTitle: 'Node.js',
    phaseId: 'backend-foundation',
    phaseName: 'Backend Foundation',
    icon: '🟢',
    wizardMessage: 'Node.js lets you run JavaScript outside the browser, including on a server.',
    summary: 'Learn the Node.js V8 runtime, global objects, file system (fs), path resolution, and CLI scripting.',
    xp: 90,
    topics: ['V8 Engine & Server Environment', 'Built-in Modules (fs, path, http)', 'process.env & Configuration', 'CommonJS vs ES Modules on Server'],
    challenge: {
      type: 'quiz',
      title: 'Node Runtime Check',
      prompt: 'Which global object exists in web browsers but is NOT present in a Node.js server runtime environment?',
      options: ['console', 'process', 'window', 'Buffer'],
      correctIndex: 2,
      explanation: '`window` and the DOM exist only in browser environments. In Node.js, `globalThis` or `global` is the top-level scope.'
    }
  },
  {
    id: 'npm',
    order: 11,
    title: 'npm',
    shortTitle: 'npm',
    phaseId: 'backend-foundation',
    phaseName: 'Backend Foundation',
    icon: '📦',
    wizardMessage: 'npm gives you packages and tools that you can use in your projects.',
    summary: 'Manage dependencies, package.json scripts, semantic versioning, lockfiles, and publish open-source modules.',
    xp: 80,
    topics: ['package.json & package-lock.json', 'dependencies vs devDependencies', 'Semantic Versioning (semver ^ ~)', 'npm scripts (dev, test, build)'],
    challenge: {
      type: 'quiz',
      title: 'Package Management Check',
      prompt: 'Which flag installs a package strictly as a development dependency (such as a linter or test runner)?',
      options: ['--save-prod', '--save-dev (or -D)', '--global', '--test-only'],
      correctIndex: 1,
      explanation: '`npm install --save-dev` (or `-D`) adds the package to `devDependencies`, keeping production bundles lean.'
    }
  },
  {
    id: 'express-js',
    order: 12,
    title: 'Express.js',
    shortTitle: 'Express',
    phaseId: 'backend-foundation',
    phaseName: 'Backend Foundation',
    icon: '🚂',
    wizardMessage: 'Express makes it easier to build web servers and backend applications.',
    summary: 'Build fast web servers, handle HTTP verbs, URL parameters, query strings, and custom middleware pipelines.',
    xp: 100,
    topics: ['Creating an Express App & Listening on Port', 'Routing: GET, POST, PUT, DELETE', 'Middleware: app.use(express.json())', 'Error-Handling Middleware'],
    challenge: {
      type: 'quiz',
      title: 'Express Routing Check',
      prompt: 'In Express, what built-in middleware must be called so your route handlers can read `req.body` as parsed JSON?',
      options: ['app.use(express.json())', 'app.use(express.bodyParser())', 'app.use(express.text())', 'app.use(express.xml())'],
      correctIndex: 0,
      explanation: '`app.use(express.json())` parses incoming request bodies with JSON payloads into `req.body`.'
    }
  },
  {
    id: 'rest-apis',
    order: 13,
    title: 'REST APIs',
    shortTitle: 'REST APIs',
    phaseId: 'backend-foundation',
    phaseName: 'Backend Foundation',
    icon: '🔌',
    wizardMessage: 'APIs create a bridge between your frontend and backend.',
    summary: 'Design RESTful endpoint conventions, status codes (200, 201, 400, 404, 500), CORS headers, and payload structures.',
    xp: 100,
    topics: ['REST Architectural Constraints', 'HTTP Verbs & CRUD Mapping', 'Standard Status Codes & Error Payloads', 'Enabling CORS for Cross-Origin Clients'],
    challenge: {
      type: 'quiz',
      title: 'API Convention Check',
      prompt: 'When an API successfully creates a brand-new resource in the database, what is the most appropriate HTTP status code to return?',
      options: ['200 OK', '201 Created', '204 No Content', '304 Not Modified'],
      correctIndex: 1,
      explanation: 'Status 201 Created explicitly indicates that the request has succeeded and led to the creation of a resource.'
    }
  },
  {
    id: 'database',
    order: 14,
    title: 'Database',
    shortTitle: 'Database',
    phaseId: 'data-layer',
    phaseName: 'Data Layer',
    icon: '🗄️',
    wizardMessage: 'A database gives your application a place to store and retrieve data.',
    summary: 'Store dynamic application records with SQL (PostgreSQL) and NoSQL (MongoDB), modeling relations and indexing.',
    xp: 110,
    topics: ['SQL Tables vs Document Collections', 'CRUD Operations & Queries', 'Primary Keys & Foreign Relations', 'Connecting Databases to Node Server'],
    challenge: {
      type: 'quiz',
      title: 'Data Persistence Check',
      prompt: 'Why is it critical to use parameterized queries or ORMs rather than concatenating user input directly into SQL strings?',
      options: [
        'To prevent SQL Injection vulnerabilities',
        'Because SQL syntax does not allow strings',
        'To reduce RAM usage in the browser',
        'To force the database to use SSL'
      ],
      correctIndex: 0,
      explanation: 'Parameterized queries separate SQL code from untrusted user data, completely neutralizing SQL Injection attacks.'
    }
  },
  {
    id: 'auth',
    order: 15,
    title: 'Authentication',
    shortTitle: 'Auth',
    phaseId: 'application-security',
    phaseName: 'Application Security & Capstone',
    icon: '🛡️',
    wizardMessage: 'Authentication helps your application know who its users are and protect their access.',
    summary: 'Secure applications with password hashing (bcrypt), JSON Web Tokens (JWT), sessions, and route guards.',
    xp: 120,
    topics: ['Password Hashing & Salting with bcrypt', 'JSON Web Tokens (JWT) & Bearer Headers', 'HttpOnly Cookie Storage', 'Protected Route Middleware'],
    challenge: {
      type: 'quiz',
      title: 'Security & Auth Check',
      prompt: 'Why should passwords NEVER be stored in plain text or using fast non-salted hashes like plain MD5?',
      options: [
        'Because databases can only store numbers',
        'Hashed passwords take up less disk space',
        'Salted slow hashes (like bcrypt) protect user passwords against rainbow table lookups and brute force in data breaches',
        'Plain text passwords slow down the network connection'
      ],
      correctIndex: 2,
      explanation: 'Cryptographic slow salts like bcrypt protect passwords even if database tables are compromised by attackers.'
    }
  },
  {
    id: 'backend-project',
    order: 16,
    title: 'Backend Project',
    shortTitle: 'Final Project',
    phaseId: 'application-security',
    phaseName: 'Application Security & Capstone',
    icon: '👑',
    wizardMessage: "You've learned the pieces. Now it's time to build something real.",
    summary: 'Architect, code, and deploy a complete production-ready REST API with Database storage and JWT Authentication.',
    xp: 250,
    isFinal: true,
    topics: [
      'Architecting Modular Server Folders (Controllers, Models, Routes)',
      'Integrating Auth Guards with DB CRUD Operations',
      'API Error Handling & Environment Security',
      'Deploying Full-Stack Services & Live Testing'
    ],
    challenge: {
      type: 'quiz',
      title: 'Full-Stack Capstone Defense',
      prompt: 'What complete architectural flow correctly connects a browser client to a protected database resource?',
      options: [
        'Client sends SQL query directly to database port 5432 over public internet',
        'Client sends HTTP request with JWT in Authorization header → Express route verifies token → Controller queries DB via secure connection → Returns JSON',
        'Browser saves all user database records locally in localStorage and syncs without any server validation',
        'Server sends its private database password to the browser client'
      ],
      correctIndex: 1,
      explanation: 'Client sends an HTTP request with JWT credentials → Node/Express verifies JWT → Controller securely executes DB operations → Clean JSON is returned.'
    }
  }
];

export const INITIAL_ROADMAP_STATE = {
  currentMilestoneId: 'html',
  completedMilestones: [],
  unlockedMilestones: ['html'],
  catPositionId: 'html',
  foodPositionId: 'html',
  isAnimating: false,
  totalXp: 0,
  isFinished: false
};
