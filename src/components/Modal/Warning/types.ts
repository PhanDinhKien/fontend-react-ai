import { ReactNode } from 'react';

export interface WarningModalProps {
  open: boolean;
  onOk: () => void;
  onCancel: () => void;
  content?: ReactNode;
  iconWarning?: ReactNode;
  okText?: string;
  cancelText?: string;
  titleText?: string;
  isShowButtonOk?: boolean;
}
