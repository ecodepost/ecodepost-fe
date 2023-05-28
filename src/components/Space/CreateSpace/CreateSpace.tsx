import {InfoCircleOutlined, LeftOutlined} from '@ant-design/icons';
import {Button, Form, Input, Modal, Radio, Select} from 'antd';
import React, {useState} from 'react';
import {useIntl, useModel} from '@umijs/max';
import CheckedCardGroup from './CheckedCardGroup/CheckedCardGroup';
import styles from './CreateSpace.less';
import EmojiInput from '@/components/Emoji/EmojiInput/EmojiInput';
import {Visibility} from '@/enums/visibilitylevel';
import {SpaceType} from '@/enums/spacetype';
import {messageInfo} from '@/components/Message/Message';
import {pushSpace, pushSpaceGroup} from '@/utils/historypush/history';
import {PostApiSpaces} from '@/services/base/api.gen';
import useRequestX from '@/hooks/useRequestX';

interface CreateSpaceProps {
  visible: boolean;
  groupGuid: string;
  spaceType?: SpaceType;
  onClose: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}

// 社区下拉列表可以创建空间
// space tree里面的group有创建空间的按钮
// 点击group，有创建空间按钮
const CreateSpace: React.FC<CreateSpaceProps> = (props) => {
  const { onClose, visible, groupGuid } = props;
  const [form] = Form.useForm();
  const {
    GetApiCmtSpaceAllReq,
    spaceAll,
  } = useModel('community', (model) => ({
    GetApiCmtSpaceAllReq: model.GetApiCmtSpaceAllReq,
    spaceAll: model.spaceAll,
  }))
  const {
    initialState: { currentCmt },
  } = useModel('@@initialState');

  const [spaceGroupGuid, setSpaceGroupGuid] = useState<string>(groupGuid);
  const [visibility, setVisibility] = useState<number>(Visibility.INTERNAL);
  const [spaceType, setSpaceType] = useState<number>(SpaceType.INVALID);
  const [checkNext, setCheckNext] = useState<boolean>(false);
  const intl = useIntl();
  const i = (intlId: string) => intl.formatMessage({ id: intlId });
  const visibilityTextMap = [
    '',
    i('visiblitylevel.internal.content'),
    i('visiblitylevel.secret.content'),
  ];
  const {permission: cmtPms} = currentCmt

  const PostApiSpacesReq = useRequestX(PostApiSpaces, {
    onSuccess: ({ code, data, msg }) => {
      onClose();
      // if (!expandedGroups.includes(spaceGroupGuid)) {
      //   setExpandedGroups([...expandedGroups, spaceGroupGuid]);
      // }
      messageInfo({
        type: 'success',
        content: i('cmtSidebar.space.create.success'),
      });
      form.resetFields();
      GetApiCmtSpaceAllReq.run();
      if (data.spaceType == SpaceType.LINK) {
        pushSpaceGroup(spaceGroupGuid);
      } else {
        pushSpace(data.info.guid);
      }
    },
  });

  const handleCreateSpace = async (values: any) => {
    const {name, spaceLayout} = values;
    PostApiSpacesReq.run({
      name,
      icon: values.icon,
      link: values.link,
      spaceGroupGuid,
      spaceType: spaceType,
      spaceLayout,
      visibility,
    });
  };
  return (
    <Modal
      open={visible}
      width={520}
      footer={null}
      centered
      destroyOnClose
      onCancel={onClose}
      className={styles.modal}
    >
      <Form
        className={styles.container}
        onFinish={handleCreateSpace}
        initialValues={{
          name: '',
          spaceType: spaceType || SpaceType.INVALID,
          spaceGroupGuid,
        }}
        form={form}
      >
        {spaceType != 0 && checkNext ? (
          <>
            <div className={styles.title_container}>
              <LeftOutlined
                onClick={() => {
                  setSpaceType(0);
                  setCheckNext(false);
                }}
              />
              <span className={styles.title}>{i('cmtSidebar.space.create.title')}</span>
            </div>
            <div className={styles.content}>
              <div className={styles.content_status}>
                <EmojiInput />
              </div>
              <div className={styles.content_group}>
                <span>{i('cmtSidebar.space.create.group')}</span>
                <Form.Item
                  name="spaceGroupGuid"
                  rules={[
                    {
                      required: true,
                      message: i('cmtSidebar.space.create.group.validate'),
                    },
                  ]}
                >
                  {spaceAll && <Select
                    getPopupContainer={(triggerNode) => triggerNode?.parentNode as HTMLElement}
                    className={styles.content_group_select}
                    showArrow={true}
                    placeholder={i('cmtSidebar.space.create.group.placeholder')}
                    onChange={(e: string) => setSpaceGroupGuid(e)}
                  >
                    {spaceAll.spaceGroupList.filter((value) => value?.isAllowCreateSpace === true)
                      .map((value, index, array) => (
                        <Select.Option key={value.guid} value={value.guid}>
                          {value.name}
                        </Select.Option>
                      ))}
                  </Select>}
                </Form.Item>
              </div>
              {spaceType !== SpaceType.COURSE && (
                <div className={styles.content_name}>
                  <span
                    style={{ marginBottom: 12, display: 'block' }}
                    className={styles.content_text}
                  >
                    空间可见类型
                  </span>
                  <Radio.Group
                    className={styles.select_group}
                    value={visibility}
                    size="small"
                    onChange={(e: any) => {
                      const val = e.target.value;
                      setVisibility(val);
                    }}
                  >
                    <Radio.Button className={styles.select_group_btn} value={Visibility.INTERNAL}>
                      {i('visiblitylevel.internal')}
                    </Radio.Button>
                    <Radio.Button className={styles.select_group_btn} value={Visibility.SECRET}>
                      {i('visiblitylevel.secret')}
                    </Radio.Button>
                  </Radio.Group>
                  <InfoCircleOutlined className={styles.content_icon} />
                  <span className={styles.content_icon_text}>
                    &nbsp;{visibilityTextMap[visibility]}
                  </span>
                </div>
              )}
              {spaceType === SpaceType.ARTICLE && (
                <div className={styles.content_name}>
                  <span
                    style={{ marginBottom: 12, display: 'block' }}
                    className={styles.content_text}
                  >
                    {i('cmtSidebar.space.create.layout')}
                  </span>
                  <CheckedCardGroup
                    items={[i('spacelayout.feed'), i('spacelayout.list'), i('spacelayout.card')]}
                  />
                </div>
              )}
              {spaceType === SpaceType.LINK && (
                <div className={styles.content_name}>
                    <span
                      style={{marginBottom: 12, display: 'block'}}
                      className={styles.content_text}
                    >
                      链接地址
                    </span>
                  <Form.Item
                    name="link"
                    style={{
                      width: 'calc(100% - 44px)',
                    }}
                  >
                    <Input allowClear placeholder="输入链接名称" style={{height: 48}}/>

                  </Form.Item>
                </div>
              )}
            </div>
            <Form.Item noStyle>
              <div className={styles.action}>
                <Button
                  className={styles.action_btn}
                  type="primary"
                  loading={PostApiSpacesReq.loading}
                  htmlType="submit"
                >
                  {i('cmtSidebar.space.create.submit')}
                </Button>
              </div>
            </Form.Item>
          </>
        ) : (
          <>
            <span className={styles.title_choose_type}>{i('cmtSidebar.space.create.type')}</span>
            <div className={styles.content}>
              <div className={styles.content_type_select}>
                {cmtPms && cmtPms.appList && (
                  <Radio.Group
                    // defaultValue={spaceType || SpaceType.ARTICLE}
                    className={styles.select_group_sp}
                    size="small"
                  >
                    {cmtPms.appList?.map((item) => (
                      <Radio.Button
                        onClick={() => {
                          setSpaceType(item.appId);
                          // 各种组合都可以
                          if (item.appId === SpaceType.ARTICLE) {
                            form.setFieldsValue({
                              spaceLayout: 3,
                            });
                            return;
                          }
                        }}
                        className={
                          item.appId === spaceType
                            ? styles.select_group_btn_active
                            : styles.select_group_btn
                        }
                        value={item.appId}
                      >
                        {item.name}
                      </Radio.Button>
                    ))}
                  </Radio.Group>
                )}
                <div className={styles.action}>
                  <Button
                    className={styles.action_btn}
                    type="primary"
                    onClick={() => setCheckNext(true)}
                  >
                    {i('cmtSidebar.space.create.next')}
                  </Button>
                </div>
              </div>
            </div>
          </>
        )}
      </Form>
    </Modal>
  );
};

export default CreateSpace;
