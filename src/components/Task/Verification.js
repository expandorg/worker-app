import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Panel } from '@gemsorg/components';
import {
  Form,
  Module,
  FormDataProvider,
  calculateVerificationScore,
  moduleControls,
} from '@gemsorg/components/modules';

import { RequestStates, requestStateProps } from '@gemsorg/app-utils';

import withSubmitState from '../hoc/withSubmitState';
import submitStateEffect from '../hoc/submitStateEffect';

import Content from '../shared/Content';

import TaskActions from './actions/TaskActions';
import Cancelled from './actions/Cancelled';

import SubmissionDialog from './SubmissionDialog';

import { verifyResponse } from '../../sagas/responsesSagas';

import { makeVerficationVarsSelector } from '../../selectors/responsesSelectors';
import {
  verifyResponseStateSelector,
  reportTaskStateSelector,
  cancelTaskStateSelector,
} from '../../selectors/uiStateSelectors';

import { jobProps, taskProps, assignmentProps } from '../shared/propTypes';

import styles from './styles.module.styl';

const ReportTaskStateEffect = submitStateEffect(reportTaskStateSelector);
const CancelTaskStateEffect = submitStateEffect(cancelTaskStateSelector);

const makeMapStateToProps = () => {
  const varsSelector = makeVerficationVarsSelector();
  return (state, props) => ({
    variables: varsSelector(state, props.task, props.assignment),
  });
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ verifyResponse }, dispatch);

class Task extends Component {
  static propTypes = {
    assignment: assignmentProps.isRequired,
    job: jobProps,
    task: taskProps,
    variables: PropTypes.shape({}),

    submitState: requestStateProps.isRequired,

    verifyResponse: PropTypes.func.isRequired,

    onSubmit: PropTypes.func.isRequired,
    onResetSubmit: PropTypes.func.isRequired,
  };

  static defaultProps = {
    variables: null,
    job: null,
    task: null,
  };

  state = {
    reportMessage: null,
    cancelled: false,
  };

  handleSubmit = result => {
    const { job, assignment, onSubmit } = this.props;
    const score = calculateVerificationScore(
      result,
      job.verificationForm.modules,
      moduleControls
    );
    onSubmit(() => this.props.verifyResponse(assignment.responseId, score));
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
    const { submitState, assignment, job, task, variables } = this.props;
    const { reportMessage, cancelled } = this.state;

    const formVisible = job && task && !cancelled;

    const title = cancelled ? 'Task cancelled' : (job && job.name) || '';

    return (
      <Content title={title}>
        {formVisible && (
          <Panel className={styles.container}>
            <TaskActions
              taskId={assignment.taskId}
              form={job.verificationForm}
              reportMessage={reportMessage}
            />
            <FormDataProvider formData={job}>
              <Form
                className={styles.form}
                form={job.verificationForm}
                variables={variables}
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
            jobId={assignment.jobId}
            onSubmitComplete={this.handleAssignComplete}
          />
        )}
      </Content>
    );
  }
}

export default withSubmitState(verifyResponseStateSelector)(
  connect(
    makeMapStateToProps,
    mapDispatchToProps
  )(Task)
);
