import {useEffect, useRef, useState} from 'react';
import {useDrag, useDrop} from 'react-dnd';
import {history, useModel, useParams} from '@umijs/max';
import type {XYCoord} from 'dnd-core';
import type {_CommonProps} from '@/components/SpaceTree/type';
import {_TREE_LEAF, SpaceInfoItem} from '@/components/SpaceTree/type';
import classNames from 'classnames';
import styles from './TreeItem.less';
import {messageInfo} from '../Message/Message';
import EmojiSpacePicker from '@/components/Emoji/EmojiSpacePicker/EmojiSpacePicker';
import {IsCmtSpaceActive} from '@/utils/GetUrlParams';
import {PutApiCmtSpaceTreesChangeSort, PutApiSpacesGuid} from '@/services/base/api.gen';
import {SpaceType} from "@/enums/spacetype";
import {AntSpaceInfo} from "@/models/community";
import {GuidType} from "@/enums/guidtype";
import useRequestX from "@/hooks/useRequestX";
import {pushSpace} from "@/utils/historypush/history";

type SpaceProps<T> = {
  spaceInfo: AntSpaceInfo;
} & _CommonProps<T>;

function Space<T>(props: SpaceProps<T>) {
  const {selectedSpace, GetApiCmtSpaceAllReq} = useModel('community');
  const [emojiVisible, setEmojiVisible] = useState<boolean>(false);
  const {spaceInfo, nodePath, disableDrag} = props;
  const [dropHover, setDropHover] = useState<'before' | 'after'>();
  const ref = useRef<HTMLDivElement>(null);

  const putSpaceTreeChangeSortRequest = useRequestX(PutApiCmtSpaceTreesChangeSort, {
    onSuccess: ({code, data, msg}) => {
      GetApiCmtSpaceAllReq.run()
    },
  });


  useEffect(() => {
  }, [ref.current, selectedSpace]);

  const [, drag] = useDrag(
    () => ({
      type: _TREE_LEAF,
      item: {
        spaceInfo,
        nodePath,
      },
      canDrag: !disableDrag,
    }),
    [spaceInfo],
  );

  const [{ canDrop, isOver }, drop] = useDrop(
    () => ({
      // accept 是一个标识，需要和对应的 drag 元素中 item 的 type 值一致，否则不能感应
      accept: _TREE_LEAF,
      canDrop(_, monitor) {
        return true;
      },
      // collect 函数，返回的对象会成为 useDrop 的第一个参数，可以在组件中直接进行使用
      collect(monitor) {
        return {
          canDrop: monitor.canDrop(),
          isOver: monitor.isOver(),
        };
      },
      hover(_, monitor) {
        const item = monitor.getItem<SpaceInfoItem<T>>();
        console.log("space hover", item)
        if (!ref.current) return;

        if (item.spaceInfo.guid === spaceInfo.guid) {
          setDropHover(undefined);
          return;
        }
        console.log("space hover2", item)

        const hoverBoundingRect = ref.current.getBoundingClientRect();
        const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
        const clientOffset = monitor.getClientOffset();
        const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

        if (hoverClientY > hoverMiddleY) {
          // move downwards
          setDropHover('after');
        } else {
          setDropHover('before');

          // move upwards
          // setDropHover('upwards');
        }
      },
      drop(_, monitor) {
        const currentItem = monitor.getItem<SpaceInfoItem<T>>();
        // item是被拖动的元素
        // item会拖到spaceInfo 上面或者下面
        if (currentItem.spaceInfo.guid === spaceInfo.guid || !dropHover) return;
        console.log("space drop", currentItem)
        console.log("space drop", spaceInfo)
        console.log("space drop", dropHover)

        putSpaceTreeChangeSortRequest.run({
          type: GuidType.SPACE,
          spaceGuid: currentItem.spaceInfo.guid,
          targetSpaceGuid: spaceInfo.guid,
          dropPosition: dropHover,
        });

        // onLeafMove?.(currentItem.spaceInfo, spaceInfo, dropHover);
      },
    }),
    [dropHover, setDropHover],
  );

  drag(drop(ref));
  // const handleOpenChange = (open: boolean) => {
  //   setDropDownSpaceSetting(open);
  // };

  // 每个空间上显示的更多按钮
  // const spaceMoreButton = (space: TreeNode<any>) => (
  //   <span className={styles.toolIcons}>
  //     {space?.isAllowSet === 1 && (
  //       <>
  //         <Dropdown
  //           overlay={
  //             <SpaceSetting
  //               guid={space.guid}
  //               nodeSpace={spaceInfo}
  //               setDropDownSpaceSetting={() => {
  //                 setDropDownSpaceSetting(false);
  //               }}
  //             />
  //           }
  //           placement="bottom"
  //           trigger={['hover']}
  //           onOpenChange={handleOpenChange}
  //           open={dropDownSpaceSetting}
  //           getPopupContainer={(triggerNode) => {
  //             return window.document.body;
  //           }}
  //         >
  //           <EllipsisOutlined style={{ fontSize: '16px' }} className={styles.tree_item_icon} />
  //         </Dropdown>
  //       </>
  //     )}
  //   </span>
  // );
  const handleChooseSpace = (info: AntSpaceInfo) => {
    if (info.spaceType === SpaceType.LINK) {
      const w = window.open('about:blank');
      if (info.link) {
        w.location.href = info.link;
      }
      return
    }
    // const space = info;
    // onTreeItemClick?.(spaceInfo, [...nodePath, spaceInfo]);
    // push 操作会自动选择是哪个space
    pushSpace(info.guid)
  };

  const handleUpdateEmojiIcon = async (e: string, guid: string) => {
    try {
      const res = await PutApiSpacesGuid(guid, { icon: e });
      if (res.code === 0) {
        setEmojiVisible(false);
      } else {
        messageInfo({
          content: res.msg,
          type: 'error',
        });
      }
    } catch (err) {
      messageInfo({
        content: err,
        type: 'error',
      });
    }
  };
  return (
    <div
      ref={ref}
      className={classNames(
        styles.tree_item,
        window.location.pathname.includes(`/s/${spaceInfo.guid}`)
          ? styles.tree_item_active
          : '',
        dropHover !== undefined && canDrop && isOver ? styles[`tree_item_hover_${dropHover}`] : '',
      )}
      style={{paddingLeft: `26px`}}
      /** @ts-ignore */
      onClick={(e) => {
        handleChooseSpace(spaceInfo);
      }}
      key={spaceInfo.guid}
    >
      <div className={styles.node_title}>
        <div className={styles.flex_column_center}>
          <EmojiSpacePicker
            emojiType={1}
            value={spaceInfo.icon}
            className={styles.emojiIcon}
            emojiVisible={emojiVisible}
            disableClick={!spaceInfo?.isAllowSet}
            onChange={(emoji) => handleUpdateEmojiIcon(emoji, spaceInfo.guid)}
            isActive={IsCmtSpaceActive(spaceInfo.guid)}
          />
          <span className={styles.item_title}>{spaceInfo.name}</span>
        </div>
        {/* 每个空间上显示的更多按钮 */}
        {/*{spaceMoreButton(node)}*/}
      </div>
    </div>
  );
}

export default Space;
