import React from 'react';
import SelectDefault from '../../components/Select/SelectDefault/selectDefault';
import AccountInfoDefault from '../../components/AccountInfo/AccountInfoDefault';
import SelectLoadMore from '../../components/Select/SelectLoadMore/selectLoadMore';
import { Form } from 'antd';
import { useTranslation } from 'react-i18next';
import ProForm from '@ant-design/pro-form/es';

const DemoHomeContent: React.FC = () => {
  const [selected, setSelected] = React.useState<string | number | undefined>(undefined);
  const options = [
    { label: 'Option 1', value: 1 },
    { label: 'Option 2', value: 2 },
    { label: 'Option 3', value: 3 },
  ];

  const [formAtnd] = Form.useForm();

  const { t } = useTranslation();

  return (
    <>
      <header>
        <h1>{t('demo_home_title')}</h1>
        <p>{t('demo_home_welcome')}</p>
      </header>
      <div style={{ maxWidth: 300, margin: '24px auto' }}>
        <SelectDefault
          label={t('demo_select_label')}
          options={options.map(opt => ({ ...opt, label: t(`option_${opt.value}`) }))}
          value={selected}
          onChange={setSelected}
          placeholder={t('select_option_placeholder')}
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
        <ProForm form={formAtnd} submitter={false} layout="vertical">
          <SelectLoadMore
            label={t('demo_load_more_label')}
            service={async ({ page, pageSize, keyword }) => {
              await new Promise(res => setTimeout(res, 5000));
              const all = Array.from({ length: 5000 }, (_, i) => ({
                label: t('item_label', { number: i + 1 }),
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
            placeholder={t('select_load_more_placeholder')}
            pageSize={20}
          />
        </ProForm>

      </div>

    </>
  );
};

export default DemoHomeContent;
