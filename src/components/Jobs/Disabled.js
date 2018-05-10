import React from 'react';

import Content from '../shared/Content';

import styles from './Disabled.module.styl';

const Disabled = () => (
  <Content title="Browse Jobs">
    <div className={styles.innerContainer}>
      There are currently no available jobs. Please check back soon!
    </div>
  </Content>
);

export default Disabled;
