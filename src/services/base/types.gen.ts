type Res<T> = {
  code: number;
  msg: string;
  data: T;
  traceId?: string;
  pagination?: Commonv1Pagination;
};

type ResList<T> = {
  list: T;
};

type Pmsv1DeleteRoleMemberRes = {};

type MyOauthUserInfoRes = {
  user: MyUserInfo; //
  cmtList: Communityv1CommunityBaseInfo[]; //
};

type Pmsv1GetInitActionOptionPermissionRes = {
  list: Commonv1PmsItem[]; // 权限列表
};

type DriveCreateNodeReq = {
  nodes: DriveCreateNodeReqItem[]; // 不能为空
  parentGuid: string; // 不能和SpaceGuid同时为空
  spaceGuid: string; // 不能为空
  type: number; // 不能为空
};

type PmsManagerMemberListResp = {
  list: PmsMemberInfo[]; // 成员列表
};

type Pmsv1PutRolePermissionRes = {};

type CommunityBuyMemberRequest = {
  chargeMethod: number; // 支付方式，不能为空
  memberType: number; // 年度会员 为 1， 月度会员 为 2
};

type UploadPathReq = {
  fileName: string; //
  type: number; //
  size: number; //
  spaceGuid: string; //
};

type UploadLocalFileReq = {
  dstPath: string; //
  file: any; //
};

type CommunityApplyRequest = {
  name: string; //
  visibility: number; //
  templateId: number; //
};

type UserUpdatePhoneRequest = {
  phone: string; //
};

type PmsRolePermissionResp = {
  list: Commonv1PmsItem[]; //
};

type PmsRoleSpaceGroupPermissionRes = {
  list: Pmsv1SpaceGroupPmsItem[]; //
};

type CourseCreateLessonReq = {
  content: any; //
  name: string; // 课时名称
  headImage: string; // 头图
};

type ColumnListFilesReq = {
  spaceGuid: string; //
};

type CourseListCoursesReq = {
  topic: string; // 为空则不进行topic过滤
};

type ShopRefundInfoReq = {
  chargeSn: string; //
  refundSn: string; //
};

type Pmsv1CreateRoleRes = {
  roleId: number; // 角色id
  name: string; // 名称
};

type HomeGetRes = {
  isSetHome: boolean; // 是否启用首页
  articleHotShowWithLatest: number; // 展示近期多少天内创建的帖子
  bannerImg: string; // 启用首页banner
  bannerTitle: string; // banner文案
  defaultPageByNotLogin: string; // 未登录用户默认访问页面
  defaultPageByLogin: string; // 登录用户默认访问页面
  articleHotShowSum: number; // 展示热门帖子的数量
  defaultPageByNewUser: string; // 新用户注册默认访问页面
  isSetBanner: boolean; // 是否启用banner
  articleSortByLogin: number; // 登录用户推荐内容排序规则
  articleSortByNotLogin: number; // 未登录用户推荐内容排序规则
  activityLatestShowSum: number; // 展示近期的活动数量
  bannerLink: string; // banner的跳转链接
  pageOptions: HomePageOption[]; // 页面选项
};

type HomePutReq = {
  isSetHome: boolean; // 是否启用首页
  articleHotShowWithLatest: number; // 展示近期多少天内创建的帖子
  bannerImg: string; // 启用首页banner
  defaultPageByLogin: string; // 登录用户默认访问页面
  bannerLink: string; // banner的跳转链接
  defaultPageByNewUser: string; // 新用户注册默认访问页面
  isSetBanner: boolean; // 是否启用banner
  articleSortByLogin: number; // 登录用户推荐内容排序规则
  articleSortByNotLogin: number; // 未登录用户推荐内容排序规则
  articleHotShowSum: number; // 展示热门帖子的数量
  activityLatestShowSum: number; // 展示近期的活动数量
  bannerTitle: string; // banner文案
  defaultPageByNotLogin: string; // 未登录用户默认访问页面
};

type ArticleUpdateArticleRequest = {
  name: string; //
  content: any; //
  headImage: string; //
};

type Commonv1UserInfo = {
  uid: number; // 用户ID
  ctime: number; // 创建时间
  nickname: string; // 用户昵称
  mobile: string; // 手机号
  avatar: string; // 头像
  lastActiveCmtGuid: string; // 最后活跃的社区Guid
  email: string; // 邮件
  namePinyin: string; // 用户名拼音
  emailBindStatus: number; // 邮箱绑定状态
  imUserId: number; // im 用户id
  name: string; // 用户名称
};

type Userv1InfoRes = {
  user: Userv1UserInfo; // 用户详情
};

type DtoListRes = {
  list: string[]; //
};

type Spacev1CreateSpaceGroupRes = {
  info: Spacev1SpaceGroupInfo; // 创建的 Space
};

type ColumnUpdateArticleRequest = {
  headImage: string; //
  name: string; //
  content: any; //
};

type SpaceColumnInfoResp = {
  memberCnt: number; // 成员个数
  desc: string; // 空间简介或描述
  cover: string; // 空间封面
  authorUid: number; //
  authorNickname: string; //
  name: string; // 名称
  cmtGuid: string; // 社区Guid
  spaceGroupGuid: string; // 空间分组guid
  authorAvatar: string; //
  guid: string; // GUID
};

type MyNotificationAuditPassRequest = {
  opReason: string; // 管理员理由
};

type Filev1PermissionRes = {
  isAllowRecommend: boolean; // 是否可以推荐
  isAllowSetComment: boolean; // 是否可以打开评论或者关闭评论
  isAllowCreateComment: boolean; // 是否可以创建评论
  guid: string; // 文档GUID
  isAllowWrite: boolean; // 是否可以编辑
  isAllowDelete: boolean; // 是否可以删除
  isAllowSiteTop: boolean; // 是否可以置顶
};

type DriveListDescendantNodeReq = {
  sort: string; // 排序字符串
  currentPage: number; // 当前页数
  pageSize: number; // 每页总数
  guid: string; // 自己guid
  spaceGuid: string; // 空间guid
};

type HomeArticleHot = {
  list: Commonv1FileShow[]; // 列表
};

type FileTopicCommentListRequest = {
  currentPage: number; //
};

type ActivityUpdateReq = {
  signUpEndTime: number; //
  description: string; //
  endTime: number; //
  signUpStartTime: number; //
  location: string; //
  isFree: number; //
  name: string; //
  guestUids: number[]; //
  address: string; //
  cover: string; //
  fee: number; //
  content: any; //
  startTime: number; //
  isOnline: number; //
};

type ProfileFollowersListReq = {
  currentPage: number; // 当前页数
  pageSize: number; // 每页总数
  sort: string; // 排序字符串
};

type ActivityJoinReq = {};

type Spacev1UpdateSpaceRes = {};

type Spacev1DeleteSpaceGroupMemberRes = {};

type Communityv1UpdateUserInfoRes = {};

type Activityv1ActivityInfo = {
  type: number; // 活动类型：meetup、meeting
  cover: string; // 活动封面
  ctime: number; // 创建时间
  isReadMore: number; // 是否有readMore
  signUpStartTime: number; // 报名开始时间
  guestUids: number[]; // 邀请的嘉宾
  hasJoined: boolean; // 指定用户是否已加入
  signUpEndTime: number; // 报名结束时间时间
  location: string; // 活动地点经纬度值,如：116.310003,39.991957
  joinedUids: string[]; // 参与观众topN
  isOnline: number; // 是否是线上模式
  description: string; // 活动描述
  endTime: number; // 结束时间时间
  uid: number; // 创建人
  spaceGuid: string; // 空间guid
  content: string; // 活动内容
  cmtGuid: string; // 社区guid
  utime: number; // 更新时间
  format: number; // 文档格式
  address: string; // 活动地点文字地址，如：北京市朝阳区阜通东大街6号
  fee: number; // 付费金额
  isAllowCreateComment: number; // 是否允许创建评论
  ipLocation: string; // ip定位的地址, 暂时精确到省
  isFree: number; // 是否付费
  guid: string; // 活动guid
  isCollect: number; // 是否收藏
  name: string; // 活动名称
  startTime: number; // 开始时间
};

