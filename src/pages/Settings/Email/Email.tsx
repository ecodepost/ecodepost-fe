import { messageInfo } from '@/components/Message/Message';
import { updateMyEmail } from '@/services/user/api';
import { InfoCircleOutlined } from '@ant-design/icons';
import { Button, Form, Input, message } from 'antd';
import { useState } from 'react';
import styles from './Email.less';
import React from 'react';
import DefaultHeader from '@/components/Header/DefaultHeader/DefaultHeader';

const Email = () => {
  const [form] = Form.useForm();

  const [submitBtnLoading, setSubmitBtnLoading] = useState<boolean>(false);
  const handleSubmit = async (val: any) => {
    setSubmitBtnLoading(true);
    const { email } = val;
    try {
      const res = await updateMyEmail(email);
      if (res.code === 0) {
        messageInfo({
          type: 'success',
          content: '绑定邮箱修改成功',
        });
        setSubmitBtnLoading(false);
      } else {
        messageInfo({
          type: 'error',
          content: res.msg,
        });
      }
    } catch (err) {
      messageInfo({
        type: 'error',
        content: '绑定邮箱修改失败',
      });
    }
  };

  return (
    <React.Fragment>
      <DefaultHeader />
      <Form form={form} onFinish={handleSubmit}>
        <div className={styles.email}>
          <div className={styles.email_item}>
            <span className={styles.email_item_text}>新绑定邮箱</span>
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: '请输入绑定邮箱',
                },
              ]}
            >
              <Input className={styles.email_item_input} placeholder="111@163.com" />
            </Form.Item>
          </div>
          <div className={styles.email_item}>
            <span className={styles.email_item_text}>登录密码</span>
            <Input className={styles.email_item_input} placeholder="请输入登录密码" />
          </div>
          <div className={styles.email_item_captcha}>
            <span className={styles.email_item_text}>验证码</span>
            <div>
              <Input className={styles.email_item_captcha_input} placeholder="请输入验证码" />
              <div className={styles.email_item_captcha_img}>
                <span>7M568</span>
              </div>
            </div>
          </div>
          <div className={styles.email_tip}>
            <InfoCircleOutlined className={styles.email_tip_icon} />
            <span className={styles.email_tip_text}>
              系统将向新邮箱发送一封验证邮件，点击邮件中的激活链接即可完成修改。
            </span>
          </div>
          <div className={styles.email_submit}>
            <Button
              type="primary"
              className={styles.email_submit_btn}
              htmlType="submit"
              loading={submitBtnLoading}
            >
              保存修改
            </Button>
          </div>
        </div>
      </Form>
    </React.Fragment>
  );
};

export default Email;
