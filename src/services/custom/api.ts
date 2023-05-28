import { request } from "@umijs/max";

import type {
  DtoOauthRequest,
  ApiSendPhoneCodeRequest,
  ApiphoneCodeRes
} from "./types";

export function apiLoginPhoneCode(data: ApiSendPhoneCodeRequest) {
  return request<{ code: number; data: ApiphoneCodeRes; msg: string; }>(`/sso/api/phone/sendLoginCode`, {
    method: "post",
    data,
  });
}

export function apiRegisterPhoneCode(data: ApiSendPhoneCodeRequest) {
  return request<{ code: number; data: ApiphoneCodeRes; msg: string; }>(`/sso/api/phone/sendRegisterCode`, {
    method: "post",
    data,
  });
}

export function apiRegister(data: DtoOauthRequest) {
  return request(`/sso/api/register`, {
    method: "post",
    data,
  });
}

export function ssoapiLoginDirect(data: any) {
  return request(`/sso/api/login/basic`, {
    method: "post",
    data,
  });
}
