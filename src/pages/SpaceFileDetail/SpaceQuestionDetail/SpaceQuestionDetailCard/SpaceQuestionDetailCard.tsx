import { BizType } from '@/enums/biztype';
import { Avatar } from 'antd';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import styles from './SpaceQuestionDetailCard.less';
import FileBottomBar from '@/components/File/FileBottomBar/FileBottomBar';
import EditorContentShow from '@/components/Editor/EditorContentShow/EditorContentShow';

interface SpaceQuestionDetailCardProps {
  answer: commonv1FileShow;
  myFileStats: FileStatRes;
}

const SpaceQuestionDetailCard: React.FC<SpaceQuestionDetailCardProps> = (props) => {
  const { answer, myFileStats } = props;

  // todo 优化
  const [selectedEmojis, setSelectedEmojis] = useState<number[]>();
  const [isCollect, setIsCollect] = useState<boolean>();
  useEffect(() => {
    // 如果存在，说明请求成功了，不再是undefined
    // 这样的好处，可以确保在请求没过来的时候，emoji，收藏，在undefined处于加载状态。有数据的时候才渲染。
    if (!myFileStats) {
      return;
    }
    // 找到哪篇文章的
    const myEmoji = myFileStats.emojiList.find((item) => item.guid === answer.guid);
    // 找到选择id
    setSelectedEmojis(myEmoji?.list?.map((item) => item.id) || []);
    const collectStat = myFileStats.collectList.find((item) => item.guid === answer.guid);
    setIsCollect(collectStat?.isCollect || false);
  }, [myFileStats]);

  return (
    <div className={styles.card}>
      <div className={styles.card_header}>
        <Avatar src={answer?.avatar} size={40} />
        <span className={styles.card_name}>{answer.nickname}</span>
      </div>
      <div className={styles.card_content}>
        <EditorContentShow file={answer} />
      </div>
      <div className={styles.card_time}>
        发布于&nbsp;{dayjs.unix(answer.ctime).format('YYYY-MM-DD HH:mm')}
      </div>
      {answer && (
        <div style={{ marginTop: '12px' }}>
          <FileBottomBar
            isOpenComment={false}
            bizType={BizType.ANSWER}
            fileInfo={answer}
            initMySelectedEmojis={selectedEmojis}
            isCollect={isCollect}
          />
        </div>
      )}
    </div>
  );
};

export default SpaceQuestionDetailCard;
