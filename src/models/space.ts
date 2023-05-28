import {messageInfo} from '@/components/Message/Message';
import {GetApiSpacesGuidPermission, PostApiSpacesGuidApply} from '@/services/base/api.gen';
import useRequestX from '@/hooks/useRequestX';
import {Visibility} from '@/enums/visibilitylevel';
import {SpaceAccess} from '@/enums/common';
import {message} from 'antd';
import {useEffect, useState} from 'react';
import {useModel} from '@umijs/max';

export default () => {
  const {selectedSpace} = useModel('community');
  const [spacePms, setSpacePms] = useState<Spacev1GetSpacePermissionByUidRes>();
  const [isNeedAddSpace, setNeedAddSpace] = useState<boolean>(false);
  // space的权限信息
  const GetApiSpacesGuidPermissionRequest = useRequestX(GetApiSpacesGuidPermission, {
    onSuccess: (res) => {
      const innerPms = res.data;
      setSpacePms(res.data);

      // 只有空间为INTERNAL，access为任何人可加入, 并且没有写入权限的时候，并且没有触发过，弹出弹窗
      if (
        selectedSpace.visibility === Visibility.INTERNAL &&
        selectedSpace.access === SpaceAccess.OPEN &&
        (!innerPms || !innerPms.isAllowWrite)
      ) {
        setNeedAddSpace(true);
      } else {
        // 重新请求的时候，要把他刷新掉
        setNeedAddSpace(false);
      }
    },
  });

  useEffect(() => {
    if (!selectedSpace) return;
    if (!selectedSpace?.guid) return;

    GetApiSpacesGuidPermissionRequest.run(selectedSpace.guid);
  }, [selectedSpace]);

  const PostApiSpacesGuidApplyRequest = useRequestX(PostApiSpacesGuidApply, {
    onSuccess: (res) => {
      if (res.data.bizCode === 1) {
        // 刷新权限
        GetApiSpacesGuidPermissionRequest.run(selectedSpace.guid).then(() => {
          message.destroy();
          messageInfo({
            type: 'success',
            content: '加入成功',
          });
        });
        return;
      }
      messageInfo({
        type: 'success',
        content: '已提交申请',
      });
    },
  });

  const addSpace = () => {
    PostApiSpacesGuidApplyRequest.run(selectedSpace.guid, {
      reason: '',
    });
  };

  return {
    isNeedAddSpace,
    spacePms,
    addSpace,
  };
};
