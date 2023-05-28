import { Visibility } from '@/enums/visibilitylevel';
import type { SpaceAPI } from '@/services/space/typings';
import { Button, Drawer, Form, Input, Radio } from 'antd';
import React, { useState } from 'react';
import { useIntl, useModel } from 'umi';
import styles from './UpdateGroup.less';
import type { TreeNode } from '@/components/SpaceTree/type';
import { PutApiSpacesGroupsGuid } from '@/services/base/api.gen';
import useRequestX from '@/hooks/useRequestX';

interface UpdateGroupParams {
  groupInfo: TreeNode<any>;
  visible: boolean;
  onClose: (event?: any) => void;
}

const UpdateGroup: React.FC<UpdateGroupParams> = (props) => {
  const { groupInfo, visible, onClose } = props;
  const { GetApiCmtSpaceAllReq } = useModel('community');
  const [visibility, setVisibility] = useState<number>(Visibility.INTERNAL);

  const intl = useIntl();
  const i = (intlId: string) => intl.formatMessage({ id: intlId });

  const PutApiSpacesGroupsGuidRequest = useRequestX(PutApiSpacesGroupsGuid, {
    onSuccess: (res) => {
      GetApiCmtSpaceAllReq.run();
      onClose();
    },
    loadingText: {
      done: i('cmtSidebar.group.update.success'),
    },
  });

  const handleUpdateGroup = async (val: SpaceAPI.UpdateGroupParams) => {
    PutApiSpacesGroupsGuidRequest.run(groupInfo.guid, {
      ...val,
      iconType: 0,
      visibility,
    });
  };
  const [form] = Form.useForm();
  return (
    <Drawer
      open={visible}
      width={440}
      footer={null}
      onClose={onClose}
      className={styles.modal}
      destroyOnClose
      // getContainer={false}
    >
      <Form
        className={styles.container}
        onFinish={handleUpdateGroup}
        initialValues={{
          name: groupInfo?.name || '',
          icon: groupInfo?.icon || '',
          // isOpenReadMemberList: groupInfo?.isOpenReadMemberList || false,
        }}
        form={form}
      >
        <div className={styles.content_item}>
          <span className={styles.title}>{i('cmtSidebar.group.update.title')}</span>
          <div className={styles.content}>
            <div className={styles.content_status}>
              <Form.Item
                name="name"
                rules={[
                  {
                    required: true,
                    message: i('cmtSidebar.group.update.name.validate'),
                  },
                ]}
              >
                <Input
                  className={styles.content_status_input}
                  placeholder={i('cmtSidebar.group.update.name.placeholder')}
                />
              </Form.Item>
            </div>
          </div>
        </div>
        <div className={styles.content_item}>
          <span className={styles.content_text}>{i('cmtSidebar.group.update.visibility')}</span>
          <Radio.Group
            className={styles.content_btn_group}
            defaultValue={groupInfo.visibility || Visibility.INTERNAL}
            size="small"
            onChange={(e) => setVisibility(e.target.value)}
          >
            <Radio.Button className={styles.content_btn} value={Visibility.INTERNAL}>
              {i('visiblitylevel.internal')}
            </Radio.Button>
            <Radio.Button className={styles.content_btn} value={Visibility.SECRET}>
              {i('visiblitylevel.secret')}
            </Radio.Button>
          </Radio.Group>
        </div>

        {/*<div className={styles.content_item}>*/}
        {/*  <div className={styles.content_switch}>*/}
        {/*    <span>{i('cmtSidebar.group.update.pms')}</span>*/}

        {/*    <div className={styles.content_switch_item}>*/}
        {/*      <span className={styles.content_switch_text}>*/}
        {/*        {i('cmtSidebar.group.update.pms.item')}*/}
        {/*      </span>*/}
        {/*      <Form.Item name="isOpenReadMemberList" valuePropName="checked">*/}
        {/*        <Switch />*/}
        {/*      </Form.Item>*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*</div>*/}

        <Form.Item>
          <div className={styles.action}>
            <Button
              className={styles.action_btn}
              rootStyle={{ marginLeft: 20 }}
              type="primary"
              loading={PutApiSpacesGroupsGuidRequest.loading}
              htmlType="submit"
            >
              {i('cmtSidebar.group.update.submit')}
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default UpdateGroup;
