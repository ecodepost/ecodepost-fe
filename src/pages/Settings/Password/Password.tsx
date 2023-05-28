import { messageInfo } from '@/components/Message/Message';
import { resetpwd } from '@/services/sso/api';
import { Button, Form, Input, message } from 'antd';
import { useState } from 'react';
import styles from './Password.less';
import React from 'react';
import DefaultHeader from '@/components/Header/DefaultHeader/DefaultHeader';

const Password = () => {
  const [form] = Form.useForm();

  const [submitBtnLoading, setSubmitBtnLoading] = useState<boolean>(false);
  const handleSubmit = async (val: any) => {
    setSubmitBtnLoading(true);
    const { oldPassword, password } = val;
    try {
      const res = await resetpwd({ oldPassword, password });
      if (res.code === 0) {
        messageInfo({
          type: 'success',
          content: '密码修改成功，请重新登录',
        });
        location.href = `${DOMAIN}/api/oauth/login`;
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
        content: '密码修改失败',
      });
    }
  };

  return (
    <React.Fragment>
      <DefaultHeader />
      <div className={styles.pwd}>
        <Form form={form} onFinish={handleSubmit}>
          <div className={styles.pwd_item}>
            <span className={styles.pwd_item_text}>旧的登录密码</span>
            <Form.Item
              name="oldPassword"
              rules={[
                {
                  required: true,
                  message: '请输入旧的登录密码',
                },
              ]}
            >
              <Input className={styles.pwd_item_input} placeholder="16位密码，包含数字和字母" />
            </Form.Item>
          </div>
          <div className={styles.pwd_item}>
            <span className={styles.pwd_item_text}>新密码</span>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: '请输入新的登录密码',
                },
              ]}
            >
              <Input className={styles.pwd_item_input} placeholder="16位密码，包含数字和字母" />
            </Form.Item>
          </div>
          <div className={styles.pwd_item}>
            <span className={styles.pwd_item_text}>确认新密码</span>
            <Form.Item
              name="confirmPwd"
              rules={[
                {
                  required: true,
                  message: '请输入旧的登录密码',
                },
                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject('两次密码输入不一致');
                  },
                }),
              ]}
            >
              <Input className={styles.pwd_item_input} placeholder="16位密码，包含数字和字母" />
            </Form.Item>
          </div>
          <div className={styles.pwd_submit}>
            <Button
              type="primary"
              className={styles.pwd_submit_btn}
              htmlType="submit"
              loading={submitBtnLoading}
            >
              保存修改
            </Button>
          </div>
        </Form>
      </div>
    </React.Fragment>
  );
};

export default Password;
