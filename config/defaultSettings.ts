import { Settings as LayoutSettings } from '@ant-design/pro-components';

const Settings: LayoutSettings & {
  pwa?: boolean;
  logo?: string;
} = {
  navTheme: 'light',
  headerRender: false,
  menuRender: false,
  // primaryColor: '#03cf5d',
  layout: 'mix',
  contentWidth: 'Fluid',
  fixedHeader: true,
  fixSiderbar: true,
  colorWeak: false,
  pwa: false,
  logo: '', // `https://${CDN_DOMAIN}/ossfarm/logo.png`
  iconfontUrl: '//at.alicdn.com/t/c/font_3556302_0m7p29ko4zym.css',
  menu: {
    locale: false, //关闭国际化
  },
};

export default Settings;
