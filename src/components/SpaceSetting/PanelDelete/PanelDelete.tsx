import {Button, Form, Input, Modal} from 'antd';
import React from 'react';
import {useModel} from 'umi';
import styles from './PanelDelete.less';
import {DeleteApiSpacesGuid} from "@/services/base/api.gen";
import useRequestX from "@/hooks/useRequestX";
import {pushHome} from "@/utils/historypush/history";

interface PanelDeleteParams {
  visible: boolean;
  onClose: () => void;
  spaceGuid: string;
  spaceName: string;
}

const PanelDelete: React.FC<PanelDeleteParams> = (props) => {
  const {visible, onClose, spaceName, spaceGuid} = props;
  const {GetApiCmtSpaceAllReq} = useModel('community');

  const [form] = Form.useForm();

  const DeleteApiSpacesGuidReq = useRequestX(() => DeleteApiSpacesGuid(spaceGuid), {
    onSuccess: () => {
      GetApiCmtSpaceAllReq.run();
      onClose();
      pushHome();
    }
  })


  const handleDelete = async (values: any) => {
    if (form.getFieldValue('nameToConfirm') === spaceName) {
      await DeleteApiSpacesGuidReq.run();
    }
  };

  return (
    <Modal
      onCancel={onClose}
      open={visible}
      okButtonProps={{disabled: true}}
      cancelButtonProps={{ disabled: true }}
      footer={null}
    >
      {spaceName && <Form
        className={styles.container}
        initialValues={{name: ''}}
        onFinish={handleDelete}
        form={form}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <>
          <div className={styles.title}>删除空间</div>
          <div
            className={styles.prompt}
            style={{
              marginTop: '10px',
            }}
          >
            <span>输入以下内容以确认：</span>
            <span>{spaceName}</span>
          </div>
          <div className={styles.content}>
            <Form.Item
              name="nameToConfirm"
              rules={[
                {
                  required: true,
                  message: '不能为空',
                },
                {
                  validator: (_, value) => {
                    if (value === spaceName) {
                      return Promise.resolve();
                    } else {
                      return Promise.reject('输入不匹配');
                    }
                  },
                  message: '输入不匹配',
                },
              ]}
            >
              <Input allowClear className={styles.content_input} placeholder={'请按要求输入'}/>
            </Form.Item>
          </div>
          <Form.Item>
            <div className={styles.action}>
              <Button
                className={styles.action_btn}
                // type="primary"
                htmlType="submit"
                onClick={(e) => {
                  onClose();
                }}
                style={{
                  color: 'black',
                }}
              >
                取消
              </Button>
              <Button className={styles.action_btn} htmlType="submit" type="primary" danger={true}>
                确认
              </Button>
            </div>
          </Form.Item>
        </>
      </Form>}
    </Modal>
  );
};

export default PanelDelete;
