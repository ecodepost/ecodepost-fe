import styles from './Stat.less';
import { Row, Col } from 'antd';
import classNames from 'classnames';

interface Props {
  data: AppPanel; //
}

export default (props: Props) => {
  const { data } = props;

  const targets = data.targets[0];
  // cols有顺序
  const cols = targets.meta.cols;
  // stat是一维数据
  const targetData = targets.data[0];

  const avatarStyle = data.fieldConfig;

  return (
    <div className={styles.container}>
      <div className={styles.desc}>
        <Row>
          <Col>
            <img src="" alt="" className={styles.avatar} />
          </Col>
          <Col>
            <p className={styles.name}>{targetData['login']}</p>
            <p className={styles.repo_desc}>这里放相关内容的一些介绍，最多就显示一行</p>
            <Row>
              <Col>
                <i className={classNames('iconfont', 'icon-lianjie', styles.card_share_icon)} />
                <a href={targetData['html_url']} target="">
                  GitHub
                </a>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
      <Row gutter={[20, 20]} justify="start">
        {cols.map((item) => {
          if (item.name == 'login' || item.name == 'html_url') {
            return;
          }

          return (
            <Col span={6}>
              <div className={styles.flex_item}>
                <div className={styles.flex_title}>{item.name}</div>
                <div className={styles.flex_description}>{targetData[item.name]}</div>
              </div>
            </Col>
          );
        })}
      </Row>
    </div>
  );
};
