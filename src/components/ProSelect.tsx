import React from 'react';
import { ProFormSelect } from '@ant-design/pro-components';

interface ProSelectOption {
  label: string;
  value: string | number;
  disabled?: boolean;
}

interface ProSelectProps {
  options: ProSelectOption[];
  value?: string | number;
  onChange?: (value: string | number) => void;
  placeholder?: string;
  width?: number | 'sm' | 'md' | 'lg' | 'xl';
  allowClear?: boolean;
  disabled?: boolean;
  label?: string;
  name?: string;
}

const ProSelect: React.FC<ProSelectProps> = ({
  options,
  value,
  onChange,
  placeholder = 'Select an option',
  width = 'md',
  allowClear = true,
  disabled = false,
  label,
  name = 'pro-select',
}) => {
  return (
    <ProFormSelect
      name={name}
      label={label}
      options={options}
      fieldProps={{
        value,
        onChange,
        allowClear,
        disabled,
      }}
      placeholder={placeholder}
      width={width}
    />
  );
};

export default ProSelect;
