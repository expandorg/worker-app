import { connect } from 'react-redux';
import Task from '../components/Task';
import { setTitle, submitTask, fetchAuth } from '../action-creators';

const mapStateToProps = state => ({
  isSubmitting: state.isSubmitting,
  stats: state.stats,
  error: state.error,
});

const mapDispatchToProps = {
  setTitle,
  submitTask,
  fetchAuth,
};

export default connect(mapStateToProps, mapDispatchToProps)(Task);
