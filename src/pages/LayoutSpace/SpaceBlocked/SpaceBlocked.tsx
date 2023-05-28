import {messageInfo} from '@/components/Message/Message';
import styles from './SpaceBlocked.less';
import SPACE_BLOCKED from '../../../static/space_blocked.png';
import {Button, Input, Modal} from 'antd';
import React, {useState} from 'react';
import {CheckCircleFilled} from '@ant-design/icons';
import {useIntl, useParams} from 'umi';
import {Visibility} from '@/enums/visibilitylevel';
import {PostApiSpacesGuidApply} from "@/services/base/api.gen";

// import { AuditStatus } from '@/enums/auditstatus';

interface SpaceBlockedProps {
  visibility: number;
  spacePms: Spacev1GetSpacePermissionByUidRes;
}

const SpaceBlocked: React.FC<SpaceBlockedProps> = (props) => {
  const [applyVisible, setApplyVisible] = useState<boolean>(false);
  const {spaceGuid} = useParams<{ spaceGuid: string }>();
  const [modalStatus, setModalStatus] = useState<'apply' | 'success'>('apply');
  const [reason, setReason] = useState<string>('');
  const {visibility} = props;

  const intl = useIntl();
  const i = (id: string) => intl.formatMessage({ id });

  const [applyBtnLoading, setApplyBtnLoading] = useState<boolean>(false);
  const handleApply = async () => {
    setApplyBtnLoading(true);
    try {
      const res = await PostApiSpacesGuidApply(spaceGuid, {
        reason
      });
      if (res.code === 0) {
        setModalStatus('success');
        setApplyBtnLoading(false);
      } else {
        messageInfo({
          type: 'error',
          content: res.msg,
        });
      }
    } catch (err) {
      messageInfo({
        type: 'error',
        content: i('space.blocked.apply.fail'),
      });
    }
  };

  // const ShowBottomAction = () => {
  //   switch (spacePms.auditStatus) {
  //     case AuditStatus.APPLY:
  //       return (
  //         <span style={{ marginTop: 20 }} className={styles.blockedText}>
  //           {i('space.blocked.status.apply')}
  //         </span>
  //       );
  //     case AuditStatus.REJECT:
  //       return (
  //         <>
  //           <span style={{ marginTop: 20 }} className={styles.blockedText}>
  //             {i('space.blocked.status.reject')}
  //           </span>
  //           <Button className={styles.blockButton} onClick={() => setApplyVisible(true)}>
  //             {i('space.blocked.submit')}
  //           </Button>
  //         </>
  //       );
  //     case AuditStatus.RE_APPLY:
  //       return (
  //         <span style={{ marginTop: 20 }} className={styles.blockedText}>
  //           {i('space.blocked.status.reapply')}
  //         </span>
  //       );
  //     default:
  //       return (
  //         <Button className={styles.blockButton} onClick={() => setApplyVisible(true)}>
  //           {i('space.blocked.submit')}
  //         </Button>
  //       );
  //   }
  // };

  return (
    <div className={styles.block}>
      <img src={SPACE_BLOCKED} alt={i('space.blocked.img.alt')}/>
      <div className={styles.blockTitle}>
        <span>{i('space.blocked.title')}</span>
      </div>
      {/*{visibility === Visibility.PRIVATE && (*/}
      {/*  <div className={styles.blockSubTitle}>*/}
      {/*    <span>{i('space.blocked.subtitle.private')}</span>*/}
      {/*  </div>*/}
      {/*)}*/}
      {visibility === Visibility.SECRET && (
        <div className={styles.blockSubTitle}>
          <span>{i('space.blocked.subtitle.secret')}</span>
        </div>
      )}
      {/*{visibility === Visibility.PRIVATE && ShowBottomAction()}*/}
      <Modal
        getContainer={false}
        className={styles.modal}
        open={applyVisible}
        footer={null}
        width={520}
        centered
        onCancel={() => setApplyVisible(false)}
      >
        {modalStatus === 'apply' && (
          <div className={styles.modalBoxApply}>
            <span className={styles.modalBoxTitle}>{i('space.blocked.modal.apply.title')}</span>
            <Input
              placeholder={i('space.blocked.modal.apply.title')}
              onChange={(e) => setReason(e.target.value)}
              className={styles.modalBoxInput}
            />
            <div className={styles.modalBoxAction}>
              <Button
                type="primary"
                className={styles.modalBoxActionBtn}
                onClick={() => handleApply()}
                loading={applyBtnLoading}
              >
                {i('space.blocked.modal.apply.submit')}
              </Button>
            </div>
          </div>
        )}
        {modalStatus === 'success' && (
          <div className={styles.modalBox}>
            <CheckCircleFilled className={styles.modalBoxIcon} />
            <span className={styles.modalBoxText}>{i('space.blocked.submit.ready')}</span>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default SpaceBlocked;
