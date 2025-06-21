// index.tsx
// Entry point cho màn hình danh sách lớp học (Class List Page)
// Kết hợp logic, filter, table và truyền props cho các component con
// Có thể import trực tiếp từ thư mục DemoHomeContent

import React from 'react';
import { useTranslation } from 'react-i18next';
import { useClassListLogic } from './useClassListLogic';
import ClassListFilter from './ClassListFilter';
import ClassListTable from './ClassListTable';
import TagStatus from '../../../components/TagStatus/TagStatus';
import ButtonEditInTable from '../../../components/Button/ButtonEditInTable';
import ButtonDeleteInTable from '../../../components/Button/ButtonDeleteInTable';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

/**
 * Component chính cho trang danh sách lớp học
 * - Kết hợp logic (hook), filter, table
 * - Truyền props cho các component con
 * - Định nghĩa columns bảng, xử lý i18n
 */
const DemoHomeContent: React.FC = () => {
  const { t } = useTranslation();
  const logic = useClassListLogic();

  // Định nghĩa cấu hình cột bảng
  const columns = [
    {
      title: t('table.className'),
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: any) => (
        <div>
          <div style={{ fontWeight: 500 }}>{text}</div>
          <div style={{ fontSize: 12, color: '#888' }}>{record.code}</div>
        </div>
      ),
    },
    {
      title: t('table.teacher'),
      dataIndex: 'teachers',
      key: 'teachers',
      render: (teachers: any[]) =>
        teachers && teachers.length > 0 ? (
          <Avatar.Group maxCount={3} size={24}>
            {teachers.map((t, idx) => (
              <Avatar key={idx} style={{ background: '#1669EF' }} icon={<UserOutlined />} >{t.name[0]}</Avatar>
            ))}
          </Avatar.Group>
        ) : (
          <span style={{ color: '#888' }}><UserOutlined /> {t('common.na')}</span>
        ),
    },
    {
      title: t('table.location'),
      dataIndex: 'location',
      key: 'location',
    },
    {
      title: t('table.status'),
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <TagStatus type={status === 'Active' ? 'green' : 'red'}>{t(`status.${status.toLowerCase()}`)}</TagStatus>
      ),
    },
    {
      title: t('table.actions'),
      key: 'actions',
      render: (_: any, record: any) => (
        <>
          <ButtonEditInTable isShowTooltip tooltipTitle={t('action.edit')} />
          <ButtonDeleteInTable isShowTooltip tooltipTitle={t('action.delete')} />
        </>
      ),
    },
  ];

  return (
    <div style={{ margin: '0 auto', padding: 24 }}>
      <ClassListFilter
        form={logic.form}
        search={logic.search}
        setSearch={logic.setSearch}
        teacher={logic.teacher}
        setTeacher={logic.setTeacher}
        location={logic.location}
        setLocation={logic.setLocation}
        status={logic.status}
        setStatus={logic.setStatus}
        allTeachers={logic.allTeachers}
        allLocations={logic.allLocations}
        allStatus={logic.allStatus}
        onClear={() => {
          logic.setSearch('');
          logic.setTeacher(undefined);
          logic.setLocation(undefined);
          logic.setStatus(undefined);
          logic.setPage(1);
        }}
        onSearch={() => logic.setPage(1)}
      />
      <ClassListTable
        columns={columns}
        dataSource={logic.pagedData}
        page={logic.page}
        pageSize={logic.pageSize}
        total={logic.filteredData.length}
        onPageChange={logic.setPage}
      />
    </div>
  );
};

export default DemoHomeContent;
