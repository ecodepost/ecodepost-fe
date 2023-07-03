import { Button, Form, Input } from 'antd';
import { useEffect, useState } from 'react';
import { ProFormCheckbox, LoginForm } from '@ant-design/pro-form';
import MobileCaptchaForm from '@/components/MobileCaptchaForm/MobileCaptchaForm';
import PasswordForm from '@/components/PasswordForm/PasswordForm';
import useRequestX from '@/hooks/useRequestX';
import styles from '@/components/AuthModal/index.less';
import { apiRegister, apiRegisterPhoneCode } from '@/services/custom/api';
import { useModel } from '@@/exports';

type RegisterModalProps = {
  handleCancel: () => void;
  setModeType: (type: string) => void;
};

const layout = {
  wrapperCol: { span: 24 },
};

const RegisterModal = (props: RegisterModalProps) => {
  const { setModeType, handleCancel } = props;
  const { refresh } = useModel('@@initialState');
  const [registerForm] = Form.useForm();
  const phone = Form.useWatch('account', registerForm);
  const [isText, setIsText] = useState<boolean>(false);
  const [count, setCount] = useState<number>();

  const apiRegisterPhoneCodeReq = useRequestX(apiRegisterPhoneCode, {
    onSuccess: ({ data }) => {
      setCount(data.ttl);
      setIsText(true);
    },
  });

  const apiRegisterReq = useRequestX(apiRegister, {
    onSuccess: ({ data }) => {
      refresh();
      handleCancel();
    },
  });

  const onRegisterFinish = (values: any) => {
    apiRegisterReq.run(values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  useEffect(() => {
    if (count === undefined) return;
    const timer = setTimeout(() => {
      setCount(count - 1);
    }, 1000);
    if (count === 0) {
      clearTimeout(timer);
      setIsText(false);
    }
  }, [isText, count]);

  return (
    <div className={styles.login_form_container}>
      <div className={styles.login_form}>
        <LoginForm
          autoFocusFirstInput
          form={registerForm}
          className={styles.formContainer}
          submitter={{
            searchConfig: { submitText: '注册' },
            submitButtonProps: {
              style: {
                height: 48,
                width: '100%',
              },
            },
          }}
          onFinish={async (values: submitParams) => {
            const { agreement } = values;
            if (agreement) {
              onRegisterFinish(values);
            } else {
              registerForm.setFieldsValue({ agreement: true });
              registerForm.validateFields();
            }
          }}
        >
          <MobileCaptchaForm captchaType="register" />
          <div className={styles.noMargin}>
            <PasswordForm formType={3} />
          </div>
          <div className={styles.checkBox}>
            <ProFormCheckbox name="agreement">
              我已阅读并同意
              <span style={{ color: 'red' }}>《隐私协议》和《使用条款》</span>
            </ProFormCheckbox>
          </div>
        </LoginForm>
        <div className={styles.loginActions}>
          {/*<div className={styles.textContainer}>*/}
          {/*  <div className={styles.github}>*/}
          {/*    <img className={styles.icon} src={'https://s1.ax1x.com/2022/05/20/Oq4eSI.png'} />*/}
          {/*    <div className={styles.githubTextContainer}>*/}
          {/*      <span className={styles.githubText}>Github登录</span>*/}
          {/*    </div>*/}
          {/*  </div>*/}
          {/*</div>*/}
          <span className={styles.actions}>
            <span
              onClick={() => {
                setModeType('login');
              }}
            >
              已有账号？前往登录
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default RegisterModal;
