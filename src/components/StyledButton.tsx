import React from 'react';
import theme, { colors, borderRadius } from '../styles/theme';

interface StyledButtonProps {
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  children: React.ReactNode;
  onClick?: () => void;
  fullWidth?: boolean;
}

/**
 * Example component that uses our theme.ts configuration
 */
const StyledButton: React.FC<StyledButtonProps> = ({
  variant = 'primary',
  children,
  onClick,
  fullWidth = false,
}) => {
  // Get the color based on variant
  const getBackgroundColor = () => {
    switch (variant) {
      case 'secondary':
        return colors.secondary.main;
      case 'success':
        return colors.functional.success;
      case 'warning':
        return colors.functional.warning;
      case 'error':
        return colors.functional.error;
      default:
        return colors.primary.main;
    }
  };

  // Get text color based on variant
  const getTextColor = () => {
    return variant === 'secondary' ? colors.text.primary : colors.neutral.white;
  };

  // Define the button style
  const buttonStyle: React.CSSProperties = {
    backgroundColor: getBackgroundColor(),
    color: getTextColor(),
    border: 'none',
    borderRadius: borderRadius.small,
    padding: `${theme.spacing.sm} ${theme.spacing.md}`,
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.medium,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    width: fullWidth ? '100%' : 'auto',
    boxShadow: theme.shadows.sm,
  };

  // Hover effect
  const handleMouseOver = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget;
    button.style.opacity = '0.9';
    button.style.transform = 'translateY(-2px)';
    button.style.boxShadow = theme.shadows.md;
  };

  const handleMouseOut = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget;
    button.style.opacity = '1';
    button.style.transform = 'translateY(0)';
    button.style.boxShadow = theme.shadows.sm;
  };

  return (
    <button
      style={buttonStyle}
      onClick={onClick}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      {children}
    </button>
  );
};

export default StyledButton;
