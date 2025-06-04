import React from 'react';
import { Tag } from 'antd';
import './TagStatus.css';

export type TagStatusType = 'blue' | 'green' | 'purple' | 'red' | 'orange';

interface TagStatusProps {
  type: TagStatusType;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  isShowBorder?: boolean;
  isBold?: boolean;
}

const colorMap = {
  blue: { background: '#E7F0FD', color: '#1669EF' },
  green: { background: '#EBF7F2', color: '#36B37E' },
  purple: { background: '#F0EEF9', color: '#7B61FF' },
  red: { background: '#FBE8E9', color: '#D72229' },
  orange: { background: '#FEF1E8', color: '#F57921' },
};

const TagStatus: React.FC<TagStatusProps> = ({ type, children, className = '', style, isShowBorder = false, isBold = false }) => {
  const colorStyle = colorMap[type] || {};
  const borderStyle = isShowBorder ? { border: `1px solid ${colorStyle.color}` } : { border: 'none' };
  const fontWeightStyle = isBold ? { fontWeight: 500 } : {};
  return (
    <Tag
      className={`tag-status tag-status-${type} ${className}`.trim()}
      style={{ ...colorStyle, ...borderStyle, ...fontWeightStyle, ...style }}
    >
      {children}
    </Tag>
  );
};

export default TagStatus;
