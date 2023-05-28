import {Empty, Tooltip} from 'antd';
import classNames from 'classnames';
import styles from './SpaceQuestionAside.less';

// interface Award {
//   uid: number;
//   nickname: string;
//   avatar?: string;
//   point: number;
// }

const SpaceQuestionAside = () => {
  // const awards = [
  //   {
  //     uid: 1,
  //     avatar: 'https://gw.alipayobjects.com/zos/rmsportal/zOsKZmFRdUtvpqCImOVY.png',
  //     nickname: 'User1',
  //     point: 132,
  //   },
  //   {
  //     uid: 2,
  //     avatar: 'https://gw.alipayobjects.com/zos/rmsportal/zOsKZmFRdUtvpqCImOVY.png',
  //     nickname: 'User2',
  //     point: 56,
  //   },
  //   {
  //     uid: 3,
  //     avatar: 'https://gw.alipayobjects.com/zos/rmsportal/zOsKZmFRdUtvpqCImOVY.png',
  //     nickname: 'User3',
  //     point: 32,
  //   },
  // ];
  return (
    <div className={styles.aside}>
      <div className={styles.aside_title}>
        <span>达人榜</span>
        <Tooltip placement="top" title="根据用户回答采纳率和获赞数进行排名，按周">
          <i className={classNames('iconfont', 'icon-wenhao', styles.aside_icon)}/>
        </Tooltip>
      </div>
      <div className={styles.divider}/>
      <div className={styles.aside_content}>
        {/* {awards.map((award: Award) => (
          <div className={styles.aside_content_card} key={award.uid}>
            <div className={styles.aside_content_card_info}>
              {award?.avatar ? (
                <Avatar src={award.avatar} size={40} />
              ) : (
                <Avatar icon={<UserOutlined />} size={40} />
              )}
              <span className={styles.aside_content_card_info_name}>{award.nickname}</span>
            </div>
            <span className={styles.aside_content_card_point}>{`${award.point}点`}</span>
          </div>
        ))} */}
        <Empty />
      </div>
    </div>
  );
};

export default SpaceQuestionAside;
