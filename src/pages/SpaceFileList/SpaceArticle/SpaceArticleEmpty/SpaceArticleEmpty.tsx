import styles from './SpaceArticleEmpty.less';
import EMPTY_SPACE from '@/static/empty_space.png';
import {useIntl} from 'umi';
import React from "react";

interface SpaceArticleEmptyProps {
  spacePms: Spacev1GetSpacePermissionByUidRes;
  handleCreateArticle: () => void;
}

const SpaceArticleEmpty: React.FC<SpaceArticleEmptyProps> = (props) => {
  const { handleCreateArticle,spacePms  } = props;

  const intl = useIntl();
  const i = (id: string) => intl.formatMessage({ id });

  return (
    <div className={styles.empty}>
      <img src={EMPTY_SPACE} alt={i('article.empty.bannerImg.alt')}/>
      <div className={styles.empty_text_container}>
        <span className={styles.empty_text} style={{marginTop: 24, display: 'block'}}>
          还没有内容
        </span>
        {spacePms?.isAllowCreateFile && (
          <>
            <span className={styles.empty_text}>快来</span>
            <span className={styles.empty_action} onClick={() => handleCreateArticle()}>
              写点东西吧
            </span>
          </>
        )}
      </div>
    </div>
  );
};

export default SpaceArticleEmpty;
