import { messageInfo } from '@/components/Message/Message';
import { updateMyPhone } from '@/services/user/api';
import { Button, Form, Input, message } from 'antd';
import { useState } from 'react';
import styles from './Phone.less';
import React from 'react';
import DefaultHeader from '@/components/Header/DefaultHeader/DefaultHeader';

const Phone = () => {
  const [form] = Form.useForm();

  const [submitBtnLoading, setSubmitBtnLoading] = useState<boolean>(false);
  const handleSubmit = async (val: any) => {
    setSubmitBtnLoading(true);
    const { phone } = val;
    try {
      const res = await updateMyPhone(phone);
      if (res.code === 0) {
        messageInfo({
          type: 'success',
          content: '手机号修改成功',
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
        content: '修改手机号失败',
      });
    }
  };

  return (
    <React.Fragment>
      <DefaultHeader />
      <Form form={form} onFinish={handleSubmit}>
        <div className={styles.phone}>
          <div className={styles.phone_item}>
            <span className={styles.phone_item_text}>当前已绑定手机号</span>
            <Input
              className={styles.phone_item_input}
              placeholder="16位密码，包含数字和字母（什么鬼）"
            />
          </div>
          <div className={styles.phone_item}>
            <span className={styles.phone_item_text}>新手机号</span>
            <Form.Item
              name="phone"
              rules={[
                {
                  required: true,
                  message: '请输入手机号',
                },
              ]}
            >
              <Input className={styles.phone_item_input} placeholder="请输入新手机号码" />
            </Form.Item>
          </div>
          <div className={styles.phone_item}>
            <span className={styles.phone_item_text}>登录密码</span>
            <Input className={styles.phone_item_input} placeholder="请输入登录密码" />
          </div>
          <div className={styles.phone_item}>
            <span className={styles.phone_item_text}>验证码</span>
            <Input
              className={styles.phone_item_input}
              placeholder="请输入6位验证码"
              suffix={<Button className={styles.phone_item_input_btn}>发送验证码</Button>}
            />
          </div>
          <div className={styles.phone_submit}>
            <Button
              type="primary"
              className={styles.phone_submit_btn}
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

export default Phone;
