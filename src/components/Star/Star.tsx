import React, {useEffect, useState} from 'react';
import {useIntl} from 'umi';
import {StarFilled, StarOutlined} from '@ant-design/icons';
import CollectionComponent from '@/components/Collection/Collection';
import type {BizType} from '@/enums/biztype';
import styles from './Star.less';
import {messageInfo} from '@/components/Message/Message';
import {
  DeleteApiMyCollectionGroupsCollections,
  GetApiMyCollectionGroups,
  GetApiMyCollectionGroupsCgidCollections,
} from '@/services/base/api.gen';

interface StarPartProps {
  isCollection?: boolean;
  articleID: string;
  bizType: BizType;
  // stringLabelDefault: string;
  // stringLabelCollected: string;
}

const StarPart: React.FC<StarPartProps> = (props) => {
  const {isCollection, articleID, bizType} = props;
  const [hasStar, setHasStar] = useState<boolean>(false);
  const [showCreateCollection, setShowCreateCollection] = useState<boolean>(false);
  const [hasFirstRander, setHasFirstRander] = useState<boolean>(false);
  const intl = useIntl();
  const i = (id: string) => intl.formatMessage({ id });
  const handleCloseCollectionModal = (isCollectionSuccess: any) => {
    setHasStar(isCollectionSuccess);
    setShowCreateCollection(false);
  };

  const handleUnCollection = async (id: string, bizType: BizType) => {
    try {
      const groupIDs = await fetchMyCollection();
      const resp = await DeleteApiMyCollectionGroupsCollections({
        collectionGroupIds: groupIDs,
        type: bizType,
        guid: id,
      });

      if (resp.code === 0) {
        messageInfo({
          type: 'success',
          content: '取消收藏成功',
        });
        setHasStar(false);
      }
    } catch (error) {
      messageInfo({
        type: 'error',
        content: '取消收藏失败',
      });
    }
  };

  const fetchMyCollection = async () => {
    try {
      const resp = await GetApiMyCollectionGroups();
      let arr = [];
      if (resp.code === 0) {
        const list = resp.data.list || [];
        for (let i = 0; i < list.length; i++) {
          const collectionListResp = await GetApiMyCollectionGroupsCgidCollections(list[i].id, {
            currentPage: 0,
            pageSize: 0,
            sort: '',
          });
          if (collectionListResp.code === 0 && collectionListResp.data.list) {
            // 查看哪个 collection 有 arcticle
            let result = collectionListResp.data.list.some((item: any) => {
              return item.bizGuid == articleID;
            });
            if (result) {
              arr.push(list[i].id);
            }
          }
        }
        return arr;
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (isCollection && !hasFirstRander) {
      setHasStar(true);
      setHasFirstRander(true);
    }
  }, [hasStar, isCollection, hasFirstRander]);

  return (
    <>
      {hasStar ? (
        <span className={styles.outer} onClick={() => handleUnCollection(articleID, bizType)}>
          <StarFilled className={styles.outer_icon} />
          {/*{stringLabelCollected === undefined ? i('hasStar') : stringLabelCollected}*/}
          <span>已收藏</span>
        </span>
      ) : (
        <span className={styles.outer} onClick={() => setShowCreateCollection(true)}>
          <StarOutlined className={styles.outer_icon} />
          {/*{stringLabelDefault === undefined ? i('star') : stringLabelDefault}*/}
          <span>收藏</span>
        </span>
      )}
      {showCreateCollection ? (
        <CollectionComponent
          modalStatus={'list'}
          visible={showCreateCollection}
          handleShow={handleCloseCollectionModal}
          typ={bizType}
          guid={articleID}
        />
      ) : (
        ''
      )}
    </>
  );
};

export default StarPart;
