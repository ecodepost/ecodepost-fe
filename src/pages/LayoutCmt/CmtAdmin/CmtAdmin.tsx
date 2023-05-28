import styles from './CmtAdmin.less';
import CmtAdminNavbar from './CmtAdminNavbar/CmtAdminNavbar';
import ColorNavbar from '@/pages/CmtAdmin/ColorNavbar/ColorNavbar';
import GroupHeader from '@/components/Header/GroupHeader/GroupHeader';
import { Outlet } from '@@/exports';
import { useIntl, useModel } from '@umijs/max';

const CmtAdmin = () => {
  const intl = useIntl();
  const i = (id: string) => intl.formatMessage({ id });
  const { getCurrentTitle } = useModel('community');
  document.title = getCurrentTitle(i('title.base'), {
    title_setting: i('title.setting'),
  });

  // console.log((location.pathname).includes('colorSetting'))
  return (
    <div className={styles.cmtAdmin}>
      <div className={styles.cmtAdmin_navbar}>
        <CmtAdminNavbar />
      </div>
      <div className={styles.container_content}>
        <GroupHeader />
        <div className={styles.cmtAdmin_content}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default CmtAdmin;
