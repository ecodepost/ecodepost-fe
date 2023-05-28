import type React from 'react';
import {Visibility} from "@/enums/visibilitylevel";
import {AntSpaceGroupInfo, AntSpaceInfo} from "@/models/community";

export type TreeNode<T> = {
  name: string;
  guid: string;
  icon?: string;
  isAllowSet: number;
  isAllowCreateSpace: number; //  当为group的时候，会有这个属性
  meta?: T;
  visibility: Visibility;
  children?: TreeNode<T>[];
};

export type CommonProps<T> = {
  disableDrag?: boolean;
  nodes: TreeNode<T>[];
  activeKeys: React.Key[];
  offsetSize?: number;
  onTreeItemClick?: (node: TreeNode<T>, nodePath: TreeNode<T>[]) => void;
  onTreeNodeDrop?: (node: TreeNode<T>, parent: TreeNode<T>) => void;
  onTreeMove?: (node: TreeNode<T>, target: TreeNode<T>, direction: MoveDirection) => void;
  onLeafMove?: (node: TreeNode<T>, target: TreeNode<T>, direction: MoveDirection) => void;
};

export type _CommonProps<T> = CommonProps<T> & {
  openKeys: React.Key[];
  onToggleSpaceGroup: (node: TreeNode<T>) => void;
  nodePath: TreeNode<T>[];
  isOpen: (key: React.Key) => boolean;
  isActive: (key: React.Key) => boolean;
};

export type SpaceGroupInfoItem<T> = {
  spaceGroupInfo: AntSpaceGroupInfo;
  nodePath: TreeNode<T>[];
};

export type SpaceInfoItem<T> = {
  spaceInfo: AntSpaceInfo;
  nodePath: TreeNode<T>[];
};

export const _TREE_LEAF = 'TREE_LEAF';

export const _TREE = 'TREE';

export type MoveDirection = 'downwards' | 'upwards';