type MyNotificationListReq = {
  currentPage: number; // 当前页数
  pageSize: number; // 每页总数
  sort: string; // 排序字符串
  types: number[]; // 为空表示不限定查询类型
};

type Communityv1UpdateRes = {
  community: Commonv1CommunityInfo; // 社区信息
};

type SpaceCheckMembershipReq = {
  guids: string[]; //
};

type MyReferralsResetReq = {};

type HomeActivityLatest = {
  list: Activityv1ActivityInfo[]; // 列表
};

type Spacev1GetSpacePermissionByUidRes = {
  isAllowWrite: boolean; // 是否可以写入
  isAllowCreateFile: boolean; // 是否可以写入
  isMember: boolean; // 是否为空间成员
  auditStatus: number; // 审核状态
  isAllowReadMemberList: boolean; // 是否允许查看成员列表
  payload: any; // 消息体
  //
  //Types that are assignable to Payload:
  //
  //	*GetSpacePermissionByUidRes_Article
  //	*GetSpacePermissionByUidRes_Question
  //	*GetSpacePermissionByUidRes_Activity
  //	*GetSpacePermissionByUidRes_Im
  isAllowManage: boolean; // 是否可以查看
  isAllowView: boolean; // 是否可以查看
};

type Statv1CollectionGroupListRes = {
  list: Statv1CollectionGroupInfo[]; // 列表
};

type AppCol = {
  name: string; // 名称，比如 time/sla
  type: string; // 类型，比如 timestamp/float64
};

type MyNotificationTotalRes = {
  unViewCount: number; // 未读消息个数
};

type Communityv1UpdatePriceInfoRes = {
  uid: number; // 用户ID
  cmtGuid: string; // 社区ID
};

type Pmsv1PutRoleSpaceGroupPermissionRes = {};

type ThemeCustomColor = {
  themeColorButtonText: string; //
  themeColorBackground: string; //
  themeColorPrimary: string; //
  themeColorStatus: string; //
};

type DtoMyEmojiInfo = {
  guid: string; //
  list: Commonv1EmojiInfo[]; //
};

type Pmsv1DeleteRoleRes = {};

type QuestionCreateRequest = {
  name: string; //
  spaceGuid: string; //
  content: any; //
};

type AppQueryRes = {
  key: string; // panel 唯一key, 比如 "gh_overview"
  title: string; // panel 显示名称, 比如 "GitHub 账户概览"
  type: string; // panel 渲染出来的ui类型, 比如 timeseries/barchart/stat/gauge/bargauge/table/piechart/text
  targets: AppTarget[]; // 查询的target列表
  fieldConfig: AppFieldConfig; // 字段配置
};

type MyUserInfo = {
  uid: number; //
  nickname: string; // 昵称
  avatar: string; // 头像
  name: string; // 用户名称
  cmtIdentifyStatus: number; // 有资格创建社区的审核状态
};

type MedalUserMedalListRequest = {
  currentPage: number; // 当前页数
};

type CommunityRefStateReq = {
  ref: string; // 邀请码
};

type AppQueryReq = {
  key: string; // panel唯一Key名, 比如 "gh_v1_overview"
  st: number; // 开始时间戳, 秒
  et: number; // 终止时间戳, 秒
  type: string; // 集成类型, 比如 "github"
};

type FileSubListPageReq = {
  currentPage: number; // 当前页数
  sort: number; // 排序值
};

type DtoFilePermission = {
  isAllowWrite: boolean; // 是否可以编辑
  isAllowDelete: boolean; // 是否可以删除
  isAllowSiteTop: boolean; // 是否可以置顶
  isAllowRecommend: boolean; // 是否可以推荐
  isAllowSetComment: boolean; // 是否可以打开评论或者关闭评论
  isAllowCreateComment: boolean; // 是否可以创建评论
};

type Spacev1UpdateSpaceGroupRes = {};

type Goodv1GoodSpecValueInfo = {
  id: number; // id
  name: string; // name
  cmtGuid: string; // 社区Guid
};

type DriveUpdateNodeReq = {
  spaceGuid: string; //
  name: string; // 新文件名, 如无需修改可不赋值
  parentGuid: string; // 新父guid, 如无需修改可不赋值
};

type Coursev1Teacher = {
  utime: number; // 更新时间
  role: number; // 职责类型, 1:primaryTeacher, 2:assistantTeacher
  name: string; // 名称
  nickname: string; // 昵称
  avatar: string; // 头像
  title: string; // 职称头衔
  cmtGuid: string; // 社区Guid
  guid: string; // 老师guid
  bio: string; // 简介
  ctime: number; // 创建时间
  createdUid: number; // 创建人
  updatedUid: number; // 更新人
};

type Communityv1TemplateListRes = {
  list: Communityv1TemplateInfo[]; // 模板列表
};

type DtoMyCollectInfo = {
  guid: string; //
  isCollect: boolean; //
};

type CommunityUpdatePriceRequest = {
  isSetPrice: boolean; //
  annualPrice: number; //
  annualOriginPrice: number; //
};

type UserUpdateNicknameRequest = {
  nickname: string; //
};

type Orderv1OrderExtend = {
  receiverPhone: string; // 收获人手机
  receiverAddrRegion: string; // 收货人地址地区
  receiverAddrDetail: string; // 收货人地址地区
  trackingNo: string; // 物流单号
  expressId: number; // 物流公司id，默认为0 代表不需要物流
  expressName: string; // 物流公司
  orderId: number; // 订单ID
  receiverName: string; // 收货人姓名
};

type EditionUpgradeReq = {
  editionId: number; // 需要升级的版本ID，如果无需升级Edition，则可以此字段可以为零值
  chargeMethod: number; // 支付方式，不能为空
  duration: number; // 需要Increase或Decrease的Duration，如果无需续期，则此字段可以为零值，暂时只允许Increase
  durationUnit: number; // 时长单位,天、月、年，如无需续期，则此字段可以为零值
};

type Commonv1SpaceOption = {
  name: string; // 名称
  spaceOptionId: number; // 可选项
  value: number; // 可选项值
  spaceOptionType: number; // 可选项类型
};

type Communityv1GetLastVisitMembersRes = {
  users: Commonv1UserBaseInfo[]; // 最近访问的用户
};

type ActivityCreateReq = {
  name: string; //
  location: string; //
  fee: number; //
  description: string; //
  endTime: number; //
  guestUids: number[]; //
  cover: string; //
  isOnline: number; //
  isFree: number; //
  content: any; //
  startTime: number; //
  spaceGuid: string; //
  signUpStartTime: number; //
  signUpEndTime: number; //
  address: string; //
};

type Goodv1GoodSku = {
  weight: number; // weight
  specSign: string; // 规格标识
  cmtGuid: string; // 社区Guid
  note: string; // note
  goodId: number; // 商品ID
  originPrice: number; // 原始价格
  specValueSign: string; // 规格值标识，用于买东西的时候，校验是否选择了所
  updatedUid: number; // 更新人Uid
  stock: number; // 库存总数
  issueType: number; // issueType
  contractId: number; // contractId
  whiteLimitNum: number; // whiteLimitNum
  cover: string; // 封面
  status: number; // 项目的编辑状态
  specList: Goodv1GoodSkuSpecInfo[]; // SkuSpec列表
  price: number; // 当前价格
  code: string; // code
  title: string; // title
  saleNum: number; // saleNum
  groupSaleNum: number; // groupSaleNum
  id: number; // id
  createdUid: number; // 创建人uid
};

