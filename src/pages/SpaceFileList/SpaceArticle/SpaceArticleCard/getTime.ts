import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);
dayjs.locale('zh-cn');
export function getTime(time: number) {
  const t = dayjs.unix(time).fromNow(true).split('');
  const cTemp = t[t.length - 1]
  if (cTemp !='年'&& cTemp != '月' && cTemp !='天') {
    return dayjs.unix(time).fromNow().replace('', '');
  }
  return dayjs.unix(time).format('MM-DD');
}
