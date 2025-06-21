// DangerForm.tsx
// DrawerForm dùng để thêm mới thông tin học sinh
import React from 'react';
import { Drawer, Form, Input, Button } from 'antd';

interface DangerFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: any) => void;
}

const DangerForm: React.FC<DangerFormProps> = ({ open, onClose, onSubmit }) => {
  const [form] = Form.useForm();

  const handleFinish = (values: any) => {
    onSubmit(values);
    form.resetFields();
  };

  return (
    <Drawer
      title="Add New Student"
      open={open}
      onClose={onClose}
      width={400}
      footer={null}
      destroyOnClose
    >
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        <Form.Item name="name" label="Student Name" rules={[{ required: true, message: 'Please enter student name' }]}> 
          <Input />
        </Form.Item>
        <Form.Item name="studentId" label="Student ID" rules={[{ required: true, message: 'Please enter student ID' }]}> 
          <Input />
        </Form.Item>
        {/* Thêm các trường khác nếu cần */}
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Add
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default DangerForm;
