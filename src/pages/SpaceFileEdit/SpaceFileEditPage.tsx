import React from 'react';
import {SpaceType} from '@/enums/spacetype';
import {useParams} from '@umijs/max';
import SpaceEditArticle from '@/pages/SpaceFileEdit/SpaceEditArticle/SpaceEditArticle';
import SpaceEditQuestion from '@/pages/SpaceFileEdit/SpaceEditQuestion/SpaceEditQuestion';
import SpaceEditColumn from '@/pages/SpaceFileEdit/SpaceEditColumn/SpaceEditColumn';
import {useSpaceContext} from "@/pages/LayoutSpace/SpaceLayout/SpaceLayout";

const SpaceFile: React.FC = () => {
  const {selectedSpace, spacePms} = useSpaceContext()
  const {fileGuid} = useParams<{ fileGuid: string }>();

  const getSpaceDiv = () => {
    switch (selectedSpace.spaceType) {
      case SpaceType.ARTICLE:
        return (
          <SpaceEditArticle
            fileGuid={fileGuid}
            selectedSpace={selectedSpace}
            spacePms={spacePms}
          />
        );
      case SpaceType.QUESTION:
        return (
          <SpaceEditQuestion
            selectedSpace={selectedSpace}
            spacePms={spacePms}
            fileGuid={fileGuid}
          />
        );
      case SpaceType.COLUMN:
        return (
          <SpaceEditColumn
            selectedSpace={selectedSpace}
            spacePms={spacePms}
            fileGuid={fileGuid}
          />
        );
    }
    return null;
  };

  return <div>{getSpaceDiv()}</div>;
};
export default SpaceFile;
