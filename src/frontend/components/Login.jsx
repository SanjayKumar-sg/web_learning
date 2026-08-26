import React, { useState } from 'react';
import XPBar from './XPBar';

export default function Login({ onNavigate, onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [generalError, setGeneralError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const validateForm = () => {
    const errs = {};
    if (!email.trim()) {
      errs.email = 'Player Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errs.email = 'Enter a valid email address';
    }

    if (!password) {
      errs.password = 'Player Password is required';
    } else if (password.length < 6) {
      errs.password = 'Password must be at least 6 characters';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setGeneralError('');
    setSuccessMsg('');

    if (!validateForm()) return;

    setIsLoading(true);

    // Mock Authentication delay
    setTimeout(() => {
      setIsLoading(false);
      if (email.toLowerCase().includes('error')) {
        setGeneralError('Invalid player credentials. Please check your password.');
      } else {
        setSuccessMsg('Access Granted! Teleporting to ARQ LearnHub...');
        if (onLoginSuccess) {
          setTimeout(() => onLoginSuccess({ email }), 1200);
        }
      }
    }, 1200);
  };

  return (
    <div className="w-full flex flex-col gap-5">
      {/* Form Header */}
      <div className="text-center pb-2 border-b border-[#2A264F]">
        <div className="flex items-center justify-center gap-2 mb-1">
          <span className="text-[#8B5CF6] text-xs font-pixel">⚔</span>
          <h2 className="text-base sm:text-lg font-pixel text-[#F8FAFC] tracking-wide">
            PLAYER LOGIN
          </h2>
          <span className="text-[#8B5CF6] text-xs font-pixel">⚔</span>
        </div>
        <p className="text-xs text-[#A1A1AA]">
          Enter your credentials to continue your coding journey
        </p>
      </div>

      {/* General Error Banner */}
      {generalError && (
        <div className="flex items-start gap-2.5 p-3 rounded-lg bg-[#F43F5E]/15 border border-[#F43F5E]/40 text-[#F43F5E] text-xs font-mono-code animate-fade-in">
          <span className="text-sm">⚠️</span>
          <div className="flex-1">
            <span className="font-bold">SYSTEM ALERT:</span> {generalError}
          </div>
        </div>
      )}

      {/* Success Banner */}
      {successMsg && (
        <div className="flex items-start gap-2.5 p-3 rounded-lg bg-[#10B981]/15 border border-[#10B981]/40 text-[#10B981] text-xs font-mono-code animate-fade-in">
          <span className="text-sm">✨</span>
          <div className="flex-1">
            <span className="font-bold">QUEST CLEARED:</span> {successMsg}
          </div>
        </div>
      )}

      {/* Form Fields */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
        {/* Email Field */}
        <div className="flex flex-col gap-1.5 text-left">
          <div className="flex items-center justify-between">
            <label htmlFor="login-email" className="text-xs font-medium text-[#F8FAFC]">
              Student / Player Email
            </label>
            <span className="text-[11px] font-mono-code text-[#64748B]">Required</span>
          </div>

          <div className="relative">
            <input
              id="login-email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) setErrors((prev) => ({ ...prev, email: '' }));
              }}
              placeholder="name@rajalakshmi.edu.in"
              autoComplete="email"
              disabled={isLoading}
              className={`w-full h-11 px-3.5 rounded-lg text-sm text-[#F8FAFC] pixel-input-box placeholder-[#64748B] focus:outline-none ${errors.email ? 'input-error' : ''
                }`}
            />
          </div>
          {errors.email && (
            <p className="text-[11px] font-mono-code text-[#F43F5E] flex items-center gap-1 mt-0.5">
              <span>›</span> {errors.email}
            </p>
          )}
        </div>

        {/* Password Field */}
        <div className="flex flex-col gap-1.5 text-left">
          <div className="flex items-center justify-between">
            <label htmlFor="login-password" className="text-xs font-medium text-[#F8FAFC]">
              Access Password
            </label>
            <button
              type="button"
              onClick={() => onNavigate && onNavigate('forgot-password')}
              className="text-[11px] font-mono-code text-[#C084FC] hover:text-[#E9D5FF] transition-colors focus:outline-none hover:underline"
            >
              Forgot password?
            </button>
          </div>

          <div className="relative">
            <input
              id="login-password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errors.password) setErrors((prev) => ({ ...prev, password: '' }));
              }}
              placeholder="••••••••"
              autoComplete="current-password"
              disabled={isLoading}
              className={`w-full h-11 pl-3.5 pr-11 rounded-lg text-sm text-[#F8FAFC] pixel-input-box placeholder-[#64748B] focus:outline-none ${errors.password ? 'input-error' : ''
                }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#A1A1AA] hover:text-[#F8FAFC] p-1 focus:outline-none transition-colors"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? (
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
          {errors.password && (
            <p className="text-[11px] font-mono-code text-[#F43F5E] flex items-center gap-1 mt-0.5">
              <span>›</span> {errors.password}
            </p>
          )}
        </div>

        {/* Submit Button */}
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
              <span>CONNECTING...</span>
            </>
          ) : (
            <>
              <span className="text-[#FACC15]">▶</span>
              <span>ENTER LEARNHUB</span>
            </>
          )}
        </button>
      </form>

      {/* Switch to Signup */}
      <div className="text-center pt-2 border-t border-[#2A264F]/60">
        <p className="text-xs text-[#A1A1AA]">
          New player?{' '}
          <button
            type="button"
            onClick={() => onNavigate && onNavigate('signup')}
            className="text-[#22D3EE] font-medium hover:text-[#A5F3FC] hover:underline focus:outline-none transition-colors"
          >
            Create Player Profile &rarr;
          </button>
        </p>
      </div>

      {/* Game Level & XP Progress Indicator */}
      <XPBar level={1} currentXP={0} maxXP={100} questBonus="+50 XP ON FIRST LOGIN" />
    </div>
  );
}
