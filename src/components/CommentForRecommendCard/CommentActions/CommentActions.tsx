import {Modal} from 'antd';
import React, {useState} from 'react';
import styles from './CommentActions.less';
import CommentDelete from './CommentDelete/CommentDelete';

interface CommentActionsProps {
  /** type 0 主楼 1 楼中楼 */
  type: number;
  articleGuid: string;
  commentGuid: string;
  fetchChildComments: (type?: number, page?: number) => void;
  fetchComments: (type: number) => void;
}

const CommentActions: React.FC<CommentActionsProps> = (props) => {
  const {
    type,
    commentGuid,
    articleGuid,
    fetchChildComments,
    fetchComments,
  } = props;
  const [deleteVisible, setDeleteVisible] = useState<boolean>(false);


  return (
    (<div className={styles.container}>
      <div
        className={styles.item}
        onClick={() => {
          setDeleteVisible(true);
        }}
      >
        <span>删除帖子</span>
      </div>
      <Modal
        centered
        open={deleteVisible}
        width={440}
        footer={null}
        closable={false}
        className={styles.modal}
        getContainer={false}
      >
        <CommentDelete
          type={type}
          commentGuid={commentGuid}
          articleGuid={articleGuid}
          setDeleteVisible={setDeleteVisible}
          fetchChildComments={fetchChildComments}
          fetchComments={fetchComments}
        />
      </Modal>
    </div>)
  );
};

export default CommentActions;
