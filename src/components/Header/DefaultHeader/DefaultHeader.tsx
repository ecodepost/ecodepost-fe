import {useModel} from 'umi';
import BreadCrumb from '@/components/BreadCrumb/BreadCrumb';
import {Button} from 'antd';
import headerCommonStyle from '@/components/Header/HeaderCommon.less';

const DefaultHeader = () => {
  const {
    initialState: {currentUser, checkLogin},
  } = useModel('@@initialState');
  // const intl = useIntl();
  // const i = (id: string) => intl.formatMessage({ id });

  return (
    <div className={headerCommonStyle.header}>
      <BreadCrumb/>
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

export default DefaultHeader;
