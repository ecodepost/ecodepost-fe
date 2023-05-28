import React from 'react';
import {SpaceType} from "@/enums/spacetype";
import SpaceCreateArticle from "@/pages/SpaceFileCreate/SpaceCreateArticle/SpaceCreateArticle";
import SpaceCreateQuestion from "@/pages/SpaceFileCreate/SpaceCreateQuestion/SpaceCreateQuestion";
import SpaceCreateColumn from "@/pages/SpaceFileCreate/SpaceCreateColumn/SpaceCreateColumn";
import {useSpaceContext} from "@/pages/LayoutSpace/SpaceLayout/SpaceLayout";


const SpaceFile: React.FC = () => {
  const {selectedSpace, spacePms} = useSpaceContext()

  const getSpaceDiv = () => {
    switch (selectedSpace.spaceType) {
      case SpaceType.ARTICLE:
        return (
          <SpaceCreateArticle
            selectedSpace={selectedSpace}
            spacePms={spacePms}
          />
        )
      case SpaceType.QUESTION:
        return (
          <SpaceCreateQuestion
            selectedSpace={selectedSpace}
            spacePms={spacePms}
          />
        )
      case SpaceType.COLUMN:
        return (
          <SpaceCreateColumn
            selectedSpace={selectedSpace}
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

