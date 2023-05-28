import {Avatar, Col, Row, Spin} from 'antd';
import dayjs from 'dayjs';
import {useIntl} from 'umi';
import styles from './SpaceArticleDetail.less';
import {BizType} from '@/enums/biztype';
import Editor from '@/components/Editor/ReadEditor';
import type {ChosenSpaceType} from '@/pages/typings';
import {useRequestFileInfo} from '@/hooks/fileRequest/info';
import FileBottomBar from '@/components/File/FileBottomBar/FileBottomBar';
import FileOperationBar, {FileOperationBarContext} from '@/components/File/FileOperationBar/FileOperationBar';
import DetailHeader from '@/components/Header/DetailHeader/DetailHeader';

type FileProps = {
  selectedSpace: ChosenSpaceType;
  spacePms: Spacev1GetSpacePermissionByUidRes;
  fileGuid: string;
};

const SpaceArticleDetail = (props: FileProps) => {
  const {fileGuid} = props;
  const {fileLoading, article, articlePms, fileStat, selectedEmojis, defaultValue} = useRequestFileInfo(fileGuid);
  const intl = useIntl();
  const i = (id: string) => intl.formatMessage({ id });

  // 内容来了，在展示，目的是为了让文章标题和内容同时渲染
  return (
    <>
      <Spin spinning={fileLoading}>
        <DetailHeader></DetailHeader>
        <div className={styles.container}>
          {defaultValue !== undefined && (
            <div className={styles.spaceInnerWrapper}>
              {article && article.headImage && (
                <div className={styles.headimage}>
                  <img
                    src={article.headImage}
                    alt={i('articleDetail.headImg.alt')}
                    style={{ aspectRatio: '3/1', width: '100%', borderRadius: 16 }}
                  />
                </div>
              )}
              {article && (
                <Row gutter={20} align="middle">
                  <Col span={20}>
                    <span className={styles.title}>{article?.name}</span>
                  </Col>
                  <Col span={4}>
                    <FileOperationBarContext.Provider
                      value={{
                        options: {
                          isOpenSiteTop: true,
                          isOpenRecommend: true,
                        }
                      }}
                    >
                      <FileOperationBar
                        type="detail"
                        fileInfo={article}
                        filePms={articlePms}
                      />
                    </FileOperationBarContext.Provider>
                  </Col>
                </Row>
              )}
              {article && (
                <div className={styles.info}>
                  <Avatar size={20} src={article?.avatar} />
                  <span className={styles.info_author}>{article?.nickname}</span>
                  <span className={styles.info_time}>
                    ·&nbsp;{dayjs.unix(article?.ctime).format('YYYY-MM-DD HH:mm')}
                  </span>
                </div>
              )}
              <div className={styles.divider} />
              {defaultValue !== undefined && <Editor initialValue={defaultValue} />}
              <div className={styles.bottom_bar}>
                {article && (
                  <FileBottomBar
                    bizType={BizType.ARTICLE}
                    fileInfo={article}
                    initMySelectedEmojis={selectedEmojis}
                    isCollect={fileStat.isCollect}
                    isOpenComment={true}
                  />
                )}
              </div>
            </div>
          )}
        </div>
      </Spin>
    </>
  );
};
export default SpaceArticleDetail;
