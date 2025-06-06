import { ReactNode } from 'react';

export interface ConfirmDeleteProps {
  open: boolean;
  onOk: () => void;
  onCancel: () => void;
  content?: React.ReactNode;
  iconConfirm?: ReactNode;
  okText?: string;
  cancelText?: string;
  titleText?: string;
}
