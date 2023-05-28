import LoadMore from '@/components/LoadMore/LoadMore';
import {Button, Skeleton} from 'antd';
import styles from './SpaceQuestionDetail.less';
import classNames from 'classnames';
import {useEffect, useState} from 'react';
import {useIntl, useModel} from 'umi';
import {
  GetApiQuestionsGuid,
  PostApiQuestionsGuidAnswers,
  PutApiQuestionsAnswersAnswerGuid
} from '@/services/base/api.gen';
import SpaceQuestionDetailCard from './SpaceQuestionDetailCard/SpaceQuestionDetailCard';
import {LayoutSubFileProps} from '@/pages/typings';
import {useRequestFileList} from '@/hooks/fileRequest/list';
import DetailHeader from '@/components/Header/DetailHeader/DetailHeader';
import {useRequestFileInfo} from '@/hooks/fileRequest/info';
import EditorContentShow from '@/components/Editor/EditorContentShow/EditorContentShow';
import useRequestX from '@/hooks/useRequestX';
import Editor from '@/components/Editor/WriteEditor';
import EMPTY_SPACE from '@/static/empty_space.png';
import {messageInfo} from '@/components/Message/Message';
import {pushFileSubDetail} from "@/utils/historypush/history";
import {useRequestFileBaseInfo} from "@/hooks/fileRequest/baseInfo";

