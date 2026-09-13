import React, { useState } from 'react';
import AuthLayout from './components/AuthLayout';
import Login from './components/Login';
import Signup from './components/Signup';
import ForgotPassword from './components/ForgotPassword';
import OTPVerification from './components/OTPVerification';
import ResetPassword from './components/ResetPassword';

/**
 * Master Authentication Container for ARQ LearnHub.
 * Orchestrates the full 5-screen quest flow:
 * 1. Login
 * 2. Signup
 * 3. Forgot Password
 * 4. OTP Verification
 * 5. Reset Password
 */
export default function AuthContainer({ initialScreen = 'login', onLoginSuccess }) {
  const [currentScreen, setCurrentScreen] = useState(initialScreen);
  const [flowState, setFlowState] = useState({
    email: 'player@college.edu',
    fullName: '',
    otpCode: '',
  });
  const [avatarState, setAvatarState] = useState('idle');

  const handleNavigate = (screen, payload = {}) => {
    if (payload.email) {
      setFlowState((prev) => ({ ...prev, email: payload.email }));
    }
    if (payload.code) {
      setFlowState((prev) => ({ ...prev, otpCode: payload.code }));
    }

    // Set avatar reaction
    if (screen === 'reset-password' || screen === 'login') {
      setAvatarState('idle');
    } else if (screen === 'signup') {
      setAvatarState('typing');
    }

    setCurrentScreen(screen);
  };

  const handleLoginSuccessLocal = (userData) => {
    setAvatarState('success');
    console.log('Player logged in successfully:', userData);
    if (onLoginSuccess) {
      // Small delay to show the success avatar state before transitioning
      setTimeout(() => onLoginSuccess(userData), 1000);
    }
  };

  const handleSignupSuccess = (userData) => {
    setAvatarState('success');
    console.log('Player registered successfully:', userData);
    if (onLoginSuccess) {
      setTimeout(() => onLoginSuccess(userData), 1000);
    }
  };

  const handleVerifySuccess = (code) => {
    setAvatarState('success');
    console.log('OTP verified successfully:', code);
  };

  // Dynamic header metadata per screen
  const screenMeta = {
    login: {
      badge: 'PLAYER LOGIN',
      title: 'ARQ LearnHub',
      subtitle: 'Your coding adventure starts here.',
      maxWidth: 'max-w-[460px]',
    },
    signup: {
      badge: 'CREATE YOUR PLAYER',
      title: 'ARQ LearnHub',
      subtitle: 'Start your coding adventure with ARQ LearnHub.',
      maxWidth: 'max-w-[560px]',
    },
    'forgot-password': {
      badge: 'RECOVERY QUEST',
      title: 'ARQ LearnHub',
      subtitle: 'Enter your email to begin recovering your account.',
      maxWidth: 'max-w-[460px]',
    },
    'verify-otp': {
      badge: 'VERIFY YOUR CODE',
      title: 'ARQ LearnHub',
      subtitle: 'Transmit the 4-digit cipher to access your account.',
      maxWidth: 'max-w-[460px]',
    },
    'reset-password': {
      badge: 'RESET YOUR PASSWORD',
      title: 'ARQ LearnHub',
      subtitle: 'Establish a new secure access cipher.',
      maxWidth: 'max-w-[460px]',
    },
  }[currentScreen] || {
    badge: 'PLAYER PORTAL',
    title: 'ARQ LearnHub',
    subtitle: 'Your coding adventure starts here.',
    maxWidth: 'max-w-[460px]',
  };

  const screensList = [
    { id: 'login', label: '1. Login', icon: '▶' },
    { id: 'signup', label: '2. Sign Up', icon: '⚔' },
    { id: 'forgot-password', label: '3. Forgot Password', icon: '🔮' },
    { id: 'verify-otp', label: '4. 4-Digit OTP', icon: '🗝️' },
    { id: 'reset-password', label: '5. Reset Password', icon: '🛡️' },
  ];

  return (
    <div className="min-h-screen flex flex-col justify-between">
      {/* Interactive Flow Switcher (For Team Lead / Preview Inspection) */}
      <div className="w-full bg-[#151326]/95 border-b border-[#2A264F] py-2 px-3 sm:px-6 z-50 sticky top-0 backdrop-blur-md">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="font-pixel text-[10px] text-[#FACC15]">⚡ FLOW:</span>
            <span className="text-[11px] font-mono-code text-[#A1A1AA] hidden md:inline">
              Preview all 5 screens:
            </span>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto py-1 max-w-full">
            {screensList.map((screen) => {
              const isActive = currentScreen === screen.id;
              return (
                <button
                  key={screen.id}
                  onClick={() => setCurrentScreen(screen.id)}
                  className={`text-[11px] font-mono-code px-2.5 py-1 rounded-md transition-all whitespace-nowrap flex items-center gap-1 cursor-pointer ${
                    isActive
                      ? 'bg-[#8B5CF6] text-[#F8FAFC] font-semibold shadow-[0_0_12px_rgba(139,92,246,0.6)] border border-[#C084FC]'
                      : 'bg-[#0B0A16] text-[#A1A1AA] hover:text-[#F8FAFC] hover:bg-[#1E1A38] border border-[#2A264F]'
                  }`}
                >
                  <span>{screen.icon}</span>
                  <span>{screen.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Authentication Flow Container */}
      <AuthLayout
        currentScreen={currentScreen}
        avatarState={avatarState}
        headerBadge={screenMeta.badge}
        title={screenMeta.title}
        subtitle={screenMeta.subtitle}
        maxWidth={screenMeta.maxWidth}
      >
        {currentScreen === 'login' && (
          <Login
            onNavigate={handleNavigate}
            onLoginSuccess={handleLoginSuccessLocal}
          />
        )}

        {currentScreen === 'signup' && (
          <Signup
            onNavigate={handleNavigate}
            onSignupSuccess={handleSignupSuccess}
          />
        )}

        {currentScreen === 'forgot-password' && (
          <ForgotPassword
            onNavigate={handleNavigate}
            onCodeSent={(email) => setFlowState((prev) => ({ ...prev, email }))}
          />
        )}

        {currentScreen === 'verify-otp' && (
          <OTPVerification
            email={flowState.email}
            onNavigate={handleNavigate}
            onVerifySuccess={handleVerifySuccess}
          />
        )}

        {currentScreen === 'reset-password' && (
          <ResetPassword
            onNavigate={handleNavigate}
            onResetSuccess={() => setAvatarState('success')}
          />
        )}
      </AuthLayout>
    </div>
  );
}
