import {VideoInfo} from "js-video-url-parser/lib/urlParser";

const GetUrlParams = (url: string): any => {
  const params = {};
  const arr = url.split('?');
  if (arr.length > 1) {
    const query = arr[1];
    const queryArr = query.split('&');
    queryArr.forEach((item) => {
      const [key, value] = item.split('=');
      params[key] = value;
    });
  }
  return params;
};

/**
 * YOUTUBE_URL_REGEXP = %r{(\s|^|<div>|<br>)(https?://)(www.)?(youtube\.com/watch\?v=|youtu\.be/|youtube\.com/watch\?feature=player_embedded&v=)([A-Za-z0-9_\-]*)(&\S+)?(\?\S+)?}
 *       YOUKU_URL_REGEXP = %r{(\s|^|<div>|<br>)(https?://)(v\.youku\.com/v_show/id_)([a-zA-Z0-9\-_=]*)(\.html)(&\S+)?(\?\S+)?}
 *       VIMEO_URL_REGEXP = %r{(\s|^|<div>|<br>)(https://)(vimeo\.com/)([0-9]+)(&\S+)?(\?\S+)?}
 *       BILI_URL_REGEXP = %r{(\s|^|<div>|<br>)(https?://)(www.)?(bilibili\.com/video/av)([0-9]+)(&\S+)?(\?\S+)?}
 *       BILI_B_URL_REGEXP = %r{(\s|^|<div>|<br>)(https?://)(www.)?(bilibili\.com/video/BV)([a-zA-Z0-9]+)(&\S+)?(\?\S+)?}
 * @param url
 * https://github.com/ruby-china/homeland/blob/ae3296f6cc31f83384bc1f2515278bb7838f0717/lib/homeland/pipeline/embed_video_filter.rb
 * @constructor
 */
const ParseBilibiliCom = (url: string): VideoInfo => {
  if (url.indexOf("www.bilibili.com") === -1) {
    return undefined
  }
  //  https://www.bilibili.com/video/BV1Qg411p7mX
  const urlArr = url.split("www.bilibili.com/video/")
  if (urlArr.length < 2) {
    return undefined
  }
  const videoId = urlArr[1]
  console.log("videoArr[0x]", videoId)

  if (url.indexOf("/?") !== -1) {
    const videoArr = videoId.split("/?")
    console.log("videoArr[0]", videoArr[0])
    return {
      id: videoArr[0],
      mediaType: "video",
      provider: "bilibili",
    }
  }
  const videoArr = videoId.split("?")
  return {
    id: videoArr[0],
    mediaType: "video",
    provider: "bilibili",
  }

}

// 根据URL，解析space功能
// 是创建，还是详情，还是列表功能
// 并且会根据space类型，展示不同的layout布局
const GetURLSpaceFuncType = (pathname: string): string => {
  // 不存在这个变量
  if (pathname.indexOf('/s/') < 0 || pathname.indexOf('/s/') > 0) {
    return '';
  }
  // 获取url参数
  const queryArrTmp = pathname.split('/');
  // 0 空字符串 1 s 2 spaceGuid 3 d 4 spaceDetailGuid
  if (queryArrTmp.length < 3) {
    return ''
  }
  if (queryArrTmp[1] !== 's') {
    return ''
  }
  if (queryArrTmp.length === 3) {
    return 'list'
  }
  if (queryArrTmp.length < 5) {
    return ''
  }
  if (queryArrTmp[3] !== 'd') {
    return ''
  }
  if (queryArrTmp.length == 5) {
    return 'detail'
  }
  if (queryArrTmp.length == 6) {
    if (queryArrTmp[4] === '-' && queryArrTmp[5] === 'create') {
      return 'create'
    }
    if (queryArrTmp[5] === 'update') {
      return 'update'
    }
  }

  if (queryArrTmp.length == 9) {
    if (queryArrTmp[7] === 'd') {
      return 'subDetail'
    }
  }

  if (queryArrTmp.length == 10) {
    if (queryArrTmp[8] === '-' && queryArrTmp[9] === 'create') {
      return 'subCreate'
    }
  }
  return ""
}


const GetURLSpaceGuid = (): string => {
  // 获取浏览器url
  // /c/bPMDkrxK5x
  const pathname = window.location.pathname;
  // 不存在这个变量
  if (pathname.indexOf('/c/') < 0 || pathname.indexOf('/c/') > 0) {
    return '';
  }

  // 获取url参数
  const queryArrTmp = pathname.split('/c/');
  // bPMDkrxK5x/admin
  if (queryArrTmp[1].indexOf('/') === -1) {
    return '';
  }
  const queryArr2Tmp = queryArrTmp[1].split('/');
  if (queryArr2Tmp.length < 3) {
    return '';
  }
  if (queryArr2Tmp[1].indexOf('s') !== 0) {
    return '';
  }
  return queryArr2Tmp[2]
};

