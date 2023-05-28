// https://umijs.org/config/
import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
import routes from './routes';

const { REACT_APP_ENV } = process.env;
console.log('REACT_APP_ENV', REACT_APP_ENV);

export default defineConfig({
  /**
   * @name 开启 hash 模式
   * @description 让 build 之后的产物包含 hash 后缀。通常用于增量发布和避免浏览器加载缓存。
   * @doc https://umijs.org/docs/api/config#hash
   */
  hash: true,
  /**
   * @name 路由的配置，不在路由中引入的文件不会编译
   * @description 只支持 path，component，routes，redirect，wrappers，title 的配置
   * @doc https://umijs.org/docs/guides/routes
   */
  // umi routes: https://umijs.org/docs/routing
  routes,
  /**
   * @name 主题的配置
   * @description 虽然叫主题，但是其实只是 less 的变量设置
   * @doc antd的主题设置 https://ant.design/docs/react/customize-theme-cn
   * @doc umi 的theme 配置 https://umijs.org/docs/api/config#theme
   */
  theme: {
    // 如果不想要 configProvide 动态设置主题需要把这个设置为 default
    // 只有设置为 variable， 才能使用 configProvide 动态设置主色调
    'root-entry-name': 'variable',
  },
  /**
   * @name moment 的国际化配置
   * @description 如果对国际化没有要求，打开之后能减少js的包大小
   * @doc https://umijs.org/docs/api/config#ignoremomentlocale
   */
  ignoreMomentLocale: true,
  /**
   * @name 代理配置
   * @description 可以让你的本地服务器代理到你的服务器上，这样你就可以访问服务器的数据了
   * @see 要注意以下 代理只能在本地开发时使用，build 之后就无法使用了。
   * @doc 代理介绍 https://umijs.org/docs/guides/proxy
   * @doc 代理配置 https://umijs.org/docs/api/config#proxy
   */
  proxy: proxy[REACT_APP_ENV || 'dev'],
  /**
   * @name 快速热更新配置
   * @description 一个不错的热更新组件，更新时可以保留 state
   */
  fastRefresh: true,
  /**
   * @name 数据流插件
   * @@doc https://umijs.org/docs/max/data-flow
   */
  model: {},
  /**
   * 一个全局的初始数据流，可以用它在插件之间共享数据
   * @description 可以用来存放一些全局的数据，比如用户信息，或者一些全局的状态，全局初始状态在整个 Umi 项目的最开始创建。
   * @doc https://umijs.org/docs/max/data-flow#%E5%85%A8%E5%B1%80%E5%88%9D%E5%A7%8B%E7%8A%B6%E6%80%81
   */
  initialState: {},
  /**
   * @name layout 插件
   * @doc https://umijs.org/docs/max/layout-menu
   */
  layout: {
    locale: true,
    ...defaultSettings,
  },
  /**
   * @name 国际化插件
   * @doc https://umijs.org/docs/max/i18n
   */
  locale: {
    // default zh-CN
    default: 'zh-CN',
    antd: true,
    // default true, when it is true, will use `navigator.language` overwrite default
    baseNavigator: true,
  },
  /**
   * @name antd 插件
   * @description 内置了 babel import 插件
   * @doc https://umijs.org/docs/max/antd#antd
   */
  antd: {},
  /**
   * @name 网络请求配置
   * @description 它基于 axios 和 ahooks 的 useRequest 提供了一套统一的网络请求和错误处理方案。
   * @doc https://umijs.org/docs/max/request
   */
  request: {},
  /**
   * @name 权限插件
   * @description 基于 initialState 的权限插件，必须先打开 initialState
   * @doc https://umijs.org/docs/max/access
   */
  //================ pro 插件配置 =================
  presets: ['umi-presets-pro'],
  mfsu: {
    exclude: ['@playwright/test'],
  },
  // access: {},
  // inspectorConfig: {
  //   // loader options type and docs see below
  //   exclude: [],
  //   babelPlugins: [],
  //   babelOptions: {},
  // },
  // dva: {
  //   hmr: true,
  // },
  // layout: {
  //   // https://umijs.org/zh-CN/plugins/plugin-layout
  //   locale: true,
  //   siderWidth: 208,
  //   ...defaultSettings,
  // },
  // dynamicImport: {
  //   loading: '@ant-design/pro-layout/es/PageLoading',
  // },

  // esbuild is father build tools
  // https://umijs.org/plugins/plugin-esbuild
  // esbuild: {},
  // title: false,
  manifest: {
    basePath: '/',
  },
  publicPath: process.env.PUBLIC_PATH || '/',
  // chainWebpack(config) {
  //   config.plugin('MiniCssExtractPlugin').use(MiniCssExtractPlugin);

  //   config.module
  //     .rule('less')
  //     .test(/\.(le|c)ss$/)
  //     .use('mini-css-extract-plugin')
  //     .loader(MiniCssExtractPlugin.loader)
  //     .end()
  //     .use('css-loader')
  //     .loader('css-loader')
  //     .end()
  //     .use('less-loader')
  //     .loader('less-loader')
  //     .options({
  //       lessOptions: {
  //         modifyVars: v4Token,
  //       },
  //     })
  //     .end();
  // },

  // nodeModulesTransform: { type: 'none' },
  // webpack5: {},
  // exportStatic: {},
  define: {
    DOMAIN: '', // Domain地址
    MAIN_DOMAIN_HOST: '', // 主HOST
    CDN_DOMAIN: 'https://cdn.gocn.vip', // WS域名
    CI_COMMIT_SHORT_SHA: process.env.CI_COMMIT_SHORT_SHA,
  },
  // externals: {
  //   // flooim: 'window.flooIM',
  // },
  // scripts: ['https://package.lanyingim.com/floo-2.0.0.js'],
  metas: [
    {
      name: 'version',
      content: process.env.CI_COMMIT_SHORT_SHA,
    },
  ],

  // cssnano: {
  //   preset: 'default',
  // },
});
