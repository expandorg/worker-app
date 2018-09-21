import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Panel } from '@gemsorg/components';
import { Form, Module, FormDataProvider } from '@gemsorg/components/modules';

import { RequestStates, requestStateProps } from '@gemsorg/app-utils';

import withSubmitState from '../hoc/withSubmitState';

import Content from '../shared/Content';

import TaskActions from './actions/TaskActions';
import Cancelled from './actions/Cancelled';

import SubmissionDialog from './SubmissionDialog';

import submitStateEffect from '../hoc/submitStateEffect';

import { submitTask } from '../../sagas/tasksSagas';

import {
  submitTaskStateSelector,
  reportTaskStateSelector,
  cancelTaskStateSelector,
} from '../../selectors/uiStateSelectors';

import { jobProps, taskProps } from '../shared/propTypes';

import styles from './Task.module.styl';

const ReportTaskStateEffect = submitStateEffect(reportTaskStateSelector);
const CancelTaskStateEffect = submitStateEffect(cancelTaskStateSelector);

const mapDispatchToProps = dispatch =>
  bindActionCreators({ submitTask }, dispatch);

class Task extends Component {
  static propTypes = {
    jobId: PropTypes.number,
    taskId: PropTypes.number.isRequired,

    job: jobProps,
    task: taskProps,

    submitState: requestStateProps.isRequired,

    submitTask: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onResetSubmit: PropTypes.func.isRequired,
  };

  static defaultProps = {
    jobId: null,
    job: null,
    task: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      reportMessage: null,
      cancelled: false,
    };
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
    const { submitState, job, taskId, task, jobId } = this.props;
    const { reportMessage, cancelled } = this.state;

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
            <FormDataProvider formData={job}>
              <Form
                form={job.taskForm}
                variables={task.taskData}
                className={styles.form}
                errors={submitState.error}
                isSubmitting={submitState.state === RequestStates.Fetching}
                onSubmit={this.handleSubmit}
                onModuleError={this.handleModuleError}
              >
                {props => <Module {...props} />}
              </Form>
            </FormDataProvider>
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

export default withSubmitState(submitTaskStateSelector)(
  connect(
    null,
    mapDispatchToProps
  )(Task)
);