type ProfileFollowingItem = {
  nickname: string; // 昵称
  uid: number; // 用户UID
  identify: number; // identity
  followersCnt: number; // 被多少人关注
  hasFollowed: boolean; // 当前用户是否关注
  email: string; // 邮箱
  avatar: string; // 头像
  name: string; // 用户名称
  followingCnt: number; // 关注的人总数
};

type SpaceCreateMemberRequest = {
  addUids: number[]; //
};

type Commonv1PmsItem = {
  title: string; // 标题
  desc: string; // 描述
  flag: number; // 符号，现在是switch，也可能后续是select
  needUpgrade: number; // 是否需要升级
  upgradeDesc: string; // 升级描述
  actionName: string; // 标识
};

type MyReferralsReq = {};

type MedalUpdateMemberRequest = {
  startTime: number; //
  endTime: number; //
  type: number; //
};

type MyBlockCreateReq = {
  pagination: Commonv1Pagination; //
};

type Spacev1AddSpaceGroupMemberRes = {};

type Filev1EmojiListRes = {
  list: Commonv1EmojiInfo[]; // emoji列表
};

type Goodv1GoodSkuSpecInfo = {
  name: string; // name
  valueId: number; // valueId
  valueName: string; // valueName
  valueImg: string; // valueImg
  cmtGuid: string; // 社区Guid
  id: number; // id
};

type Commonv1SpaceInfo = {
  spaceType: number; // 空间类型
  spaceLayout: number; // 空间布局
  originPrice: number; // 原始价格
  desc: string; // 空间简介或描述
  headImage: string; // 空间头图
  sort: number; // 序号
  link: string; // link信息
  icon: string; // Icon
  cmtGuid: string; // 社区Guid
  visibility: number; // 可见级别
  memberCnt: number; // 成员个数
  spaceOptions: Commonv1SpaceOption[]; // 是否允许成员可以查看成员列表
  //bool isAllowReadMemberList = 10;
  //spaceOptions
  cover: string; // 空间封面
  access: number; // 访问设置
  guid: string; // GUID
  iconType: number; // Icon Type
  spaceGroupGuid: string; // 空间分组guid
  price: number; // 当前价格
  name: string; // 名称
  isAllowSet: boolean; // 是否允许有设置按钮
  topics: string[]; // topics列表
  chargeType: number; // 收费类型
};

type Articlev1ArticleShow = {
  name: string; // 文章标题
  nickname: string; // 用户昵称
  cntView: number; // 查看总数
  cmtGuid: string; // 社区Guid
  isReadMore: number; // 是否有readMore
  ipLocation: string; // ip定位的地址, 暂时精确到省
  guid: string; // 文章GUID
  cntCollect: number; // 收藏总数
  headImage: string; // headImage
  format: number; // 文档格式
  emojiList: Commonv1EmojiInfo[]; // emoji list
  uid: number; // 用户uid
  avatar: string; // 用户头像
  summary: string; // 简单描述
  isSiteTop: number; // 是否置顶
  isRecommend: number; // 是否推荐
  ctime: number; // 创建时间
  cntComment: number; // 回复总数
  spaceGuid: string; // 空间Guid
  isAllowCreateComment: number; // 是否允许创建评论
};

type ActivityCreateRes = {
  guid: string; //
};

type Communityv1CmtTheme = {
  themeName: string; // 主题明晨
  customColor: string; // 自定义颜色
  defaultAppearance: string; // 自定义外观
  isCustom: boolean; // 是否自定义
};

type SpaceListSpaceAndGroupRes = {
  spaceGroupList: Spacev1TreeSpaceGroup[]; //
  spaceList: Spacev1TreeSpace[]; //
};

type SpaceQuitMemberReq = {
  reason: string; //
};

type SpaceCreateRequest = {
  spaceType: number; // 空间类型
  link: string; //
  name: string; // 空间名称
  spaceGroupGuid: string; // 空间分组
  icon: string; // 图标
  spaceLayout: number; // 空间布局
  visibility: number; // visibility
  columnAuthorUid: number; //
  cover: string; //
};

type PmsRoleSpaceGroupInitPermissionRes = {
  list: Commonv1PmsItem[]; //
};

type Spacev1TreeSpace = {
  name: string; // 名称
  spaceType: number; // 空间类型
  spaceOptions: Commonv1SpaceOption[]; // spaceOptions
  cover: string; // 空间封面
  link: string; // link信息
  visibility: number; // 可见级别
  chargeType: number; // 收费类型
  originPrice: number; // 原始价格
  desc: string; // 空间简介或描述
  access: number; // 访问设置
  icon: string; // Icon
  memberCnt: number; // 成员个数
  price: number; // 当前价格
  topics: string[]; // topics列表
  isAllowSet: boolean; // 是否允许有设置按钮
  emojiList: Commonv1EmojiInfo[]; // emoji列表
  guid: string; // GUID
  cmtGuid: string; // 社区Guid
  spaceGroupGuid: string; // 空间分组guid
  spaceLayout: number; // 空间布局
  headImage: string; // 空间头图
};

type ActivityListReq = {
  currentPage: number; // 当前页数
};

type SpaceTreeChangeGroupRequest = {
  spaceGuid: string; //
  afterSpaceGroupGuid: string; //
};

type ActivityListCoversRes = {
  list: string[]; //
};

type Medalv1Member = {
  id: number; // medal member id
  uid: number; // 用户Uid
  nickname: string; // 用户昵称
  avatar: string; // 用户头像
  startTime: number; // 有效期开始时间
  endTime: number; // 有效期结束时间
  type: number; // 类型
};

type Loggerv1ListEventAndGroupRes = {
  eventList: Loggerv1EventInfo[]; // 事件列表
  groupList: Loggerv1GroupInfo[]; // 分组列表
};

type MyBlockListReq = {
  pagination: Commonv1Pagination; //
};

type UserUpdateEmailRequest = {
  email: string; //
};

type DtoCmtTheme = {
  isCustom: boolean; //
  themeName: string; //
  customColor: any; //
  defaultAppearance: string; //
};

type CourseCourseInfo = {
  sectionsCnt: number; // 章节总计
  lessonsCnt: number; // 课时总计
  studentsCnt: number; // 参与学生总计
  myCompletionRate: any; // 我的完成比率
  averageCompletionRate: any; // 平均完成比率
  myCompletedLessons: string[]; // 我完成的课时guid列表
  utime: number; // 更新时间
  teachers: Coursev1Teacher[]; // 讲师列表
  space: Commonv1SpaceInfo; // 基础空间数据
};

type Pmsv1RoleInfo = {
  name: string; // 名称
  id: number; // 角色id
};

type Columnv1ChangeSortRes = {};

type Questionv1QAShow = {
  avatar: string; // 用户头像
  cntCollect: number; // 收藏总数
  list: Commonv1EmojiInfo[]; // emoji list
  isAllowCreateComment: number; // 是否允许创建评论
  isCollect: number; // 是否已经收藏
  format: number; // 文档格式
  guid: string; // 文章GUID
  uid: number; // 用户uid
  cntComment: number; // 回复总数
  cntView: number; // 查看总数
  isReadMore: number; // 是否有readMore
  ipLocation: string; // ip定位的地址, 暂时精确到省
  spaceGuid: string; // 空间Guid
  parentGuid: string; // 文章GUID
  name: string; // 文章标题
  summary: string; // 简单描述
  ctime: number; // 创建时间
  content: string; // 如果是回答，那么就直接展示content
  nickname: string; // 用户昵称
};

type FilePermissionListReq = {
  guids: string[]; //
};

type AppOverride = {
  matcher: AppMatcher; // 字段匹配器
  properties: AppProperty[]; // 字段属性设置
};

