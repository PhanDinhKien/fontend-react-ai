// src/shared/router.tsx
// Định nghĩa các route dùng chung cho hệ thống
import React from 'react';
import DemoHomeContent from '../components/DemoHomeContent';
import AboutPage from '../components/AboutPage';
import { UserOutlined, VideoCameraOutlined, UploadOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

export interface AppRoute {
  /** Route path for router and menu */
  path: string;
  /** React element to render for this route */
  element: React.ReactNode;
  /** Menu label */
  label?: string;
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
    label: 'Home',
    key: '1',
    icon: <UserOutlined />,
  },
  {
    path: '/about',
    element: <AboutPage />, 
    label: 'About',
    key: '2',
    icon: <VideoCameraOutlined />,
    hide: false,
  },
  {
    path: '/upload',
    element: <div>Upload Page</div>,
    label: 'Upload',
    key: '3',
    icon: <UploadOutlined />,
    hide: true,
    children: [
      {
        path: '/upload/3-1',
        element: <div>Subnav 3-1</div>,
        label: 'Subnav 3-1',
        key: '3-1',
      },
      {
        path: '/upload/3-2',
        element: <div>Subnav 3-2</div>,
        label: 'Subnav 3-2',
        key: '3-2',
      },
      {
        path: '/upload/3-3',
        element: <div>Subnav 3-3</div>,
        label: 'Subnav 3-3',
        key: '3-3',
        hide: true,
      },
    ],
  },
];

// check ẩn hiển menu, check permission của menu
export const mapRoutesToMenuItems = (routes: AppRoute[]): any[] => {
  return routes
    .filter(route => !route.hide)
    .map(route => {
      const { key, label, icon, children } = route;
      return {
        key,
        icon,
        label,
        children: children ? mapRoutesToMenuItems(children) : undefined,
      };
    });
}

export const NavigateHandler: React.FC<{ pendingNav: string | null; setPendingNav: (v: string | null) => void }> = ({ pendingNav, setPendingNav }) => {
  const navigate = useNavigate();
  React.useEffect(() => {
    if (pendingNav) {
      if (pendingNav === '1') navigate('/');
      else if (pendingNav === '2') navigate('/about');
      // Thêm các điều hướng khác nếu có
      setPendingNav(null);
    }
  }, [pendingNav, navigate, setPendingNav]);
  return null;
};