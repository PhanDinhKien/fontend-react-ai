// src/shared/router.tsx
// Định nghĩa các route dùng chung cho hệ thống
import React from 'react';
import DemoHomeContent from '../page/home/DemoHomeContent';
import AboutPage from '../page/home/AboutPage';
import StudentListContent from '../page/home/StudentListContent';
import { UserOutlined, VideoCameraOutlined, UploadOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

export interface AppRoute {
  /** Route path for router and menu */
  path: string;
  /** React element to render for this route */
  element: React.ReactNode;
  /** Menu label */
  label: string;
  /** Unique key for menu and router */
  key: string;
  /** Menu icon */
  icon?: React.ReactNode;
  /** Submenu routes */
  children?: AppRoute[];
  /** Hide this menu item if true */
  hide?: boolean;
}

export const appRoutes: AppRoute[] = [
  {
    path: '/',
    element: <DemoHomeContent />, 
    label: 'home', // use translation key
    key: '1',
    icon: <UserOutlined />,
  },
  {
    path: '/about',
    element: <AboutPage />, 
    label: 'about', // use translation key
    key: '2',
    icon: <VideoCameraOutlined />,
    hide: false,
  },
  {
    path: '/upload',
    element: <div>Upload Page</div>,
    label: 'upload', // use translation key
    key: '3',
    icon: <UploadOutlined />,
    hide: true,
    children: [
      {
        path: '/upload/3-1',
        element: <div>Subnav 3-1</div>,
        label: 'upload_3_1', // add translation key if needed
        key: '3-1',
      },
      {
        path: '/upload/3-2',
        element: <div>Subnav 3-2</div>,
        label: 'upload_3_2', // add translation key if needed
        key: '3-2',
      },
      {
        path: '/upload/3-3',
        element: <div>Subnav 3-3</div>,
        label: 'upload_3_3', // add translation key if needed
        key: '3-3',
        hide: true,
      },
    ],
  },
  {
    path: '/students',
    element: <StudentListContent />,
    label: 'studentList.menu', // dùng key i18n cho menu
    key: '4',
    icon: <UserOutlined />,
  },
];

// Add translation keys for submenu if needed in your en.json/vi.json:
// "upload_3_1": "Subnav 3-1",
// "upload_3_2": "Subnav 3-2",
// "upload_3_3": "Subnav 3-3",

// check ẩn hiển thị menu, check permission của menu
export const mapRoutesToMenuItems = (routes: AppRoute[], t?: (key: string) => string): any[] => {
  return routes
    .filter(route => !route.hide)
    .map(route => {
      const { key, icon, children, label } = route;
      return {
        key,
        icon,
        label: t ? t(label) : label, // Use key for translation instead of label
        children: children ? mapRoutesToMenuItems(children, t) : undefined,
      };
    });
}

export const NavigateHandler: React.FC<{ pendingNav: string | null; setPendingNav: (v: string | null) => void }> = ({ pendingNav, setPendingNav }) => {
  const navigate = useNavigate();
  React.useEffect(() => {
    if (pendingNav) {
      if (pendingNav === '1') navigate('/');
      else if (pendingNav === '2') navigate('/about');
      else if (pendingNav === '4') navigate('/students');
      // Thêm các điều hướng khác nếu có
      setPendingNav(null);
    }
  }, [pendingNav, navigate, setPendingNav]);
  return null;
};