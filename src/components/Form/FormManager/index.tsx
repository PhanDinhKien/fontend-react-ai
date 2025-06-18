// FormManager component - quản lý nhiều form động
import React from 'react';
import { ProForm } from '@ant-design/pro-components';
import { BetaSchemaForm } from '@ant-design/pro-components';
import { ColumnSchema } from './types';
import './FormManager.scss';

interface FormManagerProps {
  forms: Array<{
    key: string;
    initialValues?: any;
    onFinish?: (values: any) => void;
    layout?: 'horizontal' | 'vertical' | 'inline';
    style?: React.CSSProperties;
    columns: any[]; // Bắt buộc phải có columns (schema)
    proFormProps?: any; // Các props động khác cho ProForm
    /**
     * customComponents: Đăng ký các component input tự xây dựng để dùng trong columns.valueType
     * VD: { MyCustomInput: MyCustomInputComponent }
     */
    customComponents?: Record<string, React.ComponentType<any>>;
  }>;
  form: any
}

type DataItem = {
  name: string;
  state: string;
};

const FormManager: React.FC<FormManagerProps> = ({ forms, form }) => {
  return (
    <>
      {forms.map(formConfig => (
         <BetaSchemaForm<DataItem> form={form}
            className="form-manager-schema-form"
            submitter={false} // Không hiển thị bất kỳ nút submit nào
            rowProps={{
                gutter: [12, 12],
            }}
            colProps={{
                span: 12,
            }}
            onFinish={async (values) => {
                if (typeof formConfig.onFinish === 'function') {
                  formConfig.onFinish(values);
                }
            }}
            columns={formConfig.columns}
            // Đảm bảo không truyền submitter custom từ proFormProps
            {...(formConfig.proFormProps ? { ...formConfig.proFormProps, submitter: false } : {})}
        />
      ))}
    </>
  );
};

export default FormManager;
