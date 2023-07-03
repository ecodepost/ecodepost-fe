import styles from '@/components/AuthModal/index.less';
import { Button, Form, Input } from 'antd';
import { ProFormCheckbox, LoginForm } from '@ant-design/pro-form';
import { useModel } from '@@/exports';
import { forgetpwd } from '@/services/sso/api';
import MobileCaptchaForm from '@/components/MobileCaptchaForm/MobileCaptchaForm';
import PasswordForm from '@/components/PasswordForm/PasswordForm';
type ForgetModalProps = {
  handleCancel: () => void;
  setModeType: (type: string) => void;
};

interface submitParams {
  phone: string;
  captcha: string;
  password: string;
}

const ForgetModal = (props: ForgetModalProps) => {
  const { setModeType, handleCancel } = props;
  const { initialState, setInitialState } = useModel('@@initialState');

  const fetchUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo();

    if (userInfo) {
      await setInitialState((s: any) => ({
        ...s,
        userInfo: userInfo,
      }));
    }
  };

  const handleSubmit = async (values: submitParams) => {
    try {
      const account = values.phone;
      const code = values.captcha;
      const password = values.password;
      const msg = await forgetpwd({ account, code, password });
      if (msg.code === 302) {
        await fetchUserInfo();
        // history.push('/usercenter');
      } else {
      }
    } catch (error) {}
  };
  return (
    <div className={styles.login_form_container}>
      <div className={styles.login_form}>
        <LoginForm
          autoFocusFirstInput
          className={styles.formContainer}
          submitter={{
            render: (props, doms) => {
              return [
                <div className={styles.forget}>
                  <Button
                    className={styles.return}
                    onClick={() => {
                      setModeType('login');
                    }}
                  >
                    <span className={styles.returnWords}>返回登录</span>
                  </Button>
                  <Button className={styles.confrim} onClick={() => props.form?.submit?.()} key={1}>
                    <span className={styles.confrimWords}>确认</span>
                  </Button>
                </div>,
              ];
            },
          }}
          onFinish={async (values: submitParams) => {
            await handleSubmit(values);
          }}
        >
          <MobileCaptchaForm captchaType="forgetPwd" />
          <PasswordForm formType={1} />
        </LoginForm>
      </div>
    </div>
  );
};

export default ForgetModal;
