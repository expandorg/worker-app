import { connect } from 'react-redux';
import NotFound from '../components/NotFound';
import { setTitle } from '../actions/action-creators';

const mapStateToProps = state => ({
  isAuthorized: state.isAuthorized,
  task: state.task,
});

const mapDispatchToProps = {
  setTitle,
};

export default connect(mapStateToProps, mapDispatchToProps)(NotFound);
