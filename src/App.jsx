import React, { useState } from 'react';
import AuthContainer from './frontend/AuthContainer';
import Homepage from './frontend/components/homepage/Homepage';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  if (isAuthenticated) {
    return <Homepage onLogout={() => setIsAuthenticated(false)} />;
  }

  return <AuthContainer onLoginSuccess={() => setIsAuthenticated(true)} />;
}
