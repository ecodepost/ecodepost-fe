import {useEffect, useRef, useState} from 'react';
import useRequestX from '@/hooks/useRequestX';
import {
  GetApiFiles,
  GetApiFilesGuidSubList,
  GetApiFilesPermissions,
  GetApiFilesRecommends,
  GetApiFilesSpaceTops,
  GetApiFilesStats,
} from '@/services/base/api.gen';
import {FileSortType} from '@/enums/sort';
import {RadioChangeEvent} from 'antd';

export interface FileListRequestOption {
  // 空间GUID
  spaceGuid?: string;
  // File GUID
  fileGuid?: string;
}

export function useRequestFileList(currentUser: MyUserInfo, option: FileListRequestOption) {
  const [isRenderList, setRenderList] = useState<boolean>(false);
  const [fileListLoading, setLoading] = useState<boolean>(true);
  const [fileList, setFileList] = useState<Commonv1FileShow[]>();
  const [fileSpaceTopList, setFileSpaceTopList] = useState<Commonv1FileShow[]>();
  const [fileRecommendList, setFileRecommendList] = useState<Commonv1FileShow[]>();
  const [total, setTotal] = useState<number>(0);
  const [myFileStats, setMyFileStats] = useState<FileStatRes>();
  const [filePmsList, setFilePmsList] = useState<Filev1PermissionRes[]>([]);
  const { spaceGuid, fileGuid } = option;
  const pageStateRef = useRef(null);
  const sortTypeStateRef = useRef(null);
  const GetApiFilesStatsRequest = useRequestX(GetApiFilesStats, {
    onSuccess: (res) => {
      setMyFileStats(res.data);
    },
  });

  const GetApiFilesRequest = useRequestX(GetApiFiles);
  const GetApiFilesSubRequest = useRequestX(GetApiFilesGuidSubList);

  const fetchFileList = async (initPage?: number, sortTypeValue?: FileSortType) => {
    let res;
    if (initPage == 1) {
      pageStateRef.current = 1;
    }

    if (spaceGuid) {
      res = await GetApiFilesRequest.run({
        spaceGuid,
        currentPage: pageStateRef.current,
        sort: sortTypeValue ? sortTypeValue : sortTypeStateRef.current,
      });
    } else {
      res = await GetApiFilesSubRequest.run(fileGuid, {
        currentPage: pageStateRef.current,
        sort: sortTypeValue ? sortTypeValue : sortTypeStateRef.current,
      });
    }

    if (res.code !== 0) {
      return [];
    }

    if (res.data.list === null) {
      if (res.pagination.currentPage == 1) {
        setFileList((prev) => []);
        return;
      } else {
        return [];
      }
    }
    if (total !== res.pagination?.total) setTotal(() => res.pagination?.total);

    if (initPage) {
      setFileList(res.data?.list || []);
    } else {
      setFileList((prve) => [...prve, ...(res.data?.list || [])]);
      const fileGuids = res.data?.list?.map((item) => item.guid);
      GetApiFilePermissionsRequest.run({guids: fileGuids});
    }
    pageStateRef.current += 1;
    return res.data?.list || [];
  };

  const GetApiFileSpaceTopsRequest = useRequestX(() => GetApiFilesSpaceTops({ spaceGuid }), {
    onSuccess: (res) => {
      setFileSpaceTopList(res.data?.list || []);
    },
  });

  const fetchSpaceSitetopList = async () => {
    if (!spaceGuid) {
      return [];
    }
    const res = await GetApiFileSpaceTopsRequest.run();
    if (res.code !== 0) {
      return [];
    }
    return res.data.list;
  };

  const fetchRecommendList = async () => {
    if (!spaceGuid) {
      return [];
    }
    const res = await GetApiArticlesRecommendsRequest.run();
    if (res.code !== 0) {
      return [];
    }
    return res.data.list;
  };

  const GetApiArticlesRecommendsRequest = useRequestX(() => GetApiFilesRecommends({ spaceGuid }), {
    onSuccess: (res) => {
      setFileRecommendList(res.data?.list || []);
    },
  });

  const GetApiFilePermissionsRequest = useRequestX(GetApiFilesPermissions, {
    onSuccess: (res) => {
      setFilePmsList((prev) => [...prev, ...(res.data?.list || [])]);
    },
  });

  const fetchAllArticles = async () => {
    // 这里要返回数据，合并list，再去获取各个文件的状态，以及权限情况
    const [siteTopList, innerArticleList] = await Promise.all([
      fetchSpaceSitetopList(),
      fetchFileList(1, FileSortType.SORT_CREATE_TIME),
    ]);

    const list = [
      ...(Array.isArray(siteTopList) ? siteTopList : []),
      ...(Array.isArray(innerArticleList) ? innerArticleList : []),
    ];

    setRenderList(true);
    setLoading(false);
    // 当用户存在的时候才请求这两个接口
    if (currentUser && list.length > 0) {
      const fileGuids = list.map((item) => item.guid);
      GetApiFilesStatsRequest.run({fileGuids});
      GetApiFilePermissionsRequest.run({guids: fileGuids});
      // 当用户不存在的时候需要默认给stats，让组件加载
    } else {
      setMyFileStats({
        collectList: [],
        emojiList: [],
      });
    }
  };

  const onChangeSortType = async ({ target: { value } }: RadioChangeEvent) => {
    pageStateRef.current = 1;
    sortTypeStateRef.current = value;
    fetchFileList(1, value);
  };

  useEffect(() => {
    pageStateRef.current = 1;
    fetchAllArticles();
    if (spaceGuid) {
      GetApiArticlesRecommendsRequest.run();
    }
    return () => {
      setRenderList(false);
      setFileList(undefined);
    };
  }, [currentUser, spaceGuid]);

  return {
    isRenderList,
    fileListLoading,
    fileList,
    fileSpaceTopList,
    fileRecommendList,
    filePmsList,
    myFileStats,
    onChangeSortType,
    total,
    fetchFileList,
    GetApiArticlesRecommendsRequest,
    fetchSpaceSitetopList,
    fetchRecommendList,
  };
}
