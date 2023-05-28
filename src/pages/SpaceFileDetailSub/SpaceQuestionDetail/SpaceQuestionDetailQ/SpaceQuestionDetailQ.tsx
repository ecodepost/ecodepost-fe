import {Button, Col, Row, Spin} from 'antd';
import styles from './SpaceQuestionDetailQ.less';
import classNames from 'classnames';
import {pushFileSubCreate} from '@/utils/historypush/history';
import type {ChosenSpaceType} from '@/pages/typings';
import Editor from '@/components/Editor/ReadEditor';
import {useRequestFileInfo} from '@/hooks/fileRequest/info';
import FileOperationBar from '@/components/File/FileOperationBar/FileOperationBar';

type FileProps = {
  selectedSpace: ChosenSpaceType;
  fileGuid: string;
  isCreateAnswer?: boolean;
};

const SpaceQuestionDetailQ = (props: FileProps) => {
  const {selectedSpace, fileGuid, isCreateAnswer = false} = props;

  const {article, fileStat, defaultValue, GetApiArticlesGuidRequest, articlePms} =
    useRequestFileInfo(fileGuid);

  return (
    <>
      {GetApiArticlesGuidRequest.loading ? (
        <Spin/>
      ) : (
        <div className={styles.detail_qs}>
          {article && (
            <Row gutter={20} align="middle" className={styles.detail_qs_title}>
              <Col span={20}>
                <span>{article?.name}</span>
              </Col>
              <Col span={4}>
                <FileOperationBar type="detail" fileInfo={article} filePms={articlePms}/>
              </Col>
            </Row>
          )}
          <div className={styles.detail_qs_content}>
            {defaultValue && <Editor initialValue={defaultValue}/>}
          </div>
          {!isCreateAnswer && (
            <div className={styles.detail_qs_action}>
              <Button
                className={styles.detail_qs_action_btn}
                onClick={() => {
                  pushFileSubCreate(selectedSpace.guid, fileGuid);
                }}
              >
                <i
                  className={classNames('iconfont', 'icon-bianji', styles.detail_qs_action_icon)}
                />
                <span className={styles.detail_qs_action_text}>写回答</span>
              </Button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default SpaceQuestionDetailQ;
