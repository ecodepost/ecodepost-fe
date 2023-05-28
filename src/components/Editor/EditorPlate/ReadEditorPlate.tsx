import { useEffect, useState } from 'react';
import '@wangeditor/editor/dist/css/style.css'; // 引入 css
import { Editor } from '@wangeditor/editor-for-react';
import { IDomEditor, IEditorConfig } from '@wangeditor/editor';
import 'highlight.js/styles/base16/papercolor-light.css';
import classNames from 'classnames';
import styles from './EditorPlate.less';

// import { HeadingToolbar, ToolbarProps } from '@udecode/plate';

interface EditorProps {
  initialValue?: any;
  value?: any;
}

const EditorSlate = (props: EditorProps) => {
  const { value, initialValue } = props;
  const [editor, setEditor] = useState<IDomEditor | null>(null);

  // 编辑器配置
  const editorConfig: Partial<IEditorConfig> = {
    autoFocus: false,
    readOnly: true,
    placeholder: '',
  };

  // 及时销毁 editor ，重要！
  useEffect(() => {
    // 遍历 value
    if (value != null) {
      value.forEach((node) => {
        if (node.type == 'p') {
          node.type = 'paragraph';
        }
      });
    }

    if (initialValue != null) {
      initialValue.forEach((node) => {
        if (node.type == 'p') {
          node.type = 'paragraph';
        }
      });
    }

    return () => {
      if (editor == null) return;
      editor.destroy();
      setEditor(null);
    };
  }, [editor]);

  return (
    <>
      <div className={classNames('plate_editor', styles.read_editor)}>
        <Editor
          defaultContent={value || initialValue}
          defaultConfig={editorConfig}
          onCreated={setEditor}
          mode="default"
        />
      </div>
    </>
  );
};

export default EditorSlate;
