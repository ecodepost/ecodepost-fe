import React, {useEffect, useState} from 'react';
import dayjs from 'dayjs';
import {Button, Col, Row, Spin, Tabs} from 'antd';
import type {IRoute} from 'umi';
import {useModel, useParams} from '@umijs/max';
import styles from './Profile.less';
import {DeleteApiMyFollowingUid, GetApiUsersNameTotal, PostApiMyFollowingUid,} from '@/services/base/api.gen';
import useRequestX from '@/hooks/useRequestX';
import NotFound from '@/components/NotFound/NotFound';
import {GetURLProfileTab} from '@/utils/GetUrlParams';
import {pushUserPageTab} from '@/utils/historypush/history';
import {Outlet} from '@@/exports';

const {TabPane} = Tabs;
//
// interface MedalList {
//   title: string;
//   medals: MedalInfo[];
// }
//
// interface MedalInfo {
//   id: number;
//   url: string;
//   name: string;
//   time: number;
//   ctime: number;
// }
//
// interface ManageInfo {
//   id: number;
//   logo: string;
//   name: string;
//   guid: string;
// }

const Profile = (props: IRoute) => {
  const { name } = useParams<{  name: string }>();
  const profileTab = GetURLProfileTab();
  const [myTab, setMyTab] = useState(profileTab);
  const { initialState } = useModel('@@initialState');
  const [isMy, setIsMy] = useState<boolean>();
  const [userProfile, setUserProfile] = useState<ProfileUserTotalRes>();
  // const [medalGroup, setMedalGroup] = useState<MedalList[]>([]);

  useEffect(() => {
    console.log('profileTab', profileTab);
    if (profileTab == undefined || profileTab == '') {
      setMyTab('post');
      pushUserPageTab(name, 'post');
    }
  }, [profileTab]);

  const GetApiUsersNameTotalReq = useRequestX(GetApiUsersNameTotal, {
    onSuccess: ({ data }) => {
      setUserProfile(data);
    },
  });

  const PostApiMyFollowingUidReq = useRequestX(PostApiMyFollowingUid, {
    onSuccess: () => {
      GetApiUsersNameTotalReq.run(name);
    },
  });

  const DeleteApiMyFollowingUidReq = useRequestX(DeleteApiMyFollowingUid, {
    onSuccess: () => {
      GetApiUsersNameTotalReq.run(name);
    },
  });

  // const GetApiUsersNameMedalsReq = useRequestX(GetApiUsersNameMedals, {
  //   onSuccess: ({data}) => {
  //
  //   }
  // })

  const doFollow = async (uid: number) => {
    PostApiMyFollowingUidReq.run(uid);
  };

  const doUnFollow = async (uid: number) => {
    DeleteApiMyFollowingUidReq.run(uid);
  };

  useEffect(() => {
    if (initialState.currentUser?.name == name) {
      setIsMy(true);
    } else {
      setIsMy(false);
    }
    // 获取该用户统计数据
    GetApiUsersNameTotalReq.run(name);
    // 获取该用户的勋章数据
    // GetApiUsersNameMedalsReq.run(name,{});
  }, [name]);

  console.log('isMy', isMy);

  const render404User = () => {
    return userProfile && userProfile.uid === 0 && <NotFound msg="用户不存在" data="" />;
  };

  const renderUserInfo = () => {
    return (
      userProfile &&
      userProfile.uid > 0 && (
        <div className={styles.profileContainer}>
          <div className={styles.avatarContainer}>
            <img
              className={styles.profileAvatar}
              src={isMy ? initialState?.currentUser?.avatar : userProfile?.avatar}
              alt=""
            />
            <div className={styles.profileLvConatiner}>
              <div className={styles.profileLv}>5</div>
            </div>
          </div>
          <div className={styles.name}>
            {isMy ? initialState?.currentUser?.nickname : userProfile?.nickname}
          </div>
          <div className={styles.joinTime}>
            {userProfile
              ? dayjs(userProfile?.registerTime * 1000).format('YYYY/MM/DD')
              : 0}{' '}
            加入 E源社
          </div>
          <Row gutter={12} justify="center">
            <Col span={4}>
              <div
                className={styles.dataContainer}
                onClick={() => pushUserPageTab(name, 'following')}
              >
                <p className={styles.dataNum}>{userProfile ? userProfile.followingCnt : 0}</p>
                <p className={styles.explain}>关注的人</p>
              </div>
            </Col>
            <Col span={4}>
              <div
                className={styles.dataContainer}
                onClick={() => pushUserPageTab(name, 'follower')}
              >
                <p className={styles.dataNum}>{userProfile ? userProfile.followerCnt : 0}</p>
                <p className={styles.explain}>粉丝</p>
              </div>
            </Col>
          </Row>
          {isMy != undefined && !isMy && (
            <Row gutter={12} justify="center">
              <Col span={8}>
                {userProfile.hasFollowed ? (
                  <Button
                    className={styles.otherButton}
                    onClick={() => doUnFollow(userProfile.uid)}
                    loading={DeleteApiMyFollowingUidReq.loading}
                  >
                    取消关注
                  </Button>
                ) : (
                  <Button
                    className={styles.otherButton}
                    onClick={() => doFollow(userProfile.uid)}
                    loading={PostApiMyFollowingUidReq.loading}
                  >
                    关注
                  </Button>
                )}
              </Col>
            </Row>
          )}
          {/*<div className={styles.detailData}>*/}
          {/*  <div className={styles.title}>我的勋章</div>*/}
          {/*  <Divider />*/}
          {/*  <div>*/}
          {/*    {medalGroup.length > 0 ? (*/}
          {/*      medalGroup.map((item: MedalList) => {*/}
          {/*        return (*/}
          {/*          <div key={item.title} className={styles.medalContainer}>*/}
          {/*            <div className={styles.medalTitle}>{item.title}</div>*/}
          {/*            <div className={styles.medalDetail}>*/}
          {/*              {item.medals?.map((medal: MedalInfo) => {*/}
          {/*                return (*/}
          {/*                  <div className={styles.medalInfo} key={medal.id}>*/}
          {/*                    <img*/}
          {/*                      className={styles.medalUrl}*/}
          {/*                      src={initialState?.currentUser?.avatar}*/}
          {/*                      alt=""*/}
          {/*                    />*/}
          {/*                    <p className={styles.medalInfoName}>{medal.name}</p>*/}
          {/*                    <p className={styles.medalInfoTime}>*/}
          {/*                      {dayjs(medal.ctime * 1000)*/}
          {/*                        .utcOffset(0)*/}
          {/*                        .format('YYYY.MM')}{' '}*/}
          {/*                      获得*/}
          {/*                    </p>*/}
          {/*                  </div>*/}
          {/*                );*/}
          {/*              })}*/}
          {/*            </div>*/}
          {/*          </div>*/}
          {/*        );*/}
          {/*      })*/}
          {/*    ) : (*/}
          {/*      <div className={styles.noData}>暂无数据</div>*/}
          {/*    )}*/}
          {/*  </div>*/}
          {/*</div>*/}
          {/*<div className={styles.detailData}>*/}
          {/*  <div className={styles.title}>我管理的社区</div>*/}
          {/*  <Divider />*/}
          {/*  <div>*/}
          {/*    {manageList.length > 0 ? (*/}
          {/*      manageList.map((item: ManageInfo) => {*/}
          {/*        return (*/}
          {/*          <div key={item.id} className={styles.manageInfo}>*/}
          {/*            /!* <div className={styles.manageLogo}></div> *!/*/}
          {/*            <div className={styles.manageName}>{item.name}</div>*/}
          {/*            /!* <Button className={styles.manageButton}>查看管理权限</Button> *!/*/}
          {/*            <Button*/}
          {/*              className={styles.manageButton}*/}
          {/*              onClick={() => history.push(`/c/${item.guid}`)}*/}
          {/*            >*/}
          {/*              前往社区*/}
          {/*            </Button>*/}
          {/*          </div>*/}
          {/*        );*/}
          {/*      })*/}
          {/*    ) : (*/}
          {/*      <div className={styles.noData}>暂无数据</div>*/}
          {/*    )}*/}
          {/*  </div>*/}
          {/*</div>*/}
        </div>
      )
    );
  };

  const renderChildren = (user: ProfileUserTotalRes) => {
    return (
      <Outlet
        context={{
          user: user,
        }}
      />
    );
  };

  // 渲染用户的帖子等信息
  const renderUserFile = () => {
    return (
      userProfile &&
      userProfile.uid > 0 && (
        <div className={styles.community}>
          <Spin spinning={GetApiUsersNameTotalReq.loading}>
            <Tabs
              activeKey={myTab}
              onChange={(value) => {
                setMyTab(value);
                pushUserPageTab(name, value);
              }}
            >
              {isMy ? (
                <TabPane
                  tab={
                    <>
                      <span className={styles.count}>我的收藏</span>
                    </>
                  }
                  key="collection"
                >
                  {renderChildren(userProfile)}
                </TabPane>
              ) : (
                <></>
              )}
              <TabPane
                tab={
                  <>
                    <span className={styles.count}>{isMy ? '我的帖子' : '他的帖子'}</span>
                  </>
                }
                key="post"
              >
                {renderChildren(userProfile)}
              </TabPane>
              <TabPane
                tab={
                  <>
                    <span className={styles.count}>{isMy ? '我的回答' : '他的回答'}</span>
                  </>
                }
                key="answer"
              >
                {renderChildren(userProfile)}
              </TabPane>
              <TabPane
                tab={
                  <>
                    <span className={styles.count}>{'关注的人'}</span>
                  </>
                }
                key="following"
              >
                {renderChildren(userProfile)}
              </TabPane>
              <TabPane
                tab={
                  <>
                    <span className={styles.count}>{'粉丝'}</span>
                  </>
                }
                key="follower"
              >
                {renderChildren(userProfile)}
              </TabPane>
            </Tabs>
          </Spin>
        </div>
      )
    );
  };

  return (
    <>
      <Spin spinning={GetApiUsersNameTotalReq.loading}>
        <div className={styles.mainContainer}>
          {renderUserInfo()}
          {renderUserFile()}
          {render404User()}
        </div>
      </Spin>
    </>
  );
};
export default Profile;
