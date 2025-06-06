import React from 'react';
import { Modal } from 'antd';
import './index.scss';
import type { ConfirmDeleteProps } from './types';
import { useTranslation } from 'react-i18next';

const ConfirmDelete: React.FC<ConfirmDeleteProps> = (props) => {
  const { t } = useTranslation();
  const {
    open,
    onOk,
    onCancel,
    content,
    iconConfirm,
    okText,
    cancelText,
    titleText,
  } = props;

  const modalTitle = (
    <span style={{ display: 'flex', alignItems: 'center' }}>
      {iconConfirm && <span style={{ marginRight: 8, marginTop: 5 }}>{iconConfirm}</span>}
      {titleText || t('confirmDelete.title', 'Xác nhận xoá thông tin')}
    </span>
  );
  return (
    <Modal
      open={open}
      onOk={onOk}
      onCancel={onCancel}
      okText={okText || t('confirmDelete.okText', 'Xoá')}
      cancelText={cancelText || t('confirmDelete.cancelText', 'Huỷ')}
      centered
      className="confirm-delete-modal"
      title={modalTitle}
    >
      <div className="confirm-delete-content">
        {content || t('confirmDelete.content', 'Bạn có chắc chắn muốn xoá không?')}
      </div>
    </Modal>
  );
};

export default ConfirmDelete;
