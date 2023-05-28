import React from 'react';
import {SpaceType} from "@/enums/spacetype";
import {useParams} from "umi";
import SpaceQuestionDetail from "@/pages/SpaceFileDetailSub/SpaceQuestionDetail/SpaceQuestionDetail";
import {useSpaceContext} from "@/pages/LayoutSpace/SpaceLayout/SpaceLayout";

const SpaceFile: React.FC = () => {
  const {fileGuid, subFileGuid} = useParams<{ fileGuid: string; subFileGuid: string }>();
  const {selectedSpace, spacePms} = useSpaceContext()

  const getSpaceDiv = () => {
    switch (selectedSpace.spaceType) {
      case SpaceType.QUESTION:
        return (
          <SpaceQuestionDetail
            selectedSpace={selectedSpace}
            spacePms={spacePms}
            fileGuid={fileGuid}
            subFileGuid={subFileGuid}
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
