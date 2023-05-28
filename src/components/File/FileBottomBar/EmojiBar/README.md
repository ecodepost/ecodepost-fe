# EmojiBar

这是对 Emoji 点赞区域的封装，可以直接调用

## 入参

```ts
/** type article/question只有api的区别，如果需要自己加类型在文件里的apiMap配下对应的api即可 */
type: 'article' | 'question';
/** emojiMap 对应 GET /articles/-/emojis这个接口返回的系统Emoji列表 */
emojiMap: EmojiItem[];
/** fileGuid 对应操作或者活动等等的guid */
fileGuid: string;
/** emojiList 对应文章列表中每篇文章的list，包含具体的点赞数量信息 */
emojiList: EmojiItem[];
setEmojiList: (emojiList: EmojiItem[]) => void;
/** selectedEmojis 对应当前用户在该篇文章操作过的emoji的id */
selectedEmojis: string[];
setSelectedEmojis: (emojiids: string[]) => void;
/** 弹窗可能会出现被遮挡的情况，无法通过z-index设置来恢复，需要挂载到滚动的父结点上 */
// https://github.com/ant-design/ant-design/issues/33693
mountid?: string;
```
