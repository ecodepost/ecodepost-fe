import type {TreeNode} from '@/components/SpaceTree/type';
import SpaceGroup from '@/components/SpaceTree/SpaceGroup';
import styles from './SpaceTree.less';
import React, {useEffect, useState} from 'react';
import {HTML5Backend} from 'react-dnd-html5-backend';
import {DndProvider} from 'react-dnd';
import {useModel} from "@umijs/max";

type TreeProps<T> = {
  // disableDrag?: boolean;
  // activeKeys: React.Key[];
  // onTreeItemClick?: (node: TreeNode<T>, nodePath: TreeNode<T>[]) => void;
  // onTreeNodeDrop?: (node: TreeNode<T>, parent: TreeNode<T>) => void;
  // onTreeMove?: (node: TreeNode<T>, target: TreeNode<T>, direction: MoveDirection) => void;
  // onLeafMove?: (node: TreeNode<T>, target: TreeNode<T>, direction: MoveDirection) => void;
};

function SpaceTree<T>(props: TreeProps<T>) {
  const {spaceAll} = useModel('community');
  // const { activeKeys } = props;
  const activeKeys = []
  console.log("spaceAll", spaceAll)

  const [openKeys, setOpenKeys] = useState<React.Key[]>([]);
  // 所有的空间分组节点默认打开
  useEffect(() => {
    const keySet = new Set<React.Key>(openKeys);
    spaceAll.tree.forEach((node) => {
      keySet.add(node.guid);
    });

    setOpenKeys([...keySet.values()]);
  }, []);

  // 打开或关闭空间分组
  const onToggleSpaceGroup = (node: TreeNode<T>) => {
    const keySet = new Set<React.Key>(openKeys);
    if (keySet.has(node.guid)) {
      keySet.delete(node.guid);
    } else {
      keySet.add(node.guid);
    }
    setOpenKeys([...keySet.values()]);
  };
  // 空间分组是否打开
  const isOpen = (key: React.Key) => openKeys.findIndex((k) => k === key) > -1;
  // 该节点是否被激活
  const isActive = (key: React.Key) => activeKeys.findIndex((k) => k === key) > -1;

  const _commonProps = {
    ...props,
    isOpen,
    openKeys,
    nodePath: [],
    isActive,
  };

  return (
    <div className={styles.tree}>
      <DndProvider backend={HTML5Backend}>
        {spaceAll.tree.map((spaceGroupInfo) => (
          <SpaceGroup
            {..._commonProps}
            onToggleSpaceGroup={onToggleSpaceGroup}
            spaceGroupInfo={spaceGroupInfo}
            key={spaceGroupInfo.guid}
          />
        ))}
      </DndProvider>
    </div>
  );
}

export default SpaceTree;
