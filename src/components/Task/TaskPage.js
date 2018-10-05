import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { authenticated } from '../hoc/authRules';

import { fetchTask } from '../../sagas/tasksSagas';
import { fetchJobs } from '../../sagas/jobsSagas';

import Cancelled from './actions/Cancelled';

import Content from '../shared/Content';

import Task from './Task';
import Verification from './Verification';
import TaskVerificationNotification from './TaskVerificationNotification';

import { makeTaskAssignmentSelector } from '../../selectors/assignmentsSelectors';
import { makeAssignedJobSelector } from '../../selectors/jobsSelectors';
import { makeTaskSelector } from '../../selectors/tasksSelectors';
import {
  reportAssignmentStateSelector,
  cancelAssignmentStateSelector,
} from '../../selectors/uiStateSelectors';

import submitStateEffect from '../hoc/submitStateEffect';

import { jobProps, taskProps, assignmentProps } from '../shared/propTypes';

const ReportAssignmentStateEffect = submitStateEffect(
  reportAssignmentStateSelector
);
const CancelAssignmentStateEffect = submitStateEffect(
  cancelAssignmentStateSelector
);

const makeMapStateToProps = () => {
  const assignedJobSelector = makeAssignedJobSelector();
  const assignmentsSelector = makeTaskAssignmentSelector();
  const taskSelector = makeTaskSelector();
  return (state, props) => {
    const taskId = +props.match.params.taskId;
    return {
      taskId,
      assignment: assignmentsSelector(state, taskId),
      task: taskSelector(state, taskId),
      job: assignedJobSelector(state, taskId),
    };
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ fetchTask, fetchJobs }, dispatch);

class TaskPage extends Component {
  static propTypes = {
    taskId: PropTypes.number.isRequired,
    assignment: assignmentProps,
    job: jobProps,
    task: taskProps,
    fetchJobs: PropTypes.func.isRequired,
    fetchTask: PropTypes.func.isRequired,
  };

  static defaultProps = {
    assignment: null,
    job: null,
    task: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      assignment: props.assignment,
      cancelled: false,
    };
  }

  static getDerivedStateFromProps({ assignment }, state) {
    // keep assignment even if it's gone
    if (assignment && state.assignment !== assignment) {
      return {
        assignment,
        cancelled: false,
      };
    }
    return null;
  }

  componentDidMount() {
    const { taskId } = this.props;

    this.props.fetchJobs();
    this.props.fetchTask(taskId);
  }

  handleCancelled = () => {
    this.setState({ cancelled: true });
  };

  render() {
    const { job, task, taskId } = this.props;
    const { assignment, cancelled } = this.state;
    if (!assignment) {
      return null;
    }

    const title = cancelled ? 'Task cancelled' : (job && job.name) || '';

    return (
      <Content title={title}>
        {!cancelled &&
          (assignment.responseId === null ? (
            <Task key={taskId} job={job} task={task} assignment={assignment} />
          ) : (
            <Verification
              key={taskId}
              job={job}
              task={task}
              assignment={assignment}
            />
          ))}
        {cancelled && <Cancelled />}
        <ReportAssignmentStateEffect onComplete={this.handleCancelled} />
        <CancelAssignmentStateEffect onComplete={this.handleCancelled} />
        <TaskVerificationNotification assignment={assignment} />
      </Content>
    );
  }
}

export default authenticated(
  connect(
    makeMapStateToProps,
    mapDispatchToProps
  )(TaskPage)
);
