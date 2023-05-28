import { useEffect, useState } from 'react';
import { message } from 'antd';
import {PostApiUploadPath, UploadLocalFile} from '@/services/base/api.gen';
import { UploadType } from '@/enums/spacetype';
import { useModel } from '@umijs/max';
import 'highlight.js/styles/base16/papercolor-light.css';
import classNames from 'classnames';
import styles from './EditorPlate.less';

import '@wangeditor/editor/dist/css/style.css'; // 引入 css
import { Editor, Toolbar } from '@wangeditor/editor-for-react';
import { IDomEditor, IEditorConfig, IToolbarConfig } from '@wangeditor/editor';
import {RcFile} from "antd/es/upload";

// import { HeadingToolbar, ToolbarProps } from '@udecode/plate';

interface EditorProps {
  readonly?: boolean;
  initialValue?: any;
  value?: any;
  onChange?: (value: any) => void;
  spaceGuid: string;
  topHeader?: boolean;
}

const EditorSlate = (props: EditorProps) => {
  const { readonly, value, initialValue, onChange, spaceGuid, topHeader = false } = props;
  const placeholder = !readonly ? '请输入...' : '';
  const [editor, setEditor] = useState<IDomEditor | null>(null);
  const toolbarConfig: Partial<IToolbarConfig> = {};

  // 编辑器配置
  const editorConfig: Partial<IEditorConfig> = {
    placeholder: '',
    MENU_CONF: {
      uploadImage: {
        async customUpload(file: File, insertFn: InsertFnType) {
          uploadFileToOss(file).then((url) => {
            insertFn(url, '', '');
          });
        },
      },
    },
  };

  const getBase64 = (file: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });


  // 全局唯一的oss client，这样只用初始化一次
  const { ossClientMap, isLocal } = useModel('upload');
  // 自定义上传
  const uploadFileToOss = (file) => {
    return new Promise(async (resolve, reject) => {
      const suffix = file.name.slice(file.name.lastIndexOf('.'));
      const fileName = Date.now() + suffix;
      const size = file.size;
      const ossPath = await PostApiUploadPath({
        fileName: fileName,
        type: UploadType.FILE,
        size: size,
        spaceGuid: spaceGuid,
      });
      if (ossPath.code !== 0) {
        message.error(ossPath.msg);
        return null;
      }

      const filePath = ossPath.data.path;
      // const fileType = getFileType(file.name)
      let result = null;
      // 判断文件是否超过100mb，如果超过则使用分片上传，否则使用简单上传
      // 此时判断是否为本地存储
      if (isLocal) {
        // 获取 file 的二进制数据
        let fileBinary = await getBase64(file as RcFile);

        // 调用新的 Api
        console.log('file: ', fileBinary);
        // 截去前面的 data:image/png;base64,
        fileBinary = fileBinary.split(',')[1];
        result = await UploadLocalFile({
          file: fileBinary,
          dstPath: filePath,
        });
        console.log("result",result)

        if (result?.code !== 0) {
          message.error('上传失败');
          reject(result);
          return;
        }
      } else {
        const ossClient = ossClientMap[ossPath.data.bucket];
        if (file.size / 1024 / 1024 > 100) {
          console.log('分片上传');
          // 分片上传，默认分片1Mb，如果想更改，请参考：https://help.aliyun.com/document_detail/383952.html
          result = await ossClient
            .multipartUpload(filePath, file, {
              progress: async (percent) => {
                // onProgress({ percent: percent * 100 });
              },
            })
            .catch((error) => {
              reject(error);
            });
        } else {
          console.log('简单上传');
          // 简单上传
          result = await ossClient
            .put(filePath, file, {
              // progress: async (percent) => {
              //   onProgress({percent: percent * 100})
              // },
            })
            .catch((error) => {
              reject(error);
            });
        }
        if (result?.res?.status !== 200) {
          message.error('上传失败');
          reject(result);
          return;
        }
      }


      return resolve(`${ossPath.data.cdnName}/${ossPath.data.path}`);
    });
  };

  useEffect(() => {
    return () => {
      if (editor == null) return;
      editor.destroy();
      setEditor(null);
    };
  }, [editor]);

  return (
    <>
      <div
        className={classNames(
          'plate_editor',
          styles.editor,
          topHeader ? styles.topHeader : styles.defaultHeader,
        )}
      >
        <div>
          <Toolbar
            editor={editor}
            defaultConfig={toolbarConfig}
            mode="default"
            style={{ borderBottom: '1px solid #ccc' }}
          />
          <Editor
            defaultContent={value || initialValue}
            defaultConfig={editorConfig}
            onCreated={setEditor}
            mode="default"
            onChange={(editor) => onChange(editor.children)}
          />
        </div>
      </div>
    </>
  );
};

export default EditorSlate;
