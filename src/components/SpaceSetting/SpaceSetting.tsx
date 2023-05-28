import {Popover} from 'antd';
import {ArrowRightOutlined} from '@ant-design/icons';
import React, {useState} from 'react';
import {useIntl, useModel} from '@umijs/max';
import styles from './SpaceSetting.less';
import PanelRename from '@/components/SpaceSetting/PanelRename/PanelRename';
import PanelDelete from '@/components/SpaceSetting/PanelDelete/PanelDelete';
import SpaceSettingModal from '@/components/SpaceSettingModal/SpaceSettingModal';
import useRequestX from '@/hooks/useRequestX';
import {PutApiSpacesGuid} from '@/services/base/api.gen';

interface SpaceSettingProps {
  guid: string;
  nodeSpace: any;
  // setBooleanShowDropdownGroupSelector: any;
  setDropDownSpaceSetting: any;
}

const SpaceSetting: React.FC<SpaceSettingProps> = (props) => {
  const { guid, nodeSpace, setDropDownSpaceSetting } = props;
  const intl = useIntl();
  const i = (id: string) => intl.formatMessage({ id });
  const [booleanShowPanelRename, setBooleanShowPanelRename] = useState(false);
  // const [booleanShowPanelIcon, setBooleanShowPanelIcon] = useState(false);
  const [booleanShowPanelSetting, setBooleanShowPanelSetting] = useState(false);
  const [booleanShowPanelDelete, setBooleanShowPanelDelete] = useState(false);
  const [popoverVisible, setPopoverVisible] = useState<boolean>(false);
  const {spaceAll, GetApiCmtSpaceAllReq} = useModel('community');

  const changeGroupRequest = useRequestX(PutApiSpacesGuid, {
    onSuccess({ code, msg }) {
      // 切换成功后，刷新space tree
      GetApiCmtSpaceAllReq.run();
    },
  });
  const content = (
    <div className={styles.popover}>
      <div className={styles.content_group}>
        {spaceAll.spaceGroupList.filter((value) => value?.isAllowCreateSpace)
          .map((value, index, array) => (
            <div
              key={value.guid}
              className={styles.content_group_select}
              onClick={() => {
                setPopoverVisible(false);
                // 切换分组
                changeGroupRequest.run(guid, {
                  spaceGroupGuid: value.guid,
                });
              }}
            >
              {value.name}
            </div>
          ))}
      </div>
    </div>
  );
  const handleCancelIcon = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setBooleanShowPanelIcon(false);
  };

  // 渲染切换分组
  const renderChangeGroup = () => {
    return (
      <Popover
        content={content}
        trigger="click"
        placement="right"
        className={styles.picker}
        zIndex={100}
        open={popoverVisible}
        onOpenChange={(visible) => {
          setPopoverVisible(visible);
        }}
        getPopupContainer={(triggerNode) => triggerNode.parentNode}
      >
        <div
          className={styles.item}
          onClick={(e) => {
            // setDropDownSpaceSetting();
            // e.preventDefault();
            // e.stopPropagation();
            // setBooleanShowDropdownGroupSelector(true);
          }}
        >
          <img src={require('../../static/space_setting_change_group.svg')} />
          <span
            className={styles.item_text}
            style={{
              marginRight: 'auto',
            }}
          >
            {i('cmtSidebar.spaceSetting.changeGroup')}
          </span>
          <ArrowRightOutlined />
          &nbsp;&nbsp;
        </div>
      </Popover>
    );
  };

  return (
    <>
      <div className={styles.container}>
        <div
          className={styles.item}
          onClick={(e) => {
            // setDropDownSpaceSetting();
            e.preventDefault();
            setBooleanShowPanelRename(true);
          }}
        >
          <img src={require('../../static/space_setting_rename.svg')} />
          <span
            className={styles.item_text}
            style={{
              marginRight: 'auto',
            }}
          >
            {i('cmtSidebar.spaceSetting.rename')}
          </span>
        </div>
        {/*<div*/}
        {/*  className={styles.item}*/}
        {/*  onClick={(e) => {*/}
        {/*    // setDropDownSpaceSetting();*/}
        {/*    e.preventDefault();*/}
        {/*    e.stopPropagation();*/}
        {/*    setBooleanShowPanelIcon(true);*/}
        {/*  }}*/}
        {/*>*/}
        {/*  <img src={require('../../static/space_setting_icon.svg')} />*/}
        {/*  <span*/}
        {/*    className={styles.item_text}*/}
        {/*    style={{*/}
        {/*      marginRight: 'auto',*/}
        {/*    }}*/}
        {/*  >*/}
        {/*    {i('cmtSidebar.spaceSetting.icon')}*/}
        {/*  </span>*/}
        {/*</div>*/}
        <div
          className={styles.item}
          onClick={(e) => {
            setDropDownSpaceSetting();
            setBooleanShowPanelSetting(true);
            // setDropDownSpaceSetting(false)
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <img src={require('../../static/space_setting_setting.svg')} />
          <span
            className={styles.item_text}
            style={{
              marginRight: 'auto',
            }}
          >
            {i('cmtSidebar.spaceSetting.setting')}
          </span>
        </div>
        {renderChangeGroup()}
        <div className={styles.divider} />
        <div
          className={styles.item}
          onClick={(e) => {
            setDropDownSpaceSetting();
            e.preventDefault();
            e.stopPropagation();
            setBooleanShowPanelDelete(true);
          }}
        >
          <img src={require('../../static/space_setting_delete.svg')} />
          <span
            className={styles.item_text_delete}
            style={{
              marginRight: 'auto',
            }}
          >
            {i('cmtSidebar.spaceSetting.delete')}
          </span>
        </div>
      </div>
      <PanelRename
        visible={booleanShowPanelRename}
        onClose={(event) => {
          setBooleanShowPanelRename(false);
          event.stopPropagation();
        }}
        nodeSpace={nodeSpace}
        spaceGuid={guid}
      />
      <SpaceSettingModal
        visible={booleanShowPanelSetting}
        spaceGuid={guid}
        onClose={(event) => {
          event.stopPropagation();
          setBooleanShowPanelSetting(false);
        }}
      />
      <PanelDelete
        visible={booleanShowPanelDelete}
        onClose={() => {
          setBooleanShowPanelDelete(false);
        }}
        spaceName={nodeSpace.name}
        spaceGuid={guid}
      />
      {/*{booleanShowPanelIcon ? (*/}
      {/*  <Modal*/}
      {/*    title={i('cmtSidebar.spaceSetting.icon')}*/}
      {/*    onCancel={handleCancelIcon}*/}
      {/*    visible={true}*/}
      {/*    okButtonProps={{ disabled: true }}*/}
      {/*    cancelButtonProps={{ disabled: true }}*/}
      {/*    footer={null}*/}
      {/*  ></Modal>*/}
      {/*) : null}*/}
    </>
  );
};

export default SpaceSetting;
