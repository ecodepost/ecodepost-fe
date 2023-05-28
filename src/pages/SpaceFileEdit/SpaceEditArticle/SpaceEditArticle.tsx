import { messageInfo } from '@/components/Message/Message';
import Editor from '@/components/Editor/WriteEditor';
import ImgUploadModal from '@/components/ImgUploadModal/ImgUploadModal';
import { Button, Input, Modal, Skeleton } from 'antd';
import { useEffect, useState } from 'react';
import { useIntl } from 'umi';
import styles from './SpaceEditArticle.less';
import commonStyle from '../SpaceFileEditPage.less';
import { pushFileList } from '@/utils/historypush/history';
import classNames from 'classnames';
import { GetApiArticlesRecommendCovers, PutApiArticlesGuid } from '@/services/base/api.gen';
import {ChosenSpaceType, LayoutFileProps} from '@/pages/typings';
import { useRequestFileInfo } from '@/hooks/fileRequest/info';
import { UploadType } from '@/enums/spacetype';
import DetailHeader from '@/components/Header/DetailHeader/DetailHeader';
import useRequestX from '@/hooks/useRequestX';

const SpaceEditArticle = (props: LayoutFileProps) => {
  const { selectedSpace, fileGuid } = props;
  const [name, setName] = useState<string>('');
  const [imageUrl, setImageUrl] = useState<string>();
  const [imageModalVisible, setImageModalVisible] = useState<boolean>(false);
  const [postContent, setPostContent] = useState();
  const { article, fileLoading, defaultValue } = useRequestFileInfo(fileGuid);

  useEffect(() => {
    if (!article) {
      return;
    }
    setName(article.name);
    setImageUrl(article.headImage || '');
  }, [article]);

  const intl = useIntl();
  const i = (id: string) => intl.formatMessage({ id });

  const PutApiArticlesGuidReq = useRequestX(PutApiArticlesGuid, {
    onSuccess: () => {
      messageInfo({
        type: 'success',
        content: i('editArticle.update.success'),
      });
      setName('');
      pushFileList(selectedSpace.guid);
    },
  });

  const handlePublishArticle = () => {
    PutApiArticlesGuidReq.run(fileGuid, {
      name,
      content: postContent,
      headImage: imageUrl,
    });
  };

  return (
    (<div className={commonStyle.top_container}>
      <DetailHeader></DetailHeader>
      <Skeleton
        loading={fileLoading}
        style={{
          minHeight: 200,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {article && (
          <div className={styles.container}>
            <div className={styles.title}>
              <div className={styles.title_upload}>
                {imageUrl && (
                  <div className={styles.action_btn_container_top}>
                    <Button
                      style={{ marginRight: 12 }}
                      className={styles.action_btn}
                      onClick={(e) => {
                        e.stopPropagation();
                        pushFileList(selectedSpace.guid);
                      }}
                    >
                      {i('cancel')}
                    </Button>
                    <Button
                      type="primary"
                      loading={PutApiArticlesGuidReq.loading}
                      className={styles.action_btn}
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePublishArticle();
                      }}
                    >
                      {i('publish')}
                    </Button>
                  </div>
                )}

                {imageUrl === '' ? (
                  <div className={styles.upload_wrapper}>
                    <div
                      className={styles.title_img_none}
                      onClick={() => setImageModalVisible(true)}
                    >
                      {/*{loading ? (*/}
                      {/*  <Spin/>*/}
                      {/*) : (*/}
                      {/*  <i*/}
                      {/*    className={classNames('iconfont', 'icon-tupian', styles.title_img_icon)}*/}
                      {/*  />*/}
                      {/*)}*/}
                      <span className={styles.title_img_text}>{i('editArticle.headImg.add')}</span>
                    </div>
                    <div className={styles.action_btn_container}>
                      <Button
                        style={{ marginRight: 12 }}
                        className={styles.action_btn}
                        onClick={(e) => {
                          e.stopPropagation();
                          pushFileList(selectedSpace.guid);
                        }}
                      >
                        {i('cancel')}
                      </Button>
                      <Button
                        type="primary"
                        loading={PutApiArticlesGuidReq.loading}
                        className={styles.action_btn}
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePublishArticle();
                        }}
                      >
                        {i('publish')}
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className={styles.title_img_pic}>
                    <img
                      src={imageUrl}
                      alt={i('editArticle.headImg.alt')}
                      style={{ aspectRatio: '904/200', width: '100%', borderRadius: 8 }}
                    />
                    <div className={styles.imgMask} />
                    <Button
                      className={styles.imgMaskBtn}
                      onClick={() => setImageModalVisible(true)}
                    >
                      更换图片
                    </Button>
                  </div>
                )}
                <Modal
                  className={styles.modal}
                  footer={null}
                  open={imageModalVisible}
                  onCancel={() => setImageModalVisible(false)}
                  width={565}
                  getContainer={false}
                >
                  <ImgUploadModal
                    uploadType={UploadType.FILE_HEAD_IMAGE}
                    spaceGuid={selectedSpace.guid}
                    imgAspect={904 / 200}
                    setModalVisible={setImageModalVisible}
                    outerImageUrl={imageUrl}
                    setOuterImageUrl={setImageUrl}
                    getRecommendImageUrl={GetApiArticlesRecommendCovers}
                  />
                </Modal>
              </div>

              <div
                className={styles.title_input}
                style={{ padding: imageUrl === '' ? '20px 0' : '22px 0 20px' }}
              >
                <Input
                  bordered={false}
                  placeholder={i('editArticle.title.placeholder')}
                  className={styles.title_input_text}
                  defaultValue={article.name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
            <div className={classNames(commonStyle.editor)}>
              {defaultValue != undefined && (
                <Editor
                  initialValue={defaultValue}
                  onChange={(value) => {
                    setPostContent(value);
                  }}
                  spaceGuid={selectedSpace.guid}
                  topHeader={true}
                />
              )}
            </div>
          </div>
        )}
      </Skeleton>
    </div>)
  );
};

export default SpaceEditArticle;