const GetURLProfileTab = (): string => {
  // 获取浏览器url
  // /c/bPMDkrxK5x
  const pathname = window.location.pathname;
  // 不存在这个变量
  if (pathname.indexOf('/c/') < 0 || pathname.indexOf('/c/') > 0) {
    return '';
  }
  // 获取url参数
  const queryArrCmtTmp = pathname.split('/c/');
  const newPath = queryArrCmtTmp[1]
  // 不存在这个变量
  if (newPath.indexOf('/p/') < 0) {
    return '';
  }

  // 获取url参数
  const queryArrTmp = newPath.split('/p/');
  const queryArr = queryArrTmp[1].split('/');
  return queryArr[1];
};

const IsCmtRoot = (): boolean => {
  // 获取浏览器url
  // /c/bPMDkrxK5x
  const pathname = window.location.pathname;
  // 不存在这个变量
  if (pathname.indexOf('/c/') < 0 || pathname.indexOf('/c/') > 0) {
    return false;
  }

  // 获取url参数
  const queryArrTmp = pathname.split('/c/');
  return queryArrTmp[1].indexOf('/') === -1;
};

const IsCmtAdmin = (): boolean => {
  // 获取浏览器url
  // /c/bPMDkrxK5x/admin
  const pathname = window.location.pathname;
  // // 不存在这个变量
  // if (pathname.indexOf('/c/') < 0 || pathname.indexOf('/c/') > 0) {
  //   return false;
  // }
  //
  // // 获取url参数
  // const queryArrTmp = pathname.split('/admin/');
  // // bPMDkrxK5x/admin
  // if (queryArrTmp[1].indexOf('/') === -1) {
  //   return false;
  // }
  // const queryArr2Tmp = queryArrTmp[1].split('/');
  return pathname.indexOf('/admin/') === 0;
};

const IsCmtSpace = (): boolean => {
  // 获取浏览器url
  // /c/bPMDkrxK5x/admin
  const pathname = window.location.pathname;
  // 不存在这个变量
  if (pathname.indexOf('/s/') < 0 || pathname.indexOf('/s/') > 0) {
    return false;
  }

  // 获取url参数
  const queryArrTmp = pathname.split('/s/');
  // bPMDkrxK5x/admin
  if (queryArrTmp[1].indexOf('/') === -1) {
    return false;
  }
  const queryArr2Tmp = queryArrTmp[1].split('/');
  if (queryArr2Tmp.length < 1) {
    return false;
  }
  return queryArr2Tmp[1].indexOf('s') === 0;
};

const IsCmtSpaceActive = (spaceGuid: string): boolean => {
  // 获取浏览器url
  // /c/bPMDkrxK5x/admin
  const pathname = window.location.pathname;
  // 不存在这个变量
  if (pathname.indexOf('/c/') < 0 || pathname.indexOf('/c/') > 0) {
    return false;
  }

  // 获取url参数
  const queryArrTmp = pathname.split('/c/');
  // bPMDkrxK5x/admin
  if (queryArrTmp[1].indexOf('/') === -1) {
    return false;
  }

  const queryArr2Tmp = queryArrTmp[1].split('/');
  if (queryArr2Tmp.length < 3) {
    return false;
  }
  if (queryArr2Tmp[1].indexOf('s') === 0) {
    if (queryArr2Tmp[2].indexOf(spaceGuid) == 0) {
      return true;
    }
  }
  return false;
};

const IsCmtGroup = (): boolean => {
  // 获取浏览器url
  // /c/bPMDkrxK5x/admin
  const pathname = window.location.pathname;
  // 不存在这个变量
  if (pathname.indexOf('/c/') < 0 || pathname.indexOf('/c/') > 0) {
    return false;
  }

  // 获取url参数
  const queryArrTmp = pathname.split('/c/');
  // bPMDkrxK5x/g/xxxxxxx
  if (queryArrTmp[1].indexOf('/') === -1) {
    return false;
  }
  const queryArr2Tmp = queryArrTmp[1].split('/');
  if (queryArr2Tmp.length < 3) {
    return false;
  }

  return queryArr2Tmp[1].indexOf('g') === 0;
};

const IsCmtCourseDetail = (treeData): boolean => {
  // 获取浏览器 url
  // /c/bPMDkrxK5x/s/xxxxx/d/xxxxxx
  const pathname = window.location.pathname;

  if (pathname.indexOf('/c/') < 0 || pathname.indexOf('/s/') < 0 || pathname.indexOf('/d/') < 0) {
    return false;
  }

  const queryArrTmp = pathname.split('/');
  if (queryArrTmp.length < 6) {
    return false;
  }

  const spaceGuid = queryArrTmp[4];
  for (let i = 0; i < treeData.length; i++) {
    console.log(treeData[i], spaceGuid);
    if (!treeData[i].children) {
      continue;
    }

    for (let j = 0; j < treeData[i].children.length; j++) {
      if (treeData[i].children[j].guid === spaceGuid && treeData[i].children[j].spaceType === 8) {
        return true;
      }
    }
  }

  return false;
};

export {
  GetUrlParams,
  GetURLSpaceFuncType,
  GetURLSpaceGuid,
  GetURLProfileTab,
  IsCmtRoot,
  IsCmtAdmin,
  IsCmtSpace,
  IsCmtGroup,
  IsCmtSpaceActive,
  IsCmtCourseDetail,
  ParseBilibiliCom,
};
