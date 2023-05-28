import {useMemo} from "react";


export function useRequestFilePms(fileGuid: string, filePmsList: Filev1PermissionRes[]) {
  return useMemo(() => {
    if (!filePmsList) {
      return {};
    }
    return {
      filePms: filePmsList.find((item) => item.guid === fileGuid) || ({} as Filev1PermissionRes)
    }
  }, [fileGuid, filePmsList]);
}
