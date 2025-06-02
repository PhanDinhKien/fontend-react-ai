import React, { useState } from 'react';
import Button from './Button';
import '../styles/HomePage.scss';

const HomePage: React.FC = () => {
  const [count, setCount] = useState(0);

  const handleIncrement = () => {
    setCount(prevCount => prevCount + 1);
  };

  const handleDecrement = () => {
    setCount(prevCount => prevCount > 0 ? prevCount - 1 : 0);
  };

  return (
    <div className="home-page">
      <div className="counter-container">
        <h2>Counter Example</h2>
        <p>Count: <span className="count">{count}</span></p>
        
        <div className="button-group">
          <Button onClick={handleDecrement} type="default">
            Decrease
          </Button>
          
          <Button onClick={handleIncrement}>
            Increase
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
