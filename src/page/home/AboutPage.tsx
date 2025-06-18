import React from 'react';
import WarningModal from '../../components/Modal/Warning';
import { Placeholder, WarningCircle } from 'phosphor-react';
import DefaultTable from '../../components/Table/TableDefault/TableDefault';
import AccountInfoDefault from '../../components/AccountInfo/AccountInfoDefault';
import ButtonDeleteInTable from '../../components/Button/ButtonDeleteInTable';
import ButtonEditInTable from '../../components/Button/ButtonEditInTable';
import TagStatus from '../../components/TagStatus/TagStatus';
import ModalDefault from '../../components/Modal/ModalDefault';
import DrawerForm from '../../components/Drawer/DrawerForm';
import FormManager from '../../components/Form/FormManager';
import type { ColumnsType } from 'antd/es/table';

const AboutPage: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const [openModalDefault, setOpenModalDefault] = React.useState(false);
  const [openDrawerForm, setOpenDrawerForm] = React.useState(false);
  const [openFormManager, setOpenFormManager] = React.useState(false);
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
      <button onClick={() => setOpenDrawerForm(true)} style={{ marginLeft: 8 }}>Show Drawer Form</button>
      <button onClick={() => setOpenFormManager(true)} style={{ marginLeft: 8 }}>Show Dynamic Form</button>
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
      <DrawerForm
        open={openDrawerForm}
        onClose={() => setOpenDrawerForm(false)}
        title="Drawer Form Demo"
        okText="Lưu"
        cancelText="Hủy"
        formManagerConfig={{
          forms: [{
            key: 'drawer-user-form',
            columns: [
              { title: 'Họ tên', dataIndex: 'name', valueType: 'text', required: true, fieldProps: { placeholder: 'Nhập họ tên', id: 'field-name' }, formItemProps: { rules: [{ required: true, message: 'Vui lòng nhập họ tên!' }, { min: 3, message: 'Họ tên tối thiểu 3 ký tự!' }] } },
              { title: 'Email', dataIndex: 'email', valueType: 'email', required: true, fieldProps: { placeholder: 'Nhập email', id: 'field-email' }, formItemProps: { rules: [{ required: true, message: 'Vui lòng nhập email!' }, { type: 'email', message: 'Email không hợp lệ!' }] } },
              {
                title: 'Mật khẩu',
                dataIndex: 'password',
                valueType: 'password',
                required: true,
                dependencies: ['email'],
                fieldProps: (form: any) => {
                  const email = form?.getFieldValue ? form.getFieldValue('email') : undefined;
                  return {
                    placeholder: 'Nhập mật khẩu',
                    disabled: email !== 'phandinhkienmta@gmail.com',
                    id: 'field-password',
                  };
                },
                formItemProps: {
                  rules: [
                    { required: true, message: 'Vui lòng nhập mật khẩu!' },
                    { min: 6, message: 'Mật khẩu tối thiểu 6 ký tự!' }
                  ],
                }
              },
              { title: 'Số điện thoại', dataIndex: 'phone', valueType: 'phone', fieldProps: { placeholder: 'Nhập số điện thoại', id: 'field-phone' }, formItemProps: { rules: [{ pattern: /^\d{10,11}$/, message: 'Số điện thoại không hợp lệ!' }] } },
              { title: 'Số lượng', dataIndex: 'amount', valueType: 'digit', fieldProps: { placeholder: 'Nhập số lượng', id: 'field-amount' }, formItemProps: { rules: [{ type: 'number', min: 1, message: 'Số lượng phải lớn hơn 0!' }] } },
              { title: 'Tiền', dataIndex: 'money', valueType: 'money', fieldProps: { placeholder: 'Nhập số tiền', id: 'field-money' }, formItemProps: { rules: [{ required: true, message: 'Vui lòng nhập số tiền!' }] } },
              { title: 'Ngày sinh', dataIndex: 'birthday', valueType: 'date', fieldProps: { placeholder: 'Chọn ngày sinh', id: 'field-birthday' }, formItemProps: { rules: [{ required: true, message: 'Vui lòng chọn ngày sinh!' }] } },
              { title: 'Thời gian', dataIndex: 'time', valueType: 'time', fieldProps: { placeholder: 'Chọn thời gian', id: 'field-time' } },
              { title: 'Ngày giờ', dataIndex: 'dateTime', valueType: 'dateTime', fieldProps: { placeholder: 'Chọn ngày giờ', id: 'field-dateTime' } },
              { title: 'Chọn loại', dataIndex: 'type', valueType: 'select', valueEnum: { Admin: 'Admin', User: 'User', Guest: 'Guest' }, required: true, fieldProps: { placeholder: 'Chọn loại tài khoản', id: 'field-type' }, formItemProps: { rules: [{ required: true, message: 'Vui lòng chọn loại tài khoản!' }] } },
              { title: 'Chọn nhiều', dataIndex: 'multiSelect', valueType: 'select', fieldProps: { mode: 'multiple', placeholder: 'Chọn nhiều loại', id: 'field-multiSelect' }, valueEnum: { A: 'A', B: 'B', C: 'C' } },
              { title: 'Radio', dataIndex: 'radio', valueType: 'radio', valueEnum: { yes: 'Có', no: 'Không' }, fieldProps: { placeholder: 'Chọn radio', id: 'field-radio' }, formItemProps: { rules: [{ required: true, message: 'Vui lòng chọn radio!' }] } },
              { title: 'Checkbox', dataIndex: 'checkbox', valueType: 'checkbox', valueEnum: { agree: 'Đồng ý' }, fieldProps: { placeholder: 'Chọn checkbox', id: 'field-checkbox' } },
              { title: 'Switch', dataIndex: 'switch', valueType: 'switch', fieldProps: { placeholder: 'Bật/Tắt', id: 'field-switch' } },
              { title: 'Textarea', dataIndex: 'desc', valueType: 'textarea', fieldProps: { placeholder: 'Nhập mô tả', id: 'field-desc' }, formItemProps: { rules: [{ min: 10, message: 'Mô tả tối thiểu 10 ký tự!' }] } },
              { title: 'Slider', dataIndex: 'slider', valueType: 'slider', fieldProps: { min: 0, max: 100, placeholder: 'Chọn giá trị', id: 'field-slider' } },
              { title: 'Rate', dataIndex: 'rate', valueType: 'rate', fieldProps: { placeholder: 'Đánh giá', id: 'field-rate' } },
              { title: 'Progress', dataIndex: 'progress', valueType: 'progress', fieldProps: { placeholder: 'Tiến độ', id: 'field-progress' } },
              { title: 'Phần trăm', dataIndex: 'percent', valueType: 'percent', fieldProps: { placeholder: 'Nhập phần trăm', id: 'field-percent' } },
              { title: 'URL', dataIndex: 'url', valueType: 'url', fieldProps: { placeholder: 'Nhập URL', id: 'field-url' }, formItemProps: { rules: [{ type: 'url', message: 'URL không hợp lệ!' }] } },
              { title: 'Json', dataIndex: 'json', valueType: 'jsonCode', fieldProps: { placeholder: 'Nhập JSON', id: 'field-json' } },
              { title: 'Code', dataIndex: 'code', valueType: 'code', fieldProps: { placeholder: 'Nhập code', id: 'field-code' } },
              { title: 'Avatar', dataIndex: 'avatar', valueType: 'avatar', fieldProps: { placeholder: 'Chọn avatar', id: 'field-avatar' } },
              { title: 'Ảnh', dataIndex: 'image', valueType: 'image', fieldProps: { placeholder: 'Chọn ảnh', id: 'field-image' } },
              { title: 'Cascader', dataIndex: 'cascader', valueType: 'cascader', fieldProps: { placeholder: 'Chọn cascader', id: 'field-cascader' }, request: async () => [{ label: 'A', value: 'a' }, { label: 'B', value: 'b' }] },
              { title: 'TreeSelect', dataIndex: 'tree', valueType: 'treeSelect', fieldProps: { placeholder: 'Chọn tree', id: 'field-tree' }, request: async () => [{ title: 'Node1', value: '1', children: [{ title: 'Node1-1', value: '1-1' }] }] },
              { valueType: 'divider', title: 'Thông tin bổ sung' },
              { valueType: 'group', title: 'Nhóm trường', columns: [
                { title: 'Nhóm 1', dataIndex: 'group1', valueType: 'text', fieldProps: { placeholder: 'Nhập nhóm 1', id: 'field-group1' }, formItemProps: { rules: [{ required: true, message: 'Vui lòng nhập nhóm 1!' }] } },
                { title: 'Nhóm 2', dataIndex: 'group2', valueType: 'text', fieldProps: { placeholder: 'Nhập nhóm 2', id: 'field-group2' }, formItemProps: { rules: [{ required: true, message: 'Vui lòng nhập nhóm 2!' }] } },
              ] },
              { title: 'Lớp', dataIndex: 'class', valueType: 'select', fieldProps: { placeholder: 'Chọn lớp', id: 'field-class' }, valueEnum: { A1: 'A1', A2: 'A2', B1: 'B1', B2: 'B2' }, formItemProps: { rules: [{ required: true, message: 'Vui lòng chọn lớp!' }] } },
            ],
            onFinish: (values: any) => {
              alert('DrawerForm submit: ' + JSON.stringify(values));
              setOpenDrawerForm(false);
            },
            proFormProps: {
              submitter: { searchConfig: { submitText: 'Lưu' } },
            },
          }]
        }}
      />
      {openFormManager && (
        <ModalDefault
          open={openFormManager}
          onOk={() => setOpenFormManager(false)}
          onCancel={() => setOpenFormManager(false)}
          title="FormManager - SchemaForm Demo"
        >
        </ModalDefault>
      )}
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
