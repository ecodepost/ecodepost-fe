// @ts-ignore
/* eslint-disable */

import { AuditStatus } from '@/enums/auditstatus';

declare namespace UserAPI {
  type CurrentUser = {
    uid: number;
    nickname: string;
    avatar: string;
    name: string;
    cmtIdentifyStatus: AuditStatus;
  };

  type SendReferralsParams = {
    channel: 'email' | 'sms' | string;
    ref: string;
    receiver: string;
  };

  type JoinCommunityByRefParams = {
    ref: string;
  };

  type UpdateMyNicknameParams = {
    nickname: string;
  };

  type UpdateMyAvatarParams = {
    url: string;
  };

  type GetAvatarUploadTokenParams = {
    fileNaee: string;
    size: string;
  };
}
