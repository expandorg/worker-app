import { connect } from 'react-redux';
import NotFound from '../components/NotFound';

const mapStateToProps = state => ({
  isAuthorized: state.isAuthorized,
  task: state.task,
});

export default connect(mapStateToProps)(NotFound);
