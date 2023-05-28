import { useState} from 'react';
import {useRequest} from 'ahooks';
import {ChosenSpaceGroupType, ChosenSpaceType} from '@/pages/typings';
import {GetApiCmtDetail, GetApiCmtSpaceAll} from '@/services/base/api.gen';
import {messageInfo} from '@/components/Message/Message';
import {useModel} from '@@/exports';
import {nanoid} from 'nanoid';
import useRequestX from '@/hooks/useRequestX';
import {ArrToSpaceAll} from '@/utils/arr';



export type CmtInfo = DtoCmtDetail & {
  uuid: string;
  err?: {
    code: number;
    data: any;
    msg: string;
  };
};

export type AntSpaceInfo = Spacev1TreeSpace;
export type AntSpaceGroupInfo = Spacev1TreeSpaceGroup & {
  children: AntSpaceInfo[];
};
export type AntSpaceAll = {
  spaceList: AntSpaceInfo[];
  spaceGroupList: AntSpaceGroupInfo[];
  tree: AntSpaceGroupInfo[];
};

export default () => {
  const [currentCommunityLoading, setCurrentCommunityLoading] = useState<boolean>();
  const [currentCmt, setCurrentCmt] = useState<CmtInfo>();
  /** 选中的space的guid */
  const [selectedSpace, setSelectedSpaceState] = useState<ChosenSpaceType>(undefined);
  const { setName } = useModel('header');
  const [spaceAll, setSpaceAll] = useState<AntSpaceAll>();
  /** 选中的space group的guid */
  const [selectedSpaceGroup, setSelectedSpaceGroupState] = useState<ChosenSpaceGroupType>({
    guid: '',
    name: '',
  });
  // 存储space，group的map信息
  const [spaceMap, setSpaceMap] = useState<Map<string, Commonv1SpaceInfo>>(new Map());
  const [spaceGroupMap, setSpaceGroupMap] = useState<Map<string, Spacev1TreeSpaceGroup>>(new Map());

  // 获取空间数据
  const GetApiCmtSpaceAllReq = useRequestX(GetApiCmtSpaceAll, {
    onSuccess: ({ code, data, msg }) => {
      setSpaceMap(new Map(data?.spaceList?.map((item) => [item.guid, item]) || []));
      setSpaceGroupMap(new Map(data?.spaceGroupList?.map((item) => [item.guid, item]) || []));
      setSpaceAll(
        ArrToSpaceAll(data.spaceList as AntSpaceInfo[], data.spaceGroupList as AntSpaceGroupInfo[]),
      );
    },
  });


  const getCommunityCurrentRequest = useRequest(GetApiCmtDetail, {
    manual: true,
    onBefore: () => {
      setCurrentCommunityLoading(true);
    },
    onSuccess: ({ code, data, msg }) => {
      console.log('code', code);
      const uuid = nanoid();
      // 当获取不到社区，可能是一些报错数据，将这个code信息记录下来，在页面里提示
      if (code !== 0) {
        setCurrentCmt({
          uuid: uuid,
          cmtInfo: undefined,
          cmtTheme: undefined,
          permission: undefined,
          userInfo: undefined,
          err: {
            code: code,
            msg: msg,
            data: data,
          },
        });
        setCurrentCommunityLoading(false);
        return;
      }

      console.log('cmt inner info', {
        uuid: uuid,
        ...data,
      });
      setCurrentCmt({
        uuid: uuid,
        ...data,
      });

      // 存社区信息
      // setTheme(data.cmtTheme);
      setCurrentCommunityLoading(false);
    },
    onError: (err) => {
      messageInfo({
        content: `失败. ${err}`,
        type: 'error',
      });
    },
  });

  // 清除chosen space
  const clearSelectedSpace = () => {
    setSelectedSpaceState(undefined);
  };
  // 清除chosen space
  const clearSelectedSpaceGroup = () => {
    setSelectedSpaceGroupState({
      guid: '',
      name: '',
    });
  };

  const resetCommunityModel = () => {
    clearSelectedSpaceGroup();
    clearSelectedSpace();
    setSpaceAll(undefined);
    setSpaceMap(new Map());
    setSpaceGroupMap(new Map());
    // setSpaceTreeLoading(true);
    // setCmtPms(undefined);
  };

  const refreshCommunityModel = () => {
    getCommunityCurrentRequest.run();
  };

  // 这个要等space tree加载完了，才能执行
  const setSelectedSpace = (spaceGuid: string) => {
    console.log('setSelectedSpace', spaceGuid);
    const spaceChosenInfo = spaceMap.get(spaceGuid);
    if (spaceChosenInfo) {
      const groupInfo = spaceGroupMap.get(spaceChosenInfo.spaceGroupGuid);
      setSelectedSpaceGroupState(groupInfo);
      setName(spaceChosenInfo.name);
      setSelectedSpaceState({
        ...spaceChosenInfo,
        isExist: true,
      });
    } else {
      setSelectedSpaceState({
        isExist: false,
        groupGuid: '',
        guid: '',
        name: '',
        spaceLayout: 0,
        spaceType: 0,
        visibility: 0,
        access: 0,
      });
    }
  };

  const setSelectedSpaceGroup = (spaceGroupGuid: string) => {
    const spaceChosenInfo = spaceGroupMap.get(spaceGroupGuid) as ChosenSpaceGroupType;
    if (spaceChosenInfo) {
      setSelectedSpaceGroupState(spaceChosenInfo);
      clearSelectedSpace();
    }
  };

  const getCurrentTitle = (
    title_base,
    title_other?: { title_search; title_course; title_group; title_setting; title_home },
  ) => {
    let base = '';
    if (currentCmt?.cmtInfo?.isShowSidebar) {
      base = currentCmt?.cmtInfo?.name + ' - ' + title_base;
    } else {
      base = ' - ' + currentCmt?.cmtInfo?.name;
    }

    if (title_other && title_other.title_home) {
      return title_other.title_home + ' - ' + base;
    }

    if (title_other && title_other.title_search) {
      return title_other.title_search + ' - ' + base;
    }

    if (title_other && title_other.title_course) {
      return title_other.title_course + ' - ' + base;
    }

    // URL 里包含了 /admin/setting
    if (document.URL.includes('/admin/setting')) {
      return title_other.title_setting + ' - ' + base;
    }

    if (title_other && title_other.title_group) {
      return selectedSpaceGroup.name + ' - ' + base;
    }

    if (selectedSpace) {
      base = selectedSpace.name + ' - ' + base;
    }

    return base;
  };

  return {
    currentCmt,
    getCommunityCurrentRequest,
    spaceAll,
    GetApiCmtSpaceAllReq,
    setSelectedSpace,
    clearSelectedSpace,
    selectedSpace,
    setSelectedSpaceGroup,
    clearSelectedSpaceGroup,
    selectedSpaceGroup,
    spaceMap,
    spaceGroupMap,
    resetCommunityModel,
    refreshCommunityModel,
    currentCommunityLoading,
    getCurrentTitle,
  };
};
