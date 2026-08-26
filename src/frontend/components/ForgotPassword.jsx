import React, { useState } from 'react';
import XPBar from './XPBar';

export default function ForgotPassword({ onNavigate, onCodeSent }) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    if (!email.trim()) {
      setError('Please enter your player email');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError('Enter a valid email address');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setSuccessMsg('Recovery code generated and dispatched!');
      if (onCodeSent) {
        onCodeSent(email);
      }
      setTimeout(() => {
        if (onNavigate) {
          onNavigate('verify-otp', { email });
        }
      }, 1000);
    }, 1000);
  };

  return (
    <div className="w-full flex flex-col gap-5">
      {/* Header */}
      <div className="text-center pb-2 border-b border-[#2A264F]">
        <div className="flex items-center justify-center gap-2 mb-1">
          <span className="text-[#22D3EE] text-xs font-pixel">🔮</span>
          <h2 className="text-base sm:text-lg font-pixel text-[#F8FAFC] tracking-wide">
            RECOVERY QUEST
          </h2>
          <span className="text-[#22D3EE] text-xs font-pixel">🔮</span>
        </div>
        <p className="text-xs text-[#A1A1AA]">
          Enter your email to begin recovering your account
        </p>
      </div>

      {/* Alerts */}
      {error && (
        <div className="flex items-start gap-2.5 p-3 rounded-lg bg-[#F43F5E]/15 border border-[#F43F5E]/40 text-[#F43F5E] text-xs font-mono-code">
          <span>⚠️</span>
          <span>{error}</span>
        </div>
      )}

      {successMsg && (
        <div className="flex items-start gap-2.5 p-3 rounded-lg bg-[#10B981]/15 border border-[#10B981]/40 text-[#10B981] text-xs font-mono-code">
          <span>📨</span>
          <span>{successMsg}</span>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
        <div className="flex flex-col gap-1.5 text-left">
          <label htmlFor="recovery-email" className="text-xs font-medium text-[#F8FAFC]">
            Registered Player Email
          </label>
          <input
            id="recovery-email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (error) setError('');
            }}
            placeholder="player@college.edu"
            autoComplete="email"
            disabled={isLoading}
            className={`w-full h-11 px-3.5 rounded-lg text-sm text-[#F8FAFC] pixel-input-box placeholder-[#64748B] focus:outline-none ${
              error ? 'input-error' : ''
            }`}
          />
          <p className="text-[11px] font-mono-code text-[#64748B] mt-0.5">
            We will dispatch a 4-digit authentication code.
          </p>
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
              <span>TRANSMITTING...</span>
            </>
          ) : (
            <>
              <span>⚡</span>
              <span>SEND CODE</span>
            </>
          )}
        </button>
      </form>

      {/* Back to login */}
      <div className="text-center pt-2 border-t border-[#2A264F]/60">
        <button
          type="button"
          onClick={() => onNavigate && onNavigate('login')}
          className="inline-flex items-center gap-1.5 text-xs text-[#A1A1AA] hover:text-[#F8FAFC] transition-colors focus:outline-none"
        >
          <span>&larr;</span> Back to Player Login
        </button>
      </div>

      <XPBar level={1} currentXP={20} maxXP={100} questBonus="RECOVERY CIPHER READY" />
    </div>
  );
}
