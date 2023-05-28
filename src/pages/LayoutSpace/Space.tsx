import React, { useEffect } from 'react';
import { useModel, useParams } from '@umijs/max';
import SpaceLayout from './SpaceLayout/SpaceLayout';
import NotFound from '@/components/NotFound/NotFound';

// 进入到space后，通过url上到space选择对应到space空间
// 离开space组件销毁对应选择到space信息
// 子组件全部通过props，或者model('community') 获取 selected space里面到元素信息
const Space = () => {
  console.log('Space Update');
  const { setSelectedSpace, spaceAll, selectedSpace } = useModel('community', (model) => ({
    setSelectedSpace: model.setSelectedSpace,
    clearSelectedSpace: model.clearSelectedSpace,
    spaceAll: model.spaceAll,
    selectedSpace: model.selectedSpace,
  }));

  const { spaceGuid } = useParams<{ spaceGuid: string }>();
  // 有两种情况会触发
  // 1 直接访问该页面
  // 2 点击左侧导航栏，选中了某个space，那么这个时候，不能在选中
  useEffect(() => {
    if (spaceGuid && spaceAll) {
      setSelectedSpace(spaceGuid);
    }
    return () => {
      // clearSelectedSpace();
    };
  }, [spaceGuid, spaceAll]);

  return (
    <div id={'this is space'}>
      {selectedSpace && selectedSpace.isExist && spaceGuid == selectedSpace.guid && (
        <SpaceLayout selectedSpace={selectedSpace} key={selectedSpace.guid} />
      )}
      {selectedSpace && !selectedSpace.isExist && <NotFound msg={'空间未找到'} data={''} />}
    </div>
  );
};

export default React.memo(Space);
