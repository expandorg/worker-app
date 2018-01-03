import { connect } from 'react-redux';
import App from '../components/App';
import { initWeb3, fetchAuth } from '../action-creators';

const mapStateToProps = state => ({
  error: state.error,
  isAuthorized: state.isAuthorized,
  task: state.task,
  title: state.pageTitle,
});

const mapDispatchToProps = {
  initWeb3,
  fetchAuth,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
