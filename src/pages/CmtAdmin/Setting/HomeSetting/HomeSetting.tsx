import {Button, Col, Form, Input, Row, Select, Switch} from 'antd';
import styles from './HomeSetting.less';
import {useRequest} from 'ahooks';
import {useEffect, useState} from 'react';
import PanelChangeBanner from './PanelChangeBanner';
import {useIntl} from 'umi';
import {CmnSort} from '@/enums/cmnsort';
import {messageInfo} from '@/components/Message/Message';
import {GetApiCmtAdminHome, PutApiCmtAdminHome} from '@/services/base/api.gen';

const HomeSetting = () => {
  const intl = useIntl();
  const i = (id: string) => intl.formatMessage({id});
  const [cmtAdminHomeParams, setCmtAdminHomeParams] = useState<HomeGetRes>();

  const homeSettingRequest = useRequest(PutApiCmtAdminHome, {
    manual: true,
    onSuccess({code, data, msg}) {
      if (code !== 0) {
        messageInfo({
          type: 'error',
          content: `失败. ${msg}`,
        });
        return;
      }
      messageInfo({
        type: 'success',
        content: `${msg}`,
      });
    },
    onError(err) {
      messageInfo({
        type: 'error',
        content: `失败. ${err}`,
      });
    },
  });

  const [form] = Form.useForm();

  const [changeBannerVisible, setChangeBannerVisible] = useState<boolean>(false);
  const [setBanner, setSetBanner] = useState<boolean>(false);
  const [setHome, setSetHome] = useState<boolean>(false);

  const handleHomeSetting = async (values: any) => {
    let objectToTake = {
      isSetHome: form.getFieldValue('isSetHome'),
      isSetBanner: form.getFieldValue('isSetBanner'),
      articleSortByLogin: form.getFieldValue('articleSortByLogin'),
      articleSortByNotLogin: form.getFieldValue('articleSortByNotLogin'),
      articleHotShowSum: Number.parseInt(form.getFieldValue('articleHotShowSum')),
      articleHotShowWithLatest: Number.parseInt(form.getFieldValue('articleHotShowWithLatest')),
      activityLatestShowSum: Number.parseInt(form.getFieldValue('activityLatestShowSum')),
      bannerImg: fieldBannerImg,
      bannerTitle: form.getFieldValue('bannerTitle'),
      bannerLink: form.getFieldValue('bannerLink'),
      defaultPageByNewUser: form.getFieldValue('defaultPageByNewUser'),
      defaultPageByNotLogin: form.getFieldValue('defaultPageByNotLogin'),
      defaultPageByLogin: form.getFieldValue('defaultPageByLogin'),
    };
    homeSettingRequest.run(objectToTake);
  };

  const onChangeSetBanner = (checked: boolean) => {
    setSetBanner(checked);
  };

  const onChangeSetHome = (checked: boolean) => {
    setSetHome(checked);
  };

  const [fieldBannerImg, setFieldBannerImg] = useState<string>(undefined);

  const fetchCmtAdminHomeData = async () => {
    try {
      const res = await GetApiCmtAdminHome();
      if (res.code === 0) {
        setCmtAdminHomeParams(res.data);
      } else {
        messageInfo({
          type: 'error',
          content: `失败. ${res.msg}`,
        });
      }
    } catch (err) {
      messageInfo({
        type: 'error',
        content: `获取社区首页设置失败`,
      });
    }
  };

  useEffect(() => {
    fetchCmtAdminHomeData().then((r) => {});
  }, []);

  useEffect(() => {
    if (cmtAdminHomeParams) {
      form.setFieldsValue(cmtAdminHomeParams);
      setFieldBannerImg(cmtAdminHomeParams.bannerImg);
      setSetBanner(cmtAdminHomeParams.isSetBanner);
      setSetHome(cmtAdminHomeParams.isSetHome);
    }
  }, [cmtAdminHomeParams]);

  //add validator for integer only later 2022/9/21 by lilei
  return (
    <div className={styles.container}>
      <div className={styles.container_title}>推荐内容设置</div>
      {cmtAdminHomeParams && (
        <Form
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 10 }}
          layout="horizontal"
          onFinish={handleHomeSetting}
          form={form}
        >
          <div className={styles.setting_container}>
            <div className={styles.container_subtitle}>启用首页</div>
            <Row justify="space-between" align="top" gutter={20}>
              <Col span={22}>
                <div className={styles.set_desc}>
                  启用后，用户访问社区时可以将看「首页」tab。首页会展示用户有阅读权限的社区内容，并可以根据用户角色进行个性化推荐。
                </div>
              </Col>
              <Col span={2}>
                <Form.Item name="isSetHome" valuePropName="checked">
                  <Switch onChange={onChangeSetHome} />
                </Form.Item>
              </Col>
            </Row>
            <div
              className={styles.setting_detail_container}
              style={{
                maxHeight: setHome ? '100vh' : '0vh',
              }}
            >
              <div className={styles.home_set}>
                <div className={styles.home_set_subtitle}>推荐内容排序规则</div>
                <Form.Item name="articleSortByLogin" label="登录用户">
                  <Select className={styles.content_group_select}>
                    <Select.Option value={CmnSort.CREATE_TIME}>最新</Select.Option>
                    <Select.Option value={CmnSort.HOT_SCORE}>最热</Select.Option>
                    <Select.Option value={CmnSort.RECOMMEND_SCORE}>点赞最多</Select.Option>
                  </Select>
                </Form.Item>
                <Form.Item name="articleSortByNotLogin" label="未登录用户">
                  <Select className={styles.content_group_select}>
                    <Select.Option value={CmnSort.CREATE_TIME}>最新</Select.Option>
                    <Select.Option value={CmnSort.HOT_SCORE}>最热</Select.Option>
                    <Select.Option value={CmnSort.RECOMMEND_SCORE}>点赞最多</Select.Option>
                  </Select>
                </Form.Item>
                <div className={styles.home_set_subtitle}>近期热门版块</div>
                <Form.Item name="articleHotShowSum" label="展示最多热门帖子数量">
                  <Input type="number" className={styles.content_input} />
                </Form.Item>
                <Form.Item name="articleHotShowWithLatest" label="展示帖子的时间规则">
                  <Input type="number" className={styles.content_input} />
                </Form.Item>
                <div className={styles.home_set_subtitle}>社区活动版块</div>
                <Form.Item name="activityLatestShowSum" label="近期活动数量">
                  <Input type="number" className={styles.content_input} />
                </Form.Item>
              </div>
            </div>
          </div>
          <div className={styles.setting_container}>
            <div className={styles.container_subtitle}>设置首页封面</div>
            <Row justify="space-between" align="top" gutter={20}>
              <Col span={22}>
                <div className={styles.set_desc}>
                  启用后，能够更好营造社区的主题氛围，提升社区装饰效果
                </div>
              </Col>
              <Col span={2}>
                <Form.Item name="isSetBanner" valuePropName="checked">
                  <Switch onChange={onChangeSetBanner}/>
                </Form.Item>
              </Col>
            </Row>
            <div
              className={styles.setting_detail_container}
              style={{
                maxHeight: setBanner ? '100vh' : '0vh',
              }}
            >
              <div className={styles.home_set}>
                <Form.Item name="bannerImg" label="banner图">
                  {fieldBannerImg ? (
                    <div className={styles.bannerImgBox}>
                      <img
                        style={{
                          width: '200px',
                          marginBottom: '20px',
                        }}
                        src={fieldBannerImg}
                        alt={i('cmtWelcome.bannerModal.img.alt')}
                      />
                    </div>
                  ) : (
                    ''
                  )}
                  <Button
                    type="primary"
                    className={styles.upload_button}
                    onClick={() => {
                      setChangeBannerVisible(true);
                    }}
                  >
                    点击修改
                  </Button>
                </Form.Item>

                <Form.Item name="bannerTitle" label="文案描述">
                  <Input className={styles.content_input} />
                </Form.Item>
                <Form.Item name="bannerLink" label="banner文案">
                  <Input placeholder="https:// 输入框，非必填" className={styles.content_input} />
                </Form.Item>
              </div>
            </div>
          </div>
          <div className={styles.setting_container}>
            <div className={styles.container_subtitle}>默认页面设置</div>
            <div className={styles.home_set}>
              <Form.Item name="defaultPageByNewUser" label="新注册用户首次访问">
                <Select className={styles.content_group_select}>
                  {cmtAdminHomeParams.pageOptions.map((value) => (
                    <Select.Option key={value.value} value={value.value}>
                      {value.title}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item name="defaultPageByLogin" label="其他用户">
                <Select className={styles.content_group_select}>
                  {cmtAdminHomeParams.pageOptions.map((value) => (
                    <Select.Option key={value.value} value={value.value}>
                      {value.title}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item name="defaultPageByNotLogin" label="未登录用户">
                <Select className={styles.content_group_select}>
                  {cmtAdminHomeParams.pageOptions.map((value) => (
                    <Select.Option key={value.value} value={value.value}>
                      {value.title}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
          </div>
          <div className={styles.bottom_bar}>
            <Form.Item>
              <Button type="primary" className={styles.bottom_button} htmlType="submit">
                保存
              </Button>
            </Form.Item>
          </div>
        </Form>
      )}
      <PanelChangeBanner
        onCancel={() => {
          setChangeBannerVisible(false);
        }}
        fieldBannerImg={fieldBannerImg}
        setFieldBannerImg={setFieldBannerImg}
        setChangeBannerVisible={setChangeBannerVisible}
        visible={changeBannerVisible}
      />
    </div>
  );
};
export default HomeSetting;
