import { Avatar, Col, Row, Tooltip } from 'antd';
import React, { useEffect, useState } from 'react';
import { useParams } from 'umi';
import { BizType } from '@/enums/biztype';
import styles from './SpaceArticleTopItem.less';
import { pushFileDetail } from '@/utils/historypush/history';
import type { ChosenSpaceType } from '@/pages/typings';
import FileBottomBar from '@/components/File/FileBottomBar/FileBottomBar';
import FileOperationBar from '@/components/File/FileOperationBar/FileOperationBar';
import { getTime } from '@/pages/SpaceFileList/SpaceArticle/SpaceArticleCard/getTime';
import EditorContentShow from '@/components/Editor/EditorContentShow/EditorContentShow';
import { useRequestFileStat } from '@/hooks/fileRequest/stat';
import { useRequestFilePms } from '@/hooks/fileRequest/pms';

interface SpaceArticleCardProps {
  selectedSpace: ChosenSpaceType;
  article: Commonv1FileShow;
  type: string; // spaceTop / normal
  myFileStats: FileStatRes;
  articlePmsList: Filev1PermissionRes[];
}

const SpaceTopCard: React.FC<SpaceArticleCardProps> = (props) => {
  const { article, type, articlePmsList, myFileStats, selectedSpace } = props;
  const [isOpenSpaceTopAll, setIsOpenSpaceTopAll] = useState<boolean>();
  const { selectedEmojis, isCollect } = useRequestFileStat(article.guid, myFileStats);
  const { filePms } = useRequestFilePms(article.guid, articlePmsList);

  useEffect(() => {
    // 104 说明置顶帖子展开
    const spaceTopOption = selectedSpace?.spaceOptions.find((item) => item.spaceOptionId === 104);
    if (spaceTopOption?.value === 1) {
      setIsOpenSpaceTopAll(true);
    } else {
      setIsOpenSpaceTopAll(false);
    }
  }, [selectedSpace]);

  return (
    <div className={styles.card}>
      <div className={styles.card_padding}>
        <Row gutter={[20, 20]} justify="space-between" align="middle">
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
          <Col span={24}>
            <Avatar src={article.avatar} size={36} />
            <span style={{ marginLeft: 8 }}>{article.nickname}&nbsp;</span>
            <span>&nbsp;{getTime(article.ctime)}&nbsp;</span>
          </Col>
          <Col span={24}>
            {isOpenSpaceTopAll !== undefined && (
              <EditorContentShow file={article} isOpenShowAll={isOpenSpaceTopAll} />
            )}
          </Col>
        </Row>
      </div>
      <div className={styles.bottom_bar}>
        {article && (
          <FileBottomBar
            bizType={BizType.ARTICLE}
            fileInfo={article}
            initMySelectedEmojis={selectedEmojis}
            isCollect={isCollect}
            isOpenComment={false}
          />
        )}
      </div>
    </div>
  );
};

export default SpaceTopCard;
