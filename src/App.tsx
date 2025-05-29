import React from 'react';
import './styles/global.scss';
import HomePage from './components/HomePage';
import { ThemeProvider } from './context/ThemeContext';
import ThemeToggle from './components/ThemeToggle';

interface AppProps {
  title?: string;
}

const AppMain: React.FC<AppProps> = ({ title = 'React App' }) => {
  return (
    <ThemeProvider>
      <div className="app-container">
        <header>
          <h1>{title}</h1>
          <p>Welcome to your React application with TypeScript, SCSS and LESS!</p>
          <ThemeToggle />
        </header>
        
        <main>
          <HomePage />
        </main>
      </div>
    </ThemeProvider>
  );
};

export default AppMain;