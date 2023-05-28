import {Col, Row, Skeleton} from 'antd';
import {useIntl, useModel} from '@umijs/max';
import dayjs from 'dayjs';
import {useCallback, useEffect, useRef, useState} from 'react';
import styles from './Home.less';
import FeedCardList from '@/components/File/FeedCardList/FeedCardList';
import {GetApiFilesPermissions, GetApiFilesStats, GetApiHomeFiles, GetApiHomePage,} from '@/services/base/api.gen';
import {pushFileDetail} from '@/utils/historypush/history';
import useRequestX from '@/hooks/useRequestX';
import SpaceContainer from '@/components/SpaceContainer/SpaceContainer';
import HomeEmpty from '@/components/Empty/HomeEmpty/HomeEmpty';
import HomeHeader from '@/components/Header/HomeHeader/HomeHeader';
import HomeBanner from '@/pages/Cmt/CmtHome/HomeBanner/HomeBanner';
import {nanoid} from 'nanoid';
import HomeRecommendList from '@/pages/Cmt/CmtHome/HomeRecommendList/HomeRecommendList';
import HomeMemberList from '@/pages/Cmt/CmtHome/HomeMemberList/HomeMemberList';
import {FileOperationBarContext} from '@/components/File/FileOperationBar/FileOperationBar';

