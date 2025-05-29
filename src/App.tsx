import React from 'react';
import './styles/global.scss';
import HomePage from './components/HomePage';

interface AppProps {
  title?: string;
}

const App: React.FC<AppProps> = ({ title = 'React App' }) => {
  return (
    <div className="app-container">
      <header>
        <h1>{title}</h1>
        <p>Welcome to your React application with TypeScript, SCSS and LESS!</p>
      </header>
      
      <main>
        <HomePage />
      </main>
    </div>
  );
};

export default App;