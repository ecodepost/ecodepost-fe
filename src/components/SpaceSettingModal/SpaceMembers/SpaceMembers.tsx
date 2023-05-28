import {messageInfo} from '@/components/Message/Message';
import {addRoleMember, deleteRoleMember, getRoleIdsByUid, getRoles,} from '@/services/cmtAdmin/api';
import {SearchOutlined} from '@ant-design/icons';
import type {InputRef} from 'antd';
import {
  Avatar,
  Button,
  Checkbox,
  Divider,
  Dropdown,
  Form,
  Input,
  Menu,
  Modal,
  Select,
  Spin,
  Switch,
  Table,
} from 'antd';
import type {ColumnsType} from 'antd/es/table';
import type {FilterConfirmProps} from 'antd/es/table/interface';
import {useEffect, useRef, useState} from 'react';
import styles from './SpaceMembers.less';
import {Role} from '@/pages/typings';
import useRequestX from '@/hooks/useRequestX';
import {GetApiCmtSearchMembers, GetApiSpacesGuidMembers} from '@/services/base/api.gen';
import {useIntl} from 'umi';
import DebounceSelect from '@/components/SuperModal/DebounceSelect';

const {Column} = Table;

interface ActionMenuProps {
  uid: number;
  rolesLoading: boolean;
  roles: Role[];
}

