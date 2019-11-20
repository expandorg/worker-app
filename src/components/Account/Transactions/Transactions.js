import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchTransactions } from '../../../sagas/transactionsSagas';
import { makeTransactionsSelector } from '../../../selectors/transactionsSelectors';

import Transaction from './Transaction';

import styles from './Transactions.module.styl';

export default function Transactions() {
  const dispatch = useDispatch();
  const jobSelector = useMemo(makeTransactionsSelector, []);
  const [page] = useState(0);

  const transactions = useSelector(state => jobSelector(state, page));

  useEffect(() => {
    dispatch(fetchTransactions(page));
  }, [dispatch, page]);

  return (
    <div className={styles.container}>
      <div className={styles.list}>
        {transactions.map(tx => (
          <Transaction key={tx.id} transaction={tx} />
        ))}
      </div>
    </div>
  );
}
