// ClassListTable.tsx
// Component hiển thị bảng danh sách lớp học và phân trang.
// Tái sử dụng được, nhận props columns, data, phân trang, truyền từ cha.
// Sử dụng Ant Design Table và Pagination.

import React from 'react';
import { Table, Pagination } from 'antd';
import TagStatus from '../../../components/TagStatus/TagStatus';
import ButtonEditInTable from '../../../components/Button/ButtonEditInTable';
import ButtonDeleteInTable from '../../../components/Button/ButtonDeleteInTable';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { ClassData } from './useClassListLogic';

/**
 * Props cho component ClassListTable
 * - columns: cấu hình cột bảng (Ant Design Table)
 * - dataSource: dữ liệu hiển thị (mảng lớp học)
 * - page, pageSize: phân trang
 * - total: tổng số bản ghi
 * - onPageChange: callback khi đổi trang
 */
interface Props {
  columns: any[];
  dataSource: ClassData[];
  page: number;
  pageSize: number;
  total: number;
  onPageChange: (page: number) => void;
}

/**
 * Component bảng danh sách lớp học, hiển thị dữ liệu và phân trang
 * Nhận props từ cha, không chứa logic xử lý dữ liệu
 */
const ClassListTable: React.FC<Props> = ({ columns, dataSource, page, pageSize, total, onPageChange }) => {
  return (
    <>
      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={false}
        rowKey="id"
      />
      <div style={{ marginTop: 16, textAlign: 'right' }}>
        <Pagination
          current={page}
          pageSize={pageSize}
          total={total}
          onChange={onPageChange}
          showSizeChanger={false}
          showTotal={(total, range) => `${range[0]} - ${range[1]} / ${total}`}
        />
      </div>
    </>
  );
};

export default ClassListTable;
