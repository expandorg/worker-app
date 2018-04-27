import { connect } from 'react-redux';
import Page from './Page';

import { fetchAuth, setError } from '../../actions/action-creators';

const mapStateToProps = state => ({
  error: state.error,
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
