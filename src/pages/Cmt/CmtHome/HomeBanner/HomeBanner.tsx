import styles from "@/pages/Cmt/CmtHome/Home.less";
import {PlusCircleFilled} from "@ant-design/icons";
import {memo, useState} from "react";
import {Modal} from "antd";
import BannerModal from "@/pages/Cmt/CmtHome/BannerModal";
import {useModel} from "@umijs/max";

interface BannerItem {
  isSetBanner: boolean;
  title?: string;
  img?: string;
}

type HomeBannerProps = {
  uuid: string;
  bannerItem: BannerItem;
  GetApiHomePageRequest: () => {};
}

const isEqual = (prevProps: HomeBannerProps, nextProps: HomeBannerProps) => {
  console.log("prevProps", prevProps)
  console.log("nextProps", nextProps)
  return prevProps.uuid === nextProps.uuid
}

const HomeBanner = (props: HomeBannerProps) => {
  console.log("HomeBanner Update")
  const {currentCmt} = useModel('community');

  // const intl = useIntl();
  // const i = (id: string) => intl.formatMessage({id});
  const {bannerItem, GetApiHomePageRequest} = props
  const [changeBannerVisible, setChangeBannerVisible] = useState<boolean>(false);

  return (
    <>
      <div className={styles.homeContentBanner}>
        {!bannerItem.img && !bannerItem.title ? (
          currentCmt?.permission?.isAllowManageCommunity && <div
            className={styles.homeContentBannerEmpty}
            onClick={() => {
              setChangeBannerVisible(true)
            }}
          >
            <PlusCircleFilled className={styles.homeContentBannerEmptyIcon}/>
            <span className={styles.homeContentBannerEmptyText}>
                  {/*{i('cmtWelcome.banner.placeholder')}*/}
                </span>
          </div>
        ) : !bannerItem.img ? (
          <div
            className={styles.homeContentBannerBox}
            onClick={() => {
              if (currentCmt?.permission?.isAllowManageCommunity) {
                setChangeBannerVisible(true)
              }
            }}
          >
            <div className={styles.homeContentBannerText} style={{width: '100%'}}>
              <span className={styles.homeContentBannerTextTitle}>{bannerItem.title}</span>
            </div>
          </div>
        ) : (
          <div
            className={styles.homeContentBannerBox}
            onClick={() => {
              if (currentCmt?.permission?.isAllowManageCommunity) {
                setChangeBannerVisible(true)
              }
            }}
            style={{backgroundImage: `url(${bannerItem.img})`}}
          >
            <div className={styles.homeContentBannerText}>
              <span className={styles.homeContentBannerTextTitle}>{bannerItem.title}</span>
            </div>
          </div>
        )}
      </div>
      <div className={styles.homeContentHeaderContainer}>
        <Modal
          className={styles.modal}
          getContainer={false}
          footer={null}
          onCancel={() => setChangeBannerVisible(false)}
          open={changeBannerVisible}
          centered
        >
          <BannerModal
            bannerItem={bannerItem}
            fetchHomeInfo={GetApiHomePageRequest}
            setChangeBannerVisible={setChangeBannerVisible}
          />
        </Modal>
      </div>
    </>)
}

export default memo(HomeBanner, isEqual)
