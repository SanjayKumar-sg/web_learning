import React, { useState } from 'react';

export default function MilestoneModal({ milestone, isCompleted, onComplete, onClose }) {
  if (!milestone) return null;

  const challenge = milestone.challenge;
  const [selectedOption, setSelectedOption] = useState(null);
  const [hasSubmitted, setHasSubmitted] = useState(isCompleted);
  const [errorMessage, setErrorMessage] = useState('');

  const isCorrect = selectedOption === challenge.correctIndex || isCompleted;

  const handleOptionSelect = (idx) => {
    if (isCompleted) return;
    setSelectedOption(idx);
    setErrorMessage('');
  };

  const handleSubmit = () => {
    if (selectedOption === null) {
      setErrorMessage('Please select an answer to validate this milestone.');
      return;
    }

    if (selectedOption !== challenge.correctIndex) {
      setErrorMessage('Incorrect answer. Review the concept and try again!');
      return;
    }

    setHasSubmitted(true);
    setErrorMessage('');
    // Trigger completion & cat movement
    onComplete(milestone.id);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="milestone-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
    >
      {/* Modal Dialog Card */}
      <div className="bg-[#121024] border-2 border-purple-500/80 w-full max-w-xl pixel-corners shadow-[0_0_40px_rgba(168,85,247,0.4)] text-white overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header Bar */}
        <div className="bg-[#1B1833] border-b border-purple-900/80 p-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl p-1.5 bg-[#0B0A16] border border-purple-500/40 rounded">
              {milestone.icon}
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-orbitron font-bold text-xs text-yellow-400">
                  MILESTONE {String(milestone.order).padStart(2, '0')} // {milestone.phaseName.toUpperCase()}
                </span>
                {isCompleted && (
                  <span className="font-vt323 text-xs bg-green-950 border border-green-500 text-green-300 px-1.5 py-0.2 rounded">
                    COMPLETED ✓
                  </span>
                )}
              </div>
              <h2 id="milestone-modal-title" className="font-orbitron font-extrabold text-base sm:text-lg text-white">
                {milestone.title}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white font-pixel text-xs px-2 py-1 bg-black/40 hover:bg-white/10 rounded transition-colors cursor-pointer"
          >
            ✕ CLOSE [ ESC ]
          </button>
        </div>

        {/* Scrollable Body Content */}
        <div className="p-4 sm:p-5 space-y-4 overflow-y-auto font-sans flex-1">
          {/* Summary Quote */}
          <div className="p-3 bg-[#181530] border-l-4 border-cyan-400 rounded-r text-gray-200 text-xs sm:text-sm leading-relaxed">
            {milestone.summary}
          </div>

          {/* Key Topics List */}
          <div>
            <h3 className="font-orbitron text-xs text-cyan-300 font-bold mb-2 flex items-center gap-1.5">
              <span>📌</span>
              <span>CORE TOPICS & CAPABILITIES</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {milestone.topics.map((topic, i) => (
                <div
                  key={i}
                  className="bg-[#0B0A16]/80 border border-gray-800 p-2 rounded text-xs text-gray-300 flex items-center gap-2"
                >
                  <span className="text-purple-400 font-bold">›</span>
                  <span>{topic}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Hands-On Challenge Section */}
          <div className="bg-[#0D0B1C] border border-purple-900/60 p-3.5 rounded-lg space-y-3">
            <div className="flex items-center justify-between border-b border-gray-800 pb-1.5">
              <span className="font-orbitron text-xs font-bold text-yellow-300 flex items-center gap-1.5">
                <span>⚡</span>
                <span>{challenge.title}</span>
              </span>
              <span className="font-vt323 text-xs text-purple-300">
                REWARD: +{milestone.xp} MASTER XP
              </span>
            </div>

            <p className="text-xs sm:text-sm text-gray-200 leading-snug">
              {challenge.prompt}
            </p>

            {/* Radio Options */}
            <div className="space-y-2 pt-1">
              {challenge.options.map((option, idx) => {
                const isSelected = selectedOption === idx;
                return (
                  <button
                    key={idx}
                    type="button"
                    disabled={isCompleted}
                    onClick={() => handleOptionSelect(idx)}
                    className={`w-full text-left p-2.5 rounded border text-xs transition-all cursor-pointer flex items-start gap-2.5 ${
                      isSelected
                        ? 'bg-purple-900/50 border-cyan-400 text-white shadow-[0_0_12px_rgba(34,211,238,0.3)]'
                        : 'bg-[#151326] border-gray-800 text-gray-300 hover:border-gray-600 hover:text-white'
                    } ${isCompleted ? 'opacity-90 cursor-default' : ''}`}
                  >
                    <span
                      className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 mt-0.5 text-[9px] font-bold ${
                        isSelected
                          ? 'border-cyan-400 bg-cyan-400 text-black'
                          : 'border-gray-600 text-gray-400'
                      }`}
                    >
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="leading-snug">{option}</span>
                  </button>
                );
              })}
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div className="text-red-400 text-xs font-vt323 text-sm p-2 bg-red-950/40 border border-red-800/60 rounded">
                ⚠ {errorMessage}
              </div>
            )}

            {/* Success Explanation */}
            {hasSubmitted && isCorrect && (
              <div className="p-2.5 bg-green-950/40 border border-green-700/60 rounded text-xs text-green-200 space-y-1">
                <div className="font-bold flex items-center gap-1 text-green-300">
                  <span>✓</span>
                  <span>Validation Successful!</span>
                </div>
                <p className="text-[11px] text-green-300/90 leading-snug">
                  {challenge.explanation}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="bg-[#1B1833] border-t border-purple-900/80 p-3 flex items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-900 hover:bg-gray-800 text-gray-300 border border-gray-700 font-vt323 text-sm rounded pixel-corners-sm transition-colors cursor-pointer"
          >
            [ Cancel ]
          </button>

          {!isCompleted ? (
            <button
              onClick={handleSubmit}
              className="px-5 py-2 bg-gradient-to-r from-amber-600 to-red-600 hover:from-amber-500 hover:to-red-500 text-white font-orbitron text-xs font-bold tracking-wider rounded pixel-corners-sm shadow-[0_0_15px_rgba(245,158,11,0.5)] transition-all cursor-pointer hover:scale-105 active:scale-95 flex items-center gap-2"
            >
              <span>🐱 ➔ 🍖</span>
              <span>COMPLETE & CHASE FOOD</span>
            </button>
          ) : (
            <div className="font-vt323 text-sm text-green-400 flex items-center gap-1.5">
              <span>✓ MILESTONE MASTERED (+{milestone.xp} XP)</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
