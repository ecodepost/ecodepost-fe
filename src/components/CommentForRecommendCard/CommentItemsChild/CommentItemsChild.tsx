import styles from './CommentItemsChild.less';
import { Comment } from '@ant-design/compatible';
import { Popover } from 'antd';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/zh-cn';
import CommentActions from '../CommentActions/CommentActions';
import classNames from 'classnames';
import React from 'react';

dayjs.extend(relativeTime);

interface CommentItemsChildProps {
  item: Commentv1CommentDetail;
  innerEditorShow: boolean;
  setInnerEditorShow: (val: boolean) => void;
  chosenCommentGuid: string;
  setChosenCommentGuid: (val: string) => void;
  fetchComments: (type: number) => void;
  fetchChildComments: (type?: number, page?: number) => void;
  articleGuid: string;
}

const CommentItemsChild: React.FC<CommentItemsChildProps> = (props) => {
  const {
    articleGuid,
    item,
    fetchComments,
    fetchChildComments,
    innerEditorShow,
    setInnerEditorShow,
    chosenCommentGuid,
    setChosenCommentGuid,
  } = props;

  const actions = [
    <div className={styles.actions} key={item.commentGuid}>
      <span
        onClick={() => {
          if (innerEditorShow) {
            if (chosenCommentGuid === item.commentGuid) {
              setInnerEditorShow(false);
              setChosenCommentGuid('');
            } else {
              setChosenCommentGuid(item.commentGuid);
            }
          } else {
            setInnerEditorShow(true);
            setChosenCommentGuid(item.commentGuid);
          }
        }}
      >
        <i className="iconfont icon-pingjia" />
        &nbsp;回复
      </span>
      {/*<span>*/}
      {/*  <i className="iconfont icon-zan" />*/}
      {/*  &nbsp;0*/}
      {/*</span>*/}
      {/*<span>*/}
      {/*  <i className="iconfont icon-zan" style={{ display: 'inline-block', rotate: '180deg' }} />*/}
      {/*  &nbsp;0*/}
      {/*</span>*/}
    </div>,
  ];
  return (
    <div className={styles.container}>
      <Comment
        actions={actions}
        author={
          <div className={styles.info}>
            <div>
              <span className={styles.author}>{item.userNickname}</span>
              <span className={styles.time}>
                {dayjs.unix(item.ctime).locale('zh-cn').fromNow()}
              </span>
            </div>
            <Popover
              getPopupContainer={(triggerNode) => triggerNode?.parentNode as HTMLElement}
              content={
                <CommentActions
                  type={1}
                  fetchComments={fetchComments}
                  fetchChildComments={fetchChildComments}
                  commentGuid={item.commentGuid}
                  articleGuid={articleGuid}
                />
              }
              trigger="hover"
              placement="bottomRight"
            >
              <i className={classNames('iconfont', 'icon-icon', styles.setting)} />
            </Popover>
          </div>
        }
        avatar={
          item.userAvatar
            ? item.userAvatar
            : `${CDN_DOMAIN}/ofimage/avatar/20220513/18061a1e7d1f45f28b67e0c410e2ef5c.jpeg`
        }
        content={
          <div className={styles.content}>
            {item?.isReply === 1 && item.replyToGuid !== item.replyToRootGuid ? (
              <>
                <span>回复</span>
                <span style={{ color: 'var(--themeColorPrimary)' }}>@{item.replyNickname}</span>
                <span>：&nbsp;{item.content}</span>
              </>
            ) : (
              <span>{item.content}</span>
            )}
          </div>
        }
      />
    </div>
  );
};
export default CommentItemsChild;
