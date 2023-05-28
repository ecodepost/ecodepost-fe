import { Image, Skeleton } from 'antd';
import { useModel } from '@umijs/max';
import styles from './SpaceArticle.less';
import SpaceArticleAside from './SpaceArticleAside/SpaceArticleAside';
import SpaceArticleList from './SpaceArticleList/SpaceArticleList';
import SpaceArticleEmpty from './SpaceArticleEmpty/SpaceArticleEmpty';
import SpaceArticleCardList from './SpaceArticleCard/SpaceArticleCard';
import SpaceTopCard from './SpaceArticleTopItem/SpaceArticleTopItem';
import SpaceHeader from '@/components/Header/SpaceHeader/SpaceHeader';
import { SpaceLayout } from '@/enums/spacelayout';
import { pushFileCreate } from '@/utils/historypush/history';
import '@/services/base/types.gen';
import { useRequestFileList } from '@/hooks/fileRequest/list';
import SpaceContainer from '@/components/SpaceContainer/SpaceContainer';
import FeedCardList from '@/components/File/FeedCardList/FeedCardList';
import React from 'react';
import { FileOperationBarContext } from '@/components/File/FileOperationBar/FileOperationBar';
import {LayoutSpaceProps} from "@/pages/typings";

const SpaceArticle = (props: LayoutSpaceProps) => {
  const { selectedSpace, spacePms } = props;
  const {
    initialState: { currentUser },
  } = useModel('@@initialState');
  const { currentCmt, spaceMap } = useModel('community', (model) => ({
    currentCmt: model.currentCmt,
    spaceMap: model.spaceMap,
  }));
  const {
    fileListLoading,
    isRenderList,
    fileList,
    fileSpaceTopList,
    fileRecommendList,
    filePmsList,
    myFileStats,
    fetchRecommendList,
    onChangeSortType,
    fetchSpaceSitetopList,
    total,
    fetchFileList,
  } = useRequestFileList(currentUser, {
    spaceGuid: selectedSpace.guid,
  });

  console.log('SpaceArticle Update');

  // 渲染桌面置顶
  const renderSpaceTop =
    isRenderList &&
    fileSpaceTopList &&
    fileSpaceTopList.length > 0 &&
    fileSpaceTopList?.map((article) => {
      return (
        <FileOperationBarContext.Provider
          value={{
            fetchSpaceTopList: fetchSpaceSitetopList,
            fetchFileList,
            fetchRecommendList,
            options: {
              isOpenSiteTop: true,
              isOpenRecommend: true,
            },
          }}
        >
          <SpaceTopCard
            selectedSpace={selectedSpace}
            myFileStats={myFileStats}
            article={article}
            key={article.guid}
            type="spaceTop"
            articlePmsList={filePmsList}
          />
        </FileOperationBarContext.Provider>
      );
    });

  const getArticleDiv = () => {
    switch (selectedSpace.spaceLayout) {
      case SpaceLayout.LIST:
        return (
          <FileOperationBarContext.Provider
            value={{
              fetchSpaceTopList: fetchSpaceSitetopList,
              fetchFileList,
              fetchRecommendList,
              options: {
                isOpenSiteTop: true,
                isOpenRecommend: true,
              },
            }}
          >
            <SpaceArticleList
              articleList={fileList}
              myFileStats={myFileStats}
              articlePmsList={filePmsList}
              total={total}
              fetchArticleList={fetchFileList}
            />
          </FileOperationBarContext.Provider>
        );
      case SpaceLayout.CARD:
        return (
          <FileOperationBarContext.Provider
            value={{
              fetchSpaceTopList: fetchSpaceSitetopList,
              fetchFileList,
              fetchRecommendList,
              options: {
                isOpenSiteTop: true,
                isOpenRecommend: true,
              },
            }}
          >
            <SpaceArticleCardList
              articleList={fileList}
              total={total}
              articlePmsList={filePmsList}
              fetchArticleList={fetchFileList}
            />
          </FileOperationBarContext.Provider>
        );
      case SpaceLayout.FEED:
        return (
          <FileOperationBarContext.Provider
            value={{
              fetchSpaceTopList: fetchSpaceSitetopList,
              fetchFileList,
              fetchRecommendList,
              options: {
                isOpenSiteTop: true,
                isOpenRecommend: true,
              },
            }}
          >
            <FeedCardList
              articleList={fileList}
              total={total}
              fetchArticleList={fetchFileList}
              articlePmsList={filePmsList}
              myFileStats={myFileStats}
            />
          </FileOperationBarContext.Provider>
        );
    }
    return null;
  };

  return (
    <SpaceContainer>
      <SpaceHeader
        key={selectedSpace.guid}
        spaceID={selectedSpace.guid}
        spacePms={spacePms}
        onChangeSortType={onChangeSortType}
      />
      {spaceMap.get(selectedSpace.guid).headImage &&
      spaceMap.get(selectedSpace.guid).headImage != '' ? (
        <Image
          preview={false}
          width={'100%'}
          src={spaceMap.get(selectedSpace.guid).headImage}
          className={styles.header_img}
        ></Image>
      ) : null}
      <div className={styles.container}>
        <div className={styles.content}>
          {/* 置顶DIV */}
          {renderSpaceTop}
          {/* 文章DIV */}
          <Skeleton loading={fileListLoading}>
            {isRenderList &&
              (fileList.length > 0 || fileSpaceTopList.length > 0 ? (
                getArticleDiv()
              ) : (
                <SpaceArticleEmpty
                  spacePms={spacePms}
                  handleCreateArticle={() =>
                    pushFileCreate(selectedSpace.guid)
                  }
                />
              ))}
          </Skeleton>
        </div>
        {fileRecommendList?.length > 0 && (
          <div className={styles.container_aside}>
            <SpaceArticleAside recommends={fileRecommendList} />
          </div>
        )}
      </div>
    </SpaceContainer>
  );
};

export default React.memo(SpaceArticle);
