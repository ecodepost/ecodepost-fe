import {useModel} from 'umi';
import BreadCrumb from '@/components/BreadCrumb/BreadCrumb';
import {Button} from 'antd';
import headerCommonStyle from '@/components/Header/HeaderCommon.less';

const GroupHeader = () => {
  const {
    initialState: { currentUser, checkLogin },
  } = useModel('@@initialState');

  return (
    <div className={headerCommonStyle.header}>
      <BreadCrumb />
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

export default GroupHeader;
