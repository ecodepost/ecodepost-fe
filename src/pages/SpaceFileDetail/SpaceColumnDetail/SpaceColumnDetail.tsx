import { Anchor, Avatar, Col, Divider, Row, Skeleton, Spin } from 'antd';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import type { IRoute } from 'umi';
import { useIntl } from 'umi';
import styles from './SpaceColumnDetail.less';
import Editor from '@/components/Editor/ReadEditor';
import { useRequestFileInfo } from '@/hooks/fileRequest/info';
import FileBottomBar from '@/components/File/FileBottomBar/FileBottomBar';
import { BizType } from '@/enums/biztype';
import FileOperationBar from '@/components/File/FileOperationBar/FileOperationBar';
import { LayoutFileProps } from '@/pages/typings';

const { Link } = Anchor;

interface TOCItem {
  title: string;
  id: string;
  href: string;
}

const SpaceColumnDetail: React.FC<LayoutFileProps> = (props: IRoute) => {
  const { fileGuid } = props;
  const [renderTOC, setRenderTOC] = useState<boolean>(false);
  const [TOC, setTOC] = useState<TOCItem[]>([]);
  const intl = useIntl();
  const i = (id: string) => intl.formatMessage({ id });

  const {
    article,
    articlePms,
    fileStat,
    selectedEmojis,
    fileLoading,
    defaultValue,
    GetApiArticlesGuidRequest,
  } = useRequestFileInfo(fileGuid);

  const generateTOC = (remoteContent: string) => {
    const reg = /<h1[^>]*>([^<]+)<\/h1>/g;
    const toc = remoteContent.match(reg) || [];
    const tocList: TOCItem[] = [];
    let html = remoteContent;
    toc.forEach((item) => {
      const reg2 = /<h1[^>]*>([^<]+)<\/h1>/;
      const title = item.match(reg2)?.[1] || '';
      const id = `${title.replace(/\s/g, '')}__-__${Math.random().toString(32).slice(2, 8)}`;
      tocList.push({ id, title, href: `#${id}` });
      html = html.replace(item, `<h1 id="${id}">${title}</h1><a href="#${id}"></a>`);
    });
    // setContent(html);
    setTOC(tocList);
    setRenderTOC(tocList.length > 0);
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Skeleton loading={GetApiArticlesGuidRequest.loading}>
          {defaultValue && (
            <>
              <div className={styles.content_main} id="tree_content_scroll">
                <div className={styles.detail}>
                  {article.headImage && (
                    <div className={styles.headimage}>
                      <img
                        src={article.headImage}
                        alt={i('article.tree.headImg.alt')}
                        style={{ aspectRatio: '3/1', width: '100%', borderRadius: 16 }}
                      />
                    </div>
                  )}
                  {article && (
                    <Row align="middle">
                      <Col span={20}>
                        <span className={styles.title}>{article?.name}</span>
                      </Col>
                      <Col span={4}>
                        <FileOperationBar type="detail" fileInfo={article} filePms={articlePms} />
                      </Col>
                    </Row>
                  )}
                  <div className={styles.info}>
                    <div>
                      <Avatar size={20} src={article.avatar} />
                      <span className={styles.info_author}>{article.nickname}</span>
                      <span className={styles.info_time}>
                        &nbsp;{dayjs.unix(article.ctime).format('MM-DD')}
                      </span>
                    </div>
                  </div>
                  <Divider />
                  {fileLoading ? <Spin></Spin> : defaultValue && <Editor value={defaultValue} />}
                  <Divider />
                  <div className={styles.bottom_bar}>
                    {article && (
                      <FileBottomBar
                        isOpenComment={true}
                        bizType={BizType.ARTICLE}
                        fileInfo={article}
                        initMySelectedEmojis={selectedEmojis}
                        isCollect={fileStat.isCollect}
                      />
                    )}
                  </div>
                </div>
              </div>
              {renderTOC && (
                <div className={styles.content_toc}>
                  <div className={styles.toc}>
                    <Anchor
                      getContainer={() =>
                        document.getElementById('tree_content_scroll') as HTMLElement
                      }
                      affix={false}
                      showInkInFixed={false}
                    >
                      {TOC.map((item) => (
                        <Link
                          className={styles.toc_item}
                          href={`#${item.id}`}
                          key={item.id}
                          // 此处使用less内的global属性，必须固定className
                          title={<span className="toc_item_title">{item.title}</span>}
                        />
                      ))}
                    </Anchor>
                  </div>
                </div>
              )}
            </>
          )}
        </Skeleton>
      </div>
    </div>
  );
};
export default SpaceColumnDetail;
