// useClassListLogic.ts
// Hook tách riêng xử lý logic cho màn hình danh sách lớp học (Class List Page)
// Quản lý state filter, phân trang, dữ liệu mẫu, và trả về props cho UI
// Giúp tách biệt logic và UI, dễ bảo trì, mở rộng, tái sử dụng

import { Form } from 'antd';
import { useMemo, useState } from 'react';

/**
 * Kiểu dữ liệu giáo viên
 */
export interface Teacher {
  id: number;
  name: string;
}

/**
 * Kiểu dữ liệu lớp học
 */
export interface ClassData {
  id: number;
  name: string;
  code: string;
  teachers: Teacher[];
  location: string;
  status: string;
}

/**
 * Hook quản lý logic cho danh sách lớp học
 * - Quản lý state filter, phân trang
 * - Lọc dữ liệu theo filter
 * - Trả về props cho UI
 */
export function useClassListLogic() {
  const [form] = Form.useForm();
  const allTeachers: Teacher[] = [
    { id: 1, name: 'Nguyễn Văn A' },
    { id: 2, name: 'Trần Thị B' },
    { id: 3, name: 'Lê Văn C' },
  ];
  const allLocations = ['Hà Nội', 'Hồ Chí Minh', 'Đà Nẵng'];
  const allStatus = ['Active', 'Inactive'];
  // Dữ liệu mẫu lớp học
  const classData: ClassData[] = Array.from({ length: 55 }).map((_, i) => ({
    id: i + 1,
    name: `Lớp ${i + 1}`,
    code: `CL${1000 + i}`,
    teachers: i % 3 === 0 ? [] : [allTeachers[i % 3]],
    location: allLocations[i % 3],
    status: i % 2 === 0 ? 'Active' : 'Inactive',
  }));

  // State filter và phân trang
  const [search, setSearch] = useState('');
  const [teacher, setTeacher] = useState<string | undefined>();
  const [location, setLocation] = useState<string | undefined>();
  const [status, setStatus] = useState<string | undefined>();
  const [page, setPage] = useState(1);
  const pageSize = 20;

  // Lọc dữ liệu theo filter
  const filteredData = useMemo(() => {
    return classData.filter(row => {
      const matchName = !search || row.name.toLowerCase().includes(search.toLowerCase()) || row.code.toLowerCase().includes(search.toLowerCase());
      const matchTeacher = !teacher || row.teachers.some(t => t.name === teacher);
      const matchLocation = !location || row.location === location;
      const matchStatus = !status || row.status === status;
      return matchName && matchTeacher && matchLocation && matchStatus;
    });
  }, [search, teacher, location, status]);

  // Dữ liệu trang hiện tại
  const pagedData = filteredData.slice((page - 1) * pageSize, page * pageSize);

  // Trả về props cho UI
  return {
    form,
    allTeachers,
    allLocations,
    allStatus,
    search,
    setSearch,
    teacher,
    setTeacher,
    location,
    setLocation,
    status,
    setStatus,
    page,
    setPage,
    pageSize,
    filteredData,
    pagedData,
  };
}