type DriveCreateNodeRes = {
  succ: DriveCreateNodeResItem[]; // 成功节点列表
  fail: DriveCreateNodeResItem[]; // 失败节点列表
  uploadConf: Commonv1UploadConf; // 需要进行上传的UploadConf
};

type AppTarget = {
  meta: AppMeta; // target 元数据
  data: any; // 数据序列, 需要用 []map[string]any 的定义去反序列化
};

type CommunityApplyRes = {
  community: Commonv1CommunityInfo; //
  referralCode: CommunityReferralCode; //
};

type ShopChargeCreateReq = {
  chargeMethod: number; //
  amount: number; //
  subject: string; //
  describe: string; //
  orderSn: string; //
};

type CommunityMemberListReq = {
  currentPage: number; // 当前页数
};

type Questionv1MyInfoRes = {
  myAnswerGuid: string; // 我的问题
};

type Chargev1InfoRefundRes = {
  refundSn: string; // 退款SN
  refundId: string; // 第三方的退款ID，如微信退款ID
  refundStatus: number; // 状态
  amount: number; // 退款金额
};

type Communityv1UserInfoRes = {
  avatar: string; // 头像
  position: string; // 职位
  activeTime: number; // 活跃时间
  uid: number; // 用户ID
  name: string; // 名称
  nickname: string; // 社区ID
};

type DriveListNodeReq = {
  currentPage: number; // 当前页数
  pageSize: number; // 每页总数
  sort: string; // 排序字符串
  parentGuid: string; // 不能和SpaceGuid同事为空
  spaceGuid: string; // 空间guid
};

type UserUpdateAttrReq = {
  intro: string; //
  avatar: string; //
  sex: number; //
  birthday: number; //
};

type Spacev1AuditApplySpaceMemberRes = {
  bizCode: number; // 用于判断是否直接加入到空间，刷新空间数据
};

type PmsPutRoleSpacePermissionRequest = {
  list: Pmsv1SpacePmsItem[]; //
};

type Chargev1ChargeInfo = {
  currency: string; // 币种
  signType: string; // 签名方式(微信)
  amount: number; // 付款金额
  orderSn: string; // 订单sn
  paySign: string; // 签名(微信)，注意：微信APP支付时此字段为sign
  orderId: number; // 订单id
  notifyUrl: string; // 通知地址
  chargeMethod: number; // 付款方式
  subject: string; // 商品名称
  buyerUid: number; // 用户uid
  buyerOuid: string; // 用户open_uid
  cmtGuid: string; // 社区guid
  appid: string; // 应用id
  id: string; // 第三方支付id, 可能为空
  sn: string; // 支付SN
  package: string; // 订单详情扩展字符串(微信)
  chargeUrl: string; // 支付URL，注意支付宝支付时可以直接跳转，微信支付时需要将此url转换成二维码
  timeStamp: string; // 时间戳秒(微信)，注意：微信JSAPI支付此字段为timestamp
  nonceStr: string; // 随机字符串(微信)，注意：微信JSAPI支付此字段为noncestr
};

type CommunityUpdateUserInfoRequest = {
  nickname: string; //
  position: string; //
};

type ProfileFollowingListReq = {
  currentPage: number; // 当前页数
  pageSize: number; // 每页总数
  sort: string; // 排序字符串
};

type PmsCreateManagerMemberReq = {
  uids: number[]; //
};

type CommonOssCallbackReq = {
  bucket: string; //
  object: string; //
  size: number; //
  cmtGuid: string; //
  spaceGuid: string; //
  fileGuid: string; //
  uid: number; //
  fileType: number; //
};

type Pmsv1MemberInfo = {
  name: string; // 用户名
  nickname: string; // 用户昵称
  avatar: string; // 用户头像
  ctime: number; // 创建时间
  pmsManagerType: number; // MANAGER
  position: string; // 职位
  activeTime: string; // 激活时间
  uid: number; // 用户Uid
};

type MedalMedalListRequest = {
  currentPage: number; // 当前页数
};

type MyCollectionListReq = {
  pageSize: number; // 每页总数
  sort: string; // 排序字符串
  currentPage: number; // 当前页数
};

type MyReferralsSendReq = MyReferralsSendChannel[];

type Commonv1Pagination = {
  total: number; // 总数
  currentPage: number; // 当前页数
  pageSize: number; // 每页总数
  sort: string; // 排序字符串
};

type Userv1U2UStat = {
  uid: number; // uid
  targetUid: number; // 目标uid
  statVal: number; // 状态值
  ctime: number; // 创建时间
  utime: number; // 更新时间
};

type MyNotificationAuditRejectRequest = {
  opReason: string; // 管理员理由
};

type MedalUpdateRequest = {
  icon: string; //
  desc: string; //
  name: string; //
};

type MedalMemberListRequest = {
  currentPage: number; // 当前页数
};

type Pmsv1SpacePmsItem = {
  list: Commonv1PmsItem[]; // space里面的权限列表
  guid: string; // guid 信息
  name: string; // 名称
  //名称
};

type AppMeta = {
  timeType: string; // time字段类型, DATETIME/TIMESTAMP
  timeFmt: string; // time格式, 比如 "YYYY-MM-DD HH:mm:ss" / "YYYY-MM"
  cols: AppCol[]; // 所有列信息
  timeCol: string; // time字段名称,表示使用哪一列作为时间字段
};

type DtoFileShow = {
  uid: number; // 用户uid
  cntView: number; // 查看总数
  isSiteTop: number; // 是否置顶
  emojiList: Commonv1EmojiInfo[]; // emoji list
  contentUrl: string; // 内容URL
  guid: string; // 文章GUID
  nickname: string; // 用户昵称
  ctime: number; // 创建时间
  cntCollect: number; // 收藏总数
  isAllowCreateComment: number; // 是否允许创建评论
  isRecommend: number; // 是否推荐
  format: number; // 文档格式
  content: any; // 内容
  ipLocation: string; // ip定位的地址, 精确到省
  name: string; // 文章标题
  cmtGuid: string; // 社区Guid
  isReadMore: number; // 是否有readMore
  avatar: string; // 用户头像
  cntComment: number; // 回复总数
  headImage: string; // headImage
  spaceGuid: string; // 空间Guid
};

type CommunityJoinCmtWithRefRes = {
  cmtGuid: string; //
  info: string; //
};

type UserManageCommunityReq = {
  currentPage: number; // 当前页数
};

type Uploadv1GetTokenRes = {
  stsToken: string; // oss stsToken
  bucket: string; // oss bucket
  path: string; // oss object path
  cdnName: string; // oss cdnName
  expiration: string; // 过期时间，单位秒
  region: string; // region
  accessKeyId: string; // oss AkID
  accessKeySecret: string; // oss AkSecret
};

type Spacev1SpaceGroupInfo = {
  isAllowSet: boolean; // 是否允许有设置按钮
  isAllowCreateSpace: boolean; // 是否允许创建下层的空间
  guid: string; // GUID
  name: string; // 名称
  cmtGuid: string; // 社区Guid
  list: Commonv1SpaceInfo[]; // space list
  visibility: number; // 可见级别
};

type Commonv1MemberRole = {
  ctime: number; // 创建时间
  pmsManagerType: number; // pmsManagerType
  name: string; // 用户名称
  uid: number; // 用户ID
  nickname: string; // 用户昵称
  avatar: string; // 头像
};

type LoggerListPageRequest = {
  operateUid: number; //
  targetUid: number; //
  currentPage: number; // 当前页数
  event: number; //
  group: number; //
};

type ThemePutRes = {
  isCustom: boolean; // 是否自定义
  themeName: string; // 主题名称
  customColor: ThemeCustomColor; // 自定义颜色
  defaultAppearance: string; // 白天模式，暗黑模式
};

