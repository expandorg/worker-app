import { connect } from 'react-redux';
import Task from './Task';

import { submitTask } from '../../sagas/tasksSagas';
import { authenticatedFunded } from '../hoc/authRules';

import { taskIsSubmittingSelector, errorSelector } from '../../selectors/uiStateSelectors';
import { isFundedSelector } from '../../selectors/userSelectors';

const mapStateToProps = state => ({
  isSubmitting: taskIsSubmittingSelector(state),
  isFunded: isFundedSelector(state),
  error: errorSelector(state),
});

const mapDispatchToProps = {
  submitTask,
};

export default authenticatedFunded(connect(mapStateToProps, mapDispatchToProps)(Task));
