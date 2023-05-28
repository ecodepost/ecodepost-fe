import styles from './Article.less';
import dayjs from 'dayjs';
import { Empty, Spin } from 'antd';
import { useParams } from 'umi';
import React, { useEffect, useState } from 'react';
import { pushFileDetail } from '@/utils/historypush/history';
import { GetApiUsersNameArticles } from '@/services/base/api.gen';
import useRequestX from '@/hooks/useRequestX';

const Article: React.FC = (props) => {
  const { name } = useParams<{ name: string }>();
  const [articleList, setArticleList] = useState<any[]>();

  const GetApiUsersNameArticlesReq = useRequestX(GetApiUsersNameArticles, {
    onSuccess: ({ data }) => {
      setArticleList(data.list || []);
    },
  });

  useEffect(() => {
    GetApiUsersNameArticlesReq.run(name, {
      currentPage: 1, // 当前页数
      pageSize: 20, // 每页总数
      sort: '', // 排序字符串
    });
  }, [name]);

  return (
    <div className={styles.collectionContainer}>
      <div className={styles.cardList}>
        <Spin spinning={GetApiUsersNameArticlesReq.loading}>
          {articleList &&
            (articleList.length > 0 ? (
              articleList.map((item) => {
                return (
                  <div
                    key={item.guid}
                    className={styles.card}
                    onClick={() => {
                      pushFileDetail(item.spaceGuid, item.guid);
                    }}
                  >
                    <div className={styles.title}>{item.name}</div>
                    <div className={styles.content}>{item.summary}</div>
                    <div className={styles.infoRow}>
                      <div className={styles.info}>
                        <img className={styles.infoAvatar} src={item.avatar} alt="" />
                        <span className={styles.infoSpan}>{item.nickname}</span>
                        <span className={styles.infoSpan}>{item.from}</span>
                        <span className={styles.infoSpan}>
                          {dayjs(item.ctime * 1000).format('YYYY/MM/DD HH:mm:ss')}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <Empty />
            ))}
        </Spin>
      </div>
    </div>
  );
};

export default Article;
