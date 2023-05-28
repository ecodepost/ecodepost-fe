import { Button, Switch } from 'antd';
import styles from './PersonalSpace.less';
import React from 'react';
import DefaultHeader from '@/components/Header/DefaultHeader/DefaultHeader';

const PersonalSpace = () => {
  return (
    <React.Fragment>
      <DefaultHeader />
      <div className={styles.ps}>
        <div className={styles.ps_item}>
          <div className={styles.ps_item_title}>
            <span>谁可以查看您关注的用户列表</span>
          </div>
          <div className={styles.ps_item_switch}>
            <span>所有人</span>
            <Switch />
          </div>
          <div className={styles.ps_item_switch}>
            <span>仅粉丝和好友</span>
            <Switch />
          </div>
          <div className={styles.ps_item_switch}>
            <span>仅自己</span>
            <Switch />
          </div>
        </div>
        <div className={styles.divider} />
        <div className={styles.ps_item}>
          <div className={styles.ps_item_title}>
            <span>谁可以查看您的粉丝列表</span>
          </div>
          <div className={styles.ps_item_switch}>
            <span>所有人</span>
            <Switch />
          </div>
          <div className={styles.ps_item_switch}>
            <span>仅粉丝和好友</span>
            <Switch />
          </div>
          <div className={styles.ps_item_switch}>
            <span>仅自己</span>
            <Switch />
          </div>
        </div>
        <div className={styles.divider} />
        <div className={styles.ps_submit}>
          <Button type="primary" className={styles.ps_submit_btn}>
            保存修改
          </Button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default PersonalSpace;
