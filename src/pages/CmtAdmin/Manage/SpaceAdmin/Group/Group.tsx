import {messageInfo} from '@/components/Message/Message';
import EmojiInput from '@/components/Emoji/EmojiInput/EmojiInput';
import Member from '@/pages/Member/Member';
import {
  getRoleGroupPermissionList,
  getRolePermissionList,
  getRoleSpacePermissionList,
  initGroupPermissions,
  initSpacePermissions,
  updateRoleGroupPermission,
  updateRoleInfo,
  updateRolePermission,
  updateRoleSpacePermission,
} from '@/services/cmtAdmin/api';
import {Button, Divider, Form, Modal, Select, Spin, Switch, Tabs} from 'antd';
import classNames from 'classnames';
import {useEffect, useState} from 'react';
import {history, useIntl, useModel, useParams} from '@umijs/max';
import styles from './Group.less';
import {GetApiCmtAdminPmsRoles} from "@/services/base/api.gen";
import useRequestX from "@/hooks/useRequestX";
import {AntSpaceAll} from "@/models/community";

const {TabPane} = Tabs;
const {Option} = Select;

interface SwitchItemProps {
  item: {
    actionName: string;
    desc: string;
    flag: number;
    title?: string;
  };
  onChange: () => void;
}

const SwitchItem: React.FC<SwitchItemProps> = (props) => {
  const { item, onChange } = props;
  return (
    <>
      <div className={styles.groupedit_content_item}>
        <div>
          <div className={styles.groupedit_content_item_title}>
            <span>{item?.title}</span>
          </div>
          {item?.desc && (
            <div className={styles.groupedit_content_item_subtitle}>
              <span>{item.desc}</span>
            </div>
          )}
        </div>
        <Switch defaultChecked={item.flag === 1} onChange={onChange} />
      </div>
      <div className={styles.groupedit_content_divider} />
    </>
  );
};

interface SelectInputProps {
  type: 'group' | 'space';
  spaceAll: AntSpaceAll;
  list: PmsSpaceList[] | PmsGroupList[];
  setList: (list: PmsSpaceList[] | PmsGroupList[]) => void;
  fetchList: () => void;
  modified: boolean;
  setModified: (modified: boolean) => void;
}

