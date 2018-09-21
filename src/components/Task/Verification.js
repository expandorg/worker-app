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

import Content from '../shared/Content';

import SubmissionDialog from './SubmissionDialog';

import { verifyResponse } from '../../sagas/responsesSagas';

import { verifyResponseStateSelector } from '../../selectors/uiStateSelectors';

import { jobProps, taskProps, assignmentProps } from '../shared/propTypes';

import styles from './styles.module.styl';

const mapDispatchToProps = dispatch =>
  bindActionCreators({ verifyResponse }, dispatch);

class Task extends Component {
  static propTypes = {
    assignment: assignmentProps,
    job: jobProps,
    task: taskProps,

    submitState: requestStateProps.isRequired,

    verifyResponse: PropTypes.func.isRequired,

    onSubmit: PropTypes.func.isRequired,
    onResetSubmit: PropTypes.func.isRequired,
  };

  static defaultProps = {
    assignment: null,
    job: null,
    task: null,
  };

  handleSubmit = response => {
    const { job, assignment, onSubmit } = this.props;
    const score = calculateVerificationScore(
      response,
      job.verificationForm.modules,
      moduleControls
    );
    onSubmit(() => this.props.verifyResponse(assignment.responseId, score));
  };

  handleAssignComplete = () => {
    const { onResetSubmit } = this.props;
    onResetSubmit();
  };

  render() {
    const { submitState, assignment, job, task } = this.props;

    const formVisible = job && task;
    const title = (job && job.name) || '';

    return (
      <Content title={title}>
        {formVisible && (
          <Panel className={styles.container}>
            <FormDataProvider formData={job}>
              <Form
                className={styles.form}
                form={job.verificationForm}
                variables={task.verificationData}
                errors={submitState.error}
                isSubmitting={submitState.state === RequestStates.Fetching}
                onSubmit={this.handleSubmit}
              >
                {props => <Module {...props} />}
              </Form>
            </FormDataProvider>
          </Panel>
        )}
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
    null,
    mapDispatchToProps
  )(Task)
);
