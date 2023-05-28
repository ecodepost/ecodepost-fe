import { FolderOutlined, PlusCircleOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import React, { useState } from 'react';
import { history, useIntl, useModel } from '@umijs/max';
import CommunityInvite from '../CommunityInvite/CommunityInvite';
import CreateGroup from '@/components/Space/CreateGroup/CreateGroup';
import CreateSpace from '@/components/Space/CreateSpace/CreateSpace';
import styles from './CommunitySetting.less';
import NeedToLogin from '@/components/NeedToLogin/NeedToLogin';

interface CommunitySettingProps {
  cmtInfo: DtoCmtInfo;
  setCmtSettings: any;
}

const CommunitySetting: React.FC<CommunitySettingProps> = (props) => {
  const [inviteMemberVisible, setInviteMemberVisible] = useState<boolean>(false);
  const [addGroupVisible, setAddGroupVisible] = useState<boolean>(false);
  const [addSpaceVisible, setAddSpaceVisible] = useState<boolean>(false);

  const {
    initialState: { isOnline, checkLogin,currentCmt },
  } = useModel('@@initialState');
  const { permission: cmtPms } = currentCmt;
  const { cmtInfo, setCmtSettings } = props;

  const intl = useIntl();
  const i = (id: string) => intl.formatMessage({ id });

  return (
    <>
      {!isOnline() ? (
        NeedToLogin({ login: i('cmt.login'), signup: i('cmt.signup'), checkLogin })
      ) : (
        <>
          {cmtPms && (
            <div
              className={classNames(
                styles.container,
                !cmtInfo.isShowSidebar ? styles.container_big_width : '',
              )}
            >
              {cmtPms.isAllowManageCommunity && (
                <div
                  className={styles.item}
                  onClick={() => {
                    setInviteMemberVisible(true);
                    setCmtSettings();
                  }}
                >
                  <span className={styles.item_text}>{i('cmtSidebar.setting.invite')}</span>
                  <i className={classNames('iconfont', 'icon-tianjiahaoyou', styles.item_icon)} />
                </div>
              )}
              {cmtPms.isAllowManageCommunity && (
                <CommunityInvite
                  visible={inviteMemberVisible}
                  title={cmtInfo.name}
                  onClose={() => {
                    setInviteMemberVisible(false);
                  }}
                />
              )}
              {cmtPms.isAllowManageCommunity && (
                <div
                  className={styles.item}
                  onClick={() => {
                    history.push(`/admin/setting/summary`);
                  }}
                >
                  <span className={styles.item_text}>{i('cmtSidebar.setting.admin')}</span>
                  <i className={classNames('iconfont', 'icon-shezhi', styles.item_icon)} />
                </div>
              )}
              {cmtPms.isAllowCreateSpace && (
                <div>
                  <div
                    className={styles.item}
                    onClick={() => {
                      setCmtSettings();
                      setAddSpaceVisible(true);
                    }}
                  >
                    <span className={styles.item_text}>{i('cmtSidebar.setting.space')}</span>
                    <PlusCircleOutlined className={styles.item_icon} />
                  </div>
                  <CreateSpace
                    visible={addSpaceVisible}
                    onClose={() => {
                      setAddSpaceVisible(false);
                    }}
                    groupGuid=""
                  />
                </div>
              )}
              {cmtPms.isAllowCreateSpaceGroup && (
                <>
                  <div
                    className={styles.item}
                    onClick={() => {
                      setAddGroupVisible(true);
                      setCmtSettings();
                    }}
                  >
                    <span className={styles.item_text}>{i('cmtSidebar.setting.group')}</span>
                    <FolderOutlined className={styles.item_icon} />
                  </div>
                  <CreateGroup
                    visible={addGroupVisible}
                    onClose={() => {
                      setAddGroupVisible(false);
                    }}
                  />
                </>
              )}
            </div>
          )}
        </>
      )}
    </>
  );
};

export default CommunitySetting;
