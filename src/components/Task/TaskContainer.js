import { connect } from 'react-redux';
import Task from './Task';

import { submitTask } from '../../sagas/tasksSagas';
import { authenticatedFunded } from '../hoc/authRules';

import { isFundedSelector } from '../../selectors/userSelectors';

const mapStateToProps = state => ({
  isFunded: isFundedSelector(state),
});

const mapDispatchToProps = {
  submitTask,
};

export default authenticatedFunded(connect(mapStateToProps, mapDispatchToProps)(Task));
