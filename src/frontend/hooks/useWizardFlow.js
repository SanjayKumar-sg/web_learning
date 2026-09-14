import { useState, useEffect, useCallback } from 'react';
import { PATHWAYS_DATA } from '../../data/pathways';

/**
 * Custom hook to manage the Sage Byterion state machine,
 * timed introduction dialogues, and reactive responses to user interaction.
 */
export function useWizardFlow() {
  const [wizardAction, setWizardAction] = useState('IDLE');
  const [wizardDialogue, setWizardDialogue] = useState(null);

  // Initial sequence upon entering the Great Hall
  useEffect(() => {
    const timer1 = setTimeout(() => {
      setWizardAction('WELCOME');
    }, 600);

    const timer2 = setTimeout(() => {
      setWizardAction('POINT');
    }, 3200);

    const timer3 = setTimeout(() => {
      setWizardAction('IDLE');
      setWizardDialogue('Take your time. Every path begins with a first step.');
    }, 6400);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  const onDoorHover = useCallback((pathId) => {
    setWizardDialogue(null);
    const directions = ['LOOK_LEFT', 'LOOK_CENTER', 'LOOK_RIGHT'];
    const idx = PATHWAYS_DATA.findIndex((p) => p.id === pathId);
    if (idx >= 0 && idx < directions.length) {
      setWizardAction(directions[idx]);
    } else {
      setWizardAction('IDLE');
    }
  }, []);

  const onDoorLeave = useCallback(() => {
    setWizardAction('IDLE');
    setWizardDialogue('Take your time. Every path begins with a first step.');
  }, []);

  const onDoorSelect = useCallback(() => {
    setWizardAction('STEP_ASIDE');
    setWizardDialogue('Let us see what awaits you.');
  }, []);

  const onConfirmPathStart = useCallback(() => {
    setWizardAction('CASTING');
    setWizardDialogue('The threshold opens! Step forward into destiny.');
  }, []);

  const onReturnToHall = useCallback(() => {
    setWizardAction('IDLE');
    setWizardDialogue('Welcome back to the Great Hall. The portals await whenever you choose.');
  }, []);

  return {
    wizardAction,
    wizardDialogue,
    setWizardAction,
    setWizardDialogue,
    onDoorHover,
    onDoorLeave,
    onDoorSelect,
    onConfirmPathStart,
    onReturnToHall
  };
}
