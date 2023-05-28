import {messageInfo} from '@/components/Message/Message';
import {deleteRole} from '@/services/cmtAdmin/api';
import {PlusOutlined, SearchOutlined} from '@ant-design/icons';
import {Avatar, Empty, Input, Modal, Popover} from 'antd';
import {createContext, useEffect, useState} from 'react';
import {history, NavLink, useIntl, useParams} from '@umijs/max';
import styles from './MemberGroups.less';
import classNames from 'classnames';
import {Outlet} from "@@/exports";
import {GetApiCmtAdminPmsRoles, PostApiCmtAdminPmsRoles} from "@/services/base/api.gen";
import useRequestX from "@/hooks/useRequestX";

interface GroupActionProps {
  role: Role;
}

const GroupAction: React.FC<GroupActionProps> = (props) => {
  const {role} = props;
  const intl = useIntl();
  const i = (id: string) => intl.formatMessage({id});

  const handleDeleteRole = (innerRole: Role) => {
    Modal.confirm({
      content: i('cmtadmin.member.groups.delete.confirm'),
      zIndex: 1000,
      onOk: async () => {
        try {
          const res = await deleteRole(innerRole.id);
          if (res.code === 0) {
            messageInfo({
type: 'success',
content: i('cmtadmin.member.groups.delete.success')
})
          } else {
            messageInfo({
type: 'error',
content: res.msg,
})
          }
        } catch (err) {
          messageInfo({
type: 'error',
content: i('cmtadmin.member.groups.delete.fail'),
})
        }
      },
    });
  };
  return (
    <div className={styles.popover} onClick={(e: any) => e.preventDefault()}>
      <div
        className={styles.popover_item}
        onClick={() => {
          history.push(`/admin/manage/memberGroups/${role.id}`);
        }}
      >
        <span>{i('cmtadmin.member.groups.edit')}</span>
      </div>
      <div className={styles.popover_item} onClick={() => handleDeleteRole(role)}>
        <span>{i('cmtadmin.member.groups.delete')}</span>
      </div>
    </div>
  );
};

export const RolesContext = createContext({} as { fetchRoles: () => void; roles: Role[] });

// 用户组权限
const SpaceAdmin = () => {
  const [roles, setRoles] = useState<Pmsv1RoleInfo[]>();
  const intl = useIntl();
  const i = (id: string) => intl.formatMessage({id});

  const GetApiCmtAdminPmsRolesReq = useRequestX(GetApiCmtAdminPmsRoles, {
    onSuccess: (res) => {
      setRoles(res.data?.list || []);
    }
  })

  useEffect(() => {
    GetApiCmtAdminPmsRolesReq.run().then();
  }, []);

  const handleCreateRole = async () => {
    try {
      const res = await PostApiCmtAdminPmsRoles({
        name: i('cmtadmin.member.groups.add.default'),
      });
      if (res.code === 0) {
        messageInfo({
          type: 'success',
          content: i('cmtadmin.member.groups.add.success')
        })
        GetApiCmtAdminPmsRolesReq.run();
      } else {
        messageInfo({
          type: 'error',
          content: res.msg,
})
      }
    } catch (err) {
      messageInfo({
type: 'error',
content: i('cmtadmin.member.groups.add.fail'),
})
    }
  };

  return (
    <div className={styles.group}>
      <RolesContext.Provider value={{fetchRoles: GetApiCmtAdminPmsRolesReq.run, roles}}>
        <div className={styles.group_navbar}>
          <div className={styles.group_navbar_header}>
            <span>{i('cmtadmin.member.groups.title')}</span>
          </div>
          <div className={styles.group_navbar_search}>
            <Input
              className={styles.group_navbar_search_input}
              prefix={<SearchOutlined/>}
              placeholder={i('cmtadmin.member.groups.search.placeholder')}
            />
          </div>
          <div className={styles.group_navbar_content}>
            {roles && (roles?.length > 0 ? (
              roles?.map((role) => (
                <NavLink
                  activeClassName={styles.group_navbar_content_item_active}
                  to={{
                    pathname: `/admin/manage/spaceAdmin/${role.id}`,
                  }}
                  className={styles.group_navbar_content_item}
                  key={role.id}
                >
                  <div>
                    <Avatar
                      shape="square"
                      className={styles.group_navbar_content_item_icon}
                      style={{ backgroundColor: 'var(--theme-color-secondary)' }}
                      size={24}
                    >
                      {role.name?.[0] || ''}
                    </Avatar>
                    <span>{role.name}</span>
                  </div>
                  <Popover
                    content={<GroupAction role={role} />}
                    trigger="click"
                    getPopupContainer={(triggerNode) => triggerNode?.parentNode as HTMLElement}
                    zIndex={100}
                  >
                    <i
                      className={classNames(
                        'iconfont',
                        'icon-icon',
                        styles.group_navbar_content_item_action,
                      )}
                    />
                  </Popover>
                </NavLink>
              ))
            ) : (
              <Empty/>
            ))}
          </div>
          <div className={styles.group_navbar_footer}>
            <div className={styles.group_navbar_action} onClick={() => handleCreateRole()}>
              <PlusOutlined className={styles.group_navbar_action_icon}/>
              <span className={styles.group_navbar_action_text}>
                {i('cmtadmin.member.groups.add')}
              </span>
            </div>
          </div>
        </div>
        <div className={styles.group_content}><Outlet/></div>
      </RolesContext.Provider>
    </div>
  );
};

export default SpaceAdmin;
