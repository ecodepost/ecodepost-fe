import styles from './SpaceCreateAnswer.less';
import Editor from '@/components/Editor/WriteEditor';
import { Button } from 'antd';
import { useState } from 'react';
import { useIntl } from 'umi';
import SpaceQuestionDetailQ from '../../SpaceFileDetail/SpaceQuestionDetail/SpaceQuestionDetailQ/SpaceQuestionDetailQ';
import { pushFileDetail } from '@/utils/historypush/history';
import type { ChosenSpaceType } from '@/pages/typings';
import { PostApiQuestionsGuidAnswers } from '@/services/base/api.gen';
import useRequestX from '@/hooks/useRequestX';
import DetailHeader from '@/components/Header/DetailHeader/DetailHeader';

type FileProps = {
  selectedSpace: ChosenSpaceType;
  spacePms: Spacev1GetSpacePermissionByUidResponse;
  fileGuid: string;
};

const SpaceCreateAnswer = (props: FileProps) => {
  const { fileGuid, selectedSpace } = props;
  const [postConent, setPostContent] = useState();
  const intl = useIntl();
  const i = (id: string) => intl.formatMessage({ id });

  const PostApiQuestionsGuidAnswersRequest = useRequestX(PostApiQuestionsGuidAnswers, {
    onSuccess: (res) => {
      pushFileDetail(selectedSpace.guid, fileGuid);
    },
  });

  return (
    <div className={styles.top_container}>
      <DetailHeader></DetailHeader>
      <div className={styles.container}>
        <div className={styles.header}>
          <SpaceQuestionDetailQ
            selectedSpace={selectedSpace}
            fileGuid={fileGuid}
            isCreateAnswer={true}
          />
        </div>
        <div className={styles.editor}>
          <Editor
            spaceGuid={selectedSpace.guid}
            onChange={(value) => {
              setPostContent(value);
            }}
          />
        </div>
        <div className={styles.action_btn_container}>
          <Button
            type="primary"
            loading={PostApiQuestionsGuidAnswersRequest.loading}
            className={styles.action_btn}
            onClick={() =>
              PostApiQuestionsGuidAnswersRequest.run(fileGuid, {
                content: postConent,
                spaceGuid: selectedSpace.guid,
                name: i('createAns.untitled'),
              })
            }
          >
            {i('createAns.submit')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SpaceCreateAnswer;
