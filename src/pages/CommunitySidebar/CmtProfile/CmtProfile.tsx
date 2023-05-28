import {Button, Form, Input, Modal, Spin} from 'antd';
import React, {useEffect, useState} from 'react';
import styles from './CmtProfile.less';
import {GetApiMyCmtUser, PutApiMyCmtUser} from "@/services/base/api.gen";
import useRequestX from "@/hooks/useRequestX";

interface CmtProfileProps {
  visible: boolean;
  onClose: () => void;
}

const CmtProfile: React.FC<CmtProfileProps> = (props) => {
  const {visible, onClose} = props;
  const [myCmtProfile, setMyCmtProfile] = useState<Communityv1UserInfoRes>();
  const [form] = Form.useForm();

  const GetApiMyCmtUserReq = useRequestX(GetApiMyCmtUser, {
    onSuccess: (res) => {
      setMyCmtProfile(res.data);
      form.setFieldsValue({...res.data});
    }
  })

  const PutApiMyCmtUserReq = useRequestX(PutApiMyCmtUser, {
    onSuccess: () => {
      onClose()
    }
  })
  useEffect(() => {
    GetApiMyCmtUserReq.run();
  }, []);

  return (
    <Modal
      open={visible}
      width={520}
      footer={null}
      centered
      destroyOnClose
      onCancel={() => onClose()}
      className={styles.modal}
    >
      {myCmtProfile && <div className={styles.profile}>
        <div className={styles.title}>
          <span>编辑社区个人资料</span>
        </div>

        <Form
          form={form}
          initialValues={{
            position: myCmtProfile?.position || '',
            nickname: myCmtProfile.nickname,
          }}
          onFinish={PutApiMyCmtUserReq.run}
        >
          {GetApiMyCmtUserReq.loading ? (
            <Spin/>
          ) : (
            <>
              <div className={styles.item}>
                <span>昵称</span>
                <Form.Item
                  name="nickname"
                  rules={[
                    {
                      required: true,
                      message: '请输入昵称',
                    },
                  ]}
                >
                  <Input className={styles.itemInput} placeholder="Asta xie" />
                </Form.Item>
              </div>
              <div className={styles.item}>
                <span>职位信息</span>
                <Form.Item name="position">
                  <Input className={styles.itemInput} />
                </Form.Item>
              </div>
              <div className={styles.action}>
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className={styles.actionBtn}
                    loading={PutApiMyCmtUserReq.loading}
                  >
                    保存
                  </Button>
                </Form.Item>
              </div>
            </>
          )}
        </Form>
      </div>}
    </Modal>
  );
};

export default CmtProfile;
