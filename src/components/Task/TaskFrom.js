import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import { Panel } from '@expandorg/components';
import { Form, Module, formProps } from '@expandorg/modules';

import { RequestStates, requestStateProps } from '@expandorg/app-utils';

import TaskActions from './actions/TaskActions';

import SubmissionDialog from './SubmissionDialog';

import { assignmentProps } from '../shared/propTypes';

import styles from './styles.module.styl';

export default class TaskFrom extends Component {
  static propTypes = {
    assignment: assignmentProps.isRequired,
    form: formProps,
    visible: PropTypes.bool.isRequired,
    variables: PropTypes.shape({}),

    submitState: requestStateProps.isRequired,

    onSubmit: PropTypes.func.isRequired,
    onResetSubmit: PropTypes.func.isRequired,
  };

  static defaultProps = {
    form: null,
    variables: null,
  };

  state = {
    reportMessage: null,
  };

  handleAssignComplete = () => {
    const { onResetSubmit } = this.props;
    onResetSubmit();
    this.setState({ reportMessage: null });
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

    const { reportMessage } = this.state;

    return (
      <Fragment>
        {visible && (
          <Panel className={styles.container}>
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
              isSubmitting={submitState.state === RequestStates.Fetching}
              onSubmit={onSubmit}
              onModuleError={this.handleModuleError}
            >
              {props => <Module {...props} />}
            </Form>
          </Panel>
        )}
        {submitState.state === RequestStates.Fetched && (
          <SubmissionDialog
            jobId={assignment.jobId}
            onSubmitComplete={this.handleAssignComplete}
          />
        )}
      </Fragment>
    );
  }
}
