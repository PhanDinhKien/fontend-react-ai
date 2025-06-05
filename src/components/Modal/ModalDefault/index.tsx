// ModalDefault component - basic template
import React from 'react';
import { Modal, Button } from 'antd';
import { useTranslation } from 'react-i18next';
import './index.scss';

// Các props cho component ModalDefault
// open: Bật/tắt modal
// onOk: Hàm callback khi nhấn nút xác nhận
// onCancel: Hàm callback khi nhấn nút hủy
// title: Tiêu đề modal (có thể là string hoặc ReactNode)
// iconTitle: Icon hiển thị cạnh tiêu đề
// children: Nội dung bên trong modal
// okText: Text cho nút xác nhận
// cancelText: Text cho nút hủy
// footer: Custom footer, nếu không truyền sẽ dùng mặc định
// width: Độ rộng modal
// centered: Modal căn giữa màn hình
// isShowButtonOk: Có hiển thị nút xác nhận không (mặc định true)
// isShowButtonCancel: Có hiển thị nút hủy không (mặc định true)
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
  isShowButtonOk?: boolean;
  isShowButtonCancel?: boolean;
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
  isShowButtonOk = true,
  isShowButtonCancel = true,
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

  let modalFooter = footer;
  if (footer === undefined) {
    const buttons: React.ReactNode[] = [];
    if (isShowButtonCancel) {
      buttons.push(
        <Button key="cancel" onClick={onCancel}>
          {cancelText || t('modalDefault.cancelText', 'Hủy')}
        </Button>
      );
    }
    if (isShowButtonOk) {
      buttons.push(
        <Button key="ok" type="primary" onClick={onOk}>
          {okText || t('modalDefault.okText', 'Lưu')}
        </Button>
      );
    }
    modalFooter = buttons;
  }

  return (
    <Modal
      open={open}
      onOk={onOk}
      onCancel={onCancel}
      title={renderTitle}
      footer={modalFooter}
      width={width}
      centered={centered}
      className="modal-default"
    >
      {children}
    </Modal>
  );
};

export default ModalDefault;
