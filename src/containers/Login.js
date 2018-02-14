import { connect } from 'react-redux';
import { replace } from 'react-router-redux';
import Login from '../components/Login';
import { login, setTitle } from '../action-creators';

const mapStateToProps = state => ({
  isAuthorized: state.isAuthorized,
  locked: state.locked,
  worker: state.worker,
  stats: state.stats,
});

const mapDispatchToProps = {
  login,
  replace,
  setTitle,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
