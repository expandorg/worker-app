import { connect } from 'react-redux';

import Account from './Account';

import { logout } from '../../sagas/authSagas';
import { fetchGemsBalance, withdrawPayments } from '../../sagas/gemsSagas';

import { depositStageSelector, withdrawStateSelector } from '../../selectors/uiStateSelectors';
import { userSelector, gemBalanceSelector } from '../../selectors/userSelectors';

import { authenticated } from '../hoc/authRules';

const mapStateToProps = state => ({
  user: userSelector(state),
  gemsBalance: gemBalanceSelector(state),
  depositStage: depositStageSelector(state),
  withdrawState: withdrawStateSelector(state),
});

const mapDispatchToProps = {
  logout,
  fetchGemsBalance,
  withdrawPayments,
};

export default authenticated(connect(mapStateToProps, mapDispatchToProps)(Account));
