import {Form, Input} from 'antd';
import EmojiSpacePicker from '../EmojiSpacePicker/EmojiSpacePicker';
import styles from './EmojiInput.less';
import React from "react";

interface EmojiInputProps {
  marginTop?: number;
  width?: number;
  warningInfo?: string;
}

const EmojiInput: React.FC<EmojiInputProps> = (props) => {
  const {
    warningInfo = '请输入空间名称',
  } = props;
  return (
    <Input.Group
      compact
      className={styles.content_status_input_group}
      style={{ marginTop: props?.marginTop || 24, width: props?.width || '' }}
    >
      <Form.Item
        name="icon"
      >
        <EmojiSpacePicker
          emojiType={2}
          className={styles.content_status_box}
        />
      </Form.Item>
      <Form.Item
        name="name"
        rules={[
          {
            required: true,
            message: warningInfo,
          },
        ]}
        style={{
          width: 'calc(100% - 44px)',
        }}
      >
        <Input allowClear placeholder="输入空间名称" className={styles.content_status_input}/>
      </Form.Item>
    </Input.Group>
  );
};

export default EmojiInput;
