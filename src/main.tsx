
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import App from './App'
import './index.css'
import { Toaster } from './components/ui/sonner'
import { AuthProvider } from './contexts/AuthContext';
import { checkEnvVariables } from './utils/env';

// Add debug logging
console.log('Application initializing...');
console.log('Environment variables check:', checkEnvVariables() ? 'PASSED' : 'FAILED');

// Log DOM element to ensure it exists
const rootElement = document.getElementById('root');
console.log('Root element found:', rootElement ? 'YES' : 'NO');

if (!rootElement) {
  console.error('Root element #root not found in the DOM');
}

try {
  ReactDOM.createRoot(rootElement!).render(
    <React.StrictMode>
      <BrowserRouter>
        <AuthProvider>
          <App />
          <Toaster position="top-right" />
        </AuthProvider>
      </BrowserRouter>
    </React.StrictMode>,
  );
  console.log('Application rendered successfully');
} catch (error) {
  console.error('Failed to render application:', error);
}
