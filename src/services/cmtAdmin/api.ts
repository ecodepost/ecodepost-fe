// @ts-ignore
/* eslint-disable */
import {TotalKey} from '@/enums/totalkey';
import {request} from 'umi';

import {CmtAdminAPI} from './typings';


/** 删除权限成员 DELETE /api/cmtAdmin/pms/managers/members/:uid */
export async function deletePermissionByUid(uid: number) {
  return request<Record<string, any>>(`/api/cmtAdmin/pms/managers/members/${uid}`, {
    method: 'DELETE',
  });
}

/** 获取全部role列表 GET /api/cmtAdmin/pms/roles */
export async function getRoles(options?: { [key: string]: any }) {
  return request<Record<string, any>>(`/api/cmtAdmin/pms/roles`, {
    method: 'GET',
    ...(options || {}),
  });
}

/** 创建Role POST /api/cmtAdmin/pms/roles */
export async function createRole(name: string, options?: { [key: string]: any }) {
  return request<Record<string, any>>(`/api/cmtAdmin/pms/roles`, {
    method: 'POST',
    data: { name },
    ...(options || {}),
  });
}

/** 更新role PUT /api/cmtAdmin/pms/roles/:roleId */
export async function updateRoleInfo(
  roleId: number | string,
  name: string,
  options?: { [key: string]: any },
) {
  return request<Record<string, any>>(`/api/cmtAdmin/pms/roles/${roleId}`, {
    method: 'PUT',
    data: { name },
    ...(options || {}),
  });
}

