import { messageInfo } from '@/components/Message/Message';
import { getMyProfile, updateMyAvatar, updateMyNickname } from '@/services/user/api';
import { PutApiMyAttr } from '@/services/base/api.gen';
import { Avatar, Button, DatePicker, Form, Input, Select, Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import { useIntl, useModel } from 'umi';
import styles from './Profile.less';
import { OSSUpload } from '@/components/OssUpload/OssUpload';
import { UploadType } from '@/enums/spacetype';
import DefaultHeader from '@/components/Header/DefaultHeader/DefaultHeader';
import dayjs from 'dayjs';
import { WechatOutlined } from '@ant-design/icons';

const { Option } = Select;
const { TextArea } = Input;

interface UserInfo {
  avatar: string;
  nickname: string;
  uid: number;
  birthday: number;
}

const Profile = () => {
  const [profileLoading, setProfileLoading] = useState<boolean>(false);
  const [profile, setProfile] = useState<UserInfo>({} as UserInfo);
  const [imageUrl, setImageUrl] = useState<string>('');
  const [imageLoading, setImageLoading] = useState<boolean>(false);
  const [form] = Form.useForm();
  const { refresh } = useModel('@@initialState');
  const intl = useIntl();
  const i = (id: string) => intl.formatMessage({ id });

  const fetchUserInfo = async () => {
    try {
      setProfileLoading(true);
      const res = await getMyProfile();
      if (res.code === 0) {
        setProfile(res.data);
        setImageUrl(res.data.avatar);
        form.setFieldsValue({
          nickname: res.data.nickname,
          sex: res.data.sex,
          intro: res.data.intro,
          birthday: dayjs.unix(res.data.birthday),
        });
        setProfileLoading(false);
      } else {
        messageInfo({
          type: 'error',
          content: res.msg,
        });
      }
    } catch (err) {
      messageInfo({
        type: 'error',
        content: i('settings.profile.initFail'),
      });
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const handleUpdateAvatar = async (url: string) => {
    try {
      const res = await updateMyAvatar({ url });
      if (res.code === 0) {
        messageInfo({
          type: 'success',
          content: i('settings.profile.ava.change.success'),
        });
      } else {
        messageInfo({
          type: 'error',
          content: res.msg,
        });
      }
    } catch (err) {
      messageInfo({
        type: 'error',
        content: i('settings.profile.ava.change.fail'),
      });
    }
  };

  const handleUpdateNickname = async (nickname: string) => {
    try {
      const res = await updateMyNickname({ nickname });
      if (res.code === 0) {
        messageInfo({
          type: 'success',
          content: i('settings.profile.nickname.update.success'),
        });
      } else {
        messageInfo({
          type: 'error',
          content: res.msg,
        });
      }
    } catch (err) {
      messageInfo({
        type: 'error',
        content: i('settings.profile.nickname.update.fail'),
      });
    }
  };

  const [submitBtnLoading, setSubmitBtnLoading] = useState<boolean>(false);
  const handleSubmit = async (val: any) => {
    setSubmitBtnLoading(true);
    if (form.isFieldTouched('nickname')) {
      await handleUpdateNickname(val.nickname);
    } else {
      if (form.isFieldTouched('birthday')) {
        val.birthday = dayjs(val.birthday).unix();
      }

      await PutApiMyAttr(val);
    }
    // if (profile.avatar !== imageUrl) {
    //   await handleUpdateAvatar(imageUrl);
    // }
    await fetchUserInfo();
    await refresh();
    setSubmitBtnLoading(false);
  };

  return (
    <React.Fragment>
      <DefaultHeader />
      <div className={styles.profile}>
        {/*<div*/}
        {/*  className={styles.profile_wechat}*/}
        {/*  onClick={() => {*/}
        {/*    document.location.href = `/api/login/wechat-gocn?response_type=code&${*/}
        {/*      window.location.href.split('?')[1]*/}
        {/*    }`;*/}
        {/*  }}*/}
        {/*>*/}
        {/*  <WechatOutlined />*/}
        {/*  <span className={styles.githubText}>绑定GoCN微信</span>*/}
        {/*</div>*/}
        {profileLoading ? (
          <Spin />
        ) : (
          <Form form={form} onFinish={handleSubmit}>
            <div className={styles.profile_avatar}>
              <span className={styles.profile_avatar_title}>{i('settings.profile.ava')}</span>
              <div>
                {imageLoading ? (
                  <Avatar size={100} icon={<Spin />} />
                ) : (
                  <Avatar size={100} src={imageUrl} />
                )}
                <OSSUpload
                  setImageLoading={setImageLoading}
                  uploadType={UploadType.AVATAR}
                  onChange={(value) => {
                    setImageUrl(value);
                  }}
                >
                  <Button className={styles.profile_avatar_btn}>
                    {i('settings.profile.ava.change.default')}
                  </Button>
                </OSSUpload>
              </div>
            </div>
            <div className={styles.profile_nickname}>
              <span className={styles.profile_nickname_title}>
                {i('settings.profile.nickname')}
              </span>
              <span className={styles.profile_nickname_subtitle}>
                {i('settings.profile.nickname.tip')}
              </span>
              <Form.Item
                name="nickname"
                rules={[
                  {
                    required: true,
                    message: i('settings.profile.nickname.validate.fail'),
                  },
                ]}
              >
                <Input className={styles.profile_nickname_input} />
              </Form.Item>
            </div>
            <div className={styles.profile_gender}>
              <span className={styles.profile_gender_title}>{i('gender')}</span>
              <Form.Item name="sex">
                <Select className={styles.profile_gender_select} dropdownMatchSelectWidth>
                  <Option value={1}>{i('gender.male')}</Option>
                  <Option value={2}>{i('gender.female')}</Option>
                  <Option value={3}>{i('gender.etc')}</Option>
                </Select>
              </Form.Item>
            </div>
            <div className={styles.profile_birth}>
              <span className={styles.profile_birth_title}>{i('settings.profile.birthday')}</span>
              <Form.Item name="birthday">
                <DatePicker
                  className={styles.profile_birth_picker}
                  placeholder={i('settings.profile.birthday.placeholder')}
                  // defaultValue={dayjs.unix(profile.birthday) && null}
                />
              </Form.Item>
            </div>
            {/* <div className={styles.profile_tag}>
            <span className={styles.profile_tag_title}>{i('settings.profile.tag')}</span>
            <span className={styles.profile_tag_subtitle}>{i('settings.profile.tag.tip')}</span>
            <Input
              className={styles.profile_tag_input}
              placeholder={i('settings.profile.tag.placeholder')}
            />
          </div> */}
            <div className={styles.profile_intro}>
              <span className={styles.profile_tag_title}>{i('settings.profile.introduction')}</span>
              <Form.Item
                name="intro"
                rules={[
                  {
                    // required: true,
                    message: i('settings.profile.introduction.validate.fail'),
                  },
                ]}
              >
                <TextArea
                  showCount
                  autoSize={{ minRows: 4, maxRows: 4 }}
                  maxLength={50}
                  className={styles.profile_tag_input}
                  placeholder={i('settings.profile.introduction.placeholder')}
                />
              </Form.Item>
            </div>
            <div className={styles.profile_submit}>
              <Button
                type="primary"
                className={styles.profile_submit_btn}
                htmlType="submit"
                loading={submitBtnLoading}
              >
                {i('settings.profile.submit')}
              </Button>
            </div>
          </Form>
        )}
      </div>
    </React.Fragment>
  );
};

export default Profile;
