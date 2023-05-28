import {memo, useEffect, useMemo} from 'react';
import {history, useModel} from '@umijs/max';
import styles from './index.less';
import NotFound from '@/components/NotFound/NotFound';
import {Outlet} from "@@/exports";

const Index = () => {
  const {initialState} = useModel('@@initialState');
  // 用于判断是否首页，然后做跳转，后续可以放到后端，现在体验不好
  if (location.pathname === '/' && initialState?.currentCmt?.cmtInfo) {
    history.push(initialState?.currentCmt?.cmtInfo.firstVisitUrl);
  }
  const {initUpload} = useModel('upload');

  useEffect(() => {
    initUpload(initialState?.currentUser);
  }, [initialState]);

  console.log("Layout Index Update")

  const RenderCmtDiv = useMemo(() => {
    console.log("RenderContentCmtDiv Update")
    console.log("currentCmt", initialState?.currentCmt)
    return (
      <div className={styles.container}>
        <div className={styles.container_main}><Outlet/></div>
      </div>
    );
  }, []);

  const renderCmt404 = (msg: string, data: string) => {
    return <NotFound msg={msg} data={data}/>;
  };

  // const RenderContent = React.useCallback(() => {
  //   console.log("RenderContent Update")
  //   // 看下user信息有没有，没有的话跳转登录
  //   switch (currentCmt.cmtInfo.visibility) {
  //     // 公开
  //     case Visibility.PUBLIC:
  //       return <RenderCmtDiv/>;
  //     // 内部开放
  //     case Visibility.INTERNAL:
  //       console.log("RenderContent Update2")
  //
  //       if (isOnline()) {
  //         return <RenderCmtDiv/>;
  //       } else {
  //         checkLogin();
  //         return <></>
  //       }
  //     // 私有，必须是社区成员才可渲染
  //     case Visibility.SECRET:
  //       if (isOnline()) {
  //         if (currentCmt.userInfo?.isExist) {
  //           return <RenderCmtDiv/>;
  //         }
  //         return renderCmt404('未找到社区', 'not found');
  //       } else {
  //         checkLogin();
  //         return <></>
  //       }
  //   }
  //   if (isOnline()) {
  //     // 因为其他路由也用了这个，如果用户没有current community，那么也会到这个逻辑里
  //     return <RenderCmtDiv/>;
  //   } else {
  //     checkLogin();
  //     return <></>
  //   }
  // }, [currentCmt]);

  return (
    <>
      {initialState?.currentCmt?.cmtInfo && RenderCmtDiv}
      {initialState?.currentCmt?.err &&
        renderCmt404(initialState?.currentCmt.err.msg, initialState?.currentCmt.err.data)}
    </>
  );
};

export default memo(Index);
