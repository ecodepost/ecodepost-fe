import {DownOutlined} from '@ant-design/icons';
import type {MenuProps} from 'antd';
import {Dropdown, Empty, Menu, Space} from 'antd';
import {useEffect, useState} from 'react';
import NoticeList from './NoticeComponents/NoticeComponents';
import styles from './Notice.less';
import {GetApiNotifications} from "@/services/base/api.gen";
import useRequestX from "@/hooks/useRequestX";

const Notice = () => {
  const [selectedValue, setSelectedValue] = useState<string>("关注的人")
  const [noticeList, setNoticeList] = useState<Notifyv1ListUserNotificationItem[]>()
  const onClick: MenuProps['onClick'] = ({key}) => {
    setSelectedValue(key)
  };

  const GetApiNotificationsRequest = useRequestX(GetApiNotifications, {
    onSuccess: (res) => {
      setNoticeList(res.data.list ? res.data.list : [])
    }
  })

  useEffect(() => {
    GetApiNotificationsRequest.run({
      sort: '',
      currentPage: 1,
      pageSize: 100,
    })
  }, [])

  const menu = (
    <Menu
      className={styles.menuContent}
      onClick={onClick}
      items={[
        {
          key: '关注的人',
          label: (
            <p>关注的人</p>
          ),
        },
        {
          key: '系统通知',
          label: (
            <p>系统通知</p>
          ),
        },
        {
          key: '评论与回复',
          label: (
            <p>评论与回复</p>
          ),
        },
        {
          key: '邀请',
          label: (
            <p>邀请</p>
          ),
        },
      ]}
    />
  );

  return (
    <div style={{ height: '100vh', overflowY: 'auto' }}>
      <div className={styles.content}>
        <div className={styles.menu}>
          <div className={styles.menuTitle}>最新消息</div>
          <Dropdown overlay={menu}>
            <a onClick={e => e.preventDefault()} className={styles.menuSelection}>
              <Space>
                {selectedValue}
                <DownOutlined />
              </Space>
            </a>
          </Dropdown>
        </div>
        {
          noticeList && (noticeList.length ? (
            noticeList.map((item) => {
              return NoticeList(selectedValue, item)
            })
          ) : <Empty style={{'marginTop': '60px'}}/>)
        }
      </div>
    </div>
  )
}

export default Notice;

