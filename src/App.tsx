import React from 'react';
import './styles/global.scss';
import HomePage from './components/HomePage';
import { ThemeProvider } from './context/ThemeContext';
import ThemeToggle from './components/ThemeToggle';
import SelectDefault from './components/Select/SelectDefault/selectDefault';
import AccountInfoDefault from './components/AccountInfo/AccountInfoDefault';
import SelectLoadMore from './components/Select/SelectLoadMore/selectLoadMore';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { store, RootState, AppDispatch } from './redux/store';
import { fetchData } from './redux/apiSlice';
import { Layout, Menu, theme } from 'antd';
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import DemoHomeContent from './components/DemoHomeContent';
import AboutPage from './components/AboutPage';

const { Header, Content, Footer, Sider } = Layout;

const items = [
  {
    key: '1',
    icon: <UserOutlined />,
    label: 'nav 1',
  },
  {
    key: '2',
    icon: <VideoCameraOutlined />,
    label: 'nav 2',
  },
  {
    key: '3',
    icon: <UploadOutlined />,
    label: 'nav 3',
    children: [
      {
        key: '3-1',
        label: 'Subnav 3-1',
      },
      {
        key: '3-2',
        label: 'Subnav 3-2',
      },
      {
        key: '3-3',
        label: 'Subnav 3-3',
      },
    ],
  },
];

interface AppProps {
  title?: string;
}

const AppMain: React.FC<AppProps> = ({ title = 'React App' }) => {
  const [selected, setSelected] = React.useState<string | number | undefined>(undefined);
  const options = [
    { label: 'Option 1', value: 1 },
    { label: 'Option 2', value: 2 },
    { label: 'Option 3', value: 3 },
  ];

  const dispatch = useDispatch<AppDispatch>();
  const apiState = useSelector((state: RootState) => state.api);
  const [pendingNav, setPendingNav] = React.useState<string | null>(null);

  React.useEffect(() => {
    dispatch(fetchData({ url: 'https://jsonplaceholder.typicode.com/todos/1' }));
  }, [dispatch]);

  const handleMenuClick = (e: any, navigate: (path: string) => void) => {
    if (e.key === '1') navigate('/');
    else if (e.key === '2') navigate('/about');
    // Thêm các điều hướng khác nếu có
  };

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <ThemeProvider>
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Layout style={{ minHeight: '100vh' }}>
          <Sider
            theme='light'
            breakpoint="lg"
            collapsedWidth="1"
            onBreakpoint={(broken) => {
              console.log(broken);
            }}
            onCollapse={(collapsed, type) => {
              console.log(collapsed, type);
            }}
          >
            <div className="demo-logo-vertical" style={{ height: 32, margin: 16, borderRadius: 6 }} />
            <Menu
              theme="light"
              mode="inline"
              defaultSelectedKeys={['1']}
              items={items}
              onClick={(e) => setPendingNav(e.key)}
            />
          </Sider>
          <Layout>
            <Header style={{ padding: 0, background: colorBgContainer }} />
            <Content style={{ margin: '24px 16px 0' }}>
              <div
                style={{
                  padding: 24,
                  minHeight: 360,
                  background: colorBgContainer,
                  borderRadius: borderRadiusLG,
                }}
              >
                <Routes>
                  <Route path="/" element={
                    <DemoHomeContent
                      title={title}
                      selected={selected}
                      setSelected={setSelected}
                      options={options}
                    />
                  } />
                  <Route path="/about" element={<AboutPage />} />
                </Routes>
                <NavigateHandler pendingNav={pendingNav} setPendingNav={setPendingNav} />
              </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
              Ant Design ©{new Date().getFullYear()} Created by Ant UED
            </Footer>
          </Layout>
        </Layout>
      </BrowserRouter>
    </ThemeProvider>
  );
};

const NavigateHandler: React.FC<{ pendingNav: string | null; setPendingNav: (v: string | null) => void }> = ({ pendingNav, setPendingNav }) => {
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

const App: React.FC<AppProps> = (props) => (
  <Provider store={store}>
    <AppMain {...props} />
  </Provider>
);

export default App;