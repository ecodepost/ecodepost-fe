import { useIntl, useModel } from 'umi';
import { useEffect, useState } from 'react';
import BreadCrumb from '@/components/BreadCrumb/BreadCrumb';
import { Button } from 'antd';
import headerCommonStyle from '@/components/Header/HeaderCommon.less';
import headerDetailStyle from './DetailHeader.less';
import { back } from '@/utils/historypush/history';
import classnames from 'classnames';

interface DetailHeaderProps {
  title?: string;
  type?: 'question' | 'article' | '';
}

const DetailHeader = (props: DetailHeaderProps) => {
  const { title, type } = props;
  const {
    initialState: { currentUser, checkLogin },
  } = useModel('@@initialState');
  const intl = useIntl();
  const i = (id: string) => intl.formatMessage({ id });
  const [isScrollTop, setIsScrollTop] = useState<boolean>(false);

  const handleScroll = (e) => {
    if (type == 'question') {
      // 获取滚动的高度
      const scrollTop = e.target.scrollTop;
      if (scrollTop > 40) {
        if (isScrollTop) {
          return;
        }

        setIsScrollTop(true);
      }

      if (scrollTop <= 40) {
        if (!isScrollTop) {
          return;
        }

        setIsScrollTop(false);
      }
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, true);
    return () => {
      window.removeEventListener('scroll', handleScroll, true);
    };
  }, [isScrollTop]);

  return (
    <div className={headerDetailStyle.header}>
      <div
        onClick={() => back()}
        className={classnames(
          headerDetailStyle.back,
          headerDetailStyle.header_content,
          isScrollTop ? headerDetailStyle.is_hide : '',
        )}
      >
        <i className={classnames('iconfont', 'icon-fanhui', headerDetailStyle.back_icon)} />
        <span className={headerDetailStyle.back_test}>返回</span>
      </div>
      <div
        className={classnames(
          headerDetailStyle.title,
          headerDetailStyle.header_content,
          isScrollTop ? headerDetailStyle.is_hide : '',
        )}
      >
        {title}
      </div>
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

export default DetailHeader;
