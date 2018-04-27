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

const mapStateToProps = state => ({
  stats: state.stats,
  worker: state.worker,
  gemsBalance: state.gemsBalance,
  depositStage: state.depositStage,
  transactions: state.transactions,
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
