import 'highlight.js/styles/base16/papercolor-light.css';
import React, { forwardRef } from 'react';
import ReadEditorPlate from '@/components/Editor/EditorPlate/ReadEditorPlate';
import styles from './Editor.less';

interface EditorProps {
  value?: any;
  initialValue?: any;
}

const Editor: React.FC<EditorProps> = forwardRef((props, ref) => {
  const { value, initialValue } = props;

  const renderEditor = () => {
    return <ReadEditorPlate value={value} initialValue={initialValue} />;
  };
  return <div className={styles.editor_plate}>{renderEditor()}</div>;
});

export default Editor;
