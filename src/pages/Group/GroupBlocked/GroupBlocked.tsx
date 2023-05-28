import {messageInfo} from '@/components/Message/Message';
import styles from './GroupBlocked.less';
import SPACE_BLOCKED from '../../../static/space_blocked.png';
import {Button, Input, Modal} from 'antd';
import {useState} from 'react';
import {CheckCircleFilled} from '@ant-design/icons';
import {useIntl, useParams} from 'umi';
import {Visibility} from '@/enums/visibilitylevel';
import {AuditStatus} from '@/enums/auditstatus';
import {PostApiSpacesGroupsGuidApply} from "@/services/base/api.gen";

interface GroupBlockedProps {
  visibility: number;
  groupPms: GroupPms;
}

const GroupBlocked: React.FC<GroupBlockedProps> = (props) => {
  const {visibility, groupPms} = props;
  const [applyVisible, setApplyVisible] = useState<boolean>(false);
  const {groupGuid} = useParams<{ groupGuid: string }>();

  const intl = useIntl();
  const i = (id: string) => intl.formatMessage({ id });

  const [modalStatus, setModalStatus] = useState<'apply' | 'success'>('apply');
  const [reason, setReason] = useState<string>('');

  const [applyBtnLoading, setApplyBtnLoading] = useState<boolean>(false);
  const handleApply = async () => {
    setApplyBtnLoading(true);
    try {
      const res = await PostApiSpacesGroupsGuidApply(groupGuid, reason);
      if (res.code === 0) {
        setModalStatus('success');
        setApplyBtnLoading(false);
      } else {
        messageInfo({
type: 'error',
content: res.msg,
})
      }
    } catch (err) {
      messageInfo({
type: 'error',
content: i('group.blocked.apply.fail'),
})
    }
  };

  const ShowBottomAction = () => {
    switch (groupPms.auditStatus) {
      case AuditStatus.APPLY:
        return (
          <span style={{ marginTop: 20 }} className={styles.blockedText}>
            {i('group.blocked.status.apply')}
          </span>
        );
      case AuditStatus.REJECT:
        return (
          <>
            <span style={{ marginTop: 20 }} className={styles.blockedText}>
              {i('group.blocked.status.reject')}
            </span>
            <Button className={styles.blockButton} onClick={() => setApplyVisible(true)}>
              {i('group.blocked.subtitle.apply')}
            </Button>
          </>
        );
      case AuditStatus.RE_APPLY:
        return (
          <span style={{ marginTop: 20 }} className={styles.blockedText}>
            {i('group.blocked.status.reapply')}
          </span>
        );
      default:
        return (
          <Button className={styles.blockButton} onClick={() => setApplyVisible(true)}>
            {i('group.blocked.subtitle.apply')}
          </Button>
        );
    }
  };

  return (
    (<div className={styles.block}>
      <img src={SPACE_BLOCKED} alt={i('group.blocked.img.alt')} />
      <div className={styles.blockTitle}>
        <span>{i('group.blocked.title')}</span>
      </div>
      {visibility === Visibility.PRIVATE && (
        <div className={styles.blockSubTitle}>
          <span>{i('group.blocked.subtitle.private')}</span>
        </div>
      )}
      {visibility === Visibility.SECRET && (
        <div className={styles.blockSubTitle}>
          <span>{i('group.blocked.subtitle.secret')}</span>
        </div>
      )}
      {visibility === Visibility.PRIVATE && ShowBottomAction()}
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
            <span className={styles.modalBoxTitle}>{i('group.blocked.modal.apply.title')}</span>
            <Input
              placeholder={i('group.blocked.modal.apply.title')}
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
                {i('group.blocked.modal.apply.submit')}
              </Button>
            </div>
          </div>
        )}
        {modalStatus === 'success' && (
          <div className={styles.modalBox}>
            <CheckCircleFilled className={styles.modalBoxIcon} />
            <span className={styles.modalBoxText}>{i('group.blocked.submit.ready')}</span>
          </div>
        )}
      </Modal>
    </div>)
  );
};

export default GroupBlocked;
