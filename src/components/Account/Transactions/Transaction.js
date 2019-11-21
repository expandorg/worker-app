import React from 'react';
import PropTypes from 'prop-types';

import { Table as T } from '@expandorg/components';

import styles from './Transaction.module.styl';

export default function Transaction({ transaction }) {
  return (
    <T.Row className={styles.container}>
      <T.Cell className={styles.hdr}>{transaction.id}</T.Cell>
      <T.Cell className={styles.hdr}>{transaction.type}</T.Cell>
      <T.Cell className={styles.hdr}>{transaction.date}</T.Cell>
      <T.Cell className={styles.hdr}>
        <a
          className={styles.link}
          href={transaction.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {transaction.url}
        </a>
      </T.Cell>
    </T.Row>
  );
}

Transaction.propTypes = {
  transaction: PropTypes.shape({
    id: PropTypes.string,
    type: PropTypes.string,
    date: PropTypes.string,
    url: PropTypes.string,
  }).isRequired,
};
