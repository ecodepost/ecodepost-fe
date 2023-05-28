import { Fragment, useEffect, useState } from 'react';
import { history, useIntl, useLocation } from 'umi';
import styles from './SettingsNavbar.less';
import { LeftOutlined } from '@ant-design/icons';
import { pushHome } from '@/utils/historypush/history';

interface NavBarTabProps {
  items: { name: string; key: string }[];
  chosenTab: string;
}

const NavBarTab: React.FC<NavBarTabProps> = (props) => {
  const { items, chosenTab } = props;

  return (
    <Fragment>
      {items.map((item) => (
        <div
          key={item.key}
          className={
            chosenTab === item.key
              ? styles.bar_group_content_item_acitve
              : styles.bar_group_content_item
          }
          data-key={item.key}
        >
          <span data-key={item.key}>{item.name}</span>
        </div>
      ))}
    </Fragment>
  );
};

const SettingsNavbar = () => {
  const [chosenTab, setChosenTab] = useState<string>(location.pathname.split('/')[2] || '');
  const intl = useIntl();
  const i = (id: string) => intl.formatMessage({ id });
  const NavBarTabItems = [
    [
      { name: i('settings.menuMap.account.profile'), key: 'profile' },
      { name: i('settings.menuMap.account.password'), key: 'password' },
    ],
  ];
  const locate = useLocation();
  useEffect(() => {
    if (locate.pathname === '/my') {
      setChosenTab('');
    }
  }, [locate.pathname]);

  return (
    <div className={styles.bar}>
      <div className={styles.nav_header}>
        <div className={styles.container_secondary_header} onClick={() => pushHome()}>
          <div>
            <LeftOutlined className={styles.container_header_icon} />
          </div>
          <div
            style={{
              alignSelf: 'center',
            }}
          >
            {i('cmtadmin.navbar.communitysetting.backToCommunity')}
          </div>
        </div>
      </div>
      <div className={styles.bar_group}>
        <span className={styles.bar_group_title}>{i('settings.menuMap.account')}</span>
        <div
          className={styles.bar_group_content}
          onClick={(e: any) => {
            const key = e.target.getAttribute('data-key');
            setChosenTab(key);
            switch (key) {
              case 'profile':
                history.push({ pathname: '/my/profile' }, locate.state);
                break;
              case 'password':
                history.push({ pathname: '/my/password' }, locate.state);
                break;
            }
          }}
        >
          <NavBarTab items={NavBarTabItems[0]} chosenTab={chosenTab} />
        </div>
      </div>
    </div>
  );
};

export default SettingsNavbar;
