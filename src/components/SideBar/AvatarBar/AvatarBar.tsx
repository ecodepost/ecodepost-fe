import { logout } from '@/services/user/api';
import { Avatar, Modal } from 'antd';
import classNames from 'classnames';
import { history, useModel, useParams } from 'umi';
import styles from './AvatarBar.less';
import { messageInfo } from '@/components/Message/Message';
import { pushUserPage } from '@/utils/historypush/history';
import NeedToLogin from '@/components/NeedToLogin/NeedToLogin';

const AvatarBar = () => {
  const { initialState } = useModel('@@initialState');

  const handleLogout = () => {
    Modal.confirm({
      content: '确定退出登录吗？',
      zIndex: 999,
      async onOk() {
        try {
          const res = await logout();
          if (res.code === 0) {
            messageInfo({
              content: '退出登录成功',
              type: 'success',
            });
            location.href = `${DOMAIN}/api/oauth/login`;
          } else {
            messageInfo({
              content: res.msg,
              type: 'error',
            });
          }
        } catch (err) {
          messageInfo({
            content: '退出登录失败',
            type: 'error',
          });
        }
      },
    });
  };

  return (
    <div className={styles.bar}>
      {!initialState?.isOnline() ? (
        <NeedToLogin login="登录" signup="注册" checkLogin={initialState?.checkLogin} />
      ) : (
        <>
          <div className={styles.bar_header}>
            {initialState?.currentUser?.avatar ? (
              <Avatar size={48} src={initialState?.currentUser?.avatar} />
            ) : (
              <Avatar icon={<i className="iconfont icon-chengyuan" />} />
            )}
            <span className={styles.bar_header_name}>{initialState?.currentUser?.nickname}</span>
          </div>
          <div className={styles.bar_content}>
            {(
              <div
                className={styles.bar_content_item}
                onClick={() => {
                  pushUserPage(initialState?.currentUser?.name);
                  // resetCommunityModel();
                  // history.push(`/profile/${initialState?.currentUser?.name}`);
                }}
              >
                <i
                  className={classNames('iconfont', 'icon-shouye', styles.bar_content_item_icon)}
                />
                <span className={styles.bar_content_item_text}>个人空间</span>
              </div>
            )}
            {/* <div className={styles.bar_content_item}>
          <i className={classNames('iconfont', 'icon-haoyou', styles.bar_content_item_icon)}/>
          <span className={styles.bar_content_item_text}>我的好友</span>
        </div> */}
            <div className={styles.divider} />
            {/*<div className={styles.bar_content_item}>*/}
            {/*  <i className={classNames('iconfont', 'icon-jifen', styles.bar_content_item_icon)} />*/}
            {/*  <span className={styles.bar_content_item_text}>积分中心</span>*/}
            {/*</div>*/}
            <div
              className={styles.bar_content_item}
              onClick={() => {
                // resetCommunityModel();
                history.push({
                  pathname: '/my/profile',
                  state: {
                  },
                });
              }}
            >
              <i className={classNames('iconfont', 'icon-shezhi', styles.bar_content_item_icon)} />
              <span className={styles.bar_content_item_text}>设置</span>
            </div>
            <div className={styles.divider} />
            <div className={styles.bar_content_item} onClick={() => handleLogout()}>
              <i className={classNames('iconfont', 'icon-tuichu', styles.bar_content_item_icon)} />
              <span className={styles.bar_content_item_text}>退出登录</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AvatarBar;
