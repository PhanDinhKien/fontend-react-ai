// ClassListFilter.tsx
// Component filter cho danh sách lớp học: gồm ô tìm kiếm, các select filter, và nút search/xóa filter.
// Tái sử dụng được, nhận props điều khiển từ cha, hỗ trợ i18n, style chuẩn Ant Design.

import React from 'react';
import { Input, Select, Button, Row, Col, Form } from 'antd';
import { useTranslation } from 'react-i18next';

/**
 * Props cho component ClassListFilter
 * - search, setSearch: giá trị và hàm cập nhật ô tìm kiếm
 * - teacher, setTeacher: filter giáo viên
 * - location, setLocation: filter địa điểm
 * - status, setStatus: filter trạng thái
 * - allTeachers, allLocations, allStatus: danh sách lựa chọn cho các filter
 * - onClear: callback khi bấm nút xóa filter
 * - onSearch: callback khi bấm nút tìm kiếm
 */
interface Props {
  search: string;
  setSearch: (v: string) => void;
  teacher: string | undefined;
  setTeacher: (v: string | undefined) => void;
  location: string | undefined;
  setLocation: (v: string | undefined) => void;
  status: string | undefined;
  setStatus: (v: string | undefined) => void;
  allTeachers: { id: number; name: string }[];
  allLocations: string[];
  allStatus: string[];
  onClear: () => void;
  onSearch: () => void;
}

/**
 * Component filter cho danh sách lớp học
 * Hiển thị các filter và nút thao tác, truyền props từ cha để điều khiển state
 */
const ClassListFilter: React.FC<Props & { form: any }> = ({
  form,
  search, setSearch, teacher, setTeacher, location, setLocation, status, setStatus,
  allTeachers, allLocations, allStatus, onClear, onSearch
}) => {
  const { t } = useTranslation();
  return (
    <Form form={form} layout="vertical" style={{ marginBottom: 16 }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', width: '100%' }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <Row gutter={8} style={{ width: '100%' }}>
            <Col flex="auto">
              <Input.Search
                placeholder={t('search_class')}
                value={search}
                onChange={e => setSearch(e.target.value)}
                allowClear
                size="middle"
                className="mr6"
              />
            </Col>
            <Col span={4} style={{ minWidth: 120 }}>
              <Select
                allowClear
                placeholder={t('filter.teacher')}
                value={teacher}
                onChange={setTeacher}
                style={{ width: '100%' }}
                size="middle"
                className="mr6"
              >
                {allTeachers.map(tch => (
                  <Select.Option key={tch.id} value={tch.name}>{tch.name}</Select.Option>
                ))}
              </Select>
            </Col>
            <Col span={4} style={{ minWidth: 120 }}>
              <Select
                allowClear
                placeholder={t('filter.location')}
                value={location}
                onChange={setLocation}
                style={{ width: '100%' }}
                size="middle"
                className="mr6"
              >
                {allLocations.map(loc => (
                  <Select.Option key={loc} value={loc}>{loc}</Select.Option>
                ))}
              </Select>
            </Col>
            <Col span={4} style={{ minWidth: 110 }}>
              <Select
                allowClear
                placeholder={t('filter.status')}
                value={status}
                onChange={setStatus}
                style={{ width: '100%' }}
                size="middle"
                className="mr6"
              >
                {allStatus.map(st => (
                  <Select.Option key={st} value={st}>{t(`status.${st.toLowerCase()}`)}</Select.Option>
                ))}
              </Select>
            </Col>
          </Row>
        </div>
        <div style={{ display: 'flex', gap: 8, marginLeft: 8 }}>
          <Button
            onClick={onClear}
            className="mg-r-6 text-secondary-1-13-500-16"
          >
            {t('action.clearFilter')}
          </Button>
          <Button
            type="primary"
            onClick={onSearch}
            className="primary-btn-search text-primary-13-500-16"
          >
            {t('action.search')}
          </Button>
        </div>
      </div>
    </Form>
  );
};

export default ClassListFilter;
