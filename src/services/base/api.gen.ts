import { request } from 'umi';
import './types.gen';

export async function PostApiCallbacksWechat(options?: { [key: string]: any }) {
  return request<Res<any>>(`/api/callbacks/wechat`, {
    method: 'POST',

    ...(options || {}),
  });
}

export async function PostApiCallbacksOss(
  req: CommonOssCallbackReq,
  options?: { [key: string]: any },
) {
  return request<Res<any>>(`/api/callbacks/oss`, {
    method: 'POST',
    data: req,
    ...(options || {}),
  });
}
// GitHubWebhook 处理github事件
// https://github.com/apps/of-dev/installations/new?state=eyJ1aWQiOjEyNiwiY210R3VpZCI6Ikc3am9WWTU2a24ifQ
// https://github.com/apps/spacelink-pro/installations/new?state=eyJ1aWQiOjEyNiwiY210R3VpZCI6Ikc3am9WWTU2a24ifQ
export async function PostApiGithubWebhook(options?: { [key: string]: any }) {
  return request<Res<any>>(`/api/github/webhook`, {
    method: 'POST',

    ...(options || {}),
  });
}
// GitHubSetup 处理github application安装回调
// /api/github/setup?code=8deec5fd39277388d6a5&amp;installation_id=29459365&amp;setup_action=install&amp;state=eyJ1aWQiOjk5OX0
export async function GetApiGithubSetup(options?: { [key: string]: any }) {
  return request<Res<any>>(`/api/github/setup`, {
    method: 'GET',

    ...(options || {}),
  });
}
// OauthUserInfo 获取当前登录用户Handler
export async function GetApiOauthUser(options?: { [key: string]: any }) {
  return request<Res<MyOauthUserInfoRes>>(`/api/oauth/user`, {
    method: 'GET',

    ...(options || {}),
  });
}
// OauthUserInfo 获取当前登录用户Handler
export async function GetApiOauthAppUser(options?: { [key: string]: any }) {
  return request<Res<MyOauthUserInfoRes>>(`/api/oauth/appUser`, {
    method: 'GET',

    ...(options || {}),
  });
}
// Detail 社区的详细信息
export async function GetApiCmtDetail(options?: { [key: string]: any }) {
  return request<Res<DtoCmtDetail>>(`/api/cmt/detail`, {
    method: 'GET',

    ...(options || {}),
  });
}

export async function GetApiHomePage(options?: { [key: string]: any }) {
  return request<Res<HomePageRes>>(`/api/home/page`, {
    method: 'GET',

    ...(options || {}),
  });
}
// Files @Wangbofeng 更新首页列表数据 2022-10-30
export async function GetApiHomeFiles(req: HomeListReq, options?: { [key: string]: any }) {
  return request<Res<ResList<Commonv1FileShow[]>>>(`/api/home/files`, {
    method: 'GET',
    params: req,
    ...(options || {}),
  });
}

export async function GetApiCmtSpaceAll(options?: { [key: string]: any }) {
  return request<Res<SpaceListSpaceAndGroupRes>>(`/api/cmt/space-all`, {
    method: 'GET',

    ...(options || {}),
  });
}
// // LastVisited 最近观看的用户
// export async function GetApiCmtLastVisited(options?: { [key: string]: any }) {
//   return request<Res<Communityv1GetLastVisitMembersRes>>(`/api/cmt/lastVisited`, {
//     method: 'GET',
//
//     ...(options || {}),
//   });
// }

export async function GetApiCmtManagers(options?: { [key: string]: any }) {
  return request<Res<Pmsv1GetManagerMemberListRes>>(`/api/cmt/managers`, {
    method: 'GET',

    ...(options || {}),
  });
}
// Permission 空间的状态
// 1 INTERNAL 内部可见这个空间，并且能看到内容
//
//	isView  只要进入到社区，那么他就是看得见这个空间
//	isWrite 进入社区，虽然可以看到空间内容，但是他没办法写入，需要在页面上有这个提示，让他加入该空间，才能够写入 调用这个接口加入，/spaces/:guid/apply， internal空间调用后，就直接加入了
//	isMember 判断是否为成员
//
// 2 PRIVATE  内部可见这个空间，不能看到内容 （不存在这个类型了）
//
//	isView  进入到社区，但不在该空间，那么他看不见这个空间
//	isWrite 只有申请成功，加入到空间，才能写入 ，/spaces/:guid/apply， internal空间调用后，需要审核加入
//	isMember 判断是否为成员
//	auditStatus 如果不是空间成员，需要判断审核状态情况
//
// 3 Secret   不是成员，那么他看不见这个空间
//
//	isView  进入到社区，但不在该空间，那么他看不见这个空间
//	isWrite 只有申请成功，加入到空间，才能写入
//	isMember 判断是否为成员
export async function GetApiSpacesGuidPermission(guid: any, options?: { [key: string]: any }) {
  return request<Res<Spacev1GetSpacePermissionByUidRes>>(`/api/spaces/${guid}/permission`, {
    method: 'GET',

    ...(options || {}),
  });
}
// GroupPermission 权限
export async function GetApiSpacesGroupsGuidPermission(
  guid: any,
  options?: { [key: string]: any },
) {
  return request<Res<Spacev1GetSpacePermissionByUidRes>>(
    `/api/spaces/-/groups/${guid}/permission`,
    {
      method: 'GET',

      ...(options || {}),
    },
  );
}

export async function GetApiSpacesGuid(guid: any, options?: { [key: string]: any }) {
  return request<Res<Commonv1SpaceInfo>>(`/api/spaces/${guid}`, {
    method: 'GET',

    ...(options || {}),
  });
}

export async function GetApiSpacesGuidColumn(guid: any, options?: { [key: string]: any }) {
  return request<Res<SpaceColumnInfoResp>>(`/api/spaces/${guid}/column`, {
    method: 'GET',

    ...(options || {}),
  });
}
// ListPage 文件分页列表
export async function GetApiFiles(req: FileListReq, options?: { [key: string]: any }) {
  return request<Res<ResList<Commonv1FileShow[]>>>(`/api/files`, {
    method: 'GET',
    params: req,
    ...(options || {}),
  });
}
// GetInfo 获取文档内容
export async function GetApiFilesGuid(guid: any, options?: { [key: string]: any }) {
  return request<Res<DtoFileShow>>(`/api/files/${guid}`, {
    method: 'GET',

    ...(options || {}),
  });
}

export async function GetApiFilesGuidSubList(
  guid: any,
  req: FileSubListPageReq,
  options?: { [key: string]: any },
) {
  return request<Res<ResList<Commonv1FileShow[]>>>(`/api/files/${guid}/subList`, {
    method: 'GET',
    params: req,
    ...(options || {}),
  });
}
// Recommends 推荐列表 (0522 新增用户昵称，头像，摘要)
// @Tags Article
// @Success 200 {object} bffcore.Res{data=bffcore.ResPageData{list=[]filev1.ArticleShow}}
export async function GetApiFilesRecommends(
  req: FileRecommendsReq,
  options?: { [key: string]: any },
) {
  return request<Res<ResList<Commonv1FileShow[]>>>(`/api/files/-/recommends`, {
    method: 'GET',
    params: req,
    ...(options || {}),
  });
}
// SpaceTops 置顶列表 (0522 新增用户昵称，头像，摘要)
export async function GetApiFilesSpaceTops(
  req: FileSpaceTopsReq,
  options?: { [key: string]: any },
) {
  return request<Res<ResList<Commonv1FileShow[]>>>(`/api/files/-/spaceTops`, {
    method: 'GET',
    params: req,
    ...(options || {}),
  });
}
// Stat 根据用户uid，文件guids，获取对应的状态数据
export async function GetApiFilesStats(req: FileStatReq, options?: { [key: string]: any }) {
  return request<Res<FileStatRes>>(`/api/files/-/stats`, {
    method: 'GET',
    params: req,
    ...(options || {}),
  });
}

export async function GetApiFilesGuidComments(
  guid: any,
  req: FileTopicCommentListRequest,
  options?: { [key: string]: any },
) {
  return request<Res<ResList<Commentv1CommentDetail[]>>>(`/api/files/${guid}/comments`, {
    method: 'GET',
    params: req,
    ...(options || {}),
  });
}

export async function GetApiFilesCommentsCommentGuidChildComment(
  commentGuid: any,
  req: FileTopicChildCommentListRequest,
  options?: { [key: string]: any },
) {
  return request<Res<ResList<Commentv1CommentDetail[]>>>(
    `/api/files/-/comments/${commentGuid}/childComment`,
    {
      method: 'GET',
      params: req,
      ...(options || {}),
    },
  );
}
// ListPermission 权限
// @Tags Article
// @Success 200 {object} bffcore.Res{data=filev1.GetDocumentTreeRes}
export async function GetApiColumnsListPermission(
  req: ColumnListPermissionRequest,
  options?: { [key: string]: any },
) {
  return request<Res<Columnv1ListPermissionRes>>(`/api/columns/-/listPermission`, {
    method: 'GET',
    params: req,
    ...(options || {}),
  });
}

export async function GetApiColumnsFiles(
  req: ColumnListFilesReq,
  options?: { [key: string]: any },
) {
  return request<Res<Commonv1FileInfo[]>>(`/api/columns/-/files`, {
    method: 'GET',
    params: req,
    ...(options || {}),
  });
}

export async function GetApiSearch(req: SearchQueryReq, options?: { [key: string]: any }) {
  return request<Res<any>>(`/api/search`, {
    method: 'GET',
    params: req,
    ...(options || {}),
  });
}
// NotificationTotal 通知的统计信息
export async function GetApiNotificationsTotal(options?: { [key: string]: any }) {
  return request<Res<MyNotificationTotalRes>>(`/api/notifications/-/total`, {
    method: 'GET',

    ...(options || {}),
  });
}

