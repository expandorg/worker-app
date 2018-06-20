import React from 'react';
import PropTypes from 'prop-types';

import styles from './DepositForm.module.styl';

const Description = ({ gemsBalance }) => (
  <div className={styles.description}>
    <p className={styles.p}>
      In order to submit tasks you will first need to deposit at least 5 Gems
      (and at most 1000 Gems) from MetaMask.
    </p>
    <p className={styles.p}>
      You will not lose your deposited Gems even if your tasks are not accepted,
      and you can withdraw them again once your total balance is at least 500 Gems.
    </p>
    <p className={styles.p}>
      Your currently own <span className={styles.balance}>{gemsBalance}</span> Gems
      that are available to deposit.
    </p>
  </div>
);

Description.propTypes = {
  gemsBalance: PropTypes.number.isRequired,
};

export default Description;
