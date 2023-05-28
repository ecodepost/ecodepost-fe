import React from 'react';
import {SpaceType} from "@/enums/spacetype";
import SpaceQuestionDetail from "@/pages/SpaceFileDetail/SpaceQuestionDetail/SpaceQuestionDetail";
import SpaceArticleDetail from "@/pages/SpaceFileDetail/SpaceArticleDetail/SpaceArticleDetail";
import {useParams} from "@umijs/max";
import SpaceColumnDetail from "@/pages/SpaceFileDetail/SpaceColumnDetail/SpaceColumnDetail";
import {useSpaceContext} from "@/pages/LayoutSpace/SpaceLayout/SpaceLayout";

const SpaceFile: React.FC = () => {
  const {selectedSpace, spacePms} = useSpaceContext()

  const {fileGuid, subFileGuid} = useParams<{ fileGuid: string, subFileGuid: string }>();

  const getSpaceDiv = () => {
    switch (selectedSpace.spaceType) {
      case SpaceType.ARTICLE:
        return (
          <SpaceArticleDetail
            selectedSpace={selectedSpace}
            fileGuid={fileGuid}
            spacePms={spacePms}
          />
        )
      case SpaceType.QUESTION:
        return (
          <SpaceQuestionDetail
            selectedSpace={selectedSpace}
            fileGuid={fileGuid}
            spacePms={spacePms}
            subFileGuid={subFileGuid}
          />
        )
      case SpaceType.COLUMN:
        return (
          <SpaceColumnDetail
            selectedSpace={selectedSpace}
            fileGuid={fileGuid}
            spacePms={spacePms}
          />
        )
    }
    return null
  }

  return (
    <div>
      {getSpaceDiv()}
    </div>
  );
};
export default SpaceFile;
