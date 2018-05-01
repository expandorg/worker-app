import { connect } from 'react-redux';
import Task from './Task';

import { fetchAuth } from '../../actions/action-creators';
import { submitTask } from '../../sagas/tasksSagas';
import { taskIsSubmittingSelector, errorSelector, workerSelector, statsSelector } from '../../selectors/uiStateSelectors';

const mapStateToProps = state => ({
  isSubmitting: taskIsSubmittingSelector(state),
  error: errorSelector(state),
  stats: statsSelector(state),
  worker: workerSelector(state),
});

const mapDispatchToProps = {
  submitTask,
  fetchAuth,
};

export default connect(mapStateToProps, mapDispatchToProps)(Task);
