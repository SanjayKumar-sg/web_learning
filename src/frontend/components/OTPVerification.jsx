import React, { useState, useRef, useEffect } from 'react';
import XPBar from './XPBar';

export default function OTPVerification({ email = 'player@college.edu', onNavigate, onVerifySuccess }) {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const [resendNotice, setResendNotice] = useState('');

  const input0Ref = useRef(null);
  const input1Ref = useRef(null);
  const input2Ref = useRef(null);
  const input3Ref = useRef(null);
  const inputRefs = [input0Ref, input1Ref, input2Ref, input3Ref];

  // Resend Timer Countdown
  useEffect(() => {
    let interval = null;
    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    } else {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [resendTimer]);

  // Focus first input on mount
  useEffect(() => {
    input0Ref.current?.focus();
  }, []);

  const handleChange = (index, value) => {
    setError('');
    setResendNotice('');

    // If pasted multiple digits
    if (value.length > 1) {
      const digits = value.replace(/\D/g, '').slice(0, 4).split('');
      const newOtp = [...otp];
      digits.forEach((d, i) => {
        if (i < 4) newOtp[i] = d;
      });
      setOtp(newOtp);

      const nextFocus = Math.min(digits.length, 3);
      inputRefs[nextFocus]?.current?.focus();
      return;
    }

    // Only allow single numeric character
    const cleaned = value.replace(/\D/g, '');
    const newOtp = [...otp];
    newOtp[index] = cleaned;
    setOtp(newOtp);

    // Auto-advance to next box if digit entered
    if (cleaned && index < 3) {
      inputRefs[index + 1]?.current?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace') {
      if (!otp[index] && index > 0) {
        // Move back and clear previous
        const newOtp = [...otp];
        newOtp[index - 1] = '';
        setOtp(newOtp);
        inputRefs[index - 1]?.current?.focus();
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs[index - 1]?.current?.focus();
    } else if (e.key === 'ArrowRight' && index < 3) {
      inputRefs[index + 1]?.current?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text/plain');
    const digits = pasteData.replace(/\D/g, '').slice(0, 4).split('');
    if (digits.length === 0) return;

    const newOtp = [...otp];
    digits.forEach((d, i) => {
      if (i < 4) newOtp[i] = d;
    });
    setOtp(newOtp);

    const nextIndex = Math.min(digits.length, 3);
    inputRefs[nextIndex]?.current?.focus();
  };

  const handleResend = () => {
    if (!canResend) return;
    setOtp(['', '', '', '']);
    setError('');
    setResendNotice('Fresh 4-digit code sent to your inbox!');
    setResendTimer(30);
    setCanResend(false);
    inputRefs[0]?.current?.focus();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setResendNotice('');

    const fullCode = otp.join('');
    if (fullCode.length < 4) {
      setError('Please enter the full 4-digit code');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      // For demo, accept any 4-digit code except "0000"
      if (fullCode === '0000') {
        setError('Invalid security code. Please try again or resend.');
      } else {
        if (onVerifySuccess) {
          onVerifySuccess(fullCode);
        }
        if (onNavigate) {
          onNavigate('reset-password', { email, code: fullCode });
        }
      }
    }, 1100);
  };

  return (
    <div className="w-full flex flex-col gap-5">
      {/* Header */}
      <div className="text-center pb-2 border-b border-[#2A264F]">
        <div className="flex items-center justify-center gap-2 mb-1">
          <span className="text-[#22D3EE] text-xs font-pixel">🗝️</span>
          <h2 className="text-base sm:text-lg font-pixel text-[#F8FAFC] tracking-wide">
            VERIFY YOUR CODE
          </h2>
          <span className="text-[#22D3EE] text-xs font-pixel">🗝️</span>
        </div>
        <p className="text-xs text-[#A1A1AA] mt-1">
          We sent a 4-digit recovery code to your email
        </p>
        <p className="text-xs font-mono-code text-[#22D3EE] font-medium mt-0.5 break-all">
          {email}
        </p>
      </div>

      {/* Error/Notice alerts */}
      {error && (
        <div className="flex items-start gap-2.5 p-3 rounded-lg bg-[#F43F5E]/15 border border-[#F43F5E]/40 text-[#F43F5E] text-xs font-mono-code">
          <span>⚠️</span>
          <span>{error}</span>
        </div>
      )}

      {resendNotice && (
        <div className="flex items-start gap-2.5 p-3 rounded-lg bg-[#22D3EE]/15 border border-[#22D3EE]/40 text-[#22D3EE] text-xs font-mono-code">
          <span>✉️</span>
          <span>{resendNotice}</span>
        </div>
      )}

      {/* 4-digit OTP inputs */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
        <div className="flex justify-center items-center gap-2.5 sm:gap-3.5 my-1">
          {otp.map((digit, idx) => (
            <div key={idx} className="relative">
              <input
                ref={inputRefs[idx]}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={4} // Allows paste
                value={digit}
                onChange={(e) => handleChange(idx, e.target.value)}
                onKeyDown={(e) => handleKeyDown(idx, e)}
                onPaste={handlePaste}
                disabled={isLoading}
                aria-label={`Digit ${idx + 1}`}
                className={`w-12 h-14 sm:w-14 sm:h-16 text-center text-xl sm:text-2xl font-mono-code font-bold rounded-xl pixel-input-box text-[#F8FAFC] transition-all focus:outline-none ${
                  error ? 'input-error' : digit ? 'border-[#8B5CF6] shadow-[0_0_12px_rgba(139,92,246,0.35)]' : ''
                }`}
              />
              {/* Bottom decorative tick */}
              <div className={`absolute bottom-1.5 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full transition-colors ${
                digit ? 'bg-[#22D3EE]' : 'bg-[#2A264F]'
              }`} />
            </div>
          ))}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isLoading || otp.join('').length < 4}
          className="pixel-btn-purple w-full h-12 rounded-lg text-white font-pixel text-xs tracking-wider flex items-center justify-center gap-2 cursor-pointer"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin h-4 w-4 text-[#F8FAFC]" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              <span>AUTHENTICATING CIPHER...</span>
            </>
          ) : (
            <>
              <span>⚡</span>
              <span>VERIFY CODE</span>
            </>
          )}
        </button>
      </form>

      {/* Resend section */}
      <div className="text-center pt-2 border-t border-[#2A264F]/60 flex flex-col items-center gap-2">
        <p className="text-xs text-[#A1A1AA]">
          Didn't receive the code?
        </p>
        <button
          type="button"
          onClick={handleResend}
          disabled={!canResend || isLoading}
          className={`text-xs font-mono-code font-medium transition-colors ${
            canResend
              ? 'text-[#FACC15] hover:underline cursor-pointer'
              : 'text-[#64748B] cursor-not-allowed'
          }`}
        >
          {canResend ? 'RESEND CODE ↺' : `RESEND CODE (${resendTimer}s)`}
        </button>

        <button
          type="button"
          onClick={() => onNavigate && onNavigate('login')}
          className="text-xs text-[#64748B] hover:text-[#A1A1AA] transition-colors mt-1 focus:outline-none"
        >
          &larr; Back to Login
        </button>
      </div>

      <XPBar level={1} currentXP={50} maxXP={100} questBonus="CIPHER VERIFICATION STAGE" />
    </div>
  );
}
