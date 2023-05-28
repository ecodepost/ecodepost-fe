import { messageInfo } from '@/components/Message/Message';
import Editor from '@/components/Editor/WriteEditor';
import { getAnswerInfo, updateAnswer } from '@/services/questions/api';
import { Button, Spin } from 'antd';
import { useEffect, useState } from 'react';
import { useIntl, useParams } from 'umi';
import SpaceQuestionDetailQ from '../../SpaceFileDetail/SpaceQuestionDetail/SpaceQuestionDetailQ/SpaceQuestionDetailQ';
import styles from './SpaceEditAnswer.less';
import { pushFileDetail } from '@/utils/historypush/history';

const SpaceEditAnswer = () => {
  const [updateLoading, setUpdateLoading] = useState<boolean>(false);
  const [contentLoading, setContentLoading] = useState<boolean>(false);
  const [content, setContent] = useState<string>();
  const [postContent, setPostContent] = useState<string>();
  const { spaceGuid, questionid, answerid } = useParams<{
    spaceGuid: string;
    questionid: string;
    answerid: string;
  }>();

  const intl = useIntl();
  const i = (id: string) => intl.formatMessage({ id });

  const fetchAnswerInfo = async () => {
    try {
      setContentLoading(true);
      const res = await getAnswerInfo(answerid);
      if (res.code === 0) {
        setContent(res.data.file.content);
        setContentLoading(false);
      } else {
        messageInfo({
          type: 'error',
          content: res.msg,
        });
      }
    } catch (err) {
      messageInfo({
        type: 'error',
        content: i('editAns.fetchAns.fail'),
      });
    }
  };

  useEffect(() => {
    fetchAnswerInfo();
  }, []);

  const handlePublishArticle = async () => {
    setUpdateLoading(true);
    try {
      const res = await updateAnswer(answerid, {
        name: i('editAns.untitled'),
        content: postContent,
        headImage: '',
      });
      if (res.code === 0) {
        messageInfo({
          type: 'success',
          content: i('editAns.update.success'),
        });
        setContent('');
        setUpdateLoading(false);
        pushFileDetail(spaceGuid, questionid);
      } else {
        setUpdateLoading(false);
        messageInfo({
          type: 'error',
          content: res.msg,
        });
      }
    } catch (err) {
      setUpdateLoading(false);
      messageInfo({
        type: 'error',
        content: i('editAns.update.fail'),
      });
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <SpaceQuestionDetailQ />
      </div>
      {contentLoading ? (
        <Spin />
      ) : (
        <div className={styles.container}>
          <div className={styles.editor}>
            <Editor
              initialValue={content}
              onChange={(value) => {
                setPostContent(value);
              }}
            />
          </div>
        </div>
      )}
      <div className={styles.action_btn_container}>
        <Button
          type="primary"
          loading={updateLoading}
          className={styles.action_btn}
          onClick={() => handlePublishArticle()}
        >
          {i('publish')}
        </Button>
      </div>
    </div>
  );
};

export default SpaceEditAnswer;
