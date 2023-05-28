import styles from './SpaceArticleEmpty.less';
import EMPTY_SPACE from '@/static/empty_space.png';
import {useIntl} from 'umi';
import React from "react";

interface SpaceArticleEmptyProps {
  spacePms: Spacev1GetSpacePermissionByUidRes;
  handleCreateArticle: () => void;
}

const FileEmpty: React.FC<SpaceArticleEmptyProps> = (props) => {
  const {handleCreateArticle, spacePms} = props;

  const intl = useIntl();
  const i = (id: string) => intl.formatMessage({id});

  return (
    <div className={styles.empty}>
      <img src={EMPTY_SPACE} alt={i('article.empty.bannerImg.alt')}/>
      <div className={styles.empty_text_container}>
        <span className={styles.empty_text} style={{marginTop: 24, display: 'block'}}>
          {i('article.empty.title')}
        </span>
        <span className={styles.empty_text}>{i('article.empty.subtitle')}</span>
        {spacePms?.isAllowCreateFile ? (
          <span className={styles.empty_action} onClick={() => handleCreateArticle()}>
            {i('article.empty.publish')}
          </span>
        ) : (
          <span className={styles.empty_action_disabled}>{i('article.empty.publish')}</span>
        )}
      </div>
    </div>
  );
};

export default FileEmpty;
