import React from 'react';
import { Avatar, Space, Typography } from 'antd';
import { IdcardOutlined } from '@ant-design/icons';

interface AccountInfoDefaultProps {
  name: string;
  code: string | number;
  avatarUrl: string;
  styleName?: React.CSSProperties;
  styleId?: React.CSSProperties;
  styleIcon?: React.CSSProperties;
}

const AccountInfoDefault: React.FC<AccountInfoDefaultProps> = ({ name, code, avatarUrl, styleName, styleId, styleIcon }) => {
  return (
    <Space align="center" size={16}>
      <Avatar src={avatarUrl} size={49} />
      <div>
        <Typography.Text style={{ color: '#0958d9', fontWeight: 600, fontSize: 16, ...styleName }}>
          {name}
        </Typography.Text>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 2 }}>
          <IdcardOutlined style={{ color: '#888', fontSize: 13, ...styleIcon }} />
          <Typography.Text style={{ color: '#888', fontSize: 13, ...styleId }}>
            {code}
          </Typography.Text>
        </div>
      </div>
    </Space>
  );
};

export default AccountInfoDefault;
