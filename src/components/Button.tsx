import React from 'react';
import '../styles/buttons.less';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'primary' | 'secondary';
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = 'primary',
  className = '',
}) => {
  const buttonClass = `button ${type === 'secondary' ? 'secondary' : ''} ${className}`;
  
  return (
    <button className={buttonClass} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
