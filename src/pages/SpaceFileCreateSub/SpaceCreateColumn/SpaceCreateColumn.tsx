import { messageInfo } from '@/components/Message/Message';
import Editor from '@/components/Editor/WriteEditor';
import ImgUploadModal from '@/components/ImgUploadModal/ImgUploadModal';
import { Button, Input, Modal, Spin } from 'antd';
import classNames from 'classnames';
import { useState } from 'react';
import { useIntl } from 'umi';
import styles from './SpaceCreateColumn.less';
import { GetApiArticlesRecommendCovers, PostApiColumns } from '@/services/base/api.gen';
import { pushFileList } from '@/utils/historypush/history';
import useRequestX from '@/hooks/useRequestX';
import { ChosenSpaceType } from '@/pages/typings';
import { UploadType } from '@/enums/spacetype';
import DetailHeader from '@/components/Header/DetailHeader/DetailHeader';

type SpaceCreateColumnProps = {
  selectedSpace: ChosenSpaceType;
  spacePms: Spacev1GetSpacePermissionByUidResponse;
  fileGuid: string;
};

const SpaceCreateColumn = (props: SpaceCreateColumnProps) => {
  const { selectedSpace, fileGuid } = props;
  const [postContent, setPostContent] = useState<string>();
  const [name, setName] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>('');
  const [imageModalVisible, setImageModalVisible] = useState<boolean>(false);

  const intl = useIntl();
  const i = (id: string) => intl.formatMessage({ id });

  const PostApiColumnsRequest = useRequestX(
    () =>
      PostApiColumns({
        name,
        content: postContent,
        spaceGuid: selectedSpace.guid,
        parentGuid: fileGuid,
        headImage: imageUrl,
      }),
    {
      onSuccess: (res) => {
        messageInfo({
          type: 'success',
          content: i('createArticle.submit.success'),
        });
        setName('');
        setContent('');
        pushFileList(selectedSpace.guid);
      },
    },
  );

  return (
    (<div className={styles.top_container}>
      <DetailHeader />
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
                  loading={PostApiColumnsRequest.loading}
                  className={styles.action_btn}
                  onClick={(e) => {
                    e.stopPropagation();
                    PostApiColumnsRequest.run();
                  }}
                >
                  {i('publish')}
                </Button>
              </div>
            )}

            {imageUrl === '' ? (
              <div className={styles.upload_wrapper}>
                <div className={styles.title_img_none} onClick={() => setImageModalVisible(true)}>
                  {loading ? (
                    <Spin />
                  ) : (
                    <i className={classNames('iconfont', 'icon-tupian', styles.title_img_icon)} />
                  )}
                  <span className={styles.title_img_text}>{i('createArticle.headImg.add')}</span>
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
                    loading={PostApiColumnsRequest.loading}
                    className={styles.action_btn}
                    onClick={(e) => {
                      e.stopPropagation();
                      PostApiColumnsRequest.run();
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
                  alt={i('createArticle.headImg.alt')}
                  style={{ aspectRatio: '904/200', width: '100%', borderRadius: 8 }}
                />
                <div className={styles.imgMask} />
                <Button className={styles.imgMaskBtn} onClick={() => setImageModalVisible(true)}>
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
            style={{ padding: imageUrl === '' ? '20px 0' : '22px 0 20px 0' }}
          >
            <Input
              bordered={false}
              placeholder={i('createArticle.title.placeholder')}
              className={styles.title_input_text}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>
        <div
          className={classNames(
            styles.editor,
            imageUrl != '' ? styles.editor_img : styles.editor_no_img,
          )}
        >
          <Editor
            spaceGuid={selectedSpace.guid}
            topHeader={true}
            onChange={(value) => {
              setPostContent(value);
            }}
          />
        </div>
      </div>
    </div>)
  );
};

export default SpaceCreateColumn;
