# JavaScript Web Development Gamified Roadmap --- Software Development Plan

## 1. Project Definition

### Project Goal
Create an interactive, game-like web-development roadmap presented as a navigable map.

The learner progresses through the complete learning path:
**HTML → CSS → JavaScript Basics → DOM Manipulation → Events → ES6+ Basics → Async JavaScript → Fetch API → JSON → Node.js → npm → Express.js → REST APIs → Database → Authentication → Backend Project**

### The Central Interaction: Cat Chasing Food
- **The Cat** represents the learner.
- **The Food** represents the next learning objective.
- The learner selects/completes the current roadmap milestone.
- The cat moves toward the food.
- The food moves ahead to the next milestone.
- The next learning content becomes available.
- This continues until the final project.
- At the final milestone, the cat reaches the food and both characters join, completing the journey.

### End Goal
The learner should feel that they have physically travelled through a complete web-development journey rather than merely checked topics off a list.

The final experience should communicate:
*« I started with HTML and travelled all the way to building a backend application. »*

The project is successful when the roadmap is:
- Easy to understand without instructions.
- Visually engaging.
- Interactive rather than decorative.
- Progressive and state-driven.
- Smoothly animated.
- Technically reliable.
- Responsive across screen sizes.
- Accessible enough to remain usable without depending entirely on animation.
- Extensible so future learning modules can be added without rebuilding the entire system.

---

## 2. Product Principles

### 2.1 Map First
The roadmap must visually behave like a journey/map.
The user should immediately understand:
- Where they are.
- Where they came from.
- What is next.
- What is locked.
- What has been completed.
- Where the final destination is.

### 2.2 Interaction First
The roadmap should not behave like a static infographic. The learner's actions must visibly change the state of the map.

### 2.3 Progression Must Be Meaningful
Every completed milestone must unlock the next milestone. Do not allow arbitrary jumping through the learning path unless an explicit future product requirement adds free navigation.

### 2.4 Animation Supports Meaning
Animations should communicate state changes: movement, progress, unlocking, completion, transition, final achievement. Animation must never exist only for decoration.

### 2.5 Content Is External to the Roadmap Engine
The existing project content, text, theme, terminology, and visual language should remain the source of truth. Do not duplicate or hard-code content that already exists elsewhere in the project. The roadmap should consume the project's existing content/configuration where practical.

---

## 3. Learning Path

| Order | Milestone | World / Phase | Primary State |
| :--- | :--- | :--- | :--- |
| 01 | **HTML** | Frontend Foundation | Available at start |
| 02 | **CSS** | Frontend Foundation | Locked |
| 03 | **JavaScript Basics** | JavaScript Core | Locked |
| 04 | **DOM Manipulation** | JavaScript Core | Locked |
| 05 | **Events** | JavaScript Core | Locked |
| 06 | **ES6+ Basics** | JavaScript Core | Locked |
| 07 | **Async JavaScript** | JavaScript Core | Locked |
| 08 | **Fetch API** | JavaScript Core | Locked |
| 09 | **JSON** | JavaScript Core | Locked |
| 10 | **Node.js** | Backend Foundation | Locked |
| 11 | **npm** | Backend Foundation | Locked |
| 12 | **Express.js** | Backend Foundation | Locked |
| 13 | **REST APIs** | Backend Foundation | Locked |
| 14 | **Database** | Data Layer | Locked |
| 15 | **Authentication** | Application Security | Locked |
| 16 | **Backend Project** | Final Challenge | Locked until Authentication |

---

## 4. User Flow

### 4.1 Entry Flow
1. User opens the roadmap.
2. Roadmap initializes.
3. Current progress is loaded from storage.
4. Completed milestones are identified.
5. Current active milestone is identified.
6. Map positions are calculated.
7. Cat is positioned at the learner's current location.
8. Food is positioned at the current target.
9. Locked milestones are visually distinguished.
10. User sees the next available objective.

#### Initial State (New Learner)
- Cat = starting position (or at HTML).
- Food = HTML.
- HTML = available.
- All later milestones = locked.
- Final project = locked.
- Progress = 0%.

---

## 5. Core Interaction Loop

