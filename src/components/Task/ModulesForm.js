import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Form, Module, formProps } from '@expandorg/modules';
import {
  RequestStates,
  requestStateProps,
  SubmitStateEffect,
} from '@expandorg/app-utils';

import { Panel } from '@expandorg/components';

import TaskActions from './Actions/Actions';
import SubmissionResultDialog from './Results/SubmissionResultDialog';

import { assignmentProps } from '../shared/propTypes';

import styles from './styles.module.styl';

export default class ModulesForm extends Component {
  static propTypes = {
    assignment: assignmentProps.isRequired,
    form: formProps,
    visible: PropTypes.bool.isRequired,
    variables: PropTypes.shape({}),

    submitState: requestStateProps.isRequired,

    onSubmit: PropTypes.func.isRequired,
  };

  static defaultProps = {
    form: null,
    variables: null,
  };

  state = {
    isSubmitted: false,
    reportMessage: null,
  };

  handleAssigned = () => {
    this.setState({ reportMessage: null, isSubmitted: false });
  };

  handleSubmitted = () => {
    this.setState({ isSubmitted: true });
  };

  handleModuleError = reportMessage => {
    this.setState({ reportMessage });
  };

  render() {
    const {
      submitState,
      visible,
      form,
      assignment,
      variables,
      onSubmit,
    } = this.props;
    const { reportMessage, isSubmitted } = this.state;

    const isFetching = submitState.state === RequestStates.Fetching;

    return (
      <>
        {visible && (
          <Panel className={styles.panel}>
            <TaskActions
              assignmentId={assignment.id}
              form={form}
              reportMessage={reportMessage}
            />
            <Form
              className={styles.form}
              form={form}
              variables={variables}
              errors={submitState.error}
              isSubmitting={isFetching}
              onSubmit={onSubmit}
              onModuleError={this.handleModuleError}
            >
              {props => <Module {...props} />}
            </Form>
          </Panel>
        )}
        <SubmitStateEffect
          submitState={submitState}
          onComplete={this.handleSubmitted}
        />
        {isSubmitted && (
          <SubmissionResultDialog
            jobId={assignment.jobId}
            onAssignComplete={this.handleAssigned}
          />
        )}
      </>
    );
  }
}