const HotActvList = (props: any) => {
  const { hotActvList } = props;

  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebar_title}>热门活动</div>
      <div className={styles.hot_actv_list}>
        {hotActvList.map((item) => {
          return (
            <div className={styles.hot_actv_item} key={item.guid}>
              <a
                onClick={() => {
                  pushFileDetail(item.spaceGuid, item.guid);
                }}
              >
                <Row gutter={12}>
                  <Col span={5}>
                    <div className={styles.hot_actv_item_time}>
                      <div className={styles.hot_actv_item_time_day}>
                        {dayjs.unix(item.startTime).format('DD')}
                      </div>
                      <div className={styles.hot_actv_item_time_month}>
                        {dayjs.unix(item.startTime).format('MM')}
                      </div>
                    </div>
                  </Col>
                  <Col span={19}>
                    <div className={styles.hot_actv_item_title}>{item.name}</div>
                    <div className={styles.hot_actv_item_content}>
                      {dayjs.unix(item.startTime).format('YYYY-MM-DD HH:mm')}
                    </div>
                  </Col>
                </Row>
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
};

type HomePageData = HomePageRes & {
  uuid: string;
};

const HomePage = () => {
  const {
    initialState: { currentUser,currentCmt },
  } = useModel('@@initialState');

  const intl = useIntl();
  const i = (id: string) => intl.formatMessage({id});
  const {getCurrentTitle} = useModel('community');
  document.title = getCurrentTitle(i('title.base'), {
    title_home: i('title.homepage'),
  });

  const [arrayObjectArticleRecommend, setArrayObjectArticleRecommend] =
    useState<Commonv1FileShow[]>(undefined);
  const [myFileStats, setMyFileStats] = useState<FileStatRes>();
  const [filePmsList, setFilePmsList] = useState<Filev1PermissionRes[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageStateRef = useRef(null);
  const [homePage, setHomePage] = useState<HomePageData>();

  // 获取文件状态信息
  const GetApiFilesStatsRequest = useRequestX(GetApiFilesStats, {
    onSuccess: (res) => {
      setMyFileStats(res.data);
    },
  });

  const GetApiFilePermissionsRequest = useRequestX(GetApiFilesPermissions, {
    onSuccess: (res) => {
      setFilePmsList((prev) => [...prev, ...(res.data?.list || [])]);
    },
  });

  // 获取首页信息
  const GetApiHomePageRequest = useRequestX(() => GetApiHomePage(), {
    onSuccess: (res) => {
      setHomePage({
        uuid: nanoid(),
        ...res.data,
      });
      setArrayObjectArticleRecommend(res.data?.articlePageList.list || []);
      setTotal(res.data?.articlePageList.pagination.total || 0);
      setCurrentPage((prev) => prev + 1);
      // 如果用户登录了，获取他的文件状态信息
      if (currentUser) {
        const fileGuids = res.data.articlePageList.list.map((item) => item.guid);
        if (fileGuids.length > 0) {
          GetApiFilesStatsRequest.run({
            fileGuids,
          });
          GetApiFilePermissionsRequest.run({ guids: fileGuids });
        }
      } else {
        setMyFileStats({
          collectList: [],
          emojiList: [],
        });
      }
    },
  });

  const GetApiHomeFilesRequest = useRequestX(GetApiHomeFiles);

  const fetchFileList = useCallback(
    async (initPage?: number) => {
      const res = await GetApiHomeFilesRequest.run({
        currentPage: pageStateRef.current,
      });
      if (res.code !== 0) {
        return;
      }

      setCurrentPage((prev) => prev + 1);
      setArrayObjectArticleRecommend((prve) => [...prve, ...(res.data?.list || [])]);
      if (total !== res.pagination?.total) setTotal(res.pagination?.total);

      const fileGuids = res.data?.list.map((item) => item.guid);
      if (fileGuids.length > 0) {
        GetApiFilePermissionsRequest.run({ guids: fileGuids });
      }
    },
    [pageStateRef],
  );

  useEffect(() => {
    pageStateRef.current = 1;
    GetApiHomePageRequest.run();
  }, []);

  useEffect(() => {
    pageStateRef.current = currentPage;
  }, [currentPage]);

  return (
    <SpaceContainer>
      <HomeHeader />
      {homePage && homePage.isSetBanner && (
        <HomeBanner
          uuid={homePage.uuid}
          bannerItem={{
            isSetBanner: homePage.isSetBanner,
            title: homePage.bannerTitle || '',
            img: homePage.bannerImg || '',
          }}
          GetApiHomePageRequest={GetApiHomePageRequest.run}
        />
      )}
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.homeContentArticle}>
            <div className={styles.homeContentArticleItem}>
              <Skeleton
                loading={GetApiHomePageRequest.loading}
                style={{
                  minHeight: 200,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {arrayObjectArticleRecommend &&
                  (arrayObjectArticleRecommend.length > 0 ? (
                    <FileOperationBarContext.Provider
                      value={{
                        fetchFileList,
                        options: {
                          isOpenSiteTop: false,
                          isOpenRecommend: false,
                        },
                      }}
                    >
                      <FeedCardList
                        articleList={arrayObjectArticleRecommend}
                        myFileStats={myFileStats}
                        total={total}
                        articlePmsList={filePmsList}
                        fetchArticleList={fetchFileList}
                      />
                    </FileOperationBarContext.Provider>
                  ) : (
                    <HomeEmpty />
                  ))}
              </Skeleton>
            </div>
          </div>
        </div>
        <div className={styles.container_aside}>
          {homePage &&
            homePage.articleHot &&
            homePage.articleHot.list &&
            homePage.articleHot.list.length > 0 && (
              <HomeRecommendList uuid={homePage.uuid} recommendList={homePage?.articleHot?.list} />
            )}
          <HomeMemberList />
          <div className={styles.copyright}>
            <span className={styles.copyright_text}>© 2022 E源社</span>
            <span className={styles.copyright_text}>
              <a
                className={styles.link}
                href="https://beian.miit.gov.cn/"
                target="_blank"
                rel="noopener noreferrer"
              >
                {currentCmt.cmtInfo.gongxinbuBeian}
                {/*沪ICP备2022029758号-1 &nbsp;*/}
              </a>
            </span>
            <span className={styles.copyright_text}>
              <a
                href="http://jubao.py.cnhubei.com"
                className={styles.link}
                target="_blank"
                rel="nofollow noopener noreferrer"
              >
                违法和不良信息举报电话
              </a>
              电话：12377
            </span>
            {/*<div>*/}
            {/*  <a*/}
            {/*    href="http://jubao.py.cnhubei.com"*/}
            {/*    target="_blank"*/}
            {/*    rel="nofollow noopener noreferrer"*/}
            {/*  >*/}
            {/*    <img*/}
            {/*      className={styles.footer_img}*/}
            {/*      src="https://as.smvm.cn/static/lizard-service-homepage/assets/report.7778e60b.png"*/}
            {/*    ></img>*/}
            {/*  </a>*/}
            {/*  <a href="http://www.12377.cn" target="_blank" rel="nofollow noopener noreferrer">*/}
            {/*    <img*/}
            {/*      src="https://as.smvm.cn/static/lizard-service-homepage/assets/violence_report.adce5e7a.png"*/}
            {/*      className={styles.footer_img}*/}
            {/*    ></img>*/}
            {/*  </a>*/}
            {/*</div>*/}
          </div>
        </div>
      </div>
    </SpaceContainer>
  );
};

export default HomePage;
