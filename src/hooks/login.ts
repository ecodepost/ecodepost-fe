import { parse } from 'querystring';
import { message } from 'antd';
import { history } from '@@/core/history';
import { useIntl } from '@@/plugin-locale/localeExports';
import {
  getForgetPwdCaptcha,
  getLoginCaptcha,
  getRegisterCaptcha,
  captchaLogin,
  login,
  phoneBindLogin,
  register,
} from '@/services/sso/api';
import styles from '@/components/MobileCaptchaForm/MobileCaptchaForm.less';

interface submitBasicProps {
  username?: string;
  password?: string;
}
interface submitSmsProps {
  phone?: string;
  captcha?: string;
}

interface registerParams {
  phone: string;
  captcha: string;
  password: string;
  nickname: string;
  agreement: boolean;
}
type LoginType = 'account' | 'phone' | 'phoneBind';
type CaptchaType = 'login' | 'register' | 'forgetPwd';

export function useRequestLogin(location: Location) {
  const urlGetParams = location.href.split('?')[1];
  const LoginApiMap = {
    account: login,
    phone: captchaLogin,
    phoneBind: phoneBindLogin,
  };
  const intl = useIntl();

  const handleLogin = async (values: submitBasicProps & submitSmsProps, loginType: LoginType) => {
    try {
      let params = {};
      switch (loginType) {
        case 'account':
          params = {
            account: values.username,
            password: values.password,
            ...parse(urlGetParams),
          };
          break;
        case 'phone':
          params = {
            account: values.phone,
            code: values.captcha,
            ...parse(urlGetParams),
          };
          break;
        case 'phoneBind':
          params = {
            account: values.phone,
            code: values.captcha,
            ...parse(urlGetParams),
          };
          break;
      }

      const res = await LoginApiMap[loginType](params);
      if (res.code === 302) {
        message.success('登录成功！');
        console.log('res.data', res.data);
        window.location.href = res.data;
        /** 这里会自动根据app.tsx的配置重定向 */
        // await fetchUserInfo();
        /** 此方法会跳转到 redirect 参数所在的位置 */
        // if (!history) return;
        // const { query } = history.location;
        // const { redirect } = query as { redirect: string };
        // history.push('/sso/usercenter');
      } else if (res?.code === 200 && res?.msg === '已经登录') {
        message.success('已经登录，正在跳转用户中心');
        // await fetchUserInfo();
        history.push('/');
      } else {
        message.error(res?.msg);
      }
      // 如果失败去设置用户错误信息
      // setUserLoginState(res);
    } catch (error) {
      console.log('error', error);
      const defaultLoginFailureMessage = intl.formatMessage({
        id: 'pages.login.failure',
        defaultMessage: '登录失败2，请重试',
      });
      message.error(defaultLoginFailureMessage);
    }
  };

  const handleRegister = async (values: registerParams) => {
    try {
      const account = values.phone;
      const code = values.captcha;
      const password = values.password;
      const msg = await register({
        account,
        code,
        password,
        ...parse(urlGetParams || ''),
      });
      if (msg.code === 302) {
        message.success('注册成功');
        // await fetchUserInfo();
        // history.push('/usercenter');
        return;
      } else {
        message.error(msg.msg);
      }
    } catch (error) {
      message.error('注册失败，请重试');
    }
  };

  // 根据调用方确定获得验证码的接口
  const captchaApiMap = {
    login: getLoginCaptcha,
    register: getRegisterCaptcha,
    forgetPwd: getForgetPwdCaptcha,
  };

  const handleCaptcha = async (phone: string, captchaType: CaptchaType) => {
    if (phone.toString().match(/^1\d{10}$/) === null) {
      message.error({
        content: '请输入正确的手机号',
        className: styles.captchaErrorMessage,
      });
      return new Promise(async (resolve, reject) => {
        resolve({ code: 1 });
      });
    }

    const result = await captchaApiMap[captchaType]({ phone: phone });
    if (result.code !== 0) {
      message.error({
        content: result.msg,
        className: styles.captchaErrorMessage,
      });
      return new Promise(async (resolve, reject) => {
        resolve(result);
      });
    }
    return new Promise(async (resolve, reject) => {
      resolve(result);
    });
  };

  return {
    handleLogin,
    handleRegister,
    handleCaptcha,
  };
}
