import { useState } from 'react';
import { GetApiNotificationsTotal } from '@/services/base/api.gen';
import useRequestX from '@/hooks/useRequestX';

export default () => {
  const [unreadCount, setUnreadCount] = useState<number>(0);

  // 获取未读消息
  const unReadNotifyCountRequest = useRequestX(GetApiNotificationsTotal, {
    onSuccess: ({ code, data, msg }) => {
      setUnreadCount(data.unViewCount);
    },
  });

  return {
    unreadCount,
    setUnreadCount,
    unReadNotifyCountRequest,
  };
};
