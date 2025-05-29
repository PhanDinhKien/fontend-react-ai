import React from 'react';
import ReactDOM from 'react-dom/client';
import AppMain from './App';

// Import any global styles here
import './styles/global.scss';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Failed to find the root element');
}

const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <AppMain />
  </React.StrictMode>
);
