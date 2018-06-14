import React from 'react';
import PropTypes from 'prop-types';
import Clipboard from 'react-clipboard.js';

import styles from './Transaction.module.styl';

const Transaction = ({ tx }) => (

  <div className={styles.container}>
    <div className={styles.content}>
      <div className={styles.tx}>{tx}</div>
      <Clipboard className={styles.copy} data-clipboard-text={tx}>Copy</Clipboard>
    </div>
    <a
      className={styles.link}
      href={`https://etherscan.io/tx/${tx}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      Follow transaction on Etherscan
    </a>
  </div>
);

Transaction.propTypes = {
  tx: PropTypes.string.isRequired,
};

export default Transaction;
