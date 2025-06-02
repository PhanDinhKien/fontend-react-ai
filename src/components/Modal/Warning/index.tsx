import React from 'react';
import { Modal } from 'antd';
import './index.scss';
import type { WarningModalProps } from './types';
import { useTranslation } from 'react-i18next';

const WarningModal: React.FC<WarningModalProps> = (props) => {
  const { t } = useTranslation();
  const {
    open,
    onOk,
    onCancel,
    content,
    iconWarning,
    okText,
    cancelText,
    titleText,
    isShowButtonOk = true,
  } = props;

  const modalTitle = (
    <span style={{ display: 'flex', alignItems: 'center' }}>
      {iconWarning && <span style={{ marginRight: 8, marginTop: 5 }}>{iconWarning}</span>}
      {titleText || t('warningModal.title', 'Cảnh báo')}
    </span>
  );
  return (
    <Modal
      open={open}
      onOk={onOk}
      onCancel={onCancel}
      okText={okText || t('warningModal.okText', 'Đồng ý')}
      cancelText={cancelText || t('warningModal.cancelText', 'Huỷ')}
      centered
      className="warning-modal"
      title={modalTitle}
      okButtonProps={{ style: { display: isShowButtonOk ? undefined : 'none' } }}
    >
      <div className="warning-modal-content">
        {content || t('warningModal.content', 'Đây là cảnh báo!')}
      </div>
    </Modal>
  );
};

export default WarningModal;
