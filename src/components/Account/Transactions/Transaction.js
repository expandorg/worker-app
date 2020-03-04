import React from 'react';
import cn from 'classnames';

import PropTypes from 'prop-types';

import parse from 'date-fns/parse';
import format from 'date-fns/format';

import { Table as T } from '@expandorg/components';

import styles from './Transaction.module.styl';

export default function Transaction({ transaction }) {
  return (
    <T.Row className={styles.container}>
      <T.Cell className={cn(styles.cell, styles.amt)}>
        {transaction.value}
      </T.Cell>
      <T.Cell className={cn(styles.cell, styles.type)}>
        {transaction.type}
      </T.Cell>
      <T.Cell className={styles.cell}>
        {format(parse(transaction.created_at), 'MM/DD/YYYY')}
      </T.Cell>
      <T.Cell className={(styles.cell, styles.eth)}>
        {transaction.hash && (
          <a
            className={styles.link}
            href={`https://etherscan.io/tx/${transaction.hash}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {transaction.hash}
          </a>
        )}
      </T.Cell>
    </T.Row>
  );
}

Transaction.propTypes = {
  transaction: PropTypes.shape({
    id: PropTypes.number,
    type: PropTypes.string,
    created_at: PropTypes.string,
    hash: PropTypes.string,
    response_code: PropTypes.number,
    value: PropTypes.number,
  }).isRequired,
};
