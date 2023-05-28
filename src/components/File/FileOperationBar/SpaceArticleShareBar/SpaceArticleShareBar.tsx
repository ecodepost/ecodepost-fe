import styles from './SpaceArticleShareBar.less';
import {ArticlePms} from '@/pages/typings';

interface SpaceArticleEditBarProps {
  article: Articlev1ArticleOnList;
  type: string; // spaceTop / normal / detail
  fetchRecommendList?: () => void;
  fetchArticleList?: (initpage?: number) => void;
  fetchSpaceTopList?: () => void;
  articlePms: ArticlePms;
}

const SpcaeArticleShareBar: React.FC<SpaceArticleEditBarProps> = (props) => {
  const { article } = props;

  const onClip = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(
        `${DOMAIN}/s/${article.spaceGuid}/d/${article.guid}`,
      );
    } else {
      const textarea = document.createElement('textarea');
      document.body.appendChild(textarea);
      // 隐藏此输入框
      textarea.style.position = 'fixed';
      textarea.style.clip = 'rect(0 0 0 0)';
      textarea.style.top = '10px';
      // 赋值
      textarea.value = `${DOMAIN}/s/${article.spaceGuid}/d/${article.guid}`;
      // 选中
      textarea.select();
      // 复制
      document.execCommand('copy', true);
      // 移除输入框
      document.body.removeChild(textarea);
    }
  };

  return (
    <>
      <div className={styles.popover}>
        <div className={styles.popover_item} onClick={onClip}>
          <span className={styles.popover_item_title}>复制链接</span>
        </div>
      </div>
    </>
  );
};

export default SpcaeArticleShareBar;
