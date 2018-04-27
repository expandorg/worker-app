import { connect } from 'react-redux';
import Task from './Task';

import { fetchAuth } from '../../actions/action-creators';
import { submitTask } from '../../actions/tasks-action-creators';

const mapStateToProps = state => ({
  isSubmitting: state.isSubmitting,
  stats: state.stats,
  error: state.error,
  worker: state.worker,
});

const mapDispatchToProps = {
  submitTask,
  fetchAuth,
};

export default connect(mapStateToProps, mapDispatchToProps)(Task);
