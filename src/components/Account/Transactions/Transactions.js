import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';

import { Table as T } from '@expandorg/components';

import { fetchTransactions } from '../../../sagas/transactionsSagas';
import { transactionsHistorySelector } from '../../../selectors/profileSelectors';

import Transaction from './Transaction';

import styles from './Transactions.module.styl';

export default function Transactions() {
  const dispatch = useDispatch();

  const transactions = useSelector(transactionsHistorySelector);

  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <T.ScrollContainer>
        <T.Table className={styles.container}>
          <T.Header>
            <T.HeaderCell className={cn(styles.hdr, styles.amt)}>
              AMT
            </T.HeaderCell>
            <T.HeaderCell className={styles.hdr}>Transaction Type</T.HeaderCell>
            <T.HeaderCell className={styles.hdr}>
              Transaction History
            </T.HeaderCell>
            <T.HeaderCell className={styles.hdr}>Etherscan Link</T.HeaderCell>
          </T.Header>
          {transactions.map(tx => (
            <Transaction key={tx.id} transaction={tx} />
          ))}
        </T.Table>
      </T.ScrollContainer>
    </div>
  );
}
