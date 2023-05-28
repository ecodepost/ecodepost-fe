import {history} from '@umijs/max';

export function pushHome() {
  history.push('/');
}

export function back() {
  history.back();
}
export function pushSpace(spaceGuid: string) {
  history.push(`/s/${spaceGuid}`);
}

export function pushSpaceGroup(spaceGroupGuid: string) {
  history.push(`/g/${spaceGroupGuid}`);
}
// 文章列表
export function pushFileList(spaceGuid: string) {
  history.push(`/s/${spaceGuid}`);
}

// 创建文章
export function pushFileCreate(spaceGuid: string) {
  history.push(`/s/${spaceGuid}/d/-/create`);
}

// 文章详情
export function pushFileDetail(spaceGuid: string, fileGuid: string) {
  history.push(`/s/${spaceGuid}/d/${fileGuid}`);
}

// 文章详情
export function pushFileSubDetail(
  spaceGuid: string,
  fileGuid: string,
  subFileGuid: string,
) {
  history.push(`/s/${spaceGuid}/d/${fileGuid}/d/${subFileGuid}`);
}

// 编辑文章
export function pushFileEdit( spaceGuid: string, fileGuid: string) {
  history.push(`/s/${spaceGuid}/d/${fileGuid}/edit`);
}

// 创建回答
export function pushFileSubCreate( spaceGuid: string, fileGuid: string) {
  history.push(`/s/${spaceGuid}/d/${fileGuid}/d/-/create`);
}

// 编辑专栏文章
export function pushColumnCreate(spaceGuid: string, parentGuid: string) {
  history.push({
    pathname: `/s/${spaceGuid}/d/-/create`,
    query: {
      parentGuid: parentGuid || '',
    },
  });
}

export function pushUserPage( name: string) {
  history.push(`/p/${name}`);
}

export function pushUserPageTab( name: string, tab: string) {
  history.push(`/p/${name}/${tab}`);
}



// 编辑专栏文章
// export function pushColumnEdit(cmtGuid: string,spaceGuid: string, articleGuid: string) {
//   history.push({
//     pathname: `/cmt/${cmtGuid}/space/${spaceGuid}/column/edit`,
//     query: {
//       articleGuid: articleGuid,
//     },
//   });
// }
