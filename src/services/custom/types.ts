/*
 * @description 用于register and login
 */
export type DtoOauthRequest = {
  /*
   * @description password type need, sms type need,  目前只有手机号可以登录
   */
  account?: string;
  client_id?: string;
  /*
   * @description sms type need，短信号码
   */
  code?: string;
  /*
   * @description reset password type need
   */
  oldPassword?: string;
  /*
   * @description password type need
   */
  password?: string;
  /*
   * @description redirect by backend
   */
  redirect_uri?: string;
  /*
   * @description 邀请码
   */
  ref?: string;
  /*
   * @description 当前用户访问的页面
   */
  referer?: string;
  response_type?: string;
  scope?: string;
  state?: string;
  /*
   * @description 电话绑定token
   */
  token?: string;
}

export type ApiSendPhoneCodeRequest = {
  phone?: string;
}

export type ApiphoneCodeRes = {
  ttl?: number;
}
