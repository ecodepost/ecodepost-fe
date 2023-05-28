import { Spin } from 'antd';
import React, { useEffect } from 'react';
import styles from './LoadMore.less';

interface LoadMoreProps {
  id: string;
  haveMore: boolean;
  onLoadMore: () => void;
  marginTop?: number;
}

const LoadMore: React.FC<LoadMoreProps> = (props) => {
  const { id, haveMore, onLoadMore, marginTop = 20 } = props;

  useEffect(() => {
    const intersectionObserver = new IntersectionObserver((entries) => {
      if (entries[0].intersectionRatio) {
        if (haveMore) onLoadMore();
      }
    });
    const loadMore = document.getElementById(`loadmore_${id}`);
    // @ts-ignore
    intersectionObserver.observe(loadMore);
  }, []);

  return (
    <div id={`loadmore_${id}`} className={styles.loadmore} style={{ marginTop }}>
      {haveMore && <Spin />}
    </div>
  );
};

export default LoadMore;
