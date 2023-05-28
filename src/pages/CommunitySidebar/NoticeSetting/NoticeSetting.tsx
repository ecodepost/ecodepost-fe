import {Empty, Select, Switch} from 'antd';
import {useEffect} from 'react';
import {useIntl, useModel} from '@umijs/max';
import styles from './NoticeSetting.less';

const {Option} = Select;

const NoticeSetting = () => {
  const intl = useIntl();
  const i = (intlId: string) => intl.formatMessage({id: intlId});

  const {spaceAll} = useModel('community');
  useEffect(() => {
    // fetchGroups();
  }, []);

  return (
    <div className={styles.notice}>
      <div className={styles.noticeTitle}>
        <span>{i('cmtSidebar.notice.title')}</span>
      </div>
      <div className={styles.noticeSubtitle}>
        <span>{i('cmtSidebar.notice.subtitle')}</span>
      </div>
      <div className={styles.noticeDivider} />
      <div className={styles.noticeSwitch}>
        {[i('cmtSidebar.notice.switch.close'), i('cmtSidebar.notice.switch.sidebar')].map(
          (text: string, idx: number) => (
            <div className={styles.noticeSwitchItem} key={idx}>
              <span>{text}</span>
              <Switch />
            </div>
          ),
        )}
      </div>
      <div className={styles.noticeSpace}>
        <div className={styles.noticeSpaceTitle}>
          <span>{i('cmtSidebar.notice.space.title')}</span>
        </div>
        <div className={styles.noticeSpaceSubtitle}>
          <span>{i('cmtSidebar.notice.space.subtitle')}</span>
        </div>
        {spaceAll && <Select
          optionLabelProp="value"
          className={styles.noticeSpaceSelect}
          placeholder={i('cmtSidebar.notice.space.select.placeholder')}
          notFoundContent={<Empty/>}
        >
          {spaceAll.spaceGroupList.map((value, index, array) => {
            return (
              <Option key={value.guid} value={value.name} label={value.name}>
                {value.name}
              </Option>
            );
          })
          }
        </Select>}
        {/* <div className={styles.noticeSpaceDetail}>频道 通知 不通知</div> */}
      </div>
    </div>
  );
};

export default NoticeSetting;
