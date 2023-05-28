import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/zh-cn';
import styles from './CommentItems.less';
import { Comment } from '@ant-design/compatible';
import { Button, Form, Input, Pagination, Popover, Spin } from 'antd';
import React, {useState} from 'react';
import CommentItemsChild from '../CommentItemsChild/CommentItemsChild';
import CommentActions from '../CommentActions/CommentActions';
import classNames from 'classnames';
import useRequestX from '@/hooks/useRequestX';
import {GetApiFilesCommentsCommentGuidChildComment} from '@/services/base/api.gen';

dayjs.extend(relativeTime);
const {TextArea} = Input;

interface CommentItemProps {
  articleGuid: string;
  item: Commentv1CommentDetail;
  handleCreateComment: (val: { content: string }, commentGuid?: string) => void;
  fetchComments: (type: number) => void;
  createBtnLoading: boolean;
}

const CommentItems: React.FC<CommentItemProps> = (props) => {
  const [editorShow, setEditorShow] = useState<boolean>(false);
  const [innerEditorShow, setInnerEditorShow] = useState<boolean>(false);
  const [chosenCommentGuid, setChosenCommentGuid] = useState<string>('');
  const [commentExpand, setCommentExpand] = useState<boolean>(false);
  const { item, handleCreateComment, articleGuid, fetchComments, createBtnLoading } = props;
  const [childCommentLoading, setChildCommentLoading] = useState<boolean>(false);
  const [childCommentList, setChildCommentList] = useState<Commentv1CommentDetail[]>(
    item?.children || [],
  );
  const [childCommentTotal, setChildCommentTotal] = useState<number>(0);
  const [childCommentPage, setChildCommentPage] = useState<number>(1);

  const GetApiFilesGuidCommentsRequest = useRequestX(GetApiFilesCommentsCommentGuidChildComment, {
    onSuccess: (res) => {
      setChildCommentList(res.data.list || []);
      setChildCommentTotal(res.pagination?.total);
      setChildCommentLoading(false);
    },
  });

  /** type 0 fetch 1 refresh */
  const fetchChildComments = async (type?: number, page?: number) => {
    const commentGuid = item.commentGuid;
    /** 当未展开时，回复（2条）的数据是从父评论中获取的，因此需要重新加载所有评论 */
    if (!commentExpand && type === 1) {
      fetchComments(0);
      return;
    }
    setChildCommentLoading(true);
    GetApiFilesGuidCommentsRequest.run(commentGuid, {
      currentPage: page ? page : childCommentPage,
    });
  };

  const actions = [
    <div className={styles.actions} key={item.commentGuid}>
      <span onClick={() => setEditorShow(!editorShow)}>
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
  const [form] = Form.useForm();
  const [innerForm] = Form.useForm();
  const editor = (
    <div className={styles.reply} key={item.commentGuid}>
      <Form
        form={form}
        initialValues={{ content: '' }}
        onFinish={(val: { content: string }) =>
          handleCreateComment.call(null, { content: val.content }, item.commentGuid)
        }
      >
        <Form.Item name="content" rules={[{ required: true, message: '评论内容不能为空' }]}>
          <TextArea
            autoSize={{ minRows: 3 }}
            className={styles.reply_text}
            rows={4}
            placeholder={`回复 ${item.userNickname}：`}
            autoFocus
          />
        </Form.Item>
        <Form.Item noStyle>
          <Button
            htmlType="submit"
            type="primary"
            className={styles.reply_action}
            loading={createBtnLoading}
          >
            发布
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
  return (
    <div className={styles.container}>
      <Comment
        actions={editorShow ? actions.concat(editor) : actions}
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
                  type={0}
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
        content={item.content}
      >
        {commentExpand ? (
          !childCommentLoading ? (
            <>
              {childCommentList.map((child) => (
                <CommentItemsChild
                  key={child.commentGuid}
                  item={child}
                  innerEditorShow={innerEditorShow}
                  chosenCommentGuid={chosenCommentGuid}
                  setChosenCommentGuid={setChosenCommentGuid}
                  setInnerEditorShow={setInnerEditorShow}
                  fetchComments={fetchComments}
                  fetchChildComments={fetchChildComments}
                  articleGuid={articleGuid}
                />
              ))}
              <Pagination
                hideOnSinglePage
                className={styles.pagination}
                current={childCommentPage}
                defaultPageSize={20}
                onChange={(e: number) => {
                  setChosenCommentGuid('');
                  setEditorShow(false);
                  fetchChildComments(0, e);
                  setChildCommentPage(e);
                }}
                total={childCommentTotal}
              />
            </>
          ) : (
            <Spin />
          )
        ) : (
          <>
            {item.children?.map((child) => (
              <CommentItemsChild
                key={child.commentGuid}
                item={child}
                innerEditorShow={innerEditorShow}
                chosenCommentGuid={chosenCommentGuid}
                setChosenCommentGuid={setChosenCommentGuid}
                setInnerEditorShow={setInnerEditorShow}
                fetchComments={fetchComments}
                fetchChildComments={fetchChildComments}
                articleGuid={articleGuid}
              />
            ))}
            {item?.hasMoreChildComment && (
              <div
                className={styles.comment_expand}
                onClick={() => {
                  fetchChildComments(0);
                  setCommentExpand(true);
                }}
              >
                <span>展开其余回复</span>
              </div>
            )}
          </>
        )}

        {!childCommentLoading && innerEditorShow && chosenCommentGuid && (
          <Form
            form={innerForm}
            initialValues={{ content: '' }}
            onFinish={(val: { content: string }) =>
              handleCreateComment.call(null, { content: val.content }, chosenCommentGuid)
            }
            className={styles.form}
          >
            <Form.Item name="content">
              <TextArea
                autoSize={{ minRows: 3 }}
                className={styles.reply_text_bottom}
                rows={4}
                placeholder={`回复 ${
                  childCommentList.find((el) => el.commentGuid === chosenCommentGuid)?.userNickname
                }：`}
                autoFocus
              />
            </Form.Item>
            <Form.Item noStyle>
              <Button
                htmlType="submit"
                type="primary"
                className={styles.reply_action_bottom}
                loading={createBtnLoading}
              >
                发布
              </Button>
            </Form.Item>
          </Form>
        )}
      </Comment>
    </div>
  );
};

export default CommentItems;
