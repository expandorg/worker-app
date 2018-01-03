import { connect } from 'react-redux';
import Account from '../components/Account';
import { logout, setTitle, withdrawPayments } from '../action-creators';

const mapStateToProps = state => ({
  worker: state.worker,
});

const mapDispatchToProps = {
  logout,
  setTitle,
  withdrawPayments,
};

export default connect(mapStateToProps, mapDispatchToProps)(Account);
