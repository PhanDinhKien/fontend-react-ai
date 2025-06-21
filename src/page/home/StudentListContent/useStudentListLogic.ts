// useStudentListLogic.ts
// Hook quản lý logic cho màn hình danh sách học sinh
// Quản lý state filter, phân trang, dữ liệu mẫu, trả về props cho UI

import { useMemo, useState } from 'react';

export interface Student {
  id: number;
  name: string;
  studentId: string;
  avatarUrl?: string;
  className: string;
  classGroup: string;
  gender: 'male' | 'female';
  status: 'inClass' | 'left' | 'transferred';
  checkIn: string; // HH:mm
  checkOut?: string; // HH:mm | undefined
  emergencyContact: {
    name: string;
    phone: string;
  };
}

export function useStudentListLogic() {
  // Dữ liệu mẫu
  const allClasses = ['1A', '1B', '2A', '2B'];
  const allGroups = ['Khối 1', 'Khối 2'];
  const allGenders = ['male', 'female'];
  const allStatus = ['inClass', 'left', 'transferred'];

  const students: Student[] = Array.from({ length: 55 }).map((_, i) => ({
    id: i + 1,
    name: `Học sinh ${i + 1}`,
    studentId: `HS${1000 + i}`,
    avatarUrl: undefined,
    className: allClasses[i % allClasses.length],
    classGroup: allGroups[i % allGroups.length],
    gender: i % 2 === 0 ? 'male' : 'female',
    status: allStatus[i % allStatus.length] as Student['status'],
    checkIn: `07:${(10 + i) % 60}`.padStart(5, '0'),
    checkOut: i % 3 === 0 ? undefined : `16:${(10 + i) % 60}`.padStart(5, '0'),
    emergencyContact: {
      name: `Phụ huynh ${i + 1}`,
      phone: `09${(10000000 + i).toString().slice(0, 8)}`,
    },
  }));

  // State filter và phân trang
  const [search, setSearch] = useState('');
  const [className, setClassName] = useState<string | undefined>();
  const [gender, setGender] = useState<string | undefined>();
  const [status, setStatus] = useState<string | undefined>();
  const [page, setPage] = useState(1);
  const pageSize = 20;

  // Lọc dữ liệu
  const filteredData = useMemo(() => {
    return students.filter(row => {
      const matchName = !search || row.name.toLowerCase().includes(search.toLowerCase()) || row.studentId.toLowerCase().includes(search.toLowerCase());
      const matchClass = !className || row.className === className;
      const matchGender = !gender || row.gender === gender;
      const matchStatus = !status || row.status === status;
      return matchName && matchClass && matchGender && matchStatus;
    });
  }, [search, className, gender, status]);

  const pagedData = filteredData.slice((page - 1) * pageSize, page * pageSize);

  return {
    allClasses,
    allGenders,
    allStatus,
    search,
    setSearch,
    className,
    setClassName,
    gender,
    setGender,
    status,
    setStatus,
    page,
    setPage,
    pageSize,
    filteredData,
    pagedData,
  };
}
