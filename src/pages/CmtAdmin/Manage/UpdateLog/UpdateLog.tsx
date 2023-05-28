import { SearchOutlined } from '@ant-design/icons';
import { Avatar, DatePicker, Input, Select, Space, Table } from 'antd';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import styles from './UpdateLog.less';
import { getUpdateLogEventGroup, getUpdateLogList } from '@/services/cmtAdmin/api';
import classNames from 'classnames';

const { RangePicker } = DatePicker;
const { Column } = Table;

const UpdateLog = () => {
  const [logListLoading, setLogListLoading] = useState<boolean>(false);
  const [logList, setLogList] = useState<any[]>([]);
  const [eventGroupList, setEventGroupList] = useState<any[]>([]);

  const fetchLogList = async () => {
    setLogListLoading(true);
    try {
      const resp = await getUpdateLogList({
        currentPage: 1,
      });
      if (resp.code === 0) {
        setLogList(resp.data.list ? resp.data.list : []);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleGetLogList = async (
    eventType: number = 0,
    group: number = 0,
    operateUid: number = 0,
    targetUid: number = 0,
  ) => {
    try {
      const resp = await getUpdateLogList({
        currentPage: 1,
        event: eventType,
        group,
        operateUid,
        targetUid,
      });
      if (resp.code === 0) {
        setLogList(resp.data.list ? resp.data.list : []);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchEventGroupList = async () => {
    try {
      const resp = await getUpdateLogEventGroup();
      if (resp.code == 0) {
        setEventGroupList(resp.data.eventList);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchEventGroupList();
    fetchLogList();
    setLogListLoading(false);
  }, []);

  const Columns = (isExpand: boolean) => (
    <>
      <Column
        dataIndex="type"
        key="type"
        width={176 + (isExpand ? 4 : 0)}
        title={<span className={styles.tableTitle}>操作类型</span>}
        render={(_, record: any) => (
          <span className={styles.tableText} style={{ opacity: isExpand ? 0 : 1 }}>
            {record.event_name}
          </span>
        )}
      />
      <Column
        dataIndex="nickname"
        key="nickname"
        width={182}
        title={<span className={styles.tableTitle}>管理员</span>}
        render={(_, record: any) => (
          <>
            <Avatar src={record.operate_avatar} style={{ opacity: !isExpand ? 1 : 0 }} size={40} />
            <span className={styles.tableAdminText} style={{ opacity: isExpand ? 0 : 1 }}>
              {record.operate_name}
            </span>
          </>
        )}
      />
      <Column
        dataIndex="detail"
        key="detail"
        title={<span className={styles.tableTitle}>操作详情</span>}
        render={(_, record: any) => (
          <span className={isExpand ? styles.tableExtraText : styles.tableText}>
            {isExpand && '· '}
            {record.message}
          </span>
        )}
      />
      <Column
        dataIndex="time"
        key="time"
        title={<span className={styles.tableTitle}>时间</span>}
        render={(_, record: any) => (
          <span className={styles.tableText} style={{ opacity: isExpand ? 0 : 1 }}>
            {!isExpand ? dayjs(record.ctime * 1000).format('YYYY/MM/DD HH:mm') : ''}
          </span>
        )}
      />
    </>
  );

  return (
    <div className={styles.log}>
      <div className={styles.logHeader}>
        <RangePicker className={styles.logHeaderDate} />
        <div className={styles.logHeaderAdmin}>
          <span>管理员</span>
          <Select
            dropdownMatchSelectWidth={false}
            className={styles.logHeaderAdminSelect}
            defaultValue="all"
            getPopupContainer={(triggerNode) => triggerNode.parentNode}
            dropdownRender={(menu) => (
              <div style={{ width: 160 }}>
                <Space style={{ padding: '8px' }}>
                  <Input
                    className={styles.typeInput}
                    placeholder="搜索成员"
                    suffix={<SearchOutlined className={styles.searchIcon} />}
                  />
                </Space>
                {menu}
              </div>
            )}
          >
            <Select.Option key={'all'} className={styles.option}>
              <i className="iconfont icon-chengyuan userIcon" style={{ marginRight: 8 }} />
              <span>全部</span>
            </Select.Option>
          </Select>
        </div>
        <div className={styles.logHeaderAction}>
          <span>操作类型</span>
          <Select
            className={styles.logHeaderActionSelect}
            defaultValue="all"
            dropdownMatchSelectWidth={false}
            getPopupContainer={(triggerNode) => triggerNode.parentNode}
            dropdownRender={(menu) => (
              <div style={{ width: 160 }}>
                <Space style={{ padding: '8px' }}>
                  <Input
                    className={styles.typeInput}
                    placeholder="搜索操作"
                    suffix={<SearchOutlined className={styles.searchIcon} />}
                  />
                </Space>
                {menu}
              </div>
            )}
            onChange={(value) => {
              handleGetLogList(+value);
            }}
          >
            {eventGroupList.map((item: any) => {
              return (
                <Select.Option key={item.event} className={styles.option}>
                  <i
                    className={classNames('iconfont', 'icon-leibie', 'userIcon')}
                    style={{ marginRight: 8 }}
                  />
                  <span>{item.name}</span>
                </Select.Option>
              );
            })}
          </Select>
        </div>
        <span className={styles.logHeaderTotal}>
          共筛选出<span>{logList.length}</span>条日志信息
        </span>
      </div>
      <div className={styles.logTable}>
        <Table
          loading={logListLoading}
          rowKey={'id'}
          dataSource={logList}
          pagination={{ hideOnSinglePage: true }}
        >
          {Columns(false)}
        </Table>
      </div>
    </div>
  );
};

export default UpdateLog;
