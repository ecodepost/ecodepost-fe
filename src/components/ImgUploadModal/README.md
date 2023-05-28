# ImgUploadModal

带有 OF 推荐、本地上传的图片上传弹窗

## 入参

```ts
/** 弹窗可见度的控制函数 */
setModalVisible: (visible: boolean) => void;
/** 图片比例 */
imgAspect: number;
/** 图片上传的状态 */
imgUploadLoading: boolean;
/** 图片上传前的检验函数 */
beforeUpload: (file: any) => void;
/** 外部已存在图片的url */
outerImageUrl: string;
/** 设置外部图片的函数 */
setOuterImageUrl: (url: string) => void;
/** 获取OF推荐的接口，返回形式应为 res.data.list -> string[] */
getRecommendImageUrl?: () => Promise<any>;
```
