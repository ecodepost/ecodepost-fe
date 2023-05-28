import {useIntl, useParams} from '@umijs/max';
import styles from './SpaceArticleAside.less';
import {pushFileDetail} from '@/utils/historypush/history';
import React from "react";

interface SpaceArticleAsideProps {
  recommends: Commonv1FileShow[];
}

const SpaceArticleAside: React.FC<SpaceArticleAsideProps> = (props) => {
  const {recommends} = props;
  const {spaceGuid} = useParams<{ spaceGuid: string }>();

  const intl = useIntl();
  const i = (id: string) => intl.formatMessage({ id });

  return (
    <>
      {/* <div className={styles.award}>
        <span className={styles.award_title}>{i('article.aside.award')}</span>
        <div className={styles.award_content}>
          <div className={styles.award_content_item}>
            <Avatar size={40} icon={<UserOutlined />} />
            <div className={styles.userinfo}>
              <div className={styles.userinfo_top}>
                <span>用户名1 </span>
                <span>Lv8</span>
              </div>
              <div className={styles.userinfo_bottom}>
                <span>勋章1</span>
              </div>
            </div>
          </div>
          <Empty />
        </div>
      </div> */}
      <div className={styles.recommend}>
        <div className={styles.recommend_title}>{i('article.aside.recommend')}</div>
        <div className={styles.recommend_content}>
          {recommends?.map((article) => (
            <div
              className={styles.recommend_content_item}
              key={article.guid}
              onClick={() => pushFileDetail(spaceGuid, article.guid)}
            >
              <span className={styles.recommend_item_title}>{article.name}</span>
              <span className={styles.recommend_item_author}>{article.nickname}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SpaceArticleAside;
