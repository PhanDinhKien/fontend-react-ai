import React from 'react';
import WarningModal from '../../components/Modal/Warning';
import { WarningCircle } from 'phosphor-react';
import DefaultTable from '../../components/Table/TableDefault/TableDefault';
import AccountInfoDefault from '../../components/AccountInfo/AccountInfoDefault';
import ButtonDeleteInTable from '../../components/Button/ButtonDeleteInTable';
import ButtonEditInTable from '../../components/Button/ButtonEditInTable';
import TagStatus from '../../components/TagStatus/TagStatus';
import ModalDefault from '../../components/Modal/ModalDefault';
import type { ColumnsType } from 'antd/es/table';

const AboutPage: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const [openModalDefault, setOpenModalDefault] = React.useState(false);
  // Sample data for the table
  const columns: ColumnsType<any> = [
    {
      title: 'User',
      dataIndex: 'user',
      key: 'user',
      fixed: 'left',
      width: 220,
      render: (_: any, record: any) => (
        <AccountInfoDefault
          name={record.name}
          code={record.key}
          avatarUrl={`https://randomuser.me/api/portraits/men/${record.id + 30}.jpg`}
        />
      ),
    },
    { title: 'Email', dataIndex: 'email', key: 'email', width: 200 },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 120,
      render: (text: string) => {
        let type: any = 'blue';
        if (text === 'Active') type = 'green';
        else if (text === 'Inactive') type = 'red';
        else if (text === 'Pending') type = 'orange';
        else if (text === 'Admin') type = 'purple';
        return <TagStatus type={type} isBold={true}>{text}</TagStatus>;
      },
    },
    { title: 'Create Date', dataIndex: 'createDate', key: 'createDate', width: 140 },
    { title: 'Type', dataIndex: 'type', key: 'type', width: 120 },
    {
      title: 'Action',
      key: 'action',
      fixed: 'right',
      align: 'center',
      width: 100,
      render: (_: any, record: any) => (
        <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
          <ButtonEditInTable
            onClick={() => alert(`Edit ${record.name}`)}
            isShowTooltip={true}
            tooltipTitle={`Sửa ${record.name}`}
          />
          <ButtonDeleteInTable
            onClick={() => alert(`Delete ${record.name}`)}
            isShowTooltip={true}
            tooltipTitle={`Xóa ${record.name}`}
          />
        </div>
      ),
    },
  ];
  const dataSource = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      key: '11904047',
      status: 'Active',
      createDate: '2025-06-01',
      type: 'Admin',
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      key: '11904048',
      status: 'Inactive',
      createDate: '2025-05-15',
      type: 'User',
    },
    {
      id: 3,
      name: 'Alice Johnson',
      email: 'alice@example.com',
      key: '11904049',
      status: 'Pending',
      createDate: '2025-04-20',
      type: 'Guest',
    },
  ];
  return (
    <div>
      <h2>About Page</h2>
      <p>This is a sample About page. You can put any content here.</p>
      <button onClick={() => setOpen(true)}>Show Warning Modal</button>
      <button onClick={() => setOpenModalDefault(true)} style={{ marginLeft: 8 }}>Show Modal Default</button>
      <WarningModal
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        iconWarning={<WarningCircle size={20} color="#F57921" weight="fill" />}
        content="Bạn đang thực hiện thao tác cảnh báo!"
      />
      <ModalDefault
        open={openModalDefault}
        onOk={() => setOpenModalDefault(false)}
        onCancel={() => setOpenModalDefault(false)}
        title="Modal Default"
        iconTitle={<WarningCircle size={20} color="#0C4299" weight="fill" />}
      >
        <div>Đây là nội dung của Modal Default.</div>
      </ModalDefault>
      <div style={{ marginTop: 32 }}>
        <DefaultTable
          columns={columns}
          dataSource={dataSource}
          scroll={{ x: 'max-content' }}
        />
      </div>
    </div>
  );
};

export default AboutPage;
