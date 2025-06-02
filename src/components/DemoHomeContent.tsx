import React from 'react';
import ThemeToggle from './ThemeToggle';
import SelectDefault from './Select/SelectDefault/selectDefault';
import AccountInfoDefault from './AccountInfo/AccountInfoDefault';
import SelectLoadMore from './Select/SelectLoadMore/selectLoadMore';
import HomePage from './HomePage';
import { RootState } from '../redux/store';
import { useSelector } from 'react-redux';

const DemoHomeContent: React.FC = () => {
  const [selected, setSelected] = React.useState<string | number | undefined>(undefined);
  const options = [
    { label: 'Option 1', value: 1 },
    { label: 'Option 2', value: 2 },
    { label: 'Option 3', value: 3 },
  ];
  const apiState = useSelector((state: RootState) => state.api);

  return (
    <>
      <header>
        <h1>Demo Home</h1>
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
            await new Promise(res => setTimeout(res, 1000));
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
    </>
  );
};

export default DemoHomeContent;
