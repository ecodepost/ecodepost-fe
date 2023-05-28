import {Modal, Spin} from 'antd';
import {useIntl} from 'umi';
import styles from './pay.less';
import {forwardRef, useImperativeHandle, useState} from "react";
import QRCode from "qrcode";
import {PostApiCmtBuySpace} from "@/services/base/api.gen";
import useRequestX from "@/hooks/useRequestX";

interface InnerProps {
  title: string
  spaceGuid: string
}

const PayCard = forwardRef((props: InnerProps, ref) => {
  const {title, spaceGuid} = props
  const intl = useIntl();
  const i = (id: string) => intl.formatMessage({id});
  const [visible, setVisible] = useState<boolean>(false);
  const [chargeQRCode, setChargeQRCode] = useState<string>();

  const PostApiCmtBuySpaceRequest = useRequestX(PostApiCmtBuySpace, {
    onSuccess: (res) => {
      QRCode.toDataURL(res.data.chargeUrl).then((url: string) => {
        setChargeQRCode(url);
      });
      // 购买成功后，会自动发消息到小铃铛
    }
  })

  const onPay = () => {
    setVisible(true)
    PostApiCmtBuySpaceRequest.run({
      spaceGuid: spaceGuid,
      chargeMethod: 13,
    });
  }

  useImperativeHandle(ref, () => ({
    onPay,
  }));

  return (
    (<div>
      <Modal
        title={title}
        centered
        open={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        footer={null}
      >
        <div className={styles.modal}>
          <Spin
            spinning={PostApiCmtBuySpaceRequest.loading}
          >
            {chargeQRCode && <img
              className={styles.qrCode}
              src={chargeQRCode}
              alt={i('goods.detail.modal.qrcode.alt')}
            />}
          </Spin>
          <p>{i('goods.detail.modal.content')}</p>
        </div>
      </Modal>
    </div>)
  );
});

export default PayCard;
