// index.tsx
// Entry point cho màn hình danh sách học sinh (Student List Page)
// Kết hợp logic, filter, table và truyền props cho các component con
// Có thể import trực tiếp từ thư mục StudentListContent

import React, { useState } from 'react';
import { Button } from 'antd';
import { useStudentListLogic } from './useStudentListLogic';
import StudentListFilter from './StudentListFilter';
import StudentListTable from './StudentListTable';
import DrawerForm from '../../components/Drawer/DrawerForm';
import { useForm } from 'antd/es/form/Form';

const StudentListContent: React.FC = () => {
  const logic = useStudentListLogic();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [drawerForm] = useForm();

  const handleAddStudent = (values: any) => {
    // Xử lý thêm mới học sinh ở đây (gọi API hoặc cập nhật state)
    setOpenDrawer(false);
  };

  const columns = [
    {
      title: 'Student Name',
      dataIndex: 'name',
      valueType: 'text',
      formItemProps: { rules: [{ required: true, message: 'Please enter student name' }] },
    },
    {
      title: 'Student ID',
      dataIndex: 'studentId',
      valueType: 'text',
      formItemProps: { rules: [{ required: true, message: 'Please enter student ID' }] },
    },
    {
      title: 'Class',
      dataIndex: 'className',
      valueType: 'select',
      fieldProps: { options: logic.allClasses.map(c => ({ label: c, value: c })) },
      formItemProps: { rules: [{ required: true, message: 'Please select class' }] },
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      valueType: 'select',
      fieldProps: { options: [
        { label: 'Nam', value: 'male' },
        { label: 'Nữ', value: 'female' },
      ] },
      formItemProps: { rules: [{ required: true, message: 'Please select gender' }] },
    },
    {
      title: 'Status',
      dataIndex: 'status',
      valueType: 'select',
      fieldProps: { options: [
        { label: 'In Class', value: 'inClass' },
        { label: 'Left', value: 'left' },
        { label: 'Transferred', value: 'transferred' },
      ] },
      formItemProps: { rules: [{ required: true, message: 'Please select status' }] },
    },
    {
      title: 'Check-in Time',
      dataIndex: 'checkIn',
      valueType: 'time',
      formItemProps: { rules: [{ required: true, message: 'Please enter check-in time' }] },
    },
    {
      title: 'Check-out Time',
      dataIndex: 'checkOut',
      valueType: 'time',
    },
    {
      title: 'Emergency Contact Name',
      dataIndex: ['emergencyContact', 'name'],
      valueType: 'text',
      formItemProps: { rules: [{ required: true, message: 'Please enter contact name' }] },
    },
    {
      title: 'Emergency Contact Phone',
      dataIndex: ['emergencyContact', 'phone'],
      valueType: 'text',
      formItemProps: { rules: [{ required: true, message: 'Please enter contact phone' }] },
    },
  ];

  return (
    <div style={{ margin: '0 auto', padding: 24 }}>
      <StudentListFilter
        search={logic.search}
        setSearch={logic.setSearch}
        className={logic.className}
        setClassName={logic.setClassName}
        gender={logic.gender}
        setGender={logic.setGender}
        status={logic.status}
        setStatus={logic.setStatus}
        allClasses={logic.allClasses}
        allGenders={logic.allGenders}
        allStatus={logic.allStatus}
        onClear={() => {
          logic.setSearch('');
          logic.setClassName(undefined);
          logic.setGender(undefined);
          logic.setStatus(undefined);
          logic.setPage(1);
        }}
        onSearch={() => logic.setPage(1)}
      />
      <div style={{ marginBottom: 16, textAlign: 'right' }}>
        <Button type="primary" onClick={() => setOpenDrawer(true)}>
          Thêm mới
        </Button>
      </div>
      <StudentListTable
        dataSource={logic.pagedData}
        page={logic.page}
        pageSize={logic.pageSize}
        total={logic.filteredData.length}
        onPageChange={logic.setPage}
      />
      <DrawerForm
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        title="Thêm mới học sinh"
        width={700}
        formManagerConfig={{
          forms: [
            {
              key: 'add-student',
              columns,
              form: drawerForm,
              onFinish: handleAddStudent,
              layout: 'vertical',
            },
          ],
        }}
      />
    </div>
  );
};

export default StudentListContent;
