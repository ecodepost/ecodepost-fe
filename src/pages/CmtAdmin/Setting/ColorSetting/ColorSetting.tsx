import SideBar from './SideBar/SideBar';
import ColorPick from '@/pages/CmtAdmin/ColorNavbar/ColorPick/ColorPick';

import styles from './ColorSetting.less';
import { Avatar, Badge } from 'antd';
import { CaretDownOutlined, DownOutlined, SearchOutlined } from '@ant-design/icons';
import { useIntl, useModel } from 'umi';
import classNames from 'classnames';
import SkeletonContent from './Skeleton/SkeletonContent';

const ColorSetting = () => {
  const { currentCmt } = useModel('community');
  const intl = useIntl();
  const i = (id: string) => intl.formatMessage({ id });
  const {
    initialState: { currentUser },
  } = useModel('@@initialState');
  return (
    <div className={styles.container}>
      <ColorPick></ColorPick>
      <div className={styles.container_cmtsidebar}>
        <div className={styles.containercontent_main}>
          <div className={styles.container_content_search}>
            <SearchOutlined className={styles.container_content_icon} />
          </div>
          <div className={styles.container_content_mainActive}>
            <i className={classNames('iconfont', 'icon-shouye', styles.container_content_icon)} />
            <span className={styles.container_content_text}>{i('cmtSidebar.title')}</span>
          </div>
          <div className={styles.container_content_group}>
            <div className={styles.drag}>
              <CaretDownOutlined />
              <div className={styles.title}>GO从基础到精通</div>
            </div>
            <div className={styles.emojiIcon}>
              <a>👍</a>
              <span className={styles.emojiIcon_title}>插画训练营</span>
            </div>
            <div className={styles.emojiIcon}>
              <a>😀</a>
              <span className={styles.emojiIcon_title}>Go入门教程</span>
            </div>
            <div className={styles.emojiIcon}>
              <a>👀</a>
              <span className={styles.emojiIcon_title}>Go的基础配置</span>
            </div>
            <div className={styles.emojiIcon}>
              <a>🎄</a>
              <span className={styles.emojiIcon_title}>新特性多模块</span>
            </div>
            <div className={styles.drag}>
              <CaretDownOutlined />
              <div className={styles.title}>王者荣耀专区</div>
              <div>
                <i className={classNames('iconfont', 'icon-shequ', styles.shequIcon)} />
              </div>
            </div>
            <div className={styles.drag}>
              <CaretDownOutlined />
              <div className={styles.title1}>吃喝玩乐游</div>
              <div>
                <i className={classNames('iconfont', 'icon-shequ', styles.shequIcon)} />
              </div>
            </div>
            <div className={styles.emojiIcon}>
              <a>😀</a>
              <span className={styles.emojiIcon_title}>Go入门教程</span>
            </div>
            <div className={styles.emojiIcon}>
              <a>👀</a>
              <span className={styles.emojiIcon_title}>Go的基础配置</span>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.container_content}>
        <div className={styles.container_content_top}>
          <span className={styles.container_content_top_title}> 社区首页</span>
        </div>
        <div className={styles.card}>
          <SkeletonContent />
          <SkeletonContent />
        </div>
      </div>
    </div>
  );
};
export default ColorSetting;
