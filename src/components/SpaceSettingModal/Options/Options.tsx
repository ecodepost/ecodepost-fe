import React, {forwardRef, useEffect, useImperativeHandle, useState} from 'react';
import {Form, message, Radio, Space as SpaceCard, Switch} from 'antd';
import styles from './Options.less';
import {useIntl, useModel} from '@umijs/max';
import {SpaceOptions} from '@/pages/typings';
import {GetApiSpacesGuid, PutApiSpacesGuid} from '@/services/base/api.gen';
import useRequestX from '@/hooks/useRequestX';
import {SpaceType} from '@/enums/spacetype';
import {Visibility} from '@/enums/visibilitylevel';
import {InfoCircleOutlined} from '@ant-design/icons';
import {SpaceAccess} from "@/enums/common";

interface InnerProps {
  spaceInfoProps: Commonv1SpaceInfo;
}

interface SwitchItemProps {
  items: SpaceOptions[];
}

type SpaceInfoForm = Commonv1SpaceInfo & {
  teachers?: string[];
  spaceOptions: any;
};

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

export const Options = forwardRef((props: InnerProps, ref) => {
  const {spaceInfoProps} = props;
  const [initialValues, setInitialValues] = useState<SpaceInfoForm>();
  const [form] = Form.useForm(null);
  const intl = useIntl();
  const i = (id: string) => intl.formatMessage({id});
  const visibilityValue = Form.useWatch('visibility', form);
  // const [visibilityData, setVisibilityData] = useState<number>(Visibility.INTERNAL);
  const visibilityTextMap = [
    '',
    '任何用户都可以在左侧空间树中看到该空间，并可以搜索到该空间',
    '仅有加入该空间的用户，可以在左侧空间树中看到这个空间，并可以搜索到该空间',
    // i('visiblitylevel.internal.content'),
    // i('visiblitylevel.secret.content'),
  ];
  const {GetApiCmtSpaceAllReq} = useModel('community')

  const PutApiSpacesGuidRequest = useRequestX(PutApiSpacesGuid, {
    onSuccess: () => {
      GetApiCmtSpaceAllReq.run()
    },
    loadingText: {
      done: '提交成功',
    },
  });

  const GetApiSpacesGuidRequest = useRequestX(GetApiSpacesGuid, {
    onSuccess: (res) => {
      let initData = {
        access: res.data.access,
        visibility: res.data.visibility,
        isAllowReadMemberList: res.data?.isAllowReadMemberList || false,
        spaceOptions: res.data?.spaceOptions,
      };
      res.data?.spaceOptions?.map((item: SpaceOptions) => {
        initData = {...initData, [item.spaceOptionId]: item.value};
      });
      setInitialValues(initData);
    },
  });

  useImperativeHandle(ref, () => ({
    save: onFinish,
  }));

  useEffect(() => {
    GetApiSpacesGuidRequest.run(spaceInfoProps.guid);
  }, [spaceInfoProps]);

  const onFinish = () => {
    // todo 很奇怪，为什么有的字段没有touched
    form.validateFields().then((values) => {
      // filter options， 只有在form表单里面的才需要传入到后端
      const filterOptions = initialValues?.spaceOptions?.filter(item => {
        // 如果存在，那么就保留这个数据
        // 这里有个问题，就是switch的时候，会是false，所以不能这么判断，必须按undefined判断
        return values[item.spaceOptionId] != undefined
      })

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
        if (!form.isFieldTouched(key)) {
          return;
        }
        postValues[key] = values[key];
      });
      postValues.spaceOptions = spaceOptions;
      PutApiSpacesGuidRequest.run(spaceInfoProps.guid, postValues);
    });
  };

  return (
    <div className={styles.container}>
      {initialValues && (
        <div className={styles.body}>
          <div className={styles.title}>权限设置</div>
          {initialValues.visibility !== Visibility.DRAFT ? (<Form form={form} initialValues={initialValues}>
            {initialValues && (
              <div className={styles.content_name}>
                <span className={styles.content_text}>
                  展示方式
                </span>
                <Form.Item name="visibility"
                           extra={
                             <span className={styles.content_tip}>
                        <InfoCircleOutlined className={styles.content_icon}/>
                               &nbsp;{visibilityTextMap[visibilityValue - 1]}
                      </span>
                           }
                >
                  <Radio.Group
                    className={styles.cardPrivacySelectGroup}
                    size="small"
                    onChange={(e) => {
                      // 各种组合都可以
                      if (e.target.value === Visibility.INTERNAL) {

                      }
                      // secret，只允许邀请加入
                      if (e.target.value === Visibility.SECRET) {
                        form.setFieldsValue({
                          access: SpaceAccess.DENY_ALL,
                        })
                      }
                    }}
                  >
                    <Radio.Button
                      className={styles.cardPrivacySelectGroupBtn}
                      value={Visibility.INTERNAL}
                    >
                      显示
                    </Radio.Button>
                    <Radio.Button
                      className={styles.cardPrivacySelectGroupBtn}
                      value={Visibility.SECRET}
                    >
                      隐藏
                    </Radio.Button>
                  </Radio.Group>
                </Form.Item>
              </div>
            )}
            <div className={styles.content_name}>
              <span className={styles.content_text}>
                加入方式
              </span>
              <Form.Item name="access">
                <Radio.Group
                  onChange={(e) => {
                    // 各种组合都可以
                    if (visibilityValue === Visibility.SECRET && (e.target.value === SpaceAccess.OPEN || e.target.value === SpaceAccess.USER_APPLY)) {
                      form.setFieldsValue({
                        access: SpaceAccess.DENY_ALL,
                      })
                      message.error("隐藏空间，只允许管理员手动添加成员")
                      return
                    }
                  }}
                >
                  <SpaceCard direction="vertical">
                    <Radio value={SpaceAccess.OPEN}>允许任何人加入（也可管理员手动添加）</Radio>
                    <Radio value={SpaceAccess.DENY_ALL}>不允许任何人加入（外部用户禁止进入空间，仅能管理员手动添加）</Radio>
                    <Radio value={SpaceAccess.USER_APPLY}>需要身份验证加入（外部用户需要主动申请，管理员审批，也可管理员手动添加）</Radio>
                    <Radio value={SpaceAccess.USER_PAY}
                           disabled={true}>付费加入（在付费设置开启付费后，默认选择该加入方式；外部用户需要付费后，自动加入空间，也可管理员手动添加）</Radio>
                  </SpaceCard>
                </Radio.Group>
              </Form.Item>
            </div>
            <div className={styles.content_name}>
              <span className={styles.content_text}>
                其他可选项
              </span>
              <div className={styles.content_switch}>
                <SwitchItem
                  items={initialValues?.spaceOptions?.filter(
                    (item: any) => item?.spaceOptionType === 1,
                  )}
                />
              </div>
            </div>
          </Form>) : (<span>课程发布后，可设置权限</span>)}
        </div>
      )}
    </div>
  );
});
