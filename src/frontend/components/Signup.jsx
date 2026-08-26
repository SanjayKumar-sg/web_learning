import React, { useState } from 'react';
import XPBar from './XPBar';

export default function Signup({ onNavigate, onSignupSuccess }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [generalError, setGeneralError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Calculate password strength
  const getPasswordStrength = (pwd) => {
    if (!pwd) return { score: 0, label: 'NONE', color: '#64748B' };
    let score = 0;
    if (pwd.length >= 6) score += 1;
    if (pwd.length >= 8) score += 1;
    if (/[A-Z]/.test(pwd)) score += 1;
    if (/[0-9]/.test(pwd)) score += 1;
    if (/[^A-Za-z0-9]/.test(pwd)) score += 1;

    if (score <= 2) return { score: 1, label: 'NOVICE', color: '#F43F5E' };
    if (score <= 3) return { score: 2, label: 'APPRENTICE', color: '#FACC15' };
    return { score: 3, label: 'ARCHITECT', color: '#10B981' };
  };

  const strength = getPasswordStrength(formData.password);

  const validate = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Player Name is required';
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Player Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Enter a valid academic/personal email';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?[\d\s\-()]{7,16}$/.test(formData.phone.trim())) {
      newErrors.phone = 'Enter a valid phone number';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirm your password';
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setGeneralError('');
    setSuccessMsg('');

    if (!validate()) return;

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setSuccessMsg('Player Profile Created! Initializing Quest...');
      if (onSignupSuccess) {
        setTimeout(() => onSignupSuccess(formData), 1400);
      } else {
        setTimeout(() => onNavigate && onNavigate('login'), 1600);
      }
    }, 1200);
  };

  return (
    <div className="w-full flex flex-col gap-5">
      {/* Header */}
      <div className="text-center pb-2 border-b border-[#2A264F]">
        <div className="flex items-center justify-center gap-2 mb-1">
          <span className="text-[#FACC15] text-xs font-pixel">⚔</span>
          <h2 className="text-base sm:text-lg font-pixel text-[#F8FAFC] tracking-wide">
            CREATE YOUR PLAYER
          </h2>
          <span className="text-[#FACC15] text-xs font-pixel">⚔</span>
        </div>
        <p className="text-xs text-[#A1A1AA]">
          Start your coding adventure with ARQ LearnHub
        </p>
      </div>

      {/* Alerts */}
      {generalError && (
        <div className="flex items-start gap-2.5 p-3 rounded-lg bg-[#F43F5E]/15 border border-[#F43F5E]/40 text-[#F43F5E] text-xs font-mono-code">
          <span>⚠️</span>
          <span>{generalError}</span>
        </div>
      )}

      {successMsg && (
        <div className="flex items-start gap-2.5 p-3 rounded-lg bg-[#10B981]/15 border border-[#10B981]/40 text-[#10B981] text-xs font-mono-code">
          <span>✨</span>
          <span>{successMsg}</span>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-3.5" noValidate>
        {/* Full Name */}
        <div className="flex flex-col gap-1 text-left">
          <label htmlFor="signup-name" className="text-xs font-medium text-[#F8FAFC]">
            Full Name / Player Handle
          </label>
          <input
            id="signup-name"
            name="fullName"
            type="text"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Alex Rivera"
            autoComplete="name"
            disabled={isLoading}
            className={`w-full h-10 px-3.5 rounded-lg text-sm text-[#F8FAFC] pixel-input-box placeholder-[#64748B] focus:outline-none ${
              errors.fullName ? 'input-error' : ''
            }`}
          />
          {errors.fullName && (
            <p className="text-[11px] font-mono-code text-[#F43F5E] flex items-center gap-1">
              <span>›</span> {errors.fullName}
            </p>
          )}
        </div>

        {/* 2-column on sm+ screens: Email & Phone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Email */}
          <div className="flex flex-col gap-1 text-left">
            <label htmlFor="signup-email" className="text-xs font-medium text-[#F8FAFC]">
              College / Student Email
            </label>
            <input
              id="signup-email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="alex@college.edu"
              autoComplete="email"
              disabled={isLoading}
              className={`w-full h-10 px-3.5 rounded-lg text-sm text-[#F8FAFC] pixel-input-box placeholder-[#64748B] focus:outline-none ${
                errors.email ? 'input-error' : ''
              }`}
            />
            {errors.email && (
              <p className="text-[11px] font-mono-code text-[#F43F5E]">
                › {errors.email}
              </p>
            )}
          </div>

          {/* Phone */}
          <div className="flex flex-col gap-1 text-left">
            <label htmlFor="signup-phone" className="text-xs font-medium text-[#F8FAFC]">
              Phone Number
            </label>
            <input
              id="signup-phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+1 (555) 019-2834"
              autoComplete="tel"
              disabled={isLoading}
              className={`w-full h-10 px-3.5 rounded-lg text-sm text-[#F8FAFC] pixel-input-box placeholder-[#64748B] focus:outline-none ${
                errors.phone ? 'input-error' : ''
              }`}
            />
            {errors.phone && (
              <p className="text-[11px] font-mono-code text-[#F43F5E]">
                › {errors.phone}
              </p>
            )}
          </div>
        </div>

        {/* Password */}
        <div className="flex flex-col gap-1 text-left">
          <div className="flex items-center justify-between">
            <label htmlFor="signup-password" className="text-xs font-medium text-[#F8FAFC]">
              Create Password
            </label>
            {formData.password && (
              <span
                className="text-[10px] font-pixel px-1.5 py-0.5 rounded border"
                style={{
                  color: strength.color,
                  borderColor: `${strength.color}40`,
                  backgroundColor: `${strength.color}15`,
                }}
              >
                CLASS: {strength.label}
              </span>
            )}
          </div>

          <div className="relative">
            <input
              id="signup-password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={handleChange}
              placeholder="At least 8 characters"
              autoComplete="new-password"
              disabled={isLoading}
              className={`w-full h-10 pl-3.5 pr-11 rounded-lg text-sm text-[#F8FAFC] pixel-input-box placeholder-[#64748B] focus:outline-none ${
                errors.password ? 'input-error' : ''
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#A1A1AA] hover:text-[#F8FAFC] p-1 focus:outline-none transition-colors"
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
            <p className="text-[11px] font-mono-code text-[#F43F5E]">
              › {errors.password}
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="flex flex-col gap-1 text-left">
          <label htmlFor="signup-confirmPassword" className="text-xs font-medium text-[#F8FAFC]">
            Confirm Password
          </label>
          <div className="relative">
            <input
              id="signup-confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Re-enter your password"
              autoComplete="new-password"
              disabled={isLoading}
              className={`w-full h-10 pl-3.5 pr-11 rounded-lg text-sm text-[#F8FAFC] pixel-input-box placeholder-[#64748B] focus:outline-none ${
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

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="pixel-btn-purple w-full h-11 rounded-lg text-white font-pixel text-xs tracking-wider flex items-center justify-center gap-2 mt-2 cursor-pointer"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin h-4 w-4 text-[#F8FAFC]" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              <span>REGISTERING PLAYER...</span>
            </>
          ) : (
            <>
              <span>⚔</span>
              <span>CREATE ACCOUNT</span>
            </>
          )}
        </button>
      </form>

      {/* Switch to Login */}
      <div className="text-center pt-2 border-t border-[#2A264F]/60">
        <p className="text-xs text-[#A1A1AA]">
          Already have an account?{' '}
          <button
            type="button"
            onClick={() => onNavigate && onNavigate('login')}
            className="text-[#22D3EE] font-medium hover:text-[#A5F3FC] hover:underline focus:outline-none transition-colors"
          >
            Log in to LearnHub &rarr;
          </button>
        </p>
      </div>

      {/* XP Bar */}
      <XPBar level={1} currentXP={10} maxXP={100} questBonus="+100 XP STARTER REWARD" />
    </div>
  );
}
