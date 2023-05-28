import {messageInfo} from '@/components/Message/Message';
import styles from './SpaceArticleEditBar.less';
import {useIntl, useParams} from 'umi';
import {Divider, Modal, Switch} from 'antd';
import {SpaceType} from '@/enums/spacetype';
import {pushFileEdit} from '@/utils/historypush/history';
import {
  DeleteApiArticlesGuid,
  PutApiArticlesGuidCancelRecommend,
  PutApiArticlesGuidCancelSpaceTop,
  PutApiArticlesGuidRecommend,
  PutApiArticlesGuidSpaceTop,
} from '@/services/base/api.gen';
import React, {useContext} from 'react';
import {FileOperationBarContext} from "@/components/File/FileOperationBar/FileOperationBar";

interface SpaceArticleEditBarProps {
  article: Commonv1FileShow;
  type: string; // spaceTop / normal / detail
  articlePms: DtoFilePermission;
}

const SpaceArticleEditBar: React.FC<SpaceArticleEditBarProps> = (props) => {
  const {
    article,
    type,
    articlePms,
  } = props;
  const spaceTopMap = [PutApiArticlesGuidSpaceTop, PutApiArticlesGuidCancelSpaceTop];
  const {options, fetchFileList, fetchSpaceTopList, fetchRecommendList} = useContext(FileOperationBarContext)


  const intl = useIntl();
  const i = (id: string) => intl.formatMessage({id});

  /** type区分置顶/取消置顶 0/1 */
  const handleSpaceTop = async (spaceType: number) => {
    try {
      const res = await spaceTopMap[spaceType](article.guid);
      if (res.code === 0) {
        messageInfo({
          type: 'success',
          content:
            (spaceType === SpaceType.ARTICLE ? i('cancel') : '') +
            i('article.edit.spaceTop.success'),
        });

        fetchFileList?.(1);
        fetchSpaceTopList?.();
      } else {
        messageInfo({
          type: 'error',
          content: res.msg,
        });
      }
    } catch (err) {
      messageInfo({
        type: 'error',
        content:
          (spaceType === SpaceType.ARTICLE ? i('cancel') : '') + i('article.edit.spaceTop.fail'),
      });
    }
  };

  const handleDelete = async () => {
    try {
      const res = await DeleteApiArticlesGuid(article.guid);
      if (res.code === 0) {
        messageInfo({
          type: 'success',
          content: i('article.edit.delete.success'),
        });
        fetchFileList?.(1);
        fetchSpaceTopList?.();
      } else {
        messageInfo({
          type: 'error',
          content: res.msg,
        });
      }
    } catch (err) {
      messageInfo({
        type: 'error',
        content: i('article.edit.delete.fail'),
      });
    }
  };

  const handleRecommend = async (recommendType: number) => {
    const recommendMap = [PutApiArticlesGuidRecommend, PutApiArticlesGuidCancelRecommend];
    try {
      const res = await recommendMap[recommendType](article.guid);
      if (res.code === 0) {
        messageInfo({
          type: 'success',
          content: (recommendType === 0 ? '' : i('cancel')) + i('article.edit.recommend.success'),
        });
        fetchRecommendList?.();
        fetchFileList?.(1);
        fetchSpaceTopList?.();
      } else {
        messageInfo({
          type: 'error',
          content: res.msg,
        });
      }
    } catch (err) {
      messageInfo({
        type: 'error',
        content: (recommendType === 0 ? '' : i('cancel')) + i('article.edit.recommend.fail'),
      });
    }
  };

  // 渲染置顶
  const renderSpaceTop = () => {
    return (
      options &&
      options?.isOpenSiteTop &&
      articlePms &&
      articlePms?.isAllowSiteTop && (
        <div className={styles.popover_item}>
          <span className={styles.popover_item_title}>{i('article.edit.action.spaceTop')}</span>
          <Switch
            checked={type == 'spaceTop'}
            size="small"
            onClick={(checked, _) => {
              if (checked) {
                handleSpaceTop(0);
              } else {
                handleSpaceTop(1);
              }
            }}
          />
        </div>
      )
    );
  };

  // 渲染推荐
  const renderRecommend = () => {
    return (
      options &&
      options?.isOpenRecommend &&
      articlePms &&
      articlePms?.isAllowRecommend && (
        <div className={styles.popover_item}>
          <span>{i('article.edit.action.recommend')}</span>
          <Switch
            checked={!!article?.isRecommend}
            size="small"
            onClick={(checked, _) => {
              if (checked) {
                handleRecommend(0);
              } else {
                handleRecommend(1);
              }
            }}
          />
        </div>
      )
    );
  };

  // 渲染评论
  const renderComment = () => {
    return (
      options &&
      options?.isOpenComment &&
      articlePms?.isAllowSetComment && (
        <div className={styles.popover_item}>
          <span>{i('article.edit.action.canComment')}</span>
          <Switch
            checked={!!article?.isAllowCreateComment}
            size="small"
            onClick={(checked, _) => {
              if (checked) {
                handleSpaceTop(0);
              } else {
                handleSpaceTop(1);
              }
            }}
          />
        </div>
      )
    );
  };

  return (
    <>
      {articlePms && (
        <div className={styles.popover}>
          {renderSpaceTop()}
          {renderRecommend()}
          {renderComment()}
          {articlePms?.isAllowWrite && (
            <div
              className={styles.popover_item}
              onClick={() => pushFileEdit(article.spaceGuid, article.guid)}
            >
              <span>{i('article.edit.action.edit')}</span>
            </div>
          )}
          {articlePms?.isAllowDelete && (
            <>
              <Divider className={styles.popover_divider}></Divider>
              <div
                className={styles.popover_item}
                onClick={() =>
                  Modal.confirm({
                    content: i('article.edit.action.delete.confirm'),
                    onOk: handleDelete,
                  })
                }
              >
                <span className={styles.popover_item_del}>{i('article.edit.action.delete')}</span>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default SpaceArticleEditBar;
