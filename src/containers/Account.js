import { connect } from 'react-redux';
import Account from '../components/Account';
import { logout, setTitle, setGemsBalance, setTransactions, fetchWorkerGemsBalance, depositGems, withdrawPayments } from '../action-creators';

const mapStateToProps = state => ({
  stats: state.stats,
  worker: state.worker,
  gemsBalance: state.gemsBalance,
  transactions: state.transactions,
});

const mapDispatchToProps = {
  logout,
  setTitle,
  setGemsBalance,
  setTransactions,
  fetchWorkerGemsBalance,
  depositGems,
  withdrawPayments,
};

export default connect(mapStateToProps, mapDispatchToProps)(Account);
