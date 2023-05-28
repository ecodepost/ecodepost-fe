// @ts-ignore
/* eslint-disable */

declare namespace ArticleAPI {
  type CreateArticleParams = {
    name: string;
    spaceGuid: string;
    content: any;
    headImage: string;
    imageUrls: string[];
  };

  type PublishArticleParams = {
    name: string;
    content: string;
    headImage: string;
    imageUrls: string[];
  };

  type SidebarChangeSortParams = {
    fileGuid: string;
    afterFileGuid: string;
  };

  type CreateCommentParams = {
    guid: string;
    commentGuid: string;
    content: string;
  };
}
