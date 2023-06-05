import { request } from "@umijs/max";

import type {
  DtoOauthRequest,
  ApiSendPhoneCodeRequest,
  ApiphoneCodeRes
} from "./types";

export function apiLoginPhoneCode(data: ApiSendPhoneCodeRequest) {
  return request<{ code: number; data: ApiphoneCodeRes; msg: string; }>(`/api/sso/phone/sendLoginCode`, {
    method: "post",
    data,
  });
}

export function apiRegisterPhoneCode(data: ApiSendPhoneCodeRequest) {
  return request<{ code: number; data: ApiphoneCodeRes; msg: string; }>(`/api/sso/phone/sendRegisterCode`, {
    method: "post",
    data,
  });
}

export function apiRegister(data: DtoOauthRequest) {
  return request(`/api/sso/register`, {
    method: "post",
    data,
  });
}

export function ssoapiLoginDirect(data: any) {
  return request(`/api/sso/login/basic`, {
    method: "post",
    data,
  });
}
