import {useModel} from '@umijs/max';
import CommunityActions from './CommunityAction/CommunityAction';
import styles from './Sidebar.less';
import {Avatar, Popover} from 'antd';
import AvatarBar from '@/components/SideBar/AvatarBar/AvatarBar';

type SideBarProps = {
  currentCmt: DtoCmtInfo;
};

const SideBar = (props: SideBarProps) => {
  // const { currentCmt } = props
  const {
    initialState: { communityList, currentUser },
  } = useModel('@@initialState');

  return (
    <div className={styles.container}>
      <div>
        <div className={styles.communities}>
          <div className={styles.community_action}>
            <CommunityActions />
          </div>
        </div>
      </div>
      <div className={styles.avatar_container}>
        {currentUser && (
          <Popover
            getPopupContainer={(triggerNode) => triggerNode?.parentNode as HTMLElement}
            placement="topRight"
            content={<AvatarBar />}
            trigger="click"
          >
            {currentUser?.avatar ? (
              <Avatar size={32} src={currentUser?.avatar} style={{ cursor: 'pointer' }} />
            ) : (
              <Avatar
                size={32}
                icon={<i className="iconfont icon-chengyuan" />}
                style={{ cursor: 'pointer' }}
              />
            )}
          </Popover>
        )}
      </div>
    </div>
  );
};

export default SideBar;
