import React, {useMemo} from 'react';
import {useIntl, useModel} from '@umijs/max';

import {SpaceType} from '@/enums/spacetype';
import SpaceArticle from '@/pages/SpaceFileList/SpaceArticle/SpaceArticle';
import SpaceQuestion from '@/pages/SpaceFileList/SpaceQuestion/SpaceQuestion';
import {LayoutSpaceProps} from '@/pages/typings';
import SpaceColumn from '@/pages/SpaceFileList/SpaceColumn/SpaceColumn';
import {IRoute, useLocation} from '@umijs/max';
import {useSpaceContext} from '@/pages/LayoutSpace/SpaceLayout/SpaceLayout';

const SpaceFileList: React.FC<LayoutSpaceProps & IRoute> = () => {
  const {selectedSpace, spacePms} = useSpaceContext();
  const location = useLocation();
  const intl = useIntl();
  const i = (id: string) => intl.formatMessage({ id });
  const { getCurrentTitle } = useModel('community');
  document.title = getCurrentTitle(i('title.base'), {});

  console.log('SpaceFileList Update');

  const RenderSpaceDiv = useMemo(() => {
    switch (selectedSpace.spaceType) {
      case SpaceType.ARTICLE:
        return <SpaceArticle  selectedSpace={selectedSpace} spacePms={spacePms} />;
      case SpaceType.QUESTION:
        return (
          <SpaceQuestion selectedSpace={selectedSpace} spacePms={spacePms} />
        );
      case SpaceType.COLUMN:
        return (
          <SpaceColumn
            selectedSpace={selectedSpace}
            spacePms={spacePms}
          />
        );
    }
    return null;
  }, [selectedSpace, spacePms, location]);

  return <div>{RenderSpaceDiv}</div>;
};
export default SpaceFileList;
