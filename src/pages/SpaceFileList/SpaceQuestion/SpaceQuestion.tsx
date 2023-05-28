import LoadMore from '@/components/LoadMore/LoadMore';
import {Skeleton} from 'antd';
import styles from './SpaceQuestion.less';
import SpaceQuestionCard from './SpaceQuestionCard/SpaceQuestionCard';
import {pushFileCreate} from '@/utils/historypush/history';
import {useRequestFileList} from '@/hooks/fileRequest/list';
import {useModel} from '@umijs/max';
import SpaceContainer from '@/components/SpaceContainer/SpaceContainer';
import SpaceArticleEmpty from '@/pages/SpaceFileList/SpaceArticle/SpaceArticleEmpty/SpaceArticleEmpty';
import SpaceHeader from '@/components/Header/SpaceHeader/SpaceHeader';
import type {LayoutSpaceProps} from "@/pages/typings";


const SpaceQuestion = (props: LayoutSpaceProps) => {
  const { selectedSpace, spacePms} = props;
  const {initialState: {currentUser}} = useModel('@@initialState');
  const {
    fileListLoading,
    isRenderList,
    fileList,
    onChangeSortType,
    total,
    fetchFileList
  } = useRequestFileList(currentUser, {
    spaceGuid: selectedSpace.guid,
  });


  return (
    <SpaceContainer>
      <SpaceHeader
        spaceID={selectedSpace.guid}
        spacePms={spacePms}
        onChangeSortType={onChangeSortType}
      ></SpaceHeader>
      <div className={styles.container}>
        <div className={styles.content}>
          <Skeleton loading={fileListLoading}>
            {isRenderList &&
              (fileList.length > 0 ? (
                <>
                  {fileList.map((question) => (
                    <SpaceQuestionCard question={question} key={question.guid} />
                  ))}
                  <LoadMore
                    id="questionlist"
                    key="questionlist"
                    haveMore={fileList.length < total}
                    onLoadMore={fetchFileList}
                  />
                </>
              ) : (
                <SpaceArticleEmpty
                  spacePms={spacePms}
                  handleCreateArticle={() => pushFileCreate(selectedSpace.guid)}
                />
              ))}
          </Skeleton>
        </div>
      </div>
    </SpaceContainer>
  );
};

export default SpaceQuestion;
