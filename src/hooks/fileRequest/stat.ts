import {useMemo} from "react";


export function useRequestFileStat(fileGuid: string, myFileStats: FileStatRes) {
  // const [selectedEmojis, setSelectedEmojis] = useState<number[]>();
  // const [isCollect, setIsCollect] = useState<boolean>();

  return useMemo(() => {
    // 如果存在，说明请求成功了，不再是undefined
    // 这样的好处，可以确保在请求没过来的时候，emoji，收藏，在undefined处于加载状态。有数据的时候才渲染。
    if (!myFileStats) {
      return {};
    }
    // 找到哪篇文章的
    const myEmoji = myFileStats.emojiList.find((item) => item.guid === fileGuid);
    // 找到选择id
    // setSelectedEmojis(myEmoji?.list?.map((item) => item.id) || []);
    const collectStat = myFileStats.collectList.find((item) => item.guid === fileGuid);
    // setIsCollect(collectStat?.isCollect || false);
    return {
      selectedEmojis: myEmoji?.list?.map((item) => item.id) || [],
      isCollect: collectStat?.isCollect || false,
    }
  }, [fileGuid, myFileStats]);


}
