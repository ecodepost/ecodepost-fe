import {messageInfo} from '@/components/Message/Message';
import {Avatar, Button, Checkbox, Dropdown, Menu, Spin, Table} from 'antd';
import dayjs from 'dayjs';
import React, {useEffect, useState} from 'react';
import {useIntl} from 'umi';
import styles from './MemberList.less';
import {Role} from "@/pages/typings";
import useRequestX from "@/hooks/useRequestX";
import {
  DeleteApiCmtAdminPmsManagersMembersUid,
  DeleteApiCmtAdminPmsRolesRoleIdMembers,
  GetApiCmtAdminPmsManagersMembers,
  GetApiCmtAdminPmsRoles,
  GetApiCmtAdminPmsRolesUsersUidRoleIds,
  GetApiMyCmtMembers,
  PostApiCmtAdminPmsManagersMembers,
  PostApiCmtAdminPmsRolesRoleIdMembers
} from "@/services/base/api.gen";

const {Column} = Table;

interface ActionMenuProps {
  uid: number;
  rolesLoading: boolean;
  roles: Role[];
}

const ActionMenu: React.FC<ActionMenuProps> = (props) => {
  const { uid, rolesLoading, roles } = props;
  const [joinedRoles, setJoinedRoles] = useState<number[]>([]);
  const [fetchUserRolesLoading, setFetchUserRolesLoading] = useState<boolean>(false);
  const intl = useIntl();
  const i = (id: string) => intl.formatMessage({ id });


  const handleJoinRole = async (userUid: number, roleId: number) => {
    const type = joinedRoles.includes(roleId) ? 'remove' : 'add';
    const apiMap = {
      add: PostApiCmtAdminPmsRolesRoleIdMembers,
      remove: DeleteApiCmtAdminPmsRolesRoleIdMembers,
    };
    try {
      const res = await apiMap[type](roleId, {
        uids: [userUid],
      });
      if (res.code === 0) {
        messageInfo({
          type: 'success',
          content: `${type === 'add' ? i('add') : i('remove')}${i('success')}`
        })
        if (type === 'add') {
          setJoinedRoles([...joinedRoles, roleId]);
        } else {
          setJoinedRoles(joinedRoles.filter((id) => id !== roleId));
        }
      } else {
        messageInfo({
type: 'error',
content: res.msg,
})
      }
    } catch (err) {
      messageInfo({
type: 'error',
content: `${type === 'add' ? i('add') : i('remove')}${i('fail')}`,
})
    }
  };
  const fetchUserRoles = async () => {
    setFetchUserRolesLoading(true);
    try {
      const res = await GetApiCmtAdminPmsRolesUsersUidRoleIds(uid);
      if (res.code === 0) {
        setJoinedRoles(res.data?.roleIds || []);
        setFetchUserRolesLoading(false);
      } else {
        messageInfo({
          type: 'error',
          content: res.msg,
        })
      }
    } catch (err) {
      messageInfo({
type: 'error',
content: i('cmtadmin.member.groups.member.roles.fail'),
})
    }
  };
  useEffect(() => {
    fetchUserRoles();
  }, []);
  return (
    <Menu
      items={[
        {
          key: `${uid}-1`,
          label: i('cmtadmin.member.groups.member.roles.cmt.remove'),
        },
        {
          key: `${uid}-2`,
          label: i('cmtadmin.member.groups.member.roles.role'),
          children:
            rolesLoading || fetchUserRolesLoading
              ? [
                  {
                    key: `${uid}-2-loading`,
                    label: <Spin />,
                  },
                ]
              : [
                  ...roles.map((role) => ({
                    key: role.id,
                    label: (
                      <div
                        className={styles.menuItem}
                        onClick={(e) => {
                          handleJoinRole(uid, role.id);
                          e.stopPropagation();
                        }}
                      >
                        <Avatar>{role.name?.[0]}</Avatar>
                        <span>{role.name}</span>
                        <Checkbox checked={joinedRoles?.indexOf(role.id) !== -1} />
                      </div>
                    ),
                  })),
                ],
        },
      ]}
    />
  );
};

