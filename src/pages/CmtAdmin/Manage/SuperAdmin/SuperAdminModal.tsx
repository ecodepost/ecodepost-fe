import {Avatar, Button} from 'antd';
import React, {useState} from 'react';
import {useIntl} from '@umijs/max';
import styles from './SuperAdminModal.less';
import {messageInfo} from '@/components/Message/Message';
import DebounceSelect from '@/components/SuperModal/DebounceSelect';
import {GetApiCmtSearchMembers, PostApiCmtAdminPmsManagersMembers} from "@/services/base/api.gen";
import useRequestX from "@/hooks/useRequestX";

interface UserItem {
  uid: number;
  nickname: string;
  avatar: string;
}

interface SuperAdminModalProps {
  setSuperAdminVisible: (visible: boolean) => void;
  fetchManagerList: (type?: string) => void;
}

const SuperAdminModal: React.FC<SuperAdminModalProps> = (props) => {
  const {setSuperAdminVisible, fetchManagerList} = props;
  const [value, setValue] = useState<any[]>([]);

  const intl = useIntl();
  const i = (id: string) => intl.formatMessage({id});
  const [selectedUsers, setSelectedUsers] = useState<UserItem[]>([]);

  const PostApiCmtAdminPmsManagersMembersReq = useRequestX(PostApiCmtAdminPmsManagersMembers, {
    onSuccess: () => {
      messageInfo({
        content: i('cmtadmin.admin.setting.superadminmodal.add.success'),
        type: 'success',
      });
      fetchManagerList();
      setSuperAdminVisible(false);
    }
  })

  const GetApiCmtSearchMembersRequest = useRequestX(GetApiCmtSearchMembers, {
    onSuccess: (res) => {
    }
  })

  const fetchUserList = async (search: string) => {
    const res = await GetApiCmtSearchMembersRequest.run({
      keyword: search,
      spaceGuid: '',
      currentPage: 0,
      pageSize: 0,
      sort: ''
    })
    return res.data.list
  };

  return (
    <div className={styles.super} id="superadmin_modal">
      <div className={styles.superTitle}>
        <span>{i('cmtadmin.admin.setting.superadminmodal.title')}</span>
      </div>
      <div className={styles.superInput}>
        <DebounceSelect
          mode="multiple"
          selectedUsers={selectedUsers}
          setSelectedUsers={setSelectedUsers}
          value={value}
          className={styles.superInputBox}
          placeholder={i('cmtadmin.admin.setting.superadminmodal.userselect.placeholder')}
          fetchOptions={fetchUserList}
          onChange={(newValue) => setValue(newValue)}
          style={{ width: '100%' }}
        />
      </div>
      <div className={styles.superList}>
        {selectedUsers.map((u) => (
          <div className={styles.superListItem} key={u.uid}>
            <Avatar size={40} src={u.avatar} />
            <span className={styles.superListItemName}>{u.nickname}</span>
          </div>
        ))}
      </div>
      <div className={styles.superAction}>
        <Button
          type="primary"
          className={styles.superActionBtn}
          disabled={selectedUsers.length === 0}
          onClick={() => PostApiCmtAdminPmsManagersMembersReq.run({uids: selectedUsers.map((u) => u.uid)})}
          loading={PostApiCmtAdminPmsManagersMembersReq.loading}
        >
          {i('confirm-queding')}
        </Button>
      </div>
    </div>
  );
};

export default SuperAdminModal;
