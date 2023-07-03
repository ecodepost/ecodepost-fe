// @ts-ignore
/* eslint-disable */
import { request } from 'umi';
import { UserAPI } from './typings';

// 根据用户 ID 查询用户信息
export async function getUserByID(id: number) {
  return request<Record<string, any>>(`/api/users/${id}`, {
    method: 'GET',
  });
}

/** 获取用户信息 GET /api/oauth/logout */
export async function logout(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/oauth/logout', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 发送邀请码 POST /api/my/referrals/send */
export async function sendReferrals(
  body: UserAPI.SendReferralsParams[],
  options?: { [key: string]: any },
) {
  return request<Record<string, any>>('/api/my/referrals/send', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

/** 个人其他接口 */
/** 个人信息 GET /api/my */
export async function getMyProfile(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/my', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 修改我的昵称 POST /api/my/nickname */
export async function updateMyNickname(
  body: UserAPI.UpdateMyNicknameParams,
  options?: { [key: string]: any },
) {
  return request<Record<string, any>>('/api/my/nickname', {
    method: 'PUT',
    data: body,
    ...(options || {}),
  });
}

/** 修改头像 POST /api/my/avatar */
export async function updateMyAvatar(
  body: UserAPI.UpdateMyAvatarParams,
  options?: { [key: string]: any },
) {
  return request<Record<string, any>>('/api/my/avatar', {
    method: 'PUT',
    data: body,
    ...(options || {}),
  });
}

/** 修改手机号 POST /api/my/phone */
export async function updateMyPhone(phone: number, options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/my/phone', {
    method: 'PUT',
    data: { phone },
    ...(options || {}),
  });
}

/** 修改邮箱 POST /api/my/email */
export async function updateMyEmail(email: number, options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/my/email', {
    method: 'PUT',
    data: { email },
    ...(options || {}),
  });
}
