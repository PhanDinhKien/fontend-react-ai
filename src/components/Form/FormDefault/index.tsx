// FormDefault component - basic template
import React from 'react';
import { Form } from 'antd';

interface FormDefaultProps {
  form?: any;
  initialValues?: any;
  onFinish?: (values: any) => void;
  layout?: 'horizontal' | 'vertical' | 'inline';
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

const FormDefault: React.FC<FormDefaultProps> = ({
  form,
  initialValues,
  onFinish,
  layout = 'vertical',
  children,
  style,
}) => {
  return (
    <Form
      form={form}
      initialValues={initialValues}
      onFinish={onFinish}
      layout={layout}
      style={style}
    >
      {children}
    </Form>
  );
};

export default FormDefault;
