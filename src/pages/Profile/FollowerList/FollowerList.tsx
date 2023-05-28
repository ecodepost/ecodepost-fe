import styles from './Article.less';
import {Divider, Empty, Spin} from 'antd';
import {useParams} from 'umi';
import React, {useEffect, useState} from 'react';
import {GetApiUsersNameFollowers} from "@/services/base/api.gen";
import useRequestX from "@/hooks/useRequestX";

const FollowerList: React.FC = (props) => {
  const {name} = useParams<{ name: string }>();
  const [followersList, setFollowersList] = useState<ProfileFollowingItem[]>();

  const GetApiUsersNameFollowersReq = useRequestX(GetApiUsersNameFollowers, {
    onSuccess: ({data}) => {
      setFollowersList(data.list || []);
    }
  })

  useEffect(() => {
    GetApiUsersNameFollowersReq.run(name, {
      currentPage: 1, // 当前页数
      pageSize: 20, // 每页总数
      sort: "", // 排序字符串
    });
  }, [name]);

  return (
    <div className={styles.collectionContainer}>
      <div className={styles.cardList}>
        <Spin spinning={GetApiUsersNameFollowersReq.loading}>
          {followersList && (
            followersList.length > 0 ? (
              followersList.map((item: any) => {
                return (
                  <>
                    <div className={styles.followCard}>
                      <div className={styles.followInfo}>
                        <img className={styles.followAvatar} src={item.avatar} alt=""/>
                        <div>
                          <p className={styles.followName}>{item.nickname}</p>
                          {/*<p className={styles.followDesc}>技术宅，撸猫，摄影，国服妲己...</p>*/}
                          {/*<p className={styles.followData}>关注 10 ｜ 粉丝 10</p>*/}
                          {/*<p className={styles.followTag}>软件工程师</p>*/}
                        </div>
                      </div>
                      {/*{isMy ? (*/}
                      {/*  <Button*/}
                      {/*    className={styles.followButton}*/}
                      {/*    loading={PostApiMyFollowingUidReq.loading}*/}
                      {/*    onClick={() => doFollow(item.uid)}*/}
                      {/*  >*/}
                      {/*    关注*/}
                      {/*  </Button>*/}
                      {/*) : (*/}
                      {/*  <></>*/}
                      {/*)}*/}
                    </div>
                    <Divider/>
                  </>
                );
              })
            ) : (
              <Empty/>
            )
          )}
        </Spin>
      </div>
    </div>
  );
};

export default FollowerList;
