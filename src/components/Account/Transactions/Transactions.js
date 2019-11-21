import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Table as T } from '@expandorg/components';

import { fetchTransactions } from '../../../sagas/transactionsSagas';
import { makeTransactionsSelector } from '../../../selectors/transactionsSelectors';

import Transaction from './Transaction';

import styles from './Transactions.module.styl';

export default function Transactions() {
  const dispatch = useDispatch();
  const txsSelector = useMemo(makeTransactionsSelector, []);

  const [page] = useState(0);
  const transactions = useSelector(state => txsSelector(state, page));

  useEffect(() => {
    dispatch(fetchTransactions(page));
  }, [dispatch, page]);

  return (
    <div className={styles.container}>
      <T.ScrollContainer>
        <T.Table className={styles.container}>
          <T.Header>
            <T.HeaderCell className={styles.hdr}>AMT</T.HeaderCell>
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
