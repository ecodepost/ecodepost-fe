// @ts-ignore
/* eslint-disable */

import { MedalType } from '@/enums/medaltype';

declare namespace CmtAdminAPI {
  type CmtAdminHomeParams = {
    isSetHome: boolean;
    isSetBanner: boolean;
    articleSortByLogin: number;
    articleSortByNotLogin: number;
    articleHotShowSum: number;
    articleHotShowWithLatest: number;
    activityLatestShowSum: number;
    bannerImg: string;
    bannerTitle: string;
    bannerLink: string;
    defaultPageByNewUser: string;
    defaultPageByNotLogin: string;
    defaultPageByLogin: string;
  };

  type UpdateRolePermissionParams = {
    list: {
      actionName: string;
      desc: string;
      flag: number;
    }[];
  };

  type UpdateRoleGroupPermissionParams = {
    list: {
      guid: string;
      name: string;
      list: {
        actionName: string;
        desc: string;
        flag: number;
      }[];
    }[];
  };

  type UpdateRoleSpacePermissionParams = {
    list: {
      guid: string;
      name: string;
      list: {
        actionName: string;
        desc: string;
        flag: number;
      }[];
    }[];
  };

  type CreateMedalTypeParams = {
    name: string;
    icon: string;
    desc: string;
  };

  type UpdateMedalInfoParams = {
    name: string;
    icon: string;
    desc: string;
  };

  type AwardMedalToUsersParams = {
    uids: number[];
    startTime?: number;
    endTime?: number;
    type: MedalType;
  };

  type AddPermissionByUidParams = {
    uids: number[];
  };

  type GetMedalUploadTokenParams = {
    fileName: string;
    size: number;
  };

  type GetUpdateLogListParams = {
    currentPage: number;
    event: number;
    group: number;
    operateUid: number;
    targetUid: number;
  };
}
