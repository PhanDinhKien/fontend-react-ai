// StudentListFilter.tsx
// Component filter cho danh sách học sinh: gồm ô tìm kiếm, các select filter, và nút search/xóa filter.
// Sử dụng i18n, layout responsive với Row/Col Ant Design.

import React from 'react';
import { Input, Select, Button, Row, Col } from 'antd';
import { useTranslation } from 'react-i18next';

interface Props {
  search: string;
  setSearch: (v: string) => void;
  className: string | undefined;
  setClassName: (v: string | undefined) => void;
  gender: string | undefined;
  setGender: (v: string | undefined) => void;
  status: string | undefined;
  setStatus: (v: string | undefined) => void;
  allClasses: string[];
  allGenders: string[];
  allStatus: string[];
  onClear: () => void;
  onSearch: () => void;
}

const StudentListFilter: React.FC<Props> = ({
  search, setSearch, className, setClassName, gender, setGender, status, setStatus,
  allClasses, allGenders, allStatus, onClear, onSearch
}) => {
  const { t } = useTranslation();
  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', width: '100%', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <Row gutter={8} style={{ width: '100%' }}>
            <Col xs={24} sm={12} md={6}>
              <Input.Search
                placeholder={t('studentList.filter.search_placeholder')}
                value={search}
                onChange={e => setSearch(e.target.value)}
                allowClear
                size="middle"
              />
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Select
                allowClear
                placeholder={t('studentList.filter.class')}
                value={className}
                onChange={setClassName}
                style={{ width: '100%' }}
                size="middle"
              >
                {allClasses.map(cls => (
                  <Select.Option key={cls} value={cls}>{cls}</Select.Option>
                ))}
              </Select>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Select
                allowClear
                placeholder={t('studentList.filter.gender')}
                value={gender}
                onChange={setGender}
                style={{ width: '100%' }}
                size="middle"
              >
                <Select.Option value="male">{t('studentList.table.gender') + ' (Nam)'}</Select.Option>
                <Select.Option value="female">{t('studentList.table.gender') + ' (Nữ)'}</Select.Option>
              </Select>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Select
                allowClear
                placeholder={t('studentList.filter.status')}
                value={status}
                onChange={setStatus}
                style={{ width: '100%' }}
                size="middle"
              >
                <Select.Option value="inClass">{t('studentList.status.inClass')}</Select.Option>
                <Select.Option value="left">{t('studentList.status.left')}</Select.Option>
                <Select.Option value="transferred">{t('studentList.status.transferred')}</Select.Option>
              </Select>
            </Col>
          </Row>
        </div>
        <div style={{ display: 'flex', gap: 8, marginLeft: 8, marginTop: 0 }}>
          <Button onClick={onClear}>{t('action.clearFilter')}</Button>
          <Button type="primary" onClick={onSearch}>{t('action.search')}</Button>
        </div>
      </div>
    </div>
  );
};

export default StudentListFilter;
