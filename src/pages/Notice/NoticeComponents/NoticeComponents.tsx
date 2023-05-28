import { Col, Row } from 'antd';

import styles from './NoticeComponents.less';
import { timeStampFormat } from '@/utils/dayjsUtils';

const NoticeList = (tpy: string, item: Notifyv1ListUserNotificationItem) => {
  const CommandNotice = (notice: any) => {
    return (
      <>
        <div className={styles.noticeContent}>
          <span className={styles.name}>{notice.name}</span>
          <span className={styles.reply}>回复了你的帖子</span>
          <span className={styles.time}>{notice.time}</span>
        </div>
        <div className={styles.detail}>{notice.content}</div>
        {notice.type == 'reply' ? <></> : ''}
      </>
    );
  };

  const ReplyNotice = (notice: any) => {
    return (
      <>
        <div className={styles.noticeContent}>
          <span className={styles.name}>{notice.name}</span>
          <span className={styles.reply}>回复了帖子下你的评论</span>
          <span className={styles.time}>{notice.time}</span>
        </div>
        <div className={styles.detail}>{notice.content}</div>
        <div className={styles.replyContent}>{notice.replyContent}</div>
      </>
    );
  };

  const RemoveNotice = (notice: any) => {
    return (
      <>
        <div className={styles.noticeContent}>
          您已经被移除 <span className={styles.name}>{notice.communityName}</span>社区{' '}
          <span className={styles.name}>{notice.spaceName}</span>
          <span className={styles.time}>{notice.time}</span>
        </div>
        <div className={styles.actionPlayer}>操作人：{notice.user}</div>
      </>
    );
  };

  const AdjustmentNotice = (notice: Notifyv1ListUserNotificationItem) => {
    return (
      <>
        <div className={styles.noticeContent}>
          {/*你已经成为 <span className={styles.name}>{notice.communityName}</span>社区 <span className={styles.name}>{notice.spaceName}</span>的管理员*/}
          {/*<span className={styles.time}>{notice.time}</span>*/}
        </div>
        <div className={styles.actionPlayer}>操作人：{notice.targetId}</div>
      </>
    );
  };

  const InviteCommunityNotice = (notice: any) => {
    return (
      <>
        <div className={styles.noticeContent}>
          <Row>
            <Col span={12}>
              你邀请了 <span className={styles.name}>{notice.user}</span> 加入{' '}
              <span className={styles.name}>{notice.communityName}</span> 社区
            </Col>
            <Col span={6}>
              <span className={styles.state}>{notice.state}</span>
            </Col>
            <Col span={6}>
              <span className={styles.time}>{notice.time}</span>
            </Col>
          </Row>
        </div>
      </>
    );
  };

  const InviteSpaceNotice = (notice: any) => {
    return (
      <>
        <div className={styles.noticeContent}>
          <Row>
            <Col span={18}>
              你已将 <span className={styles.name}>{notice.user}</span> 添加至{' '}
              <span className={styles.name}>{notice.spaceName}</span>
            </Col>
            <Col span={6}>
              <span className={styles.time}>{notice.time}</span>
            </Col>
          </Row>
        </div>
      </>
    );
  };

  const renderType = () => {
    console.log('tpy', tpy, 'item type', item.type);
    // if (tpy == "关注的人" && item.type == NotificationType.USER) {
    //   return CommandNotice(item)
    // }
    // if (tpy == "关注的人" && item.type == "fellowReply") {
    //   return ReplyNotice(item)
    // }
    return AdjustmentNotice(item);
    // if (tpy == "系统通知" && item.type == NotificationType.SYSTEM) {
    //   return AdjustmentNotice(item)
    // }
    // // if (tpy == "系统通知" && item.type == "remove") {
    // //   return RemoveNotice(item)
    // // }
    // if (tpy == "邀请" && item.type == NotificationType.INVITE) {
    //   return InviteCommunityNotice(item)
    // }
    // // if (tpy == "邀请" && item.type == "inviteSpace") {
    // //   return InviteSpaceNotice(item)
    // // }
    // if (tpy == "评论与回复" && item.type == NotificationType.COMMENT) {
    //   return CommandNotice(item)
    // }
    // if (tpy == "评论与回复" && item.type == "reply") {
    //   return ReplyNotice(item)
    // }
    // return <></>
  };
  // dayjs(+ctime * 1000).format(`YYYY-MM-DD HH:mm`)
  return (
    <div key={item.notificationId} className={styles.noticeTmp}>
      <div className={styles.noticeTmpDate}>{timeStampFormat(item.notificationTime)}</div>
      {renderType()}
    </div>
  );
};

export default NoticeList;
