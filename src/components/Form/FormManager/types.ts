// types.ts - Định nghĩa type cho schema columns của FormManager

/**
 * Ví dụ sử dụng ColumnSchema dạng JSON trong AboutPage:
 *
 * const columns: ColumnSchema[] = [
 *   { title: 'Họ tên', dataIndex: 'name', valueType: 'text', required: true, fieldProps: { placeholder: 'Nhập họ tên' } },
 *   { title: 'Email', dataIndex: 'email', valueType: 'email', required: true, fieldProps: { placeholder: 'Nhập email' } },
 *   {
 *     title: 'Mật khẩu',
 *     dataIndex: 'password',
 *     valueType: 'password',
 *     required: true,
 *     dependencies: ['email'],
 *     fieldProps: (form: any) => {
 *       const email = form?.getFieldValue ? form.getFieldValue('email') : undefined;
 *       return {
 *         placeholder: 'Nhập mật khẩu',
 *         disabled: email !== 'phandinhkienmta@gmail.com',
 *       };
 *     },
 *     formItemProps: {
 *       rules: [
 *         { required: true, message: 'Vui lòng nhập mật khẩu!' },
 *         { min: 6, message: 'Mật khẩu tối thiểu 6 ký tự!' }
 *       ],
 *     }
 *   },
 *   {
 *     title: 'Quốc gia (API)',
 *     dataIndex: 'country',
 *     valueType: 'select',
 *     fieldProps: { placeholder: 'Chọn quốc gia' },
 *     request: async () => {
 *       const res = await fetch('https://mocki.io/v1/0a7e2e2e-2b2e-4e2e-8e2e-2e2e2e2e2e2e');
 *       const data = await res.json();
 *       return Array.isArray(data)
 *         ? data.map((item: any) => ({ label: item.country_name, value: item.id }))
 *         : [];
 *     },
 *     formItemProps: { rules: [{ required: true, message: 'Vui lòng chọn quốc gia!' }] }
 *   },
 * ];
 */

export type ColumnSchema = {
  /** Tiêu đề trường */
  title: string;
  /** Tên trường (key) */
  dataIndex?: string;
  /** Loại trường (text, select, date, ...), xem antd pro docs
   * - 'text': Input thường
   * - 'textarea': Ô nhập nhiều dòng
   * - 'digit': Số (input number)
   * - 'money': Tiền tệ
   * - 'date': Chọn ngày (DatePicker)
   * - 'dateTime': Chọn ngày giờ (DateTimePicker)
   * - 'select': Dropdown chọn 1 hoặc nhiều giá trị
   * - 'radio': Nhóm radio chọn 1 giá trị
   * - 'checkbox': Checkbox hoặc nhóm checkbox
   * - 'switch': Công tắc bật/tắt
   * - 'password': Input mật khẩu
   * - 'email': Input email (validate email)
   * - 'phone': Input số điện thoại
   * - 'url': Input URL (validate url)
   * - 'time': Chọn thời gian (TimePicker)
   * - 'slider': Thanh kéo chọn giá trị
   * - 'rate': Đánh giá (sao)
   * - 'progress': Hiển thị tiến độ (chỉ view)
   * - 'percent': Nhập phần trăm
   * - 'jsonCode': Editor nhập JSON
   * - 'code': Editor nhập code
   * - 'avatar': Upload avatar
   * - 'image': Upload ảnh
   * - 'cascader': Chọn nhiều cấp (Cascader)
   * - 'treeSelect': Chọn dạng cây
   * - 'group': Nhóm nhiều trường con (columns)
   * - 'divider': Dòng phân cách, chỉ cần title
   */
  valueType?:
    | 'text' // Input thường
    | 'textarea' // Ô nhập nhiều dòng
    | 'digit' // Số (input number)
    | 'money' // Tiền tệ
    | 'date' // Chọn ngày
    | 'dateTime' // Chọn ngày giờ
    | 'select' // Dropdown
    | 'radio' // Radio group
    | 'checkbox' // Checkbox
    | 'switch' // Công tắc
    | 'password' // Mật khẩu
    | 'email' // Email
    | 'phone' // Số điện thoại
    | 'url' // URL
    | 'time' // Thời gian
    | 'slider' // Thanh kéo
    | 'rate' // Đánh giá
    | 'progress' // Tiến độ
    | 'percent' // Phần trăm
    | 'jsonCode' // Editor JSON
    | 'code' // Editor code
    | 'avatar' // Upload avatar
    | 'image' // Upload ảnh
    | 'cascader' // Chọn nhiều cấp
    | 'treeSelect' // Chọn dạng cây
    | 'group' // Nhóm trường
    | 'divider'; // Dòng phân cách
  /** Placeholder cho input/select... */
  fieldProps?: any;
  /** Validate, custom props cho Form.Item */
  formItemProps?: any;
  /** Bắt buộc nhập */
  required?: boolean;
  /** Enum cho select/radio/checkbox */
  valueEnum?: Record<string, string>;
  /** Request async cho select/cascader/treeSelect */
  request?: () => Promise<any[]>;
  /** Nếu là group thì columns là mảng con */
  columns?: ColumnSchema[];
  /** Nếu là divider thì chỉ cần title */
  /** Các props mở rộng khác */
  [key: string]: any;
  /**
   * dependencies: Danh sách các trường phụ thuộc, khi giá trị các trường này thay đổi thì fieldProps sẽ được gọi lại
   * Thường dùng cho các trường cần enable/disable động hoặc thay đổi props theo giá trị trường khác
   * VD: dependencies: ['email']
   */
  dependencies?: string[];
};
