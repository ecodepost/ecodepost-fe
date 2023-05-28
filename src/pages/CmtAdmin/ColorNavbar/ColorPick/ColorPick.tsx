import { GetApiCmtAdminTheme, PutApiCmtAdminTheme } from '@/services/base/api.gen';
import { SketchPicker } from 'react-color';
import useRequestX from '@/hooks/useRequestX';
import { useEffect, useState } from 'react';
import { Button, ConfigProvider, Form, Input, Select } from 'antd';
import styles from './ColorPick.less';
import { useModel } from 'umi';
type themeConfigColor = {
  preThemeColorButtonText: string; //
  preThemeColorBackground: string; //
  preThemeColorPrimary: string; //
  preThemeColorStatus: string; //
};
const OPTIONS = ['Sweet', 'Stone', 'Sand'];
const ColorPick = () => {
  const { refresh } = useModel('@@initialState');
  const [isShow, setIsShow] = useState<boolean>(false);
  const [isShowA, setIsShowA] = useState<boolean>(false);
  const [isShowB, setIsShowB] = useState<boolean>(false);
  const [isShowC, setIsShowC] = useState<boolean>(false);
  const [isShowD, setIsShowD] = useState<boolean>(false);
  const { Option } = Select;
  const [showFold, setShowFold] = useState<boolean>(true);
  const [color, setColor] = useState<themeConfigColor>({
    preThemeColorButtonText: '', //
    preThemeColorBackground: '', //
    preThemeColorPrimary: '', //
    preThemeColorStatus: '', //
  });
  const [themeCustomColor, setThemeCustomColor] = useState<ThemeCustomColor>();
  const onColorChange = (nextColor: Partial<typeof color>) => {
    const mergedNextColor = {
      ...color,
      ...nextColor,
    };
    setColor(mergedNextColor);
    ConfigProvider.config({
      theme: mergedNextColor,
    });
  };
  useEffect(() => {
    GetApiCmtAdminThemeFun();
    // PutApiCmtAdminThemeFun();
  }, []);

  const changeStyle = (obj) => {
    for (const key in obj) {
      document.getElementsByTagName('body')[0].style.setProperty(`--${key}`, obj[key]);
    }
  };

  const GetApiCmtAdminThemeFun = async () => {
    const res = await GetApiCmtAdminTheme();
    if (res.code === 0) {
      setThemeCustomColor(res.data.customColor);
      setColor({
        preThemeColorButtonText: res.data.customColor.themeColorButtonText, //
        preThemeColorBackground: res.data.customColor.themeColorBackground, //
        preThemeColorPrimary: res.data.customColor.themeColorPrimary, //
        preThemeColorStatus: res.data.customColor.themeColorStatus, //
      });
      changeStyle({
        preThemeColorButtonText: res.data.customColor.themeColorButtonText, //
        preThemeColorBackground: res.data.customColor.themeColorBackground, //
        preThemeColorPrimary: res.data.customColor.themeColorPrimary, //
        preThemeColorStatus: res.data.customColor.themeColorStatus, //
      });
    }
  };

  const PutApiCmtAdminThemeRequest = useRequestX(PutApiCmtAdminTheme, {
    loadingText: {
      loading: '正在加载',
      done: '设置颜色成功',
    },
  });

  const [form] = Form.useForm();
  const onFinish = (values: any) => {
    console.log('themeColorPrimarythemeColorPrimary', values);
    PutApiCmtAdminThemeRequest.run({
      isCustom: true,
      themeName: 'custom',
      customColor: values,
      defaultAppearance: 'light',
    });
    refresh();
  };
  return (
    <div className={styles.domain_set}>
      {themeCustomColor && (
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 8 }}
          layout="horizontal"
          onFinish={onFinish}
          initialValues={themeCustomColor}
          form={form}
        >
          <div className={styles.wrap}>
            <span className={styles.Color}>品牌色</span>
            <Form.Item name="themeColorPrimary">
              <Input
                className={styles.content}
                value={color.preThemeColorPrimary}
                prefix={
                  <Button
                    className={styles.pri_button}
                    onClick={() => {
                      setIsShow(!isShow);
                    }}
                    style={{ backgroundColor: color.preThemeColorPrimary }}
                  >
                    {' '}
                  </Button>
                }
                size="large"
              />
              <div>
                {isShow ? (
                  <div>
                    <div className={styles.picker_wrap} onClick={() => setIsShow(false)}></div>
                    <SketchPicker
                      className={styles.sketchPicker}
                      presetColors={['#1890ff', '#25b864', '#ff6f00']}
                      color={color.preThemeColorPrimary}
                      onChange={({ hex }) => {
                        form.setFieldsValue({ themeColorPrimary: hex });
                        onColorChange({
                          preThemeColorPrimary: hex,
                        });
                        changeStyle({
                          preThemeColorPrimary: hex,
                        });
                      }}
                    />
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </Form.Item>
          </div>

          <div className={styles.wrap}>
            <span className={styles.Color}>配色主题</span>
            <Form.Item name="selectColor">
              <Select defaultValue="defalut" className={styles.content}>
                {OPTIONS.map((item) => (
                  <Option key={item} value={item}>
                    {item}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </div>
          <div>
            <span className={styles.Color}>自定义配色</span>
          </div>
          <div className={styles.wrapScroll}>
            {!showFold ? (
              <span
                className={styles.colorTitle}
                onClick={() => {
                  setShowFold(true);
                }}
              >
                自定义每个模块的颜色
              </span>
            ) : (
              <>
                <div className={styles.wrap}>
                  <span className={styles.Color}>品牌色</span>
                  <div className={styles.inputWrap}>
                    <Form.Item name="themeColorPrimary">
                      <Input
                        className={styles.content}
                        value={color.preThemeColorPrimary}
                        prefix={
                          <Button
                            className={styles.pri_button}
                            onClick={() => {
                              setIsShowA(!isShowA);
                            }}
                            style={{ backgroundColor: color.preThemeColorPrimary }}
                          >
                            {' '}
                          </Button>
                        }
                        size="large"
                      />
                      <div>
                        {isShowA ? (
                          <div>
                            <div className={styles.picker_wrap} onClick={() => setIsShowA(false)}>
                              {' '}
                            </div>
                            <SketchPicker
                              className={styles.sketchPicker}
                              presetColors={['#1890ff', '#25b864', '#ff6f00']}
                              color={color.preThemeColorPrimary}
                              onChange={({ hex }) => {
                                form.setFieldsValue({ themeColorPrimary: hex });
                                onColorChange({
                                  preThemeColorPrimary: hex,
                                });
                                changeStyle({
                                  preThemeColorPrimary: hex,
                                });
                              }}
                            />
                          </div>
                        ) : (
                          <></>
                        )}
                      </div>
                    </Form.Item>
                  </div>
                </div>
                <div className={styles.wrap}>
                  <span className={styles.Color}>文本颜色</span>
                  <Form.Item name="themeColorButtonText">
                    <Input
                      className={styles.content}
                      value={color.preThemeColorButtonText}
                      prefix={
                        <Button
                          className={styles.pri_button}
                          onClick={() => setIsShowB(!isShowB)}
                          style={{ backgroundColor: color.preThemeColorButtonText }}
                        >
                          {' '}
                        </Button>
                      }
                      size="large"
                    />
                    <div>
                      {isShowB ? (
                        <div>
                          <div className={styles.picker_wrap} onClick={() => setIsShowB(false)}>
                            {' '}
                          </div>
                          <SketchPicker
                            className={styles.sketchPicker}
                            presetColors={['#1890ff', '#25b864', '#ff6f00']}
                            color={color.preThemeColorButtonText}
                            onChange={({ hex }) => {
                              form.setFieldsValue({ themeColorButtonText: hex });
                              onColorChange({
                                preThemeColorButtonText: hex,
                              });
                              changeStyle({
                                preThemeColorButtonText: hex,
                              });
                            }}
                          />
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>
                  </Form.Item>
                </div>
                <div className={styles.wrap}>
                  <span className={styles.Color}>选中项</span>
                  <Form.Item name="themeColorStatus">
                    <Input
                      className={styles.content}
                      value={color.preThemeColorStatus}
                      prefix={
                        <Button
                          className={styles.pri_button}
                          onClick={() => setIsShowC(!isShowC)}
                          style={{ backgroundColor: color.preThemeColorStatus }}
                        >
                          {' '}
                        </Button>
                      }
                      size="large"
                    />
                    <div>
                      {isShowC ? (
                        <div>
                          <div className={styles.picker_wrap} onClick={() => setIsShowC(false)}>
                            {' '}
                          </div>
                          <SketchPicker
                            className={styles.sketchPicker}
                            presetColors={['#1890ff', '#25b864', '#ff6f00']}
                            color={color.preThemeColorStatus}
                            onChange={({ hex }) => {
                              form.setFieldsValue({ themeColorStatus: hex });
                              onColorChange({
                                preThemeColorStatus: hex,
                              });
                              changeStyle({
                                preThemeColorStatus: hex,
                              });
                            }}
                          />
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>
                  </Form.Item>
                </div>
                <div className={styles.wrap}>
                  <span className={styles.Color}>背景颜色</span>
                  <Form.Item name="themeColorBackground">
                    <Input
                      className={styles.content}
                      value={color.preThemeColorBackground}
                      prefix={
                        <Button
                          className={styles.pri_button}
                          onClick={() => setIsShowD(!isShowD)}
                          style={{ backgroundColor: color.preThemeColorBackground }}
                        >
                          {' '}
                        </Button>
                      }
                      size="large"
                    />
                    <div>
                      {isShowD ? (
                        <div>
                          <div className={styles.picker_wrap} onClick={() => setIsShowD(false)}>
                            {' '}
                          </div>
                          <SketchPicker
                            className={styles.sketchPicker}
                            presetColors={['#1890ff', '#25b864', '#ff6f00']}
                            color={color.preThemeColorBackground}
                            onChange={({ hex }) => {
                              form.setFieldsValue({ themeColorBackground: hex }),
                                onColorChange({
                                  preThemeColorBackground: hex,
                                });
                              changeStyle({
                                preThemeColorBackground: hex,
                              });
                            }}
                          />
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>
                  </Form.Item>
                </div>
              </>
            )}
            <div className={styles.bottom_bar}>
              <Form.Item>
                <Button type="primary" className={styles.bottom_button} htmlType="submit">
                  保存
                </Button>
              </Form.Item>
            </div>
          </div>
        </Form>
      )}
    </div>
  );
};
export default ColorPick;
