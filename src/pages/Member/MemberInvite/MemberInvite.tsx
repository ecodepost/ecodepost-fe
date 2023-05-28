import {messageInfo} from '@/components/Message/Message';
import {Avatar, Button, Transfer} from 'antd';
import styles from './MemberInvite.less';
/** @ts-ignore */
import {useIntl, useParams} from 'umi';
import type {TransferDirection, TransferListProps} from 'antd/lib/transfer';
import {useState} from 'react';
import {ProList} from '@ant-design/pro-components';
import {debounce} from 'lodash';
import classNames from 'classnames';
import {GetApiCmtSearchMembers} from '@/services/base/api.gen';
import useRequestX from '@/hooks/useRequestX';

interface InviteMemberProps {
  MemberAPIMap: MemberAPIMap;
  type: 'group' | 'space' | 'cmtAdmin';
  fetchGroupMembers: (initPage?: number) => void;
  setInviteMemberVisible: (visible: boolean) => void;
  /** 邀请页面显示的标题，如邀请用户进入 吃喝玩乐游 */
  title?: string;
}

const InviteMember: React.FC<InviteMemberProps> = (props) => {
  const { fetchGroupMembers, setInviteMemberVisible, type, MemberAPIMap } = props;
  const { groupGuid, spaceGuid, roleId } = useParams<{
    groupGuid: string;
    spaceGuid: string;
    roleId: string;
  }>();

  const intl = useIntl();
  const i = (id: string) => intl.formatMessage({ id });

  const currentId = (() => {
    switch (type) {
      case 'space':
        return spaceGuid;
      case 'group':
        return groupGuid;
      case 'cmtAdmin':
        return roleId;
      default:
        return '';
    }
  })();
  const [memberList, setMemberList] = useState<Userv1UserInfo[]>([]);
  const [targetItems, setTargetItems] = useState<Userv1UserInfo[]>([]);

  const GetApiCmtSearchMembersRequest = useRequestX(GetApiCmtSearchMembers, {
    onSuccess: ({ data }) => {
      const searchMemberList = data.list || [];
      setMemberList(searchMemberList);
      setMemberList(
        searchMemberList.filter((item) => targetItems.every((el) => el.uid !== item.uid)),
      );
    },
  });

  const searchMembers = async (text: string) => {
    if (text === '') return;
    GetApiCmtSearchMembersRequest.run({
      keyword: text,
    });
  };

  const [selectedRowKeys, setSelectedRowKeys] = useState<number[]>([]);
  const rowSelection = {
    selectedRowKeys,
    onChange: (keys: number[]) => setSelectedRowKeys(keys),
  };

  const renderFooter = (
    _: TransferListProps<any>,
    {
      direction,
    }: {
      direction: TransferDirection;
    },
  ) => {
    if (direction === 'left') {
      return (
        <Button
          onClick={() => {
            const targets = memberList?.filter((item) => selectedRowKeys.includes(item.uid));
            setTargetItems([...targetItems, ...targets]);
            const originMembers = [...memberList];
            selectedRowKeys.forEach((el) => {
              originMembers.splice(
                originMembers.findIndex((item) => item.uid === el),
                1,
              );
            });
            setMemberList(originMembers);
            setSelectedRowKeys([]);
          }}
        >
          {i('member.invite.searchMembers.addToSelect')}
        </Button>
      );
    } else return null;
  };

  const handleDeleteChosen = (item: Userv1UserInfo) => {
    const targets = [...targetItems];
    targets.splice(
      targetItems.findIndex((el) => el.uid === item.uid),
      1,
    );
    setTargetItems([...targets]);
    memberList.push(item);
  };

  const handleSearch = (_: string, text: string) => {
    debounce(searchMembers, 500)(text);
  };

  const [inviteBtnLoading, setInviteBtnLoading] = useState<boolean>(false);
  const handleInvite = async () => {
    if (targetItems.length === 0) return;
    setInviteBtnLoading(true);
    try {
      const res = await MemberAPIMap[type].create(
        currentId,
        targetItems.map((item) => item.uid),
      );
      if (res.code === 0) {
        messageInfo({
          type: 'success',
          content: i('member.invite.success'),
        });
        fetchGroupMembers(1);
        setInviteMemberVisible(false);
        setInviteBtnLoading(false);
      } else {
        messageInfo({
          type: 'error',
          content: res.msg,
        });
      }
    } catch (err) {
      messageInfo({
        type: 'error',
        content: i('member.invite.fail'),
      });
    }
  };

  return (
    <div className={styles.invite}>
      <div className={styles.invite_header}>
        <span>
          {i('member.invite.title')} {props?.title}
        </span>
      </div>
      <div className={styles.invite_main}>
        <Transfer
          dataSource={memberList}
          showSearch
          showSelectAll={false}
          listStyle={{
            width: '50%',
            height: 300,
          }}
          filterOption={() => true}
          onSearch={handleSearch}
          /** @ts-ignore */
          footer={renderFooter}
        >
          {({
            direction,
            filteredItems,
            onItemSelectAll,
            onItemSelect,
            selectedKeys: listSelectedKeys,
            disabled: listDisabled,
          }) => {
            return (
              <>
                {direction === 'right' && (
                  <span className={styles.memberCnt}>
                    {i('member.invite.selectedCnt')}&nbsp;{targetItems.length}
                    {i('person')}
                  </span>
                )}
                <ProList<Userv1UserInfo>
                  locale={{emptyText: direction === 'left' ? i('member.invite.noMember') : ' '}}
                  loading={direction === 'left' && GetApiCmtSearchMembersRequest.loading}
                  metas={{
                    title: {
                      render: (_, item) => (
                        <span className={styles.memberNickname}>{item?.nickname}</span>
                      ),
                    },
                    avatar: {
                      render: (_, item) =>
                        item.avatar ? (
                          <Avatar size={40} src={item.avatar}/>
                        ) : (
                          <Avatar size={40} icon={<i className='iconfont icon-chengyuan' />} />
                        ),
                    },
                    actions: {
                      render: (_, item) => {
                        return (
                          direction === 'right' && (
                            <i
                              className={classNames('iconfont', 'icon-guanbi', styles.deleteMember)}
                              onClick={() => handleDeleteChosen(item)}
                            />
                          )
                        );
                      },
                    },
                  }}
                  rowKey="uid"

                  rowSelection={direction === 'left' ? rowSelection : false}
                  dataSource={direction === 'left' ? memberList : targetItems}
                />
              </>
            );
          }}
        </Transfer>
      </div>
      <div className={styles.invite_action}>
        <Button
          className={styles.invite_action_btn}
          type="primary"
          onClick={() => handleInvite()}
          loading={inviteBtnLoading}
        >
          {i('invite')}
        </Button>
      </div>
    </div>
  );
};

export default InviteMember;
