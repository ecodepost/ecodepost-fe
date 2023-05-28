import {SmileOutlined} from '@ant-design/icons';
import {Popover, Tabs} from 'antd';
import styles from './EmojiPicker.less';
import {useEffect, useState} from "react";

const {TabPane} = Tabs;

type EmojiPickerProps = {}

const EmojiPicker = (props: EmojiPickerProps) => {
  const {emojiMap, emojiVisible, handleEmojiClick} = props;

  const [popoverVisible, setPopoverVisible] = useState<boolean>(emojiVisible || false)

  const handleClick = (event, emoji) => {
    handleEmojiClick.call(null, emoji.id)
    event.stopPropagation()
  }
  const content = (
    <div className={styles.container}>
      <Tabs defaultActiveKey="1">
        <TabPane
          tab={<SmileOutlined style={{ marginLeft: 'auto', marginRight: 'auto' }} />}
          key="1"
        >
          <div className={styles.tab_content}>
            {emojiMap.map((emoji: { emoji: string; id: number }) => (
              <span
                className={styles.emoji}
                key={emoji.id}
                onClick={(event) => handleClick(event, emoji)}
              >
                {emoji.emoji}
              </span>
            ))}
          </div>
        </TabPane>
      </Tabs>
    </div>
  );

  const onVisibleChange = (visible) => {
    setPopoverVisible(visible)
  }

  useEffect(() => {
    setPopoverVisible(emojiVisible)
  }, [emojiVisible])

  return (
    <>
      <Popover
        content={content}
        trigger="click"
        placement="bottom"
        className={styles.picker}
        zIndex={100}
        visible={popoverVisible}
        onVisibleChange={onVisibleChange}
        // https://github.com/ant-design/ant-design/issues/33693
        /** @ts-ignore */
        getPopupContainer={(triggerNode) =>
          props.mountid ? document.getElementById(props.mountid) : triggerNode.parentNode
        }
      >
        {props.children}
      </Popover>
    </>
  );
};

export default EmojiPicker;
