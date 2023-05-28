import {Button, Form, Input, Modal} from 'antd';
import React from 'react';
import {useIntl, useModel} from 'umi';
import styles from './PanelRename.less';
import {PutApiSpacesGuid} from '@/services/base/api.gen';
import useRequestX from '@/hooks/useRequestX';

interface UpdateGroupParams {
  visible: boolean;
  onClose: (e?: React.MouseEvent<HTMLElement>) => void;
  nodeSpace: any;
  spaceGuid: string;
}

const PanelRename: React.FC<UpdateGroupParams> = (props) => {
  const {visible, onClose, nodeSpace, spaceGuid} = props;
  const {GetApiCmtSpaceAllReq} = useModel('community');
  const intl = useIntl();
  const i = (intlId: string) => intl.formatMessage({ id: intlId });

  const [form] = Form.useForm();

  const PutApiSpacesGuidRequest = useRequestX(PutApiSpacesGuid, {
    onSuccess: (res) => {
      GetApiCmtSpaceAllReq.run();
    },
  });

  const handleRename = async (values: any) => {
    await PutApiSpacesGuidRequest.run(spaceGuid, {
      name: values.name,
    });
  };

  return (
    (<Modal
      onCancel={onClose}
      open={visible}
      okButtonProps={{ disabled: true }}
      cancelButtonProps={{ disabled: true }}
      footer={null}
      destroyOnClose
    >
      <Form
        className={styles.container}
        onFinish={handleRename}
        initialValues={{ name: nodeSpace.name }}
        form={form}
      >
        <span className={styles.title}>重命名</span>
        <div className={styles.content}>
          <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message: '请输入新的空间名称',
              },
            ]}
          >
            <Input allowClear className={styles.content_input} placeholder={'请输入新的空间名称'} />
          </Form.Item>
        </div>
        <Form.Item>
          <div className={styles.action}>
            <Button
              className={styles.action_btn}
              type="primary"
              loading={PutApiSpacesGuidRequest.loading}
              htmlType="submit"
            >
              {i('重命名')}
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Modal>)
  );
};

export default PanelRename;
