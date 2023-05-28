import { CheckCircleFilled } from '@ant-design/icons';
import { Button, Col, Empty, Row, Spin, Tabs } from 'antd';
import React, { useState } from 'react';
import useAsyncEffect from 'use-async-effect';
import styles from './ImgUploadModal.less';
import { OSSUpload } from '@/components/OssUpload/OssUpload';
import { UploadType } from '@/enums/spacetype';

const { TabPane } = Tabs;

interface ImgUploadModalProps {
  spaceGuid?: string;
  setModalVisible: (visible: boolean) => void;
  imgAspect?: number;
  uploadType: UploadType;
  setImageLoading?: (boolean) => void;
  // imgUploadLoading: boolean;
  // beforeUpload: (file: any) => void;
  outerImageUrl: string;
  setOuterImageUrl: (url: string) => void;
  getRecommendImageUrl?: () => Promise<any>;
}

const ImgUploadModal: React.FC<ImgUploadModalProps> = (props) => {
  const {
    setModalVisible,
    uploadType,
    setImageLoading,
    // imgUploadLoading,
    spaceGuid,
    getRecommendImageUrl,
    setOuterImageUrl,
  } = props;
  const [recommendImgs, setRecommendImgs] = useState<string[]>([]);
  const [recommendLoading, setRecommendLoading] = useState<boolean>(false);
  const [chosenImg, setChosenImg] = useState<string>('');

  useAsyncEffect(async () => {
    if (getRecommendImageUrl) {
      setRecommendLoading(true);
      try {
        const res = await getRecommendImageUrl();
        if (res.code === 0) {
          setRecommendImgs(res.data?.list || []);
          setRecommendLoading(false);
        }
      } catch (err) {
        console.error(err);
      }
    }
  }, []);

  return (
    <div className={styles.img}>
      <Tabs defaultActiveKey="1">
        <TabPane tab="本地上传" key="1">
          {/*<ImgCrop aspect={props?.imgAspect} quality={1}>*/}
          {/*<Upload*/}
          {/*  name="file"*/}
          {/*  listType="picture"*/}
          {/*  showUploadList={false}*/}
          {/*  beforeUpload={beforeUpload}*/}
          {/*>*/}
          {/*  <div className={styles.uploader}>*/}
          {/*    <Button className={styles.uploaderBtn} type="primary" loading={imgUploadLoading}>*/}
          {/*      上传图片*/}
          {/*    </Button>*/}
          {/*  </div>*/}
          {/*</Upload>*/}
          <OSSUpload
            setImageLoading={setImageLoading}
            spaceGuid={spaceGuid}
            onChange={(value) => {
              setOuterImageUrl(value);
              setModalVisible(false);
            }}
            uploadType={uploadType}
          >
            <div className={styles.uploader}>
              {/*<Button className={styles.uploaderBtn} type="primary" loading={imgUploadLoading}>*/}
              <Button className={styles.uploaderBtn} type="primary">
                上传图片
              </Button>
            </div>
          </OSSUpload>
          {/*</ImgCrop>*/}
        </TabPane>
        <TabPane tab="推荐" key="2">
          <div className={styles.imgsBox}>
            <Spin spinning={recommendLoading}>
              <Row gutter={[20, 20]}>
                {recommendImgs?.length ? (
                  recommendImgs.map((item: string) => (
                    <Col span={8} key={item}>
                      <div
                        className={styles.imgItemBox}
                        onClick={() => {
                          if (chosenImg !== item) {
                            setChosenImg(item);
                          } else {
                            setChosenImg('');
                          }
                        }}
                      >
                        <img src={item} alt="OF推荐图片" className={styles.imgItem} />
                        {chosenImg === item && (
                          <>
                            <div
                              className={styles.chosenMask}
                              style={{ aspectRatio: props?.imgAspect as any }}
                            />
                            <CheckCircleFilled className={styles.chosenIcon} />
                          </>
                        )}
                      </div>
                    </Col>
                  ))
                ) : (
                  <div className={styles.emptyBox}>
                    <Empty />
                  </div>
                )}
              </Row>
            </Spin>
          </div>
          <div className={styles.imgAction}>
            <Button className={styles.imgActionBtn} onClick={() => setModalVisible(false)}>
              取消
            </Button>
            <Button
              type="primary"
              className={styles.imgActionBtn}
              disabled={chosenImg === ''}
              onClick={() => {
                setOuterImageUrl(chosenImg);
                setModalVisible(false);
              }}
            >
              确定
            </Button>
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default ImgUploadModal;
