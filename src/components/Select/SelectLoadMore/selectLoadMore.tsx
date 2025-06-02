import { ProFormSelect } from '@ant-design/pro-components';
import React, { useEffect, useState } from 'react';

export interface SelectLoadMoreOption {
  label: string;
  value: string | number;
  disabled?: boolean;
}

export interface SelectLoadMoreProps {
  value?: string | number;
  onChange?: (value: string | number) => void;
  placeholder?: string;
  width?: number | 'sm' | 'md' | 'lg' | 'xl';
  allowClear?: boolean;
  disabled?: boolean;
  label?: string;
  name?: string;
  service: (params: { page: number; pageSize: number; keyword?: string }) => Promise<any>;
  parseData: (apiData: any) => { options: SelectLoadMoreOption[]; hasMore: boolean };
  pageSize?: number;
}

const SelectLoadMore: React.FC<SelectLoadMoreProps> = ({
  value,
  onChange,
  placeholder = 'Select an option',
  width = 'md',
  allowClear = true,
  disabled = false,
  label,
  name = 'select-load-more',
  service,
  parseData,
  pageSize = 20,
}) => {
  const [options, setOptions] = useState<SelectLoadMoreOption[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [keyword, setKeyword] = useState<string | undefined>(undefined);

  const fetchData = async (reset = false, searchKeyword?: string) => {
    setLoading(true);
    try {
      const data = await service({ page: reset ? 1 : page, pageSize, keyword: searchKeyword });
      const parsed = parseData(data);
      setOptions(prev => reset ? parsed.options : [...prev, ...parsed.options]);
      setHasMore(parsed.hasMore);
      if (reset) setPage(2);
      else setPage(prev => prev + 1);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(true);
    // eslint-disable-next-line
  }, []);

  const handlePopupScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    if (target.scrollTop + target.offsetHeight >= target.scrollHeight - 32 && hasMore && !loading) {
      fetchData();
    }
  };

  const handleSearch = (value: string) => {
    setKeyword(value);
    setOptions([]);
    setPage(1);
    fetchData(true, value);
  };

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
        showSearch: true,
        filterOption: false,
        onPopupScroll: handlePopupScroll,
        onSearch: handleSearch,
      }}
      placeholder={placeholder}
      width={width}
    />
  );
};

export default SelectLoadMore;
