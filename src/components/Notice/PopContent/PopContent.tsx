import { Avatar, Button, Col, Divider, Empty, Input, Modal, Row, Spin, Tabs } from 'antd';
import { useEffect, useState } from 'react';
import { useIntl, useParams } from 'umi';
import dayjs from 'dayjs';
import styles from './PopContent.less';
import { AuditStatus } from '@/enums/auditstatus';
import { NotificationType } from '@/enums/common';
import { messageInfo } from '@/components/Message/Message';
import {
  GetApiNotifications,
  GetApiNotificationsTotal,
  PutApiNotificationsAuditsAuditIdPass,
  PutApiNotificationsAuditsAuditIdReject,
} from '@/services/base/api.gen';
import useRequestX from '@/hooks/useRequestX';
var relativeTime = require('dayjs/plugin/relativeTime');
dayjs.extend(relativeTime);
dayjs.locale('zh-cn');

const { TabPane } = Tabs;

const PopContent: React.FC = (props) => {
  const [allNotification, setAllNotification] = useState<MyNotificationItem[]>([]);
  const [applyModalVisible, setApplyModalVisible] = useState<boolean>(false);
  const [applyAction, setApplyAction] = useState<{
    auditId: number;
    action: 'pass' | 'reject';
    reason: string;
  }>({} as any);
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
  const intl = useIntl();
  const i = (id: string) => intl.formatMessage({ id });

  const GetApiNotificationsReq = useRequestX(GetApiNotificationsTotal, {
    onSuccess: ({ data }) => {
      setAllNotification(data.list);
    },
  });

  const onChangeNoticeTab = (key: string) => {
    GetApiNotificationsReq.run({
      types: key == '0' ? [] : [parseInt(key)],
      pageSize: 10,
      sort: '',
      currentPage: 1,
    });
  };

  const handleApplyAction = async (type: 'pass' | 'reject', auditId: number, reason: string) => {
    const apiMap = {
      pass: PutApiNotificationsAuditsAuditIdPass,
      reject: PutApiNotificationsAuditsAuditIdReject,
    };
    try {
      setConfirmLoading(true);
      const res = await apiMap[type](auditId.toString(), { opReason: reason });
      if (res.code === 0) {
        messageInfo({
          content: '操作成功',
          type: 'success',
        });
        setApplyAction({} as any);
        GetApiNotificationsReq.run({});
        setApplyModalVisible(false);
        setConfirmLoading(false);
      } else {
        messageInfo({
          content: res.msg,
          type: 'error',
        });
      }
    } catch (err) {
      messageInfo({
        content: '操作失败',
        type: 'error',
      });
    }
  };

  useEffect(() => {
    GetApiNotificationsReq.run({
      types: [],
      pageSize: 10,
      sort: '',
      currentPage: 1,
    });
  }, []);

  const renderComment = (item) => {
    return (
      <div key={item.notificationId} className={styles.replay}>
        <Row>
          <Col span={18}>
            <div className={styles.info}>
              <Avatar src={item.meta.commentAuthor.user.avatar} size={20} />
              <span className={styles.nickName}>{item.meta.commentAuthor.user.nickname}</span>
              <span>{item.type === NotificationType.COMMENT && '评论了你的帖子'}</span>
            </div>
            <div className={styles.title}>{item.meta.fileTitle}</div>
          </Col>
          <Col span={6}>
            <p className={styles.time}>{dayjs.unix(item.notificationTime).fromNow()}</p>
          </Col>
        </Row>
      </div>
    );
  };

  const renderNewAnswer = (item) => {
    return (
      <div key={item.notificationId} className={styles.replay}>
        <Row>
          <Col span={20}>
            <div className={styles.info}>
              <Avatar src={item.meta.answerAuthor.avatar} size={20} />
              <span className={styles.nickName}>{item.meta.answerAuthor.nickname}</span>
              <span>回答了你的问题</span>
            </div>
            <div className={styles.title}>{item.meta.questionTitle}</div>
          </Col>
          <Col span={4}>
            <p className={styles.time}>{dayjs.unix(item.notificationTime).fromNow()}</p>
          </Col>
        </Row>
      </div>
    );
  };

  const renderApply = (item) => {
    return (
      <div key={item.notificationId} className={styles.applyItem}>
        <Row>
          <Col span={20}>
            <Avatar src={item.meta.avatar} size={20} />
            <span className={styles.nickName}>{item.meta.nickname}</span>
          </Col>
          <Col span={4}>
            <div className={styles.time}>{dayjs.unix(item.notificationTime).fromNow()}</div>
          </Col>
        </Row>
        <div className={styles.title}>
          <Row align="middle">
            <Col span={12}>
              <div>
                申请加入{item.type === NotificationType.APPLY_SPACE && '空间'}
                {item.type === NotificationType.APPLY_SPACE_GROUP && '空间分组'}&nbsp;
                {item.meta?.spaceName}
              </div>
            </Col>
            <Col span={12}>
              <div className={styles.applyItemAction}>
                {(item.meta.status === AuditStatus.APPLY ||
                  item.meta.status === AuditStatus.RE_APPLY) && (
                  <>
                    <Button
                      type="primary"
                      className={styles.applyItemActionBtn}
                      onClick={() => {
                        handleApplyAction('pass', item.targetId, '');
                      }}
                    >
                      同意
                    </Button>
                    <Button
                      className={styles.applyItemActionBtn}
                      onClick={() => {
                        handleApplyAction('reject', item.targetId, '');
                      }}
                    >
                      拒绝
                    </Button>
                  </>
                )}
                {item.meta.status === AuditStatus.PASS && <span>已同意</span>}
                {item.meta.status === AuditStatus.REJECT && <span>已拒绝</span>}
              </div>
            </Col>
          </Row>
        </div>
      </div>
    );
  };

  const renderNotifications = (type) => {
    if (!allNotification) {
      return null;
    }

    if (allNotification.length == 0) {
      return <Empty />;
    }

    if (type == 0) {
      return allNotification.map((item) => {
        switch (item.type) {
          case NotificationType.COMMENT:
            return renderComment(item);
          case NotificationType.NEW_ANSWER:
            return renderNewAnswer(item);
          case NotificationType.APPLY_SPACE:
            return renderApply(item);
        }
        return null;
      });
    }

    const filterNotification = allNotification.filter((item) => item.type == type);
    if (filterNotification.length == 0) {
      return <Empty />;
    }

    return filterNotification.map((item) => {
      switch (item.type) {
        case NotificationType.COMMENT:
          return renderComment(item);
        case NotificationType.NEW_ANSWER:
          return renderNewAnswer(item);
        case NotificationType.APPLY_SPACE:
          return renderApply(item);
      }
      return null;
    });
  };

  return (
    <div className={styles.popover}>
      <span className={styles.container_content_text}>{i('cmtSidebar.notice')}</span>
      <Divider></Divider>
      <Tabs defaultActiveKey="0" onChange={onChangeNoticeTab}>
        <TabPane tab="全部" key="0">
          <Spin spinning={GetApiNotificationsReq.loading}>
            <div className={styles.popover_banner}>{renderNotifications(0)}</div>
          </Spin>
        </TabPane>
        <TabPane tab="成员申请" key={NotificationType.APPLY_SPACE}>
          <Spin spinning={GetApiNotificationsReq.loading}>
            <div className={styles.popover_banner}>
              {renderNotifications(NotificationType.APPLY_SPACE)}
            </div>
          </Spin>
        </TabPane>
        <TabPane tab="评论与回复" key={NotificationType.COMMENT}>
          <Spin spinning={GetApiNotificationsReq.loading}>
            <div className={styles.popover_banner}>
              {renderNotifications(NotificationType.COMMENT)}
            </div>
          </Spin>
        </TabPane>
        <TabPane tab="问题与回答" key={NotificationType.NEW_ANSWER}>
          <Spin spinning={GetApiNotificationsReq.loading}>
            <div className={styles.popover_banner}>
              {renderNotifications(NotificationType.NEW_ANSWER)}
            </div>
          </Spin>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default PopContent;