export async function GetApiActivities(req: ActivityListReq, options?: { [key: string]: any }) {
  return request<Res<ResList<Activityv1ActivityInfo[]>>>(`/api/activities`, {
    method: 'GET',
    params: req,
    ...(options || {}),
  });
}

export async function GetApiActivitiesListByGuids(
  req: ActivityListByGuidsReq,
  options?: { [key: string]: any },
) {
  return request<Res<Activityv1ActivityInfo[]>>(`/api/activities/-/list-by-guids`, {
    method: 'GET',
    params: req,
    ...(options || {}),
  });
}

// UserTotal 用户统计数据
export async function GetApiUsersNameTotal(name: any, options?: { [key: string]: any }) {
  return request<Res<ProfileUserTotalRes>>(`/api/users/${name}/total`, {
    method: 'GET',

    ...(options || {}),
  });
}
// UserMedalList todo 这里有问题，用户的勋章，是公开社区，并且没办法传用户的社区guid
export async function GetApiUsersNameMedals(
  name: any,
  req: MedalUserMedalListRequest,
  options?: { [key: string]: any },
) {
  return request<Res<ResList<Medalv1MedalInfo[]>>>(`/api/users/${name}/medals`, {
    method: 'GET',
    params: req,
    ...(options || {}),
  });
}

export async function GetApiUsersNameArticles(
  name: any,
  req: ProfileArticlesListReq,
  options?: { [key: string]: any },
) {
  return request<Res<ResList<Articlev1ArticleShow[]>>>(`/api/users/${name}/articles`, {
    method: 'GET',
    params: req,
    ...(options || {}),
  });
}

export async function GetApiUsersNameQuestions(
  name: any,
  req: ProfileQAListReq,
  options?: { [key: string]: any },
) {
  return request<Res<ResList<Questionv1QAShow[]>>>(`/api/users/${name}/questions`, {
    method: 'GET',
    params: req,
    ...(options || {}),
  });
}
// NotificationList 查询通知列表
// @Tags Notification
// @Failure 200 {object} bffcore.Res{data=bffcore.ResPageData{list=[]notifyv1.ListUserNotificationItem}}
export async function GetApiNotifications(
  req: MyNotificationListReq,
  options?: { [key: string]: any },
) {
  return request<Res<ResList<any>>>(`/api/notifications`, {
    method: 'GET',
    params: req,
    ...(options || {}),
  });
}

// Permission 权限
export async function GetApiFilesGuidPermission(guid: any, options?: { [key: string]: any }) {
  return request<Res<DtoFilePermission>>(`/api/files/${guid}/permission`, {
    method: 'GET',

    ...(options || {}),
  });
}

export async function PostApiUploadToken(options?: { [key: string]: any }) {
  return request<Res<Uploadv1OssToken>>(`/api/upload/token`, {
    method: 'POST',

    ...(options || {}),
  });
}

export async function PutApiMyCommunitiesGuid(
  req: CommunityUpdateRequest,
  options?: { [key: string]: any },
) {
  return request<Res<Communityv1UpdateRes>>(`/api/my/communities`, {
    method: 'PUT',
    data: req,
    ...(options || {}),
  });
}

export async function PutApiMyCommunitiesGuidPrice(
  guid: any,
  req: CommunityUpdatePriceRequest,
  options?: { [key: string]: any },
) {
  return request<Res<Communityv1UpdatePriceInfoRes>>(`/api/my/communities/${guid}/price`, {
    method: 'PUT',
    data: req,
    ...(options || {}),
  });
}

export async function PutApiMyCommunitiesGuidBanner(
  guid: any,
  req: CommunityUpdateBannerRequest,
  options?: { [key: string]: any },
) {
  return request<Res<Communityv1PutHomeOptionRes>>(`/api/my/communities/${guid}/banner`, {
    method: 'PUT',
    data: req,
    ...(options || {}),
  });
}

export async function PostApiMyFollowingUid(uid: any, options?: { [key: string]: any }) {
  return request<Res<any>>(`/api/my/following/${uid}`, {
    method: 'POST',

    ...(options || {}),
  });
}

export async function DeleteApiMyFollowingUid(uid: any, options?: { [key: string]: any }) {
  return request<Res<any>>(`/api/my/following/${uid}`, {
    method: 'DELETE',

    ...(options || {}),
  });
}
// NotificationAuditPass 查询审核的通知列表
// @Tags Notification
export async function PutApiNotificationsAuditsAuditIdPass(
  auditId: any,
  req: MyNotificationAuditPassRequest,
  options?: { [key: string]: any },
) {
  return request<Res<any>>(`/api/notifications/-/audits/${auditId}/pass`, {
    method: 'PUT',
    data: req,
    ...(options || {}),
  });
}
// NotificationAuditReject 查询审核的通知列表
// @Tags Notification
export async function PutApiNotificationsAuditsAuditIdReject(
  auditId: any,
  req: MyNotificationAuditRejectRequest,
  options?: { [key: string]: any },
) {
  return request<Res<any>>(`/api/notifications/-/audits/${auditId}/reject`, {
    method: 'PUT',
    data: req,
    ...(options || {}),
  });
}
// NotificationUpdateAll 修改我收到的所有消息状态（如标记为已读或未读）
// @Tags Notification
// @Success 200 {object} bffcore.Res{code=int,msg=string,data=string}
// @Failure 400 {object} bffcore.Res{code=int,msg=string,data=string} &quot;&quot; bffcore.Res{code:1,msg:&quot;fail&quot;,data=&quot;fail&quot;}
export async function PutApiNotifications(
  req: MyNotificationUpdateAllReq,
  options?: { [key: string]: any },
) {
  return request<Res<any>>(`/api/notifications`, {
    method: 'PUT',
    data: req,
    ...(options || {}),
  });
}
// NotificationUpdate 修改我收到的某条消息状态（如标记为已读或未读）
// @Tags Notification
// @Success 200 {object} bffcore.Res{code=int,msg=string,data=string}
// @Failure 400 {object} bffcore.Res{code=int,msg=string,data=string} &quot;&quot; bffcore.Res{code:1,msg:&quot;fail&quot;,data=&quot;fail&quot;}
export async function PutApiNotificationsId(id: any, options?: { [key: string]: any }) {
  return request<Res<any>>(`/api/notifications/${id}`, {
    method: 'PUT',

    ...(options || {}),
  });
}

export async function GetApiMy(options?: { [key: string]: any }) {
  return request<Res<Userv1ProfileInfoRes>>(`/api/my`, {
    method: 'GET',

    ...(options || {}),
  });
}

export async function PutApiMyAttr(req: UserUpdateAttrReq, options?: { [key: string]: any }) {
  return request<Res<any>>(`/api/my/attr`, {
    method: 'PUT',
    data: req,
    ...(options || {}),
  });
}

export async function PutApiMyNickname(
  req: UserUpdateNicknameRequest,
  options?: { [key: string]: any },
) {
  return request<Res<any>>(`/api/my/nickname`, {
    method: 'PUT',
    data: req,
    ...(options || {}),
  });
}

// OrderInfo (1008) 查询订单详情
// @Tags Order
// @FE 刘慧平
export async function GetApiMyOrdersSn(sn: any, options?: { [key: string]: any }) {
  return request<Res<Orderv1OrderInfo>>(`/api/my/orders/${sn}`, {
    method: 'GET',

    ...(options || {}),
  });
}
// FollowersList 查找指定用户的followers列表
// 对每个follower还继续往下查新其自身的followersCnt和followingCnt
export async function GetApiUsersNameFollowers(
  name: any,
  req: ProfileFollowersListReq,
  options?: { [key: string]: any },
) {
  return request<Res<ResList<ProfileFollowerItem[]>>>(`/api/users/${name}/followers`, {
    method: 'GET',
    params: req,
    ...(options || {}),
  });
}
// FollowingList 查找指定用户的following列表
// 对每个following还继续往下查新其自身的followersCnt和followingCnt
export async function GetApiUsersNameFollowing(
  name: any,
  req: ProfileFollowingListReq,
  options?: { [key: string]: any },
) {
  return request<Res<ResList<ProfileFollowingItem[]>>>(`/api/users/${name}/following`, {
    method: 'GET',
    params: req,
    ...(options || {}),
  });
}
// Info 查询单个用户
export async function GetApiUsersName(name: any, options?: { [key: string]: any }) {
  return request<Res<Userv1InfoRes>>(`/api/users/${name}`, {
    method: 'GET',

    ...(options || {}),
  });
}
// ListLogos 社区推荐logo列表
export async function GetApiCmtRecommendLogos(options?: { [key: string]: any }) {
  return request<Res<DtoListRes>>(`/api/cmt/recommendLogos`, {
    method: 'GET',

    ...(options || {}),
  });
}
// ListCovers 社区推荐封面
export async function GetApiCmtRecommendCovers(options?: { [key: string]: any }) {
  return request<Res<DtoListRes>>(`/api/cmt/recommendCovers`, {
    method: 'GET',

    ...(options || {}),
  });
}

export async function GetApiCmt(options?: { [key: string]: any }) {
  return request<Res<any>>(`/api/cmt`, {
    method: 'GET',

    ...(options || {}),
  });
}

export async function GetApiCmtTemplates(options?: { [key: string]: any }) {
  return request<Res<Communityv1TemplateListRes>>(`/api/cmt/-/templates`, {
    method: 'GET',

    ...(options || {}),
  });
}
// BuyMember 购买会员
export async function PostApiCmtGuidBuyMember(
  req: CommunityBuyMemberRequest,
  options?: { [key: string]: any },
) {
  return request<Res<Chargev1ChargeInfo>>(`/api/buy-member`, {
    method: 'POST',
    data: req,
    ...(options || {}),
  });
}
// BuySpace 购买空间准入凭证
export async function PostApiCmtBuySpace(
  req: CommunityBuySpaceReq,
  options?: { [key: string]: any },
) {
  return request<Res<Chargev1ChargeInfo>>(`/api/cmt/buy-space`, {
    method: 'POST',
    data: req,
    ...(options || {}),
  });
}

