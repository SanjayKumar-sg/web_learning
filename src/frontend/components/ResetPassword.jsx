import React, { useState } from 'react';
import XPBar from './XPBar';

export default function ResetPassword({ onNavigate, onResetSuccess }) {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = () => {
    const errs = {};

    if (!newPassword) {
      errs.newPassword = 'New password is required';
    } else if (newPassword.length < 8) {
      errs.newPassword = 'Password must be at least 8 characters';
    }

    if (!confirmPassword) {
      errs.confirmPassword = 'Confirm your new password';
    } else if (confirmPassword !== newPassword) {
      errs.confirmPassword = 'Passwords do not match';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);

      if (onResetSuccess) {
        onResetSuccess();
      }

      // Redirect after celebration
      setTimeout(() => {
        if (onNavigate) {
          onNavigate('login');
        }
      }, 2200);
    }, 1200);
  };

  return (
    <div className="w-full flex flex-col gap-5">
      {/* Header */}
      <div className="text-center pb-2 border-b border-[#2A264F]">
        <div className="flex items-center justify-center gap-2 mb-1">
          <span className="text-[#10B981] text-xs font-pixel">🛡️</span>
          <h2 className="text-base sm:text-lg font-pixel text-[#F8FAFC] tracking-wide">
            RESET YOUR PASSWORD
          </h2>
          <span className="text-[#10B981] text-xs font-pixel">🛡️</span>
        </div>
        <p className="text-xs text-[#A1A1AA]">
          Create a new access key to secure your player account
        </p>
      </div>

      {/* Success Celebration View */}
      {isSuccess ? (
        <div className="flex flex-col items-center text-center py-4 gap-3 animate-fade-in">
          <div className="w-14 h-14 rounded-full bg-[#10B981]/20 border border-[#10B981] flex items-center justify-center text-2xl shadow-[0_0_20px_rgba(16,185,129,0.4)]">
            ✨
          </div>
          <h3 className="font-pixel text-sm text-[#10B981]">
            ACCESS KEY UPDATED!
          </h3>
          <p className="text-xs text-[#A1A1AA] font-mono-code max-w-xs">
            Password reset successful. Teleporting to Player Login in a moment...
          </p>
          <div className="w-full mt-2">
            <XPBar level={1} currentXP={100} maxXP={100} questBonus="QUEST COMPLETE: +100 XP" />
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
          {/* New Password */}
          <div className="flex flex-col gap-1.5 text-left">
            <label htmlFor="reset-newPassword" className="text-xs font-medium text-[#F8FAFC]">
              New Password
            </label>
            <div className="relative">
              <input
                id="reset-newPassword"
                type={showNewPassword ? 'text' : 'password'}
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                  if (errors.newPassword) setErrors((prev) => ({ ...prev, newPassword: '' }));
                }}
                placeholder="At least 8 characters"
                autoComplete="new-password"
                disabled={isLoading}
                className={`w-full h-11 pl-3.5 pr-11 rounded-lg text-sm text-[#F8FAFC] pixel-input-box placeholder-[#64748B] focus:outline-none ${
                  errors.newPassword ? 'input-error' : ''
                }`}
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#A1A1AA] hover:text-[#F8FAFC] p-1 focus:outline-none transition-colors"
              >
                {showNewPassword ? (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" />
                    <line x1="3" y1="3" x2="21" y2="21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
            {errors.newPassword && (
              <p className="text-[11px] font-mono-code text-[#F43F5E]">
                › {errors.newPassword}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="flex flex-col gap-1.5 text-left">
            <label htmlFor="reset-confirmPassword" className="text-xs font-medium text-[#F8FAFC]">
              Confirm New Password
            </label>
            <div className="relative">
              <input
                id="reset-confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  if (errors.confirmPassword) setErrors((prev) => ({ ...prev, confirmPassword: '' }));
                }}
                placeholder="Re-enter your new password"
                autoComplete="new-password"
                disabled={isLoading}
                className={`w-full h-11 pl-3.5 pr-11 rounded-lg text-sm text-[#F8FAFC] pixel-input-box placeholder-[#64748B] focus:outline-none ${
                  errors.confirmPassword ? 'input-error' : ''
                }`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#A1A1AA] hover:text-[#F8FAFC] p-1 focus:outline-none transition-colors"
              >
                {showConfirmPassword ? (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" />
                    <line x1="3" y1="3" x2="21" y2="21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-[11px] font-mono-code text-[#F43F5E]">
                › {errors.confirmPassword}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="pixel-btn-purple w-full h-12 rounded-lg text-white font-pixel text-xs tracking-wider flex items-center justify-center gap-2 mt-2 cursor-pointer"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin h-4 w-4 text-[#F8FAFC]" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span>RE-ENCRYPTING...</span>
              </>
            ) : (
              <>
                <span>🛡️</span>
                <span>UPDATE PASSWORD</span>
              </>
            )}
          </button>

          <div className="text-center pt-2 border-t border-[#2A264F]/60">
            <button
              type="button"
              onClick={() => onNavigate && onNavigate('login')}
              className="text-xs text-[#A1A1AA] hover:text-[#F8FAFC] transition-colors focus:outline-none"
            >
              &larr; Back to Login
            </button>
          </div>

          <XPBar level={1} currentXP={80} maxXP={100} questBonus="FINAL ENCRYPTION STAGE" />
        </form>
      )}
    </div>
  );
}
