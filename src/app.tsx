import type { Settings as LayoutSettings } from '@ant-design/pro-components';
import type { RunTimeLayoutConfig } from '@umijs/max';
import defaultSettings from '../config/defaultSettings';
import { GetApiCmtDetail, GetApiOauthUser } from '@/services/base/api.gen';
/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
import { errorConfig } from '@/requestErrorConfig';
import { CmtInfo } from '@/models/community';
import { ConfigProvider } from 'antd';

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: MyUserInfo;
  currentCmt: CmtInfo;
  communityList?: Communityv1CommunityBaseInfo[];
  loading?: boolean;
  fetchUserInfo?: () => Promise<MyOauthUserInfoRes | undefined>;
  checkLogin: () => void;
  isOnline: () => boolean;
}> {
  const themeColorConfig = {
    default: {
      themeColorPrimary: '#05a48a',
      themeColorStatus: '#05a48a',
      themeColorButtonText: '#28354a',
      themeColorBackground: '#f7f9fb',
    },
  };

  const color = {
    primaryColor: '#1890ff',
    errorColor: '#ff4d4f',
    warningColor: '#faad14',
    successColor: '#52c41a',
    infoColor: '#1890ff',
  };

  // const [color, setColor] = useState({
  //   primaryColor: '#1890ff',
  //   errorColor: '#ff4d4f',
  //   warningColor: '#faad14',
  //   successColor: '#52c41a',
  //   infoColor: '#1890ff',
  // });

  const onColorChange = (nextColor: Partial<typeof color>) => {
    const mergedNextColor = {
      ...color,
      ...nextColor,
    };
    // setColor(mergedNextColor);
    ConfigProvider.config({
      theme: mergedNextColor,
    });
  };

  // 设置主题色
  // 可动态修改，eg:由后端返回接受，可由前端事件修改
  const changeStyle = (obj) => {
    for (const key in obj) {
      document.getElementsByTagName('body')[0].style.setProperty(`--${key}`, obj[key]);
    }
  };

  // 改变主题的方法
  const setTheme = (themeConfig) => {
    const colorConfig = themeColorConfig[themeConfig.themeName];
    if (colorConfig) {
      changeStyle(colorConfig); // 改变样式
      onColorChange({
        primaryColor: colorConfig['themeColorPrimary'],
        infoColor: colorConfig['themeColorPrimary'],
      });
    } else {
      if (themeConfig?.customColor) {
        changeStyle(themeConfig?.customColor); // 改变样式
        onColorChange({
          primaryColor: themeConfig?.customColor['themeColorPrimary'],
          infoColor: themeConfig?.customColor['themeColorPrimary'],
        });
      }
    }
  };

  const fetchUserInfo = async () => {
    try {
      const res = await GetApiOauthUser();
      return res?.data;
    } catch (error) {}
    return undefined;
  };

  const fetchCmtInfo = async () => {
    try {
      const res = await GetApiCmtDetail();
      if (res.code !== 0) {
        return {
          err: {
            code: res.code,
            msg: res.msg,
            data: res.data,
          },
        };
      }
      setTheme(res?.data?.cmtTheme);
      return res?.data;
    } catch (error) {
      return {
        err: {
          code: 1,
          msg: error,
          data: '系统错误',
        },
      };
    }
  };

  const [userInfo, currentCmt] = await Promise.all([fetchUserInfo(), fetchCmtInfo()]);

  // const currentUser = undefined
  const currentUser = userInfo?.user?.uid > 0 ? userInfo.user : undefined;
  const communityList = userInfo.cmtList;

  const checkLogin = () => {
    if (!currentUser || currentUser.uid === 0) {
      if (currentCmt.data?.cmtInfo?.isCustomDomain) {
        localStorage.setItem('loginReferer', window.location.pathname);
        window.location.href = `/login/jump`;
        return;
      }
      window.location.href = `/api/oauth/login?referer=` + window.location.pathname;
    }
  };

  const isOnline = () => {
    return !(!currentUser || currentUser.uid === 0);
  };
  return {
    communityList,
    currentCmt,
    fetchUserInfo,
    checkLogin,
    currentUser,
    settings: defaultSettings,
    isOnline,
  };
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({ initialState, setInitialState }) => {
  return {
    // rightContentRender: () => <RightContent />,
    disableContentMargin: true,
    pure: true,
    pageTitleRender: false,
    // waterMarkProps: {
    //   content: initialState?.currentUser?.name,
    // },
    // footerRender: () => <Footer />,
    onPageChange: () => {
      // const { location } = history;
      // 如果没有登录，重定向到 login
      // if (!initialState?.currentUser && location.pathname !== loginPath) {
      //   history.push(loginPath);
      // }
    },
    // links: isDev
    //   ? [
    //       <Link to="/umi/plugin/openapi" target="_blank">
    //         <LinkOutlined />
    //         <span>OpenAPI 文档</span>
    //       </Link>,
    //       <Link to="/~docs">
    //         <BookOutlined />
    //         <span>业务组件文档</span>
    //       </Link>,
    //     ]
    //   : [],
    // menuHeaderRender: undefined,
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    // 增加一个 loading 的状态
    childrenRender: (children, props) => {
      // if (initialState?.loading) return <PageLoading />;
      return (
        <div>
          {children}
          {/* {!props.location?.pathname?.includes('/login') && (
            <SettingDrawer
              enableDarkTheme
              settings={initialState?.settings}
              onSettingChange={(settings) => {
                setInitialState((preInitialState) => ({
                  ...preInitialState,
                  settings,
                }));
              }}
            />
          )} */}
        </div>
      );
    },
    ...initialState?.settings,
  };
};

/**
 * @name request 配置，可以配置错误处理
 * 它基于 axios 和 ahooks 的 useRequest 提供了一套统一的网络请求和错误处理方案。
 * @doc https://umijs.org/docs/max/request#配置
 */
export const request = {
  ...errorConfig,
};
