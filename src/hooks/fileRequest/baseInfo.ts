import useRequestX from "@/hooks/useRequestX";
import {GetApiFilesGuid} from "@/services/base/api.gen";
import {useState} from "react";

export function useRequestFileBaseInfo() {
  const [file, setFile] = useState<DtoFileShow>();
  const [fileContentValue, setFileContentValue] = useState<any>();
  const [fileLoading, setFileLoading] = useState<boolean>(true)

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
  const GetApiArticlesGuidRequest = useRequestX(GetApiFilesGuid, {
    beforeRequest: () => {
      setFileLoading(true)
    },
    onSuccess: (fileRes) => {
      if (fileRes.data.format != 3) {
        setFileContentValue("")
        setFile(fileRes.data);
        setFileLoading(false)
        return;
      }
      setFile(fileRes.data);
      setFileContentValue(contentProcess(fileRes.data.format, fileRes.data.content))
      setFileLoading(false)
    }
  })

  return {
    fileLoading,
    file,
    fileContentValue,
    GetApiArticlesGuidRequest,
  }
}