export async function PostApiMyCollectionGroups(
  req: MyCollectionGroupCreateReq,
  options?: { [key: string]: any },
) {
  return request<Res<any>>(`/api/my/collection-groups`, {
    method: 'POST',
    data: req,
    ...(options || {}),
  });
}

export async function GetApiMyCollectionGroups(options?: { [key: string]: any }) {
  return request<Res<Statv1CollectionGroupListRes>>(`/api/my/collection-groups`, {
    method: 'GET',

    ...(options || {}),
  });
}
// CollectionGroupDelete 会移除收藏分组及关联收藏目标记录，前端需给提示
export async function DeleteApiMyCollectionGroupsCgid(cgid: any, options?: { [key: string]: any }) {
  return request<Res<any>>(`/api/my/collection-groups/${cgid}`, {
    method: 'DELETE',

    ...(options || {}),
  });
}

export async function PutApiMyCollectionGroupsCgid(
  cgid: any,
  req: MyCollectionGroupUpdateReq,
  options?: { [key: string]: any },
) {
  return request<Res<any>>(`/api/my/collection-groups/${cgid}`, {
    method: 'PUT',
    data: req,
    ...(options || {}),
  });
}

export async function GetApiMyCollectionGroupsCgidCollections(
  cgid: any,
  req: MyCollectionListReq,
  options?: { [key: string]: any },
) {
  return request<Res<ResList<MyCollectionInfo[]>>>(
    `/api/my/collection-groups/${cgid}/collections`,
    {
      method: 'GET',
      params: req,
      ...(options || {}),
    },
  );
}

export async function PostApiMyCollectionGroupsCollections(
  req: MyCollectionCreateReq,
  options?: { [key: string]: any },
) {
  return request<Res<any>>(`/api/my/collection-groups/-/collections`, {
    method: 'POST',
    data: req,
    ...(options || {}),
  });
}

export async function DeleteApiMyCollectionGroupsCollections(
  req: MyCollectionDeleteReq,
  options?: { [key: string]: any },
) {
  return request<Res<any>>(`/api/my/collection-groups/-/collections`, {
    method: 'DELETE',
    data: req,
    ...(options || {}),
  });
}
// ApplyMember 申请成为成员
export async function PostApiSpacesGuidApply(
  guid: any,
  req: SpaceApplyMemberRequest,
  options?: { [key: string]: any },
) {
  return request<Res<Spacev1AuditApplySpaceMemberRes>>(`/api/spaces/${guid}/apply`, {
    method: 'POST',
    data: req,
    ...(options || {}),
  });
}

export async function PostApiSpacesGuidQuit(
  guid: any,
  req: SpaceQuitMemberReq,
  options?: { [key: string]: any },
) {
  return request<Res<any>>(`/api/spaces/${guid}/quit`, {
    method: 'POST',
    data: req,
    ...(options || {}),
  });
}
// ApplyGroupMember 申请成为成员
export async function PostApiSpacesGroupsGuidApply(
  guid: any,
  req: SpaceApplyGroupMemberRequest,
  options?: { [key: string]: any },
) {
  return request<Res<any>>(`/api/spaces/-/groups/${guid}/apply`, {
    method: 'POST',
    data: req,
    ...(options || {}),
  });
}

export async function GetApiSpacesMemberStatus(
  req: SpaceCheckMembershipReq,
  options?: { [key: string]: any },
) {
  return request<Res<Spacev1MemberStatus[]>>(`/api/spaces/-/member-status`, {
    method: 'GET',
    params: req,
    ...(options || {}),
  });
}
// PermissionList 权限
export async function GetApiFilesPermissions(
  req: FilePermissionListReq,
  options?: { [key: string]: any },
) {
  return request<Res<Filev1PermissionListRes>>(`/api/files/-/permissions`, {
    method: 'GET',
    params: req,
    ...(options || {}),
  });
}

export async function GetApiFilesUrls(req: FileBatchGetUrlsReq, options?: { [key: string]: any }) {
  return request<Res<any>>(`/api/files/-/urls`, {
    method: 'GET',
    params: req,
    ...(options || {}),
  });
}

export async function GetApiMyCoursesCguid(cguid: any, options?: { [key: string]: any }) {
  return request<Res<Coursev1CourseInfo>>(`/api/my/courses/${cguid}`, {
    method: 'GET',

    ...(options || {}),
  });
}

export async function PostApiUploadPath(req: UploadPathReq, options?: { [key: string]: any }) {
  return request<Res<Uploadv1GetTokenRes>>(`/api/upload/path`, {
    method: 'POST',
    data: req,
    ...(options || {}),
  });
}

export async function UploadLocalFile(req: UploadLocalFileReq, options?: { [key: string]: any }) {
  return request<Res<any>>(`/api/files/-/upload/local`, {
    method: 'POST',
    data: req,
    ...(options || {}),
  });
}

export async function GetApiMyReferrals(req: MyReferralsReq, options?: { [key: string]: any }) {
  return request<Res<any>>(`/api/my/referrals`, {
    method: 'GET',
    params: req,
    ...(options || {}),
  });
}

export async function PostApiMyReferralsSend(
  req: MyReferralsSendReq,
  options?: { [key: string]: any },
) {
  return request<Res<any>>(`/api/my/referrals/send`, {
    method: 'POST',
    data: req,
    ...(options || {}),
  });
}

export async function PostApiMyReferralsReset(
  req: MyReferralsResetReq,
  options?: { [key: string]: any },
) {
  return request<Res<any>>(`/api/my/referrals/reset`, {
    method: 'POST',
    data: req,
    ...(options || {}),
  });
}
// MemberList @LHP @2022-10-26
export async function GetApiMyCmtMembers(
  req: CommunityMemberListReq,
  options?: { [key: string]: any },
) {
  return request<Res<ResList<Communityv1MemberAdminShowInfo[]>>>(`/api/cmtAdmin/user/memberList`, {
    method: 'GET',
    params: req,
    ...(options || {}),
  });
}
// IncreaseEmoji 传入一个emoji id，点赞
// @Tags Emoji
// @Success 200 {object} bffcore.Res{}
export async function PutApiFilesGuidIncreaseEmoji(
  guid: any,
  req: FileIncreaseEmojiRequest,
  options?: { [key: string]: any },
) {
  return request<Res<any>>(`/api/files/${guid}/increaseEmoji`, {
    method: 'PUT',
    data: req,
    ...(options || {}),
  });
}
// DecreaseEmoji 传入一个emoji id，去掉点赞
// @Tags Emoji
// @Success 200 {object} bffcore.Res{}
export async function PutApiFilesGuidDecreaseEmoji(
  guid: any,
  req: FileDecreaseEmojiRequest,
  options?: { [key: string]: any },
) {
  return request<Res<any>>(`/api/files/${guid}/decreaseEmoji`, {
    method: 'PUT',
    data: req,
    ...(options || {}),
  });
}
// CreateComment 创建评论
export async function PostApiFilesComments(
  req: FileCreateCommentReq,
  options?: { [key: string]: any },
) {
  return request<Res<any>>(`/api/files/-/comments`, {
    method: 'POST',
    data: req,
    ...(options || {}),
  });
}
// DeleteComment 删除评论
export async function DeleteApiFilesCommentsCommentGuid(
  commentGuid: any,
  options?: { [key: string]: any },
) {
  return request<Res<any>>(`/api/files/-/comments/${commentGuid}`, {
    method: 'DELETE',

    ...(options || {}),
  });
}

export async function PutApiCmtSpaceTreesChangeSort(
  req: SpaceTreeChangeSortRequest,
  options?: { [key: string]: any },
) {
  return request<Res<any>>(`/api/cmt/space-trees/change-sort`, {
    method: 'PUT',
    data: req,
    ...(options || {}),
  });
}

export async function PutApiCmtSpaceTreesChangeGroup(
  req: SpaceTreeChangeGroupRequest,
  options?: { [key: string]: any },
) {
  return request<Res<Spacev1UpdateSpaceRes>>(`/api/cmt/space-trees/change-group`, {
    method: 'PUT',
    data: req,
    ...(options || {}),
  });
}
// SearchMember 搜索社区成员
// @LHP @2022-10-26
export async function GetApiCmtSearchMembers(
  req: CommunitySearchMemberReq,
  options?: { [key: string]: any },
) {
  return request<Res<ResList<Userv1UserInfo[]>>>(`/api/cmt/-/searchMembers`, {
    method: 'GET',
    params: req,
    ...(options || {}),
  });
}

export async function PostApiCmtUpgradeEdition(
  req: EditionUpgradeReq,
  options?: { [key: string]: any },
) {
  return request<Res<Chargev1ChargeInfo>>(`/api/cmt/-/upgrade-edition`, {
    method: 'POST',
    data: req,
    ...(options || {}),
  });
}

export async function PostApiSpacesGroups(
  req: SpaceCreateOrUpdateGroupRequest,
  options?: { [key: string]: any },
) {
  return request<Res<Spacev1CreateSpaceGroupRes>>(`/api/spaces/-/groups`, {
    method: 'POST',
    data: req,
    ...(options || {}),
  });
}

export async function GetApiSpacesGroupsGuid(guid: any, options?: { [key: string]: any }) {
  return request<Res<Spacev1SpaceGroupInfoRes>>(`/api/spaces/-/groups/${guid}`, {
    method: 'GET',

    ...(options || {}),
  });
}

export async function PutApiSpacesGroupsGuid(
  guid: any,
  req: SpaceCreateOrUpdateGroupRequest,
  options?: { [key: string]: any },
) {
  return request<Res<Spacev1UpdateSpaceGroupRes>>(`/api/spaces/-/groups/${guid}`, {
    method: 'PUT',
    data: req,
    ...(options || {}),
  });
}

export async function DeleteApiSpacesGroupsGuid(guid: any, options?: { [key: string]: any }) {
  return request<Res<Spacev1DeleteSpaceGroupRes>>(`/api/spaces/-/groups/${guid}`, {
    method: 'DELETE',

    ...(options || {}),
  });
}

