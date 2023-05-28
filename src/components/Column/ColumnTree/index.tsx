import React from 'react';
import { Button, Divider, Dropdown, Modal, Tree } from 'antd';
import useRequestX from '@/hooks/useRequestX';
import { DeleteApiColumnsGuid, PutApiColumnsChangeSort } from '@/services/base/api.gen';
import styles from './index.less';
import { DeleteOutlined, EditOutlined, MoreOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { DataNode, TreeProps } from 'antd/es/tree';
import {
  pushColumnCreate,
  pushFileDetail,
  pushFileEdit,
  pushFileSubCreate,
} from '@/utils/historypush/history';
import { LayoutSpaceProps } from '@/pages/typings';
import { GetUrlParams } from '@/utils/GetUrlParams';
import { useIntl } from '@umijs/max';
import classNames from 'classnames';

enum ArticleMenuKey {
  ADD = 'ADD',
  EDIT = 'EDIT',
  DELETE = 'DELETE',
}

type ColumnTreeProps = LayoutSpaceProps & {
  treeData: any;
  fetchTreeData: () => void;
};

const ColumnTree: React.FC<ColumnTreeProps> = (props) => {
  const { selectedSpace, spacePms, treeData, fetchTreeData } = props;
  const intl = useIntl();
  const i = (id: string) => intl.formatMessage({ id });

  const PutApiColumnsChangeSortRequest = useRequestX(PutApiColumnsChangeSort, {
    onSuccess: (res) => {
      fetchTreeData();
    },
  });

  const columnDeleteRequest = useRequestX(DeleteApiColumnsGuid, {
    onSuccess({ code, data, msg }) {
      fetchTreeData();
    },
  });

  const onDragEnter: TreeProps['onDragEnter'] = (info) => {
    console.log(info);
    // expandedKeys 需要受控时设置
    // setExpandedKeys(info.expandedKeys)
  };

  const onDrop: TreeProps['onDrop'] = (info) => {
    console.log(info);
    const dropKey = info.node.key as string;
    const dragKey = info.dragNode.key as string;
    const dropPos = info.node.pos.split('-');
    const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1]);

    const loop = (
      data: DataNode[],
      key: React.Key,
      callback: (node: DataNode, i: number, data: DataNode[]) => void,
    ) => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].key === key) {
          return callback(data[i], i, data);
        }
        if (data[i].children) {
          loop(data[i].children!, key, callback);
        }
      }
    };
    const data = [...treeData];

    // Find dragObject
    let dragObj: DataNode;
    loop(data, dragKey, (item, index, arr) => {
      arr.splice(index, 1);
      dragObj = item;
    });

    if (!info.dropToGap) {
      // Drop on the content
      loop(data, dropKey, (item) => {
        item.children = item.children || [];
        // where to insert 示例添加到头部，可以是随意位置
        item.children.unshift(dragObj);
      });
    } else if (
      ((info.node as any).props.children || []).length > 0 && // Has children
      (info.node as any).props.expanded && // Is expanded
      dropPosition === 1 // On the bottom gap
    ) {
      loop(data, dropKey, (item) => {
        item.children = item.children || [];
        // where to insert 示例添加到头部，可以是随意位置
        item.children.unshift(dragObj);
        // in previous version, we use item.children.push(dragObj) to insert the
        // item to the tail of the children
      });
    } else {
      let ar: DataNode[] = [];
      let i: number;
      loop(data, dropKey, (_item, index, arr) => {
        ar = arr;
        i = index;
      });
      if (dropPosition === -1) {
        ar.splice(i!, 0, dragObj!);
      } else {
        ar.splice(i! + 1, 0, dragObj!);
      }
    }

    // dropToGap：boolean类型，true代表拖拽到节点之间的缝隙中，false代表拖拽到节点上，即节点的内容区
    // 缝隙中：那么只改变顺序
    console.log(dropKey, dragKey, dropPos, dropPosition);
    console.log('info.dropToGap', info.dropToGap);
    console.log('info.dropToGap', info.dropPosition);
    if (info.dropToGap) {
      let dropPosition = '';
      if (info.dropPosition === -1) {
        dropPosition = 'before';
      } else {
        dropPosition = 'after';
      }
      PutApiColumnsChangeSortRequest.run({
        fileGuid: dragKey,
        dropPosition: dropPosition,
        targetFileGuid: dropKey,
      });
      // if (info.dropPosition === -1) {
      //   PutApiColumnsChangeSortRequest.run({
      //     fileGuid: dragKey,
      //     targetFileGuid: dropKey,
      //   });
      // } else {
      //   PutApiColumnsChangeSortRequest.run({
      //     fileGuid: dragKey,
      //     afterFileGuid: dropKey,
      //   });
      // }
      // 内容中，那么改变parent guid，排第一位
    } else {
      PutApiColumnsChangeSortRequest.run({
        fileGuid: dragKey,
        parentFileGuid: info.node.key as string,
      });
    }
    //
    // setTreeData(data);
  };

  const onSelect: TreeProps['onSelect'] = (selectedKeys, info) => {
    pushFileDetail(selectedSpace.guid, info.node.guid);
  };

  const items = [
    {
      label: '新增文章',
      key: ArticleMenuKey.ADD,
      icon: <PlusCircleOutlined />,
    }, // 菜单项务必填写 key
    {
      label: '修改',
      key: ArticleMenuKey.EDIT,
      icon: <EditOutlined />,
    },
    {
      label: '删除',
      key: ArticleMenuKey.DELETE,
      icon: <DeleteOutlined />,
    },
  ];

  const handleMenuClick = (e, dataNode) => {
    e.domEvent.stopPropagation();
    console.log('menu click', e.key);
    switch (e.key) {
      case ArticleMenuKey.ADD:
        console.log('menu click 1111');
        pushFileSubCreate(selectedSpace.guid, dataNode.guid || '');
        break;
      case ArticleMenuKey.DELETE:
        Modal.confirm({
          title: `确认删除文章 "${dataNode.title}" ?`,
          onOk() {
            columnDeleteRequest.run(dataNode.guid);
          },
        });
        break;
      case ArticleMenuKey.EDIT:
        pushFileEdit(selectedSpace.guid, dataNode.guid);
        break;
    }
  };

  const titleRender = (dataNode) => {
    console.log('titleRender', dataNode);
    return (
      <div className={styles.articleTitle}>
        {dataNode.children.length > 0 && dataNode.parentGuid == undefined && (
          <span className={classNames(styles.treeTitle)}>{dataNode.title}</span>
        )}
        {dataNode.children.length == 0 && dataNode.parentGuid == undefined && (
          <span className={classNames(styles.treeTitle, styles.treeTitlePadding)}>
            {dataNode.title}
          </span>
        )}
        {dataNode.parentGuid != undefined && (
          <span className={classNames(styles.treeTitleOnly)}>{dataNode.title}</span>
        )}
        {spacePms.isAllowManage && (
          <div className={styles.articleMenu}>
            <Dropdown
              menu={{
                items,
                onClick: (e) => {
                  handleMenuClick(e, dataNode);
                },
              }}
            >
              <MoreOutlined className={styles.moreBtn} />
            </Dropdown>
          </div>
        )}
      </div>
    );
  };

  const handleCreateArticle = (parentGuid?: string) => {
    pushColumnCreate(selectedSpace.guid, parentGuid);
  };

  return (
    <>
      <div className={styles.sidebar_box}>
        <div className={styles.sidebar}>
          <div className={styles.sidebar_content_header}>
            <span className={styles.sidebar_content_title}>{i('toc')}</span>
            <Button
              type="primary"
              className={styles.sidebar_content_btn}
              onClick={() => handleCreateArticle(GetUrlParams(location.search)?.articleGuid)}
              disabled={!spacePms?.isAllowCreateFile}
            >
              <PlusCircleOutlined className={styles.sidebar_content_btn_icon} />
              <span className={styles.sidebar_content_btn_text}>{i('article.tree.publish')}</span>
            </Button>
          </div>
          {treeData && (
            <div className={styles.tree_container}>
              <Tree
                switcherIcon={
                  <a
                    className={classNames('iconfont', 'icon-shequmingxiala', styles.switch_icon)}
                  ></a>
                }
                className="draggable-tree"
                defaultExpandAll={true}
                titleRender={titleRender}
                // defaultExpandedKeys={expandedKeys}
                onSelect={onSelect}
                draggable={{
                  icon: false,
                  nodeDraggable: () => {
                    return spacePms?.isAllowManage;
                  },
                }}
                blockNode
                onDragEnter={onDragEnter}
                onDrop={onDrop}
                treeData={treeData}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ColumnTree;
