import React from 'react';
import styles from './SpaceContainer.less';

interface SpaceContainerProps {}

const SpaceContainer: React.FC<SpaceContainerProps> = (props) => {
  return <div className={styles.container}>{props.children}</div>;
};
export default SpaceContainer;
