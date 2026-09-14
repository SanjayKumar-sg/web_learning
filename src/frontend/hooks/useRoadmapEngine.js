import { useState, useEffect, useCallback, useRef } from 'react';
import { ROADMAP_MILESTONES, INITIAL_OVERWORLD_STATE } from '../../data/roadmapData';

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
  const [showCelebration, setShowCelebration] = useState(false);

  // Wizard state: Initial welcome prompt or milestone explanation
  const [wizardState, setWizardState] = useState(() => {
    return {
      visible: true,
      title: 'SAGE BYTERION // ROADMAP GUIDE',
      message: 'Help the cat catch the food! Touch the HTML island to begin your journey.'
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

  // Main interaction: User touches an island
  const touchIsland = useCallback((milestone) => {
    if (animLockRef.current) return;

    const currentIndex = ROADMAP_MILESTONES.findIndex((m) => m.id === milestone.id);
    if (currentIndex === -1) return;

    // Is this the currently active objective?
    const isActiveTarget = state.activeMilestoneId === milestone.id;
    const isAlreadyCompleted = state.completedMilestones.includes(milestone.id);

    // If clicking an already completed milestone, wizard simply reviews it
    if (isAlreadyCompleted) {
      setWizardState({
        visible: true,
        title: `SAGE BYTERION // ${milestone.title.toUpperCase()}`,
        message: milestone.wizardDialogue
      });
      return;
    }

    // If clicking a locked future milestone, wizard gives guidance
    if (!isActiveTarget) {
      const activeObj = ROADMAP_MILESTONES.find((m) => m.id === state.activeMilestoneId);
      setWizardState({
        visible: true,
        title: 'SAGE BYTERION // GUIDANCE',
        message: `The food is currently waiting on ${activeObj?.title || 'the next island'}. Touch that island to guide the cat!`
      });
      return;
    }

    // --- EXECUTE THE EXACT CAT & FOOD LEAP SEQUENCE ---
    animLockRef.current = true;
    setCatAnimation('jumping');

    const isFinalMilestone = milestone.isFinal || currentIndex === ROADMAP_MILESTONES.length - 1;

    if (isFinalMilestone) {
      // Final Milestone: Cat catches food!
      setTimeout(() => {
        setCatAnimation('finale');
        setFoodAnimation('joined');

        setState((prev) => ({
          ...prev,
          catPositionId: milestone.id,
          foodPositionId: milestone.id,
          completedMilestones: Array.from(new Set([...prev.completedMilestones, milestone.id])),
          totalXp: prev.totalXp + milestone.xp,
          gold: prev.gold + 100,
          isFinished: true
        }));

        setWizardState({
          visible: true,
          title: 'SAGE BYTERION // MASTER CODER',
          message: milestone.wizardDialogue
        });

        setTimeout(() => {
          setShowCelebration(true);
          animLockRef.current = false;
        }, 900);
      }, 700);
    } else {
      // Standard Milestone: Food leaps to next island, Cat lands on current island
      const nextIndex = currentIndex + 1;
      const nextMilestone = ROADMAP_MILESTONES[nextIndex];

      setFoodAnimation('leaping');

      setTimeout(() => {
        setCatAnimation('celebrating');
        setFoodAnimation('idle');

        setState((prev) => ({
          ...prev,
          catPositionId: milestone.id,
          foodPositionId: nextMilestone.id,
          activeMilestoneId: nextMilestone.id,
          completedMilestones: Array.from(new Set([...prev.completedMilestones, milestone.id])),
          totalXp: prev.totalXp + milestone.xp,
          gold: prev.gold + 50
        }));

        // Wizard returns and explains 1-2 lines about the milestone just reached!
        setWizardState({
          visible: true,
          title: `SAGE BYTERION // ${milestone.title.toUpperCase()}`,
          message: milestone.wizardDialogue
        });

        setTimeout(() => {
          setCatAnimation('idle');
          animLockRef.current = false;
        }, 800);
      }, 650);
    }
  }, [state.activeMilestoneId, state.completedMilestones]);

  // Reset Progress cleanly
  const resetProgress = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    animLockRef.current = false;
    setState(INITIAL_OVERWORLD_STATE);
    setCatAnimation('idle');
    setFoodAnimation('idle');
    setShowCelebration(false);
    setWizardState({
      visible: true,
      title: 'SAGE BYTERION // ROADMAP GUIDE',
      message: 'Help the cat catch the food! Touch the HTML island to begin your journey.'
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
    wizardState,
    showCelebration,
    touchIsland,
    dismissWizard,
    resetProgress,
    setShowCelebration
  };
}
