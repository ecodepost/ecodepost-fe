import {Form, InputNumber, Radio} from 'antd';
import styles from './Pay.less';
import {forwardRef, useEffect, useImperativeHandle, useState} from 'react';
import {PayType} from '@/enums/visibilitylevel';
import useRequestX from "@/hooks/useRequestX";
import {GetApiSpacesGuid, PutApiSpacesGuid} from "@/services/base/api.gen";
import {useModel} from "umi";

interface InnerProps {
  spaceInfoProps: Commonv1SpaceInfo;
}

export const Pay = forwardRef((props: InnerProps, ref) => {
  const {spaceInfoProps} = props;
  const [form] = Form.useForm(null);
  const {GetApiCmtSpaceAllReq} = useModel('community')

  const PutApiSpacesGuidRequest = useRequestX(PutApiSpacesGuid, {
    onSuccess: () => {
      GetApiCmtSpaceAllReq.run()
    },
    loadingText: {
      done: "提交成功",
    }
  });


  const onFinish = () => {
    form.validateFields().then((values) => {
      const postValues = {}
      // 遍历对象body，判断数据是否有更改
      // 如果有更改放入到请求body中
      Object.keys(values).forEach((key, index) => {
        if (!form.isFieldTouched(key)) {
          return
        }
        postValues[key] = values[key]
      })
      PutApiSpacesGuidRequest.run(spaceInfoProps.guid, postValues);
    });
  };
  const [initialValues, setInitialValues] = useState();

  useImperativeHandle(ref, () => ({
    save: onFinish,
  }));
  const chargeType = Form.useWatch('chargeType', form);

  const GetApiSpacesGuidRequest = useRequestX(GetApiSpacesGuid, {
    onSuccess: (res) => {
      setInitialValues(res.data);
    },
  });


  useEffect(() => {
    GetApiSpacesGuidRequest.run(spaceInfoProps.guid);
  }, [spaceInfoProps]);


  return (
    <div className={styles.container}>
      <div className={styles.title}>付费设置</div>
      {initialValues && <Form form={form} initialValues={initialValues}>
        <div className={styles.content_item}>
          <div className={styles.titleName}>付费类型</div>
          <Form.Item name="chargeType">
            <Radio.Group className={styles.cardPrivacySelectGroup} size="small">
              <Radio.Button className={styles.cardPrivacySelectGroupBtn} value={PayType.FREE}>
                免费
              </Radio.Button>
              <Radio.Button className={styles.cardPrivacySelectGroupBtn} value={PayType.NeedPay}>
                付费
              </Radio.Button>
            </Radio.Group>
          </Form.Item>
          {chargeType === PayType.NeedPay && (
            <>
              <span className={styles.titleName}>课程价格</span>
              <Form.Item name="price">
                <InputNumber style={{height: 48}} className={styles.footerInput}/>
              </Form.Item>
              {/*<div className={styles.checkedContent}>*/}
              {/*  <Form.Item name="isFreeToCommunity">*/}
              {/*    <Checkbox value={true} />*/}
              {/*    <span style={{ paddingLeft: '12px' }}>社区会员可免费学习</span>*/}
              {/*  </Form.Item>*/}
              {/*</div>*/}
            </>
          )}
        </div>
      </Form>}
    </div>
  );
});
