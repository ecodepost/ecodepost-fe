import ImgUploadModal from '@/components/ImgUploadModal/ImgUploadModal';
import {PlusOutlined} from '@ant-design/icons';
import {Button, Form, Input, Modal, Spin} from 'antd';
import React, {useState} from 'react';
import {useIntl, useParams} from 'umi';
import styles from './CommunityWelcome.less';
import {messageInfo} from '@/components/Message/Message';
import {GetApiCmtRecommendCovers, PutApiMyCommunitiesGuidBanner} from "@/services/base/api.gen";
import {UploadType} from "@/enums/spacetype";
import useRequestX from "@/hooks/useRequestX";

const {TextArea} = Input;

interface BannerItem {
  title?: string;
  content?: string;
  img?: string;
}

interface BannerModalProps {
  bannerItem: BannerItem;
  fetchHomeInfo: () => void;
  setChangeBannerVisible: (visible: boolean) => void;
}

const BannerModal: React.FC<BannerModalProps> = (props) => {
  const {bannerItem, fetchHomeInfo, setChangeBannerVisible} = props;
  const [form] = Form.useForm();
  const [imageLoading, setImageLoading] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>(bannerItem.img || '');
  const [imageModalVisible, setImageModalVisible] = useState<boolean>(false);

  const intl = useIntl();
  const i = (id: string) => intl.formatMessage({id});
  const [submitBtnLoading, setSubmitBtnLoading] = useState<boolean>(false);

  const PutApiMyCommunitiesGuidBannerReq = useRequestX(PutApiMyCommunitiesGuidBanner, {
    onSuccess: () => {
      fetchHomeInfo();
      setChangeBannerVisible(false);
      setSubmitBtnLoading(false);
    }
  })

  const handleSubmit = async (val: any) => {
    if (imageLoading) {
      messageInfo({
        type: 'error',
        content: i('cmtWelcome.bannerModal.update.loading.error'),
      });
      return;
    }
    setSubmitBtnLoading(true);
    PutApiMyCommunitiesGuidBannerReq.run({...val, img: imageUrl});
  };


  return (
    <Form
      form={form}
      onFinish={handleSubmit}
      initialValues={{ title: bannerItem?.title, content: bannerItem?.content }}
    >
      <div className={styles.banner}>
        <div className={styles.bannerTitle}>
          <span>{i('cmtWelcome.bannerModal.title')}</span>
        </div>
        <div className={styles.bannerImg}>
          {imageLoading ? (
            <Spin />
          ) : imageUrl ? (
            <>
              <div className={styles.bannerImgBox}>
                <img src={imageUrl} alt={i('cmtWelcome.bannerModal.img.alt')} />
              </div>
              <div className={styles.bannerImgAction}>
                <Button
                  className={styles.bannerImgActionBtn}
                  onClick={() => setImageModalVisible(true)}
                >
                  {i('cmtWelcome.bannerModal.img.upload.change')}
                </Button>
                <Button
                  type="primary"
                  className={styles.bannerImgActionBtn}
                  onClick={() => setImageUrl('')}
                >
                  {i('cmtWelcome.bannerModal.img.upload.clear')}
                </Button>
              </div>
            </>
          ) : (
            <div onClick={() => setImageModalVisible(true)}>
              <div className={styles.bannerImgEmpty}>
                <PlusOutlined className={styles.bannerImgEmptyIcon} />
              </div>
              <span className={styles.bannerImgEmptyText}>
                {i('cmtWelcome.bannerModal.img.upload.add')}
              </span>
            </div>
          )}
        </div>
        <Modal
          className={styles.modal}
          footer={null}
          centered
          open={imageModalVisible}
          onCancel={() => setImageModalVisible(false)}
          width={565}
          getContainer={false}
        >
          <ImgUploadModal
            setImageLoading={setImageLoading}
            uploadType={UploadType.COMMUNITY_BANNER}
            imgAspect={780 / 200}
            setModalVisible={setImageModalVisible}
            outerImageUrl={imageUrl}
            setOuterImageUrl={setImageUrl}
            getRecommendImageUrl={GetApiCmtRecommendCovers}
          />
        </Modal>
        <div className={styles.bannerInput}>
          <span className={styles.bannerInputTitle}>{i('cmtWelcome.bannerModal.title.title')}</span>
          <span className={styles.bannerInputSubtitle}>
            {i('cmtWelcome.bannerModal.title.tip')}
          </span>
          <Form.Item
            name="title"
            rules={[
              {
                required: true,
                message: i('cmtWelcome.bannerModal.title.validate'),
              },
            ]}
          >
            <Input
              className={styles.bannerInputInput}
              placeholder={i('cmtWelcome.bannerModal.title.placeholder')}
              maxLength={20}
            />
          </Form.Item>
        </div>
        <div className={styles.bannerInput}>
          <span className={styles.bannerInputTitle}>
            {i('cmtWelcome.bannerModal.content.title')}
          </span>
          <span className={styles.bannerInputSubtitle}>
            {i('cmtWelcome.bannerModal.content.tip')}
          </span>
          <Form.Item
            name="content"
            rules={[
              {
                required: true,
                message: i('cmtWelcome.bannerModal.content.validate'),
              },
            ]}
          >
            <TextArea
              maxLength={100}
              className={styles.bannerInputTextarea}
              placeholder={i('cmtWelcome.bannerModal.content.placeholder')}
              autoSize={{ minRows: 4, maxRows: 4 }}
            />
          </Form.Item>
        </div>
        <div className={styles.bannerAction}>
          <Button className={styles.bannerActionBtn} onClick={() => setChangeBannerVisible(false)}>
            {i('cancel')}
          </Button>
          <Button
            type="primary"
            className={styles.bannerActionBtn}
            htmlType="submit"
            loading={submitBtnLoading}
          >
            {i('confirm-queding')}
          </Button>
        </div>
      </div>
    </Form>
  );
};

export default BannerModal;
