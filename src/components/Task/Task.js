import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Panel } from '@gemsorg/components';

import withSubmitState from '../hoc/withSubmitState';
import { authenticated } from '../hoc/authRules';

import Content from '../shared/Content';
import TaskForm from './TaskForm';
import SubmissionDialog from './SubmissionDialog';

import {
  submitTask,
  fetchTask,
  reportTask,
  cancelTask,
} from '../../sagas/tasksSagas';
import { fetchJobs } from '../../sagas/jobsSagas';

import { makeAssignedJobSelector } from '../../selectors/jobsSelectors';
import { makeTaskSelector } from '../../selectors/tasksSelectors';

import { submitTaskStateSelector } from '../../selectors/uiStateSelectors';

import { requestStateProps, jobProps, taskProps } from '../shared/propTypes';
import { RequestStates } from '../../common/app/requestUiState';

import styles from './Task.module.styl';

const makeMapStateToProps = () => {
  const assignedJobSelector = makeAssignedJobSelector();
  const taskSelector = makeTaskSelector();
  return (state, props) => ({
    taskId: props.match.params.taskId,
    task: taskSelector(state, props.match.params.taskId),
    job: assignedJobSelector(state, props.match.params.taskId),
  });
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { submitTask, reportTask, fetchTask, fetchJobs, cancelTask },
    dispatch
  );

class Task extends Component {
  static propTypes = {
    taskId: PropTypes.string.isRequired,
    job: PropTypes.shape(jobProps),
    task: PropTypes.shape(taskProps),
    submitState: PropTypes.shape(requestStateProps).isRequired,

    submitTask: PropTypes.func.isRequired,
    reportTask: PropTypes.func.isRequired,
    cancelTask: PropTypes.func.isRequired,
    fetchJobs: PropTypes.func.isRequired,
    fetchTask: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onResetSubmit: PropTypes.func.isRequired,
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

  handleSubmit = form => {
    const { taskId, onSubmit } = this.props;
    onSubmit(() => this.props.submitTask(taskId, form));
  };

  handleCancel = () => {
    const { taskId } = this.props;
    this.props.cancelTask(taskId);
  };

  handleReport = (reason, message) => {
    const { taskId } = this.props;
    this.props.reportTask(taskId, reason, message);
  };

  render() {
    const { submitState, job, task, onResetSubmit } = this.props;
    const { jobId } = this.state;

    return (
      <Content title={(job && job.name) || ''}>
        <Panel className={styles.container}>
          {job &&
            task && (
              <TaskForm
                form={job.taskForm}
                taskData={task.taskData}
                contextData={job}
                submitState={submitState}
                onSubmit={this.handleSubmit}
                onReport={this.handleReport}
                onCancel={this.handleCancel}
              />
            )}
        </Panel>
        {submitState.state === RequestStates.Fetched && (
          <SubmissionDialog jobId={jobId} onAssignComplete={onResetSubmit} />
        )}
      </Content>
    );
  }
}

export default authenticated(
  withSubmitState(submitTaskStateSelector)(
    connect(
      makeMapStateToProps,
      mapDispatchToProps
    )(Task)
  )
);