```
Current Milestone
      ↓
User selects milestone
      ↓
Milestone interaction/content opens
      ↓
User completes required action
      ↓
Validate completion
      ↓
Mark milestone complete
      ↓
Play cat movement animation
      ↓
Move/reveal food at next milestone
      ↓
Unlock next milestone
      ↓
Update progress
      ↓
Wait for next user action
```

---

## 6. Detailed Cat / Food Behaviour

### 6.1 Cat
- Represents the learner.
- States: `idle`, `moving`, `celebrating`, `waiting`, `finale`.
- The cat does not continuously move — it moves only when the learner progresses.

### 6.2 Food
- Represents the next goal.
- States: `waiting`, `target`, `escaping`, `finalTarget`, `consumed/joined`.
- Always communicates the next destination.

### 6.3 Standard Milestone Transition
```
CAT                         FOOD
🐱                          🍖
                              |
                           HTML

After completion:
🐱  ───────────────→  🍖

Then:
                         🍖
                         |
                        CSS

                 🐱
```
The next milestone becomes active.

### 6.4 Final Milestone
The final milestone breaks the normal chase pattern:
- Normal: Cat approaches → Food escapes.
- Final: Cat approaches → Food remains → Cat reaches food → Join/Fusion → Quest Complete!

---

## 7. Wizard Guide System

### 7.1 Purpose
The Wizard is a lightweight external guide who explains the current learning milestone in one or two short lines. It answers: *"What am I about to learn, and why does it matter?"*

### 7.2 Trigger Flow
```
Cat reaches milestone
        ↓
Wizard reveals
        ↓
Wizard gives 1–2 line explanation
        ↓
User sees the next action
        ↓
User continues to the milestone
        ↓
Wizard hides
        ↓
Learning interaction proceeds
```

### 7.3 Wizard Guide Messages

| Milestone | Guide Message |
| :--- | :--- |
| **HTML** | "HTML is the foundation of every webpage. It gives your page its structure." |
| **CSS** | "CSS gives your webpage its look and style." |
| **JavaScript Basics** | "JavaScript gives your webpage logic and makes it come alive." |
| **DOM Manipulation** | "The DOM lets JavaScript see and change the page." |
| **Events** | "Events let your webpage react to clicks, typing, and other actions." |
| **ES6+ Basics** | "Modern JavaScript gives you cleaner and more powerful ways to write code." |
| **Async JavaScript** | "Async JavaScript helps your program handle tasks that take time." |
| **Fetch API** | "Fetch lets your application request data from the internet." |
| **JSON** | "JSON is a simple format for exchanging data between applications." |
| **Node.js** | "Node.js lets you run JavaScript outside the browser, including on a server." |
| **npm** | "npm gives you packages and tools that you can use in your projects." |
| **Express.js** | "Express makes it easier to build web servers and backend applications." |
| **REST APIs** | "APIs create a bridge between your frontend and backend." |
| **Database** | "A database gives your application a place to store and retrieve data." |
| **Authentication** | "Authentication helps your application know who its users are and protect their access." |
| **Backend Project** | "You've learned the pieces. Now it's time to build something real." |

---

## 8. Roadmap State Model

Suggested state structure:
```
roadmapState
├── currentMilestone
├── completedMilestones[]
├── unlockedMilestones[]
├── milestoneStatuses[]
├── catPosition
├── foodPosition
├── wizardState
├── wizardMessage
├── isAnimating
├── activeInteraction
├── progress
└── completed
```

Status values:
- `LOCKED`
- `AVAILABLE`
- `ACTIVE`
- `COMPLETED`
- `FINAL`

---

## 9. Map Design & Responsiveness
- **Desktop**: Full winding map composition, character animations, milestone stations.
- **Tablet**: Compressed spacing, preserving full visual journey and labels.
- **Mobile**: Vertical/winding scrolling map, touch targets, no horizontal overflow.

---

## 10. Critical Architecture Rule
```
LEARNING LOGIC
      ↓
ROADMAP STATE
      ↓
VISUAL STATE
      ↓
ANIMATION
```
The cat and food are visual representations of progress. They never determine whether the learner actually completed a milestone. Progress is maintained reliably even if animations are interrupted or reduced.
