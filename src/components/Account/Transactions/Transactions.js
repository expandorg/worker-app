import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';

import { Table as T, Button } from '@expandorg/components';

import { fetchTransactions } from '../../../sagas/transactionsSagas';
import { transactionsHistorySelector } from '../../../selectors/profileSelectors';

import Transaction from './Transaction';

import styles from './Transactions.module.styl';

export default function Transactions() {
  const dispatch = useDispatch();
  const { txs, next, fetching } = useSelector(transactionsHistorySelector);

  useEffect(() => {
    if (!fetching) {
      dispatch(fetchTransactions());
    }
  }, [dispatch, fetching]);

  const fetchNext = useCallback(() => {
    if (!fetching) {
      dispatch(fetchTransactions(next));
    }
  }, [dispatch, fetching, next]);

  return (
    <div className={styles.container}>
      <T.ScrollContainer>
        <T.Table className={styles.container}>
          <T.Header>
            <T.HeaderCell className={cn(styles.hdr, styles.amt)}>
              AMT
            </T.HeaderCell>
            <T.HeaderCell className={cn(styles.hdr, styles.type)}>
              Transaction Type
            </T.HeaderCell>
            <T.HeaderCell className={styles.hdr}>
              Transaction History
            </T.HeaderCell>
            <T.HeaderCell className={styles.hdr}>Etherscan Link</T.HeaderCell>
          </T.Header>
          {txs.map(tx => (
            <Transaction key={tx.id} transaction={tx} />
          ))}
        </T.Table>
        {next && (
          <div className={styles.actions}>
            <Button
              className={styles.next}
              size="small"
              disabled={fetching}
              theme="white-blue"
              onClick={fetchNext}
            >
              Next
            </Button>
          </div>
        )}
      </T.ScrollContainer>
    </div>
  );
}
