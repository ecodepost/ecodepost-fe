import styles from './Third.less';
import React from 'react';
import DefaultHeader from '@/components/Header/DefaultHeader/DefaultHeader';

const Third = () => {
  return (
    <React.Fragment>
      <DefaultHeader />
      <div className={styles.third}>
        <></>
      </div>
    </React.Fragment>
  );
};

export default Third;