const SpaceQuestionDetail = (props: LayoutSubFileProps) => {
  const {selectedSpace, fileGuid, spacePms, subFileGuid} = props;
  const [writingAnswer, setWritingAnswer] = useState<boolean>(false);
  const [postContent, setPostContent] = useState<string>();

  const intl = useIntl();
  const i = (id: string) => intl.formatMessage({id});
  const {
    initialState: {currentUser},
  } = useModel('@@initialState');
  const [answerType, setAnswerType] = useState<number>() // 1 创建回答，2 查看回答，3 编辑回答

  const {article, fileStat, defaultValue, GetApiArticlesGuidRequest, articlePms} = useRequestFileInfo(fileGuid);

  const {isRenderList, fileList, myFileStats, total, fetchFileList, fileListLoading} = useRequestFileList(currentUser, {
    fileGuid: fileGuid,
  });

  const [answerContentValue, setAnswerContentValue] = useState<string>()

  const {
    fileContentValue: remoteAnswerContentValue,
    GetApiArticlesGuidRequest: getAnswerGuidReq
  } = useRequestFileBaseInfo();

  const [answerGuid, setAnswerGuid] = useState<string>(); // 如果不为空，说明有回答过

  const PostApiQuestionsGuidAnswersRequest = useRequestX(PostApiQuestionsGuidAnswers, {
    onSuccess: (res) => {
      messageInfo({
        type: 'success',
        content: i('createAns.submit.success'),
      });
      setWritingAnswer(false);
      setAnswerContentValue('');
      fetchFileList(1);
    },
  });


  const PutApiQuestionsAnswersAnswerGuidReq = useRequestX(PutApiQuestionsAnswersAnswerGuid, {
    onSuccess: (res) => {
      messageInfo({
        type: 'success',
        content: i('createAns.submit.success'),
      });
      setWritingAnswer(false);
      setAnswerContentValue('');
      fetchFileList(1);
    },
  });

  // 该用户是否回答过这个问题
  const GetApiQuestionsGuidReq = useRequestX(GetApiQuestionsGuid, {
    onSuccess: (res) => {
      setAnswerGuid(res.data.myAnswerGuid)
      if (res.data.myAnswerGuid === "") {
        setAnswerType(1)
      } else if (res.data.myAnswerGuid === subFileGuid) {
        setAnswerType(3)
      } else {
        setAnswerType(2)
      }
    }
  })

  useEffect(() => {
    if (writingAnswer && answerType) {
      switch (answerType) {
        case 1:
          setAnswerContentValue('')
          break
        case 2:
          break
        case 3:
          getAnswerGuidReq.run(subFileGuid)
          break
      }
    }
  }, [writingAnswer, answerType])

  useEffect(() => {
    if (!remoteAnswerContentValue) return
    setAnswerContentValue(remoteAnswerContentValue)
  }, [remoteAnswerContentValue]);


  useEffect(() => {
    GetApiQuestionsGuidReq.run(fileGuid)
  }, [fileGuid])

  const renderAnswerButton = () => {
    // 说明接口还没响应
    if (answerType == undefined) {
      return null
    }
    // 说明这个是他回答过的答案
    switch (answerType) {
      case 1:
        return (<Button
          className={styles.write_answer_btn}
          onClick={() => {
            setWritingAnswer((prev) => !prev);
          }}
        >
          <i className={classNames('iconfont', 'icon-bianji', styles.write_answer_icon)}/>
          <span className={styles.write_answer_txt}>写回答</span>
        </Button>)
      case 2:
        return (
          <Button
            className={styles.write_answer_btn}
            onClick={() => {
              pushFileSubDetail(selectedSpace.guid, fileGuid, answerGuid)
            }}
          >
            <i className={classNames('iconfont', 'icon-bianji', styles.write_answer_icon)}/>
            <span className={styles.write_answer_txt}>查看回答</span>
          </Button>)
      case 3:
        return (<Button
          className={styles.write_answer_btn}
          onClick={() => {
            setWritingAnswer((prev) => !prev);
          }}
        >
          <i className={classNames('iconfont', 'icon-bianji', styles.write_answer_icon)}/>
          <span className={styles.write_answer_txt}>编辑回答</span>
        </Button>)
    }
    return null
  }

  return (
    <div className={styles.detail} id="detail">
      <DetailHeader title={article?.name} type="question"></DetailHeader>
      <div className={styles.question}>
        <div className={styles.question_header}>
          <div className={styles.question_header_content}>
            <h1 className={styles.question_header_title} id="question_title">
              {article?.name}
            </h1>
            {defaultValue && (
              <EditorContentShow
                file={{
                  content: defaultValue,
                  format: article.format,
                }}
              />
            )}
          </div>
          <div className={styles.question_header_footer}>
            {article && renderAnswerButton()}
          </div>
        </div>
      </div>
      {writingAnswer && answerContentValue && (
        <div className={styles.answer_editor}>
          <Editor
            value={answerContentValue}
            onChange={(value) => {
              setPostContent(value);
            }}
            topHeader={true}
          />
          <div className={styles.answer_editor_footer} id="editor_footer">
            <Button
              type="primary"
              className={styles.answer_editor_footer_btn}
              onClick={() => {
                switch (answerType) {
                  case 1:
                    PostApiQuestionsGuidAnswersRequest.run(fileGuid, {
                      content: postContent,
                      spaceGuid: selectedSpace.guid,
                      name: article.name,
                    });
                    break
                  case 2:
                    break
                  case 3:
                    PutApiQuestionsAnswersAnswerGuidReq.run(subFileGuid, {
                      content: postContent,
                      name: article.name,
                    });
                    break
                }
              }}
            >
              发布
            </Button>
          </div>
        </div>
      )}
      <div className={styles.answer}>
        <Skeleton loading={fileListLoading}>
          {isRenderList && (
            <>
              <div className={styles.answer_header}>
                <span className={styles.detail_as_header_text}>共 {total || 0} 个回答</span>
              </div>
              <div className={styles.detail_as_content}>
                {fileList.length > 0 ? (
                  fileList.map((answer) => (
                    <SpaceQuestionDetailCard
                      key={answer.guid}
                      answer={answer}
                      myFileStats={myFileStats}
                    />
                  ))
                ) : (
                  <div className={styles.answer_empty}>
                    <img src={EMPTY_SPACE} className={styles.answer_empty_img}/>
                    <span style={{display: 'block'}}>
                      暂时还没有回答，
                      <span className={styles.start_answer} onClick={() => setWritingAnswer(true)}>
                        开始写第一个回答
                      </span>
                    </span>
                  </div>
                )}
              </div>
            </>
          )}
        </Skeleton>
        {isRenderList && (
          <LoadMore
            id="answer_list"
            key="answer_list"
            haveMore={fileList.length < total}
            onLoadMore={fetchFileList}
          />
        )}
      </div>
    </div>
  );
};

export default SpaceQuestionDetail;
