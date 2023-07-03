// @ts-ignore
/* eslint-disable */
/** 这部分api来自sso，之后可能需要修改替换 */
import { request } from 'umi';

/** 重置密码接口 POST /api/password/reset */
/** @loginrequired */
export async function resetpwd(body: SSOAPI.ResetPwdParams, options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/sso/password/reset', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 注册发送验证码 POST /api/phone/sendRegisterCode */
export async function getRegisterCaptcha(
  params: {
    Phone?: string;
  },
  options?: { [key: string]: any },
) {
  return request<SSOAPI.Captcha>('/api/sso/phone/sendRegisterCode', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 登录发送验证码 POST /api/phone/sendLoginCode */
export async function getLoginCaptcha(
  params: {
    phone?: string;
  },
  options?: { [key: string]: any },
) {
  return request<SSOAPI.Captcha>('/sso/api/phone/sendLoginCode', {
    method: 'POST',
    data: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 忘记密码发送验证码 POST /api/phone/sendRetrievePasswordCode */
export async function getForgetPwdCaptcha(
  params: {
    phone?: string;
  },
  options?: { [key: string]: any },
) {
  return request<SSOAPI.Captcha>('/sso/api/phone/sendRetrievePasswordCode', {
    method: 'POST',
    data: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 账号密码登录接口 POST /api/login/basic */
export async function login(body: SSOAPI.LoginBasicParams, options?: { [key: string]: any }) {
  return request<SSOAPI.LoginResult>('/sso/api/login/basic', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 验证码登录接口 POST /api/login/sms */
export async function captchaLogin(body: SSOAPI.LoginSmsParams, options?: { [key: string]: any }) {
  return request<SSOAPI.LoginResult>('/sso/api/login/sms', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 验证码登录接口 POST /api/login/sms */
export async function phoneBindLogin(
  body: SSOAPI.LoginSmsParams,
  options?: { [key: string]: any },
) {
  return request<SSOAPI.LoginResult>('/sso/api/login/phoneBind', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 注册接口 POST /api/register */
export async function register(body: SSOAPI.RegisterParams, options?: { [key: string]: any }) {
  return request<Record<string, any>>('/sso/api/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 找回密码接口 POST /api/password/retrieve */
export async function forgetpwd(body: SSOAPI.ForgetPwdParams, options?: { [key: string]: any }) {
  return request<Record<string, any>>('/sso/api/password/retrieve', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
