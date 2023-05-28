import React, { useEffect, useMemo, useState } from 'react';
import styles from './SpaceColumnLayout.less';
import SpaceHeader from '@/components/Header/SpaceHeader/SpaceHeader';
import { Outlet } from '@@/exports';
import ColumnTree from '@/components/Column/ColumnTree';
import { LayoutSpaceProps } from '@/pages/typings';
import useRequestX from '@/hooks/useRequestX';
import { GetApiColumnsFiles, GetApiSpacesGuidColumn } from '@/services/base/api.gen';
import { arrToTree } from '@/utils/arr';
import { GetURLSpaceFuncType } from '@/utils/GetUrlParams';

const SpaceArticleTree: React.FC<LayoutSpaceProps> = (props) => {
  const { selectedSpace, spacePms } = props;
  // const [treeData, setTreeData] = useState<Commonv1FileInfo[]>();
  const [allColumnData, setColumnData] = useState<{
    list: Commonv1FileInfo[];
    tree: Commonv1FileInfo[];
  }>();
  const [columnInfo, setColumnInfo] = useState<SpaceColumnInfoResp>();

  const funcType = GetURLSpaceFuncType(window.location.pathname);

  const GetApiColumnsFilesRequest = useRequestX(
    () =>
      GetApiColumnsFiles({
        spaceGuid: selectedSpace.guid,
      }),
    {
      onSuccess({ code, data, msg }) {
        // 选取第一个file
        // if (funcType == 'list' && data?.length > 0) {
        //   pushFileDetail(cmtGuid, selectedSpace.guid, data[0].guid);
        // }
        console.log('data: ', data);
        const tree = arrToTree(data.files);
        setColumnData({
          list: data.files,
          tree: tree,
        });
        // setTreeData(trees);
      },
    },
  );

  const GetApiSpacesGuidColumnReq = useRequestX(() => GetApiSpacesGuidColumn(selectedSpace.guid), {
    onSuccess({ code, data, msg }) {
      setColumnInfo(data);
    },
  });

  useEffect(() => {
    GetApiColumnsFilesRequest.run();
    GetApiSpacesGuidColumnReq.run();
  }, [selectedSpace.guid]);

  const SpaceHeaderWrap = useMemo(() => {
    return <SpaceHeader spaceID={selectedSpace.guid} />;
  }, [selectedSpace.guid]);

  return (
    <div className={styles.container}>
      {SpaceHeaderWrap}
      <div className={styles.body}>
        <div className={styles.content}>
          {allColumnData && columnInfo && (
            <Outlet
              context={{
                spacePms: spacePms,
                selectedSpace: selectedSpace,
                allColumnData: allColumnData,
                columnInfo: columnInfo,
              }}
            />
          )}
        </div>
        {funcType == 'detail' && allColumnData && (
          <div className={styles.sidebar_box}>
            <ColumnTree
              fetchTreeData={GetApiColumnsFilesRequest.run}
              treeData={allColumnData.tree}
              selectedSpace={selectedSpace}
              spacePms={spacePms}
            />
          </div>
        )}
      </div>
    </div>
  );
};
export default SpaceArticleTree;
