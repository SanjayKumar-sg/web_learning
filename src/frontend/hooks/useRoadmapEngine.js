import { useState, useEffect, useCallback, useRef } from 'react';
import { ROADMAP_MILESTONES, INITIAL_OVERWORLD_STATE, CHAPTER_CONFIG } from '../../data/roadmapData';

const STORAGE_KEY = 'arq_js_overworld_map_v2';

export function useRoadmapEngine() {
  const [state, setState] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && Array.isArray(parsed.completedMilestones)) {
          return {
            ...INITIAL_OVERWORLD_STATE,
            ...parsed,
            isAnimating: false
          };
        }
      }
    } catch (e) {
      console.error('Error loading roadmap progress:', e);
    }
    return INITIAL_OVERWORLD_STATE;
  });

  // Cat & Food motion states
  const [catAnimation, setCatAnimation] = useState('idle'); // 'idle' | 'jumping' | 'celebrating' | 'finale'
  const [foodAnimation, setFoodAnimation] = useState('idle'); // 'idle' | 'leaping' | 'joined'
  const [catFacing, setCatFacing] = useState('right');
  const [catMotion, setCatMotion] = useState(null); // { x, y, inFlight, facing }
  const [foodMotion, setFoodMotion] = useState(null); // { x, y, inFlight }
  const [showCelebration, setShowCelebration] = useState(false);

  // Wizard state: Dynamically initialized from active milestone or saved state
  const [wizardState, setWizardState] = useState(() => {
    let initialActiveId = INITIAL_OVERWORLD_STATE.activeMilestoneId;
    let isFinished = false;
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed?.activeMilestoneId) {
          initialActiveId = parsed.activeMilestoneId;
        }
        if (parsed?.isFinished) {
          isFinished = true;
        }
      }
    } catch (_) {}

    const milestone = ROADMAP_MILESTONES.find((m) => m.id === initialActiveId) || ROADMAP_MILESTONES[0];
    return {
      visible: true,
      title: isFinished ? 'SAGE BYTERION // JOURNEY COMPLETE' : `SAGE BYTERION // ${milestone.title.toUpperCase()}`,
      message: milestone.wizardDialogue,
      chapterTitle: milestone.chapterTitle,
      chapter: milestone.chapter,
      isChasePoint: milestone.isChasePoint,
      isRecap: false,
      isFinal: isFinished
    };
  });

  const animLockRef = useRef(false);

  // Save to localStorage
  useEffect(() => {
    try {
      const persistable = {
        catPositionId: state.catPositionId,
        foodPositionId: state.foodPositionId,
        completedMilestones: state.completedMilestones,
        activeMilestoneId: state.activeMilestoneId,
        currentChapter: state.currentChapter,
        totalXp: state.totalXp,
        gold: state.gold,
        isFinished: state.isFinished
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(persistable));
    } catch (e) {
      console.warn('LocalStorage save error:', e);
    }
  }, [state]);

  const completedCount = state.completedMilestones.length;
  const totalMilestones = ROADMAP_MILESTONES.length;
  const progressPercent = Math.min(100, Math.round((completedCount / totalMilestones) * 100));

  // Dismiss wizard speech bubble
  const dismissWizard = useCallback(() => {
    setWizardState((prev) => ({ ...prev, visible: false }));
  }, []);

  // Main interaction: User touches an island or clicks Next
  const touchIsland = useCallback((milestone) => {
    if (animLockRef.current) return;

    const currentIndex = ROADMAP_MILESTONES.findIndex((m) => m.id === milestone.id);
    if (currentIndex === -1) return;

    const isActiveTarget = state.activeMilestoneId === milestone.id;
    const isAlreadyCompleted = state.completedMilestones.includes(milestone.id);

    // If clicking an already completed milestone, wizard provides short recap
    if (isAlreadyCompleted) {
      setWizardState({
        visible: true,
        title: `SAGE BYTERION // RECAP: ${milestone.title.toUpperCase()}`,
        message: milestone.wizardDialogue,
        chapterTitle: milestone.chapterTitle,
        chapter: milestone.chapter,
        isChasePoint: milestone.isChasePoint,
        isRecap: true,
        recapMilestoneId: milestone.id
      });
      return;
    }

    // If clicking a locked milestone ahead of the current objective
    if (!isActiveTarget) {
      const activeObj = ROADMAP_MILESTONES.find((m) => m.id === state.activeMilestoneId);
      setWizardState({
        visible: true,
        title: 'SAGE BYTERION // ADVENTURE GUIDE',
        message: `Our next destination is ${activeObj?.title || 'ahead'}. Touch that island to guide the cat!`,
        chapterTitle: activeObj?.chapterTitle,
        chapter: activeObj?.chapter,
        isChasePoint: false,
        isRecap: false
      });
      return;
    }

    // --- ANIMATE CAT MOVEMENT TO TARGET MILESTONE ---
    animLockRef.current = true;
    setCatAnimation('jumping');

    const isFinalMilestone = milestone.isFinal || currentIndex === ROADMAP_MILESTONES.length - 1;
    const isChasePoint = milestone.isChasePoint; // Nodes 3, 6, 9, 12, 15
    const nextIndex = currentIndex + 1;
    const nextMilestone = ROADMAP_MILESTONES[nextIndex];

    // Determine start coordinates for the Cat
    let startCat = { x: 1000, y: 3540 }; // Start harbor dock
    if (state.catPositionId !== 'start') {
      const prevMs = ROADMAP_MILESTONES.find((m) => m.id === state.catPositionId);
      if (prevMs) startCat = { x: prevMs.x, y: prevMs.y };
    }
    const targetCat = { x: milestone.x, y: milestone.y };
    const facing = targetCat.x >= startCat.x ? 'right' : 'left';
    setCatFacing(facing);

    // Food Movement Rules:
    // 1. Normal nodes (1, 2, 4, 5, etc.): Food does NOT move! It stays waiting at chapter goal.
    // 2. Chase points (3, 6, 9, 12, 15): Food performs a leap to the next chapter goal!
    // 3. Final node (16): Food stays at destination. Cat arrives and joins.
    const shouldFoodChase = isChasePoint && milestone.chaseNextGoalId;
    let nextChapterGoalMs = null;
    if (shouldFoodChase) {
      nextChapterGoalMs = ROADMAP_MILESTONES.find((m) => m.id === milestone.chaseNextGoalId);
    }

    const startFood = { x: milestone.x, y: milestone.y };
    const targetFood = nextChapterGoalMs ? { x: nextChapterGoalMs.x, y: nextChapterGoalMs.y } : startFood;

    if (shouldFoodChase) {
      setFoodAnimation('leaping');
    } else if (isFinalMilestone) {
      setFoodAnimation('joined');
    } else {
      setFoodAnimation('idle');
    }

    const startTime = performance.now();
    const flightDuration = shouldFoodChase ? 850 : 680;

    const animateFlight = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / flightDuration);
      const ease = progress < 0.5 ? 2 * progress * progress : 1 - Math.pow(-2 * progress + 2, 2) / 2;

      // Parabolic vertical arc for Cat
      const catArcH = Math.sin(progress * Math.PI) * 75;
      const currentCatX = startCat.x + (targetCat.x - startCat.x) * ease;
      const currentCatY = startCat.y + (targetCat.y - startCat.y) * ease - catArcH;
      setCatMotion({ x: currentCatX, y: currentCatY, inFlight: true, facing });

      // Food flight arc only during Chase Points
      if (shouldFoodChase) {
        const foodArcH = Math.sin(progress * Math.PI) * 110;
        const currentFoodX = startFood.x + (targetFood.x - startFood.x) * ease;
        const currentFoodY = startFood.y + (targetFood.y - startFood.y) * ease - foodArcH;
        setFoodMotion({ x: currentFoodX, y: currentFoodY, inFlight: true });
      }

      if (progress < 1) {
        requestAnimationFrame(animateFlight);
      } else {
        // Touchdown landing!
        setCatMotion(null);
        setFoodMotion(null);

        if (isFinalMilestone) {
          setCatAnimation('finale');
          setFoodAnimation('joined');

          setState((prev) => ({
            ...prev,
            catPositionId: milestone.id,
            foodPositionId: milestone.id,
            activeMilestoneId: milestone.id,
            completedMilestones: Array.from(new Set([...prev.completedMilestones, milestone.id])),
            totalXp: prev.totalXp + milestone.xp,
            gold: prev.gold + 100,
            isFinished: true
          }));

          setWizardState({
            visible: true,
            title: 'SAGE BYTERION // JOURNEY COMPLETE',
            message: milestone.wizardDialogue,
            chapterTitle: 'Grand Capstone',
            chapter: 6,
            isChasePoint: false,
            isFinal: true
          });

          setTimeout(() => {
            setShowCelebration(true);
            animLockRef.current = false;
          }, 800);
        } else if (shouldFoodChase) {
          // Chapter Chase Point complete!
          setCatAnimation('celebrating');
          setFoodAnimation('idle');

          const newFoodGoalId = milestone.chaseNextGoalId;

          setState((prev) => ({
            ...prev,
            catPositionId: milestone.id,
            foodPositionId: newFoodGoalId,
            activeMilestoneId: nextMilestone ? nextMilestone.id : milestone.id,
            completedMilestones: Array.from(new Set([...prev.completedMilestones, milestone.id])),
            totalXp: prev.totalXp + milestone.xp,
            gold: prev.gold + 60,
            currentChapter: milestone.chapter + 1
          }));

          setWizardState({
            visible: true,
            title: `SAGE BYTERION // CHAPTER ${milestone.chapter} COMPLETE!`,
            message: `${milestone.wizardDialogue}\n\nThe food leaps ahead into the next chapter!`,
            chapterTitle: milestone.chapterTitle,
            chapter: milestone.chapter,
            isChasePoint: true,
            nextMilestone: nextMilestone
          });

          setTimeout(() => {
            setCatAnimation('idle');
            animLockRef.current = false;
          }, 800);
        } else {
          // Normal Node Movement (nodes 1, 2, 4, 5, etc.)
          setCatAnimation('celebrating');
          setFoodAnimation('idle');

          setState((prev) => ({
            ...prev,
            catPositionId: milestone.id,
            activeMilestoneId: nextMilestone ? nextMilestone.id : milestone.id,
            completedMilestones: Array.from(new Set([...prev.completedMilestones, milestone.id])),
            totalXp: prev.totalXp + milestone.xp,
            gold: prev.gold + 40
          }));

          setWizardState({
            visible: true,
            title: `SAGE BYTERION // ${milestone.title.toUpperCase()}`,
            message: milestone.wizardDialogue,
            chapterTitle: milestone.chapterTitle,
            chapter: milestone.chapter,
            isChasePoint: false,
            nextMilestone: nextMilestone
          });

          setTimeout(() => {
            setCatAnimation('idle');
            animLockRef.current = false;
          }, 600);
        }
      }
    };

    requestAnimationFrame(animateFlight);
  }, [state.activeMilestoneId, state.completedMilestones, state.catPositionId]);

  // Advance to next milestone programmatically (e.g. from Wizard [ Continue ] button)
  const advanceToNext = useCallback(() => {
    const activeMs = ROADMAP_MILESTONES.find((m) => m.id === state.activeMilestoneId);
    if (activeMs) {
      touchIsland(activeMs);
    }
  }, [state.activeMilestoneId, touchIsland]);

  // Return wizard and focus back to active objective from recap
  const returnToObjective = useCallback(() => {
    const activeMs = ROADMAP_MILESTONES.find((m) => m.id === state.activeMilestoneId) || ROADMAP_MILESTONES[0];
    setWizardState({
      visible: true,
      title: `SAGE BYTERION // ${activeMs.title.toUpperCase()}`,
      message: activeMs.wizardDialogue,
      chapterTitle: activeMs.chapterTitle,
      chapter: activeMs.chapter,
      isChasePoint: activeMs.isChasePoint,
      isRecap: false
    });
  }, [state.activeMilestoneId]);

  // Reset Progress cleanly
  const resetProgress = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    animLockRef.current = false;
    setState(INITIAL_OVERWORLD_STATE);
    setCatAnimation('idle');
    setFoodAnimation('idle');
    setCatFacing('right');
    setCatMotion(null);
    setFoodMotion(null);
    setShowCelebration(false);
    setWizardState({
      visible: true,
      title: 'SAGE BYTERION // ROADMAP GUIDE',
      message: 'Every webpage needs a structure.\nHTML gives us that foundation.',
      chapterTitle: 'Frontend Foundation',
      chapter: 1,
      isChasePoint: false
    });
  }, []);

  return {
    state,
    milestones: ROADMAP_MILESTONES,
    completedCount,
    totalMilestones,
    progressPercent,
    catAnimation,
    foodAnimation,
    catFacing,
    catMotion,
    foodMotion,
    wizardState,
    showCelebration,
    touchIsland,
    advanceToNext,
    returnToObjective,
    dismissWizard,
    resetProgress,
    setShowCelebration
  };
}
