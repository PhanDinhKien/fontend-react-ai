// StudentListTable.tsx
// Component hiển thị bảng danh sách học sinh và phân trang.
// Sử dụng DefaultTable, i18n, và các component custom cho từng cột.

import React from 'react';
import DefaultTable from '../../../components/Table/TableDefault/TableDefault';
import { Pagination } from 'antd';
import { useTranslation } from 'react-i18next';
import AccountInfoDefault from '../../../components/AccountInfo/AccountInfoDefault';
import { Student } from './useStudentListLogic';

interface Props {
  dataSource: Student[];
  page: number;
  pageSize: number;
  total: number;
  onPageChange: (page: number) => void;
}

const StudentListTable: React.FC<Props> = ({ dataSource, page, pageSize, total, onPageChange }) => {
  const { t } = useTranslation();
  const columns = [
    {
      title: t('studentList.table.studentName'),
      dataIndex: 'name',
      key: 'name',
      render: (_: any, record: Student) => (
        <AccountInfoDefault
          avatarUrl={record.avatarUrl || ''}
          name={record.name}
          code={record.studentId}
        />
      ),
    },
    {
      title: t('studentList.table.classGroup'),
      dataIndex: 'className',
      key: 'classGroup',
      render: (_: any, record: Student) => (
        <div>
          <div>{record.className}</div>
          <div style={{ fontSize: 12, color: '#888' }}>{record.classGroup}</div>
        </div>
      ),
    },
    {
      title: t('studentList.table.gender'),
      dataIndex: 'gender',
      key: 'gender',
      render: (gender: string) => gender === 'male' ? t('studentList.table.gender') + ' (Nam)' : t('studentList.table.gender') + ' (Nữ)',
    },
    {
      title: t('studentList.table.status'),
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        let color = '#1677ff', text = t('studentList.status.inClass');
        if (status === 'left') { color = '#52c41a'; text = t('studentList.status.left'); }
        if (status === 'transferred') { color = '#faad14'; text = t('studentList.status.transferred'); }
        return <span style={{ color, fontWeight: 500 }}>&#9679; {text}</span>;
      },
    },
    {
      title: t('studentList.table.checkIn'),
      dataIndex: 'checkIn',
      key: 'checkIn',
      render: (time: string) => time,
    },
    {
      title: t('studentList.table.checkOut'),
      dataIndex: 'checkOut',
      key: 'checkOut',
      render: (time: string | undefined) => time || t('studentList.common.na'),
    },
    {
      title: t('studentList.table.emergencyContact'),
      dataIndex: 'emergencyContact',
      key: 'emergencyContact',
      render: (contact: { name: string; phone: string }) => (
        <div>
          <div>{contact.name}</div>
          <div style={{ fontSize: 12, color: '#888' }}>{contact.phone}</div>
        </div>
      ),
    },
  ];

  return (
    <>
      <DefaultTable
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
          showTotal={(total, range) => `${range[0]} - ${range[1]} out of ${total}`}
        />
      </div>
    </>
  );
};

export default StudentListTable;
