import Editor from '@/components/Editor/WriteEditor';
import ImgUploadModal from '@/components/ImgUploadModal/ImgUploadModal';
import {Button, Input, Modal} from 'antd';
import classNames from 'classnames';
import {useState} from 'react';
import {useIntl} from '@umijs/max';
import styles from './SpaceCreateArticle.less';
import {pushFileList} from '@/utils/historypush/history';
import {GetApiArticlesRecommendCovers, PostApiArticles} from '@/services/base/api.gen';
import type {ChosenSpaceType} from '@/pages/typings';
import {UploadType} from '@/enums/spacetype';
import useRequestX from '@/hooks/useRequestX';
import DetailHeader from '@/components/Header/DetailHeader/DetailHeader';
import commonStyle from '@/pages/SpaceFileEdit/SpaceFileEditPage.less';

type SpaceCreateArticleProps = {
  selectedSpace: ChosenSpaceType;
  spacePms: Spacev1GetSpacePermissionByUidRes;
};

const SpaceCreateArticle = (props: SpaceCreateArticleProps) => {
  const [name, setName] = useState<string>('');
  const { selectedSpace } = props;
  const [postContent, setPostContent] = useState<string>();

  const [imageUrl, setImageUrl] = useState<string>('');
  const [imageModalVisible, setImageModalVisible] = useState<boolean>(false);

  const intl = useIntl();
  const i = (id: string) => intl.formatMessage({ id });

  const PostApiArticlesRequest = useRequestX(
    () => {
      return PostApiArticles({
        name,
        content: postContent,
        spaceGuid: selectedSpace.guid,
        headImage: imageUrl,
      });
    },
    {
      loadingText: {
        done: '发布成功',
      },
      onSuccess: () => {
        setName('');
        setPostContent('');
        pushFileList(selectedSpace.guid);
      },
    },
  );

  return (
    (<div className={commonStyle.top_container}>
      <DetailHeader />
      <div className={styles.container}>
        <div className={styles.title}>
          <div className={styles.title_upload}>
            {imageUrl && (
              <>
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
                    loading={PostApiArticlesRequest.loading}
                    className={styles.action_btn}
                    onClick={(e) => {
                      e.stopPropagation();
                      PostApiArticlesRequest.run();
                    }}
                  >
                    {i('publish')}
                  </Button>
                </div>
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
              </>
            )}

            {imageUrl === '' && (
              <div className={styles.upload_wrapper}>
                <div className={styles.title_img_none} onClick={() => setImageModalVisible(true)}>
                  <i className={classNames('iconfont', 'icon-tupian', styles.title_img_icon)} />
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
                    loading={PostApiArticlesRequest.loading}
                    className={styles.action_btn}
                    onClick={(e) => {
                      e.stopPropagation();
                      PostApiArticlesRequest.run();
                    }}
                  >
                    {i('publish')}
                  </Button>
                </div>
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
        <div className={classNames(commonStyle.editor)}>
          <Editor
            spaceGuid={selectedSpace.guid}
            onChange={(value) => {
              setPostContent(value);
            }}
            topHeader={true}
          />
        </div>
      </div>
    </div>)
  );
};

export default SpaceCreateArticle;
