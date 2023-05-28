// config/config.local.ts local环境对应的配置文件
import {defineConfig} from 'umi';

/**
 * 导出的多环境变量命名约定：一律大写且采用下划线分割单词
 * 注意：在添加变量后，需要在src/typing.d.ts内添加该变量的声明，否则在使用变量时IDE会报错。
 * https://pro.ant.design/zh-CN/docs/environment-manage/
 */
export default defineConfig({
  plugins: [
    // 'react-dev-inspector/plugins/umi/react-inspector'
  ],
  // inspectorConfig: {
  //   // loader options type and docs see below
  //   exclude: [],
  //   babelPlugins: [],
  //   babelOptions: {},
  // },
  define: {
    DOMAIN: 'http://localhost:8000', // Domain地址
    CDN_DOMAIN: 'https://a1.cdn0.co', // WS域名
  },
});
