import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload } from 'antd';
import React from 'react';
import { PostApiUploadPath, UploadLocalFile } from '@/services/base/api.gen';
import { useModel } from 'umi';
import type { RcFile } from 'antd/es/upload';
import { UploadType } from '@/enums/spacetype';

interface OSSUploadProps {
  setImageLoading?: (boolean) => void;
  value?: string;
  onChange?: (value: string) => void;
  children?: React.ReactNode;
  spaceGuid?: string;
  uploadType: UploadType;
  /** ClassName of comment */
  className?: string;
  style?: React.CSSProperties;
}

// https://segmentfault.com/a/1190000042604023?utm_source=sf-similar-article
export const OSSUpload = (props: OSSUploadProps) => {
  const { value, onChange, uploadType, spaceGuid, className, children, setImageLoading } = props;
  // 全局唯一的oss client，这样只用初始化一次
  const { ossClientMap, isLocal } = useModel('upload');

  // 上传文件前判断单个文件是否超过500mb，如果超过不允许上传
  // todo 如果有crop，那么就不能用这个，后续排查
  function beforeUploadFile(file, fileList) {
    const isLt500M = file.size / 1024 / 1024 > 500;
    if (isLt500M) {
      message.warning('超过最大文件上传大小500Mb');
      return false;
    }
    setImageLoading?.(true);
    return true; // 不调用默认的上传方法
  }

  // todo  上传文件状态回调
  function onUploadFileChange(info) {
    onChange?.(info?.file?.response?.url);
    setImageLoading?.(false);
    // 把没有status的文件过滤掉(没有status的文件说明是取消上传的文件)
    if (info.file.status) {
      // setFileTaskDlg({
      //   show: true,
      //   task: info
      // })
      // if (info.file.status === 'done') {
      //   dispatch(getFileListByCid({
      //     cid: query.cid
      //   }))
      // }
      // if (info.file.status === 'error') {
      //   dispatch(getFileListByCid({
      //     cid: query.cid
      //   }))
      // }
    }
  }

  const getBase64 = (file: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  // 自定义上传
  function uploadFileToOss(options) {
    const { file, onProgress, onSuccess, onError } = options;

    return new Promise(async (resolve, reject) => {
      const suffix = file.name.slice(file.name.lastIndexOf('.'));
      const fileName = Date.now() + suffix;
      const size = file.size;
      const ossPath = await PostApiUploadPath({
        fileName: fileName,
        type: uploadType,
        size: size,
        spaceGuid: spaceGuid,
      });
      if (ossPath.code !== 0) {
        message.error(ossPath.msg);
        return;
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
                onProgress({ percent: percent * 100 });
              },
            })
            .catch((error) => {
              onError(error);
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
              onError(error);
              reject(error);
            });
        }
        if (result?.res?.status !== 200) {
          message.error('上传失败');
          reject(result);
          return;
        }
      }

      await uploadFileCallback(
        result,
        {
          file,
          filePath,
          url: `${ossPath.data.cdnName}/${ossPath.data.path}`,
          // fileType
        },
        (res) => {
          onSuccess(res);
          resolve(result);
        },
      );
    });
  }

  async function uploadFileCallback(result, data, callback) {
    // const ossPath = result.res.requestUrls[0].split('?')[0]
    // const url = ossPath.replace(/^http:\/\//i, 'https://')
    const newFileRes = {
      status: result?.res?.status,
      name: result?.name,
      url: data.url,
    };
    // 上传成功之后往后台数据库插入一条文件数据
    // await dispatch(addFile({
    //   fileName: data.file.name,
    //   filePath: data.filePath,
    //   fileSize: data.file.size,
    //   fileContentType: data.fileType,
    //   categoryId: query.cid,
    // }))
    callback(newFileRes);
  }

  // accessKeyId: "STS.NUNqNxPWwCo69cjM5MthGwSnC"
  // accessKeySecret: "34ndHQfW5EnUyyBGbarNNbgEVZcTYZw5wjxqnVbLjB7L"
  // bucket: "gocn-cdn"
  // cdnName: "https://${CDN_DOMAIN}"
  // expiration: "2022-10-24T09:26:44Z"
  // path: "gocn-cdn/ofimage/article/bPMDkrxK5x/20221024/154a1b4bac3b45168a68657375c85f18.jpg"
  // region: "oss-cn-beijing"
  // stsToken: "CAISywJ1q6Ft5B2yfSjIr5b7
  return (
    <>
      {uploadType && (
        <Upload
          {...props}
          style={{ display: 'inline' }}
          name="file"
          className={className}
          listType="picture"
          customRequest={uploadFileToOss}
          // beforeUpload={beforeUploadFile}
          showUploadList={false}
          withCredentials={true}
          onChange={onUploadFileChange}
        >
          {/*<Image  className={className} src={value}/>*/}
          {typeof children !== 'undefined' ? (
            (children as React.ReactElement)
          ) : (
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          )}
        </Upload>
      )}
    </>
  );
};
