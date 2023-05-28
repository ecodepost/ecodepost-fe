import {useLocation, useModel, useOutletContext} from "@umijs/max";
import SpaceBlocked from '../SpaceBlocked/SpaceBlocked';
import React from 'react';
import {Visibility} from '@/enums/visibilitylevel';
import type {ChosenSpaceType} from '@/pages/typings';
import {SpaceAccess} from "@/enums/common";
import SpaceApply from "@/pages/LayoutSpace/SpaceApply/SpaceApply";
import {Outlet} from "@@/exports";
import {GetURLSpaceFuncType} from "@/utils/GetUrlParams";
import {SpaceType} from "@/enums/spacetype";
import SpaceColumnLayout from "@/pages/LayoutSpace/SpaceLayout/SpaceColumnLayout/SpaceColumnLayout";

interface SpaceLayoutProps {
  selectedSpace: ChosenSpaceType;
}

type ContextType = {
  selectedSpace: ChosenSpaceType;
  spacePms: Spacev1GetSpacePermissionByUidRes;
};

export function useSpaceContext() {
  return useOutletContext<ContextType>();
}

const SpaceLayout: React.FC<SpaceLayoutProps> = (props) => {
  const {selectedSpace} = props;
  console.log("SpaceLayout Update")
  const {spacePms} = useModel('space')
  const hist = useLocation()
  console.log("hist", hist)
  const funcType = GetURLSpaceFuncType(window.location.pathname)

  const renderAllowView = () => {
    if ( !selectedSpace || !spacePms) return null

    console.log("funcType",selectedSpace.spaceType)
    console.log("funcType",funcType)
    switch (selectedSpace.spaceType) {
      case SpaceType.COLUMN:
        if (funcType == "list" || funcType == "detail") {
          return <SpaceColumnLayout
            spacePms={spacePms}
            selectedSpace={selectedSpace}
          />
        }
    }
    return <Outlet context={{
      spacePms: spacePms,
      selectedSpace: selectedSpace,
    }}/>
  }

  // 如果disallow view
  // 可能是有自定义的页面
  // 也可能直接报错页面
  // 你没有权限
  const renderDisallowView = () => {
    switch (selectedSpace.visibility) {
      case Visibility.INTERNAL:
        switch (selectedSpace.access) {
          case SpaceAccess.DENY_ALL:
            // 禁止访问
            return <SpaceBlocked spacePms={spacePms} selectedSpace={selectedSpace}/>;
          case SpaceAccess.USER_APPLY:
            // 禁止访问
            return <SpaceApply spacePms={spacePms} selectedSpace={selectedSpace}/>;
          case SpaceAccess.USER_PAY:
            // 用户付费，现在让他看到，在里面根据is member，做权限判断
            return <Outlet context={{
              spacePms: spacePms,
              selectedSpace: selectedSpace,
            }}/>
        }

      case Visibility.SECRET:
        // 禁止访问
        return <SpaceBlocked spacePms={spacePms} selectedSpace={selectedSpace}/>;
    }
    return null
  }


  return (
    <>
      {/*<LayoutHeader />*/}
      {/*{spacePmsLoading ? (*/}
      {/*  <Skeleton active/>*/}
      {/*) : spacePms?.isAllowView ? (*/}
      {/*  React.cloneElement(children, {*/}
      {/*    spacePms: spacePms,*/}
      {/*    selectedSpace: selectedSpace,*/}
      {/*    cmtGuid: cmtGuid,*/}
      {/*  })*/}
      {/*) : (*/}
      {/*  <div style={{height: 'calc(100vh - 64px)'}}>*/}
      {/*    <SpaceBlocked spacePms={spacePms} visibility={selectedSpace.visibility} />*/}
      {/*  </div>*/}
      {/*)}*/}
      {spacePms && (
        spacePms.isAllowView ? renderAllowView() : (
          <div style={{height: 'calc(100vh - 64px)'}}>
            {renderDisallowView()}
          </div>
        )
      )}
    </>
  );
};

export default React.memo(SpaceLayout);
