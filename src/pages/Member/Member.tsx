import {messageInfo} from '@/components/Message/Message';
import LoadMore from '@/components/LoadMore/LoadMore';
import {SearchOutlined} from '@ant-design/icons';
import {Button, Empty, Input, Modal, Spin} from 'antd';
import {debounce} from 'lodash';
import {useEffect, useState} from 'react';
import {useIntl, useParams} from 'umi';
import InviteMember from './MemberInvite/MemberInvite';
import MemberCard from './MemberCard/MemberCard';
import styles from './Member.less';
import {addRoleMember, deleteRoleMember, getRoleMemberList} from '@/services/cmtAdmin/api';
import {
  DeleteApiSpacesGroupsGuidMembers,
  DeleteApiSpacesGuidMembers,
  GetApiSpacesGroupsGuidMembers,
  GetApiSpacesGroupsGuidSearchMembers,
  GetApiSpacesGuidMembers,
  GetApiSpacesGuidSearchMembers,
  PostApiSpacesGroupsGuidMembers,
  PostApiSpacesGuidMembers
} from "@/services/base/api.gen";

interface MemberProps {
  type: 'space' | 'group' | 'cmtAdmin';
  /** 邀请页面显示的标题，如邀请用户进入 吃喝玩乐游 */
  title?: string;
  isChannel: boolean;
}

const Member: React.FC<MemberProps> = (props) => {
  const {type, isChannel, title = ''} = props;
  const { groupGuid, spaceGuid, roleId } = useParams<{
    groupGuid: string;
    spaceGuid: string;
    roleId: string;
  }>();
  const currentId = (() => {
    switch (type) {
      case 'space':
        return spaceGuid;
      case 'group':
        return spaceGuid;
      case 'cmtAdmin':
        return roleId;
      default:
        return '';
    }
  })();

  const [memberList, setMemberList] = useState<Member[]>([]);
  const [memberListLoading, setMemberListLoading] = useState<boolean>(false);
  const [total, setTotal] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [isSearch, setIsSearch] = useState<boolean>(false);
  const [inviteMemberVisible, setInviteMemberVisible] = useState<boolean>(false);

  const intl = useIntl();
  const i = (id: string) => intl.formatMessage({ id });

  const MemberAPIMap = {
    space: {
      list: GetApiSpacesGuidMembers,
      create: PostApiSpacesGuidMembers,
      delete: DeleteApiSpacesGuidMembers,
      search: GetApiSpacesGuidSearchMembers,
    },
    group: {
      list: GetApiSpacesGroupsGuidMembers,
      create: PostApiSpacesGroupsGuidMembers,
      delete: DeleteApiSpacesGroupsGuidMembers,
      search: GetApiSpacesGroupsGuidSearchMembers,
    },
    cmtAdmin: {
      list: getRoleMemberList,
      create: addRoleMember,
      delete: deleteRoleMember,
      /** 需要改 */
      search: GetApiSpacesGroupsGuidSearchMembers,
    },
  };

  const fetchMembers = async (initPage?: number) => {
    setMemberListLoading(true);
    try {
      const res = await MemberAPIMap[type].list(
        currentId,
        /** @ts-ignore */
        type !== 'cmtAdmin' ? (initPage ? initPage : page) : null,
      );
      if (res.code === 0) {
        if (initPage) {
          setMemberList(res.data?.list || []);
        } else {
          setMemberList([...memberList, ...(res.data?.list || [])]);
        }
        setTotal(res.pagination?.total);
        setPage((prev) => prev + 1);
        setMemberListLoading(false);
      } else {
        messageInfo({
type: 'error',
content: res.msg,
})
      }
    } catch (err) {
      messageInfo({
type: 'error',
content: i('member.fetchMembers.fail'),
})
    }
  };

  const searchMembers = async (e: any) => {
    const val = e.target.value;
    if (val === '') {
      fetchMembers(1);
      setPage(1);
      setIsSearch(false);
      return;
    }
    try {
      setMemberListLoading(true);
      setIsSearch(true);
      const res = await MemberAPIMap[type].search(currentId, val);
      if (res.code === 0) {
        setMemberList(res.data?.list);
        setMemberListLoading(false);
        setPage(1);
      } else {
        messageInfo({
type: 'error',
content: res.msg,
})
      }
    } catch (err) {
      messageInfo({
type: 'error',
content: i('member.searchMember.fail'),
})
    }
  };
  const handleSearchMembers = debounce((e: any) => {
    searchMembers(e);
  }, 500);

  useEffect(() => {
    fetchMembers(1);
  }, []);

  return (
    (<div className={styles.member}>
      <div className={styles.member_header}>
        {type !== 'cmtAdmin' ? (
          <>
            <Button
              className={styles.member_header_btn}
              onClick={() => setInviteMemberVisible(true)}
            >
              <i className="iconfont icon-tianjiahaoyou" />
              &nbsp;
              <span style={{ marginLeft: 5 }}>{i('invite')}</span>
            </Button>
            <Modal
              open={inviteMemberVisible}
              width={600}
              footer={null}
              onCancel={() => setInviteMemberVisible(false)}
              className={styles.modal}
              destroyOnClose
            >
              <InviteMember
                type={type}
                title={title}
                MemberAPIMap={MemberAPIMap}
                fetchGroupMembers={fetchMembers}
                setInviteMemberVisible={setInviteMemberVisible}
              />
            </Modal>
          </>
        ) : (
          <>
            <Modal
              open={inviteMemberVisible}
              width={600}
              footer={null}
              onCancel={() => setInviteMemberVisible(false)}
              className={styles.modal}
              destroyOnClose
            >
              <InviteMember
                type={type}
                title={title}
                MemberAPIMap={MemberAPIMap}
                fetchGroupMembers={fetchMembers}
                setInviteMemberVisible={setInviteMemberVisible}
              />
            </Modal>
            <Input
              placeholder={i('member.searchMember.placeholder')}
              className={styles.member_header_input_cmtAdmin}
              prefix={<SearchOutlined />}
              onChange={(e) => handleSearchMembers(e)}
            />
            <Button
              className={styles.member_header_btn_cmtAdmin}
              onClick={() => setInviteMemberVisible(true)}
            >
              <i className="iconfont icon-tianjiahaoyou" />
              <span style={{ marginLeft: 5 }}>{i('member.addMember')}</span>
            </Button>
          </>
        )}

        {isChannel
          ? ''
          : type !== 'cmtAdmin' && (
              <Input
                placeholder={i('member.channel.searchMember.placeholder')}
                className={styles.member_header_input}
                prefix={<SearchOutlined />}
                onChange={(e) => handleSearchMembers(e)}
              />
            )}
      </div>
      {isChannel ? (
        ''
      ) : (
        <div className={styles.member_list}>
          {memberListLoading ? (
            <Spin />
          ) : memberList?.length > 0 ? (
            <>
              {memberList.map((member: Member) => (
                <MemberCard
                  MemberAPIMap={MemberAPIMap}
                  type={type}
                  fetchGroupMembers={fetchMembers}
                  guid={currentId}
                  key={member.uid}
                  member={member}
                  pmsManagerType={member.pmsManagerType}
                />
              ))}
              <LoadMore
                id={`${type}_member`}
                key={`${type}_member`}
                haveMore={memberList.length < total && !isSearch}
                onLoadMore={() => fetchMembers()}
              />
            </>
          ) : (
            <Empty />
          )}
        </div>
      )}
    </div>)
  );
};

export default Member;
