# Editor

## 入参

```ts
/** 编辑器所在区域 */
type: 'avatar' | 'article' | 'community' | 'article_headimg' | 'question' | 'activity';
/** 编辑器的初始值 */
content: string;
/** 设置编辑器内容的回调 */
setContent: (content: string) => void;
/** 编辑器初始插入的图片url */
ossImages: string[];
/** 编辑器插入图片并返回图片url的回调 */
setOSSImages: (images: string[]) => void;
```

## 支持

- 撤销、重做
- 标题
- 加粗
- 下划线
- 删除线
- 引用
- 缩进
- 上传图片（按钮）
- 粘贴图片
- 拖拽图片
- Markdown 语法
- 代码段高亮
