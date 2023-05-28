import styles from '@/components/File/FeedCardList/FeedCard/FeedCard.less';
import {Col, Row} from 'antd';
import EmojiBar from '@/components/File/FileBottomBar/EmojiBar/EmojiBar';
import SpaceArticleComment from '@/components/CommentForRecommendCard/Comment';
import StarPart from '@/components/Star/Star';
import {BizType} from '@/enums/biztype';
import React, {useEffect, useRef, useState} from 'react';
import {EmojiItem} from '@/pages/typings';
import * as ReactDOM from 'react-dom';

interface FileBottomInfo {
  spaceGuid: string;
  guid: string;
  emojiList: EmojiItem[];
  cntComment: number;
}

interface Props {
  bizType: BizType;
  fileInfo: FileBottomInfo;
  initMySelectedEmojis: number[];
  isCollect: boolean;
  isOpenComment: boolean; // 文章详情页，打开评论
}

const Bottom: (props: Props) => JSX.Element = (props: Props) => {
  const {fileInfo, initMySelectedEmojis, isCollect, isOpenComment} = props;
  const [selectedEmojis, setSelectedEmojis] = useState<number[]>();

  const refDivCommentContainer = useRef<HTMLDivElement>(null);
  const [contentForCommentContainer, setContentForCommentContainer] = useState<any>();

  useEffect(() => {
    if (refDivCommentContainer.current) {
      ReactDOM.render(contentForCommentContainer, refDivCommentContainer.current);
    }
  }, [refDivCommentContainer.current, contentForCommentContainer]);

  useEffect(() => {
    setSelectedEmojis(initMySelectedEmojis);
  }, [initMySelectedEmojis]);

  return (
    <div className={styles.bottom_bar_container}>
      <Row gutter={20}>
        <Col span={18} className={styles.col_icon}>
          <EmojiBar
            spaceGuid={fileInfo.spaceGuid}
            selectedEmojis={selectedEmojis}
            setSelectedEmojis={setSelectedEmojis}
            initEmojiList={fileInfo.emojiList}
            fileGuid={fileInfo.guid}
          />
        </Col>
        <Col span={6}>
          <Row justify="end" align="middle">
            <SpaceArticleComment
              commentType="article"
              articleGuid={fileInfo.guid}
              setContentForCommentContainer={setContentForCommentContainer}
              replyCnt={fileInfo.cntComment}
              isOpenComment={isOpenComment}
            />
            <StarPart
              isCollection={isCollect}
              articleID={fileInfo.guid}
              bizType={BizType.ARTICLE}
            />
          </Row>
        </Col>
      </Row>
      <Row gutter={20}>
        <Col span={24}>
          <div ref={refDivCommentContainer} />
        </Col>
      </Row>
    </div>
  );
};
export default React.memo(Bottom)
