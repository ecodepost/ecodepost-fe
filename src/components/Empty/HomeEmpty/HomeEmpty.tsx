import styles from './SpaceArticleEmpty.less';
import EMPTY_SPACE from '@/static/empty_space.png';
import {useIntl} from 'umi';
import React from "react";

interface SpaceArticleEmptyProps {
}

const HomeEmpty: React.FC<SpaceArticleEmptyProps> = (props) => {
  const intl = useIntl();
  const i = (id: string) => intl.formatMessage({id});

  return (
    <div className={styles.empty}>
      <img src={EMPTY_SPACE} alt={i('article.empty.bannerImg.alt')}/>
      <div className={styles.empty_text_container}>
        <span className={styles.empty_text} style={{marginTop: 24, display: 'block'}}>
          社区内发布帖子，会显示在此处
        </span>
      </div>
    </div>
  );
};

export default HomeEmpty;
