import React from 'react';
import WarningModal from '../../components/Modal/Warning';
import { WarningCircle } from 'phosphor-react';

const AboutPage: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <div>
      <h2>About Page</h2>
      <p>This is a sample About page. You can put any content here.</p>
      <button onClick={() => setOpen(true)}>Show Warning Modal</button>
      <WarningModal
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        iconWarning={<WarningCircle size={20} color="#F57921" weight="fill" />}
        content="Bạn đang thực hiện thao tác cảnh báo!"
      />
    </div>
  );
};

export default AboutPage;
