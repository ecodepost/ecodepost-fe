import {Button} from 'antd';
import {useIntl} from 'umi';
import {pushHome} from '@/utils/historypush/history';
import styles from './404.less';
import NoFound from '@/static/404.jpg';

interface NotFoundProps {
  msg: string
  data: string
}

const NotFound = (props: NotFoundProps) => {
  const {msg, data} = props
  const intl = useIntl();
  const i = (id: string) => intl.formatMessage({id});

  return (
    <div className={styles.container}>
      <img className={styles.img} src={NoFound} alt=""/>
      <div className={styles.title}>抱歉，你访问的页面不存在: {msg} {data && (<span>{data}</span>)}</div>
      <Button
        className={styles.button}
        onClick={() => {
          pushHome();
        }}
      >
        {i('cmt.404.back')}
      </Button>
    </div>
  );
};

export default NotFound;
