import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Panel } from '@gemsorg/components';

import { RequestStates, requestStateProps } from '@gemsorg/app-utils';

import withSubmitState from '../hoc/withSubmitState';
import { authenticated } from '../hoc/authRules';

import Content from '../shared/Content';

import TaskActions from './actions/TaskActions';
import Cancelled from './actions/Cancelled';

import TaskForm from './TaskForm';
import SubmissionDialog from './SubmissionDialog';

import submitStateEffect from '../hoc/submitStateEffect';

import { submitTask, fetchTask, cancelTask } from '../../sagas/tasksSagas';
import { fetchJobs } from '../../sagas/jobsSagas';

import { makeAssignedJobSelector } from '../../selectors/jobsSelectors';
import { makeTaskSelector } from '../../selectors/tasksSelectors';

import {
  submitTaskStateSelector,
  reportTaskStateSelector,
  cancelTaskStateSelector,
} from '../../selectors/uiStateSelectors';

import { jobProps, taskProps } from '../shared/propTypes';

import styles from './Task.module.styl';

const ReportTaskStateEffect = submitStateEffect(reportTaskStateSelector);
const CancelTaskStateEffect = submitStateEffect(cancelTaskStateSelector);

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
  bindActionCreators(
    { submitTask, fetchTask, fetchJobs, cancelTask },
    dispatch
  );

class Task extends Component {
  static propTypes = {
    taskId: PropTypes.number.isRequired,
    job: PropTypes.shape(jobProps),
    task: PropTypes.shape(taskProps),
    submitState: requestStateProps.isRequired,

    submitTask: PropTypes.func.isRequired,
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
      reportMessage: null,
      cancelled: false,
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

  handleAssignComplete = () => {
    const { onResetSubmit } = this.props;
    onResetSubmit();
    this.setState({ reportMessage: null });
  };

  handleModuleError = reportMessage => {
    this.setState({ reportMessage });
  };

  handleCancelled = () => {
    this.setState({ cancelled: true });
  };

  render() {
    const { submitState, job, taskId, task } = this.props;
    const { jobId, reportMessage, cancelled } = this.state;

    const formVisible = job && task && !cancelled;

    const title = cancelled ? 'Task cancelled' : (job && job.name) || '';

    return (
      <Content title={title}>
        {formVisible && (
          <Panel className={styles.container}>
            <TaskActions
              taskId={taskId}
              form={job.taskForm}
              reportMessage={reportMessage}
            />
            <TaskForm
              form={job.taskForm}
              taskData={task.taskData}
              contextData={job}
              submitState={submitState}
              onSubmit={this.handleSubmit}
              onModuleError={this.handleModuleError}
            />
          </Panel>
        )}
        {cancelled && <Cancelled />}
        <ReportTaskStateEffect onComplete={this.handleCancelled} />
        <CancelTaskStateEffect onComplete={this.handleCancelled} />
        {submitState.state === RequestStates.Fetched && (
          <SubmissionDialog
            jobId={jobId}
            onSubmitComplete={this.handleAssignComplete}
          />
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
