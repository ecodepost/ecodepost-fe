import { messageInfo } from '@/components/Message/Message';
import { Avatar, Button, message, Modal, Popover } from 'antd';
import classNames from 'classnames';
import { useState } from 'react';
import { useIntl } from 'umi';
import MemberAction from './MemberAction/MemberAction';
import styles from './MemberCard.less';

interface MemberCardProps {
  MemberAPIMap: MemberAPIMap;
  type: 'group' | 'space' | 'cmtAdmin';
  member: Member;
  guid: string;
  fetchGroupMembers: (initPage?: number) => void;
  pmsManagerType: number;
}

const MemberCard: React.FC<MemberCardProps> = (props) => {
  const { member, guid, fetchGroupMembers, type, MemberAPIMap, pmsManagerType } = props;
  const avatarSize = type === 'cmtAdmin' ? 60 : 80;

  const intl = useIntl();
  const i = (id: string) => intl.formatMessage({ id });

  const pmsRoleText = ['', i('pmsroletype.superAdmin'), i('pmsroletype.admin')];

  const [deleteMemberBtnLoading, setDeleteMemberBtnLoading] = useState<boolean>(false);
  const deleteMember = async () => {
    Modal.confirm({
      content: i('member.card.delete.confirm'),
      onOk: async () => {
        setDeleteMemberBtnLoading(true);
        try {
          const res = await MemberAPIMap.cmtAdmin.delete(guid, [member.uid]);
          if (res.code === 0) {
            messageInfo({
type: 'success',
content: i('member.card.delete.success')
})
            fetchGroupMembers(1);
            setDeleteMemberBtnLoading(false);
          } else {
            messageInfo({
type: 'error',
content: res.msg,
})
          }
        } catch (err) {
          messageInfo({
type: 'error',
content: i('member.card.delete.fail'),
})
        }
      },
    });
  };

  return (
    <div className={styles.card}>
      <div className={styles.card_aside}>
        {member.avatar ? (
          <Avatar size={avatarSize} src={member.avatar} />
        ) : (
          <Avatar size={avatarSize} icon={<i className='iconfont icon-chengyuan' />} />
        )}
      </div>
      <div className={styles.card_main}>
        <div className={styles.card_main_info}>
          <div className={styles.nickname}>
            <span>{member.nickname}</span>
          </div>
          {type !== 'cmtAdmin' && member?.pmsManagerType && (
            <div className={styles.role}>
              <span>{pmsRoleText[member.pmsManagerType]}</span>
            </div>
          )}
        </div>
        {type !== 'cmtAdmin' && (
          <div className={styles.card_main_action}>
            <Popover
              getPopupContainer={(triggerNode) => triggerNode?.parentNode as HTMLElement}
              content={
                <MemberAction
                  MemberAPIMap={MemberAPIMap}
                  type={type}
                  fetchGroupMembers={fetchGroupMembers}
                  member={member}
                  guid={guid}
                  pmsManagerType={pmsManagerType}
                />
              }
              trigger="click"
              placement="bottom"
            >
              <i className={classNames('iconfont', 'icon-icon', styles.action)} />
            </Popover>
          </div>
        )}
      </div>
      {type === 'cmtAdmin' && (
        <Button
          className={styles.card_cmtAdmin_btn}
          onClick={() => deleteMember()}
          loading={deleteMemberBtnLoading}
        >
          {i('member.card.remove')}
        </Button>
      )}
    </div>
  );
};

export default MemberCard;
