// PsAlert - Custom Alert component sử dụng Ant Design
// Hỗ trợ 4 loại: info, success, error, warning
// - Icon outline, màu sắc và border riêng biệt theo loại
// - Hỗ trợ theme, i18n, props mở rộng, nút close, callback onClose
// - Có thể show dạng notification ở góc phải, hỗ trợ visible
// - Style qua SCSS, không dùng inline style cho icon/title/desc

import React from 'react';
import { Alert as AntdAlert } from 'antd';
import { InfoCircleOutlined, CheckCircleOutlined, CloseCircleOutlined, ExclamationCircleOutlined, CloseOutlined } from '@ant-design/icons';
import './Alert.scss';

export type CustomAlertType = 'info' | 'success' | 'error' | 'warning';

// Props cho component PsAlert
// type: loại alert (info, success, error, warning)
// title: tiêu đề alert
// description: nội dung mô tả
// visible: điều khiển hiển thị alert (tuỳ chọn)
// onClose: callback khi đóng alert (tuỳ chọn)
interface CustomAlertProps {
    type: CustomAlertType;
    title: string;
    description: string;
    visible?: boolean;
    onClose?: () => void;
}

const iconMap = {
    info: <InfoCircleOutlined className="custom-alert-icon info" />,
    success: <CheckCircleOutlined className="custom-alert-icon success" />,
    error: <CloseCircleOutlined className="custom-alert-icon error" />,
    warning: <ExclamationCircleOutlined className="custom-alert-icon warning" />,
};

const PsAlert: React.FC<CustomAlertProps> = ({ type, title, description, visible: visibleProp = true, onClose }) => {
    const [visible, setVisible] = React.useState(visibleProp);
    React.useEffect(() => { setVisible(visibleProp); }, [visibleProp]);
    if (!visible) return null;
    return (
        <div className={`custom-alert-container custom-alert-${type}`}>
            <AntdAlert
                type={type}
                showIcon
                icon={iconMap[type]}
                message={
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span className={`custom-alert-title ${type}`}>{title}</span>
                        <button className="custom-alert-close-btn" onClick={() => { setVisible(false); onClose?.(); }}>
                            <CloseOutlined />
                        </button>
                    </div>
                }
                description={<span className="custom-alert-description">{description}</span>}
                className={`custom-alert-ant custom-alert-border-${type}`}
                banner={false}
            />
        </div>
    );
};

export default PsAlert;
