import 'highlight.js/styles/base16/papercolor-light.css';
import React, { forwardRef } from 'react';
import EditorPlate from '@/components/Editor/EditorPlate/EditorPlate';
import styles from './Editor.less';

interface EditorProps {
  readonly?: boolean;
  value?: any;
  initialValue?: any;
  onChange?: (value: any) => void;
  spaceGuid?: string;
  topHeader?: boolean;
}

const Editor: React.FC<EditorProps> = forwardRef((props, ref) => {
  const { readonly, value, onChange, spaceGuid, initialValue, topHeader = false } = props;

  const renderEditor = () => {
    return (
      <EditorPlate
        readonly={readonly}
        value={value}
        initialValue={initialValue}
        spaceGuid={spaceGuid}
        onChange={onChange}
        topHeader={topHeader}
      />
    );
  };
  return <div className={styles.editor_plate}>{renderEditor()}</div>;
});

export default Editor;