type HomePageRes = {
  isSetBanner: boolean; // 是否启用banner
  bannerImg: string; // 启用首页banner
  bannerTitle: string; // banner文案
  bannerLink: string; // banner的跳转链接
  defaultPage: string; // 默认访问页面
  articlePageList: HomeArticlePageList; // ArticlePage
  articleHot: HomeArticleHot; // ArticleHot
  activityLatest: HomeActivityLatest; // ActivityLatest
};

type Commonv1CommunityInfo = {
  access: number; // Access加入方式
  guid: string; // GUID
  description: string; // 团队描述
  editionName: string; // 版本信息
  ctime: number; // 创建时间
  name: string; // 团队名称
  domain: string; // 自定义子域名
  uid: number; // 团队创建人
  editionId: number; // 版本信息
  templateId: number; // 模板ID，只有当社区为模板，这个才有数据
  isAllowCreateSpaceGroup: number; // 是否允许创建分组
  memberCnt: number; // 成员个数
  logo: string; // LOGO
  visibility: number; // 可见级别
  type: number; // 社区类型
};

type Columnv1PermissionRes = {
  isAllowCreateComment: boolean; // 是否可以创建评论
  guid: string; // 文档GUID
  isAllowWrite: boolean; // 是否可以编辑
  isAllowDelete: boolean; // 是否可以删除
  isAllowSetComment: boolean; // 是否可以打开评论或者关闭评论
};

type Editionv1ListRes = {
  list: Editionv1EditionInfo[]; // 版本列表
};

type Communityv1PutHomeOptionRes = {};

type CommunityJoinCommunityWithRefReq = {
  ref: string; // 邀请码
};

type Pmsv1CreateRoleMemberRes = {};

type CourseUpdateLessonReq = {
  isAllowCreateComment: boolean; // 是否关闭评论, true表示关闭评论, false表示打开评论
  bizStatus: number; //
  headImage: string; // 未修改则勿赋值
  name: string; // 未修改则勿赋值
  content: any; // 未修改则勿赋值
};

type Appv1AppInfo = {
  description: string; // 应用描述
  develop: string; // 开发者
  price: number; // 收费价格
  canConfig: boolean; // 是否可配置, 如果为true, 则应用可进行社区自定义配置, 包含isEnable等配置
  isEnable: boolean; // [config]社区管理员设置为是否可使用
  appId: number; // 应用id
  name: string; // 应用名称
  icon: string; // 应用icon
  chargeType: number; // 1 免费, 2 限时免费, 3 付费
  isDefault: boolean; // 是否官方默认
  canConnect: boolean; // 是否可连接, integration 类型的app可以连接
};

type HomeArticlePageList = {
  list: Commonv1FileShow[]; // 列表
  pagination: Commonv1Pagination; // 分页
};

type ArticleCreateArticleRequest = {
  name: string; // 名称
  spaceGuid: string; // 空间GUID
  content: any; // 内容，json数据结构
  headImage: string; // 头图
};

type AppListIntgConnsReq = {};

type Medalv1MedalInfo = {
  desc: string; // 描述
  createdUid: number; // 创建者
  ctime: number; // 创建时间
  utime: number; // 更新时间
  id: number; // id
  cmtGuid: string; // 团队GUID
  name: string; // 名称
  icon: string; // 图标
};

type Uploadv1OssToken = {
  mode: string;
  list: Uploadv1Token[];
};

type Uploadv1Token = {
  region: string; // region
  accessKeyId: string; // oss AkID
  accessKeySecret: string; // oss AkSecret
  stsToken: string; // oss stsToken
  bucket: string; // oss bucket
  expiration: string; // 过期时间，单位秒
};

type MedalAwardRequest = {
  uids: number[]; //
  startTime: number; //
  endTime: number; //
  type: number; //
};

type Editionv1EditionInfo = {
  id: number; // 版本 id
  memberCnt: number; // 最大社区成员数
  adminCnt: number; // 最大社区管理员数
  spaceCnt: number; // 最大社区空间数
  transactionFees: number; // 社区的费用，数据是乘以100的百分比，如果抽0.01%，那么记录在这里是1
  monthlyPrice: number; // 每个月价格，单位分
  roleMemberCnt: number; // 用户组里的成员个数
  attachmentStorage: number; // 单位B，10 *  1024 * 1024 B
  icon: string; // icon地址
  name: string; // 版本名称
};

type Pmsv1CreateManagerMemberRes = {};

type PmsPutRoleSpaceGroupPermissionRequest = {
  list: Pmsv1SpaceGroupPmsItem[]; //
};

type CoursePoolUpdateTeacherReq = {
  avatar: string; // 头像
  title: string; // 职称头衔
  bio: string; // 简介
  name: string; // 名称
  nickname: string; // 昵称
};

type Spacev1TreeSpaceGroup = {
  guid: string; // GUID
  name: string; // 名称
  visibility: number; // 可见级别
  isAllowSet: boolean; // 是否允许有设置按钮
  isAllowCreateSpace: boolean; // 是否允许创建下层的空间
};

type FileSpaceTopsReq = {
  spaceGuid: string; //
};

type MyCollectionCreateReq = {
  collectionGroupIds: number[]; //
  guid: string; //
  type: number; //
};

type SpaceUpdateRequest = {
  spaceGroupGuid: string; // SpaceGroupGuid        string                 `json:"spaceGroupGuid" binding:"required" label:"组"`
  name: string; //
  icon: string; //
  spaceLayout: number; // 空间布局
  spaceOptions: Commonv1SpaceOption[]; // 为零值表示不修改
  price: number; //
  teachers: string[]; //
  cover: string; //
  isAllowReadMemberList: boolean; // 为零值表示不修改
  topics: string[]; //
  spaceType: number; // 空间类型
  visibility: number; // visibility
  access: number; //
  columnAuthorUid: number; //
  chargeType: number; //
  desc: string; //
  headImage: string; //
  link: string; //
};

type Commonv1UserBaseInfo = {
  nickname: string; // 用户昵称
  avatar: string; // 头像
  uid: number; // 用户ID
};

type FileListReq = {
  spaceGuid: string; //
  currentPage: number; // 当前页数
  sort: number; // 排序值
};

type MyReferralsSendChannel = {
  channel: string; // 发送通道，email、sms
  ref: string; // 邀请码
  receiver: string; // 邮箱或电话
};

type Statv1CollectionGroupInfo = {
  id: number; // 收藏夹id
  title: string; // 收藏夹标题
  desc: string; // 收藏夹说明
  isCollect: boolean; // isCollect
  cnt: number; // 总数
};

type Communityv1MemberAdminShowInfo = {
  joinTime: number; // 加入时间
  uid: number; // 用户ID
  name: string; // 名称
  nickname: string; // 用户名
  avatar: string; // 头像
  lastLoginTime: number; // 上次登录时间
};

type Commonv1UploadConf = {
  stsToken: string; // stsToken
  bucket: string; // bucket
  cdnName: string; // cdn 名称
  expiration: string; // 过期时间(秒)
  region: string; // 取悦
  accessKeyId: string; // akID
  accessKeySecret: string; // akSecret
};

type CourseChangeSortReq = {
  dropPosition: string; //
  fileGuid: string; //
  parentFileGuid: string; //
  targetFileGuid: string; //
};

type ActivityListJoinedReq = {
  currentPage: number; // 当前页数
  creatorUid: string; // 活动创建人，为空表示不限定创建人
};

type UserUpdateAvatarRequest = {
  url: string; //
};

type Pmsv1GetManagerMemberListRes = {
  list: Pmsv1MemberInfo[]; // 成员列表
};

