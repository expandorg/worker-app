import { connect } from 'react-redux';
import Page from './Page';

import { fetchAuth, setError } from '../../actions/action-creators';
import { errorSelector, metamaskSelector } from '../../selectors/uiStateSelectors';
import { isAuthorizedSelector, isJoinedSelector, workerSelector, statsSelector } from '../../selectors/userSelectors';

const mapStateToProps = state => ({
  error: errorSelector(state),
  isAuthorized: isAuthorizedSelector(state),
  isJoined: isJoinedSelector(state),
  metamask: metamaskSelector(state),
  worker: workerSelector(state),
  stats: statsSelector(state),
});

const mapDispatchToProps = {
  fetchAuth,
  setError,
};

export default connect(mapStateToProps, mapDispatchToProps)(Page);
