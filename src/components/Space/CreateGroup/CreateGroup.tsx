import {Visibility} from '@/enums/visibilitylevel';
import {Button, Form, Input, Modal, Radio} from 'antd';
import React, {useState} from 'react';
import {useIntl, useModel} from 'umi';
import styles from './CreateGroup.less';
import {PostApiSpacesGroups} from "@/services/base/api.gen";
import useRequestX from "@/hooks/useRequestX";
import {pushSpaceGroup} from "@/utils/historypush/history";

interface CreateGroupProps {
  visible: boolean;
  onClose: (event?: any) => void;
}

// 社区下拉列表可以创建空间
// space tree里面的group有创建分组的按钮
const CreateGroup: React.FC<CreateGroupProps> = (props) => {
  const {visible, onClose} = props;
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
  const [form] = Form.useForm();
  const {GetApiCmtSpaceAllReq} = useModel('community');
  const [visibility, setVisibility] = useState<number>(Visibility.INTERNAL);
  const intl = useIntl();
  const i = (intlId: string) => intl.formatMessage({id: intlId});
  const PostApiSpacesGroupsReq = useRequestX(PostApiSpacesGroups, {
    onSuccess: ({data}) => {
      onClose();
      setConfirmLoading(false);
      GetApiCmtSpaceAllReq.run();
      // setExpandedGroups([...expandedGroups, res.data.info.guid]);
      form.resetFields();
      pushSpaceGroup(data.info.guid)
    }
  })

  const handleCreateGroup = (values: any) => {
    const {name} = values;
    PostApiSpacesGroupsReq.run({
      name,
      visibility,
      icon: ''
    })
  };
  return (
    (<Modal
      open={visible}
      width={520}
      footer={null}
      onCancel={onClose}
      className={styles.modal}
      // getContainer={false}
    >
      <Form
        className={styles.container}
        onFinish={handleCreateGroup}
        initialValues={{ name: '' }}
        form={form}
      >
        <span className={styles.title}>{i('cmtSidebar.group.create.title')}</span>
        <div className={styles.content}>
          <span className={styles.content_text}>{i('cmtSidebar.group.create.name')}</span>
          <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message: i('cmtSidebar.group.create.name.validate'),
              },
            ]}
          >
            <Input
              allowClear
              className={styles.content_input}
              placeholder={i('cmtSidebar.group.create.name.placeholder')}
            />
          </Form.Item>
        </div>
        <div className={styles.visibility}>
          <div className={styles.visibility_title}>
            <span>{i('cmtSidebar.group.create.visibility')}</span>
          </div>
          <div className={styles.visibility_content}>
            <Radio.Group
              className={styles.visibility_content_btn_group}
              defaultValue={Visibility.INTERNAL}
              size="small"
              onChange={(e) => setVisibility(e.target.value)}
            >
              <Radio.Button className={styles.visibility_content_btn} value={Visibility.INTERNAL}>
                {i('visiblitylevel.internal')}
              </Radio.Button>
              <Radio.Button className={styles.visibility_content_btn} value={Visibility.SECRET}>
                {i('visiblitylevel.secret')}
              </Radio.Button>
            </Radio.Group>
            {/*<div className={styles.visibility_content_text}>*/}
            {/*  <InfoCircleOutlined className={styles.visibility_content_icon}/>*/}
            {/*  <span className={styles.visibility_content_icon_text}>*/}
            {/*    &nbsp;{visibilityTextMap[visibility]}*/}
            {/*  </span>*/}
            {/*</div>*/}
          </div>
        </div>
        {/*<div className={styles.setting}>*/}
        {/*  <span className={styles.setting_text}>{i('cmtSidebar.group.create.pms.title')}</span>*/}
        {/*  <div className={styles.setting_item}>*/}
        {/*    <span className={styles.setting_item_text}>*/}
        {/*      {i('cmtSidebar.group.create.pms.content')}*/}
        {/*    </span>*/}
        {/*    <Switch className={styles.setting_switch} />*/}
        {/*  </div>*/}
        {/*</div>*/}
        <Form.Item>
          <div className={styles.action}>
            <Button
              className={styles.action_btn}
              type="primary"
              loading={confirmLoading}
              htmlType="submit"
            >
              {i('cmtSidebar.group.create.submit')}
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Modal>)
  );
};

export default CreateGroup;
