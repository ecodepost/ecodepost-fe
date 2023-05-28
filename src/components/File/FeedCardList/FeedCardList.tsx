import styles from './RecommendCardList.less';
import FeedCard from '@/components/File/FeedCardList/FeedCard/FeedCard';
import React from 'react';
import LoadMore from '@/components/LoadMore/LoadMore';

interface RecommendCardListProps {
  myFileStats: FileStatRes;
  articleList: Commonv1FileShow[];
  fetchArticleList?: (initPage?: number) => void;
  total: number;
  articlePmsList: Filev1PermissionRes[];
}

const FeedCardList: React.FC<RecommendCardListProps> = (props) => {
  const {
    articleList,
    fetchArticleList,
    total,
    articlePmsList,
    myFileStats,
  } = props;
  return (
    <>
      <div className={styles.container}>
        {articleList &&
          articleList.map((article) => (
            <FeedCard
              article={article}
              key={article.guid}
              articlePmsList={articlePmsList}
              spaceGuid={article.spaceGuid}
              myFileStats={myFileStats}
            />
          ))}
        {articleList && (
          <LoadMore
            id="articlecard"
            key="articlecard"
            haveMore={articleList.length < total}
            onLoadMore={() => {
              fetchArticleList();
            }}
          />
        )}
      </div>
    </>
  );
};

export default React.memo(FeedCardList);