export async function GetApiSpacesGroupsGuidMembers(
  guid: any,
  req: SpaceGroupMemberListRequest,
  options?: { [key: string]: any },
) {
  return request<Res<ResList<Commonv1MemberRole[]>>>(`/api/spaces/-/groups/${guid}/members`, {
    method: 'GET',
    params: req,
    ...(options || {}),
  });
}

export async function GetApiSpacesGroupsGuidSearchMembers(
  guid: any,
  req: SpaceSearchMemberRequest,
  options?: { [key: string]: any },
) {
  return request<Res<ResList<Commonv1MemberRole[]>>>(`/api/spaces/-/groups/${guid}/searchMembers`, {
    method: 'GET',
    params: req,
    ...(options || {}),
  });
}

export async function PostApiSpacesGroupsGuidMembers(
  guid: any,
  req: SpaceCreateMemberRequest,
  options?: { [key: string]: any },
) {
  return request<Res<Spacev1AddSpaceGroupMemberRes>>(`/api/spaces/-/groups/${guid}/members`, {
    method: 'POST',
    data: req,
    ...(options || {}),
  });
}

export async function DeleteApiSpacesGroupsGuidMembers(
  guid: any,
  req: SpaceDeleteMemberRequest,
  options?: { [key: string]: any },
) {
  return request<Res<Spacev1DeleteSpaceGroupMemberRes>>(`/api/spaces/-/groups/${guid}/members`, {
    method: 'DELETE',
    data: req,
    ...(options || {}),
  });
}

export async function PostApiSpaces(req: SpaceCreateRequest, options?: { [key: string]: any }) {
  return request<Res<Spacev1CreateSpaceRes>>(`/api/spaces`, {
    method: 'POST',
    data: req,
    ...(options || {}),
  });
}

export async function PutApiSpacesGuid(
  guid: any,
  req: SpaceUpdateRequest,
  options?: { [key: string]: any },
) {
  return request<Res<Spacev1UpdateSpaceRes>>(`/api/spaces/${guid}`, {
    method: 'PUT',
    data: req,
    ...(options || {}),
  });
}

export async function DeleteApiSpacesGuid(guid: any, options?: { [key: string]: any }) {
  return request<Res<Spacev1DeleteSpaceRes>>(`/api/spaces/${guid}`, {
    method: 'DELETE',

    ...(options || {}),
  });
}
// MemberList @LHP @2022-10-26
export async function GetApiSpacesGuidMembers(
  guid: any,
  req: SpaceGroupMemberListRequest,
  options?: { [key: string]: any },
) {
  return request<Res<ResList<Commonv1MemberRole[]>>>(`/api/spaces/${guid}/members`, {
    method: 'GET',
    params: req,
    ...(options || {}),
  });
}

export async function GetApiSpacesGuidSearchMembers(
  guid: any,
  req: SpaceSearchMemberRequest,
  options?: { [key: string]: any },
) {
  return request<Res<ResList<Commonv1MemberRole[]>>>(`/api/spaces/${guid}/searchMembers`, {
    method: 'GET',
    params: req,
    ...(options || {}),
  });
}
// CreateMember 创建空间成员
// @LHP @2022-10-26
export async function PostApiSpacesGuidMembers(
  guid: any,
  req: SpaceCreateMemberRequest,
  options?: { [key: string]: any },
) {
  return request<Res<Spacev1AddSpaceMemberRes>>(`/api/spaces/${guid}/members`, {
    method: 'POST',
    data: req,
    ...(options || {}),
  });
}
// DeleteMember 删除空间成员
// @LHP @2022-10-26
export async function DeleteApiSpacesGuidMembers(
  guid: any,
  req: SpaceDeleteMemberRequest,
  options?: { [key: string]: any },
) {
  return request<Res<Spacev1DeleteSpaceMemberRes>>(`/api/spaces/${guid}/members`, {
    method: 'DELETE',
    data: req,
    ...(options || {}),
  });
}

export async function GetApiSpacesGuidEmojis(guid: any, options?: { [key: string]: any }) {
  return request<Res<Filev1EmojiListRes>>(`/api/spaces/${guid}/emojis`, {
    method: 'GET',

    ...(options || {}),
  });
}

export async function GetApiArticlesRecommendCovers(options?: { [key: string]: any }) {
  return request<Res<ArticleListCoversRes>>(`/api/articles/-/recommendCovers`, {
    method: 'GET',

    ...(options || {}),
  });
}
// CreateArticle 创建文档
// @Tags Article
export async function PostApiArticles(
  req: ArticleCreateArticleRequest,
  options?: { [key: string]: any },
) {
  return request<Res<Commonv1FileInfo>>(`/api/articles`, {
    method: 'POST',
    data: req,
    ...(options || {}),
  });
}
// UpdateArticle 更新或发布文档
// @Tags Article
// @Success 200 {object} bffcore.Res{}
export async function PutApiArticlesGuid(
  guid: any,
  req: ArticleUpdateArticleRequest,
  options?: { [key: string]: any },
) {
  return request<Res<any>>(`/api/articles/${guid}`, {
    method: 'PUT',
    data: req,
    ...(options || {}),
  });
}

export async function DeleteApiArticlesGuid(guid: any, options?: { [key: string]: any }) {
  return request<Res<any>>(`/api/articles/${guid}`, {
    method: 'DELETE',

    ...(options || {}),
  });
}

export async function PutApiArticlesGuidSpaceTop(guid: any, options?: { [key: string]: any }) {
  return request<Res<any>>(`/api/articles/${guid}/spaceTop`, {
    method: 'PUT',

    ...(options || {}),
  });
}

export async function PutApiArticlesGuidCancelSpaceTop(
  guid: any,
  options?: { [key: string]: any },
) {
  return request<Res<any>>(`/api/articles/${guid}/cancelSpaceTop`, {
    method: 'PUT',

    ...(options || {}),
  });
}

export async function PutApiArticlesGuidRecommend(guid: any, options?: { [key: string]: any }) {
  return request<Res<any>>(`/api/articles/${guid}/recommend`, {
    method: 'PUT',

    ...(options || {}),
  });
}

export async function PutApiArticlesGuidCancelRecommend(
  guid: any,
  options?: { [key: string]: any },
) {
  return request<Res<any>>(`/api/articles/${guid}/cancelRecommend`, {
    method: 'PUT',

    ...(options || {}),
  });
}

export async function PutApiArticlesGuidOpenComment(guid: any, options?: { [key: string]: any }) {
  return request<Res<any>>(`/api/articles/${guid}/openComment`, {
    method: 'PUT',

    ...(options || {}),
  });
}

export async function PutApiArticlesGuidCloseComment(guid: any, options?: { [key: string]: any }) {
  return request<Res<any>>(`/api/articles/${guid}/closeComment`, {
    method: 'PUT',

    ...(options || {}),
  });
}

export async function PostApiQuestions(
  req: QuestionCreateRequest,
  options?: { [key: string]: any },
) {
  return request<Res<Commonv1FileInfo>>(`/api/questions`, {
    method: 'POST',
    data: req,
    ...(options || {}),
  });
}

export async function GetApiQuestionsGuid(guid: any, options?: { [key: string]: any }) {
  return request<Res<Questionv1MyInfoRes>>(`/api/questions/${guid}`, {
    method: 'GET',

    ...(options || {}),
  });
}

export async function PutApiQuestionsGuid(
  guid: any,
  req: QuestionUpdateArticleRequest,
  options?: { [key: string]: any },
) {
  return request<Res<any>>(`/api/questions/${guid}`, {
    method: 'PUT',
    data: req,
    ...(options || {}),
  });
}

export async function DeleteApiQuestionsGuid(guid: any, options?: { [key: string]: any }) {
  return request<Res<any>>(`/api/questions/${guid}`, {
    method: 'DELETE',

    ...(options || {}),
  });
}

export async function PostApiQuestionsGuidAnswers(
  guid: any,
  req: QuestionCreateRequest,
  options?: { [key: string]: any },
) {
  return request<Res<Commonv1FileInfo>>(`/api/questions/${guid}/answers`, {
    method: 'POST',
    data: req,
    ...(options || {}),
  });
}

export async function PutApiQuestionsAnswersAnswerGuid(
  answerGuid: any,
  req: QuestionUpdateArticleRequest,
  options?: { [key: string]: any },
) {
  return request<Res<any>>(`/api/questions/-/answers/${answerGuid}`, {
    method: 'PUT',
    data: req,
    ...(options || {}),
  });
}

export async function DeleteApiQuestionsAnswersAnswerGuid(
  answerGuid: any,
  options?: { [key: string]: any },
) {
  return request<Res<any>>(`/api/questions/-/answers/${answerGuid}`, {
    method: 'DELETE',

    ...(options || {}),
  });
}

export async function PostApiQuestionsGuidLike(guid: any, options?: { [key: string]: any }) {
  return request<Res<any>>(`/api/questions/${guid}/like`, {
    method: 'POST',

    ...(options || {}),
  });
}

export async function DeleteApiQuestionsGuidLike(guid: any, options?: { [key: string]: any }) {
  return request<Res<any>>(`/api/questions/${guid}/like`, {
    method: 'DELETE',

    ...(options || {}),
  });
}

export async function PostApiQuestionsAnswersAnswerGuidLike(
  answerGuid: any,
  options?: { [key: string]: any },
) {
  return request<Res<any>>(`/api/questions/-/answers/${answerGuid}/like`, {
    method: 'POST',

    ...(options || {}),
  });
}

export async function DeleteApiQuestionsAnswersAnswerGuidLike(
  answerGuid: any,
  options?: { [key: string]: any },
) {
  return request<Res<any>>(`/api/questions/-/answers/${answerGuid}/like`, {
    method: 'DELETE',

    ...(options || {}),
  });
}

