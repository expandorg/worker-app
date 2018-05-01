import { connect } from 'react-redux';
import Task from './Task';

import { fetchAuth } from '../../actions/action-creators';
import { submitTask } from '../../sagas/tasksSagas';
import { taskIsSubmittingSelector, errorSelector } from '../../selectors/uiStateSelectors';

const mapStateToProps = state => ({
  isSubmitting: taskIsSubmittingSelector(state),
  stats: state.stats,
  error: errorSelector(state),
  worker: state.worker,
});

const mapDispatchToProps = {
  submitTask,
  fetchAuth,
};

export default connect(mapStateToProps, mapDispatchToProps)(Task);