type CommunityRefStateRes = {
  referrerUid: number; // 邀请人uid
  referrerNickname: string; // 邀请人昵称
  referrerAvatar: string; // 邀请人头像
  cmtGuid: string; // 社区Guid
  cmtName: string; // 社区名称
  cmtMemberCnt: number; // 社区人数
  joinedCmt: boolean; // 是否已加入社区
  ref: string; // 邀请码
};

type Communityv1ManageListRes = {
  list: Communityv1CommunityBaseInfo[]; // 社区列表
  pagination: Commonv1Pagination; // 分页
};

type Userv1UserInfo = {
  password: string; // 密码（根据条件返回）
  nickname: string; // 昵称
  email: string; // 邮箱
  avatar: string; // 头像
  position: string; // 职位
  activeTime: number; // 最后激活时间
  status: number; // 状态
  uid: number; // 用户UID
  identify: number; // identity
  name: string; // 用户名称
};

type SpaceCreateOrUpdateGroupRequest = {
  icon: string; //
  visibility: number; //
  isOpenReadMemberList: boolean; // 如果打开，属于这个分组下的用户，可以看到用户列表
  name: string; //
};

type Spacev1AddSpaceMemberRes = {};

type DtoCmtUserInfo = {
  isLogin: boolean; // 是否登录
  isExist: boolean; // 是否在这个社区
  isMemberShip: boolean; // 是否为会员，如果为false，那么可能是他没购买，也可能是之前购买了，但过期了
  isFirstFollow: boolean; // 是否为第一次购买，第一次请求会展示，如果购买后，会更新这个字段变为false
  expireMsg: string; // 过期信息
};

type DtoCmtDetail = {
  cmtTheme: DtoCmtTheme; //
  userInfo: DtoCmtUserInfo; // 社区的用户信息
  permission: DtoCmtPermission; // 用户所在社区的权限信息
  cmtInfo: DtoCmtInfo; // 社区信息
};

type DriveDeleteNodeReq = {
  spaceGuid: string; //
};

type PmsPutRolePermissionRequest = {
  list: Commonv1PmsItem[]; //
};

type ActivityListJoinedUsersReq = {
  currentPage: number; // 当前页数
};

type Communityv1CommunityBaseInfo = {
  guid: string; // GUID
  name: string; // 社区名称
  description: string; // 社区描述
  logo: string; // LOGO
  domain: string; // 域名
  theme: Communityv1CmtTheme; // 主题
};

type DtoCmtPermission = {
  appList: Appv1AppInfo[]; //
  isAllowManageCommunity: boolean; //
  isAllowCreateSpaceGroup: boolean; //
  isAllowCreateSpace: boolean; //
  isAllowUpgradeEdition: boolean; //
};

type PmsRoleSpacePermissionRes = {
  list: Pmsv1SpacePmsItem[]; //
};

type Loggerv1LogInfo = {
  group_name: string; // 分组名
  message: string; // 显示的一些信息，这个是需要国际化的
  operate_uid: number; // 操作人uid
  target_uid: number; // 目标uid
  target_avatar: string; // 目标头像
  id: number; // 日志id
  operate_name: string; // 操作名称
  operate_avatar: string; // 操作图表
  target_name: string; // 目标名称
  ctime: number; // 创建时间
  event_name: string; // 事件名
};

type CourseListFilesReq = {
  view: string; // 查看类型，all:查看所有课时(需要校验uid), published:只查看已发布课时
};

type Spacev1SpaceGroupInfoRes = {
  memberCnt: number; // 成员个数
  guid: string; // GUID
  name: string; // 名称
  cmtGuid: string; // 社区Guid
  iconType: number; // Icon Type
  icon: string; // Icon
  list: Commonv1SpaceInfo[]; // space list，这个里面有空间成员个数信息
  visibility: number; // 可见级别
};

type ShopOrderListReq = {
  limit: number; //
  currentPage: number; // 当前页数
  pageSize: number; // 每页总数
  sort: string; // 排序字符串
  start: number; //
};

type SpaceApplyGroupMemberRequest = {
  reason: string; //
};

type DriveCreateNodeReqItem = {
  name: string; //
  size: number; //
};

type ColumnCreateRequest = {
  parentGuid: string; //
  content: any; //
  headImage: string; //
  name: string; //
  spaceGuid: string; //
};

type FileTopicChildCommentListRequest = {
  currentPage: number; //
};

type SearchQueryReq = {
  bizType: number; // BizType 业务类型，如果为0表示搜索全部业务类型
  currentPage: number; // 当前页数
  pageSize: number; // 每页总数
  sort: string; // 排序字符串
  keyword: string; // Keyword 进行查询字符串
};

type MyCollectionDeleteReq = {
  collectionGroupIds: number[]; //
  guid: string; //
  type: number; //
};

type Spacev1DeleteSpaceMemberRes = {};

type ArticleListCoversRes = {
  list: string[]; // 封面数组
};

type MedalCreateRequest = {
  name: string; //
  icon: string; //
  desc: string; //
};

type HomePageOption = {
  title: string; //
  value: string; //
};

type WechatOauthRequest = {
  response_type: string; //
  scope: string; //
  ref: string; // 邀请码
  password: string; // password type need
  oldPassword: string; // reset password type need
  code: string; // sms type need，短信号码
  redirect_uri: string; // redirect by backend
  client_id: string; //
  state: string; //
  account: string; // password type need, sms type need,  目前只有手机号可以登录
  token: string; // 电话绑定token
  referer: string; // 当前用户访问的页面
};

type CommunityBuySpaceReq = {
  chargeMethod: number; // 支付方式，不能为空
  spaceGuid: string; // 空间Guid
};

type Spacev1DeleteSpaceRes = {};

type CommunityUpdateBannerRequest = {
  img: string; //
  title: string; //
};

type Orderv1OrderInfo = {
  orderType: number; // order type
  buyerName: string; // 买家名称
  title: string; // 标题
  totalAmount: number; // 订单总价格
  refundAmount: number; // 退款总额
  lockStatus: number; // 订单锁定状态
  orderCase: number; // orderCase
  id: number; // 订单id
  prePayAmount: number; // 预付款
  orderGoodList: Orderv1OrderGood[]; // 商品列表
  refundStatus: number; // 退款状态
  buyerPhone: string; // 买家电话
  finishedTime: number; // 完成时间
  status: number; // 状态
  payableTime: number; // 可支付时间
  sn: string; // 订单编号
  cmtGuid: string; // 社区Guid
  buyerEmail: string; // 买家邮箱
  remark: string; // 备注
  chargeMethod: number; // 支付方式
  buyerAvatar: string; // 冗余字段，买家头像
  freightFee: number; // 实际支付的运费
  tradeNo: string; // 第三方支付机构交易号
  createdAt: number; // 创建时间
  ext: Orderv1OrderExtend; // 扩展字段
  code: string; // 邀请码
  buyerId: number; // 买家信息
  chargeTime: number; // 支付时间
  chargeSn: string; // 支付单号
};

type SpaceDeleteMemberRequest = {
  delUids: number[]; //
};

type PmsCreateRoleRequest = {
  name: string; //
};

type AppMatcher = {
  id: string; //
  options: string; //
};

type FileRecommendsReq = {
  spaceGuid: string; //
};

type SpaceTreeChangeSortRequest = {
  spaceGroupGuid: string; //
  type: number; //
  targetSpaceGuid: string; //
  targetSpaceGroupGuid: string; //
  parentSpaceGroupGuid: string; //
  dropPosition: string; //
  spaceGuid: string; //
};

type FileCreateCommentReq = {
  commentGuid: string; //
  content: string; //
  guid: string; //
};

