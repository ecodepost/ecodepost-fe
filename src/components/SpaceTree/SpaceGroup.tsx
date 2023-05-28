import type { TreeNode } from '@/components/SpaceTree/type';
import { _TREE, _TREE_LEAF, SpaceGroupInfoItem, SpaceInfoItem } from '@/components/SpaceTree/type';
import Space from '@/components/SpaceTree/Space';
import React, { useMemo, useRef, useState } from 'react';
import classNames from 'classnames';
import { PlusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { useDrag, useDrop } from 'react-dnd';
import type { XYCoord } from 'dnd-core';

import { history, useIntl, useModel } from '@umijs/max';
import { Dropdown } from 'antd';
import UpdateGroup from '@/components/Space/UpdateGroup/UpdateGroup';
import CreateSpace from '@/components/Space/CreateSpace/CreateSpace';
import CreateGroup from '@/components/Space/CreateGroup/CreateGroup';
import styles from './SpaceGroup.less';
import { AntSpaceGroupInfo } from '@/models/community';
import { GuidType } from '@/enums/guidtype';
import useRequestX from '@/hooks/useRequestX';
import { PutApiCmtSpaceTreesChangeSort } from '@/services/base/api.gen';

type SubTreeProps<T> = {
  spaceGroupInfo: AntSpaceGroupInfo;
  onToggleSpaceGroup: (node: TreeNode<T>) => void; // 展开折叠空间分组
  isOpen: (key: React.Key) => boolean;
  isActive: (key: React.Key) => boolean;
};

function SpaceGroup<T>(props: SubTreeProps<T>) {
  const {
    initialState: { currentCmt },
  } = useModel('@@initialState');
  const {  GetApiCmtSpaceAllReq } = useModel('community', (model) => ({
    GetApiCmtSpaceAllReq: model.GetApiCmtSpaceAllReq,
  }));

  const { permission: cmtPms } = currentCmt;
  // 获取 url 上的 groupid
  const [updateGroupVisible, setUpdateGroupVisible] = useState<boolean>(false);
  const [updateGroupInfo, setUpdateGroupInfo] = useState<TreeNode<any>>();
  const [addSpaceVisible, setAddSpaceVisible] = useState<boolean>(false);
  const [addGroupVisible, setAddGroupVisible] = useState<boolean>(false);
  const [groupGuid, setGroupGuid] = useState<string>('');
  const intl = useIntl();
  const i = (id: string) => intl.formatMessage({ id });
  const { spaceGroupInfo, onToggleSpaceGroup, isOpen } = props;
  // 展示创建空间的弹窗
  const showCreateSpaceModal = (gGuid: string) => {
    setAddSpaceVisible(true);
    setGroupGuid(gGuid);
  };
  const nodePath = [];

  const disableDrag = !cmtPms?.isAllowManageCommunity;

  const { setName } = useModel('header');
  // 点击分组
  const handleClickSpaceGroup = (groupInfo: AntSpaceGroupInfo) => {
    history.push(`/g/${groupInfo.guid}`);
    setName(groupInfo.name);
  };

  const SpaceGroupMoreAndCreateButton = (group: AntSpaceGroupInfo) => (
    <span className={styles.toolIcons}>
      {(group?.isAllowCreateSpace || cmtPms?.isAllowCreateSpaceGroup) && (
        <Dropdown
          overlay={
            <div className={styles.dropDownContainer}>
              {group?.isAllowCreateSpace && (
                <div
                  className={styles.item}
                  onClick={(event) => {
                    showCreateSpaceModal(group.guid);
                    event.stopPropagation();
                  }}
                >
                  <span className={styles.item_text}>{i('cmtSidebar.popover.space.create')}</span>
                </div>
              )}
              {cmtPms?.isAllowCreateSpaceGroup && (
                <div
                  className={styles.item}
                  onClick={(event) => {
                    setAddGroupVisible(true);
                    event.stopPropagation();
                  }}
                >
                  <span className={styles.item_text}>{i('cmtSidebar.popover.group.create')}</span>
                </div>
              )}
            </div>
          }
          getPopupContainer={(triggerNode) => {
            return window.document.body;
          }}
        >
          <PlusCircleOutlined
            style={{ fontSize: '16px', color: '#fff' }}
            className={styles.addIcon}
            onClick={(event) => {}}
          />
        </Dropdown>
      )}
    </span>
  );

  const { children } = spaceGroupInfo;
  const dragDropRef = useRef<HTMLDivElement>(null);
  const [dropHover, setDropHover] = useState<'before' | 'after'>();
  const [, drag] = useDrag(() => ({
    type: _TREE,
    item: { spaceGroupInfo },
    canDrag: !disableDrag,
  }));
  console.log('item2', !disableDrag);
  const putSpaceTreeChangeSortRequest = useRequestX(PutApiCmtSpaceTreesChangeSort, {
    onSuccess: ({ code, data, msg }) => {
      GetApiCmtSpaceAllReq.run();
    },
  });

  const [dropProps, drop] = useDrop(
    () => ({
      accept: _TREE,
      hover(_, monitor) {
        const item = monitor.getItem<SpaceGroupInfoItem<T>>();
        if (!dragDropRef.current) return;
        if (item.spaceGroupInfo.guid === spaceGroupInfo.guid) {
          setDropHover(undefined);
          return;
        }

        const hoverBoundingRect = dragDropRef.current.getBoundingClientRect();
        const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
        const clientOffset = monitor.getClientOffset();
        const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

        if (hoverClientY > hoverMiddleY) {
          // move downwards
          setDropHover('after');
        } else {
          // move upwards
          setDropHover('before');
        }
      },
      drop(_, monitor) {
        const currentItem = monitor.getItem<SpaceGroupInfoItem<T>>();
        console.log('item', currentItem);

        // item是被拖动的元素
        // item会拖到spaceInfo 上面或者下面
        if (currentItem.spaceGroupInfo.guid === spaceGroupInfo.guid || !dropHover) return;
        putSpaceTreeChangeSortRequest.run({
          type: GuidType.SPACE_GROUP,
          spaceGroupGuid: currentItem.spaceGroupInfo.guid,
          targetSpaceGroupGuid: spaceGroupInfo.guid,
          dropPosition: dropHover,
        });

        // onTreeMove?.(item.node, spaceGroupInfo, dropHover);
      },
      collect(monitor) {
        return {
          isOver: monitor.isOver(),
        };
      },
    }),
    [dropHover, setDropHover],
  );

  const [leafDropProps, leafDropRef] = useDrop(
    () => ({
      accept: _TREE_LEAF,
      collect(monitor) {
        return {
          hovered: monitor.isOver(),
          canDrop: monitor.canDrop(),
        };
      },
      // 当space group没有子节点，从其他space group拖个节点会触发这个数据
      drop(_, monitor) {
        const currentItem = monitor.getItem<SpaceInfoItem<T>>();
        console.log('currentItem', currentItem);
        console.log('currentItem spaceGroupInfo', spaceGroupInfo);
        putSpaceTreeChangeSortRequest.run({
          type: GuidType.SPACE,
          spaceGuid: currentItem.spaceInfo.guid,
          parentSpaceGroupGuid: spaceGroupInfo.guid,
        });
      },
      // 如果不是这个space group的子节点，才可以drop到这个space group
      canDrop(_, monitor) {
        const item = monitor.getItem<SpaceInfoItem<T>>();
        const isChild =
          !!item && !!spaceGroupInfo.children?.find((c) => c.guid === item.spaceInfo.guid);
        return !isChild;
      },
    }),
    [spaceGroupInfo],
  );

  const newNodePath = useMemo(
    () => [...nodePath, spaceGroupInfo],
    [nodePath, spaceGroupInfo],
  ) as TreeNode<T>[];
  drag(drop(dragDropRef));

  return (
    <div style={{ marginBottom: '16px' }}>
      <div
        className={classNames(
          styles.sub_tree,
          isOpen(spaceGroupInfo.guid) ? styles.subTreeOpen : styles.subTreeClose,
          leafDropProps.canDrop && leafDropProps.hovered ? styles.sub_tree_drop_hovering : '',
          !!dropHover && dropProps.isOver ? styles[`sub_tree_drop_hover_${dropHover}`] : '',
        )}
        ref={leafDropRef}
      >
        <div
          className={classNames(
            styles.sub_tree_title,

            // 判断当前 url 是不是符合当前节点的 url
            // 如果是，就给当前节点添加 active 样式
            // 如果不是，就不添加
            // 用于判断当前节点是否被选中
            window.location.pathname === `/g/${spaceGroupInfo.guid}`
              ? styles.sub_tree_title_active
              : '',
          )}
          ref={dragDropRef}
        >
          {/* 打开，折叠空间分组的按钮 */}
          <div
            className={styles.sub_tree_title_arrow}
            onClick={() => onToggleSpaceGroup(spaceGroupInfo)}
          >
            <i
              className={classNames(
                'iconfont',
                'icon-mulumingdaosanjiao',
                styles.tree_icon,
                styles.title_icon,
              )}
            />
          </div>
          <div
            className={classNames(styles.node_title)}
            //  onClick(event: React.MouseEvent<HTMLButtonElement>): void
            onClick={(e) => {
              handleClickSpaceGroup(spaceGroupInfo);
            }}
            // onClick={buttonHandler}
          >
            {spaceGroupInfo.name}
          </div>
          {SpaceGroupMoreAndCreateButton(spaceGroupInfo)}
        </div>
        {/* 空间分组设置、创建空间、创建空组分组的按钮 */}
        <div className={styles.sub_tree_wrapper} onClick={() => {}}>
          {/* 以下在空间分组里面没有空间的时候，显示创建空间的按钮 */}
          {/* 如果node level = 1，那么说明是group，children为0的时候，并且有权限的时候，展示可以创建空间 */}
          {/* 因为这里已经是space group，可以在简化下 */}
          {/* 这里children因为没有，理论上是undefined，为了健壮性，判断下length */}
          {(spaceGroupInfo?.children?.length == 0 || spaceGroupInfo.children == undefined) && (
            <div className={styles.create_space_item}>
              <div
                className={styles.node_title}
                onClick={() => {
                  showCreateSpaceModal(spaceGroupInfo.guid);
                }}
              >
                <div
                  style={{
                    width: '20px',
                  }}
                >
                  <PlusOutlined />
                </div>
                <div>{i('cmtSidebar.popover.space.create')}</div>
              </div>
            </div>
          )}
          {/* 遍历children，显示空间组件 */}
          {children?.map((spaceInfo) => (
            <Space
              nodes={[]}
              activeKeys={[]}
              openKeys={[]}
              {...props}
              disableDrag={disableDrag}
              key={spaceInfo.guid}
              nodePath={newNodePath}
              spaceInfo={spaceInfo}
            />
          ))}
        </div>
      </div>
      {/* 创建分组 */}
      <CreateGroup
        visible={addGroupVisible}
        onClose={(event) => {
          setAddGroupVisible(false);
          event?.stopPropagation();
        }}
      />
      {/* 更新分组 */}
      {updateGroupInfo && (
        <UpdateGroup
          visible={updateGroupVisible}
          groupInfo={updateGroupInfo}
          onClose={(event) => {
            setUpdateGroupVisible(false);
            setUpdateGroupInfo(undefined);
            event?.stopPropagation();
          }}
        />
      )}
      {/* 创建空间 */}
      {groupGuid && (
        <CreateSpace
          visible={addSpaceVisible}
          groupGuid={groupGuid}
          onClose={() => {
            setAddSpaceVisible(false);
            setGroupGuid('');
          }}
        />
      )}
    </div>
  );
}

export default SpaceGroup;
