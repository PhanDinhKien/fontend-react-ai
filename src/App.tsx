import React from 'react';
import './styles/global.scss';
import HomePage from './components/HomePage';
import { ThemeProvider } from './context/ThemeContext';
import ThemeToggle from './components/ThemeToggle';
import SelectDefault from './components/Select/SelectDefault/selectDefault';
import AccountInfoDefault from './components/AccountInfo/AccountInfoDefault';

interface AppProps {
  title?: string;
}

const AppMain: React.FC<AppProps> = ({ title = 'React App' }) => {
  const [selected, setSelected] = React.useState<string | number | undefined>(undefined);
  const options = [
    { label: 'Option 1', value: 1 },
    { label: 'Option 2', value: 2 },
    { label: 'Option 3', value: 3 },
  ];
  return (
    <ThemeProvider>
      <div className="app-container">
        <header>
          <h1>{title}</h1>
          <p>Welcome to your React application with TypeScript, SCSS and LESS!</p>
          <ThemeToggle />
        </header>
        <div style={{ maxWidth: 300, margin: '24px auto' }}>
          <SelectDefault
            label="Demo Select"
            options={options}
            value={selected}
            onChange={setSelected}
            placeholder="Chọn một option"
          />
        </div>
        <div style={{ maxWidth: 320, margin: '24px auto' }}>
          <AccountInfoDefault
            name="Nguyễn Chi Long"
            code="11904047"
            avatarUrl="https://randomuser.me/api/portraits/men/32.jpg"
          />
        </div>
        <main>
          <HomePage />
        </main>
      </div>
    </ThemeProvider>
  );
};

export default AppMain;