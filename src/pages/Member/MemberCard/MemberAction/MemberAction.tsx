import {messageInfo} from '@/components/Message/Message';
import {PmsRoleType} from '@/enums/pmsroletype';
import {useIntl} from 'umi';
import styles from './MemberAction.less';
import {DeleteApiCmtAdminPmsManagersMembersUid} from "@/services/base/api.gen";
import useRequestX from "@/hooks/useRequestX";

interface MemberActionProps {
  MemberAPIMap: MemberAPIMap;
  type: 'group' | 'space' | 'cmtAdmin';
  guid: string;
  member: Member;
  fetchGroupMembers: (initPage?: number) => void;
  pmsManagerType: number;
}

const MemberAction: React.FC<MemberActionProps> = (props) => {
  const {guid, member, fetchGroupMembers, type, MemberAPIMap, pmsManagerType} = props;

  const intl = useIntl();
  const i = (id: string) => intl.formatMessage({id});

  const DeleteApiCmtAdminPmsManagersMembersUidReq = useRequestX(DeleteApiCmtAdminPmsManagersMembersUid, {
    onSuccess: () => {
    }
  })

  const handleDeAdmin = async () => {
    let pmsType = '';
    switch (pmsManagerType) {
      case PmsRoleType.ADMIN:
        pmsType = 'admin';
        break;
      case PmsRoleType.SUPER_ADMIN:
        pmsType = 'superAdmin';
        break;
      default:
        pmsType = '';
    }
    const res = await DeleteApiCmtAdminPmsManagersMembersUidReq.run(member.uid)
    if (res.code === 0) {
      messageInfo({
        type: 'success',
        content: `${i('cancel')}${
          pmsType === 'admin' ? i('pmsroletype.admin') : i('pmsroletype.superAdmin')
        }${i('success')}`,
      })
      fetchGroupMembers(1);
    }
  };

  const deleteMember = async () => {
    try {
      const res = await MemberAPIMap[type].delete(guid, [member.uid]);
      if (res.code === 0) {
        messageInfo({
type: 'success',
content: i('member.card.action.delete.success')
})
        fetchGroupMembers(1);
      } else {
        messageInfo({
type: 'error',
content: res.msg,
})
      }
    } catch (err) {
      messageInfo({
type: 'error',
content: i('member.card.action.delete.fail'),
})
    }
  };
  return (
    <div className={styles.action_container}>
      <div className={styles.action_item} onClick={() => deleteMember()}>
        <span>{i('member.card.action.delete')}</span>
      </div>
      {pmsManagerType === PmsRoleType.ADMIN && (
        <div className={styles.action_item} onClick={() => handleDeAdmin()}>
          <span>{i('member.card.action.deAdmin')}</span>
        </div>
      )}
      {pmsManagerType === PmsRoleType.SUPER_ADMIN && (
        <div className={styles.action_item} onClick={() => handleDeAdmin()}>
          <span>{i('member.card.action.deSuperAdmin')}</span>
        </div>
      )}
    </div>
  );
};

export default MemberAction;
