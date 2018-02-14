import { connect } from 'react-redux';
import App from '../components/App';
import { initWeb3, fetchAuth, setError } from '../action-creators';

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
  initWeb3,
  fetchAuth,
  setError,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
