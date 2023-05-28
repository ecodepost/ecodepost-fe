import { history, useModel } from '@umijs/max';
import styles from './Community.less';
import React, {useEffect, useMemo, useState} from 'react';
import { CmtPayCard } from './CmtPayCard/CmtPayCard';
import { messageInfo } from '@/components/Message/Message';
import { IsCmtAdmin } from '@/utils/GetUrlParams';
import CmtFront from './CmtFront';
import CmtAdmin from '@/pages/LayoutCmt/CmtAdmin/CmtAdmin';

const Community = () => {
  const {
    initialState: { currentCmt },
  } = useModel('@@initialState');

  const {  GetApiCmtSpaceAllReq, spaceAll } = useModel(
    'community',
    (model) => ({
      spaceAll: model.spaceAll,
      GetApiCmtSpaceAllReq: model.GetApiCmtSpaceAllReq,
    }),
  );

  const { userInfo: currentCmtUser, cmtInfo: currentCommunity, permission: cmtPms } = currentCmt;
  const [renderType, setRenderType] = useState<number>(0); // 0: pending, 1: normal

  useEffect(() => {
    GetApiCmtSpaceAllReq.run();
  }, []);

  // 这里切换社区的渲染模式
  // 选择哪个页面渲染
  // 0 页面加载
  // 1 普通页面
  // 2 后台页面
  // 3 付费社区页面
  // 4 社区内容详情页
  const switchRenderType = () => {
    if (!spaceAll) return null;

    const isNeedPay =
      currentCommunity.isSetPrice &&
      currentCommunity.annualPrice !== 0 &&
      !currentCmtUser.isMemberShip &&
      !cmtPms.isAllowManageCommunity;


    if (
      renderType == 1 &&
      !IsCmtAdmin() &&
      !isNeedPay
    ) {
      return;
    }

    console.log('render type Update');

    setRenderType(0);
    if (!currentCmtUser || !currentCommunity ) {
      return;
    }

    if (IsCmtAdmin()) {
      setRenderType(2);
      return;
    }
    if (!currentCommunity.isSetPrice) {
      setRenderType(1);
      return;
    }

    // 说明需要购买
    if (isNeedPay) {
      setRenderType(3);
      return;
    }
    setRenderType(1);
  };

  useEffect(() => {
    if (!cmtPms) return;
    switchRenderType();
  }, [currentCmtUser, currentCommunity, cmtPms, spaceAll, history.location]);


  console.log('Community Update');

  // 选择哪个页面渲染
  // 0 页面加载
  // 1 普通页面
  // 2 后台页面
  // 3 付费社区页面
  const RenderCmt = useMemo(() => {
   console.log('render div Update', renderType);
   switch (renderType) {
     case 1:
       return <CmtFront />;
     case 2:
       return <CmtAdmin />;
     case 3:
       // todo 后续再看，因为改了很多逻辑，暂时不支持
       return <CmtPayCard
         homeInfo={currentCommunity}
         currentCmtUser={currentCmtUser}
         onInit={() => {
           messageInfo({
             content: '这是一个付费社区，需付费成为会员才能进入',
             type: 'success',
           });
         }}
       />;
     default:
       return <></>;
   }
  }, [renderType]);

  return (
    <>
      <div className={styles.container}>{RenderCmt}</div>
    </>
  );
};

export default React.memo(Community);
