import { connect } from 'react-redux';

import Account from './Account';

import { logout } from '../../sagas/authSagas';
import { fetchWorkerGemsBalance, withdrawPayments } from '../../sagas/gemsSagas';

import { depositStageSelector, withdrawStateSelector } from '../../selectors/uiStateSelectors';
import { statsSelector, userSelector, gemBalanceSelector } from '../../selectors/userSelectors';

import { authenticated } from '../hoc/authRules';

const mapStateToProps = state => ({
  stats: statsSelector(state),
  worker: userSelector(state),
  gemsBalance: gemBalanceSelector(state),
  depositStage: depositStageSelector(state),
  withdrawState: withdrawStateSelector(state),
});

const mapDispatchToProps = {
  logout,
  fetchWorkerGemsBalance,
  withdrawPayments,
};

export default authenticated(connect(mapStateToProps, mapDispatchToProps)(Account));
