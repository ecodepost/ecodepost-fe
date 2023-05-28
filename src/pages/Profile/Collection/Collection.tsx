import styles from './Collection.less';
import CollectionComponent from '@/components/Collection/Collection';
import { InboxOutlined, StarFilled } from '@ant-design/icons';
import { Button, Empty } from 'antd';
import { useParams } from 'umi';
import React, { useEffect, useState } from 'react';
import { BizType } from '@/enums/biztype';
import dayjs from 'dayjs';
import { pushFileDetail } from '@/utils/historypush/history';
import {
  DeleteApiMyCollectionGroupsCollections,
  GetApiMyCollectionGroups,
  GetApiMyCollectionGroupsCgidCollections,
} from '@/services/base/api.gen';
import useRequestX from '@/hooks/useRequestX';

const Collection: React.FC = (props) => {
  const { name } = useParams<{ name: string }>();
  const [showCreateCollection, setShowCreateCollection] = useState<boolean>(false);
  const [collectionStatus, setCollectionStatus] = useState<'new' | 'list'>('list');
  const [collectionGroups, setCollectionGroups] = useState<Statv1CollectionGroupInfo[]>();
  const [collectedID, setCollectedID] = useState<number>(0);
  const [collectionList, setCollectionList] = useState<MyCollectionInfo[]>();
  const [isManager, setIsManager] = useState<boolean>(false);

  const handleCollectionShow = () => {
    setShowCreateCollection(true);
  };

  const GetApiMyCollectionGroupsCgidCollectionsReq = useRequestX(
    GetApiMyCollectionGroupsCgidCollections,
    {
      onSuccess: ({ data }) => {
        setCollectionList(data.list || []);
      },
    },
  );

  const handleCollectionChange = async (id: number) => {
    setCollectedID(id);
    await GetApiMyCollectionGroupsCgidCollectionsReq.run(id, {
      currentPage: 0,
      pageSize: 0,
      sort: '',
    });
  };

  const GetApiMyCollectionGroupsReq = useRequestX(GetApiMyCollectionGroups, {
    onSuccess: ({ data }) => {
      setCollectionGroups(data.list || []);
      if (data.list && data.list.length > 0) {
        handleCollectionChange(data.list[0].id);
      }
    },
  });

  const handleCloseCollectionModal = () => {
    setShowCreateCollection(false);
    GetApiMyCollectionGroupsReq.run();
  };

  const DeleteApiMyCollectionGroupsCollectionsReq = useRequestX(
    DeleteApiMyCollectionGroupsCollections,
    {
      onSuccess: () => {
        handleCollectionChange(collectedID);
      },
    },
  );

  const handleUnCollection = async (id: string, bizType: BizType) => {
    await DeleteApiMyCollectionGroupsCollectionsReq.run({
      collectionGroupIds: [collectedID],
      type: bizType,
      guid: id,
    });
  };

  useEffect(() => {
    GetApiMyCollectionGroupsReq.run();
  }, [name]);

  const ArticleType = (item: any) => {
    return (
      <div className={styles.card}>
        <div
          className={styles.title}
          onClick={() => {
            pushFileDetail(item.bizItem.spaceGuid, item.bizItem.guid);
          }}
        >
          {item.bizItem.name}
        </div>
        <div className={styles.content}>{item.bizItem.summary}</div>
        <div className={styles.infoRow}>
          <div className={styles.info}>
            <img className={styles.infoAvatar} src={item.bizItem.avatar} alt="" />
            <span className={styles.infoSpan}>{item.bizItem.nickname}</span>
            <span className={styles.infoSpan}>{item.from}</span>
            <span className={styles.infoSpan}>
              {dayjs(item.bizItem.ctime * 1000).format('YYYY/MM/DD HH:mm:ss')}
            </span>
          </div>
          <div className={styles.infoAction}>
            <div
              className={styles.infoSpan}
              onClick={() => handleUnCollection(item.bizItem.guid, BizType.ARTICLE)}
            >
              <StarFilled style={{ color: 'var(--themeColorPrimary)' }} /> 取消收藏
            </div>
            <div
              className={styles.infoSpan}
              onClick={() => {
                handleCollectionShow();
                setCollectionStatus('list');
                setIsManager(true);
              }}
            >
              <InboxOutlined /> 添加其他收藏夹
            </div>
          </div>
        </div>
      </div>
    );
  };

  const QuestionType = (item: any) => {
    return (
      <div className={styles.card}>
        <p>
          <img className={styles.infoAvatar} src={item.bizItem.avatar} alt="" />
          <span className={styles.infoSpan}>{item.bizItem.nickname}</span>
          提问了
        </p>
        <p
          className={styles.title}
          onClick={() => {
            pushFileDetail(item.bizItem.spaceGuid, item.bizItem.guid);
          }}
        >
          {item.bizItem.name}
        </p>
        <div className={styles.content}>{item.bizItem.summary}</div>
        <div className={styles.infoRow}>
          <div className={styles.info}>
            <span className={styles.infoSpan}>{item.bizItem.spaceGuid}</span>
            <span className={styles.infoSpan}>
              {dayjs(item.bizItem.ctime * 1000).format('YYYY/MM/DD HH:mm:ss')}
            </span>
          </div>
          <div className={styles.infoAction}>
            <div
              className={styles.infoSpan}
              onClick={() => handleUnCollection(item.bizItem.guid, BizType.ARTICLE)}
            >
              <StarFilled style={{ color: 'var(--themeColorPrimary)' }} /> 取消收藏
            </div>
            <div
              className={styles.infoSpan}
              onClick={() => {
                handleCollectionShow();
                setCollectionStatus('list');
                setIsManager(true);
              }}
            >
              <InboxOutlined /> 添加其他收藏夹
            </div>
          </div>
        </div>
      </div>
    );
  };

  const AnswerType = (item: any) => {
    return (
      <div className={styles.card}>
        <p>
          <img className={styles.infoAvatar} src={item.bizItem.avatar} alt="" />
          <span className={styles.infoSpan}>{item.bizItem.nickname}</span>
          回答了
        </p>
        <p
          className={styles.title}
          onClick={() => {
            pushFileDetail(item.bizItem.spaceGuid, item.bizItem.guid);
          }}
        >
          {item.bizItem.name}
        </p>
        <div className={styles.content}>{item.bizItem.summary}</div>
        <div className={styles.infoRow}>
          <div className={styles.info}>
            <span className={styles.infoSpan}>{item.bizItem.spaceGuid}</span>
            <span className={styles.infoSpan}>
              {dayjs(item.bizItem.ctime * 1000).format('YYYY/MM/DD HH:mm:ss')}
            </span>
          </div>
          <div className={styles.infoAction}>
            <div
              className={styles.infoSpan}
              onClick={() => handleUnCollection(item.bizItem.guid, BizType.ARTICLE)}
            >
              <StarFilled style={{ color: 'var(--themeColorPrimary)' }} /> 取消收藏
            </div>
            <div
              className={styles.infoSpan}
              onClick={() => {
                handleCollectionShow();
                setCollectionStatus('list');
                setIsManager(true);
              }}
            >
              <InboxOutlined /> 添加其他收藏夹
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.collectionContainer}>
      <div className={styles.cateRow}>
        <div>
          {collectionGroups &&
            (collectionGroups.length > 0 ? (
              collectionGroups.map((item) => {
                return (
                  <Button
                    key={item.id}
                    onClick={() => handleCollectionChange(item.id)}
                    className={
                      collectedID == item.id ? styles.cateButtonChoose : styles.cateButtonUnChoose
                    }
                    loading={GetApiMyCollectionGroupsCgidCollectionsReq.loading}
                  >
                    {item.title}
                  </Button>
                );
              })
            ) : (
              <Empty />
            ))}
        </div>
        <div>
          <Button
            className={styles.cateButton}
            onClick={() => {
              handleCollectionShow();
              setCollectionStatus('list');
              setIsManager(true);
            }}
          >
            管理
          </Button>
          <Button
            className={styles.cateButton}
            onClick={() => {
              handleCollectionShow();
              setCollectionStatus('new');
              setIsManager(false);
            }}
          >
            创建收藏夹
          </Button>
        </div>
      </div>
      <div className={styles.cardList}>
        {collectionList &&
          (collectionList.length > 0 ? (
            collectionList.map((item) => {
              if (item.bizType == BizType.ARTICLE) {
                return ArticleType(item);
              } else if (item.bizType == BizType.QUESTION) {
                return QuestionType(item);
              } else if (item.bizType == BizType.ANSWER) {
                return AnswerType(item);
              }
              return null;
            })
          ) : (
            <Empty />
          ))}
      </div>
      <CollectionComponent
        modalStatus={collectionStatus}
        visible={showCreateCollection}
        handleShow={handleCloseCollectionModal}
        isManager={isManager}
      />
    </div>
  );
};

export default Collection;
