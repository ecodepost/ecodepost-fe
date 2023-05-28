export enum SpaceType {
  INVALID = 0,
  ARTICLE = 1,
  QUESTION = 2,
  COLUMN = 6,
  LINK = 9,
}

export enum UploadType {
  // 无效枚举值
  INVALID = 0,
  // 头像
  AVATAR = 1,
  // 社区
  COMMUNITY = 2,
  // 空间
  SPACE = 3,
  // 通用FILE
  FILE = 4,
  // 通用FILE
  FILE_HEAD_IMAGE = 5,
  // 勋章
  MEDAL = 7,
  // 社区banner图
  COMMUNITY_BANNER = 8,
  // 云盘文件
  DRIVE_FILE = 9,
  // IM的图片
  CMN_TYPE_IM_PICTURE = 10,
  // IM的视频
  CMN_TYPE_IM_VIDEO = 11,
  // IM的文件
  CMN_TYPE_IM_FILE = 12,
}

export type PaneType = {
  pane: string;
  paneId: string;
  paneType: number;
  start?: number;
  end?: number;
  keyword?: string;
  activeTabKey?: string;
  activeIndex?: number;
  queryType?: string;
  page?: number;
  pageSize?: number;
  querySql?: string;
  desc: string;
  histogramChecked: boolean;
  foldingChecked: boolean;
  mode?: number;
  logState: number;
  relTraceTableId: number;
};
