import styles from './index.less';
import { useState } from 'react';
import { Button, Divider, Form, Input } from 'antd';
import { ProFormText, LoginForm } from '@ant-design/pro-form';
import { WechatOutlined } from '@ant-design/icons';
import MobileCaptchaForm from '@/components/MobileCaptchaForm/MobileCaptchaForm';
import PasswordForm from '@/components/PasswordForm/PasswordForm';
import useRequestX from '@/hooks/useRequestX';
import { useRequestLogin } from '@/hooks/login';

import { useModel } from '@@/exports';
import { ssoapiLoginDirect } from '@/services/custom/api';

type UserLoginModalProps = {
  handleCancel: () => void;
  setModeType: (type: string) => void;
};

interface submitBasicProps {
  username: string;
  password: string;
}
interface submitSmsProps {
  phone: string;
  captcha: string;
}

const layout = {
  wrapperCol: { span: 24 },
};

const LoginModal = (props: UserLoginModalProps) => {
  const { setModeType, handleCancel } = props;
  const { refresh } = useModel('@@initialState');
  const [type, setType] = useState<string>('account');

  const { handleLogin } = useRequestLogin(window.location);

  const changeType = (typeStr: string) => {
    if (typeStr == 'account') {
      setType('phone');
    } else {
      setType('account');
    }
  };

  return (
    <div className={styles.login_form_container}>
      <div className={styles.login_form}>
        <LoginForm
          title=""
          contentStyle={{ padding: 0 }}
          className={styles.formContainer}
          autoFocusFirstInput
          onFinish={async (values: submitBasicProps & submitSmsProps) => {
            await handleLogin(values, type);
          }}
          submitter={{
            submitButtonProps: {
              style: {
                height: 48,
                width: '100%',
              },
            },
          }}
        >
          {type === 'account' && (
            <>
              <ProFormText
                name="username"
                className={styles.section}
                placeholder="+86 请输入手机号"
                rules={[
                  {
                    required: true,
                    message: '请输入用户名',
                  },
                ]}
              />
              <PasswordForm formType={3} />
            </>
          )}

          {/*{status === 'error' && loginType === 'phone' && <LoginMessage content="验证码错误"/>}*/}
          {type === 'phone' && <MobileCaptchaForm captchaType="login" />}
          <div className={styles.changeContainer}>
            <span onClick={() => changeType(type)} className={styles.changeFunc}>
              {type == 'account' ? '短信登录' : '密码登录'}
            </span>
            <span
              className={styles.changeFunc}
              onClick={() => {
                setModeType('forget');
              }}
            >
              忘记密码
            </span>
          </div>
        </LoginForm>
        <div
          className={styles.actions}
          onClick={() => {
            setModeType('register');
          }}
        >
          快速注册
        </div>
        {/*<a style={{ textAlign: 'center' }} onClick={() => { window.parent.postMessage('user_reset_pwd', '*'); }}> 忘记密码? </a>*/}
      </div>
      <Divider className={styles.divider}> Or </Divider>
      <Button
        onClick={() => {
          document.location.href = `/sso/api/login/wechat?response_type=code&${
            window.location.href.split('?')[1]
          }`;
        }}
        className={styles.other_sign}
      >
        <WechatOutlined className={styles.icon} />
        <div className={styles.title}>使用微信账号登陆</div>
      </Button>
    </div>
  );
};

export default LoginModal;
