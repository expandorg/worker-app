import { connect } from 'react-redux';
import { withRouter } from 'react-router';

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
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
