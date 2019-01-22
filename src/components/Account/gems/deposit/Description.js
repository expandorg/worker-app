import React from 'react';
import PropTypes from 'prop-types';

import styles from './DepositForm.module.styl';

const Description = ({ gemsBalance, isFetching }) => (
  <div className={styles.description}>
    <p className={styles.p}>
      In order to submit tasks you will first need to deposit at least 5 XPN
      (and at most 1000 XPN) via MetaMask.
    </p>
    <p className={styles.p}>
      You will not lose your deposited XPN even if your tasks are not accepted,
      and you can withdraw them again once your total balance is at least 500
      XPN.
    </p>
    <p className={styles.p}>
      {isFetching ? (
        <ins className={styles.loading} />
      ) : (
        <span>
          Your currently own{' '}
          <span className={styles.balance}>{gemsBalance}</span>
          &nbsp;XPN that are available to deposit.
        </span>
      )}
    </p>
  </div>
);

Description.propTypes = {
  gemsBalance: PropTypes.number.isRequired,
  isFetching: PropTypes.bool.isRequired,
};

export default Description;
