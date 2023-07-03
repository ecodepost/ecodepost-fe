import { ProFormCaptcha, ProFormText } from '@ant-design/pro-form';
import styles from './MobileCaptchaForm.less';
import { useRequestLogin } from '@/hooks/login';
import React, { useState } from 'react';

interface MobileCaptchaFormProps {
  captchaType: string;
}

const MobileCaptchaForm: React.FC<MobileCaptchaFormProps> = (props) => {
  const { captchaType } = props;
  const { handleCaptcha } = useRequestLogin(window.location);
  const [countDown, setCountDown] = useState<number>();
  return (
    <>
      <ProFormText
        name="phone"
        placeholder="+86 请输入手机号"
        rules={[
          {
            required: true,
            message: '请输入手机号',
          },
        ]}
      />
      <div className={styles.captchaWapper}>
        <ProFormCaptcha
          countDown={countDown}
          captchaProps={{ size: 'large' }}
          placeholder="4位验证码"
          captchaTextRender={(timing: boolean, count: number) => {
            if (timing) return `${count}s后再次获取验证码`;
            return '获取验证码';
          }}
          name="captcha"
          phoneName="phone"
          rules={[
            {
              required: true,
              message:
                // <FormattedMessage id="pages.login.captcha.required" defaultMessage="请输入验证码" />
                '请输入验证码',
            },
          ]}
          onGetCaptcha={async (phone: string) => {
            handleCaptcha(phone, captchaType).then((res) => {
              if (res.code === 0) {
                setCountDown(res.data.ttl);
              }
            });
          }}
        />
      </div>
    </>
  );
};

export default MobileCaptchaForm;
