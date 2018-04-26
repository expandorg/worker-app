import { connect } from 'react-redux';
import { replace } from 'react-router-redux';
import Login from './Login';
import { login } from '../../actions/action-creators';

const mapStateToProps = state => ({
  isAuthorized: state.isAuthorized,
  locked: state.locked,
  worker: state.worker,
  stats: state.stats,
});

const mapDispatchToProps = {
  login,
  replace,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
