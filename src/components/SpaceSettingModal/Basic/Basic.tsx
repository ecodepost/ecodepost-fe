import EmojiInput from '@/components/Emoji/EmojiInput/EmojiInput';
import styles from './Common.less';
import { Button, Form, Input, Select, Switch } from 'antd';

import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { useIntl, useModel } from '@umijs/max';
import { GetApiSpacesGuid, PutApiSpacesGuid } from '@/services/base/api.gen';
import useRequestX from '@/hooks/useRequestX';
import { SpaceOptions } from '@/pages/typings';
import { OSSUpload } from '@/components/OssUpload/OssUpload';
import { SpaceType, UploadType } from '@/enums/spacetype';
import { CmnSort } from '@/enums/cmnsort';
import CheckedCardGroup from '@/components/Space/CreateSpace/CheckedCardGroup/CheckedCardGroup';

const { Option } = Select;
const { TextArea } = Input;

interface InnerProps {
  spaceInfoProps: Commonv1SpaceInfo;
}

type SpaceInfoForm = Commonv1SpaceInfo & {
  teachers?: string[];
  spaceOptions: any;
};

interface SwitchItemProps {
  items: SpaceOptions[];
}

const SwitchItem: React.FC<SwitchItemProps> = (props) => {
  const { items } = props;

  return (
    <>
      {items?.map((item) => (
        <div className={styles.content_switch_item} key={item.name}>
          <span className={styles.content_switch_text}>{item.name}</span>
          <Form.Item name={item.spaceOptionId} valuePropName="checked">
            <Switch />
          </Form.Item>
        </div>
      ))}
    </>
  );
};

