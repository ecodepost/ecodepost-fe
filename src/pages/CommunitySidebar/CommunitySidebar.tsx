import { Avatar, Badge, Dropdown, Input, Popover, Skeleton } from 'antd';
import AvatarBar from '@/components/SideBar/AvatarBar/AvatarBar';
import React, { memo, useEffect, useState } from 'react';
import styles from './CommunitySidebar.less';
import { history, useIntl, useModel } from '@umijs/max';
import CommunitySetting from './CommunitySetting/CommunitySetting';
import classNames from 'classnames';
import PopContent from '@/components/Notice/PopContent/PopContent';
import { pushSpace } from '@/utils/historypush/history';
import SpaceTree from '@/components/SpaceTree/SpaceTree';


const CommunitySidebar: React.FC = (): JSX.Element => {
  console.log('CommunitySidebar Update');
  const {
    spaceAll,
    currentCommunityLoading,
    selectedSpaceGroup,
    selectedSpace,
    clearSelectedSpace,
    setSelectedSpaceGroup,
    clearSelectedSpaceGroup,
  } = useModel('community');
  const { unreadCount } = useModel('user');
  const {
    initialState: { currentCmt },
  } = useModel('@@initialState');
  const { cmtInfo: currentCommunity } = currentCmt;

  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [cmtSetting, setCmtSetting] = useState<boolean>(false);
  const {
    initialState: { currentUser },
  } = useModel('@@initialState');
  const intl = useIntl();
  const i = (id: string) => intl.formatMessage({ id });

  const onResize = () => {
    // 获取当前屏幕宽度
    const clientWidth = document.body.clientWidth;
    // 判断当前屏幕宽度是否小于 1200 像素
    if (clientWidth < 1200) {
      setCollapsed(true);
    } else {
      setCollapsed(false);
    }
  };

  useEffect(() => {
    // setTreeRender(false);
    window.addEventListener('resize', onResize);
    setTimeout(() => {
      // setTreeRender(true);
    }, 0);
    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);

  // 监听 url 的变化
  // useEffect(() => {
  //   /// 如果当前 url 是 /c/xxx/s/xxx/d/xxx 的形式，那么 collapsed = true
  //   if (history.location.pathname.includes(`/d/`)) {
  //     setCollapsed(false);
  //   }
  // }, [location.pathname]);

  const renderNotification = () => {
    return (
      spaceAll && (
        <Popover
          getPopupContainer={(triggerNode) => triggerNode?.parentNode as HTMLElement}
          placement="rightTop"
          content={<PopContent />}
          trigger="click"
        >
          <div className={styles.container_content_main}>
            <i
              className={classNames(
                'iconfont',
                'icon-tongzhi',
                styles.container_content_icon,
                styles.title_icon,
              )}
            />
            <span className={styles.container_content_text}>{i('cmtSidebar.notice')}</span>
            <Badge count={unreadCount ? unreadCount : 0} className={styles.spanBadgeUnfold} />
          </div>
        </Popover>
      )
    );
  };
  // 折叠的sidebar
  const CollapsedDiv = () => {
    return (
      <div className={styles.collapsed}>
        <div
          className={styles.divDrawerHandleDetecterFold}
          onMouseOver={(e) => {
            e.preventDefault();
            if (e.target.children[0]) {
              e.target.children[0].style.opacity = 0;
            }
          }}
          onMouseOut={(e) => {
            e.preventDefault();
            if (e.target.children[0]) {
              e.target.children[0].style.opacity = 1;
            }
          }}
        >
          <img
            src={require('../../static/drawer_unfold.png')}
            className={styles.imgDrawerHandleUnfold}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setCollapsed(false);
            }}
            onMouseOver={(e) => {
              e.preventDefault();
              e.stopPropagation();
              e.target.style.opacity = 1;
            }}
            onMouseOut={(e) => {
              e.preventDefault();
              e.stopPropagation();
              e.target.opacity = 0;
            }}
          />
        </div>
        <div className={styles.collapsed_body}>
          <div className={styles.collapsed_body_header}>
            <i
              className={classNames(
                'iconfont',
                'icon-shouye',
                location.pathname === `/`
                  ? styles.collapsed_body_header_iconActive
                  : styles.collapsed_body_header_icon,
              )}
              onClick={() => {
                clearSelectedSpaceGroup();
                clearSelectedSpace();
                history.push(`/`);
              }}
            />
          </div>
          <Skeleton
            loading={currentCommunityLoading}
            paragraph={{ rows: 20, width: 10 }}
            style={{
              height: 'calc(100% - 32px)',
              maxHeight: 'calc(100% - 32px)',
              overflow: 'clip',
            }}
          >
            <div className={styles.collapsed_body_content}>
              {spaceAll &&
                spaceAll.tree.map((group) => {
                  const isActive = selectedSpaceGroup?.guid === group.guid;
                  return (
                    <Popover
                      placement="rightTop"
                      key={group.guid}
                      content={group.children?.map((item: any, key: any) => {
                        return (
                          <div
                            className={
                              item.guid === selectedSpace?.guid
                                ? styles.popover_content_item_active
                                : styles.popover_content_item
                            }
                            onClick={() => {
                              pushSpace(item.guid);
                            }}
                            key={key}
                          >
                            {item.icon} {item.name}
                          </div>
                        );
                      })}
                    >
                      <div
                        className={
                          isActive
                            ? styles.collapsed_body_content_item_active
                            : styles.collapsed_body_content_item
                        }
                        key={group.guid}
                      >
                        <Avatar
                          className={styles.collapsed_body_content_item_ava}
                          shape="square"
                          size={32}
                          icon={group.name?.[0]}
                          /** @ts-ignore */
                          onClick={() => {
                            setSelectedSpaceGroup(group.guid);
                            history.push(`/g/${group.guid}`);
                          }}
                        />
                      </div>
                    </Popover>
                  );
                })}
            </div>
          </Skeleton>
        </div>
      </div>
    );
  };

  // 展开的sidebar
  const ExpandDiv = () => {
    return (
      <div
        className={classNames(
          styles.container,
          !currentCommunity.isShowSidebar ? styles.container_big_width : '',
        )}
      >
        {/* 顶部社区头部到logo显示 */}
        {/* 下拉菜单，设置社区的相关信息，可以进入到社区管理后台 */}
        <Skeleton
          loading={currentCommunityLoading}
          paragraph={true}
          style={{
            height: '64px',
            overflow: 'clip',
          }}
        >
          <Dropdown
            overlay={
              <CommunitySetting
                cmtInfo={currentCommunity}
                setCmtSettings={() => {
                  setCmtSetting(false);
                }}
              />
            }
            trigger={['click']}
            placement="bottom"
            getPopupContainer={(triggerNode) => triggerNode?.parentNode as HTMLDivElement}
            onOpenChange={(visible) => {
              setCmtSetting(visible);
            }}
            open={cmtSetting}
          >
            <div className={styles.container_header}>
              <div>
                {!currentCommunity.isShowSidebar ? (
                  !currentCommunity?.logo || currentCommunity?.logo == '' ? (
                    <Avatar
                      shape="square"
                      className={styles.container_header_logo}
                      icon={currentCommunity?.name?.[0]}
                    />
                  ) : (
                    <img
                      className={styles.container_header_logo}
                      src={currentCommunity?.logo}
                      alt=""
                    />
                  )
                ) : null}
                <span className={styles.container_header_text}>{currentCommunity?.name}</span>
              </div>
              <i
                className={classNames(
                  'iconfont',
                  'icon-shequmingxiala',
                  styles.container_header_icon,
                )}
              />
            </div>
          </Dropdown>
        </Skeleton>
        <div
          className={styles.divDrawerHandleDetecterUnfold}
          onMouseOver={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (e.target.children[0]) {
              e.target.children[0].style.opacity = 1;
            }
          }}
          onMouseOut={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (e.target.children[0]) {
              e.target.children[0].style.opacity = 0;
            }
          }}
        >
          <img
            src={require('../../static/drawer_fold.png')}
            className={styles.imgDrawerHandleFold}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setCollapsed(true);
            }}
            onMouseOver={(e) => {
              e.preventDefault();
              e.stopPropagation();
              e.target.style.opacity = 1;
            }}
            onMouseOut={(e) => {
              e.preventDefault();
              e.stopPropagation();
              e.target.opacity = 0;
            }}
          />
        </div>
        <div className={styles.container_content}>
          {/* 社区首页 */}
          {currentCommunity.isSetHome && (
            <div
              className={
                location.pathname === `/home`
                  ? styles.container_content_mainActive
                  : styles.container_content_main
              }
              onClick={(e) => {
                clearSelectedSpaceGroup();
                clearSelectedSpace();
                history.push(`/home`);
              }}
            >
              <i
                className={classNames(
                  'iconfont',
                  'icon-shouye',
                  styles.container_content_icon,
                  styles.title_icon,
                )}
              />
              <span className={styles.container_content_text}>{i('cmtSidebar.title')}</span>
            </div>
          )}
          {renderNotification()}
          <div className={styles.container_content_group}>
            <SpaceTree />
          </div>
        </div>
        <div className={styles.divUserBar}>
          <div className={styles.avatarUnfold}>
            <Popover
              getPopupContainer={(triggerNode) => triggerNode?.parentNode as HTMLElement}
              placement="topLeft"
              content={<AvatarBar />}
              trigger="click"
            >
              {currentUser?.avatar ? (
                <Avatar size={48} src={currentUser?.avatar} style={{ cursor: 'pointer' }} />
              ) : (
                <Avatar
                  size={48}
                  icon={<i className="iconfont icon-chengyuan" />}
                  style={{ cursor: 'pointer' }}
                />
              )}
            </Popover>
          </div>
        </div>
      </div>
    );
  };
  return collapsed ? CollapsedDiv() : ExpandDiv();
};

export default memo(CommunitySidebar);
