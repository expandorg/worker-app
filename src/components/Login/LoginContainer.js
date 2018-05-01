import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import Login from './Login';

import { login } from '../../actions/action-creators';

import { lockedSelector } from '../../selectors/uiStateSelectors';
import { isAuthorizedSelector, workerSelector, statsSelector } from '../../selectors/userSelectors';

const mapStateToProps = state => ({
  isAuthorized: isAuthorizedSelector(state),
  locked: lockedSelector(state),
  worker: workerSelector(state),
  stats: statsSelector(state),
});

const mapDispatchToProps = {
  login,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
