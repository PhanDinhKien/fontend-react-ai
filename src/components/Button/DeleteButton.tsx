import React from 'react';

interface DeleteButtonProps {
  onClick?: () => void;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ onClick, children = 'Delete', style }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        padding: '4px 12px',
        background: '#F57921',
        color: '#fff',
        border: 'none',
        borderRadius: 4,
        cursor: 'pointer',
        ...style,
      }}
    >
      {children}
    </button>
  );
};

export default DeleteButton;