export async function PostApiQuestionsAnswersAnswerGuidCommentsCommentGuidLike(
  answerGuid: any,
  commentGuid: any,
  options?: { [key: string]: any },
) {
  return request<Res<any>>(`/api/questions/-/answers/${answerGuid}/comments/${commentGuid}/like`, {
    method: 'POST',

    ...(options || {}),
  });
}

export async function DeleteApiQuestionsAnswersAnswerGuidCommentsCommentGuidLike(
  answerGuid: any,
  commentGuid: any,
  options?: { [key: string]: any },
) {
  return request<Res<any>>(`/api/questions/-/answers/${answerGuid}/comments/${commentGuid}/like`, {
    method: 'DELETE',

    ...(options || {}),
  });
}
// Create 创建活动
// @Tags Activity
export async function PostApiActivities(req: ActivityCreateReq, options?: { [key: string]: any }) {
  return request<Res<ActivityCreateRes>>(`/api/activities`, {
    method: 'POST',
    data: req,
    ...(options || {}),
  });
}

export async function GetApiActivitiesRecommendCovers(options?: { [key: string]: any }) {
  return request<Res<ActivityListCoversRes>>(`/api/activities/-/recommendCovers`, {
    method: 'GET',

    ...(options || {}),
  });
}
// Update 更新活动
// @Tags Activity
// @Success 200 {object} bffcore.Res{code=int,msg=string,data=string}
// @Failure 400 {object} bffcore.Res{code=int,msg=string,data=string} &quot;&quot; bffcore.Res{code:1,msg:&quot;fail&quot;,data=&quot;fail&quot;}
export async function PutApiActivitiesGuid(
  guid: any,
  req: ActivityUpdateReq,
  options?: { [key: string]: any },
) {
  return request<Res<any>>(`/api/activities/${guid}`, {
    method: 'PUT',
    data: req,
    ...(options || {}),
  });
}
// Delete 删除活动
// @Tags Activity
// @Success 200 {object} bffcore.Res{code=int,msg=string,data=string}
// @Failure 400 {object} bffcore.Res{code=int,msg=string,data=string} &quot;&quot; bffcore.Res{code:1,msg:&quot;fail&quot;,data=&quot;fail&quot;}
export async function DeleteApiActivitiesGuid(guid: any, options?: { [key: string]: any }) {
  return request<Res<any>>(`/api/activities/${guid}`, {
    method: 'DELETE',

    ...(options || {}),
  });
}
// ListJoinedUsers 查看参与单个活动人员列表
// @Tags Activity
// @Success 200 {object} bffcore.Res{code=int,msg=string,data=string}
// @Failure 400 {object} bffcore.Res{data=bffcore.ResPageData{list=[]commonv1.UserInfo}}
export async function GetApiActivitiesGuidUsers(
  guid: any,
  req: ActivityListJoinedUsersReq,
  options?: { [key: string]: any },
) {
  return request<Res<ResList<Commonv1UserInfo[]>>>(`/api/activities/${guid}/users`, {
    method: 'GET',
    params: req,
    ...(options || {}),
  });
}
// Join 参与活动
// @Tags Activity
// @Success 200 {object} bffcore.Res{code=int,msg=string,data=string}
// @Failure 400 {object} bffcore.Res{code=int,msg=string,data=string} &quot;&quot; bffcore.Res{code:1,msg:&quot;fail&quot;,data=&quot;fail&quot;}
export async function PostApiJoinedActivitiesGuid(
  guid: any,
  req: ActivityJoinReq,
  options?: { [key: string]: any },
) {
  return request<Res<any>>(`/api/joined-activities/${guid}`, {
    method: 'POST',
    data: req,
    ...(options || {}),
  });
}
// Quit 取消参与活动
// @Tags Activity
// @Success 200 {object} bffcore.Res{code=int,msg=string,data=string}
// @Failure 400 {object} bffcore.Res{code=int,msg=string,data=string} &quot;&quot; bffcore.Res{code:1,msg:&quot;fail&quot;,data=&quot;fail&quot;}
export async function DeleteApiJoinedActivitiesGuid(
  guid: any,
  req: ActivityQuitReq,
  options?: { [key: string]: any },
) {
  return request<Res<any>>(`/api/joined-activities/${guid}`, {
    method: 'DELETE',
    data: req,
    ...(options || {}),
  });
}

export async function PostApiMedals(req: MedalCreateRequest, options?: { [key: string]: any }) {
  return request<Res<any>>(`/api/medals`, {
    method: 'POST',
    data: req,
    ...(options || {}),
  });
}

export async function PutApiMedalsMedalId(
  medalId: any,
  req: MedalUpdateRequest,
  options?: { [key: string]: any },
) {
  return request<Res<any>>(`/api/medals/${medalId}`, {
    method: 'PUT',
    data: req,
    ...(options || {}),
  });
}

export async function DeleteApiMedalsMedalId(medalId: any, options?: { [key: string]: any }) {
  return request<Res<any>>(`/api/medals/${medalId}`, {
    method: 'DELETE',

    ...(options || {}),
  });
}

export async function GetApiMedals(req: MedalMedalListRequest, options?: { [key: string]: any }) {
  return request<Res<ResList<Medalv1MedalInfo[]>>>(`/api/medals`, {
    method: 'GET',
    params: req,
    ...(options || {}),
  });
}

export async function PostApiMedalsMedalIdMembers(
  medalId: any,
  req: MedalAwardRequest,
  options?: { [key: string]: any },
) {
  return request<Res<any>>(`/api/medals/${medalId}/members`, {
    method: 'POST',
    data: req,
    ...(options || {}),
  });
}

export async function GetApiMedalsMedalIdMembers(
  medalId: any,
  req: MedalMemberListRequest,
  options?: { [key: string]: any },
) {
  return request<Res<ResList<Medalv1Member[]>>>(`/api/medals/${medalId}/members`, {
    method: 'GET',
    params: req,
    ...(options || {}),
  });
}

export async function DeleteApiMedalsUsersMedalMemberId(
  medalMemberId: any,
  options?: { [key: string]: any },
) {
  return request<Res<any>>(`/api/medals/-/users/${medalMemberId}`, {
    method: 'DELETE',

    ...(options || {}),
  });
}

export async function PutApiMedalsUsersMedalMemberId(
  medalMemberId: any,
  req: MedalUpdateMemberRequest,
  options?: { [key: string]: any },
) {
  return request<Res<any>>(`/api/medals/-/users/${medalMemberId}`, {
    method: 'PUT',
    data: req,
    ...(options || {}),
  });
}
// GoodCreate (0707) 创建商品
// @Tags Good
// @Success 200 {object} bffcore.Res{code=int,msg=string,data={}}
// @Failure 200 {object} bffcore.Res{code=int,msg=string,data=string} &quot;&quot; bffcore.Res{code:1,msg:&quot;fail&quot;,data=&quot;fail&quot;}
export async function PostApiGoods(req: ShopGoodCreateReq, options?: { [key: string]: any }) {
  return request<Res<any>>(`/api/goods`, {
    method: 'POST',
    data: req,
    ...(options || {}),
  });
}
// GoodList (0707) 查询商品列表
// @Tags Good
// @Success 200 {object} bffcore.Res{code=int,msg=string,data={}}
// @Failure 200 {object} bffcore.Res{code=int,msg=string,data=string} &quot;&quot; bffcore.Res{code:1,msg:&quot;fail&quot;,data=&quot;fail&quot;}
export async function GetApiGoods(req: ShopGoodListReq, options?: { [key: string]: any }) {
  return request<Res<ResList<Goodv1GoodInfo[]>>>(`/api/goods`, {
    method: 'GET',
    params: req,
    ...(options || {}),
  });
}

export async function GetApiGoodsId(id: any, options?: { [key: string]: any }) {
  return request<Res<Goodv1GoodInfo>>(`/api/goods/${id}`, {
    method: 'GET',

    ...(options || {}),
  });
}

export async function DeleteApiGoodsId(id: any, options?: { [key: string]: any }) {
  return request<Res<any>>(`/api/goods/${id}`, {
    method: 'DELETE',

    ...(options || {}),
  });
}

export async function PutApiGoodsId(
  id: any,
  req: ShopGoodUpdateReq,
  options?: { [key: string]: any },
) {
  return request<Res<any>>(`/api/goods/${id}`, {
    method: 'PUT',
    data: req,
    ...(options || {}),
  });
}
// ChargeCreate (0707) 创建支付订单
// @Tags Charge
// @Success 200 {object} bffcore.Res{data=chargev1.Charge}
// @Failure 200 {object} bffcore.Res{code=int,msg=string,data=string} &quot;&quot; bffcore.Res{code:1,msg:&quot;fail&quot;,data=&quot;fail&quot;}
export async function PostApiMyCharges(req: ShopChargeCreateReq, options?: { [key: string]: any }) {
  return request<Res<Chargev1ChargeInfo>>(`/api/my/charges`, {
    method: 'POST',
    data: req,
    ...(options || {}),
  });
}
// ChargeDelete (0707) 删除支付订单
// @Tags Charge
// @Success 200 {object} bffcore.Res{code=int,msg=string,data=string}
// @Failure 200 {object} bffcore.Res{code=int,msg=string,data=string} &quot;&quot; bffcore.Res{code:1,msg:&quot;fail&quot;,data=&quot;fail&quot;}
export async function DeleteApiMyChargesSn(sn: any, options?: { [key: string]: any }) {
  return request<Res<any>>(`/api/my/charges/${sn}`, {
    method: 'DELETE',

    ...(options || {}),
  });
}
// ChargeInfo (0707) 查询支付订单
// @Tags Charge
// @Success 200 {object} bffcore.Res{data=chargev1.Charge}
// @Failure 200 {object} bffcore.Res{code=int,msg=string,data=string} &quot;&quot; bffcore.Res{code:1,msg:&quot;fail&quot;,data=&quot;fail&quot;}
export async function GetApiMyChargesSn(sn: any, options?: { [key: string]: any }) {
  return request<Res<Chargev1ChargeInfo>>(`/api/my/charges/${sn}`, {
    method: 'GET',

    ...(options || {}),
  });
}
// RefundCreate (0707) 创建退款订单
// @Tags Charge
// @Success 200 {object} bffcore.Res{data=chargev1.CreateRefundRes}
// @Failure 200 {object} bffcore.Res{code=int,msg=string,data=string} &quot;&quot; bffcore.Res{code:1,msg:&quot;fail&quot;,data=&quot;fail&quot;}
export async function PostApiMyRefunds(req: ShopRefundCreateReq, options?: { [key: string]: any }) {
  return request<Res<Chargev1CreateRefundRes>>(`/api/my/refunds`, {
    method: 'POST',
    data: req,
    ...(options || {}),
  });
}
// RefundInfo (0707) 查询退款订单
// @Tags Charge
// @Success 200 {object} bffcore.Res{data=chargev1.InfoRefundRes}
// @Failure 200 {object} bffcore.Res{code=int,msg=string,data=string} &quot;&quot; bffcore.Res{code:1,msg:&quot;fail&quot;,data=&quot;fail&quot;}
export async function GetApiMyRefundsSn(
  sn: any,
  req: ShopRefundInfoReq,
  options?: { [key: string]: any },
) {
  return request<Res<Chargev1InfoRefundRes>>(`/api/my/refunds/${sn}`, {
    method: 'GET',
    params: req,
    ...(options || {}),
  });
}

