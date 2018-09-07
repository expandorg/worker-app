import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Panel, Button } from '@gemsorg/components';
import { ReportToggle } from '@gemsorg/components/modules';

import withSubmitState from '../hoc/withSubmitState';
import { authenticated } from '../hoc/authRules';

import Content from '../shared/Content';
import Report from '../shared/Report';

import TaskForm from './TaskForm';

import SubmissionDialog from './SubmissionDialog';
import CancelConfirmationDialog from './CancelConfirmationDialog';
import Cancelled from './Cancelled';
import submitStateEffect from '../hoc/submitStateEffect';

import {
  submitTask,
  fetchTask,
  reportTask,
  cancelTask,
} from '../../sagas/tasksSagas';
import { fetchJobs } from '../../sagas/jobsSagas';

import { makeAssignedJobSelector } from '../../selectors/jobsSelectors';
import { makeTaskSelector } from '../../selectors/tasksSelectors';

import {
  submitTaskStateSelector,
  reportTaskStateSelector,
} from '../../selectors/uiStateSelectors';

import { requestStateProps, jobProps, taskProps } from '../shared/propTypes';
import { RequestStates } from '../../common/app/requestUiState';

import styles from './Task.module.styl';

const ReportTask = withSubmitState(reportTaskStateSelector)(Report);
const ReportTaskStateEffect = submitStateEffect(reportTaskStateSelector);

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
    { submitTask, reportTask, fetchTask, fetchJobs, cancelTask },
    dispatch
  );

class Task extends Component {
  static propTypes = {
    taskId: PropTypes.number.isRequired,
    job: PropTypes.shape(jobProps),
    task: PropTypes.shape(taskProps),
    submitState: PropTypes.shape(requestStateProps).isRequired,

    submitTask: PropTypes.func.isRequired,
    reportTask: PropTypes.func.isRequired,
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
      cancelDialog: false,
      reportMessage: null,
      canceled: false,
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

  handleReport = (reason, message) => {
    const { taskId } = this.props;
    this.props.reportTask(taskId, reason, message);
  };

  handleToggleCancel = () => {
    this.setState(({ cancelDialog }) => ({ cancelDialog: !cancelDialog }));
  };

  handleCanceled = () => {
    this.setState({ canceled: true, cancelDialog: false });
  };

  render() {
    const { submitState, job, taskId, task } = this.props;
    const { jobId, cancelDialog, reportMessage, canceled } = this.state;

    const formVisible = job && task && !canceled;

    const title = canceled ? 'Task cancelled' : (job && job.name) || '';

    return (
      <Content title={title}>
        {formVisible && (
          <Panel className={styles.container}>
            <div className={styles.actions}>
              <ReportToggle form={job.taskForm}>
                {({ onHide, reasons }) => (
                  <ReportTask
                    onHide={onHide}
                    reasons={reasons}
                    report={reportMessage}
                    onReport={this.handleReport}
                  />
                )}
              </ReportToggle>
              <Button
                onClick={this.handleToggleCancel}
                size="small"
                theme="white"
                className={styles.cancel}
              >
                cancel
              </Button>
            </div>
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
        {canceled && <Cancelled />}
        {cancelDialog && (
          <CancelConfirmationDialog
            taskId={taskId}
            onHide={this.handleToggleCancel}
            onSubmitComplete={this.handleCanceled}
          />
        )}
        <ReportTaskStateEffect onComplete={this.handleCanceled} />
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
