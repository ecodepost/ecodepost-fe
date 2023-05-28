import LoadMore from '@/components/LoadMore/LoadMore';
import React from 'react';
import { Avatar, Col, Row, Tooltip } from 'antd';
import { useParams } from 'umi';
import FileOperationBar from '@/components/File/FileOperationBar/FileOperationBar';
import { getTime } from '@/pages/SpaceFileList/SpaceArticle/SpaceArticleCard/getTime';
import styles from './SpaceArticleList.less';
import {pushFileDetail, pushUserPage} from '@/utils/historypush/history';
import { useRequestFilePms } from '@/hooks/fileRequest/pms';

interface SpaceArticleListProps {
  article: Commonv1FileShow;
  type: string; // spaceTop / normal
  myFileStats: FileStatRes;
  articlePmsList: Filev1PermissionRes[];
}

const SpaceArticleListItem: React.FC<SpaceArticleListProps> = (props) => {
  const { article, type, articlePmsList } = props;
  const { filePms } = useRequestFilePms(article.guid, articlePmsList);

  return (
    <>
      <div className={styles.article_list_item}>
        <Row align="middle">
          <Col span={20}>
            <Tooltip color="var(--themeColorStatus)" title={article.name}>
              <div
                className={styles.card_name}
                onClick={() => {
                  pushFileDetail(article.spaceGuid, article.guid);
                }}
              >
                {article.name}
              </div>
            </Tooltip>
          </Col>
          <Col span={4}>
            <FileOperationBar type={type} fileInfo={article} filePms={filePms} />
          </Col>
        </Row>
        <div style={{ marginTop: '8px' }}>
          <Row align="middle" onClick={()=>{
            pushUserPage(article.username)
          }}>
            <Avatar src={article.avatar} size={20} />
            <span style={{ marginLeft: 8, display: 'inline-block' }}>{article.nickname}&nbsp;</span>
            <span style={{ marginLeft: 8, display: 'inline-block' }}>
              {getTime(article.ctime)}&nbsp;
            </span>
          </Row>
        </div>
      </div>
    </>
  );
};

interface RecommendCardListProps {
  myFileStats: FileStatRes;
  articleList: Commonv1FileShow[];
  fetchArticleList?: (initPage?: number) => void;
  total: number;
  articlePmsList: Filev1PermissionRes[];
}

const SpaceArticleList: React.FC<RecommendCardListProps> = (props) => {
  const { articlePmsList, articleList, fetchArticleList, total, myFileStats } = props;

  return (
    <>
      <div className={styles.article_list}>
        {articleList?.map((article) => {
          return (
            <SpaceArticleListItem
              myFileStats={myFileStats}
              article={article}
              key={article.guid}
              type="normal"
              articlePmsList={articlePmsList}
            />
          );
        })}
      </div>
      <LoadMore
        id="articlelist"
        key="articlelist"
        haveMore={articleList.length < total}
        onLoadMore={() => fetchArticleList()}
      />
    </>
  );
};

export default SpaceArticleList;
