import React from 'react';
import SingleFrameRoadmap from './SingleFrameRoadmap';

export default function FinalCelebrationModal({
  milestones = [],
  state = {},
  totalXp,
  onReturnToHall,
  onResetJourney,
  onClose
}) {
  return (
    <SingleFrameRoadmap
      milestones={milestones}
      state={state}
      totalXp={totalXp}
      onClose={onClose}
      onReturnToHall={onReturnToHall}
      onResetJourney={onResetJourney}
    />
  );
}
