import { connect } from 'react-redux';
import Page from './Page';

import { clearErrors } from '../../sagas/appSagas';
import { fetchAuth } from '../../sagas/userSagas';
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
  clearErrors,
};

export default connect(mapStateToProps, mapDispatchToProps)(Page);
