import React from 'react';
import { Button, Form, Input, Typography } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { ProForm, ProFormText } from '@ant-design/pro-components';
import { useNavigate } from 'react-router-dom';
import '../../styles/global.scss';
import './login.scss';

const { Title } = Typography;

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    // Handle login logic here
    console.log('Login values:', values);
    navigate('/'); // Chuyển sang trang Home bằng React Router
  };

  return (
    <div className="login-page-container">
      <div className="login-form-card">
        <Typography.Title level={2} className="login-title">Đăng nhập</Typography.Title>
        <ProForm
          onFinish={onFinish}
          submitter={{
            searchConfig: { submitText: 'Đăng nhập' },
            submitButtonProps: { block: true, size: 'large', type: 'primary' },
            resetButtonProps: false,
          }}
          layout="vertical"
        >
          <ProFormText
            name="username"
            fieldProps={{ size: 'large', prefix: <UserOutlined /> }}
            placeholder="Tên đăng nhập"
            label="Tên đăng nhập"
            rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập!' }]}
          />
          <ProFormText.Password
            name="password"
            fieldProps={{ size: 'large', prefix: <LockOutlined /> }}
            placeholder="Mật khẩu"
            label="Mật khẩu"
            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
          />
        </ProForm>
      </div>
    </div>
  );
};

export default LoginPage;
