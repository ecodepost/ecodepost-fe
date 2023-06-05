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
