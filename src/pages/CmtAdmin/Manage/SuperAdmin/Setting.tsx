import {Avatar, Button, Modal, Table} from 'antd';
import {useEffect, useState} from 'react';
import {useIntl} from '@umijs/max';
import styles from './Setting.less';
import SuperAdminModal from './SuperAdminModal';
import {messageInfo} from '@/components/Message/Message';
import {DeleteApiCmtAdminPmsManagersMembersUid, GetApiCmtAdminPmsManagersMembers} from "@/services/base/api.gen";
import useRequestX from "@/hooks/useRequestX";

const {Column} = Table;

const Setting = () => {
  const [managerList, setManagerList] = useState<PmsMemberInfo[]>([]);
  const [superAdminVisible, setSuperAdminVisible] = useState<boolean>(false);

  const intl = useIntl();
  const i = (id: string) => intl.formatMessage({id});

  const GetApiCmtAdminPmsManagersMembersReq = useRequestX(GetApiCmtAdminPmsManagersMembers, {
    onSuccess: ({data}) => {
      setManagerList(data.list);
    }
  })

  const DeleteApiCmtAdminPmsManagersMembersUidReq = useRequestX(DeleteApiCmtAdminPmsManagersMembersUid, {
    onSuccess: ({data}) => {
      GetApiCmtAdminPmsManagersMembersReq.run();
      messageInfo({
        type: 'success',
        content: `${i('remove')}${i('success')}`,
      });
    }
  })

  const handleRemovePms = async (uid: number) => {
    Modal.confirm({
      content: i('cmtadmin.admin.setting.setting.remove'),
      onOk: async () => {
        DeleteApiCmtAdminPmsManagersMembersUidReq.run(uid)
      },
    });
  };

  useEffect(() => {
    GetApiCmtAdminPmsManagersMembersReq.run();
  }, []);

  return (
    <div className={styles.setting}>
      <div className={styles.super}>
        <div className={styles.superTitle}>
          <span>{i('cmtadmin.admin.setting.superadmin.title')}</span>
        </div>
        <div className={styles.superAction}>
          <Button className={styles.superActionBtn} onClick={() => setSuperAdminVisible(true)}>
            {i('cmtadmin.admin.setting.superadmin.add')}
          </Button>
          <Modal
            centered
            open={superAdminVisible}
            onCancel={() => setSuperAdminVisible(false)}
            footer={null}
            getContainer={false}
          >
            <SuperAdminModal
              setSuperAdminVisible={setSuperAdminVisible}
              fetchManagerList={GetApiCmtAdminPmsManagersMembersReq.run}
            />
          </Modal>
        </div>
        <div className={styles.superTable}>
          <Table
            loading={GetApiCmtAdminPmsManagersMembersReq.loading}
            showHeader={false}
            rowKey={'uid'}
            dataSource={managerList}
            pagination={{ hideOnSinglePage: true }}
          >
            <Column
              dataIndex="nickname"
              key="nickname"
              render={(_, record: any) => (
                <>
                  <Avatar src={record.avatar} size={60} />
                  <span className={styles.table_name}>{record.nickname}</span>
                </>
              )}
            />
            <Column
              dataIndex="phone"
              key="phone"
              align="center"
              render={(_, record: any) => (
                <span className={styles.table_phone}>{record.phone}</span>
              )}
            />
            <Column
              dataIndex="email"
              key="email"
              align="center"
              render={(_, record: any) => (
                <span className={styles.table_email}>{record.email}</span>
              )}
            />
            <Column
              dataIndex="action"
              key="action"
              align="center"
              render={(_, record: any) => (
                <div className={styles.table_action}>
                  <Button
                    className={styles.table_action_btn}
                    onClick={() => handleRemovePms(record.uid)}
                    loading={DeleteApiCmtAdminPmsManagersMembersUidReq.loading}
                  >
                    {i('cmtadmin.admin.setting.superadmin.remove')}
                  </Button>
                </div>
              )}
            />
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Setting;