type ShopGoodCreateReq = {
  showPrice: number; //
  html: string; //
  specList: Goodv1GoodSpecInfo[]; //
  subTitle: string; //
  saleTime: number; //
  imageSpecId: number; //
  freightFee: number; //
  freightId: number; //
  endTime: number; //
  skuList: Goodv1GoodSku[]; //
  worksDesc: string; //
  title: string; //
  cover: string; //
  stock: number; //
  saleNum: number; //
  preHtml: string; //
  wechatHtml: string; //
  cidList: number[]; //
  galleryList: string[]; //
  preMarkdown: string; //
  cmtGuid: string; //
  homeCover: string; //
  artistDesc: string; //
  groupSaleNum: number; //
  price: number; //
  showOriginPrice: number; //
  payType: number; //
  baseSaleNum: number; //
  originPrice: number; //
  markdown: string; //
  onlineTime: number; //
  name: string; //
};

type SpaceApplyMemberRequest = {
  reason: string; //
};

type CommunitySearchMemberReq = {
  keyword: string; // 当前页数
  spaceGuid: string; // 空间guid，可以为空
  sort: string; // 排序字符串
  currentPage: number; // 当前页数
  pageSize: number; // 每页总数
};

type Spacev1CreateSpaceRes = {
  info: Commonv1SpaceInfo; // 创建的 Space
};

type BillingListPageRequest = {
  currentPage: number; // 当前页数
};

type DtoCmtInfo = {
  access: number; //
  memberCnt: number; //
  isSetPrice: boolean; //
  annualOriginPrice: number; //
  firstVisitUrl: string; // 第一次访问的URL
  isCustomDomain: boolean; //
  visibility: number; //
  activeTime: number; //
  annualPrice: number; //
  isStarter: boolean; //
  gongxinbuBeian: string; //
  name: string; // 团队名称
  uid: number; // 团队创建人
  editionId: number; //
  isSetHome: boolean; //
  ctime: number; //
  isShowSidebar: boolean; // 是否展示sidebar
  cmtGuid: string; // GUID
  description: string; // 团队描述
  logo: string; // LOGO
  editionName: string; //
};

type MyCollectionGroupCreateReq = {
  title: string; //
  desc: string; //
};

type Commonv1FileInfo = {
  name: string; // 名称
  cntComment: number; // 回复总数
  contentUrl: string; // 内容url
  list: Commonv1EmojiInfo[]; // emoji info
  id: number; // 文件节点ID
  cmtGuid: string; // 社区GUID
  size: number; // 文件大小
  status: number; // 文件状态
  cntCollect: number; // 收藏总数
  headImage: string; // head image
  isAllowCreateComment: number; // 是否允许创建评论
  contentKey: string; // 内容key
  createdUid: number; // 创建人用户ID
  updatedUid: number; // 更新人用户ID
  type: number; // 文件类型
  format: number; // 文件格式
  sort: number; // 排序号
  guid: string; // GUID
  ctime: number; // 创建时间
  utime: number; // 更新时间
  cntView: number; // 查看总数
  node: number; // 节点类型
  parentGuid: string; // 父节点guid
  bizStatus: number; // 业务状态
  ipLocation: string; // ip定位的地址, 暂时精确到省
};

type Spacev1MemberStatus = {
  spaceGuid: string; // 空间guid
  uid: number; // 用户uid
  isMember: boolean; // 用户是否是空间成员
  isAllowManage: boolean; // 用户是否可以管理
};

type PmsMemberInfo = {
  nickname: string; // 用户昵称
  avatar: string; // 用户头像
  email: string; // 用户email
  ctime: number; // 创建时间
  uid: number; // 用户uid
};

type Loggerv1GroupInfo = {
  group: number; // 分组
  name: string; // 名称
};

type AppCmtRequest = {
  enable: boolean; //
};

type AppCreateIntgConnsReq = {
  appId: number; //
};

type Commonv1EmojiInfo = {
  id: number; // ID
  emoji: string; // 表情编码
  cnt: number; // 计数
};

type Commonv1FileShow = {
  contentUrl: string; // 内容URL
  ipLocation: string; // ip定位的地址, 暂时精确到省
  guid: string; // 文章GUID
  cntComment: number; // 回复总数
  cntView: number; // 查看总数
  headImage: string; // headImage
  spaceGuid: string; // 空间Guid
  name: string; // 文章标题
  avatar: string; // 用户头像
  cntCollect: number; // 收藏总数
  format: number; // 文档格式
  content: string; // 为了速度快，不得不搞这个content，如果是列表就有他，如果不是列表就没他
  uid: number; // 用户uid
  nickname: string; // 用户昵称
  ctime: number; // 创建时间
  isAllowCreateComment: number; // 是否允许创建评论
  emojiList: Commonv1EmojiInfo[]; // emoji list 文章的数据个数
  username: string; // 用户名
  cmtGuid: string; // 社区Guid
  isSiteTop: number; // 是否置顶
  isRecommend: number; // 是否推荐
};

type ColumnSidebarChangeSortRequest = {
  fileGuid: string; //
  targetFileGuid: string; //
  dropPosition: string; //
  parentFileGuid: string; //
};

type FileIncreaseEmojiRequest = {
  emojiId: number; //
};

type Goodv1GoodInfo = {
  subTitle: string; // 子标题
  preHtml: string; // preHtml
  cmtGuid: string; // 社区Guid
  groupSaleNum: number; // groupSaleNum
  wechatHtml: string; // wechatHtml
  skuList: Goodv1GoodSku[]; // sku list
  specList: Goodv1GoodSpecInfo[]; // 规格参数，json格式
  worksDesc: string; // worksDesc
  name: string; // 名称
  cntStar: number; // cntStar
  cntComment: number; // cntComment
  preMarkdown: string; // preMarkdown
  limitTimes: number; // limitTimes
  limitNum: number; // limitNum
  html: string; // html
  id: number; // id
  createdUid: number; // 创建人Uid
  saleTime: number; // saleTime
  freightId: number; // freightId
  imageSpecId: number; // bool isOnSale = 21;
  markdown: string; // markdown
  updatedUid: number; // 更新人Uid
  saleNum: number; // saleNum
  showPrice: number; // showPrice
  copyrightName: string; // copyrightName
  tag: number; // 标签
  cntCollect: number; // cntCollect
  freightFee: number; // freightFee
  baseSaleNum: number; // baseSaleNum
  price: number; // price
  onlineTime: number; // onlineTime
  issuerLogo: string; // issuerLogo
  endTime: number; // 结束时间
  title: string; // 标题
  stock: number; // stock
  artistDesc: string; // artistDesc
  copyrightLogo: string; // copyrightLogo
  issuerName: string; // issuerName
  editStatus: number; // 商品编辑状态
  showOriginPrice: number; // showOriginPrice
  cidList: number[]; // cidList
  cntView: number; // cntView
  cntShare: number; // cntShare
  cover: string; // 封面
  galleryList: string[]; // galleryList
  payType: number; // payType
  originPrice: number; // originPrice
  status: number; // 商品状态
  homeCover: string; // 首页封面
  skuId: number; // skuId
};

type Chargev1CreateRefundRes = {
  refundSn: string; // 退款SN
  refundId: string; // 第三方的退款ID，如微信退款ID
  refundStatus: number; // 状态
};

type Pmsv1PutRoleSpacePermissionRes = {};

type Columnv1ListPermissionRes = {
  list: Columnv1PermissionRes[]; // 权限列表
};

type ProfileUserTotalRes = {
  nickname: string; //
  name: string; //
  avatar: string; //
  registerTime: number; //
  followingCnt: number; //
  followerCnt: number; //
  hasFollowed: boolean; //
  uid: number; //
};

type ShopGoodUpdateReq = {};

type ThemeGetRes = {
  customColor: ThemeCustomColor; // 自定义颜色
  defaultAppearance: string; // 白天模式，暗黑模式
  isCustom: boolean; // 是否自定义
  themeName: string; // 主题名称
};

type ActivityQuitReq = {};

