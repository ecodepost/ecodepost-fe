import {useIntl} from 'umi';
import styles from './CmtPayCard.less';
import {useEffect, useState} from 'react';
import {Avatar, Button, Card, Col, Modal, Row, Spin, Typography} from 'antd';
import dayjs from 'dayjs';
import {ClockCircleOutlined, UserOutlined} from '@ant-design/icons';
import QRCode from 'qrcode';
import {messageInfo} from '@/components/Message/Message';
import {GetApiMyOrdersSn, PostApiCmtGuidBuyMember} from "@/services/base/api.gen";

const {Title, Paragraph} = Typography;

export interface CmtPayCardProps {
  homeInfo?: DtoCmtInfo;
  onInit: () => void;
  currentCmtUser: any;
}

export const CmtPayCard = (props: CmtPayCardProps) => {
  const { homeInfo, onInit, currentCmtUser } = props;
  const intl = useIntl();
  const i = (id: string) => intl.formatMessage({ id });

  const [buyModal, setBuyModal] = useState<boolean>(false);
  const [chargeQRCode, setChargeQRCode] = useState<string>('');
  const [buyModalFirstVis, setBuyModalFirstVis] = useState<boolean>(false);

  useEffect(() => {
    if (currentCmtUser && currentCmtUser.isFirstFollow) {
      setBuyModalFirstVis(true);
    }
  }, [currentCmtUser]);


  const getHasBuy = async (sn: string) => {
    const resp = await GetApiMyOrdersSn(sn);
    if (resp.code == 0) {
      if (resp.data.status == 20) {
        setBuyModal(false);
        messageInfo({
          type: 'success',
          content: i('goods.upgrade.success'),
        });
        window.location.reload();
      } else {
        setTimeout(() => getHasBuy(sn), 1000);
      }
    } else {
      setBuyModal(false);
      messageInfo({
        type: 'error',
        content: i('goods.upgrade.fail'),
      });
    }
  };

  const wantToBuy = async () => {
    try {
      // setBuyBtnLoading(true);
      setBuyModal(true);
      const resp = await PostApiCmtGuidBuyMember({
        chargeMethod: 13,
        memberType: 1, // 年度1，月度2
      });

      if (resp.code == 0) {
        // setChargeInfo(resp.data);
        QRCode.toDataURL(resp.data.chargeUrl).then((url: string) => {
          setChargeQRCode(url);
        });

        setTimeout(() => getHasBuy(resp.data.orderSn), 3000);
        // setBuyBtnLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(onInit, []);

  return (<>
    <div className={styles.container_content}>
      <Card className={styles.card}>
        <Row>
          <Col span={2}>
            <Avatar src={homeInfo?.logo} className={styles.logo} />
          </Col>
          <Col span={17} className={styles.col_mid}>
            <Row className={styles.row_desc}>
              <Typography>
                <Title className={styles.desc_title}>{homeInfo?.name}</Title>
                <Paragraph
                  ellipsis={{
                    expandable: true,
                    rows: 2,
                  }}
                >
                  {homeInfo?.description || '这个社区很懒，没有描述...'}
                </Paragraph>
                <Paragraph
                  ellipsis={{
                    expandable: true,
                    rows: 2,
                  }}
                >
                  <div className={styles.footer}>
                    <span>
                      <UserOutlined className={styles.footer_icon} />
                      {homeInfo?.memberCnt || 0}
                      {i('members')}
                    </span>
                    <span className={styles.footer_days}>
                      <ClockCircleOutlined className={styles.footer_icon} />
                      {i('cmtWelcome.medal.alreadyExist')}
                      {dayjs(dayjs().format('YYYY-MM-DD')).diff(
                        dayjs.unix(homeInfo?.ctime || 0).format('YYYY-MM-DD'),
                        'day',
                      )}
                      {i('cmtWelcome.medal.days')}
                    </span>
                  </div>
                </Paragraph>
              </Typography>
              <p></p>
            </Row>
          </Col>
          <Col span={3}>
            <Row>
              <div className={styles.price}>
                <span>{'￥' + (homeInfo?.annualPrice || 0) / 100}</span>
                <Button className={styles.buy_btn} onClick={() => wantToBuy()}>
                  加入社区
                </Button>
              </div>
            </Row>
          </Col>
        </Row>
      </Card>
    </div>
    <Modal
      title={i('goods.detail.modal.title')}
      centered
      open={buyModal}
      onOk={() => setBuyModal(false)}
      onCancel={() => setBuyModal(false)}
      footer={null}
    >
      <div className={styles.modal}>
        {chargeQRCode ? (
          <img
            className={styles.qrCode}
            src={chargeQRCode}
            alt={i('goods.detail.modal.qrcode.alt')}
          />
        ) : (
          <Spin />
        )}
        <p>{i('goods.detail.modal.content')}</p>
      </div>
    </Modal>
    <Modal
      centered
      open={buyModalFirstVis}
      onOk={() => setBuyModalFirstVis(false)}
      onCancel={() => setBuyModalFirstVis(false)}
      footer={null}
    >
      <div className={styles.modal}>
        <Row>
          <Avatar className={styles.buy_confirm_avatar} size={64} src={homeInfo?.logo} />
        </Row>
        <Row>
          <Typography className={styles.buy_confirm_desc}>
            <Paragraph>{`您已成功订阅并加入${homeInfo?.name}社区`}</Paragraph>
            <Paragraph>
              <div className={styles.footer}>
                {/* {`有效期至`} */}
                {currentCmtUser?.expireMsg}
              </div>
            </Paragraph>
            <Paragraph>
              <Button
                type="primary"
                className={styles.buy_confirm_btn}
                onClick={() => {
                  setBuyModalFirstVis(false);
                }}
              >
                <span>{`我知道了`}</span>
              </Button>
            </Paragraph>
          </Typography>
        </Row>
      </div>
    </Modal>
  </>);
};
