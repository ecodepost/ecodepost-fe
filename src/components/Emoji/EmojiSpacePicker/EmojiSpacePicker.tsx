import {SmileOutlined} from '@ant-design/icons';
import {Button, Popover, Tabs} from 'antd';
import styles from './EmojiPicker.less';
import {useEffect, useState} from 'react';
import {emojiList} from '@/config/emoji';
import classNames from 'classnames';

const {TabPane} = Tabs;

type EmojiPickerProps = {
  value?: any;
  onChange?: (value: string) => void;
  /** ClassName of comment */
  className?: string;
  emojiVisible?: boolean;
  emojiType: number; // 1 a标签， 2 button
  disableClick?: boolean;
  isActive: boolean;
};

const EmojiSpacePicker = (props: EmojiPickerProps) => {
  const { emojiVisible, value, onChange, className, emojiType, disableClick, isActive } = props;

  const [emojiValue, setEmojiValue] = useState(value);
  console.log(emojiValue, '=======');

  const [popoverVisible, setPopoverVisible] = useState<boolean>(emojiVisible || false);

  const EmojiSmileysMap = emojiList.filter((item) => {
    return item.category === 'Smileys & Emotion';
  });
  const EmojiPeopleMap = emojiList.filter((item) => {
    return item.category === 'People & Body';
  });
  const EmojiAnimalsMap = emojiList.filter((item) => {
    return item.category === 'Animals & Nature';
  });
  const EmojiFoodMap = emojiList.filter((item) => {
    return item.category === 'Food & Drink';
  });
  const EmojiTravelMap = emojiList.filter((item) => {
    return item.category === 'Travel & Places';
  });
  const EmojiActivitiesMap = emojiList.filter((item) => {
    return item.category === 'Activities';
  });

  const handleClick = (event, emoji) => {
    onChange?.(emoji.emoji);
    setEmojiValue(emoji.emoji);
    setPopoverVisible(false);
    event.stopPropagation();
    event.preventDefault()
  };
  const content = (
    <div className={styles.container}>
      <Tabs defaultActiveKey="1">
        <TabPane
          tab={<SmileOutlined style={{ marginLeft: 'auto', marginRight: 'auto' }} />}
          key="1"
        >
          <div className={styles.tab_content}>
            {EmojiSmileysMap.map((emoji: { emoji: string }) => (
              <span
                className={styles.emoji}
                key={emoji.emoji}
                onClick={(event) => handleClick(event, emoji)}
              >
                {emoji.emoji}
              </span>
            ))}
          </div>
        </TabPane>
        <TabPane tab="👏" key="2" style={{ marginLeft: 'auto', marginRight: 'auto' }}>
          <div className={styles.tab_content}>
            {EmojiPeopleMap.map((emoji: { emoji: string }) => (
              <span
                className={styles.emoji}
                key={emoji.emoji}
                onClick={(event) => handleClick(event, emoji)}
              >
                {emoji.emoji}
              </span>
            ))}
          </div>
        </TabPane>
        <TabPane tab="🌍" key="3" style={{ marginLeft: 'auto', marginRight: 'auto' }}>
          <div className={styles.tab_content}>
            {EmojiTravelMap.map((emoji: { emoji: string }) => (
              <span
                className={styles.emoji}
                key={emoji.emoji}
                onClick={(event) => handleClick(event, emoji)}
              >
                {emoji.emoji}
              </span>
            ))}
          </div>
        </TabPane>
        <TabPane tab="🐵" key="4" style={{ marginLeft: 'auto', marginRight: 'auto' }}>
          <div className={styles.tab_content}>
            {EmojiAnimalsMap.map((emoji: { emoji: string }) => (
              <span
                className={styles.emoji}
                key={emoji.emoji}
                onClick={(event) => handleClick(event, emoji)}
              >
                {emoji.emoji}
              </span>
            ))}
          </div>
        </TabPane>
        <TabPane tab="🍯" key="5" style={{ marginLeft: 'auto', marginRight: 'auto' }}>
          <div className={styles.tab_content}>
            {EmojiFoodMap.map((emoji: { emoji: string }) => (
              <span
                className={styles.emoji}
                key={emoji.emoji}
                onClick={(event) => handleClick(event, emoji)}
              >
                {emoji.emoji}
              </span>
            ))}
          </div>
        </TabPane>
        <TabPane tab="🎳" key="6" style={{ marginLeft: 'auto', marginRight: 'auto' }}>
          <div className={styles.tab_content}>
            {EmojiActivitiesMap.map((emoji: { emoji: string }) => (
              <span
                className={styles.emoji}
                key={emoji.emoji}
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
    setPopoverVisible(visible);
  };

  useEffect(() => {
    setPopoverVisible(emojiVisible);
  }, [emojiVisible]);

  return (
    <>
      {disableClick ? (
        <>
          {emojiType == 1 && <a className={className}>{emojiValue || '#'}</a>}
          {emojiType == 2 && <Button className={className}>{emojiValue || '#'}</Button>}
        </>
      ) : (
        <Popover
          content={content}
          trigger="click"
          placement="bottomRight"
          className={styles.picker}
          zIndex={100}
          open={popoverVisible}
          onOpenChange={onVisibleChange}
          // https://github.com/ant-design/ant-design/issues/33693
          /** @ts-ignore */
          getPopupContainer={(triggerNode) =>
            props.mountid ? document.getElementById(props.mountid) : triggerNode.parentNode
          }
        >
          {emojiType == 1 && (
            <a className={classNames(isActive ? styles.tree_item_active : '', className)}>
              {emojiValue || '#'}
            </a>
          )}
          {emojiType == 2 && <Button className={className}>{emojiValue || '#'}</Button>}
          {emojiType == 3 && <a className={className}>{value || '#'}</a>}
        </Popover>
      )}
    </>
  );
};

export default EmojiSpacePicker;
