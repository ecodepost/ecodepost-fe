import {Button, Form, Input, Modal, Radio, Spin} from 'antd';
import React, {useEffect, useState} from 'react';
import styles from './Collection.less';
import {messageInfo} from '@/components/Message/Message';
import {useIntl, useModel} from 'umi';
import NeedToLogin from '@/components/NeedToLogin/NeedToLogin';

import {
  DeleteApiMyCollectionGroupsCgid,
  GetApiMyCollectionGroups,
  PostApiMyCollectionGroups,
  PostApiMyCollectionGroupsCollections,
} from '@/services/base/api.gen';
import useRequestX from "@/hooks/useRequestX";

const {TextArea} = Input;

interface ModalStatus {
  modalStatus: 'new' | 'list';
  handleShow: any;
  visible: boolean;
  guid: string;
  typ: number;
  isManager: boolean;
}

const Collection: React.FC<ModalStatus> = (props) => {
  /** 此处Modal有两个页面，新建/展示，同时展示又有空/列表两种状态 */
  const [status, setStatus] = useState<'new' | 'list'>('list');
  const {modalStatus, visible, handleShow, guid, typ, isManager} = props;
  const [collectionGroups, setCollectionGroups] = useState<Statv1CollectionGroupInfo[]>([]);
  const [editBtnLoading, setEditBtnLoading] = useState<boolean>(false);
  const [deleteBtnLoading, setDeleteBtnLoading] = useState<boolean>(false);
  const [createBtnLoading, setCreateBtnLoading] = useState<boolean>(false);
  const {initialState: {isOnline, checkLogin}} = useModel('@@initialState');
  const intl = useIntl();
  const i = (id: string) => intl.formatMessage({id});
  const [form] = Form.useForm();

  const GetApiMyCollectionGroupsReq = useRequestX(GetApiMyCollectionGroups, {
    onSuccess: ({data}) => {
      setCollectionGroups(data.list || []);
    }
  })

  const fetchCollectionGroups = () => {
    if (!isOnline()) {
      return;
    }
    GetApiMyCollectionGroupsReq.run()
  };

  useEffect(() => {
    fetchCollectionGroups();
    setStatus(modalStatus);
    if (status == 'new') {
      setStatus(status);
    }
  }, [status]);

  const [createCollectionGroupLoading, setCreateCollctionGroupLoading] = useState<boolean>(false);

  const handleCreateCollectionGroup = async (value: {
    title: string;
    description: string;
    visible: number;
    name: string;
  }) => {
    if (value.title === '') {
      messageInfo({
        type: 'error',
        content: '请输入收藏夹名称',
      });
      return;
    }
    setCreateCollctionGroupLoading(true);
    try {
      const res = await PostApiMyCollectionGroups({
        desc: value.description,
        title: value.title,
      });
      if (res.code === 0) {
        // messageInfo({
        //   type: 'success',
        //   content: '创建收藏夹成功',
        // });
        fetchCollectionGroups();
        setCreateCollctionGroupLoading(false);
        handleShow(false);
        form.resetFields();
      } else {
        messageInfo({
          type: 'error',
          content: res.msg,
        });
      }
    } catch (err) {
      messageInfo({
        type: 'error',
        content: '创建收藏夹失败',
      });
    }
  };

  const handleCreateCollection = async (id: any) => {
    setCreateBtnLoading(true);
    setEditBtnLoading(true);
    try {
      const resp = await PostApiMyCollectionGroupsCollections({
        collectionGroupIds: [id],
        guid: guid,
        type: typ,
      });

      if (resp.code === 0) {
        // messageInfo({
        //   type: 'success',
        //   content: '创建收藏成功',
        // });
        handleShow(true);
        setCreateBtnLoading(false);
        setEditBtnLoading(false);
      }
    } catch (err) {
      messageInfo({
        type: 'error',
        content: '创建收藏失败',
      });
    }
  };

  const handleDeleteCollectionGroup = async (id: any) => {
    setDeleteBtnLoading(true);
    try {
      const resp = await DeleteApiMyCollectionGroupsCgid(id);
      if (resp.code === 0) {
        messageInfo({
          type: 'success',
          content: '删除收藏夹成功',
        });
        setDeleteBtnLoading(false);
        fetchCollectionGroups();
      }
    } catch (err) {
      messageInfo({
        type: 'error',
        content: '删除收藏夹失败',
      });
    }
  };

  return (
    <span className={styles.container}>
      <Modal
        getContainer={false}
        open={visible}
        footer={null}
        onCancel={() => handleShow(false)}
      >
        {!isOnline() ? (
          NeedToLogin({login: i('cmt.login'), signup: i('cmt.signup'), checkLogin})
        ) : (
          <div className={styles.coll}>
            {status === 'list' &&
              <div className={styles.coll_list}>
                <Spin spinning={GetApiMyCollectionGroupsReq.loading}>
                  {collectionGroups?.length === 0 ? (
                    <div className={styles.coll_empty}>
                      <div className={styles.coll_empty_header}>
                        <span className={styles.coll_empty_header_title}>添加收藏</span>
                        <span className={styles.coll_empty_header_subtitle}>
                      您可以创建多个收藏夹，将内容分类收藏
                    </span>
                      </div>
                      <div className={styles.coll_empty_action}>
                        <Button
                          className={styles.coll_empty_action_cancel}
                          onClick={() => handleShow(false)}
                        >
                          取消
                        </Button>
                        <Button
                          type="primary"
                          className={styles.coll_empty_action_ok}
                          onClick={() => setStatus('new')}
                        >
                          创建收藏夹
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className={styles.coll_list}>
                      <div className={styles.coll_list_header}>
                        <span className={styles.coll_list_header_title}>收藏夹</span>
                        <span className={styles.coll_list_header_subtitle}>请选择您想添加的收藏夹</span>
                      </div>
                      <div className={styles.coll_list_content}>
                        {collectionGroups.map((item) => (
                          <div className={styles.coll_list_content_item} key={item.id}>
                            <div className={styles.item_info}>
                              <div className={styles.item_info_top}>
                                <span className={styles.item_info_top_name}>{item.title}</span>
                                <span className={styles.item_info_top_visible}>（仅自己可见）</span>
                              </div>
                              <span>{item?.cnt || 0}&nbsp;条内容</span>
                            </div>
                            {isManager ? (
                              <div className={styles.item_action_list}>
                                <div className={styles.item_action}>
                                  <Button
                                    type="primary"
                                    loading={editBtnLoading}
                                    onClick={() => handleCreateCollection(item.id)}
                                  >
                                    修改
                                  </Button>
                                </div>
                                <div className={styles.item_action_delete}>
                                  <Button
                                    type="primary"
                                    loading={deleteBtnLoading}
                                    onClick={() => handleDeleteCollectionGroup(item.id)}
                                  >
                                    删除
                                  </Button>
                                </div>
                              </div>
                            ) : (
                              <div className={styles.item_action}>
                                <Button
                                  type="primary"
                                  loading={createBtnLoading}
                                  onClick={() => handleCreateCollection(item.id)}
                                >
                                  收藏
                                </Button>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                      <div className={styles.coll_list_action}>
                        <Button type="primary" onClick={() => setStatus('new')}>
                          创建收藏夹
                        </Button>
                      </div>
                    </div>
                  )}
                </Spin>
              </div>
            }
            {status === 'new' && (
              <div className={styles.coll_new}>
                <div className={styles.coll_new_header}>
                  <span className={styles.coll_new_header_title}>创建收藏夹</span>
                  <span className={styles.coll_new_header_subtitle}>请选择您想添加的收藏夹</span>
                </div>
                <div className={styles.coll_new_content}>
                  <Form
                    form={form}
                    initialValues={{title: '', description: '', visible: 1}}
                    onFinish={handleCreateCollectionGroup}
                  >
                    <Form.Item name="title" noStyle>
                      <Input className={styles.coll_new_content_name} placeholder="收藏标题" />
                    </Form.Item>
                    <Form.Item noStyle name="description">
                      <TextArea
                        className={styles.coll_new_content_desc}
                        placeholder="收藏描述（选填）"
                        autoSize={{ minRows: 4, maxRows: 4 }}
                      />
                    </Form.Item>
                    <Form.Item noStyle name="visible">
                      <Radio.Group>
                        <Radio value={1} className={styles.coll_new_content_radio}>
                          <span className={styles.coll_new_content_radio_main}>公开</span>
                          <span className={styles.coll_new_content_radio_sub}>
                            所有可访问您主页的用户可查看此收藏夹
                          </span>
                        </Radio>
                        <Radio value={2} className={styles.coll_new_content_radio}>
                          <span className={styles.coll_new_content_radio_main}>私密</span>
                          <span className={styles.coll_new_content_radio_sub}>
                            只有您自己可查看此收藏夹
                          </span>
                        </Radio>
                        <Radio value={3} className={styles.coll_new_content_radio}>
                          <span className={styles.coll_new_content_radio_main}>粉丝和好友可见</span>
                          <span className={styles.coll_new_content_radio_sub}>
                            只有您的粉丝、好友和您自己可查看此收藏夹
                          </span>
                        </Radio>
                      </Radio.Group>
                    </Form.Item>
                    <Form.Item noStyle>
                      <div className={styles.coll_new_content_action}>
                        <Button
                          className={styles.coll_new_content_action_cancel}
                          onClick={() => handleShow(false)}
                        >
                          返回
                        </Button>
                        <Button
                          className={styles.coll_new_content_action_ok}
                          type="primary"
                          htmlType="submit"
                          loading={createCollectionGroupLoading}
                        >
                          创建收藏夹
                        </Button>
                      </div>
                    </Form.Item>
                  </Form>
                </div>
              </div>
            )}
          </div>
        )}
      </Modal>
    </span>
  );
};

export default Collection;
