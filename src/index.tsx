import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Import any global styles here
import './styles/global.scss';
import './shared/locale/i18n';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Failed to find the root element');
}

const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
