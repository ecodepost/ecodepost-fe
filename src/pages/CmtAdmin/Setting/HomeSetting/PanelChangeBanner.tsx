import ImgUploadModal from '@/components/ImgUploadModal/ImgUploadModal';
import {Modal} from 'antd';
import styles from './PanelChangeBanner.less';
import {GetApiCmtRecommendCovers} from "@/services/base/api.gen";
import {UploadType} from "@/enums/spacetype";

const PanelChangeBanner = (props) => {
  const {setChangeBannerVisible, setFieldBannerImg} = props;

  return (
    (<Modal
      className={styles.modal}
      getContainer={false}
      footer={null}
      onCancel={() => setChangeBannerVisible(false)}
      open={props.visible}
      centered
      destroyOnClose={true}
    >
      <ImgUploadModal
        uploadType={UploadType.COMMUNITY_BANNER}
        imgAspect={780 / 200}
        setModalVisible={setChangeBannerVisible}
        outerImageUrl={props.fieldBannerImg}
        setOuterImageUrl={setFieldBannerImg}
        getRecommendImageUrl={GetApiCmtRecommendCovers}
      />
    </Modal>)
  );
};

export default PanelChangeBanner;
