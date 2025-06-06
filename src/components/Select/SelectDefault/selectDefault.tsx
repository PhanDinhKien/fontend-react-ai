import React from 'react';
import { ProFormSelect } from '@ant-design/pro-components';

interface SelectDefaultProps {
  label?: string;
  options: { label: any; value: string | number }[];
  value?: string | number;
  onChange?: (value: string | number) => void;
  placeholder?: string;
  showBorder?: boolean;
  showSearch?: boolean;
  allowClear?: boolean;
}

const SelectDefault: React.FC<SelectDefaultProps> = ({ label, options, value, onChange, placeholder, showBorder, showSearch, allowClear }) => {
  return (
    <div>
      <ProFormSelect
        label={label}
        options={options}
        fieldProps={{
          value,
          onChange,
          allowClear: allowClear,
          showSearch: showSearch,
          placeholder,
          filterOption: (input, option) =>
            (typeof option?.label === 'string' ? option.label : '').toLowerCase().includes(input.toLowerCase()),
          variant: showBorder === false ? 'borderless' : 'outlined',
        }}
        width="md"
        placeholder={placeholder}
      />
    </div>
  );
};

export default SelectDefault;
