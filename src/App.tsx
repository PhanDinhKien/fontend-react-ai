import React from 'react';
import './styles/global.scss';
import { ThemeProvider } from './context/ThemeContext';
import { Provider, useDispatch } from 'react-redux';
import { store, AppDispatch } from './redux/store';
import { fetchData } from './redux/apiSlice';
import { Layout, Menu, theme } from 'antd';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './page/login/login';
import { appRoutes, mapRoutesToMenuItems, NavigateHandler } from './shared/router';
import { useTranslation } from 'react-i18next';
import SelectDefault from './components/Select/SelectDefault/selectDefault';

const { Header, Content, Sider } = Layout;

interface AppProps {
  title?: string;
}

const AppMain: React.FC<AppProps> = () => {
  const [pendingNav, setPendingNav] = React.useState<string | null>(null);
  const [collapsed, setCollapsed] = React.useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const { t, i18n } = useTranslation();

  React.useEffect(() => {
    dispatch(fetchData({ url: 'https://jsonplaceholder.typicode.com/todos/1' }));
  }, [dispatch]);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const menuItems = React.useMemo(() => mapRoutesToMenuItems(appRoutes, t), [t]);

  const languageOptions = [
    { label: 'English', value: 'en' },
    { label: 'Tiếng Việt', value: 'vi' },
  ];

  // Lấy tiêu đề từ menu đang chọn
  const [pageTitle, setPageTitle] = React.useState<string>(t('home'));

  React.useEffect(() => {
    // Cập nhật tiêu đề khi pendingNav thay đổi
    if (pendingNav) {
      const found = appRoutes.find(r => r.key === pendingNav);
      if (found) setPageTitle(t(found.key));
    }
  }, [pendingNav, t]);

  React.useEffect(() => {
    // Khi vào trang đầu tiên
    const homeRoute = appRoutes.find(r => r.key === '1');
    const label = homeRoute?.label ? t(homeRoute.label) : t('home');
    setPageTitle(label);
    document.title = label;
  }, [t]);

  const handleMenuClick = (e: { key: string }) => {
    setPendingNav(e.key);
    const found = appRoutes.find(r => r.key === e.key);
    debugger; 
    if (found) {
      // Ưu tiên label nếu có, fallback về key
      const label = found.label ? t(found.label) : t(found.key);
      setPageTitle(label);
      document.title = label;
    }
  };

  return (
    <ThemeProvider>
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/*"
            element={
              <Layout>
                <Header
                  style={{
                    padding: 0,
                    background: colorBgContainer,
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    boxShadow: '0px 2px 15px 0px #0C429926',
                    borderBottom: '1px solid #e5e7eb',
                  }}
                >
                  <img
                    src={require('./image/logo.png')}
                    alt="Logo"
                    style={{
                      height: 32,
                      margin: '16px 0 16px 24px',
                      borderRadius: 6,
                      objectFit: 'contain',
                      flex: '0 0 auto',
                    }}
                  />
                  <div style={{ minWidth: 120, marginRight: 16, marginTop: 16, marginLeft: 'auto' }}>
                    <SelectDefault
                      options={languageOptions}
                      value={i18n.language}
                      onChange={lng => i18n.changeLanguage(lng as string)}
                      placeholder="Language"
                    />
                  </div>
                </Header>
                <Layout style={{ height: 'calc(100vh - 64px)' }}>
                  <Sider
                    width={260}
                    theme="light"
                    collapsible
                    collapsed={collapsed}
                    onCollapse={setCollapsed}
                    style={{ borderRight: '1px solid #e5e7eb' }}
                  >
                    <Menu
                      theme="light"
                      mode="inline"
                      defaultSelectedKeys={['1']}
                      items={menuItems}
                      onClick={handleMenuClick}
                      className={collapsed ? 'menu-collapsed' : ''}
                    />
                  </Sider>
                  <Layout>
                    <Content>
                      <div
                        style={{
                          padding: 24,
                          minHeight: 360,
                          background: colorBgContainer,
                        }}
                      >
                        <Routes>
                          {appRoutes.map(route => (
                            <Route key={route.key} path={route.path} element={route.element} />
                          ))}
                        </Routes>
                        <NavigateHandler pendingNav={pendingNav} setPendingNav={setPendingNav} />
                      </div>
                    </Content>
                  </Layout>
                </Layout>
              </Layout>
            }
          />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

const App: React.FC<AppProps> = (props) => (
  <Provider store={store}>
    <AppMain {...props} />
  </Provider>
);

export default App;