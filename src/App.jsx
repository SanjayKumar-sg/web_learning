import React, { useState } from 'react';
import AuthContainer from './frontend/AuthContainer';
import Homepage from './frontend/components/homepage/Homepage';

export default function App() {
  // Default to true for direct homepage access; can log out to visit Auth flow
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  if (isAuthenticated) {
    return <Homepage onLogout={() => setIsAuthenticated(false)} />;
  }

  return <AuthContainer onLoginSuccess={() => setIsAuthenticated(true)} />;
}
