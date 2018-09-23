import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { authenticated } from '../hoc/authRules';

import { fetchTask } from '../../sagas/tasksSagas';
import { fetchJobs } from '../../sagas/jobsSagas';

import Task from './Task';
import Verification from './Verification';

import { makeTaskAssignmentSelector } from '../../selectors/assignmentsSelectors';
import { makeAssignedJobSelector } from '../../selectors/jobsSelectors';
import { makeTaskSelector } from '../../selectors/tasksSelectors';

import { jobProps, taskProps, assignmentProps } from '../shared/propTypes';

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

class TaskContainer extends Component {
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
    };
  }

  static getDerivedStateFromProps({ assignment }, state) {
    // keep assignment even if it's gone
    if (assignment && state.assignment !== assignment) {
      return {
        assignment,
      };
    }
    return null;
  }

  componentDidMount() {
    const { taskId } = this.props;
    this.props.fetchJobs();
    this.props.fetchTask(taskId);
  }

  render() {
    const { job, task, taskId } = this.props;
    const { assignment } = this.state;
    if (!assignment) {
      return null;
    }
    return assignment.responseId === null ? (
      <Task key={taskId} job={job} task={task} assignment={assignment} />
    ) : (
      <Verification
        key={taskId}
        job={job}
        task={task}
        assignment={assignment}
      />
    );
  }
}

export default authenticated(
  connect(
    makeMapStateToProps,
    mapDispatchToProps
  )(TaskContainer)
);
