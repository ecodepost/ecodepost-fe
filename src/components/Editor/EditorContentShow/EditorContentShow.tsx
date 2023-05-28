import React, {useEffect, useState} from 'react';
import Editor from '@/components/Editor/ReadEditor';
import styles from './styles.less';
import {DownOutlined, UpOutlined} from '@ant-design/icons';
import {useIntl} from '@@/plugin-locale/localeExports';

interface EditorShowProps {
  file: Commonv1FileOnList;
  isOpenShowAll?: boolean;
}

const EditorContentShow: React.FC<EditorShowProps> = (props) => {
  const {file, isOpenShowAll} = props;
  const intl = useIntl();
  const [expand, setExpand] = useState<boolean>(false);
  const [summary, setSummary] = useState<any>();
  const [isShowMore, setIsShowMore] = useState<boolean>();
  const [content, setContent] = useState<any>();
  const i = (id: string) => intl.formatMessage({ id });

  const contentProcess = () => {
    if (file.format == 3) {
      if (typeof file.content === 'object') {
        return file.content;
      } else if (typeof file.content === 'string') {
        return JSON.parse(file.content);
      }
    } else {
      return '';
    }
  };

  useEffect(() => {
    if (!file.content) return;
    const contentInfo = contentProcess();
    setContent(contentInfo);

    if (isOpenShowAll) {
      if (file.format == 3) {
        setSummary(contentInfo);
      } else {
        setSummary('');
      }
    } else {
      if (file.format == 3) {
        if (contentInfo?.length > 4) {
          setSummary(contentInfo.slice(0, 4));
          setIsShowMore(true);
        } else {
          setSummary(contentInfo);
        }
      } else {
        setSummary('');
      }
    }
  }, [file, isOpenShowAll]);

  return (
    <>
      {expand ? (
        <>
          {content && <Editor value={content} />}
          <span className={styles.card_action_action} onClick={() => setExpand(false)}>
            {i('expand.retract')}&nbsp;
            <UpOutlined />
          </span>
        </>
      ) : (
        <>
          {summary && <Editor value={summary} />}
          {isShowMore && (
            <>
              <span className={styles.card_action_action} onClick={() => setExpand(true)}>
                展开更多&nbsp;
                <DownOutlined />
              </span>
            </>
          )}
        </>
      )}
    </>
  );
};

export default EditorContentShow;
