import LoadMore from '@/components/LoadMore/LoadMore';
import { Avatar, Col, Row, Tooltip } from 'antd';
import styles from './SpaceArticleCard.less';
import { useIntl, useParams } from '@umijs/max';
import { pushFileDetail } from '@/utils/historypush/history';
import React from 'react';
import FileOperationBar from '@/components/File/FileOperationBar/FileOperationBar';
import { getTime } from './getTime';
import { useRequestFilePms } from '@/hooks/fileRequest/pms';

interface SpaceArticleCardListItemProps {
  type: string; // spaceTop / normal
  article: Commonv1FileShow;
  articlePmsList: Filev1PermissionRes[];
}

const SpaceArticleCardListItem: React.FC<SpaceArticleCardListItemProps> = (props) => {
  const { article, articlePmsList } = props;
  const { spaceGuid } = useParams<{ spaceGuid: string }>();
  const intl = useIntl();
  const i = (id: string) => intl.formatMessage({ id });
  const { filePms } = useRequestFilePms(article.guid, articlePmsList);

  return (
    <Col
      xs={24}
      sm={24}
      md={12}
      lg={12}
      xl={8}
      key={article.guid}
      id="article_scroll"
      style={{ height: '100%' }}
    >
      <div className={styles.card}>
        <img
          onClick={() => {
            pushFileDetail(spaceGuid, article.guid);
          }}
          className={styles.card_headimg}
          src={
            article.headImage ? article.headImage : `${CDN_DOMAIN}/recommend/article-covers/1.webp`
          }
          alt={i('article.card.card.headImg.alt')}
        />
        <div className={styles.card_content}>
          <Row align="middle" justify="space-between">
            <Col span={16}>
              <Tooltip color="var(--themeColorStatus)" title={article.name}>
                <div
                  className={styles.card_content_title}
                  onClick={() => {
                    pushFileDetail(spaceGuid, article.guid);
                  }}
                >
                  {article.name}
                </div>
              </Tooltip>
            </Col>
            <Col span={8}>
              <FileOperationBar type="detail" fileInfo={article} filePms={filePms} />
            </Col>
          </Row>
          <div className={styles.card_content_info}>
            <div>
              <Avatar size={20} src={article.avatar} />
              <span className={styles.card_info_author}>{article.nickname}&nbsp;</span>
            </div>
            <div>
              <span className={styles.card_info_time}>{getTime(article.ctime)}&nbsp;</span>
            </div>
            {/* <span className={styles.card_info_time}>
              ·&nbsp;{`${article?.cntComment || 0}${i('replies')}`}
            </span> */}
          </div>
        </div>

        {/*{articlePms && (*/}
        {/*  <Popover*/}
        {/*    getPopupContainer={(triggerNode) => triggerNode?.parentNode as HTMLElement}*/}
        {/*    content={*/}
        {/*      <SpaceArticleEditBar*/}
        {/*        article={article}*/}
        {/*        type={type}*/}
        {/*        fetchSpaceTopList={fetchSpaceTopList}*/}
        {/*        fetchArticleList={fetchArticleList}*/}
        {/*        fetchRecommendList={fetchRecommendList}*/}
        {/*        articlePms={articlePms}*/}
        {/*      />*/}
        {/*    }*/}
        {/*    trigger="click"*/}
        {/*    placement="bottomRight"*/}
        {/*  >*/}
        {/*    <i className={classNames('iconfont', 'icon-icon', styles.card_setting_icon)} />*/}
        {/*  </Popover>*/}
        {/*)}*/}
      </div>
    </Col>
  );
};

interface SpaceArticleCardListProps {
  articleList: Commonv1FileShow[];
  fetchArticleList: (initPage?: number) => void;
  total: number;
  articlePmsList: Filev1PermissionRes[];
}

const SpaceArticleCardList: React.FC<SpaceArticleCardListProps> = (props) => {
  const { articleList, total, articlePmsList, fetchArticleList } = props;

  return (
    <>
      <div className={styles.container}>
        <Row gutter={[16, 16]}>
          {articleList.map((article) => (
            <SpaceArticleCardListItem
              type="normal"
              key={article.guid}
              article={article}
              articlePmsList={articlePmsList}
            />
          ))}
        </Row>

        <LoadMore
          id="articlecard"
          key="articlecard"
          haveMore={articleList.length < total}
          onLoadMore={() => fetchArticleList()}
        />
      </div>
    </>
  );
};

export default SpaceArticleCardList;
