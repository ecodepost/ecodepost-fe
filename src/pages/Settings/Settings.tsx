import type { IRoute } from 'umi';
import styles from './Settings.less';
import SettingsNavbar from './SettingsNavbar/SettingsNavbar';
import { Outlet } from '@@/exports';

const Settings = (props: IRoute) => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.content_navibar}>
          <SettingsNavbar />
        </div>
        <div className={styles.content_detail}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Settings;