type ShopGoodListReq = {
  currentPage: number; // 当前页数
  pageSize: number; // 每页总数
  sort: string; // 排序字符串
};

type Communityv1TemplateInfo = {
  id: number; // 模板id
  cmtGuid: string; // 模板的社区GUID
  name: string; // 名称
  description: string; // 描述
  cover: string; // 封面
  icon: string; // 图标
};

type Pmsv1GetRoleIdsRes = {
  roleIds: number[]; // 角色id列表
};

type CourseUpdateSectionReq = {
  headImage: string; //
  name: string; //
  bizStatus: number; //
};

type ProfileQAListReq = {
  currentPage: number; // 当前页数
  pageSize: number; // 每页总数
  sort: string; // 排序字符串
};

type CommunityReferralCode = {
  url: string; //
};

type ActivityListByGuidsReq = {
  fileGuids: string[]; //
};

type Spacev1DeleteSpaceGroupRes = {};

type Pmsv1UpdateRoleRes = {};

type AppProperty = {
  id: string; //
  value: any; //
};

type CourseCreateSectionReq = {
  name: string; //
  headImage: string; //
};

type HomeListReq = {
  currentPage: number; // 当前页数
};

type Commentv1CommentDetail = {
  isReply: number; // 是否是回复信息
  children: Commentv1CommentDetail[]; // 默认两条
  hasMoreChildComment: boolean; // 子评论
  userAvatar: string; // 头像像
  replyToGuid: string; // 回复的reply to comment id
  replyToRootGuid: string; // 回复的根评论id。 a评论，b回复了a，c回复了b，那么c的reply to root id，为根的id信息
  replyNickname: string; // 回复用户昵称
  cntStar: number; // 点星总数
  actionGuid: string; // actionGuid
  content: string; // 内容
  bizGuid: string; // 业务Guid
  userNickname: string; // 昵称
  replyToUid: number; // 回复用户Uid
  replyAvatar: string; // 回复用户头像
  starStatus: number; // 点赞状态 1为点赞 0不点赞
  ctime: number; // 时间
  actionType: number; // 文章行为
  commentGuid: string; // 评论id 也作为pageSeq使用
  cntChildComment: number; // 子评论总数
  uid: number; // 用户Uid
  ipLocation: string; // ip定位的地址, 暂时精确到省
  bizType: number; // 业务类型
};

type PmsCreateRoleMemberRequest = {
  uids: number[]; //
};

type CoursePoolCreateTeacherReq = {
  avatar: string; // 用户头像
  title: string; // 用户职称头衔
  bio: string; // 用户简介
  name: string; // 用户名称
};

type ProfileArticlesListReq = {
  currentPage: number; // 当前页数
  pageSize: number; // 每页总数
  sort: string; // 排序字符串
};

type DriveCreateNodeResItem = {
  name: string; //
  guid: string; //
  code: number; //
  msg: string; //
  uploadPath: string; //
};

type Orderv1OrderGood = {
  goodSkuId: number; // 商品ID
  groupPrice: number; // 拼团价格 just价格，一般和实际支付价格一致
  payTotal: number; // 一般是 payPrice * count - 优惠。目前没有优惠信息
  img: string; // 图片
  title: string; // 商品名称
  price: number; // 商品价格 just价格
  goodId: number; // 商品主表ID
  orderId: number; // 订单ID
  specList: string; // 规格
  goodType: number; // 商品类型
  goodFreightWay: number; // 商品运费方式
  id: number; // 主键
  buyerId: number; // buyerId
  cmtGuid: string; // 社区Guid
  payPrice: number; // 商品实际支付价格(拼团商品适用)
  goodFreightFee: number; // 商品的运费
  captainPrice: number; // 团长价格 just价格，一般和实际支付价格一致
  priceType: number; // 价格类型
  num: number; // 购买数量
};

type MyCollectionGroupUpdateReq = {
  title: string; //
  desc: string; //
};

type Filev1PermissionListRes = {
  list: Filev1PermissionRes[]; // 权限列表
};

type Coursev1CourseInfo = {
  space: Commonv1SpaceInfo; // 空间基础数据
  spaceGuid: string; // 空间guid
  teachers: Coursev1Teacher[]; // 讲师列表
  lessonsCnt: number; // 课时总计
  myCompletionRate: any; // 我的完成比率
  averageCompletionRate: any; // 平均完成比率
  myCompletedLessons: string[]; // 我完成的课时guid列表
  utime: number; // 更新时间
  sectionsCnt: number; // 章节总计
  studentsCnt: number; // 参与学生总计
  CreatedBy: number; // 创建人
  UpdatedBy: number; // 更新人
};

type SpaceSearchMemberRequest = {
  keyword: string; // 当前页数
};

type ShopRefundCreateReq = {
  amount: number; //
  reason: string; //
  orderSn: string; //
  chargeSn: string; //
};

type ColumnListPermissionRequest = {
  spaceGuid: string; //
};

type Userv1ProfileInfoRes = {
  intro: string; // 介绍
  sex: number; // 性别
  registerTime: number; // 注册时间
  nickname: string; // 用户昵称
  identifyStatus: number; // identifyStatus
  avatar: string; // 用户头像
  birthday: number; // 生日
  name: string; // 用户名称
  uid: number; // 用户UID
  email: string; // 用户邮箱
};

type AppFieldConfig = {
  defaults: any; //
  overrides: AppOverride[]; //
};

type FileStatRes = {
  emojiList: DtoMyEmojiInfo[]; //
  collectList: DtoMyCollectInfo[]; //
};

type Loggerv1EventInfo = {
  event: number; // 事件
  name: string; // 名称
};

type QuestionUpdateArticleRequest = {
  name: string; //
  content: any; //
};

type Pmsv1DeleteManagerMemberRes = {};

type Pmsv1GetRoleMemberListRes = {
  list: Pmsv1MemberInfo[]; // 成员列表
};

type FileStatReq = {
  fileGuids: string[]; //
};

type CommunityUpdateRequest = {
  name: string; //
  logo: string; //
  visibility: number; //
};

type Goodv1GoodSpecInfo = {
  valueList: Goodv1GoodSpecValueInfo[]; // valueList
  cmtGuid: string; // 社区Guid
  id: number; // id
  name: string; // name
};

type Pmsv1GetRoleListRes = {
  list: Pmsv1RoleInfo[]; // 角色列表
};

type Totalv1ListRes = {
  x: string[]; // X轴字段名称
  y: number[]; // Y轴字段值
};

type MyNotificationUpdateAllReq = {
  status: number; //
};

type FileDecreaseEmojiRequest = {
  emojiId: number; //
};

type MyCollectionInfo = {
  id: number; // id
  uid: number; // 收藏人Uid
  cmtGuid: string; // 社区Guid
  collectionGroupIds: number[]; // 需要添加的收藏夹ID列表
  bizGuid: string; // 业务Guid
  bizType: number; // 业务类型
  bizItem: any; // 业务实例
};

type SpaceGroupMemberListRequest = {
  currentPage: number; // 当前页数
};

type Pmsv1SpaceGroupPmsItem = {
  guid: string; // guid 信息
  name: string; // 名称
  //名称
  list: Commonv1PmsItem[]; // space group 里面的权限列表
};

type PmsDeleteRoleMemberRequest = {
  uids: number[]; //
};

type Coursev1ChangeSortRes = {};

type ProfileFollowerItem = {
  nickname: string; // 昵称
  avatar: string; // 头像
  uid: number; // 用户UID
  name: string; // 用户名称
  followersCnt: number; // 被多少人关注
  followingCnt: number; // 关注的人总数
  email: string; // 邮箱
  identify: number; // identity
  hasFollowed: boolean; // 当前用户是否关注
};

type FileBatchGetUrlsReq = {
  spaceGuid: string; //
  contentKeys: string[]; //
  uploadType: number; //
};
