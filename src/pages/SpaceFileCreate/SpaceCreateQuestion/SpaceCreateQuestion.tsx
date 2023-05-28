import Editor from '@/components/Editor/WriteEditor';
import { Button, Input } from 'antd';
import { useState } from 'react';
import { useIntl } from 'umi';
import styles from './SpaceCreateQuestion.less';
import { pushFileList } from '@/utils/historypush/history';
import type { ChosenSpaceType } from '@/pages/typings';
import { PostApiQuestions } from '@/services/base/api.gen';
import useRequestX from '@/hooks/useRequestX';
import DetailHeader from '@/components/Header/DetailHeader/DetailHeader';

type SpaceCreateQuestionProps = {
  selectedSpace: ChosenSpaceType;
  spacePms: Spacev1GetSpacePermissionByUidResponse;
};

const SpaceCreateQuestion = (props: SpaceCreateQuestionProps) => {
  const {  selectedSpace } = props;
  const [postContent, setPostContent] = useState<string>();
  const [name, setName] = useState<string>('');
  const intl = useIntl();
  const i = (id: string) => intl.formatMessage({ id });

  const PostApiQuestionsRequest = useRequestX(PostApiQuestions, {
    onSuccess: (res) => {
      setName('');
      setPostContent('');
      pushFileList(selectedSpace.guid);
    },
  });

  const handleCreateQuestion = async () => {
    await PostApiQuestionsRequest.run({
      name,
      content: postContent,
      spaceGuid: selectedSpace.guid,
    });
  };
  return (
    <>
      <div className={styles.top_container}>
        <DetailHeader></DetailHeader>
        <div className={styles.container}>
          <div className={styles.title}>
            <div className={styles.title_input}>
              <Input
                bordered={false}
                placeholder={i('createQuestion.title.placeholder')}
                className={styles.title_input_text}
                onChange={(e) => setName(e.target.value)}
              />
              <div className={styles.action_btn_container}>
                <Button
                  style={{ marginRight: 12 }}
                  className={styles.action_btn}
                  onClick={() => {
                    pushFileList(selectedSpace.guid);
                  }}
                >
                  {i('back')}
                </Button>
                <Button
                  type="primary"
                  loading={PostApiQuestionsRequest.loading}
                  className={styles.action_btn}
                  onClick={() => handleCreateQuestion()}
                >
                  {i('publish')}
                </Button>
              </div>
            </div>
          </div>
          <div className={styles.editor}>
            <Editor
              spaceGuid={selectedSpace.guid}
              onChange={(value) => {
                setPostContent(value);
              }}
              topHeader={true}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default SpaceCreateQuestion;
