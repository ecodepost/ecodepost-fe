import { Col, Form, Row } from 'antd';
// import {CheckCard} from '@ant-design/pro-card';
import styles from './CheckedCardGroup.less';
import SPACE_FEED from '../../../../static/space_feed.png';
import SPACE_CARD from '../../../../static/space_card.png';
import SPACE_LIST from '../../../../static/space_list.png';
import { useIntl } from 'umi';

interface CheckedCardGroupProps {
  items: string[];
}

const CheckedCardGroup: React.FC<CheckedCardGroupProps> = (props) => {
  const intl = useIntl();
  const i = (intlId: string) => intl.formatMessage({ id: intlId });

  const { items } = props;
  const layoutMap = [
    { value: 3, name: i('spacelayout.feed'), cover: SPACE_FEED },
    { value: 2, name: i('spacelayout.card'), cover: SPACE_CARD },
    { value: 1, name: i('spacelayout.list'), cover: SPACE_LIST },
  ];
  return (
    <div className={styles.container}>
      <Form.Item
        name="spaceLayout"
        rules={[
          {
            required: true,
            message: i('cmtSidebar.space.card.layout.validate'),
          },
        ]}
      >
        {/* <CheckCard.Group style={{ width: '100%' }}>
          <Row justify="center" gutter={24}>
            {items.map((item) => {
              const el = layoutMap.find((e) => e.name === item) || ({} as any);
              const { value, name, cover } = el;
              return (
                <Col key={value} span={8}>
                  <CheckCard style={{ width: '100%' }} value={value} cover={cover} />
                  <span className={styles.layout_text}>{name}</span>
                </Col>
              );
            })}
          </Row>
        </CheckCard.Group> */}
      </Form.Item>
    </div>
  );
};

export default CheckedCardGroup;
