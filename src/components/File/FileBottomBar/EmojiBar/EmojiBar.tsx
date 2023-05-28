import {SmileOutlined} from '@ant-design/icons';
import {Tag} from 'antd';
import EmojiPicker from '../../../Emoji/EmojiPicker/EmojiPicker';
import styles from './EmojiBar.less';
import React, {useEffect, useState} from 'react';
import {useModel} from 'umi';
import type {CommunityAPI} from '@/services/community/typings';
import {messageInfo} from '@/components/Message/Message';
import {PutApiFilesGuidDecreaseEmoji, PutApiFilesGuidIncreaseEmoji} from "@/services/base/api.gen";
import useRequestX from "@/hooks/useRequestX";

interface EmojiBarProps {
  spaceGuid: string;
  selectedEmojis: number[];
  setSelectedEmojis: (emojiids: number[]) => void;
  initEmojiList: EmojiItem[];
  fileGuid: string;
  mountid?: string;
}

interface EmojiItem {
  emoji: string;
  id: number;
  cnt?: number;
}

// src/pages/Community/CmtHome/RecommendCardList.tsx
// src/pages/SpaceActivityDetail/SpaceActivityDetail.tsx
// src/pages/SpaceArticle/SpaceArticleList/SpaceArticleListCard/SpaceArticleListCard.tsx
const EmojiBar: React.FC<EmojiBarProps> = (props) => {
  const {
    selectedEmojis,
    setSelectedEmojis,
    initEmojiList,
    fileGuid,
    mountid,
    spaceGuid,
  } = props;

  const {spaceMap} = useModel('community');
  const [spaceEmojiList, setSpaceEmojiList] = useState<CommunityAPI.EmojiItem[]>();
  const [emojiList, setEmojiList] = useState<CommunityAPI.EmojiItem[]>(initEmojiList);

  useEffect(() => {
    if (spaceMap && spaceMap.get(spaceGuid)) {
      setSpaceEmojiList(spaceMap.get(spaceGuid).emojiList);
    }
  }, [spaceMap]);


  const PutApiFilesGuidIncreaseEmojiRequest = useRequestX(PutApiFilesGuidIncreaseEmoji, {})

  const PutApiFilesGuidDecreaseEmojiRequest = useRequestX(PutApiFilesGuidDecreaseEmoji, {})

  const handleEmojiClick = async (emojiid: number) => {
    const apiType = selectedEmojis.includes(emojiid) ? 'delete' : 'add';
    const apiMap = {
      add: PutApiFilesGuidIncreaseEmojiRequest,
      delete: PutApiFilesGuidDecreaseEmojiRequest,
    };
    try {
      const res = await apiMap[apiType].run(fileGuid, {
        emojiId: emojiid
      });
      if (res.code !== 0) {
        messageInfo({
          type: 'error',
          content: res.msg,
        });
        return
      }
      if (apiType === 'add') {
        setSelectedEmojis([...selectedEmojis, emojiid]);
      } else if (apiType === 'delete') {
        setSelectedEmojis(selectedEmojis.filter((item) => item !== emojiid));
      }
      const emojiItem = emojiList.find((item) => item.id === emojiid) || ({} as EmojiItem);
      const idx = emojiList.indexOf(emojiItem || ({} as EmojiItem));
      if (apiType === 'add') {
        Object.assign(emojiItem, {cnt: emojiItem?.cnt ? emojiItem?.cnt + 1 : 1});
      } else if (apiType === 'delete') {
        if (emojiItem?.cnt === 1) {
          delete emojiItem.cnt;
        } else {
          Object.assign(emojiItem, {cnt: emojiItem?.cnt ? emojiItem?.cnt - 1 : null});
        }
      }
      const newList = [...emojiList];
      newList.splice(idx, 1);
      newList.splice(idx, 0, emojiItem);
      setEmojiList(newList);

    } catch (err) {
      messageInfo({
        type: 'error',
        content: '操作失败' + ': ' + err,
      });
    }
  };

  return (
    <>
      {spaceEmojiList && selectedEmojis && (
        <div className={styles.card_action}>
          <EmojiPicker
            emojiMap={spaceEmojiList}
            handleEmojiClick={handleEmojiClick}
            mountid={mountid}
          >
            <Tag icon={<SmileOutlined/>} color="default" className={styles.card_action_tag}>
              +
            </Tag>
          </EmojiPicker>
          {emojiList?.map(
            (emoji) => {
              // console.log("emoji", emoji)
              // 当有cnt的时候展示
              if (emoji?.cnt && emoji.cnt > 0) {
                return (
                  <Tag
                    key={emoji.id}
                    color={selectedEmojis.includes(emoji.id) ? 'blue' : 'default'}
                    className={styles.card_action_tag}
                    onClick={() => handleEmojiClick(emoji.id)}
                  >
                    {emoji.emoji}&nbsp;{emoji.cnt}
                  </Tag>
                );
              }
              return null
            }
          )}
        </div>
      )}
    </>
  );
};

export default EmojiBar;