export async function GetApiMyCmtUser(options?: { [key: string]: any }) {
  return request<Res<Communityv1UserInfoRes>>(`/api/my/cmt/user`, {
    method: 'GET',

    ...(options || {}),
  });
}
// UpdateUserInfo 修改该社区的用户信息
export async function PutApiMyCmtUser(
  req: CommunityUpdateUserInfoRequest,
  options?: { [key: string]: any },
) {
  return request<Res<Communityv1UpdateUserInfoRes>>(`/api/my/cmt/user`, {
    method: 'PUT',
    data: req,
    ...(options || {}),
  });
}
// List 查看版本列表
export async function GetApiEditions(options?: { [key: string]: any }) {
  return request<Res<Editionv1ListRes>>(`/api/editions`, {
    method: 'GET',

    ...(options || {}),
  });
}

export async function PostApiDriveNodes(req: DriveCreateNodeReq, options?: { [key: string]: any }) {
  return request<Res<DriveCreateNodeRes>>(`/api/drive/nodes`, {
    method: 'POST',
    data: req,
    ...(options || {}),
  });
}

export async function GetApiDriveNodes(req: DriveListNodeReq, options?: { [key: string]: any }) {
  return request<Res<ResList<any>>>(`/api/drive/nodes`, {
    method: 'GET',
    params: req,
    ...(options || {}),
  });
}

export async function DeleteApiDriveNodesNguid(
  nguid: any,
  req: DriveDeleteNodeReq,
  options?: { [key: string]: any },
) {
  return request<Res<any>>(`/api/drive/nodes/${nguid}`, {
    method: 'DELETE',
    data: req,
    ...(options || {}),
  });
}
// UpdateNode 仅只用来更改Folder或者File的相对路径、或属性。不能用来修改File内容，
// 如果需要修改File内容，则需要删除File后重新上传。
export async function PutApiDriveNodesNguid(
  nguid: any,
  req: DriveUpdateNodeReq,
  options?: { [key: string]: any },
) {
  return request<Res<any>>(`/api/drive/nodes/${nguid}`, {
    method: 'PUT',
    data: req,
    ...(options || {}),
  });
}

export async function GetApiDriveAllDescendantNodes(
  req: DriveListDescendantNodeReq,
  options?: { [key: string]: any },
) {
  return request<Res<String[]>>(`/api/drive/all-descendant-nodes`, {
    method: 'GET',
    params: req,
    ...(options || {}),
  });
}
// ManagerMemberList 查看管理员的成员列表
// @Tags Pms
// @Param managerType  Path  string  true  &quot;字符串类型，superAdmin为超级管理员，admin为管理员&quot; Enums(superAdmin,admin)
// @Success 200 {object} bffcore.Res{code=int,msg=string,data=ManagerMemberListResp}
// @Failure 400 {object} bffcore.Res{code=int,msg=string,data=string} &quot;&quot; bffcore.Res{code:1,msg:&quot;fail&quot;,data=&quot;fail&quot;}
export async function GetApiCmtAdminPmsManagersMembers(options?: { [key: string]: any }) {
  return request<Res<PmsManagerMemberListResp>>(`/api/cmtAdmin/pms/managers/members`, {
    method: 'GET',

    ...(options || {}),
  });
}
// CreateManagerMember (0612) 添加权限成员
// @Tags Pms
// @Param managerType  Path  string  true  &quot;字符串类型，superAdmin为超级管理员，admin为管理员&quot; Enums(superAdmin,admin)
// @Success 200 {object} bffcore.Res{code=int,msg=string,data=pmsv1.CreateManagerMemberRes}
// @Failure 400 {object} bffcore.Res{code=int,msg=string,data=string} &quot;&quot; bffcore.Res{code:1,msg:&quot;fail&quot;,data=&quot;fail&quot;}
export async function PostApiCmtAdminPmsManagersMembers(
  req: PmsCreateManagerMemberReq,
  options?: { [key: string]: any },
) {
  return request<Res<Pmsv1CreateManagerMemberRes>>(`/api/cmtAdmin/pms/managers/members`, {
    method: 'POST',
    data: req,
    ...(options || {}),
  });
}
// DeleteManagerMember (0612) 删除权限成员
// @Tags Pms
// @Param managerType  Path  string  true  &quot;字符串类型，superAdmin为超级管理员，admin为管理员&quot; Enums(superAdmin,admin)
// @Success 200 {object} bffcore.Res{code=int,msg=string,data=pmsv1.DeleteManagerMemberRes}
// @Failure 400 {object} bffcore.Res{code=int,msg=string,data=string} &quot;&quot; bffcore.Res{code:1,msg:&quot;fail&quot;,data=&quot;fail&quot;}
export async function DeleteApiCmtAdminPmsManagersMembersUid(
  uid: any,
  options?: { [key: string]: any },
) {
  return request<Res<Pmsv1DeleteManagerMemberRes>>(`/api/cmtAdmin/pms/managers/members/${uid}`, {
    method: 'DELETE',

    ...(options || {}),
  });
}
// RoleList (0613) 获取全部role列表
// @Tags Pms
// @Success 200 {object} bffcore.Res{code=int,msg=string,data=pmsv1.GetRoleListRes}
// @Failure 200 {object} bffcore.Res{code=int,msg=string,data=string} &quot;&quot; bffcore.Res{code:1,msg:&quot;fail&quot;,data=&quot;fail&quot;}
export async function GetApiCmtAdminPmsRoles(options?: { [key: string]: any }) {
  return request<Res<Pmsv1GetRoleListRes>>(`/api/cmtAdmin/pms/roles`, {
    method: 'GET',

    ...(options || {}),
  });
}
// UserRoleIds (0613) 获取用户uid全部role ids
// @Tags Pms
// @Success 200 {object} bffcore.Res{code=int,msg=string,data=pmsv1.GetRoleListRes}
// @Failure 200 {object} bffcore.Res{code=int,msg=string,data=string} &quot;&quot; bffcore.Res{code:1,msg:&quot;fail&quot;,data=&quot;fail&quot;}
export async function GetApiCmtAdminPmsRolesUsersUidRoleIds(
  uid: any,
  options?: { [key: string]: any },
) {
  return request<Res<Pmsv1GetRoleIdsRes>>(`/api/cmtAdmin/pms/roles/-/users/${uid}/roleIds`, {
    method: 'GET',

    ...(options || {}),
  });
}
// CreateRole (0616,0617) 创建角色
// @Tags Pms
// @Success 200 {object} bffcore.Res{code=int,msg=string,data=pmsv1.CreateRoleRes}
// @Failure 200 {object} bffcore.Res{code=int,msg=string,data=string} &quot;&quot; bffcore.Res{code:1,msg:&quot;fail&quot;,data=&quot;fail&quot;}
export async function PostApiCmtAdminPmsRoles(
  req: PmsCreateRoleRequest,
  options?: { [key: string]: any },
) {
  return request<Res<Pmsv1CreateRoleRes>>(`/api/cmtAdmin/pms/roles`, {
    method: 'POST',
    data: req,
    ...(options || {}),
  });
}
// UpdateRole (0707) 更新角色
// @Tags Pms
// @Success 200 {object} bffcore.Res{code=int,msg=string,data=pmsv1.UpdateRoleRes}
// @Failure 200 {object} bffcore.Res{code=int,msg=string,data=string} &quot;&quot; bffcore.Res{code:1,msg:&quot;fail&quot;,data=&quot;fail&quot;}
export async function PutApiCmtAdminPmsRolesRoleId(
  roleId: any,
  req: PmsCreateRoleRequest,
  options?: { [key: string]: any },
) {
  return request<Res<Pmsv1UpdateRoleRes>>(`/api/cmtAdmin/pms/roles/${roleId}`, {
    method: 'PUT',
    data: req,
    ...(options || {}),
  });
}

