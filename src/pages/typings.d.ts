import {SpaceType} from '@/enums/spacetype';

interface FileProps {
  selectedSpace: ChosenSpaceType;
  spacePms: Spacev1GetSpacePermissionByUidResponse;
}

interface EmojiItem {
  emoji: string;
  id: number;
  cnt?: number;
}

interface Group {
  cmtGuid: string;
  guid: string;
  iconType: number;
  icon: string;
  name: string;
  list: Space[];
  level: number;
  type?: 'group';
  memberCnt?: number;
  visibility: number;
  isAllowCreateSpace: number;
  isAllowSet: number;
  isOpenReadMemberList: boolean;
}

interface Space {
  isExist: boolean;
  cmtGuid: string;
  guid: string;
  iconType: number;
  name: string;
  icon: string;
  spaceType: number;
  spaceLayout: number;
  groupGuid?: string;
  type?: 'space';
  // memberCnt?: number;
  visibility: number;
  isAllowSet: number;
  access: number;
  emojiList: EmojiItem[];
  link: string;
  headImage: string;
}

interface ChosenSpaceType {
  isExist: boolean; // 是否存在
  guid: string;
  name: string;
  spaceType: number;
  spaceLayout: number;
  groupGuid?: string;
  visibility: number;
  access: number;
  isAllowSet: number;
  spaceOptions: Commonv1SpaceOption[]; // Option
  headImage: string; // 头图
}

interface ChosenSpaceGroupType {
  guid: string;
  name: string;
}

interface SpaceOptions {
  name: string;
  spaceOptionId: number;
  spaceOptionType: number;
  value: number;
}

interface ArticlePms {
  guid: string;
  isAllowDelete?: boolean;
  isAllowRecommend?: boolean;
  isAllowSetComment?: boolean;
  isAllowSiteTop?: boolean;
  isAllowWrite?: boolean;
  isAllowCreateComment?: boolean;
}

type AppInfo = {
  appId: SpaceType;
  name: string;
};

interface LayoutSpaceProps {
  selectedSpace: ChosenSpaceType;
  spacePms: Spacev1GetSpacePermissionByUidRes;
}

interface LayoutFileProps {
  selectedSpace: ChosenSpaceType;
  spacePms: Spacev1GetSpacePermissionByUidRes;
  fileGuid: string;
}

interface LayoutSubFileProps {
  selectedSpace: ChosenSpaceType;
  spacePms: Spacev1GetSpacePermissionByUidRes;
  fileGuid: string;
  subFileGuid: string;
}
