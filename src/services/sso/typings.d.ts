// @ts-ignore
/* eslint-disable */

declare namespace SSOAPI {
  type UserInfo = {
    nickname?: string;
    avatar?: string;
  };

  type LoginResult = {
    status?: string;
    type?: string;
    currentAuthority?: string;
  };

  type PageParams = {
    current?: number;
    pageSize?: number;
  };

  type Captcha = {
    code?: number;
    status?: string;
  };

  type LoginBasicParams = {
    phone?: string;
    password?: string;
  };

  type LoginSmsParams = {
    phone?: string;
    captcha?: string;
  };

  type RegisterParams = {
    account?: string;
    password?: string;
    code?: string;
  };

  type ForgetPwdParams = {
    account?: string;
    code?: string;
    password?: string;
  };

  type ResetPwdParams = {
    oldPassword?: string;
    password?: string;
  };

  type UpdateNickNameParams = {
    nickname?: string;
  };

  type UpdateAvatarParams = {
    url: string;
    size: number;
  };

  type UploadTokenParams = {
    fileName: string;
  };

  type ErrorResponse = {
    /** 业务约定的错误码 */
    errorCode: string;
    /** 业务上的错误信息 */
    errorMessage?: string;
    /** 业务上的请求是否成功 */
    success?: boolean;
  };
}
