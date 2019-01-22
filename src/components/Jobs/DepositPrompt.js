import React from 'react';
import PropTypes from 'prop-types';

import styles from './DepositPrompt.module.styl';

const DepositPrompt = ({ visible }) => {
  if (!visible) {
    return null;
  }
  return (
    <div className={styles.disclaimer}>
      <p>
        *Before you can complete tasks to earn XPN, you will first have to
        deposit a small amount through the account page.
        <br />
        These XPN tokens will not be lost, even if your task submissions are not
        accepted.
      </p>
      <p>
        For each task you submit, you must reserve 0.1 XPN tokens.
        <br />
        Once your tasks are either accepted or rejected, that reserve will be
        released so that you may complete more tasks.
      </p>
    </div>
  );
};

DepositPrompt.propTypes = {
  visible: PropTypes.bool.isRequired,
};

export default DepositPrompt;
