import React from 'react';
import styles from './SpaceColumn.less';
import { LayoutSpaceProps } from '@/pages/typings';
import { useSpaceContext } from '@/pages/LayoutSpace/SpaceLayout/SpaceLayout';
import { pushFileDetail, pushColumnCreate } from '@/utils/historypush/history';

const SpaceArticleTree: React.FC<LayoutSpaceProps> = (props) => {
  const { selectedSpace, allColumnData, columnInfo } = useSpaceContext();

  const gotoChapter = () => {
    if (allColumnData?.list?.length > 0) {
      pushFileDetail(selectedSpace.guid, allColumnData?.list[0].guid);
    }
  };

  const gotoAdd = () => {
    pushColumnCreate(selectedSpace.guid, selectedSpace.guid);
  };

  return (
    <div className={styles.container}>
      <div className={styles.bookContainer}>
        <div className={styles.bookDesc}>
          <div className={styles.poster}>
            <a href="#" style={{ cursor: 'zoom-in' }}>
              <img src={columnInfo.cover} />
            </a>
          </div>
          <div className={styles.info}>
            <a className={styles.title} onClick={() => gotoChapter()}>
              <span>{columnInfo.name}</span>
            </a>
            <div className={styles.media}>
              <div className={styles.desc}>{columnInfo.desc}</div>
              <div className={styles.author}>
                {columnInfo.authorAvatar && columnInfo.authorNickname ? (
                  <div className={styles.authorInfo}>
                    <a href="" target="_blank" className={styles.user}>
                      <div
                        className={`${styles.lazy} ${styles.hero} ${styles.avatar} ${styles.loaded}`}
                        style={{ backgroundImage: `url(${columnInfo.authorAvatar})` }}
                      ></div>
                      <span>{columnInfo.authorNickname}</span>
                    </a>
                  </div>
                ) : (
                  <div></div>
                )}
                <div className={styles.authorDesc}>
                  <span className={styles.desc}></span>
                </div>
              </div>
            </div>
            {allColumnData?.list?.length > 0 && (
              <button
                onClick={() => gotoChapter()}
                id="gotoChapterBtn"
                className={styles.buttonBuy}
              >
                阅读
              </button>
            )}
            <button onClick={() => gotoAdd()} id="gotoChapterBtn" className={styles.buttonBuy}>
              添加内容
            </button>
          </div>
        </div>
        <div className={styles.bookCard}>
          <div className={styles.bookContentHead}>图书目录</div>
          <div>
            {allColumnData.tree.map((item) => {
              return (
                <div key={item.key} className={styles.section}>
                  <a
                    onClick={() => {
                      pushFileDetail(selectedSpace.guid, item.key);
                    }}
                  >
                    <div className={styles.center}>
                      <div className={styles.title}>{item.title}</div>
                    </div>
                  </a>
                  {item.children &&
                    item.children.length > 0 &&
                    item.children.map((item2) => {
                      return (
                        <a
                          onClick={() => {
                            pushFileDetail(selectedSpace.guid, item2.key);
                          }}
                          key={item2.key}
                        >
                          <div className={styles.centerChildren}>
                            <div className={styles.title}>{item2.title}</div>
                            <div className={styles.subLine}>
                              <div className={styles.statistics}>
                                {/*{item2.escalatedTime > 0 && (*/}
                                {/*  <span className={styles.duration}>*/}
                                {/*    阅读时长: {escalatedTimeStr(item2.escalatedTime)}*/}
                                {/*  </span>*/}
                                {/*)}*/}

                                {item2.cntView > 0 && (
                                  <span className={styles.readed}>
                                    &nbsp;&nbsp;{item2.cntView}次学习
                                  </span>
                                )}

                                {item2.cntComment > 0 && (
                                  <span className={styles.comment}>
                                    &nbsp;&nbsp;{item2.cntComment}条评论
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </a>
                      );
                    })}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
export default SpaceArticleTree;
