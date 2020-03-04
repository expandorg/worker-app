import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';

import { Table as T, Button } from '@expandorg/components';

import { fetchTransactions } from '../../../sagas/transactionsSagas';
import { transactionsHistorySelector } from '../../../selectors/profileSelectors';

import Transaction from './Transaction';

import styles from './Transactions.module.styl';

const Header = () => (
  <T.Header>
    <T.HeaderCell className={cn(styles.hdr, styles.amt)}>AMT</T.HeaderCell>
    <T.HeaderCell className={cn(styles.hdr, styles.type)}>
      Transaction Type
    </T.HeaderCell>
    <T.HeaderCell className={styles.hdr}>Date</T.HeaderCell>
    <T.HeaderCell className={styles.hdr}>Etherscan Link</T.HeaderCell>
  </T.Header>
);

const Empty = () => (
  <T.Row>
    <T.Cell className={styles.empty} colSpan={4}>
      no transactions
    </T.Cell>
  </T.Row>
);

export default function Transactions() {
  const dispatch = useDispatch();
  const { txs, next, fetching } = useSelector(transactionsHistorySelector);

  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

  const fetchNext = useCallback(() => {
    dispatch(fetchTransactions(next));
  }, [dispatch, next]);

  return (
    <T.ScrollContainer>
      <T.Table className={styles.table}>
        <Header />
        {txs.map(tx => (
          <Transaction key={tx.id} transaction={tx} />
        ))}
        {txs.length === 0 && <Empty />}
      </T.Table>
      {next && (
        <div className={styles.actions}>
          <Button
            size="small"
            theme="white-blue"
            disabled={fetching}
            onClick={fetchNext}
          >
            Next
          </Button>
        </div>
      )}
    </T.ScrollContainer>
  );
}
