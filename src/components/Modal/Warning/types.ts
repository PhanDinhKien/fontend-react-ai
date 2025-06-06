import { ReactNode } from 'react';

// Các props cho component WarningModal
// open: Bật/tắt modal cảnh báo
// onOk: Hàm callback khi nhấn nút xác nhận
// onCancel: Hàm callback khi nhấn nút hủy
// content: Nội dung cảnh báo (có thể là string hoặc ReactNode)
// iconWarning: Icon hiển thị cạnh tiêu đề cảnh báo
// okText: Text cho nút xác nhận
// cancelText: Text cho nút hủy
// titleText: Tiêu đề cảnh báo (có thể là string hoặc ReactNode)
// isShowButtonOk: Có hiển thị nút xác nhận không (mặc định true)
// isShowButtonCancel: Có hiển thị nút hủy không (mặc định true)
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
  isShowButtonCancel?: boolean;
}