const SelectInput: React.FC<SelectInputProps> = (props) => {
  const {type, spaceAll, list, setList, modified, setModified, fetchList} = props;
  const existedGuids = list?.map((item) => item.guid);
  const [editVisible, setEditVisible] = useState<boolean>(false);
  const [newInputVisible, setNewInputVisible] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<PmsSpaceList | PmsGroupList>(
    {} as PmsSpaceList | PmsGroupList,
  );
  const { roleId } = useParams<{ roleId: string }>();
  const [listLoading, setListLoading] = useState<boolean>(false);
  const intl = useIntl();
  const i = (id: string) => intl.formatMessage({ id });

  const handleDeletePms = async (item: PmsSpaceList) => {
    Modal.confirm({
      content: i('cmtadmin.member.groups.group.select.delete'),
      onOk: () => {
        setListLoading(true);
        list.splice(list.indexOf(item), 1);
        setList(list);
        setModified(true);
        setTimeout(() => setListLoading(false), 0);
      },
    });
  };

  const [saveBtnLoading, setSaveBtnLoading] = useState<boolean>(false);
  const handleSave = async () => {
    const apiMap = {
      group: updateRoleGroupPermission,
      space: updateRoleSpacePermission,
    };
    setSaveBtnLoading(true);
    try {
      const res = await apiMap[type](roleId, { list });
      if (res.code === 0) {
        messageInfo({
type: 'success',
content: i('cmtadmin.member.groups.group.select.save')
})
        fetchList();
        setModified(false);
        setSaveBtnLoading(false);
      } else {
        messageInfo({
type: 'error',
content: res.msg,
})
      }
    } catch (err) {
      messageInfo({
type: 'error',
content: i('save.fail'),
})
    }
  };

  return (
    <div className={styles.group_tab_content_action}>
      <Button
        className={styles.group_tab_content_action_btn}
        onClick={() => setNewInputVisible(true)}
      >
        {type === 'group'
          ? i('cmtadmin.member.groups.group.select.btn.group')
          : i('cmtadmin.member.groups.group.select.btn.space')}
      </Button>
      {newInputVisible && (
        <Select
          className={styles.group_tab_content_action_select}
          placeholder={
            type === 'group'
              ? i('cmtadmin.member.groups.group.select.placeholder.group')
              : i('cmtadmin.member.groups.group.select.placeholder.space')
          }
          showArrow={true}
          getPopupContainer={(triggerNode) => triggerNode?.parentNode as HTMLElement}
          onChange={async (value) => {
            const apiMap = {
              group: initGroupPermissions,
              space: initSpacePermissions,
            };

            let name = '';

            if (type === "space") {
              name = spaceAll.spaceList.find((item) => item.guid == value)?.name || ''
            } else {
              name = spaceAll.spaceGroupList.find((item) => item.guid == value)?.name || ''
            }

            try {
              const res = await apiMap[type](roleId, value);
              if (res.code === 0) {
                const newPmsList = res.data.list;
                if (!newPmsList) {
                  messageInfo({
                    type: 'error',
                    content: i('cmtadmin.member.groups.group.select.new.nopms'),
                  })
                  setNewInputVisible(false);
                  return;
                }
                setListLoading(true);
                setList([
                  {
                    guid: value,
                    name: name,
                    list: newPmsList,
                  },
                  ...(list || []),
                ]);
                setModified(true);
                setListLoading(false);
                setNewInputVisible(false);
              } else {
                messageInfo({
type: 'error',
content: res.msg,
})
              }
            } catch (err) {
              messageInfo({
type: 'error',
content: i('cmtadmin.member.groups.group.select.new.fail'),
})
            }
          }}
          suffixIcon={
            <div
              className={styles.group_tab_content_action_select_act}
              onClick={() => setNewInputVisible(false)}
            >
              <Divider type="vertical" />
              <i
                className={classNames(
                  'iconfont',
                  'icon-shanchu',
                  styles.group_tab_content_action_select_act_icon,
                )}
              />
              <span className={styles.group_tab_content_action_select_act_text}>{i('delete')}</span>
            </div>
          }
        >
          {type == "space" && spaceAll.spaceList.filter((value, index, array) => !existedGuids?.includes(value.guid))
            .map(
              (value, index, array) =>
                (
                  <Option key={value.guid} value={value.guid}>
                    {value.name}
                  </Option>
                ),
            )}
          {type == "group" && spaceAll.spaceGroupList.filter((value, index, array) => !existedGuids?.includes(value.guid))
            .map(
              (value, index, array) =>
                (
                  <Option key={value.guid} value={value.guid}>
                    {value.name}
                  </Option>
                ),
            )}
        </Select>
      )}
      {listLoading ? (
        <Spin />
      ) : (
        list?.map((item) => (
          <Select
            key={item.guid}
            className={styles.group_tab_content_action_select}
            showArrow={true}
            disabled
            defaultValue={item.name}
            suffixIcon={
              <>
                <div
                  className={styles.group_tab_content_action_select_act}
                  onClick={() => {
                    setEditVisible(true);
                    Object.assign(item, { tempList: structuredClone(item.list) });
                    setSelectedItem(item);
                  }}
                >
                  <Divider type="vertical" />
                  <i
                    className={classNames(
                      'iconfont',
                      'icon-bianji',
                      styles.group_tab_content_action_select_act_icon,
                    )}
                  />
                  <span className={styles.group_tab_content_action_select_act_text}>
                    {i('cmtadmin.member.groups.group.select.list.edit')}
                  </span>
                </div>
                <div
                  className={styles.group_tab_content_action_select_act}
                  onClick={() => handleDeletePms(item)}
                >
                  <Divider type="vertical" />
                  <i
                    className={classNames(
                      'iconfont',
                      'icon-shanchu',
                      styles.group_tab_content_action_select_act_icon,
                    )}
                  />
                  <span className={styles.group_tab_content_action_select_act_text}>
                    {i('delete')}
                  </span>
                </div>
              </>
            }
          />
        ))
      )}

      <div className={styles.group_action}>
        <Button
          disabled={!modified}
          className={styles.group_action_btn}
          type="primary"
          onClick={() => handleSave()}
          loading={saveBtnLoading}
        >
          {i('save')}
        </Button>
      </div>

      <Modal
        className={styles.modal}
        width={600}
        open={editVisible}
        onCancel={() => {
          setEditVisible(false);
          setSelectedItem({} as PmsSpaceList | PmsGroupList);
        }}
        footer={null}
        getContainer={false}
        maskClosable={false}
        centered
      >
        <div className={styles.groupedit}>
          <div className={styles.groupedit_title}>
            <span>{i('cmtadmin.member.groups.group.edit.title')}</span>
          </div>
          <div className={styles.groupedit_content}>
            {selectedItem.list?.map((item) => (
              <SwitchItem
                item={item}
                key={item.actionName}
                onChange={() => {
                  const newItem = selectedItem.tempList?.find(
                    ({ actionName }) => actionName === item.actionName,
                  ) as {
                    actionName: string;
                    desc: string;
                    flag: number;
                    title?: string;
                  };
                  newItem.flag = newItem.flag === 1 ? 0 : 1;
                  selectedItem.tempList?.splice(selectedItem.list.indexOf(item), 1, newItem);
                  setSelectedItem(selectedItem);
                }}
              />
            ))}
          </div>
          <div className={styles.groupedit_action}>
            <Button
              type="primary"
              className={styles.groupedit_action_btn}
              onClick={() => {
                const originItem = list.find((item) => item.guid === selectedItem.guid) as
                  | PmsSpaceList
                  | PmsGroupList;
                const originIdx = list.indexOf(originItem);
                selectedItem.list = structuredClone(selectedItem.tempList || selectedItem.list);
                delete selectedItem.tempList;
                list.splice(originIdx, 1, selectedItem);
                setList(list);
                setEditVisible(false);
                setModified(true);
                setSelectedItem({} as PmsSpaceList | PmsGroupList);
              }}
            >
              {i('confirm-queren')}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

const Group = () => {
  const [form] = Form.useForm();
  const {spaceAll} = useModel('community');
  // const {fetchRoles, roles} = useContext(RolesContext);
  const { roleId } = useParams<{ roleId: string }>();
  const [pmsList, setPmsList] = useState<PmsList[]>([]);
  const [pmsListModified, setPmsListModified] = useState<boolean>(false);

  const [pmsSpaceList, setPmsSpaceList] = useState<any[]>([]);
  const [pmsSpaceModified, setPmsSpaceModified] = useState<boolean>(false);
  const [pmsSpaceLoading, setPmsSpaceLoading] = useState<boolean>(false);

  const [pmsGroupList, setPmsGroupList] = useState<any[]>([]);
  const [pmsGroupModified, setPmsGroupModified] = useState<boolean>(false);
  const [pmsGroupLoading, setPmsGroupLoading] = useState<boolean>(false);
  const [pmsLoading, setPmsLoading] = useState<boolean>(true);
  const [role, setRole] = useState<Pmsv1RoleInfo>();

  const GetApiCmtAdminPmsRolesRequest = useRequestX(GetApiCmtAdminPmsRoles, {
    onSuccess: (res) => {
      if (!res.data) {
        return
      }
      const resRole = res.data.list.find((item) => item.id === Number(roleId));
      setRole(resRole)
    }

  })
  useEffect(() => {
    GetApiCmtAdminPmsRolesRequest.run()

  }, [roleId])


  const intl = useIntl();
  const i = (id: string) => intl.formatMessage({id});

  const fetchRolePms = async () => {
    if (!role?.id) {
      messageInfo({
        type: 'error',
        content: i('cmtadmin.member.groups.group.init.noid'),
})
      history.go(0);
      return;
    }
    try {
      setPmsLoading(true);
      const res = await getRolePermissionList(role.id);
      if (res.code === 0) {
        setPmsList(res.data?.list);
        setPmsLoading(false);
      } else {
        messageInfo({
type: 'error',
content: res.msg,
})
      }
    } catch (err) {
      messageInfo({
type: 'error',
content: i('cmtadmin.member.groups.group.init.group.fail'),
})
    }
  };

  const fetchRoleSpacePms = async (type: 'space' | 'group') => {
    const apiMap = {
      space: getRoleSpacePermissionList,
      group: getRoleGroupPermissionList,
    };
    if (type === 'group') {
      setPmsGroupLoading(true);
    } else if (type === 'space') {
      setPmsSpaceLoading(true);
    }
    try {
      const res = await apiMap[type](role.id);
      if (res.code === 0) {
        if (type === 'group') {
          setPmsGroupLoading(false);
          setPmsGroupList(res.data.list);
        } else if (type === 'space') {
          setPmsSpaceLoading(false);
          setPmsSpaceList(res.data.list);
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
content: i('cmtadmin.member.groups.group.init.space.fail'),
})
    }
  };

  const [updateRoleBtnLoading, setUpdateRoleBtnLoading] = useState<boolean>(false);
  const handleUpdateRole = async (value: { name: string }) => {
    const { name } = value;
    setUpdateRoleBtnLoading(true);
    try {
      const res = await updateRoleInfo(role.id, name);
      if (res.code === 0) {
        messageInfo({
type: 'success',
content: i('cmtadmin.member.groups.group.update.success')
})
        fetchRoles();
        setUpdateRoleBtnLoading(false);
      } else {
        messageInfo({
type: 'error',
content: res.msg,
})
      }
    } catch (err) {
      messageInfo({
type: 'error',
content: i('cmtadmin.member.groups.group.update.fail'),
})
    }
  };

  const handleCmtEnableChange = async (type: string) => {
    const changeItem = pmsList.find((item) => item.actionName === type);
    if (!changeItem) return;
    changeItem.flag = changeItem.flag === 1 ? 0 : 1;
    const newPmsList = pmsList.map((item) => (item.actionName === type ? changeItem : item));
    setPmsList(newPmsList);
    setPmsListModified(true);
  };

  useEffect(() => {
    if (!role) {
      return
    }
    form.setFieldsValue({name: role.name, icon: ''});
    // fetchGroups();
    Promise.all([fetchRolePms(), fetchRoleSpacePms('space'), fetchRoleSpacePms('group')]);
  }, [role]);

  const [updateListBtnLoading, setUpdateListBtnLoading] = useState<boolean>(false);
  const handlePmsListUpdate = async () => {
    setUpdateListBtnLoading(true);
    try {
      const res = await updateRolePermission(role.id, { list: pmsList });
      if (res.code === 0) {
        messageInfo({
type: 'success',
content: i('cmtadmin.member.groups.group.list.update.success')
})
        setPmsListModified(false);
        setUpdateListBtnLoading(false);
      } else {
        messageInfo({
type: 'error',
content: res.msg,
})
      }
    } catch (err) {
      messageInfo({
type: 'error',
content: i('cmtadmin.member.groups.group.list.update.fail'),
})
    }
  };

  return (
    <div className={styles.group}>
      <div className={styles.group_title}>
        <span>{role?.name}</span>
        <span>
          {i('left-paren')}
          {0}
          {i('cmtadmin.member.groups.group.memberCnt')}
          {i('right-paren')}
        </span>
      </div>
      {role && <Tabs defaultActiveKey="1">
        <TabPane tab={i('cmtadmin.member.groups.group.tab.summary')} key="1">
          <div className={styles.group_tab_content}>
            <Form form={form} onFinish={handleUpdateRole}>
              <EmojiInput
                width={440}
                marginTop={8}
                warningInfo={i('cmtadmin.member.groups.group.tab.summary.input.validate')}
              />
              <div className={styles.group_action}>
                <Button
                  className={styles.group_action_btn}
                  type="primary"
                  htmlType="submit"
                  loading={updateRoleBtnLoading}
                >
                  {i('save')}
                </Button>
              </div>
            </Form>
          </div>
        </TabPane>
        <TabPane tab={i('cmtadmin.member.groups.group.tab.pms')} key="2">
          {pmsLoading ? (
            <Spin />
          ) : (
            <div className={styles.group_tab_content}>
              <div className={styles.group_tab_content_title}>
                <span>{i('cmtadmin.member.groups.group.tab.pms.cmt')}</span>
              </div>
              {pmsList.map((item) => (
                <div key={item.actionName}>
                  <div className={styles.group_tab_content_item}>
                    <div>
                      <span className={styles.group_tab_content_item_title}>{item?.title}</span>
                      <span className={styles.group_tab_content_item_subtitle}>{item.desc}</span>
                    </div>
                    <Switch
                      defaultChecked={item.flag === 1}
                      onChange={() => handleCmtEnableChange(item.actionName)}
                      className={styles.group_tab_content_item_switch}
                    />
                  </div>
                  <div className={styles.group_tab_content_divider} />
                </div>
              ))}
              <div className={styles.group_action}>
                <Button
                  disabled={!pmsListModified}
                  className={styles.group_action_btn}
                  type="primary"
                  onClick={() => handlePmsListUpdate()}
                  loading={updateListBtnLoading}
                >
                  {i('save')}
                </Button>
              </div>

                <>
                  {spaceAll && (
                    <SelectInput
                      list={pmsGroupList}
                      setList={setPmsGroupList}
                      type="group"
                      fetchList={fetchRoleSpacePms.bind(null, 'group')}
                      spaceAll={spaceAll}
                      modified={pmsGroupModified}
                      setModified={setPmsGroupModified}
                    />
                  )}
                  {spaceAll && (
                    <SelectInput
                      list={pmsSpaceList}
                      setList={setPmsSpaceList}
                      type="space"
                      fetchList={fetchRoleSpacePms.bind(null, 'space')}
                      spaceAll={spaceAll}
                      modified={pmsSpaceModified}
                      setModified={setPmsSpaceModified}
                    />
                  )}
                </>
            </div>
          )}
        </TabPane>
        <TabPane tab={i('cmtadmin.member.groups.group.tab.member')} key="3">
          <Member key={role.id} type="cmtAdmin" isChannel={false} title={role.name}/>
        </TabPane>
      </Tabs>}
    </div>
  );
};

export default Group;
