import styles from './Dropdown.less';
import {
  ArrowLeftOutlined,
  DeleteOutlined,
  DownOutlined,
  PictureOutlined,
  UserAddOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {Divider, Dropdown, Popconfirm} from 'antd';
import React, {useState} from 'react';
import SpaceSettingModal from '@/components/SpaceSettingModal/SpaceSettingModal';
import PanelDelete from '@/components/SpaceSetting/PanelDelete/PanelDelete';
import {useModel} from '@umijs/max';
import {MoneyCollectOutlined} from '@ant-design/icons/lib/icons';
import {PostApiSpacesGuidQuit} from '@/services/base/api.gen';
import useRequestX from '@/hooks/useRequestX';
import classNames from 'classnames';

interface DropDownProps {
  spacePms?: Spacev1GetSpacePermissionByUidRes;
}

const DropDownSpace: React.FC<DropDownProps> = (props) => {
  const {selectedSpace} = useModel('community');
  const {isNeedAddSpace} = useModel('space');
  const [booleanShowPanelSetting, setBooleanShowPanelSetting] = useState(false);
  const [count, setCount] = useState<number>(0);
  const [booleanShowPanelDelete, setBooleanShowPanelDelete] = useState<boolean>(false);
  const [dropdownPage, setDropdownPage] = useState<boolean>(false);
  const { spacePms } = props;

  const PostApiSpacesGuidQuitRequest = useRequestX(PostApiSpacesGuidQuit, {
    onSuccess: (res) => {},
  });

  const SpaceSetting = () => {
    return (
      <div className={styles.space_setting_container}>
        {selectedSpace?.isAllowSet && (
          <>
            <div className={styles.item}>
              <PictureOutlined />
              <span
                className={styles.subTitle}
                onClick={() => {
                  setBooleanShowPanelSetting(true);
                  setDropdownPage(false);
                  setCount(0);
                }}
              >
                通用设置
              </span>
            </div>
            <div className={styles.item}>
              <MoneyCollectOutlined />
              <span
                className={styles.subTitle}
                onClick={() => {
                  setBooleanShowPanelSetting(true);
                  setDropdownPage(false);
                  setCount(1);
                }}
              >
                付费设置
              </span>
            </div>
            <div className={styles.item}>
              <UserAddOutlined />
              <span
                className={styles.subTitle}
                onClick={() => {
                  setBooleanShowPanelSetting(true);
                  setDropdownPage(false);
                  setCount(2);
                }}
              >
                空间成员
              </span>
            </div>
            <div className={styles.item}>
              <UserOutlined />
              <span
                className={styles.subTitle}
                onClick={() => {
                  setBooleanShowPanelSetting(true);
                  setDropdownPage(false);
                  setCount(3);
                }}
              >
                权限设置
              </span>
            </div>
            <Divider></Divider>
            <div
              className={classNames(styles.item, styles.delete)}
              onClick={() => {
                setBooleanShowPanelDelete(true);
                setDropdownPage(false);
              }}
            >
              <DeleteOutlined/>
              <span className={styles.subTitle}>删除空间</span>
            </div>
          </>
        )}
        {spacePms?.isMember && (
          <Popconfirm
            title="确定退出空间"
            onConfirm={() => {
              PostApiSpacesGuidQuitRequest.run(selectedSpace?.guid, {
                reason: '',
              });
            }}
            placement="rightBottom"
            okText="是"
            cancelText="否"
          >
            <div className={styles.item}>
              <ArrowLeftOutlined />
              <span className={styles.subTitle}>离开空间</span>
            </div>
          </Popconfirm>
        )}
      </div>
    );
  };

  return (
    <>
      {selectedSpace && (
        <div>
          {!isNeedAddSpace ? (
            <Dropdown
              overlay={<SpaceSetting />}
              onOpenChange={setDropdownPage}
              open={dropdownPage}
              className={styles.container}
              placement="bottomLeft"
            >
              <a>
                <span className={styles.title}>{selectedSpace.name}</span>
                <DownOutlined style={{ paddingLeft: '10px' }} />
              </a>
            </Dropdown>
          ) : (
            <a>
              <span className={styles.title}>{selectedSpace.name}</span>
            </a>
          )}

          <SpaceSettingModal
            key={selectedSpace?.guid}
            visible={booleanShowPanelSetting}
            spaceGuid={selectedSpace?.guid}
            onClose={(event) => {
              event.stopPropagation();
              setBooleanShowPanelSetting(false);
            }}
            count={count}
          />
          <PanelDelete
            visible={booleanShowPanelDelete}
            onClose={() => {
              setBooleanShowPanelDelete(false);
            }}
            spaceName={selectedSpace.name}
            spaceGuid={selectedSpace?.guid}
          />
        </div>
      )}
    </>
  );
};
export default DropDownSpace;
