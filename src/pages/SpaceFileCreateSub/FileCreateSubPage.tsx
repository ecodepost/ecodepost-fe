import React from 'react';
import {SpaceType} from "@/enums/spacetype";
import SpaceCreateAnswer from "@/pages/SpaceFileCreateSub/SpaceCreateAnswer/SpaceCreateAnswer";
import {useParams} from "umi";
import SpaceCreateColumn from "@/pages/SpaceFileCreateSub/SpaceCreateColumn/SpaceCreateColumn";
import {useSpaceContext} from "@/pages/LayoutSpace/SpaceLayout/SpaceLayout";


const SpaceFile: React.FC = () => {
  const {fileGuid} = useParams<{ fileGuid: string; }>();
  const {selectedSpace, spacePms} = useSpaceContext()
  const getSpaceDiv = () => {
    switch (selectedSpace.spaceType) {
      case SpaceType.QUESTION:
        return (
          <SpaceCreateAnswer
            selectedSpace={selectedSpace}
            spacePms={spacePms}
            fileGuid={fileGuid}
          />
        )
      case SpaceType.COLUMN:
        return (
          <SpaceCreateColumn
            selectedSpace={selectedSpace}
            spacePms={spacePms}
            fileGuid={fileGuid}
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
