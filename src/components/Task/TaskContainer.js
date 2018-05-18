import { connect } from 'react-redux';
import Task from './Task';

import { submitTask } from '../../sagas/tasksSagas';
import { authenticatedFunded } from '../hoc/authRules';

import { taskIsSubmittingSelector, errorSelector } from '../../selectors/uiStateSelectors';
import { userSelector, statsSelector } from '../../selectors/userSelectors';

const mapStateToProps = state => ({
  isSubmitting: taskIsSubmittingSelector(state),
  error: errorSelector(state),
  stats: statsSelector(state),
  worker: userSelector(state),
});

const mapDispatchToProps = {
  submitTask,
};

export default authenticatedFunded(connect(mapStateToProps, mapDispatchToProps)(Task));