/** 获取某个role的成员列表 GET /api/cmtAdmin/pms/roles/:roleId/members */
export async function getRoleMemberList(roleId: string | number, options?: { [key: string]: any }) {
  return request<Record<string, any>>(`/api/cmtAdmin/pms/roles/${roleId}/members`, {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取某个role的权限列表 GET /api/cmtAdmin/pms/roles/:roleId/permissions */
export async function getRolePermissionList(
  roleId: string | number,
  options?: { [key: string]: any },
) {
  return request<Record<string, any>>(`/api/cmtAdmin/pms/roles/${roleId}/permissions`, {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取某个role的space权限列表 GET /api/cmtAdmin/pms/roles/:roleId/spacePermissions */
export async function getRoleSpacePermissionList(
  roleId: string | number,
  options?: { [key: string]: any },
) {
  return request<Record<string, any>>(`/api/cmtAdmin/pms/roles/${roleId}/spacePermissions`, {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取某个role的group权限列表 GET /api/cmtAdmin/pms/roles/:roleId/spaceGroupPermissions */
export async function getRoleGroupPermissionList(
  roleId: string | number,
  options?: { [key: string]: any },
) {
  return request<Record<string, any>>(`/api/cmtAdmin/pms/roles/${roleId}/spaceGroupPermissions`, {
    method: 'GET',
    ...(options || {}),
  });
}

/** 修改某个role权限点 PUT /api/cmtAdmin/pms/roles/:roleId/permissions */
export async function updateRolePermission(
  roleId: string | number,
  body: CmtAdminAPI.UpdateRolePermissionParams,
  options?: { [key: string]: any },
) {
  return request<Record<string, any>>(`/api/cmtAdmin/pms/roles/${roleId}/permissions`, {
    method: 'PUT',
    data: body,
    ...(options || {}),
  });
}

/** 修改某个role的Group的权限点 PUT /api/cmtAdmin/pms/roles/:roleId/spaceGroupPermissions */
export async function updateRoleGroupPermission(
  roleId: string | number,
  body: CmtAdminAPI.UpdateRoleGroupPermissionParams,
  options?: { [key: string]: any },
) {
  return request<Record<string, any>>(`/api/cmtAdmin/pms/roles/${roleId}/spaceGroupPermissions`, {
    method: 'PUT',
    data: body,
    ...(options || {}),
  });
}

/** 修改某个role的Space的权限点 PUT /api/cmtAdmin/pms/roles/:roleId/spacePermissions */
export async function updateRoleSpacePermission(
  roleId: string | number,
  body: CmtAdminAPI.UpdateRoleSpacePermissionParams,
  options?: { [key: string]: any },
) {
  return request<Record<string, any>>(`/api/cmtAdmin/pms/roles/${roleId}/spacePermissions`, {
    method: 'PUT',
    data: body,
    ...(options || {}),
  });
}

/** 添加某个role成员 POST /api/cmtAdmin/pms/roles/:roleId/members */
export async function addRoleMember(
  roleId: string | number,
  uids: number[],
  options?: { [key: string]: any },
) {
  return request<Record<string, any>>(`/api/cmtAdmin/pms/roles/${roleId}/members`, {
    method: 'POST',
    data: { uids },
    ...(options || {}),
  });
}

/** 删除某个role成员 DELETE /api/cmtAdmin/pms/roles/:roleId/members */
export async function deleteRoleMember(roleId: string | number, uids: number[]) {
  return request<Record<string, any>>(`/api/cmtAdmin/pms/roles/${roleId}/members`, {
    method: 'DELETE',
    data: { uids },
  });
}

/** role的space的初始权限点 GET /api/cmtAdmin/pms/roles/:roleId/spaces/:guid/initPermissions */
export async function initSpacePermissions(
  roleId: string | number,
  guid: string,
  options?: { [key: string]: any },
) {
  return request<Record<string, any>>(
    `/api/cmtAdmin/pms/roles/${roleId}/spaces/${guid}/initPermissions`,
    {
      method: 'GET',
      ...(options || {}),
    },
  );
}

/** role的group的初始权限点 GET /api/cmtAdmin/pms/roles/:roleId/spaceGroups/:guid/initPermissions */
export async function initGroupPermissions(
  roleId: string | number,
  guid: string,
  options?: { [key: string]: any },
) {
  return request<Record<string, any>>(
    `/api/cmtAdmin/pms/roles/${roleId}/spaceGroups/${guid}/initPermissions`,
    {
      method: 'GET',
      ...(options || {}),
    },
  );
}

/** 通过用户uid获取加入的用户组roleid[] GET /api/cmtAdmin/pms/roles/-/users/:uid/roleIds */
export async function getRoleIdsByUid(uid: number, options?: { [key: string]: any }) {
  return request<Record<string, any>>(`/api/cmtAdmin/pms/roles/-/users/${uid}/roleIds`, {
    method: 'GET',
    ...(options || {}),
  });
}

/** 删除用户组 DELETE /api/cmtAdmin/pms/roles/:roleId */
export async function deleteRole(roleId: number) {
  return request<Record<string, any>>(`/api/cmtAdmin/pms/roles/${roleId}`, {
    method: 'DELETE',
  });
}

/** 社区新增勋章 POST /api/medals */
export async function createMedalType(
  body: CmtAdminAPI.CreateMedalTypeParams,
  options?: { [key: string]: any },
) {
  return request<Record<string, any>>(`/api/medals`, {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

/** 社区修改勋章 PUT /api/medals/:id */
export async function updateMedalInfo(
  body: CmtAdminAPI.UpdateMedalInfoParams,
  id: number,
  options?: { [key: string]: any },
) {
  return request<Record<string, any>>(`/api/medals/${id}`, {
    method: 'PUT',
    data: body,
    ...(options || {}),
  });
}

/** 获取社区勋章列表，可以指定创建者 GET /api/medals */
export async function getMedalList(
  currentPage: number,
  creatorUid?: number,
  options?: { [key: string]: any },
) {
  return request<Record<string, any>>(`/api/medals`, {
    method: 'GET',
    params: { currentPage, creatorUid },
    ...(options || {}),
  });
}

/** 批量给用户发勋章 POST /api/medals/:medalId/users */
export async function awardMedalToUsers(
  medalId: number,
  body: CmtAdminAPI.AwardMedalToUsersParams,
  options?: { [key: string]: any },
) {
  return request<Record<string, any>>(`/api/medals/${medalId}/members`, {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

/** 社区删除勋章 DELETE /api/medals/:medalId */
export async function deleteMedal(medalId: number) {
  return request<Record<string, any>>(`/api/medals/${medalId}`, {
    method: 'DELETE',
  });
}

/** 删除用户的勋章 DELETE /api/medals/-/users/:medalMemberId */
export async function deleteUserMedal(medalMemberId: number) {
  return request<Record<string, any>>(`/api/medals/-/users/${medalMemberId}`, {
    method: 'DELETE',
  });
}

/** 勋章上传图片获取token GET /api/medals/-/uploadPicToken */
export async function getMedalUploadToken(
  body: CmtAdminAPI.GetMedalUploadTokenParams,
  options?: { [key: string]: any },
) {
  return request<Record<string, any>>(`/api/medals/-/uploadPicToken`, {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

/** 获取某个勋章的成员列表 GET /api/medals/:medalId/members */
export async function getMedalAwardList(
  medalId: number,
  currentPage: number,
  options?: { [key: string]: any },
) {
  return request<Record<string, any>>(`/api/medals/${medalId}/members`, {
    method: 'GET',
    params: { currentPage },
    ...(options || {}),
  });
}

/** 获取社区的监控数据 GET /api/cmtAdmin/total/community/:key */
export async function getCmtTotalData(key: TotalKey, options?: { [key: string]: any }) {
  return request<Record<string, any>>(`/api/cmtAdmin/total/community/${key}`, {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取空间/分组的监控数据 GET /api/cmtAdmin/total/space/:spaceGuid/:key */
export async function getSpaceTotalData(
  key: TotalKey,
  spaceGuid: string,
  options?: { [key: string]: any },
) {
  return request<Record<string, any>>(`/api/cmtAdmin/total/space/${spaceGuid}/${key}`, {
    method: 'GET',
    ...(options || {}),
  });
}

export async function getUpdateLogList(body: any, options?: { [key: string]: any }) {
  return request<Record<string, any>>(`/api/cmtAdmin/logger/listPage`, {
    method: 'GET',
    params: body,
    ...(options || {}),
  });
}

export async function getUpdateLogEventGroup(options?: { [key: string]: any }) {
  return request<Record<string, any>>(`/api/cmtAdmin/logger/eventAndGroupList`, {
    method: 'GET',
    ...(options || {}),
  });
}

export async function getBenefitData(options?: { [key: string]: any }) {
  return request<Record<string, any>>(`/api/cmtAdmin/billing/equityData`, {
    method: 'GET',
    ...(options || {}),
  });
}
