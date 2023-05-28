import { PostApiUploadToken } from '@/services/base/api.gen';
import useRequestX from '@/hooks/useRequestX';
import OSS from 'ali-oss';
import { useState } from 'react';

export default () => {
  const [ossClientMap, setOssClientMap] = useState<Map<string, OSS>>();
  const [isLocal, setIsLocal] = useState<boolean>(false);
  const newOss = (region, bucket, accessKeyId, accessSecret, stsToken, expiration) => {
    return new OSS({
      secure: true,
      // 填写Bucket名称。
      bucket: bucket,
      // yourRegion填写Bucket所在地域。以华东1（杭州）为例，Region填写为oss-cn-hangzhou。
      region: region,
      // 从STS服务获取的临时访问密钥（AccessKey ID和AccessKey Secret）。
      accessKeyId: accessKeyId,
      accessKeySecret: accessSecret,
      // 从STS服务获取的安全令牌（SecurityToken）。
      stsToken: stsToken,
      refreshSTSToken: async () => {
        // 向您搭建的STS服务获取临时访问凭证。
        const refreshRes = await PostApiUploadToken();
        if (refreshRes.code === 0) {
          const refreshResData = refreshRes.data.list.find((item) => item.bucket == bucket);
          return {
            accessKeyId: refreshResData.accessKeyId,
            accessKeySecret: refreshResData.accessKeySecret,
            stsToken: refreshResData.stsToken,
          };
        }
        return null;
      },
      // 刷新临时访问凭证的时间间隔，单位为毫秒。
      // todo 使用expiration，是个字符串，900s
      //
      refreshSTSTokenInterval: 800000,
    });
  };

  const PostApiUploadTokenRequest = useRequestX(PostApiUploadToken, {
    onSuccess: (res) => {
      const ossMapTmp = new Map<string, OSS>();
      if (res.data.mode === 'file') {
        // 此时为本地存储
        setIsLocal(true);
      } else {
        res.data.list.map((item) => {
          ossMapTmp[item.bucket] = newOss(
            item.region,
            item.bucket,
            item.accessKeyId,
            item.accessKeySecret,
            item.stsToken,
            item.expiration,
          );
        });

        setOssClientMap(ossMapTmp);
      }
    },
  });

  // 要根据current user初始化他
  const initUpload = (currentUser: MyUserInfo) => {
    if (!currentUser) return;
    PostApiUploadTokenRequest.run();
  };

  return {
    initUpload,
    isLocal,
    ossClientMap,
  };
};
