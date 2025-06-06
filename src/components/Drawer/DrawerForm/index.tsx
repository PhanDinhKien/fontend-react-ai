// DrawerForm component - basic template
import React from 'react';
import { Drawer, Button } from 'antd';
import './index.scss';
import FormManager from '../../Form/FormManager';
import { useForm } from 'antd/es/form/Form';

interface DrawerFormProps {
  open: boolean;
  onClose?: () => void;
  title?: React.ReactNode;
  width?: number | string;
  placement?: 'left' | 'right' | 'top' | 'bottom';
  okText?: string;
  cancelText?: string;
  loading?: boolean;
  /** Bắt buộc phải truyền formManagerConfig để render form động */
  formManagerConfig: {
    forms: Array<{
      key: string;
      columns: any[];
      initialValues?: any;
      onFinish?: (values: any) => void;
      layout?: 'horizontal' | 'vertical' | 'inline';
      style?: React.CSSProperties;
      proFormProps?: any;
    }>;
  };
}

const DrawerForm: React.FC<DrawerFormProps> = ({
  open,
  onClose,
  title,
  width = 600,
  placement = 'right',
  okText = 'Lưu',
  cancelText = 'Hủy',
  loading = false,
  formManagerConfig,
}) => {
  const [form] = useForm();

  // Hàm xử lý khi form thay đổi giá trị
  const onChangeForm = () => {
    form.validateFields().then(values => {
      // Gọi onFinish nếu có
      console.log('Form values changed:', values);
    }).catch(errorInfo => {
      console.error('Validation failed:', errorInfo);
    });
  };

  // Truyền onValuesChange vào proFormProps của từng form trong formManagerConfig
  if (formManagerConfig?.forms) {
    formManagerConfig.forms = formManagerConfig.forms.map(f => ({
      ...f,
      proFormProps: {
        ...f.proFormProps,
        onValuesChange: ()=> {},
      },
    }));
  }

  return (
    <Drawer
      open={open}
      onClose={onClose}
      title={title}
      width={width}
      placement={placement}
      className="drawer-form"
      footer={
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
          <Button onClick={onClose} style={{ fontWeight: 600 }}>{cancelText}</Button>
          <Button type="primary" htmlType="submit" loading={loading} onClick={onChangeForm} style={{ fontWeight: 600 }}>
            {okText}
          </Button>
        </div>
      }
    >
      <FormManager {...formManagerConfig} form={form} />
    </Drawer>
  );
};

export default DrawerForm;
