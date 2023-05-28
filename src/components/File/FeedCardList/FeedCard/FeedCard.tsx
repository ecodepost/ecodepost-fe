import {Avatar, Col, Row} from 'antd';
import {useParams} from '@umijs/max';
import styles from './FeedCard.less';
import {pushFileDetail, pushUserPage} from '@/utils/historypush/history';
import {BizType} from '@/enums/biztype';
import FileBottomBar from '@/components/File/FileBottomBar/FileBottomBar';
import FileOperationBar from '@/components/File/FileOperationBar/FileOperationBar';
import EditorContentShow from '@/components/Editor/EditorContentShow/EditorContentShow';
import {getTime} from '@/pages/SpaceFileList/SpaceArticle/SpaceArticleCard/getTime';
import {useRequestFileStat} from "@/hooks/fileRequest/stat";
import {useRequestFilePms} from "@/hooks/fileRequest/pms";
import React from "react";

interface FeedCardProps {
  article: Commonv1FileShow;
  myFileStats: FileStatRes;
  spaceGuid: string;
  articlePmsList: Filev1PermissionRes[];
}

const FeedCard = (props: FeedCardProps) => {
  const {
    article,
    articlePmsList,
    myFileStats,
  } = props;
  const {selectedEmojis, isCollect} = useRequestFileStat(article.guid, myFileStats)
  const {filePms} = useRequestFilePms(article.guid, articlePmsList)

  return (
    <div className={styles.card}>
      <div className={styles.card_padding}>
        <Row gutter={[20, 20]} justify="space-around" align="middle">
          <Col span={20}>
            <div
              className={styles.card_name}
              onClick={() => {
                pushFileDetail(article.spaceGuid, article.guid);
              }}
            >
              {article.name}
            </div>
          </Col>
          <Col span={4}>
            <FileOperationBar
              type="detail"
              fileInfo={article}
              filePms={filePms}
            />
          </Col>

          <Col span={24}>
            <a onClick={() => {
              pushUserPage(article.username)
            }}>
              <Avatar src={article.avatar} size={20}/>
              <span style={{marginLeft: 8}}>{article.nickname}&nbsp;</span>
            </a>
            <span>&nbsp;{getTime(article.ctime)}&nbsp;</span>
          </Col>
          <Col span={24}>
            <EditorContentShow file={article}/>
          </Col>
        </Row>
      </div>
      <div className={styles.foot_bar}>
        <FileBottomBar
          bizType={BizType.ARTICLE}
          fileInfo={article}
          initMySelectedEmojis={selectedEmojis}
          isCollect={isCollect}
          isOpenComment={false}
        />
      </div>
    </div>
  );
};

export default React.memo(FeedCard);
