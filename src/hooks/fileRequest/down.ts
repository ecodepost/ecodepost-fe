import useRequestX from '@/hooks/useRequestX';
import { GetApiFilesGuid, GetApiFilesGuidPermission } from '@/services/base/api.gen';
import { useEffect, useState } from 'react';

export function useRequestFileDown(fileGuid: string) {
  const [file, setFile] = useState<DtoFileShow>();
  const [articlePms, setArticlePms] = useState<DtoFilePermission>();

  // 文件的权限
  const GetApiArticlesGuidPermissionRequest = useRequestX(
    () => GetApiFilesGuidPermission(fileGuid),
    {
      onSuccess: (res) => {
        setArticlePms(res.data);
      },
    },
  );

  // 文件的信息
  const GetApiFilesGuidRequest = useRequestX(() => GetApiFilesGuid(fileGuid), {
    onSuccess: (fileRes) => {
      setFile(fileRes.data);
    },
  });

  // useEffect(() => {
  //   console.log('article0', file);
  //   // 如果数据没获取到，不处理这些信息
  //   if (!file) {
  //     return;
  //   }
  //   setFile(file)
  // }, [file]);

  useEffect(() => {
    if (fileGuid != '') {
      GetApiFilesGuidRequest.run();
      GetApiArticlesGuidPermissionRequest.run();
    }
  }, [fileGuid]);

  return {
    file,
    GetApiFilesGuidRequest,
    articlePms,
  };
}
