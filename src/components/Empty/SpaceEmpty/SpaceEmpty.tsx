import styles from './SpaceArticleEmpty.less';
import EMPTY_SPACE from '@/static/empty_space.png';
import {useIntl, useModel} from 'umi';
import React, {useState} from "react";
import CreateSpace from "@/components/Space/CreateSpace/CreateSpace";
import {SpaceType} from "@/enums/spacetype";

interface SpaceArticleEmptyProps {
  msg: string;
}

const SpaceEmpty: React.FC<SpaceArticleEmptyProps> = (props) => {
  const {currentCmt} = useModel('community', (model) => ({
    currentCmt: model.currentCmt
  }));
  const {permission: cmtPms} = currentCmt
  const {msg} = props;
  const [addSpaceVisible, setAddSpaceVisible] = useState<boolean>(false);

  const intl = useIntl();
  const i = (id: string) => intl.formatMessage({id});

  return (
    <div className={styles.empty}>
      <img src={EMPTY_SPACE} alt={i('article.empty.bannerImg.alt')}/>
      <div className={styles.empty_text_container}>
        <span className={styles.empty_text} style={{marginTop: 24, display: 'block'}}>
          {msg}
        </span>
        <span className={styles.empty_text}>{i('article.empty.subtitle')}</span>
        {cmtPms?.isAllowCreateSpace && (
          <span className={styles.empty_action} onClick={() => setAddSpaceVisible(true)}>
            创建课程
          </span>
        )}
      </div>
      <CreateSpace
        visible={addSpaceVisible}
        onClose={() => {
          setAddSpaceVisible(false);
        }}
        spaceType={SpaceType.COURSE}
        groupGuid=""
      />
    </div>
  );
};

export default SpaceEmpty;
