import styles from "@/pages/Cmt/CmtHome/Home.less";
import {pushFileDetail} from "@/utils/historypush/history";
import {memo} from "react";

type HomeRecommendListProps = {
  uuid: string;
  recommendList: Commonv1FileShow[];
}

const isEqual = (prevProps: HomeRecommendListProps, nextProps: HomeRecommendListProps) => {
  return prevProps.uuid === nextProps.uuid
}

const HomeRecommendList = (props: HomeRecommendListProps) => {
  console.log("RecommendList Update")

  const {recommendList} = props;
  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebar_title}>推荐文章</div>
      <div className={styles.recommend_list}>
        {recommendList.map((item) => {
          return (
            <div
              className={styles.recommend_item}
              key={item.guid}
              onClick={() => {
                pushFileDetail(item.spaceGuid, item.guid);
              }}
            >
              <div className={styles.recommend_item_title}>{item.name}</div>
              <div className={styles.recommend_item_author}>{item.nickname}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default memo(HomeRecommendList, isEqual)
