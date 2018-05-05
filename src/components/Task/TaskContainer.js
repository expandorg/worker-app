import { connect } from 'react-redux';
import Task from './Task';

import { fetchAuth } from '../../sagas/userSagas';
import { submitTask } from '../../sagas/tasksSagas';

import { taskIsSubmittingSelector, errorSelector } from '../../selectors/uiStateSelectors';
import { workerSelector, statsSelector } from '../../selectors/userSelectors';

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
