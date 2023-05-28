import styles from './styles.less';
import {Col, Popover, Row} from 'antd';
import classNames from 'classnames';
import SpaceArticleEditBar from '@/components/File/FileOperationBar/SpaceArticleEditBar/SpaceArticleEditBar';
import {messageInfo} from "@/components/Message/Message";
import React, {createContext} from "react";
import copy from "copy-to-clipboard";

// import SpaceArticleShareBar from '@/components/File/FileOperationBar/SpaceArticleShareBar/SpaceArticleShareBar';

interface Props {
  type: string; // spaceTop / normal
  fileInfo: Commonv1FileShow;
  filePms: DtoFilePermission;
}

interface FileOperationBarContext {
  fetchRecommendList?: () => void;
  fetchFileList?: (initPage?: number) => void;
  fetchSpaceTopList?: () => void;
  options?: {
    isOpenSiteTop?: boolean; // 是否组件开启置顶
    isOpenRecommend?: boolean; // 是否组件开启推荐
    isOpenComment?: boolean; // 是否组件开启评论
  }
}

export const FileOperationBarContext = createContext<FileOperationBarContext>({})

const FileOperationBar: React.FC<Props> = (props: Props) => {
  console.log("FileOperationBar Update")

  const {fileInfo, type, filePms} = props;
  /*
    isAllowDelete?: boolean;
    isAllowRecommend?: boolean;
    isAllowSetComment?: boolean;
    isAllowSiteTop?: boolean;
    isAllowWrite?: boolean;
    isAllowCreateComment?: boolean;
   */
  return (
    <div className={styles.operationContainer}>
      <Row justify="end">
        {filePms && (filePms.isAllowDelete || filePms.isAllowRecommend || filePms.isAllowSetComment || filePms.isAllowSiteTop || filePms.isAllowWrite) && (
          <Popover
            getPopupContainer={(triggerNode) => triggerNode?.parentNode as HTMLElement}
            content={
              <SpaceArticleEditBar
                article={fileInfo}
                type={type}
                articlePms={filePms}
              />
            }
            trigger="click"
            placement="bottomRight"
          >
            <Col span={8}>
              <div className={styles.col_icon}>
                <a> <i className={classNames('iconfont', 'icon-icon', styles.icon)}/></a>
              </div>
            </Col>
          </Popover>
        )}
        {type === 'spaceTop' && (
          <Col span={8}>
            <div className={styles.col_icon}>
              <a><i className={classNames('iconfont', 'icon-a-zhiding2', styles.icon)}/></a>
            </div>
          </Col>
        )}
        {/*<Popover*/}
        {/*  getPopupContainer={(triggerNode) => triggerNode?.parentNode as HTMLElement}*/}
        {/*  content={*/}
        {/*    <SpaceArticleShareBar*/}
        {/*      article={fileInfo}*/}
        {/*      type={type}*/}
        {/*      fetchArticleList={fetchArticleList}*/}
        {/*      fetchRecommendList={fetchRecommendList}*/}
        {/*      fetchSpaceTopList={fetchSpaceTopList}*/}
        {/*      articlePms={filePms}*/}
        {/*    />*/}
        {/*  }*/}
        {/*  trigger="click"*/}
        {/*  placement="bottomRight"*/}
        {/*>*/}
        {/*  <Col span={8} className={styles.col_icon}>*/}
        {/*    <i className={classNames('iconfont', 'icon-fenxiang', styles.card_share_icon)} />*/}
        {/*  </Col>*/}
        {/*</Popover>*/}
        <Col span={8} className={styles.col_icon} onClick={() => {
          copy(`${DOMAIN}/s/${fileInfo.spaceGuid}/d/${fileInfo.guid}#${fileInfo.name}-E源社`)
          messageInfo({
            type: "success",
            content: "复制文章链接成功"
          })
        }}>
          <a><i className={classNames('iconfont', 'icon-fenxiang', styles.card_share_icon)}/></a>
        </Col>
      </Row>
    </div>
  );
};

export default React.memo(FileOperationBar);
