import { Button, Switch } from 'antd';
import styles from './Friend.less';
import React from 'react';
import DefaultHeader from '@/components/Header/DefaultHeader/DefaultHeader';

const Friend = () => {
  return (
    <React.Fragment>
      <DefaultHeader />
      <div className={styles.friend}>
        <div className={styles.friend_title}>
          <span>私信默认设置</span>
        </div>
        <div className={styles.friend_item}>
          <div className={styles.friend_item_switch}>
            <span>允许社区成员向您发送私信</span>
            <Switch />
          </div>
          <span className={styles.friend_item_desc}>
            当您加入一个新的社区时，将应用此设置，您可前往社区左上角下拉菜单对单个社区进行修改。
          </span>
        </div>
        <div className={styles.divider} />
        <div className={styles.friend_item}>
          <div className={styles.friend_item_switch}>
            <span>谁可以加您为好友</span>
          </div>
          <span className={styles.friend_item_desc}>
            请选择允许哪些用户可通过搜索您的手机号或用户名、访问您的资料卡和个人空间来添加您为好友。
          </span>
          <div className={styles.friend_item_switch_group}>
            <div className={styles.friend_item_switch_group_item}>
              <span>所有用户</span>
              <Switch />
            </div>
            <div className={styles.friend_item_switch_group_item}>
              <span>您加入的社区的成员</span>
              <Switch />
            </div>
          </div>
        </div>
        <div className={styles.divider} />
        <div className={styles.friend_submit}>
          <Button type="primary" className={styles.friend_submit_btn}>
            保存修改
          </Button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Friend;
