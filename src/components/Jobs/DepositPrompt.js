import React from 'react';

import styles from './DepositPrompt.module.styl';

const DepositPrompt = () => (
  <div className={styles.disclaimer}>
    <p>
      *Before you can complete tasks to earn Gems,
      you will first have to deposit a small amount through the account page.<br />
      These Gems will not be lost, even if your task submissions are not accepted.
    </p>
    <p>
      For each task you submit, you must reserve 0.1 GEM tokens.<br />
      Once your tasks are either accepted or rejected,
      that reserve will be released so that you may complete more tasks.
    </p>
  </div>
);


export default DepositPrompt;
