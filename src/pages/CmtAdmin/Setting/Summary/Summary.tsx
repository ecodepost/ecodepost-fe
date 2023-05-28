import ImgUploadModal from '@/components/ImgUploadModal/ImgUploadModal';
import {Visibility} from '@/enums/visibilitylevel';
import {Avatar, Button, Form, Input, Modal, Radio, Spin} from 'antd';
import classNames from 'classnames';
import {useEffect, useState} from 'react';
import {useIntl, useModel, useParams} from 'umi';
import styles from './Summary.less';
import {messageInfo} from '@/components/Message/Message';
import {GetApiCmtRecommendLogos, PutApiMyCommunitiesGuid} from "@/services/base/api.gen";
import {UploadType} from "@/enums/spacetype";

const Summary = () => {
  const [form] = Form.useForm();
  const { refreshCommunityModel} = useModel('community');
  const {
    initialState: { currentCmt },
  } = useModel('@@initialState');
  const {userInfo: currentCmtUser, cmtInfo: currentCommunity, permission: cmtPms} = currentCmt;

  const [communityInfoLoading, setCommunityInfoLoading] = useState<boolean>(true);
  const [imageUrl, setImageUrl] = useState<string>('');
  const [imageLoading, setImageLoading] = useState<boolean>(false);
  const [currentRadioValue, setCurrentRadioValue] = useState<number>(-1);
  const [imageModalVisible, setImageModalVisible] = useState<boolean>(false);

  const intl = useIntl();
  const i = (id: string) => intl.formatMessage({id});

  useEffect(() => {
    if (!currentCommunity) {
      return;
    }
    setCommunityInfoLoading(true);
    setImageUrl(currentCommunity.logo);
    setCurrentRadioValue(currentCommunity.visibility || Visibility.INTERNAL);
    setCommunityInfoLoading(false);
  }, [currentCommunity]);

  const [submitBtnLoading, setSubmitBtnLoading] = useState<boolean>(false);
  const handleCommunityInfoSubmit = async (value: CommunityInfo) => {
    setSubmitBtnLoading(true);
    const {name, visibility = Visibility.INTERNAL} = value;
    try {
      const res = await PutApiMyCommunitiesGuid( {
        name,
        logo: imageUrl,
        visibility,
      });
      if (res.code === 0) {
        messageInfo({
          type: 'success',
          content: i('cmtadmin.community.summary.submit.success'),
        });
        refreshCommunityModel();
        setSubmitBtnLoading(false);
      } else {
        messageInfo({
          type: 'error',
          content: 'res.msg',
        });
      }
    } catch (err) {
      messageInfo({
        type: 'error',
        content: i('cmtadmin.community.summary.submit.fail'),
      });
    }
  };

  const tipMap = {
    [Visibility.INTERNAL]: i('cmtadmin.community.summary.visibility.internal.text'),
    // [Visibility.PRIVATE]: i('cmtadmin.community.summary.visibility.private.text'),
    [Visibility.SECRET]: i('cmtadmin.community.summary.visibility.secret.text'),
  };
  return communityInfoLoading ? (
    <Spin />
  ) : (
    <div className={styles.sum}>
      <Form
        form={form}
        onFinish={handleCommunityInfoSubmit}
        initialValues={{
          name: currentCommunity.name,
          // domain: currentCommunity.domain,
          logo: currentCommunity.logo,
          visibility: currentCommunity?.visibility || Visibility.INTERNAL,
        }}
      >
        <div className={styles.sum_ava}>
          <span>{i('cmtadmin.community.summary.logo')}</span>
          {imageLoading ? (
            <Avatar size={100} icon={<Spin />} />
          ) : !imageUrl || imageUrl == '' ? (
            <Avatar size={100} icon={currentCommunity.name?.[0]} />
          ) : (
            <Avatar size={100} src={imageUrl} />
          )}
          <div className={styles.sum_ava_action}>
            <Button
              className={styles.sum_ava_action_btn}
              onClick={() => setImageModalVisible(true)}
            >
              {i('cmtadmin.community.summary.logo.upload')}
            </Button>
            <span>{i('cmtadmin.community.summary.logo.upload.width*height')}</span>
          </div>
          <Modal
            className={styles.modal}
            footer={null}
            open={imageModalVisible}
            onCancel={() => setImageModalVisible(false)}
            width={565}
            getContainer={false}
          >
            <ImgUploadModal
              setImageLoading={setImageLoading}
              uploadType={UploadType.COMMUNITY}
              imgAspect={1}
              setModalVisible={setImageModalVisible}
              outerImageUrl={imageUrl}
              setOuterImageUrl={setImageUrl}
              getRecommendImageUrl={GetApiCmtRecommendLogos}
            />
          </Modal>
        </div>
        <div className={styles.sum_name}>
          <span>{i('cmtadmin.community.summary.name')}</span>
          <Form.Item
            name="name"
            rules={[
              {
                message: i('cmtadmin.community.summary.name.validate'),
                required: true,
              },
            ]}
          >
            <Input className={styles.sum_name_input}/>
          </Form.Item>
        </div>
        <div className={styles.sum_edition}>
          <span>{i('cmtadmin.community.summary.editon')}</span>
          <span className={styles.sum_edition_action_text}>{currentCommunity.editionName}</span>
        </div>
        <div className={styles.sum_visible}>
          <span>{i('cmtadmin.community.summary.visibility')}</span>
          <Form.Item
            name="visibility"
            rules={[
              () => ({
                validator(_, value) {
                  if (value !== null) {
                    setCurrentRadioValue(value);
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(i('cmtadmin.community.summary.visibility.validate')),
                  );
                },
              }),
            ]}
          >
            <Radio.Group className={styles.sum_visible_radio}>
              <Radio.Button value={Visibility.INTERNAL}>
                {i('visiblitylevel.cmtInternal')}
              </Radio.Button>
              {/*<Radio.Button value={Visibility.PRIVATE}>*/}
              {/*  {i('visiblitylevel.cmtPrivate')}*/}
              {/*</Radio.Button>*/}
              <Radio.Button value={Visibility.SECRET}>
                {i('visiblitylevel.cmtSecret')}
              </Radio.Button>
            </Radio.Group>
          </Form.Item>
          <div className={styles.sum_visible_tip}>
            <i className={classNames('iconfont', 'icon-icontanhao', styles.sum_visible_tip_icon)}/>
            <span className={styles.sum_visible_tip_text}>{tipMap[currentRadioValue]}</span>
          </div>
        </div>
        <div className={styles.sum_action}>
          <Button
            type="primary"
            className={styles.sum_action_btn}
            htmlType="submit"
            loading={submitBtnLoading}
          >
            {i('save')}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default Summary;