export const Basic = forwardRef((props: InnerProps, ref) => {
  const { spaceInfoProps } = props;
  const intl = useIntl();
  const i = (id: string) => intl.formatMessage({ id });
  const { GetApiCmtSpaceAllReq } = useModel('community');

  // const [emojiIcon, setEmojiIcon] = useState<string>('');
  const [form] = Form.useForm(null);
  const [headImage, setHeadImage] = useState<string>();
  const [initialValues, setInitialValues] = useState<SpaceInfoForm>();
  // const [visibility, setVisibility] = useState<number>(Visibility.INTERNAL);
  // const visibilityTextMap = [
  //   '',
  //   i('visiblitylevel.public.content'),
  //   i('visiblitylevel.internal.content'),
  //   i('visiblitylevel.secret.content'),
  // ];

  const GetApiSpacesGuidRequest = useRequestX(GetApiSpacesGuid, {
    onSuccess: (res) => {
      let initData = {
        name: res.data?.name || '',
        icon: res.data?.icon || '',
        spaceType: res.data.spaceType,
        spaceLayout: res.data?.spaceLayout,
        isAllowReadMemberList: res.data?.isAllowReadMemberList || false,
        spaceOptions: res.data?.spaceOptions,
        link: res.data?.link || '',
      };
      res.data?.spaceOptions?.map((item: SpaceOptions) => {
        initData = { ...initData, [item.spaceOptionId]: item.value };
      });

      console.log('initData', initData);

      setInitialValues(initData);
      setHeadImage(res.data?.headImage);
    },
  });

  const PutApiSpacesGuidRequest = useRequestX(PutApiSpacesGuid, {
    onSuccess: () => {
      GetApiCmtSpaceAllReq.run();
    },
    loadingText: {
      done: '提交成功',
    },
  });

  const onFinish = async () => {
    // todo 很奇怪，为什么有的字段没有touched
    form.validateFields().then((values) => {
      // filter options， 只有在form表单里面的才需要传入到后端
      const filterOptions = initialValues?.spaceOptions?.filter((item) => {
        // 如果存在，那么就保留这个数据
        // 这里有个问题，就是switch的时候，会是false，所以不能这么判断，必须按undefined判断
        return values[item.spaceOptionId] != undefined;
      });

      const spaceOptions = filterOptions?.map((item: SpaceOptions) => {
        let value;
        /** switch */
        if (typeof values[item.spaceOptionId] === 'boolean') {
          value = Number(values[item.spaceOptionId]);
          /** select */
        } else if (typeof values[item.spaceOptionId] === 'number') {
          value = values[item.spaceOptionId];
          /** undefined */
        } else {
          value = 0;
        }
        return {
          spaceOptionId: item.spaceOptionId,
          value,
        };
      });

      const postValues: SpaceInfoForm = {};
      // 遍历对象body，判断数据是否有更改
      // 如果有更改放入到请求body中
      Object.keys(values).forEach((key, index) => {
        console.log('key', key);
        if (!form.isFieldTouched(key)) {
          return;
        }
        console.log('key222', key);

        postValues[key] = values[key];
      });
      postValues.spaceOptions = spaceOptions;
      PutApiSpacesGuidRequest.run(spaceInfoProps.guid, postValues);
    });
  };

  useEffect(() => {
    GetApiSpacesGuidRequest.run(spaceInfoProps.guid);
  }, [spaceInfoProps]);

  useImperativeHandle(ref, () => ({
    save: onFinish,
  }));

  return (
    <div className={styles.container}>
      {initialValues && (
        <Form form={form} initialValues={initialValues}>
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
            {initialValues.spaceType === SpaceType.LINK && (
              <div className={styles.content_name}>
                <span
                  style={{ marginBottom: 12, display: 'block' }}
                  className={styles.content_text}
                >
                  链接地址
                </span>
                <Form.Item
                  name="link"
                  style={{
                    width: 'calc(100% - 44px)',
                  }}
                >
                  <Input allowClear placeholder="输入链接名称" style={{ height: 48 }} />
                </Form.Item>
              </div>
            )}

            {(initialValues.spaceType === SpaceType.ARTICLE ||
              initialValues.spaceType === SpaceType.QUESTION) && (
              <div className={styles.content_name}>
                {initialValues?.spaceOptions
                  ?.filter((item: any) => item.spaceOptionType === 2)
                  ?.map((pmsItem: SpaceOptions) => (
                    <div key={pmsItem.name} style={{ display: 'flex', flexDirection: 'column' }}>
                      <span className={styles.content_text}>{pmsItem.name}</span>
                      <Form.Item
                        name={pmsItem.spaceOptionId}
                        rules={[
                          {
                            required: true,
                            message: `请选择${pmsItem.name}`,
                          },
                        ]}
                      >
                        <Select className={styles.content_select}>
                          <Option value={CmnSort.CREATE_TIME}>最新</Option>
                          <Option value={CmnSort.HOT_SCORE}>最热</Option>
                          <Option value={CmnSort.RECOMMEND_SCORE}>推荐</Option>
                        </Select>
                      </Form.Item>
                    </div>
                  ))}
              </div>
            )}

            <div className={styles.card_content}>
              <div className={styles.card_content_item}>
                <div className={styles.cardPrivacySelect}>
                  {initialValues.spaceType === SpaceType.ARTICLE && (
                    <div className={styles.content_name}>
                      <span className={styles.content_text}>
                        {i('cmtSidebar.space.update.tab.summary.layout')}
                      </span>
                      {initialValues.spaceType === SpaceType.ARTICLE && (
                        <CheckedCardGroup
                          items={[
                            i('spacelayout.feed'),
                            i('spacelayout.list'),
                            i('spacelayout.card'),
                          ]}
                        />
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          {initialValues.spaceType !== SpaceType.LINK && (
            <div className={styles.banner}>
              <div className={styles.title}>空间照片</div>
              {headImage == '' ? null : <img className={styles.bannerImg} src={headImage} alt="" />}
              <div className={styles.content}>
                <div className={styles.left}>
                  <p className={styles.uploadPicture}>上传空间照片</p>
                  <p>为空间上传一个16:9纵横比的缩略图。</p>
                  <p>最小图像尺寸:1200x260p</p>
                </div>
                <div className={styles.right}>
                  <Form.Item name="headImage">
                    <OSSUpload
                      onChange={(value) => {
                        setHeadImage(value);
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
          )}
        </Form>
      )}
    </div>
  );
});
