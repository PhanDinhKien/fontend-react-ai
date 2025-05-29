import React from 'react';
import { Button as AntdButton } from 'antd';
import type { ButtonProps as AntdButtonProps } from 'antd';

interface ButtonProps extends Omit<AntdButtonProps, 'type'> {
  children: React.ReactNode;
  type?: 'primary' | 'default' | 'dashed' | 'link' | 'text';
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  type = 'primary',
  className = '',
  ...rest
}) => {
  return (
    <AntdButton type={type} className={className} {...rest}>
      {children}
    </AntdButton>
  );
};

export default Button;
