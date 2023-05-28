import {useModel} from 'umi';
import styles from './Welcome.less';
import NO_CMT from '@/static/no_cmt.png';

export default () => {
  const {
    initialState: {communityList},
  } = useModel('@@initialState');
  const {currentCmt} = useModel('community');
  const {userInfo: currentCmtUser, cmtInfo: currentCommunity, permission: cmtPms} = currentCmt;

  // 如果没有任何社区，那么展示创建社区和加入社区
  return currentCommunity && currentCommunity.cmtGuid == '' && !communityList && (
    <div className={styles.empty}>
      <img alt="没有社区时的图片" src={NO_CMT} className={styles.emptyImg}/>
      <div className={`${styles.emptyTitle} linkSpacePrimaryTitle`}>
        <span>当前未拥有社区，您想：</span>
      </div>
      <div className={styles.emptyAction}>
      </div>
    </div>
  );
};
