// Notification component 
// - Hỗ trợ 4 loại: info, success, error, warning
// - Icon, màu sắc, border, title, description custom qua SCSS
// - Sử dụng hook useNotification trả về showNotification và contextHolder
// - Dễ dàng tích hợp vào bất kỳ component nào, không cần context provider toàn cục
// - duration mặc định 10s, có thể truyền props
// - description nhận ReactNode (string, JSX...)
// - Đảm bảo tương thích React 18+ và strict mode

import React from 'react';
import { notification } from 'antd';
import {
  InfoCircleOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons';
import './Notification.scss';

export type NotificationType = 'info' | 'success' | 'error' | 'warning';

// Interface cho props của notification custom dạng hook
// type: loại notification ('info', 'success', 'error', 'warning')
// title: tiêu đề notification
// description: nội dung mô tả, nhận ReactNode (string, JSX...)
// duration: thời gian hiển thị (giây), mặc định 10s
export interface ShowNotificationProps {
  type: NotificationType;
  title: string;
  description: React.ReactNode;
  duration?: number;
}

const iconMap = {
  info: <InfoCircleOutlined className="custom-notification-icon info" />,
  success: <CheckCircleOutlined className="custom-notification-icon success" />,
  error: <CloseCircleOutlined className="custom-notification-icon error" />,
  warning: <ExclamationCircleOutlined className="custom-notification-icon warning" />,
};

// Custom hook sử dụng contextHolder đúng chuẩn antd v5
export function useNotification() {
  const [api, contextHolder] = notification.useNotification();
  const showNotification = React.useCallback(({ type, title, description, duration = 10 }: ShowNotificationProps) => {
    api.open({
      className: `custom-notification custom-notification-${type}`,
      message: (
        <span className={`custom-notification-title ${type}`}>{title}</span>
      ),
      description: (
        <span className="custom-notification-description">{description}</span>
      ),
      icon: iconMap[type],
      duration,
      placement: 'topRight',
    });
  }, [api]);
  return { showNotification, contextHolder };
}
