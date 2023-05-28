import {useModel} from 'umi';
import {Button} from 'antd';
import headerCommonStyle from '@/components/Header/HeaderCommon.less';

const HomeHeader = () => {
  const {
    initialState: {currentUser, checkLogin},
  } = useModel('@@initialState');
  // const intl = useIntl();
  // const i = (id: string) => intl.formatMessage({ id });

  return (
    <div className={headerCommonStyle.header}>
      <div>社区首页</div>
      {!currentUser && (
        <Button
          onClick={() => {
            checkLogin();
          }}
        >
          登录
        </Button>
      )}
    </div>
  );
};

export default HomeHeader;
