import styles from './ColorNavbar.less';
import { Avatar, Dropdown } from 'antd';
import { history, useIntl, useModel, useParams } from 'umi';
import { DownOutlined, LeftOutlined } from '@ant-design/icons';
import CommunitySetting from '@/pages/CommunitySidebar/CommunitySetting/CommunitySetting';
import ColorPick from '@/pages/CmtAdmin/ColorNavbar/ColorPick/ColorPick';

const ColorNavbar = () => {
  const intl = useIntl();
  const i = (id: string) => intl.formatMessage({ id });
  const {
    initialState: { currentUser },
  } = useModel('@@initialState');
  return (
    <div className={styles.container}>
      <div
        className={styles.container_secondary_header}
        onClick={() => {
          history.push(`/admin/setting/summary`);
        }}
      >
        <div className={styles.container_header_logo_wrap}>
          <LeftOutlined className={styles.container_header_icon} />
        </div>
        <div
          style={{
            marginLeft: '10px',
            alignSelf: 'center',
          }}
        >
          {i('cmtadmin.community.backToColorSetting')}
        </div>
      </div>
      <ColorPick />
    </div>
  );
};

export default ColorNavbar;
