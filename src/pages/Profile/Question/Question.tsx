import styles from './Question.less';
import dayjs from 'dayjs';
import { Empty } from 'antd';
import { useParams } from 'umi';
import React, { useEffect, useState } from 'react';
import {pushFileDetail, pushSpace} from '@/utils/historypush/history';
import { GetApiUsersNameQuestions } from '@/services/base/api.gen';
import useRequestX from '@/hooks/useRequestX';

const Question: React.FC = (props) => {
  const { name } = useParams<{ name: string }>();
  const [questionList, setQuestionList] = useState<Questionv1QAShow[]>();

  const GetApiUsersNameQuestionsReq = useRequestX(GetApiUsersNameQuestions, {
    onSuccess: ({ data }) => {
      setQuestionList(data.list || []);
    },
  });

  useEffect(() => {
    GetApiUsersNameQuestionsReq.run(name, {
      currentPage: 1, // 当前页数
      pageSize: 20, // 每页总数
      sort: '', // 排序字符串
    });
  }, [name]);

  return (
    <div className={styles.collectionContainer}>
      <div className={styles.cardList}>
        {questionList &&
          (questionList.length > 0 ? (
            questionList.map((item) => {
              return (
                <div
                  key={item.guid}
                  className={styles.card}
                  onClick={() => {
                    pushFileDetail(item.spaceGuid, item.parentGuid);
                  }}
                >
                  <p className={styles.font}>
                    <span className={styles.time}>
                      {dayjs(item.ctime * 1000).format('YYYY/MM/DD HH:mm:ss')}
                    </span>
                    于
                    <a
                      className={styles.communityName}
                      onClick={() => {
                        pushSpace(item.spaceGuid);
                      }}
                    >
                      {item.spaceGuid}
                    </a>
                    发表回答
                  </p>
                  <p className={styles.content}>{item.summary}</p>
                  <p className={styles.font}>{item.name}</p>
                </div>
              );
            })
          ) : (
            <Empty />
          ))}
      </div>
    </div>
  );
};

export default Question;
