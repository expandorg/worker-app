import { connect } from 'react-redux';
import Page from './Page';

import { fetchAuth, setError } from '../../actions/action-creators';
import { errorSelector } from '../../selectors/uiStateSelectors';

const mapStateToProps = state => ({
  error: errorSelector(state),
  isAuthorized: state.isAuthorized,
  isJoined: state.isJoined,
  title: state.pageTitle,
  metamask: state.metamask,
  worker: state.worker,
  stats: state.stats,
});

const mapDispatchToProps = {
  fetchAuth,
  setError,
};

export default connect(mapStateToProps, mapDispatchToProps)(Page);