interface UserItem {
  uid: number;
  nickname: string;
  avatar: string;
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
      add: addRoleMember,
      remove: deleteRoleMember,
    };
    try {
      const res = await apiMap[type](roleId, [userUid]);
      if (res.code === 0) {
        messageInfo({
          type: 'success',
          content: `${type === 'add' ? i('add') : i('remove')}${i('success')}`,
        });
        if (type === 'add') {
          setJoinedRoles([...joinedRoles, roleId]);
        } else {
          setJoinedRoles(joinedRoles.filter((id) => id !== roleId));
        }
      } else {
        messageInfo({
          type: 'error',
          content: res.msg,
        });
      }
    } catch (err) {
      messageInfo({
        type: 'error',
        content: `${type === 'add' ? i('add') : i('remove')}${i('fail')}`,
      });
    }
  };
  const fetchUserRoles = async () => {
    setFetchUserRolesLoading(true);
    try {
      const res = await getRoleIdsByUid(uid);
      if (res.code === 0) {
        setJoinedRoles(res.data?.roleIds || []);
        setFetchUserRolesLoading(false);
      } else {
        messageInfo({
          type: 'error',
          content: res.msg,
        });
      }
    } catch (err) {
      messageInfo({
        type: 'error',
        content: i('cmtadmin.member.groups.member.roles.fail'),
      });
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

const SpaceMembers = (props) => {
  const { spaceInfoProps } = props;
  const [roles, setRoles] = useState<Role[]>([]);
  const [rolesLoading, setRolesLoading] = useState<boolean>(false);
  const [isShow, setIsShow] = useState<boolean>(false);
  /** 表格的加载，在搜索成员时也需要替换 */
  const [membersLoading, setMembersLoading] = useState<boolean>(false);
  /** 总人数的加载，只有页面初始进入时需要替换 */
  const [initLoading, setInitLoading] = useState<boolean>(false);
  const [members, setMembers] = useState<Commonv1MemberRole[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [color, setColor] = useState<boolean>(false);
  const intl = useIntl();
  const i = (id: string) => intl.formatMessage({ id });
  const [selectedUsers, setSelectedUsers] = useState<UserItem[]>([]);
  const [value, setValue] = useState<any[]>([]);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex,
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText('');
  };

  const GetApiSpacesGuidMembersRequest = useRequestX(GetApiSpacesGuidMembers, {
    onSuccess: (res) => {
      setMembers(res.data?.list || []);
      setTotal(res.pagination?.total || 0);
      setInitLoading(false);
      setMembersLoading(false);
    },
  });
  const fetchRoles = async () => {
    setRolesLoading(true);
    try {
      const res = await getRoles();
      if (res.code === 0) {
        setRoles(res.data?.list || []);
        setRolesLoading(false);
      } else {
        messageInfo({
          type: 'error',
          content: res.msg,
        });
      }
    } catch (err) {
      messageInfo({
        type: 'error',
        content: i('cmtadmin.member.groups.member.roles.init.fail'),
      });
    }
  };
  const fetchMembers = async () => {
    setInitLoading(true);
    setMembersLoading(true);
    try {
      await GetApiSpacesGuidMembersRequest.run(spaceInfoProps.guid, {
        currentPage: 1,
      });
    } catch (err) {
      messageInfo({
        type: 'error',
        content: i('cmtadmin.member.groups.member.members.init.fail'),
      });
    }
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button
          type="primary"
          onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
          Reset
        </Button>
      </div>
    ),
    filterIcon: (filtered) => <SearchOutlined></SearchOutlined>,
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
  });

  const columns: ColumnsType<Commonv1MemberRole> = [
    {
      title: i('cmtadmin.member.groups.member.memberinfo'),
      dataIndex: 'nickname',
      key: 'nickname',
      render: (text, record) => (
        <div
          onClick={() => {
            // console.log('-----');
            // history.push(`/profile/${record.nickname}`);
          }}
        >
          <Avatar src={record.avatar} size={60} />
          <span className={styles.list_content_name}>{record.nickname}</span>
        </div>
      ),
      ...getColumnSearchProps('nickname'),
    },
    {
      title: i('cmtadmin.member.groups.member.lastLoginTime'),
      dataIndex: 'last_login_time',
      key: 'last_login_time',
    },
    {
      title: i('cmtadmin.member.groups.member.joinTime'),
      dataIndex: 'joinTime',
      key: 'joinTime',
    },
    {
      title: i('cmtadmin.member.groups.member.action'),
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <Dropdown
          getPopupContainer={(triggerNode) => triggerNode?.parentNode as HTMLElement}
          overlayClassName={styles.actionMenu}
          overlay={<ActionMenu uid={record.uid} rolesLoading={rolesLoading} roles={roles} />}
        >
          <i className="iconfont icon-icon" />
        </Dropdown>
      ),
    },
  ];

  const fetchUserList = async (search: string) => {
    try {
      const res = await GetApiCmtSearchMembers({
        currentPage: 0,
        pageSize: 0,
        sort: '',
        spaceGuid: '',
        keyword: search,
      });
      if (res.code === 0) {
        return res.data?.list;
      } else {
        messageInfo({
          content: res.msg,
          type: 'error',
        });
      }
    } catch (err) {
      messageInfo({
        content: i('cmtadmin.culture.medal.listInfo.init.fail'),
        type: 'error',
      });
    }
  };

  useEffect(() => {
    Promise.all([fetchRoles(), fetchMembers()]);
  }, []);
  return initLoading ? (
    <Spin />
  ) : (
    <div>
      {isShow ? (
        <div
          className={styles.modalMask}
          onClick={() => {
            setIsShow(false);
          }}
        ></div>
      ) : (
        ''
      )}
      <Modal
        open={isShow}
        width={440}
        footer={null}
        centered
        closable={true}
        className={styles.modal}
        onCancel={() => {
          setIsShow(false);
        }}
        getContainer={false}
      >
        <Form>
          <Form.Item>
            <div className={styles.header} id="superadmin_modal">
              <h1 style={{ marginBottom: '20px', marginTop: '20px' }}>增加成员</h1>
              <div className={styles.input}>
                <DebounceSelect
                  placeholder="增加成员"
                  className={styles.InputBox}
                  mode="multiple"
                  selectedUsers={selectedUsers}
                  setSelectedUsers={setSelectedUsers}
                  value={value}
                  fetchOptions={fetchUserList}
                  onChange={(newValue) => setValue(newValue)}
                  style={{ width: '100%' }}
                />
              </div>
            </div>
          </Form.Item>
          <Divider plain>OR</Divider>
          <Form.Item>
            <div className={styles.banner}>
              <div className={styles.switch}>
                <Switch
                  defaultChecked
                  onChange={() => {
                    setColor(!color);
                  }}
                />
                <span>1111111</span>
              </div>
              <Select defaultValue="空间" className={styles.content_select}>
                <Select.Option value="社区">社区</Select.Option>
                <Select.Option value="空间">空间</Select.Option>
              </Select>
            </div>
          </Form.Item>
          <Form.Item>
            <div className={styles.footer}>
              <span className={styles.checkbox}>
                <Checkbox style={{ marginRight: '10px' }} />
                通知成员
              </span>

              {color ? (
                <Button style={{ backgroundColor: '#D2D7D8' }} disabled={true}>
                  增加
                </Button>
              ) : (
                <Button style={{ backgroundColor: 'var(--themeColorPrimary)' }}>增加</Button>
              )}
            </div>
          </Form.Item>
        </Form>
      </Modal>
      <div className={styles.list}>
        <div className={styles.list_title}>
          <span>
            {i('total')}
            {total}
            {i('members')}
          </span>
          <Button
            onClick={() => {
              setIsShow(true);
            }}
          >
            增加成员
          </Button>
        </div>
        <div className={styles.list_content}>
          <Table
            columns={columns}
            rowKey={'uid'}
            loading={membersLoading}
            dataSource={members}
            pagination={{ hideOnSinglePage: true }}
          ></Table>
        </div>
      </div>
    </div>
  );
};

export default SpaceMembers;
