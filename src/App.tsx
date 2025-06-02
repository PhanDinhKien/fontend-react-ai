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

const { Header, Content, Sider } = Layout;

interface AppProps {
  title?: string;
}

const AppMain: React.FC<AppProps> = () => {
  const [pendingNav, setPendingNav] = React.useState<string | null>(null);
  const [collapsed, setCollapsed] = React.useState(false);
  const dispatch = useDispatch<AppDispatch>();

  React.useEffect(() => {
    dispatch(fetchData({ url: 'https://jsonplaceholder.typicode.com/todos/1' }));
  }, [dispatch]);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const menuItems = React.useMemo(() => mapRoutesToMenuItems(appRoutes), []);

  return (
    <ThemeProvider>
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/*"
            element={
              <Layout style={{ height: 'calc(100vh - 0px)' }}>
                <Sider
                  width={260}
                  theme='light'
                  collapsible
                  collapsed={collapsed}
                  onCollapse={setCollapsed}
                >
                  <div className="demo-logo-vertical" style={{ height: 32, margin: 16, borderRadius: 6 }} />
                  <Menu
                    theme="light"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    items={menuItems}
                    onClick={(e) => setPendingNav(e.key)}
                    className={collapsed ? 'menu-collapsed' : ''}
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
                        {appRoutes.map(route => (
                          <Route key={route.key} path={route.path} element={route.element} />
                        ))}
                      </Routes>
                      <NavigateHandler pendingNav={pendingNav} setPendingNav={setPendingNav} />
                    </div>
                  </Content>
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