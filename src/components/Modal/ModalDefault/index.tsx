// ModalDefault component - basic template
import React from 'react';
import { Modal } from 'antd';
import { useTranslation } from 'react-i18next';
import './index.scss';

interface ModalDefaultProps {
  open: boolean;
  onOk?: () => void;
  onCancel?: () => void;
  title?: React.ReactNode;
  iconTitle?: React.ReactNode;
  children?: React.ReactNode;
  okText?: string;
  cancelText?: string;
  footer?: React.ReactNode;
  width?: number | string;
  centered?: boolean;
}

const ModalDefault: React.FC<ModalDefaultProps> = ({
  open,
  onOk,
  onCancel,
  title,
  iconTitle,
  children,
  okText,
  cancelText,
  footer,
  width = 480,
  centered = true,
}) => {
  const { t } = useTranslation();
  const renderTitle = iconTitle ? (
    <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      {iconTitle}
      <span>{title || t('modalDefault.title', 'Default Modal Title')}</span>
    </span>
  ) : (
    title || t('modalDefault.title', 'Default Modal Title')
  );
  return (
    <Modal
      open={open}
      onOk={onOk}
      onCancel={onCancel}
      title={renderTitle}
      okText={okText || t('modalDefault.okText', 'Lưu')}
      cancelText={cancelText || t('modalDefault.cancelText', 'Hủy')}
      footer={footer}
      width={width}
      centered={centered}
      className="modal-default"
    >
      {children}
    </Modal>
  );
};

export default ModalDefault;
