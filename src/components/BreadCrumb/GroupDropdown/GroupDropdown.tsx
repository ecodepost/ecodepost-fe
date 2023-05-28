import styles from './GroupDropdown.less';
import {Button, Divider, Dropdown, Modal} from 'antd';
import React, {useState} from 'react';
import UseRequestX from '@/hooks/useRequestX';
import {useModel} from 'umi';
import {DeleteApiSpacesGroupsGuid} from '@/services/base/api.gen';
import UpdateGroup from '@/components/Space/UpdateGroup/UpdateGroup';
import CreateSpace from '@/components/Space/CreateSpace/CreateSpace';
import classNames from 'classnames';
import {DeleteOutlined, DownOutlined, PictureOutlined, UserOutlined} from '@ant-design/icons';

interface GroupDropDownProps {
}

const GroupDropdown: React.FC<GroupDropDownProps> = (props) => {
  const [dropdownPage, setDropdownPage] = useState<boolean>(false);
  const [booleanShowPanelDelete, setBooleanShowPanelDelete] = useState<boolean>(false);
  const [updateGroupVisible, setUpdateGroupVisible] = useState<boolean>(false);
  const [createSpaceVisible, setCreateSpaceVisible] = useState<boolean>(false);
  const {GetApiCmtSpaceAllReq, selectedSpaceGroup} = useModel('community');
  const deleteGroupRequest = UseRequestX(DeleteApiSpacesGroupsGuid, {
    onSuccess() {
      GetApiCmtSpaceAllReq.run();
    },
    loadingText: {
      done: '删除成功',
    },
  });

  const GroupSetting = () => {
    return (
      <div className={styles.group_setting_container}>
        <div className={styles.item}>
          <PictureOutlined />
          <span
            className={styles.subTitle}
            onClick={() => {
              setDropdownPage(false);
              setUpdateGroupVisible(true);
            }}
          >
            编辑分组
          </span>
        </div>
        <div
          className={styles.item}
          onClick={() => {
            setDropdownPage(false);
            setCreateSpaceVisible(true);
          }}
        >
          <UserOutlined />
          <span className={styles.subTitle}>创建空间</span>
        </div>
        <Divider></Divider>
        <div
          className={classNames(styles.item, styles.delete)}
          onClick={() => {
            setDropdownPage(false);
            setBooleanShowPanelDelete(true);
          }}
        >
          <DeleteOutlined />
          <span className={styles.subTitle}>删除分组</span>
        </div>
      </div>
    );
  };

  return (
    (<div>
      {selectedSpaceGroup && (
        <>
          <Dropdown
            overlay={<GroupSetting></GroupSetting>}
            onOpenChange={setDropdownPage}
            open={dropdownPage}
            className={styles.container}
          >
            <a>
              <span>{selectedSpaceGroup.name}</span>
              <DownOutlined style={{ paddingLeft: '10px' }} />
            </a>
          </Dropdown>
          <Modal
            open={booleanShowPanelDelete}
            onCancel={() => {
              setBooleanShowPanelDelete(false);
            }}
            className={styles.modal}
            destroyOnClose={true}
            footer={null}
          >
            <div className={styles.content}>
              <span>确定要删除分组吗？</span>
            </div>
            <div className={styles.action}>
              <Button
                className={styles.action_btn}
                // type="primary"
                htmlType="submit"
                onClick={(e) => {
                  setBooleanShowPanelDelete(false);
                }}
                style={{
                  color: 'black',
                }}
              >
                取消
              </Button>
              <Button
                className={styles.action_btn}
                htmlType="submit"
                type="primary"
                danger={true}
                onClick={() => {
                  setBooleanShowPanelDelete(false);
                  deleteGroupRequest.run(selectedSpaceGroup.guid);
                }}
              >
                确认
              </Button>
            </div>
          </Modal>
          <UpdateGroup
            groupInfo={selectedSpaceGroup}
            visible={updateGroupVisible}
            onClose={() => {
              setUpdateGroupVisible(false);
            }}
          />
          <CreateSpace
            visible={createSpaceVisible}
            groupGuid={selectedSpaceGroup.guid}
            onClose={() => {
              setCreateSpaceVisible(false);
            }}
          />
        </>
      )}
    </div>)
  );
};
export default GroupDropdown;