const MemberList = () => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [rolesLoading, setRolesLoading] = useState<boolean>(false);
  /** 表格的加载，在搜索成员时也需要替换 */
  const [membersLoading, setMembersLoading] = useState<boolean>(false);
  /** 总人数的加载，只有页面初始进入时需要替换 */
  const [members, setMembers] = useState<Communityv1MemberAdminShowInfo[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [managerList, setManagerList] = useState<PmsMemberInfo[]>();

  const intl = useIntl();
  const i = (id: string) => intl.formatMessage({id});
  const GetApiMyCmtMembersRequest = useRequestX(GetApiMyCmtMembers, {
    onSuccess: (res) => {
      setMembers(res.data?.list || []);
      setTotal(res.pagination?.total || 0);
      setMembersLoading(false);
    }
  })


  const GetApiCmtAdminPmsManagersMembersReq = useRequestX(GetApiCmtAdminPmsManagersMembers, {
    onSuccess: ({data}) => {
      setManagerList(data.list);
    }
  })


  const PostApiCmtAdminPmsManagersMembersReq = useRequestX(PostApiCmtAdminPmsManagersMembers, {
    onSuccess: () => {
      messageInfo({
        content: i('cmtadmin.admin.setting.superadminmodal.add.success'),
        type: 'success',
      });
      GetApiCmtAdminPmsManagersMembersReq.run();
    }
  })

  const DeleteApiCmtAdminPmsManagersMembersUidReq = useRequestX(DeleteApiCmtAdminPmsManagersMembersUid, {
    onSuccess: ({data}) => {
      GetApiCmtAdminPmsManagersMembersReq.run();
      messageInfo({
        type: 'success',
        content: `${i('remove')}${i('success')}`,
      });
    }
  })

  const fetchRoles = async () => {
    setRolesLoading(true);
    try {
      const res = await GetApiCmtAdminPmsRoles();
      if (res.code === 0) {
        setRoles(res.data?.list || []);
        setRolesLoading(false);
      } else {
        messageInfo({
type: 'error',
content: res.msg,
})
      }
    } catch (err) {
      messageInfo({
type: 'error',
content: i('cmtadmin.member.groups.member.roles.init.fail'),
})
    }
  };
  const fetchMembers = async () => {
    setMembersLoading(true);
    await GetApiMyCmtMembersRequest.run({
      currentPage: 1
    });
    await GetApiCmtAdminPmsManagersMembersReq.run()
  };

  useEffect(() => {
    Promise.all([fetchRoles(), fetchMembers()]);
  }, []);
  return (
    <Spin spinning={GetApiMyCmtMembersRequest.loading}>
      <div className={styles.list}>
        <div className={styles.list_title}>
        <span>
          {i('total')}
          {total}
          {i('members')}
        </span>
        </div>
        <div className={styles.list_content}>
          <Table
            rowKey={'uid'}
            loading={membersLoading}
            dataSource={members}
            pagination={{hideOnSinglePage: true}}
          >
            <Column
              // title={
              //   <Input
              //     className={styles.list_content_input}
              //     prefix={<SearchOutlined />}
              //     placeholder={i('cmtadmin.member.groups.member.search.placeholder')}
              //   />
              // }
              dataIndex="nickname"
              key="nickname"
              render={(_, record: Communityv1MemberAdminShowInfo) => (
                <div onClick={() => {
                  // pushUserPage(`${record.name}`)
                }}>
                  <Avatar src={record.avatar} size={60}/>
                  <span className={styles.list_content_name}>{record.nickname}</span>
                </div>
              )}
            />
            <Column
              title={i('cmtadmin.member.groups.member.lastLoginTime')}
              dataIndex="lastLoginTime"
              key="lastLoginTime"
              align="center"
              render={(_, record: Communityv1MemberAdminShowInfo) => (
                <span className={styles.list_content_logintime}>
                {record?.lastLoginTime
                  ? dayjs.unix(record.lastLoginTime).format('YYYY-MM-DD HH:mm')
                  : '--'}
              </span>
              )}
            />
            <Column
              title={i('cmtadmin.member.groups.member.joinTime')}
              dataIndex="joinTime"
              key="joinTime"
              align="center"
              render={(_, record: Communityv1MemberAdminShowInfo) => (
                <span className={styles.list_content_jointime}>
                {record?.joinTime ? dayjs.unix(record.joinTime).format('YYYY-MM-DD HH:mm') : '--'}
              </span>
              )}
            />
            <Column
              title="超级管理员权限"
              dataIndex="action"
              key="action"
              align="center"
              render={(_, record: Communityv1MemberAdminShowInfo) => (
                managerList && <div className={styles.table_action}>
                  {managerList.find((item) => item.uid === record.uid) ?
                    <Button
                      className={styles.table_action_btn}
                      onClick={() => DeleteApiCmtAdminPmsManagersMembersUidReq.run(record.uid)}
                      loading={DeleteApiCmtAdminPmsManagersMembersUidReq.loading}
                    >
                      {i('cmtadmin.admin.setting.superadmin.remove')}
                    </Button> : <Button
                      type="primary"
                      className={styles.table_action_btn}
                      onClick={() => PostApiCmtAdminPmsManagersMembersReq.run({uids: [record.uid]})}
                      loading={PostApiCmtAdminPmsManagersMembersReq.loading}
                    >
                      添加管理员
                    </Button>}
                </div>
              )}
            />
            <Column
              align="center"
              dataIndex="action"
              key="action"
              render={(_, record: Communityv1MemberAdminShowInfo) => (
                <Dropdown
                  getPopupContainer={(triggerNode) => triggerNode?.parentNode as HTMLElement}
                  overlayClassName={styles.actionMenu}
                  overlay={<ActionMenu uid={record.uid} rolesLoading={rolesLoading} roles={roles}/>}
                >
                  <i className="iconfont icon-icon"/>
                </Dropdown>
              )}
            />
          </Table>
        </div>
      </div>
    </Spin>
  )
};

export default MemberList;
