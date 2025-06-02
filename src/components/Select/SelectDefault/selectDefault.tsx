import React from 'react';
import { ProFormSelect } from '@ant-design/pro-components';

interface SelectDefaultProps {
  label?: string;
  options: { label: string; value: string | number }[];
  value?: string | number;
  onChange?: (value: string | number) => void;
  placeholder?: string;
}

const SelectDefault: React.FC<SelectDefaultProps> = ({ label, options, value, onChange, placeholder }) => {
  return (
    <div>
      {label && <div style={{ marginBottom: 4, fontWeight: 500 }}>{label}</div>}
      <ProFormSelect
        options={options}
        fieldProps={{
          value,
          onChange,
          allowClear: true,
          showSearch: true,
          placeholder,
          filterOption: (input, option) =>
            (option?.label ?? '').toLowerCase().includes(input.toLowerCase()),
        }}
        width="md"
        placeholder={placeholder}
      />
    </div>
  );
};

export default SelectDefault;
