import { Avatar } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import { history, NavLink, useIntl, useModel } from 'umi';
import styles from './CmtAdminNavbar.less';

const CmtAdminNavbar = () => {
  const {
    initialState: { currentCmt },
  } = useModel('@@initialState');
  const intl = useIntl();
  const i = (id: string) => intl.formatMessage({ id });
  const { cmtInfo: currentCommunity } = currentCmt;
  return (
    <div className={styles.nav}>
      <div
        className={styles.container_header}
        onClick={() => {
          history.push(`/`);
        }}
      >
        {!currentCommunity?.logo || currentCommunity?.logo == '' ? (
          <Avatar
            shape="square"
            className={styles.container_header_logo}
            icon={currentCommunity?.name?.[0]}
          />
        ) : (
          <img className={styles.container_header_logo} src={currentCommunity?.logo} alt="" />
        )}
        <span
          className={styles.container_header_text}
          style={{
            marginRight: 'auto',
          }}
        >
          {currentCommunity?.name}
        </span>
      </div>
      <div
        className={styles.container_secondary_header}
        onClick={() => {
          history.push(`/`);
        }}
      >
        <div>
          <LeftOutlined className={styles.container_header_icon} />
        </div>
        <div
          style={{
            alignSelf: 'center',
            marginLeft: '8px',
          }}
        >
          {i('cmtadmin.navbar.communitysetting.backToCommunity')}
        </div>
      </div>
      <div className={styles.nav_body}>
        <div className={styles.nav_content}>
          <div className={styles.nav_item}>
            <div className={styles.nav_item_header}>
              <i className={classNames('iconfont', 'icon-shouye', styles.nav_item_header_icon)} />
              <span className={styles.nav_item_header_title}>
                {i('cmtadmin.navbar.communitysetting.title')}
              </span>
            </div>
            <NavLink
              exact
              to={`/admin/setting/summary`}
              activeClassName={styles.nav_item_active}
              className={styles.nav_item_content}
            >
              <span>{i('cmtadmin.navbar.communitysetting.summary')}</span>
            </NavLink>
            <NavLink
              exact
              to={`/admin/setting/home`}
              activeClassName={styles.nav_item_active}
              className={styles.nav_item_content}
            >
              <span>{i('cmtadmin.navbar.communitysetting.home')}</span>
            </NavLink>
            <NavLink
              exact
              to={`/admin/setting/colorSetting`}
              activeClassName={styles.nav_item_active}
              className={styles.nav_item_content}
            >
              <span>{i('cmtadmin.navbar.communitysetting.colorSetting')}</span>
            </NavLink>
          </div>
          <div className={styles.nav_item}>
            <div className={styles.nav_item_header}>
              <i
                className={classNames('iconfont', 'icon-chengyuan', styles.nav_item_header_icon)}
              />
              <span className={styles.nav_item_header_title}>
                {i('cmtadmin.navbar.admin.title')}
              </span>
            </div>
            <NavLink
              exact
              to={`/admin/manage/log`}
              activeClassName={styles.nav_item_active}
              className={styles.nav_item_content}
            >
              <span>{i('cmtadmin.navbar.admin.updatelog')}</span>
            </NavLink>
            <NavLink
              exact
              to={`/admin/manage/superAdmin`}
              activeClassName={styles.nav_item_active}
              className={styles.nav_item_content}
            >
              <span>{i('cmtadmin.navbar.admin.setting')}</span>
            </NavLink>
            <NavLink
              to={`/admin/manage/spaceAdmin`}
              activeClassName={styles.nav_item_active}
              className={styles.nav_item_content}
            >
              <span>{i('cmtadmin.navbar.memberManagement.memberGroup')}</span>
            </NavLink>
          </div>
          <div className={styles.nav_item}>
            <div className={styles.nav_item_header}>
              <i className={classNames('iconfont', 'icon-haoyou', styles.nav_item_header_icon)} />
              <span className={styles.nav_item_header_title}>
                {i('cmtadmin.navbar.memberManagement.title')}
              </span>
            </div>
            <NavLink
              to={`/admin/manage/memberList`}
              activeClassName={styles.nav_item_active}
              className={styles.nav_item_content}
            >
              <span>{i('cmtadmin.navbar.memberManagement.memberList')}</span>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CmtAdminNavbar;
