import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { authenticated } from '../hoc/authRules';

import { fetchTask } from '../../sagas/tasksSagas';
import { fetchJobs } from '../../sagas/jobsSagas';

import Task from './Task';

import { makeAssignedJobSelector } from '../../selectors/jobsSelectors';
import { makeTaskSelector } from '../../selectors/tasksSelectors';

import { jobProps, taskProps } from '../shared/propTypes';

const makeMapStateToProps = () => {
  const assignedJobSelector = makeAssignedJobSelector();
  const taskSelector = makeTaskSelector();
  return (state, props) => ({
    taskId: +props.match.params.taskId,
    task: taskSelector(state, +props.match.params.taskId),
    job: assignedJobSelector(state, +props.match.params.taskId),
  });
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ fetchTask, fetchJobs }, dispatch);

class TaskContainer extends Component {
  static propTypes = {
    taskId: PropTypes.number.isRequired,
    job: jobProps,
    task: taskProps,
    fetchJobs: PropTypes.func.isRequired,
    fetchTask: PropTypes.func.isRequired,
  };

  static defaultProps = {
    job: null,
    task: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      jobId: (props.job && props.job.id) || null,
    };
  }

  static getDerivedStateFromProps({ job }, state) {
    if (job && state.jobId !== job.id) {
      return {
        jobId: job.id,
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
    const { jobId } = this.state;

    return <Task job={job} task={task} taskId={taskId} jobId={jobId} />;
  }
}

export default authenticated(
  connect(
    makeMapStateToProps,
    mapDispatchToProps
  )(TaskContainer)
);
