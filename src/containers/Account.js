import { connect } from 'react-redux';
import Account from '../components/Account';
import { logout, setTitle, setTransactions, depositGems, withdrawPayments } from '../action-creators';

const mapStateToProps = state => ({
  stats: state.stats,
  worker: state.worker,
  transactions: state.transactions,
});

const mapDispatchToProps = {
  logout,
  setTitle,
  setTransactions,
  depositGems,
  withdrawPayments,
};

export default connect(mapStateToProps, mapDispatchToProps)(Account);
