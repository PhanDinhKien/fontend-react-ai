import React from 'react';
import { Table } from 'antd';
import type { TableProps, ColumnsType } from 'antd/es/table';
import './TableDefault.scss';
import { useTheme } from '../../../context/ThemeContext';

export interface DefaultTableProps<T> extends TableProps<T> {
  columns: ColumnsType<T>;
  dataSource: T[];
  loading?: boolean;
}

function DefaultTable<T extends object>({ columns, dataSource, loading, ...rest }: DefaultTableProps<T>) {
  const { theme } = useTheme();
  return (
    <Table
      columns={columns}
      dataSource={dataSource}
      loading={loading}
      rowKey={(record: any) => record.id || record.key || JSON.stringify(record)}
      pagination={{ pageSize: 10 }}
      className={`table-default theme-${theme}`}
      {...rest}
    />
  );
}

export default DefaultTable;
