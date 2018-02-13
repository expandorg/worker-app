import { connect } from 'react-redux';
import App from '../components/App';
import { initWeb3, fetchAuth } from '../action-creators';

const mapStateToProps = state => ({
  error: state.error,
  isAuthorized: state.isAuthorized,
  isJoined: state.isJoined,
  title: state.pageTitle,
  metamask: state.metamask,
  worker: state.worker,
});

const mapDispatchToProps = {
  initWeb3,
  fetchAuth,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
