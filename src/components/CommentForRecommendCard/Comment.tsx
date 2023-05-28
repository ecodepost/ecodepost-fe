import {Button, Form, Input, Pagination, Skeleton} from 'antd';
import React, {useEffect, useState} from 'react';
import CommentItems from './CommentItems/CommentItems';
import NeedToLogin from '@/components/NeedToLogin/NeedToLogin';
import styles from './Comment.less';
import {useIntl, useModel} from 'umi';
import {messageInfo} from '@/components/Message/Message';
import {GetApiFilesGuidComments, PostApiFilesComments} from '@/services/base/api.gen';
import useRequestX from '@/hooks/useRequestX';

const {TextArea} = Input;

interface CommentProps {
  commentType: 'article' | 'answer'; // 如果article，有评论
  isOpenComment?: boolean; // 文章详情页，打开评论
  articleGuid: string;
  replyCnt?: number;
  setContentForCommentContainer: any;
}

const Comment: React.FC<CommentProps> = (props) => {
  const {commentType, articleGuid, setContentForCommentContainer, isOpenComment} = props;
  const [expand, setExpand] = useState<boolean>(false);
  const [commentList, setCommentList] = useState<Commentv1CommentDetail[]>();
  const [form] = Form.useForm();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);
  const {
    initialState: { isOnline, checkLogin },
  } = useModel('@@initialState');
  const [cntReply, setCntReply] = useState<number>(props?.replyCnt || 0);
  const intl = useIntl();
  const i = (id: string) => intl.formatMessage({ id });

  const GetApiFilesGuidCommentsRequest = useRequestX(GetApiFilesGuidComments, {
    onSuccess: (res) => {
      setTotal(res.pagination?.total || res.data.list?.length);
      setCommentList(res.data.list || []);
    },
  });

  const PostApiFilesCommentsRequest = useRequestX(PostApiFilesComments, {});

  const fetchComments = async (type: number = 1, page?: number) => {
    /** type 0 refresh 1 normal */
    if (type === 1 && expand) {
      setExpand(false);
      return;
    }
    setCommentList(undefined);
    setExpand(true);
    await GetApiFilesGuidCommentsRequest.run(articleGuid, {
      currentPage: page ? page : currentPage,
    });
  };

  useEffect(() => {
    if (!isOpenComment) return;
    fetchComments(1).then()
  }, [isOpenComment]);

  const [createBtnLoading, setCreateBtnLoading] = useState<boolean>(false);
  const handleCreateComment = async (val: { content: string }, commentGuid?: string) => {
    const { content } = val;
    if (content === '' || content === undefined) {
      messageInfo({
        type: 'error',
        content: '评论内容不能为空',
      });
      return;
    }
    setCreateBtnLoading(true);

    PostApiFilesCommentsRequest.run({
      guid: articleGuid,
      content,
      commentGuid: commentGuid ? commentGuid : '',
    }).then((res) => {
      form.resetFields();
      setCreateBtnLoading(false);
      if (commentGuid) {
        fetchComments(0); // todo 只获取子评论
      } else {
        fetchComments(0);
      }
      setCntReply((prev) => prev + 1);
    });
  };

  const replyContent = expand && (
    <>
      <div className={styles.input}>
        <Form onFinish={handleCreateComment} form={form} initialValues={{ content: '' }}>
          <Form.Item name="content" rules={[{ required: true, message: '请输入评论内容' }]}>
            <TextArea
              autoSize={{ minRows: 4 }}
              className={styles.input_text}
              rows={4}
              placeholder="写下你的评论"
            />
          </Form.Item>
          <Form.Item noStyle>
            <Button
              htmlType="submit"
              type="primary"
              className={styles.input_action}
              loading={createBtnLoading}
            >
              发布
            </Button>
          </Form.Item>
        </Form>
      </div>
      <Skeleton loading={GetApiFilesGuidCommentsRequest.loading}>
        {commentList &&
          commentList.map((item) => (
            <CommentItems
              item={item}
              key={item.commentGuid}
              handleCreateComment={handleCreateComment}
              createBtnLoading={createBtnLoading}
              articleGuid={articleGuid}
              fetchComments={fetchComments}
            />
          ))}
        {commentList && (
          <Pagination
            hideOnSinglePage
            className={styles.pagination}
            current={currentPage}
            defaultPageSize={20}
            onChange={(e: number) => {
              fetchComments(0, e);
              setCurrentPage(e);
            }}
            total={total}
          />
        )}
      </Skeleton>
    </>
  );

  useEffect(() => {
    if (expand) {
      if (!isOnline()) {
        setContentForCommentContainer(
          <NeedToLogin
            login={i('cmt.login')}
            signup={i('cmt.signup')}
            checkLogin={checkLogin}
          />
        );
      } else {
        setContentForCommentContainer(replyContent);
      }
    } else {
      setContentForCommentContainer(undefined);
    }
  }, [expand, commentList, GetApiFilesGuidCommentsRequest.loading]);

  return (
    <>
      <div className={styles.container}>
        {commentType === 'article' && (
          <div className={styles.header}>
            <span className={styles.header_action} onClick={() => fetchComments(1)}>
              <i className="iconfont icon-pingjia" />
              &nbsp;
              {cntReply > 0 ? cntReply : '评论'}
            </span>
          </div>
        )}
      </div>
    </>
  );
};

export default Comment;
