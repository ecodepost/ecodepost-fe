import type {RadioChangeEvent} from 'antd';
import {Button, Col, Modal, Radio, Row} from 'antd';
import styles from './SpaceSettingModal.less';
import {SpaceType} from '@/enums/spacetype';
import {LeftOutlined} from '@ant-design/icons';
import {useEffect, useRef, useState} from 'react';
import {Common as CourseCommon} from './Course/Common';
import {Common as ColumnCommon} from './Column/Common/Common';
import {Basic} from './Basic/Basic';
import {Pay as CouresPay} from './Pay/Pay';
import {useModel} from '@umijs/max';
import {Options} from './Options/Options';
import SpaceMembers from './SpaceMembers/SpaceMembers';

// import { Pay as CouresPay } from './Course/Pay';

interface SpaceSetting {
  spaceGuid: string;
  visible: boolean;
  onClose: (event: React.MouseEvent<HTMLElement>) => void;
  count?: number;
}

const SettingPageMap = {
  [SpaceType.ARTICLE]: [
    {
      title: '通用设置',
      value: 'common',
    },
    {
      title: '付费设置',
      value: 'pay',
    },
    {
      title: '空间成员',
      value: 'spaceMembers',
    },
    {
      title: '权限设置',
      value: 'options',
    },
  ],
  [SpaceType.QUESTION]: [
    {
      title: '通用设置',
      value: 'common',
    },
    {
      title: '付费设置',
      value: 'pay',
    },
    {
      title: '空间成员',
      value: 'spaceMembers',
    },
    {
      title: '权限设置',
      value: 'options',
    },
  ],
  [SpaceType.COLUMN]: [
    {
      title: '通用设置',
      value: 'common',
    },
    {
      title: '付费设置',
      value: 'pay',
    },
    {
      title: '空间成员',
      value: 'spaceMembers',
    },
    {
      title: '权限设置',
      value: 'options',
    },
  ],
  [SpaceType.LINK]: [
    {
      title: '通用设置',
      value: 'common',
    },
    {
      title: '空间成员',
      value: 'spaceMembers',
    },
    {
      title: '权限设置',
      value: 'options',
    },
  ],
};

interface FormRef {
  save: Function;
}
const SpaceSettingModal = (prop: SpaceSetting) => {
  const { visible, onClose, spaceGuid, count } = prop;
  // console.log(cases)
  const { spaceMap } = useModel('community');
  const spaceInfo = spaceMap.get(spaceGuid);
  const modalRef = useRef<FormRef>();
  const [settingPage, setSettingPage] = useState<string>();

  // useEffect(() => {
  //   if (!spaceInfo) {
  //     return;
  //   }
  //   setSettingPage(SettingPageMap[spaceInfo.spaceType][0].value);
  // }, [spaceInfo]);
  useEffect(() => {
    if (!spaceInfo) {
      return;
    }
    setSettingPage(SettingPageMap[spaceInfo.spaceType][count || 0].value);
  }, [spaceInfo, count]);
  const onChangeSettingPage = (e: RadioChangeEvent) => {
    setSettingPage(e.target.value);
  };

  const onSave = () => {
    modalRef.current?.save();
    // history.goBack();
    // window.location.reload();
  };

  const getSpaceSettingInfo = () => {
    switch (spaceInfo.spaceType) {
      case SpaceType.ARTICLE: {
        switch (settingPage) {
          case 'common':
            return <Basic ref={modalRef} spaceInfoProps={spaceInfo} />;
          case 'pay':
            return <CouresPay ref={modalRef} spaceInfoProps={spaceInfo} />;
          case 'spaceMembers':
            return <SpaceMembers ref={modalRef} spaceInfoProps={spaceInfo} />;
          case 'options':
            return <Options ref={modalRef} spaceInfoProps={spaceInfo} />;
        }
        break;
      }
      case SpaceType.QUESTION: {
        switch (settingPage) {
          case 'common':
            return <Basic ref={modalRef} spaceInfoProps={spaceInfo} />;
          case 'pay':
            return <CouresPay ref={modalRef} spaceInfoProps={spaceInfo} />;
          case 'spaceMembers':
            return <SpaceMembers ref={modalRef} spaceInfoProps={spaceInfo} />;
          case 'options':
            return <Options ref={modalRef} spaceInfoProps={spaceInfo} />;
        }
        break;
      }
      case SpaceType.COLUMN: {
        switch (settingPage) {
          case 'common':
            return <ColumnCommon ref={modalRef} spaceInfoProps={spaceInfo}/>;
          case 'pay':
            return <CouresPay ref={modalRef} spaceInfoProps={spaceInfo} />;
          case 'spaceMembers':
            return <SpaceMembers ref={modalRef} spaceInfoProps={spaceInfo} />;
          case 'options':
            return <Options ref={modalRef} spaceInfoProps={spaceInfo} />;
        }
        break;
      }
      case SpaceType.LINK: {
        switch (settingPage) {
          case 'common':
            return <Basic ref={modalRef} spaceInfoProps={spaceInfo}/>;
          case 'spaceMembers':
            return <SpaceMembers ref={modalRef} spaceInfoProps={spaceInfo}/>;
          case 'options':
            return <Options ref={modalRef} spaceInfoProps={spaceInfo}/>;
        }
        break;
      }
    }
    return null;
  };

  return (
    <Modal open={visible} onCancel={onClose} className={styles.container} destroyOnClose={true}>
      <div className={styles.box}>
        <div className={styles.header}>
          <Row align="middle" justify="space-between">
            <Col span={4}>
              <div className={styles.back} onClick={onClose}>
                <LeftOutlined className={styles.icon}/>
                <span className={styles.back_title}>返回</span>
              </div>
            </Col>
            {spaceInfo && (
              <Col span={16}>
                <div className={styles.center}>
                  <Radio.Group
                    onChange={onChangeSettingPage}
                    defaultValue={SettingPageMap[spaceInfo.spaceType][count || 0].value}
                  >
                    {SettingPageMap[spaceInfo.spaceType].map((item) => (
                      <Radio.Button value={item.value}>{item.title}</Radio.Button>
                    ))}
                  </Radio.Group>
                </div>
              </Col>
            )}
            <Col span={4}>
              <div className={styles.left}>
                <Button onClick={onSave} htmlType="submit" type="primary" className={styles.action}>
                  保存
                </Button>
              </div>
            </Col>
          </Row>
        </div>
        {spaceInfo && <div className={styles.body}>{getSpaceSettingInfo()}</div>}
      </div>
    </Modal>
  );
};

export default SpaceSettingModal;
