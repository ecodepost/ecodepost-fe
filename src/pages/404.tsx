import { Button } from 'antd';
import { useIntl } from 'umi';
import { pushHome } from '@/utils/historypush/history';
import styles from './404.less';
import NotFound from '@/static/404.jpg';

const NoFoundPage: React.FC = () => {
  const intl = useIntl();
  const i = (id: string) => intl.formatMessage({ id });

  return (
    <div className={styles.container}>
      <img className={styles.img} src={NotFound} alt="" />
      <div className={styles.title}>{i('cmt.404')}</div>
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

export default NoFoundPage;