export async function DeleteApiCmtAdminPmsRolesRoleId(
  roleId: any,
  options?: { [key: string]: any },
) {
  return request<Res<Pmsv1DeleteRoleRes>>(`/api/cmtAdmin/pms/roles/${roleId}`, {
    method: 'DELETE',

    ...(options || {}),
  });
}
// RoleMemberList (0613) 获取某个role的成员列表
// @Tags Pms
// @Success 200 {object} bffcore.Res{code=int,msg=string,data=pmsv1.GetRoleMemberListRes}
// @Failure 200 {object} bffcore.Res{code=int,msg=string,data=string} &quot;&quot; bffcore.Res{code:1,msg:&quot;fail&quot;,data=&quot;fail&quot;}
export async function GetApiCmtAdminPmsRolesRoleIdMembers(
  roleId: any,
  options?: { [key: string]: any },
) {
  return request<Res<Pmsv1GetRoleMemberListRes>>(`/api/cmtAdmin/pms/roles/${roleId}/members`, {
    method: 'GET',

    ...(options || {}),
  });
}
// RolePermission (0613) 获取某个role的权限列表
// @Tags Pms
// @Success 200 {object} bffcore.Res{code=int,msg=string,data=pmsv1.GetRolePermissionRes}
// @Failure 200 {object} bffcore.Res{code=int,msg=string,data=string} &quot;&quot; bffcore.Res{code:1,msg:&quot;fail&quot;,data=&quot;fail&quot;}
export async function GetApiCmtAdminPmsRolesRoleIdPermissions(
  roleId: any,
  options?: { [key: string]: any },
) {
  return request<Res<PmsRolePermissionResp>>(`/api/cmtAdmin/pms/roles/${roleId}/permissions`, {
    method: 'GET',

    ...(options || {}),
  });
}
// RoleSpaceGroupPermission (0613) 获取某个role的权限列表
// @Tags Pms
// @Success 200 {object} bffcore.Res{code=int,msg=string,data=pmsv1.GetRolePermissionRes}
// @Failure 200 {object} bffcore.Res{code=int,msg=string,data=string} &quot;&quot; bffcore.Res{code:1,msg:&quot;fail&quot;,data=&quot;fail&quot;}
export async function GetApiCmtAdminPmsRolesRoleIdSpaceGroupPermissions(
  roleId: any,
  options?: { [key: string]: any },
) {
  return request<Res<PmsRoleSpaceGroupPermissionRes>>(
    `/api/cmtAdmin/pms/roles/${roleId}/spaceGroupPermissions`,
    {
      method: 'GET',

      ...(options || {}),
    },
  );
}
// RoleSpacePermission (0613) 获取某个role的权限列表
// @Tags Pms
// @Success 200 {object} bffcore.Res{code=int,msg=string,data=pmsv1.GetRolePermissionRes}
// @Failure 200 {object} bffcore.Res{code=int,msg=string,data=string} &quot;&quot; bffcore.Res{code:1,msg:&quot;fail&quot;,data=&quot;fail&quot;}
export async function GetApiCmtAdminPmsRolesRoleIdSpacePermissions(
  roleId: any,
  options?: { [key: string]: any },
) {
  return request<Res<PmsRoleSpacePermissionRes>>(
    `/api/cmtAdmin/pms/roles/${roleId}/spacePermissions`,
    {
      method: 'GET',

      ...(options || {}),
    },
  );
}
// RoleSpaceInitPermission (0707) role的space的初始权限点
// @Tags Pms
// @Success 200 {object} bffcore.Res{code=int,msg=string,data=pmsv1.RoleSpaceInitPermissionRes}
// @Failure 200 {object} bffcore.Res{code=int,msg=string,data=string} &quot;&quot; bffcore.Res{code:1,msg:&quot;fail&quot;,data=&quot;fail&quot;}
export async function GetApiCmtAdminPmsRolesRoleIdSpacesGuidInitPermissions(
  roleId: any,
  guid: any,
  options?: { [key: string]: any },
) {
  return request<Res<Pmsv1GetInitActionOptionPermissionRes>>(
    `/api/cmtAdmin/pms/roles/${roleId}/spaces/${guid}/initPermissions`,
    {
      method: 'GET',

      ...(options || {}),
    },
  );
}
// RoleSpaceGroupInitPermission (0707) role的space group的初始权限点
// @Tags Pms
// @Success 200 {object} bffcore.Res{code=int,msg=string,data=pmsv1.RoleSpaceGroupInitPermissionRes}
// @Failure 200 {object} bffcore.Res{code=int,msg=string,data=string} &quot;&quot; bffcore.Res{code:1,msg:&quot;fail&quot;,data=&quot;fail&quot;}
export async function GetApiCmtAdminPmsRolesRoleIdSpaceGroupsGuidInitPermissions(
  roleId: any,
  guid: any,
  options?: { [key: string]: any },
) {
  return request<Res<PmsRoleSpaceGroupInitPermissionRes>>(
    `/api/cmtAdmin/pms/roles/${roleId}/spaceGroups/${guid}/initPermissions`,
    {
      method: 'GET',

      ...(options || {}),
    },
  );
}
// PutRolePermission (0613) 修改某个role权限点
// @Tags Pms
// @Success 200 {object} bffcore.Res{code=int,msg=string,data=pmsv1.PutRolePermissionRes}
// @Failure 200 {object} bffcore.Res{code=int,msg=string,data=string} &quot;&quot; bffcore.Res{code:1,msg:&quot;fail&quot;,data=&quot;fail&quot;}
export async function PutApiCmtAdminPmsRolesRoleIdPermissions(
  roleId: any,
  req: PmsPutRolePermissionRequest,
  options?: { [key: string]: any },
) {
  return request<Res<Pmsv1PutRolePermissionRes>>(`/api/cmtAdmin/pms/roles/${roleId}/permissions`, {
    method: 'PUT',
    data: req,
    ...(options || {}),
  });
}
// PutRoleSpaceGroupPermission (0613) 修改某个role权限点
// @Tags Pms
// @Success 200 {object} bffcore.Res{code=int,msg=string,data=pmsv1.PutRoleSpaceGroupPermissionReq}
// @Failure 200 {object} bffcore.Res{code=int,msg=string,data=string} &quot;&quot; bffcore.Res{code:1,msg:&quot;fail&quot;,data=&quot;fail&quot;}
export async function PutApiCmtAdminPmsRolesRoleIdSpaceGroupPermissions(
  roleId: any,
  req: PmsPutRoleSpaceGroupPermissionRequest,
  options?: { [key: string]: any },
) {
  return request<Res<Pmsv1PutRoleSpaceGroupPermissionRes>>(
    `/api/cmtAdmin/pms/roles/${roleId}/spaceGroupPermissions`,
    {
      method: 'PUT',
      data: req,
      ...(options || {}),
    },
  );
}
// PutRoleSpacePermission (0613) 修改某个role权限点
// @Tags Pms
// @Success 200 {object} bffcore.Res{code=int,msg=string,data=pmsv1.PutRoleSpacePermissionReq}
// @Failure 200 {object} bffcore.Res{code=int,msg=string,data=string} &quot;&quot; bffcore.Res{code:1,msg:&quot;fail&quot;,data=&quot;fail&quot;}
export async function PutApiCmtAdminPmsRolesRoleIdSpacePermissions(
  roleId: any,
  req: PmsPutRoleSpacePermissionRequest,
  options?: { [key: string]: any },
) {
  return request<Res<Pmsv1PutRoleSpacePermissionRes>>(
    `/api/cmtAdmin/pms/roles/${roleId}/spacePermissions`,
    {
      method: 'PUT',
      data: req,
      ...(options || {}),
    },
  );
}
// CreateRoleMember (0613) 添加某个role成员
// @Tags Pms
// @Success 200 {object} bffcore.Res{code=int,msg=string,data=pmsv1.CreateRoleMemberRes}
// @Failure 200 {object} bffcore.Res{code=int,msg=string,data=string} &quot;&quot; bffcore.Res{code:1,msg:&quot;fail&quot;,data=&quot;fail&quot;}
export async function PostApiCmtAdminPmsRolesRoleIdMembers(
  roleId: any,
  req: PmsCreateRoleMemberRequest,
  options?: { [key: string]: any },
) {
  return request<Res<Pmsv1CreateRoleMemberRes>>(`/api/cmtAdmin/pms/roles/${roleId}/members`, {
    method: 'POST',
    data: req,
    ...(options || {}),
  });
}
// DeleteRoleMember 管理员基本数据
export async function DeleteApiCmtAdminPmsRolesRoleIdMembers(
  roleId: any,
  req: PmsDeleteRoleMemberRequest,
  options?: { [key: string]: any },
) {
  return request<Res<Pmsv1DeleteRoleMemberRes>>(`/api/cmtAdmin/pms/roles/${roleId}/members`, {
    method: 'DELETE',
    data: req,
    ...(options || {}),
  });
}
// CommunityTotalList (0613) 获取全部role列表
// @Tags Total
// @Success 200 {object} bffcore.Res{code=int,msg=string,data=pmsv1.GetRoleListRes}
// @Failure 200 {object} bffcore.Res{code=int,msg=string,data=string} &quot;&quot; bffcore.Res{code:1,msg:&quot;fail&quot;,data=&quot;fail&quot;}
export async function GetApiCmtAdminTotalCommunityKey(key: any, options?: { [key: string]: any }) {
  return request<Res<Totalv1ListRes>>(`/api/cmtAdmin/total/community/${key}`, {
    method: 'GET',

    ...(options || {}),
  });
}
// SpaceTotalList (0613) 获取全部role列表
// @Tags Total
// @Success 200 {object} bffcore.Res{code=int,msg=string,data=pmsv1.GetRoleListRes}
// @Failure 200 {object} bffcore.Res{code=int,msg=string,data=string} &quot;&quot; bffcore.Res{code:1,msg:&quot;fail&quot;,data=&quot;fail&quot;}
export async function GetApiCmtAdminTotalSpaceSpaceGuidKey(
  spaceGuid: any,
  key: any,
  options?: { [key: string]: any },
) {
  return request<Res<Totalv1ListRes>>(`/api/cmtAdmin/total/space/${spaceGuid}/${key}`, {
    method: 'GET',

    ...(options || {}),
  });
}

export async function GetApiCmtAdminLoggerListPage(
  req: LoggerListPageRequest,
  options?: { [key: string]: any },
) {
  return request<Res<ResList<Loggerv1LogInfo[]>>>(`/api/cmtAdmin/logger/listPage`, {
    method: 'GET',
    params: req,
    ...(options || {}),
  });
}

