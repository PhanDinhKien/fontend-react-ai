import React from 'react';
import { Tooltip } from 'antd';
import { FormOutlined } from '@ant-design/icons';
import './ButtonCommon.scss';

interface EditButtonProps {
  onClick?: () => void;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  isShowTooltip?: boolean;
  tooltipTitle?: string;
  isDisable?: boolean;
}

const ButtonEditInTable: React.FC<EditButtonProps> = ({
  onClick,
  children = <FormOutlined />,
  style,
  isShowTooltip = false,
  tooltipTitle = 'Sửa',
  isDisable = false,
}) => {
  const button = (
    <button
      type="button"
      onClick={onClick}
      disabled={isDisable}
      className="button-edit-in-table"
      style={style}
    >
      {children}
    </button>
  );
  return isShowTooltip ? (
    <Tooltip title={tooltipTitle}>{button}</Tooltip>
  ) : (
    button
  );
};

export default ButtonEditInTable;
