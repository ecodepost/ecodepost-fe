import {messageInfo} from '@/components/Message/Message';
import {sendReferrals} from '@/services/user/api';
import {ProList} from '@ant-design/pro-components';
import {Button, Form, Modal, Tabs} from 'antd';
import {useEffect, useState} from 'react';
import styles from './CommunityInvite.less';
import copy from 'copy-to-clipboard';
import {useIntl} from 'umi';
import {GetApiMyReferrals} from '@/services/base/api.gen';
import useRequestX from '@/hooks/useRequestX';

const {TabPane} = Tabs;

interface CommunityInviteProps {
  title: string;
  visible: boolean;
  onClose: () => void;
}

const CommunityInvite: React.FC<CommunityInviteProps> = (props) => {
  const [referalCodes, setReferalCodes] = useState<ReferralItem[]>([]);
  const [currentTab, setCurrentTab] = useState<string>('1');
  const { title, visible, onClose } = props;
  const intl = useIntl();
  const i = (id: string) => intl.formatMessage({ id });

  const GetApiMyReferralsReq = useRequestX(GetApiMyReferrals, {
    onSuccess: (res) => {
      setReferalCodes(res.data.filter((item: ReferralItem) => item.cmtGuid === cmtGuid));
    },
  });

  useEffect(() => {
    GetApiMyReferralsReq.run({});
    return () => {
      props?.onClose?.();
    };
  }, []);
  const [form] = Form.useForm();

  const [submitBtnLoading, setSubmitBtnLoading] = useState<boolean>(false);
  const handleSubmit = async (val: any) => {
    if (currentTab === '1') return;
    const reqParams = [];
    if (currentTab === '2') {
      const { phone } = val;
      if (phone?.length === 0) return;
      for (const item in phone) {
        reqParams.push({ channel: 'sms', receiver: phone[item].code, ref: item });
      }
    }
    if (currentTab === '3') {
      const { email } = val;
      if (email?.length === 0) return;
      for (const item in email) {
        reqParams.push({ channel: 'email', receiver: email[item].code, ref: item });
      }
    }
    setSubmitBtnLoading(true);
    try {
      const res = await sendReferrals(reqParams);
      if (res.code === 0) {
        messageInfo({
          type: 'success',
          content: i('cmtSidebar.invite.referral.send.success'),
        });
        setSubmitBtnLoading(false);
      } else {
        messageInfo({
          type: 'error',
          content: res.msg,
        });
      }
    } catch (err) {
      messageInfo({
        type: 'error',
        content: i('cmtSidebar.invite.referral.send.fail'),
      });
    }
  };

  return (
    <Modal
      open={visible}
      width={520}
      footer={null}
      centered
      destroyOnClose
      onCancel={() => {
        onClose();
      }}
    >
      <Form form={form} onFinish={handleSubmit}>
        <div className={styles.card}>
          <div className={styles.card_header}>
            <span className={styles.card_header_text}>{i('cmtSidebar.invite.title')}&nbsp;</span>
            <span className={styles.card_header_text_hl}>{title}</span>
          </div>
          <div className={styles.card_subheader}>
            <span>
              {i('cmtSidebar.invite.subtitle.front')} {title}
              {' 社区'}
              {i('cmtSidebar.invite.subtitle.back')}
            </span>
          </div>
          <Tabs
            defaultActiveKey="1"
            className={styles.card_tab}
            onChange={(e) => setCurrentTab(e)}
            destroyInactiveTabPane
          >
            <TabPane tab={i('cmtSidebar.invite.tab.link')} key="1">
              <div className={styles.tab}>
                <div className={styles.tab_title}>
                  <span>{i('cmtSidebar.invite.tab.link.title')}</span>
                </div>
                <div className={styles.tab_content_link}>
                  <ProList<any>
                    loading={GetApiMyReferralsReq.loading}
                    rowKey="code"
                    dataSource={referalCodes}
                    metas={{
                      title: {
                        dataIndex: 'code',
                      },
                      actions: {
                        render: (text: any, record: any) => {
                          return (
                            <>
                              <Button
                                onClick={() => {
                                  copy(record.code);
                                  messageInfo({
                                    type: 'success',
                                    content: i('copy.success'),
                                  });
                                }}
                              >
                                {i('cmtSidebar.invite.tab.link.referral.copy')}
                              </Button>

                              <Button
                                onClick={() => {
                                  copy(record.url);
                                  messageInfo({
                                    type: 'success',
                                    content: i('copy.success'),
                                  });
                                }}
                                style={{ marginLeft: 10 }}
                              >
                                {i('cmtSidebar.invite.tab.link.link.copy')}
                              </Button>
                            </>
                          );
                        },
                      },
                    }}
                  />
                </div>
              </div>
            </TabPane>
            <TabPane tab={i('cmtSidebar.invite.tab.phone')} key="2">
              <div className={styles.tab}>
                <div className={styles.tab_title}>
                  <span>{i('cmtSidebar.invite.tab.phone.title')}</span>
                </div>
                <div className={styles.tab_content}>
                  <Form.List name="phone">
                    {() => (
                      // <ProList<any>
                      //   rowKey="code"
                      //   loading={GetApiMyReferralsReq.loading}
                      //   dataSource={referalCodes}
                      //   metas={{
                      //     title: {
                      //       dataIndex: 'code',
                      //     },
                      //     actions: {
                      //       render: (text: any, record: any) => {
                      //         return (
                      //           <Form.Item
                      //             name={[record.code, 'code']}
                      //             rules={[
                      //               {
                      //                 validator: (_: any, value: any) => {
                      //                   if (
                      //                     value === '' ||
                      //                     value === undefined ||
                      //                     value === null ||
                      //                     value?.match(/^1[3456789]\d{9}$/)
                      //                   ) {
                      //                     return Promise.resolve();
                      //                   } else {
                      //                     return Promise.reject(
                      //                       new Error(i('cmtSidebar.invite.tab.phone.validate')),
                      //                     );
                      //                   }
                      //                 },
                      //               },
                      //             ]}
                      //           >
                      //             <Input />
                      //           </Form.Item>
                      //         );
                      //       },
                      //     },
                      //   }}
                      // />
                      <></>
                    )}
                  </Form.List>
                </div>
              </div>
            </TabPane>
            <TabPane tab={i('cmtSidebar.invite.tab.email')} key="3">
              <div className={styles.tab}>
                <div className={styles.tab_title}>
                  <span>{i('cmtSidebar.invite.tab.email.title')}</span>
                </div>
                <div className={styles.tab_content}>
                  <Form.List name="email">
                    {() => (
                      // <ProList<any>
                      //   rowKey="code"
                      //   loading={GetApiMyReferralsReq.loading}
                      //   dataSource={referalCodes}
                      //   metas={{
                      //     title: {
                      //       dataIndex: 'code',
                      //     },
                      //     actions: {
                      //       render: (text: any, record: any) => {
                      //         return (
                      //           <Form.Item
                      //             name={[record.code, 'code']}
                      //             rules={[
                      //               {
                      //                 validator: (_: any, value: any) => {
                      //                   if (
                      //                     value === '' ||
                      //                     value === undefined ||
                      //                     value === null ||
                      //                     value?.match(
                      //                       /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/,
                      //                     )
                      //                   ) {
                      //                     return Promise.resolve();
                      //                   } else {
                      //                     return Promise.reject(
                      //                       new Error(i('cmtSidebar.invite.tab.email.validate')),
                      //                     );
                      //                   }
                      //                 },
                      //               },
                      //             ]}
                      //           >
                      //             <Input />
                      //           </Form.Item>
                      //         );
                      //       },
                      //     },
                      //   }}
                      // />
                      <></>
                    )}
                  </Form.List>
                </div>
              </div>
            </TabPane>
          </Tabs>

          <div className={styles.action}>
            {currentTab !== '1' && (
              <Form.Item noStyle>
                <Button
                  type="primary"
                  className={styles.action_btn}
                  htmlType="submit"
                  loading={submitBtnLoading}
                >
                  {i('cmtSidebar.invite.send')}
                </Button>
              </Form.Item>
            )}
          </div>
        </div>
      </Form>
    </Modal>
  );
};

export default CommunityInvite;
