import React, { useEffect, useState } from 'react';
import { ProFormSelect } from '@ant-design/pro-components';

export interface SelectDefaultOption {
  label: string;
  value: string | number;
  disabled?: boolean;
}

export interface SelectDefaultProps {
  options?: SelectDefaultOption[];
  value?: string | number;
  onChange?: (value: string | number) => void;
  placeholder?: string;
  width?: number | 'sm' | 'md' | 'lg' | 'xl';
  allowClear?: boolean;
  disabled?: boolean;
  label?: string;
  name?: string;
  service?: () => Promise<any>;
  parseData?: (apiData: any) => SelectDefaultOption[];
}

const SelectDefault: React.FC<SelectDefaultProps> = ({
  options: propOptions,
  value,
  onChange,
  placeholder = 'Select an option',
  width = 'md',
  allowClear = true,
  disabled = false,
  label,
  name = 'select-default',
  service,
  parseData,
}) => {
  const [options, setOptions] = useState<SelectDefaultOption[]>(propOptions || []);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    // Nếu options đã có (không undefined và length > 0), không gọi service
    if (propOptions && propOptions.length > 0) {
      setOptions(propOptions);
      setLoading(false);
    } else if (service) {
      setLoading(true);
      service()
        .then((data) => {
          if (!isMounted) return;
          const parsed = parseData ? parseData(data) : data;
          setOptions(parsed);
        })
        .finally(() => {
          if (isMounted) setLoading(false);
        });
    }
    return () => {
      isMounted = false;
    };
  }, [service, parseData, propOptions]);

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
        loading,
      }}
      placeholder={placeholder}
      width={width}
    />
  );
};

export default SelectDefault;
