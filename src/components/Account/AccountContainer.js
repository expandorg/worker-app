import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import Account from './Account';

import { logout } from '../../sagas/userSagas';
import { fetchWorkerGemsBalance, withdrawPayments } from '../../sagas/gemsSagas';

import { depositStageSelector } from '../../selectors/uiStateSelectors';
import { statsSelector, workerSelector, balanceSelector } from '../../selectors/userSelectors';

const mapStateToProps = state => ({
  stats: statsSelector(state),
  worker: workerSelector(state),
  gemsBalance: balanceSelector(state),
  depositStage: depositStageSelector(state),
});

const mapDispatchToProps = {
  logout,
  fetchWorkerGemsBalance,
  withdrawPayments,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Account));
