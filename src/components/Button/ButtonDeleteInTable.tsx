import React from 'react';
import { Tooltip } from 'antd';
import { Trash } from 'phosphor-react';
import './ButtonCommon.scss';

interface DeleteButtonProps {
  onClick?: () => void;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  isShowTooltip?: boolean;
  tooltipTitle?: string;
  isDisable?: boolean;
}

const ButtonDeleteInTable: React.FC<DeleteButtonProps> = ({
  onClick,
  children = <Trash size={16} weight="fill" />,
  style,
  isShowTooltip = false,
  tooltipTitle = 'Xóa',
  isDisable = false,
}) => {
  const button = (
    <button
      type="button"
      onClick={onClick}
      disabled={isDisable}
      className="button-delete-in-table"
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

export default ButtonDeleteInTable;
