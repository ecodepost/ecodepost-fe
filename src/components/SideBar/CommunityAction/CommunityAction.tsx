import { PlusCircleFilled } from '@ant-design/icons';
import { Avatar } from 'antd';
// import classNames from 'classnames';
// import {history} from 'umi';
import styles from './CommunityAction.less';
import React from 'react';

const CommunityActions: React.FC = (props) => {
  // const PopoverItem = (
  //   <div className={styles.bar}>
  //     <div className={styles.bar_content}>
  //       <div
  //         className={styles.bar_content_item}
  //         onClick={() => pushCreateCmt()}
  //       >
  //         <i className={classNames('iconfont', 'icon-shequ', styles.bar_content_item_icon)} />
  //         <span className={styles.bar_content_item_text}>加入社区</span>
  //       </div>
  //       <div className={styles.divider} />
  //       <div className={styles.bar_content_item} onClick={() => pushCreateCmt()}>
  //         <i className={classNames('iconfont', 'icon-shouye', styles.bar_content_item_icon)} />
  //         <span className={styles.bar_content_item_text}>创建社区</span>
  //       </div>
  //     </div>
  //   </div>
  // );

  return (
    <div className={styles.container}>
      {/*<Popover*/}
      {/*  zIndex={999}*/}
      {/*  content={PopoverItem}*/}
      {/*  trigger="click"*/}
      {/*  getPopupContainer={(el) => el.parentNode as HTMLElement}*/}
      {/*  placement="rightTop"*/}
      {/*>*/}
      {/*  <Avatar*/}
      {/*    size={48}*/}
      {/*    icon={<PlusCircleFilled style={{color: 'var(--themeColorPrimary)'}}/>}*/}
      {/*    style={{cursor: 'pointer', borderRadius: '12px', backgroundColor: '#4A617C'}}*/}
      {/*    onClick={() => history.push('/join-cmt-inner')}*/}
      {/*  />*/}
      {/*</Popover>*/}
      {/*<Avatar*/}
      {/*  size={48}*/}
      {/*  icon={<CompassOutlined style={{color: 'var(--themeColorPrimary)'}}/>}*/}
      {/*  style={{*/}
      {/*    cursor: 'pointer',*/}
      {/*    borderRadius: '12px',*/}
      {/*    backgroundColor: '#4A617C',*/}
      {/*    marginTop: 16,*/}
      {/*  }}*/}
      {/*/>*/}
    </div>
  );
};

export default CommunityActions;
