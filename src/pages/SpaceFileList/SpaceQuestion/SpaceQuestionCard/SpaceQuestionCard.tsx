import {Avatar} from 'antd';
import dayjs from 'dayjs';
import React from 'react';
import {useParams} from 'umi';
import styles from './SpaceQuestionCard.less';
import {pushFileDetail} from '@/utils/historypush/history';
import EditorContentShow from "@/components/Editor/EditorContentShow/EditorContentShow";

interface SpaceQuestionCardProps {
  question: Commonv1FileOnList;
}

const SpaceQuestionCard: React.FC<SpaceQuestionCardProps> = (props) => {
  const {question} = props;
  const {spaceGuid} = useParams<{ spaceGuid: string }>();

  return (
    <div className={styles.card}>
      <div className={styles.card_aside}>
        <div className={styles.card_aside_card}>
          <span className={styles.card_aside_cnt}>{question?.cntComment || 0}</span>
          <span className={styles.card_aside_text}>回答</span>
        </div>
      </div>
      <div className={styles.card_main}>
        <div className={styles.card_main_title}>
          <span onClick={() => pushFileDetail(spaceGuid, question.guid)}>
            {question.name}
          </span>
        </div>
        {question.content && (
          <div className={styles.card_main_content}>
            <EditorContentShow file={question}/>
          </div>
        )}
        <div className={styles.card_main_info}>
          <Avatar src={question.avatar} size={20} />
          <span className={styles.card_main_info_text}>
            {question.nickname}&nbsp;&nbsp;·&nbsp;
            {dayjs.unix(question.ctime).format('YYYY-MM-DD HH:mm')}
          </span>
        </div>
      </div>
    </div>
  );
};

export default SpaceQuestionCard;
