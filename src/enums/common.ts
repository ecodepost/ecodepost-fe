export enum SpaceAccess {
  // 未知类型
  INVALID,
  // 可公开访问，（管理员仍可手动添加），任何能进入到社区的用户都能访问此空间
  OPEN = 1,
  // 私密访问，外部用户禁止进入空间（管理员仍可手动添加）
  DENY_ALL = 2,
  // 私密访问，外部用户主动申请（管理员仍可手动添加），才能加入此空间
  USER_APPLY = 3,
  // 私密访问，外部用户购买资格（管理员仍可手动添加），才能加入此空间
  USER_PAY = 4,
}

export enum NotificationType {
  // 未知类型
  INVALID = 0,
  // 系统通知
  SYSTEM = 1,
  // 团队加入邀请
  INVITE = 3,
  // 活动通知
  ACTIVITY = 4,
  // 审核通知
  AUDIT = 5,
  // At user
  USER = 6,
  // Comment
  COMMENT = 7,
  // 申请加入空间
  APPLY_SPACE = 8,
  // 申请加入空间分组
  APPLY_SPACE_GROUP = 9,
  // 新回答
  NEW_ANSWER = 10,
  // 订单通知
  ORDER = 11,
}

export enum FileBizStatus {
  // 未知类型
  INVALID = 0,
  // 草稿
  DRAFT = 1,
  // 发布
  PUBLISH = 2,
}
