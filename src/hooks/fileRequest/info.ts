import useRequestX from "@/hooks/useRequestX";
import {GetApiFilesGuid, GetApiFilesGuidPermission, GetApiFilesStats} from "@/services/base/api.gen";
import {useEffect, useState} from "react";

export function useRequestFileInfo(fileGuid: string) {
  const [article, setArticle] = useState<DtoFileShow>();
  const [selectedEmojis, setSelectedEmojis] = useState<number[]>();
  const [fileStat, setFileStat] = useState<{ isCollect: boolean }>({
    isCollect: false
  });
  const [defaultValue, setDefaultValue] = useState<any>(undefined);
  const [articlePms, setArticlePms] = useState<DtoFilePermission>();
  const [fileLoading, setFileLoading] = useState<boolean>(true)

  // 文章的权限
  const GetApiArticlesGuidPermissionRequest = useRequestX(() => GetApiFilesGuidPermission(fileGuid), {
    onSuccess: (res) => {
      setArticlePms(res.data);
    }
  })

  // 文章的状态
  const GetApiFilesStatsRequest = useRequestX(() => GetApiFilesStats({
    fileGuids: [fileGuid],
  }), {
    onSuccess: (res) => {
      const fileEmoji = res.data.emojiList.find((item) => {
        return item.guid === fileGuid;
      });
      const fileCollect = res.data.collectList.find((item) => {
        return item.guid === fileGuid;
      });

      // 找到对应的选中的表情ids
      // list是undefined可能为空
      setSelectedEmojis(fileEmoji ? fileEmoji.list ? fileEmoji.list.map((item) => item.id) : [] : []);
      setFileStat({
        isCollect: fileCollect?.isCollect || false,
      })
    }
  })


  const contentProcess = (format, remoteContentParam) => {
    if (format == 3) {
      if (typeof remoteContentParam === 'object') {
        return remoteContentParam;
      } else if (typeof remoteContentParam === 'string') {
        return JSON.parse(remoteContentParam);
      }
    } else {
      return ""
    }
  };


  // 文章的信息
  const GetApiArticlesGuidRequest = useRequestX(() => GetApiFilesGuid(fileGuid), {
    beforeRequest: () => {
      setFileLoading(true)
    },
    onSuccess: (fileRes) => {
      setArticle(fileRes.data);
      setDefaultValue(contentProcess(fileRes.data.format, fileRes.data.content))
      setFileLoading(false)
    }
  })
  console.log("fileRes.data1", article)
  console.log("fileRes.data2", defaultValue)

  useEffect(() => {
    GetApiArticlesGuidRequest.run();
    GetApiFilesStatsRequest.run();
    GetApiArticlesGuidPermissionRequest.run();
  }, [fileGuid]);

  return {
    fileLoading,
    article,
    defaultValue,
    selectedEmojis,
    GetApiArticlesGuidRequest,
    articlePms,
    fileStat,
  }
}
