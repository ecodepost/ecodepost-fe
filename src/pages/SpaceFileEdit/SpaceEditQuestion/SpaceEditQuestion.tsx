import Editor from '@/components/Editor/WriteEditor';
import { Button, Input, Skeleton } from 'antd';
import { useEffect, useState } from 'react';
import { useIntl } from 'umi';
import styles from './SpaceEditQuestion.less';
import { pushFileDetail } from '@/utils/historypush/history';
import type { ChosenSpaceType } from '@/pages/typings';
import { useRequestFileInfo } from '@/hooks/fileRequest/info';
import { PutApiQuestionsGuid } from '@/services/base/api.gen';
import useRequestX from '@/hooks/useRequestX';
import DetailHeader from '@/components/Header/DetailHeader/DetailHeader';
import {LayoutFileProps} from "@/pages/typings";


const SpaceEditQuestion = (props: LayoutFileProps) => {
  const [name, setName] = useState<string>('');
  const { selectedSpace, fileGuid } = props;
  const [postContent, setPostContent] = useState();
  const { fileLoading, article, defaultValue } = useRequestFileInfo(fileGuid);

  const intl = useIntl();
  const i = (id: string) => intl.formatMessage({ id });

  useEffect(() => {
    if (!article) {
      return;
    }
    setName(article.name);
  }, [article]);

  const PutApiQuestionsGuidRequest = useRequestX(PutApiQuestionsGuid, {
    onSuccess: (res) => {
      setName('');
      pushFileDetail(selectedSpace.guid, fileGuid);
    },
  });

  const handlePublishArticle = async () => {
    await PutApiQuestionsGuidRequest.run(fileGuid, {
      name,
      content: postContent,
    });
  };
  return (
    <div className={styles.top_container}>
      <DetailHeader></DetailHeader>
      <Skeleton
        loading={fileLoading}
        style={{
          minHeight: 200,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div className={styles.container}>
          <div className={styles.title}>
            <div className={styles.title_input}>
              <Input
                bordered={false}
                placeholder={i('editQuestion.title.placeholder')}
                className={styles.title_input_text}
                defaultValue={name}
                onChange={(e) => setName(e.target.value)}
              />
              <div className={styles.action_btn_container}>
                <Button
                  style={{ marginRight: 12 }}
                  className={styles.action_btn}
                  onClick={() => {
                    pushFileDetail(selectedSpace.guid, fileGuid);
                  }}
                >
                  {i('cancel')}
                </Button>
                <Button
                  type="primary"
                  loading={PutApiQuestionsGuidRequest.loading}
                  className={styles.action_btn}
                  onClick={() => handlePublishArticle()}
                >
                  {i('publish')}
                </Button>
              </div>
            </div>
          </div>
          <div className={styles.editor}>
            {defaultValue != undefined && (
              <Editor
                value={defaultValue}
                onChange={(value) => {
                  setPostContent(value);
                }}
                spaceGuid={selectedSpace.guid}
                topHeader={true}
              />
            )}
          </div>
        </div>
      </Skeleton>
    </div>
  );
};

export default SpaceEditQuestion;
