import { useState, useEffect, useCallback, useRef } from 'react';
import { ROADMAP_MILESTONES, INITIAL_ROADMAP_STATE } from '../../data/roadmapData';

const STORAGE_KEY = 'arq_js_roadmap_progress_v1';

export function useRoadmapEngine() {
  // Load saved state or default
  const [state, setState] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && Array.isArray(parsed.completedMilestones)) {
          return {
            ...INITIAL_ROADMAP_STATE,
            ...parsed,
            isAnimating: false // never restore in stuck animation
          };
        }
      }
    } catch (e) {
      console.error('Error loading roadmap progress:', e);
    }
    return INITIAL_ROADMAP_STATE;
  });

  // Transient interactive state
  const [activeModalMilestone, setActiveModalMilestone] = useState(null);
  const [catState, setCatState] = useState('idle'); // 'idle' | 'moving' | 'celebrating' | 'waiting' | 'finale'
  const [foodState, setFoodState] = useState('waiting'); // 'waiting' | 'target' | 'escaping' | 'finalTarget' | 'consumed'
  const [wizardState, setWizardState] = useState({
    visible: true,
    milestoneId: 'html',
    message: ROADMAP_MILESTONES[0].wizardMessage
  });
  const [showCelebration, setShowCelebration] = useState(false);

  // Animation lock ref
  const animLockRef = useRef(false);

  // Synchronize state to localStorage
  useEffect(() => {
    try {
      const persistable = {
        currentMilestoneId: state.currentMilestoneId,
        completedMilestones: state.completedMilestones,
        unlockedMilestones: state.unlockedMilestones,
        catPositionId: state.catPositionId,
        foodPositionId: state.foodPositionId,
        totalXp: state.totalXp,
        isFinished: state.isFinished
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(persistable));
    } catch (e) {
      console.warn('Could not save roadmap progress to localStorage:', e);
    }
  }, [state]);

  // Derived progress calculations
  const totalMilestones = ROADMAP_MILESTONES.length;
  const completedCount = state.completedMilestones.length;
  const progressPercent = Math.min(100, Math.round((completedCount / totalMilestones) * 100));

  // Determine current active milestone object
  const currentMilestoneIndex = ROADMAP_MILESTONES.findIndex((m) => m.id === state.currentMilestoneId);
  const currentMilestone = currentMilestoneIndex >= 0 ? ROADMAP_MILESTONES[currentMilestoneIndex] : ROADMAP_MILESTONES[0];

  // Open milestone modal (only for unlocked/completed milestones)
  const openMilestoneModal = useCallback((milestone) => {
    if (animLockRef.current) return;
    const isUnlocked = state.unlockedMilestones.includes(milestone.id);
    if (!isUnlocked) return; // Ignore clicks on locked milestones
    setActiveModalMilestone(milestone);
  }, [state.unlockedMilestones]);

  const closeMilestoneModal = useCallback(() => {
    setActiveModalMilestone(null);
  }, []);

  // Dismiss Wizard guide bubble
  const dismissWizard = useCallback(() => {
    setWizardState((prev) => ({ ...prev, visible: false }));
  }, []);

  // Show Wizard guide for specific milestone
  const showWizardForMilestone = useCallback((milestoneId) => {
    const ms = ROADMAP_MILESTONES.find((m) => m.id === milestoneId);
    if (ms) {
      setWizardState({
        visible: true,
        milestoneId: ms.id,
        message: ms.wizardMessage
      });
    }
  }, []);

  // Complete milestone and trigger the Cat chasing Food sequence
  const completeMilestone = useCallback((milestoneId) => {
    if (animLockRef.current) return;
    const currentIndex = ROADMAP_MILESTONES.findIndex((m) => m.id === milestoneId);
    if (currentIndex === -1) return;

    const milestone = ROADMAP_MILESTONES[currentIndex];
    const isAlreadyCompleted = state.completedMilestones.includes(milestoneId);
    const isFinalMilestone = milestone.isFinal || currentIndex === ROADMAP_MILESTONES.length - 1;

    // Close the challenge modal immediately
    setActiveModalMilestone(null);

    // If re-completing already completed node, no animation loop needed
    if (isAlreadyCompleted) return;

    // Lock interaction during animation sequence
    animLockRef.current = true;
    setState((prev) => ({ ...prev, isAnimating: true }));

    if (isFinalMilestone) {
      // --- FINAL MILESTONE SPECIAL SEQUENCE ---
      // Food does NOT escape! Cat reaches food -> Fusion -> Celebration
      setCatState('moving');
      setFoodState('finalTarget');

      setTimeout(() => {
        // Cat reaches food
        setCatState('finale');
        setFoodState('consumed');

        setState((prev) => ({
          ...prev,
          completedMilestones: Array.from(new Set([...prev.completedMilestones, milestoneId])),
          catPositionId: milestoneId,
          foodPositionId: milestoneId,
          totalXp: prev.totalXp + milestone.xp,
          isFinished: true,
          isAnimating: false
        }));

        // Trigger celebratory fanfare
        setTimeout(() => {
          setShowCelebration(true);
          animLockRef.current = false;
        }, 800);
      }, 900);
    } else {
      // --- STANDARD MILESTONE TRANSITION LOOP ---
      const nextIndex = currentIndex + 1;
      const nextMilestone = ROADMAP_MILESTONES[nextIndex];
      const nextMilestoneId = nextMilestone.id;

      // 1. Food begins escaping towards next milestone, Cat moves toward completed milestone
      setFoodState('escaping');
      setCatState('moving');

      // 2. Cat arrives at current milestone, Food settles at next milestone
      setTimeout(() => {
        setCatState('celebrating');
        setFoodState('target');

        setState((prev) => ({
          ...prev,
          completedMilestones: Array.from(new Set([...prev.completedMilestones, milestoneId])),
          unlockedMilestones: Array.from(new Set([...prev.unlockedMilestones, nextMilestoneId])),
          currentMilestoneId: nextMilestoneId,
          catPositionId: milestoneId,
          foodPositionId: nextMilestoneId,
          totalXp: prev.totalXp + milestone.xp,
          isAnimating: false
        }));

        // 3. Reveal Wizard 1-2 line speech bubble for the newly unlocked objective
        showWizardForMilestone(nextMilestoneId);

        // 4. Return Cat to idle after celebratory bounce
        setTimeout(() => {
          setCatState('idle');
          animLockRef.current = false;
        }, 1100);
      }, 850);
    }
  }, [state.completedMilestones, showWizardForMilestone]);

  // Reset progress cleanly (for testing and replayability)
  const resetProgress = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    animLockRef.current = false;
    setState(INITIAL_ROADMAP_STATE);
    setCatState('idle');
    setFoodState('waiting');
    setShowCelebration(false);
    setActiveModalMilestone(null);
    setWizardState({
      visible: true,
      milestoneId: 'html',
      message: ROADMAP_MILESTONES[0].wizardMessage
    });
  }, []);

  return {
    state,
    milestones: ROADMAP_MILESTONES,
    currentMilestone,
    completedCount,
    totalMilestones,
    progressPercent,
    catState,
    foodState,
    wizardState,
    activeModalMilestone,
    showCelebration,
    openMilestoneModal,
    closeMilestoneModal,
    completeMilestone,
    dismissWizard,
    showWizardForMilestone,
    resetProgress,
    setShowCelebration
  };
}
