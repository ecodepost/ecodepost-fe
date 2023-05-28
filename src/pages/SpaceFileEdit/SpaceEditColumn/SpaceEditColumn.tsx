import { messageInfo } from '@/components/Message/Message';
import Editor from '@/components/Editor/WriteEditor';
import ImgUploadModal from '@/components/ImgUploadModal/ImgUploadModal';
import { Button, Input, Modal, Spin } from 'antd';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { useIntl } from '@umijs/max';
import styles from './SpaceEditColumn.less';
import { GetApiArticlesRecommendCovers, PutApiColumnsGuid } from '@/services/base/api.gen';
import {LayoutFileProps} from '@/pages/typings';
import { pushFileList } from '@/utils/historypush/history';
import { UploadType } from '@/enums/spacetype';
import { useRequestFileInfo } from '@/hooks/fileRequest/info';
import useRequestX from '@/hooks/useRequestX';
import DetailHeader from '@/components/Header/DetailHeader/DetailHeader';


const SpaceEditColumn = (props: LayoutFileProps) => {
  const [publishLoading, setPublishLoading] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const { selectedSpace, fileGuid } = props;
  const [imageUrl, setImageUrl] = useState<string>('');
  const [imageModalVisible, setImageModalVisible] = useState<boolean>(false);
  const [postContent, setPostContent] = useState();

  const intl = useIntl();
  const i = (id: string) => intl.formatMessage({ id });
  const { article, fileLoading, defaultValue } = useRequestFileInfo(fileGuid);

  useEffect(() => {
    setName(article?.name);
  }, [article]);

  const PutApiColumnsGuidRequest = useRequestX(
    () =>
      PutApiColumnsGuid(fileGuid, {
        name,
        content: postContent,
        headImage: imageUrl,
      }),
    {
      onSuccess({ code, data, msg }) {
        messageInfo({
          type: 'success',
          content: i('editArticle.update.success'),
        });
        setName('');
        setPublishLoading(false);
        pushFileList(selectedSpace.guid);
      },
    },
  );

  return (
    (<div className={styles.top_container}>
      <DetailHeader />
      <div className={styles.container}>
        {fileLoading ? (
          <Spin />
        ) : (
          <>
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
                      loading={publishLoading}
                      className={styles.action_btn}
                      onClick={(e) => {
                        e.stopPropagation();
                        PutApiColumnsGuidRequest.run();
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
                      {fileLoading ? (
                        <Spin />
                      ) : (
                        <i
                          className={classNames('iconfont', 'icon-tupian', styles.title_img_icon)}
                        />
                      )}
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
                        loading={publishLoading}
                        className={styles.action_btn}
                        onClick={(e) => {
                          e.stopPropagation();
                          PutApiColumnsGuidRequest.run();
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
                {article && (
                  <Input
                    bordered={false}
                    placeholder={i('editArticle.title.placeholder')}
                    className={styles.title_input_text}
                    defaultValue={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                )}
              </div>
            </div>
            <div
              className={classNames(
                styles.editor,
                imageUrl != '' ? styles.editor_img : styles.editor_no_img,
              )}
            >
              {!fileLoading && (
                <Editor
                  value={defaultValue}
                  onChange={(value) => {
                    setPostContent(value);
                  }}
                  spaceGuid={selectedSpace.guid}
                  topHeader={true}
                />
              )}
            </div>
          </>
        )}
      </div>
    </div>)
  );
};

export default SpaceEditColumn;
