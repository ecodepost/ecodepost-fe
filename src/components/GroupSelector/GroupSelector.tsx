import React from 'react';
import {useModel} from 'umi';
import styles from './GroupSelector.less';
import type {TreeNode} from '@/components/SpaceTree/type';
import {PutApiSpacesGuid} from '@/services/base/api.gen';
import useRequestX from '@/hooks/useRequestX';

type GroupSelectorProps<T> = {
  spaceGuid: string;
  nodes: TreeNode<T>[];
};
// 空间更换空间分组
const GroupSelector = (props: GroupSelectorProps<any>) => {
  const {GetApiCmtSpaceAllReq} = useModel('community');

  const PutApiSpacesGuidReq = useRequestX(PutApiSpacesGuid, {
    onSuccess: () => {
      GetApiCmtSpaceAllReq.run();
    },
  });

  return (
    <React.Fragment>
      <div className={styles.container}>
        {props.nodes
          .filter((node) => {
            if (node.children) {
              for (const object of node.children) {
                if (object.guid === props.spaceGuid) {
                  return false;
                }
              }
              return true;
            } else {
              return true;
            }
          })
          .map((node) => {
            return (
              <div
                className={styles.item}
                key={node.guid}
                onClick={(e) => {
                  PutApiSpacesGuidReq.run(props.spaceGuid, {
                    spaceGroupGuid: node.guid,
                  });
                  e.preventDefault();
                  e.stopPropagation();
                }}
              >
                <span className={styles.item_text}>
                  {node.icon ? node.icon + ' ' + node.name : node.name}
                </span>
              </div>
            );
          })}
      </div>
    </React.Fragment>
  );
};

export default GroupSelector;
