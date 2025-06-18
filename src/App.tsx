import React, { useState } from 'react';
import './styles/global.scss';
import { ThemeProvider } from './context/ThemeContext';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { store, AppDispatch, RootState } from './redux/store';
import { Layout, Menu, theme, ConfigProvider } from 'antd';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './page/login/login';
import { appRoutes, mapRoutesToMenuItems, NavigateHandler } from './shared/router';
import { useTranslation } from 'react-i18next';
import SelectDefault from './components/Select/SelectDefault/selectDefault';
import { fetchDataThunk } from './redux/thunk/fetchData';
import viVN from 'antd/es/locale/vi_VN';
import enUS from 'antd/es/locale/en_US';
const { Header, Content, Sider } = Layout;

interface AppProps {
  title?: string;
}

const AppMain: React.FC<AppProps> = () => {
  const [pendingNav, setPendingNav] = React.useState<string | null>(null);
  const [collapsed, setCollapsed] = React.useState(false);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const { t, i18n } = useTranslation();

  // Lấy state fetchData từ redux
  const fetchDataState = useSelector((state: RootState) => state.fetchData);

  React.useEffect(() => {
    if(!fetchDataState.loading ) {
       console.log('fetchDataState:', fetchDataState);
    }
  }, [fetchDataState]);

  React.useEffect(() => {
    dispatch(fetchDataThunk());
  }, [dispatch]);

  React.useEffect(() => {
    // Lấy theme từ localStorage khi load lại trang
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const menuItems = React.useMemo(() => mapRoutesToMenuItems(appRoutes, t), [t]);

  const languageOptions = [
    { label: <span><img src={require('./image/vn_flag.png')} alt="vi" style={{ width: 22, height: 16, objectFit: 'cover', marginRight: 8, borderRadius: 2, verticalAlign: 'middle' }} />Tiếng Việt</span>, value: 'vi' },
  ];

  const handleMenuClick = (e: { key: string }) => {
    setPendingNav(e.key);
  };

  const handleOk = () => {
    setOpen(false);
    // Xử lý logic xoá ở đây
  };

  const handleCancel = () => setOpen(false);

  const antdLocale = i18n.language === 'vi' ? viVN : enUS;

  // State theme cho ThemeProvider
  const [themeMode, setThemeMode] = React.useState(document.documentElement.getAttribute('data-theme') || 'light');

  // Khi đổi theme thì cập nhật cả ThemeProvider và localStorage
  const handleThemeChange = (theme: string) => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    setThemeMode(theme);
  };

  return (
    <ConfigProvider locale={antdLocale}>
        <ThemeProvider key={themeMode}>
          <BrowserRouter>
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
                          height: 36,
                          margin: '16px 0 16px 24px',
                          borderRadius: 6,
                          objectFit: 'contain',
                          flex: '0 0 auto',
                        }}
                      />
                      <div style={{ display: 'flex', alignItems: 'center', minWidth: 240, marginRight: 16, marginTop: 16, marginLeft: 'auto', gap: 12 }}>
                        <SelectDefault
                          options={languageOptions}
                          value={i18n.language}
                          onChange={lng => i18n.changeLanguage(lng as string)}
                          placeholder="Language"
                          showBorder={false}
                          showSearch={false}
                        />
                        <div style={{ minWidth: 90 }}>
                          <SelectDefault
                            options={[
                              { label: 'Light', value: 'light' },
                              { label: 'Dark', value: 'dark' },
                              { label: 'Pink', value: 'pink' },
                            ]}
                            value={themeMode}
                            onChange={theme => handleThemeChange(theme as string)}
                            placeholder="Theme"
                            showBorder={false}
                            showSearch={false}
                          />
                        </div>
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
      </ConfigProvider>
  );
};

const App: React.FC<AppProps> = (props) => (
  <Provider store={store}>
    <AppMain {...props} />
  </Provider>
);

export default App;
