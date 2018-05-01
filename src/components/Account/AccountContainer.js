import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import Account from './Account';

import {
  logout,
  setTransactions,
} from '../../actions/action-creators';

import {
  fetchWorkerGemsBalance,
  depositGems,
  withdrawPayments,
  setGemsBalance,
} from '../../actions/gems-action-creators';

import { depositStageSelector } from '../../selectors/uiStateSelectors';
import { statsSelector, workerSelector, balanceSelector, transactionsSelector } from '../../selectors/userSelectors';

const mapStateToProps = state => ({
  stats: statsSelector(state),
  worker: workerSelector(state),
  gemsBalance: balanceSelector(state),
  depositStage: depositStageSelector(state),
  transactions: transactionsSelector(state),
});

const mapDispatchToProps = {
  logout,
  setGemsBalance,
  setTransactions,
  fetchWorkerGemsBalance,
  depositGems,
  withdrawPayments,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Account));
