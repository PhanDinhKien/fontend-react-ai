// DrawerDefault component - basic template
import React from 'react';
import { Drawer } from 'antd';
import './index.scss';

interface DrawerDefaultProps {
  open: boolean;
  onClose?: () => void;
  title?: React.ReactNode;
  children?: React.ReactNode;
  width?: number | string;
  placement?: 'left' | 'right' | 'top' | 'bottom';
  footer?: React.ReactNode;
}

const DrawerDefault: React.FC<DrawerDefaultProps> = ({
  open,
  onClose,
  title,
  children,
  width = 400,
  placement = 'right',
  footer,
}) => {
  return (
    <Drawer
      open={open}
      onClose={onClose}
      title={title}
      width={width}
      placement={placement}
      footer={footer}
      className="drawer-default"
    >
      {children}
    </Drawer>
  );
};

export default DrawerDefault;
