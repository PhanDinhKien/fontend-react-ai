import React from 'react';
import { Avatar, Space, Typography } from 'antd';
import { IdcardOutlined } from '@ant-design/icons';

interface AccountInfoProps {
  name: string;
  id: string | number;
  avatarUrl: string;
}

const AccountInfo: React.FC<AccountInfoProps> = ({ name, id, avatarUrl }) => {
  return (
    <Space align="center" size={16}>
      <Avatar src={avatarUrl} size={56} />
      <div>
        <Typography.Text style={{ color: '#0958d9', fontWeight: 600, fontSize: 18 }}>
          {name}
        </Typography.Text>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 2 }}>
          <IdcardOutlined style={{ color: '#888', fontSize: 16 }} />
          <Typography.Text style={{ color: '#888', fontSize: 16 }}>
            {id}
          </Typography.Text>
        </div>
      </div>
    </Space>
  );
};

export default AccountInfo;
