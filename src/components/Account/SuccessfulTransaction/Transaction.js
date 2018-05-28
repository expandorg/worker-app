import React from 'react';
import PropTypes from 'prop-types';
import Clipboard from 'react-clipboard.js';

import styles from './SuccessfulTransaction.module.styl';

const Transaction = ({ tx }) => (
  <div>
    <div className={styles.input}>
      <div className={styles.inputContainer}>
        <span className={styles.value} id="input">{tx}</span>
      </div>
      <Clipboard className={styles.copyBtn} data-clipboard-text={tx}>
        Copy
      </Clipboard>
    </div>
    <br />
    <br />
    <a href={`https://etherscan.io/tx/${tx}`} target="_blank">
      Follow transaction on Etherscan
    </a>
  </div>
);

Transaction.propTypes = {
  tx: PropTypes.string.isRequired,
};

export default Transaction;
