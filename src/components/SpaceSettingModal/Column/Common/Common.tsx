import EmojiInput from '@/components/Emoji/EmojiInput/EmojiInput';
import styles from './Common.less';
import { Button, Form, Input } from 'antd';
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { useModel } from '@umijs/max';
import {
  GetApiCmtSearchMembers,
  GetApiSpacesGuid,
  PutApiSpacesGuid,
} from '@/services/base/api.gen';
import useRequestX from '@/hooks/useRequestX';
import { OSSUpload } from '@/components/OssUpload/OssUpload';
import { UploadType } from '@/enums/spacetype';
import { messageInfo } from '@/components/Message/Message';
import DebounceSelect from '@/components/SuperModal/DebounceSelect';

interface InnerProps {
  spaceInfoProps: Commonv1SpaceInfo;
}

type SpaceInfoForm = Commonv1SpaceInfo;

export const Common = forwardRef((props: InnerProps, ref) => {
  const { spaceInfoProps } = props;
  const [form] = Form.useForm(null);
  const [imageUrl, setImageUrl] = useState<string>();
  const [coverUrl, setCoverUrl] = useState<string>();
  const [initialValues, setInitialValues] = useState<SpaceInfoForm>();
  const [spaceInfo, setSpaceInfo] = useState<Commonv1SpaceInfo>();
  const { GetApiCmtSpaceAllReq } = useModel('community');

  const GetApiSpacesGuidRequest = useRequestX(GetApiSpacesGuid, {
    onSuccess: (res) => {
      setSpaceInfo(res.data);
      setImageUrl(res.data?.headImage);
      setCoverUrl(res.data?.cover);
    },
  });
  // const [value, setValue] = useState<any[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<UserItem[]>([]);

  useEffect(() => {
    if (!spaceInfo) {
      return;
    }

    setInitialValues({
      ...spaceInfo,
    });
  }, [spaceInfo]);

  const PutApiSpacesGuidRequest = useRequestX(PutApiSpacesGuid, {
    onSuccess: () => {
      GetApiCmtSpaceAllReq.run();
    },
    loadingText: {
      done: '提交成功',
    },
  });

  const fetchUserList = async (search: string) => {
    try {
      const res = await GetApiCmtSearchMembers({
        currentPage: 0,
        pageSize: 0,
        sort: '',
        spaceGuid: '',
        keyword: search,
      });
      if (res.code === 0) {
        return res.data?.list;
      } else {
        messageInfo({
          content: res.msg,
          type: 'error',
        });
      }
    } catch (err) {
      messageInfo({
        content: '失败',
        type: 'error',
      });
    }
  };

  const onFinish = () => {
    form.validateFields().then((values) => {
      const postValues: SpaceInfoForm = {};
      // 遍历对象body，判断数据是否有更改
      // 如果有更改放入到请求body中
      Object.keys(values).forEach((key, index) => {
        if (!form.isFieldTouched(key)) {
          return;
        }
        postValues[key] = values[key];
      });
      PutApiSpacesGuidRequest.run(spaceInfoProps.guid, postValues);
    });
  };

  // todo 按需处理
  const onFieldsChange = (changedFields, allFields) => {};

  useEffect(() => {
    GetApiSpacesGuidRequest.run(spaceInfoProps.guid);
  }, [spaceInfoProps]);

  useImperativeHandle(ref, () => ({
    save: onFinish,
  }));

  console.log('selectedUsers', selectedUsers);

  return (
    <div className={styles.container}>
      {initialValues && (
        <Form form={form} initialValues={initialValues} onFieldsChange={onFieldsChange}>
          <div className={styles.header}>
            <div className={styles.title}>基本信息</div>
            <div className={styles.subtitle}>
              <span>ICON</span>
              <span className={styles.titleName}>名称</span>
            </div>
            <div className={styles.content_status}>
              <Form.Item>
                <EmojiInput warningInfo="请输入名称" />
              </Form.Item>
            </div>
            <div className={styles.card_content}>
              <div className={styles.card_content_item}>
                <div className={styles.cardPrivacySelect}>
                  <span className={styles.titleName}>课程介绍</span>
                  <Form.Item className={styles.introduce} name="desc">
                    <Input.TextArea
                      maxLength={50}
                      placeholder="简要介绍一下课程~"
                      style={{ height: 100, resize: 'none' }}
                      bordered={false}
                    />
                  </Form.Item>
                  <span className={styles.titleName}>授课老师</span>
                  <Form.Item name="authorUid" id="superadmin_modal">
                    <DebounceSelect
                      placeholder="增加作者"
                      className={styles.selectTeacher}
                      selectedUsers={selectedUsers}
                      setSelectedUsers={setSelectedUsers}
                      // value={value}
                      fetchOptions={fetchUserList}
                      // onChange={(newValue) => setValue(newValue)}
                      style={{ width: '100%' }}
                    />
                  </Form.Item>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.banner}>
            <div className={styles.title}>封面照片</div>
            {imageUrl == '' ? null : <img className={styles.bannerImg} src={coverUrl} alt="" />}
            <div className={styles.content}>
              <div className={styles.left}>
                <p className={styles.uploadPicture}>上传封面照片</p>
                <p>为空间上传一个16:19纵横比的缩略图。</p>
                <p>最小图像尺寸:800x450p</p>
              </div>
              <div className={styles.right}>
                <Form.Item name="cover">
                  <OSSUpload
                    onChange={(value) => {
                      setCoverUrl(value);
                    }}
                    uploadType={UploadType.COMMUNITY}
                  >
                    <div className={styles.uploader}>
                      <Button type="primary">上传照片</Button>
                    </div>
                  </OSSUpload>
                </Form.Item>
              </div>
            </div>
          </div>
        </Form>
      )}
    </div>
  );
});
