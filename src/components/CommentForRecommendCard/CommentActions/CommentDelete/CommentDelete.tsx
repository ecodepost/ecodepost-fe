import {Button} from 'antd';
import classNames from 'classnames';
import React, {useState} from 'react';
import styles from './CommentDelete.less';
import useRequestX from "@/hooks/useRequestX";
import {DeleteApiFilesCommentsCommentGuid} from "@/services/base/api.gen";

interface CommentDeleteProps {
  type: number;
  articleGuid: string;
  commentGuid: string;
  setDeleteVisible: (visible: boolean) => void;
  fetchChildComments: (type?: number, page?: number) => void;
  fetchComments: (type: number) => void;
}

const CommentDelete: React.FC<CommentDeleteProps> = (props) => {
  const {
    type,
    commentGuid,
    setDeleteVisible,
    fetchChildComments,
    fetchComments,
  } = props;
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);

  const DeleteApiFilesCommentsCommentGuidRequest = useRequestX(DeleteApiFilesCommentsCommentGuid, {
    onSuccess: (res) => {
      setConfirmLoading(false);
      switch (type) {
        case 0:
          fetchComments(0);
          break;
        case 1:
          fetchChildComments(1, 1);
          break;
        default:
          break;
      }
    }
  })

  const handleDeleteComment = async () => {
    setConfirmLoading(true);
    await DeleteApiFilesCommentsCommentGuidRequest.run(commentGuid)
  };
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <i className={classNames('iconfont', 'icon-icontanhao', styles.content_icon)}/>
        <span className={styles.content_text}>删除评论后，评论下所有的回复都会被删除</span>
      </div>
      <div className={styles.action}>
        <Button
          className={styles.action_btn}
          style={{ color: 'black' }}
          onClick={(e: any) => {
            setDeleteVisible(false);
            e.stopPropagation();
          }}
        >
          取消
        </Button>
        <Button
          className={styles.action_btn}
          style={{ marginLeft: 20 }}
          type="primary"
          loading={confirmLoading}
          onClick={() => handleDeleteComment()}
        >
          删除评论
        </Button>
      </div>
    </div>
  );
};

export default CommentDelete;
