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

  React.useEffect(() => {
    dispatch(fetchData({ url: 'https://jsonplaceholder.typicode.com/todos/1' }));
  }, [dispatch]);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <ThemeProvider>
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
          <Menu theme="light" mode="inline" defaultSelectedKeys={['1']} items={items} />
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
              <header>
                <h1>{title}</h1>
                <p>Welcome to your React application with TypeScript, SCSS and LESS!</p>
                <ThemeToggle />
              </header>
              <div style={{ maxWidth: 300, margin: '24px auto' }}>
                <SelectDefault
                  label="Demo Select"
                  options={options}
                  value={selected}
                  onChange={setSelected}
                  placeholder="Chọn một option"
                />
              </div>
              <div style={{ maxWidth: 320, margin: '24px auto' }}>
                <AccountInfoDefault
                  name="Nguyễn Chi Long"
                  code="11904047"
                  avatarUrl="https://randomuser.me/api/portraits/men/32.jpg"
                />
              </div>
              <div style={{ maxWidth: 320, margin: '24px auto' }}>
                <SelectLoadMore
                  label="Demo Load More"
                  service={async ({ page, pageSize, keyword }) => {
                    // Fake API: returns 20 items per page, filtered by keyword
                    await new Promise(res => setTimeout(res, 1000)); // Add 1s delay to show loading
                    const all = Array.from({ length: 1000 }, (_, i) => ({
                      label: `Item ${i + 1}`,
                      value: i + 1,
                    })).filter(item => !keyword || item.label.toLowerCase().includes(keyword.toLowerCase()));
                    const start = (page - 1) * pageSize;
                    const end = start + pageSize;
                    return {
                      data: all.slice(start, end),
                      total: all.length,
                    };
                  }}
                  parseData={apiData => ({
                    options: apiData.data,
                    hasMore: apiData.data.length > 0 && apiData.data.length < apiData.total,
                  })}
                  value={selected}
                  onChange={setSelected}
                  placeholder="Chọn một mục (load more)"
                  pageSize={20}
                />
              </div>
              <div style={{ maxWidth: 320, margin: '24px auto' }}>
                <div style={{ padding: 12, background: '#f6f6f6', borderRadius: 8, marginBottom: 16 }}>
                  <b>API State Demo:</b>
                  {apiState.loading && <div>Loading...</div>}
                  {apiState.error && <div style={{ color: 'red' }}>Error: {apiState.error}</div>}
                  {apiState.data && (
                    <pre style={{ fontSize: 13, margin: 0 }}>{JSON.stringify(apiState.data, null, 2)}</pre>
                  )}
                </div>
              </div>
              <main>
                <HomePage />
              </main>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Ant Design ©{new Date().getFullYear()} Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    </ThemeProvider>
  );
};

const App: React.FC<AppProps> = (props) => (
  <Provider store={store}>
    <AppMain {...props} />
  </Provider>
);

export default App;