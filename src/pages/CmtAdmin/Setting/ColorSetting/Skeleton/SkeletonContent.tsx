import { Avatar, Skeleton } from 'antd';
import styles from './SkeletonContent.less';
import classNames from 'classnames';

const SkeletonContent = (props) => {
  return (
    <div className={styles.container}>
      <div className={styles.container_top}>
        <h3 className={styles.container_title}>这里会展示帖子的名称</h3>
        <div className={styles.container_avatar}>
          <Avatar />
          <span className={styles.container_nickName}>用户昵称</span>
          <span>1周前</span>
        </div>
        <div>
          <Skeleton className={styles.container_space} />
        </div>
      </div>
      <div className={styles.footer}>
        <div className={styles.icon}>
          <i className={classNames('iconfont', 'icon-zan')}></i>
          <span className={styles.icon_add}>+</span>
        </div>
        <div className={styles.actions}>
          <div className={styles.show}>
            <i
              className={classNames('iconfont', 'icon-fenxiang', styles.bar_content_item_icon)}
            ></i>
            <span>分享</span>
          </div>
          <div className={styles.comment}>
            <i className={classNames('iconfont', 'icon-pingjia', styles.bar_content_item_icon)}></i>
            <span>12</span>
          </div>
          <div className={styles.collect}>
            <i
              className={classNames('iconfont', 'icon-shoucang', styles.bar_content_item_icon)}
            ></i>
            <span>3</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SkeletonContent;