export async function GetApiCmtAdminLoggerEventAndGroupList(options?: { [key: string]: any }) {
  return request<Res<Loggerv1ListEventAndGroupRes>>(`/api/cmtAdmin/logger/eventAndGroupList`, {
    method: 'GET',

    ...(options || {}),
  });
}

export async function GetApiCmtAdminBillingEquityData(options?: { [key: string]: any }) {
  return request<Res<any>>(`/api/cmtAdmin/billing/equityData`, {
    method: 'GET',

    ...(options || {}),
  });
}

export async function GetApiCmtAdminCmtGuidBillingListPage(
  req: BillingListPageRequest,
  options?: { [key: string]: any },
) {
  return request<Res<ResList<Orderv1OrderInfo[]>>>(`/api/cmtAdmin/billing/listPage`, {
    method: 'GET',
    params: req,
    ...(options || {}),
  });
}
// Get 获取首页配置信息
export async function GetApiCmtAdminHome(options?: { [key: string]: any }) {
  return request<Res<HomeGetRes>>(`/api/cmtAdmin/home`, {
    method: 'GET',

    ...(options || {}),
  });
}

export async function PutApiCmtAdminHome(req: HomePutReq, options?: { [key: string]: any }) {
  return request<Res<any>>(`/api/cmtAdmin/home`, {
    method: 'PUT',
    data: req,
    ...(options || {}),
  });
}
// PlatformAllList 平台上的应用列表
export async function GetApiCmtAdminApps(options?: { [key: string]: any }) {
  return request<Res<Appv1AppInfo[]>>(`/api/cmtAdmin/apps`, {
    method: 'GET',

    ...(options || {}),
  });
}

export async function PutApiCmtAdminAppsAppId(
  appId: any,
  req: AppCmtRequest,
  options?: { [key: string]: any },
) {
  return request<Res<any>>(`/api/cmtAdmin/apps/${appId}`, {
    method: 'PUT',
    data: req,
    ...(options || {}),
  });
}
// Get 获取自定义主题颜色信息
// @User 刘慧平
// @Date 2022-10-12
export async function GetApiCmtAdminTheme(options?: { [key: string]: any }) {
  return request<Res<ThemeGetRes>>(`/api/cmtAdmin/theme`, {
    method: 'GET',

    ...(options || {}),
  });
}
// Put 更新自定义主题颜色信息
// @User 刘慧平
// @Date 2022-10-12
export async function PutApiCmtAdminTheme(req: ThemePutRes, options?: { [key: string]: any }) {
  return request<Res<any>>(`/api/cmtAdmin/theme`, {
    method: 'PUT',
    data: req,
    ...(options || {}),
  });
}
// Query 查询监控
export async function GetApiIntgsQuery(req: AppQueryReq, options?: { [key: string]: any }) {
  return request<Res<AppQueryRes>>(`/api/intgs/query`, {
    method: 'GET',
    params: req,
    ...(options || {}),
  });
}
// CreateIntgConns 创建连接
export async function PostApiIntgConns(
  req: AppCreateIntgConnsReq,
  options?: { [key: string]: any },
) {
  return request<Res<any>>(`/api/intg-conns`, {
    method: 'POST',
    data: req,
    ...(options || {}),
  });
}

export async function GetApiIntgConns(req: AppListIntgConnsReq, options?: { [key: string]: any }) {
  return request<Res<any>>(`/api/intg-conns`, {
    method: 'GET',
    params: req,
    ...(options || {}),
  });
}

export async function DeleteApiIntgConnsIntgConnId(
  intgConnId: any,
  options?: { [key: string]: any },
) {
  return request<Res<any>>(`/api/intg-conns/${intgConnId}`, {
    method: 'DELETE',

    ...(options || {}),
  });
}
// Create 创建文档
// @Tags Article
// @Success 200 {object} bffcore.Res{data=commonv1.FileInfo}
export async function PostApiColumns(req: ColumnCreateRequest, options?: { [key: string]: any }) {
  return request<Res<Commonv1FileInfo>>(`/api/columns`, {
    method: 'POST',
    data: req,
    ...(options || {}),
  });
}
// SidebarChangeSort 修改树型目录顺序
// @Tags Article
// @Success 200 {object} bffcore.Res{data=filev1.ChangeSortRes}
export async function PutApiColumnsChangeSort(
  req: ColumnSidebarChangeSortRequest,
  options?: { [key: string]: any },
) {
  return request<Res<Columnv1ChangeSortRes>>(`/api/columns/-/change-sort`, {
    method: 'PUT',
    data: req,
    ...(options || {}),
  });
}
// UpdateArticle 更新或发布文档
// @Tags Article
// @Success 200 {object} bffcore.Res{}
export async function PutApiColumnsGuid(
  guid: any,
  req: ColumnUpdateArticleRequest,
  options?: { [key: string]: any },
) {
  return request<Res<any>>(`/api/columns/${guid}`, {
    method: 'PUT',
    data: req,
    ...(options || {}),
  });
}

export async function DeleteApiColumnsGuid(guid: any, options?: { [key: string]: any }) {
  return request<Res<any>>(`/api/columns/${guid}`, {
    method: 'DELETE',

    ...(options || {}),
  });
}
// ChangeSort 更新course的排序
export async function PutApiCoursesCguidChangeSort(
  cguid: any,
  req: CourseChangeSortReq,
  options?: { [key: string]: any },
) {
  return request<Res<Coursev1ChangeSortRes>>(`/api/courses/${cguid}/change-sort`, {
    method: 'PUT',
    data: req,
    ...(options || {}),
  });
}
// CreateSection 创建章节
export async function PostApiCoursesCguidSections(
  cguid: any,
  req: CourseCreateSectionReq,
  options?: { [key: string]: any },
) {
  return request<Res<Commonv1FileInfo>>(`/api/courses/${cguid}/sections`, {
    method: 'POST',
    data: req,
    ...(options || {}),
  });
}
// UpdateSection 更新课程
export async function PutApiCoursesCguidSectionsSguid(
  cguid: any,
  sguid: any,
  req: CourseUpdateSectionReq,
  options?: { [key: string]: any },
) {
  return request<Res<any>>(`/api/courses/${cguid}/sections/${sguid}`, {
    method: 'PUT',
    data: req,
    ...(options || {}),
  });
}
// DeleteSection 删除课程
export async function DeleteApiCoursesCguidSectionsSguid(
  cguid: any,
  sguid: any,
  options?: { [key: string]: any },
) {
  return request<Res<any>>(`/api/courses/${cguid}/sections/${sguid}`, {
    method: 'DELETE',

    ...(options || {}),
  });
}
// CreateLesson 创建课时
export async function PostApiCoursesCguidSectionsSguidLessons(
  cguid: any,
  sguid: any,
  req: CourseCreateLessonReq,
  options?: { [key: string]: any },
) {
  return request<Res<Commonv1FileInfo>>(`/api/courses/${cguid}/sections/${sguid}/lessons`, {
    method: 'POST',
    data: req,
    ...(options || {}),
  });
}
// UpdateLesson 更新课时
export async function PutApiCoursesCguidSectionsLessonsLguid(
  cguid: any,
  lguid: any,
  req: CourseUpdateLessonReq,
  options?: { [key: string]: any },
) {
  return request<Res<any>>(`/api/courses/${cguid}/sections/-/lessons/${lguid}`, {
    method: 'PUT',
    data: req,
    ...(options || {}),
  });
}
// DeleteLesson 删除课时
export async function DeleteApiCoursesCguidSectionsLessonsLguid(
  cguid: any,
  lguid: any,
  options?: { [key: string]: any },
) {
  return request<Res<any>>(`/api/courses/${cguid}/sections/-/lessons/${lguid}`, {
    method: 'DELETE',

    ...(options || {}),
  });
}
// GetLessonByCreator 获取内容
export async function GetApiCoursesCguidSectionsLessonsByCreatorLguid(
  cguid: any,
  lguid: any,
  options?: { [key: string]: any },
) {
  return request<Res<Commonv1FileInfo>>(
    `/api/courses/${cguid}/sections/-/lessons-by-creator/${lguid}`,
    {
      method: 'GET',

      ...(options || {}),
    },
  );
}
// GetLesson 获取内容 url
export async function GetApiCoursesCguidSectionsLessonsLguid(
  cguid: any,
  lguid: any,
  options?: { [key: string]: any },
) {
  return request<Res<Commonv1FileInfo>>(`/api/courses/${cguid}/sections/-/lessons/${lguid}`, {
    method: 'GET',

    ...(options || {}),
  });
}

export async function PostApiMyCoursesCompeteLessonsLguid(
  lguid: any,
  options?: { [key: string]: any },
) {
  return request<Res<any>>(`/api/my/courses/-/compete-lessons/${lguid}`, {
    method: 'POST',

    ...(options || {}),
  });
}

export async function PostApiCommunitiesTeachers(
  req: CoursePoolCreateTeacherReq,
  options?: { [key: string]: any },
) {
  return request<Res<String>>(`/api/communities/teachers`, {
    method: 'POST',
    data: req,
    ...(options || {}),
  });
}

export async function PutApiCommunitiesTeachersTguid(
  tguid: any,
  req: CoursePoolUpdateTeacherReq,
  options?: { [key: string]: any },
) {
  return request<Res<any>>(`/api/communities/teachers/${tguid}`, {
    method: 'PUT',
    data: req,
    ...(options || {}),
  });
}

export async function DeleteApiCommunitiesTeachersTguid(
  tguid: any,
  options?: { [key: string]: any },
) {
  return request<Res<any>>(`/api/communities/teachers/${tguid}`, {
    method: 'DELETE',

    ...(options || {}),
  });
}

export async function GetApiCommunitiesTeachers(options?: { [key: string]: any }) {
  return request<Res<Coursev1Teacher[]>>(`/api/communities/teachers`, {
    method: 'GET',

    ...(options || {}),
  });
}
